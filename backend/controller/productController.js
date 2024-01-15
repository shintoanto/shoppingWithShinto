import productModels from "../models/productModels.js"

export const product = async (req,res)=>{

    const productAll = await productModels.find();
    res.status(200).json({
        productAll,
    });
}

export const newProduct = async (req, res)=>{
    const product = await productModels.create(req.body);

    res.status(200).json({
        product,
    });
}