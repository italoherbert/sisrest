
export const extractErrorMessage = ( error ) => {
    if ( error.response ) {
        return error.response.data.mensagem;
    } else {
        return "Não foi possível conectar com o sistema.";
    }
};