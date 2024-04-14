import { getOrder, getPaypalClientId, payOrder } from "../api.js"
import { hideLoading, parseRequestUrl, reRender, showLoading, showMessage} from "../utils.js"

const addPayPalSdk=async(totalPrice)=>{
  const clientId=await getPaypalClientId()
  showLoading()
  if(!window.paypal){
    const script=document.createElement('script')
    script.type='text/javascript'
    script.src='https://www.paypalobjects.com/api/checkout.js'
    script.async=true
    script.onload=()=> handlePayment(clientId,totalPrice)
    document.body.appendChild(script)
  }else{
    handlePayment(clientId,totalPrice)
  }
}
const handlePayment=(clientId,totalPrice)=>{
  window.paypal.Button.render({
    env:'sandbox',
    client:{
      sandbox:clientId,
      production:'',
    },
    locale:'en_US',
    style:{
      size:'responsive',
      color:'gold',
      shape:'pill',
    },
    commit:true,
    payment(data,actions){
      return actions.payment.create({
        transactions:[
          {
            amount:{
              total:totalPrice,
              currency:'USD',
            },
          },
        ],
      })
    },
    onAuthorize(data,actions){
      return actions.payment.execute().then(async()=>{
        showLoading()
        await payOrder(parseRequestUrl().id,{
          orderID:data.orderID,
          payerID:data.payerID,
          paymentID:data.paymentID,
        })
        hideLoading()
        showMessage('Payment was successfull.',()=>{
          reRender(OrderScreen)
        })
      })
    }
  },'#paypal-button').then(()=>{
    hideLoading()
  })
}
const OrderScreen={
    after_render:async()=>{

    },
    render:async()=>{
        const request=parseRequestUrl()
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
        // let isDelivered,deliveredAt,isPaid,paidAt   
        const response=await getOrder(request.id)
        console.log('OrderScreen response',response);
        if(!response[0].isPaid){
          addPayPalSdk(response[0].TotalPrice)
        }
            return `
            <div><h1>Order ${response[0].orderId}</h1>
             <div class="order">
             <div class="order-info">
              <div>
               <h2>Shipping</h2>
               <div>
               ${response[0].Address},${response[0].City},${response[0].PostalCode},${response[0].Country}
               </div>
               ${
                response[0].isDelivered?`<div class="success">Delivered at${response[0].deliveredAt}</div>`:
                `<div class="error">Not Delivered</div>`
               }
               </div>
            <div><h2>Payment</h2>
              <div>Payment Method : ${response[0].Payment}</div>
              ${
                response[0].isPaid?`<div class="success">Paid at${response[0].paidAt}</div>`:
                `<div class="error">Not Paid</div>`
               }
            </div>
            <div>
             <ul class="cart-list-container">
             <li><h2>Shopping Cart</h2>
             <div>Price</div>
             </li>
                <li>
                 <div class="cart-image">
                 <img src="${response[0].Image}">
                 </div>
                 <div class="cart-name">
                  <div>
                  <a href="/#/product/${response[0].ProductId}">${response[0].ProductName}</a>
                 </div>
                 <div>Qty:${response[0].QTY}</div>
                 </div>
                 <div class="cart-price">Rs${response[0].Price}</div>
                </li>
             </ul>
            </div>
            </div>
            <div class="order-action">
             <ul>
              <li>
               <h2>Order Summary</h2>
              </li>
              <li><div>Items</div><div>Rs${response[0].ItemPrice}</div></li>
              <li><div>Shipping</div><div>Rs${response[0].ShippingPrice}</div></li>
              <li><div>Tax</div><div>Rs${response[0].TaxPrice}</div></li>
              <li><div class="total">Order Total</div><div>Rs${response[0].TotalPrice}</div></li>
              <li><div class="fw" id="paypal-button"></div></li>
             </ul>
            </div>
            </div>
            </div>
            `
    },
    
}
export default OrderScreen