import dotenv from "dotenv";
import mongoose from "mongoose";

import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import { productsSeed } from "./products.seed.js";

dotenv.config();

async function seedDatabase() {
  try {
    console.log("Conectando el servicio de Mongo");
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Mongo conectado");

    console.log("Procediendo a generar datos semilla");
    await Product.deleteMany();
    await Cart.deleteMany();

    console.log("Productos Y Carritos eliminados");

    await Product.insertMany(productsSeed);

    console.log("Productos insertados, los carritos no se regeneran");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

seedDatabase();
