import axios from "axios";
import { BASE_URL } from "../constants/api-constants";

export class LoginModel {

    async login( loginObj ) {
        return await axios.post( BASE_URL + '/login', loginObj );
    }

}