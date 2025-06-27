<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>{{ isEditable ? "Edit" : "Tambah" }} Penawaraan</h6>

              <button class="btn btn-primary btn-sm" @click="$router.back()">
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
              <div class="container m-0 p-0">
                <div class="d-flex flex-row">
                  <div class="col-sm-3">
                    <ValidationProvider name="code" rules="required">
                      <div class="form-group " slot-scope="{ errors, valid }">
                        <div class="row">
                          <div class="col-sm-2 align-self-center">
                            <label for="code">Kode </label>
                          </div>
                          <div class="col-sm-10 align-self-center">
                            <input
                              type="text"
                              class="form-control form-control-sm"
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
                      <div class="form-group " slot-scope="{ errors, valid }">
                        <div class="row">
                          <div class="col-sm-2 align-self-center">
                            <label for="date">Tgl</label>
                          </div>
                          <div class="col-sm-10 align-self-center">
                            <input
                              type="date"
                              class="form-control form-control-sm"
                              name="date"
                              v-model="form.date"
                              :class="
                                errors[0]
                                  ? 'is-invalid'
                                  : valid
                                  ? 'is-valid'
                                  : ''
                              "
                            />
                          </div>

                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-sm-5">
                    <div class="form-group">
                      <div class="row" style="heigth:30px">
                        <div class="col-sm-2 align-self-center">
                          <label for="customer_id">Pelanggan</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <v-select
                            label="name"
                            :loading="isLoadingGetCustomer"
                            :options="lookup_customers.data"
                            :filterable="false"
                            @search="onGetCustomer"
                            @input="onSetCustomer"
                            v-model="form.customer_id"
                          >
                            <template v-slot:option="option">                              
                                  {{ option.name }}
                            </template>
                            <template #search="{ attributes, events }">
                              <input
                                class="vs__search"
                                :required="!form.customer_id"
                                v-bind="attributes"
                                v-on="events"
                              />
                            </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="d-flex justify-content-between"
                              v-if="lookup_customers.data.length || search"
                            >
                              <span
                                v-if="lookup_customers.current_page > 1"
                                @click="onGetCustomer(search, false)"
                                class="
                                  flex-fill
                                  bg-primary
                                  text-white text-center
                                "
                                style="cursor: pointer"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_customers.last_page >
                                  lookup_customers.current_page
                                "
                                @click="onGetCustomer(search, true)"
                                class="
                                  flex-fill
                                  bg-primary
                                  text-white text-center
                                "
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

                <div class="d-flex flex-row">
                  <div class="col-sm-3">
                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-2 align-self-center">
                          <label for="seller_id">Sales</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <input
                            type="text"
                            class="form-control form-control-sm"
                            name="seller_id"
                            :value="
                              form.customer_id
                                ? form.customer_id.seller
                                  ? form.customer_id.seller.name || '-'
                                  : '-'
                                : '-'
                            "
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-3">
                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-2 align-self-center">
                          <label for="group_customer">Group</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <input
                            type="text"
                            class="form-control"
                            name="group_customer"
                            :value="
                              form.customer_id
                                ? form.customer_id.customer_group
                                  ? form.customer_id.customer_group.name || '-'
                                  : '-'
                                : '-'
                            "
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-5">
                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-2 align-self-center">
                          <label for="address">Alamat </label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <input
                            name="address"
                            :value="
                              form.customer_id ? form.customer_id.address : '-'
                            "
                            class="form-control"
                            :disabled="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>            
              
              <div class="d-flex flex-row">
                  <div class="col-sm-3">
                     <div class="form-group">
                      <div class="row">
                        <div class="col-sm-2 align-self-center">
                          <label for="type_discount">Disc</label>
                        </div>
                        <div class="col-sm-8 align-self-center">
                          <select
                            class="form-control form-control-sm"
                            v-model="form.discount_type"
                            @change="onChangeDiscountType()"
                            name="type_discount"
                          >
                            <option value="NOMINAL">Nominal (Rp)</option>
                            <option value="PERCENT">Persen (%)</option>
                          </select>
                        </div>
                      </div>
                    
                    </div>
                  </div>                              
              </div>
                                                            
              <div class="clearfix">
                <span
                  class="btn btn-primary float-right btn-sm"
                  @click="addDetail"
                  style="cursor: pointer"
                >
                  <i class="fas fa-plus"></i>
                  Tambah
                </span>
              </div>

              <div class="table-striped">
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
                      style="width: 40%"
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
                      style="width: 8%"
                    >
                      Harga
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 6%"
                    >
                      Discount
                      <span v-if="form.discount_type == 'NOMINAL'"> Rp </span>
                      <span v-else> % </span>
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 10%"
                    >
                      Total
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 1%"
                    >
                      Opsi
                    </td>
                  </tr>
                  <tr
                    v-for="(item, index) in form.quotation_details"
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
                              {{ option.name }}
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
                      <money
                        v-model="item.quantity"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        @keyup.native="itemChange(index)"
                      />
                    </td>                                      
                    <td class="table-transaction-row">
                      <money
                        v-model="item.price"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        @keyup.native="itemChange(index)"
                      />
                    </td>
                    <td class="table-transaction-row">
                      <money
                        v-model="item.discount"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        @keyup.native="itemChange(index)"
                      />
                    </td>
                    <td class="table-transaction-row">
                      <money
                        v-model="item.amount"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <td class="text-center table-transaction-row">
                      <i
                        class="fas fa-trash text-danger"
                        style="cursor: pointer;vertical-align:midle"
                        @click="deleteDetail(index)"
                      ></i>
                    </td>
                  </tr>

                  <tr v-if="!form.quotation_details.length">
                    <td colspan="8" class="text-center pt-4 pb-4">
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
                            name="description"
                        />                        
                     </td>
                    <td colspan="2" class="text-right pt-3 border-top">Total</td>
                    <td colspan="2" class="border-top">
                      <money
                        v-model="form.total"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                  </tr>

                  <tr>
                    <td colspan="6" class="text-right pt-3">
                      Discount
                      <div class="text-muted text-small">
                        <span v-if="form.discount_type == 'NOMINAL'">
                          * Rp
                        </span>
                        <span v-else> * % </span>
                      </div>
                    </td>
                    <td colspan="2">
                      <money
                        v-model="form.discount"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        @keyup.native="countTotal"
                      />
                    </td>
                  </tr>

                  <tr v-if="form.discount > 0.0">
                    <td colspan="6" class="text-right pt-3">
                      Total Stl Discount
                    </td>
                    <td colspan="2">
                      <money
                        v-model="form.total_discount_nominal"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        disabled
                      />
                    </td>
                  </tr>

                  <tr>
                    <td colspan="6" class="text-right pt-3">PPN</td>
                    <td colspan="2">
                      <money
                        v-model="form.tax"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                  </tr>

                  <tr>
                    <td colspan="6" class="text-right pt-3">Grand Total</td>
                    <td colspan="2">
                      <money
                        v-model="form.grand_total"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                  </tr>
                </table>
              </div>

              <button class="btn btn-primary mt-3"
                @click="validate().then(onSubmit(invalid))"
                type="button">
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
              class="
                card-body
                d-flex
                flex-column
                justify-content-center
                align-items-center
              "
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
  middleware : ['checkRoleUserDetail'],

  head() {
    return {
      title: "Penawaraan",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,

      isLoadingPage: Number.isInteger(id) ? true : false,

      isLoadingForm: false,

      isStopSearchCustomer: false,
      isLoadingGetCustomer: false,
      customer_search: "",

      isStopSearchProduct: false,
      isLoadingGetProduct: false,
      product_search: "",

      form: {
        customer_id: "",
        code: "",
        description: "",
        date: moment().format("YYYY-MM-DD"),
        total: 0.0,
        discount: 0.0,
        tax: 0.0,
        grand_total: 0.0,
        discount_type: "NOMINAL",
        quotation_details: [],
        total_discount_nominal: 0.0,
      },

      default_form: {
        customer_id: "",
        code: "",
        description: "",
        date: moment().format("YYYY-MM-DD"),
        total: 0.0,
        discount: 0.0,
        tax: 0.0,
        grand_total: 0.0,
        discount_type: "NOMINAL",
        quotation_details: [],
        total_discount_nominal: 0.0,
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("marketing/quotation/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != "quotation_details") {
            if (item === "customer_id") {
              this.form.customer_id = response.data.customer || "";
            } else if (item === "total_discount_nominal") {
              if (response.data["discount_type"] == "NOMINAL") {
                this.form[item] = Math.ceil(
                  parseFloat(response.data["total"]) -
                    parseFloat(response.data["discount"])
                );
              } else {
                let total_discount =
                  parseFloat(response.data["total"]) *
                  (parseFloat(response.data["discount"]) / 100.0);

                this.form[item] = Math.ceil(
                  parseFloat(response.data["total"]) -
                    parseFloat(total_discount)
                );
              }
            } else {
              this.form[item] = response.data[item];
            }
          }
        });

        this.form.quotation_details = response.data.quotation_details.map(
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
      this.$router.push("/marketing/quotation");
    }
  },

  async mounted() {
    await this.onSearchCustomer();

    //await this.onSearchProduct();

    if (!this.isEditable) {
      this.setCode();
    }
  },

  computed: {
    ...mapState("moduleApi", ["lookup_customers", "lookup_products", "code"]),

    tax() {
      return this.$store.state.setting.settings.find(
        (item) => item.name == "tax"
      ).value;
    },

    limit_item_transaction() {
      return this.$store.state.setting.settings.find(
        (item) => item.name == "limit_item_transaction"
      ).value;
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp", "getCode"]),

    onGetCustomer(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCustomer);

      this.isStopSearchCustomer = setTimeout(() => {
        this.customer_search = search;

        if (typeof isNext !== "function") {
          this.lookup_customers.current_page = isNext
            ? this.lookup_customers.current_page + 1
            : this.lookup_customers.current_page - 1;
        } else {
          this.lookup_customers.current_page = 1;
        }

        this.onSearchCustomer();
      }, 600);
    },

    async onSearchCustomer() {
      if (!this.isLoadingGetCustomer) {
        this.isLoadingGetCustomer = true;

        await this.lookUp({
          url: "marketing/quotation/get-customer",
          lookup: "customers",
          query:
            "?search=" +
            this.customer_search +
            "&page=" +
            this.lookup_customers.current_page +
            "&per_page=20",
        });

        this.isLoadingGetCustomer = false;
      }
    },

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
          url: "marketing/quotation/get-product",
          lookup: "products",
          query:
            "?search=" +
            this.product_search +
            "&customer_id="+(this.form.customer_id ? this.form.customer_id.id :"''")+"&page=" +
            this.lookup_products.current_page +
            "&per_page=10"
        });

        this.isLoadingGetProduct = false;
      }
    },

    onSubmit(isInvalid) {

      if (isInvalid || this.isLoadingForm) return;

      if (!this.form.quotation_details.length) {
        this.$toaster.error("Detail Penawaran Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "marketing/quotation";

      let formData = {
        ...this.form,
        customer_id:
          typeof this.form.customer_id == "object"
            ? this.form.customer_id.id
            : "",
      };

      formData.quotation_details = formData.quotation_details.map((item) => {
        return {
          discount: item.discount,
          quantity: item.quantity,
          price: item.price,
          amount: item.amount,
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
            "Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Penawaran"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              quotation_details: [],
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
                "/marketing/quotation/get-print-detail/" +
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
      await this.getCode({
        url: "marketing/quotation",
        query: "",
      });

      this.form.code = this.code;
    },

    addDetail() {
      if (
        parseInt(this.limit_item_transaction) <=
        this.form.quotation_details.length
      ) {
        this.$toaster.error(
          "Hanya " +
            this.limit_item_transaction +
            " batas item yang di perbolehkan"
        );
        return;
      }

      this.form.quotation_details.push({
        product_id: "",
        quantity: 0.0,
        price: 0.0,
        amount: 0.0,
        discount: 0.0,
      });
    },

    deleteDetail(indexItem) {
      this.form.quotation_details = this.form.quotation_details.filter(
        (_, index) => index != indexItem
      );

      this.countTotal();
    },

    onChangeDiscountType() {
      this.form.quotation_details.forEach((_, index) => {
        this.itemChange(index);
      });
    },

    itemChange(index) {
      let detail = {
        ...this.form.quotation_details[index],
      };

      let discount_type = this.form.discount_type;

      if (
        parseFloat(detail.quantity) >= 0.0 &&
        parseFloat(detail.price) >= 0.0
      ) {
        if (discount_type == "NOMINAL") {
          if (parseFloat(detail.discount) > parseFloat(detail.price)) {
            detail.discount = parseFloat(detail.price);
          }

          detail.amount =
            (parseFloat(detail.price) - parseFloat(detail.discount)) *
            parseFloat(detail.quantity);
        } else {
          if (parseFloat(detail.discount) > 100.0) {
            detail.discount = 100.0;
          }

          if (parseFloat(detail.discount) <= 0.0) {
            detail.discount = 0.0;
          }

          let total_discount =
            (parseFloat(detail.price) * parseFloat(detail.discount)) / 100;

          detail.amount =
            (parseFloat(detail.price) - total_discount) *
            parseFloat(detail.quantity);
        }

        this.form.quotation_details[index].amount = Math.ceil(detail.amount);

        this.form.quotation_details[index].discount = detail.discount;

        this.countTotal();
      }
    },

    countTotal() {
      let {
        total,
        discount,
        total_discount_nominal,
        tax,
        grand_total,
        discount_type,
      } = this.form;

      let taxSetting = this.tax;

      let details = [...this.form.quotation_details];

      let total_discount = 0.0;

      total = details.reduce(
        (amount, item) => parseFloat(amount) + parseFloat(item.amount),
        0.0
      );

      if (discount_type == "NOMINAL") {
        if (
          parseFloat(discount) > parseFloat(total) &&
          parseFloat(total) > 0.0
        ) {
          discount = total;
        }

        if (parseFloat(total) <= 0.0) {
          discount = 0.0;
        }

        total_discount = parseFloat(discount);
      } else {
        if (parseFloat(discount) > 100.0) {
          discount = 100.0;
        }

        if (parseFloat(total) <= 0.0) {
          discount = 0.0;
        }

        total_discount = (parseFloat(total) * parseFloat(discount)) / 100.0;
      }

      total_discount_nominal = parseFloat(total) - parseFloat(total_discount);

      tax =
        parseFloat(taxSetting) * (parseFloat(total_discount_nominal) / 100.0);

      grand_total = parseFloat(total_discount_nominal) + parseFloat(tax);

      this.form = {
        ...this.form,
        discount,
        total_discount_nominal: Math.ceil(total_discount_nominal),
        total: Math.ceil(total),
        tax: Math.ceil(tax),
        grand_total: Math.ceil(grand_total),
      };
    },

    onSetProduct(index) {
      let details = [...this.form.quotation_details];

      let itemProduct = {
        ...this.form.quotation_details[index],
      };

      let customer = this.form.customer_id;
      
      if(!itemProduct.product_id) {
          this.form.quotation_details[index].product_id = '';
          return
      };    

      let product = itemProduct.product_id;

      let product_prices = product.product_prices;

      let price = 0.0;

      if (
        product_prices &&
        Array.isArray(product_prices) &&
        product_prices.length &&
        customer
      ) {
        let name = customer.customer_group ? customer.customer_group.name : "";

        let product_price = product_prices.find(
          (item) => item.name.toLowerCase() == name.toLowerCase()
        );

        price = !product_price ? product_prices[0].price : product_price.price;
      } else {
        price = itemProduct.price > 0.0 ? itemProduct.price : 0;
      }

      let products = details.filter(
        (item) => (item.product_id ? item.product_id.id : 0) == product.id
      );

      if (products.length < 2) {
        this.form.quotation_details[index].price = price;

        this.itemChange(index);
      } else {
        this.$toaster.error("Product sudah ada di dalam list");

        this.form.quotation_details = details.filter(
          (_, indexItem) => index != indexItem
        );
      }
    },

    onSetCustomer(customer) {
      let details = [...this.form.quotation_details];

      if (customer) {
        details = details.map((item) => {
          if (!item.product_id) {
            return {
              ...item,
              price: item.price > 0.0 ? item.price : 0.0,
            };
          }

          let product_prices = item.product_id.product_prices;

          if (
            !product_prices ||
            !Array.isArray(product_prices) ||
            !product_prices.length
          ) {
            return {
              ...item,
              price: item.price > 0.0 ? item.price : 0.0,
            };
          }

          let name = customer.customer_group
            ? customer.customer_group.name
            : "";

          let product_price = product_prices.find(
            (item) => item.name.toLowerCase() == name.toLowerCase()
          );

          return {
            ...item,
            price: !product_price
              ? product_prices[0].price
              : product_price.price,
          };
        });
      } else {
        this.form.customer_id = '';
        
        details = details.map((item) => {
          return {
            ...item,
            price: item.price > 0.0 ? item.price : 0.0,
          };
        });
      }

      this.form.quotation_details = [...details];

      this.form.quotation_details.forEach((_, index) => {
        this.itemChange(index);
      });
    },
  },
};
</script>
