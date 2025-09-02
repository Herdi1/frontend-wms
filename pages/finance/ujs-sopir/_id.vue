<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} UJS Sopir
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
            <div class="w-full gap-3">
              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div
                  class="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-1 items-top w-full"
                >
                  <div class="form-group">
                    <input-horizontal
                      label="Tanggal"
                      type="date"
                      name="tanggal"
                      :required="true"
                      v-model="form.tanggal"
                      :disabled="true"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      label="Periode Awal"
                      type="date"
                      name="periode_awal"
                      :required="true"
                      v-model="form.periode_awal"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      label="Periode Akhir"
                      type="date"
                      name="periode_akhir"
                      :required="true"
                      v-model="form.periode_akhir"
                    />
                  </div>
                  <ValidationProvider name="gudang_id" class="w-full mt-1 mb-2">
                    <div
                      slot-scope="{ errors, valid }"
                      class="flex items-center"
                    >
                      <label for="gudang_id" class="w-1/2"
                        >Gudang <span class="text-danger">*</span></label
                      >
                      <v-select
                        :disabled="isEditable"
                        label="nama_gudang"
                        :loading="isLoadingGetGudang"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetGudang"
                        v-model="form.gudang_id"
                        class="w-1/2"
                        @input="onSelectGudang"
                      >
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
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom1.last_page >
                              lookup_custom1.current_page
                            "
                            @click="onGetGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider name="coa_id" class="w-full mt-1 mb-2">
                    <div
                      slot-scope="{ errors, valid }"
                      class="flex items-center"
                    >
                      <label for="coa_id" class="w-1/2"
                        >Akun Master <span class="text-danger">*</span></label
                      >
                      <v-select
                        :disabled="isEditable"
                        label="nama_coa"
                        :loading="isLoadingGetCoa"
                        :options="lookup_custom2.data"
                        :filterable="false"
                        @search="onGetCoa"
                        v-model="form.coa_id"
                        class="w-1/2"
                        @input="onSelectCoa"
                      >
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
                    </div>
                  </ValidationProvider>
                  <ValidationProvider name="coa_id" class="w-full mt-1 mb-2">
                    <div
                      slot-scope="{ errors, valid }"
                      class="flex items-center"
                    >
                      <label for="coa_id" class="w-1/2"
                        >Akun Biaya <span class="text-danger">*</span></label
                      >
                      <v-select
                        :disabled="isEditable"
                        label="nama_coa"
                        :loading="isLoadingGetCoa"
                        :options="lookup_custom2.data"
                        :filterable="false"
                        @search="onGetCoa"
                        v-model="form.coa_id_biaya"
                        class="w-1/2"
                      >
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
                    </div>
                  </ValidationProvider>
                  <ValidationProvider name="divisi_id" class="w-full mt-1 mb-2">
                    <div
                      slot-scope="{ errors, valid }"
                      class="flex items-center"
                    >
                      <label for="divisi_id" class="w-1/2"
                        >Divisi <span class="text-danger">*</span></label
                      >
                      <v-select
                        :disabled="isEditable"
                        label="nama_divisi"
                        :loading="isLoadingGetDivisi"
                        :options="lookup_custom3.data"
                        :filterable="false"
                        @search="onGetDivisi"
                        v-model="form.divisi_id"
                        class="w-1/2"
                        @input="onSelectDivisi"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom3.data.length || search"
                        >
                          <span
                            v-if="lookup_custom3.current_page > 1"
                            @click="onGetDivisi(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom3.last_page >
                              lookup_custom3.current_page
                            "
                            @click="onGetDivisi(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    name="pelanggan_id"
                    class="w-full mt-1 mb-2"
                  >
                    <div
                      slot-scope="{ errors, valid }"
                      class="flex items-center"
                    >
                      <label for="pelanggan_id" class="w-1/2"
                        >Pelanggan <span class="text-danger">*</span></label
                      >
                      <v-select
                        :disabled="isEditable"
                        label="nama_pelanggan"
                        :loading="isLoadingGetPelanggan"
                        :options="lookup_custom6.data"
                        :filterable="false"
                        @search="onGetPelanggan"
                        v-model="form.pelanggan_id"
                        class="w-1/2"
                        @input="onSelectPelanggan"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom6.data.length || search"
                        >
                          <span
                            v-if="lookup_custom6.current_page > 1"
                            @click="onGetPelanggan(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom6.last_page >
                              lookup_custom6.current_page
                            "
                            @click="onGetPelanggan(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <div class="form-group">
                    <input-horizontal
                      label="Kode Referensi"
                      type="text"
                      name="kode_referensi"
                      v-model="form.kode_referensi"
                    />
                  </div>
                  <div class="form-group col-span-2">
                    <label for="keterangan" class="w-1/2">Keterangan</label>
                    <textarea
                      :disabled="isEditable"
                      name="keterangan"
                      id="keterangan"
                      v-model="form.keterangan"
                      placeholder="Keterangan"
                      class="w-full p-1 rounded-md outline-none border border-gray-300"
                    ></textarea>
                  </div>
                </div>

                <div class="w-full flex justify-between items-center mt-5">
                  <h1 class="text-lg font-bold">Detail UJS Sopir</h1>
                  <div class=" ">
                    <!-- v-if="self.form.sumber_data === 'NON'" -->
                    <button
                      type="button"
                      @click="addDetailUjs"
                      class="bg-[#4fc47a] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                    >
                      <i class="fas fa-retweet"></i>
                      <p class="text-xs font-medium">Tambah Detail</p>
                    </button>
                  </div>
                </div>

                <div class="table-responsive mb-5">
                  <table
                    class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                  >
                    <!-- :class="
                      form.ujs_sopir_details.length ? 'mb-[300px]' : ''
                    " -->
                    <thead>
                      <tr class="text-sm uppercase text-nowrap">
                        <th class="w-[200px] border border-gray-300">
                          Kode UJS
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Kode Shipment
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Lokasi Asal
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Lokasi Tujuan
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Jenis Routing
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Jenis Kiriman
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Tanggal Berangkat
                        </th>
                        <!-- <th class="w-[200px] border border-gray-300">Status</th> -->
                        <!-- <th class="w-[200px] border border-gray-300">Pajak</th>
                        <th class="w-[200px] border border-gray-300">DPP</th>
                        <th class="w-[200px] border border-gray-300">
                          Harga Setelah Pajak
                        </th> -->
                        <th class="w-[200px] border border-gray-300">Jarak</th>
                        <!-- <th class="w-[200px] border border-gray-300">
                          Waktu Sampai Tujuan
                        </th> -->
                        <th class="w-[200px] border border-gray-300">
                          Total Biaya BBM
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Total Biaya Bongkar Toko
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Total Biaya Retribusi
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Total Biaya Insentif Jarak
                        </th>
                        <th class="w-[75px] border border-gray-300">Hapus</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in form.ujs_sopir_details"
                        :key="index"
                        style="border-top: 0.5px solid lightgray"
                        class="align-top mx-0"
                      >
                        <td class="border border-gray-300">
                          <p>
                            {{ item.shipment ? item.shipment.kode_ujs : "-" }}
                          </p>
                        </td>
                        <td class="border border-gray-300">
                          <p>
                            {{
                              item.shipment ? item.shipment.kode_shipment : "-"
                            }}
                          </p>
                        </td>
                        <td class="border border-gray-300">
                          <p>
                            {{
                              item.lokasi_asal
                                ? item.lokasi_asal.nama_lokasi
                                : "-"
                            }}
                          </p>
                        </td>
                        <td class="border border-gray-300">
                          <p>
                            {{
                              item.lokasi_tujuan
                                ? item.lokasi_tujuan.nama_lokasi
                                : "-"
                            }}
                          </p>
                        </td>
                        <td class="border border-gray-300">
                          {{ item.jenis_routing }}
                        </td>
                        <td class="border border-gray-300">
                          <p v-if="item.jenis_kiriman == 1">Stok Transfer</p>
                          <p v-if="item.jenis_kiriman == 0">Penjualan</p>
                        </td>
                        <td class="border border-gray-300">
                          {{ item.tanggal_berangkat }}
                        </td>
                        <!-- <td class="border border-gray-300">
                          {{ item.status }}
                        </td> -->
                        <td class="border border-gray-300">
                          {{ item.jarak }}
                        </td>
                        <!-- <td class="border border-gray-300">
                          {{ item.realisasi_waktu_sampai_tujuan }}
                        </td> -->
                        <td class="border border-gray-300 text-right">
                          {{ item.total_bbm ?? 0 | formatPrice }}
                        </td>
                        <td class="border border-gray-300 text-right">
                          {{ item.total_bongkar_toko ?? 0 | formatPrice }}
                        </td>
                        <td class="border border-gray-300 text-right">
                          {{ item.total_retribusi ?? 0 | formatPrice }}
                        </td>
                        <td class="border border-gray-300 text-right">
                          {{ item.total_insentif_jarak ?? 0 | formatPrice }}
                        </td>
                        <td
                          class="text-center text-gray-600 border border-gray-300"
                        >
                          <i
                            class="fas fa-trash mx-auto"
                            style="cursor: pointer"
                            @click="onDeleteItem(index)"
                          ></i>
                        </td>
                        <!-- <td class="border border-gray-300">
                          <button
                            v-if="item.file_bukti_selesai"
                            @click="onShowPicture(item)"
                            type="button"
                            class="flex p-2 my-1 max-w-full rounded-md bg-blue-500 text-white hover:bg-blue-400 items-center"
                          >
                            <i class="fa fa-file mx-2"></i>
                            <span class="font-bold text-ellipsis">File</span>
                          </button>
                          <p v-else>File Tidak Ditemukan</p>
                        </td> -->
                      </tr>
                    </tbody>
                    <tr v-if="!form.ujs_sopir_details.length > 0">
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
                  </table>
                </div>

                <modal-footer-section
                  :isLoadingForm="isLoadingForm"
                  @reset="formReset()"
                />
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <ModalRuteBiayaLastmile :self="this" ref="modalRuteLastmile" />
    <ShowPictureModal ref="pictureModal" />
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";
import ModalRuteBiayaLastmile from "./ModalRuteBiayaLastmile.vue";
import ShowPictureModal from "../../../components/transaksional/ShowPictureModal.vue";

export default {
  middleware: ["checkRoleUserDetail"],

  components: {
    ModalRuteBiayaLastmile,
    ShowPictureModal,
  },

  head() {
    return {
      title: "UJS Sopir",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

      title: "UJS Sopir",

      url: "finance/ujs-sopir",
      form: {
        ujs_sopir_id: "",
        tanggal: "",
        periode_awal: "",
        periode_akhir: "",
        gudang_id: "",
        coa_id: "",
        coa_id_biaya: "",
        pelanggan_id: "",
        divisi_id: "",
        keterangan: "",
        ujs_sopir_details: [],
      },
      default_form: {
        ujs_sopir_id: "",
        tanggal: "",
        gudang_id: "",
        coa_id: "",
        coa_id_biaya: "",
        pelanggan_id: "",
        divisi_id: "",
        keterangan: "",
        ujs_sopir_details: [],
      },

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isStopSearchDivisi: false,
      isLoadingGetDivisi: false,
      divisi_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      user: this.$auth.user,
    };
  },

  async created() {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      this.form.tanggal = formattedDate;
      if (this.isEditable) {
        let response = await this.$axios.get("finance/ujs-sopir/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != "ujs_sopir_details") {
            this.form[item] = response.data[item];
          }
        });

        this.form.gudang_id = response.data.gudang ?? "";
        this.form.coa_id = response.data.coa ?? "";
        this.form.coa_id_biaya = response.data.coa_biaya ?? "";
        this.form.divisi_id = response.data.divisi ?? "";
        this.form.pelanggan_id = response.data.pelanggan ?? "";

        this.form.ujs_sopir_details = response.data.ujs_sopir_details.map(
          (item) => {
            return {
              ...item,
              ujs_sopir_detail_id: item || "",
            };
          }
        );

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/finance/ujs-sopir");
    }
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchCoa();
    await this.onSearchDivisi();
    await this.onSearchPelanggan();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_custom4",
      "lookup_custom5",
      "lookup_custom6",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "finance/ujs-sopir";

      let formData = {
        ...this.form,
        gudang_id:
          typeof this.form.gudang_id === "object"
            ? this.form.gudang_id.gudang_id
            : this.form.gudang_id,
        coa_id:
          typeof this.form.coa_id === "object"
            ? this.form.coa_id.coa_id
            : this.form.coa_id,
        coa_id_biaya:
          typeof this.form.coa_id_biaya === "object"
            ? this.form.coa_id_biaya.coa_id
            : this.form.coa_id_biaya,
        divisi_id:
          typeof this.form.divisi_id === "object"
            ? this.form.divisi_id.divisi_id
            : this.form.divisi_id,
        pelanggan_id:
          typeof this.form.pelanggan_id === "object"
            ? this.form.pelanggan_id.pelanggan_id
            : this.form.pelanggan_id,
      };

      formData.ujs_sopir_details = formData.ujs_sopir_details.map((item) => {
        return {
          ...item,
          ujs_sopir_detail_id:
            typeof this.form.ujs_sopir_detail_id === "object"
              ? this.form.ujs_sopir_detail_id.ujs_sopir_detail_id
              : "",
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
            "Berhasil " + (this.isEditable ? "Update" : "Tambah") + " UJS Sopir"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
            };
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    //gudang
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

    async onSelectGudang(item) {
      this.form.gudang_id = item || "";
      await this.onSearchItemGudang();
    },

    //coa
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
          url: "finance/jurnal/get-coa",
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

    onSelectCoa(item) {
      this.form.coa_id = item || "";
    },

    //tipe ppn
    onGetDivisi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDivisi);

      this.isStopSearchDivisi = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchDivisi();
      }, 600);
    },

    async onSearchDivisi() {
      if (!this.isLoadingGetDivisi) {
        this.isLoadingGetDivisi = true;

        await this.lookUp({
          url: "master/divisi/get-divisi",
          lookup: "custom3",
          query:
            "?search=" +
            this.divisi_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDivisi = false;
      }
    },

    onSelectDivisi(item) {
      this.form.divisi_id = item || "";
    },

    //item gudang
    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.item_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "custom4",
          query:
            "?search=" +
            this.item_gudang_search +
            "&gudang_id=" +
            this.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItemGudang = false;
      }
    },

    onSelectItemGudang(item, index) {
      this.form.ujs_sopir_details[index].item_gudang_id = item || "";
    },

    //mata uang
    onGetMataUang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchMataUang);

      this.isStopSearchMataUang = setTimeout(() => {
        this.mata_uang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchMataUang();
      }, 600);
    },

    async onSearchMataUang() {
      if (!this.isLoadingGetMataUang) {
        this.isLoadingGetMataUang = true;

        await this.lookUp({
          url: "master/mata-uang/get-mata-uang",
          lookup: "custom5",
          query:
            "?search=" +
            this.mata_uang_search +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetMataUang = false;
      }
    },

    onSelectMataUang(item) {
      this.form.mata_uang_id = item || "";
    },

    //mPelanggan
    onGetPelanggan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPelanggan);

      this.isStopSearchPelanggan = setTimeout(() => {
        this.pelanggan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchPelanggan();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "custom6",
          query:
            "?search=" +
            this.pelanggan_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPelanggan = false;
      }
    },

    onSelectPelanggan(item) {
      this.form.pelanggan_id = item || "";
    },

    async addDetailUjs() {
      const daftarRute = await this.$axios.get(
        "/finance/ujs-sopir/get-daftar-rute-lastmile",
        {
          params: {
            gudang_id: this.form.gudang_id.gudang_id,
            tanggal: this.form.tanggal,
            periode_awal: this.form.periode_awal,
            periode_akhir: this.form.periode_akhir,
          },
        }
      );

      this.form.ujs_sopir_details = daftarRute.data.map((item) => {
        return {
          ...item,
          // referensi_id:
          //   this.form.jenis === "inbound"
          //     ? item.tagihan_inbound_id
          //     : item.tagihan_pick_order_id,
          // kode_referensi:
          //   this.form.jenis === "inbound"
          //     ? item.inbound.kode_inbound
          //     : item.pick_order_detail.kode_delivery_order,
        };
      });

      // if (this.form.gudang_id) {
      //   this.$refs.modalRuteLastmile.parameters.params.gudang_id =
      //     this.form.gudang_id.gudang_id;
      //   this.$refs.modalRuteLastmile.parameters.params.tanggal =
      //     this.form.tanggal;
      //   this.$refs.modalRuteLastmile.show();
      //   await this.$refs.modalRuteLastmile.onLoad();
      // }
    },

    onShowPicture(item) {
      this.$refs.pictureModal.title = "Bukti Kiriman";
      this.$refs.pictureModal.src =
        "file_bukti_kiriman/" + item.file_bukti_selesai;
      this.$refs.pictureModal.show();
    },

    onDeleteItem(index) {
      this.form.ujs_sopir_details = this.form.ujs_sopir_details.filter(
        (_, itemIndex) => index != itemIndex
      );
    },
  },
};
</script>
