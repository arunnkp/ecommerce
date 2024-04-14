// import data from "../data.js"

import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
import Rating from "../components/Rating.js";
import { hideLoading, showLoading } from '../utils.js';

const HomeScreen={
    render:async()=>{
        showLoading()
        // const {products}=data
        const response=await axios({
            url:'http://localhost:5000/api/products',
            headers:{
                'Content-Type':'application/json',
            },
        })
        hideLoading()
        if(!response||response.statusText!=='OK'){
            return `<div>Error in getting data</div>`
        }
        const products= response.data;

    return `
    <ul class="products">
    ${products.map((product)=>`
    <li>
    <div class="product">
        <a href="/#/product/${product._id}">
            <img src="${product.image}" alt="${product.name}">
        </a>
        <div class="product-name">
            <a href="/#/product/1">${product.name}</a>
        </div>
        <div class="product-rating">${Rating.render({
            value:product.rating,
            text:`${product.numReviews} reviews`,
        })}</div>
        <div class="product-brand">${product.brand}</div>
        <div class="product-price">Rs${product.price}</div>
    </div>
    </li>
    `).join('\n')}
    </ul>
    `
    },
    after_render:()=>{}
}
export default HomeScreen