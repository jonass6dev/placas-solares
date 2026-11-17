const pasos = document.querySelectorAll('.paso');
const botonesPaso = document.querySelectorAll('.paso-btn');
const barra = document.querySelector('.progreso-barra');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');

let actual = 0;

function mostrarPaso(indice) {
  actual = Math.max(0, Math.min(indice, pasos.length - 1));

  pasos.forEach((paso, i) => { paso.hidden = i !== actual; });

  botonesPaso.forEach((btn, i) => {
    btn.classList.toggle('activo', i === actual);
    btn.classList.toggle('hecho', i < actual);
    if (i === actual) btn.setAttribute('aria-current', 'step');
    else btn.removeAttribute('aria-current');
  });

  barra.style.width = ((actual + 1) / pasos.length) * 100 + '%';
  btnAnterior.disabled = actual === 0;
  btnSiguiente.textContent = actual === pasos.length - 1 ? 'Volver al inicio ↺' : 'Siguiente →';
}

btnAnterior.addEventListener('click', () => mostrarPaso(actual - 1));
btnSiguiente.addEventListener('click', () => {
  mostrarPaso(actual === pasos.length - 1 ? 0 : actual + 1);
});
botonesPaso.forEach((btn) => {
  btn.addEventListener('click', () => mostrarPaso(Number(btn.dataset.paso)));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') mostrarPaso(actual + 1);
  if (e.key === 'ArrowLeft') mostrarPaso(actual - 1);
});

mostrarPaso(0);
