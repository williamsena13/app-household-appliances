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
                  :readonly="this.$route.params?.id ? true : false"
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
              <button
                type="submit"
                :class="
                  'btn ' +
                  (this.$route.params?.id ? 'btn-success' : 'btn-primary') +
                  ' btn-block'
                "
              >
                {{ this.$route.params?.id ? "Salvar" : "Cadastrar" }}
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
    showMessage(message, type) {
      this.message = message;
      this.messageType = type;
      setTimeout(() => {
        this.message = "";
        this.messageType = "";
      }, 5000);
    },
    async storeHouseholdAppliances() {
      try {
        console.log("AQWUII");
        const data = {
          code: this.code,
          name: this.name,
          description: this.description,
          voltage: this.voltage,
          brand_id: this.brand_id,
          id: this.$route.params?.id ? parseInt(this.$route.params?.id) : null,
        };

        //
        if (this.$route.params?.id) {
          let id = parseInt(this.$route.params?.id);
          await api
            .updateProduct(id, data)
            .then((response) => {
              console.log(response);
              this.$toasted.show("Produto atualizado com sucesso!", {
                theme: "outline",
                position: "top-right",
                duration: 3000,
                type: "success",
              });
              this.$router.push({
                name: "eletrodomesticos",
              });
            })
            .catch((error) => {
              console.log("Erro ao buscar Marcas");
              console.log(error);
              this.$toasted.show(
                "Não foi possível atualizar produto produto!",
                {
                  position: "top-right",
                  duration: 3000,
                  type: "error",
                }
              );
            });
          return;
        }
        await api
          .createProduct(data)
          .then((response) => {
            console.log(response);
            this.$toasted.show("Produto criado com sucesso!", {
              theme: "outline",
              position: "top-right",
              duration: 3000,
              type: "success",
            });
            this.$router.push({
              name: "eletrodomesticos",
            });
          })
          .catch((error) => {
            console.log("Erro ao buscar Marcas");
            console.log(error);
            this.$toasted.show("Não foi possível cirar produto!", {
              position: "top-right",
              duration: 3000,
              type: "error",
            });
          });
        //
      } catch (error) {
        this.$toasted.show(
          "Erro ao " +
            (this.$route.params?.id ? "Atualizar" : "Criar") +
            "  produto. Verifique os campos e tente novamente!",
          {
            theme: "outline",
            position: "top-right",
            duration: 3000,
            type: "error",
          }
        );
      }
    },
    async getBands() {
      try {
        await api
          .getBrands()
          .then((response) => {
            this.brands = response;
          })
          .catch((error) => {
            console.log("Erro ao buscar Marcas");
            console.log(error);
            this.$toasted.show("Marcas não encontradas!", {
              position: "top-right",
              duration: 3000,
              type: "error",
            });
            this.$router.push({
              name: "eletrodomesticos",
            });
          });
      } catch (error) {
        console.log(error);
        this.showMessage("Erro ao carregar marcas.", "error");
      }
    },
    async getProduct(id) {
      await api
        .getProduct(id)
        .then((response) => {
          console.log("Resposta:");
          console.log(response);
          this.$toasted.show(
            `Produto ${response.name} encontrado com sucesso`,
            {
              position: "top-right",
              duration: 3000,
              type: "success",
            }
          );

          this.code = response.code;
          this.name = response.name;
          this.description = response.description;
          this.voltage = response.voltage;
          this.brand_id = response.brand.id;

          // Aqui, você pode processar os dados do produto retornado pela API
          // this.selectedProduct = response;
        })
        .catch((error) => {
          console.log("Erro na requisição:");
          console.error(error);

          this.showMessage("Erro ao carregar o produto.", "error");
        });
    },
  },
  mounted() {
    if (this.$route.params) {
      if (this.$route.params?.id) {
        this.getProduct(this.$route.params?.id);
      }
    }
  },
  async created() {
    await this.getBands();
  },
};
</script>
  