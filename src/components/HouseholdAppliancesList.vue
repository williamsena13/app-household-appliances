<template>
  <div>
    <p
      v-if="message"
      :class="[
        'alert',
        messageType === 'success' ? 'alert-success' : 'alert-danger',
      ]"
    >
      {{ message }}
    </p>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div
            class="col-md-4"
            v-for="appliance in paginatedHouseholdAppliances"
            :key="appliance.id"
          >
            <div class="card mb-4 shadow-sm">
              <svg
                class="bd-placeholder-img card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  {{ appliance.name }}
                </text>
                <title>{{ appliance.name }}</title>
              </svg>

              <div class="card-body">
                <p class="card-text">
                  {{ appliance.description }}
                </p>
                <div>Voltagem: {{ appliance.voltage + "v" }}</div>
                <p class="card-text">Marca: {{ appliance.brand.name }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                      @click="editHouseholdAppliances(appliance)"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-danger"
                      @click="deleteHouseholdAppliances(appliance)"
                    >
                      Delete
                    </button>
                  </div>
                  <small class="text-muted">{{
                    appliance.created_at ?? ""
                  }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center" style="align-items: center">
          <ul class="pagination">
            <li
              class="page-item"
              v-for="page in totalPages"
              :key="page"
              :class="{ active: page === currentPage }"
            >
              <a class="page-link" @click="changePage(page)">{{ page }}</a>
            </li>
          </ul>
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
      bands: [],
      householdAppliances: [],
      message: "",
      messageType: "",
      perPage: 9,
      currentPage: 1,
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
    getHouseholdAppliances(page) {
      try {
        console.log(page);
        api
          .getProducts()
          .then((response) => {
            console.log("Resposta:");
            console.log(response);

            this.householdAppliances = response;
          })
          .catch((error) => {
            console.log("Erro na requisição:");
            console.error(error);

            this.showMessage("Erro ao carregar eletrodomésticos.", "error");
          });
      } catch (erro) {
        console.log("AQUI NO CACH");
        console.log(erro);
        this.showMessage("Erro ao carregar eletrodomésticos.", "error");
      }
    },

    changePage(page) {
      this.currentPage = page;
      this.getHouseholdAppliances(this.currentPage);
    },

    editHouseholdAppliances(householdAppliances) {
      console.log("Vou editar");
      console.log(householdAppliances);
      this.$router.push({
        name: "eletrodomesticos.edit",
        params: { id: householdAppliances.id },
      });
    },
    deleteHouseholdAppliances(householdAppliances) {
      if (confirm("Tem certeza que deseja excluir este registro?")) {
        api.deleteProduct(householdAppliances.id).then((response) => {
          console.log(response);
          this.getHouseholdAppliances();
        });
      }
    },
  },
  computed: {
    paginatedHouseholdAppliances() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.householdAppliances.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.householdAppliances.length / this.perPage);
    },
  },
  async created() {
    await this.getHouseholdAppliances(this.currentPage);
  },
};
</script>
