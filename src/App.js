import { useState } from 'react';
import FunctionInput from './components/FunctionInput';
import GraphViewer from './components/GraphViewer';
import DerivativeSlider from './components/DerivativeSlider';
import VirtualKeyboard from './components/VirtualKeyboard';
import ParameterSlider from './components/ParameterSlider';
import PointsManager from './components/PointsManager';
import { getDerivativeString, findRootsNumerically, getIntervalsFromRoots, findIntersections, getFactoredForm } from './utils/mathEngine';

const COLORS = ['#1565C0', '#C62828', '#2E7D32', '#6A1B9A', '#EF6C00'];

export default function App() {
  const [funcs, setFuncs] = useState([{ id: 1, eq: 'x^2 - 4', sign: '=', color: COLORS[0] }]);
  const [points, setPoints] = useState([]);
  const [activeId, setActiveId] = useState(1); 
  const [aParam, setAParam] = useState(1);     
  const [tangentX, setTangentX] = useState(1); 

  const addFunc = () => {
    if (funcs.length >= 5) return;
    const newId = Date.now();
    setFuncs([...funcs, { id: newId, eq: '', sign: '=', color: COLORS[funcs.length % COLORS.length] }]);
    setActiveId(newId); 
  };

  const removeFunc = (id) => {
    setFuncs(funcs.filter(f => f.id !== id));
    if (activeId === id && funcs.length > 1) setActiveId(funcs[0].id);
  };

  const updateFunc = (id, key, value) => {
    setFuncs(funcs.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  const handleKeyPress = (val) => {
    const target = funcs.find(f => f.id === activeId);
    if (target) updateFunc(activeId, 'eq', target.eq + val);
  };
  const handleBackspace = () => {
    const target = funcs.find(f => f.id === activeId);
    if (target) updateFunc(activeId, 'eq', target.eq.slice(0, -1));
  };
  const handleClear = () => {
    updateFunc(activeId, 'eq', '');
  };

  const parsedFuncs = funcs.map(f => ({
    ...f,
    eq: f.eq.replace(/\ba\b/g, `(${aParam})`) 
  }));

  const mainFunc = parsedFuncs[0];
  const derivativeEq = mainFunc && mainFunc.eq && !mainFunc.eq.includes('y') ? getDerivativeString(mainFunc.eq) : '';
  const roots = mainFunc && mainFunc.eq && !mainFunc.eq.includes('y') ? findRootsNumerically(mainFunc.eq) : [];
  const intervalsText = mainFunc && !mainFunc.eq.includes('y') ? getIntervalsFromRoots(roots, mainFunc.sign, mainFunc.eq) : 'Brak';
  
  const factoredForm = mainFunc && !mainFunc.eq.includes('y') ? getFactoredForm(mainFunc.eq, roots) : null;

  let intersections = [];
  if (parsedFuncs.length >= 2) {
    intersections = findIntersections(parsedFuncs[0].eq, parsedFuncs[1].eq);
  }

  const hasParamA = funcs.some(f => /\ba\b/.test(f.eq));

  return (
    <div style={{ backgroundColor: '#121212', color: '#E0E0E0', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#BB86FC' }}>Analiza wzorów złożonych na graphie</h1>
        
        {}
        <FunctionInput funcs={funcs} updateFunc={updateFunc} addFunc={addFunc} removeFunc={removeFunc} activeId={activeId} setActiveId={setActiveId} />
        <VirtualKeyboard onKeyPress={handleKeyPress} onBackspace={handleBackspace} onClear={handleClear} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div>
            {}
            {hasParamA && (
              <ParameterSlider aParam={aParam} setAParam={setAParam} />
            )}
            <PointsManager points={points} setPoints={setPoints} />
          </div>
          <div>
            <DerivativeSlider tangentX={tangentX} setTangentX={setTangentX} />
            <div style={{ padding: '20px', background: '#1E1E1E', borderRadius: '8px', marginTop: '20px', borderLeft: '4px solid #BB86FC' }}>
              <h3 style={{ marginTop: 0 }}>Analiza F1</h3>
              <p><strong>Wyrażenie:</strong> {mainFunc?.eq || 'Brak...'}</p>
              
              {factoredForm && (
                <p><strong>Postać iloczynowa:</strong> f(x) = {factoredForm}</p>
              )}
              
              <p><strong>Pochodna f1'(x):</strong> {derivativeEq || 'Brak...'}</p>
              <p><strong>Miejsca Zerowe:</strong> {intervalsText}</p>
              {intersections.length > 0 && (
                 <p style={{ color: '#FF4081', fontWeight: 'bold' }}>
                   Przecięcia (f1 i f2): {intersections.map(p => `(${p[0]}, ${p[1]})`).join(' oraz ')}
                 </p>
              )}
            </div>
          </div>
        </div>
        
        <GraphViewer 
          funcs={parsedFuncs} 
          derivativeEq={derivativeEq} 
          tangentX={tangentX} 
          customPoints={points}
          intersections={intersections}
        />
      </div>
    </div>
  );
}
