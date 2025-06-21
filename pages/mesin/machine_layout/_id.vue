<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>
                {{ isEditable ? "Edit" : "Tambah" }} Machine Layout
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
              

              <div class="clearfix mt-2">
                    <button class="btn btn-success mt-3 pl-5 pr-5 float-right"
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
                  </div>
              <div class="container m-0 p-0">
                <div class="d-flex flex-row">
                  <div class="col-sm-6">
                        <div class="form-group">
                          <div class="row" style="heigth:30px">
                            <div class="col-sm-2 align-self-center">
                              <label for="production_id">Work Center</label>
                            </div>
                            <div class="col-sm-10 align-self-center">
                              <v-select
                                label="code"
                                :loading="isLoadingGetUser"
                                :options="lookup_users.data"
                                :filterable="false"
                                @search="onGetUser"
                                v-model="form.work_center_id"
                                :disabled="isEditable">
                                <template v-slot:option="option">
                                  <div class="row">
                                 
                                    <div class="col-md-6 p-1 m-0 text-left">
                                      {{ option.code }}
                                    </div>
                                    <div class="col-md-6 p-1 m-0 text-left">
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

                  <div class="col-sm-6">
                      <div class="form-group">
                        <div class="row" style="heigth:30px">
                          <div class="col-sm-2 align-self-center">
                            <label for="production_id">Jenis</label>
                          </div>
                          <div class="col-sm-10 align-self-center">
                            <select
                                                class="form-control"
                                            
                                                v-model="form.jenis" required
                                              >
                                                <option value="">Pilih</option>
                                                <option value="0">Operator Pegangan</option>
                                                <option value="1">Perbaikan Kain (PK)</option>
                                                <option value="2">Mekanik</option>
                                                <option value="3">Kaur</option>
                                              </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- <div class="col-sm-6">
                        <div class="form-group">
                          <div class="row" style="heigth:30px">
                            <div class="col-sm-2 align-self-center">
                              <label for="production_id">Operator Regu B</label>
                            </div>
                            <div class="col-sm-10 align-self-center">
                              <v-select
                                label="name"
                                :loading="isLoadingGetDepartment"
                                :options="lookup_department.data"
                                :filterable="false"
                                @search="onGetDepartment"

                                v-model="form.karyawan_id"
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
                                    :required="!form.karyawan_id"
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
                                    v-if="lookup_department.last_page >
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
                      </div> -->
                </div>
              </div>  

              <!-- <div class="container m-0 p-0">
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
              </div>    -->
              
               <!-- <div class="container m-0 p-0">
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
                </div>  -->
              <div class="row">
                <div class="col-md-4">

                    <div class="clearfix mt-2">
                  <span
                    class="btn btn-warning float-right btn-sm"
                    @click="addDetailOperator"
                    style="cursor: pointer"
                  >
                    <i class="fas fa-plus"></i>
                    Tambah Operator
                  </span>
                </div>


                <div class="table-striped">
                  <table class="table table-sm mt-3">
                    <tr>
                   
                      <td
                          class="text-left table-transaction-header"
                          style="width: 10%"
                        >
                          Regu
                        </td> 
                      <td
                        class="text-left table-transaction-header"
                        style="width: 20%"
                      >
                        Operator
                      </td>       
                   
                      <td
                        class="text-left table-transaction-header"
                        style="width: 1%"
                      >
                        Opsi
                      </td>
                    </tr>
                    <tr
                      v-for="(item, index) in form.operator"
                      :key="index"
                    >

                      <td class="table-transaction-row">
                                         <select
                                              class="form-control"
                                            
                                              v-model="item.regu_id"
                                            >
                                              <option value="">Pilih</option>
                                              <option
                                                v-for="item2 in lookup_custom1.data"
                                                :key="item2.id"
                                                :value="item2.id"
                                              >
                                                {{ item2.name }}
                                              </option>
                                            </select>
                      </td>

                      <td class="table-transaction-row">
                          <v-select
                                  label="code"
                                  :loading="isLoadingGetDepartment"
                                  :options="lookup_department.data"
                                  :filterable="false"
                                  @search="onGetDepartment"

                                  v-model="item.karyawan_id"
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
                                      :required="!item.karyawan_id"
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
                                      v-if="lookup_department.last_page >
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
                        </td>
                     

                      <td class="text-center table-transaction-row">
                        <i
                          class="fas fa-trash text-danger"
                          style="cursor: pointer;vertical-align:midle"
                          @click="deleteDetailOperator(index)"
                        ></i>
                      </td>
                    </tr>

                    <tr v-if="!form.machine_layout.length">
                      <td colspan="5" class="text-center pt-4 pb-4">
                        Data tidak ditemukan
                      </td>
                    </tr>
                  
                                  
                  </table>
                
                  <div class="mt-5 mb-5" style="height: 100px"></div>
                </div>
                </div>
                <div class="col-md-8">
                                                            
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
                        Mesin Awal
                      </td> 
                    <td
                      class="text-left table-transaction-header"
                      style="width: 20%"
                    >
                      Mesin Akhir
                    </td>       
                   
                    <td
                      class="text-left table-transaction-header"
                      style="width: 1%"
                    >
                      Opsi
                    </td>
                  </tr>
                  <tr
                    v-for="(item, index) in form.machine_layout"
                    :key="index"
                  >

                    <td class="table-transaction-row">
                      <v-select
                        label="name"
                        :loading="isLoadingGetGrade"
                        :options="lookup_grade.data"
                        :filterable="false"
                        @search="onGetGrade"
                        v-model="item.machine_start"
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
                            :required="!item.machine_start"
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
                          :loading="isLoadingGetGrade"
                          :options="lookup_grade.data"
                          :filterable="false"
                          @search="onGetGrade"
                          v-model="item.machine_end"
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
                              :required="!item.machine_end"
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
                              v-if="lookup_grade.last_page >
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
                     

                    <td class="text-center table-transaction-row">
                      <i
                        class="fas fa-trash text-danger"
                        style="cursor: pointer;vertical-align:midle"
                        @click="deleteDetail(index)"
                      ></i>
                    </td>
                  </tr>

                  <tr v-if="!form.machine_layout.length">
                    <td colspan="5" class="text-center pt-4 pb-4">
                      Data tidak ditemukan
                    </td>
                  </tr>
                  
                               
                </table>
                
                <div class="mt-5 mb-5" style="height: 100px"></div>
              </div>
              </div>
                </div>  

              
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
      title: "Machine Layout",
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
        work_center_id: "",
        karyawan_id: "",
        jenis: '',
        machine_layout: [],
        operator: [],
      },       

      default_form: {
        work_center_id: "",
        karyawan_id: "",
        jenis: '',
        machine_layout: [],
        operator: [],
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

    // if (!this.isEditable) {
    //   this.setCode();
    // }

    await this.lookUp({
      url: "master/regu/get-regu",
      lookup: "custom1",
      query: "?order=id&sort=asc",
    });
  },

  computed: {
    ...mapState("moduleApi", [
      "lookup_product_materials",
      "lookup_department",
      "lookup_grade",
      "lookup_users",
      "lookup_custom1",

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
          url: "master/work_center/get-work-center",
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
          url: "machine/machine/get-mesin",
          lookup: "grade",
          query:          
            "?search=" + this.grade_search +
            "&page=" + this.lookup_grade.current_page +
            "&per_page=10&order=code&sort=asc&tipe_mesin_id=7",
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
          url: "master/karyawan/get-karyawan",
          lookup: "department",
          query:
            "?search=" +  this.department_search +
            "&page=" + this.lookup_department.current_page +
            "&per_page=10&sort=asc",
        });

        this.isLoadingGetDepartment = false;
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      if (!this.form.work_center_id) {
        this.$toaster.error("Work Center wajib diisi");
        return;
      }

      if (!this.form.jenis) {
        this.$toaster.error("Jenis wajib diisi");
        return;
      }

      if (!this.form.machine_layout.length) {
        this.$toaster.error("Jumlah range mesin masih kosong");
        return;
      }

      if (!this.form.operator.length) {
        this.$toaster.error("Karyawan masih kosong");
        return;
      }

      

      this.isLoadingForm = true;

      let url = "machine/machine_layout";

      let formData = {
        ...this.form, 
        work_center_id :   
          typeof this.form.work_center_id == "object"
            ? this.form.work_center_id.id 
            : "",    
        // karyawan_id:
        //   typeof this.form.karyawan_id == "object"
        //     ? this.form.karyawan_id.id
        //     : "",
      };

      formData.machine_layout = formData.machine_layout.map((item) => {
        return {    
          machine_start:
            typeof item.machine_start == "object" 
              ? item.machine_start.code 
              : "",
          machine_end:
              typeof item.machine_end == "object"
                ? item.machine_end.code
                : "",
        };
      });

      formData.operator = formData.operator.map((item) => {
        return {
          regu_id: item.regu_id,
          karyawan_id:
            typeof item.karyawan_id == "object"
              ? item.karyawan_id.id
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
          this.$toaster.success("Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Machine Layout");

          if (!this.isEditable) {
            let work_center_id2 = this.form.work_center_id;

            this.form = {
              ...this.default_form,
              machine_layout: [],
              operator: [],
              work_center_id: work_center_id2,


            };

            this.setCode();
            
            this.$refs['form-validate'].reset();

            // this.onPrint(res.data.id);

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
      this.form.machine_layout.push({
        machine_end: "",
        machine_start: "",
        
      });
    },

    addDetailOperator() {
      this.form.operator.push({
        regu_id: "",
        karyawan_id: "",

      });
    },

    deleteDetail(indexItem) {
      this.form.machine_layout = this.form.machine_layout.filter(
        (_, index) => index != indexItem
      );
    },

    deleteDetailOperator(indexItem) {
      this.form.operator = this.form.operator.filter(
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
