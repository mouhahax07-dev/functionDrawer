export default function ParameterSlider({ aParam, setAParam }) {
  return (
    <div style={{ padding: '20px', background: '#1E1E1E', borderRadius: '8px', border: '1px solid #333', borderLeft: '4px solid #2196F3' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#E0E0E0' }}>Sterowanie Parametrem (a)</h3>
      <label style={{ display: 'block', marginBottom: '10px', color: '#B0B0B0' }}>
        Aktualna wartość: <strong style={{ color: '#FFF' }}>a = {aParam}</strong>
      </label>
      <input 
        type="range" 
        min="-5" 
        max="5" 
        step="0.1" 
        value={aParam} 
        onChange={(e) => setAParam(parseFloat(e.target.value))}
        style={{ width: '100%', cursor: 'pointer' }}
      />
    </div>
  );
}