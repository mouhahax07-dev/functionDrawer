import { useEffect, useRef } from 'react';
import functionPlot from 'function-plot';

export default function GraphViewer({ funcs, derivativeEq, tangentX, customPoints, intersections }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      const validFuncs = funcs.filter(f => f.eq && f.eq.trim() !== '');
      
      const dataArray = validFuncs.map((f, index) => {
        const safeEq = f.eq.replace(/\bpi\b/g, 'PI');

        if (safeEq.includes('y')) {
          return { fn: safeEq, fnType: 'implicit', color: f.color };
        }

        const config = { fn: safeEq, graphType: 'polyline', color: f.color };
        if (f.sign.includes('<') || f.sign.includes('>')) config.closed = true;

        if (index === 0 && derivativeEq) {
          const safeDerivEq = derivativeEq.replace(/\bpi\b/g, 'PI');
          config.derivative = { fn: safeDerivEq, x0: tangentX, updateOnMouseMove: false };
        }
        return config;
      });

      if (customPoints && customPoints.length > 0) {
        const parsedPoints = customPoints.map(p => [parseFloat(p.x), parseFloat(p.y)]).filter(p => !isNaN(p[0]));
        if (parsedPoints.length > 0) {
          dataArray.push({ points: parsedPoints, fnType: 'points', graphType: 'scatter', color: '#E0E0E0', attr: { r: 6 } });
        }
      }

      if (intersections && intersections.length > 0) {
        dataArray.push({ points: intersections, fnType: 'points', graphType: 'scatter', color: '#E91E63', attr: { r: 8 } });
      }

      functionPlot({
        target: containerRef.current,
        width: 700,
        height: 500,
        grid: true,
        xAxis: { domain: [-10, 10] },
        yAxis: { domain: [-10, 10] },
        data: dataArray,
        tip: { xLine: true, yLine: true }
      });
      
    } catch (error) {
      console.error("Błąd rysowania wykresu:", error.message);
    }
  }, [funcs, derivativeEq, tangentX, customPoints, intersections]);

  return (
    <div style={{ position: 'relative', marginTop: '20px' }}>
      {}
      <style>
        {`
          /* Kolor tekstu na osiach */
          .function-plot text { fill: #E0E0E0 !important; }
          /* Główne osie X i Y */
          .function-plot .origin { stroke: #888 !important; stroke-width: 1.5px !important; }
          /* Pudełko dookoła wykresu */
          .function-plot .axis path, .function-plot .axis line { stroke: #444 !important; }
          /* Linie siatki (kratka) */
          .function-plot .x.axis .tick line, .function-plot .y.axis .tick line { stroke: #333 !important; }
          /* Celownik i pole z koordynatami (Hover Snap) */
          .function-plot .inner-tip rect { fill: #2D2D2D !important; stroke: #444 !important; }
          .function-plot .inner-tip text { fill: #FFFFFF !important; font-weight: bold !important; }
        `}
      </style>
      
      {}
      <div 
        ref={containerRef} 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          background: '#1E1E1E', 
          padding: '10px', 
          borderRadius: '8px', 
          border: '1px solid #333' 
        }} 
      />
    </div>
  );
}