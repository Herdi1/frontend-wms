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
            <div class="w-full pt-3 mb-3">
              <div class="w-full flex justify-between items-center">
                <h1 class="text-xl font-bold">Konfirmasi Stok Transfer</h1>
                <div class=" "></div>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-1 w-[60%] mb-7">
              <div class="form-group flex items-center">
                <label for="" class="w-[40%]"
                  >Status Konfirmasi <span class="text-danger">*</span></label
                >
                <select
                  name=""
                  id=""
                  v-model="form.status_konfirmasi"
                  class="w-[60%] p-1 rounded-sm border border-gray-300 outline-none"
                >
                  <option value="0">Menunggu</option>
                  <option value="1">Dikonfirmasi</option>
                </select>
              </div>
              <div class="form-group">
                <input-horizontal
                  label="Tanggal Konfirmasi"
                  type="date"
                  name="tanggal"
                  labelWidth="w-[40%]"
                  inputWidth="w-[60%]"
                  :isHorizontal="true"
                  v-model="form.tanggal_konfirmasi"
                  :required="true"
                />
              </div>
              <div class="form-group flex items-top">
                <label for="" class="w-[40%]">Catatan Konfirmasi</label>
                <textarea
                  placeholder="Catatan"
                  class="w-[60%] pl-2 py-1 border rounded focus:outline-none"
                  v-model="form.catatan_konfirmasi"
                ></textarea>
              </div>
              <div class="form-group">
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
                  :disabled="true"
                />
              </div>
              <div class="w-full mb-2">
                <input-horizontal
                  label="Gudang Penerima"
                  type="text"
                  name="gudang_id"
                  labelWidth="w-[40%]"
                  inputWidth="w-[60%]"
                  :isHorizontal="true"
                  v-model="form.gudang_penerima.nama_gudang"
                  :disabled="true"
                />
              </div>
              <div class="w-full mb-2">
                <input-horizontal
                  label="Gudang Asal"
                  type="text"
                  name="gudang_id"
                  labelWidth="w-[40%]"
                  inputWidth="w-[60%]"
                  :isHorizontal="true"
                  v-model="form.gudang_asal.nama_gudang"
                  :disabled="true"
                />
              </div>
              <div class="form-group flex items-top">
                <label for="" class="w-[40%]">Keterangan</label>
                <textarea
                  disabled
                  placeholder="Keterangan"
                  class="w-[60%] pl-2 py-1 border rounded focus:outline-none"
                  v-model="form.keterangan"
                ></textarea>
                <!-- <input-horizontal
                  label="Keterangan"
                  type="text"
                  name="keterangan"
                  labelWidth="w-[40%]"
                  inputWidth="w-[60%]"
                  :isHorizontal="true"
                  v-model="form.keterangan"
                  :disabled="true"
                /> -->
              </div>
            </div>

            <div class="w-full flex justify-between items-center">
              <h1 class="text-xl font-bold">Detail Stok Transfer</h1>
              <div class=" ">
                <!-- <button
                  type="button"
                  @click="addDetailTransfer"
                  class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                >
                  <i class="fas fa-plus"></i>
                  <p class="text-xs font-medium">Tambah Detail</p>
                </button> -->
              </div>
            </div>
            <div class="table-responsive overflow-y-hidden mb-7">
              <table
                class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                :class="form.detail_stok_transfer.length ? 'mb-[300px]' : ''"
              >
                <thead>
                  <tr class="text-sm uppercase text-nowrap">
                    <th class="w-[200px] border border-gray-300">Item</th>
                    <th class="w-[200px] border border-gray-300">Quantity</th>
                    <th class="w-[200px] border border-gray-300">Satuan</th>
                    <th class="w-[200px] border border-gray-300">keterangan</th>
                    <!-- <th class="w-[50px] border border-gray-300 text-center">
                      Delete
                    </th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in form.detail_stok_transfer"
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
                        disabled
                        @input="(item) => onSelectItemGudang(item, index)"
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
                      <money
                        disabled
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
                        v-model="item.satuan"
                        disabled
                      />
                    </td>
                    <td class="border border-gray-300">
                      <textarea
                        disabled
                        placeholder="Keterangan"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        v-model="item.keterangan"
                      ></textarea>
                    </td>
                    <!-- <td class="border border-gray-300 text-center">
                      <i
                        class="fas fa-trash mx-auto"
                        style="cursor: pointer"
                        @click="deleteDetailTransfer(index)"
                      ></i>
                    </td> -->
                  </tr>
                  <tr v-if="!form.detail_stok_transfer.length > 0">
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
            <modal-footer-section
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
              class="m-5"
            />
          </div>
        </form>
      </ValidationObserver>
      <success-modal
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
      </success-modal>
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

      isStopSearchSatuan: false,
      isLoadingGetSatuan: false,
      satuan_search: "",

      user: this.$auth.user,
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Konfirmasi Stok Transfer",
      url: "inventory/konfirmas-stok-transfer",

      form: {
        konfirmasi_stok_transfer_id: "",
        kode_stok_transfer: "",
        tanggal: "",
        gudang_id_penerima: "",
        gudang_id_asal: "",
        keterangan: "",
        detail_stok_transfer: [],

        gudang_penerima: { nama_gudang: "" },
        gudang_asal: { nama_gudang: "" },

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      default_form: {
        permintaan_stok_id: "",
        kode_stok_transfer: "",
        tanggal: "",
        gudang_id_penerima: "",
        gudang_id_asal: "",
        keterangan: "",
        detail_stok_transfer: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      showModal: false,
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(
          `inventory/konfirmasi-stok-transfer/${this.id}`
        );
        Object.keys(this.form).forEach((item) => {
          if (item != "detail_stok_transfer") {
            this.form[item] = res.data[item];
          }
        });

        this.form.detail_stok_transfer = res.data.detail_stok_transfer.map(
          (item) => {
            return {
              ...item,
              detail_stok_transfer_id: item || "",
              item_gudang_id: item.item_gudang,
            };
          }
        );

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/inventory/stok-transfer/permintaan-stok");
    }
  },

  async mounted() {
    // await this.onSearchItemGudang();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_suppliers",
      "lookup_products",
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
            this.form.longitude = position.coords.longitude.toString();
            this.form.latitude = position.coords.latitude.toString();
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
      let url = "inventory/konfirmasi-stok-transfer";

      let formData = {
        ...this.form,
        gudang_id_asal:
          typeof this.form.gudang_asal === "object"
            ? this.form.gudang_asal.gudang_id
            : "",
        gudang_id_asal:
          typeof this.form.gudang_penerima === "object"
            ? this.form.gudang_penerima.gudang_id
            : "",
      };

      // formData.detail_stok_transfer =

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
            "Data berhasil di " +
              (this.isEditable == true ? "Diedit" : "Tambah")
          );

          if (!this.isEditable) {
            this.form = this.default_form;
          }
          this.showModal = true;
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    addDetailTransfer() {
      this.form.detail_stok_transfer.push({
        detail_stok_transfer_id: "",
        item_gudang_id: "",
        quantity: "",
        satuan_id: "",
        keterangan: "",
      });
    },

    deleteDetailTransfer(index) {
      this.form.detail_stok_transfer = this.form.detail_stok_transfer.filter(
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

    onSelectGudangAsal(item) {
      if (item) {
        this.form.gudang_id_asal = item;
      } else {
        this.form.gudang_id_asal = "";
      }
    },

    async onSelectGudangPenerima(item) {
      if (item) {
        this.form.gudang_id_penerima = item;
        await this.onSearchItemGudang();
      } else {
        this.form.gudang_id_penerima = "";
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
            this.form.gudang_id_penerima +
            "&page=" +
            this.lookup_products.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItemGudang = false;
      }
    },

    onSelectItemGudang(item, index) {
      if (item) {
        this.form.detail_stok_transfer[index].item_gudang_id = item;
        this.form.detail_stok_transfer[index].satuan = item.satuan
          ? item.satuan.nama_satuan
          : "";
      } else {
        this.form.detail_stok_transfer[index].item_gudang_id = "";
        this.form.detail_stok_transfer[index].satuan = "";
      }
    },
  },
};
</script>
