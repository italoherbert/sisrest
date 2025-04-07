import axios, { AxiosResponse } from "axios";
import { Pedido, SavePedido } from "./dtos/Pedido";
import { BASE_URL } from "@/constants/api-constants";

class PedidoModel {

    async novo( pedido: SavePedido, token : string ) {
        await axios.post( BASE_URL + "/pedido", pedido, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async altera( pedidoId : number, pedido : SavePedido, token : string ) {
        await axios.put( BASE_URL + "/pedido/"+pedidoId, pedido, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );        
    }

    async setAtendido( pedidoId : number, atendido : boolean, token : string ) {
        await axios.post( BASE_URL + "/pedido/set-atendido/"+pedidoId, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                atendido: atendido
            }
        } )
    }

    async listar( token : string ) : Promise<AxiosResponse<Pedido[]>> {
        return await axios.get( BASE_URL + "/pedido/list", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async listarPorMesa( mesa : number, token : string ) : Promise<AxiosResponse<Pedido[]>> {
        return await axios.get( BASE_URL + "/pedido/listByMesa/"+mesa, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async get( pedidoId : number, token : string ) : Promise<AxiosResponse<Pedido>> {
        return await axios.get( BASE_URL + "/pedido/"+pedidoId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async delete( pedidoId : number, token : string ) {
        await axios.delete( BASE_URL + "/pedido/"+pedidoId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

}

export default PedidoModel;