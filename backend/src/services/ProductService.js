import productDAO from "../dao/ProductDAO.js";

class ProductService {
  async getProducts(params) {
    return await productDAO.getProducts(params);
  }

  async getProductById(id) {
    return await productDAO.getProductById(id);
  }

  async createProduct(data) {
    return await productDAO.createProduct(data);
  }

  async updateProduct(id, data) {
    return await productDAO.updateProduct(id, data);
  }

  async deleteProduct(id) {
    return await productDAO.deleteProduct(id);
  }
}

export default new ProductService();
