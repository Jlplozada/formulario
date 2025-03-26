import { es_correo } from "./es_correo.js";

/**
 * Función para mostrar un mensaje de error en un campo de un formulario
 * @param {*} campo 
 * @param {*} mensaje 
 */
export const mostrar_error = (element, mensaje) => {  
  // Eliminamos el mensaje para evitar duplicados
  element.nextElementSibling?.remove();
  // Creamos un elemento span para mostrar el mensaje de error
  const mensaje_error = document.createElement("span");
  // Agregarmos un nodo de texto al span con el mensaje de error
  mensaje_error.textContent = mensaje;
  // Insertamos el mensaje después del elemento
  element.insertAdjacentElement("afterend", mensaje_error);
  // Agregamos una clase de error al elemento
  element.classList.add("form__input--error");
}

/**
 * Función para eliminar un mensaje de error de un campo de un formulario
 * @param {*} element 
 */
export const eliminar_error = (element) => {
  element.nextElementSibling?.remove();
  element.classList.remove("form__input--error");
}

/**
 * Realiza la validación de los campos de un formulario que tengan el atributo data-required
 * y retorna un objeto con los datos del formulario {campo: valor, campo: '', campo: array}
 * @param {HTMLFormElement} element
 * @returns {Object}
 */
export const validar_campos = (e) => {
  // Capturamos todos los campos del formulario que tengan el atributo data-required
  const campos = [...e.elements].filter((el) => {
    // Retornamos los campos que tengan el atributo data-required
    return [...el.attributes].some((attr) => {
      // Validamos que el atributo sea data-required
      return attr.name.startsWith("data-required");
    });
  });
  
  // Capturamos los campos de tipo radio
  const radios = [...campos].filter((el) => {
    return el.type === "radio";
  });

  
  // Creamos un objeto para almacenar los datos del formulario
  const obj = {};

  // Validamos que el campo radio tenga un valor seleccionado
  const campo_radio = radios.find((radio) => radio.checked) || [];  
  
  
  // Si no hay campos seleccionados, asignamos un valor vacío al campo
  if (campo_radio.length === 0) {
    obj[campo_radio.name] = "";
  } else { 
    obj[campo_radio.name] = campo_radio.value;
  }

  // Iteramos sobre los campos para validar que tengan datos
  campos.forEach((campo) => {
    // Validamos el tipo de campo
    switch (campo.tagName) {
      // Si el campo es un input de tipo text, email o password
      case "INPUT":        
        // Validamos que el campo sea de tipo text, password o number
        if (
          campo.type === "text" ||
          campo.type === "password" ||
          campo.type === "number"
        ) {
          // Si el campo está vacío
          if (campo.value === "") {
            // Mostramos un mensaje de error
            mostrar_error(campo, `El campo ${campo.name} es obligatorio`);
            // Retornamos false para indicar que el campo está vacío
            obj[campo.name] = "";
          } else {
            // Eliminamos el mensaje de error si el campo tiene datos
            eliminar_error(campo);
            // Si el campo tiene datos, se almacenan en el objeto
            obj[campo.name] = campo.value;
            // Removemos la clase de error del campo
            campo.classList.remove("form__input--error");
          }
        }
        // Validamos que es campo sea de tipo email
        if (campo.type === "email") {
          if (!es_correo(e, campo)) {
            // Asignamos un valor vacío al campo
            obj[campo.name] = "";
          } else {
            // Asignamos el valor del campo al objeto
            obj[campo.name] = campo.value;
          }
        }
        break;
      // Si el campo es un select
      case "SELECT":
        // Si el campo no tiene un valor seleccionado
        if (campo.selectedIndex === 0) {
          // Mostramos un mensaje de error
          mostrar_error(campo, `El campo ${campo.name} es obligatorio`);
          // Retornamos false para indicar que el campo está vacío
          obj[campo.name] = "";
        } else {
          // Eliminamos el mensaje de error si el campo tiene datos
          eliminar_error(campo);
          // Si el campo tiene un valor seleccionado, se almacena en el objeto
          obj[campo.name] = campo.value;
          // Removemos la clase de error del campo
          campo.classList.remove("form__input--error");
        }
        break;
    }
  });
  // Retornamos un objeto con los datos del formulario
  return obj;
};

/**
 * Función para validar que un objeto tenga valores
 * @param {*} obj 
 * @returns 
 */
export const tiene_valores = (obj) => { 
  // Validamos que todos los valores del objeto sean diferentes de vacío, null o indefinido
  return Object.values(obj).every(
  // Validamos que el valor sea diferente de vacío, null o indefinido
    (valor) => valor !== "" && valor !== null && valor !== undefined
  );
}