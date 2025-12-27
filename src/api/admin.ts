import {$get} from "../utils/request.ts";

export const $Login = async (params: object) => {
    let ret = $get('/login', params);
    console.log(ret)
    console.log(params)
}
