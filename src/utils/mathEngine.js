import { parse, derivative } from 'mathjs';

export const evaluateFunction = (expression, xValue) => {
  try {
    const node = parse(expression);
    return node.evaluate({ x: xValue });
  } catch (error) {
    return null;
  }
};

export const getDerivativeString = (expression) => {
  try {
    return derivative(expression, 'x').toString();
  } catch (error) {
    return '';
  }
};

export const getIntegerPoints = (expression, xMin = -10, xMax = 10) => {
  const points = [];
  for (let x = xMin; x <= xMax; x++) {
    const y = evaluateFunction(expression, x);

    if (y !== null && !isNaN(y) && Math.abs(y - Math.round(y)) < 0.00001) {
      points.push([x, Math.round(y)]);
    }
  }
  return points;
};

export const analyzeQuadratic = (expression) => {
  try {
    const f = (x) => evaluateFunction(expression, x);
    const c = f(0);
    const f1 = f(1);
    const fm1 = f(-1);

    if (c === null || f1 === null || fm1 === null) return null;

    const a = (f1 + fm1 - 2 * c) / 2;
    const b = f1 - c - a;

    const f2 = f(2);
    if (Math.abs(f2 - (a * 4 + b * 2 + c)) > 0.0001 || Math.abs(a) < 0.00001) {
      return null;
    }

    const round = (val) => Math.round(val * 1000) / 1000;
    const A = round(a);
    const B = round(b);
    const C = round(c);

    const delta = round(B * B - 4 * A * C);
    const p = round(-B / (2 * A));
    const q = round(-delta / (4 * A));

    let roots = [];
    if (delta > 0) {
      roots.push(round((-B - Math.sqrt(delta)) / (2 * A)));
      roots.push(round((-B + Math.sqrt(delta)) / (2 * A)));
      roots.sort((x, y) => x - y);
    } else if (delta === 0) {
      roots.push(p);
    }

    return { a: A, b: B, c: C, delta, p, q, roots };
  } catch (error) {
    return null;
  }
};

export const solveInequality = (quadData, sign) => {
  if (!quadData) return "Wpisz funkcję kwadratową, abym mógł ją przeanalizować!";
  const { a, delta, roots } = quadData;

  const inf = '∞';
  const u = '∪';

  if (sign === '=') {
    if (roots.length === 0) return "x ∈ ∅ (Brak miejsc zerowych)";
    if (roots.length === 1) return `x = ${roots[0]}`;
    return `x₁ = ${roots[0]}, x₂ = ${roots[1]}`;
  }

  if (delta < 0) {
    if (a > 0) return (sign === '>=' || sign === '<=') && sign.includes('>') ? `x ∈ (-${inf}, ${inf})` : "x ∈ ∅";
    return (sign === '<=' || sign === '>=') && sign.includes('<') ? `x ∈ (-${inf}, ${inf})` : "x ∈ ∅";
  }

  if (delta === 0) {
    const x0 = roots[0];
    if (a > 0) {
      if (sign === '>=') return `x ∈ (-${inf}, ${inf})`;
      if (sign === '<=') return `x = ${x0}`;
    } else {
      if (sign === '<=') return `x ∈ (-${inf}, ${inf})`;
      if (sign === '>=') return `x = ${x0}`;
    }
  }

  if (delta > 0) {
    const [x1, x2] = roots;
    if (a > 0) {
      if (sign === '>=') return `x ∈ (-${inf}, ${x1}] ${u} [${x2}, ${inf})`;
      if (sign === '<=') return `x ∈ [${x1}, ${x2}]`;
    } else {
      if (sign === '<=') return `x ∈ (-${inf}, ${x1}] ${u} [${x2}, ${inf})`;
      if (sign === '>=') return `x ∈ [${x1}, ${x2}]`;
    }
  }

  return "Oczekuję na dane...";
};

export const findRootsNumerically = (expression, xMin = -10, xMax = 10, step = 0.05) => {
  let roots = [];
  let prevY = evaluateFunction(expression, xMin);

  if (prevY === null) return [];

  for (let x = xMin + step; x <= xMax; x += step) {
    let y = evaluateFunction(expression, x);
    if (y === null || isNaN(y)) continue;

    if (prevY * y <= 0) {
      let rootX = x - step * (y / (y - prevY));
      roots.push(Math.round(rootX * 100) / 100);
    }

    prevY = y;
  }

  return [...new Set(roots)];
};

export const getIntervalsFromRoots = (roots, sign, expression) => {
  if (roots.length === 0) return "Brak miejsc zerowych w widocznym zakresie.";

  if (sign === '=') {
    return roots.map((r, i) => `x${i + 1} = ${r}`).join(', ');
  }

  return `Miejsca zerowe (punkty zmiany znaku): ${roots.join(', ')}. Spójrz na wykres, aby odczytać przedziały!`;
};

export const findIntersections = (eq1, eq2, xMin = -10, xMax = 10, step = 0.05) => {
  if (!eq1 || !eq2 || eq1.includes('y') || eq2.includes('y')) return [];

  const diffEq = `(${eq1}) - (${eq2})`;
  const rootXs = findRootsNumerically(diffEq, xMin, xMax, step);

  return rootXs.map(x => {
    const y = Math.round(evaluateFunction(eq1, x) * 100) / 100;
    return [x, y];
  });
};

export const getFactoredForm = (expression, roots) => {
  if (!roots || roots.length === 0) return null;
  if (/(sin|cos|tan|cot|log|sqrt|abs)/.test(expression)) return null;

  let testX = 0;
  while (roots.some(r => Math.abs(r - testX) < 0.1)) {
    testX += 1;
  }

  const y = evaluateFunction(expression, testX);
  if (y === null || isNaN(y)) return null;

  let product = 1;
  roots.forEach(r => {
    product *= (testX - r);
  });

  if (Math.abs(product) < 0.0001) return null;

  let a = y / product;
  a = Math.round(a * 100) / 100;

  if (Math.abs(a) < 0.01 || Math.abs(a) > 100) return null;

  let factoredStr = a === 1 ? '' : (a === -1 ? '-' : `${a}`);

  roots.forEach(r => {
    if (r === 0) factoredStr += 'x';
    else if (r > 0) factoredStr += `(x - ${r})`;
    else factoredStr += `(x + ${Math.abs(r)})`;
  });

  return factoredStr;
};