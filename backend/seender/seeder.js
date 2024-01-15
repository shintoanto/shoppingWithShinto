import mongoose from 'mongoose';
import products from './data.js'
import productModels from '../models/productModels.js';


const seedProducts = async () => {
    try {

       await mongoose.connect('mongodb://127.0.0.1:27017/shoppingwithshinto');

       await productModels.deleteMany();
       console.log('products are deleted')

        await productModels.insertMany(products);
        console.log('product inserted')

        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedProducts();