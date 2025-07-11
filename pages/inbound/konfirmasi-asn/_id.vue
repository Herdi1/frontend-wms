<template>
  <section class="section h-screen">
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">Tambah Data</h1>
        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div
            class="mt-4 mb-7 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="grid grid-cols-2 gap-3 w-full mb-7">
              <div class="form-group flex">
                <label for="status_konfirmasi" class="w-[50%]"
                  >Status Konfirmasi</label
                >
                <select
                  class="w-[50%] p-1 border rounded focus:outline-none"
                  name="status_konfirmasi"
                  id="status_konfirmasi"
                  v-model="form.status_konfirmasi"
                >
                  <option value="">Pilih</option>
                  <option value="1">Dikonfirmasi</option>
                  <option value="0">Ditolak</option>
                </select>
              </div>
              <div class="form-group">
                <input-horizontal
                  label="Tanggal Konfirmasi"
                  type="date"
                  name="tanggal_konfirmasi"
                  :isHorizontal="true"
                  v-model="form.tanggal_konfirmasi"
                  :required="false"
                />
              </div>
              <div class="col-span-2">
                <label for="catatan_konfirmasi">Catatan Konfirmasi</label>
                <textarea
                  name="catatan_konfirmasi"
                  v-model="form.catatan_konfirmasi"
                  class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                ></textarea>
              </div>
            </div>

            <div class="w-full flex justify-between items-center">
              <h1 class="text-xl font-bold">Detail ASN</h1>
              <div class=" ">
                <button
                  type="button"
                  @click="AddAsnDetails"
                  class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                >
                  <i class="fas fa-plus"></i>
                  <p class="text-xs font-medium">Tambah Detail ASN</p>
                </button>
              </div>
            </div>
            <div
              class="table-responsive overflow-y-hidden mb-7"
              :style="form.asn_details.length ? 'min-height:500px' : ''"
            >
              <table
                class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
              >
                <thead>
                  <tr class="text-sm uppercase text-nowrap">
                    <th class="w-[200px] border border-gray-300">Zona Plan</th>
                    <th class="w-[200px] border border-gray-300">Aisle Plan</th>
                    <th class="w-[200px] border border-gray-300">Rack Plan</th>
                    <th class="w-[200px] border border-gray-300">Level Plan</th>
                    <th class="w-[200px] border border-gray-300">Bin Plan</th>
                    <th class="w-[100px] border border-gray-300">Delete</th>
                  </tr>
                  <tr
                    v-for="(item, index) in form.asn_details"
                    :key="index"
                    style="border-top: 0.5px solid lightgray"
                    class="align-top mx-0"
                  >
                    <td class="border border-gray-300">
                      <v-select
                        label="nama_zona_gudang"
                        :loading="isLoadingGetZonaPlan"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetZonaPlan"
                        v-model="item.zona_gudang_id_plan"
                        :reduce="(item) => item.zona_gudang_id"
                        class="w-full"
                      >
                        <!-- <template slot="option" slot-scope="option">
                                {{ option.nama_coa + " - " + option.kode_coa }}
                              </template>
                              <template
                                slot="selected-option"
                                slot-scope="option"
                              >
                                {{ option.nama_coa + " - " + option.kode_coa }}
                              </template> -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom1.data.length || search"
                        >
                          <span
                            v-if="lookup_custom1.current_page > 1"
                            @click="onGetZonaPlan(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom1.last_page >
                              lookup_custom1.current_page
                            "
                            @click="onGetZonaPlan(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotAisle"
                        :options="lookup_custom2.data"
                        :filterable="false"
                        @search="onGetSlotAisle"
                        v-model="item.slot_penyimpanan_id_aisle_plan"
                        :reduce="(item) => item.slot_penyimpanan_id"
                        class="w-full"
                      >
                        <!-- <template slot="option" slot-scope="option">
                                {{ option.nama_coa + " - " + option.kode_coa }}
                              </template>
                              <template
                                slot="selected-option"
                                slot-scope="option"
                              >
                                {{ option.nama_coa + " - " + option.kode_coa }}
                              </template> -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom2.data.length || search"
                        >
                          <span
                            v-if="lookup_custom2.current_page > 1"
                            @click="onGetSlotAisle(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom2.last_page >
                              lookup_custom2.current_page
                            "
                            @click="onGetSlotAisle(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotRack"
                        :options="lookup_custom3.data"
                        :filterable="false"
                        @search="onGetSlotRack"
                        v-model="item.slot_penyimpanan_id_rack_plan"
                        :reduce="(item) => item.slot_penyimpanan_id"
                        class="w-full"
                      >
                        <!-- <template slot="option" slot-scope="option">
                                {{ option.nama_coa + " - " + option.kode_coa }}
                              </template>
                              <template
                                slot="selected-option"
                                slot-scope="option"
                              >
                                {{ option.nama_coa + " - " + option.kode_coa }}
                              </template> -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom3.data.length || search"
                        >
                          <span
                            v-if="lookup_custom3.current_page > 1"
                            @click="onGetSlotRack(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom3.last_page >
                              lookup_custom3.current_page
                            "
                            @click="onGetSlotRack(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotLevel"
                        :options="lookup_custom4.data"
                        :filterable="false"
                        @search="onGetSlotLevel"
                        v-model="item.slot_penyimpanan_id_level_plan"
                        :reduce="(item) => item.slot_penyimpanan_id"
                        class="w-full"
                      >
                        <!-- <template slot="option" slot-scope="option">
                                {{ option.nama_coa + " - " + option.kode_coa }}
                              </template>
                              <template
                                slot="selected-option"
                                slot-scope="option"
                              >
                                {{ option.nama_coa + " - " + option.kode_coa }}
                              </template> -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom4.data.length || search"
                        >
                          <span
                            v-if="lookup_custom4.current_page > 1"
                            @click="onGetSlotLevel(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom4.last_page >
                              lookup_custom4.current_page
                            "
                            @click="onGetSlotLevel(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotBin"
                        :options="lookup_custom5.data"
                        :filterable="false"
                        @search="onGetSlotBin"
                        v-model="item.slot_penyimpanan_id_bin_plan"
                        :reduce="(item) => item.slot_penyimpanan_id"
                        class="w-full"
                      >
                        <!-- <template slot="option" slot-scope="option">
                                {{ option.nama_coa + " - " + option.kode_coa }}
                              </template>
                              <template
                                slot="selected-option"
                                slot-scope="option"
                              >
                                {{ option.nama_coa + " - " + option.kode_coa }}
                              </template> -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom5.data.length || search"
                        >
                          <span
                            v-if="lookup_custom5.current_page > 1"
                            @click="onGetSlotBin(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom5.last_page >
                              lookup_custom5.current_page
                            "
                            @click="onGetSlotBin(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300 text-center">
                      <i
                        class="fas fa-trash mx-auto"
                        style="cursor: pointer"
                        @click="onDeleteItem(index)"
                      ></i>
                    </td>
                  </tr>
                  <tr v-if="!form.asn_details.length > 0">
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
                </thead>
              </table>
            </div>
          </div>
          <modal-footer-section
            :isLoadingForm="isLoadingForm"
            @reset="formReset()"
          />
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isStopSearchZonaPlan: false,
      isLoadingGetZonaPlan: false,
      zona_plan_search: "",

      isStopSearchSlotAisle: false,
      isLoadingGetSlotAisle: false,
      slot_aisle_search: "",

      isStopSearchSlotRack: false,
      isLoadingGetSlotRack: false,
      slot_rack_search: "",

      isStopSearchSlotLevel: false,
      isLoadingGetSlotLevel: false,
      slot_level_search: "",

      isStopSearchSlotBin: false,
      isLoadingGetSlotBin: false,
      slot_bin_search: "",

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Konfirmasi ASN",
      url: "inbound/konfirmasi-asn",

      form: {
        konfirmasi_asn_id: "",

        status_konfirmasi: "",
        tanggal_konfirmasi: "",
        catatan_konfirmasi: "",
        asn_details: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      default_form: {
        konfirmasi_asn_id: "",

        status_konfirmasi: "",
        tanggal_konfirmasi: "",
        catatan_konfirmasi: "",
        asn_details: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`inbound/konfirmasi-asn/${this.id}`);
        Object.keys(this.form).forEach((item) => {
          if (item !== "asn_details") {
            this.form[item] = res.data[item];
          }
        });

        this.form.asn_details = res.data.asn_details.map((item) => {
          return {
            ...item,
            asn_details_id: item || "",
          };
        });

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/inbound/konfirmasi-asn");
    }
  },

  async mounted() {
    await this.onSearchZonaPlan();
    await this.onSearchSlotAisle();
    await this.onSearchSlotRack();
    await this.onSearchSlotLevel();
    await this.onSearchSlotBin();
    this.getUserAgent();
    this.getGeoLocation();
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
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    getUserAgent() {
      this.form.user_agent = navigator.userAgent;
      if (this.form.user_agent.includes("Mobile")) {
        this.form.device = "Mobile";
      } else if (this.form.user_agent.includes("Tablet")) {
        this.form.device = "Tablet";
      } else {
        this.form.device = "Desktop";
      }
      console.log("user agent", this.form.user_agent);
      console.log("device", this.form.device);
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.form.longitude = position.coords.longitude;
            this.form.latitude = position.coords.latitude;
            this.isLoadingForm = false;
            console.log(
              "latitude",
              this.form.latitude,
              "longitude",
              this.form.longitude
            );
          },
          (error) => {
            this.isLoadingForm = false;
            this.$toaster.error(error.message);
          }
        );
      } else {
        this.$toaster.error("geolocation not supported");
        // console.log("geolocation not supported");
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "inbound/konfirmasi-asn";
      this.parameters.form.asn_details.push({ ...this.formAsn });

      let formData = {
        ...this.parameters.form,
      };

      formData.asn_details = formData.asn_details.map((item) => {
        return {
          ...item,
        };
      });

      if (this.user.gudang_id) {
        this.parameters.form.gudang_id = this.user.gudang_id;
      }

      // console.log("form", this.parameters.form);

      if (this.isEditable) {
        url += "/" + this.id;
      }

      console.log(formData);

      this.$axios({
        method: this.isEditable ? "put" : "post",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " +
              (this.isEditable == true ? "Diedit" : "Tambah")
          );

          if (!this.isEditable) {
            this.parameters.form = this.default_form;
            this.$router.back();
          }
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    AddAsnDetails() {
      this.form.asn_details.push({
        zona_gudang_id_plan: "",
        slot_penyimpanan_id_aisle_plan: "",
        slot_penyimpanan_id_rack_plan: "",
        slot_penyimpanan_id_level_plan: "",
        slot_penyimpanan_id_bin_plan: "",
      });
    },

    onDeleteItem(index) {
      this.form.asn_details = this.form.asn_details.filter(
        (_, itemIndex) => index !== itemIndex
      );
    },

    // Get zona plan
    onGetZonaPlan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchZonaPlan);

      this.isStopSearchZonaPlan = setTimeout(() => {
        this.zona_plan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchZonaPlan();
      }, 600);
    },

    async onSearchZonaPlan() {
      if (!this.isLoadingGetZonaPlan) {
        this.isLoadingGetZonaPlan = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.zona_plan_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetZonaPlan = false;
      }
    },

    // Get slot aisle
    onGetSlotAisle(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotAisle);

      this.isStopSearchSlotAisle = setTimeout(() => {
        this.slot_aisle_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchSlotAisle();
      }, 600);
    },

    async onSearchSlotAisle() {
      if (!this.isLoadingGetSlotAisle) {
        this.isLoadingGetSlotAisle = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom2",
          query:
            "?search=" +
            this.slot_aisle_search +
            "&level=1" +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotAisle = false;
      }
    },

    // Get slot rack
    onGetSlotRack(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotRack);

      this.isStopSearchSlotRack = setTimeout(() => {
        this.slot_rack_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchSlotRack();
      }, 600);
    },

    async onSearchSlotRack() {
      if (!this.isLoadingGetSlotRack) {
        this.isLoadingGetSlotRack = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom3",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=2" +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotRack = false;
      }
    },

    // Get slot level
    onGetSlotLevel(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotLevel);

      this.isStopSearchSlotLevel = setTimeout(() => {
        this.slot_level_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchSlotLevel();
      }, 600);
    },

    async onSearchSlotLevel() {
      if (!this.isLoadingGetSlotLevel) {
        this.isLoadingGetSlotLevel = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom4",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=3" +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotLevel = false;
      }
    },

    // Get slot level
    onGetSlotBin(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotBin);

      this.isStopSearchSlotBin = setTimeout(() => {
        this.slot_bin_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchSlotBin();
      }, 600);
    },

    async onSearchSlotBin() {
      if (!this.isLoadingGetSlotBin) {
        this.isLoadingGetSlotBin = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom5",
          query:
            "?search=" +
            this.slot_bin_search +
            "&level=4" +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },
  },
};
</script>
