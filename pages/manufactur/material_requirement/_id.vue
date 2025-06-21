<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>
                {{ isEditable ? "Edit" : "Tambah" }} Permintaan Material
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
                          <label for="production_id">Rencana Produksi</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <v-select
                            label="code"
                            :loading="isLoadingGetWorkOrder"
                            :options="lookup_work_orders.data"
                            :filterable="false"
                            @search="onGetWorkOrder"
                            @input="onSetWorkOrder"
                            v-model="form.production_id"
                            :disabled="isEditable">
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
                                :required="!form.production_id"
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
                  
                  <div class="col-sm-6">
                    <ValidationProvider name="product_id" rules="required">
                      <div class="form-group row"
                        slot-scope="{ errors,valid }">
                        <div class="col-sm-2 align-self-center">
                          <label for="product_id">Produk</label>
                        </div>

                        <div class="col-sm-10 align-self-center">
                          <select
                            class="form-control"
                            v-model="form.product_id"
                            @change="onProductChange"
                            :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                            :disabled="isEditable">
                            <option value="">Pilih</option>
                            <option
                              v-for="(item,index) in (form.production_id ? form.production_id.production_details : [])"
                              :value="item.product ? item.product.id : ''"
                              :key="index">
                              <!-- {{ item.product ? item.product.name : "-" }} -->
                              {{ item.no_batch ? item.no_batch : "-" }}

                              (Qty : {{ item.quantity }})
                            </option>
                          </select>

                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
              </div>   
              
               <div class="container m-0 p-0">
                  <div class="d-flex flex-row">
                    <div class="col-sm-6">
                      <ValidationProvider name="gudang" rules="required">
                        <div class="form-group " slot-scope="{ errors, valid }">
                          <div class="row">
                            <div class="col-sm-2 align-self-center">
                              <label for="date">Gudang</label>
                            </div>
                        <div class="col-sm-10 align-self-center">
                            <v-select                           
                                                  label="name"   
                                                  :loading="isLoadingGetWarehouse"
                                                  :options="lookup_warehouses.data"
                                                  :filterable="false"
                                                  @search="onGetWarehouse"
                                                  v-model="form.warehouse_id">              
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
                                                      :required="!form.warehouse_id"
                                                      v-bind="attributes"
                                                      v-on="events"
                                                      />
                                                  </template>   
                                                  <li slot-scope="{search}" slot="list-footer"
                                                      class="d-flex justify-content-between"
                                                      v-if="lookup_warehouses.data.length || search">
                                                      <span v-if="lookup_warehouses.current_page > 1" 
                                                          @click="onGetWarehouse(search, false)"
                                                          class="flex-fill bg-primary text-white text-center"
                                                          style="cursor:pointer">Sebelumnya</span>
                                                      <span v-if="lookup_warehouses.last_page > lookup_warehouses.current_page" 
                                                          @click="onGetWarehouse(search, true)"
                                                          class="flex-fill bg-primary text-white text-center"
                                                          style="cursor:pointer">Selanjutnya</span>
                                                  </li> 
                                              </v-select> 
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
                      Material
                    </td>                
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Qty Bom
                    </td>      
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Qty Stok
                    </td>         
                    <td class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Qty Diterima
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
                    v-for="(item, index) in form.material_requirement_details"
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
                      <money
                        v-model="item.quantity_bom"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
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
                        disabled
                      />
                    </td>    

                    <td class="table-transaction-row">
                      <money
                        v-model="item.quantity_receive"
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

                  <tr v-if="!form.material_requirement_details.length">
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

                <!-- {{ form.product_id ? form.production_id.production_details : "-" }} -->
                
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
      title: "Permintaan Material",
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

      isStopSearchWarehouse: false,
      isLoadingGetWarehouse: false,
      warehouse_search: '',

      isStopSearchProductMaterial : false,
      isLoadingGetProductMaterial : false,
      product_material_search : "",

      form: {
        product_id : "",
        production_id : "",
        code: "",
        description: "",
        production_detail_id:"",
        quantity : 0.00,
        date: moment().format("YYYY-MM-DD"),
        material_requirement_details: [],
        production_details :[],
      },       

      default_form: {
        product_id : "",
        production_id : "",
        code: "",
        description: "",
        production_detail_id: "",
        quantity : 0.00,
        date: moment().format("YYYY-MM-DD"),
        material_requirement_details: [],
        production_details:[],
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("manufactur/material_requirement/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != "materail_requirement_details") {
            if(item === "production_id"){
              this.form[item] = response.data.work_order;
            }else {
              this.form[item] = response.data[item];
            }
          }
        });

        this.form.material_requirement_details = response.data.material_requirement_details.map(
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
      this.$router.push("/manufactur/material_requirement");
    }
  },

  async mounted() {
    await this.onSearchWorkOrder();
    await this.onSearchWarehouse();
    await this.onSearchProductMaterial();


    if (!this.isEditable) {
      this.setCode();
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "lookup_product_materials",
      "lookup_work_orders",
      "lookup_warehouses",

      "code"
    ])
  },

  methods: {
    ...mapActions("moduleApi", [
      "lookUp", 
      "getCode"
    ]),

    onGetWarehouse(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchWarehouse);

      this.isStopSearchWarehouse = setTimeout(() => {
        this.warehouse_search = search;

        if (typeof isNext !== "function") {
          this.lookup_warehouses.current_page = isNext
            ? this.lookup_warehouses.current_page + 1
            : this.lookup_warehouses.current_page - 1;
        } else {
          this.lookup_warehouses.current_page = 1;
        }

        this.onSearchWarehouse();
      }, 600);
    },

    async onSearchWarehouse() {
      if (!this.isLoadingGetWarehouse) {
        this.isLoadingGetWarehouse = true;

        await this.lookUp({
          url: "inventory/stock_opname/get-warehouse",
          lookup: "warehouses",
          query: "?search="
            + this.warehouse_search +
            "&page="
            + this.lookup_warehouses.current_page +
            "&per_page=10"
        })

        this.isLoadingGetWarehouse = false;
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
          url: "manufactur/material_requirement/get-product",
          lookup: "product_materials",
          query:          
            "?search=" + this.product_material_search +
            "&page=" + this.lookup_product_materials.current_page +
            "&is_material=true" + 
            "&per_page=5",
        });

        this.isLoadingGetProductMaterial = false;
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
          url: "manufactur/material_requirement/rencanaproduksi",
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

      if (!this.form.material_requirement_details.length) {
        this.$toaster.error("Detail Permintaan Material Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "manufactur/material_requirement";

      let formData = {
        ...this.form,
        production_id :   
          typeof this.form.production_id == "object"
            ? this.form.production_id.id 
            : "",    
        // production_detail_id:
        //   typeof this.form.production_id == "object"
        //     ? this.form.production_id.production_details.id
        //     : "",
        warehouse_id:
          typeof this.form.warehouse_id == "object"
            ? this.form.warehouse_id.id
            : "",
      };


      formData.material_requirement_details = formData.material_requirement_details.map((item) => {
        return {    
          quantity: item.quantity,
          quantity_bom : item.quantity_bom,
          quantity_receive : item.quantity_receive,
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
          this.$toaster.success("Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Permintaan Materail");

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              material_requirement_details: [],
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
                "/manufactur/material_requirement/get-print-detail/" +
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
        url: "manufactur/material_requirement",
        query: "",
      });

      this.form.code = this.code;
    },

    addDetail() {      
      this.form.material_requirement_details.push({
        product_id: "",
        quantity: 0.0,   
        quantity_bom : 0.0,   
        quantity_receive : 0.0,    
        description : ""        
      });
    },

    deleteDetail(indexItem) {
      this.form.material_requirement_details = this.form.material_requirement_details.filter(
        (_, index) => index != indexItem
      );
    },

    onSetProduct(index){    
      let itemProduct = {
        ...this.form.material_requirement_details[index],            
      };

      if(!itemProduct.product_id) {
        this.form.material_requirement_details[index].product_id = '';
        return
      };
    },

    onSetWorkOrder(item){
      if(item){

      }else{
        this.form.production_id = "";
        this.form.product_id = "";
      }
    },

    onProductChange(){
      if(
        this.form.product_id && 
        this.form.production_id
      ){        
        let itemProduct = this.form
          .production_id
          .production_details.find(item => item.product_id == this.form.product_id)

        this.form.quantity = itemProduct ? itemProduct.quantity : 0;

        this.$axios.get("manufactur/material_requirement/get-bom/"+itemProduct.product_id)
          .then(res => {
            if(res.data.bom){
              if(
                res.data.bom.bom_details && 
                res.data.bom.bom_details.length
              ){            
                this.form.material_requirement_details = res.data.bom.bom_details.map(item => {
                  return {
                    quantity : (parseFloat(item.quantity) * parseFloat(itemProduct.quantity)),
                    quantity_bom : item.quantity,
                    quantity_receive : 0,
                    product_id : item.product || "",
                    description : ""
                  } 
                })
              }
            }
          });      
      }
    }
  },
};
</script>
