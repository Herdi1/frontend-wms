<template>
  <section class="min-h-screen">
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
              class="my-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
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
                <div class="form-group flex justify-between">
                  <label for="" class="w-1/2">Plafon Dropping</label>
                  <money
                    disabled
                    v-model="form.plafon_dropping"
                    class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>

                <div class="form-group flex justify-between items-start">
                  <label for="permintaan_dropping" class="w-1/2"
                    >Nominal Dropping Khusus <span class="text-danger">*</span>
                  </label>
                  <money
                    v-model="form.permintaan_dropping"
                    class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group flex justify-between">
                  <label
                    for="lampiran"
                    class="w-1/2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Lampiran
                  </label>
                  <span class="w-1/2">
                    <input
                      class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="lampiran"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      @change="handleFileChange"
                    />
                    <p class="italic text-sm text-slate-600">
                      .png, .jpg, .jpeg
                    </p>
                  </span>
                </div>
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

                <div class="form-group flex justify-between">
                  <label for="keterangan" class="w-1/2">Keterangan</label>
                  <textarea
                    name="keterangan"
                    v-model="form.keterangan"
                    class="w-1/2 border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- <div
              class="mt-2 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <div
                class="mb-5 text-xl font-bold flex justify-between items-start w-full"
              >
                <span class="w-1/2"><h1>Dropping Khusus Detail</h1></span>
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
            </div> -->
            <!-- <div
              class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
            >
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
                      <th class="w-[200px] border border-gray-300">
                        Keterangan
                      </th>
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
            </div> -->

            <modal-footer-section
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
            />
          </form>
        </ValidationObserver>
      </div>
    </div>
    <!-- <div v-if="showModal" to="modal">
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
    </div> -->
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";
import ModalDroppingKhusus from "../../../../components/transaksional/ModalDroppingKhusus.vue";
export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Pengajuan Dropping Khusus",
    };
  },

  components: {
    ModalDroppingKhusus,
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isStopSearchCoaBiaya: false,
      isLoadingGetCoaBiaya: false,
      coa_biaya_search: "",

      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Pengajuan Dropping Khusus",
      url: "finance/pengajuan-dropping-khusus",
      form: {
        gudang_id: "",
        keterangan: "",
        file_name_lampiran: "",
        tanggal: "",
        plafon_dropping: "",
        permintaan_dropping: "",
        no_referensi: "",
        pengajuan_dropping_khusus_pjk_details: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      coa_id: "",
      coa_id_biaya: "",
      nominal: "",
      keterangan: "",
      showModal: false,
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
    if (this.lookup_custom1.data && !this.isEditable) {
      this.onSelectGudang(this.lookup_custom1.data[0]);
    }
    await this.onSearchCoa();
    await this.onSearchCoaBiaya();
    this.getUserAgent();
    this.getGeoLocation();
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

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
    },

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
        this.form.gudang_id = item;
        this.form.plafon_dropping = item.budget;
        console.log(item);
      } else {
        this.form.gudang_id = "";
      }
    },

    handleFileChange(event) {
      this.form.file_name_lampiran = event.target.files[0];
    },

    async onSubmit(invalid) {
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

      if (this.form.file_name_lampiran instanceof File) {
        formData.append("file_name_lampiran", this.form.file_name_lampiran);
      }

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
              tipe:
                typeof item.coa_id === "object"
                  ? item.coa_id.tipe
                  : item.coa_id,
              jumlah: item.nominal ?? "",
              keterangan: item.keterangan ?? "",
            };
          })
        )
      );

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

          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          // this.$refs.formValidate.reset();
        });
    },

    formReset() {
      this.isEditable = false;
      this.form = {
        gudang_id: "",
        keterangan: "",
        file_name_lampiran: "",
        tanggal: "",
        plafon_dropping: "",
        permintaan_dropping: "",
        no_referensi: "",
      };
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
  },
};
</script>
