import productModels from "../models/productModels.js"

export const product = async (req, res) => {

    const productAll = await productModels.find();
    res.status(200).json({
        productAll,
    });
}

export const newProduct = async (req, res) => {
    const product = await productModels.create(req.body);

    res.status(200).json({
        product,
    });
}

export const getSingleProduct = async (req, res) => {

    const product = await productModels.findById(req?.params?.id);

    if (!product) {
        res.status(404).json({ "message": "product not found" });
    }

    res.status(200).json({ product, });
}

export const updateProduct = async (req, res) => {

    let product = await productModels.findById(req?.params?.id);

    if (!product) {
        return res.status(404).json({ error: "product not found" });
    }

    product = await productModels.findByIdAndUpdate(req?.params?.id, req.body, { new: true });

    res.status(200).json({ product, });
}

export const deleteSingleProduct = async (req, res) => {

    let product = await productModels.findById(req?.params?.id);

    if (!product) {
        return res.status(404).json({ error: "product not found" });
    }

   let deleteProduct = await productModels.deleteOne(product);

    res.status(200).json({ deleteProduct, });
}