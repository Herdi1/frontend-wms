<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>{{ isEditable ? "Edit" : "Tambah" }} Spk Produksi</h6>

              <button class="btn btn-primary" @click="$router.back()">
                <i class="fas fa-arrow-left"></i>
                Kembali
              </button>
            </div>
          </div>

          <ValidationObserver
            v-slot="{ invalid, validate }"
            ref="form-validate"
          >
            <form
              @submit.prevent="() => console.log('Submit')"
              autocomplete="off"
            >
              <div class="container">
                <div class="d-flex flex-row">
                  <div class="col-sm-3">
                    <ValidationProvider name="code" rules="required">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <div class="row">
                          <div class="col-sm-4 align-self-center">
                            <label for="code">Kode </label>
                          </div>
                          <div class="col-sm align-self-center">
                            <input
                              type="text"
                              class="form-control"
                              name="code"
                              v-model="form.code"
                              :class="
                                errors[0]
                                  ? 'is-invalid'
                                  : valid
                                  ? 'is-valid'
                                  : ''
                              "
                              disabled
                            />

                            <div class="invalid-feedback" v-if="errors[0]">
                              {{ errors[0] }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="col-sm-3">
                    <ValidationProvider name="date" rules="required">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <div class="row">
                          <div class="col-sm-2 align-self-center">
                            <label for="date">Tgl</label>
                          </div>
                          <div class="col-sm-10 align-self-center">
                            <input
                              type="date"
                              class="form-control"
                              name="date"
                              v-model="form.date"
                              @input="setCode()"
                              :class="
                                errors[0]
                                  ? 'is-invalid'
                                  : valid
                                  ? 'is-valid'
                                  : ''
                              "
                            />

                            <div class="invalid-feedback" v-if="errors[0]">
                              {{ errors[0] }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="col-sm-6">
                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-3 align-self-center mr-0 pr-0">
                          <label for="po_customer_id">No Kontrak</label>
                        </div>
                        <div class="col-sm-9 align-self-center ml-0 pl-0">
                          <v-select
                            label="code"
                            :loading="isLoadingGetPoCustomer"
                            :options="lookup_po_customers.data"
                            :filterable="false"
                            @search="onGetPoCustomer"
                            @input="onSetPoCustomer"
                            v-model="form.po_customer_id"
                            :disabled="isEditable"
                          >
                            <template #search="{ attributes, events }">
                              <input
                                class="vs__search"
                                :required="!form.po_customer_id"
                                v-bind="attributes"
                                v-on="events"
                              />
                            </template>
                            <template v-slot:option="option">
                              <div class="row">
                                <div class="col-md-5 p-1 m-0">
                                  {{ option.code }}
                                </div>
                                <div class="col-md-7 p-1 m-0 text-right">
                                  {{
                                    option.customer ? option.customer.name : "-"
                                  }}
                                </div>
                              </div>
                            </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="d-flex justify-content-between"
                              v-if="lookup_po_customers.data.length || search"
                            >
                              <span
                                v-if="lookup_po_customers.current_page > 1"
                                @click="onGetPoCustomer(search, false)"
                                class="flex-fill bg-primary text-white text-center"
                                style="cursor: pointer"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_po_customers.last_page >
                                  lookup_po_customers.current_page
                                "
                                @click="onGetPoCustomer(search, true)"
                                class="flex-fill bg-primary text-white text-center"
                                style="cursor: pointer"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="container">
                <div class="d-flex flex-row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-2 align-self-center">
                          <label for="customer_id">Pelanggan</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <input
                            type="text"
                            class="form-control"
                            :value="
                              form.po_customer_id
                                ? form.po_customer_id.customer.name
                                  ? form.po_customer_id.customer.name
                                  : '-'
                                : '-'
                            "
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-3 align-self-center mr-0 pr-0">
                          <label for="departemen">Departement</label>
                        </div>
                        <div class="col-sm-9 align-self-center ml-0 pl-0">
                          <select
                            class="form-control"
                            v-model="form.department_id"
                          >
                            <option value="7">Weaving</option>
                            <option value="21">Finishing</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="container">
                <div class="d-flex flex-row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-2 align-self-center">
                          <label for="due_date">Batas Waktu</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <input
                            type="date"
                            class="form-control"
                            name="due_date"
                            v-model="form.due_date"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="clearfix mt-4">
                <span
                  class="btn btn-primary float-right"
                  @click="addDetail"
                  style="cursor: pointer"
                >
                  <i class="fas fa-plus"></i>
                  Tambah
                </span>
              </div>

              <div
                class="table-responsive table-striped"
                style="min-height: 300px"
              >
                <table class="table table-sm mt-3">
                  <tr>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 8%"
                    >
                      Kode
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 20%"
                    >
                      Product
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Unit
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Qty
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 1%"
                    >
                      Opsi
                    </td>
                  </tr>
                  <tr
                    v-for="(item, index) in form.work_order_details"
                    :key="index"
                  >
                    <td class="table-transaction-row">
                      <input
                        type="text"
                        class="form-control"
                        :value="item.product_id ? item.product_id.code : '-'"
                        disabled
                      />
                    </td>
                    <td class="table-transaction-row">
                      <v-select
                        label="name"
                        :loading="isLoadingGetProduct"
                        :options="lookup_products.data"
                        :filterable="false"
                        @search="onGetProduct"
                        @input="onSetProduct(index)"
                        v-model="item.product_id"
                      >
                        <template v-slot:option="option">
                          <div class="row">
                            <div class="col-md-5 p-1 m-0">
                              {{ option.name }}
                            </div>
                            <div class="col-md-7 p-1 m-0 text-right">
                              {{ option.code }}
                            </div>
                          </div>
                        </template>
                        <template #search="{ attributes, events }">
                          <input
                            class="vs__search"
                            :required="!item.product_id"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_products.data.length || search"
                        >
                          <span
                            v-if="lookup_products.current_page > 1"
                            @click="onGetProduct(search, false)"
                            class="flex-fill bg-primary text-white text-center"
                            style="cursor: pointer"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_products.last_page >
                              lookup_products.current_page
                            "
                            @click="onGetProduct(search, true)"
                            class="flex-fill bg-primary text-white text-center"
                            style="cursor: pointer"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="table-transaction-row">
                      <input
                        type="text"
                        class="form-control"
                        :value="
                          item.product_id ? item.product_id.selling_unit : '-'
                        "
                        disabled
                      />
                    </td>
                    <td class="table-transaction-row">
                      <!-- <money
                        v-model="item.quantity"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      /> -->

                      <input
                        type="number"
                        v-model="item.quantity"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <td class="text-center table-transaction-row">
                      <i
                        class="fas fa-trash text-danger"
                        style="cursor: pointer; vertical-align: midle"
                        @click="deleteDetail(index)"
                      ></i>
                    </td>
                  </tr>

                  <tr v-if="!form.work_order_details.length">
                    <td colspan="7" class="text-center pt-4 pb-4">
                      Data tidak ditemukan
                    </td>
                  </tr>

                  <tr>
                    <td colspan="4" class="text-left border-top table-success">
                      <input
                        class="form-control form-control-sm"
                        v-model="form.description"
                        aria-placeholder="Keterangan"
                        placeholder="Keterangan ...."
                      />
                    </td>
                  </tr>
                </table>

                <div class="mt-5 mb-5" style="height: 100px"></div>
              </div>

              <button
                class="btn btn-primary"
                @click="validate().then(onSubmit(invalid))"
                type="button"
              >
                <span v-if="isLoadingForm">
                  <i class="fas fa-circle-notch fa-spin"></i>
                </span>
                <span v-else>
                  Simpan
                  <i class="fas fa-save"></i>
                </span>
              </button>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <div class="section-body" v-else>
      <div class="row">
        <div class="col-12">
          <div class="card" style="min-height: 300px">
            <div
              class="card-body d-flex flex-column justify-content-center align-items-center"
            >
              <div>Loading</div>
              <div><i class="fas fa-circle-notch fa-spin"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Spk Produksi",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

      isStopSearchProduct: false,
      isLoadingGetProduct: false,
      product_search: "",

      isStopSearchPoCustomer: false,
      isLoadingGetPoCustomer: false,
      po_customer_search: "",

      form: {
        po_customer_id: "",
        code: "",
        description: "",
        department_id: "",
        date: moment().format("YYYY-MM-DD"),
        departement: "",
        work_order_details: [],
        due_date: moment().add(1, "M").format("YYYY-MM-DD"),
      },

      default_form: {
        po_customer_id: "",
        code: "",
        description: "",
        department_id: "",
        date: moment().format("YYYY-MM-DD"),
        departement: "",
        work_order_details: [],
        due_date: moment().add(1, "M").format("YYYY-MM-DD"),
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("marketing/work_order/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != "work_order_details") {
            if (item === "po_customer_id") {
              this.form.po_customer_id = response.data.po_customer || "";
            } else {
              this.form[item] = response.data[item];
            }
          }
        });

        this.form.work_order_details = response.data.work_order_details.map(
          (item) => {
            return {
              ...item,
              product_id: item.product,
            };
          }
        );

        this.isLoadingPage = false;
      }
    } catch (err) {
      this.$router.push("/marketing/work_order");
    }
  },

  async mounted() {
    await this.onSearchProduct();

    await this.onSearchPoCustomer();

    if (!this.isEditable) {
      this.setCode();
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "lookup_products",
      "lookup_po_customers",
      "code",
    ]),

    limit_item_transaction() {
      return this.$store.state.setting.settings.find(
        (item) => item.name == "limit_item_transaction"
      ).value;
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp", "getCode"]),

    onGetProduct(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProduct);

      this.isStopSearchProduct = setTimeout(() => {
        this.product_search = search;

        if (typeof isNext !== "function") {
          this.lookup_products.current_page = isNext
            ? this.lookup_products.current_page + 1
            : this.lookup_products.current_page - 1;
        } else {
          this.lookup_products.current_page = 1;
        }

        this.onSearchProduct();
      }, 600);
    },

    async onSearchProduct() {
      if (!this.isLoadingGetProduct) {
        this.isLoadingGetProduct = true;

        await this.lookUp({
          url: "marketing/work_order/get-product",
          lookup: "products",
          query:
            "?search=" +
            this.product_search +
            "&page=" +
            this.lookup_products.current_page +
            "&per_page=5",
        });

        this.isLoadingGetProduct = false;
      }
    },

    onGetPoCustomer(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPoCustomer);

      this.isStopSearchPoCustomer = setTimeout(() => {
        this.po_customer_search = search;

        if (typeof isNext !== "function") {
          this.lookup_po_customers.current_page = isNext
            ? this.lookup_po_customers.current_page + 1
            : this.lookup_po_customers.current_page - 1;
        } else {
          this.lookup_po_customers.current_page = 1;
        }

        this.onSearchPoCustomer();
      }, 600);
    },

    async onSearchPoCustomer() {
      if (!this.isLoadingGetPoCustomer) {
        this.isLoadingGetPoCustomer = true;

        await this.lookUp({
          url: "marketing/work_order/get-po-customer",
          lookup: "po_customers",
          query:
            "?search=" +
            this.po_customer_search +
            "&page=" +
            this.lookup_po_customers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPoCustomer = false;
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      if (!this.form.work_order_details.length) {
        this.$toaster.error("Detail Spk Produksi Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "marketing/work_order";

      let formData = {
        ...this.form,
        po_customer_id:
          typeof this.form.po_customer_id == "object"
            ? this.form.po_customer_id.id
            : "",
      };

      formData.work_order_details = formData.work_order_details.map((item) => {
        return {
          quantity: item.quantity,
          product_id:
            typeof item.product_id == "object" ? item.product_id.id : "",
        };
      });

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        url: url,
        method: this.isEditable ? "put" : "post",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Berhasil " +
              (this.isEditable ? "Update" : "Tambah") +
              " SPK Produksi"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              work_order_details: [],
            };

            this.setCode();

            this.onPrint(res.data.id);
          }
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
        });
    },

    onPrint(id) {
      this.$confirm({
        message: "Apakah anda ingin menampilkan halaman print",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: async (confirm) => {
          if (confirm) {
            var token = this.$cookiz
              .get("auth._token.local")
              .replace("Bearer ", "");

            window.open(
              process.env.API_URL +
                "/marketing/work_order/get-print-detail/" +
                id +
                "?token=" +
                token,
              "_blank"
            );
          }
        },
      });
    },

    async setCode() {
      let tanggal = this.form.date ? this.form.date : "";

      await this.getCode({
        url: "marketing/work_order",
        query:
          "?po_customer_id=" +
          this.form.po_customer_id +
          "&tanggal= " +
          tanggal,
      });

      this.form.code = this.code;
    },

    addDetail() {
      if (
        parseInt(this.limit_item_transaction) <=
        this.form.work_order_details.length
      ) {
        this.$toaster.error(
          "Hanya " +
            this.limit_item_transaction +
            " batas item yang di perbolehkan"
        );
        return;
      }

      this.form.work_order_details.push({
        product_id: "",
        quantity: 0.0,
      });
    },

    deleteDetail(indexItem) {
      this.form.work_order_details = this.form.work_order_details.filter(
        (_, index) => index != indexItem
      );
    },

    onSetProduct(index) {
      let details = [...this.form.work_order_details];

      let itemProduct = {
        ...this.form.work_order_details[index],
      };

      if (!itemProduct.product_id) {
        this.form.work_order_details[index].product_id = "";
        return;
      }

      let product = itemProduct.product_id;

      let products = details.filter(
        (item) => (item.product_id ? item.product_id.id : 0) === product.id
      );

      if (products.length < 2) return;

      this.$toaster.error("Product sudah ada di dalam list");

      this.form.work_order_details = details.filter(
        (_, indexItem) => index != indexItem
      );
    },

    onSetPoCustomer(item) {
      if (item) {
        this.setCode();
        this.form = {
          ...this.form,

          code: this.form.code,
          // date : item.date,
          description: item.description,

          work_order_details: item.po_customer_details.map((item) => {
            return {
              product_id: item.product,
              quantity: item.quantity,
            };
          }),
        };
      } else {
        this.form.po_customer_id = "";
      }
    },
  },
};
</script>
