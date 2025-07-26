<template>
  <section class="section min-h-screen">
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">Tambah Data</h1>
        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <ValidationObserver v-slot="{ invalid, validate }" ref="formVaidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div
            class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 w-full section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="form-group">
              <input-horiontal
                label="No Kontrak"
                type="text"
                name="no_kontrak"
                v-model="parameters.form.no_kontrak"
                :required="false"
              />
            </div>
            <div class="form-group">
              <select-button
                :self="{
                  label: 'Pelanggan',
                  optionLabel: 'nama_pelanggan',
                  lookup: lookup_custom1,
                  value: parameters.form.pelanggan_id,
                  onGet: onGetPelanggan,
                  isLoadingL: isLoadingGetPelanggan,
                  input: onSelectPelanggan,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>
            <div class="form-group">
              <select-button
                :self="{
                  label: 'PIC Kontrak',
                  optionLabel: 'nama_lengkap',
                  lookup: lookup_custom2,
                  value: parameters.form.user_id_pic,
                  onGet: onGetUser,
                  isLoadingL: isLoadingGetUser,
                  input: onSelectPIC,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Kontrak"
                type="date"
                name="tanggal_kontrak"
                v-model="parameters.form.tanggal_kontrak"
                :required="false"
              />
            </div>
            <div class="form-group">
              <select-button
                :self="{
                  label: 'Approver Kontrak',
                  optionLabel: 'nama_lengkap',
                  lookup: lookup_custom2,
                  value: parameters.form.user_id_approve,
                  onGet: onGetUser,
                  isLoadingL: isLoadingGetUser,
                  input: onSelectApprove,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Approve"
                type="date"
                name="tanggal_approve"
                v-model="parameters.form.tanggal_approve"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Aktif"
                type="date"
                name="tanggal_aktif"
                v-model="parameters.form.tanggal_aktif"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Expired"
                type="date"
                name="tanggal_expired"
                v-model="parameters.form.tanggal_expired"
                :required="false"
              />
            </div>
            <div class="form-group w-full flex items-center">
              <label for="status" class="w-1/2 ml-1"> Status </label>
              <select
                class="w-1/2 pl-2 mr-1 py-1 border border-gray-300 rounded focus:outline-none"
                v-model="parameters.form.status"
              >
                <option value="1">Aktif</option>
                <option value="0">Tidak Aktif</option>
              </select>
            </div>
            <div class="form-group flex items-center">
              <label for="keterangan" class="w-1/2">Keterangan</label>
              <textarea
                placeholder="Keterangan"
                class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                v-model="parameters.form.keterangan"
              ></textarea>
            </div>
          </div>
          <div class="w-full mt-5 flex justify-between items-center">
            <h1 class="text-xl font-bold uppercase">Detail Kontak Customer</h1>
            <div class=" ">
              <button
                type="button"
                @click="addDetailCustomer"
                class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
              >
                <i class="fas fa-plus"></i>
                <p class="text-xs font-medium">Tambah Detail</p>
              </button>
            </div>
          </div>
          <div
            class="mt-4 w-full bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="table-responsive overflow-y-hidden mb-7">
              <table
                class="border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                :class="
                  parameters.form.detail_customer.length ? 'mb-[300px]' : ''
                "
              >
                <thead>
                  <tr class="uppercase">
                    <th class="w-60 border border-gray-300">Jenis Kontrak</th>
                    <th class="w-60 border border-gray-300">Info Pembayaran</th>
                    <th class="w-60 border border-gray-300">Satuan</th>
                    <th class="w-60 border border-gray-300">Insentif</th>
                    <th class="w-60 border border-gray-300">Keterangan</th>
                    <th class="w-20 border border-gray-300">Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in parameters.form.detail_customer"
                    :key="i"
                    class="border-b border-gray-300 align-top"
                  >
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_jenis_kontrak"
                        :loading="isLoadingGetJenisKontrak"
                        :options="lookup_custom3.data"
                        :filterable="false"
                        @search="onGetJenisKontrak"
                        :reduce="(item) => item.jenis_kontrak_id"
                        v-model="item.jenis_kontrak_id"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom3.data.length || search"
                        >
                          <span
                            v-if="lookup_custom3.current_page > 1"
                            @click="onGetJenisKontrak(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom3.last_page >
                              lookup_custom3.current_page
                            "
                            @click="onGetJenisKontrak(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_term_pembayaran"
                        :loading="isLoadingGetTerm"
                        :options="lookup_custom4.data"
                        :filterable="false"
                        @search="onGetTerm"
                        :reduce="(item) => item.term_pembayaran_id"
                        v-model="item.term_pembayaran_id"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom4.data.length || search"
                        >
                          <span
                            v-if="lookup_custom4.current_page > 1"
                            @click="onGetTerm(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom4.last_page >
                              lookup_custom4.current_page
                            "
                            @click="onGetTerm(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_satuan"
                        :loading="isLoadingGetSatuan"
                        :options="lookup_custom5.data"
                        :filterable="false"
                        @search="onGetSatuan"
                        :reduce="(item) => item.satuan_id"
                        v-model="item.satuan_id"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom5.data.length || search"
                        >
                          <span
                            v-if="lookup_custom5.current_page > 1"
                            @click="onGetSatuan(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom5.last_page >
                              lookup_custom5.current_page
                            "
                            @click="onGetSatuan(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <money
                        v-model="item.insentif"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <td class="border border-gray-300">
                      <textarea
                        placeholder="Keterangan"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        v-model="item.keterangan"
                      ></textarea>
                    </td>
                    <td class="border border-gray-300 text-center">
                      <i
                        class="fas fa-trash mx-auto"
                        style="cursor: pointer"
                        @click="onDeleteCustomer(i)"
                      ></i>
                    </td>
                  </tr>
                  <tr v-if="!parameters.form.detail_customer.length > 0">
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
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isStopSearchUser: false,
      isLoadingGetUser: false,
      user_search: "",

      isStopSearchJenisKontrak: false,
      isLoadingGetJenisKontrak: false,
      jenis_kontrak_search: "",

      isStopSearchTerm: false,
      isLoadingGetTerm: false,
      term_search: "",

      isStopSearchSatuan: false,
      isLoadingGetSatuan: false,
      satuan_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Kontrak Vendor Customer",
      parameters: {
        form: {
          no_kontrak: "",
          pelanggan_id: "",
          tanggal_kontrak: "",
          status: "",
          tanggal_aktif: "",
          tanggal_expired: "",
          user_id_pic: "",
          user_id_approve: "",
          tanggal_approve: "",
          keterangan: "",
          detail_customer: [],

          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
        },
      },
      default_form: {
        no_kontrak: "",
        pelanggan_id: "",
        tanggal_kontrak: "",
        status: "",
        tanggal_aktif: "",
        tanggal_expired: "",
        user_id_pic: "",
        user_id_approve: "",
        tanggal_approve: "",
        keterangan: "",
        detail_customer: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          if (item != "detail_tkbm") {
            this.parameters.form[item] = res.data[item];
          }
        });

        this.parameters.form.detail_customer = res.data.detail_customer.map(
          (item) => {
            return {
              ...item,
              detail_customer_id: item || "",
            };
          }
        );
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
      // console.log("error",error)
    }
  },

  async mounted() {
    await this.onSearchPelanggan();
    await this.onSearchUser();

    this.getUserAgent();
    this.getGeoLocation();

    await this.onSearchJenisKontrak();
    await this.onSearchTerm();
    await this.onSearchSatuan();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //pelanggan
      "lookup_custom2", //user pic & approver
      "lookup_custom3", //jenis kontrak
      "lookup_custom4", //term
      "lookup_custom5", //satuan
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    getUserAgent() {
      this.parameters.form.user_agent = navigator.userAgent;
      if (this.parameters.form.user_agent.includes("Mobile")) {
        this.parameters.form.device = "Mobile";
      } else if (this.parameters.form.user_agent.includes("Tablet")) {
        this.parameters.form.device = "Tablet";
      } else {
        this.parameters.form.device = "Desktop";
      }
      // console.log("user agent", this.form.user_agent);
      // console.log("device", this.form.device);
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.parameters.form.longitude =
              position.coords.longitude.toString();
            this.parameters.form.latitude = position.coords.latitude.toString();
            this.isLoadingForm = false;
            // console.log(
            //   "latitude",
            //   this.form.latitude,
            //   "longitude",
            //   this.form.longitude
            // );
          },
          (error) => {
            this.isLoadingForm = false;
            this.$toaster.error(error.message);
          }
        );
      } else {
        this.$toaster.error("geolocation not supported");
        // console.log("geolocation not supported");
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
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "custom1",
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

    onGetUser(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchUser);

      this.isStopSearchUser = setTimeout(() => {
        this.user_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchUser();
      }, 600);
    },

    async onSearchUser() {
      if (!this.isLoadingGetUser) {
        this.isLoadingGetUser = true;

        await this.lookUp({
          url: "setting/user",
          lookup: "custom2",
          query:
            "?search=" +
            this.user_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetUser = false;
      }
    },

    onSelectPelanggan(item) {
      if (item) {
        this.parameters.form.pelanggan_id = item;
      } else {
        this.parameters.form.pelanggan_id = "";
      }
    },

    onSelectPIC(item) {
      if (item) {
        this.parameters.form.user_id_pic = item;
      } else {
        this.parameters.form.user_id_pic = "";
      }
    },

    onSelectApprove(item) {
      if (item) {
        this.parameters.form.user_id_approve = item;
      } else {
        this.parameters.form.user_id_approve = "";
      }
    },

    addDetailCustomer() {
      this.parameters.form.detail_customer.push({
        jenis_kontrak_id: "",
        term_pembayaran_id: "",
        satuan_id: "",
        insentif: "",
        keterangan: "",
      });
    },

    onDeleteCustomer(index) {
      this.parameters.form.detail_customer =
        this.parameters.form.detail_customer.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetJenisKontrak(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisKontrak);

      this.isStopSearchJenisKontrak = setTimeout(() => {
        this.jenis_kontrak_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchJenisKontrak();
      }, 600);
    },

    async onSearchJenisKontrak() {
      if (!this.isLoadingGetJenisKontrak) {
        this.isLoadingGetJenisKontrak = true;

        await this.lookUp({
          url: "master/jenis-kontrak/get-jenis-kontrak",
          lookup: "custom3",
          query:
            "?search=" +
            this.jenis_kontrak_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisKontrak = false;
      }
    },

    onGetTerm(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchTerm);

      this.isStopSearchTerm = setTimeout(() => {
        this.term_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchTerm();
      }, 600);
    },

    async onSearchTerm() {
      if (!this.isLoadingGetTerm) {
        this.isLoadingGetTerm = true;

        await this.lookUp({
          url: "master/term-pembayaran/get-term-pembayaran",
          lookup: "custom4",
          query:
            "?search=" +
            this.term_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetTerm = false;
      }
    },

    onGetSatuan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuan);

      this.isStopSearchSatuan = setTimeout(() => {
        this.satuan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchSatuan();
      }, 600);
    },

    async onSearchSatuan() {
      if (!this.isLoadingGetSatuan) {
        this.isLoadingGetSatuan = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "custom5",
          query:
            "?search=" +
            this.satuan_search +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSatuan = false;
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "finance/kontrak-vendor/kontrak-customer";

      let formData = {
        ...this.parameters.form,
        pelanggan_id:
          typeof this.parameters.form.pelanggan_id == "object"
            ? this.parameters.form.vendor_id.pelanggan_id
            : "",
        user_id_pic:
          typeof this.parameters.form.user_id_pic == "object"
            ? this.parameters.form.user_id_pic.user_id_pic
            : "",
        user_id_approve:
          typeof this.parameters.form.user_id_approve == "object"
            ? this.parameters.form.user_id_approve.user_id_approve
            : "",
      };

      if (this.isEditable) {
        url += `/${this.id}`;
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
            this.parameters.form = this.default_form;
          }
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = this.default_form;
    },
  },
};
</script>
