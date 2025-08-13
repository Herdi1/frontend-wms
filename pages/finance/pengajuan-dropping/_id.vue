<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">
          {{ isEditable ? "Edit" : "Tambah" }} {{ title }}
        </h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>

      <div class="w-full">
        <ValidationObserver v-slot="{ invalid, validate }" ref="formVaidate">
          <form
            @submit.prevent="validate().then(() => onSubmit(invalid))"
            autocomplete="off"
          >
            <div
              class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
                <div>
                  <input-horizontal
                    label="No Referensi"
                    type="text"
                    name="no_referensi"
                    :isHorizontal="true"
                    v-model="form.no_referensi"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Tanggal"
                    type="date"
                    name="tanggal"
                    :isHorizontal="true"
                    v-model="form.tanggal"
                    :required="true"
                  />
                </div>
                <div class="form-group">
                  <select-button
                    :self="{
                      label: 'Gudang',
                      optionLabel: 'nama_gudang',
                      lookup: lookup_custom1,
                      value: form.gudang_id,
                      onGet: onGetGudang,
                      isLoadingL: isLoadingGetGudang,
                      input: onSelectGudang,
                    }"
                    width="w-[50%]"
                    class="mb-5"
                    :required="true"
                  />
                </div>
                <div class="form-group flex justify-between w-full">
                  <label for="plafon_dropping" class="w-1/2"
                    >Plafon Dropping</label
                  >
                  <money
                    v-model="form.plafon_dropping"
                    class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>

                <div class="form-group">
                  <input-horiontal
                    label="Periode Awal"
                    type="date"
                    name="periode_awal"
                    v-model="form.periode_awal"
                    :required="true"
                  />
                </div>
                <div class="form-group">
                  <input-horiontal
                    label="Periode Akhir"
                    type="date"
                    name="periode_akhir"
                    v-model="form.periode_akhir"
                    :required="true"
                  />
                </div>

                <!-- <div class="form-group flex justify-between w-full">
                  <label for="total_biaya" class="w-1/2">Total Biaya</label>
                  <money
                    v-model="form.total_biaya"
                    class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div> -->
                <!-- <div class="form-group flex justify-between w-full">
                  <label for="total_saldo_awal" class="w-1/2"
                    >Total Saldo Awal</label
                  >
                  <money
                    v-model="form.total_saldo_awal"
                    class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div> -->
                <!-- <div class="form-group flex justify-between w-full">
                  <label for="total_saldo_akhir" class="w-1/2"
                    >Total Saldo Akhir</label
                  >
                  <money
                    v-model="form.total_saldo_akhir"
                    class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div> -->
                <!-- <div class="form-group flex justify-between w-full">
                  <label for="permintaan_dropping" class="w-1/2"
                    >Permintaan Dropping</label
                  >
                  <money
                    v-model="form.permintaan_dropping"
                    class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div> -->
                <div class="flex justify-between">
                  <label class="w-1/2 pt-1">Keterangan</label>
                  <textarea
                    name="keterangan"
                    v-model="form.keterangan"
                    class="w-1/2 border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <div
              class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <tab-component :tabs="tabs">
                <template #PengajuanDroppingDetail>
                  <div class="w-full flex justify-between items-center">
                    <h1 class="text-xl font-bold">Pengajuan Dropping Detail</h1>
                    <div class=" ">
                      <button
                        type="button"
                        @click="addPengajuanDetail"
                        class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                      >
                        <i class="fas fa-plus"></i>
                        <p class="text-xs font-medium">Preview</p>
                      </button>
                    </div>
                  </div>
                  <div class="table-responsive overflow-y-hidden mb-7">
                    <table
                      class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
                      :class="
                        form.pengajuan_dropping_details.length ? 'mb-64' : ''
                      "
                    >
                      <thead>
                        <tr class="text-sm uppercase">
                          <th class="w-44 border border-gray-300">Kode Coa</th>
                          <th class="w-44 border border-gray-300">Nama Coa</th>
                          <th class="w-44 border border-gray-300">
                            Tanggal Ambil
                          </th>
                          <th class="w-44 border border-gray-300">
                            Saldo Awal
                          </th>
                          <th class="w-44 border border-gray-300">
                            Saldo Akhir
                          </th>
                          <th class="w-44 border border-gray-300">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, i) in form.pengajuan_dropping_details"
                          :key="i"
                          class="border-t align-top"
                        >
                          <td class="border border-gray-300">
                            {{ item.kode_coa }}
                            <!-- <v-select
                              label="nama_coa"
                              :loading="isLoadingGetCoa"
                              :options="lookup_custom2.data"
                              :filterable="false"
                              @search="onGetCoa"
                              v-model="item.coa_id"
                              @input="(item) => onSelectCoaDetail(item, i)"
                              class="w-full"
                            >
                              <template slot="option" slot-scope="option">
                                {{ option.kode_coa + " - " + option.nama_coa }}
                              </template>
                              <template
                                slot="selected-option"
                                slot-scope="option"
                              >
                                {{ option.kode_coa + " - " + option.nama_coa }}
                              </template>
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_custom2.data.length || search"
                              >
                                <span
                                  v-if="lookup_custom2.current_page > 1"
                                  @click="onGetCoa(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_custom2.last_page >
                                    lookup_custom2.current_page
                                  "
                                  @click="onGetCoa(search, true)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Selanjutnya</span
                                >
                              </li>
                            </v-select> -->
                          </td>
                          <td class="border border-gray-300">
                            {{ item.nama_coa }}
                          </td>
                          <td class="border border-gray-300">
                            <!-- <input
                              type="date"
                              name="tanggal_ambil"
                              v-model="item.tanggal_ambil"
                              class="w-full pl-2 py-1 border rounded focus:outline-none"
                            /> -->
                            {{ item.tanggal_ambil }}
                          </td>
                          <td class="border border-gray-300">
                            <!-- <money
                              v-model="item.saldo_awal"
                              class="w-full pl-2 py-1 border rounded focus:outline-none"
                              @keydown.native="
                                $event.key === '-'
                                  ? $event.preventDefault()
                                  : null
                              "
                            /> -->
                            {{ item.saldo_awal }}
                          </td>
                          <td class="border border-gray-300">
                            <!-- <money
                              v-model="item.saldo_akhir"
                              class="w-full pl-2 py-1 border rounded focus:outline-none"
                              @keydown.native="
                                $event.key === '-'
                                  ? $event.preventDefault()
                                  : null
                              "
                            /> -->
                            {{ item.saldo_akhir }}
                          </td>
                          <td class="border border-gray-300">
                            <textarea
                              name="keterangan"
                              v-model="item.keterangan"
                              class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                            ></textarea>
                            {{ item.keterangan }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>
                <!-- <template #BiayaPengajuanDropping>
                  <div class="w-full flex justify-between items-center">
                    <h1 class="text-xl font-bold">Biaya Pengajuan Dropping</h1>
                    <div class=" ">
                      <button
                        type="button"
                        @click="addPengajuanBiaya"
                        class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                      >
                        <i class="fas fa-plus"></i>
                        <p class="text-xs font-medium">Tambah Detail</p>
                      </button>
                    </div>
                  </div>
                  <div class="table-responsive overflow-y-hidden mb-7">
                    <table
                      class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
                      :class="
                        form.pengajuan_dropping_biaya_details.length
                          ? 'mb-48'
                          : ''
                      "
                    >
                      <thead>
                        <tr class="text-sm uppercase">
                          <th class="w-44 border border-gray-300">Kode Coa</th>
                          <th class="w-44 border border-gray-300">Nama Coa</th>
                          <th class="w-44 border border-gray-300">Tanggal</th>
                          <th class="w-44 border border-gray-300">Nominal</th>
                          <th class="w-44 border border-gray-300">Tipe</th>
                          <th class="w-44 border border-gray-300">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(
                            item, i
                          ) in form.pengajuan_dropping_biaya_details"
                          :key="i"
                          class="border-t align-top"
                        >
                          <td class="border border-gray-300">
                            {{ item.coa ? item.coa.kode_coa : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.coa ? item.coa.nama_coa : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.tanggal ? item.tanggal : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.credit }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.credit > 0 ? "CREDIT" : "DEBIT" }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.keterangan ? item.keterangan : "-" }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template> -->
              </tab-component>
            </div>
            <div class="w-full flex justify-start items-center">
              <modal-footer-section
                class="mt-5"
                :isLoadingForm="isLoadingForm"
                @reset="formReset()"
              />
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Pengajuan Dropping",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      tabs: [
        {
          name: "Pengajuan Dropping Detail",
          slotName: "PengajuanDroppingDetail",
        },
        // {
        //   name: "Biaya Pengajuan Dropping",
        //   slotName: "BiayaPengajuanDropping",
        // },
        // { name: "Kendaraan Gudang", slotName: "KendaraanGudang" },
      ],

      id,

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Pengajuan Dropping",
      url: "finance/pengajuan-dropping",
      form: {
        no_referensi: "",
        gudang_id: "",
        tanggal: "",
        periode_awal: "",
        periode_akhir: "",
        plafon_dropping: "",
        total_biaya: "",
        total_biaya: "",
        total_saldo_awal: "",
        total_saldo_akhir: "",
        permintaan_dropping: "",
        keterangan: "",
        pengajuan_dropping_details: [],
        pengajuan_dropping_biaya_details: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      defaultForm: {
        no_referensi: "",
        gudang_id: "",
        tanggal: "",
        periode_awal: "",
        periode_akhir: "",
        plafon_dropping: "",
        total_biaya: "",
        total_biaya: "",
        total_saldo_awal: "",
        total_saldo_akhir: "",
        permintaan_dropping: "",
        keterangan: "",
        pengajuan_dropping_details: [],
        pengajuan_dropping_biaya_details: [],

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
        let res = await this.$axios.get(`${this.url}/${this.id}`);

        Object.keys(this.form).forEach((item) => {
          this.form[item] = res.data[item];
        });
        this.form.pengajuan_dropping_details =
          res.data.pengajuan_dropping_details.map((item) => {
            return {
              ...item,
            };
          });
        this.form.pengajuan_dropping_biaya_details =
          res.data.pengajuan_dropping_biaya_details.map((item) => {
            return {
              ...item,
            };
          });
        this.form.gudang_id = res.data.gudang_id;
        this.isLoadingPage = false;
      }
    } catch (error) {
      console.log("error", error);
      //this.$router.back()
    }
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchCoa();
    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    getUserAgent() {
      this.form.user_agent = navigator.userAgent;
      if (this.form.user_agent.includes("Mobile")) {
        this.form.device = "Mobile";
      } else if (this.form.user_agent.includes("Tablet")) {
        this.form.device = "Tablet";
      } else {
        this.form.device = "Desktop";
      }
      // console.log("user agent", this.form.user_agent);
      // console.log("device", this.form.device);
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.form.longitude = position.coords.longitude.toString();
            this.form.latitude = position.coords.latitude.toString();
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

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

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
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
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
        this.form.gudang_id = item;
      } else {
        this.form.gudang_id = "";
      }
    },

    addPengajuanDetail() {
      if (
        this.form.gudang_id &&
        this.form.periode_awal &&
        this.form.periode_akhir
      ) {
        this.$axios
          .get(
            `finance/pengajuan-dropping/get-balance-pengajuan-dropping?gudang_id=${this.form.gudang_id.gudang_id}&periode_awal=${this.form.periode_awal}&periode_akhir=${this.form.periode_akhir}`
          )
          .then((res) => {
            this.form.pengajuan_dropping_details = res.data.balance.map(
              (item) => {
                return {
                  ...item,
                  tanggal_ambil: this.form.periode_akhir,
                  keterangan: "",
                };
              }
            );
            this.form.pengajuan_dropping_biaya_details = res.data.biaya.map(
              (item) => {
                return {
                  ...item,
                  coa_id: item.coa ? item.coa.coa_id : "",
                  tipe: item.credit > 0 ? "CREDIT" : "DEBIT",
                };
              }
            );
          });
      } else {
        this.$toaster.error(
          "Gudang, Periode Awal, dan Periode Akhir harus diisi"
        );
      }
      // this.form.pengajuan_dropping_details.push({
      //   coa_id: "",
      //   tanggal_ambil: "",
      //   saldo_awal: "",
      //   saldo_akhir: "",
      //   keterangan: "",
      // });
    },

    onDeleteDetail(index) {
      this.form.pengajuan_dropping_details =
        this.form.pengajuan_dropping_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    addPengajuanBiaya() {
      if (
        this.form.gudang_id &&
        this.form.periode_awal &&
        this.form.periode_akhir
      ) {
        this.$axios
          .get(
            `finance/pengajuan-dropping/get-balance-pengajuan-dropping?gudang_id=${this.form.gudang_id.gudang_id}&periode_awal=${this.form.periode_awal}&periode_akhir=${this.form.periode_akhir}`
          )
          .then((res) => {
            this.form.pengajuan_dropping_biaya_details = res.data.biaya;
          });
      } else {
        this.$toaster.error(
          "Gudang, Periode Awal, dan Periode Akhir harus diisi"
        );
      }
    },

    onDeleteBiaya(index) {
      this.form.pengajuan_dropping_biaya_details =
        this.form.pengajuan_dropping_biaya_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetCoa(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoa);

      this.isStopSearchCoa = setTimeout(() => {
        this.coa_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchCoa();
      }, 600);
    },

    async onSearchCoa() {
      if (!this.isLoadingGetCoa) {
        this.isLoadingGetCoa = true;

        await this.lookUp({
          url: "finance/coa/get-coa",
          lookup: "custom2",
          query:
            "?search=" +
            this.coa_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoa = false;
      }
    },

    onSelectCoaDetail(item, index) {
      if (item) {
        this.form.pengajuan_dropping_details[index].coa_id = item;
      } else {
        this.form.pengajuan_dropping_details[index].coa_id = "";
      }
    },

    onSelectCoaBiaya(item, index) {
      if (item) {
        this.form.pengajuan_dropping_biaya_details[index].coa_id = item;
      } else {
        this.form.pengajuan_dropping_biaya_details[index].coa_id = "";
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = this.url;

      let formData = {
        ...this.form,
        gudang_id:
          typeof this.form.gudang_id === "object"
            ? this.form.gudang_id.gudang_id
            : this.form.gudang_id,
      };
      formData.pengajuan_dropping_details =
        this.form.pengajuan_dropping_details.map((item) => {
          return {
            ...item,
            coa_id: item.coa_id ? item.coa_id.coa_id : item.coa_id,
          };
        });

      formData.pengajuan_dropping_biaya_details =
        this.form.pengajuan_dropping_biaya_details.map((item) => {
          return {
            ...item,
            coa_id: item.coa_id ? item.coa_id.coa_id : item.coa_id,
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
          this.$toaster.success(
            "Data Berhasil di " + (this.isEditable ? "Update" : "Tambah")
          );
          if (!this.isEditable) {
            this.defaultForm;
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formVaidate.reset();
        });
    },

    formReset() {
      this.isEditable = false;
      this.form = {
        ...this.defaultForm,
      };
    },
  },
};
</script>
