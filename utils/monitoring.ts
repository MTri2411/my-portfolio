export const reportWebVitals = (metric: any) => {
  const { id, name, label, value } = metric;

  // Analytics - Bạn có thể thay thế bằng Google Analytics hoặc các service khác
  console.log({
    metric: name,
    id: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    label: label === 'web-vital' ? 'Web Vital' : 'Custom'
  });
};

// Theo dõi First Paint và First Contentful Paint
export const measurePaintTiming = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const paintMetrics = performance.getEntriesByType('paint');
    
    paintMetrics.forEach(({ name, startTime }) => {
      console.log(`${name}: ${Math.round(startTime)}ms`);
    });
  }
};

// Theo dõi thời gian tải resource
export const measureResourceTiming = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const resources = performance.getEntriesByType('resource');
    
    resources.forEach(({ name, duration, initiatorType }) => {
      if (duration > 1000) { // Chỉ log những resource tải > 1s
        console.log(`Slow resource load: ${name} (${initiatorType}) - ${Math.round(duration)}ms`);
      }
    });
  }
};

// Theo dõi Memory Usage
export const measureMemoryUsage = async () => {
  if (typeof window !== 'undefined' && 'performance' in window && 'memory' in performance) {
    const memory = (performance as any).memory;
    console.log({
      jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576), // Convert to MB
      totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576),
      usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576)
    });
  }
}; 