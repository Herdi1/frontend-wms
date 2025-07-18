<template>
  <portal v-if="visible" to="modal">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 w-full max-w-md dark:bg-slate-700 dark:text-gray-100 max-h-screen overflow-y-auto"
      aria-hidden="true"
      id="modal-form"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <modal-header-section :self="this" @close="hide" />

          <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
            <form
              @submit.prevent="validate().then(() => onSubmit(invalid))"
              autocomplete="off"
            >
              <div class="modal-body">
                <div class="grid grid-cols-2 gap-2 mb-3 w-full">
                  <div class="col">
                    <div class="form-group">
                      <label for="fullname">Nama Lengkap</label>
                      <input
                        id="fullname"
                        type="text"
                        class="border border-gray-300 rounded md p-2 outline-none w-full text-gray-500"
                        name="fullname"
                        v-model="parameters.form.nama_lengkap"
                      />
                    </div>
                  </div>

                  <div class="col">
                    <ValidationProvider name="username" rules="required">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <label for="uername">Username</label>
                        <input
                          id="username"
                          type="text"
                          class="border border-gray-300 rounded md p-2 outline-none w-full text-gray-500"
                          name="username"
                          v-model="parameters.form.username"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
                        />

                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2 mb-3 w-full">
                  <div class="col">
                    <ValidationProvider name="no_hp">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <label for="no_hp">No. HP</label>
                        <input
                          id="no_hp"
                          type="text"
                          class="border border-gray-300 rounded md p-2 outline-none w-full text-gray-500"
                          name="no_hp"
                          v-model="parameters.form.no_hp"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
                        />
                        <!-- <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>       -->
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="col">
                    <div class="form-group">
                      <label for="jenis_kelamin"> Jenis Kelamin </label>
                      <select
                        class="border border-gray-300 rounded md p-2 outline-none w-full text-gray-500"
                        v-model="parameters.form.jenis_kelamin"
                      >
                        <option value="l">Laki-laki</option>
                        <option value="p">Perempuan</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2 mb-3 w-full">
                  <div class="col">
                    <div class="form-group">
                      <label for="gudang_id"> Status User </label>
                      <select
                        class="border border-gray-300 rounded md p-2 outline-none w-full text-gray-500"
                        v-model="parameters.form.status_user"
                      >
                        <option value="0">VUDS</option>
                        <option value="1">Vendor</option>
                        <option value="2">Pelanggan</option>
                      </select>
                    </div>
                  </div>

                  <div class="col">
                    <div class="form-group">
                      <label for="gudang_id"> Status Aktif </label>
                      <select
                        class="border border-gray-300 rounded md p-2 outline-none w-full text-gray-500"
                        v-model="parameters.form.status_aktif"
                      >
                        <option value="0">Aktif</option>
                        <option value="1">Non Akitf</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2 mb-3 w-full">
                  <div class="col">
                    <!-- get from table role -->
                    <div class="form-group">
                      <label for="gudang_id"> Role </label>
                      <select
                        class="border border-gray-300 rounded md p-2 outline-none w-full text-gray-500"
                        v-model="parameters.form.role_id"
                      >
                        <option value="1">Gudang 1</option>
                        <option value="2">Gudang 2</option>
                      </select>
                    </div>
                  </div>

                  <div class="col">
                    <!-- <div
                      v-if="parameters.form.status_user == 2"
                      class="form-group"
                    >
                      <label for="gudang_id"> Pelanggan </label>
                      <select
                        class="border border-gray-300 rounded md p-2 outline-none w-full text-gray-500"
                        v-model="parameters.form.pelanggan_id"
                      >
                        <option value="1">Gudang 1</option>
                        <option value="2">Gudang 2</option>
                      </select>
                    </div> -->
                  </div>
                </div>
                <div class="mb-3 w-full">
                  <div
                    class="form-group"
                    v-if="!isEditable || parameters.form.parent_id"
                    v-show="parameters.form.status_user == 2"
                  >
                    <label for="">Pelanggan</label>

                    <v-select
                      label="name"
                      :loading="isLoadingGetPelanggan"
                      :options="lookup_custom1.data"
                      :filterable="false"
                      @search="onGetPelanggan"
                      v-model="parameters.form.pelanggan_id"
                      :reduce="(item) => item.pelanggan_id"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-2 border-t flex justify-between"
                        v-if="lookup_custom1.data.length || search"
                      >
                        <span
                          v-if="lookup_custom1.current_page > 1"
                          @click="onGetPelanggan(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom1.last_page >
                            lookup_custom1.current_page
                          "
                          @click="onGetPelanggan(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                </div>
                <div class="mb-3 w-full">
                  <div
                    class="form-group"
                    v-if="!isEditable || parameters.form.parent_id"
                  >
                    <label for="">Gudang</label>

                    <v-select
                      label="name"
                      :loading="isLoadingGetGudang"
                      :options="lookup_custom2.data"
                      :filterable="false"
                      @search="onGetGudang"
                      v-model="parameters.form.gudang_id"
                      :reduce="(item) => item.gudang_id"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-2 border-t flex justify-between"
                        v-if="lookup_custom2.data.length || search"
                      >
                        <span
                          v-if="lookup_custom2.current_page > 1"
                          @click="onGetGudang(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom2.last_page >
                            lookup_custom2.current_page
                          "
                          @click="onGetGudang(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                </div>
                <div class="mb-3 w-full">
                  <div
                    class="form-group"
                    v-if="!isEditable || parameters.form.parent_id"
                  >
                    <label for="">Jabatan</label>

                    <v-select
                      label="name"
                      :loading="isLoadingGetJabatan"
                      :options="lookup_custom3.data"
                      :filterable="false"
                      @search="onGetJabatan"
                      v-model="parameters.form.jabatan_id"
                      :reduce="(item) => item.jabatan_id"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-2 border-t flex justify-between"
                        v-if="lookup_custom3.data.length || search"
                      >
                        <span
                          v-if="lookup_custom3.current_page > 1"
                          @click="onGetJabatan(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom3.last_page >
                            lookup_custom3.current_page
                          "
                          @click="onGetJabatan(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                </div>

                <ValidationProvider name="email" rules="email">
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <label for="email">Email</label>
                    <input
                      id="email"
                      type="text"
                      class="border border-gray-300 rounded md p-2 outline-none w-full text-gray-500"
                      name="email"
                      v-model="parameters.form.email"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />

                    <!-- <div class="invalid-feedback" v-if="errors[0]">
                    {{ errors[0] }}
                  </div>       -->
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  name="password"
                  :rules="isEditable ? 'min:8' : 'required|min:8'"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <label for="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      class="border border-gray-300 rounded md p-2 outline-none w-full text-gray-500"
                      name="password"
                      v-model="parameters.form.password"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />

                    <div class="invalid-feedback" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                    <div class="text-muted" v-if="!errors[0] && isEditable">
                      * Isi password jika ingin mengantinya
                    </div>
                  </div>
                </ValidationProvider>

                <!-- <div class="form-group"
                v-if="!isEditable || parameters.form.parent_id">
                <label for="">Gudang</label>

                <v-select
                  label="name"
                  :loading="isLoadingGetGroupRole"
                  :options="lookup_group_roles.data"
                  :filterable="false"
                  @search="onGetGroupRole"
                  v-model="parameters.form.group_role_id"
                  :required="true">
                  <template v-slot:option="option">
                    {{ option.name }}
                  </template>
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      :required="!parameters.form.group_role_id"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                  <li slot-scope="{search}" slot="list-footer"
                    class="d-flex justify-content-between"
                    v-if="lookup_group_roles.data.length || search">
                    <span v-if="lookup_group_roles.current_page > 1"
                      @click="onGetGroupRole(search,false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer"
                      >Sebelumnya</span>
                    <span v-if="lookup_group_roles.last_page > lookup_group_roles.current_page"
                      @click="onGetGroupRole(search,true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer"
                      >Selanjutnya</span>
                  </li>
                </v-select>
              </div> -->

                <!-- <div class="form-group">
                  <label for="">Regu/Group</label>

                  <v-select
                    label="name"
                    :loading="isLoadingGetRegu"
                    :options="lookup_regus.data"
                    :filterable="false"
                    @search="onGetRegu"
                    v-model="parameters.form.regu_id"
                    :required="true">
                    <template v-slot:option="option">
                      {{ option.name }}
                    </template>
                    <template #search="{ attributes, events }">
                      <input
                        class="vs__search"
                        :required="!parameters.form.regu_id"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                    <li slot-scope="{search}" slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_regus.data.length || search">
                      <span v-if="lookup_regus.current_page > 1"
                        @click="onGetRegu(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Sebelumnya</span>
                      <span v-if="lookup_regus.last_page > lookup_regus.current_page"
                        @click="onGetRegu(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Selanjutnya</span>
                    </li>
                  </v-select>
                </div> -->
              </div>

              <modal-footer-section
                :isLoadingForm="isLoadingForm"
                @close="hide"
              />
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  middleware: ["isNotAccessable"],

  props: ["self"],

  async mounted() {
    await this.onSearchGroupRole();
    // await this.onSearchRegu();
    await this.onSearchPelanggan();
    await this.onSearchGudang();
  },

  data() {
    return {
      visible: false,
      isStopSearchGroupRole: false,
      isLoadingGetGroupRole: false,
      group_role_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchJabatan: false,
      isLoadingGetJabatan: false,
      jabatan_search: "",

      isStopSearchRegu: false,
      isLoadingGetRegu: false,
      regu_search: "",

      isEditable: false,
      isLoadingForm: false,
      title: "User",
      parameters: {
        url: "setting/user",
        form: {
          id: "",
          user_id: "",
          nama_lengkap: "",
          username: "",
          password: "",
          email: "",
          gudang_id: "",
          no_hp: "",
          jenis_kelamin: "",
          pelanggan_id: "",
          role_id: "",
          // regu_id: ''
        },
      },
    };
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_group_roles",
      "lookup_regus",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
    ]),
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
          // id: this.parameters.form.user_id ? this.parameters.form.user_id : "",
          // group_role_id : typeof this.parameters.form.group_role_id == 'object'
          //   ? this.parameters.form.group_role_id.id
          //   : '',
          // regu_id: typeof this.parameters.form.regu_id == 'object'
          //   ? this.parameters.form.regu_id.id
          //   : ''
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        this.self.onLoad(this.self.parameters.params.page);
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );
        this.parameters.form = {
          id: "",
          user_id: "",
          nama_lengkap: "",
          username: "",
          password: "",
          email: "",
          gudang_id: "",
          no_hp: "",
          jenis_kelamin: "",
          pelanggan_id: "",
          role_id: "",
          // regu_id: ''
        };
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    onGetGroupRole(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupRole);

      this.isStopSearchGroupRole = setTimeout(() => {
        this.group_role_search = search;

        if (typeof isNext !== "function") {
          this.lookup_group_roles.current_page = isNext
            ? this.lookup_group_roles.current_page + 1
            : this.lookup_group_roles.current_page - 1;
        } else {
          this.lookup_group_roles.current_page = 1;
        }

        this.onSearchGroupRole();
      }, 600);
    },

    async onSearchGroupRole() {
      if (!this.isLoadingGetGroupRole) {
        this.isLoadingGetGroupRole = true;

        await this.lookUp({
          url: "setting/user/get-group-role",
          lookup: "group_roles",
          query:
            "?search=" +
            this.group_role_search +
            "&page=" +
            this.lookup_group_roles.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupRole = false;
      }
    },

    onGetPelanggan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPelanggan);

      this.isStopSearchPelanggan = setTimeout(() => {
        this.pelanggan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchPelanggan();
        this.onSearchGudang();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "pelanggan",
          query:
            "?search=" +
            this.pelanggan_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPelanggan = false;
      }
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang",
          lookup: "gudang",
          query:
            "?search=" +
            this.gudang_search +
            "&pelanggan_id" +
            this.parameters.form.pelanggan_id +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    onGetJabatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJabatan);

      this.isStopSearchJabatan = setTimeout(() => {
        this.jabatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchJabatan();
      }, 600);
    },

    async onSearchJabatan() {
      if (!this.isLoadingGetJabatan) {
        this.isLoadingGetJabatan = true;

        await this.lookUp({
          url: "master/jabatan/get-jabatan",
          lookup: "jabatan",
          query:
            "?search=" +
            this.jabatan_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJabatan = false;
      }
    },

    onGetRegu(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchRegu);

      this.isStopSearchRegu = setTimeout(() => {
        this.regu_search = search;

        if (typeof isNext !== "function") {
          this.lookup_regus.current_page = isNext
            ? this.lookup_regus.current_page + 1
            : this.lookup_regus.current_page - 1;
        } else {
          this.lookup_regus.current_page = 1;
        }

        this.onSearchRegu();
      }, 600);
    },

    async onSearchRegu() {
      if (!this.isLoadingGetRegu) {
        this.isLoadingGetRegu = true;

        await this.lookUp({
          url: "master/regu",
          lookup: "regus",
          query:
            "?search=" +
            this.regu_search +
            "&page=" +
            this.lookup_regus.current_page +
            "&per_page=10",
        });

        this.isLoadingGetRegu = false;
      }
    },

    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
