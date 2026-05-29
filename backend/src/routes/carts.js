import express from "express";

import {
  createCart,
  getCart,
  addProduct,
  removeProduct,
  updateCartProducts,
  updateProductQuantity,
  clearCart,
} from "../controllers/CartController.js";

const router = express.Router();

router.post("/", createCart);

router.get("/:cid", getCart);

router.post("/:cid/products/:pid", addProduct);

router.delete("/:cid/products/:pid", removeProduct);

router.put("/:cid", updateCartProducts);

router.put("/:cid/products/:pid", updateProductQuantity);

router.delete("/:cid", clearCart);

export default router;
