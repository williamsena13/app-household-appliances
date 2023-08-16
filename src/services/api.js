import axios from "axios";

const api = axios.create({
  baseURL: "http://api-household-appliances.test/api",
  timeout: 10000, // Tempo limite para as requisições
});

export default {
  // Recupera todas as marcas
  async getBands() {
    return await api.get("/bands");
  },

  // Cria uma nova marca
  createBand(data) {
    return api.post("/bands", data);
  },

  // Atualiza uma marca existente
  updateBand(id, data) {
    return api.put(`/bands/${id}`, data);
  },

  // Deleta uma marca por ID
  deleteBand(id) {
    return api.delete(`/bands/${id}`);
  },

  // Recupera um produto específico por ID
  getProduct(id) {
    return api.get(`/products/${id}`);
  },

  // Recupera todos os produtos
  getProducts() {
    return api.get("/products");
  },

  // Cria um novo produto
  createProduct(data) {
    return api.post("/products", data);
  },

  // Atualiza um produto existente
  updateProduct(id, data) {
    return api.put(`/products/${id}`, data);
  },

  // Deleta um produto por ID
  deleteProduct(id) {
    return api.delete(`/products/${id}`);
  },
};
