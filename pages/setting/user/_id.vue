<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data User
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data User
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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            <ValidationProvider
              ref="inputProvider"
              name="nama_lengkap"
              rules="required"
              class="w-full"
            >
              <div>
                <input-form
                  label="Nama Lengkap"
                  type="text"
                  name="nama_lengkap"
                  :required="true"
                  v-model="parameters.form.nama_lengkap"
                />
              </div>
            </ValidationProvider>
            <div>
              <input-form
                label="Tanggal Lahir"
                type="date"
                name="tanggal_lahir"
                :required="false"
                v-model="parameters.form.tanggal_lahir"
              />
            </div>
            <div>
              <input-form
                label="Nomor Handphone"
                type="text"
                name="no_hp"
                :required="false"
                v-model="parameters.form.no_hp"
              />
            </div>
            <ValidationProvider
              ref="inputProvider"
              class="w-full"
              name="email"
              rules="email"
            >
              <div>
                <input-form
                  label="Email"
                  type="text"
                  name="email"
                  :required="true"
                  v-model="parameters.form.email"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              ref="inputProvider"
              name="username"
              rules="required"
            >
              <div>
                <input-form
                  label="Username"
                  type="text"
                  name="username"
                  :required="true"
                  v-model="parameters.form.username"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              ref="inputProvider"
              name="password"
              :rules="isEditable ? 'min:12' : 'required|min:12'"
              class="w-full"
            >
              <div>
                <input-form
                  label="Password"
                  type="password"
                  name="password"
                  :required="false"
                  v-model="parameters.form.password"
                />

                <div class="text-muted" v-if="isEditable">
                  * Isi password jika ingin mengantinya
                </div>
                <div v-if="!isEditable" class="text-danger">
                  *harus memiliki huruf kapital, angka dan simbol
                </div>
              </div>
            </ValidationProvider>
            <div class="form-group w-full items-center">
              <label for="jenis_kelamin" class="w-4/12"> Jenis Kelamin </label>
              <select
                class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                v-model="parameters.form.jenis_kelamin"
              >
                <option value="l">Laki-laki</option>
                <option value="p">Perempuan</option>
              </select>
            </div>

            <ValidationProvider
              ref="inputProvider"
              name="status_user"
              class="w-full"
              rules="required"
            >
              <div slot-scope="{ errors, valid }">
                <div class="form-group w-full items-center">
                  <label for="gudang_id" class="w-4/12"> Status User </label>
                  <select
                    class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                    v-model="parameters.form.status_user"
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                  >
                    <option value="0 ">VUDS</option>
                    <option value="1 ">Vendor</option>
                    <option value="2 ">Pelanggan</option>
                  </select>
                </div>
                <div v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </div>
              </div>
            </ValidationProvider>
            <div class="form-group w-full items-center">
              <label for="" class="w-4/12">Role</label>
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_role"
                :loading="isLoadingGetGroupRole"
                :options="lookup_custom1.data"
                :filterable="false"
                @search="onGetGroupRole"
                @input="onSelectRole"
                v-model="parameters.form.role_id"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom1.data.length || search"
                >
                  <span
                    v-if="lookup_custom1.current_page > 1"
                    @click="onGetGroupRole(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom1.last_page > lookup_custom1.current_page
                    "
                    @click="onGetGroupRole(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="form-group w-full items-center">
              <label for="" class="w-4/12">Pelanggan</label>
              <v-select
                label="nama_pelanggan"
                :loading="isLoadingGetPelanggan"
                :options="lookup_custom2.data"
                :filterable="false"
                @search="onGetPelanggan"
                @input="onSelectPelanggan"
                v-model="parameters.form.pelanggan_id"
                class="w-full"
                :aria-disabled="parameters.form.status_user == 2"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom2.data.length || search"
                >
                  <span
                    v-if="lookup_custom2.current_page > 1"
                    @click="onGetPelanggan(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom2.last_page > lookup_custom2.current_page
                    "
                    @click="onGetPelanggan(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="form-group w-full items-center">
              <label for="" class="w-4/12">Gudang</label>

              <v-select
                label="nama_gudang"
                :loading="isLoadingGetGudang"
                :options="lookup_custom3.data"
                :filterable="false"
                @search="onGetGudang"
                v-model="parameters.form.gudang_id"
                class="w-full"
                @input="(item) => onSelectGudang(item)"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom3.data.length || search"
                >
                  <span
                    v-if="lookup_custom3.current_page > 1"
                    @click="onGetGudang(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom3.last_page > lookup_custom3.current_page
                    "
                    @click="onGetGudang(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="form-group w-full items-center">
              <label for="" class="w-4/12">Jabatan</label>

              <v-select
                label="nama_jabatan"
                :loading="isLoadingGetJabatan"
                :options="lookup_custom4.data"
                :filterable="false"
                @search="onGetJabatan"
                @input="onSelectJabatan"
                v-model="parameters.form.jabatan_id"
                class="w-full"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom4.data.length || search"
                >
                  <span
                    v-if="lookup_custom4.current_page > 1"
                    @click="onGetJabatan(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom4.last_page > lookup_custom4.current_page
                    "
                    @click="onGetJabatan(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="form-group w-full items-center">
              <label for="" class="w-4/12">Staff</label>

              <v-select
                label="nama_lengkap"
                :loading="isLoadingGetStaff"
                :options="lookup_custom5.data"
                :filterable="false"
                @search="onGetStaff"
                @input="onSelectStaff"
                v-model="parameters.form.staff_id"
                class="w-full"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom5.data.length || search"
                >
                  <span
                    v-if="lookup_custom5.current_page > 1"
                    @click="onGetStaff(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom5.last_page > lookup_custom5.current_page
                    "
                    @click="onGetStaff(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
          </div>
          <div class="w-full mt-5 flex justify-between items-center">
            <h1 class="text-xl font-bold uppercase">Gudang</h1>
            <div class=" ">
              <button
                type="button"
                @click="addGudang"
                class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
              >
                <i class="fas fa-plus"></i>
                <p class="text-xs font-medium">Tambah Gudang</p>
              </button>
            </div>
          </div>
          <div
            class="mt-4 w-full bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="table-responsive overflow-y-hidden mb-7">
              <table
                class="border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                :class="parameters.form.user_gudangs.length ? 'mb-[300px]' : ''"
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <th class="w-full border border-gray-300">Gudang</th>
                    <th class="w-[10%] border border-gray-300">Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in parameters.form.user_gudangs"
                    :key="i"
                    class="border-t"
                  >
                    <td class="border border-gray-300">
                      <v-select
                        label="nama_gudang"
                        :loading="isLoadingGetGudang"
                        :options="lookup_custom3.data"
                        :filterable="false"
                        @search="onGetGudang"
                        v-model="item.gudang_id"
                        class="w-full"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom3.data.length || search"
                        >
                          <span
                            v-if="lookup_custom3.current_page > 1"
                            @click="onGetGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom3.last_page >
                              lookup_custom3.current_page
                            "
                            @click="onGetGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300 text-center">
                      <i
                        class="fas fa-trash mx-auto"
                        style="cursor: pointer"
                        @click="onDeleteGudang(i)"
                      ></i>
                    </td>
                  </tr>
                  <tr v-if="!parameters.form.user_gudangs.length > 0">
                    <td colspan="100" class="text-center">
                      <span class="flex justify-center">
                        <img
                          src="/img/data-not-found.svg"
                          style="height: 250px; object-fit: cover"
                        />
                      </span>
                      <div class="mt-3">Data Tidak Ditemukan</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <modal-footer-section
            class="mt-5"
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
  // middleware: ["isNotAccessable"],

  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

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

      isStopSearchStaff: false,
      isLoadingGetStaff: false,
      staff_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "User",
      parameters: {
        url: "setting/user",
        form: {
          id: "",
          user_id: "",
          username: "",
          nama_lengkap: "",
          email: "",
          no_hp: "",
          password: "",
          jenis_kelamin: "",
          status_user: "",
          tanggal_lahir: "",
          role_id: "",
          pelanggan_id: "",
          jabatan_id: "",
          gudang_id: "",
          staff_id: "",
          user_gudangs: [],
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.role_id = res.data.role ?? "";
        this.parameters.form.pelanggan_id = res.data.pelanggan ?? "";
        this.parameters.form.jabatan_id = res.data.jabatan ?? "";
        this.parameters.form.gudang_id = res.data.gudang ?? "";
        this.parameters.form.staff_id = res.data.staff ?? "";
        this.parameters.form.jabatan_id = res.data.jabatan ?? "";
        this.parameters.form.user_gudangs = res.data.user_gudangs.map(
          (item) => {
            return {
              gudang_id: item.gudang ?? "",
            };
          }
        );
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchGroupRole();
    await this.onSearchPelanggan();
    await this.onSearchGudang();
    await this.onSearchJabatan();
    await this.onSearchStaff();
  },

  computed: {
    ...mapState("moduleApi", [
      "result",
      "error",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_custom4",
      "lookup_custom5",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;
      this.isLoadingForm = true;
      let url = this.parameters.url;

      let formData = {
        ...this.parameters.form,
        id: this.parameters.form.user_id ? this.parameters.form.user_id : "",
        gudang_id:
          typeof this.parameters.form.gudang_id === "object"
            ? this.parameters.form.gudang_id.gudang_id
            : "",
        role_id:
          typeof this.parameters.form.role_id === "object"
            ? this.parameters.form.role_id.role_id
            : "",
        jabatan_id:
          typeof this.parameters.form.jabatan_id === "object"
            ? this.parameters.form.jabatan_id.jabatan_id
            : "",
        pelanggan_id:
          typeof this.parameters.form.pelanggan_id === "object"
            ? this.parameters.form.pelanggan_id.pelanggan_id
            : "",
        staff_id:
          typeof this.parameters.form.staff_id === "object"
            ? this.parameters.form.staff_id.staff_id
            : "",
      };
      formData.user_gudangs = this.parameters.form.user_gudangs.map((item) => {
        return {
          gudang_id:
            typeof item.gudang_id === "object"
              ? item.gudang_id.gudang_id
              : item.gudang_id,
        };
      });

      // let parameters = {
      //   ...this.parameters,
      //   form: {
      //     ...this.parameters.form,
      //     id: this.parameters.form.user_id ? this.parameters.form.user_id : "",
      //   },
      // };

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        method: this.isEditable ? "put" : "post",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " +
              (this.isEditable == true ? "Diedit" : "Tambah")
          );
          if (!this.isEditable) {
            this.parameters.form = {
              id: "",
              user_id: "",
              username: "",
              nama_lengkap: "",
              email: "",
              no_hp: "",
              password: "",
              jenis_kelamin: "",
              status_user: "",
              tanggal_lahir: "",
              role_id: "",
              pelanggan_id: "",
              jabatan_id: "",
              gudang_id: "",
              staff_id: "",
            };
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err.message);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    onGetGroupRole(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupRole);

      this.isStopSearchGroupRole = setTimeout(() => {
        this.group_role_search = search;

        if (typeof isNext !== "function") {
          this.lookup_group_custom1.current_page = isNext
            ? this.lookup_group_custom1.current_page + 1
            : this.lookup_group_custom1.current_page - 1;
        } else {
          this.lookup_group_custom1.current_page = 1;
        }

        this.onSearchGroupRole();
      }, 600);
    },

    async onSearchGroupRole() {
      if (!this.isLoadingGetGroupRole) {
        this.isLoadingGetGroupRole = true;

        await this.lookUp({
          url: "setting/user/get-role",
          lookup: "custom1",
          query:
            "?search=" +
            this.group_role_search +
            "&page=" +
            this.lookup_custom1.current_page +
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
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchPelanggan();
        this.onSearchGudang();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan",
          lookup: "custom2",
          query:
            "?search=" +
            this.pelanggan_search +
            "&page=" +
            this.lookup_custom2.current_page +
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
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom3",
          query:
            "?search=" +
            this.gudang_search +
            "&pelanggan_id" +
            this.parameters.form.pelanggan_id +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    onSelectGudang(item) {
      if (item) {
        this.parameters.form.gudang_id = item;
      } else {
        this.parameters.form.gudang_id = "";
      }
    },

    onGetJabatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJabatan);

      this.isStopSearchJabatan = setTimeout(() => {
        this.jabatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchJabatan();
      }, 600);
    },

    async onSearchJabatan() {
      if (!this.isLoadingGetJabatan) {
        this.isLoadingGetJabatan = true;

        await this.lookUp({
          url: "setting/jabatan/get-jabatan",
          lookup: "custom4",
          query:
            "?search=" +
            this.jabatan_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJabatan = false;
      }
    },

    onGetStaff(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchStaff);

      this.isStopSearchStaff = setTimeout(() => {
        this.staff_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchStaff();
      }, 600);
    },

    async onSearchStaff() {
      if (!this.isLoadingGetStaff) {
        this.isLoadingGetStaff = true;

        await this.lookUp({
          url: "master/staff/get-staff",
          lookup: "custom5",
          query:
            "?search=" +
            this.staff_search +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetStaff = false;
      }
    },

    onSelectRole(item) {
      if (item) {
        this.parameters.form.role_id = item;
      } else {
        this.parameters.form.role_id = "";
      }
    },

    onSelectJabatan(item) {
      if (item) {
        this.parameters.form.jabatan_id = item;
      } else {
        this.parameters.form.jabatan_id = "";
      }
    },

    onSelectStaff(item) {
      if (item) {
        this.parameters.form.staff_id = item;
      } else {
        this.parameters.form.staff_id = "";
      }
    },

    onSelectPelanggan(item) {
      if (item) {
        this.parameters.form.pelanggan_id = item;
      } else {
        this.parameters.form.pelanggan_id = "";
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        id: "",
        user_id: "",
        username: "",
        nama_lengkap: "",
        email: "",
        no_hp: "",
        password: "",
        jenis_kelamin: "",
        status_user: "",
        tanggal_lahir: "",
        role_id: "",
        pelanggan_id: "",
        jabatan_id: "",
        gudang_id: "",
        staff_id: "",
      };
    },

    addGudang() {
      this.parameters.form.user_gudangs.push({
        gudang_id: "",
      });
    },

    onDeleteGudang(index) {
      this.parameters.form.user_gudangs =
        this.parameters.form.user_gudangs.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },
  },
};
</script>
