// script.js

// Variables globales
const menuHamburguesa = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.navbar .menu');
const articulosContainer = document.querySelector('.articulos-container');
const buscador = document.querySelector('.buscador');
const filtroBtn = document.querySelector('.filtro-btn');
let articulos = [];
let paginaActual = 1;
const articulosPorPagina = 12;

// Función para cargar datos desde el archivo JSON
async function cargarDatos() {
  try {
    const response = await fetch('data.json'); // Asegúrate de que el archivo esté en la misma carpeta
    if (!response.ok) {
      throw new Error(`Error al cargar los datos: ${response.status}`);
    }
    articulos = await response.json();
    mostrarArticulos(articulos);
  } catch (error) {
    console.error(error.message);
    articulosContainer.innerHTML = '<p>Error al cargar el catálogo. Por favor, verifica la consola.</p>';
  }
}

// Función para mostrar artículos en la página
function mostrarArticulos(listaArticulos) {
  const inicio = (paginaActual - 1) * articulosPorPagina;
  const fin = inicio + articulosPorPagina;
  const articulosPagina = listaArticulos.slice(inicio, fin);

  articulosContainer.innerHTML = ''; // Limpiar el contenedor

  if (articulosPagina.length === 0) {
    articulosContainer.innerHTML = '<p>No hay artículos disponibles.</p>';
    return;
  }

  articulosPagina.forEach(articulo => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${articulo.imagen}" alt="${articulo.nombre}">
      <h3>${articulo.nombre}</h3>
      <p>${articulo.descripcion}</p>
      <p class="precio">${articulo.precio}</p>
      <button class="btn-ver-mas">Ver más</button>
    `;
    articulosContainer.appendChild(card);
  });

  actualizarPaginacion(listaArticulos);
}

// Función para actualizar la paginación
function actualizarPaginacion(listaArticulos) {
  const totalPaginas = Math.ceil(listaArticulos.length / articulosPorPagina);
  const btnAnterior = document.querySelector('.btn-anterior');
  const btnSiguiente = document.querySelector('.btn-siguiente');

  btnAnterior.disabled = paginaActual === 1;
  btnSiguiente.disabled = paginaActual === totalPaginas;

  btnAnterior.onclick = () => {
    if (paginaActual > 1) {
      paginaActual--;
      mostrarArticulos(articulos);
    }
  };

  btnSiguiente.onclick = () => {
    if (paginaActual < totalPaginas) {
      paginaActual++;
      mostrarArticulos(articulos);
    }
  };
}

// Función para filtrar por nombre
buscador.addEventListener('input', () => {
  const filtroNombre = buscador.value.toLowerCase();
  const articulosFiltrados = articulos.filter(articulo =>
    articulo.nombre.toLowerCase().includes(filtroNombre)
  );
  paginaActual = 1; // Reiniciar la paginación
  mostrarArticulos(articulosFiltrados);
});

// Función para filtrar por categoría (simulada con un alert)
filtroBtn.addEventListener('click', () => {
  alert('Aquí puedes agregar la lógica para filtrar por categoría.');
});

// Mostrar/Ocultar menú hamburguesa
menuHamburguesa.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarDatos();
});
