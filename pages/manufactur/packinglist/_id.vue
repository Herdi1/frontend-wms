<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>
                {{ isEditable ? "Edit" : "Tambah" }} Data Packing List
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
                          <label for="work_order_id">Produk</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <v-select
                            label="name"
                            :loading="isLoadingGetProduct"
                            :options="lookup_products.data"
                            :filterable="false"
                            @search="onGetProduct"
                            @input="onSetPacking"
                            v-model="form.product_id"
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
                              disabled
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
                      style="width: 20%"
                    >
                      PASN
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 10%"
                    >
                      Grade
                    </td>                
                    <td
                      class="text-left table-transaction-header"
                      style="width: 10%"
                    >
                      ProductID
                    </td> 
                    <td
                          class="text-left table-transaction-header"
                          style="width: 10%"
                        >
                          ProductName
                        </td>
                         <td
                            class="text-left table-transaction-header"
                            style="width: 10%"
                          >
                            No Piece
                          </td>
                    <td
                        class="text-left table-transaction-header"
                        style="width: 10%"
                      >
                        Quantity
                      </td> 
                       <td
                          class="text-left table-transaction-header"
                          style="width: 10%"
                        >
                          Weight
                        </td>      
                    <td
                      class="text-left table-transaction-header"
                      style="width: 1%"
                    >
                      Opsi
                    </td>
                  </tr>
                  <tr
                    v-for="(item, index) in form.detail_packing_list"
                    :key="index"
                  >
                    <td class="table-transaction-row" v-if="item.is_data">
                       <input
                                type="hidden"
                                class="form-control"
                                :value="item.production_activity_id"
                                disabled
                              />

                      
                      {{ item.code }}
                    </td>
                    <td class="table-transaction-row" v-if="!item.is_data">
                         <v-select
                          label="code"
                          :loading="isLoadingGetProduction"
                          :options="lookup_productions.data"
                          :filterable="false"
                          @search="onGetProduction"
                          v-model="item.production_activity_id"
                        
                        >
                          <template v-slot:option="option">
                            <div class="row">
                                <!-- <div class="col-md-5 p-1 m-0">
                                {{ option.name }}
                                </div> -->
                                <div class="col-md-7 p-1 m-0 text-right">
                                    {{ option.code }}
                                </div>
                            </div>
                          </template>
                          <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!item.production_activity_id"
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
                              class="flex-fill bg-primary text-white text-center"
                              style="cursor: pointer"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="lookup_productions.last_page >
                                lookup_productions.current_page
                                "
                              @click="onGetProduction(search, true)"
                              class="flex-fill bg-primary text-white text-center"
                              style="cursor: pointer"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                    </td>

                    <td class="table-transaction-row">
                            {{ form.parent_grade_id ? form.parent_grade_id.code : "-"}}
                      </td>    

                    <td class="table-transaction-row">
                      {{ form.product_id ? form.product_id.code : "-" }}
                    </td>

                    <td class="table-transaction-row">
                      {{ form.product_id ? form.product_id.name : "-" }}
                      </td>
                       <td class="table-transaction-row" v-if="item.is_data">
                        <input
                                      type="text"
                                      class="form-control"
                                      :value="item.no_set"
                                      disabled
                                    />
                        </td>

                         <td class="table-transaction-row" v-if="!item.is_data">
                          <input
                                        type="text"
                                        class="form-control"
                                        :value="item.production_activity_id ? item.production_activity_id.no_set : '0'"
                                        disabled
                                      />
                          </td>
                      

                         <td class="table-transaction-row" v-if="item.is_data">
                          <input
                              type="text"
                              class="form-control"
                              :value="item.length"
                              disabled
                            />
                        </td> 
                        <td class="table-transaction-row" v-if="!item.is_data">
                          <input
                            type="text"
                            class="form-control"
                            :value="item.production_activity_id ? item.production_activity_id.length : '0'"
                            disabled
                          />
                          </td> 
                        <td class="table-transaction-row"  v-if="item.is_data">
                          <input
                            type="text"
                            class="form-control"
                            :value="item.weight"
                            disabled
                          />

                          </td> 
                         <td class="table-transaction-row"  v-if="!item.is_data">
                          <input
                          type="text"
                          class="form-control"
                          :value="item.production_activity_id ? item.production_activity_id.nett_weight : '0'"
                          disabled
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

                  <tr v-if="!form.detail_packing_list.length">
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
    

      isStopSearchProduct : false,
      isLoadingGetProduct : false,
      product_search: "",

      isStopSearchProduction: false,
      isLoadingGetProduction: false,
      production_search: "",

      form: {
        product_id : "",
        code: "",
        keterangan: "",
        tanggal: moment().format("YYYY-MM-DD"),
        detail_packing_list: [], 
        master_proces_id: "1",
        no_batch: "",
        units_id: 0,
        panjang: 0,
        berat: 0,
        grade_id: "",
        parent_grade_id : "",

      },       

      default_form: {
        product_id : "",
        code: "",
        panjang: 0,
        berat: 0,
        keterangan: "",
        tanggal: moment().format("YYYY-MM-DD"),
        detail_packing_list: [],
        master_proces_id: "1",
        no_batch: "",
        units_id: 0,
        grade_id: "",
        parent_grade_id: "",

      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("manufactur/packinglist/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != "detail_packing_list") {
            if(item === "product_id"){
              this.form[item] = response.data.product;
            } else if (item === "grade_id") {
              this.form[item] = response.data.grade;
            } else if (item === "parent_grade_id") {
              this.form[item] = response.data.parent_grade;
            } else {
              this.form[item] = response.data[item];
            }
          }
        });

        this.form.detail_packing_list = response.data.detail_packing_list.map(
          (item) => {
            return {
              ...item,
              weight: item.weight,
              weight: item.weight,
              no_set: item.no_set,
              is_data: true,

              code: item.production_activity ? item.production_activity.code : "-",

            };
          }
        );
        this.isLoadingPage = false;
      }

    } catch (err) {
      this.$router.push("/manufactur/packinglist");
    }
  },

  async mounted() {
    await this.onSearchProduct();
    await this.onSearchProduction();

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
      "lookup_productions",


      "code"
    ])
  },

  methods: {
    ...mapActions("moduleApi", [
      "lookUp", 
      "getCode"
    ]),

   
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
          url: "manufactur/production_activity/get-activity",
          lookup: "productions",
          query:
            "?search=" + this.production_search +
            "&page=" + this.lookup_productions.current_page +
            "&per_page=5&open_list=yes&packing_list_id="+this.id,
        });

        this.isLoadingGetProduction = false;
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
          url: "manufactur/packinglist/daftarproduction",
          lookup: "products",
         query:
            "?search=" + this.product_search +
            "&page=" + this.lookup_products.current_page +
            "&per_page=5",
        });

        this.isLoadingGetProduct = false;
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      if (!this.form.detail_packing_list.length) {
        this.$toaster.error("Data Quality Control Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "manufactur/packinglist";

      let formData = {
        ...this.form,
        // master_proces_id: "1",
        // product_id:
        //   typeof this.form.product_id == "object"
        //     ? this.form.product_id.id
        //     : "",   
      };

      formData.detail_packing_lists = formData.detail_packing_list.map((item) => {
        return {    
          production_activity_id:
            item.is_data ? item.production_activity_id : item.production_activity_id.id ,
          weight:
            item.is_data ? item.weight : item.production_activity_id.nett_weight,
          length:
            item.is_data ? item.length : item.production_activity_id.length,
          no_set:
            item.is_data ? item.no_set ? item.no_set : 0 : item.production_activity_id.no_set,
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

            // this.setCode();
            this.onPrint(res.data.id);

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
                "/manufactur/packinglist/get-print-detail/" +
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
        url: "manufactur/packinglist",
        query: "",
      });

      this.form.code = this.code;
    },

    addDetail() {      
      this.form.detail_packing_list.push({
        is_data :false,
        regu_id: "",
        panjang: "",
        master_defect_id: "",
        poin: ""        
      });
    },

    deleteDetail(indexItem) {
      this.form.detail_packing_list = this.form.detail_packing_list.filter(
        (_, index) => index != indexItem
      );
    },

    // onSetProduction(index){    
    //   let itemProduct = {
    //     ...this.form.detail_packing_list[index],            
    //   };

    //   if(!itemProduct.production_activity_id) {
    //     this.form.detail_packing_list[index].production_activity_id = '';
    //     return
    //   };
    // },

    onSetPacking(item){
      if(item){
        this.form.production_details = item.production_details.map(item => {
          return {
            no_batch: item.no_batch,
            production_detail_id: item.id,
            // code:
            //   typeof item.detail_production_qc == "object" ? item.detail_production_qc.code : "",
            code: item.detail_production_qc.code,
            grade: item.detail_production_qc.grade,
            panjang: item.detail_production_qc.panjang,
            berat: item.detail_production_qc.berat,
            // berat: item.detail_production_qc.berat,

          }
        })
        console.log(item);
      }else{
        this.form.product_id = "";
      }
    }

  },
};
</script>
