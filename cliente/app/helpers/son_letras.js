export const son_letras = (event) => { 
  // Permitir teclas especiales (Backspace, Delete, Tab, Enter, Flechas, Barra espaciadora.)
  if (
    event.key === "Backspace" ||
    event.key === "Delete" ||
    event.key === "Tab" ||
    event.key === "Enter" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.key === " "
  ) {
    return;
  }
  // Bloquear caracteres que no sean letras (A-Z, a-z)
  if (!/^[A-Za-z]$/.test(event.key)) {
    // Evita que se escriba el carácter no permitido
    event.preventDefault();
    return false;
  }else{
    return true;
  }
};