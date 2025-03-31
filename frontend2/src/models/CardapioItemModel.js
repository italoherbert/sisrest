import axios from "axios";
import { BASE_URL } from "../constants/api-constants";

export class CardapioItemModel {

    async filtra( filterDescricao, token ) {
        return await axios.get( BASE_URL + "/cardapioitem/filter?descricao="+filterDescricao, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async get( itemId, token ) {
        return await axios.get( BASE_URL + "/cardapioitem/"+itemId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async novo( item, token ) {
        await axios.post( BASE_URL + "/cardapioitem", item, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async altera( itemId, item, token ) {
        await axios.put( BASE_URL + "/cardapioitem/"+itemId, item, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async deleta( itemId, token ) {
        await axios.delete( BASE_URL + "/cardapioitem/"+itemId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

}