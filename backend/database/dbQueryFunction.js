import dbconfig from "./dbconfig"

let dbQueryFunction={
    selectUser:(data)=>{
        return new Promise((resolve,reject)=>{
            let userData=data
            // console.log(userData[0].Email,userData[0].Password);
            let sql=`select * from user`
            dbconfig.query(sql,(err,result)=>{
            if(err){
              reject(err||{message:"DB error"})
            }
            resolve(result)
        })
        })
     },
     findUser:(data)=>{
        return new Promise((resolve,reject)=>{
            let userData=data
            let userEmail=userData.email
            let userPassword=userData.password;
            
            let sql=`select * from user where Email='${userEmail}' and Password='${userPassword}'`
            dbconfig.query(sql,(err,result)=>{
            if(err){
              reject(err)  
            }
            if(result.length!=0&&result[0].Email==userEmail&&result[0].Password==userPassword){
                resolve(result)
            }else{
                reject({message:"Invalid Email or Password"})
            }
        })
        })
     },
     createUser:(userData)=>{
        return new Promise((resolve,reject)=>{
            let sql=`insert into user(Name,Email,Password) values ('${userData.name}','${userData.email}','${userData.password}');`
            dbconfig.query(sql,(err,result)=>{
                if(err){
                    reject(err)  
                  }if(result.affectedRows==1){
                    resolve()
                    }else{
                        reject({message:"Invalid User Data"}) 
                    }
            })
        })
        
     },
     searchUser:(data)=>{
        return new Promise((resolve,reject)=>{
            let sql=`select * from user where id='${data.id}'`
            dbconfig.query(sql,(err,result)=>{
            if(err){
              reject(err)  
            }
            if(result.length!=0){
                resolve(result)
            }else{
                reject({message:"User Not Found"})
            }
        })
        })
     },
     updateUser:(data)=>{
        return new Promise((resolve,reject)=>{
            let sql=`update user set Name='${data.name}',Email='${data.email}',Password='${data.password}' where id='${data.id}'`
            dbconfig.query(sql,(err,result)=>{
                if(err){
                    reject(err)
                }
                if(result.affectedRows==1){resolve()}
            })
        })
     },
     createOrder:(order,user)=>{
        const ordItems=order.orderItems[0]
        const shipping=order.shipping
        // console.log('createOrder',shipping.address);
        return new Promise((resolve,reject)=>{
            let sql=`insert into order_details(ProductId,ProductName,Image,Price,CountInStock,QTY,
                Address,City,PostalCode,Country,Payment,ItemPrice,ShippingPrice,TaxPrice,TotalPrice,
                UserId,UserName,Email,iat) values ('${ordItems.product}','${ordItems.name}','${ordItems.image}',
                '${ordItems.price}','${ordItems.countInStock}','${ordItems.qty}','${shipping.address}','${shipping.city}','${shipping.postalCode}','${shipping.country}','${order.payment.paymentMethod}','${order.itemsPrice}','${order.shippingPrice}','${order.taxPrice}','${order.totalPrice}',
                '${user.id}','${user.name}','${user.email}','${user.iat}');`
                dbconfig.query(sql,(err,result)=>{
                    if(err){
                        reject(err)
                    }
                    // console.log('createOrder result',result);
                    if(result.affectedRows==1){
                        resolve(result.insertId)
                        }
                })
        })
     },
     searchOrder:(orderId)=>{
        return new Promise((resolve,reject)=>{
            let sql=`select * from order_details where orderId=${orderId}`
            dbconfig.query(sql,(err,result)=>{
                if(err){
                    reject(err)
                }
                resolve(result)
            })
        })
     },
     updateOrder:(orderId,orderDetails)=>{
        return new Promise((resolve,reject)=>{
            let sql=`UPDATE order_details set isPaid=true,paidAt=${Date.now()},
            Paypal_payerId='${orderDetails.payerID}',Paypal_paymentId='${orderDetails.paymentID}',
            Paypal_orderId='${orderDetails.orderID}' where orderId='${orderId}'`
            console.log('dbQueryFunction updateOrder',sql);
            dbconfig.query(sql,(err,result)=>{
                if(err){
                    reject(err)
                }
                console.log(result);
                resolve()
            })
        })
     },
     searchOrderUid:(id)=>{
        return new Promise((resolve,reject)=>{
            let sql=`select * from order_details where UserId=${id}`
            console.log('dbQueryFunction searchOrderUid',sql);
            dbconfig.query(sql,(err,result)=>{
                if(err){
                    reject(err)
                }
                resolve(result)
            })
        })
     },
}

 module.exports=dbQueryFunction