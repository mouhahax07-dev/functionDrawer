export default function VirtualKeyboard({ onKeyPress, onBackspace, onClear }) {
  const btnStyle = { 
    padding: '15px', 
    fontSize: '18px', 
    cursor: 'pointer', 
    borderRadius: '8px', 
    border: '1px solid #444', 
    background: '#2D2D2D', 
    color: '#E0E0E0',
    fontWeight: 'bold', 
    transition: 'background 0.2s' 
  };
  
  const actionBtnStyle = { ...btnStyle, color: '#EF5350' }; 
  const mathBtnStyle = { ...btnStyle, color: '#42A5F5' };   
  const trigBtnStyle = { ...btnStyle, color: '#66BB6A' };   

  const keys = [
    { label: 'sin', val: 'sin(', style: trigBtnStyle },
    { label: 'cos', val: 'cos(', style: trigBtnStyle },
    { label: 'tan', val: 'tan(', style: trigBtnStyle },
    { label: 'cot', val: 'cot(', style: trigBtnStyle },
    { label: '|x|', val: 'abs(', style: mathBtnStyle }, 

    { label: 'x', val: 'x', style: mathBtnStyle },
    { label: 'y (okrąg)', val: 'y', style: mathBtnStyle },
    { label: 'a (param)', val: 'a', style: mathBtnStyle },
    { label: '√', val: 'sqrt(', style: mathBtnStyle },
    { label: 'log', val: 'log(', style: mathBtnStyle },

    { label: '7', val: '7', style: btnStyle },
    { label: '8', val: '8', style: btnStyle },
    { label: '9', val: '9', style: btnStyle },
    { label: '/', val: '/', style: mathBtnStyle },
    { label: '^', val: '^', style: mathBtnStyle },

    { label: '4', val: '4', style: btnStyle },
    { label: '5', val: '5', style: btnStyle },
    { label: '6', val: '6', style: btnStyle },
    { label: '*', val: '*', style: mathBtnStyle },
    { label: '(', val: '(', style: mathBtnStyle },

    { label: '1', val: '1', style: btnStyle },
    { label: '2', val: '2', style: btnStyle },
    { label: '3', val: '3', style: btnStyle },
    { label: '-', val: '-', style: mathBtnStyle },
    { label: ')', val: ')', style: mathBtnStyle },

    { label: '0', val: '0', style: btnStyle },
    { label: '.', val: '.', style: btnStyle },
    { label: 'π', val: 'pi', style: btnStyle },
    { label: '+', val: '+', style: mathBtnStyle },
    { label: '⌫ Usuń', val: 'backspace', style: actionBtnStyle },
  ];

  return (
    <div style={{ padding: '20px', background: '#1E1E1E', borderRadius: '8px', border: '1px solid #333', marginTop: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        {keys.map(k => (
          <button 
            key={k.label} 
            style={k.style} 
            onClick={() => {
              if (k.val === 'backspace') onBackspace();
              else if (k.val === 'clear') onClear();
              else onKeyPress(k.val);
            }}
          >
            {k.label}
          </button>
        ))}
        <button style={{ ...actionBtnStyle, gridColumn: 'span 5' }} onClick={onClear}>
          Wyczyść Równanie
        </button>
      </div>
    </div>
  );
}