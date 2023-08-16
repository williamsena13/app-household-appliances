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
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                <title>{{ appliance.name }}</title>
              </svg>

              <div class="card-body">
                <p class="card-text">
                  {{ appliance.description }}
                </p>
                <spam>Voltagem: {{ appliance.voltage + "v" }} </spam>
                <p class="card-text">Marca: {{ appliance.brand.name }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <router-link
                      :to="{ name: 'eletrodomesticos.edit' }"
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </router-link>
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
        this.showMessage("Produto criado com sucesso!", "success");
        await this.fetchHouseholdAppliances(this.currentPage);
      } catch (error) {
        this.showMessage(
          "Erro ao criar produto. Verifique os campos e tente novamente.",
          "error"
        );
      }
    },
    async fetchBands() {
      try {
        const response = await api.getBands();
        this.bands = response.data.data;
      } catch (error) {
        this.showMessage("Erro ao carregar marcas.", "error");
      }
    },
    async fetchHouseholdAppliances(page) {
      try {
        const response = await api.getProducts(page, this.perPage);
        console.log(response.data.data);
        this.householdAppliances = response.data.data;
      } catch (error) {
        this.showMessage("Erro ao carregar eletrodomésticos.", "error");
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
    changePage(page) {
      this.currentPage = page;
      this.fetchHouseholdAppliances(this.currentPage);
    },
    perPageChanged() {
      this.currentPage = 1;
      this.fetchHouseholdAppliances(this.currentPage);
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
    await this.fetchBands();
    await this.fetchHouseholdAppliances(this.currentPage);
  },
};
</script>
