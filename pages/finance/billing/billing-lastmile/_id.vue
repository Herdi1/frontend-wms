<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Billing Lastmile
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
                      :disabled="isEditable"
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
                        :options="lookup_custom2.data"
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
                          v-if="lookup_custom2.data.length || search"
                        >
                          <span
                            v-if="lookup_custom2.current_page > 1"
                            @click="onGetPelanggan(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom2.last_page >
                              lookup_custom2.current_page
                            "
                            @click="onGetPelanggan(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <!-- <div class="form-group flex items-center">
                    <label for="pelanggan_id" class="w-1/2"
                      >Jenis <span class="text-danger">*</span></label
                    >
                    <select
                      :disabled="isEditable"
                      name="jenis"
                      id="jenis"
                      v-model="form.jenis"
                      class="w-1/2 p-1 rounded-sm outline-none border border-gray-300"
                    >
                      <option value="inbound">Inbound</option>
                      <option value="outbound">Outbound</option>
                    </select>
                  </div> -->
                  <ValidationProvider
                    name="tipe_ppn_id"
                    class="w-full mt-1 mb-2"
                  >
                    <div
                      slot-scope="{ errors, valid }"
                      class="flex items-center"
                    >
                      <label for="tipe_ppn_id" class="w-1/2"
                        >Tipe PPN <span class="text-danger">*</span></label
                      >
                      <v-select
                        :disabled="isEditable"
                        label="nama_tipe_pajak"
                        :loading="isLoadingGetTipePPN"
                        :options="lookup_custom3.data"
                        :filterable="false"
                        @search="onGetTipePPN"
                        v-model="form.tipe_ppn_id"
                        class="w-1/2"
                        @input="onSelectTipePPN"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom3.data.length || search"
                        >
                          <span
                            v-if="lookup_custom3.current_page > 1"
                            @click="onGetTipePPN(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom3.last_page >
                              lookup_custom3.current_page
                            "
                            @click="onGetTipePPN(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    name="mata_uang_id"
                    class="w-full mt-1 mb-2"
                  >
                    <div
                      slot-scope="{ errors, valid }"
                      class="flex items-center"
                    >
                      <label for="mata_uang_id" class="w-1/2"
                        >Mata Uang <span class="text-danger">*</span></label
                      >
                      <v-select
                        :disabled="isEditable"
                        label="nama_mata_uang"
                        :loading="isLoadingGetMataUang"
                        :options="lookup_custom5.data"
                        :filterable="false"
                        @search="onGetMataUang"
                        v-model="form.mata_uang_id"
                        class="w-1/2"
                        @input="onSelectMataUang"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom5.data.length || search"
                        >
                          <span
                            v-if="lookup_custom5.current_page > 1"
                            @click="onGetMataUang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom5.last_page >
                              lookup_custom5.current_page
                            "
                            @click="onGetMataUang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <div class="form-group">
                    <input-horizontal
                      :disabled="isEditable"
                      label="Periode Awal"
                      type="date"
                      name="periode_awal"
                      v-model="form.periode_awal"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      :disabled="isEditable"
                      label="Periode Akhir"
                      type="date"
                      name="periode_akhir"
                      v-model="form.periode_akhir"
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
                  <div class="form-group flex items-center" v-if="isEditable">
                    <label for="pelanggan_id" class="w-1/2"
                      >Status Billing</label
                    >
                    <select
                      name="status_billing"
                      id="status_billing"
                      v-model="form.status_billing"
                      class="w-1/2 p-1 rounded-sm outline-none border border-gray-300"
                    >
                      <option value="DIAJUKAN">Diajukan</option>
                      <option value="PROSES">Proses</option>
                      <option value="SELESAI">Selesai</option>
                      <option value="BATAL">Batal</option>
                    </select>
                  </div>
                </div>

                <div class="w-full flex justify-between items-center mt-5">
                  <h1 class="text-lg font-bold">Detail Billing TKBM</h1>
                  <div class=" ">
                    <!-- v-if="self.form.sumber_data === 'NON'" -->
                    <button
                      v-if="!isEditable"
                      type="button"
                      @click="addDetailBillingLastmile"
                      class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                    >
                      <i class="fas fa-plus"></i>
                      <p class="text-xs font-medium">Tambah Detail</p>
                    </button>
                  </div>
                </div>

                <div class="table-responsive mb-5">
                  <table
                    class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                  >
                    <!-- :class="
                      form.billing_lastmile_details.length ? 'mb-[300px]' : ''
                    " -->
                    <thead>
                      <tr class="text-sm uppercase text-nowrap">
                        <th class="w-[200px] border border-gray-300">Lokasi</th>
                        <th class="w-[200px] border border-gray-300">
                          Kode Transaksi
                        </th>
                        <!-- <th class="w-[200px] border border-gray-300">
                          Dasar Perhitungan
                        </th>
                        <th class="w-[200px] border border-gray-300">Berat</th>
                        <th class="w-[200px] border border-gray-300">Volume</th> -->
                        <th class="w-[200px] border border-gray-300">Jumlah</th>
                        <th class="w-[200px] border border-gray-300">
                          Nominal
                        </th>
                        <!-- <th class="w-[200px] border border-gray-300">Pajak</th>
                        <th class="w-[200px] border border-gray-300">DPP</th>
                        <th class="w-[200px] border border-gray-300">
                          Harga Setelah Pajak
                        </th> -->
                        <th class="w-[200px] border border-gray-300">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in form.billing_lastmile_details"
                        :key="index"
                        style="border-top: 0.5px solid lightgray"
                        class="align-top mx-0"
                      >
                        <td class="border border-gray-300">
                          <p>{{ item.lokasi.nama_lokasi }}</p>
                          <p>{{ item.lokasi.kode_lokasi }}</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>
                            {{ item.kode_referensi }}
                          </p>
                        </td>
                        <!-- <td class="border border-gray-300">
                          {{ item.dasar_perhitungan }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.berat }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.volume }}
                        </td> -->
                        <td class="border border-gray-300">
                          {{ item.jumlah }}
                        </td>
                        <td class="border border-gray-300 text-right">
                          <p>Rp {{ item.nominal_satuan | formatPrice }}</p>
                        </td>
                        <!-- <td class="border border-gray-300 text-right">
                          <p>Rp {{ item.tax ?? 0 | formatPrice }}</p>
                        </td>
                        <td class="border border-gray-300 text-right">
                          <p>Rp {{ item.dpp ?? 0 | formatPrice }}</p>
                        </td>
                        <td class="border border-gray-300 text-right">
                          <p>
                            Rp {{ item.harga_setelah_pajak ?? 0 | formatPrice }}
                          </p>
                        </td> -->
                        <td class="border border-gray-300 text-right">
                          <p>Rp {{ item.total ?? 0 | formatPrice }}</p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="border border-gray-300 text-right font-bold"
                          colspan="4"
                        >
                          Total
                        </td>
                        <td class="border border-gray-300 text-right">
                          Rp {{ form.total ?? 0 | formatPrice }}
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="border border-gray-300 text-right font-bold"
                          colspan="4"
                        >
                          Pajak
                        </td>
                        <td class="border border-gray-300 text-right">
                          Rp {{ form.tax ?? 0 | formatPrice }}
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="border border-gray-300 text-right font-bold"
                          colspan="4"
                        >
                          Grand Total
                        </td>
                        <td class="border border-gray-300 text-right">
                          Rp {{ form.grand_total ?? 0 | formatPrice }}
                        </td>
                      </tr>
                    </tbody>
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
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Billing Lastmile",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

      title: "Billing Lastmile",

      url: "finance/billing-lastmile",
      form: {
        billing_lastmile_id: "",
        gudang_id: "",
        pelanggan_id: "",
        tipe_ppn_id: "",
        periode_awal: "",
        periode_akhir: "",
        kode_billing_lastmile: "",
        total: "",
        tax: "",
        grand_total: "",
        keterangan: "",
        status_billing: "DIAJUKAN",
        billing_lastmile_details: [],
      },
      default_form: {
        billing_lastmile_id: "",
        gudang_id: "",
        pelanggan_id: "",
        tipe_ppn_id: "",
        periode_awal: "",
        periode_akhir: "",
        kode_billing_lastmile: "",
        total: "",
        tax: "",
        grand_total: "",
        keterangan: "",
        billing_lastmile_details: [],
      },

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isStopSearchTipePPN: false,
      isLoadingGetTipePPN: false,
      tipe_ppn_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      isStopSearchMataUang: false,
      isLoadingGetMataUang: false,
      mata_uang_search: "",

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
        let response = await this.$axios.get(
          "finance/billing-lastmile/" + this.id
        );

        Object.keys(this.form).forEach((item) => {
          if (item != "billing_lastmile_details") {
            this.form[item] = response.data[item];
          }
        });

        this.form.gudang_id = response.data.gudang;
        this.form.pelanggan_id = response.data.pelanggan;
        this.form.tipe_ppn_id = response.data.tipe_ppn;
        this.form.mata_uang_id = response.data.mata_uang;

        this.form.billing_lastmile_details =
          response.data.billing_lastmile_details.map((item) => {
            return {
              ...item,
              billing_lastmile_detail_id: item || "",
              tax:
                this.form.tipe_ppn_id.tipe_ppn_id == 3
                  ? parseFloat(item.nominal_satuan) -
                    parseFloat(item.nominal_satuan) /
                      (parseFloat(this.form.tipe_ppn_id.nilai) / 100 + 1)
                  : this.form.tipe_ppn_id.tipe_ppn_id == 2
                  ? (parseFloat(item.nominal_satuan) *
                      parseFloat(this.form.tipe_ppn_id.nilai)) /
                    100
                  : 0,
              dpp:
                this.form.tipe_ppn_id.tipe_ppn_id == 3
                  ? parseFloat(item.nominal_satuan) - parseFloat(item.tax)
                  : parseFloat(item.nominal_satuan),
              dpp:
                this.form.tipe_ppn_id.tipe_ppn_id == 3
                  ? parseFloat(item.nominal_satuan) -
                    (parseFloat(item.nominal_satuan) -
                      parseFloat(item.nominal_satuan) /
                        (parseFloat(this.form.tipe_ppn_id.nilai) / 100 + 1))
                  : parseFloat(item.nominal_satuan),
              harga_setelah_pajak:
                this.form.tipe_ppn_id.tipe_ppn_id == 3
                  ? parseFloat(item.nominal_satuan) -
                    (parseFloat(item.nominal_satuan) -
                      parseFloat(item.nominal_satuan) /
                        (parseFloat(this.form.tipe_ppn_id.nilai) / 100 + 1)) +
                    (parseFloat(item.nominal_satuan) -
                      parseFloat(item.nominal_satuan) /
                        (parseFloat(this.form.tipe_ppn_id.nilai) / 100 + 1))
                  : this.form.tipe_ppn_id.tipe_ppn_id == 2
                  ? (parseFloat(item.nominal_satuan) *
                      parseFloat(this.form.tipe_ppn_id.nilai)) /
                      100 +
                    parseFloat(item.nominal_satuan)
                  : parseFloat(item.nominal_satuan),
              total:
                parseFloat(item.nominal_satuan) * parseFloat(item.jumlah) ||
                item.total,
            };
          });

        this.form.total = 0;
        this.form.billing_lastmile_details.forEach((item) => {
          this.form.total += item.total;
        });
        this.form.tax = 0;
        this.form.billing_lastmile_details.forEach((item) => {
          let totalTax =
            (parseFloat(item.total) * parseFloat(this.form.tipe_ppn_id.nilai)) /
            100;
          this.form.tax += totalTax;
        });
        this.form.grand_total = 0;
        this.form.grand_total =
          this.form.tipe_ppn_id.tipe_ppn_id == 3
            ? this.form.total
            : this.form.total + this.form.tax;

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/finance/billing/billing-lastmile");
    }
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchPelanggan();
    await this.onSearchTipePPN();
    await this.onSearchMataUang();
    if (this.lookup_custom1.data && !this.isEditable) {
      this.onSelectGudang(this.lookup_custom1.data[0]);
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
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "finance/billing-lastmile";

      let formData = {
        ...this.form,
        gudang_id:
          typeof this.form.gudang_id === "object"
            ? this.form.gudang_id.gudang_id
            : this.form.gudang_id,
        pelanggan_id:
          typeof this.form.pelanggan_id === "object"
            ? this.form.pelanggan_id.pelanggan_id
            : this.form.pelanggan_id,
        tipe_ppn_id:
          typeof this.form.tipe_ppn_id === "object"
            ? this.form.tipe_ppn_id.tipe_ppn_id
            : this.form.tipe_ppn_id,
        mata_uang_id:
          typeof this.form.mata_uang_id === "object"
            ? this.form.mata_uang_id.mata_uang_id
            : this.form.mata_uang_id,
      };

      formData.billing_lastmile_details = formData.billing_lastmile_details.map(
        (item) => {
          return {
            ...item,
            billing_lastmile_detail_id:
              typeof this.form.billing_lastmile_detail_id === "object"
                ? this.form.billing_lastmile_detail_id
                    .billing_lastmile_detail_id
                : "",
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
              " Billing TKBM"
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
          url: "master/gudang/get-gudang-user",
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

    //pelanggan
    onGetPelanggan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPelanggan);

      this.isStopSearchPelanggan = setTimeout(() => {
        this.pelanggan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchPelanggan();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "custom2",
          query:
            "?search=" +
            this.pelanggan_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPelanggan = false;
      }
    },

    onSelectPelanggan(item) {
      this.form.pelanggan_id = item || "";
    },

    //tipe ppn
    onGetTipePPN(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchTipePPN);

      this.isStopSearchTipePPN = setTimeout(() => {
        this.tipe_ppn_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchTipePPN();
      }, 600);
    },

    async onSearchTipePPN() {
      if (!this.isLoadingGetTipePPN) {
        this.isLoadingGetTipePPN = true;

        await this.lookUp({
          url: "master/tipe-ppn/get-tipe-ppn",
          lookup: "custom3",
          query:
            "?search=" +
            this.tipe_ppn_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetTipePPN = false;
      }
    },

    onSelectTipePPN(item) {
      this.form.tipe_ppn_id = item || "";
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
      this.form.billing_lastmile_details[index].item_gudang_id = item || "";
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

    async addDetailBillingLastmile() {
      const tagihanBilling = await this.$axios.get(
        "/finance/billing-lastmile/get-tagihan-billing-lastmile",
        {
          params: {
            gudang_id: this.form.gudang_id.gudang_id,
            periode_awal: this.form.periode_awal,
            periode_akhir: this.form.periode_akhir,
            pelanggan_id: this.form.pelanggan_id.pelanggan_id,
            jenis: this.form.jenis,
          },
        }
      );

      this.form.billing_lastmile_details = tagihanBilling.data.map((item) => {
        return {
          ...item,
          referensi_id: item.tagihan_lastmile_id,
          kode_referensi: item.shipment.kode_shipment,
          // tax:
          //   this.form.tipe_ppn_id.tipe_ppn_id == 3
          //     ? parseFloat(item.nominal_satuan) -
          //       parseFloat(item.nominal_satuan) /
          //         (parseFloat(this.form.tipe_ppn_id.nilai) / 100 + 1)
          //     : this.form.tipe_ppn_id.tipe_ppn_id == 2
          //     ? (item.nominal_satuan *
          //         parseFloat(this.form.tipe_ppn_id.nilai)) /
          //       100
          //     : 0,
          // dpp:
          //   this.form.tipe_ppn_id.tipe_ppn_id == 3
          //     ? item.nominal_satuan -
          //       (parseFloat(item.nominal_satuan) -
          //         parseFloat(item.nominal_satuan) /
          //           (parseFloat(this.form.tipe_ppn_id.nilai) / 100 + 1))
          //     : item.nominal_satuan,
          // harga_setelah_pajak:
          //   this.form.tipe_ppn_id.tipe_ppn_id == 3
          //     ? item.nominal_satuan -
          //       (parseFloat(item.nominal_satuan) -
          //         parseFloat(item.nominal_satuan) /
          //           (parseFloat(this.form.tipe_ppn_id.nilai) / 100 + 1)) +
          //       (parseFloat(item.nominal_satuan) -
          //         parseFloat(item.nominal_satuan) /
          //           (parseFloat(this.form.tipe_ppn_id.nilai) / 100 + 1))
          //     : this.form.tipe_ppn_id.tipe_ppn_id == 2
          //     ? (item.nominal_satuan *
          //         parseFloat(this.form.tipe_ppn_id.nilai)) /
          //         100 +
          //       parseFloat(item.nominal_satuan)
          //     : item.nominal_satuan,
          berat: item.berat > 0 ? item.berat : 1,
          volume: item.volume > 0 ? item.volume : 1,
          total: parseFloat(item.nominal_satuan) * parseFloat(item.jumlah) || 0,
          // this.form.tipe_ppn_id.tipe_ppn_id == 3
          //   ? (item.nominal_satuan -
          //       (parseFloat(item.nominal_satuan) -
          //         parseFloat(item.nominal_satuan) /
          //           (parseFloat(this.form.tipe_ppn_id.nilai) / 100 + 1)) +
          //       (parseFloat(item.nominal_satuan) -
          //         parseFloat(item.nominal_satuan) /
          //           (parseFloat(this.form.tipe_ppn_id.nilai) / 100 + 1))) *
          //     item.jumlah
          //   : this.form.tipe_ppn_id.tipe_ppn_id == 2
          //   ? (parseFloat(item.nominal_satuan) +
          //       (item.nominal_satuan *
          //         parseFloat(this.form.tipe_ppn_id.nilai)) /
          //         100) *
          //     parseFloat(item.jumlah)
          //   : parseFloat(item.nominal_satuan) * parseFloat(item.jumlah),
        };
      });

      this.form.total = 0;
      this.form.billing_lastmile_details.forEach((item) => {
        this.form.total += item.total;
      });
      this.form.tax = 0;
      this.form.billing_lastmile_details.forEach((item) => {
        let totalTax =
          (parseFloat(item.total) * parseFloat(this.form.tipe_ppn_id.nilai)) /
          100;
        this.form.tax += totalTax;
      });
      this.form.grand_total = 0;
      this.form.grand_total =
        this.form.tipe_ppn_id.tipe_ppn_id == 3
          ? this.form.total
          : this.form.total + this.form.tax;
    },
  },
};
</script>
