const userModels=require('../models/userModels')

// add item into cart
const addToCart = async (req,res) =>{
    try {
        let userData=await userModels.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId] +=1;
        }
        await userModels.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:'Item added to the Cart'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Something went wrong!'})
    }
}

//remove from cart
const removeFromCart = async (req,res) =>{
    try {
        let userData= await userModels.findById(req.body.userId);
        let cartData= await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1;
        }
        await userModels.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:'removed'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Something went wrong!'})
    }
}

//fetch user cart data
const getCart = async (req,res) =>{
    try {
        let userData= await userModels.findById(req.body.userId)
        let cartData= await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in fetching data"})
    }
}

module.exports={addToCart,removeFromCart,getCart}