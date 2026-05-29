import Cart from "../models/Cart.js";

class CartDAO {
  async createCart() {
    return await Cart.create({ products: [] });
  }

  async getCartById(id) {
    return await Cart.findById(id).populate("products.product").lean();
  }

  async addProduct(cartId, productId) {
    const cart = await Cart.findById(cartId);

    const existingProduct = cart.products.find(
      (item) => item.product.toString() === productId,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({
        product: productId,
        quantity: 1,
      });
    }
    await cart.save();
    return cart;
  }

  async removeProduct(cartId, productId) {
    const cart = await Cart.findById(cartId);

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();
    return cart;
  }

  async updateCartProducts(cartId, products) {
    return await Cart.findByIdAndUpdate(cartId, { products }, { new: true })
      .populate("products.product")
      .lean();
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);

    const product = cart.products.find(
      (item) => item.product.toString() === productId,
    );

    if (!product) {
      return null;
    }
    product.quantity = quantity;
    await cart.save();
    return cart;
  }

  async clearCart(cartId) {
    return await Cart.findByIdAndUpdate(
      cartId,
      { products: [] },
      { new: true },
    );
  }
}

export default new CartDAO();
