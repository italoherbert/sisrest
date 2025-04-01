import axios from "axios";
import { SavePedido } from "./dtos/Pedido";
import { BASE_URL } from "@/constants/api-constants";

class PedidoModel {

    async novo( pedido: SavePedido, token : string ) {
        await axios.post( BASE_URL + "/pedido", pedido, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } )
    }

}

export default PedidoModel;