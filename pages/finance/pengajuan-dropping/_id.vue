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
                    <h1 class="text-xl font-bold uppercase">
                      Pengajuan Dropping Detail
                    </h1>
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
                  <div class="table-responsive w-full relative overflow-y-auto">
                    <table
                      class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
                      :class="
                        form.pengajuan_dropping_details.length ? 'mb-20' : ''
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
                            {{
                              item.kode_coa ? item.kode_coa : item.coa.kode_coa
                            }}
                          </td>
                          <td class="border border-gray-300">
                            {{
                              item.nama_coa ? item.nama_coa : item.coa.nama_coa
                            }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.tanggal_ambil }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.saldo_awal }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.saldo_akhir }}
                          </td>
                          <td class="border border-gray-300">
                            <textarea
                              name="keterangan"
                              v-model="item.keterangan"
                              class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                            ></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>
              </tab-component>
            </div>
            <div
              v-if="form.pengajuan_dropping_biaya_details.length > 0"
              class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <div>
                <h1 class="text-xl font-bold uppercase mb-5">
                  Detail Biaya Dropping
                </h1>
              </div>
              <div class="table-responsive w-full relative overflow-y-auto">
                <table
                  ref="formContainer"
                  class="mb-5 overflow-auto table-fixed border border-gray-300"
                >
                  <thead>
                    <tr class="uppercase border-b">
                      <th class="font-bold text-center">Keterangan</th>
                      <th class="font-bold text-center">Nominal</th>
                      <th class="font-bold text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-gray-50">
                      <td class="font-bold">Informasi Saldo Kas Awal</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr
                      v-for="(item, i) in form.pengajuan_dropping_details"
                      :key="i"
                    >
                      <td>
                        <span class="pl-3">
                          {{
                            item.kode_coa ? item.kode_coa : item.coa.kode_coa
                          }}
                          -
                          {{
                            item.nama_coa ? item.nama_coa : item.coa.nama_coa
                          }}
                        </span>
                      </td>
                      <td class="text-right">
                        {{ item.saldo_awal | formatPrice }}
                      </td>
                    </tr>
                    <tr class="bg-gray-50">
                      <td class="font-bold">Total</td>
                      <td></td>
                      <td class="text-right">
                        {{ totalSaldoAwal | formatPrice }}
                      </td>
                    </tr>
                    <tr class="bg-gray-50">
                      <td class="font-bold">Plafon Dropping</td>
                      <td></td>
                      <td class="text-right">
                        {{ budgetGudang | formatPrice }}
                      </td>
                    </tr>
                    <tr class="bg-gray-50 text-red-600">
                      <td class="font-bold">Control</td>
                      <td></td>
                      <td class="text-right font-bold">
                        {{ totalControlAwal | formatPrice }}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr class="bg-gray-50">
                      <td class="font-bold">Informasi Biaya Operasional</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr
                      v-for="(item, i) in form.pengajuan_dropping_biaya_details"
                      :key="i"
                    >
                      <td>
                        <span class="pl-3">
                          {{ item.coa.kode_coa }} - {{ item.coa.nama_coa }} ({{
                            item.tanggal
                          }})
                        </span>
                      </td>
                      <td class="text-right">
                        {{ item.credit | formatPrice }}
                      </td>
                    </tr>
                    <tr class="bg-gray-50">
                      <td class="font-bold">Total</td>
                      <td></td>
                      <td class="text-right">
                        {{ totalBiayaOperasional | formatPrice }}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr class="bg-gray-50">
                      <td class="font-bold">Informasi Saldo Akhir</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr
                      v-for="(item, i) in form.pengajuan_dropping_details"
                      :key="i"
                    >
                      <td>
                        <span class="pl-3">
                          {{
                            item.kode_coa ? item.kode_coa : item.coa.kode_coa
                          }}
                          -
                          {{
                            item.nama_coa ? item.nama_coa : item.coa.nama_coa
                          }}
                        </span>
                      </td>
                      <td class="text-right">
                        {{ item.saldo_akhir | formatPrice }}
                      </td>
                    </tr>
                    <tr class="bg-gray-50">
                      <td class="font-bold">Total</td>
                      <td></td>
                      <td class="text-right">
                        {{ totalSaldoAkhir | formatPrice }}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                    <tr class="bg-gray-50">
                      <td class="font-bold">Pengajuan Dropping</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr class="bg-gray-50 text-green-600">
                      <td class="font-bold">Permintaan Dropping</td>
                      <td></td>
                      <td class="text-right font-bold">
                        {{ totalPermintaanDropping | formatPrice }}
                      </td>
                    </tr>
                    <tr class="bg-gray-50">
                      <td class="font-bold">Total Saldo Akhir</td>
                      <td></td>
                      <td class="text-right">
                        {{ totalSaldoAkhir | formatPrice }}
                      </td>
                    </tr>
                    <tr class="bg-gray-50">
                      <td class="font-bold">Plafon Dropping</td>
                      <td></td>
                      <td class="text-right">
                        {{ budgetGudang | formatPrice }}
                      </td>
                    </tr>
                    <tr class="bg-gray-50 text-red-600">
                      <td class="font-bold">Control</td>
                      <td></td>
                      <td class="text-right font-bold">
                        {{ totalControlAkhir | formatPrice }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
      dataGudang: {},
      form: {
        no_referensi: "",
        gudang_id: "",
        tanggal: "",
        periode_awal: "",
        periode_akhir: "",
        keterangan: "",
        pengajuan_dropping_details: [],
        pengajuan_dropping_biaya_details: [],

        plafon_dropping: "",
        total_biaya: "",
        total_saldo_awal: "",
        total_saldo_akhir: "",
        permintaan_dropping: "",

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
        keterangan: "",
        pengajuan_dropping_details: [],
        pengajuan_dropping_biaya_details: [],

        plafon_dropping: "",
        total_biaya: "",
        total_saldo_awal: "",
        total_saldo_akhir: "",
        permintaan_dropping: "",

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
    };
  },

  created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    this.form.tanggal = formattedDate;
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
    budgetGudang() {
      return this.dataGudang?.budget ? parseFloat(this.dataGudang.budget) : 0;
    },

    totalSaldoAwal() {
      if (
        !this.form.pengajuan_dropping_details ||
        this.form.pengajuan_dropping_details.length === 0
      ) {
        return 0;
      }

      return this.form.pengajuan_dropping_details.reduce((total, item) => {
        return total + parseFloat(item.saldo_awal) || 0;
      }, 0);
    },

    totalSaldoAkhir() {
      if (
        !this.form.pengajuan_dropping_details ||
        this.form.pengajuan_dropping_details.length === 0
      ) {
        return 0;
      }

      return this.form.pengajuan_dropping_details.reduce((total, item) => {
        return total + parseFloat(item.saldo_akhir) || 0;
      }, 0);
    },

    totalBiayaOperasional() {
      if (
        !this.form.pengajuan_dropping_biaya_details ||
        this.form.pengajuan_dropping_biaya_details.length === 0
      ) {
        return 0;
      }

      return this.form.pengajuan_dropping_biaya_details.reduce(
        (total, item) => {
          return total + parseFloat(item.credit) || 0;
        },
        0
      );
    },

    totalControlAwal() {
      let saldoAwal = this.totalSaldoAwal || 0;
      let budget = this.budgetGudang ? parseFloat(this.budgetGudang) || 0 : 0;
      return saldoAwal - budget;
    },

    totalPermintaanDropping() {
      let saldoAkhir = this.totalSaldoAkhir || 0;
      let budget = this.budgetGudang ? parseFloat(this.budgetGudang) || 0 : 0;
      return budget - saldoAkhir;
    },

    totalControlAkhir() {
      let budget = this.budgetGudang ? parseFloat(this.budgetGudang) || 0 : 0;
      let saldoAkhir = this.totalSaldoAkhir || 0;
      let permintaanDropping = this.totalPermintaanDropping || 0;
      return permintaanDropping + saldoAkhir - budget;
    },
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
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.form.longitude = position.coords.longitude.toString();
            this.form.latitude = position.coords.latitude.toString();
            this.isLoadingForm = false;
          },
          (error) => {
            this.isLoadingForm = false;
            this.$toaster.error(error.message);
          }
        );
      } else {
        this.$toaster.error("geolocation not supported");
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
        this.form.pengajuan_dropping_details = [];
        this.form.pengajuan_dropping_biaya_details = [];
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
            this.dataGudang = res.data.gudang;
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
                  nominal: item.credit,
                };
              }
            );
          });
      } else {
        this.$toaster.error(
          "Gudang, Periode Awal, dan Periode Akhir harus diisi"
        );
      }
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
        plafon_dropping: this.budgetGudang,
        total_biaya: this.totalBiayaOperasional,
        total_saldo_awal: this.totalSaldoAwal,
        total_saldo_akhir: this.totalSaldoAkhir,
        permintaan_dropping: this.totalPermintaanDropping,
      };
      formData.pengajuan_dropping_details =
        this.form.pengajuan_dropping_details.map((item) => {
          return {
            ...item,
            coa_id: item.coa ? item.coa.coa_id : item.coa_id,
          };
        });

      formData.pengajuan_dropping_biaya_details =
        this.form.pengajuan_dropping_biaya_details.map((item) => {
          return {
            ...item,
            coa_id: item.coa ? item.coa.coa_id : item.coa_id,
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
