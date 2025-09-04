<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Konversi Stok
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Konversi Stok
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
          <div class="w-full grid grid-rows-4 grid-flow-col gap-2 mb-5">
            <div class="form-group" v-if="isEditable">
              <input-horizontal
                :isHorizontal="true"
                label="Kode Konversi Stok"
                type="text"
                name="kode_konversi_stok"
                :required="true"
                v-model="parameters.form.kode_konversi_stok"
                :disabled="true"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
              />
            </div>
            <div class="form-group">
              <input-horizontal
                :isHorizontal="true"
                label="Tanggal"
                type="date"
                name="tanggal"
                :required="true"
                v-model="parameters.form.tanggal"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
              />
            </div>
            <!-- <div class="form-group">
              <input-horizontal
                :isHorizontal="true"
                label="Tanggal Mulai"
                type="date"
                name="tanggal_mulai"
                :required="true"
                v-model="parameters.form.tanggal_mulai"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
                @input="setTanggalMulai"
              />
            </div>
            <div class="form-group">
              <input-horizontal
                :isHorizontal="true"
                label="Tanggal Estimasi Selesai"
                type="date"
                name="tanggal_selesai"
                v-model="parameters.form.tanggal_selesai"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
                @input="getEstimasiLamaPengerjaan"
              />
            </div> -->
            <div class="form-group flex justify-between">
              <label for="" class="w-[40%]"
                >Tanggal Mulai <span class="text-danger">*</span></label
              >
              <input
                @input="setTanggalMulai"
                type="datetime-local"
                step="1"
                v-model="parameters.form.tanggal_mulai"
                class="w-[60%] pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div class="form-group flex justify-between">
              <label for="" class="w-[40%]"
                >Tanggal Selesai <span class="text-danger">*</span></label
              >
              <input
                @input="getEstimasiLamaPengerjaan"
                type="datetime-local"
                step="1"
                v-model="parameters.form.tanggal_selesai"
                class="w-[60%] pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div class="form-group">
              <input-horizontal
                :isHorizontal="true"
                label="Estimasi Lama Pengerjaan"
                type="text"
                name="lama_pengerjaan"
                v-model="parameters.form.lama_pengerjaan_string"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
                disabled
              />
              <!-- @input="getEstimasiSelesai" -->
            </div>
            <select-button
              v-if="!user.gudang_id"
              :self="{
                label: 'Gudang',
                optionLabel: 'nama_gudang',
                isLoading: isLoadingGetGudang,
                lookup: lookup_custom8,
                onGet: onGetGudang,
                value: parameters.form.gudang_id,
                input: onSelectGudang,
              }"
              width="w-[60%]"
            />
            <div class="form-group">
              <input-horizontal
                :isHorizontal="true"
                label="Keterangan"
                type="text"
                name="keterangan"
                :required="true"
                v-model="parameters.form.keterangan"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
              />
            </div>
          </div>

          <tab-component :tabs="tabs">
            <template #DetailProdukBahan>
              <DetailProdukBahan
                :self="{
                  parameters,
                  lookup_custom1,
                  lookup_custom2,
                  lookup_custom3,
                  lookup_custom4,
                  lookup_custom5,
                  lookup_custom6,
                  lookup_custom7,
                  isLoadingGetItemGudang,
                  isLoadingGetZonaPlan,
                  isLoadingGetSlotAisle,
                  isLoadingGetSlotRack,
                  isLoadingGetSlotLevel,
                  isLoadingGetSlotBin,
                  isLoadingGetValuation,
                  onGetItemGudang,
                  onGetValuation,
                  onGetZonaPlan,
                  onGetSlotAisle,
                  onGetSlotRack,
                  onGetSlotLevel,
                  onGetSlotBin,
                  onOpenModal,
                  onOpenModalStokGudang,
                }"
              />
            </template>
            <!-- <template #DetailProdukJadi>
              <DetailProdukJadi :self="{ parameters }" />
            </template> -->
          </tab-component>

          <modal-footer-section
            class="mt-5"
            :isLoadingForm="isLoadingForm"
            @reset="formReset()"
          />
        </form>
      </ValidationObserver>
    </div>
    <ModalKartuStok :self="this" ref="modalKartuStok" />
    <ModalStokGudang :self="this" ref="modalStokGudang" />
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
import DetailProdukBahan from "./DetailProdukBahan.vue";
import ModalKartuStok from "../../../../components/transaksional/ModalKartuStok.vue";
import ModalStokGudang from "../../../../components/transaksional/ModalStokGudang.vue";
// import DetailProdukJadi from "../konfirmasi-konversi-stok/DetailProdukJadi.vue";

export default {
  props: ["self"],

  components: {
    DetailProdukBahan,
    ModalKartuStok,
    ModalStokGudang,
    // DetailProdukJadi,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        { name: "DETAIL PRODUK BAHAN", slotName: "DetailProdukBahan" },
        // { name: "DETAIL PRODUK JADI", slotName: "DetailProdukJadi" },
        // { name: "BIAYA KONVERSI", slotName: "BiayaKonversi" },
      ],
      id,

      user: this.$auth.user,

      isStopSearchStatus: false,
      isLoadingGetStatus: false,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Konversi Stok",
      parameters: {
        url: "inventory/konversi-stok",
        form: {
          kode_konversi_stok: "",
          tanggal: "",
          tanggal_mulai: "",
          tanggal_selesai: "",
          lama_pengerjaan: "",
          lama_pengerjaan_string: "",
          gudang_id: "",
          status_transaksi_id: "",
          keterangan: "",
          konversi_stok_detail_bahan: [],
          konversi_stok_detail_jadi: [],
          biaya_konversi: [],

          user_agent: "",
          device: "",
          latitude: "",
          longitude: "",
        },
      },

      isStopSearchValuation: false,
      isLoadingGetValuation: false,
      valuation_search: "",

      isStopSearchZonaPlan: false,
      isLoadingGetZonaPlan: false,
      zona_plan_search: "",

      isStopSearchSlotAisle: false,
      isLoadingGetSlotAisle: false,
      slot_aisle_search: "",

      isStopSearchSlotRack: false,
      isLoadingGetSlotRack: false,
      slot_rack_search: "",

      isStopSearchSlotLevel: false,
      isLoadingGetSlotLevel: false,
      slot_level_search: "",

      isStopSearchSlotBin: false,
      isLoadingGetSlotBin: false,
      slot_bin_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",
    };
  },

  async mounted() {
    // await this.lookUp({
    //   url: "utility",
    //   lookup: "custom1",
    //   query: "?q=jenis_kontrak",
    // });
    await this.onSearchGudang();
    await this.onSearchItemGudang();
    await this.onSearchValuation();
    // await this.onSearchZonaPlan();
    // await this.onSearchSlotAisle();
    // await this.onSearchSlotRack();
    // await this.onSearchSlotLevel();
    // await this.onSearchSlotBin();

    this.getUserAgent();
    this.getGeoLocation();
  },

  async created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    this.parameters.form.tanggal = formattedDate;
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          if (
            item !== "konversi_stok_detail_bahans" &&
            item !== "konversi_stok_detail_jadis"
          ) {
            this.parameters.form[item] = res.data[item];
          }
        });

        this.parameters.form.gudang_id = res.data.gudang;
        let hari = Math.floor(this.parameters.form.lama_pengerjaan / 24) ?? 0;
        let jam = this.parameters.form.lama_pengerjaan % 24 ?? 0;
        this.parameters.form.lama_pengerjaan_string = `${hari} hari ${jam} jam`;

        this.parameters.form.konversi_stok_detail_bahan =
          res.data.konversi_stok_detail_bahans.map((item) => {
            return {
              ...item,
              konversi_stok_detail_bahan_id: item.konversi_stok_detail_bahan_id,
              // item_id: item.item_id,
              // item_gudang_id: item.item_gudang,
              // zona_gudang_id: item.zona_gudang,
              // slot_penyimpanan_id_aisle: item.slot_penyimpanan_aisle,
              // slot_penyimpanan_id_rack: item.slot_penyimpanan_rack,
              // slot_penyimpanan_id_level: item.slot_penyimpanan_level,
              // slot_penyimpanan_id_bin: item.slot_penyimpanan_bin,
              nama_item: item.item_gudang
                ? item.item_gudang.nama_item
                : item.nama_item,
              kode_item: item.item_gudang
                ? item.item_gudang.kode_item
                : item.kode_item,
              quantity_sisa: item.quantity_sisa
                ? item.quantity_sisa
                : item.quantity,
              lokasi_penyimpanan: item.kode_slot_penyimpanan_terakhir
                ? item.kode_slot_penyimpanan_terakhir
                : `${item.zona_gudang.nama_zona_gudang} - ${item.zona_gudang.kode_zona_gudang}`,
              kode_valuation: item.valuation.kode_valuation,
            };
          });

        this.parameters.form.konversi_stok_detail_jadi =
          res.data.konversi_stok_detail_jadis.map((item) => {
            return {
              ...item,
              konversi_stok_detail_jadi_id: item.konversi_stok_detail_jadi_id,
              item_id: item.item_id,
              item_gudang_id: item.item_gudang,
              zona_gudang_id: item.zona_gudang,
              slot_penyimpanan_id_aisle: item.slot_penyimpanan_aisle,
              slot_penyimpanan_id_rack: item.slot_penyimpanan_rack,
              slot_penyimpanan_id_level: item.slot_penyimpanan_level,
              slot_penyimpanan_id_bin: item.slot_penyimpanan_bin,
            };
          });

        this.isLoadingPage = false;
      }
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
      "lookup_custom4",
      "lookup_custom5",
      "lookup_custom6",
      "lookup_custom7",
      "lookup_custom8",
      "lookup_custom9",
      "lookup_custom10",
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
            console.log(
              "latitude",
              this.parameters.form.latitude,
              "longitude",
              this.parameters.form.longitude
            );
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

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "inventory/konversi-stok";

      let formData = {
        ...this.parameters.form,
        id: this.parameters.form.konversi_stok_id
          ? this.parameters.form.konversi_stok_id
          : "",
        gudang_id:
          typeof this.parameters.form.gudang_id === "object"
            ? this.parameters.form.gudang_id.gudang_id
            : "",
        tanggal_mulai: this.formatTanggal(this.parameters.form.tanggal_mulai),
        tanggal_selesai: this.formatTanggal(
          this.parameters.form.tanggal_selesai
        ),
        // ...this.parameters.form,
        // form: {
        // },
      };

      formData.konversi_stok_detail_bahans =
        this.parameters.form.konversi_stok_detail_bahan.map((item) => {
          return {
            ...item,
            keterangan: item.keterangan || "",
            // item_id: item.item_id,
            // item_pelanggan_id:
            //   typeof item.item_gudang_id === "object"
            //     ? item.item_gudang_id.item_pelanggan_id
            //     : "",
            // item_gudang_id:
            //   typeof item.item_gudang_id === "object"
            //     ? item.item_gudang_id.item_gudang_id
            //     : "",
            // zona_gudang_id:
            //   typeof item.zona_gudang_id === "object"
            //     ? item.zona_gudang_id.zona_gudang_id
            //     : "",
            // slot_penyimpanan_id_aisle:
            //   typeof item.slot_penyimpanan_id_aisle === "object"
            //     ? item.slot_penyimpanan_id_aisle.slot_penyimpanan_id
            //     : "",
            // slot_penyimpanan_id_rack:
            //   typeof item.slot_penyimpanan_id_rack === "object"
            //     ? item.slot_penyimpanan_id_rack.slot_penyimpanan_id
            //     : "",
            // slot_penyimpanan_id_level:
            //   typeof item.slot_penyimpanan_id_level === "object"
            //     ? item.slot_penyimpanan_id_level.slot_penyimpanan_id
            //     : "",
            // slot_penyimpanan_id_bin:
            //   typeof item.slot_penyimpanan_id_bin === "object"
            //     ? item.slot_penyimpanan_id_bin.slot_penyimpanan_id
            //     : "",
          };
        });

      formData.konversi_stok_detail_jadis =
        this.parameters.form.konversi_stok_detail_jadi.map((item) => {
          return {
            ...item,
            item_id: item.item_id,
            // item_pelanggan_id:
            //   typeof item.item_gudang_id === "object"
            //     ? item.item_gudang_id.item_pelanggan_id
            //     : "",
            item_gudang_id:
              typeof item.item_gudang_id === "object"
                ? item.item_gudang_id.item_gudang_id
                : "",
            zona_gudang_id:
              typeof item.zona_gudang_id === "object"
                ? item.zona_gudang_id.zona_gudang_id
                : "",
            slot_penyimpanan_id_aisle:
              typeof item.slot_penyimpanan_id_aisle === "object"
                ? item.slot_penyimpanan_id_aisle.slot_penyimpanan_id
                : "",
            slot_penyimpanan_id_rack:
              typeof item.slot_penyimpanan_id_rack === "object"
                ? item.slot_penyimpanan_id_rack.slot_penyimpanan_id
                : "",
            slot_penyimpanan_id_level:
              typeof item.slot_penyimpanan_id_level === "object"
                ? item.slot_penyimpanan_id_level.slot_penyimpanan_id
                : "",
            slot_penyimpanan_id_bin:
              typeof item.slot_penyimpanan_id_bin === "object"
                ? item.slot_penyimpanan_id_bin.slot_penyimpanan_id
                : "",
            keterangan: item.keterangan || "",
          };
        });

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

          this.isEditable = false;
          this.parameters.form = {
            kode_konversi_stok: "",
            tanggal: "",
            tanggal_mulai: "",
            tanggal_selesai: "",
            lama_pengerjaan: "",
            gudang_id: "",
            status_transaksi_id: "",
            keterangan: "",
            konversi_stok_detail_bahan: [],
            konversi_stok_detail_jadi: [],
            biaya_konversi: [],
          };
          this.$refs.formValidate.reset();
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

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kode_konversi_stok: "",
        tanggal: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
        lama_pengerjaan: "",
        gudang_id: "",
        status_transaksi_id: "",
        keterangan: "",
        konversi_stok_detail_bahan: [],
        konversi_stok_detail_jadi: [],
        biaya_konversi: [],
      };
    },

    onGetValuation(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchValuation);

      this.isStopSearchValuation = setTimeout(() => {
        this.valuation_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchValuation();
      }, 600);
    },

    async onSearchValuation() {
      if (!this.isLoadingGetValuation) {
        this.isLoadingGetValuation = true;

        await this.lookUp({
          url: "master/valuation/get-valuation",
          lookup: "custom6",
          query:
            "?search=" +
            this.valuation_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetValuation = false;
      }
    },

    // Get zona plan
    onGetZonaPlan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchZonaPlan);

      this.isStopSearchZonaPlan = setTimeout(() => {
        this.zona_plan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchZonaPlan();
      }, 600);
    },

    async onSearchZonaPlan() {
      if (!this.isLoadingGetZonaPlan) {
        this.isLoadingGetZonaPlan = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.zona_plan_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetZonaPlan = false;
      }
    },

    // Get slot aisle
    onGetSlotAisle(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotAisle);

      this.isStopSearchSlotAisle = setTimeout(() => {
        this.slot_aisle_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchSlotAisle();
      }, 600);
    },

    async onSearchSlotAisle() {
      if (!this.isLoadingGetSlotAisle) {
        this.isLoadingGetSlotAisle = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom2",
          query:
            "?search=" +
            this.slot_aisle_search +
            "&level=1" +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotAisle = false;
      }
    },

    // Get slot rack
    onGetSlotRack(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotRack);

      this.isStopSearchSlotRack = setTimeout(() => {
        this.slot_rack_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchSlotRack();
      }, 600);
    },

    async onSearchSlotRack() {
      if (!this.isLoadingGetSlotRack) {
        this.isLoadingGetSlotRack = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom3",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=2" +
            "&gudang_id=" +
            this.parameters.form.gudang_id +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotRack = false;
      }
    },

    // Get slot level
    onGetSlotLevel(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotLevel);

      this.isStopSearchSlotLevel = setTimeout(() => {
        this.slot_level_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchSlotLevel();
      }, 600);
    },

    async onSearchSlotLevel() {
      if (!this.isLoadingGetSlotLevel) {
        this.isLoadingGetSlotLevel = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom4",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=3" +
            "&gudang_id=" +
            this.parameters.form.gudang_id +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotLevel = false;
      }
    },

    // Get slot level
    onGetSlotBin(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotBin);

      this.isStopSearchSlotBin = setTimeout(() => {
        this.slot_bin_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchSlotBin();
      }, 600);
    },

    async onSearchSlotBin() {
      if (!this.isLoadingGetSlotBin) {
        this.isLoadingGetSlotBin = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom5",
          query:
            "?search=" +
            this.slot_bin_search +
            "&level=4" +
            "&gudang_id=" +
            this.parameters.form.gudang_id +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },

    // get item gudang
    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.item_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "custom7",
          query:
            "?search=" +
            this.item_gudang_search +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItemGudang = false;
      }
    },

    // get  gudang
    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang-user",
          lookup: "custom8",
          query:
            "?search=" +
            this.gudang_search +
            "&user_id=" +
            this.user.user_id +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    async onSelectGudang(item) {
      this.parameters.form.gudang_id = item;
      await this.onSearchZonaPlan();
      this.parameters.form.konversi_stok_detail_bahan = [];
      this.parameters.form.konversi_stok_detail_jadi = [];
      this.parameters.form.biaya_konversi = [];
      // await this.onSearchSlotAisle();
      // await this.onSearchSlotRack();
      // await this.onSearchSlotLevel();
      // await this.onSearchSlotBin();
    },

    async onOpenModal() {
      if (this.parameters.form.gudang_id) {
        this.$refs.modalKartuStok.show();
        await this.$refs.modalKartuStok.onLoad();
      } else {
        this.$toaster.error("Gudang Belum Dipilih");
      }
    },

    async onOpenModalStokGudang() {
      if (this.parameters.form.gudang_id) {
        this.$refs.modalStokGudang.show();
        await this.$refs.modalStokGudang.onLoad();
      } else {
        this.$toaster.error("Gudang Belum Dipilih");
      }
    },

    addItem(item) {
      if (
        !this.parameters.form.konversi_stok_detail_bahan.find(
          (data) => data.stok_gudang_id === item.stok_gudang_id
        )
      ) {
        let detailItem = {
          ...item,
          nama_item: item.item_gudang
            ? item.item_gudang.nama_item
            : item.nama_item,
          kode_item: item.item_gudang
            ? item.item_gudang.kode_item
            : item.kode_item,
          quantity_sisa: item.quantity_sisa
            ? item.quantity_sisa
            : item.quantity,
          lokasi_penyimpanan: item.kode_slot_penyimpanan_terakhir
            ? item.kode_slot_penyimpanan_terakhir
            : `${item.zona_gudang.nama_zona_gudang} - ${item.zona_gudang.kode_zona_gudang}`,
        };
        this.parameters.form.konversi_stok_detail_bahan.push(detailItem);
        this.$toaster.success("Data Berhasil Ditambahkan");
      } else {
        this.$toaster.error("Item Sudah Ditambahkan");
      }
    },

    getEstimasiLamaPengerjaan() {
      const start = new Date(this.parameters.form.tanggal_mulai);
      const end = new Date(this.parameters.form.tanggal_selesai);

      const diffMils = end - start;

      // const lamaPengerjaan =
      //   Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) -
      //   Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());

      const oneDayInMilis = 1000 * 60 * 60 * 24;
      const msInHour = 1000 * 60 * 60;
      const msInMinute = 1000 * 60;

      const days = Math.floor(diffMils / oneDayInMilis) ?? 0;
      const remainingOfDay = diffMils % oneDayInMilis;

      const hours = Math.floor(remainingOfDay / msInHour) ?? 0;
      const remainingOfHour = remainingOfDay % msInHour;

      const minutes = Math.floor(remainingOfHour / msInMinute) ?? 0;

      this.parameters.form.lama_pengerjaan =
        Math.floor(diffMils / msInHour) ?? 0;
      this.parameters.form.lama_pengerjaan_string = `${days} hari ${hours} jam`;
    },

    getEstimasiSelesai() {
      const start = new Date(this.parameters.form.tanggal_mulai);

      const lamaPengerjaanInMilis =
        (this.parameters.form.lama_pengerjaan - 1) * 1000 * 60 * 60 * 24;
      const estimasiSelesai =
        Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()) +
        lamaPengerjaanInMilis;

      const estimasiDate = new Date(estimasiSelesai);

      const year = estimasiDate.getFullYear();
      const month = (estimasiDate.getMonth() + 1).toString().padStart(2, "0");
      const day = estimasiDate.getDate().toString().padStart(2, "0");

      this.parameters.form.tanggal_selesai = `${year}-${month}-${day}`;
    },

    setTanggalMulai() {
      if (this.parameters.form.tanggal_selesai) {
        this.getEstimasiLamaPengerjaan();
      } else if (this.parameters.form.lama_pengerjaan) {
        this.getEstimasiSelesai();
      } else {
        return;
      }
    },

    formatTanggal(dateString) {
      const date = new Date(dateString);
      const formatted =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0") +
        " " +
        String(date.getHours()).padStart(2, "0") +
        ":" +
        String(date.getMinutes()).padStart(2, "0") +
        ":" +
        String(date.getSeconds()).padStart(2, "0");

      return formatted;
    },
  },
};
</script>
