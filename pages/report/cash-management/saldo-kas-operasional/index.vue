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
              <label for="" class="w-1/2"
                >Tipe <span class="text-danger">*</span></label
              >
              <select
                name=""
                id=""
                v-model="parameters.params.type"
                class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
              >
                <option value="historis">Historis</option>
                <option value="laporan">Laporan</option>
              </select>
            </div>
            <div
              class="flex w-full m-1 pr-1"
              v-if="parameters.params.type !== 'laporan'"
            >
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
            <div class="flex w-full m-1 pr-1">
              <label class="w-[50%]" for="group_item_id_1"
                >Coa <span class="text-danger">*</span></label
              >
              <v-select
                label="nama_coa"
                :loading="isLoadingGetCoa"
                :options="lookup_custom2.data"
                :filterable="false"
                @search="onGetCoa"
                v-model="parameters.form.coa_id"
                @input="onSetCoa"
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
                    @click="onGetCoa(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom2.last_page > lookup_custom2.current_page
                    "
                    @click="onGetCoa(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="form-group w-full">
              <input-horizontal
                label="Periode Awal"
                type="date"
                name="periode_awal"
                :isHorizontal="true"
                v-model="parameters.params.start_date"
                :required="true"
              />
            </div>
            <div class="form-group w-full">
              <input-horizontal
                label="Periode Akhir"
                type="date"
                name="periode_akhir"
                :isHorizontal="true"
                v-model="parameters.params.end_date"
                :required="true"
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
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Laporan Saldo Kas Operasional",
    };
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchCoa();
  },

  data() {
    return {
      title: "Laporan Saldo Kas Operasional",
      isLoadingData: false,

      parameters: {
        url: "report/saldo-kas-operasional/export",
        params: {
          type: "",
          download: "pdf",
          start_date: "",
          end_date: "",
        },
        form: {
          gudang_id: "",
          coa_id: "",
        },
      },

      user: this.$auth.user,

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",
    };
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
    ]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "saldo-kas-operasional"
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

    onSetCoa(item) {
      this.parameters.form.coa_id = item || "";
    },

    onPreview() {
      if (this.parameters.params.type === "") {
        this.$toaster.error("Mohon Pilih Type Terlebih Dahulu");
        return;
      }

      if (this.parameters.params.type === "laporan") {
        this.parameters.form.gudang_id = "";
      } else if (this.parameters.params.type === "historis") {
        if (
          !this.parameters.form.gudang_id ||
          (typeof this.parameters.form.gudang_id === "object" &&
            !this.parameters.form.gudang_id.gudang_id)
        ) {
          this.$toaster.error(
            "Mohon Pilih Gudang Terlebih Dahulu untuk Laporan Historis"
          );
          return;
        }
      }

      if (
        !this.parameters.form.coa_id ||
        !this.parameters.params.start_date ||
        !this.parameters.params.end_date
      ) {
        this.$toaster.error(
          "Mohon Pilih COA, Periode Awal dan Akhir Terlebih Dahulu"
        );
        return;
      }

      if (this.parameters.params.download !== "pdf") {
        this.$toaster.error("Fitur Preview Hanya Tersedia Untuk PDF");
        return;
      }

      let gudangId = "";
      if (
        this.parameters.params.type === "historis" ||
        this.parameters.form.gudang_id ||
        this.parameters.form.gudang_id.gudang_id
      ) {
        gudangId = this.parameters.form.gudang_id.gudang_id;
      }
      let url =
        this.parameters.url +
        "?download=" +
        this.parameters.params.download +
        "&type=" +
        this.parameters.params.type +
        "&gudang_id=" +
        gudangId +
        "&coa_id=" +
        this.parameters.form.coa_id.coa_id +
        "&start_date=" +
        this.parameters.params.start_date +
        "&end_date=" +
        this.parameters.params.end_date +
        "&mode=preview";

      let token = this.$cookiz.get("auth._token.local").replace("Bearer ", "");
      window.open(process.env.API_URL + url + "&token=" + token, "_blank");
    },

    async onExport() {
      if (this.parameters.params.type === "laporan") {
        this.parameters.form.gudang_id = "";
      } else if (this.parameters.params.type === "historis") {
        if (
          !this.parameters.form.gudang_id ||
          (typeof this.parameters.form.gudang_id === "object" &&
            !this.parameters.form.gudang_id.gudang_id)
        ) {
          this.$toaster.error(
            "Mohon Pilih Gudang Terlebih Dahulu untuk Laporan Historis"
          );
          return;
        }
      }

      if (
        !this.parameters.form.coa_id ||
        !this.parameters.params.start_date ||
        !this.parameters.params.end_date
      ) {
        this.$toaster.error(
          "Mohon Pilih COA, Periode Awal dan Akhir Terlebih Dahulu"
        );
        return;
      }

      let token = this.$cookiz.get("auth._token.local").replace("Bearer ", "");

      try {
        let gudangId = "";
        if (
          this.parameters.params.type === "historis" ||
          this.parameters.form.gudang_id ||
          this.parameters.form.gudang_id.gudang_id
        ) {
          gudangId = this.parameters.form.gudang_id.gudang_id;
        }

        let url =
          this.parameters.url +
          "?download=" +
          this.parameters.params.download +
          "&type=" +
          this.parameters.params.type +
          "&gudang_id=" +
          gudangId +
          "&coa_id=" +
          this.parameters.form.coa_id.coa_id +
          "&start_date=" +
          this.parameters.params.start_date +
          "&end_date=" +
          this.parameters.params.end_date +
          "&token=" +
          token;

        this.$axios({
          method: "GET",
          url: url,
          responseType: "blob",
        })
          .then((res) => {
            const blob = new Blob([res.data], {
              type: res.headers["content-type"],
            });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);

            const disposition = res.headers["content-disposition"];
            let filename = "laporan_saldo_kas_operasional";
            if (disposition && disposition.indexOf("filename=") !== -1) {
              filename = disposition
                .split("filename=")[1]
                .replace(/"/g, "")
                .trim();
            }

            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
          })
          .catch((err) => {
            console.log(err);
            this.$globalErrorToaster(this.$toaster, err);
          });
      } catch (error) {
        this.$globalErrorToaster(this.$toaster, error);
      }
    },
  },
};
</script>
