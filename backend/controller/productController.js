import productModels from "../models/productModels.js"
import ErrorHandling from "../utils/ErrorHandler.js";
import APIFilters from "../utils/apiFilters.js";
import caughtAsyncError from "../utils/caughtAsyncError.js";


// Get all products  => api/v1/product
export const product = caughtAsyncError( async (req, res) => {

    const apiFilters = new APIFilters(productModels,req.query).search();

    const productAll = await apiFilters.query;

    const productCount = productAll.length;

    // const allProducts =await productModels.find({});

    res.status(200).json({
        productCount,
        productAll,
    });
});

export const newProduct = async (req, res) => {
    const product = await productModels.create(req.body);

    res.status(200).json({
        product,
    });
}

export const getSingleProduct =caughtAsyncError( async (req, res,next) => {

    const product = await productModels.findById(req?.params?.id);

    if (!product) {
        return next(ErrorHandling("product not found",404));
    }

    res.status(200).json({ product, });
});

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