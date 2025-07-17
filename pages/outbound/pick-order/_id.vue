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
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="grid grid-flow-col grid-rows-3 gap-2 w-full">
              <!-- <ValidationProvider name="user_pic">
                <select-button
                  :self="{
                    label: 'User PIC',
                    optionLabel: 'nama_lengkap',
                    lookup: lookup_custom1,
                    value: parameters.form.user_id_pic,
                    onGet: onGetUser,
                    isLoadingL: isLoadingGetUser,
                    // input: onSelectAsalMuat,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider> -->
              <div v-if="isEditable">
                <input-horizontal
                  label="Kode Pick Order"
                  type="text"
                  name="kode_pick_order"
                  :isHorizontal="true"
                  v-model="parameters.form.kode_pick_order"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Tanggal"
                  type="date"
                  name="tanggal"
                  v-model="parameters.form.tanggal"
                  :required="true"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Nomor Referensi"
                  type="text"
                  name="no_referensi_1"
                  v-model="parameters.form.no_referensi_1"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Nomor Referensi 2"
                  type="text"
                  name="no_referensi_2"
                  v-model="parameters.form.no_referensi_2"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Nomor Referensi 3"
                  type="text"
                  name="no_referensi_3"
                  v-model="parameters.form.no_referensi_3"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Staff"
                  type="text"
                  name="staff"
                  :required="false"
                />
                <!-- v-model="parameters.form.no_referensi_3" -->
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Equipment"
                  type="text"
                  name="equipment"
                  :required="false"
                />
                <!-- v-model="parameters.form.no_referensi_3" -->
              </div>
            </div>
          </div>
          <div
            class="mb-3 mt-7 text-xl font-bold uppercase flex justify-between items-start w-full"
          >
            <span class="w-1/2"><h1>Pick Order Detail</h1></span>
          </div>
          <div
            class="bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm flex justify-between items-center"
          >
            <div class="w-1/2">
              <select-button
                :self="{
                  label: 'Pick Request',
                  optionLabel: 'nama_pick_request',
                  lookup: lookup_custom4,
                  value: parameters.form.pick_request_id,
                  onGet: onGetPickRequest,
                  isLoadingL: isLoadingGetPickRequest,
                  // input: onSelectAsalM,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>
            <div class="w-full relative flex justify-end gap-2">
              <button
                type="button"
                @click="addPickOrderDetails"
                class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
              >
                <i class="fas fa-plus"></i>
                <p class="text-xs font-medium">Pick Order Detail</p>
              </button>
            </div>
          </div>
          <div
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <table
              class="table border-collapse border border-gray-300 mt-5 table-fixed"
            >
              <thead>
                <tr class="text-sm uppercase">
                  <th class="w-20 border border-gray-300 text-center">
                    Delete
                  </th>
                  <th class="w-full border border-gray-300">
                    Data Pick Request
                  </th>
                  <th class="w-full border border-gray-300">Item Gudang</th>
                  <th class="w-full border border-gray-300">
                    Rekomendasi Zona Asal
                  </th>
                  <th class="w-full border border-gray-300">Serial Number</th>
                  <th class="w-full border border-gray-300">Quantity</th>
                  <th class="w-full border border-gray-300">
                    Keterangan Detail
                  </th>
                  <th class="w-full border border-gray-300">Zona Tujuan</th>
                  <!-- <th class="w-40 border border-gray-300">Detail Pick Order</th> -->
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in parameters.form.detail_pick_order"
                  :key="i"
                  class="border-t border-gray-400 align-top"
                >
                  <td class="text-center text-gray-600 border border-gray-300">
                    <i
                      class="fas fa-trash mx-auto"
                      style="cursor: pointer"
                      @click="onDeleteItem(i)"
                    ></i>
                  </td>
                  <td class="border border-gray-300"></td>
                  <td class="border border-gray-300">
                    <div class="w-full">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                        label="nama_item"
                        :loading="isLoadingGetItemGudang"
                        :options="lookup_custom2.data"
                        :filterable="false"
                        @search="onGetItemGudang"
                        v-model="item.item_gudang_id"
                      >
                        <!-- @input="(item) => onSelectItemGudang(item, index)" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom2.data.length || search"
                        >
                          <span
                            v-if="lookup_custom2.current_page > 1"
                            @click="onGetItemGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom2.last_page >
                              lookup_custom2.current_page
                            "
                            @click="onGetItemGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>

                      <p v-if="item.item_gudang_id">
                        {{ item.item_gudang_id.nama_item }}
                      </p>
                    </div>
                  </td>
                  <td class="border border-gray-300">
                    <v-select
                      class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_zona_gudang"
                      :loading="isLoadingGetZonaGudang"
                      :options="lookup_custom3.data"
                      :filterable="false"
                      @search="onGetZonaGudang"
                      :reduce="(item) => item.zona_gudang_id"
                      v-model="item.zona_gudang_id_plan"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom3.data.length || search"
                      >
                        <span
                          v-if="lookup_custom3.current_page > 1"
                          @click="onGetZonaGudang(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom3.last_page >
                            lookup_custom3.current_page
                          "
                          @click="onGetZonaGudang(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </td>
                  <td class="border border-gray-300">
                    <input-form
                      label=""
                      type="text"
                      name="serial_number"
                      :required="false"
                      v-model="item.serial_number"
                    />
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
                  <td class="border border-gray-300">
                    <textarea
                      placeholder="Keterangan Detail"
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      v-model="item.keterangan_detail"
                    ></textarea>
                  </td>
                  <td class="border border-gray-300">
                    <textarea
                      placeholder="Zona Transit"
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      v-model="item.zona_transit"
                    ></textarea>
                  </td>
                  <!-- <td class="border border-gray-300">
                    <textarea
                      placeholder="Detail Pick Order"
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      v-model="item.detail_pick_order"
                    ></textarea>
                  </td> -->
                </tr>
                <tr v-if="!parameters.form.detail_pick_order.length > 0">
                  <td colspan="12" class="text-center">
                    <span class="flex justify-center w-full">
                      <img
                        src="/img/data-not-found.svg"
                        alt="Data Tidak Ditemukan"
                        class="h-64 object-cover"
                      />
                    </span>
                    <div class="mt-3 w-full">Data Tidak Ditemukan</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="w-full flex justify-start items-center">
            <modal-footer-section
              class="mt-5"
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isStopSearchUser: false,
      isLoadingGetUser: false,
      user_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      gudang_search: "",

      isStopSearchZonaGudang: false,
      isLoadingGetZonaGudang: false,
      zona_gudang_search: "",

      isStopSearchPickRequest: false,
      isLoadingGetPickRequest: false,
      pick_request_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Pick Order",
      parameters: {
        url: "outbound/pick-order",
        form: {
          pick_request_id: "",
          kode_pick_order: "",
          user_id_pic: "",
          tanggal: "",
          no_referensi_1: "",
          no_referensi_2: "",
          no_referensi_3: "",
          detail_pick_order: [],

          //Tracking
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
        },
      },
      formPickOrder: {
        detail_pick_order_id: "",
        item_gudang_id: "",
        zona_gudang_id: "",
        serial_number: "",
        quantity: "",
        keterangan_detail: "",
        zona_transit: "",
        // detail_pick_order: "",
      },
    };
  },

  async created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    try {
      this.parameters.form.tanggal = formattedDate;
      if (this.isEditable) {
        let res = await this.$axios.get(`outbound/pick-order/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          this.parameters.form[item] = res.data[item];
        });
        this.parameters.form.user_id_pic = res.data.user;
        this.parameters.form.detail_pick_order = res.data.detail_pick_order.map(
          (item) => {
            return {
              ...item,
              detail_pick_order_id: item || null,
            };
          }
        );
        this.isLoadingPage = false;
      }
    } catch (error) {
      console.log("error", error);
      // this.$router.back()
    }
  },

  async mounted() {
    await this.onSearchUser();
    await this.onSearchItemGudang();
    await this.onSearchZonaGudang();
    await this.onSearchPickRequest();
    this.getGeoLocation();
    this.getUserAgent();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //user pic
      "lookup_custom2", //item gudang
      "lookup_custom3", //zona gudang
      "lookup_custom4", //pick request
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    addPickOrderDetails() {
      this.parameters.form.detail_pick_order.push({
        ...this.formPickOrder,
      });
      this.resetFormPickOrder();
    },

    getUserAgent() {
      this.parameters.form.user_agent = navigator.userAgent;
      if (this.parameters.form.user_agent.includes("Mobile")) {
        this.parameters.form.device = "Mobile";
      } else if (this.parameters.form.user_agent.includes("Tablet")) {
        this.parameters.form.device = "Tablet";
      } else {
        this.parameters.form.device = "Desktop";
      }
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.parameters.form.longitude =
              position.coords.longitude.toString();
            this.parameters.form.latitude = position.coords.latitude.toString();
            this.isLoadingForm = false;
            // console.log(
            //   "latitude",
            //   this.parameters.form.latitude,
            //   "longitude",
            //   this.parameters.form.longitude
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

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "outbound/pick-order";

      let formData = {
        ...this.parameters.form,
        user_id_pic:
          typeof this.parameters.form.user_id_pic == "object"
            ? this.parameters.form.user_id_pic.user_id_pic
            : this.parameters.form.user_id_pic,
      };

      formData.detail_pick_order = formData.detail_pick_order.map((item) => {
        return {
          ...item,
          detail_pick_order_id: item.detail_pick_order_id
            ? item.detail_pick_order_id
            : "",
          item_gudang_id:
            typeof item.item_gudang_id == "object"
              ? item.item_gudang_id.item_gudang_id
              : item.item_gudang_id,
        };
      });

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
            this.parameters.form = {
              pick_order_id: "",
              kode_pick_order: "",
              user_id_pic: "",
              tanggal: "",
              no_referensi_1: "",
              no_referensi_2: "",
              no_referensi_3: "",
              detail_pick_order: [],
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
    addPickOrderDetails() {
      this.parameters.form.detail_pick_order.push({
        detail_pick_order_id: "",
        item_gudang_id: "",
        zona_gudang_id: "",
        serial_number: "",
        quantity: "",
        keterangan_detail: "",
        zona_transit: "",
        // detail_pick_order: "",
      });
    },

    onDeleteItem(index) {
      this.parameters.form.detail_pick_order =
        this.parameters.form.detail_pick_order.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetUser(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchUser);

      this.isStopSearchUser = setTimeout(() => {
        this.user_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }
        this.onSearchUser();
      }, 600);
    },

    async onSearchUser() {
      if (!this.isLoadingGetUser) {
        this.isLoadingGetUser = true;

        await this.lookUp({
          url: "setting/user",
          lookup: "custom1",
          query:
            "?search=" +
            this.user_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });
        this.isLoadingGetUser = false;
      }
    },

    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }
        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "custom2",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });
        this.isLoadingGetItemGudang = false;
      }
    },

    onGetZonaGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchZonaGudang);

      this.isStopSearchZonaGudang = setTimeout(() => {
        this.zona_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }
        this.onSearchZonaudang();
      }, 600);
    },

    async onSearchZonaGudang() {
      if (!this.isLoadingGetZonaGudang) {
        this.isLoadingGetZonaGudang = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "custom3",
          query:
            "?search=" +
            this.zona_gudang_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });
        this.isLoadingGetZonaGudang = false;
      }
    },

    onGetPickRequest(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchPickRequest);

      this.isStopSearchPickRequest = setTimeout(() => {
        this.pick_request_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }
        this.onSearchPickRequest();
      }, 600);
    },

    async onSearchPickRequest() {
      if (!this.isLoadingGetPickRequest) {
        this.isLoadingGetPickRequest = true;

        await this.lookUp({
          url: "outbound/pick-request/get-pick-request",
          lookup: "custom4",
          query:
            "?search=" +
            this.pick_request_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });
        this.isLoadingGetPickRequest = false;
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        pick_request_id: "",
        kode_pick_order: "",
        user_id_pic: "",
        tanggal: "",
        no_referensi_1: "",
        no_referensi_2: "",
        no_referensi_3: "",
        detail_pick_order: [],
      };
    },
  },
};
</script>
