<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Item
        </h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Gudang",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

      title: "Gudang",

      url: "master/gudang",
      form: {
        gudang_id: "",
        lokasi_id: "",
        kode_gudang_sap: "",
        profit_cost_id: "",
        kode_gudang: "",
        nama_gudang: "",
        status_konfig_outbound_sap: "",
        nomor_rekening: "",
        atas_nama_rekening: "",
        status_gudang: "",
        group_gudang_id_1: "",
        group_gudang_id_2: "",
        group_gudang_id_3: "",
        group_gudang_id_4: "",
        group_gudang_id_5: "",
        longitude: "",
        latitude: "",
        alamat: "",
        kecamatan_id: "",
        kota_id: "",
        provinsi_id: "",
        negara_id: "",
        vendor_id_pemilik: "",
        vendor_id_operator: "",
        fungsi_gudang_id: "",
        no_hp: "",
        no_wa: "",
        kapasitas: "",
        kapasitas_bongkar: "",
        fisik_gudang_id: "",
        ukuran_gudang_id: "",
        file_layout: "",
        status_sewa: "",
        status_satpam: "",
        luas_gudang: "",
        satuan_id_luas: "",
      },

      default_form: {
        gudang_id: "",
        lokasi_id: "",
        kode_gudang_sap: "",
        profit_cost_id: "",
        kode_gudang: "",
        nama_gudang: "",
        status_konfig_outbound_sap: "",
        nomor_rekening: "",
        atas_nama_rekening: "",
        status_gudang: "",
        group_gudang_id_1: "",
        group_gudang_id_2: "",
        group_gudang_id_3: "",
        group_gudang_id_4: "",
        group_gudang_id_5: "",
        longitude: "",
        latitude: "",
        alamat: "",
        kecamatan_id: "",
        kota_id: "",
        provinsi_id: "",
        negara_id: "",
        vendor_id_pemilik: "",
        vendor_id_operator: "",
        fungsi_gudang_id: "",
        no_hp: "",
        no_wa: "",
        kapasitas: "",
        kapasitas_bongkar: "",
        fisik_gudang_id: "",
        ukuran_gudang_id: "",
        file_layout: "",
        status_sewa: "",
        status_satpam: "",
        luas_gudang: "",
        satuan_id_luas: "",
      },

      isStopSearchLokasi: false,
      isLoadingGetLokasi: false,
      lokasi_search: "",

      isStopSearchProfitCost: false,
      isLoadingGetProfitCost: false,
      profit_cost_search: "",

      isStopSearchGroupGudang1: false,
      isLoadingGetGroupGudang1: false,
      group_gudang_1_search: "",

      isStopSearchGroupGudang2: false,
      isLoadingGetGroupGudang2: false,
      group_gudang_2_search: "",

      isStopSearchGroupGudang3: false,
      isLoadingGetGroupGudang3: false,
      group_gudang_3_search: "",

      isStopSearchGroupGudang4: false,
      isLoadingGetGroupGudang4: false,
      group_gudang_4_search: "",

      isStopSearchGroupGudang5: false,
      isLoadingGetGroupGudang5: false,
      group_gudang_5_search: "",

      isStopSearchKecamatan: false,
      isLoadingGetKecamatan: false,
      kecamatan_search: "",

      isStopSearchKota: false,
      isLoadingGetKota: false,
      kota_search: "",

      isStopSearchProvinsi: false,
      isLoadingGetProvinsi: false,
      provinsi_search: "",

      isStopSearchNegara: false,
      isLoadingGetNegara: false,
      negara_search: "",

      isStopSearchVendorPemilik: false,
      isLoadingGetVendorPemilik: false,
      vendor_pemilik_search: "",

      isStopSearchVendorOperator: false,
      isLoadingGetVendorOperator: false,
      vendor_operator_search: "",

      isStopSearchFisikGudang: false,
      isLoadingGetFisikGudang: false,
      fisik_gudang_search: "",

      isStopSearchFungsiGudang: false,
      isLoadingGetFungsiGudang: false,
      fungsi_gudang_search: "",

      isStopSearchUkuranGudang: false,
      isLoadingGetUkuranGudang: false,
      ukuran_gudang_search: "",

      isStopSearchSatuanLuas: false,
      isLoadingGetSatuanLuas: false,
      satuan_luas_search: "",
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("master/gudang/" + this.id);

        Object.keys(this.form).forEach((item) => {
          this.form[item] = response.data[item];
        });

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("master/gudang");
    }
  },

  async mounted() {
    await this.onSearchLokasi();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_location",
      "lookup_operator",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_suppliers",
      "lookup_resellers",
      "lookup_regus",

      "lookup_grade",
      "lookup_beam",
      "lookup_packing",
      "lookup_defects",
      "lookup_department",

      "lookup_mesin",
      "lookup_pengawas",
      "lookup_proces",
      "lookup_parents",
      "lookup_sellings",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "master/gudang";

      let formData = {
        ...this.form,
      };

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
            "Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Gudang"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
            };
          }

          this.$router.pus("master/gudang");
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    //lokasi
    onGetLokasi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchLokasi);

      this.isStopSearchLokasi = setTimeout(() => {
        this.lokasi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_location.current_page = isNext
            ? this.lookup_location.current_page + 1
            : this.lookup_location.current_page - 1;
        } else {
          this.lookup_location.current_page = 1;
        }

        this.onSearchLokasi();
      }, 600);
    },

    async onSearchLokasi() {
      if (!this.isLoadingGetLokasi) {
        this.isLoadingGetLokasi = true;

        await this.lookUp({
          url: "master/lokasi/get-lokasi",
          lookup: "location",
          query:
            "?search=" +
            this.lokasi_search +
            "&page=" +
            this.lookup_location.current_page +
            "&per_page=10",
        });

        this.isLoadingGetLokasi = false;
      }
    },

    //profit cost
    onGetProfitCost(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProfitCost);

      this.isStopSearchProfitCost = setTimeout(() => {
        this.profit_cost_search = search;

        if (typeof isNext !== "function") {
          this.lookup_operator.current_page = isNext
            ? this.lookup_operator.current_page + 1
            : this.lookup_operator.current_page - 1;
        } else {
          this.lookup_operator.current_page = 1;
        }

        this.onSearchProfitCost();
      }, 600);
    },

    async onSearchProfitCost() {
      if (!this.isLoadingGetProfitCost) {
        this.isLoadingGetProfitCost = true;

        await this.lookUp({
          url: "master/profit-cost/get-profit-cost",
          lookup: "operator",
          query:
            "?search=" +
            this.profit_cost_search +
            "&page=" +
            this.lookup_operator.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProfitCost = false;
      }
    },

    //group gudang 1
    onGetGroupGudang1(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupGudang1);

      this.isStopSearchGroupGudang1 = setTimeout(() => {
        this.group_gudang_1_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchGroupGudang1();
      }, 600);
    },

    async onSearchGroupGudang1() {
      if (!this.isLoadingGetGroupGudang1) {
        this.isLoadingGetGroupGudang1 = true;

        await this.lookUp({
          url: "master/group-gudang/get-group-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.group_gudang_1_search +
            "&status=1" +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupGudang1 = false;
      }
    },
    //group gudang 2
    onGetGroupGudang2(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupGudang2);

      this.isStopSearchGroupGudang2 = setTimeout(() => {
        this.group_gudang_2_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchGroupGudang2();
      }, 600);
    },

    async onSearchGroupGudang2() {
      if (!this.isLoadingGetGroupGudang2) {
        this.isLoadingGetGroupGudang2 = true;

        await this.lookUp({
          url: "master/group-gudang/get-group-gudang",
          lookup: "custom2",
          query:
            "?search=" +
            this.group_gudang_2_search +
            "&status=2" +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupGudang2 = false;
      }
    },
    //group gudang 3
    onGetGroupGudang3(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupGudang3);

      this.isStopSearchGroupGudang3 = setTimeout(() => {
        this.group_gudang_3_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchGroupGudang3();
      }, 600);
    },

    async onSearchGroupGudang3() {
      if (!this.isLoadingGetGroupGudang3) {
        this.isLoadingGetGroupGudang3 = true;

        await this.lookUp({
          url: "master/group-gudang/get-group-gudang",
          lookup: "custom3",
          query:
            "?search=" +
            this.group_gudang_3_search +
            "&status=3" +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupGudang3 = false;
      }
    },

    formReset() {
      this.$refs.formValidate.reset();
      this.form = this.default_form;
    },
  },
};
</script>
