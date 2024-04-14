import express from "express"
import { isAuth } from "./util.js"
import dbQueryFunction from "./database/dbQueryFunction.js"
const orderRouter=express.Router()

orderRouter.get('/mine',isAuth,async(req,res)=>{
    console.log('orderRouter mine',req.body);
    let userId=5
    dbQueryFunction.searchOrderUid(userId).then((searchOrderUid)=>{
        console.log(searchOrderUid);
        res.send(searchOrderUid)
    })  
})
orderRouter.get('/:id',(req,res)=>{
    dbQueryFunction.searchOrder(req.params.id).then((order)=>{
        console.log('get order',order);
            res.send(order)
    }).catch((err)=>{
        res.status(404).send({message:"Order Not Found"})
    })
})
orderRouter.post('/',isAuth,(req,res)=>{
    // console.log('orderRouter req-body',req.body);
    // console.log('orderRouter req-user',req.user);
    dbQueryFunction.createOrder(req.body,req.user).then((orderId)=>{
        dbQueryFunction.searchOrder(orderId).then((createdOrder)=>{
            // console.log('searchOrder createdOrder',createdOrder);
        // res.status(201).send({message:'New Order Created',order:createdOrder[0].orderId})
        res.status(201).send({message:'New Order Created',order:createdOrder[0]})
        })
    })
    // res.status(201).send({message:'New Order Created',order:createdOrder})
})
orderRouter.put('/:id/pay',isAuth,async(req,res)=>{
    let {payerID,paymentID,orderID}=req.body
    let payPalDetails={payerID,paymentID,orderID}
    dbQueryFunction.updateOrder(req.params.id,payPalDetails).then(()=>{
        dbQueryFunction.searchOrder(req.params.id).then((searchOrder)=>{
            res.send({message:'Order Paid',order:searchOrder[0]})
        }).catch(()=>{
                res.status(404).send({message:'Order Not Found.'})
        })
    })
})

export default orderRouter