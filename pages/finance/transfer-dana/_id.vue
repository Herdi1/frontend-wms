<template>
  <section class="min-h-screen">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Transfer Dana
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
            <div class="w-full">
              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full"
                >
                  <div class="form-group">
                    <input-horizontal
                      label="Tanggal"
                      type="date"
                      name="tanggal"
                      :required="true"
                      v-model="form.tanggal"
                      :inputWidth="'w-[75%]'"
                    />
                  </div>
                  <ValidationProvider name="gudang_id" class="w-full mt-1">
                    <div v-if="!user.gudang_id" class="flex">
                      <label for="gudang_id" class="w-[40%]">Coa </label>
                      <v-select
                        label="nama_coa"
                        :loading="isLoadingGetCoa"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetCoa"
                        v-model="form.coa_id"
                        class="w-[60%]"
                        @input="(item) => onSelectCoaHead(item)"
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
                          v-if="lookup_custom1.data.length || search"
                        >
                          <span
                            v-if="lookup_custom1.current_page > 1"
                            @click="onGetCoa(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom1.last_page >
                              lookup_custom1.current_page
                            "
                            @click="onGetCoa(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <div class="form-group">
                    <input-horizontal
                      label="No Referensi"
                      type="text"
                      name="no_referensi"
                      :required="false"
                      v-model="form.no_referensi"
                      :inputWidth="'w-[75%]'"
                    />
                  </div>
                  <div class="flex justify-between">
                    <label for="" class="w-[40%]">Keterangan</label>
                    <textarea
                      name="keterangan"
                      v-model="form.keterangan"
                      class="w-[60%] border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div class="w-full flex justify-between items-center my-10">
                <h1 class="text-xl font-bold">Detail Transfer Dana</h1>
                <div class=" ">
                  <button
                    type="button"
                    @click="addTransferDetail"
                    class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">
                      Tambah Detail Transfer Dana
                    </p>
                  </button>
                </div>
              </div>
              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div
                  class="table-responsive overflow-y-hidden"
                  :class="
                    form.transfer_dana_details.length ? 'min-height:500px' : ''
                  "
                >
                  <table
                    class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                  >
                    <thead>
                      <tr class="text-sm uppercase text-nowrap">
                        <th class="w-[100px] border border-gray-300">Kode</th>
                        <th class="w-[250px] border border-gray-300">COA</th>
                        <th class="w-[200px] border border-gray-300">Gudang</th>
                        <th class="w-[200px] border border-gray-300">
                          Nominal
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          No Referensi
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Keterangan
                        </th>
                        <th class="w-20 border border-gray-300">Hapus</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in form.transfer_dana_details"
                        :key="i"
                        class="align-top border-t"
                      >
                        <td class="border border-gray-300">
                          {{ item.coa_id ? item.coa_id.kode_coa : "-" }}
                        </td>
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_coa"
                            :loading="isLoadingGetCoaBiaya"
                            :options="lookup_custom4.data"
                            :filterable="false"
                            @search="onGetCoaBiaya"
                            v-model="item.coa_id"
                            @input="(item) => onSelectCoaDetail(item, i)"
                          >
                            <template
                              slot="selected-option"
                              slot-scope="option"
                            >
                              <div
                                class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                              >
                                {{ option.nama_coa + " - " + option.kode_coa }}
                              </div>
                            </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_custom4.data.length || search"
                            >
                              <span
                                v-if="lookup_custom4.current_page > 1"
                                @click="onGetCoaBiaya(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom4.last_page >
                                  lookup_custom4.current_page
                                "
                                @click="onGetCoaBiaya(search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_gudang"
                            :loading="isLoadingGetGudang"
                            :options="lookup_custom2.data"
                            :filterable="false"
                            @search="onGetGudang"
                            v-model="item.gudang_id"
                            :reduce="(item) => item.gudang_id"
                          >
                            <template
                              slot="selected-option"
                              slot-scope="option"
                            >
                              <div
                                class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                              >
                                {{ option.nama_gudang }}
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
                                @click="onGetGudang(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom2.last_page >
                                  lookup_custom2.current_page
                                "
                                @click="onGetGudang(search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td class="border border-gray-300">
                          <money
                            v-model="item.nominal"
                            class="w-full pl-2 py-1 border rounded focus:outline-none"
                            @keydown.native="
                              $event.key === '-'
                                ? $event.preventDefault()
                                : null
                            "
                          />
                        </td>
                        <td class="border border-gray-300">
                          <input
                            type="text"
                            v-model="item.no_referensi"
                            class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                          />
                        </td>
                        <td class="border border-gray-300">
                          <textarea
                            name="keterangan"
                            v-model="item.keterangan"
                            class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                          ></textarea>
                        </td>
                        <td
                          class="text-center text-gray-600 border border-gray-300"
                        >
                          <i
                            class="fas fa-trash mx-auto"
                            style="cursor: pointer"
                            @click="onDeleteItem(i)"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                    <tr v-if="!form.transfer_dana_details.length > 0">
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
                  <div
                    class="w-full grid grid-cols-2 my-7 min-h-[200px] items-start"
                  >
                    <!-- <div class="form-group">
                      <label for="keterangan"> Keterangan </label>
                      <textarea
                        name="keterangan"
                        v-model="item.keterangan"
                        class="w-full h-10 border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                      ></textarea>
                    </div> -->
                    <div class="w-full mt-2">
                      <p class="w-[100px] mb-1">Total Nominal</p>
                      <div class="w-60 border border-gray-300 p-1 rounded-md">
                        {{ totalNominal | formatPrice }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <modal-footer-section
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
            />
          </form>
        </ValidationObserver>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Transfer Dana",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Transfer Dana",

      url: "finance/transfer-dana",
      form: {
        coa_id: "",
        no_referensi: "",
        tanggal: "",
        keterangan: "",
        transfer_dana_details: [],
      },
      default_form: {
        coa_id: "",
        no_referensi: "",
        tanggal: "",
        keterangan: "",
        transfer_dana_details: [],
      },

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isStopSearchCoaBiaya: false,
      isLoadingGetCoaBiaya: false,
      coa_biaya_search: "",

      isStopSearchDropping: false,
      isLoadingGetDropping: false,
      dropping_search: "",

      user: this.$auth.user,
    };
  },

  async created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    this.form.tanggal = formattedDate;
    try {
      if (this.isEditable) {
        let response = await this.$axios.get(
          "finance/transfer-dana/" + this.id
        );

        Object.keys(this.form).forEach((item) => {
          if (item != "transfer_dana_details") {
            this.form[item] = response.data[item];
          }
        });

        this.form.coa_id = response.data.coa;

        this.form.transfer_dana_details =
          response.data.transfer_dana_details.map((item) => {
            return {
              ...item,
              coa_id: item.coa ?? "",
            };
          });
        this.isLoadingPage = false;
      }
    } catch (error) {
      // console.log(error);
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchCoa();
    await this.onSearchCoaBiaya();
    await this.onSearchDropping();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_custom4",
    ]),

    totalNominal() {
      return this.form.transfer_dana_details.reduce((total, item) => {
        const nominal = parseFloat(item.nominal) || 0;
        return total + nominal;
      }, 0);
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    onGetCoa(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoa);

      this.isStopSearchCoa = setTimeout(() => {
        this.coa_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchCoa();
      }, 600);
    },

    async onSearchCoa() {
      if (!this.isLoadingGetCoa) {
        this.isLoadingGetCoa = true;

        await this.lookUp({
          url: "finance/coa/get-coa",
          lookup: "custom1",
          query:
            "?search=" +
            this.coa_search +
            "&tipe=HARTA" +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoa = false;
      }
    },

    onGetCoaBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoaBiaya);

      this.isStopSearchCoaBiaya = setTimeout(() => {
        this.coa_biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchCoaBiaya();
      }, 600);
    },

    async onSearchCoaBiaya() {
      if (!this.isLoadingGetCoaBiaya) {
        this.isLoadingGetCoaBiaya = true;

        await this.lookUp({
          url: "finance/jurnal/get-coa",
          lookup: "custom4",
          query:
            "?search=" +
            this.coa_biaya_search +
            "&tipe=HARTA" +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoaBiaya = false;
      }
    },

    resetCoaSearch() {
      this.coa_search = "";
      this.lookup_custom1.current_page = 1; // Reset ke halaman pertama
    },

    resetCoaBiayaSearch() {
      this.coa_biaya_search = "";
      this.lookup_custom4.current_page = 1; // Reset ke halaman pertama
    },

    async onSelectCoaHead(item) {
      if (item) {
        this.form.coa_id = item;
        this.resetCoaSearch();
        await this.onSearchCoa();
      } else {
        this.form.coa_id = "";
        this.resetCoaSearch();
      }
    },

    onSelectCoaDetail(item, index) {
      if (item) {
        this.form.transfer_dana_details[index].coa_id = item;
      } else {
        this.form.transfer_dana_details[index].coa_id = "";
      }
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom2",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    onGetDropping(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDropping);

      this.isStopSearchDropping = setTimeout(() => {
        this.dropping_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchDropping();
      }, 600);
    },

    async onSearchDropping() {
      if (!this.isLoadingGetDropping) {
        this.isLoadingGetDropping = true;

        await this.lookUp({
          url: "finance/pengajuan-dropping",
          lookup: "custom3",
          query:
            "?search=" +
            this.dropping_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDropping = false;
      }
    },

    addTransferDetail() {
      this.form.transfer_dana_details.push({
        coa_id: null,
        gudang_id: null,
        nominal: "",
        no_referensi: null,
        pengajuan_dropping_id: null,
        keterangan: null,
      });
    },

    onDeleteItem(index) {
      this.form.transfer_dana_details = this.form.transfer_dana_details.filter(
        (_, itemIndex) => index != itemIndex
      );
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "finance/transfer-dana";

      let formData = {
        ...this.form,
        coa_id:
          typeof this.form.coa_id === "object"
            ? this.form.coa_id.coa_id ?? ""
            : this.form.coa_id ?? "",
      };

      formData.transfer_dana_details = this.form.transfer_dana_details.map(
        (item) => {
          return {
            ...item,
            coa_id:
              typeof item.coa_id === "object"
                ? item.coa_id.coa_id ?? ""
                : item.coa_id ?? "",
          };
        }
      );

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
            "Berhasil " +
              (this.isEditable ? "Update" : "Tambah") +
              " Transfer Dana"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              transfer_dana_details: [],
            };
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err.message);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    formReset() {
      this.isLoadingForm = false;
      this.form = this.default_form;
      this.form.transfer_dana_details = [];
    },
  },
};
</script>
