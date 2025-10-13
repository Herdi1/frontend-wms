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

              <div class="w-full mt-3 mb-7">
                <div class="w-full gap-5 p-2 border border-gray-300 rounded-md">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                    <div class="form-group w-full flex">
                      <div class="mb-3 w-1/2">Gudang</div>

                      <v-select
                        class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_gudang"
                        :loading="isLoadingGetGudang"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetGudang"
                        v-model="parameters.params.gudang"
                        @input="onSelectGudang"
                        :disabled="lookup_custom1.data.length == 1"
                      >
                        <template slot="selected-option" slot-scope="option">
                          <div
                            class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {{ option.nama_gudang }}
                          </div>
                        </template>
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom1.data.length || search"
                        >
                          <span
                            v-if="lookup_custom1.current_page > 1"
                            @click="onGetGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            style="cursor: pointer"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom1.last_page >
                              lookup_custom1.current_page
                            "
                            @click="onGetGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            style="cursor: pointer"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>

                    <div class="flex gap-3 justify-self-end">
                      <button
                        @click="onLoad"
                        class="bg-blue-500 shadow-lg hover:shadow-none p-2 text-white rounded-md flex"
                      >
                        <i class="fa fa-filter text-white font-bold mr-2"></i>
                        <div>Filter</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- start table -->
              <div class="table-responsive">
                <table class="mb-5" ref="formContainer">
                  <thead>
                    <tr class="text-base uppercase">
                      <th class="w-[5%]">Edit</th>
                      <th class="w-[5%]">Detail</th>
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
                      <th class="w-[5%]">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in data" :key="i" class="text-base">
                      <td class="text-center">
                        <small-edit-button @click="onEdit(item)" />
                      </td>
                      <td class="text-center">
                        <small-detail-button @click="onDetail(item)" />
                      </td>
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
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import ModalDetail from "./detail";

export default {
  middleware: ["checkRoleSuperAdmin"],

  head() {
    return {
      title: "Akun",
    };
  },

  async created() {
    await this.onSearchGudang();
    if (this.lookup_custom1.data.length > 0) {
      this.onSelectGudang(this.lookup_custom1.data[0]);
    }
    this.set_data([]);
    this.onLoad();
  },

  mounted() {
    this.$refs.formOption.isExport = false;
    this.$refs.formOption.isFilter = false;
    this.$refs.formOption.isMaintenancePage = false;
    this.$refs.formOption.isAddData = true;
  },

  data() {
    return {
      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      title: "Akun",
      isLoadingData: false,
      isPaginate: true,
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
          gudang: "",
          gudang_id: "",
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
          staff_id: "",
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },
      default_roles: {
        store: true,
        update: true,
        destroy: true,
        restore: true,
        show: true,
        export: true,
        export_excel: true,
        export_pdf: true,
        print: true,
        destroy_all: true,
        restore_all: true,
        import: true,
      },
      user: this.$auth.user,
    };
  },

  components: {
    ModalDetail,
  },

  computed: {
    ...mapState("moduleApi", ["data", "error", "result", "lookup_custom1"]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "user"
        );

        let roles = {};

        if (JSON.parse(main_role.pivot.operators).includes("all")) {
          return this.default_roles;
        }

        JSON.parse(main_role.pivot.operators).forEach((item) => {
          roles[item.replace("-", "_")] = true;
        });

        return roles;
      }
    },
  },

  methods: {
    ...mapActions("moduleApi", [
      "getData",
      "deleteData",
      "restoreData",
      "deleteAllData",
      "restoreAllData",
      "lookUp",
    ]),

    ...mapMutations("moduleApi", ["set_data"]),

    onFormShow() {
      this.$router.push("/setting/user/add");
    },

    onEdit(item) {
      this.$router.push("/setting/user/" + item.user_id);
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
      this.parameters.params.page = parseInt(page) || 1;

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

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudangGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudangGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang-user",
          lookup: "custom1",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },
    onSelectGudang(item) {
      if (item) {
        this.parameters.params.gudang = item;
        this.parameters.params.gudang_id = item.gudang_id;
      } else {
        this.parameters.params.gudang = "";
        this.parameters.params.gudang_id = "";
      }
    },
  },
};
</script>
