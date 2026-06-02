export default function DerivativeSlider({ tangentX, setTangentX }) {
  return (
    <div style={{ padding: '20px', background: '#1E1E1E', borderRadius: '8px', border: '1px solid #333' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#E0E0E0' }}>Sterowanie Styczną</h3>
      <label style={{ display: 'block', marginBottom: '10px', color: '#B0B0B0' }}>
        Punkt styczności: <strong style={{ color: '#FFF' }}>x = {tangentX}</strong>
      </label>
      <input 
        type="range" 
        min="-10" 
        max="10" 
        step="0.1" 
        value={tangentX} 
        onChange={(e) => setTangentX(parseFloat(e.target.value))}
        style={{ width: '100%', cursor: 'pointer' }}
      />
    </div>
  );
}