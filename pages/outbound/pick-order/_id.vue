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
      <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
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
                <select-button
                  :self="{
                    label: 'Staff',
                    optionLabel: 'nama_lengkap',
                    lookup: lookup_custom5,
                    value: parameters.form.person_id,
                    onGet: onGetPerson,
                    isLoadingL: isLoadingGetPerson,
                    input: onSelectStaff,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </div>
              <div class="form-group">
                <select-button
                  :self="{
                    label: 'Peralatan',
                    optionLabel: 'nama_jenis_peralatan',
                    lookup: lookup_custom6,
                    value: parameters.form.peralatan_id,
                    onGet: onGetPeralatan,
                    isLoadingL: isLoadingGetPeralatan,
                    input: onSelectPeralatan,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </div>
              <div>
                <select-button
                  :self="{
                    label: 'Gudang',
                    optionLabel: 'nama_gudang',
                    lookup: lookup_custom7,
                    value: parameters.form.gudang_id,
                    onGet: onGetGudang,
                    isLoadingL: isLoadingGetGudang,
                    input: onSelectGudang,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </div>
            </div>
          </div>
          <div
            class="mb-3 mt-7 text-xl font-bold uppercase flex justify-between items-start w-full"
          >
            <span class="w-1/2"><h1>Pick Order Detail</h1></span>
            <div class="w-full relative flex justify-end gap-2">
              <button
                type="button"
                @click="onOpenModalPickRequest"
                class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
              >
                <i class="fas fa-plus"></i>
                <p class="text-xs font-medium">Pick Order Detail</p>
              </button>
            </div>
          </div>
          <div
            class="bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm flex justify-between items-center"
          >
            <!-- <div class="w-1/2">
              <select-button
                :self="{
                  label: 'Pick Request',
                  optionLabel: 'nama_peminta',
                  lookup: lookup_custom4,
                  value: parameters.form.pick_request_id,
                  onGet: onGetPickRequest,
                  isLoadingL: isLoadingGetPickRequest,
                  input: onSelectPickRequest,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div> -->
          </div>
          <div
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="table-responsive overflow-y-hidden mb-7">
              <table
                class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
                :class="parameters.form.detail_pick_order.length ? 'mb-48' : ''"
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <th class="w-60 border border-gray-300">
                      Kode Pick Request
                    </th>
                    <th class="w-60 border border-gray-300">Tanggal</th>
                    <th class="w-60 border border-gray-300">Kode Item</th>
                    <th class="w-60 border border-gray-300">Nama Item</th>
                    <th class="w-60 border border-gray-300">Quantity Sisa</th>
                    <th class="w-60 border border-gray-300">Lokasi Aisle</th>
                    <th class="w-60 border border-gray-300">Lokasi Rack</th>
                    <th class="w-60 border border-gray-300">Lokasi Level</th>
                    <th class="w-60 border border-gray-300">Lokasi Bin</th>
                    <th class="w-60 border border-gray-300">
                      Keterangan Detail
                    </th>
                    <th class="w-20 border border-gray-300 text-center">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in parameters.form.detail_pick_order"
                    :key="i"
                    class="border-t border-gray-400 align-top"
                  >
                    <td class="border border-gray-300">
                      {{ item.kode_pick_request }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.tanggal }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.kode_item }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.nama_item }}
                    </td>
                    <td class="border border-gray-300">
                      <money
                        v-model="item.sisa_quantity"
                        class="w-full mb-2 pl-2 py-1 border rounded focus:outline-none"
                        :class="
                          item.quantity > parseFloat(item.sisa_quantity)
                            ? 'text-danger'
                            : ''
                        "
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotAisle"
                        :options="lookup_custom8.data"
                        :filterable="false"
                        @search="onGetSlotAisle"
                        v-model="item.slot_penyimpanan_id_aisle"
                        :reduce="(item) => item.slot_penyimpanan_id"
                      >
                        <!-- @input="onSelectItem(i)" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom8.data.length || search"
                        >
                          <span
                            v-if="lookup_custom8.current_page > 1"
                            @click="onGetSlotAisle(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom8.last_page >
                              lookup_custom8.current_page
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
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotRack"
                        :options="lookup_custom9.data"
                        :filterable="false"
                        @search="onGetSlotRack"
                        v-model="item.slot_penyimpanan_id_rack"
                        :reduce="(item) => item.slot_penyimpanan_id"
                      >
                        <!-- @input="onSelectItem(i)" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom9.data.length || search"
                        >
                          <span
                            v-if="lookup_custom9.current_page > 1"
                            @click="onGetSlotRack(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom9.last_page >
                              lookup_custom9.current_page
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
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotLevel"
                        :options="lookup_custom10.data"
                        :filterable="false"
                        @search="onGetSlotLevel"
                        v-model="item.slot_penyimpanan_id_level"
                        :reduce="(item) => item.slot_penyimpanan_id"
                      >
                        <!-- @input="onSelectItem(i)" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom10.data.length || search"
                        >
                          <span
                            v-if="lookup_custom10.current_page > 1"
                            @click="onGetSlotLevel(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom10.last_page >
                              lookup_custom10.current_page
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
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotBin"
                        :options="lookup_roles.data"
                        :filterable="false"
                        @search="onGetSlotBin"
                        v-model="item.slot_penyimpanan_id_bin"
                        :reduce="(item) => item.slot_penyimpanan_id"
                      >
                        <!-- @input="onSelectItem(i)" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_roles.data.length || search"
                        >
                          <span
                            v-if="lookup_roles.current_page > 1"
                            @click="onGetSlotBin(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_roles.last_page > lookup_roles.current_page
                            "
                            @click="onGetSlotBin(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
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
                        @click="onDeleteItem(i)"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
    <ModalPickRequest :self="this" ref="modalPickRequest" />
  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
import ModalPickRequest from "../../../components/transaksional/ModalPickRequest.vue";
export default {
  props: ["self"],

  components: {
    ModalPickRequest,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isStopSearchUser: false,
      isLoadingGetUser: false,
      user_search: "",

      // isStopSearchItemGudang: false,
      // isLoadingGetItemGudang: false,
      // gudang_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchZonaGudang: false,
      isLoadingGetZonaGudang: false,
      zona_gudang_search: "",

      isStopSearchPickRequest: false,
      isLoadingGetPickRequest: false,
      pick_request_search: "",

      isStopSearchPerson: false,
      isLoadingGetPerson: false,
      person_search: "",

      isStopSearchPeralatan: false,
      isLoadingGetPeralatan: false,
      peralatan_search: "",

      isStopSearchAisle: false,
      isLoadingGetAisle: false,
      aisle_search: "",

      isStopSearchRack: false,
      isLoadingGetRack: false,
      rack_search: "",

      isStopSearchLevel: false,
      isLoadingGetLevel: false,
      level_search: "",

      isStopSearchBin: false,
      isLoadingGetBin: false,
      bin_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Pick Order",
      parameters: {
        url: "outbound/pick-order",
        form: {
          // pick_request_id: "",
          gudang_id: "",
          kode_pick_order: "",
          user_id_pic: "",
          tanggal: "",
          no_referensi_1: "",
          no_referensi_2: "",
          no_referensi_3: "",
          person_id: "",
          peralatan_id: "",
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
      // console.log("error", error);
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchUser();
    // await this.onSearchPickRequest();
    await this.onSearchGudang();
    // await this.onSearchItemGudang();
    // await this.onSearchZonaGudang();
    await this.onSearchPerson();
    await this.onSearchPeralatan();
    await this.onSearchSlotAisle();
    await this.onSearchSlotRack();
    await this.onSearchSlotLevel();
    await this.onSearchSlotBin();
    this.getGeoLocation();
    this.getUserAgent();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //user pic
      // "lookup_custom2", //item gudang
      // "lookup_custom3", //zona gudang
      "lookup_custom4", //pick request
      "lookup_custom5", //person
      "lookup_custom6", //equipment
      "lookup_custom7", //gudang
      "lookup_custom8", //aisle
      "lookup_custom9", //rack
      "lookup_custom10", //level
      "lookup_roles", //bin
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
      if (!search?.length && typeof isNext === "function") return;

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

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }
        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom7",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGudang = false;
      }
    },

    // onGetZonaGudang(search, isNext) {
    //   if (!search.length && typeof isNext === "function") return;

    //   clearTimeout(this.isStopSearchZonaGudang);

    //   this.isStopSearchZonaGudang = setTimeout(() => {
    //     this.zona_gudang_search = search;

    //     if (typeof isNext !== "function") {
    //       this.lookup_custom3.current_page = isNext
    //         ? this.lookup_custom3.current_page + 1
    //         : this.lookup_custom3.current_page - 1;
    //     } else {
    //       this.lookup_custom3.current_page = 1;
    //     }
    //     this.onSearchZonaudang();
    //   }, 600);
    // },

    // async onSearchZonaGudang() {
    //   if (!this.isLoadingGetZonaGudang) {
    //     this.isLoadingGetZonaGudang = true;

    //     await this.lookUp({
    //       url: "master/zona-gudang/get-zona-gudang",
    //       lookup: "custom3",
    //       query:
    //         "?search=" +
    //         this.zona_gudang_search +
    //         "&page=" +
    //         this.lookup_custom3.current_page +
    //         "&per_page=10",
    //     });
    //     this.isLoadingGetZonaGudang = false;
    //   }
    // },

    onGetPickRequest(search, isNext) {
      if (!search?.length && typeof isNext === "function") return;

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
          url: "outbound/pick-request",
          lookup: "custom4",
          query:
            "?search=" +
            this.pick_request_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });
        this.isLoadingGetPickRequest = false;
        console.log(this.lookup_custom4.data);
      }
    },

    onGetPerson(search, isNext) {
      if (!search?.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchPerson);

      this.isStopSearchPerson = setTimeout(() => {
        this.person_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }
        this.onSearchPerson();
      }, 600);
    },

    async onSearchPerson() {
      if (!this.isLoadingGetPerson) {
        this.isLoadingGetPerson = true;

        await this.lookUp({
          url: "setting/user",
          lookup: "custom5",
          query:
            "?search=" +
            this.person_search +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });
        this.isLoadingGetPerson = false;
      }
    },

    onGetPeralatan(search, isNext) {
      if (!search?.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchPeralatan);

      this.isStopSearchPeralatan = setTimeout(() => {
        this.peralatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }
        this.onSearchPeralatan();
      }, 600);
    },

    async onSearchPeralatan() {
      if (!this.isLoadingGetPeralatan) {
        this.isLoadingGetPeralatan = true;

        await this.lookUp({
          url: "master/jenis-peralatan/get-jenis-peralatan",
          lookup: "custom6",
          query:
            "?search=" +
            this.peralatan_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });
        this.isLoadingGetPeralatan = false;
      }
    },

    onGetSlotAisle(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotAisle);

      this.isStopSearchSlotAisle = setTimeout(() => {
        this.aisle_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchSlotAisle();
      }, 600);
    },

    async onSearchSlotAisle() {
      if (!this.isLoadingGetSlotAisle) {
        this.isLoadingGetSlotAisle = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom8",
          query:
            "?search=" +
            this.aisle_search +
            "&level=1" +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotAisle = false;
      }
    },

    onGetSlotRack(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotRack);

      this.isStopSearchSlotRack = setTimeout(() => {
        this.rack_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchSlotRack();
      }, 600);
    },

    async onSearchSlotRack() {
      if (!this.isLoadingGetSlotRack) {
        this.isLoadingGetSlotRack = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom9",
          query:
            "?search=" +
            this.rack_search +
            "&level=2" +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotRack = false;
      }
    },

    onGetSlotLevel(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotLevel);

      this.isStopSearchSlotLevel = setTimeout(() => {
        this.level_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom10.current_page = isNext
            ? this.lookup_custom10.current_page + 1
            : this.lookup_custom10.current_page - 1;
        } else {
          this.lookup_custom10.current_page = 1;
        }

        this.onSearchSlotLevel();
      }, 600);
    },

    async onSearchSlotLevel() {
      if (!this.isLoadingGetSlotLevel) {
        this.isLoadingGetSlotLevel = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom10",
          query:
            "?search=" +
            this.level_search +
            "&level=3" +
            "&page=" +
            this.lookup_custom10.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotLevel = false;
      }
    },

    onGetSlotBin(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotBin);

      this.isStopSearchSlotBin = setTimeout(() => {
        this.bin_search = search;

        if (typeof isNext !== "function") {
          this.lookup_roles.current_page = isNext
            ? this.lookup_roles.current_page + 1
            : this.lookup_roles.current_page - 1;
        } else {
          this.lookup_roles.current_page = 1;
        }

        this.onSearchSlotBin();
      }, 600);
    },

    async onSearchSlotBin() {
      if (!this.isLoadingGetSlotBin) {
        this.isLoadingGetSlotBin = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "roles",
          query:
            "?search=" +
            this.bin_search +
            "&level=4" +
            "&page=" +
            this.lookup_roles.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },

    onSelectStaff(item) {
      if (item) {
        this.parameters.form.person_id = item;
      } else {
        this.parameters.form.person_id = "";
      }
    },

    onSelectPeralatan(item) {
      if (item) {
        this.parameters.form.peralatan_id = item;
      } else {
        this.parameters.form.peralatan_id = "";
      }
    },

    onSelectPickRequest(item) {
      // this.parameters.form.pick_request_id = item;
      if (item) {
        this.parameters.form.pick_request_id = item;
      } else {
        this.parameters.form.pick_request_id = "";
      }
    },

    onSelectGudang(item) {
      if (item) {
        this.parameters.form.gudang_id = item;
      } else {
        this.parameters.form.gudang_id = "";
      }
    },

    async onOpenModalPickRequest() {
      if (this.parameters.form.gudang_id) {
        this.$refs.modalPickRequest.show();
        await this.$refs.modalPickRequest.onLoad();
        // this.$toaster.success(
        //   "Pick Request Dipilih" +
        //     this.parameters.form.pick_request_id.pick_request_id
        // );
      } else {
        this.$toaster.error("Gudang Belum Dipilih");
      }
    },

    addItem(item) {
      if (
        !this.parameters.form.detail_pick_order.find(
          (data) => data.pick_request_id === item.pick_request_id
        )
      ) {
        let detailItem = {
          ...item,
        };
        this.parameters.form.detail_pick_order.push(detailItem);
      } else {
        this.$toaster.error("Pick Request Sudah Ditambahkan");
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
