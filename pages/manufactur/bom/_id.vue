<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>{{ isEditable ? "Edit" : "Tambah" }} Bill of Material</h6>

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

                  <div class="col-sm-2">
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

                  <div class="col-sm-8">
                    <div class="form-group">
                      <div class="row" style="heigth:30px">
                        <div class="col-sm-2 align-self-center">
                          <label for="product_id">Produk</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <v-select
                            label="name"
                            :loading="isLoadingGetProduct"
                            :options="lookup_products.data"
                            :filterable="false"
                            @search="onGetProduct"
                            v-model="form.product_id"
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
                                :required="!form.product_id"
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
                                  lookup_products.last_page >
                                  lookup_products.current_page
                                "
                                @click="onGetProduct(search, true)"
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
                <div class="col-sm-3">
                      <ValidationProvider name="date" rules="required">
                        <div class="form-group " slot-scope="{ errors, valid }">
                          <div class="row">
                            <div class="col-sm-2 align-self-center">
                              <label for="date">Mengkeret</label>
                            </div>
                            <div class="col-sm-10 align-self-center">
                              <input
                                type="number"
                                class="form-control form-control-sm"
                                name="date"
                                v-model="form.mengkeret"
                                :class="errors[0]
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
                        Process
                      </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Kode
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 30%"
                    >
                      Material
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Unit
                    </td>                                            
                    <!-- <td
                      class="text-left table-transaction-header"
                      style="width: 10%"
                    >
                      Standart Cost
                    </td> -->
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Pemakaian
                    </td>            
                    <!-- <td
                      class="text-left table-transaction-header"
                      style="width: 10%"
                    >
                      Total Cost
                    </td> -->
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
                    v-for="(item, index) in form.bom_details"
                    :key="index"
                  >
                  <td class="table-transaction-row">
                        <v-select
                          label="name"
                          :loading="isLoadingGetProces"
                          :options="lookup_proces.data"
                          :filterable="false"
                          @search="onGetProces"
                          v-model="item.master_proces_id"
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
                              :required="!item.master_proces_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template>
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_proces.data.length || search"
                          >
                            <span
                              v-if="lookup_proces.current_page > 1"
                              @click="onGetProces(search, false)"
                              class="flex-fill bg-primary text-white text-center"
                              style="cursor: pointer"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="lookup_proces.last_page >
                                lookup_proces.current_page
                                "
                              @click="onGetProces(search, true)"
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
                        :value="item.product_id ? item.product_id.code : '-'"
                        disabled
                      />
                    </td>

                    <td class="table-transaction-row">
                      <v-select
                        label="name"
                        :loading="isLoadingGetProductMaterial"
                        :options="lookup_product_materials.data"
                        :filterable="false"
                        @search="onGetProductMaterial"
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
                          v-if="lookup_product_materials.data.length || search"
                        >
                          <span
                            v-if="lookup_product_materials.current_page > 1"
                            @click="onGetProductMaterial(search, false)"
                            class="flex-fill bg-primary text-white text-center"
                            style="cursor: pointer"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_product_materials.last_page >
                              lookup_product_materials.current_page
                            "
                            @click="onGetProductMaterial(search, true)"
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
                          item.product_id ? item.product_id.purchase_unit : '-'
                        "
                        disabled
                      />
                    </td>
                 
                    <!-- <td class="table-transaction-row">               
                      <money
                        v-model="item.cost_of_products_sold"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />              
                    </td> -->

                    <td class="table-transaction-row">
                      <!-- <money
                        v-model="item.quantity"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        @keyup.native="itemChange(index)"
                      /> -->

                      <input
                          type="number"
                          class="form-control"
                           v-model="item.quantity"
                        />
                    </td>    

                    <!-- <td class="table-transaction-row">
                      <money
                        v-model="item.amount"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        disbaled
                      />
                    </td> -->
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

                  <tr v-if="!form.bom_details.length">
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
                    <!-- <td colspan="2" class="text-right pt-3 border-top">Total Material</td>
                    <td colspan="2" class="border-top">
                      <money
                        v-model="form.total_material"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td> -->
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
      title: "Bill of Material",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,

      isLoadingPage: Number.isInteger(id) ? true : false,

      isLoadingForm: false,

      isStopSearchProces: false,
      isLoadingGetProces: false,
      proces_search: '',
      
      isStopSearchProduct: false,
      isLoadingGetProduct: false,
      product_search: "",

      isStopSearchProductMaterial : false,
      isLoadingGetProductMaterial : false,
      product_material_search : "",

      form: {
        product_id : "",
        code: "",
        description: "",
        date: moment().format("YYYY-MM-DD"),
        bom_details: [],
        total_material : 0.00
      },       

      default_form: {
        product_id : "",
        code: "",
        description: "",
        date: moment().format("YYYY-MM-DD"),
        bom_details: [],
        total_material : 0.00
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("manufactur/bom/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != " bom_details") {
            if (item === "total_material") {
              let total_material = response.data.bom_details.reduce((itemPrev,itemNext) => {            
                let total = itemNext.product 
                  ? (parseFloat(itemNext.product.cost_of_products_sold) * parseFloat(itemNext.quantity))
                  : 0;          

                return itemPrev + total;
              },0)          

              this.form[item] = total_material;
            } else if (item === "product_id"){
              this.form[item] = response.data.product;
              this.form.mengkeret = response.data.product.mengkeret;

            } else {
              this.form[item] = response.data[item];
            }
          }
        });

        this.form.bom_details = response.data.bom_details.map(
          (item) => {
            return {
              ...item,
              amount : parseFloat(item.product ? item.product.cost_of_products_sold : 0) * parseFloat(item.quantity),
              cost_of_products_sold : item.product ? item.product.cost_of_products_sold : 0,
              product_id: item.product,
              master_proces_id: item.master_proces,

            };
          }
        );

        this.isLoadingPage = false;
      }
    } catch (err) {
      this.$router.push("/manufactur/bom");
    }
  },

  async mounted() {
    await this.onSearchProduct();
    await this.onSearchProces();

    await this.onSearchProductMaterial();

    if (!this.isEditable) {
      this.setCode();
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "lookup_products", 
      "lookup_product_materials",
      "lookup_proces",
      "code"
    ])
  },

  methods: {
    ...mapActions("moduleApi", [
      "lookUp", 
      "getCode"
    ]),

    onGetProces(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProces);

      this.isStopSearchProces = setTimeout(() => {
        this.proces_search = search;

        if (typeof isNext !== "function") {
          this.lookup_proces.current_page = isNext
            ? this.lookup_proces.current_page + 1
            : this.lookup_proces.current_page - 1;
        } else {
          this.lookup_proces.current_page = 1;
        }

        this.onSearchProces();
      }, 600);
    },

    async onSearchProces() {
      if (!this.isLoadingGetProces) {
        this.isLoadingGetProces = true;

        await this.lookUp({
          url: "setting/masterprocess",
          lookup: "proces",
          query: 
            "?search=" + this.proces_search +
            "&jenis=0&page=" + this.lookup_proces.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProces = false;
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
          url: "manufactur/bom/get-product",
          lookup: "products",
          query:
            "?search=" +  this.product_search +
            "&page=" + this.lookup_products.current_page +
            "&per_page=5",
        });

        this.isLoadingGetProduct = false;
      }
    },

    onGetProductMaterial(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProductMaterial);

      this.isStopSearchProductMaterial = setTimeout(() => {
        this.product_material_search = search;

        if (typeof isNext !== "function") {
          this.lookup_product_materials.current_page = isNext
            ? this.lookup_product_materials.current_page + 1
            : this.lookup_product_materials.current_page - 1;
        } else {
          this.lookup_product_materials.current_page = 1;
        }

        this.onSearchProductMaterial();
      }, 600);
    },

    async onSearchProductMaterial() {
      if (!this.isLoadingGetProductMaterial) {
        this.isLoadingGetProductMaterial = true;

        await this.lookUp({
          url: "manufactur/bom/get-product",
          lookup: "product_materials",
          query:          
            "?search=" + this.product_material_search +
            "&page=" + this.lookup_product_materials.current_page +
            // "&is_material=true" + 
            "&per_page=5",
        });

        this.isLoadingGetProductMaterial = false;
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      if (!this.form.bom_details.length) {
        this.$toaster.error("Detail Product Material Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "manufactur/bom";

      let formData = {
        ...this.form,
        product_id:
          typeof this.form.product_id == "object"
            ? this.form.product_id.id
            : "",
      };

      formData.bom_details = formData.bom_details.map((item) => {
        return {    
          quantity: item.quantity,
          description : item.description,
          product_id:
            typeof item.product_id == "object" 
              ? item.product_id.id 
              : "",
          master_proces_id:
            typeof item.master_proces_id == "object"
              ? item.master_proces_id.id
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
          this.$toaster.success("Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Product Material");

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              bom_details: [],
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
                "/manufactur/bom/get-print-detail/" +
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
        url: "manufactur/bom",
        query: "",
      });

      this.form.code = this.code;
    },

    addDetail() {      
      this.form.bom_details.push({
        product_id: "",
        quantity: 0.0,      
        amount: 0.0,  
        cost_of_products_sold : 0.0,
        description : ""        
      });
    },

    deleteDetail(indexItem) {
      this.form.bom_details = this.form.bom_details.filter(
        (_, index) => index != indexItem
      );

      this.countTotal();
    },

    onSetProduct(index){    
      let itemProduct = {
        ...this.form.bom_details[index],            
      };

      if(!itemProduct.product_id) {
        this.form.bom_details[index].product_id = '';
        return
      };

      this.form.bom_details[index].cost_of_products_sold = itemProduct.product_id.cost_of_products_sold;
    },
    
    itemChange(index){                
      let detail = {
        ...this.form.bom_details[index]
      };

      this.form.bom_details[index].amount = (parseFloat(detail.quantity) * parseFloat(detail.cost_of_products_sold));

      this.countTotal();
    },      

    countTotal(){                 
      let details = [ 
        ...this.form.bom_details 
      ];        

      let total = details.reduce((amount,item) => parseFloat(amount) + parseFloat(item.amount),0.00);
  
      this.form = {
          ...this.form, 
          total_material : total 
      }        
    },
  },
};
</script>
