<template>
  <section class="section">
    <div class="bg-white rounded-md px-4 py-2 shadow-sm mb-10">
      <div class="section-body mb-4" v-if="!isLoadingPage">
        <div class="flex justify-between items-center w-full">
          <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
            Edit Data Item Pelanggan
          </h1>
          <h1 v-else class="text-xl font-bold mb-2 uppercase">
            Tambah Data Item Pelanggan
          </h1>
          <button class="btn btn-primary my-2" @click="$router.back()">
            <i class="fas fa-arrow-left mr-2"></i>
            Kembali
          </button>
        </div>
      </div>
    </div>
    <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
      <form @submit.prevent="validate().then(() => onSubmit(invalid))">
        <div class="modal-body mt-4">
          <div class="grid grid-cols-3 gap-2 w-full">
            <ValidationProvider name="item" rules="required">
              <div class="form-group w-full items-center mb-5 h-40">
                <label for="">Item <span class="text-danger">*</span></label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_item"
                  :loading="isLoadingGetItem"
                  :options="lookup_custom1.data"
                  :filterable="false"
                  @search="onGetItem"
                  :reduce="(item) => item.item_id"
                  v-model="parameters.form.item_id"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom1.data.length || search"
                  >
                    <span
                      v-if="lookup_custom1.current_page > 1"
                      @click="onGetItem(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom1.last_page > lookup_custom1.current_page
                      "
                      @click="onGetItem(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </ValidationProvider>
          </div>
        </div>
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

      isStopSearchSuppliers: false,
      isLoadingGetSuppliers: false,
      suppliers_search: "",

      isStopSearchGroup: false,
      isLoadingGetGroup: false,
      group_search: "",

      isStopSearchCategory: false,
      isLoadingGetCategory: false,
      category_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Item Pelanggan",
      parameters: {
        url: "master/item-pelanggan/get-item-pelanggan?pelanggan_id=" + id,
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
        let res = await this.$axios.get(
          "master/item-pelanggan/get-item-pelanggan?pelanggan_id=" + this.id
        );
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchItem();
    await this.onSearchVendor();
    await this.onSearchGroup();
    await this.onSearchSuppliers();
    await this.onSearchCategory();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //item
      "lookup_custom2", //vendor
      "lookup_custom3", //grup
      "lookup_suppliers", //supplier
      "lookup_grade", //kategori
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    async onSubmit() {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          id: this.parameters.form.item_pelanggan_id
            ? this.parameters.form.item_pelanggan_id
            : "",
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );
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
        this.$refs.formValidate.reset();
        this.$refs.ruteProvider.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }
      this.isLoadingForm = false;
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
        console.log("item", this.lookup_custom1.data);
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
