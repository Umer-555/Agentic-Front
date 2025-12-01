import { useState, useEffect, useCallback } from 'react';
import { CandlestickChart } from './components/CandlestickChart';
import { RightSidebar } from './components/RightSidebar';
import { EarningsOverlay, DividendsOverlay, LatestUpdatesOverlay } from './components/Overlays';
import {
  generateInitialCandles,
  generateNewCandle,
  getMockIndices,
  getMockStocks,
  updatePrices,
  getMockNewsEvents,
  getMockEarningsData,
  getMockDividendData,
  getMockLatestUpdates,
} from './utils/mockData';
import { CandleData, IndexData, StockData, NewsEvent, OverlayType } from './types';
import { TrendingUp, TrendingDown } from 'lucide-react';

function App() {
  // State
  const [candleData, setCandleData] = useState<CandleData[]>([]);
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [newsEvents] = useState<NewsEvent[]>(getMockNewsEvents());
  const [activeOverlay, setActiveOverlay] = useState<OverlayType | null>(null);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });

  // Initialize data
  useEffect(() => {
    const initialCandles = generateInitialCandles(180, 177);
    setCandleData(initialCandles);

    const initialIndices = getMockIndices();
    const initialStocks = getMockStocks();

    setIndices(initialIndices);
    setStocks(initialStocks);
    setSelectedStock(initialStocks[1]); // NVDA
  }, []);

  // Live price updates (every second)
  useEffect(() => {
    const interval = setInterval(() => {
      // Update candle data
      setCandleData((prev) => {
        if (prev.length === 0) return prev;
        const lastCandle = prev[prev.length - 1];
        const newCandle = generateNewCandle(lastCandle);
        return [...prev.slice(-179), newCandle];
      });

      // Update indices and stocks prices
      setIndices((prev) => updatePrices(prev) as IndexData[]);
      setStocks((prev) => {
        const updated = updatePrices(prev) as StockData[];
        // Update selected stock if it matches
        if (selectedStock) {
          const updatedSelected = updated.find((s) => s.symbol === selectedStock.symbol);
          if (updatedSelected) {
            setSelectedStock(updatedSelected);
          }
        }
        return updated;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [selectedStock]);

  // Handle news click
  const handleNewsClick = useCallback((news: NewsEvent, position: { x: number; y: number }) => {
    setActiveOverlay({ type: 'news', position });
    setOverlayPosition(position);
  }, []);

  // Handle overlay button clicks
  const handleOverlayButtonClick = (
    type: 'earnings' | 'dividends' | 'news',
    event: React.MouseEvent
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2,
      y: rect.top - 20,
    };
    setActiveOverlay({ type, position });
    setOverlayPosition(position);
  };

  if (!selectedStock) {
    return (
      <div className="w-screen h-screen bg-tradingview-bg flex items-center justify-center">
        <div className="text-tradingview-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-tradingview-bg flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 bg-tradingview-panel border-b border-tradingview-border flex items-center px-4 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-tradingview-text font-semibold text-lg">
            {selectedStock.symbol}
          </span>
          <span className="text-gray-400 text-sm">{selectedStock.name}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">O</span>
            <span className="text-sm text-tradingview-text">
              {candleData.length > 0 ? candleData[candleData.length - 1].open.toFixed(2) : '0.00'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">H</span>
            <span className="text-sm text-tradingview-text">
              {candleData.length > 0 ? candleData[candleData.length - 1].high.toFixed(2) : '0.00'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">L</span>
            <span className="text-sm text-tradingview-text">
              {candleData.length > 0 ? candleData[candleData.length - 1].low.toFixed(2) : '0.00'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">C</span>
            <span
              className={`text-sm font-medium ${
                selectedStock.change >= 0 ? 'text-tradingview-green' : 'text-tradingview-red'
              }`}
            >
              {candleData.length > 0 ? candleData[candleData.length - 1].close.toFixed(2) : '0.00'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {selectedStock.change >= 0 ? (
              <TrendingUp className="w-4 h-4 text-tradingview-green" />
            ) : (
              <TrendingDown className="w-4 h-4 text-tradingview-red" />
            )}
            <span
              className={`text-sm font-medium ${
                selectedStock.change >= 0 ? 'text-tradingview-green' : 'text-tradingview-red'
              }`}
            >
              {selectedStock.change >= 0 ? '+' : ''}
              {selectedStock.change.toFixed(2)} ({selectedStock.changePercent >= 0 ? '+' : ''}
              {selectedStock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-400">Vol</span>
          <span className="text-sm text-tradingview-text">
            {candleData.length > 0 && candleData[candleData.length - 1].volume
              ? (candleData[candleData.length - 1].volume! / 1000000).toFixed(2) + 'M'
              : '0'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chart Area */}
        <div className="flex-1 relative">
          <CandlestickChart
            data={candleData}
            newsEvents={newsEvents}
            onNewsClick={handleNewsClick}
          />

          {/* Bottom Overlay Buttons */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-tradingview-panel border border-tradingview-border rounded-full px-4 py-2 shadow-lg">
            <button
              onClick={(e) => handleOverlayButtonClick('earnings', e)}
              className="w-2 h-2 rounded-full bg-blue-500 hover:bg-blue-400 cursor-pointer transition-all hover:scale-125"
              title="Earnings & Revenue"
            />
            <button
              onClick={(e) => handleOverlayButtonClick('dividends', e)}
              className="w-2 h-2 rounded-full bg-purple-500 hover:bg-purple-400 cursor-pointer transition-all hover:scale-125"
              title="Dividends"
            />
            <button
              onClick={(e) => handleOverlayButtonClick('news', e)}
              className="w-2 h-2 rounded-full bg-pink-500 hover:bg-pink-400 cursor-pointer transition-all hover:scale-125"
              title="Latest Updates"
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <RightSidebar
          indices={indices}
          stocks={stocks}
          selectedStock={selectedStock}
          onStockSelect={(symbol) => {
            const stock = stocks.find((s) => s.symbol === symbol);
            if (stock) setSelectedStock(stock);
          }}
        />
      </div>

      {/* Overlays */}
      {activeOverlay?.type === 'earnings' && (
        <EarningsOverlay
          data={getMockEarningsData()}
          position={overlayPosition}
          onClose={() => setActiveOverlay(null)}
        />
      )}
      {activeOverlay?.type === 'dividends' && (
        <DividendsOverlay
          data={getMockDividendData()}
          position={overlayPosition}
          onClose={() => setActiveOverlay(null)}
        />
      )}
      {activeOverlay?.type === 'news' && (
        <LatestUpdatesOverlay
          updates={getMockLatestUpdates()}
          position={overlayPosition}
          onClose={() => setActiveOverlay(null)}
        />
      )}

      {/* Live Update Indicator */}
      <div className="fixed top-4 left-4 flex items-center gap-2 bg-tradingview-panel border border-tradingview-border rounded-full px-3 py-1 shadow-lg">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs text-tradingview-text font-medium">LIVE</span>
      </div>
    </div>
  );
}

export default App;
