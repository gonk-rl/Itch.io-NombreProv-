// Datos de prueba (reemplazar luego por la consulta al backend)
const CATEGORIAS = ['Acción', 'Aventura', 'Plataformas', 'Puzzle', 'Terror', 'Rol', 'Estrategia', 'Simulación', 'Novela visual', 'Carreras', 'Deportes', 'Arcade'];

const JUEGOS = [
  { id: 1, titulo: 'Juego uno', autor: 'Estudio A', categorias: ['Acción', 'Arcade'], imagen: '', destacado: true },
  { id: 2, titulo: 'Juego dos', autor: 'Estudio B', categorias: ['Aventura', 'Rol'], imagen: '', destacado: true },
  { id: 3, titulo: 'Juego tres', autor: 'Estudio C', categorias: ['Puzzle'], imagen: '', destacado: true },
  { id: 4, titulo: 'Juego cuatro', autor: 'Estudio A', categorias: ['Terror', 'Aventura'], imagen: '', destacado: true },
  { id: 5, titulo: 'Juego cinco', autor: 'Estudio D', categorias: ['Plataformas', 'Arcade'], imagen: '', destacado: true },
  { id: 6, titulo: 'Juego seis', autor: 'Estudio E', categorias: ['Estrategia', 'Simulación'], imagen: '', destacado: true },
  { id: 7, titulo: 'Juego siete', autor: 'Estudio F', categorias: ['Carreras', 'Deportes'], imagen: '', destacado: true },
  { id: 8, titulo: 'Juego ocho', autor: 'Estudio B', categorias: ['Novela visual'], imagen: '', destacado: true },
  { id: 9, titulo: 'Juego nueve', autor: 'Estudio G', categorias: ['Rol', 'Acción'], imagen: '', destacado: true },
  { id: 10, titulo: 'Juego diez', autor: 'Estudio C', categorias: ['Simulación'], imagen: '', nuevo: true },
  { id: 11, titulo: 'Juego once', autor: 'Estudio H', categorias: ['Puzzle', 'Plataformas'], imagen: '', nuevo: true },
  { id: 12, titulo: 'Juego doce', autor: 'Estudio D', categorias: ['Terror'], imagen: '', nuevo: true },
  { id: 13, titulo: 'Juego 13', autor: 'Estudio D', categorias: ['Terror'], imagen: '', nuevo: true },
  { id: 14, titulo: 'Juego 14', autor: 'Estudio D', categorias: ['Terror'], imagen: '', nuevo: true },
  { id: 15, titulo: 'Juego 15', autor: 'Estudio D', categorias: ['Terror'], imagen: '', nuevo: true },
  { id: 16, titulo: 'Juego 16', autor: 'Estudio D', categorias: ['Terror'], imagen: '', nuevo: true },
  { id: 17, titulo: 'Juego 17', autor: 'Estudio D', categorias: ['Terror'], imagen: '', nuevo: true },
  { id: 18, titulo: 'Juego 18', autor: 'Estudio D', categorias: ['Terror'], imagen: '', nuevo: true },
  { id: 19, titulo: 'Juego 19', autor: 'Estudio S', categorias: ['Terror','Arcade','Acción'], imagen: '', recomendado: true },
  { id: 20, titulo: 'Juego 20', autor: 'Estudio S', categorias: ['Terror','Arcade','Acción'], imagen: '', recomendado: true },
  { id: 21, titulo: 'Juego 21', autor: 'Estudio S', categorias: ['Terror','Arcade','Acción'], imagen: '', recomendado: true },
  { id: 22, titulo: 'Juego 22', autor: 'Estudio S', categorias: ['Terror','Arcade','Acción'], imagen: '', recomendado: true },
  { id: 23, titulo: 'Juego 23', autor: 'Estudio S', categorias: ['Terror','Arcade','Acción'], imagen: '', recomendado: true },
  { id: 24, titulo: 'Juego 24', autor: 'Estudio S', categorias: ['Terror','Arcade','Acción'], imagen: '', recomendado: true },
  { id: 25, titulo: 'Juego 25', autor: 'Estudio S', categorias: ['Terror','Arcade','Acción'], imagen: '', recomendado: true },
  { id: 26, titulo: 'Juego 26', autor: 'Estudio S', categorias: ['Terror','Arcade','Acción'], imagen: '', recomendado: true },
  { id: 27, titulo: 'Juego 27', autor: 'Estudio S', categorias: ['Terror','Arcade','Acción'], imagen: '', recomendado: true }
];

// Secciones del home: para agregar una, sumar una línea acá.
//   id:     identificador único (se usa en el HTML para accesibilidad)
//   titulo: texto del encabezado
//   filtro: función que decide qué juegos entran
//   limite: (opcional) máximo de juegos a mostrar
const SECCIONES = [
  { id: 'destacados', titulo: 'Destacados', filtro: j => j.destacado },
  { id: 'nuevos', titulo: 'Nuevos', filtro: j => j.nuevo},
  { id: 'recomendados', titulo:'Recomendados',filtro: j => j.recomendado}
  // Ejemplo:
  // { id: 'terror', titulo: 'Terror', filtro: j => j.categorias.includes('Terror'), limite: 6 }
];

// Acceso a datos (punto de conexión con el backend)
async function obtenerJuegos() {
  return JUEGOS;
}

// Utilidades
function esc(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// Render de cards
function crearCard(juego) {
  const portada = juego.imagen
    ? `<img class="game-card__image" src="${esc(juego.imagen)}" alt="">`
    : '';
  return `
    <a class="game-card" href="juego.html?id=${juego.id}">
      <div class="game-card__cover">${portada}</div>
      <div class="game-card__body">
        <h3 class="game-card__title">${esc(juego.titulo)}</h3>
        <p class="game-card__author">${esc(juego.autor)}</p>
        <div class="game-card__footer">
          <span class="tag">${esc(juego.categorias[0])}</span>
          <span class="tag tag--free">Gratis</span>
        </div>
      </div>
    </a>`;
}

// Render de secciones (generadas a partir de SECCIONES)
function crearSeccion(seccion, juegos) {
  let lista = juegos.filter(seccion.filtro);
  if (seccion.limite) lista = lista.slice(0, seccion.limite);
  if (!lista.length) return ''; // no mostrar secciones vacías

  return `
    <section class="section" aria-labelledby="titulo-${esc(seccion.id)}">
      <h2 class="section__title" id="titulo-${esc(seccion.id)}">${esc(seccion.titulo)}</h2>
      <div class="game-grid">${lista.map(crearCard).join('')}</div>
    </section>`;
}

function renderizarSecciones(juegos) {
  document.getElementById('home').innerHTML =
    SECCIONES.map(s => crearSeccion(s, juegos)).join('');
}

// Paneles flotantes
const backdrop = document.getElementById('backdrop');
const botonesPanel = document.querySelectorAll('[data-panel-target]');
let panelActivo = null;

function cerrarPanel() {
  if (!panelActivo) return;
  panelActivo.classList.remove('panel--open');
  panelActivo.setAttribute('aria-hidden', 'true');
  panelActivo = null;
  backdrop.classList.remove('backdrop--visible');
  botonesPanel.forEach(b => b.setAttribute('aria-expanded', 'false'));
}

function abrirPanel(id) {
  const panel = document.getElementById(id);
  if (panelActivo === panel) return cerrarPanel();
  cerrarPanel();
  panelActivo = panel;
  panel.classList.add('panel--open');
  panel.setAttribute('aria-hidden', 'false');
  backdrop.classList.add('backdrop--visible');
  botonesPanel.forEach(b => b.setAttribute('aria-expanded', String(b.dataset.panelTarget === id && b.classList.contains('sidebar__btn'))));
  const campo = panel.querySelector('input');
  if (campo) campo.focus();
}

botonesPanel.forEach(b => b.addEventListener('click', () => abrirPanel(b.dataset.panelTarget)));
backdrop.addEventListener('click', cerrarPanel);
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarPanel(); });

// Categorias
const listaCategorias = document.getElementById('lista-categorias');
const contador = document.getElementById('contador-juegos');
const btnExplorar = document.getElementById('btn-explorar');
const seleccionadas = new Set();

function actualizarContador() {
  const cantidad = JUEGOS.filter(j => [...seleccionadas].every(c => j.categorias.includes(c))).length;
  contador.textContent = cantidad;
  const query = [...seleccionadas].join(',');
  btnExplorar.href = query ? `explorar.html?categorias=${encodeURIComponent(query)}` : 'explorar.html';
}

function renderizarCategorias() {
  listaCategorias.innerHTML = CATEGORIAS.map(c =>
    `<button class="category-list__item" type="button" aria-pressed="false">${esc(c)}</button>`).join('');
  listaCategorias.querySelectorAll('button').forEach(boton => {
    boton.addEventListener('click', () => {
      const nombre = boton.textContent;
      const activa = seleccionadas.has(nombre);
      activa ? seleccionadas.delete(nombre) : seleccionadas.add(nombre);
      boton.setAttribute('aria-pressed', String(!activa));
      actualizarContador();
    });
  });
  actualizarContador();
}

// Buscador
const inputBusqueda = document.getElementById('input-busqueda');
const resultados = document.getElementById('resultados');
const tituloResultados = document.getElementById('titulo-resultados');

function crearResultado(juego) {
  return `
    <li>
      <a class="result" href="juego.html?id=${juego.id}">
        <span class="result__thumb"></span>
        <span class="result__info">
          <span class="result__title">${esc(juego.titulo)}</span>
          <span class="result__meta">${esc(juego.autor)} - ${esc(juego.categorias.join(', '))}</span>
        </span>
        <span class="tag tag--free">Gratis</span>
      </a>
    </li>`;
}

inputBusqueda.addEventListener('input', () => {
  const texto = inputBusqueda.value.trim().toLowerCase();
  if (!texto) {
    resultados.innerHTML = '';
    tituloResultados.textContent = 'Escribí para buscar';
    return;
  }
  const encontrados = JUEGOS.filter(j =>
    [j.titulo, j.autor, ...j.categorias].some(campo => campo.toLowerCase().includes(texto))).slice(0, 6);
  tituloResultados.textContent = 'Resultados de la búsqueda';
  resultados.innerHTML = encontrados.length
    ? encontrados.map(crearResultado).join('')
    : '<li class="search-results__empty">No encontramos juegos con ese nombre.</li>';
});

// Configuracion
const enlacesConfig = document.querySelectorAll('.settings__link');
const seccionesConfig = document.querySelectorAll('.settings__section');
const inputConfig = document.getElementById('input-config');
const ajustes = document.querySelectorAll('.setting');

function mostrarSeccion(nombre) {
  enlacesConfig.forEach(l => l.setAttribute('aria-current', String(l.dataset.seccion === nombre)));
  seccionesConfig.forEach(s => { s.hidden = s.dataset.seccion !== nombre; });
}

enlacesConfig.forEach(l => l.addEventListener('click', () => {
  inputConfig.value = '';
  ajustes.forEach(a => { a.hidden = false; });
  mostrarSeccion(l.dataset.seccion);
}));

inputConfig.addEventListener('input', () => {
  const texto = inputConfig.value.trim().toLowerCase();
  if (!texto) {
    ajustes.forEach(a => { a.hidden = false; });
    return mostrarSeccion(document.querySelector('.settings__link[aria-current="true"]').dataset.seccion);
  }
  seccionesConfig.forEach(s => { s.hidden = false; });
  ajustes.forEach(a => { a.hidden = !a.textContent.toLowerCase().includes(texto); });
});

document.getElementById('cfg-animaciones').addEventListener('change', e => {
  document.documentElement.classList.toggle('reduce-motion', e.target.checked);
});

// Usuario (sesión de prueba: cambiar el valor para ver ambos estados)
let sesionIniciada = false;
const menuUsuario = document.getElementById('menu-usuario');
const menuInvitado = document.getElementById('menu-invitado');

function actualizarUsuario() {
  menuUsuario.hidden = !sesionIniciada;
  menuInvitado.hidden = sesionIniciada;
}

document.querySelectorAll('[data-accion]').forEach(b => b.addEventListener('click', () => {
  sesionIniciada = b.dataset.accion === 'iniciar-sesion';
  actualizarUsuario();
}));

// Inicio
obtenerJuegos().then(renderizarSecciones);
renderizarCategorias();
actualizarUsuario();
