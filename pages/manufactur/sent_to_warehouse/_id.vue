<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>
                {{ isEditable ? "Edit" : "Tambah" }} Kirim Ke Gudang
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
                                <label for="warehouse_id">Proces</label>
                              </div>
                              <div class="col-sm-10 align-self-center">
                                <v-select
                                  label="name"
                                  :loading="isLoadingGetProces"
                                  :options="lookup_proces.data"
                                  :filterable="false"
                                  @search="onGetProces"
                                  v-model="form.master_proces_id"
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
                                      :required="!form.master_proces_id"
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
                                      class="
                                  flex-fill
                                  bg-primary
                                  text-white text-center
                                "
                                      style="cursor: pointer"
                                      >Sebelumnya</span
                                    >
                                    <span
                                      v-if="lookup_proces.last_page >
                                        lookup_proces.current_page
                                        "
                                      @click="onGetProces(search, true)"
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
                    <div class="form-group">
                      <div class="row" style="heigth:30px">
                        <div class="col-sm-2 align-self-center">
                          <label for="warehouse_id">Gudang</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <v-select
                            label="name"
                            :loading="isLoadingGetWarehouse"
                            :options="lookup_warehouses.data"
                            :filterable="false"
                            @search="onGetWarehouse"
                            @input="onSetWarehouse"
                            v-model="form.warehouse_id"
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
                                :required="!form.warehouse_id"
                                v-bind="attributes"
                                v-on="events"
                              />
                            </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="d-flex justify-content-between"
                              v-if="lookup_warehouses.data.length || search"
                            >
                              <span
                                v-if="lookup_warehouses.current_page > 1"
                                @click="onGetWarehouse(search, false)"
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
                                  lookup_warehouses.last_page >
                                  lookup_warehouses.current_page
                                "
                                @click="onGetWarehouse(search, true)"
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
              
              <div class="container m-0 p-0 mt-3">
                    <div class="d-flex flex-row">
                      <div class="col-sm-6">
                        <div class="form-group">
                        <div class="row" style="heigth:30px">
                          <div class="col-sm-2 align-self-center">
                            <label for="production_id">Import Packing List</label>
                          </div>
                          <div class="col-sm-10 align-self-center">
                            <v-select
                              label="code"
                              :loading="isLoadingGetProduction"
                              :options="lookup_productions.data"
                              :filterable="false"
                              @search="onGetProduction"
                              @input="onSetProduction"
                              v-model="form.packing_list_id"
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
                                  :required="!form.packing_list_id"
                                  v-bind="attributes"
                                  v-on="events"
                                />
                              </template>
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="d-flex justify-content-between"
                                v-if="lookup_productions.data.length || search"
                              >
                                <span
                                  v-if="lookup_productions.current_page > 1"
                                  @click="onGetProduction(search, false)"
                                  class="
                                  flex-fill
                                  bg-primary
                                  text-white text-center
                                "
                                  style="cursor: pointer"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="lookup_productions.last_page >
                                    lookup_productions.current_page
                                    "
                                  @click="onGetProduction(search, true)"
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

                  <!-- {{form.packing_list_id}} -->

                                       
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
              

              <!-- {{form.sent_to_warehouse_details}} -->
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
                        style="width: 20%"
                      >
                        Batch
                      </td> 
                      <td
                        class="text-left table-transaction-header"
                        style="width: 5%"
                      >
                        Grade
                      </td> 
                    <td 
                      class="text-left table-transaction-header"
                      style="width: 5%">
                      Quantity 
                    </td>   
                     <td 
                        class="text-left table-transaction-header"
                        style="width: 5%">
                        Unit 
                      </td>      
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      PC Count
                    </td>   
                    <td
                        class="text-left table-transaction-header"
                        style="width: 3%"
                      >
                        Lihat
                      </td>                      
                    <td
                      class="text-left table-transaction-header"
                      style="width: 1%"
                    >
                      Opsi
                    </td>
                  </tr>
                  <tr
                    v-for="(item, index) in form.sent_to_warehouse_details"
                    :key="index"
                  >
                    <td class="table-transaction-row">
  <input
                          type="hidden"
                          class="form-control"
                          :value="item.packing_list_id"
                        />

                          <input
                            type="hidden"
                            class="form-control"
                            :value="item.weight"
                          />

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
                          :value="item.production_detail ? item.production_detail.no_batch : '-'"
                          disabled
                        />
                      </td>

                      <td class="table-transaction-row">
                        <input
                          type="text"
                          class="form-control"
                          :value="item.grade_id ? item.grade_id.code : '-'"
                          disabled
                        />
                      </td>

                    <td class="table-transaction-row">
                      <money
                        v-model="item.quantity_finish"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        :disabled="true"
                      />
                    </td>  

                    <td class="table-transaction-row">
                        <input
                          type="text"
                          class="form-control"
                          :value="item.product_id ? item.product_id.selling_unit : '-'"
                          disabled
                        />
                      </td>  

                    <td class="table-transaction-row">
                      <money
                        v-model="item.packing_count"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        :disabled="true"
                      />
                    </td>    

                      <td class="text-center table-transaction-row">
                        <i
                          class="fas fa-info-circle text-info"
                          style="cursor: pointer;vertical-align:midle"
                          @click="onDetail(item)"
                        ></i>
                      </td>


                    <td class="text-center table-transaction-row">
                      <i
                        class="fas fa-trash text-danger"
                        style="cursor: pointer;vertical-align:midle"
                        @click="deleteDetail(index)"
                      ></i>
                    </td>
                  </tr>

                  <tr v-if="!form.sent_to_warehouse_details.length">
                    <td colspan="5" class="text-center pt-4 pb-4">
                      Data tidak ditemukan
                    </td>
                  </tr>
                  
                  <tr>
                    <td colspan="3" class="text-left border-top table-success">                        
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

    <ModalDetail
          :self="this"
          ref="modal-detail"
        />
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import ModalDetail from "./detaillist";


export default {
  middleware : ['checkRoleUserDetail'],

  head() {
    return {
      title: "Kirim Ke Gudang",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,

      isLoadingPage: Number.isInteger(id) ? true : false,

      isLoadingForm: false,
    
      isStopSearchProduction: false,
      isLoadingGetProduction: false,
      production_search: "",

      isStopSearchWarehouse: false,
      isLoadingGetWarehouse: false,
      warehouse_search : "",

      isStopSearchProduct : false,
      isLoadingGetProduct : false,
      product_search: "",

      isStopSearchProces: false,
      isLoadingGetProces: false,
      proces_search: "",

      parameters: {
        isLoadingData: false,
        form: {
          checkboxs: [],
          sent_to_warehouse_details: [],

        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },

      form: {
        packing_list_id : "",
        warehouse_id : "",
        code: "",
        description: "",  
        master_proces_id:"",
        date: moment().format("YYYY-MM-DD"),
        sent_to_warehouse_details: [],
        roll: {
          product:[]
        }
      },       

      default_form: {
        packing_list_id : "",
        warehouse_id : "",
        code: "",
        description: "", 
        master_proces_id: "", 
        date: moment().format("YYYY-MM-DD"),
        sent_to_warehouse_details: [],
      },

      production_details : []
    };
  },

   components: {
    // FormInput,
    ModalDetail
  },


  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("manufactur/sent_to_warehouse/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != "sent_to_warehouse_details") {
            // if(item === "production_id"){
            //   this.form[item] = response.data.production;
            // } else
            if (item == "warehouse_id") {
              this.form[item] = response.data.warehouse;
            } else if (item == "master_proces_id") {
              this.form[item] = response.data.master_proces;
            } else {
              this.form[item] = response.data[item];
            }
          }
        });

        this.form.sent_to_warehouse_details = response.data.sent_to_warehouse_details.map(
          (item) => {
            return {
              ...item,
              product_id: item.product,       
              grade_id: item.grade,
              packing_count: item.jumlah_roll,
              detail_packing_list: item.packing_list.detail_packing_list,

            };
          }
        );

        this.isLoadingPage = false;
      }
    } catch (err) {
      this.$router.push("/manufactur/sent_to_warehouse");
    }
  },

  async mounted() {
    await this.onSearchProduction();
    await this.onSearchProces();
    await this.onSearchWarehouse();

    if (!this.isEditable) {
      this.setCode();
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "lookup_warehouses",
      "lookup_products",
      "lookup_productions",
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
            "&page=" + this.lookup_proces.current_page +
            "&per_page=10&jenis=0&sort=asc",
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
          url: "manufactur/sent_to_warehouse/get-product",
          lookup: "products",
          query:          
            "?search=" + this.product_search +
            "&page=" + this.lookup_products.current_page +  
            "&per_page=5" + 
            "&production_id=" + ( (this.form.production_id && typeof this.form.production_id != 'number') ? this.form.production_id.id : 0 )
        });

        this.isLoadingGetProduct = false;
      }
    },

    onGetProduction(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProduction);

      this.isStopSearchProduction = setTimeout(() => {
        this.production_search = search;

        if (typeof isNext !== "function") {
          this.lookup_productions.current_page = isNext
            ? this.lookup_productions.current_page + 1
            : this.lookup_productions.current_page - 1;
        } else {
          this.lookup_productions.current_page = 1;
        }

        this.onSearchProduction();
      }, 600);
    },

    async onSearchProduction() {
      if (!this.isLoadingGetProduction) {
        this.isLoadingGetProduction = true;

        await this.lookUp({
          url: "manufactur/packinglist/get-packing-list",
          lookup: "productions",
          query:
            "?search=" +  this.production_search +
            "&page=" + this.lookup_productions.current_page +
            "&per_page=5&position=PRODUCTION&status=CLOSE",
        });

        this.isLoadingGetProduction = false;
      }
    },

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
          url: "manufactur/sent_to_warehouse/get-warehouse",
          lookup: "warehouses",
          query:
            "?search=" +  this.warehouse_search +
            "&page=" + this.lookup_warehouses.current_page +
            "&per_page=5",
        });

        this.isLoadingGetWarehouse = false;
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      if (!this.form.sent_to_warehouse_details.length) {
        this.$toaster.error("Detail Kirim Ke Gudang Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "manufactur/sent_to_warehouse";

      let formData = {
        ...this.form,
        // production_id :   
        //   typeof this.form.production_id == "object"
        //     ? this.form.production_id.id 
        //     : "",  
        warehouse_id : 
          typeof this.form.warehouse_id == "object"
            ? this.form.warehouse_id.id 
            : "",  
        master_proces_id:
          typeof this.form.master_proces_id == "object"
            ? this.form.master_proces_id.id
            : "",         
      };

      formData.sent_to_warehouse_details = formData.sent_to_warehouse_details.map((item) => {
        return {    
          quantity: item.quantity_finish,
          quantity_finish: item.quantity_finish,
          weight: item.weight,
          product_id:
            typeof item.product_id == "object" 
              ? item.product_id.id 
              : "",
          packing_list_id: item.packing_list_id,
          grade_id:
            typeof item.grade_id == "object"
              ? item.grade_id.id
              : "",
          production_detail_id:
            typeof item.production_detail == "object"
              ? item.production_detail.id
              : "",
          jumlah_roll: item.packing_count,
          
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
          this.$toaster.success("Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Kirim Ke Gudang");

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              sent_to_warehouse_details: [],
            };

            this.setCode();
            
            this.$refs['form-validate'].reset();
            this.onPrint(res.data.id);
            this.onSearchProduction();
          }

          if (this.isEditable) {
            this.onPrint(this.id);
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
                "/manufactur/sent_to_warehouse/get-print-detail/" +
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
        url: "manufactur/sent_to_warehouse",
        query: "",
      });

      this.form.code = this.code;
    },

    addDetail() {      
      this.form.sent_to_warehouse_details.push({
        product_id: "",
        quantity: 0.0,  
        quantity_finish : 0.0   
      });
    },

    deleteDetail(indexItem) {
      this.form.sent_to_warehouse_details = this.form.sent_to_warehouse_details.filter(
        (_, index) => index != indexItem
      );
    },

    onSetProduct(index){    
      let itemProduct = {
        ...this.form.sent_to_warehouse_details[index],            
      };

      if(!itemProduct.product_id) {
        this.form.sent_to_warehouse_details[index].product_id = '';
        return
      };
    },

      onDetail(item) {
      this.$refs["modal-detail"].parameters.form = {
        ...item
      };

      window.$("#modal-detail").modal("show");
    },

    // onSetProduction(item){
    //   if(item){       
    //     this.form.sent_to_warehouse_details = item.production_details.map(item => {
    //       return {
    //         product_id : item.product,
    //         quantity : item.quantity_finish,
    //         quantity_finish : item.quantity
    //       }
    //     });

    //     this.onSearchProduct();
    //   }else{
    //     this.form.production_id = "";

    //     this.production_details = [];
    //   }
    // },

    async onSetProduction() {
      if (this.form.packing_list_id) {
        let dataneiki = this.form.packing_list_id;

        // await this.getData({
        //   url: "manufactur/packinglist/get-packing-list",
        //   params: "?code=" + dataneiki,
        // });
        // console.log(dataneiki);

        if (typeof dataneiki == "object") {
          this.form.sent_to_warehouse_details.push({
            packing_list_id: dataneiki.id,
            code: dataneiki.code,

            product_id: dataneiki.product,
            grade_id: dataneiki.parent_grade,
            production_detail: dataneiki.production_detail,
            quantity_finish: parseInt(dataneiki.detail_packing_list_sum_length),
            packing_count: dataneiki.detail_packing_list_count,
            weight: parseInt(dataneiki.detail_packing_list_sum_weight),
            detail_packing_list: dataneiki.detail_packing_list,

          });
          // this.$toaster.success("Alhamdulilah enek");
        }

        // this.form.cobanen = dataneiki;

      }
    },
    
    onSetWarehouse(item){
      if(item){

      }else{
        this.form.warehouse_id = "";
      }
    }
  },
};
</script>
