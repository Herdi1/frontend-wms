<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
        Edit Data
      </h1>
      <h1 v-else class="text-xl font-bold mb-2 uppercase">Tambah Data</h1>
    </div>
    <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
      <form @submit.prevent="validate().then(() => onSubmit(invalid))">
        <div class="modal-body mt-4"></div>
      </form>
    </ValidationObserver>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      isStopSearchItem: false,
      isLoadingGetItem: false,
      item_search: "",

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isStopSearchSuppliers: false,
      isLoadingGetSuppliers: false,
      suppliers_search: "",

      isStopSearchGroup1: false,
      isLoadingGetGroup1: false,
      group1_search: "",

      isStopSearchGroup2: false,
      isLoadingGetGroup2: false,
      group2_search: "",

      isStopSearchGroup3: false,
      isLoadingGetGroup3: false,
      group3_search: "",

      isStopSearchGroup4: false,
      isLoadingGetGroup4: false,
      group4_search: "",

      isStopSearchGroup5: false,
      isLoadingGetGroup5: false,
      group5_search: "",

      isStopSearchKategori1: false,
      isLoadingGetKategori1: false,
      kategori1_search: "",

      isStopSearchKategori2: false,
      isLoadingGetKategori2: false,
      kategori2_search: "",

      isStopSearchKategori3: false,
      isLoadingGetKategori3: false,
      kategori3_search: "",

      isStopSearchKategori4: false,
      isLoadingGetKategori4: false,
      kategori4_search: "",

      isStopSearchKategori5: false,
      isLoadingGetKategori5: false,
      kategori5_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Item Pelanggan",
      parameters: {
        url: "master/item-pelanggan",
        form: {
          item_id: "",
          vendor_id: "",
          supplier_id: "",
          supplier_code: "",
          nama_item: "",
          group_item_id_1: "",
          group_item_id_2: "",
          group_item_id_3: "",
          group_item_id_4: "",
          group_item_id_5: "",
          batas_atas: "",
          kode_sap: "",
          batas_bawah: "",
          kategori_id_1: "",
          kategori_id_2: "",
          kategori_id_3: "",
          kategori_id_4: "",
          kategori_id_5: "",
          jumlah_palet: "",
          kapasitas_palet: "",
          kebutuhan_palet: "",
          maksimal_tumpukan: "",
          berat_bersih: "",
          berat_kotor: "",
          panjang: "",
          lebar: "",
          tebal: "",
          volume: "",
          warna: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get("master/item-pelanggan/" + this.id);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/master/item-pelanggan");
    }
  },

  async mounted() {
    await this.onSearchItem();
    await this.onSearchVendor();
    await this.onSearchPelanggan();
    await this.onSearchSuppliers();

    await this.onSearchGroup1();
    await this.onSearchKategori1();
    await this.onSearchKategori2();
    await this.onSearchKategori3();
    await this.onSearchKategori4();
    await this.onSearchKategori5();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //item
      "lookup_custom2", //vendor
      "lookup_custom3", //pelanggan
      "lookup_custom4", //supplier
      "lookup_custom5", //group1
      "lookup_custom6", //kategori1
      "lookup_custom7", //kategori2
      "lookup_custom8", //kategori3
      "lookup_custom9", //kategori4
      "lookup_custom10", //kategori5
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    async onSubmit() {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "master/item-pelanggan";

      let formData = {
        ...this.form,
        item_id:
          typeof this.parameters.form.item_id == "object"
            ? this.parameters.form.item_id.item_id
            : this.parameters.form.item_id,
      };

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        url: url,
        method: this.isEditable ? "PUT" : "POST",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Berhasil " +
              (this.isEditable ? "Update" : "Tambah") +
              "Item Pelanggan"
          );

          if (!this.isEditable) {
            this.parameters.form = {
              item_id: "",
              vendor_id: "",
              supplier_id: "",
              supplier_code: "",
              nama_item: "",
              group_item_id_1: "",
              group_item_id_2: "",
              group_item_id_3: "",
              group_item_id_4: "",
              group_item_id_5: "",
              batas_atas: "",
              kode_sap: "",
              batas_bawah: "",
              kategori_id_1: "",
              kategori_id_2: "",
              kategori_id_3: "",
              kategori_id_4: "",
              kategori_id_5: "",
              jumlah_palet: "",
              kapasitas_palet: "",
              kebutuhan_palet: "",
              maksimal_tumpukan: "",
              berat_bersih: "",
              berat_kotor: "",
              panjang: "",
              lebar: "",
              tebal: "",
              volume: "",
              warna: "",
            };
          }

          this.$router.push("/master/item-pelanggan");
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    onSelectItem(item) {
      if (item) {
        this.parameters.form.nama_item = item.nama_item;
        this.parameters.form.supplier_id = item.supplier_id;
        this.parameters.form.supplier_code = item.supplier_code;
        this.parameters.form.batas_atas = item.batas_atas;
        this.parameters.form.batas_bawah = item.batas_bawah;
        this.parameters.form.jumlah_palet = item.jumlah_palet;
        this.parameters.form.kapasitas_palet = item.kapasitas_palet;
        this.parameters.form.kebutuhan_palet = item.kebutuhan_palet;
        this.parameters.form.maksimal_tumpukan = item.maksimal_tumpukan;
        this.parameters.form.volume = item.volume;
        this.parameters.form.group_item_id_1 = item.group_item_id_1;
        this.parameters.form.group_item_id_2 = item.group_item_id_2;
        this.parameters.form.group_item_id_3 = item.group_item_id_3;
        this.parameters.form.group_item_id_4 = item.group_item_id_4;
        this.parameters.form.group_item_id_5 = item.group_item_id_5;
        this.parameters.form.kategori_id_1 = item.kategori_id_1;
        this.parameters.form.kategori_id_2 = item.kategori_id_2;
        this.parameters.form.kategori_id_3 = item.kategori_id_3;
        this.parameters.form.kategori_id_4 = item.kategori_id_4;
        this.parameters.form.kategori_id_5 = item.kategori_id_5;
      } else {
        this.parameters.form.nama_item = "";
        this.parameters.form.supplier_id = "";
        this.parameters.form.supplier_code = "";
        this.parameters.form.batas_atas = "";
        this.parameters.form.batas_bawah = "";
        this.parameters.form.jumlah_palet = "";
        this.parameters.form.kapasitas_palet = "";
        this.parameters.form.kebutuhan_palet = "";
        this.parameters.form.maksimal_tumpukan = "";
        this.parameters.form.volume = "";
        this.parameters.form.group_item_id_1 = "";
        this.parameters.form.group_item_id_2 = "";
        this.parameters.form.group_item_id_3 = "";
        this.parameters.form.group_item_id_4 = "";
        this.parameters.form.group_item_id_5 = "";
        this.parameters.form.kategori_id_1 = "";
        this.parameters.form.kategori_id_2 = "";
        this.parameters.form.kategori_id_3 = "";
        this.parameters.form.kategori_id_4 = "";
        this.parameters.form.kategori_id_5 = "";
      }
    },

    onGetItem(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchItem);
      this.isStopSearchItem = setTimeout(() => {
        this.item_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }
        this.onSearchItem();
      }, 600);
    },

    async onSearchItem() {
      if (!this.isLoadingGetItem) {
        this.isLoadingGetItem = true;

        await this.lookUp({
          url: "master/item/get-item",
          lookup: "custom1",
          query:
            "?search=" +
            this.item_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });
        this.isLoadingGetItem = false;
        // console.log("item", this.lookup_custom1.data);
      }
    },

    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchVendor);
      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }
        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "custom2",
          query:
            "?search=" +
            this.vendor_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });
        this.isLoadingGetVendor = false;
        // console.log("item", this.lookup_custom2.data);
      }
    },

    onGetGroup(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchGroup);
      this.isStopSearchGroup = setTimeout(() => {
        this.group_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }
        this.onSearchGroup();
      }, 600);
    },

    async onSearchGroup() {
      if (!this.isLoadingGetGrup) {
        this.isLoadingGetGroup = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom3",
          query:
            "?search=" +
            this.group_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGroup = false;
        // console.log("item", this.lookup_custom3.data);
      }
    },

    onGetSuppliers(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchSuppliers);
      this.isStopSearchSuppliers = setTimeout(() => {
        this.suppliers_search = search;

        if (typeof isNext === "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }
        this.onSearchSuppliers();
      }, 600);
    },

    async onSearchSuppliers() {
      if (!this.isLoadingGetSuppliers) {
        this.isLoadingGetSuppliers = true;

        await this.lookUp({
          url: "master/supplier/get-supplier",
          lookup: "suppliers",
          query:
            "?search=" +
            this.suppliers_search +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });
        this.isLoadingGetSuppliers = false;
        // console.log("item", this.lookup_suppliers.data);
      }
    },

    onGetCategory(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchCategory);
      this.isStopSearchCategory = setTimeout(() => {
        this.category_search = search;

        if (typeof isNext === "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }
        this.onSearchCategory();
      }, 600);
    },

    async onSearchCategory() {
      if (!this.isLoadingGetCategory) {
        this.isLoadingGetCategory = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori",
          lookup: "grade",
          query:
            "?search=" +
            this.category_search +
            "&page=" +
            this.lookup_grade.current_page +
            "&per_page=10",
        });
        this.isLoadingGetCategory = false;
        // console.log("item", this.lookup_grade.data);
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        item_id: "",
        vendor_id: "",
        supplier_id: "",
        supplier_code: "",
        nama_item: "",
        group_item_id_1: "",
        group_item_id_2: "",
        group_item_id_3: "",
        group_item_id_4: "",
        group_item_id_5: "",
        batas_atas: "",
        kode_sap: "",
        batas_bawah: "",
        kategori_id_1: "",
        kategori_id_2: "",
        kategori_id_3: "",
        kategori_id_4: "",
        kategori_id_5: "",
        jumlah_palet: "",
        kapasitas_palet: "",
        kebutuhan_palet: "",
        maksimal_tumpukan: "",
        berat_bersih: "",
        berat_kotor: "",
        panjang: "",
        lebar: "",
        tebal: "",
        volume: "",
        warna: "",
      };
    },
  },
};
</script>
