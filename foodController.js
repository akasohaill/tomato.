const foodModels=require( '../models/foodModels.js')
const fs=require('fs')

const addFood= async (req,res)=>{

    let image_filename=`${req.file.filename}`;

    const food=new foodModels({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:'food added'})
    }catch (error){
        console.log(error);
        res.json({success:false,message:'failed to add food'})
    }
}
// all food list
const listFood = async (req,res) => {
    try {
        const foods=await foodModels.find({});
        res.json({success:true,data:foods})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Failed to get data"})
    }
}

//remove food
const removeFood = async (req,res) =>{
    try {
        const food=await foodModels.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModels.findByIdAndDelete(req.body.id);
        res.json({success:true,message:'Food Removed'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:'Error'})
    }
}

module.exports= {addFood,listFood,removeFood}
