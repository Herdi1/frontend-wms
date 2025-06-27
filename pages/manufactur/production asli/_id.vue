<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>
                {{ isEditable ? "Edit" : "Tambah" }} Produksi
              </h6>

              <button class="btn btn-primary btn-sm" 
                @click="$router.back()">
                <i class="fas fa-arrow-left"></i>
                Kembali
              </button>
            </div>
          </div>

          <ValidationObserver
            v-slot="{ invalid, validate }"
            ref="form-validate">
            <form
              @submit.prevent="() => console.log('Submit')"
              autocomplete="off">
              <div class="container m-0 p-0">
                <div class="d-flex flex-row">
                  <div class="col-sm-6">
                    <ValidationProvider name="code" rules="required">
                      <div class="form-group" slot-scope="{ errors, valid }">
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

                  <div class="col-sm-6">
                    <div class="form-group">
                      <div class="row" style="heigth:30px">
                        <div class="col-sm-2 align-self-center">
                          <label for="work_order_id">Spk Produksi</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <v-select
                            label="code"
                            :loading="isLoadingGetWorkOrder"
                            :options="lookup_work_orders.data"
                            :filterable="false"
                            @search="onGetWorkOrder"
                            @input="onSetWorkOrder"
                            v-model="form.work_order_id"
                            :disabled="isEditable"
                          >
                            <template v-slot:option="option">
                              <div class="row">
                                <div class="col-md-5 p-1 m-0">
                                  {{ option.code }}
                                </div>
                                <div class="col-md-7 p-1 m-0 text-right">
                                  {{ option.name }}
                                </div>
                              </div>
                            </template>
                            <template #search="{ attributes, events }">
                              <input
                                class="vs__search"
                                :required="!form.work_order_id"
                                v-bind="attributes"
                                v-on="events"
                              />
                            </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="d-flex justify-content-between"
                              v-if="lookup_work_orders.data.length || search"
                            >
                              <span
                                v-if="lookup_work_orders.current_page > 1"
                                @click="onGetWorkOrder(search, false)"
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
                                  lookup_work_orders.last_page >
                                  lookup_work_orders.current_page
                                "
                                @click="onGetWorkOrder(search, true)"
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
              </div>  

              <div class="container m-0 p-0">
                <div class="d-flex flex-row">
                  <div class="col-sm-6">
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
                </div>
              </div>                    
                                                            
              <div class="clearfix mt-2">
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
                      style="width: 20%"
                    >
                      Produk
                    </td>                
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Qty Produksi
                    </td>           
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Qty Finish
                    </td>                               
                    <td
                      class="text-left table-transaction-header"
                      style="width: 10%"
                    >
                      Deskripsi
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 1%"
                    >
                      Opsi
                    </td>
                  </tr>
                  <tr
                    v-for="(item, index) in form.production_details"
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
                        :disabled="true"
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
                      <money
                        v-model="item.quantity"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        :disabled="true"
                      />
                    </td>    

                    <td class="table-transaction-row">
                      <money
                        v-model="item.quantity_finish"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>    
                    
                    <td class="table-transaction-row">
                      <textarea 
                        class="form-control"
                        v-model="item.description"></textarea>
                    </td>

                    <td class="text-center table-transaction-row">
                      <i
                        class="fas fa-trash text-danger"
                        style="cursor: pointer;vertical-align:midle"
                        @click="deleteDetail(index)"
                      ></i>
                    </td>
                  </tr>

                  <tr v-if="!form.production_details.length">
                    <td colspan="5" class="text-center pt-4 pb-4">
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
                  </tr>                  
                </table>
                
                <div class="mt-5 mb-5" style="height: 100px"></div>
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
              ">
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
      title: "Produksi",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,

      isLoadingPage: Number.isInteger(id) ? true : false,

      isLoadingForm: false,
    
      isStopSearchWorkOrder: false,
      isLoadingGetWorkOrder: false,
      work_order_search: "",

      isStopSearchProduct : false,
      isLoadingGetProduct : false,
      product_search : "",

      form: {
        work_order_id : "",
        code: "",
        description: "",
        quantity : 0.00,
        date: moment().format("YYYY-MM-DD"),
        production_details: [],
      },       

      default_form: {
        work_order_id : "",
        code: "",
        description: "",
        quantity : 0.00,
        date: moment().format("YYYY-MM-DD"),
        production_details: [],
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("manufactur/production/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != "production_details") {
            if(item === "work_order_id"){
              this.form[item] = response.data.work_order;
            }else {
              this.form[item] = response.data[item];
            }
          }
        });

        this.form.production_details = response.data.production_details.map(
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
      this.$router.push("/manufactur/production");
    }
  },

  async mounted() {
    await this.onSearchWorkOrder();

    await this.onSearchProduct();

    if (!this.isEditable) {
      this.setCode();
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "lookup_products",
      "lookup_work_orders",
      "code"
    ])
  },

  methods: {
    ...mapActions("moduleApi", [
      "lookUp", 
      "getCode"
    ]),

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
          url: "manufactur/production/get-product",
          lookup: "products",
          query:          
            "?search=" + this.product_search +
            "&page=" + this.lookup_products.current_page +  
            "&per_page=5",
        });

        this.isLoadingGetProduct = false;
      }
    },

    onGetWorkOrder(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchWorkOrder);

      this.isStopSearchWorkOrder = setTimeout(() => {
        this.work_order_search = search;

        if (typeof isNext !== "function") {
          this.lookup_work_orders.current_page = isNext
            ? this.lookup_work_orders.current_page + 1
            : this.lookup_work_orders.current_page - 1;
        } else {
          this.lookup_work_orders.current_page = 1;
        }

        this.onSearchWorkOrder();
      }, 600);
    },

    async onSearchWorkOrder() {
      if (!this.isLoadingGetWorkOrder) {
        this.isLoadingGetWorkOrder = true;

        await this.lookUp({
          url: "manufactur/production/get-work-order",
          // url: "manufactur/material_requirement/get-wm ork-order",
          lookup: "work_orders",
          query:
            "?search=" +  this.work_order_search +
            "&page=" + this.lookup_work_orders.current_page +
            "&per_page=5",
        });

        this.isLoadingGetWorkOrder = false;
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      if (!this.form.production_details.length) {
        this.$toaster.error("Detail Produksi Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "manufactur/production";

      let formData = {
        ...this.form,
        work_order_id :   
          typeof this.form.work_order_id == "object"
            ? this.form.work_order_id.id 
            : "",    
      };

      formData.production_details = formData.production_details.map((item) => {
        return {    
          quantity: item.quantity,
          quantity_finish : item.quantity_finish,
          description : item.description,
          product_id:
            typeof item.product_id == "object" 
              ? item.product_id.id 
              : "",
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
          this.$toaster.success("Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Produksi");

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              production_details: [],
            };

            this.setCode();
            
            this.$refs['form-validate'].reset();

            this.onPrint(res.data.id);

            this.onSearchWorkOrder();
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
                "/manufactur/production/get-print-detail/" +
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
        url: "manufactur/production",
        query: "",
      });

      this.form.code = this.code;
    },

    addDetail() {      
      this.form.production_details.push({
        product_id: "",
        quantity: 0.0,     
        quantity_finish : 0.0,     
        description : ""        
      });
    },

    deleteDetail(indexItem) {
      this.form.production_details = this.form.production_details.filter(
        (_, index) => index != indexItem
      );
    },

    onSetProduct(index){    
      let itemProduct = {
        ...this.form.production_details[index],            
      };

      if(!itemProduct.product_id) {
        this.form.production_details[index].product_id = '';
        return
      };
    },

    onSetWorkOrder(item){
      if(item){
        this.form.production_details = item.work_order_details.map(item => {
          return {
            product_id : item.product,
            description : "",
            quantity : item.quantity,
            quantity_finish : 0.00
          }
        })
        console.log(item);
      }else{
        this.form.work_order_id = "";
      }
    }
  },
};
</script>
