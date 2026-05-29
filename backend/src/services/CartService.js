import cartDAO from "../dao/CartDAO.js";

class CartService {
  async createCart() {
    return await cartDAO.createCart();
  }

  async getCart(id) {
    return await cartDAO.getCartById(id);
  }

  async addProduct(cartId, productId) {
    return await cartDAO.addProduct(cartId, productId);
  }

  async removeProduct(cartId, productId) {
    return await cartDAO.removeProduct(cartId, productId);
  }

  async updateCartProducts(cartId, products) {
    return await cartDAO.updateCartProducts(cartId, products);
  }

  async updateProductQuantity(cartId, productId, quantity) {
    return await cartDAO.updateProductQuantity(cartId, productId, quantity);
  }

  async clearCart(cartId) {
    return await cartDAO.clearCart(cartId);
  }
}

export default new CartService();
