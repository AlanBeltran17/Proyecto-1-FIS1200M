const epsilon0 = 8.854e-12;
const k = 1 / (4 * Math.PI * epsilon0);

// --- Cambiar modo Fuerza ---
function toggleFuerzaModo() {
  const modo = document.getElementById("modoFuerza").value;
  document.getElementById("fuerzaEscalar").classList.toggle("oculto", modo !== "escalar");
  document.getElementById("fuerzaVectorial").classList.toggle("oculto", modo !== "vectorial");
  document.getElementById("resultadoFuerza").innerText = "";
  document.getElementById("vectorFuerza").innerText = "";
}

// --- Cambiar modo Campo ---
function toggleCampoModo() {
  const modo = document.getElementById("modoCampo").value;
  document.getElementById("campoEscalar").classList.toggle("oculto", modo !== "escalar");
  document.getElementById("campoVectorial").classList.toggle("oculto", modo !== "vectorial");
  document.getElementById("resultadoCampo").innerText = "";
  document.getElementById("vectorCampo").innerText = "";
}

// --- Fuerza Eléctrica ---
function calcularFuerza() {
  const modo = document.getElementById("modoFuerza").value;

  if (modo === "escalar") {
    const q1 = parseFloat(document.getElementById("q1").value);
    const q2 = parseFloat(document.getElementById("q2").value);
    const r = parseFloat(document.getElementById("r").value);

    if ([q1,q2,r].some(isNaN) || r === 0) {
      document.getElementById("resultadoFuerza").innerText = "⚠️ Ingresa valores válidos.";
      return;
    }

    const F = k * (q1 * q2) / (r * r);
    document.getElementById("resultadoFuerza").innerText = `|F| = ${F.toExponential(3)} N`;
    document.getElementById("vectorFuerza").innerText = "";
  }

  else { // Vectorial
    const q1 = parseFloat(document.getElementById("q1v").value);
    const q2 = parseFloat(document.getElementById("q2v").value);
    const x1 = parseFloat(document.getElementById("x1").value);
    const y1 = parseFloat(document.getElementById("y1").value);
    const z1 = parseFloat(document.getElementById("z1").value);
    const x2 = parseFloat(document.getElementById("x2").value);
    const y2 = parseFloat(document.getElementById("y2").value);
    const z2 = parseFloat(document.getElementById("z2").value);

    if ([q1,q2,x1,y1,z1,x2,y2,z2].some(isNaN)) {
      document.getElementById("resultadoFuerza").innerText = "⚠️ Ingresa todos los valores.";
      return;
    }

    const rx = x2 - x1, ry = y2 - y1, rz = z2 - z1;
    const r = Math.sqrt(rx**2 + ry**2 + rz**2);
    if (r === 0) return document.getElementById("resultadoFuerza").innerText = "⚠️ Las cargas no pueden coincidir.";

    const F = k * (q1 * q2) / (r * r);
    const Fx = F * (rx / r);
    const Fy = F * (ry / r);
    const Fz = F * (rz / r);

    document.getElementById("resultadoFuerza").innerText = `|F| = ${F.toExponential(3)} N`;
    document.getElementById("vectorFuerza").innerText = `→ F = (${Fx.toExponential(3)} i, ${Fy.toExponential(3)} j, ${Fz.toExponential(3)} k) N`;
  }
}

// --- Campo Eléctrico ---
function calcularCampo() {
  const modo = document.getElementById("modoCampo").value;

  if (modo === "escalar") {
    const q = parseFloat(document.getElementById("qCampo").value);
    const r = parseFloat(document.getElementById("rCampo").value);
    if ([q,r].some(isNaN) || r === 0) return document.getElementById("resultadoCampo").innerText = "⚠️ Ingresa valores válidos.";

    const E = k * q / (r * r);
    document.getElementById("resultadoCampo").innerText = `|E| = ${E.toExponential(3)} N/C`;
    document.getElementById("vectorCampo").innerText = "";
  }

  else { // Vectorial
    const q = parseFloat(document.getElementById("qVec").value);
    const xq = parseFloat(document.getElementById("xq").value);
    const yq = parseFloat(document.getElementById("yq").value);
    const zq = parseFloat(document.getElementById("zq").value);
    const xp = parseFloat(document.getElementById("xp").value);
    const yp = parseFloat(document.getElementById("yp").value);
    const zp = parseFloat(document.getElementById("zp").value);

    if ([q,xq,yq,zq,xp,yp,zp].some(isNaN)) {
      document.getElementById("resultadoCampo").innerText = "⚠️ Ingresa todos los valores.";
      return;
    }

    const rx = xp - xq, ry = yp - yq, rz = zp - zq;
    const r = Math.sqrt(rx**2 + ry**2 + rz**2);
    if (r === 0) return document.getElementById("resultadoCampo").innerText = "⚠️ El punto no puede coincidir con la carga.";

    const E = k * q / (r * r);
    const Ex = E * (rx / r);
    const Ey = E * (ry / r);
    const Ez = E * (rz / r);

    document.getElementById("resultadoCampo").innerText = `|E| = ${E.toExponential(3)} N/C`;
    document.getElementById("vectorCampo").innerText = `→ E = (${Ex.toExponential(3)} i, ${Ey.toExponential(3)} j, ${Ez.toExponential(3)} k) N/C`;
  }
}

// --- Potencial ---
function calcularPotencial() {
  const q = parseFloat(document.getElementById("qPotencial").value);
  const r = parseFloat(document.getElementById("rPotencial").value);
  if ([q,r].some(isNaN) || r === 0) return document.getElementById("resultadoPotencial").innerText = "⚠️ Ingresa valores válidos.";

  const V = k * q / r;
  document.getElementById("resultadoPotencial").innerText = `V = ${V.toExponential(3)} V`;
}

// --- Ley de Gauss ---
function calcularGauss() {
  const Q = parseFloat(document.getElementById("qGauss").value);
  if (isNaN(Q)) return document.getElementById("resultadoGauss").innerText = "⚠️ Ingresa un valor válido.";
  const phi = Q / epsilon0;
  document.getElementById("resultadoGauss").innerText = `Φ = ${phi.toExponential(3)} N·m²/C`;
}
