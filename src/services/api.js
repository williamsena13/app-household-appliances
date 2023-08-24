import axios from "axios";

const api = axios.create({
  //baseURL: "http://api-household-appliances.test/api",
  baseURL: "https://householdappliances.bassena.com.br/api",
  timeout: 10000, // Tempo limite para as requisições
});

export default {
  async request(method, url, data = null) {
    try {
      const response = await api[method](url, data);

      if (response.data) {
        let resposta = response.data;
        if (resposta.meta) {
          switch (resposta.meta.status) {
            case "success":
              return resposta.data;

            case "error":
              throw new Error("API Error: " + resposta.meta.message);

            default:
              throw new Error("Resposta não identificada.");
          }
        }
      }
    } catch (error) {
      console.log("Erro na requisição:", error.message);
      throw error;
    }
  },

  // Recupera todas as marcas
  async getBrands() {
    return await this.request("get", "/bands");
  },

  // Cria uma nova marca
  async createBrand(data) {
    return await this.request("post", "/bands", data);
  },

  // Atualiza uma marca existente
  async updateBrand(id, data) {
    return await this.request("put", `/bands/${id}`, data);
  },

  // Deleta uma marca por ID
  async deleteBrand(id) {
    return await this.request("delete", `/bands/${id}`);
  },

  // Recupera um produto específico por ID
  async getProduct(id) {
    return await this.request("get", `/products/${id}`);
  },

  // Recupera todos os produtos
  async getProducts() {
    return await this.request("get", "/products");
  },

  // Cria um novo produto
  async createProduct(data) {
    return await this.request("post", "/products", data);
  },

  // Atualiza um produto existente
  async updateProduct(id, data) {
    return await this.request("put", `/products/${id}`, data);
  },

  // Deleta um produto por ID
  async deleteProduct(id) {
    return await this.request("delete", `/products/${id}`);
  },
};
