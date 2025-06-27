<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>
                {{ isEditable ? "Edit" : "Tambah" }} Counter
              </h6>

              <button class="btn btn-primary btn-sm" 
                @click="$router.back()">
                <i class="fas fa-arrow-left"></i>
                Kembali
              </button>
            </div>
          </div>
  <!-- {{form.department_id.code}} -->
          <ValidationObserver
            v-slot="{ invalid, validate }"
            ref="form-validate">
            <form
              @submit.prevent="() => console.log('Submit')"
              autocomplete="off">
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
                                v-model="form.tanggal"
                                @input="setCode()"

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

                  <div class="col-sm-6">
                    <div class="form-group">
                      <div class="row" style="heigth:30px">
                        <div class="col-sm-2 align-self-center">
                          <label for="production_id">Work Center</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <v-select
                            label="name"
                            :loading="isLoadingGetDepartment"
                            :options="lookup_department.data"
                            :filterable="false"
                            @search="onGetDepartment"

                            v-model="form.work_center_id"
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
                                :required="!form.work_center_id"
                                v-bind="attributes"
                                v-on="events"
                              />
                            </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="d-flex justify-content-between"
                              v-if="lookup_department.data.length || search"
                            >
                              <span
                                v-if="lookup_department.current_page > 1"
                                @click="onGetDepartment(search, false)"
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
                                  lookup_department.last_page >
                                  lookup_department.current_page
                                "
                                @click="onGetDepartment(search, true)"
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
                    <ValidationProvider name="safe_stock" >
                                <div class="form-group" slot-scope="{ errors, valid }">
                                  <div class="row">
                                  <div class="col-sm-2 align-self-center">
                                      <label for="product_id">Regu</label>
                                    </div>
                                    <div class="col-sm-10 align-self-center">
                                   <select
                                      class="form-control"
                                      :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                        "
                                      v-model="form.regu_id"
                                    >
                                      <option value="">Pilih</option>
                                      <option
                                        v-for="item in lookup_custom1.data"
                                        :key="item.id"
                                        :value="item.id"
                                      >
                                        {{ item.name }}
                                      </option>
                                    </select>
                                    </div>
                                    </div>  
                                </div>
                              </ValidationProvider>
                  </div>               
                  
                  <div class="col-sm-6">
                    
                  </div>
                </div>
              </div>   
              
               <div class="container m-0 p-0">
                  <div class="d-flex flex-row">
                                  
                  <div class="col-sm-8">
                      <div class="form-group">
                        <div class="row" style="heigth:30px">
                          <div class="col-sm-2 align-self-center">
                            <label for="production_id">Shift/Group</label>
                          </div>
                          <div class="col-sm-10 align-self-center">
                            <v-select
                              label="name"
                              :loading="isLoadingGetUser"
                              :options="lookup_users.data"
                              :filterable="false"
                              @search="onGetUser"
                              @input="onChangeShift"

                              v-model="form.shift_id"
                              :disabled="isEditable">
                              <template v-slot:option="option">
                                <div class="row">
                                 
                                  <div class="col-md-1 p-1 m-0 text-left">
                                    {{ option.code }}
                                  </div>
                                  <div class="col-md-5 p-1 m-0 text-left">
                                      {{ option.name }}
                                    </div>
                                    <div class="col-md-3 p-1 m-0 text-left">
                                        {{ option.start_time }}
                                      </div>
                                       <div class="col-md-3 p-1 m-0 text-left">
                                          {{ option.end_time }}
                                        </div>
                                </div>
                              </template>
                              <template #search="{ attributes, events }">
                                <input
                                  class="vs__search"
                                  :required="!form.shift_id"
                                  v-bind="attributes"
                                  v-on="events"
                                />
                              </template>
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="d-flex justify-content-between"
                                v-if="lookup_users.data.length || search"
                              >
                                <span
                                  v-if="lookup_users.current_page > 1"
                                  @click="onGetUser(search, false)"
                                  class="
                                  flex-fill
                                  bg-primary
                                  text-white text-center
                                "
                                  style="cursor: pointer"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="lookup_users.last_page >
                                    lookup_users.current_page
                                    "
                                  @click="onGetUser(search, true)"
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

                    <div class="col-sm-4">
                        <ValidationProvider name="date" rules="required">
                          <div class="form-group " slot-scope="{ errors, valid }">
                            <div class="row">
                              <div class="col-sm-2 align-self-center">
                                <label for="date">Work Hour</label>
                              </div>
                              <div class="col-sm-10 align-self-center">
                                <input
                                  type="number"
                                  class="form-control form-control-sm"
                                  name="date"
                                  v-model="form.work_hour"
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
                                                            

              <div class="clearfix mt-2">
                <span
                  class="btn btn-primary float-right btn-sm"
                  @click="onChange"
                  style="cursor: pointer"
                >
                  <i class="fas fa-plus"></i>
                  Load
                </span>
              </div>

              <div class="table-striped">
                <table class="table table-sm mt-3">
                  <tr>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      MchNo
                    </td>
                    <td
                        class="text-left table-transaction-header"
                        style="width: 20%"
                      >
                        SN
                      </td> 
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      QTy(Total)
                    </td>       
                    <td
                        class="text-left table-transaction-header"
                        style="width: 5%"
                      >
                        WHour
                      </td>            
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Opr.NIK
                    </td>      
                    <td class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      W.Group
                    </td>                                                  
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      SGNo
                    </td>

                    <td
                        class="text-left table-transaction-header"
                        style="width: 15%"
                      >
                        ProductName
                    </td>
                   
                  </tr>
                  <tr
                    v-for="(item, index) in form.counter_details"
                    :key="index"
                  >
                    <td class="table-transaction-row">
                      <input
                          type="hidden"
                          class="form-control"
                          :value="item.master_machine_id"
                        />
                        <input
                            type="hidden"
                            class="form-control"
                            :value="item.karyawan_id"
                          />
                           <input
                              type="hidden"
                              class="form-control"
                              :value="item.machine_layout_id"
                            />
                      <input
                        type="text"
                        class="form-control"
                        :value="item.master_machine ? item.master_machine.code : '-'"
                        disabled
                      />
                    </td>

                    <td class="table-transaction-row" >
                      <v-select
                        :getOptionLabel="name => item.production_planning_id ? item.production_planning_id.production_detail.no_batch : ''" 
                        :loading="isLoadingGetGrade"
                        :options="lookup_grade.data"
                        :filterable="false"
                        @search="onGetGrade"
                        @click="onSetActive(index)"

                        v-model="item.production_planning_id"
                        :disabled="item.disableInputBool"
                      >
                        <template v-slot:option="option">
                          <div class="row">
                              <div class="col-md-12 p-1 m-0">
                              {{ option.production_detail.no_batch }}
                              </div>
                              
                          </div>
                        </template>
                        <template #search="{ attributes, events }">
                          <input
                            class="vs__search"
                            :required="!item.production_planning_id"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_grade.data.length || search"
                        >
                          <span
                            v-if="lookup_grade.current_page > 1"
                            @click="onGetGrade(search, false)"
                            class="flex-fill bg-primary text-white text-center"
                            style="cursor: pointer"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_grade.last_page >
                              lookup_grade.current_page
                            "
                            @click="onGetGrade(search, true)"
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
                                   v-model="item.counter"
                                  class="form-control" step="any"
                                  v-on:keyup="countTotal"
                                  ref="inputRefs"

                                  @keydown.enter="focusnext(index)"

                                />
                      </td>

                      <td class="table-transaction-row">
                         <input
                                type="number"
                                 v-model="item.work_hour"
                                class="form-control"
                                disabled
                              />
                        <input
                                  type="hidden"
                                   v-model="item.work_hour"
                                  class="form-control"
                                  
                                />
                        </td>

                    <td class="table-transaction-row">
                      <input
                                type="text"
                                class="form-control"
                                :value="item.karyawan ? item.karyawan.code : '-'"
                                disabled
                              />
                    </td>   
                    <td class="table-transaction-row">
                        <input
                                  type="text"
                                  class="form-control"
                                  :value="item.work_center ? item.work_center.code : '-'"
                                  disabled
                                />
                      </td>  
                    

                    <td class="table-transaction-row">
                          <input
                                    type="text"
                                    class="form-control"
                                    :value="item.sub_group"
                                    disabled
                                  />
                        </td>  
                    <td class="table-transaction-row">
                            <input
                                      type="text"
                                      class="form-control"
                                      :value="item.production_planning_id ? item.production_planning_id.production_detail ? item.production_planning_id.production_detail.product.name : '-' : '-'"
                                      disabled
                                    />
                          </td>  

                    
                  </tr>
                  <tr>
                      <td class="table-transaction-row">
                        {{form.counter_details.length}} Records
                      </td>

                      <td class="table-transaction-row" >
                        
                      </td>

                       <td class="table-transaction-row">
                           <!-- {{ form.total_counter }} -->
                        </td>

                        <td class="table-transaction-row">
                          </td>

                      <td class="table-transaction-row">
                        
                      </td>   
                      <td class="table-transaction-row">
                          
                      </td>  
                    

                      <td class="table-transaction-row">
                          
                      </td>  
                      <td class="table-transaction-row">
                             
                      </td>  

                    
                    </tr>

                  <tr v-if="!form.counter_details.length">
                    <td colspan="5" class="text-center pt-4 pb-4">
                      Data tidak ditemukan
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
      title: "Machine Counter",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,

      isLoadingPage: Number.isInteger(id) ? true : false,

      isLoadingForm: false,
      // disableInputBool:true,
    
      isStopSearchWorkOrder: false,
      isLoadingGetWorkOrder: false,
      work_order_search: "",

      isLoadingGetDepartment : false,
      isLoadingGetDepartment: false,
      department_search: "",

      isLoadingGetUser: false,
      isLoadingGetUser: false,
      user_search: "",

      isStopSearchProductMaterial : false,
      isLoadingGetProductMaterial : false,
      product_material_search: "",

      isStopSearchGrade: false,
      isLoadingGetGrade: false,
      grade_search: "",

      form: {
        regu_id : "",
        shift_id: "",
        work_center_id: "",
        work_hour: "",
        total_counter: 0,
        tanggal: moment().format("YYYY-MM-DD"),
        counter_details: [],
        
      },       

      default_form: {
        regu_id: "",
        shift_id: "",
        work_center_id: "",
        work_hour: "",
        total_counter: 0,
        tanggal: moment().format("YYYY-MM-DD"),
        counter_details: [],
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("purchaseing_module/permintaan_pembelian/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != "permintaan_pembelian_details") {
            if(item === "department_id"){
              this.form[item] = response.data.department;
            } else if (item === "permintaan_user_id") {
              this.form[item] = response.data.permintaan_user;
            } else {
              this.form[item] = response.data[item];
            }
          }
        });

        this.form.permintaan_pembelian_details = response.data.permintaan_pembelian_details.map(
          (item) => {
            return {
              ...item,
              product_id: item.product,
              grade_id: item.grade,
              // keterangan: item.product,

            };
          }
        );

        this.isLoadingPage = false;
      }
    } catch (err) {
      this.$router.push("/purchaseing_module/permintaan_pembelian");
    }
  },

  async mounted() {
    await this.onSearchDepartment();
    await this.onSearchProductMaterial();

    await this.onSearchGrade();
    await this.onSearchUser();

    await this.lookUp({
      url: "master/regu/get-regu",
      lookup: "custom1",
      query: "?order=id&sort=asc",
    });
    // if (!this.isEditable) {
    //   this.setCode();
    // }
  },

  computed: {
    ...mapState("moduleApi", [
      "lookup_product_materials",
      "lookup_department",
      "lookup_grade",
      "lookup_users",
      "lookup_custom1",
      "lookup_custom2",
      "code"
    ])
  },

  methods: {
    ...mapActions("moduleApi", [
      "lookUp", 
      "getCode"
    ]),

    focusnext(index) {
      if (index < this.form.counter_details.length - 1) {
        this.$refs.inputRefs[index + 1].focus();
      } else {
        this.$refs.inputRefs[0].focus();
      }
    },

    countTotal() {
      let {
        total_counter,
      } = this.form;
      let details = [...this.form.counter_details];

      total_counter = details.reduce(
        (counter, item) => parseFloat(counter) + parseFloat(item.counter),
        0.0
      );
      this.form = {
        ...this.form,
        total_counter: parseFloat(total_counter),
      };

    },

    async onChangeShift() {
      if (this.form.shift_id) {
        this.form.work_hour = this.form.shift_id.work_hour;
      }
    },

    onGetUser(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchUser);

      this.isStopSearchUser = setTimeout(() => {
        this.user_search = search;

        if (typeof isNext !== "function") {
          this.lookup_users.current_page = isNext
            ? this.lookup_users.current_page + 1
            : this.lookup_users.current_page - 1;
        } else {
          this.lookup_users.current_page = 1;
        }

        this.onSearchUser();
      }, 600);
    },

    async onSearchUser() {
      if (!this.isLoadingGetUser) {
        this.isLoadingGetUser = true;

        await this.lookUp({
          url: "master/shift/get-shift",
          lookup: "users",
          query:
            "?search=" + this.user_search +
            "&page=" + this.lookup_users.current_page +
            "&per_page=10&sort=asc",
        });

        this.isLoadingGetUser = false;
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
            "&per_page=20&sort=asc",
        });

        this.isLoadingGetProductMaterial = false;
      }
    },

    onGetGrade(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGrade);

      this.isStopSearchGrade = setTimeout(() => {
        this.grade_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }

        this.onSearchGrade();
      }, 600);
    },

    async onSearchGrade() {
      if (!this.isLoadingGetGrade) {
        this.isLoadingGetGrade = true;

        await this.lookUp({
          url: "manufactur/production_planning/get-planning",
          lookup: "grade",
          query:          
            "?search=" + this.grade_search +
            "&page=" + this.lookup_grade.current_page +
            "&per_page=10&master_proces_id=21",
        });

        this.isLoadingGetGrade = false;
      }
    },

    onGetDepartment(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDepartment);

      this.isStopSearchDepartment = setTimeout(() => {
        this.department_search = search;

        if (typeof isNext !== "function") {
          this.lookup_department.current_page = isNext
            ? this.lookup_department.current_page + 1
            : this.lookup_department.current_page - 1;
        } else {
          this.lookup_department.current_page = 1;
        }

        this.onSearchDepartment();
      }, 600);
    },

    async onSearchDepartment() {
      if (!this.isLoadingGetDepartment) {
        this.isLoadingGetDepartment = true;

        await this.lookUp({
          url: "master/work_center/get-work-center",
          lookup: "department",
          query:
            "?search=" +  this.department_search +
            "&page=" + this.lookup_department.current_page +
            "&per_page=10&status=1&sort=asc",
        });

        this.isLoadingGetDepartment = false;
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      if (!this.form.counter_details.length) {
        this.$toaster.error("Detail Counter Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "machine/machine_counter";

      let formData = {
        ...this.form, 
        shift_id :   
          typeof this.form.shift_id == "object"
            ? this.form.shift_id.id 
            : "",    
        work_center_id:
          typeof this.form.work_center_id == "object"
            ? this.form.work_center_id.id
            : "",
      };

      formData.counter_details = formData.counter_details.map((item) => {
        return {    
          counter:
            item.counter
              ? item.counter
              : 0,
          master_machine_id: item.master_machine_id,
          work_hour: item.work_hour,
          karyawan_id: item.karyawan_id,
          sub_group: item.sub_group,
          machine_layout_id: item.machine_layout_id,
          production_planning_id:
            typeof item.production_planning_id == "object" && item.production_planning_id
              ? item.production_planning_id.id 
              : "",
           production_detail_id:
            typeof item.production_planning_id == "object" && item.production_planning_id
                  ? item.production_planning_id.production_detail ? item.production_planning_id.production_detail.id : ""
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
          this.$toaster.success("Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Counter");

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              counter_details: [],
            };

            this.setCode();
            
            this.$refs['form-validate'].reset();
            this.onPrint(res.data.id);

            // this.onSearchWorkOrder();
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
                "/machine/machine_counter/get-print-detail/" +
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
      let tanggal = this.form.tanggal ? this.form.tanggal : "";
      let depart = this.form.department_id ? this.form.department_id.code : "";
      await this.getCode({
        url: "purchaseing_module/permintaan_pembelian",
        query: "?code_department="+ depart+ "&tanggal= "+ tanggal,
      });

      this.form.code = this.code;
    },

    async onChange() {
      if (!this.form.work_center_id) {
        this.$toaster.error("Work wajib diisi");
        return;
      }
      if (!this.form.regu_id) {
        this.$toaster.error("Regu wajib diisi");
        return;
      }
      if (!this.form.shift_id) {
        this.$toaster.error("Shift wajib diisi");
        return;
      }
      if (!this.form.work_hour) {
        this.$toaster.error("Work Hour wajib diisi");
        return;
      }
      await this.lookUp({
        url: "machine/machine_layout/get-mesin-list",
        lookup: "custom2",
        query: "?all=''&sort=asc&order=code&regu_id=" + this.form.regu_id + "&work_center_id=" + this.form.work_center_id.id + "&tanggal=" + this.form.tanggal + "&jenis=0",
      });

      this.form.counter_details = this.lookup_custom2.map(
        (item) => {
          return {
            ...item,
            // grade_id: item.grade,
            production_planning_id: item.production_planning_tgl,
            machine_layout_id: item.id,
            counter:
              item.machine_counter_detail
                ? item.machine_counter_detail.counter
                :'',

            work_hour: this.form.work_hour,
            disableInputBool: false,
            // keterangan: item.product,
          };
        }
      );
      // this.form.permintaan_pembelian_details = this.lookup_custom2.data;

    },

    onSetActive(index) {
      this.form.counter_details[index].disableInputBool = false;
    },


    addDetail() {      
      this.form.permintaan_pembelian_details.push({
        product_id: "",
        grade_id: "",
        keterangan :"",
        quantity: 0.0,   
        price : 0.0,   
      });
    },

    deleteDetail(indexItem) {
      this.form.permintaan_pembelian_details = this.form.permintaan_pembelian_details.filter(
        (_, index) => index != indexItem
      );
    },

  
    onSetProduct(index){    
      let itemProduct = {
        ...this.form.permintaan_pembelian_details[index],            
      };

      if(!itemProduct.product_id) {
        this.form.permintaan_pembelian_details[index].product_id = '';
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
                this.form.permintaan_pembelian_details = res.data.bom.bom_details.map(item => {
                  return {
                    quantity : (parseFloat(item.quantity) * parseFloat(itemProduct.quantity)),
                    quantity_bom : item.quantity,
                    quantity_receive : 0,
                    product_id : item.product || "",
                    keterangan : ""
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
