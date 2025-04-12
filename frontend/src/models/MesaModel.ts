import { BASE_URL } from "@/constants/api-constants";
import axios from "axios";


class MesaModel {

    async atendeMesa( mesa : number, token : string ) {
        await axios.post( BASE_URL + "/mesa/atendeMesa/"+mesa, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } 

}

export default MesaModel;