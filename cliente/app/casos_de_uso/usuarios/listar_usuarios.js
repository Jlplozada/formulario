export const listar_usuarios = async()=>{
    try {
        const envio =await fetch("http://127.0.0.1:3000/usuarios");
        const respuesta=await envio.json();
        return respuesta;
    } catch (error) {
        console.error(error)
    }
}
