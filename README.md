# TradingView-Style Live Stock Chart

An exact replica of TradingView's interface with live candlestick charts, real-time price updates, and interactive overlays for earnings, dividends, and news.

## Features

- **Live Candlestick Chart**: Real-time candlestick chart powered by TradingView's Lightweight Charts library
- **Real-time Price Updates**: All prices update every second to simulate live market data
- **Interactive Overlays**: Click the dots at the bottom of the chart to view:
  - Earnings & Revenue data
  - Dividend information
  - Latest news and updates
- **Right Sidebar**:
  - Watchlist with major indices (SPX, NDQ, DJI, VIX, DXY)
  - Stock list with live prices
  - Detailed stock information panel
- **TradingView-Style Design**: Exact replica of TradingView's dark theme and layout
- **Live Indicator**: Pulsing green dot showing the data is updating in real-time

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Lightweight Charts** (TradingView's official charting library)
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── CandlestickChart.tsx    # Main chart component with live data
│   ├── RightSidebar.tsx        # Watchlist and stock details sidebar
│   └── Overlays.tsx            # Earnings, dividends, and news overlays
├── types/
│   └── index.ts                # TypeScript type definitions
├── utils/
│   └── mockData.ts             # Mock data generators for live updates
├── App.tsx                     # Main application component
└── index.css                   # Global styles with Tailwind
```

## How It Works

### Live Data Updates

The application simulates live market data by:
1. Generating initial historical candlestick data
2. Creating new candles every second based on the previous candle with realistic price movements
3. Updating all prices in the watchlist every second with small random fluctuations

### Interactive Features

- **Bottom Dots**: Three colored dots at the bottom of the chart represent:
  - 🔵 Blue: Earnings & Revenue
  - 🟣 Purple: Dividends
  - 🟣 Pink: Latest News
- Click any dot to open an overlay with detailed information

### Candlestick Chart

The chart uses TradingView's Lightweight Charts library for:
- Smooth rendering of candlestick data
- Volume histogram below the main chart
- Real-time updates without flickering
- Professional-grade charting capabilities

## Next Steps (Integration with Real APIs)

To integrate with real data sources:

1. **Replace mock data functions** in \`src/utils/mockData.ts\` with API calls to:
   - yFinance API
   - NASDAQ API
   - Financial data providers (Alpha Vantage, IEX Cloud, etc.)

2. **Update data fetching** in \`src/App.tsx\`:
   - Replace \`generateInitialCandles()\` with API calls for historical data
   - Replace \`generateNewCandle()\` with WebSocket connections for real-time data
   - Update \`updatePrices()\` to fetch from live market data APIs

3. **Add WebSocket support** for real-time updates:
   \`\`\`typescript
   // Example WebSocket integration
   const ws = new WebSocket('wss://your-data-provider.com/stream');
   ws.onmessage = (event) => {
     const data = JSON.parse(event.data);
     // Update state with real-time data
   };
   \`\`\`

## Customization

### Colors

Edit the Tailwind config in \`tailwind.config.js\` to customize colors:
- \`tradingview-bg\`: Main background color
- \`tradingview-panel\`: Panel background color
- \`tradingview-border\`: Border color
- \`tradingview-green\`: Positive change color
- \`tradingview-red\`: Negative change color

### Update Frequency

Change the update interval in \`src/App.tsx\` (line 66):
\`\`\`typescript
}, 1000); // Update every 1000ms (1 second)
\`\`\`

## License

MIT
