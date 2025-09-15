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
            class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 w-full section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="form-group">
              <input-horizontal
                label="Kode Inbound"
                type="text"
                name="kode_inbound"
                labelWidth="w-[40%]"
                inputWidth="w-[60%]"
                :isHorizontal="true"
                v-model="form.kode_inbound"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-horizontal
                label="Nomor Surat Jalan"
                type="text"
                name="nomor_surat_jalan"
                labelWidth="w-[40%]"
                inputWidth="w-[60%]"
                :isHorizontal="true"
                v-model="form.nomor_surat_jalan"
                :required="false"
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
            <div class="form-group">
              <input-horizontal
                label="No Referensi"
                type="text"
                name="no_referensi"
                labelWidth="w-[40%]"
                inputWidth="w-[60%]"
                :isHorizontal="true"
                v-model="form.no_referensi"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-horizontal
                label="No Referensi 2"
                type="text"
                name="no_referensi_2"
                labelWidth="w-[40%]"
                inputWidth="w-[60%]"
                :isHorizontal="true"
                v-model="form.no_referensi_2"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-horizontal
                label="No Referensi 3"
                type="text"
                name="no_referensi_3"
                labelWidth="w-[40%]"
                inputWidth="w-[60%]"
                :isHorizontal="true"
                v-model="form.no_referensi_3"
                :required="false"
              />
            </div>
            <div>
              <select-button
                :self="{
                  label: 'Gudang',
                  optionLabel: 'nama_gudang',
                  isLoading: isLoadingGetGudang,
                  lookup: lookup_custom1,
                  onGet: onGetGudang,
                  value: form.gudang_id,
                  input: onSelectGudang,
                }"
                width="w-[60%]"
                :required="true"
              />
            </div>
            <div>
              <select-button
                :self="{
                  label: 'Gudang Asal',
                  optionLabel: 'nama_gudang',
                  isLoading: isLoadingGetGudang,
                  lookup: lookup_custom1,
                  onGet: onGetGudang,
                  value: form.gudang_id_asal,
                  input: onSelectGudangAsal,
                }"
                width="w-[60%]"
                :required="true"
              />
            </div>
            <div class="form-group flex w-full items-center">
              <label for="keterangan" class="w-[40%]">Keterangan</label>
              <textarea
                placeholder="Keterangan"
                class="w-[60%] pl-2 py-1 border rounded focus:outline-none"
                v-model="form.keterangan"
              ></textarea>
            </div>
          </div>

          <div class="w-full mt-5 flex justify-between items-center">
            <h1 class="text-xl font-bold uppercase">Detail Produk</h1>
            <div class=" ">
              <button
                type="button"
                @click="addDetailProduk"
                class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
              >
                <i class="fas fa-plus"></i>
                <p class="text-xs font-medium">Tambah Detail</p>
              </button>
            </div>
          </div>
          <div
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="table-responsive overflow-y-hidden mb-7">
              <table
                class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                :class="form.detail_produk.length ? 'mb-[300px]' : ''"
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <th class="w-48 border border-gray-300">Nama Item</th>
                    <th class="w-40 border border-gray-300">Quantity</th>
                    <th class="w-40 border border-gray-300">Serial Number</th>
                    <th class="w-40 border border-gray-300">Tanggal Expired</th>
                    <th class="w-48 border border-gray-300">Zona Gudang</th>
                    <th class="w-48 border border-gray-300">Aisle</th>
                    <th class="w-48 border border-gray-300">Rack</th>
                    <th class="w-48 border border-gray-300">Level</th>
                    <th class="w-48 border border-gray-300">Bin</th>
                    <th class="w-40 border border-gray-300">Keterangan</th>
                    <th class="w-20 border border-gray-300">Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in form.detail_produk"
                    :key="i"
                    class="align-top border-t"
                  >
                    <td class="border border-gray-300">
                      <v-select
                        label="nama_item"
                        :loading="isLoadingGetItemGudang"
                        :options="lookup_custom2.data"
                        :filterable="false"
                        @search="onGetItemGudang"
                        v-model="item.item_gudang_id"
                        class="w-full"
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
                      <input
                        class="w-full p-1 rounded-md border border-gray-300"
                        type="text"
                        v-model="item.serial_number"
                        placeholder="Serial Number"
                      />
                    </td>
                    <td class="border border-gray-300">
                      <input
                        class="w-full p-1 rounded-md border border-gray-300"
                        type="date"
                        v-model="item.tanggal_expired"
                      />
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
                        v-model="item.zona_gudang_id"
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
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotAisle"
                        :options="lookup_custom4.data"
                        :filterable="false"
                        @search="onGetSlotAisle"
                        :reduce="(item) => item.slot_penyimpanan_id_aisle_plan"
                        v-model="item.slot_penyimpanan_id_aisle_plan"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom4.data.length || search"
                        >
                          <span
                            v-if="lookup_custom4.current_page > 1"
                            @click="onGetSlotAisle(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom4.last_page >
                              lookup_custom4.current_page
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
                        :options="lookup_custom5.data"
                        :filterable="false"
                        @search="onGetSlotRack"
                        :reduce="(item) => item.slot_penyimpanan_id_rack_plan"
                        v-model="item.slot_penyimpanan_id_rack_plan"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom5.data.length || search"
                        >
                          <span
                            v-if="lookup_custom5.current_page > 1"
                            @click="onGetSlotRack(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom5.last_page >
                              lookup_custom5.current_page
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
                        :options="lookup_custom6.data"
                        :filterable="false"
                        @search="onGetSlotLevel"
                        :reduce="(item) => item.slot_penyimpanan_id_level_plan"
                        v-model="item.slot_penyimpanan_id_level_plan"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom6.data.length || search"
                        >
                          <span
                            v-if="lookup_custom6.current_page > 1"
                            @click="onGetSlotLevel(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom6.last_page >
                              lookup_custom6.current_page
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
                        :options="lookup_custom7.data"
                        :filterable="false"
                        @search="onGetSlotBin"
                        :reduce="(item) => item.slot_penyimpanan_id_bin_plan"
                        v-model="item.slot_penyimpanan_id_bin_plan"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom7.data.length || search"
                        >
                          <span
                            v-if="lookup_custom7.current_page > 1"
                            @click="onGetSlotBin(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom7.last_page >
                              lookup_custom7.current_page
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
                        @click="onDeleteProduk(i)"
                      ></i>
                    </td>
                  </tr>
                  <tr v-if="!form.detail_produk.length > 0">
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
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
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

      isStopSearchZonaGudang: false,
      isLoadingGetZonaGudang: false,
      zona_gudang_search: "",

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
      title: "Inbound Stok Transfer",
      url: "inventory/stok-transfer/inbound",
      form: {
        kode_inbound: "",
        nomor_surat_jalan: "",
        tanggal: "",
        no_referensi: "",
        no_referensi_2: "",
        no_referensi_3: "",
        gudang_id: "",
        gudang_id_asal: "",
        keterangan: "",
        detail_produk: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      default_form: {
        kode_inbound: "",
        nomor_surat_jalan: "",
        tanggal: "",
        no_referensi: "",
        no_referensi_2: "",
        no_referensi_3: "",
        gudang_id: "",
        gudang_id_asal: "",
        keterangan: "",
        detail_produk: [],

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
        let res = await this.$axios.get(`${this.url}/${this.id}`);
        Object.keys(this.form).forEach((item) => {
          if (item != "detail_produk") {
            this.form[item] = res.data[item];
          }
        });

        this.form.detail_produk = res.data.detail_produk.map((item) => {
          return {
            ...item,
            detail_produk_id: item || "",
          };
        });
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
      // console.log("error",error);
    }
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchItemGudang();
    await this.onSearchZonaGudang();
    await this.onSearchSlotAisle();
    await this.onSearchSlotRack();
    await this.onSearchSlotLevel();
    await this.onSearchSlotBin();

    // await this.onSearchGudangAsal();
    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //gudang
      "lookup_custom2", //item gudang
      "lookup_custom3", //zona gudang
      "lookup_custom4", //slot aisle
      "lookup_custom5", //slot rack
      "lookup_custom6", //slot level
      "lookup_custom7", //slot bin
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

    onSelectGudang(item) {
      if (item) {
        this.form.gudang_id = item;
      } else {
        this.form.gudang_id = "";
      }
    },

    onSelectGudangAsal(item) {
      if (item) {
        this.form.gudang_id_asal = item;
      } else {
        this.form.gudang_id_asal = "";
      }
    },

    addDetailProduk() {
      this.form.detail_produk.push({
        detail_produk_id: "",
        item_gudang_id: "",
        quantity: "",
        serial_number: "",
        tanggal_expired: "",
        zona_gudang_id: "",
        slot_penyimpanan_id_aisle_plan: "",
        slot_penyimpanan_id_rack_plan: "",
        slot_penyimpanan_id_level_plan: "",
        slot_penyimpanan_id_bin_plan: "",
        keterangan: "",
      });
    },

    onDeleteProduk(index) {
      this.form.detail_produk = this.form.detail_produk.filter(
        (_, itemIndex) => index !== itemIndex
      );
    },

    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.item_gudang_search = search;

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
            this.item_gudang_search +
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

    onGetSlotAisle(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotAisle);

      this.isStopSearchSlotAisle = setTimeout(() => {
        this.slot_aisle_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchSlotAisle();
      }, 600);
    },

    async onSearchSlotAisle() {
      if (!this.isLoadingGetSlotAisle) {
        this.isLoadingGetSlotAisle = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom4",
          query:
            "?search=" +
            this.slot_aisle_search +
            "&level=1" +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotAisle = false;
      }
    },

    onGetSlotRack(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotRack);

      this.isStopSearchSlotRack = setTimeout(() => {
        this.slot_rack_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchSlotRack();
      }, 600);
    },

    async onSearchSlotRack() {
      if (!this.isLoadingGetSlotRack) {
        this.isLoadingGetSlotRack = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom5",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=2" +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotRack = false;
      }
    },

    onGetSlotLevel(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotLevel);

      this.isStopSearchSlotLevel = setTimeout(() => {
        this.slot_level_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchSlotLevel();
      }, 600);
    },

    async onSearchSlotLevel() {
      if (!this.isLoadingGetSlotLevel) {
        this.isLoadingGetSlotLevel = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom6",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=3" +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotLevel = false;
      }
    },

    onGetSlotBin(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotBin);

      this.isStopSearchSlotBin = setTimeout(() => {
        this.slot_bin_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchSlotBin();
      }, 600);
    },

    async onSearchSlotBin() {
      if (!this.isLoadingGetSlotBin) {
        this.isLoadingGetSlotBin = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom7",
          query:
            "?search=" +
            this.slot_bin_search +
            "&level=4" +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "inventory/stok-transfer/inbound";

      let formData = {
        ...this.form,
        gudang_id:
          typeof this.form.gudang_id === "object"
            ? this.form.gudang_id.gudang.id
            : "",
        gudang_id_asal:
          typeof this.form.gudang_id_asal === "object"
            ? this.form.gudang_id_asal.gudang.id
            : "",
      };

      if (this.isEditable) {
        url += `/${this.id}`;
      }

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
            this.form = this.default_form;
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
  },
};
</script>
