import productService from "../services/ProductService.js";
import { getSocketServer } from "../socketManager.js";

export async function getProducts(req, res) {
  try {
    const { limit = 10, page = 1, query, sort } = req.query;

    const result = await productService.getProducts({
      limit,
      page,
      query,
      sort,
    });

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}`
        : null,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function getProductById(req, res) {
  try {
    const product = await productService.getProductById(req.params.pid);

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function createProduct(req, res) {
  try {
    const newProduct = await productService.createProduct(req.body);

    const updatedProducts = await productService.getProducts({
      limit: 10,
      page: 1,
    });
    const io = getSocketServer();

    io.emit("productsUpdated", updatedProducts.docs);
    res.status(201).json({
      status: "success",
      payload: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function updateProduct(req, res) {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.pid,
      req.body,
    );

    const updatedProducts = await productService.getProducts({
      limit: 10,
      page: 1,
    });
    const io = getSocketServer();
    io.emit("productsUpdated", updatedProducts.docs);

    res.json({
      status: "success",
      payload: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    await productService.deleteProduct(req.params.pid);
    const updatedProducts = await productService.getProducts({
      limit: 10,
      page: 1,
    });
    const io = getSocketServer();
    io.emit("productsUpdated", updatedProducts.docs);
    res.json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
