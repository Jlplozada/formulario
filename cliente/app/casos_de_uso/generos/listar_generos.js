/**
 * Función para cargar los generos de la base de datos
 * @module app/casos_de_uso/generos/listar_generos
 * @returns 
 */
export const listarGeneros = async () => {
  try {
    const response = await fetch("http://127.0.0.1:3000/generos");
    const generos = await response.json();
    return generos;
  } catch (error) {
    console.error(error);
  }
};