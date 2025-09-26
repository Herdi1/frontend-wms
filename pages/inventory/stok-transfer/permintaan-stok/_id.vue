<template>
  <section class="section">
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
      <ValidationObserver v-slot="{ invalid, validate }" ref="formVaidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div
            class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <!-- <div class="w-full pt-3 mb-3">
              <div class="w-full flex justify-between items-center">
                <h1 class="text-xl font-bold">Permintaan Stok</h1>
                <div class=" "></div>
              </div>
            </div> -->
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full mb-7"
            >
              <div class="form-group" v-if="isEditable">
                <input-horizontal
                  label="Kode Stok Transfer"
                  type="text"
                  name="kode_stok_transfer"
                  labelWidth="w-[40%]"
                  inputWidth="w-[60%]"
                  :isHorizontal="true"
                  v-model="form.kode_stok_transfer"
                  :required="false"
                  :disabled="true"
                />
              </div>

              <div class="form-group">
                <input-horizontal
                  label="Tanggal"
                  type="date"
                  name="tanggal"
                  labelWidth="w-[40%]"
                  inputWidth="w-[60%]"
                  :isHorizontal="true"
                  v-model="form.tanggal"
                  :required="false"
                />
              </div>
              <div class="form-group mb-2 flex justify-between">
                <label for="" class="w-[40%]"
                  >Tanggal Request Kirim
                  <span class="text-danger">*</span></label
                >
                <input
                  type="datetime-local"
                  step="1"
                  v-model="form.tanggal_request_kirim"
                  class="w-[60%] pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                  required
                />
              </div>
              <div class="w-full mb-2">
                <select-button
                  :self="{
                    label: 'Gudang Penerima',
                    optionLabel: 'nama_gudang',
                    isLoading: isLoadingGetGudang,
                    lookup: lookup_suppliers,
                    onGet: onGetGudang,
                    value: form.gudang_id,
                    input: onSelectGudang,
                  }"
                  width="w-[60%]"
                  :required="true"
                />
              </div>
              <div class="w-full mb-2">
                <select-button
                  :self="{
                    label: 'Gudang Pengirim',
                    optionLabel: 'nama_gudang',
                    isLoading: isLoadingGetGudang,
                    lookup: lookup_suppliers,
                    onGet: onGetGudang,
                    value: form.gudang_id_pengirim,
                    input: onSelectGudangPengirim,
                  }"
                  width="w-[60%]"
                  :required="true"
                />
              </div>

              <!-- <div class="form-group flex items-center">
                <label for="" class="w-[40%]">Status Approve</label>
                <select
                  name=""
                  id=""
                  v-model="form.status_approve"
                  class="w-[60%] p-1 rounded-sm border border-gray-300 outline-none"
                >
                  <option value="0">Menunggu</option>
                  <option value="1">Approve</option>
                </select>
              </div> -->
              <div class="form-group">
                <input-horizontal
                  label="No Referensi"
                  type="text"
                  name="no_referensi_1"
                  labelWidth="w-[40%]"
                  inputWidth="w-[60%]"
                  :isHorizontal="true"
                  v-model="form.no_referensi_1"
                  :required="false"
                />
              </div>
              <div class="flex px-1 items-start">
                <label for="jenis_kiriman" class="w-2/5 pt-2"
                  >Jenis Kiriman <span class="text-danger">*</span></label
                >
                <select
                  required
                  name="jenis_kiriman"
                  id="jenis_kiriman"
                  v-model="form.jenis_kiriman"
                  class="w-3/5 outline-none p-1 rounded-sm border border-gray-300"
                >
                  <option value="FRC">Franco</option>
                  <option value="LCO">Locco</option>
                  <option value="SWC">Switch</option>
                </select>
              </div>
              <div class="form-group flex justify-between">
                <label for="keterangan" class="w-[40%] pt-1">Keterangan</label>
                <textarea
                  placeholder="Keterangan"
                  class="w-[60%] pl-2 py-1 border rounded focus:outline-none"
                  v-model="form.keterangan"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-between items-center">
            <h1 class="text-xl font-bold uppercase">Detail Stok Transfer</h1>
            <div class=" ">
              <button
                type="button"
                @click="addDetailTransfer"
                class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
              >
                <i class="fas fa-plus"></i>
                <p class="text-xs font-medium">Tambah Detail</p>
              </button>
            </div>
          </div>
          <div
            class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="table-responsive overflow-y-hidden mb-7">
              <table
                class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                :class="form.stok_transfer_details.length ? 'mb-[300px]' : ''"
              >
                <thead>
                  <tr class="text-sm uppercase text-nowrap">
                    <th class="w-60 border border-gray-300">Item</th>
                    <th class="w-60 border border-gray-300">Valuation</th>
                    <th class="w-60 border border-gray-300">Quantity</th>
                    <th class="w-60 border border-gray-300">keterangan</th>
                    <th class="w-20 border border-gray-300 text-center">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in form.stok_transfer_details"
                    :key="index"
                    style="border-top: 0.5px solid lightgray"
                    class="align-top mx-0"
                  >
                    <td class="border border-gray-300">
                      <v-select
                        label="nama_item"
                        :loading="isLoadingGetItemGudang"
                        :options="lookup_products.data"
                        :filterable="false"
                        @search="onGetItemGudang"
                        v-model="item.item_gudang_id"
                        class="w-full"
                        @input="(item) => onSelectItemGudang(item, index)"
                      >
                        <template slot="selected-option" slot-scope="option">
                          <div
                            class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {{ option.nama_item }}
                          </div>
                               </template
                        >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_products.data.length || search"
                        >
                          <span
                            v-if="lookup_products.current_page > 1"
                            @click="onGetItemGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_products.last_page >
                              lookup_products.current_page
                            "
                            @click="onGetItemGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        label="nama_valuation"
                        :loading="isLoadingGetValuation"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetValuation"
                        v-model="item.valuation_id"
                        class="w-full"
                        :reduce="(item) => item.valuation_id"
                      >
                        <!-- @input="(item) => onSelectItemGudang(item, index)" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom1.data.length || search"
                        >
                          <span
                            v-if="lookup_custom1.current_page > 1"
                            @click="onGetValuation(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom1.last_page >
                              lookup_custom1.current_page
                            "
                            @click="onGetValuation(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <money
                        v-model="item.quantity"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <!-- <td class="border border-gray-300">
                    <input
                      class="w-full p-1 rounded-md border border-gray-300"
                      type="text"
                      v-model="item.satuan"
                      disabled
                    />
                  </td> -->
                    <td class="border border-gray-300">
                      <textarea
                        placeholder="Keterangan"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        v-model="item.keterangan"
                      ></textarea>
                    </td>
                    <td class="border border-gray-300 text-center">
                      <i
                        class="fas fa-trash mx-auto"
                        style="cursor: pointer"
                        @click="deleteDetailTransfer(index)"
                      ></i>
                    </td>
                  </tr>
                  <tr v-if="!form.stok_transfer_details.length > 0">
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

          <modal-footer-section
            :isLoadingForm="isLoadingForm"
            @reset="formReset()"
            class="m-5"
          />
        </form>
      </ValidationObserver>
      <!-- <success-modal
        v-model="showModal"
        :message="`Data Berhasil ${
          isEditable ? 'Diedit' : 'Disimpan'
        }! Cetak Label?`"
      >
        <template #footer>
          <div class="flex justify-center gap-3">
            <button
              class="bg-orange-500 hover:bg-orange-400 p-2 rounded-md text-white"
              @click="onCloseModal"
            >
              Kembali
            </button>
            <button
              class="bg-green-500 hover:bg-green-400 p-2 rounded-md text-white"
              @click="onPrintLabel"
            >
              Cetak Label
            </button>
          </div>
        </template>
      </success-modal> -->
    </div>
  </section>
</template>

<script>
// import { reduce } from "core-js/core/array";
import { ValidationObserver } from "vee-validate";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      isStopSearchValuation: false,
      isLoadingGetValuation: false,
      valuation_search: "",

      user: this.$auth.user,
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Permintaan Stok Transfer",
      url: "inventory/stok-transfer",

      form: {
        kode_stok_transfer: "",
        tanggal: "",
        tanggal_request_kirim: "",
        no_referensi_1: "",
        gudang_id: "",
        gudang_id_pengirim: "",
        status_approve: "0",
        keterangan: "",
        stok_transfer_details: [],
        jenis_kiriman: "FRC",

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      default_form: {
        kode_stok_transfer: "",
        tanggal: "",
        tanggal_request_kirim: "",
        no_referensi_1: "",
        gudang_id: "",
        gudang_id_pengirim: "",
        status_approve: "0",
        keterangan: "",
        stok_transfer_details: [],
        jenis_kiriman: "FRC",

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      showModal: false,
    };
  },

  async created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const hours = today.getHours().toString().padStart(2, "0");
    const minutes = today.getMinutes().toString().padStart(2, "0");
    const seconds = today.getSeconds().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    try {
      this.form.tanggal = formattedDate;
      this.form.tanggal_request_kirim = formattedDateTime;
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.url}/${this.id}`);
        Object.keys(this.form).forEach((item) => {
          if (item != "stok_transfer_details") {
            this.form[item] = res.data[item];
          }
        });
        this.form.gudang_id = res.data.gudang;
        this.form.gudang_id_pengirim = res.data.gudang_pengirim;
        this.form.jenis_kiriman = res.data.jenis_kiriman.trim();

        this.form.stok_transfer_details = res.data.stok_transfer_details.map(
          (item) => {
            return {
              ...item,
              stok_transfer_detail_id: item.stok_transfer_detail_id
                ? item.stok_transfer_detail_id
                : "",
              item_gudang_id: item.item_gudang,
              item_id: item.item,
            };
          }
        );
        this.isLoadingPage = false;
        console.log(res.data);
      }
    } catch (error) {
      // this.$router.push("/inventory/stok-transfer/permintaan-stok");
      console.log("error", error);
    }
  },

  async mounted() {
    await this.onSearchGudang();
    // await this.onSearchItemGudang();
    await this.onSearchValuation();
    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_suppliers", //gudang
      "lookup_products", //item gudang
      "lookup_custom1", //valuation
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
      // console.log("user agent", this.form.user_agent);
      // console.log("device", this.form.device);
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.form.longitude = position.coords.longitude.toString();
            this.form.latitude = position.coords.latitude.toString();
            this.isLoadingForm = false;
            // console.log(
            //   "latitude",
            //   this.form.latitude,
            //   "longitude",
            //   this.form.longitude
            // );
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

    formatDateTime(dateTime) {
      const dateObject = new Date(dateTime);

      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getDate()).padStart(2, "0");
      const hours = String(dateObject.getHours()).padStart(2, "0");
      const minutes = String(dateObject.getMinutes()).padStart(2, "0");
      const seconds = String(dateObject.getSeconds()).padStart(2, "0");

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      return formattedDateTime;
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = this.url;

      let newTanggalKirim = this.formatDateTime(
        this.form.tanggal_request_kirim
      );

      let formData = {
        ...this.form,
        gudang_id:
          typeof this.form.gudang_id === "object"
            ? this.form.gudang_id.gudang_id
            : "",
        gudang_id_pengirim:
          typeof this.form.gudang_id_pengirim === "object"
            ? this.form.gudang_id_pengirim.gudang_id
            : "",
        tanggal_request_kirim: newTanggalKirim,
      };

      formData.stok_transfer_details = this.form.stok_transfer_details.map(
        (item) => {
          return {
            ...item,
            item_gudang_id:
              typeof item.item_gudang_id === "object"
                ? item.item_gudang_id.item_gudang_id
                : "",
            item_id:
              typeof item.item_id === "object" ? item.item_id.item_id : "",
          };
        }
      );

      // formData.stok_transfer_details =

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        method: this.isEditable ? "put" : "post",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data Berhasil di " + (this.isEditable ? "Update" : "Tambah")
          );
          if (!this.isEditable) {
            this.form = this.default_form;
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          // this.$refs.formValidate.reset();
        });
    },

    addDetailTransfer() {
      this.form.stok_transfer_details.push({
        item_id: "",
        item_gudang_id: "",
        valuation_id: "",
        quantity: "",
        keterangan: "",
      });
    },

    deleteDetailTransfer(index) {
      this.form.stok_transfer_details = this.form.stok_transfer_details.filter(
        (_, itemIndex) => index !== itemIndex
      );
    },
    // get  gudang
    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "suppliers",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    async onSelectGudang(item) {
      if (item) {
        this.form.gudang_id = item;
        await this.onSearchItemGudang();
      } else {
        this.form.gudang_id = "";
      }
    },

    onSelectGudangPengirim(item) {
      if (item) {
        this.form.gudang_id_pengirim = item;
      } else {
        this.form.gudang_id_pengirim = "";
      }
    },

    // get item gudang
    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.item_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_products.current_page = isNext
            ? this.lookup_products.current_page + 1
            : this.lookup_products.current_page - 1;
        } else {
          this.lookup_products.current_page = 1;
        }

        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "products",
          query:
            "?search=" +
            this.item_gudang_search +
            "&gudang_id=" +
            this.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_products.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItemGudang = false;
      }
    },

    onSelectItemGudang(item, index) {
      if (item) {
        this.form.stok_transfer_details[index].item_gudang_id = item;
        this.form.stok_transfer_details[index].item_id = item;
        // this.form.stok_transfer_details[index].satuan = item.satuan
        //   ? item.satuan.nama_satuan
        //   : "";
      } else {
        this.form.stok_transfer_details[index].item_gudang_id = "";
        this.form.stok_transfer_details[index].item_id = "";
        // this.form.stok_transfer_details[index].satuan = "";
      }
    },

    //valuation
    onGetValuation(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchValuation);

      this.isStopSearchValuation = setTimeout(() => {
        this.valuation_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchValuation();
      }, 600);
    },

    async onSearchValuation() {
      if (!this.isLoadingGetValuation) {
        this.isLoadingGetValuation = true;

        await this.lookUp({
          url: "master/valuation/get-valuation",
          lookup: "custom1",
          query:
            "?search=" +
            this.valuation_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetValuation = false;
      }
    },
  },
};
</script>
