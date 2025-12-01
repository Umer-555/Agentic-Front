import { StockData, IndexData } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface RightSidebarProps {
  indices: IndexData[];
  stocks: StockData[];
  selectedStock: StockData;
  onStockSelect?: (symbol: string) => void;
}

export const RightSidebar = ({ indices, stocks, selectedStock }: RightSidebarProps) => {
  return (
    <div className="w-80 bg-tradingview-panel border-l border-tradingview-border h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-tradingview-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-tradingview-text">Watchlist</h2>
          <button className="text-tradingview-text hover:text-white">+</button>
        </div>
      </div>

      {/* Indices Section */}
      <div className="border-b border-tradingview-border">
        <div className="px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-gray-400 uppercase">Indices</span>
        </div>
        <div className="space-y-1">
          {indices.map((index) => (
            <div
              key={index.symbol}
              className="px-4 py-2 hover:bg-tradingview-bg cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
                    {index.symbol[0]}
                  </span>
                  <span className="text-sm font-medium text-tradingview-text">
                    {index.symbol}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-tradingview-text">
                    {index.price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <span
                      className={`text-xs ${
                        index.change >= 0 ? 'text-tradingview-green' : 'text-tradingview-red'
                      }`}
                    >
                      {index.change >= 0 ? '+' : ''}
                      {index.change.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs ${
                        index.changePercent >= 0 ? 'text-tradingview-green' : 'text-tradingview-red'
                      }`}
                    >
                      {index.changePercent >= 0 ? '+' : ''}
                      {index.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stocks Section */}
      <div className="border-b border-tradingview-border">
        <div className="px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-gray-400 uppercase">Stocks</span>
        </div>
        <div className="space-y-1">
          {stocks.map((stock) => (
            <div
              key={stock.symbol}
              className={`px-4 py-2 hover:bg-tradingview-bg cursor-pointer transition-colors ${
                selectedStock.symbol === stock.symbol ? 'bg-tradingview-bg' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">
                    {stock.symbol[0]}
                  </span>
                  <span className="text-sm font-medium text-tradingview-text">
                    {stock.symbol}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-tradingview-text">
                    {stock.price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <span
                      className={`text-xs ${
                        stock.change >= 0 ? 'text-tradingview-green' : 'text-tradingview-red'
                      }`}
                    >
                      {stock.change >= 0 ? '+' : ''}
                      {stock.change.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs ${
                        stock.changePercent >= 0 ? 'text-tradingview-green' : 'text-tradingview-red'
                      }`}
                    >
                      {stock.changePercent >= 0 ? '+' : ''}
                      {stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Stock Details */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold">
            {selectedStock.symbol[0]}
          </span>
          <div>
            <h3 className="text-base font-semibold text-tradingview-text">
              {selectedStock.symbol}
            </h3>
            <p className="text-xs text-gray-400">{selectedStock.name}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-3xl font-bold text-tradingview-text">
              {selectedStock.price.toFixed(2)}
              <span className="text-sm ml-2 text-gray-400">USD</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
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
            <div className="text-xs text-gray-400 mt-1">Market closed</div>
          </div>

          {selectedStock.volume && (
            <div className="pt-3 border-t border-tradingview-border">
              <div className="text-xs text-gray-400">Volume</div>
              <div className="text-sm font-medium text-tradingview-text mt-1">
                {selectedStock.volume}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Key Stats Section */}
      <div className="p-4 border-t border-tradingview-border">
        <h3 className="text-sm font-semibold text-tradingview-text mb-3">Key stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">Next earnings report</span>
            <span className="text-xs text-tradingview-text">In 73 days</span>
          </div>
        </div>
      </div>
    </div>
  );
};
