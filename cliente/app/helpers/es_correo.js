import { eliminar_error, mostrar_error } from "./validar_formulario.js";

export const es_correo = (event, element) => { 
  // Declaramos la variable para asignar el elemento
  let elemento = element;
  // Validamos si el evento es de tipo blur
  if (event.type === "blur") {
    // Asignamos el elemento que disparo el evento
    elemento = event.target;
  } else {
    // Asignamos el elemento que se recibe por parametro
    elemento = element;
  }
  // Obtenemos el valor del campo
  const email = elemento.value;
  const mensaje = "Ingrese un correo válido";
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Validamos si el campo es un correo válido
  if (!regexEmail.test(email)) {
    // Mostramos un mensaje de error
    mostrar_error(elemento, mensaje);
    return false;
  } else {
    // Eliminamos el mensaje de error
    eliminar_error(elemento);
    return true;
  }
};