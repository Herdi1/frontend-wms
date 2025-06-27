<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>
                {{ isEditable ? "Edit" : "Tambah" }} Permintaan Pembelian
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
                              disabled
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
                          <label for="production_id">Department</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <v-select
                            label="name"
                            :loading="isLoadingGetDepartment"
                            :options="lookup_department.data"
                            :filterable="false"
                            @search="onGetDepartment"
                            @input="setCode()"

                            v-model="form.department_id"
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
                                :required="!form.department_id"
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
                          <label for="product_id">Kategori</label>
                        </div>

                        <div class="col-sm-10 align-self-center">
                          <select
                            class="form-control"
                            v-model="form.kategori"
                            @change="onProductChange"
                            :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                            :disabled="isEditable">
                            <option value="BUDGET">Budget</option>
                            <option value="NON BUDGET">Non Budget</option>
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
                      <ValidationProvider name="date" rules="required">
                        <div class="form-group " slot-scope="{ errors, valid }">
                          <div class="row">
                            <div class="col-sm-2 align-self-center">
                              <label for="date">Tgl dibutuhkan</label>
                            </div>
                            <div class="col-sm-10 align-self-center">
                              <input
                                type="date"
                                class="form-control form-control-sm"
                                name="date"
                                v-model="form.tanggal_dibutuhkan"
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
                            <label for="production_id">Permintaan Dari</label>
                          </div>
                          <div class="col-sm-10 align-self-center">
                            <v-select
                              label="fullname"
                              :loading="isLoadingGetUser"
                              :options="lookup_users.data"
                              :filterable="false"
                              @search="onGetUser"
                              v-model="form.permintaan_user_id"
                              :disabled="isEditable">
                              <template v-slot:option="option">
                                <div class="row">
                                 
                                  <div class="col-md-12 p-1 m-0 text-left">
                                    {{ option.fullname }}
                                  </div>
                                </div>
                              </template>
                              <template #search="{ attributes, events }">
                                <input
                                  class="vs__search"
                                  :required="!form.permintaan_user_id"
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
                        style="width: 5%"
                      >
                        Grade
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
                        Unit
                      </td>            
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Quantity
                    </td>      
                    <td class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Unit Price
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
                    v-for="(item, index) in form.permintaan_pembelian_details"
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
                        :loading="isLoadingGetGrade"
                        :options="lookup_grade.data"
                        :filterable="false"
                        @search="onGetGrade"
                        v-model="item.grade_id"
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
                            :required="!item.grade_id"
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
                              v-if="lookup_product_materials.last_page >
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
                              :value="item.product_id ? item.product_id.purchase_unit : '-'"
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
                            />
                    </td>   
                    
                    <td class="table-transaction-row">
                        <money
                          v-model="item.price"
                          class="form-control"
                          @keydown.native="
                            $event.key === '-' ? $event.preventDefault() : null
                            "
                        />
                      </td> 

                    <td class="table-transaction-row">
                      <textarea 
                        class="form-control"
                        v-model="item.keterangan"></textarea>
                    </td>

                    <td class="text-center table-transaction-row">
                      <i
                        class="fas fa-trash text-danger"
                        style="cursor: pointer;vertical-align:midle"
                        @click="deleteDetail(index)"
                      ></i>
                    </td>
                  </tr>

                  <tr v-if="!form.permintaan_pembelian_details.length">
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
        product_id : "",
        production_id : "",
        code: "",
        keterangan: "",
        tanggal: moment().format("YYYY-MM-DD"),
        tanggal_dibutuhkan: "",
        kategori: "",
        quantity: 0.00,
        department_id: "",
        permintaan_user_id: "",
        jenis: "GOODS",
        date: moment().format("YYYY-MM-DD"),
        permintaan_pembelian_details: [],
        
      },       

      default_form: {
        product_id : "",
        production_id: "",
        department_id: "",
        permintaan_user_id: "",
        tanggal: "",
        tanggal_dibutuhkan: "",
        kategori: "",
        code: "",
        keterangan: "",
        quantity: 0.00,
        jenis: "GOODS",
        date: moment().format("YYYY-MM-DD"),
        permintaan_pembelian_details: [],
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

    if (!this.isEditable) {
      this.setCode();
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "lookup_product_materials",
      "lookup_department",
      "lookup_grade",
      "lookup_users",

      "code"
    ])
  },

  methods: {
    ...mapActions("moduleApi", [
      "lookUp", 
      "getCode"
    ]),

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
          url: "master/user/get-user",
          lookup: "users",
          query:
            "?search=" + this.user_search +
            "&page=" + this.lookup_users.current_page +
            "&per_page=5",
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
          url: "inventory/pemakaian_barang/get-grade",
          lookup: "grade",
          query:          
            "?search=" + this.grade_search +
            "&page=" + this.lookup_grade.current_page +
            "&per_page=10",
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
          url: "master/department/get-department",
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

      if (!this.form.permintaan_pembelian_details.length) {
        this.$toaster.error("Detail Permintaan Material Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "purchaseing_module/permintaan_pembelian";

      let formData = {
        ...this.form, 
        department_id :   
          typeof this.form.department_id == "object"
            ? this.form.department_id.id 
            : "",    
        permintaan_user_id:
          typeof this.form.permintaan_user_id == "object"
            ? this.form.permintaan_user_id.id
            : "",
      };

      formData.permintaan_pembelian_details = formData.permintaan_pembelian_details.map((item) => {
        return {    
          quantity : item.quantity,
          price : item.price,
          keterangan : item.keterangan,
          product_id:
            typeof item.product_id == "object" 
              ? item.product_id.id 
              : "",
          grade_id:
              typeof item.grade_id == "object" & item.grade_id
                ? item.grade_id.id
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
              permintaan_pembelian_details: [],
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
                "/purchaseing_module/permintaan_pembelian/get-print-detail/" +
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
