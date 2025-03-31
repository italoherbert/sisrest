import axios from "axios";
import { BASE_URL } from "../constants/api-constants";
import { Login } from "./dtos/Login";

export class LoginModel {

    async login( loginObj : Login ) {
        return await axios.post( BASE_URL + '/login', loginObj );
    }

}