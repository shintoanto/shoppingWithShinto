import mongoose from 'mongoose';
import products from './data'
import productModels from '../models/productModels';


const seedProducts = async () => {
    try {

        mongoose.connect('mongodb://127.0.0.1:27017/shoppingwithshinto')

        await productModels.insertMany(products);
        console.log('product inserted')

        process.exit;
    } catch (error) {
        process.exit;
    }
}

seedProducts();