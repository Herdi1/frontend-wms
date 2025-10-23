<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">
          Detail Pengajuan Dropping Khusus
        </h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <ValidationObserver v-slot="{ invalid, validate }" ref="formVaidate">
        <form
          class="w-full"
          @submit.prevent="validate().then(() => onSubmit(invalid))"
        >
          <div class="w-full md:flex gap-3">
            <div
              class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
                <div class="flex w-full items-center">
                  <label class="w-1/2">Kode Pengajuan</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{ form.kode_pengajuan ? form.kode_pengajuan : "-" }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-1/2">Tanggal</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{ form.tanggal ? formatDate(form.tanggal) : "-" }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-1/2">Gudang</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{ form.gudang_id ? form.gudang_id.nama_gudang : "-" }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-1/2">Plafon Dropping</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{ form.plafon_dropping | formatPrice }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-1/2">Permintaan Dropping</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{ form.permintaan_dropping | formatPrice }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-1/2">No Referensi</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{ form.no_referensi ? form.no_referensi : "-" }}
                  </div>
                </div>
                <div class="flex w-full items-start">
                  <label class="w-1/2">Keterangan</label>
                  <textarea
                    disabled
                    name="keterangan"
                    v-model="form.keterangan"
                    class="w-1/2 border border-gray-300 rounded-md bg-gray-50 outline-none p-1 active:outline-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div
            class="mt-2 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            v-if="form.status_pengajuan === 'SETUJU'"
          >
            <div
              class="mb-5 text-xl font-bold flex justify-between items-start w-full"
            >
              <span class="w-3/4"><h1>Dropping Khusus Detail</h1></span>
              <div class="w-full relative flex justify-end gap-2">
                <button
                  type="button"
                  @click="show"
                  class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                >
                  <i class="fas fa-plus"></i>
                  <p class="text-xs font-medium">Detail</p>
                </button>
              </div>
            </div>

            <div
              class="table-responsive overflow-y-hidden"
              :class="
                form.pengajuan_dropping_khusus_pjk_details?.length
                  ? 'min-height:500px'
                  : ''
              "
            >
              <table
                class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
              >
                <thead>
                  <tr class="text-sm uppercase text-nowrap">
                    <th class="w-[250px] md:w-full border border-gray-300">
                      COA
                    </th>
                    <th class="w-[200px] border border-gray-300">Jenis</th>
                    <th class="w-[200px] border border-gray-300">Nominal</th>
                    <th class="w-[200px] border border-gray-300">Keterangan</th>
                    <th class="w-20 border border-gray-300">Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      item, index
                    ) in form.pengajuan_dropping_khusus_pjk_details"
                    :key="index"
                  >
                    <td class="border border-gray-300">
                      {{ item.coa_id?.kode_coa ?? "" }} -
                      {{ item.coa_id?.nama_coa ?? "" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.tipe ?? "" }}
                    </td>
                    <td class="border border-gray-300 text-right">
                      {{ item.nominal ?? 0 | formatPrice }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.keterangan ?? "" }}
                    </td>
                    <td class="border border-gray-300">
                      <button
                        class="btn btn-danger btn-sm"
                        @click="onDeleteDetail(index)"
                        type="button"
                      >
                        <i class="fa fa-trash mx-2"></i>
                      </button>
                    </td>
                  </tr>
                  <tr
                    v-if="
                      !form.pengajuan_dropping_khusus_pjk_details?.length > 0
                    "
                  >
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
            <div class="my-5 flex justify-between w-3/4">
              <p class="w-1/4 mb-1">Balance</p>
              <div class="w-3/4 border border-gray-300 p-1 rounded-md">
                {{ totalNominal | formatPrice }}
              </div>
            </div>
          </div>
          <span v-if="form.status_pengajuan === 'SETUJU'">
            <modal-footer-section
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
            />
          </span>
        </form>
      </ValidationObserver>
    </div>
    <div v-if="showModal" to="modal">
      <div
        @click="hide"
        class="fixed inset-0 bg-black bg-opacity-50 z-50"
      ></div>
      <div
        class="modal w-[600px] h-[500px] fade fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 overflow-y-auto dark:bg-slate-700 dark:text-gray-100"
        aria-hidden="true"
        id="modal-riwayat"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div
              class="modal-header flex justify-between text-xl font-bold mb-3"
            >
              <h5 class="modal-title">Tambah Dropping Khusus Detail</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="hide()"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <ValidationObserver
              v-slot="{ invalid, validate }"
              ref="formValidate"
            >
              <form
                @submit.prevent="validate().then(() => onSubmitDetail(invalid))"
                class="flex flex-col justify-between h-[400px]"
              >
                <div class="grid grid-cols-1 w-full gap-2 mt-10">
                  <ValidationProvider
                    name="coa_id"
                    class="w-full mt-1 flex items-center"
                  >
                    <label for="coa_id" class="w-[40%]"
                      >Coa <span class="text-danger">*</span></label
                    >
                    <v-select
                      label="nama_coa"
                      :loading="isLoadingGetCoa"
                      :options="lookup_custom2.data"
                      :filterable="false"
                      @search="onGetCoa"
                      v-model="coa_id"
                      class="w-[60%]"
                      @input="(item) => onSelectCoa(item)"
                    >
                      <template slot="option" slot-scope="option">
                        {{ option.nama_coa + " - " + option.kode_coa }}
                      </template>
                      <template slot="selected-option" slot-scope="option">
                        <div
                          class="w-[250px] whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                          {{ option.nama_coa + " - " + option.kode_coa }}
                        </div>
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
                    </v-select>
                  </ValidationProvider>
                  <ValidationProvider
                    name="coa_id_biaya"
                    class="w-full mt-1 flex items-center"
                  >
                    <label for="coa_id_biaya" class="w-[40%]"
                      >Coa Biaya <span class="text-danger">*</span></label
                    >
                    <v-select
                      label="nama_coa"
                      :loading="isLoadingGetCoaBiaya"
                      :options="lookup_custom3.data"
                      :filterable="false"
                      @search="onGetCoaBiaya"
                      v-model="coa_id_biaya"
                      class="w-[60%]"
                      @input="(item) => onSelectCoaBiaya(item)"
                    >
                      <template slot="option" slot-scope="option">
                        {{ option.nama_coa + " - " + option.kode_coa }}
                      </template>
                      <template slot="selected-option" slot-scope="option">
                        <div
                          class="w-[250px] whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                          {{ option.nama_coa + " - " + option.kode_coa }}
                        </div>
                      </template>
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom3.data.length || search"
                      >
                        <span
                          v-if="lookup_custom3.current_page > 1"
                          @click="onGetCoaBiaya(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom3.last_page >
                            lookup_custom3.current_page
                          "
                          @click="onGetCoaBiaya(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </ValidationProvider>

                  <div class="flex items-center">
                    <label for="nominal" class="w-2/5"
                      >Nominal <span class="text-danger">*</span></label
                    >
                    <money
                      v-model="nominal"
                      class="w-3/5 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="flex items-start">
                    <label for="keterangandetail" class="w-2/5 pt-1"
                      >Keterangan</label
                    >
                    <textarea
                      name="keterangan"
                      v-model="keterangan"
                      class="w-3/5 border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                    ></textarea>
                  </div>
                </div>

                <modal-footer-section
                  class="mt-5"
                  :isLoadingForm="isLoadingForm"
                  @reset="formDetailReset()"
                />
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      isLoadingForm: false,
      url: "finance/pengajuan-dropping-khusus",
      form: {
        kode_pengajuan: "",
        gudang_id: "",
        keterangan: "",
        file_name_lampiran: "",
        tanggal: "",
        plafon_dropping: "",
        permintaan_dropping: "",
        no_referensi: "",
        status_pengajuan: "",
        pengajuan_dropping_khusus_pjk_details: [],
        gudang: {},
      },
      showModal: false,
      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isStopSearchCoaBiaya: false,
      isLoadingGetCoaBiaya: false,
      coa_biaya_search: "",

      coa_id: "",
      coa_id_biaya: "",
      nominal: "",
      keterangan: "",
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`${this.url}/${this.id}`);
      Object.keys(this.form).forEach((item) => {
        this.form[item] = res.data[item];
      });
      this.form.gudang_id = res.data.gudang;
      this.form.pengajuan_dropping_khusus_pjk_details =
        res.data.pengajuan_dropping_khusus_pjk_details ?? [];
      this.isLoadingPage = false;
    } catch (error) {
      this.$router.back();
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
    ]),
    totalCoa() {
      if (!this.form.pengajuan_dropping_khusus_pjk_details?.length) return 0;
      return this.form.pengajuan_dropping_khusus_pjk_details
        .filter((item) => item.tipe === "CREDIT")
        .reduce((total, item) => {
          return total + parseFloat(item.nominal) || 0;
        }, 0);
    },
    totalCoaBiaya() {
      if (!this.form.pengajuan_dropping_khusus_pjk_details?.length) return 0;
      return this.form.pengajuan_dropping_khusus_pjk_details
        .filter((item) => item.tipe === "DEBIT")
        .reduce((total, item) => {
          return total + parseFloat(item.nominal) || 0;
        }, 0);
    },

    totalNominal() {
      if (!this.form.pengajuan_dropping_khusus_pjk_details?.length) return 0;
      return this.totalCoa - this.totalCoaBiaya;
    },
  },

  async mounted() {
    await this.onSearchCoa();
    await this.onSearchCoaBiaya();
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    formatDate(dateString) {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    },

    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
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
            "&tipe=HARTA" +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoa = false;
      }
    },

    onSelectCoa(item) {
      if (item) {
        this.form.coa_id = item;
      } else {
        this.form.coa_id = "";
      }
    },

    onGetCoaBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoaBiaya);

      this.isStopSearchCoaBiaya = setTimeout(() => {
        this.coa_biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchCoaBiaya();
      }, 600);
    },

    async onSearchCoaBiaya() {
      if (!this.isLoadingGetCoaBiaya) {
        this.isLoadingGetCoaBiaya = true;

        await this.lookUp({
          url: "finance/jurnal/get-coa",
          lookup: "custom3",
          query:
            "?search=" +
            this.coa_biaya_search +
            "&tipe=BIAYA" +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoaBiaya = false;
      }
    },

    onSelectCoaBiaya(item) {
      if (item) {
        this.form.coa_biaya_id = item;
      } else {
        this.form.coa_biaya_id = "";
      }
    },

    onDeleteDetail(index) {
      this.form.pengajuan_dropping_khusus_pjk_details =
        this.form.pengajuan_dropping_khusus_pjk_details.filter(
          (_, itemIndex) => index != itemIndex
        );
    },

    async onSubmitDetail() {
      if (!this.coa_id || !this.coa_id_biaya || !this.nominal) {
        this.$toaster.error("Harap Mengisi Coa, Coa Biaya dan Nominalnya");
        return;
      }

      let formDataCoa = {
        coa_id: this.coa_id,
        tipe: "CREDIT",
        nominal: this.nominal,
        keterangan: this.keterangan,
        line:
          this.form.pengajuan_dropping_khusus_pjk_details?.length / 2 + 1 ?? "",
      };
      let formDataBiaya = {
        coa_id: this.coa_id_biaya,
        tipe: "DEBIT",
        nominal: this.nominal,
        keterangan: this.keterangan,
        line:
          this.form.pengajuan_dropping_khusus_pjk_details?.length / 2 + 1 ?? "",
      };
      this.form.pengajuan_dropping_khusus_pjk_details.push(formDataCoa);
      this.form.pengajuan_dropping_khusus_pjk_details.push(formDataBiaya);
      console.log(this.form.pengajuan_dropping_khusus_pjk_details);
      this.formDetailReset();
      this.hide();
      this.$toaster.success("Data berhasil ditambahkan");
    },

    formDetailReset() {
      this.coa_id = "";
      this.coa_id_biaya = "";
      this.nominal = "";
      this.keterangan = "";
    },

    onSubmit(invalid) {
      if (invalid || this.isLoadingForm) return;

      if (this.totalNominal !== 0) {
        this.$toaster.error("Balance Harus 0");
        return;
      }
      this.isLoadingForm = true;
      let url = this.url;

      let formData = new FormData();

      Object.entries(this.form).forEach(([key, value]) => {
        if (key !== "gudang_id" && key !== "file_name_lampiran") {
          formData.append(key, value || "");
        }
      });

      formData.append(
        "gudang_id",
        typeof this.form.gudang_id === "object"
          ? this.form.gudang_id.gudang_id
          : this.form.gudang_id
      );

      formData.append(
        "pengajuan_dropping_khusus_pjk_details",
        JSON.stringify(
          this.form.pengajuan_dropping_khusus_pjk_details.map((item) => {
            return {
              ...item,
              coa_id:
                typeof item.coa_id === "object"
                  ? item.coa_id.coa_id
                  : item.coa_id,
              tipe: item.tipe ?? "",
              jumlah: item.nominal ?? "",
              keterangan: item.keterangan ?? "",
            };
          })
        )
      );
      formData.append("_method", "PUT");
      const formObj = {};
      formData.forEach((value, key) => {
        formObj[key] = value;
      });
      console.log(formObj);

      // let formData = {
      //   ...this.form,
      //   gudang_id:
      //     typeof this.form.gudang_id === "object"
      //       ? this.form.gudang_id.gudang_id
      //       : this.form.gudang_id,
      //   pengajuan_dropping_khusus_pjk_details:
      //     this.form.pengajuan_dropping_khusus_pjk_details.map((item) => {
      //       return {
      //         ...item,
      //         coa_id:
      //           typeof item.coa_id === "object"
      //             ? item.coa_id.coa_id
      //             : item.coa_id,
      //         tipe: item.tipe ?? "",

      //         jumlah: item.nominal ?? "",
      //         keterangan: item.keterangan ?? "",
      //       };
      //     }),
      // };
      this.$axios({
        url: url,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success("Data berhasil di Diedit");

          if (!this.isEditable) {
            this.formReset();
          }

          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
        });
    },
    formReset() {
      this.isEditable = false;
      this.form = {
        ...this.form,
        pengajuan_dropping_khusus_pjk_details: [],
      };
    },
  },
};
</script>
