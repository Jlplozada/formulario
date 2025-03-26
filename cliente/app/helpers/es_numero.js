export const es_numero = (event) => {
  // Permitir teclas especiales (Backspace, Delete, Tab, Enter, Flechas, etc.)
  if (
    event.key === "Backspace" ||
    event.key === "Delete" ||
    event.key === "Tab" ||
    event.key === "Enter" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight"
  ) {
    return;
  }
  // Bloquear caracteres que no sean números (0-9)
  if (!/^\d$/.test(event.key)) {
    // Evita que se escriba el carácter no permitido
    event.preventDefault();
    return false;
  }else{
    return true;
  }
};