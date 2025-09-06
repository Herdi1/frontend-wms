<template>
  <section class="section min-h-screen">
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Menu
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Menu
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
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm mb-5"
          >
            <ValidationProvider
              ref="inputProvider"
              name="name"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <label for="name">Rute</label>
                <input
                  id="name"
                  type="text"
                  class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                  name="name"
                  v-model="parameters.form.rute"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                />
                <div class="text-danger" v-if="errors[0]">
                  {{ errors[0] }}
                </div>
                <div class="text-danger text-small" v-if="isEditable">
                  * Hati-hati dalam menganti nama menu
                </div>
              </div>
            </ValidationProvider>

            <ValidationProvider
              ref="inputProvider"
              name="judul"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <label for="judul">Nama Menu</label>
                <input
                  id="judul"
                  type="text"
                  class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                  name="judul"
                  v-model="parameters.form.judul"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                />

                <div class="text-danger" v-if="errors[0]">
                  {{ errors[0] }}
                </div>
              </div>
            </ValidationProvider>

            <div class="form-group mb-3">
              <label for="icon">Icon</label>
              <input
                id="icon"
                type="text"
                class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                name="icon"
                v-model="parameters.form.icon"
              />
            </div>

            <div class="form-group">
              <label for="status_menu">Status Menu</label>
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-3"
                id="status_menu"
                label="judul"
                :options="[
                  { judul: 'Modul', value: '1' },
                  { judul: 'Parent', value: '2' },
                  { judul: 'Child', value: '3' },
                ]"
                :reduce="(item) => item.value"
                v-model="parameters.form.status_menu"
                @input="changeStatus"
              >
              </v-select>
            </div>

            <!-- menu induk 1 -->
            <div class="form-group" v-show="parameters.form.status_menu != 1">
              <label for="menu_id_induk">Module</label>
              <v-select
                id="menu_id_induk"
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="judul"
                :loading="isLoadingGetRole"
                :options="lookup_roles.data"
                :filterable="false"
                @search="onGetRole"
                v-model="parameters.form.menu_id_induk"
                @input="onSearchRole2"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="flex justify-between"
                  v-if="lookup_roles.data.length || search"
                >
                  <span
                    v-if="lookup_roles.current_page > 1"
                    @click="onGetRole(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-1 rounded-sm"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="lookup_roles.last_page > lookup_roles.current_page"
                    @click="onGetRole(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-1 rounded-sm"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
              <span class="text-muted text-xs">
                *Kosongi jika ingin membuat menu menjadi module
              </span>
            </div>

            <!-- menu induk 2 -->
            <div
              class="form-group"
              v-show="
                parameters.form.status_menu != 1 &&
                parameters.form.status_menu != 2
              "
            >
              <!-- <search-dropdown
                    :optionsData="lookup_custom1"
                    label="Parent"
                    :isLoading="isLoadingGetCustom"
                    :onSearch="onGetRole2"
                    :reduce="(item) => item.menu_id"
                    :value="parameters.form.menu_id_induk_2"
                  /> -->
              <label for="parent_id">Parent</label>
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="judul"
                :loading="isLoadingGetCustom"
                :options="lookup_custom1.data"
                :filterable="false"
                @search="onGetRole2"
                v-model="parameters.form.menu_id_induk_2"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-2 border-t flex justify-between"
                  v-if="lookup_custom1.data.length || search"
                >
                  <span
                    v-if="lookup_custom1.current_page > 1"
                    @click="onGetRole2(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom1.last_page > lookup_custom1.current_page
                    "
                    @click="onGetRole2(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
              <span class="text-muted text-xs">
                *Kosongi jika ingin membuat menu menjadi parent
              </span>
            </div>

            <div class="form-group">
              <label for="status">Aplikasi</label>
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-3"
                id="status"
                label="judul"
                :options="[
                  { judul: 'Web', value: '0' },
                  { judul: 'Android', value: '1' },
                ]"
                :reduce="(item) => item.value"
                v-model="parameters.form.status"
              >
              </v-select>
            </div>
            <div class="form-group">
              <label
                for="file_icon"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >File Icon
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="small_size"
                type="file"
                @change="handleFileChange"
              />
              <button
                v-if="parameters.form.file_icon && isEditable"
                class="p-1 my-1 rounded-md bg-blue-500 text-white hover:bg-blue-400"
              >
                File Saat Ini :
                <span class="font-bold">{{ parameters.form.file_icon }}</span>
              </button>
              <span class="text-muted text-xs">
                *Ukuran file maksimal 1 MB (.png, .jpg, .jpeg, .svg)
              </span>
            </div>
            <div>
              <label for="urutan">Urutan</label>
              <input
                type="number"
                v-model="parameters.form.urutan"
                min="0"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
              <!-- <input-form
                label="Urutan"
                type="number"
                name="urutan"
                v-model="parameters.form.urutan"
                :required="false"
                :min="'0'"
              /> -->
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
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      isStopSearchRole: false,
      isLoadingGetRole: false,

      isStopSearchCustom: false,
      isLoadingGetCustom: false,

      statusMenu: "",
      role_search: "",
      custom_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Menu",
      parameters: {
        url: "setting/menu",
        form: {
          rute: "",
          judul: "",
          icon: "",
          menu_id_induk: "",
          menu_id_induk_2: "",
          urutan: 0,
          status: "",
          status_menu: "",
          file_icon: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.menu_id_induk = res.data.parent ?? "";
        this.parameters.form.menu_id_induk_2 = res.data.parent_2 ?? "";
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchRole();
    // await this.onSearchRole2();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_roles",
      "lookup_custom1",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    handleFileChange(e) {
      let file = e.target.files[0];
      this.parameters.form.file_icon = file;
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "setting/menu";

      let formData = new FormData();

      Object.entries(this.parameters.form).forEach(([key, value]) => {
        if (
          key !== "file_icon" &&
          key !== "menu_id_induk" &&
          key !== "menu_id_induk_2"
        ) {
          formData.append(key, value || "");
        }
      });

      formData.append(
        "menu_id_induk",
        typeof this.parameters.form.menu_id_induk === "object"
          ? this.parameters.form.menu_id_induk.menu_id
          : this.parameters.form.menu_id_induk
      );
      formData.append(
        "menu_id_induk_2",
        typeof this.parameters.form.menu_id_induk_2 === "object"
          ? this.parameters.form.menu_id_induk_2.menu_id
          : this.parameters.form.menu_id_induk_2
      );

      if (this.parameters.form.urutan == 0) {
        formData.append("urutan", 0);
      }

      if (this.parameters.form.file_icon instanceof File) {
        formData.append("file_icon", this.parameters.form.file_icon);
      }

      if (this.isEditable) {
        url += "/" + this.parameters.form.menu_id;
        formData.append("_method", "PUT");
      }

      this.$axios({
        url: url,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " +
              (this.isEditable == true ? "Diedit" : "Tambah")
          );

          if (!this.isEditable) {
            this.formReset();
          }

          this.$router.push("/setting/role");
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
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

        // this.statusMenu = '&status_menu=1';

        this.onSearchRole();
      }, 600);
      this.onSearchRole2();
    },

    async onSearchRole() {
      if (!this.isLoadingGetRole) {
        this.isLoadingGetRole = true;

        await this.lookUp({
          url: "setting/menu/get-menu",
          lookup: "roles",
          query:
            "?search=" +
            this.role_search +
            "&status_menu=1" +
            "&page=" +
            this.lookup_roles.current_page +
            "&per_page=10",
        });

        this.isLoadingGetRole = false;
      }
    },

    onGetRole2(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCustom);

      this.isStopSearchCustom = setTimeout(() => {
        this.custom_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchRole2();
      }, 600);
    },

    async onSearchRole2() {
      if (!this.isLoadingGetCustom) {
        this.isLoadingGetCustom = true;

        await this.lookUp({
          url: "setting/menu/get-menu",
          lookup: "custom1",
          query:
            "?search=" +
            this.custom_search +
            "&menu_id_induk=" +
            this.parameters.form.menu_id_induk +
            "&status_menu=2" +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCustom = false;
      }
    },

    changeStatus() {
      if (this.parameters.form.status_menu == "1") {
        this.parameters.form.menu_id_induk = "";
        this.parameters.form.menu_id_induk_2 = "";
      } else if (this.parameters.form.status_menu == "2") {
        this.parameters.form.menu_id_induk_2 = "";
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        rute: "",
        judul: "",
        icon: "",
        menu_id_induk: "",
        menu_id_induk_2: "",
        urutan: 0,
        status: "",
        status_menu: "",
        file_icon: "",
      };
    },
  },
};
</script>
