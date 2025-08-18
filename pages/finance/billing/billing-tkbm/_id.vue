<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Jurnal Entri
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
                    />
                  </div>
                  <ValidationProvider name="gudang_id" class="w-full mt-1">
                    <div
                      slot-scope="{ errors, valid }"
                      v-if="!user.gudang_id"
                      class="flex"
                    >
                      <label for="gudang_id" class="w-1/2">Gudang </label>
                      <v-select
                        label="nama_gudang"
                        :loading="isLoadingGetGudang"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetGudang"
                        v-model="form.gudang_id"
                        :reduce="(item) => item.gudang_id"
                        class="w-1/2"
                        @input="onSearchZonaGudang"
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
                  <div class="form-group">
                    <input-horizontal
                      label="Kode Referensi 1"
                      type="text"
                      name="kode_referensi"
                      v-model="form.kode_referensi"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      label="Kode Referensi 2"
                      type="text"
                      name="kode_referensi_2"
                      v-model="form.kode_referensi_2"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      label="Kode Referensi 3"
                      type="text"
                      name="kode_referensi_3"
                      v-model="form.kode_referensi_3"
                    />
                  </div>
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
      title: "Billing TKBM",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

      title: "Billing TKBM",

      url: "finance/billing-tkbm",
      form: {
        billing_tkbm_id: "",
        gudang_id: "",
        pelanggan_id: "",
        tipe_ppn_id: "",
        periode_awal: "",
        periode_akhir: "",
        jenis: "inbound",
        kode_billing_tkbm: "",
        total: "",
        tax: "",
        grand_total: "",
        keterangan: "",
        billing_tkbm_details: [],
      },
      default_form: {
        billing_tkbm_id: "",
        gudang_id: "",
        pelanggan_id: "",
        tipe_ppn_id: "",
        periode_awal: "",
        periode_akhir: "",
        kode_billing_tkbm: "",
        total: "",
        tax: "",
        grand_total: "",
        keterangan: "",
        billing_tkbm_details: [],
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
        let response = await this.$axios.get("finance/billing-tkbm/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != "billing_tkbm_details") {
            this.form[item] = response.data[item];
          }
        });

        this.form.billing_tkbm_details = response.data.billing_tkbm_details.map(
          (item) => {
            return {
              ...item,
              billing_tkbm_detail_id: item || "",
              item_gudang_id: item.item_gudang || "",
              referensi_id: item.teferensi || "",
            };
          }
        );

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/finance/billing-tkbm");
    }
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchPelanggan();
    await this.onSearchTipePPN();
    await this.onSearchItemGudang();
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
  },

  method: {
    ...mapActions("moduleApi", ["lookUp"]),

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "finance/billing-tkbm";

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
      };

      formData.billing_tkbm_details = formData.billing_tkbm_details.map(
        (item) => {
          return {
            ...item,
            item_gudang_id:
              typeof item.item_gudang_id == "object"
                ? item.item_gudang_id.item_gudang_id
                : item.item_gudang_id,
            referensi_id:
              typeof item.referensi_id == "object"
                ? item.referensi_id.referensi_id
                : item.referensi_id,
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
      this.form.billing_tkbm_details[index].item_gudang_id = item || "";
    },
  },
};
</script>
