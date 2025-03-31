import axios from "axios";
import { BASE_URL } from "../constants/api-constants";
import CardapioItem from "./dtos/CardapioItem";

export class CardapioItemModel {

    async filtra( filterDescricao : string, token : string ) {
        return await axios.get( BASE_URL + "/cardapioitem/filter?descricao="+filterDescricao, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async get( itemId : number, token : string ) {
        return await axios.get( BASE_URL + "/cardapioitem/"+itemId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async novo( item : CardapioItem, token : string ) {
        await axios.post( BASE_URL + "/cardapioitem", item, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async altera( itemId : number, item : CardapioItem, token : string ) {
        await axios.put( BASE_URL + "/cardapioitem/"+itemId, item, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async deleta( itemId : number, token : string ) {
        await axios.delete( BASE_URL + "/cardapioitem/"+itemId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

}