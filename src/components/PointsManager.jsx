export default function PointsManager({ points, setPoints }) {
  const addPoint = () => {
    setPoints([...points, { id: Date.now(), x: '0', y: '0' }]);
  };

  const updatePoint = (id, axis, value) => {
    setPoints(points.map(p => p.id === id ? { ...p, [axis]: value } : p));
  };

  const removePoint = (id) => {
    setPoints(points.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: '20px', background: '#1E1E1E', borderRadius: '8px', border: '1px solid #333', marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, color: '#E0E0E0' }}>Twoje Punkty</h3>
        <button onClick={addPoint} style={{ padding: '5px 10px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Dodaj Punkt
        </button>
      </div>
      
      {points.map((p, i) => (
        <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px', color: '#B0B0B0' }}>
          <strong style={{ color: '#FFF' }}>P{i + 1}:</strong>
          X: <input 
               type="text" 
               value={p.x} 
               onChange={(e) => updatePoint(p.id, 'x', e.target.value)} 
               style={{ width: '60px', padding: '5px', textAlign: 'center', background: '#2D2D2D', color: '#FFF', border: '1px solid #444', borderRadius: '4px' }} 
             />
          Y: <input 
               type="text" 
               value={p.y} 
               onChange={(e) => updatePoint(p.id, 'y', e.target.value)} 
               style={{ width: '60px', padding: '5px', textAlign: 'center', background: '#2D2D2D', color: '#FFF', border: '1px solid #444', borderRadius: '4px' }} 
             />
          <button onClick={() => removePoint(p.id)} style={{ padding: '4px 8px', background: '#D32F2F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>X</button>
        </div>
      ))}
    </div>
  );
}