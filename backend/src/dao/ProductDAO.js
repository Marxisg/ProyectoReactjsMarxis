import Product from "../models/Product.js";

class ProductDAO {
  async getProducts({ limit = 10, page = 1, query, sort }) {
    const filter = {};

    if (query) {
      if (query === "available") {
        filter.stock = {
          $gt: 0,
        };
      } else {
        filter.category = query;
      }
    }

    const sortOption = {};

    if (sort === "asc") {
      sortOption.price = 1;
    }

    if (sort === "desc") {
      sortOption.price = -1;
    }

    return await Product.paginate(filter, {
      limit,
      page,
      sort: sortOption,
      lean: true,
    });
  }

  async getProductById(id) {
    return await Product.findById(id).lean();
  }

  async createProduct(productData) {
    return await Product.create(productData);
  }

  async updateProduct(id, productData) {
    delete productData._id;

    return await Product.findByIdAndUpdate(id, productData, {
      new: true,
    }).lean();
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductDAO();
