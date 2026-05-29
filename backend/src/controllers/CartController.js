import cartService from "../services/CartService.js";

export async function createCart(req, res) {
  try {
    const cart = await cartService.createCart();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function getCart(req, res) {
  try {
    const cart = await cartService.getCart(req.params.cid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function addProduct(req, res) {
  try {
    const cart = await cartService.addProduct(req.params.cid, req.params.pid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function removeProduct(req, res) {
  try {
    const cart = await cartService.removeProduct(
      req.params.cid,
      req.params.pid,
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function updateCartProducts(req, res) {
  try {
    const updatedCart = await cartService.updateCartProducts(
      req.params.cid,
      req.body.products,
    );
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function updateProductQuantity(req, res) {
  try {
    const updatedCart = await cartService.updateProductQuantity(
      req.params.cid,
      req.params.pid,
      req.body.quantity,
    );
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function clearCart(req, res) {
  try {
    const clearedCart = await cartService.clearCart(req.params.cid);
    res.json(clearedCart);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
