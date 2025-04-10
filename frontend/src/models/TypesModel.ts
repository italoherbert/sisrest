import { BASE_URL } from "@/constants/api-constants";
import axios, { AxiosResponse } from "axios";
import SelectOptionType from "./dtos/SelectOptionType";


class TypesModel {

    async getAtendidoTypes( token : string ) : Promise<AxiosResponse<SelectOptionType[]>> {
        return axios.get( BASE_URL + "/options/atendido", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    }

}

export default TypesModel;