import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../constants/api-constants";
import { CardapioItem, SaveCardapioItem } from "./dtos/CardapioItem";

export class CardapioItemModel {

    async filtra( filterDescricao : string, token : string ) : Promise<AxiosResponse<CardapioItem[]>> { 
        return await axios.get( BASE_URL + "/cardapioitem/filter?descricao="+filterDescricao, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async get( itemId : number, token : string ): Promise<AxiosResponse<CardapioItem>> {
        return await axios.get( BASE_URL + "/cardapioitem/"+itemId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async novo( item : SaveCardapioItem, token : string ) {
        await axios.post( BASE_URL + "/cardapioitem", item, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

    async altera( itemId : number, item : SaveCardapioItem, token : string ) {
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