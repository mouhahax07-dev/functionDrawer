import { analyzeQuadratic, solveInequality } from '../utils/mathEngine';

export default function MathInsights({ equation, sign, derivativeEq }) {
  const quadData = analyzeQuadratic(equation);
  const solution = solveInequality(quadData, sign);

  const fmt = (num, isFirst = false) => {
    if (num === 0 && !isFirst) return '';
    if (isFirst) return `${num}`;
    return num > 0 ? `+ ${num}` : `- ${Math.abs(num)}`;
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', background: '#e8f4f8', borderRadius: '8px' }}>
      <h3>Panel Analityczny 🔬</h3>
      <p><strong>Wyrażenie:</strong> f(x) {sign} {equation}</p>
      <p><strong>Pochodna:</strong> f'(x) = {derivativeEq || 'Brak...'}</p>
      
      {quadData ? (
        <div style={{ marginTop: '15px', padding: '15px', background: '#fff', borderRadius: '5px', borderLeft: '4px solid #4CAF50' }}>
          <h4 style={{ marginTop: 0 }}>Równanie Kwadratowe (Δ = {quadData.delta})</h4>
          
          <p><strong>Postać ogólna:</strong> 
            f(x) = {quadData.a}x² {fmt(quadData.b)}x {fmt(quadData.c)}
          </p>
          
          <p><strong>Postać kanoniczna:</strong> 
            f(x) = {quadData.a}(x {fmt(-quadData.p)})² {fmt(quadData.q)}
          </p>
          
          <p><strong>Postać iloczynowa:</strong> {
            quadData.delta < 0 ? 'Brak postaci iloczynowej (Δ < 0)' :
            quadData.delta === 0 ? `${quadData.a}(x ${fmt(-quadData.roots[0])})²` :
            `${quadData.a}(x ${fmt(-quadData.roots[0])})(x ${fmt(-quadData.roots[1])})`
          }</p>
          
          <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid #eee' }} />
          <p style={{ fontSize: '18px', color: '#d32f2f' }}>
            <strong>Rozwiązanie:</strong> {solution}
          </p>
        </div>
      ) : (
         <p style={{ color: '#666', marginTop: '10px' }}>
           <em>(Wpisz funkcję kwadratową, np. x^2 - 4, aby zobaczyć formy i przedziały)</em>
         </p>
      )}
    </div>
  );
}