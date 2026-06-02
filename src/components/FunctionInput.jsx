export default function FunctionInput({ funcs, updateFunc, addFunc, removeFunc, activeId, setActiveId }) {
  return (
    <div style={{ padding: '20px', background: '#1E1E1E', borderRadius: '8px', border: '1px solid #333' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#E0E0E0', margin: 0 }}>Playground Równań</h2>
        <button onClick={addFunc} style={{ padding: '8px 16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Dodaj Funkcję
        </button>
      </div>

      {funcs.map((func, index) => (
        <div key={func.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
          <span style={{ fontWeight: 'bold', color: func.color, fontSize: '18px' }}>f{index + 1}:</span>
          <select 
            value={func.sign} 
            onChange={(e) => updateFunc(func.id, 'sign', e.target.value)} 
            style={{ padding: '8px', fontSize: '16px', background: '#2D2D2D', color: '#E0E0E0', border: '1px solid #444', borderRadius: '4px' }}
          >
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value="<=">&le;</option>
            <option value=">">&gt;</option>
            <option value=">=">&ge;</option>
          </select>
          <input 
            type="text" 
            value={func.eq} 
            readOnly 
            onClick={() => setActiveId(func.id)} 
            placeholder="Wybierz i użyj kalkulatora..."
            style={{ 
              padding: '10px', 
              flexGrow: 1, 
              fontSize: '16px',
              border: activeId === func.id ? '2px solid #BB86FC' : '1px solid #444', 
              backgroundColor: activeId === func.id ? '#2D2D2D' : '#1A1A1A',
              color: '#FFFFFF', // TWARDY BIAŁY TEKST
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          />
          {funcs.length > 1 && (
            <button onClick={() => removeFunc(func.id)} style={{ padding: '8px 12px', background: '#D32F2F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              X
            </button>
          )}
        </div>
      ))}
    </div>
  );
}