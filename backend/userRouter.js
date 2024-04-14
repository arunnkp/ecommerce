import express from "express";
import dbQueryFunction from "./database/dbQueryFunction.js"
import { generateToken,isAuth } from "./util.js";

const userRouter=express.Router()

userRouter.get('/select',(req,res)=>{
        dbQueryFunction.selectUser().then((response)=>{console.log(response);})
        .catch((error)=>{res.status(401).send({message:error.message})})
})
userRouter.post('/signin',async(req,res)=>{
         dbQueryFunction.findUser(req.body).then((response)=>{
                res.send({
                      id:response[0].id,
                      name:response[0].Name,
                      email:response[0].Email,
                      isAdmin:response[0].isAdmin,
                      token:generateToken(response),
                })
        })
        .catch((error)=>{res.status(401).send({message:error.message})})
})
userRouter.post('/register',async(req,res)=>{
        dbQueryFunction.createUser(req.body).then(()=>{
                dbQueryFunction.findUser(req.body).then((response)=>{
                        res.send({
                                id:response[0].id,
                                name:response[0].Name,
                                email:response[0].Email,
                                isAdmin:response[0].isAdmin,
                                token:generateToken(response),
                          })
                })
       })
       .catch((error)=>{res.status(401).send({message:error.message})})
})
userRouter.put('/:id',isAuth,async(req,res)=>{
        dbQueryFunction.searchUser(req.params).then((response)=>{
                let updateData={
                        id:response[0].id,
                        name:req.body.name||response[0].Name,
                        email:req.body.email||response[0].Email,
                        password:req.body.password||response[0].Password,
                        isAdmin:response[0].isAdmin,
                }
                dbQueryFunction.updateUser(updateData).then(()=>{
                        dbQueryFunction.searchUser(req.params).then((response)=>{
                                res.send({
                                        id:response[0].id,
                                        name:response[0].Name,
                                        email:response[0].Email,
                                        // password:response[0].Password,
                                        isAdmin:response[0].isAdmin,
                                        token:generateToken(response),
                                })
                        })
                })
        })
       .catch((error)=>{res.status(404).send({message:error.message})})
})

export default userRouter