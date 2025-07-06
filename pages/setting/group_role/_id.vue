<template>
  <section class="sect ion bg-white rounded-md px-4 py-2 shadow-sm">
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Term Pembayaran
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Term Pembayaran
        </h1>
        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div class="modal-body">
            <div class="gap-2 mb-3 w-full">
              <div class="">
                <ValidationProvider
                  name="name_role"
                  rules="required"
                  v-slot="{ errors, valid }"
                >
                  <div class="form-group">
                    <label for="nama_role"
                      >Nama <span class="text-danger">*</span></label
                    >
                    <input
                      id="nama_role"
                      type="text"
                      class="border border-gray-300 rounded md p-1 outline-none w-full text-black"
                      name="nama_role"
                      v-model="parameters.form.nama_role"
                      required
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                  </div>
                </ValidationProvider>

                <div class="form-group">
                  <label for="type_option"
                    >Opsi Pilihan <span class="text-danger">*</span></label
                  >
                  <select
                    class="form-control border border-gray-300 rounded md p-2 outline-none w-full text-gray-500 mb-2"
                    v-model="parameters.form.type_option"
                  >
                    <option value="chcekbox">Checkbox</option>
                    <option value="multiselect">Multiselect</option>
                  </select>
                </div>

                <div>
                  <a
                    href="#"
                    class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md w-32 flex gap-2 items-center"
                    @click="onAddGrant"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">Tambah Menu</p>
                  </a>

                  <div
                    class="table-responsive"
                    style="max-height: 500px"
                    :style="
                      parameters.form.grants.length ? 'min-height:500px' : ''
                    "
                  >
                    <table
                      class="table mt-5"
                      v-if="parameters.form.grants.length > 0"
                    >
                      <tr>
                        <td style="width: 400px">Hak Akses</td>
                        <td style="width: 400px">Operator</td>
                        <td>Opsi</td>
                      </tr>
                      <tr
                        v-for="(item, index) in parameters.form.grants"
                        :key="index"
                        style="border-top: 0.5px solid lightgray"
                      >
                        <td class="">
                          <v-select
                            label="judul"
                            :loading="isLoadingGetRole"
                            :options="lookup_roles.data"
                            :filterable="false"
                            @search="onGetRole"
                            v-model="item.menu_id"
                            :required="true"
                          >
                            <template v-slot:option="option">
                              <div class="flex justify-between items-center">
                                <div class="text-sm">
                                  {{ option.judul }}
                                </div>
                                <span>{{
                                  option.status === "0"
                                    ? "Website"
                                    : option.status === "1"
                                    ? "Mobile"
                                    : ""
                                }}</span>
                              </div>
                            </template>
                            <template #search="{ attributes, events }">
                              <input
                                class="vs__search"
                                :required="!item.menu_id"
                                v-bind="attributes"
                                v-on="events"
                              />
                            </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="flex justify-between"
                              v-if="lookup_roles.data.length || search"
                            >
                              <span
                                v-if="lookup_roles.current_page > 1"
                                @click="onGetRole(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-0.5 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_roles.last_page >
                                  lookup_roles.current_page
                                "
                                @click="onGetRole(search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-0.5 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td>
                          <div
                            v-if="parameters.form.type_option == 'multiselect'"
                          >
                            <multiselect
                              :options="options"
                              v-model="item.operators"
                              :multiple="true"
                              :taggable="true"
                              openDirection="bottom"
                              @tag="addTag"
                            >
                              <template slot="option" slot-scope="props">
                                <div class="option__desc">
                                  <span class="option__title">
                                    <span
                                      class="text-small"
                                      v-if="props.option == 'all'"
                                    >
                                      semua operator
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="props.option == 'index'"
                                    >
                                      lihat data
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="props.option == 'store'"
                                    >
                                      tambah data
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="props.option == 'update'"
                                    >
                                      update data
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="props.option == 'destroy'"
                                    >
                                      hapus data
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="props.option == 'restore'"
                                    >
                                      pulihkan data
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="props.option == 'print'"
                                    >
                                      print data pdf
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="props.option == 'export'"
                                    >
                                      export data pdf/excel
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="props.option == 'export_pdf'"
                                    >
                                      export data pdf
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="props.option == 'export_excel'"
                                    >
                                      export data excel
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="props.option == 'show'"
                                    >
                                      lihat detail data
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="props.option == 'destroy-all'"
                                    >
                                      hapus banyak data
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="props.option == 'restore-all'"
                                    >
                                      pulihkan banyak data
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="props.option == 'import'"
                                    >
                                      import file ke database
                                    </span>
                                    <span
                                      class="text-small"
                                      v-else-if="
                                        props.option == 'import-template'
                                      "
                                    >
                                      download template import
                                    </span>
                                  </span>
                                </div>
                              </template>
                            </multiselect>
                          </div>
                          <div v-else>
                            <div class="row">
                              <div
                                class="col-md-6 mt-2"
                                v-for="(itemOption, index) in options"
                                :key="index"
                              >
                                <input
                                  type="checkbox"
                                  :value="itemOption"
                                  v-model="item.operators"
                                />
                                <span
                                  class="text-small"
                                  v-if="itemOption == 'all'"
                                  style="font-size: 10px"
                                >
                                  semua operator
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'index'"
                                  style="font-size: 10px"
                                >
                                  lihat data
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'store'"
                                  style="font-size: 10px"
                                >
                                  tambah data
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'update'"
                                  style="font-size: 10px"
                                >
                                  update data
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'destroy'"
                                  style="font-size: 10px"
                                >
                                  hapus data
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'restore'"
                                  style="font-size: 10px"
                                >
                                  pulihkan data
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'print'"
                                  style="font-size: 10px"
                                >
                                  print data pdf
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'export'"
                                  style="font-size: 10px"
                                >
                                  export data pdf/excel
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'export_pdf'"
                                  style="font-size: 10px"
                                >
                                  export data pdf
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'export_excel'"
                                  style="font-size: 10px"
                                >
                                  export data excel
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'show'"
                                  style="font-size: 10px"
                                >
                                  lihat detail data
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'destroy-all'"
                                  style="font-size: 10px"
                                >
                                  hapus banyak data
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'restore-all'"
                                  style="font-size: 10px"
                                >
                                  pulihkan banyak data
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'import'"
                                  style="font-size: 10px"
                                >
                                  import file ke database
                                </span>
                                <span
                                  class="text-small"
                                  v-else-if="itemOption == 'import-template'"
                                  style="font-size: 10px"
                                >
                                  download template import
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <i
                            class="fas fa-trash"
                            style="cursor: pointer"
                            @click="onDeleteGrant(index)"
                          ></i>
                        </td>
                      </tr>
                      <tr v-if="!parameters.form.grants.length">
                        <td colspan="3" class="text-center">
                          Data tidak ditemukan
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <modal-footer-section
            :isLoadingForm="isLoadingForm"
            @reset="formReset()"
          />
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  middleware: ["isNotAccessable"],

  props: ["self"],

  async mounted() {
    await this.onSearchRole();
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,
      isStopSearchRole: false,
      isLoadingGetRole: false,
      role_search: "",

      options: [
        "all",
        "index",
        "store",
        "update",
        "show",
        "destroy",
        "destroy-all",
        "restore",
        "restore-all",
        "print",
        "export",
        "export_pdf",
        "export_excel",
        "import",
        "import-template",
      ],

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? false : true,
      isLoadingForm: false,
      title: "User",
      parameters: {
        url: "setting/role",
        form: {
          nama_role: "",
          type_option: "multiselect",
          grants: [],
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get("/master/role/" + this.id);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      console.log("error", error);
    }
  },

  computed: {
    ...mapState("moduleApi", ["error", "result", "lookup_roles"]),

    filter_lookup_roles() {
      let new_roles = this.lookup_roles.data.filter(
        (item) => item.parent_id != null
      );

      return new_roles.filter((item) => {
        return !this.parameters.form.grants.find(
          (itemGrant) =>
            item.name == (itemGrant.menu_id ? itemGrant.menu_id.judul : "")
        );
      });
    },
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          id: this.parameters.form.role_id,
          grants: this.parameters.form.grants.map((item) => {
            return {
              operators: item.operators,
              menu_id: item.menu_id.menu_id,
            };
          }),
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        // this.self.onLoad(this.self.parameters.params.page);
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
      this.parameters.form = {
        nama_role: "",
        type_option: "multiselect",
        grants: [],
      };
    },

    addTag(newTag) {
      this.options.push(newTag);
    },

    onAddGrant() {
      this.parameters.form.grants.push({
        menu_id: null,
        operators: [],
      });
    },

    onDeleteGrant(index) {
      this.parameters.form.grants = this.parameters.form.grants.filter(
        (_, itemIndex) => index != itemIndex
      );
    },

    onGetRole(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchRole);

      this.isStopSearchRole = setTimeout(() => {
        this.role_search = search;

        if (typeof isNext !== "function") {
          this.lookup_roles.current_page = isNext
            ? this.lookup_roles.current_page + 1
            : this.lookup_roles.current_page - 1;
        } else {
          this.lookup_roles.current_page = 1;
        }

        this.onSearchRole();
      }, 600);
    },

    async onSearchRole() {
      if (!this.isLoadingGetRole) {
        this.isLoadingGetRole = true;

        await this.lookUp({
          url: "setting/role/get-menu",
          lookup: "roles",
          query:
            "?search=" +
            this.role_search +
            "&page=" +
            this.lookup_roles.current_page +
            "&per_page=10",
        });

        this.isLoadingGetRole = false;
      }
    },
    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        nama_role: "",
        type_option: "multiselect",
        grants: [],
      };
    },
  },
};
</script>
