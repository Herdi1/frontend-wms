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
                  <!-- <div class="col-sm-6">
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
                  </div>                  -->

                  <div class="col-sm-6">
                    <div class="form-group" v-if="isSearching">
                    <div class="row">
                       <div class="col-sm-2 align-self-center">
                            <label for="work_order_id">Stock No</label>
                          </div>
                      <div class="col-md-10">
                        <input type="text"
                          class="form-control form-control-sm"
                          placeholder=""
                          v-model="form.search_roll"

                          @keyup.enter="onSetRoll">
                      </div>
                    </div>
                      <!-- <div class="row" style="heigth:30px">
                        <div class="col-sm-2 align-self-center">
                          <label for="work_order_id">Stock No</label>
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
                      </div> -->
                    </div>
                  </div>

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
              </div>  

              <div class="container m-0 p-0">
                <div class="d-flex flex-row">
                  

                  <div class="col-sm-6">
                      <div class="form-group">
                        <div class="row" style="heigth:30px">
                          <div class="col-sm-2 align-self-center">
                            <label for="work_order_id">Tujuan Packing List</label>
                          </div>
                          <div class="col-sm-10 align-self-center">
                            <input type="text"
                            class="form-control form-control-sm"
                            placeholder=""
                            v-model="form.packing_list_to_id"
                            >
                          </div>
                        </div>
                      </div>
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


  <!-- {{form.packing_list_mutation}} -->
              <div class="table-striped">
                <table class="table table-sm mt-3">
                  <tr>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 3%"
                    >
                      SeqNo
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 10%"
                    >
                      Stock No
                    </td>                
                    <td
                      class="text-left table-transaction-header"
                      style="width: 10%"
                    >
                      Pack List No
                    </td> 
                    <!-- <td
                          class="text-left table-transaction-header"
                          style="width: 10%"
                        >
                          ProductName
                        </td> -->
                         <td
                            class="text-left table-transaction-header"
                            style="width: 10%"
                          >
                            ProductID
                          </td>
                    <td
                        class="text-left table-transaction-header"
                        style="width: 3%"
                      >
                        Grade
                      </td> 
                       <td
                          class="text-left table-transaction-header"
                          style="width: 5%"
                        >
                          Quantity  
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
                              Packing  
                            </td>    
                    <td
                      class="text-left table-transaction-header"
                      style="width: 1%"
                    >
                      Opsi
                    </td>
                  </tr>
                  <tr
                    v-for="(item, index) in form.packing_list_mutation"
                    :key="index"
                  >
                    <td class="table-transaction-row">
                      <input
                                    type="hidden"
                                    class="form-control"
                                    :value="item.detail_packing_list_id"
                                    disabled
                                  />
                      <input
                                  type="hidden"
                                  class="form-control"
                                  :value="item.code"
                                  disabled
                                />
                                                    {{ index + 1 }}
                    </td>
                    <td class="table-transaction-row">
                          {{ item.production_activity ? item.production_activity.code : "-"}}
                      </td>

                    <td class="table-transaction-row">
                            {{ item.packing_list ? item.packing_list.code : "-"}}
                      </td>    

                    <td class="table-transaction-row">
                      {{ item.packing_list.product ? item.packing_list.product.code : "-" }}
                    </td>

                     <td class="table-transaction-row">
                        {{ item.production_activity ? item.production_activity.grade.name : "-" }}
                      </td>

                      <td class="table-transaction-row">
                        {{ item.length}}
                        </td>


                    <td class="table-transaction-row">
                      {{ item.packing_list.product ? item.packing_list.product.name : "-" }}
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

                  <tr v-if="!form.packing_list_mutation.length">
                    <td colspan="10" class="text-center pt-4 pb-4">
                      Data tidak ditemukan
                    </td>
                  </tr> 
                  
                  <tr>
                    <td colspan="6" class="text-left border-top table-success">                        
                        <input
                          class="form-control form-control-sm"
                          v-model="form.description"
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
      isSearching: true,


      form: {
        // product_id : "",
        // code: "",
        description: "",
        tanggal: moment().format("YYYY-MM-DD"),
        packing_list_mutation: [], 
        packing_list_to_id: "",
        // no_batch: "",
        // units_id: 0,
        // panjang: 0,
        // berat: 0,
        // grade_id: "",
        // parent_grade_id : "",
        search_roll: "",
      },       

      default_form: {
        // product_id : "",
        // code: "",
        // panjang: 0,
        // berat: 0,
        description: "",
        tanggal: moment().format("YYYY-MM-DD"),
        packing_list_mutation: [],
        packing_list_to_id: "",
        // no_batch: "",
        // units_id: 0,
        // grade_id: "",
        // parent_grade_id: "",
        search_roll : "",

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

    // if (!this.isEditable) {
    //   this.setCode();
    // };

   
    
  },



  computed: {
    ...mapState("moduleApi", [
      "lookup_products",
      "lookup_units",
      "lookup_work_orders",
      "lookup_defects",
      "lookup_regus",
      "lookup_productions",
      "lookup_custom2",


      "code"
    ])
  },

  methods: {
    ...mapActions("moduleApi", [
      "lookUp", 
      "getCode",
      "getData"
    ]),

    async onSetRoll() {
      if (this.form.search_roll) {
        let dataneiki = this.form.search_roll;
        await this.getCode({
          url: "manufactur/packing_list_mutation",
          query: "",
        });
        await this.lookUp({
          url: "manufactur/packinglist/get-roll",
          lookup: "custom2",
          query: "?per_page=70&code_production=" + dataneiki,
        });
        // console.log(this.lookup_custom2.data);
        let datapacking = this.lookup_custom2.data;
        // this.form.packing_list_mutation = this.lookup_custom2.data.push(
        //   (item) => {
        //     return {
        //       // ...item,
        //       id: item.id,
        //       name: item.name,
        //       value: item.value,

        //     };
        //   }
        // );
        // if (typeof dataneiki == "object") {
        //   this.form.detail_pemakaian_barangs.push({
        //     product_id: dataneiki.product,
        //     grade_id: dataneiki.parent_grade,
        //     unit: dataneiki.product.selling_unit,

        //     quantity: dataneiki.detail_packing_list_sum_length,
        //   });
        //   // this.$toaster.success("Alhamdulilah enek");
        // }
        // this.form.packing_list_mutation.push((item) => {
        //   return {
        //     // ...item,
        //     production_activity_id: datapacking.production_activity_id,
        //     name: item.name,
        //     value: item.value,

        //   };
        // });

        

        

        // console.log(existingValue);

        // WORK
        if (typeof this.lookup_custom2 == "object" && this.lookup_custom2.total != 0) {
            // this.form.packing_list_mutation.push({
            //     production_activity_id: datapacking.production_activity_id,
            //     production_activity: datapacking.production_activity,
            //     packing_list: datapacking.packing_list,
            //     barcode: datapacking.barcode,
            //     length: datapacking.length,
            //     detail_packing_list_id: datapacking.id,
            //     code: this.code,
            //   // unit: dataneiki.product.selling_unit,
            //   // quantity: dataneiki.detail_packing_list_sum_length,
          // });

          for (let i = 0; i < datapacking.length; i++) {
            // add a new property here
            var existingValue = this.form.packing_list_mutation.find(item => item.production_activity_id === datapacking[i].production_activity_id)
            if (!existingValue) {
              this.form.packing_list_mutation.push({
                  production_activity_id: datapacking[i].production_activity_id,
                  production_activity: datapacking[i].production_activity,
                  packing_list: datapacking[i].packing_list,
                  barcode: datapacking[i].barcode,
                  length: datapacking[i].length,
                  detail_packing_list_id: datapacking[i].id,
                  code: this.code,
                // unit: dataneiki.product.selling_unit,
                // quantity: dataneiki.detail_packing_list_sum_length,
              });
            } else {
                this.$toaster.error("Bebrapa data Roll sudah ada");
            }
          }

          // WORK WITH PUSH ARRAY
          // this.form.packing_list_mutation.push(
          //   ...datapacking.map(item => ({
          //     production_activity_id: item.production_activity_id,
          //     production_activity: item.production_activity,
          //     packing_list: item.packing_list,
          //     barcode: item.barcode,
          //     length: item.length,
          //     detail_packing_list_id: item.id,
          //     code: this.code, }))
          // );
          // WORK WITH PUSH ARRAY
          // console.log(this.form.packing_list_mutation);

        }
        // WORK

        // this.form.search_roll = "";
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
          url: "manufactur/production_activity/get-activity",
          lookup: "productions",
          query:
            "?search=" + this.production_search +
            "&page=" + this.lookup_productions.current_page +
            "&per_page=5&all=yes&open_list=yes&packing_list_id="+this.id,
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

      if (!this.form.packing_list_mutation.length) {
        this.$toaster.error("Data Roll Kain Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "manufactur/packing_list_mutation";

      let formData = {
        ...this.form,
        date : this.form.tanggal,
      };

      formData.packing_list_mutations = formData.packing_list_mutation.map((item) => {
        return {    
          ...item,
          product_id: typeof item.packing_list == 'object'
            ? item.packing_list.product_id
            : '',
          packing_list_from_id: typeof item.packing_list == 'object'
            ? item.packing_list.id
            : '',                   
         
          // no_set:
          //   item.is_data ? item.no_set ? item.no_set : 0 : item.production_activity_id.no_set,
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
              packing_list_mutation: [],
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

    // async setCode() {
    //   await this.getCode({
    //     url: "packing_list_mutation/get-code",
    //     query: "",
    //   });

    //   this.form.code = this.code;
    // },

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
      this.form.packing_list_mutation = this.form.packing_list_mutation.filter(
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
