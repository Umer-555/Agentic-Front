import { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time } from 'lightweight-charts';
import { CandleData, NewsEvent } from '../types';

interface CandlestickChartProps {
  data: CandleData[];
  newsEvents: NewsEvent[];
  onNewsClick: (news: NewsEvent, position: { x: number; y: number }) => void;
}

export const CandlestickChart = ({ data, newsEvents, onNewsClick }: CandlestickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  const [activeNews, setActiveNews] = useState<NewsEvent | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#131722' },
        textColor: '#D1D4DC',
      },
      grid: {
        vertLines: { color: '#2A2E39' },
        horzLines: { color: '#2A2E39' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      rightPriceScale: {
        borderColor: '#2A2E39',
      },
      timeScale: {
        borderColor: '#2A2E39',
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: 1,
      },
    });

    // Add candlestick series
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#26A69A',
      downColor: '#EF5350',
      borderUpColor: '#26A69A',
      borderDownColor: '#EF5350',
      wickUpColor: '#26A69A',
      wickDownColor: '#EF5350',
    });

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  // Update data
  useEffect(() => {
    if (!candleSeriesRef.current || !volumeSeriesRef.current) return;

    const candleData: CandlestickData<Time>[] = data.map(d => ({
      time: d.time as Time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    const volumeData = data.map(d => ({
      time: d.time as Time,
      value: d.volume || 0,
      color: d.close >= d.open ? 'rgba(38, 166, 154, 0.5)' : 'rgba(239, 83, 80, 0.5)',
    }));

    candleSeriesRef.current.setData(candleData);
    volumeSeriesRef.current.setData(volumeData);

    // Fit content
    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  }, [data]);

  // Add markers for news events
  useEffect(() => {
    if (!candleSeriesRef.current || newsEvents.length === 0) return;

    const markers = newsEvents.map(news => ({
      time: news.time as Time,
      position: 'aboveBar' as const,
      color: '#2196F3',
      shape: 'circle' as const,
      text: 'N',
      size: 1,
    }));

    candleSeriesRef.current.setMarkers(markers);
  }, [newsEvents]);

  return (
    <div className="relative w-full h-full">
      <div ref={chartContainerRef} className="w-full h-full" />

      {/* News event dots overlay */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 pb-4">
        {[1, 2, 3].map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (newsEvents[index]) {
                const rect = chartContainerRef.current?.getBoundingClientRect();
                if (rect) {
                  onNewsClick(newsEvents[index], {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                  });
                }
              }
            }}
            className="w-2 h-2 rounded-full bg-blue-500 hover:bg-blue-400 cursor-pointer transition-colors"
            aria-label={`News event ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
