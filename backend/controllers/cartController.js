import userModel from "../models/userModel.js";

//add item to user cart
const addToCart = async (req,res) =>{
    try{
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        
    } catch (error){

    }
}

//remove item from user cart
const removeFromCart = async (req,res) =>{

}

//fetch user cart data
const getCart = async (req,res) =>{

}

export {addToCart,removeFromCart,getCart}