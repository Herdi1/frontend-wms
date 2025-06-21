<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>
                {{ isEditable ? "Edit" : "Tambah" }} Data Quality Control
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
                          <label for="work_order_id">No Batch</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <v-select
                            label="no_batch"
                            :loading="isLoadingGetWorkOrder"
                            :options="lookup_work_orders.data"
                            :filterable="false"
                            @search="onGetWorkOrder"
                            v-model="form.production_detail_id"
                            :disabled="isEditable"
                          >
                            <template v-slot:option="option">
                              {{ option.no_batch }}
                              <!-- <div class="row">
                                <div class="col-md-5 p-1 m-0">
                                  {{ option.no_batch }}
                                </div>
                                <div class="col-md-7 p-1 m-0 text-right">
                                  {{ option.name }}
                                </div>
                              </div> -->
                            </template>
                            <template #search="{ attributes, events }">
                              <input
                                class="vs__search"
                                :required="!form.production_detail_id"
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
                              name="tanggal"
                              v-model="form.tanggal"
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
                        <ValidationProvider name="code" rules="required">
                          <div class="form-group" slot-scope="{ errors, valid }">
                            <div class="row">
                              <div class="col-sm-2 align-self-center">
                                <label for="code">Panjang</label>
                              </div>
                              <div class="col-sm-10 align-self-center">
                                <input
                                  type="number"
                                  class="form-control form-control-sm"
                                  name="panjang"
                                  v-model="form.panjang"
                                  :class="errors[0]
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
                </div>
              </div>     
              
               <div class="container m-0 p-0">
                  <div class="d-flex flex-row">
                    <div class="col-sm-6">
                          <ValidationProvider name="code" rules="required">
                            <div class="form-group" slot-scope="{ errors, valid }">
                              <div class="row">
                                <div class="col-sm-2 align-self-center">
                                  <label for="code">Berat</label>
                                </div>
                                <div class="col-sm-10 align-self-center">
                                  <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    name="berat"
                                    v-model="form.berat"
                                    :class="errors[0]
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
                            <ValidationProvider name="code" rules="required">
                              <div class="form-group" slot-scope="{ errors, valid }">
                                <div class="row">
                                  <div class="col-sm-2 align-self-center">
                                    <label for="code">Grade</label>
                                  </div>
                                  <div class="col-sm-10 align-self-center">

                                    <select
                                      label="grade"
                                      class="form-control"                  
                                      v-model="form.grade">
                                      <option value="A">A</option>
                                      <option value="B">B</option>
                                      <option value="C">C</option>                      

                                    </select>   
                                    <div class="invalid-feedback" v-if="errors[0]">
                                      {{ errors[0] }}
                                    </div>
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
                      style="width: 20%"
                    >
                      Regu
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 20%"
                    >
                      Panjang
                    </td>                
                    <td
                      class="text-left table-transaction-header"
                      style="width: 10%"
                    >
                      Cacat
                    </td> 
                    <td
                        class="text-left table-transaction-header"
                        style="width: 10%"
                      >
                        Poin
                      </td> 
                            
                    <td
                      class="text-left table-transaction-header"
                      style="width: 1%"
                    >
                      Opsi
                    </td>
                  </tr>
                  <tr
                    v-for="(item, index) in form.qc_detail"
                    :key="item.id"
                  >
                    <td class="table-transaction-row">
                       <v-select           
                        label="name"  
                        :loading="isLoadingGetRegu"
                        :options="lookup_regus.data"
                        :filterable="false"
                        @search="onGetRegu"

                        v-model="item.regu_id"
                        :required="true">     
                        <template v-slot:option="option">                    
                          {{ option.name }}
                        </template> 
                        <template #search="{ attributes, events }">
                          <input
                            class="vs__search"
                            :required="!item.regu_id"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>        
                        <li slot-scope="{search}" slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_regus.data.length || search">
                          <span v-if="lookup_regus.current_page > 1" 
                            @click="onGetRegu(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Sebelumnya</span>
                          <span v-if="lookup_regus.last_page > lookup_regus.current_page" 
                            @click="onGetRegu(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Selanjutnya</span>
                        </li> 
                      </v-select> 


                    </td>

                    <td class="table-transaction-row">
                        <input
                            type="number"
                            class="form-control"
                            v-model="item.panjang"
                          />
                      </td>    

                    <td class="table-transaction-row">
                      <v-select
                        label="name"
                        :loading="isLoadingGetDefect"
                        :options="lookup_defects.data"
                        :filterable="false"
                        @search="onGetDefect"
                        v-model="item.master_defect_id"
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
                            :required="!item.master_defect_id"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_defects.data.length || search"
                        >
                          <span
                            v-if="lookup_defects.current_page > 1"
                            @click="onGetDefect(search, false)"
                            class="flex-fill bg-primary text-white text-center"
                            style="cursor: pointer"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_defects.last_page >
                              lookup_defects.current_page
                            "
                            @click="onGetDefect(search, true)"
                            class="flex-fill bg-primary text-white text-center"
                            style="cursor: pointer"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>

                         <td class="table-transaction-row">
                          <input
                              type="number"
                              class="form-control"
                              v-model="item.poin"
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

                  <tr v-if="!form.qc_detail.length">
                    <td colspan="5" class="text-center pt-4 pb-4">
                      Data tidak ditemukan
                    </td>
                  </tr>
                  
                  <tr>
                    <td colspan="4" class="text-left border-top table-success">                        
                        <input
                          class="form-control form-control-sm"
                          v-model="form.keterangan"
                          aria-placeholder="Keterangan"
                          placeholder="Keterangan ...."
                          name="keterangan"
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
      title: "QC Inspecting",
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
      product_search: "",

      isStopSearchProduct: false,
      isLoadingGetProduct: false,
      product_search: "",

      isStopSearchRegu: false,
      isLoadingGetRegu: false,
      regu_search: "",

      isStopSearchDefect: false,
      isLoadingGetDefect: false,
      defect_search: "",

      isStopSearchRegu: false,
      isLoadingGetRegu: false,
      regu_search: '',

      form: {
        work_order_id : "",
        code: "",
        keterangan: "",
        tanggal: moment().format("YYYY-MM-DD"),
        production_details: [], 
        qc_detail: [],
        master_proces_id: "1",
        no_batch: "",
        units_id: 0,
        panjang: 0,
        berat: 0,
      },       

      default_form: {
        work_order_id : "",
        code: "",
        panjang: 0,
        berat: 0,
        keterangan: "",
        tanggal: moment().format("YYYY-MM-DD"),
        production_details: [],
        qc_detail: [],
        master_proces_id: "1",
        no_batch: "",
        units_id: 0,
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
              units_id: item.units,
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
    await this.onSearchDefect();
    await this.onSearchRegu();

    if (!this.isEditable) {
      this.setCode();
    };

   
    
  },



  computed: {
    ...mapState("moduleApi", [
      "lookup_products",
      "lookup_units",
      "lookup_work_orders",
      "lookup_defects",
      "lookup_regus",

      "code"
    ])
  },

  methods: {
    ...mapActions("moduleApi", [
      "lookUp", 
      "getCode"
    ]),

    onGetRegu(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchRegu);

      this.isStopSearchRegu = setTimeout(() => {
        this.regu_search = search;

        if (typeof isNext !== "function") {
          this.lookup_regus.current_page = isNext
            ? this.lookup_regus.current_page + 1
            : this.lookup_regus.current_page - 1;
        } else {
          this.lookup_regus.current_page = 1;
        }
        let operator = this.parameters.form.regu_id;
        this.onSearchRegu();
      }, 600);
    },

    async onSearchRegu() {
      if (!this.isLoadingGetRegu) {
        this.isLoadingGetRegu = true;
        await this.lookUp({
          url: "master/regu",
          lookup: 'regus',
          query: "?search=" + this.regu_search + "&page=" + this.lookup_regus.current_page + "&per_page=10&order=name&sort=asc"
        })

        this.isLoadingGetRegu = false;
      }
    },

    onGetDefect(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDefect);

      this.isStopSearchDefect = setTimeout(() => {
        this.defect_search = search;

        if (typeof isNext !== "function") {
          this.lookup_defects.current_page = isNext
            ? this.lookup_defects.current_page + 1
            : this.lookup_defects.current_page - 1;
        } else {
          this.lookup_defects.current_page = 1;
        }

        this.onSearchDefect();
      }, 600);
    },

    async onSearchDefect() {
      if (!this.isLoadingGetDefect) {
        this.isLoadingGetDefect = true;

        await this.lookUp({
          url: "master/masterdefect",
          lookup: "defects",
          query:
            "?search=" + this.product_search +
            "&page=" + this.lookup_defects.current_page +
            "&per_page=5",
        });

        this.isLoadingGetDefect = false;
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
          url: "manufactur/productionproses",
          lookup: "work_orders",
          query:
            "?search=" + this.work_order_search +
            "&page=" + this.lookup_work_orders.current_page +
            "&master_proces_id= 4" +


            "&per_page=5",
        });

        this.isLoadingGetWorkOrder = false;
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      if (!this.form.qc_detail.length) {
        this.$toaster.error("Data Quality Control Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "manufactur/productionqc";

      let formData = {
        ...this.form,
        master_proces_id: "1",
        production_detail_id:
          typeof this.form.production_detail_id == "object"
            ? this.form.production_detail_id.id
            : "",   
      };

      formData.qc_detail = formData.qc_detail.map((item) => {
        return {    
          panjang: item.panjang,
          poin : item.poin,
          regu_id: typeof item.regu_id == "object"
            ? item.regu_id.id
            : "",
          master_defect_id:
            typeof item.master_defect_id == "object" 
              ? item.master_defect_id.id 
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
          this.$toaster.success("Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Data QC");

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              qc_detail: [],
            };

            this.setCode();
            this.onPrint(res.data.code);
            this.$refs['form-validate'].reset();

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
        message: "Cetak barcode produk?",
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
                "/productionqc/qrcode/" +
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
        url: "manufactur/productionqc",
        query: "",
      });

      this.form.code = this.code;
    },

    addDetail() {      
      this.form.qc_detail.push({
        regu_id: "",
        panjang: "",
        master_defect_id: "",
        poin: ""        
      });
    },

    deleteDetail(indexItem) {
      this.form.qc_detail = this.form.qc_detail.filter(
        (_, index) => index != indexItem
      );
    },

    // onSetProduct(index){    
    //   let itemProduct = {
    //     ...this.form.production_details[index],            
    //   };

    //   if(!itemProduct.product_id) {
    //     this.form.production_details[index].product_id = '';
    //     return
    //   };
    // },

    // onSetWorkOrder(item){
    //   if(item){
    //     this.form.production_details = item.work_order_details.map(item => {
    //       return {
    //         product_id : item.product,
    //         description : "",
    //         quantity : item.quantity,
    //         quantity_finish : 0.00
    //       }
    //     })
    //     console.log(item);
    //   }else{
    //     this.form.work_order_id = "";
    //   }
    // }
  },
};
</script>
