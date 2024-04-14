import { getOrder } from "../api.js"
import { parseRequestUrl} from "../utils.js"

const OrderScreen={
    after_render:async()=>{

    },
    render:async()=>{
        console.log('OrderScreen before parseRequestUrl',)
        const request=parseRequestUrl()
        console.log('OrderScreen ater parseRequestUrl, request',request);
        // const {
        //     id,
        //     shipping,
        //     payment,
        //     orderItems,
        //     itemsPrice,
        //     shippingPrice,
        //     taxPrice,
        //     totalPrice,
        // }=await getOrder(request.id)
        let response=await getOrder(request.id)
        console.log('orderscreen getOrderRequest',getOrderRequest);
            // return `
            // <div><h1>Order ${id}</h1>
            //  <div class="order">
            //  <div class="order-info">
            //   <div>
            //    <h2>Shipping</h2>
            //    <div>
            //    ${shipping.address},${shipping.city},${shipping.postalCode},${shipping.country}
            //    </div>
            //    </div>
            // <div><h2>Payment</h2>
            //   <div>Payment Method : ${payment.paymentMethod}</div>
            // </div>
            // <div>
            //  <ul class="cart-list-container">
            //  <li><h2>Shopping Cart</h2>
            //  <div>Price</div>
            //  </li>
            //  ${orderItems.map((item)=>`
            //     <li>
            //      <div class="cart-image">
            //      <img src="${item.image}">
            //      </div>
            //      <div class="cart-name">
            //       <div>
            //       <a href="/#/product/${item.product}">${item.name}</a>
            //      </div>
            //      <div>Qty:${item.qty}</div>
            //      </div>
            //      <div class="cart-price">Rs${item.price}</div>
            //     </li>
            //  `)}
            //  </ul>
            // </div>
            // </div>
            // <div class="order-action">
            //  <ul>
            //   <li>
            //    <h2>Order Summary</h2>
            //   </li>
            //   <li><div>Items</div><div>Rs${itemsPrice}</div></li>
            //   <li><div>Shipping</div><div>Rs${shippingPrice}</div></li>
            //   <li><div>Tax</div><div>Rs${taxPrice}</div></li>
            //   <li><div class="total">Order Total</div><div>Rs${totalPrice}</div></li>
            //  </ul>
            // </div>
            // </div>
            // </div>
            // `
    },
    
}
export default OrderScreen