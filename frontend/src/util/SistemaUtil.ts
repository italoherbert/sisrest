import ErrorResponse from "@/models/dtos/ErrorResponse";
import axios, { AxiosError } from "axios";

export const extractErrorMessage = ( error : unknown ) => {
    if ( axios.isAxiosError( error ) ) {
        const err = error as AxiosError;
        if ( err.response ) {
            const data = err.response.data as ErrorResponse;
            return data.mensagem;
        }
    }    
    return "Não foi possível conectar com o sistema.";    
};