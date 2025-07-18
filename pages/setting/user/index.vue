<template>
  <section class="">
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Setting</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Akun</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div class="gap-5">
      <!-- <div
        class="relative p-4 w-12/12 bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-3"
      > -->
      <!-- <div class="w-full">
          <FormIndex :self="this" ref="formIndex" />
        </div> -->
      <!-- </div> -->

      <div
        class="relative p-4 w-12/12 bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
      >
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="card-body">
              <div class="card-title">
                <list-option-section :self="this" ref="formOption" />
              </div>

              <!-- start table -->
              <div class="table-responsive">
                <table class="mb-5" ref="formContainer">
                  <thead>
                    <tr class="text-base uppercase">
                      <th class="w-[5%]">No</th>
                      <th
                        @click="
                          onSort(
                            'username',
                            parameters.params.sort == 'asc' ? 'desc' : 'asc'
                          )
                        "
                        class="cursor-pointer w-[25%]"
                      >
                        <div
                          class="flex flex-row justify-between items-baseline"
                        >
                          <div>Username</div>
                          <div>
                            <i
                              class="fas fa-caret-up"
                              :class="
                                parameters.params.order == 'username' &&
                                parameters.params.sort == 'asc'
                                  ? ''
                                  : 'light-gray'
                              "
                            ></i>
                            <i
                              class="fas fa-caret-down"
                              :class="
                                parameters.params.order == 'username' &&
                                parameters.params.sort == 'desc'
                                  ? ''
                                  : 'light-gray'
                              "
                            ></i>
                          </div>
                        </div>
                      </th>
                      <th
                        @click="
                          onSort(
                            'email',
                            parameters.params.sort == 'asc' ? 'desc' : 'asc'
                          )
                        "
                        class="cursor-pointer w-[25%]"
                      >
                        <div
                          class="flex flex-row justify-between items-baseline"
                        >
                          <div>Email</div>
                          <div>
                            <i
                              class="fas fa-caret-up"
                              :class="
                                parameters.params.order == 'email' &&
                                parameters.params.sort == 'asc'
                                  ? ''
                                  : 'light-gray'
                              "
                            ></i>
                            <i
                              class="fas fa-caret-down"
                              :class="
                                parameters.params.order == 'email' &&
                                parameters.params.sort == 'desc'
                                  ? ''
                                  : 'light-gray'
                              "
                            ></i>
                          </div>
                        </div>
                      </th>
                      <th class="w-[15%]">Gudang</th>
                      <th class="w-[15%]">Jabatan</th>
                      <th class="w-[5%]">Detail</th>
                      <th class="w-[5%]">Edit</th>
                      <th class="w-[5%]">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in data" :key="i" class="text-base">
                      <td>
                        {{
                          (parameters.params.page - 1) *
                            parameters.params.per_page +
                          i +
                          1
                        }}
                      </td>
                      <td>{{ item.username }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.gudang ? item.gudang.nama_gudang : "-" }}</td>
                      <td>
                        {{ item.jabatan ? item.jabatan.nama_jabatan : "-" }}
                      </td>
                      <td class="text-center">
                        <small-detail-button @click="onDetail(item)" />
                      </td>
                      <td class="text-center">
                        <small-edit-button @click="onEdit(item)" />
                      </td>
                      <td class="text-center">
                        <small-delete-button
                          @click="onTrashed(item)"
                          v-if="!item.deleted_at"
                        />
                      </td>
                    </tr>
                  </tbody>

                  <table-data-loading-section :self="this" />

                  <table-data-not-found-section :self="this" />
                </table>
              </div>
              <!-- end table -->

              <div
                class="card-title border-top"
                style="padding-bottom: -100px !important"
              >
                <pagination-section :self="this" ref="pagination" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalDetail :self="this" ref="modalDetail" />

    <!-- <FormInput :self="this" ref="formInput" /> -->
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
// import FormInput from "./form";
import ModalDetail from "./detail";
// import FormIndex from "./formIndex";

export default {
  middleware: ["checkRoleSuperAdmin"],

  head() {
    return {
      title: "Akun",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  mounted() {
    this.$refs.formOption.isExport = false;
    this.$refs.formOption.isFilter = false;
    this.$refs.formOption.isMaintenancePage = false;
    this.$refs.formOption.isAddData = true;

    // if (
    //   this.getRoles.destroy ||
    //   this.getRoles.destroy_all ||
    //   this.getRoles.restore ||
    //   this.getRoles.restore_all
    // ) {
    //   this.$refs["form-option"].isMaintenancePage = false;
    // }

    // if (this.getRoles.store) {
    //   this.$refs["form-option"].isAddData = true;
    // }

    // if (this.getRoles.export) {
    //   this.$refs["form-option"].isExportFile = true;

    //   this.$refs["form-option"].isExportFilePdf = true;
    //   this.$refs["form-option"].isExportFileExcel = true;

    //   if ("export_pdf" in this.getRoles || "export_excel" in this.getRoles) {
    //     this.$refs["form-option"].isExportFilePdf = this.getRoles.export_pdf;
    //     this.$refs["form-option"].isExportFileExcel =
    //       this.getRoles.export_excel;
    //   }
    // }

    // if (this.getRoles.print) {
    //   this.$refs["form-option"].isExportPrint = true;
    // }
  },

  data() {
    return {
      title: "Akun",
      isLoadingData: false,
      isPaginate: true,
      // user: this.$auth.user,
      // default_roles: {
      //   store: true,
      //   update: true,
      //   destroy: true,
      //   restore: true,
      //   show: true,
      //   export: true,
      //   export_excel: true,
      //   export_pdf: true,
      //   print: true,
      //   destroy_all: true,
      //   restore_all: true,
      //   import: true,
      // },
      parameters: {
        url: "setting/user",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "user_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
        },
        form: {
          nama_lengkap: "",
          username: "",
          email: "",
          no_hp: "",
          password: "",
          jenis_kelamin: "",
          status_user: "",
          status_aktif: "",
          pelanggan_id: "",
          role_id: "",
          gudang_id: "",
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },
    };
  },

  components: {
    // FormInput,
    ModalDetail,
    // FormIndex,
  },

  computed: {
    ...mapState("moduleApi", ["data", "error", "result"]),
  },

  methods: {
    ...mapActions("moduleApi", [
      "getData",
      "deleteData",
      "restoreData",
      "deleteAllData",
      "restoreAllData",
    ]),

    ...mapMutations("moduleApi", ["set_data"]),

    onFormShow() {
      this.$router.push("/setting/user/add");
      // console.log("onFormShow");
      // this.$refs.formIndex.parameters.form = {
      //   nama_lengkap: "",
      //   username: "",
      //   password: "",
      //   email: "",
      //   group_role_id: "",
      //   nik: "",
      //   parent_id: "",
      //   regu_id: "",
      // };
      // this.$refs.formIndex.isEditable = false;
      // // this.$refs.formIndex.show();
      // this.$nextTick(() => {
      //   this.$refs.formIndex?.$refs?.formValidate?.reset();
      // });
      // this.$refs.formInput.parameters.form = {
      //   nama_lengkap: "",
      //   username: "",
      //   password: "",
      //   email: "",
      //   group_role_id: "",
      //   nik: "",
      //   parent_id: "",
      //   regu_id: "",
      // };
      // this.$refs.formInput.isEditable = false;
      // this.$refs.formInput.show();
      // this.$nextTick(() => {
      //   this.$refs.formInput?.$refs?.formValidate?.reset();
      // });
    },

    onEdit(item) {
      this.$router.push("/setting/user/" + item.user_id);
      // this.$refs.formIndex.isEditable = true;
      // this.$refs.formIndex.parameters.form = {
      //   ...item,
      // group_role_id: item.group_role ? item.group_role : {},
      // id: item.user_id,
      // regu_id: item.regu ? item.regu : {},
      // };
      // console.log(item);
      // this.$refs.formIndex.show();
      // this.$nextTick(() => {
      //   this.$refs.formIndex?.$refs?.formValidate?.reset();
      // });
      // this.$refs.formInput.isEditable = true;
      // this.$refs.formInput.parameters.form = {
      //   ...item,
      //   group_role_id: item.group_role ? item.group_role : {},
      //   id: item.user_id,
      //   regu_id: item.regu ? item.regu : {},
      // };
      // this.$refs.formInput.show();
      // this.$nextTick(() => {
      //   this.$refs.formInput?.$refs?.formValidate?.reset();
      // });
    },

    onDetail(item) {
      this.$refs.modalDetail.parameters.form = {
        ...item,
        group_role: item.group_role ? item.group_role : { grants: [] },
      };
      this.$refs.modalDetail.show();
    },

    onTrashed(item) {
      if (this.parameters.loadings.isDelete) return;

      this.$confirm({
        auth: false,
        message: "Data ini akan dipindahkan ke dalam Trash. Yakin ??",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: async (confirm) => {
          if (confirm) {
            this.parameters.loadings.isDelete = true;

            await this.deleteData({
              url: this.parameters.url,
              id: item.user_id,
              params: this.parameters.params,
            });

            if (this.result == true) {
              this.onLoad(this.parameters.params.page);
              this.$toaster.success(
                "Data berhasil di pindahkan ke dalam Trash!"
              );
            } else {
              this.$globalErrorToaster(this.$toaster, this.error);
            }

            this.parameters.loadings.isDelete = false;
          }
        },
      });
    },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = page;

      // this.parameters.form.checkboxs = [];
      // if (document.getElementById("checkAll")) {
      //   document.getElementById("checkAll").checked = false;
      // }

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      await this.getData(this.parameters);

      if (this.result == true) {
        loader.hide();

        if (page == 1) {
          this.$refs["pagination"].generatePage();
        }

        this.$refs["pagination"].active_page = this.parameters.params.page;
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingData = false;
    },

    onSort(column, sort = "asc") {
      this.parameters.params = {
        ...this.parameters.params,
        order: column,
        sort: sort,
      };

      this.onLoad(this.parameters.params.page);
    },
  },
};
</script>
