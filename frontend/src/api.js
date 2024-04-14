import { apiUrl } from "./config.js"
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
import { getUserInfo } from "./localStorage.js";
export const getProduct = async(id)=>{
    try {
        const response=await axios({
            url: `${apiUrl}/api/products/${id}`,
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        if (response.statusText!=='OK') {
            throw new Error(response.data.message)
        }
        return response.data
    } catch (error) {
       console.log(error); 
       return {error:error.response.data.message || error.message}
    }
}
export const signin=async({email,password})=>{
    try {
        const response=await axios({
            url:`${apiUrl}/api/users/signin`,
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            data:{
                email,
                password,
            },
        })
        if(response.statusText!=='OK'){
            throw new Error(response.data.message)
        }
        return response.data
    } catch (error) {
        console.log(error);
        return {error: error.response.data.message||error.message}
    }
}
export const register=async({name,email,password})=>{
    try {
        const response=await axios({
            url:`${apiUrl}/api/users/register`,
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            data:{
                name,
                email,
                password,
            },
        })
        if(response.statusText!=='OK'){
            throw new Error(response.data.message)
        }
        return response.data
    } catch (error) {
        console.log(error);
        return {error: error.response.data.message||error.message}
    }
}
export const update=async({name,email,password})=>{
    try {
        const {id,token}=getUserInfo()
        const response=await axios({
            url:`${apiUrl}/api/users/${id}`,
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${token}`,
            },
            data:{
                name,
                email,
                password,
            },
        })
        if(response.statusText!=='OK'){
            throw new Error(response.data.message)
        }
        return response.data
    } catch (error) {
        console.log(error);
        return {error: error.response.data.message||error.message}
    }
}
export const createOrder=async(order)=>{
    try {
        const {token}=getUserInfo()
        const response=await axios({
        url:`${apiUrl}/api/orders`,
        method:'POST',
        headers:{
            'ContentType':'application/json',
            Authorization:`Bearer ${token}`
        },
        data:order,
    })
    if(response.statusText!=='Created'){throw new Error(response.data.message)}
    return response.data
    } catch (error) {
        return {error:error.response?error.response.data.message:error.message}
    }
}
export const getOrder=async(id)=>{
    try {
        const {token}=getUserInfo()
        const response=await axios({
        url:`${apiUrl}/api/orders/${id}`,
        // method:'GET',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
    })
    console.log('api getOrder respone',response);
    if(response.statusText!=='OK'){
        throw new Error(response.data.message)
    }
    return response.data
    } catch (error) {
        return {error:error.message}
    }
}
export const getMyOrders=async()=>{
    try {
        const {token}=getUserInfo()
        const response=await axios({
        url:`${apiUrl}/api/orders/mine`,
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`,
        },
    })
    if(response.statusText!=='OK'){
        throw new Error(response.data.message)
    }
    return response.data
    } catch (error) {
        return {error:error.response?error.response.data.message:error.message}
    }
}
export const getPaypalClientId=async()=>{
    const response=await axios({
        url:`${apiUrl}/api/paypal/clientId`,
        headers:{
            'Content-Type':'application/json',
        },
    })
    if((response.statusText!=='OK')){
        throw new Error(response.data.message)
    }
    return response.data.clientId;
}
export const payOrder=async(orderId,paymentResult)=>{
    try {
        const {token}=getUserInfo()
        const response=await axios({
            url:`${apiUrl}/api/orders/${orderId}/pay`,
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
            data:paymentResult,
        })
        if(response.statusText!=='OK'){
            throw new Error(response.data.message)
        }
        return response.data
    } catch (error) {
        return {error:error.response?error.response.data.message:error.message}
    }
}