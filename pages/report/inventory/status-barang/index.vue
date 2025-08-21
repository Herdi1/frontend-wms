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
              <label class="w-[50%]" for="provinsi"
                >Provinsi <span class="text-danger">*</span></label
              >
              <v-select
                label="nama_provinsi"
                :loading="isLoadingGetProvinsi"
                :options="lookup_custom3.data"
                :filterable="false"
                @search="onGetProvinsi"
                v-model="parameters.form.provinsi_id"
                @input="(item) => onSetProvinsi(item)"
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
                    @click="onGetProvinsi(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom3.last_page > lookup_custom3.current_page
                    "
                    @click="onGetProvinsi(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="flex w-full m-1 pr-1">
              <label class="w-[50%]" for="region"
                >Region <span class="text-danger">*</span></label
              >
              <v-select
                label="nama_wilayah"
                :loading="isLoadingGetWilayah"
                :options="lookup_custom2.data"
                :filterable="false"
                @search="onGetWilayah"
                v-model="parameters.form.wilayah_id"
                @input="onSetWilayah"
                class="w-[50%] bg-white"
                disabled
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
              <label class="w-[50%]" for="group_item_id_1"
                >Gudang <span class="text-danger">*</span></label
              >
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
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Laporan Status Stok",
    };
  },

  async mounted() {
    await this.onSearchProvinsi();
  },

  data() {
    return {
      title: "Laporan Status Barang",
      isLoadingData: false,

      parameters: {
        url: "report/status-barang/export",
        params: {
          download: "pdf",
          nama_wilayah: "",
          kode_gudang: "",
          nama_gudang: "",
        },
        form: {
          gudang_id: "",
          wilayah_id: "",
          provinsi_id: "",
        },
      },

      user: this.$auth.user,

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchWilayah: false,
      isLoadingGetWilayah: false,
      wilayah_search: "",

      isStopSearchProvinsi: false,
      isLoadingGetProvinsi: false,
      provinsi_search: "",
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
    ]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "status-barang"
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

    onGetProvinsi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProvinsi);

      this.isStopSearchProvinsi = setTimeout(() => {
        this.provinsi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchProvinsi();
      }, 600);
    },

    async onSearchProvinsi() {
      if (!this.isLoadingGetProvinsi) {
        this.isLoadingGetProvinsi = true;

        await this.lookUp({
          url: "master/provinsi/get-provinsi",
          lookup: "custom3",
          query:
            "?search=" +
            this.provinsi_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProvinsi = false;
      }
    },

    async onSetProvinsi(item) {
      if (item) {
        this.parameters.form.provinsi_id = item;
        this.parameters.form.wilayah_id = item.wilayah;
        await this.onSearchGudang();
        await this.onSearchWilayah();
      } else {
        this.parameters.form.provinsi_id = "";
        this.parameters.form.wilayah_id = "";
      }
    },

    onPreview() {
      if (
        !this.parameters.form.gudang_id &&
        !this.parameters.form.provinsi_id
      ) {
        this.$toaster.error("Mohon Pilih Gudang dan Provinsi Terlebih Dahulu");
        return;
      }

      if (this.parameters.params.download !== "pdf") {
        this.$toaster.error("Fitur Preview Hanya Tersedia Untuk PDF");
        return;
      }

      let url =
        this.parameters.url +
        "?download=" +
        this.parameters.params.download +
        "&gudang_id=" +
        this.parameters.form.gudang_id.gudang_id +
        "&wilayah_id=" +
        this.parameters.form.wilayah_id.wilayah_id +
        "&provinsi_id=" +
        this.parameters.form.provinsi_id.provinsi_id +
        "&mode=preview";

      let token = this.$cookiz.get("auth._token.local").replace("Bearer ", "");
      window.open(process.env.API_URL + url + "&token=" + token, "_blank");
    },

    async onExport() {
      if (
        !this.parameters.form.gudang_id &&
        !this.parameters.form.provinsi_id
      ) {
        this.$toaster.error("Mohon Pilih Gudang dan Provinsi Terlebih Dahulu");
        return;
      }

      let token = this.$cookiz.get("auth._token.local").replace("Bearer ", "");

      try {
        let url =
          this.parameters.url +
          "?download=" +
          this.parameters.params.download +
          "&gudang_id=" +
          this.parameters.form.gudang_id.gudang_id +
          "&wilayah_id=" +
          this.parameters.form.wilayah_id.wilayah_id +
          "&provinsi_id=" +
          this.parameters.form.provinsi_id.provinsi_id +
          "&token=" +
          token;

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
          let filename = "laporan_status_barang";
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
      } catch (error) {
        this.$globalErrorToaster(this.$toaster, error);
      }
    },
  },
};
</script>
