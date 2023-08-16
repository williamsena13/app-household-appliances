<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center">Adicionar Aparelho Doméstico</h2>
            <form @submit.prevent="storeHouseholdAppliances">
              <div class="form-group">
                <input
                  v-model="code"
                  class="form-control"
                  placeholder="Código"
                />
              </div>
              <div class="form-group">
                <input v-model="name" class="form-control" placeholder="Nome" />
              </div>
              <div class="form-group">
                <input
                  v-model="description"
                  class="form-control"
                  placeholder="Descrição"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="voltage"
                  class="form-control"
                  placeholder="Voltagem"
                />
              </div>
              <div class="form-group">
                <select v-model="brand_id" class="form-control">
                  <option value="" disabled>Selecionar Marca</option>
                  <option
                    v-for="brand in brands"
                    :key="brand.id"
                    :value="brand.id"
                  >
                    {{ brand.name }}
                  </option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Salvar
              </button>
            </form>
            <p v-if="message" :class="messageType" class="mt-3">
              {{ message }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
  <script>
import api from "@/services/api";

export default {
  data() {
    return {
      code: "",
      name: "",
      description: "",
      voltage: null,
      brand_id: "",
      brands: [],
      message: "",
      messageType: "",
    };
  },
  methods: {
    async storeHouseholdAppliances() {
      try {
        const data = {
          code: this.code,
          name: this.name,
          description: this.description,
          voltage: this.voltage,
          brand_id: this.brand_id,
        };
        const response = await api.createProduct(data);
        console.log(response);

        this.$toasted.show("Produto criado com sucesso!", {
          theme: "outline",
          position: "top-right",
          duration: 3000,
          type: "success",
        });

        //this.showMessage("Produto criado com sucesso!", "success");
      } catch (error) {
        /*
        this.showMessage(
          "Erro ao criar produto. Verifique os campos e tente novamente.",
          "error"
        );
        */
        this.$toasted.show(
          "Erro ao criar produto. Verifique os campos e tente novamente!",
          {
            theme: "outline",
            position: "top-right",
            duration: 3000,
            type: "error",
          }
        );
      }
    },
    async fetchBrands() {
      try {
        const response = await api.getBands();
        console.log(response.data);
        this.brands = response.data.data;
      } catch (error) {
        this.showMessage("Erro ao carregar marcas.", "error");
      }
    },
    showMessage(message, type) {
      this.message = message;
      this.messageType = type;
      setTimeout(() => {
        this.message = "";
        this.messageType = "";
      }, 5000);
    },
  },
  async created() {
    await this.fetchBrands();
  },
};
</script>
  