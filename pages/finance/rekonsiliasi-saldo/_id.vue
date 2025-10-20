<template>
  <section class="min-h-screen">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Rekonsiliasi Saldo
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
                  <div class="form-group flex">
                    <label for="" class="w-2/5">Gudang</label>
                    <v-select
                      label="nama_gudang"
                      :loading="isLoadingGetGudang"
                      :options="lookup_custom2.data"
                      :filterable="false"
                      @search="onGetGudang"
                      v-model="form.gudang_id"
                      @input="onSelectGudang"
                      class="w-3/5"
                    >
                      <template slot="selected-option" slot-scope="option">
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
                  </div>

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
                    <label for="" class="w-2/5">Keterangan</label>
                    <textarea
                      name="keterangan"
                      v-model="form.keterangan"
                      class="w-3/5 border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div class="w-full flex justify-between items-center my-10">
                <h1 class="text-xl font-bold">Detail Rekonsiliasi Saldo</h1>
                <div class=" ">
                  <button
                    type="button"
                    @click="addDetails"
                    class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">Tambah Detail</p>
                  </button>
                </div>
              </div>

              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div class="table-responsive overflow-y-hidden">
                  <table
                    class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                    :class="
                      form.rekonsiliasi_saldo_details.length ? 'mb-80' : ''
                    "
                  >
                    <thead>
                      <tr class="text-sm uppercase text-nowrap">
                        <th class="w-60 border border-gray-300">Coa</th>
                        <th class="w-52 border border-gray-300">
                          Saldo Sistem
                        </th>
                        <th class="w-52 border border-gray-300">
                          Saldo Rekonsiliasi
                        </th>
                        <th class="w-52 border border-gray-300">Keterangan</th>
                        <!-- <th class="w-52 border border-gray-300">Rincian</th>
                        <th class="w-52 border border-gray-300">Jumlah</th>
                        <th class="w-52 border border-gray-300">Total</th> -->
                        <th class="w-20 border border-gray-300">Hapus</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template
                        v-for="(item, i) in form.rekonsiliasi_saldo_details"
                      >
                        <!-- Row utama untuk setiap detail rekonsiliasi -->
                        <tr :key="`main-${i}`" class="align-top">
                          <td class="border border-gray-300">
                            <v-select
                              label="nama_coa"
                              :loading="isLoadingGetCoa"
                              :options="lookup_custom1.data"
                              :filterable="false"
                              @search="onGetCoa"
                              v-model="item.coa_id"
                              @input="(item) => onSelectCoa(item, i)"
                            >
                              <template slot="option" slot-scope="option">
                                {{ option.nama_coa + " - " + option.kode_coa }}
                              </template>
                              <template
                                slot="selected-option"
                                slot-scope="option"
                              >
                                <div
                                  class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                                >
                                  {{
                                    option.nama_coa + " - " + option.kode_coa
                                  }}
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
                                >
                                  Sebelumnya
                                </span>
                                <span
                                  v-if="
                                    lookup_custom1.last_page >
                                    lookup_custom1.current_page
                                  "
                                  @click="onGetCoa(search, true)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >
                                  Selanjutnya
                                </span>
                              </li>
                            </v-select>
                            <p v-if="item.coa_id" class="mt-2">
                              {{ item.coa_id?.kode_coa ?? "" }} -
                              {{ item.coa_id?.nama_coa ?? "" }}
                            </p>
                          </td>
                          <td class="border border-gray-300 text-right">
                            {{
                              parseFloat(item?.saldo_sistem ?? 0) | formatPrice
                            }}
                          </td>
                          <td class="border border-gray-300">
                            <!-- Display saldo_rekonsiliasi (auto-calculated, read-only) -->
                            <div
                              class="w-full pl-2 py-1 border rounded bg-gray-50 text-right font-semibold"
                            >
                              {{
                                parseFloat(item.saldo_rekonsiliasi || 0)
                                  | formatPrice
                              }}
                            </div>
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
                              @click="onDeletedDetails(i)"
                            ></i>
                          </td>
                        </tr>

                        <tr
                          :key="`header-${i}`"
                          class="bg-gray-200 font-semibold"
                        >
                          <td class="border border-gray-300 px-2 py-1 pl-8">
                            Nominal
                          </td>
                          <td
                            class="border border-gray-300 px-2 py-1 text-center"
                          >
                            Jumlah
                          </td>
                          <td
                            class="border border-gray-300 px-2 py-1 text-center"
                            colspan="3"
                          >
                            Total
                          </td>
                        </tr>

                        <!-- Row untuk setiap rincian (nested array) -->
                        <tr
                          v-for="(itm, ind) in item.rincian"
                          :key="`rincian-${i}-${ind}`"
                          class="bg-gray-50"
                        >
                          <td class="border border-gray-300">
                            {{ parseFloat(itm.nominal ?? 0) | formatPrice }}
                          </td>
                          <td class="border border-gray-300">
                            <input
                              type="number"
                              v-model.number="itm.jumlah"
                              @input="calculateTotal(itm, i)"
                              class="w-full px-2 py-1 border rounded"
                              placeholder="Jumlah"
                              min="0"
                            />
                          </td>
                          <td class="border border-gray-300">
                            {{ parseFloat(itm.total ?? 0) | formatPrice }}
                          </td>
                          <td class="border border-gray-300"></td>
                        </tr>
                      </template>

                      <!-- Row jika data kosong -->
                      <tr v-if="!form.rekonsiliasi_saldo_details.length">
                        <td colspan="5" class="text-center">
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
import InputForm from "../../../components/InputForm/InputForm.vue";
export default {
  components: { InputForm },
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Rekonsiliasi Saldo",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Rekonsiliasi Saldo",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      user: this.$auth.user,

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isStopSearchPecahan: false,
      isLoadingGetPecahan: false,
      pecahan_search: "",

      form: {
        gudang_id: "",
        no_referensi: "",
        tanggal: "",
        keterangan: "",
        rekonsiliasi_saldo_details: [],
      },
      default_form: {
        gudang_id: "",
        no_referensi: "",
        tanggal: "",
        keterangan: "",
        rekonsiliasi_saldo_details: [],
      },
      pecahan: [],
    };
  },

  async created() {
    this.form.tanggal = this.formattedDate();
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(
          `finance/rekonsiliasi-saldo/${this.id}`
        );
        Object.keys(this.form).forEach((item) => {
          if (item != "rekonsiliasi_saldo_details") {
            this.form[item] = res.data[item];
          }
        });
        this.form.rekonsiliasi_saldo_details =
          res.data.rekonsiliasi_saldo_details.map((item) => {
            return {
              ...item,
              coa_id: item.coa ?? "",
            };
          });
        this.form.gudang_id = res.data.gudang;
        this.isLoadingPage = false;
      }
    } catch (error) {
      console.log(error);
      // this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchGudang();
    if (!this.isEditable && this.lookup_custom2.data.length > 0) {
      this.onSelectGudang(this.lookup_custom2.data[0]);
    }
    await this.onSearchCoa();
    await this.onSearchPecahan();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
    ]),

    // totalNominal(index) {
    //   if (this.form.rekonsiliasi_saldo_details.length === 0) return 0;

    //   let totalPecahan =
    //     this.form.rekonsiliasi_saldo_details[index]?.pecahan_id?.nominal ?? 0;
    //   let jumlah = this.form.rekonsiliasi_saldo_details[index]?.jumlah ?? 0;
    //   return totalPecahan * jumlah;
    // },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    formattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
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
          url: "master/gudang/get-gudang-user",
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

    onSelectGudang(item) {
      if (item) {
        this.form.gudang_id = item;
      } else {
        this.form.gudang_id = "";
      }
    },

    calculateTotal(itm, itemIndex) {
      const nominal = parseFloat(itm.nominal || 0);
      const jumlah = parseFloat(itm.jumlah || 0);
      this.$set(itm, "total", nominal * jumlah);

      // Update saldo_rekonsiliasi untuk item ini
      this.updateItemSaldoRekonsiliasi(itemIndex);
    },

    // Method untuk update saldo_rekonsiliasi per item
    updateItemSaldoRekonsiliasi(itemIndex) {
      const item = this.form.rekonsiliasi_saldo_details[itemIndex];
      const total = item.rincian.reduce((sum, itm) => {
        return sum + parseFloat(itm.total || 0);
      }, 0);

      this.$set(item, "saldo_rekonsiliasi", total);
    },

    // Grand total untuk semua item
    calculateGrandTotal() {
      return this.form.rekonsiliasi_saldo_details.reduce((acc, detail) => {
        return acc + parseFloat(detail.saldo_rekonsiliasi || 0);
      }, 0);
    },

    addDetails() {
      this.form.rekonsiliasi_saldo_details.push({
        coa_id: "",
        saldo_sistem: 0,
        saldo_rekonsiliasi: "",
        keterangan: "",
        rincian: this.lookup_custom3.data.map((item) => ({
          pecahan_id: item.pecahan_id,
          nominal: item.nominal,
          jumlah: 0,
          total: 0,
        })),
      });
    },

    onDeletedDetails(index) {
      this.form.rekonsiliasi_saldo_details =
        this.form.rekonsiliasi_saldo_details.filter(
          (_, itemIndex) => index != itemIndex
        );
    },

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
            "&jenis_coa=NON_PUSAT" +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoa = false;
      }
    },

    onSelectCoa(item, index) {
      if (item) {
        this.form.rekonsiliasi_saldo_details[index].coa_id = item;
        this.getSaldoSistem(index);
      } else {
        this.form.rekonsiliasi_saldo_details[index].coa_id = "";
      }
    },

    onGetPecahan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPecahan);

      this.isStopSearchPecahan = setTimeout(() => {
        this.pecahan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchPecahan();
      }, 600);
    },

    async onSearchPecahan() {
      if (!this.isLoadingGetPecahan) {
        this.isLoadingGetPecahan = true;

        await this.lookUp({
          url: "master/pecahan/get-pecahan",
          lookup: "custom3",
          query:
            "?search=" +
            this.pecahan_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPecahan = false;
      }
    },

    onSelectPecahan(item, index) {
      if (item) {
        this.form.rekonsiliasi_saldo_details[index].pecahan_id = item;
      } else {
        this.form.rekonsiliasi_saldo_details[index].pecahan_id = "";
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "finance/rekonsiliasi-saldo";
      let formData = {
        ...this.form,
        gudang_id:
          typeof this.form.gudang_id === "object"
            ? this.form.gudang_id.gudang_id ?? ""
            : this.form.gudang_id ?? "",
      };

      formData.rekonsiliasi_saldo_details =
        this.form.rekonsiliasi_saldo_details.map((item) => {
          return {
            ...item,
            coa_id:
              typeof item.coa_id === "object"
                ? item.coa_id.coa_id ?? ""
                : item.coa_id ?? "",
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
            "Berhasil " +
              (this.isEditable ? "Update" : "Tambah") +
              " Rekonsiliasi Saldo"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              rekonsiliasi_saldo_details: [],
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
      this.form = {
        no_referensi: "",
        keterangan: "",
        rekonsiliasi_saldo_details: [],
      };
      this.form.tanggal = this.formattedDate();
      this.form.gudang_id = this.lookup_custom2.data[0];
    },

    getSaldoSistem(index) {
      let gudangId = this.form.gudang_id?.gudang_id ?? "";
      let coaId =
        this.form.rekonsiliasi_saldo_details[index].coa_id?.coa_id ?? "";
      this.$axios
        .get(
          `finance/rekonsiliasi-saldo/get-balance-sistem/${coaId}/${gudangId}`
        )
        .then((res) => {
          this.form.rekonsiliasi_saldo_details[index].saldo_sistem = res.data;
          // console.log(res);
        });
    },
  },
};
</script>
