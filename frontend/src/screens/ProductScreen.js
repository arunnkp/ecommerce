import { getProduct } from "../api.js";
import Rating from "../components/Rating.js";
import { hideLoading, parseRequestUrl, showLoading } from "../utils.js";

const ProductScreen={
    after_render:()=>{
        const request=parseRequestUrl()
        document.getElementById('add-button').addEventListener('click',()=>{
            document.location.hash=`/cart/${request.id}`
        })
    },
    render:async()=>{
       const request=parseRequestUrl()
       showLoading()
       const product=await getProduct(request.id)
       if(product.error){
        return `<div>${product.error}</div>`
       }
       hideLoading()
       return `<div>
        <div class="content">
         <div class="back-to-result">
          <a href="/#/">Back To Result</a>
         </div>
         <div class="details">
         <div class="details-image">
          <img src="${product.image}">
         </div>
         <div class="details-info">
          <ul>
           <li><h1>${product.name}</h1></li>
           <li>${Rating.render({value:product.rating,text:`${product.numReviews}`})}</li>
           <li>Price: <strong>Rs${product.price}</strong></li>
           <li>Description:<div>${product.description}</div></li>
          </ul>
         </div>
          <div class="details-action">
           <ul>
            <li>Price Rs${product.price}</li>
            <li>Status : ${product.countInStock>0?`<span class="success">In Stock</span>`:`<span class="error">Unavailable</span>`}</li>
            <li><button id="add-button" class="fw primary">Add To Cart</button></li>
           </ul>
          </div>
         </div>
        </div>`
    //    </div>`
    },
}
export default ProductScreen    