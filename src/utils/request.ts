import axios from "axios";
import { baseURL } from "../config/baseURL";

// 初始化axios对象
const instance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
});

// get请求
export const  $get=async(url:string,params:object={})=>{
    let {data}=await instance.get(url,params);
    return data;
}

//post请求
export const  $post=async(url:string,params:object={})=>{
    let {data}=await instance.post(url,params);
    return data;
}
