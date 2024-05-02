const orderModel=require('../models/orderModels')
const userModel=require('../models/userModels')
const Stripe=require('stripe')

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req,res) =>{
    
    const frontend_url="http://localhost:5173"

    try {
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
        
        const line_items= req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*80
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*80
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }
}

const verifyOrder = async (req,res) =>{
    const {orderId,success}=req.body;
    try {
        if(success==="true"){
            await  orderModel.findByIdAndUpdate(orderId,{isPaid:true});
            res.json({success:true,message:'paid'})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:'not paid'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }
}

module.exports={placeOrder,verifyOrder};