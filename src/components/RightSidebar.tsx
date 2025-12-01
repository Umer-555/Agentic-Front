import { StockData, IndexData } from '../types';

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
        <div className="px-4 py-3">
          <button className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 uppercase font-medium">Indices</span>
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div>
          {indices.map((index, idx) => {
            const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];
            return (
              <div
                key={index.symbol}
                className="px-4 py-2.5 hover:bg-tradingview-bg cursor-pointer transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                    style={{ backgroundColor: colors[idx] }}
                  >
                    {index.symbol.slice(0, 1)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-tradingview-text">
                      {index.symbol}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-tradingview-text">
                    {index.price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                  <div className="flex items-center justify-end gap-1.5">
                    <span
                      className={`text-xs font-medium ${
                        index.change >= 0 ? 'text-tradingview-green' : 'text-tradingview-red'
                      }`}
                    >
                      {index.change >= 0 ? '+' : ''}
                      {index.change.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        index.changePercent >= 0 ? 'text-tradingview-green' : 'text-tradingview-red'
                      }`}
                    >
                      {index.changePercent >= 0 ? '+' : ''}
                      {index.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stocks Section */}
      <div className="border-b border-tradingview-border">
        <div className="px-4 py-3">
          <button className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 uppercase font-medium">Stocks</span>
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div>
          {stocks.map((stock, idx) => {
            const stockColors = ['#EF4444', '#10B981'];
            return (
              <div
                key={stock.symbol}
                className={`px-4 py-2.5 hover:bg-tradingview-bg cursor-pointer transition-colors flex items-center justify-between ${
                  selectedStock.symbol === stock.symbol ? 'bg-tradingview-bg' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                    style={{ backgroundColor: stockColors[idx] }}
                  >
                    {stock.symbol.slice(0, 1)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-tradingview-text">
                      {stock.symbol}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-tradingview-text">
                    {stock.price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                  <div className="flex items-center justify-end gap-1.5">
                    <span
                      className={`text-xs font-medium ${
                        stock.change >= 0 ? 'text-tradingview-green' : 'text-tradingview-red'
                      }`}
                    >
                      {stock.change >= 0 ? '+' : ''}
                      {stock.change.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        stock.changePercent >= 0 ? 'text-tradingview-green' : 'text-tradingview-red'
                      }`}
                    >
                      {stock.changePercent >= 0 ? '+' : ''}
                      {stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Stock Details */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
              {selectedStock.symbol[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-tradingview-text">
                  {selectedStock.symbol}
                </h3>
                <span className="text-xs text-gray-500">• NASDAQ</span>
              </div>
              <p className="text-xs text-gray-400">Electronic Technology • Semiconductors</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-tradingview-bg rounded transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button className="p-1.5 hover:bg-tradingview-bg rounded transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button className="p-1.5 hover:bg-tradingview-bg rounded transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-tradingview-text">
                {selectedStock.price.toFixed(2)}
              </div>
              <span className="text-sm text-gray-400">USD</span>
              <span
                className={`text-base font-medium ${
                  selectedStock.change >= 0 ? 'text-tradingview-green' : 'text-tradingview-red'
                }`}
              >
                {selectedStock.change >= 0 ? '+' : ''}
                {selectedStock.change.toFixed(2)}
              </span>
              <span
                className={`text-base font-medium ${
                  selectedStock.change >= 0 ? 'text-tradingview-green' : 'text-tradingview-red'
                }`}
              >
                ({selectedStock.changePercent >= 0 ? '+' : ''}
                {selectedStock.changePercent.toFixed(2)}%)
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              <span className="mr-1">■</span>
              Market closed
              <span className="ml-3">Last updated: Nov 01, 02:59 GMT+5</span>
            </div>
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

      {/* Latest News Section */}
      <div className="p-4 border-t border-tradingview-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center">
            <span className="text-purple-400 text-xs">📰</span>
          </div>
          <h3 className="text-sm font-semibold text-tradingview-text">Latest updates</h3>
        </div>
        <div className="space-y-3">
          <div className="p-2.5 bg-tradingview-bg/50 rounded hover:bg-tradingview-bg cursor-pointer transition-colors">
            <p className="text-xs text-tradingview-text leading-relaxed">
              Nvidia competes with Google in the AI chip market as Alphabet's Gemini 3 model gains investor attention, challenging Nvidia's top position alongside Microsoft and AMD.
            </p>
          </div>
          <div className="p-2.5 bg-tradingview-bg/50 rounded hover:bg-tradingview-bg cursor-pointer transition-colors">
            <p className="text-xs text-tradingview-text leading-relaxed">
              Nvidia's shares experienced volatility following reports that Meta is in discussions to invest billions in Google's chips, affecting investor sentiment towards the semiconductor company.
            </p>
          </div>
          <div className="p-2.5 bg-tradingview-bg/50 rounded hover:bg-tradingview-bg cursor-pointer transition-colors">
            <p className="text-xs text-tradingview-text leading-relaxed">
              Norway's $2 trillion wealth fund, a major Nvidia stakeholder, supports a proposal at Microsoft's annual meeting for a report on risks in countries with human rights issues.
            </p>
          </div>
        </div>
      </div>

      {/* Key Stats Section */}
      <div className="p-4 border-t border-tradingview-border">
        <h3 className="text-sm font-semibold text-tradingview-text mb-3">Key stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">Next earnings report</span>
            <span className="text-xs text-tradingview-text font-medium">In 73 days</span>
          </div>
        </div>
      </div>
    </div>
  );
};
