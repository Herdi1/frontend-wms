<template>
  <section class="min-h-screen">
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Report</a>
      </li>
      <li>
        <a
          href="javascript:;"
          class="text-primary hover:underline before:content-['/']"
        >
          Inventory</a
        >
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>{{ this.title }}</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div
      class="relative p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
    >
      <div class="card-body">
        <div class="w-full mt-2 mb-3">
          <div class="w-full text-xl pl-2 mb-3 font-bold">Export Item</div>
          <div
            class="w-full grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 px-1"
          >
            <div class="flex w-full m-1 pr-1">
              <label for="" class="w-1/2">Download</label>
              <select
                name=""
                id=""
                v-model="parameters.params.download"
                class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
              </select>
            </div>

            <div class="flex w-full m-1 pr-1">
              <label class="w-[50%]" for="group_item_id_1">Gudang</label>
              <v-select
                label="nama_gudang"
                :loading="isLoadingGetGudang"
                :options="lookup_custom1.data"
                :filterable="false"
                @search="onGetGudang"
                v-model="parameters.form.gudang_id"
                @input="onSetGudang"
                class="w-[50%] bg-white"
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
                      lookup_custom1.last_page > lookup_custom1.current_page
                    "
                    @click="onGetGudang(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="flex w-full m-1 pr-1">
              <label class="w-[50%]" for="group_item_id_1">Region</label>
              <v-select
                label="nama_wilayah"
                :loading="isLoadingGetWilayah"
                :options="lookup_custom2.data"
                :filterable="false"
                @search="onGetWilayah"
                v-model="parameters.form.wilayah_id"
                @input="onSetWilayah"
                class="w-[50%] bg-white"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom2.data.length || search"
                >
                  <span
                    v-if="lookup_custom2.current_page > 1"
                    @click="onGetWilayah(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom2.last_page > lookup_custom2.current_page
                    "
                    @click="onGetWilayah(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>

            <div class="flex w-full m-1 pr-1">
              <label for="" class="w-1/2">Kategori</label>
              <select
                name=""
                id=""
                v-model="parameters.params.kategori"
                class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
              >
                <option value="pembelian">Pembelian</option>
                <option value="total_stok">Total Stok</option>
              </select>
            </div>

            <div
              class="flex w-full m-1 pr-1"
              v-if="
                // parameters.params.jenis === null ||
                parameters.params.kategori !== ''
              "
            >
              <label for="" class="w-1/2">Type</label>

              <select
                v-if="parameters.params.kategori === 'pembelian'"
                name=""
                id=""
                v-model="parameters.params.type"
                class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
              >
                <option value="rasio_damage_pembelian_per_barang">
                  Barang
                </option>
                <option value="rasio_damage_pembelian_per_wilayah">
                  Wilayah
                </option>
                <option value="rasio_damage_pembelian_per_cabang">
                  Cabang
                </option>
                <option value="rasio_damage_pembelian_per_supplier">
                  Supplier
                </option>
              </select>
              <select
                v-if="parameters.params.kategori === 'total_stok'"
                name=""
                id=""
                v-model="parameters.params.type"
                class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
              >
                <option value="rasio_damage_total_stok">Total Stok</option>
              </select>
            </div>

            <!-- <div
              class="flex w-full m-1 pr-1"
              v-if="
                parameters.params.kategori === 'pembelian'
              "
            >
              <label for="" class="w-1/2">Jenis</label>

              <select
                name=""
                id=""
                v-model="parameters.params.jenis_item"
                class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
              >
                <option value="group">Group Item</option>
                <option value="wilayah">Wilayah</option>
                <option value="gudang">Gudang</option>
                <option value="supplier">Supplier</option>
              </select>
            </div> -->

            <!-- <div
              class="flex w-full m-1 pr-1"
              v-if="parameters.params.jenis_item === 'gudang'"
            >
              <label class="w-[50%]" for="">Nama Gudang</label>
              <v-select
                label="nama_gudang"
                :loading="isLoadingGetGudang"
                :options="lookup_custom1.data"
                :filterable="false"
                @search="onGetGudang"
                v-model="parameters.params.nama_gudang"
                @input="onSetGudangJenis"
                class="w-[50%] bg-white"
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
                      lookup_custom1.last_page > lookup_custom1.current_page
                    "
                    @click="onGetGudang(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div> -->

            <!-- <div
              class="flex w-full m-1 pr-1"
              v-if="parameters.params.jenis_item === 'wilayah'"
            >
              <label class="w-[50%]" for="">Nama Wilayah</label>
              <v-select
                label="nama_wilayah"
                :loading="isLoadingGetWilayah"
                :options="lookup_custom2.data"
                :filterable="false"
                @search="onGetWilayah"
                v-model="parameters.params.nama_wilayah"
                @input="onSetWilayahJenis"
                class="w-[50%] bg-white"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom2.data.length || search"
                >
                  <span
                    v-if="lookup_custom2.current_page > 1"
                    @click="onGetWilayah(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom2.last_page > lookup_custom2.current_page
                    "
                    @click="onGetWilayah(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div> -->

            <!-- <div
              class="flex w-full m-1 pr-1"
              v-if="parameters.params.jenis_item === 'group'"
            >
              <label class="w-[50%]" for="">Nama Group Item</label>
              <v-select
                label="nama_group_item"
                :loading="isLoadingGetGroup"
                :options="lookup_custom3.data"
                :filterable="false"
                @search="onGetGroup"
                v-model="parameters.params.nama_group_item"
                @input="onSetGroup"
                class="w-[50%] bg-white"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom3.data.length || search"
                >
                  <span
                    v-if="lookup_custom3.current_page > 1"
                    @click="onGetGroup(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom3.last_page > lookup_custom3.current_page
                    "
                    @click="onGetGroup(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div> -->

            <!-- <div
              class="flex w-full m-1 pr-1"
              v-if="parameters.params.jenis_item === 'supplier'"
            >
              <label class="w-[50%]" for="">Nama Supplier</label>
              <v-select
                label="nama_supplier"
                :loading="isLoadingGetSupplier"
                :options="lookup_custom4.data"
                :filterable="false"
                @search="onGetSupplier"
                v-model="parameters.params.nama_supplier"
                @input="onSetSupplierJenis"
                class="w-[50%] bg-white"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom4.data.length || search"
                >
                  <span
                    v-if="lookup_custom4.current_page > 1"
                    @click="onGetSupplier(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom4.last_page > lookup_custom4.current_page
                    "
                    @click="onGetSupplier(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div> -->

            <div
              class="form-group w-full"
              v-if="parameters.params.kategori === 'pembelian'"
            >
              <input-horizontal
                label="Periode Awal"
                type="date"
                name="periode_awal"
                :isHorizontal="true"
                v-model="parameters.params.start_date"
                :required="false"
              />
            </div>
            <div
              class="form-group w-full"
              v-if="parameters.params.kategori === 'pembelian'"
            >
              <input-horizontal
                label="Periode Akhir"
                type="date"
                name="periode_akhir"
                :isHorizontal="true"
                v-model="parameters.params.end_date"
                :required="false"
              />
            </div>
          </div>

          <div class="flex gap-3 mt-3 justify-end">
            <button
              @click="onPreview"
              class="bg-green-600/80 hover:bg-green-600 shadow-lg hover:shadow-none p-2 text-white rounded-md"
            >
              <i class="fa fa-eye text-white font-bold mr-2"></i>
              Preview
            </button>
            <button
              @click="onExport"
              class="bg-blue-500/80 shadow hover:bg-blue-500 hover:shadow-none p-2 text-white rounded-md"
            >
              <i class="fa fa-file text-white font-bold mr-2"></i>
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Laporan Persediaan damage",
    };
  },

  created() {},

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchWilayah();
    await this.onSearchSupplier();
    await this.onSearchGroup();
  },

  data() {
    return {
      title: "Laporan Persediaan Damage",
      isLoadingData: false,

      parameters: {
        url: "report/persediaan-damage/export",
        params: {
          type: "",
          download: "pdf",
          nama_wilayah: "",
          nama_gudang: "",
          nama_group: "",
          nama_supplier: "",
          start_date: "",
          end_date: "",
          kategori: "",
          jenis_item: "",
        },
        form: {
          gudang_id: "",
          wilayah_id: "",
        },
      },
      user: this.$auth.user,

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchWilayah: false,
      isLoadingGetWilayah: false,
      wilayah_search: "",

      isStopSearchGroup: false,
      isLoadingGetGroup: false,
      group_search: "",

      isStopSearchSupplier: false,
      isLoadingGetSupplier: false,
      supplier_search: "",
    };
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_custom4",
    ]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "persediaan-damage"
        );

        let roles = {};

        if (JSON.parse(main_role.pivot.operators).includes("all")) {
          return this.default_roles;
        }

        JSON.parse(main_role.pivot.operators).forEach((item) => {
          roles[item.replace("-", "_")] = true;
        });

        return roles;
      }
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    ...mapMutations("moduleApi", ["set_data"]),

    formatDate(dateString) {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${year}-${month}`;
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

    onSetGudang(item) {
      this.parameters.form.gudang_id = item || "";
      // this.parameters.params.nama_gudang = item.nama_gudang || "";
      // this.parameters.params.kode_gudang = item.kode_gudang || "";
    },

    onSetGudangJenis(item) {
      this.parameters.params.nama_gudang = item || "";
    },

    onGetWilayah(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchWilayah);

      this.isStopSearchWilayah = setTimeout(() => {
        this.wilayah_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchWilayah();
      }, 600);
    },

    async onSearchWilayah() {
      if (!this.isLoadingGetWilayah) {
        this.isLoadingGetWilayah = true;

        await this.lookUp({
          url: "master/wilayah/get-wilayah",
          lookup: "custom2",
          query:
            "?search=" +
            this.wilayah_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetWilayah = false;
      }
    },

    onSetWilayah(item) {
      this.parameters.form.wilayah_id = item || "";
    },

    onSetWilayahJenis(item) {
      this.parameters.params.nama_wilayah = item || "";
    },

    onGetGroup(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroup);

      this.isStopSearchGroup = setTimeout(() => {
        this.group_search = search;

        if (typeof isNext !== "function") {
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
      if (!this.isLoadingGetGroup) {
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
      }
    },

    onSetGroup(item) {
      this.parameters.params.nama_group = item || "";
      console.log(item);
    },

    onGetSupplier(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSupplier);

      this.isStopSearchSupplier = setTimeout(() => {
        this.supplier_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchSupplier();
      }, 600);
    },

    async onSearchSupplier() {
      if (!this.isLoadingGetSupplier) {
        this.isLoadingGetSupplier = true;

        await this.lookUp({
          url: "master/supplier/get-supplier",
          lookup: "custom4",
          query:
            "?search=" +
            this.supplier_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSupplier = false;
      }
    },

    onSetSupplierJenis(item) {
      this.parameters.params.nama_supplier = item || "";
    },

    onPreview() {
      this.parameters.params.start_date = this.formatDate(
        this.parameters.params.start_date
      );
      this.parameters.params.end_date = this.formatDate(
        this.parameters.params.end_date
      );

      let url =
        this.parameters.url +
        "?download=" +
        this.parameters.params.download +
        "&type=" +
        this.parameters.params.type +
        "&gudang_id=" +
        this.parameters.form.gudang_id.gudang_id +
        "&wilayah_id=" +
        this.parameters.form.wilayah_id.wilayah_id +
        "&start_date=" +
        this.parameters.params.start_date +
        "&end_date=" +
        this.parameters.params.end_date +
        // "&jenis_item=" +
        // this.parameters.params.jenis_item +
        // "&nama_gudang=" +
        // this.parameters.params.nama_gudang.nama_gudang +
        // "&nama_wilayah=" +
        // this.parameters.params.nama_wilayah.nama_wilayah +
        // "&nama_group_item=" +
        // this.parameters.params.nama_group.nama_group_item +
        // "&nama_supplier=" +
        // this.parameters.params.nama_supplier.nama_supplier +
        "&mode=preview";

      if (this.parameters.params.download === "pdf") {
        let token = this.$cookiz
          .get("auth._token.local")
          .replace("Bearer ", "");
        window.open(process.env.API_URL + url + "&token=" + token, "_blank");
      } else {
        this.$toaster.error("Fitur Preview Hanya Tersedia Untuk PDF");
      }
    },

    async onExport() {
      this.parameters.params.start_date = this.formatDate(
        this.parameters.params.start_date
      );
      this.parameters.params.end_date = this.formatDate(
        this.parameters.params.end_date
      );
      try {
        let url =
          this.parameters.url +
          "?download=" +
          this.parameters.params.download +
          "&type=" +
          this.parameters.params.type +
          "&gudang_id=" +
          this.parameters.form.gudang_id.gudang_id +
          "&wilayah_id=" +
          this.parameters.form.wilayah_id.wilayah_id +
          "&start_date=" +
          this.parameters.params.start_date +
          "&end_date=" +
          this.parameters.params.end_date +
          "&jenis_item=" +
          this.parameters.params.jenis_item +
          "&nama_gudang=" +
          this.parameters.params.nama_gudang.nama_gudang +
          "&nama_wilayah=" +
          this.parameters.params.nama_wilayah.nama_wilayah +
          "&nama_group_item=" +
          this.parameters.params.nama_group.nama_group_item +
          "&nama_supplier=" +
          this.parameters.params.nama_supplier.nama_supplier;
        if (
          this.parameters.params.type &&
          this.parameters.form.gudang_id &&
          this.parameters.form.wilayah_id
        ) {
          this.$axios({
            method: "GET",
            url: url,
            responseType: "blob",
          }).then((res) => {
            const blob = new Blob([res.data], {
              type: res.headers["content-type"],
            });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);

            const disposition = res.headers["content-disposition"];
            let filename = "laporan_persediaan_damage";
            if (disposition && disposition.indexOf("filename=") !== 0) {
              filename = disposition
                .split("filename=")[1]
                .replace(/"/g, "")
                .trim();
            }

            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
          });
        } else {
          this.$toaster.error(
            "Silahkan pilih jenis dan tipe, gudang, wilyah terlebih dahulu"
          );
        }
      } catch (error) {
        console.log(error);
        this.$globalErrorToaster(this.$toaster, error);
      }
    },
  },
};
</script>
