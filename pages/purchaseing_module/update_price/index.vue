<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <ValidationObserver v-slot="{ invalid, validate }" ref="form-validate">
              <form @submit.prevent="() => console.log('Submit')" autocomplete="off">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>
                Update P/R Price
              </h6>

              <div class="row">
              <span class="btn btn-primary btn-sm" @click="$router.back()">
                <i class="fas fa-arrow-left"></i>
                Kembali
              </span>

              <button class="btn btn-success ml-3" @click="validate().then(onSubmit(invalid))" type="button">
                  <span v-if="isLoadingForm">
                    <i class="fas fa-circle-notch fa-spin"></i>
                  </span>
                  <span v-else>
                    Simpan
                    <i class="fas fa-save"></i>
                  </span>
                </button>
                </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
                      <input type="date"  class="form-control" v-model="form.tanggal_awal"/>
                      </div>
                      <div class="col-md-2">
                      <input type="date"  class="form-control" v-model="form.tanggal_akhir" />
                      </div>
                      <div class="col-md-2">
                        <span class="btn btn-primary btn-sm" @click="onChangeType()">
                        <i class="fas fa-search"></i>
                        Cari
                      </span>
                      </div>

                     

              
              <!-- <button class="btn btn-sm btn-primary btn-block"
              data-toggle="tooltip"
              data-placement="top"      
              data-original-title="Download Pdf"
              @click="exportFile({type : 'pdf',parameters : self.parameters})"
              v-if="isExportFile && isExportFilePdf">
              <i class="fas fa-file-pdf"></i> PDF
            </button> -->
              <button
                class="btn btn-sm btn-primary btn-block"
                data-toggle="tooltip"
                data-placement="top"      
                data-original-title="Print Semua Data"
                @click="printFile()"
                >
                <i class="fas fa-print"></i> Print
              </button>

              <div class="btn-group float-right">
                <button class="btn btn-sm btn-primary btn-block"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-original-title="Download Excel"
                  @click="exportFile()"
                  >
                  <i class="fas fa-file-excel"></i> Excel
              </button>
            </div>
          </div>
          <!-- {{ parameters.params.sort  }} -->
              <div class="table-striped">
                <table class="table table-sm mt-3">
                  <thead>
                  
                  <tr>    
                      <th
                        >
                         P/R No
                        </th>
                        <th
                          @click="
                            onSort(
                              'permintaan_pembelian_tanggal',
                              parameters.params.sort == 'asc' ? 'desc' : 'asc'
                            )
                            "
                          class="cursor-pointer"
                          style="width: 5%"
                        >
                          <div
                            class="
                            d-flex
                            flex-row
                            justify-content-between
                            align-items-baseline
                          "
                          >
                            <div>P/R Date</div>
                            <div>
                              <i
                                class="fas fa-caret-up"
                                :class="parameters.params.order == 'date' &&
                                    parameters.params.sort == 'asc'
                                    ? ''
                                    : 'light-gray'
                                  "
                              ></i>
                              <i
                                class="fas fa-caret-down"
                                :class="parameters.params.order == 'date' &&
                                    parameters.params.sort == 'desc'
                                    ? ''
                                    : 'light-gray'
                                  "
                              ></i>
                            </div>
                          </div>
                        </th>                 
                      <th style="width: 5%">ProductID</th>
                      <th
                            @click="
                              onSort(
                                'product_name',
                                parameters.params.sort == 'asc' ? 'desc' : 'asc'
                              )
                              "
                            class="cursor-pointer"
                            style="width: 20%"
                          >
                            <div
                              class="
                            d-flex
                            flex-row
                            justify-content-between
                            align-items-baseline
                          "
                            >
                              <div>Description</div>
                              <div>
                                <i
                                  class="fas fa-caret-up"
                                  :class="parameters.params.order == 'date' &&
                                    parameters.params.sort == 'asc'
                                    ? ''
                                    : 'light-gray'
                                    "
                                ></i>
                                <i
                                  class="fas fa-caret-down"
                                  :class="parameters.params.order == 'date' &&
                                    parameters.params.sort == 'desc'
                                    ? ''
                                    : 'light-gray'
                                    "
                                ></i>
                              </div>
                            </div>
                          </th>    
                      <th style="width: 5%">Qty</th>
                      <th style="width: 5%">Unit</th>
                      <th style="width: 10%">Supplier</th>
                      <th style="width: 10%">Unit Price</th>
                      <th style="width: 8%">Date Price</th>
                      <th style="width: 7%">Last PO Price</th>
                      <th style="width: 8%">Last PO</th>
                      <th style="width: 10%">Total Price</th>
                      <th style="width: 10%">Remark</th>
                    </tr>
                  </thead>
                  <!-- {{ form.permintaan_pembelian_details }} -->

                  <tr v-for="(item, index) in form.permintaan_pembelian_details" :key="index">
                    <td class="table-transaction-row">
                          {{ item.permintaan_pembelian_code ?? "-" }}
                        </td>
                    <td class="table-transaction-row">
                      {{ item.permintaan_pembelian_tanggal ?? "-" }}
                    </td>

                    <td class="table-transaction-row">
                        {{ item.product_code ?? "-" }}
                      </td>

                      <td class="table-transaction-row">
                          {{ item.product_name ?? "-" }}
                      </td>

                      <td class="table-transaction-row">
                          {{ item.quantity ?? "-"}} 
                        </td>  

                       <td class="table-transaction-row">
                          {{ item.purchase_unit ?? "-" }}
                        </td>

                    <td class="table-transaction-row">
                      <v-select                           
                                                        label="name"   
                                                        :loading="isLoadingGetSupplier"
                                                        :options="lookup_suppliers.data"
                                                        :filterable="false"
                                                        @search="onGetSupplier"
                                                        
                                                        v-model="item.supplier_id">              
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
                                                            :required="!item.supplier_id"
                                                            v-bind="attributes"
                                                            v-on="events"
                                                            />
                                                        </template>   
                                                        <li slot-scope="{search}" slot="list-footer"
                                                            class="d-flex justify-content-between"
                                                            v-if="lookup_suppliers.data.length || search">
                                                            <span v-if="lookup_suppliers.current_page > 1" 
                                                                @click="onGetSupplier(search, false)"
                                                                class="flex-fill bg-primary text-white text-center"
                                                                style="cursor:pointer">Sebelumnya</span>
                                                            <span v-if="lookup_suppliers.last_page > lookup_suppliers.current_page" 
                                                                @click="onGetSupplier(search, true)"
                                                                class="flex-fill bg-primary text-white text-center"
                                                                style="cursor:pointer">Selanjutnya</span>
                                                        </li> 
                                                    </v-select>  
                    </td>

                    <td class="table-transaction-row">
                      <!-- <money v-model="item.price" class="form-control" @keydown.native="countTotal"
                        $event.key === '-' ? $event.preventDefault() : null
                        " /> -->
                        <money
                                  v-model="item.price"
                                  class="form-control"
                                  @keydown.native="
                                    $event.key === '-' ? $event.preventDefault() : null
                                    "
                                  @keyup.native="itemChange(index)"

                                />
                    </td>

                    <td class="table-transaction-row">
                      <input type="text" class="form-control"
                        :value="item.date_price" disabled />
                    </td>

                    <td class="table-transaction-row">
                      <!-- <money
                        v-model="item.quantity"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      /> -->
<!-- {{ item.po_supplier_detail[0] ? "oke" :" "}} -->
                      <input type="number" :value="item.po_supplier_detail[0] ? item.po_supplier_detail[0].price : 0.00" class="form-control" disabled/>
                    </td>

                    <td class="table-transaction-row">
                      <input type="text" :value="item.po_supplier_detail[0] ? item.po_supplier_detail[0].po_supplier.date : '-'" class="form-control" disabled/>
                    </td>

                    <td class="table-transaction-row">
                      <money v-model="item.grand_total" class="form-control" @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                        " disabled/>
                      <!-- <textarea class="form-control" v-model="item.keterangan"></textarea> -->
                    </td>

                    <td class="text-center table-transaction-row">
                      <textarea class="form-control" v-model="item.keterangan" disabled></textarea>
                    </td>
                  </tr>

                  <tr v-if="!form.permintaan_pembelian_details.length">
                    <td colspan="13" class="text-center pt-4 pb-4">
                      Data tidak ditemukan
                    </td>
                  </tr>

                
                </table>

                <div class="mt-5 mb-5" style="height: 100px"></div>
              </div>

              <!-- <button class="btn btn-primary mt-3" @click="validate().then(onSubmit(invalid))" type="button">
                <span v-if="isLoadingForm">
                  <i class="fas fa-circle-notch fa-spin"></i>
                </span>
                <span v-else>
                  Simpan
                  <i class="fas fa-save"></i>
                </span>
              </button> -->
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <div class="section-body" v-else>
      <div class="row">
        <div class="col-12">
          <div class="card" style="min-height: 300px">
            <div class="
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
  middleware: ['checkRoleUserDetail'],

  head() {
    return {
      title: "Update P/R Price",
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

      isLoadingGetDepartment: false,
      isLoadingGetDepartment: false,
      department_search: "",

      isLoadingGetUser: false,
      isLoadingGetUser: false,
      user_search: "",

      isStopSearchProductMaterial: false,
      isLoadingGetProductMaterial: false,
      product_material_search: "",

      isStopSearchGrade: false,
      isLoadingGetGrade: false,
      grade_search: "",

      isStopSearchSupplier: false,
      isLoadingGetSupplier: false,
      supplier_search: '',

      parameters: {
        params: {
          soft_deleted: "",
          search: "",
          order: "id",
          sort: "desc",
          all: "",
        },
        default_params: {
          soft_deleted: "",
          search: "",
          order: "id",
          sort: "desc",
          all: "",
        },
      },
      form: {
        product_id: "",
        production_id: "",
        code: "",
        keterangan: "",
        tanggal: moment().format("YYYY-MM-DD"),
        tanggal_dibutuhkan: "",
        kategori: "",
        tanggal_awal: moment().startOf('month').format("YYYY-MM-DD"),
        tanggal_akhir: moment().endOf('month').format("YYYY-MM-DD"),
        order: "id",
        sort: "desc",
        quantity: 0.00,
        department_id: "",
        permintaan_user_id: "",
        jenis: "GOODS",
        date: moment().format("YYYY-MM-DD"),
        permintaan_pembelian_details: [],

      },

      default_form: {
        product_id: "",
        production_id: "",
        department_id: "",
        permintaan_user_id: "",
        tanggal_awal: moment().format("YYYY-MM-DD"),
        tanggal_akhir: moment().format("YYYY-MM-DD"),
        order: "id",
        sort: "desc",
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
            if (item === "department_id") {
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
              // product: item.product,
              supplier_id: item.supplier,
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
    // await this.onSearchDepartment();
    // await this.onSearchProductMaterial();
    // await this.onSearchGrade();
    await this.onSearchSupplier();
    // await this.onSearchUser();
    await this.onChangeType();

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
      "lookup_custom2", 
      'lookup_suppliers',

      "code"
    ])
  },

  methods: {
    ...mapActions("moduleApi", [
      "lookUp",
      "getCode"
    ]),

    itemChange(index) {
      let detail = {
        ...this.form.permintaan_pembelian_details[index]
      };
      if (
        parseFloat(detail.quantity) >= 0.00
        &&
        parseFloat(detail.price) >= 0.00
      ) {
        this.form.permintaan_pembelian_details[index].grand_total = parseFloat(detail.quantity) * parseFloat(detail.price);
      }
    },

    onGetSupplier(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSupplier);

      this.isStopSearchSupplier = setTimeout(() => {
        this.supplier_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchSupplier();
      }, 600);
    },

    async onSearchSupplier() {
      if (!this.isLoadingGetSupplier) {
        this.isLoadingGetSupplier = true;

        await this.lookUp({
          url: "purchaseing_module/po_supplier/get-supplier",
          lookup: "suppliers",
          query: "?search="
            + this.supplier_search +
            "&page="
            + this.lookup_suppliers.current_page +
            "&per_page=10"
        })

        this.isLoadingGetSupplier = false;
      }
    },

    onSort(column, sort = "asc") {
      this.parameters.params = {
        ...this.parameters.params,
        order: column,
        sort: sort,
      };

      this.onChangeType();
    },

    // async onSearch(){}

    async onChangeType() {
      await this.lookUp({
        url: "purchaseing_module/update_price",
        lookup: "custom2",
        query: "?all=''&order="+ this.parameters.params.order +"&sort=" + this.parameters.params.sort + "&start_date="+this.form.tanggal_awal +"&end_date="+this.form.tanggal_akhir,
      });

      // try {
      // let response = await this.$axios.get("master/atribut_production_activity?order=id&sort=asc&master_proces_id=" + parent_id);
      // this.form.permintaan_pembelian_details = this.lookup_custom2.data.map(
      //   (item) => {
      //     // return this.lookup_custom2.data;
      //     return {
      //       // ...item,
      //       id: item.id,
      //       name: item.name,
      //       value: 0,
      //     };
      //   }
      // );

      this.form.permintaan_pembelian_details = this.lookup_custom2.map(
        (item) => {
          return {
            ...item,
            supplier_id: item.supplier,
            // grade_id: item.grade,
            // keterangan: item.product,
          };
        }
      );
      // this.form.permintaan_pembelian_details = this.lookup_custom2.data;

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
            "?search=" + this.department_search +
            "&page=" + this.lookup_department.current_page +
            "&per_page=10&status=1&sort=asc",
        });
        this.isLoadingGetDepartment = false;
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;
      if (!this.form.permintaan_pembelian_details.length) {
        this.$toaster.error("Detail Permintaan Pembelian Masih Kosong");
        return;
      }
      this.isLoadingForm = true;

      let url = "purchaseing_module/update_price";
      let formData = {
        ...this.form,
      }

      // let formData = {
      //   ...this.form,
      //   department_id:
      //     typeof this.form.department_id == "object"
      //       ? this.form.department_id.id
      //       : "",
      //   permintaan_user_id:
      //     typeof this.form.permintaan_user_id == "object"
      //       ? this.form.permintaan_user_id.id
      //       : "",
      // };

      formData.permintaan_pembelian_details = formData.permintaan_pembelian_details.map((item) => {
        return {
          // quantity: item.quantity,
          detail_permintaan_pembelian_id: item.id,
          price: item.price,
          date_price: item.date_price,
          grand_total: item.grand_total,
          // keterangan: item.keterangan,
          supplier_id:
            typeof item.supplier_id == "object" && item.supplier_id
              ? item.supplier_id.id
              : "",
          product_id: item.product_id,
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
          this.$toaster.success("Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Permintaan Pembelian");

          if (!this.isEditable) {
            let tanggal_awal = this.form.tanggal_awal;
            let tanggal_akhir = this.form.tanggal_akhir;

            this.form = {
              ...this.default_form,
              tanggal_akhir : tanggal_akhir,
              tanggal_awal : tanggal_awal,
              // permintaan_pembelian_details: [],
            };
            

            this.setCode();
            this.onChangeType();


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

    printFile() {
            var token = this.$cookiz
              .get("auth._token.local")
              .replace("Bearer ", "");

            window.open(
              process.env.API_URL +
              "/purchaseing_module/update_price/print?start_date=" + this.form.tanggal_awal + "&end_date=" + this.form.tanggal_akhir+"&order=permintaan_user_id&token=" +
              token,
              "_blank"
            );
    },

    exportFile() {
      var token = this.$cookiz
        .get("auth._token.local")
        .replace("Bearer ", "");

      window.open(
        process.env.API_URL +
        "/purchaseing_module/update_price/export/xlsx?start_date=" + this.form.tanggal_awal + "&end_date=" + this.form.tanggal_akhir + "&order=permintaan_user_id&token=" +
        token,
        "_blank"
      );
    },

  

    async setCode() {
      await this.getCode({
        url: "purchaseing_module/permintaan_pembelian",
        query: "",
      });

      this.form.code = this.code;
    },

    addDetail() {
      this.form.permintaan_pembelian_details.push({
        product_id: "",
        grade_id: "",
        keterangan: "",
        quantity: 0.0,
        price: 0.0,
      });
    },

    deleteDetail(indexItem) {
      this.form.permintaan_pembelian_details = this.form.permintaan_pembelian_details.filter(
        (_, index) => index != indexItem
      );
    },

    onSetProduct(index) {
      let itemProduct = {
        ...this.form.permintaan_pembelian_details[index],
      };

      if (!itemProduct.product_id) {
        this.form.permintaan_pembelian_details[index].product_id = '';
        return
      };
    },

    onSetWorkOrder(item) {
      if (item) {

      } else {
        this.form.production_id = "";
        this.form.product_id = "";
      }
    },

    onProductChange() {
      if (
        this.form.product_id &&
        this.form.production_id
      ) {
        let itemProduct = this.form
          .production_id
          .production_details.find(item => item.product_id == this.form.product_id)

        this.form.quantity = itemProduct ? itemProduct.quantity : 0;

        this.$axios.get("manufactur/material_requirement/get-bom/" + itemProduct.product_id)
          .then(res => {
            if (res.data.bom) {
              if (
                res.data.bom.bom_details &&
                res.data.bom.bom_details.length
              ) {
                this.form.permintaan_pembelian_details = res.data.bom.bom_details.map(item => {
                  return {
                    quantity: (parseFloat(item.quantity) * parseFloat(itemProduct.quantity)),
                    quantity_bom: item.quantity,
                    quantity_receive: 0,
                    product_id: item.product || "",
                    keterangan: ""
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
