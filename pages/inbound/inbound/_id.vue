<template>
  <section class="section uppercase">
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
            class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="w-full pt-3">
              <!-- inbound -->
              <div class="w-full flex justify-between items-center">
                <h1 class="text-xl font-bold">Inbound</h1>
                <div class=" ">
                  <!-- <button
                    type="button"
                    @click="AddBiayaInbound"
                    class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">Tambah Detail ASN</p>
                  </button> -->
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3 w-full mb-7">
                <!-- <div class="form-group flex items-center">
                  <label for="" class="w-[40%]">ASN</label>
                  let itemsQuantity = this.form.inbound_details.reduce((acc, data) => {
            if (!acc[data.item.nama_item]) {
              acc[data.item.nama_item] = 0;
            }
            acc[data.item.nama_item] += data.quantity;
            return acc;
          }, {});

          const result = Object.entries(itemsQuantity).map(
            ([nama_item, quantity]) => ({
              nama_item,
              quantity,
            })
          );
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom6.data.length || search"
                    >
                      <span
                        v-if="lookup_custom6.current_page > 1"
                        @click="onGetAsn(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom6.last_page > lookup_custom6.current_page
                        "
                        @click="onGetAsn(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div> -->
                <div class="form-group flex items-center">
                  <label for="" class="w-[40%]">Status Inbound</label>
                  <select
                    name=""
                    id=""
                    v-model="form.sumber_data"
                    class="w-[60%] p-1 rounded-sm border border-gray-300 outline-none"
                  >
                    <option value="PO">Purchase Order</option>
                    <option value="ASN">ASN</option>
                    <option value="NON">Non ASN/Non PO</option>
                  </select>
                </div>
                <select-button
                  v-if="form.sumber_data === 'ASN'"
                  :self="{
                    label: 'ASN',
                    optionLabel: 'kode_asn',
                    isLoading: isLoadingGetAsn,
                    lookup: lookup_custom6,
                    onGet: onGetAsn,
                    value: form.asn_id,
                    input: onSelectAsn,
                  }"
                  width="w-[60%]"
                />
                <select-button
                  v-if="form.sumber_data === 'PO'"
                  :self="{
                    label: 'Purchase Order',
                    optionLabel: 'kode_po',
                    isLoading: isLoadingGetPurchaseOrder,
                    lookup: lookup_beam,
                    onGet: onGetPurchaseOrder,
                    value: form.purchase_order_id,
                    input: onSelectPo,
                  }"
                  width="w-[60%]"
                />
                <div class="form-group">
                  <input-horizontal
                    label="Tipe Dokumen External"
                    type="text"
                    name="doc_type_sap"
                    labelWidth="w-[40%]"
                    inputWidth="w-[60%]"
                    :isHorizontal="true"
                    v-model="form.doc_type_sap"
                    :required="false"
                    :disabled="form.sumber_data !== 'NON'"
                  />
                </div>
                <!-- <div class="form-group">
                  <input-horizontal
                    label="Kode Inbound"
                    type="text"
                    name="kode_inbound"
                    labelWidth="w-[30%]"
                    inputWidth="w-[70%]"
                    :isHorizontal="true"
                    v-model="form.kode_inbound"
                    :required="false"
                  />
                </div> -->
                <div class="form-group">
                  <input-horizontal
                    label="Surat Jalan"
                    type="text"
                    name="surat_jalan"
                    labelWidth="w-[40%]"
                    inputWidth="w-[60%]"
                    :isHorizontal="true"
                    v-model="form.surat_jalan"
                    :required="false"
                    :disabled="form.sumber_data !== 'NON'"
                  />
                </div>
                <div class="form-group">
                  <input-horizontal
                    label="Nomor Referensi 1"
                    type="text"
                    name="no_referensi_1"
                    labelWidth="w-[40%]"
                    inputWidth="w-[60%]"
                    :isHorizontal="true"
                    v-model="form.no_referensi_1"
                    :required="false"
                    :disabled="form.sumber_data !== 'NON'"
                  />
                </div>
                <div class="form-group">
                  <input-horizontal
                    label="Nomor Referensi 2"
                    type="text"
                    name="no_referensi_2"
                    labelWidth="w-[40%]"
                    inputWidth="w-[60%]"
                    :isHorizontal="true"
                    v-model="form.no_referensi_2"
                    :required="false"
                    :disabled="form.sumber_data !== 'NON'"
                  />
                </div>
                <div class="form-group">
                  <input-horizontal
                    label="Nomor Referensi 3"
                    type="text"
                    name="no_referensi_3"
                    labelWidth="w-[40%]"
                    inputWidth="w-[60%]"
                    :isHorizontal="true"
                    v-model="form.no_referensi_3"
                    :required="false"
                    :disabled="form.sumber_data !== 'NON'"
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
                <div class="form-group" v-if="!user.gudang_id">
                  <select-button
                    :self="{
                      label: 'Gudang',
                      optionLabel: 'nama_gudang',
                      isLoading: isLoadingGetGudang,
                      lookup: lookup_suppliers,
                      value: form.gudang_id,
                      onGet: onGetGudang,
                      input: onSelectGudang,
                    }"
                    width="w-[60%]"
                  />
                </div>
                <!-- <div class="form-group">
                  <input-horizontal
                    label="Tanggal Approve"
                    type="date"
                    name="tanggal_approve"
                    labelWidth="w-[40%]"
                    inputWidth="w-[60%]"
                    :isHorizontal="true"
                    v-model="form.tanggal_approve"
                    :required="false"
                  />
                </div> -->
              </div>

              <tab-component :tabs="tabs">
                <template #DetailInbound>
                  <InboundDetails :self="{ form, items }" />
                </template>
                <template #BiayaInbound>
                  <BiayaInbounds :self="{ form }" />
                </template>
              </tab-component>
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
import { mapActions, mapState } from "vuex";
import InboundDetails from "./InboundDetails.vue";
import BiayaInbounds from "./BiayaInbounds.vue";

export default {
  props: ["self"],

  components: {
    InboundDetails,
    BiayaInbounds,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        { name: "DETAIL INBOUND", slotName: "DetailInbound" },
        { name: "BIAYA INBOUND", slotName: "BiayaInbound" },
      ],

      id,

      isStopSearchAsn: false,
      isLoadingGetAsn: false,
      asn_search: "",

      isStopSearchPurchaseOrder: false,
      isLoadingGetPurchaseOrder: false,
      po_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Inbound",
      url: "inbound/inbound",

      form: {
        inbound_id: "",
        sumber_data: "ASN",
        asn_id: "",
        purchase_order_id: "",
        surat_jalan: "",
        doc_type_sap: "",
        kode_inbound: "",
        no_referensi_1: "",
        no_referensi_2: "",
        no_referensi_3: "",
        tanggal: "",

        tanggal_approve: "",
        gudang_id: "",

        inbound_details: [],
        biaya_inbounds: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      default_form: {
        inbound_id: "",
        sumber_data: "ASN",
        asn_id: "",
        surat_jalan: "",
        doc_type_sap: "",
        kode_inbound: "",
        no_referensi_1: "",
        no_referensi_2: "",
        no_referensi_3: "",
        tanggal: "",

        tanggal_approve: "",
        gudang_id: "",

        inbound_details: [],
        biaya_inbounds: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      items: [],
      items_quantity: [],
      showModal: false,
    };
  },

  async created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    try {
      this.form.tanggal = formattedDate;
      if (this.isEditable) {
        let res = await this.$axios.get(`inbound/inbound/${this.id}`);
        Object.keys(this.form).forEach((item) => {
          if (item !== "inbound_details") {
            this.form[item] = res.data[item];
          }
        });

        this.form.gudang_id = res.data.gudang;

        if (res.data.sumber_data === "ASN") {
          // this.onSelectAsn(res.data.purchase_order)
          this.form.asn_id = res.data.asn;
          this.form.inbound_details = res.data.inbound_details.map((item) => {
            return {
              ...item,
              item_gudang_id: item.item_gudang,
              detail_inbound_id: item,
              zona_gudang_id: item.zona_gudang,
              slot_penyimpanan_id_aisle:
                typeof item.slot_penyimpanan_aisle === "object" &&
                item.slot_penyimpanan_aisle
                  ? item.slot_penyimpanan_aisle
                  : "",
              slot_penyimpanan_id_rack:
                typeof item.slot_penyimpanan_rack === "object" &&
                item.slot_penyimpanan_rack
                  ? item.slot_penyimpanan_rack
                  : "",
              slot_penyimpanan_id_level:
                typeof item.slot_penyimpanan_level === "object" &&
                item.slot_penyimpanan_level
                  ? item.slot_penyimpanan_level
                  : "",
              slot_penyimpanan_id_bin:
                typeof item.slot_penyimpanan_bin === "object" &&
                item.slot_penyimpanan_bin
                  ? item.slot_penyimpanan_bin
                  : "",
            };
          });
          this.form.biaya_inbounds = res.data.biaya_inbounds.map((item) => {
            return {
              ...item,
              nama_item: item.item_gudang.nama_item,
              kode_item: item.item_gudang.kode_item,
              jenis_biaya_id: item.jenis_biaya,
            };
          });
        }
        if (res.data.sumber_data === "PO") {
          // this.onSelectPo(res.data.purchase_order)
          this.form.purchase_order_id = res.data.purchase_order;
          this.form.inbound_details = res.data.inbound_details.map((item) => {
            return {
              ...item,
              item_gudang_id: item.item_gudang,
              detail_inbound_id: item,
              zona_gudang_id: item.zona_gudang,
              slot_penyimpanan_id_aisle:
                typeof item.slot_penyimpanan_aisle === "object"
                  ? item.slot_penyimpanan_aisle
                  : "",
              slot_penyimpanan_id_rack:
                typeof item.slot_penyimpanan_rack === "object"
                  ? item.slot_penyimpanan_rack
                  : "",
              slot_penyimpanan_id_level:
                typeof item.slot_penyimpanan_level === "object"
                  ? item.slot_penyimpanan_level
                  : "",
              slot_penyimpanan_id_bin:
                typeof item.slot_penyimpanan_bin === "object"
                  ? item.slot_penyimpanan_bin
                  : "",
            };
          });
          this.form.biaya_inbounds = res.data.biaya_inbounds.map((item) => {
            return {
              ...item,
              nama_item: item.item_gudang.nama_item,
              kode_item: item.item_gudang.kode_item,
            };
          });
        }
        if (res.data.sumber_data === "NON") {
          // this.onSelectPo(res.data.purchase_order)
          // this.form.purchase_order_id = res.data.purchase_order;
          this.form.inbound_details = res.data.inbound_details.map((item) => {
            return {
              ...item,
              item_gudang_id: item.item_gudang,
              detail_inbound_id: item,
              zona_gudang_id: item.zona_gudang,
              slot_penyimpanan_id_aisle:
                typeof item.slot_penyimpanan_aisle === "object"
                  ? item.slot_penyimpanan_aisle
                  : "",
              slot_penyimpanan_id_rack:
                typeof item.slot_penyimpanan_rack === "object"
                  ? item.slot_penyimpanan_rack
                  : "",
              slot_penyimpanan_id_level:
                typeof item.slot_penyimpanan_level === "object"
                  ? item.slot_penyimpanan_level
                  : "",
              slot_penyimpanan_id_bin:
                typeof item.slot_penyimpanan_bin === "object"
                  ? item.slot_penyimpanan_bin
                  : "",
            };
          });
          this.form.biaya_inbounds = res.data.biaya_inbounds.map((item) => {
            return {
              ...item,
              nama_item: item.item_gudang.nama_item,
              kode_item: item.item_gudang.kode_item,
            };
          });
        }
        if (this.isEditable) {
          this.items = [];
          res.data.inbound_details.forEach((item) => {
            this.items.push(item.item_gudang);
          });
        }

        if (res.data.biaya_inbounds) {
          this.form.biaya_inbounds = res.data.biaya_inbounds.map((item) => {
            return { ...item, biaya_inbound_id: item };
          });
        }

        if (this.user.gudang_id) {
          this.form.gudang_id = this.user.gudang_id;
        }

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/inbound/inbound");
      console.log(error);
    }
  },

  async mounted() {
    // await this.onSearchAsn();

    await this.onSearchGudang();

    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",

      "lookup_custom6",
      "lookup_custom7",
      "lookup_custom8",
      "lookup_custom9",
      "lookup_custom10",

      "lookup_beam",
      "lookup_products",
      "lookup_suppliers",
    ]),

    //check if the real storaage slot is same as the plan
    isSameAsPlan() {
      let isSameAsPlan = this.form.inbound_details.every((data) => {
        return (
          data.zona_gudang_id === data.zona_gudang_id_plan &&
          data.slot_penyimpanan_id_aisle.slot_penyimpanan_id ===
            data.slot_penyimpanan_id_aisle_plan &&
          data.slot_penyimpanan_id_rack.slot_penyimpanan_id ===
            data.slot_penyimpanan_id_rack_plan &&
          data.slot_penyimpanan_id_level.slot_penyimpanan_id ===
            data.slot_penyimpanan_id_level_plan &&
          data.slot_penyimpanan_id_bin.slot_penyimpanan_id ===
            data.slot_penyimpanan_id_bin_plan
        );
      });
      return isSameAsPlan ? "" : "required";
    },

    //check total item quantity
    itemsQuantity() {
      let itemsQuantity = this.form.inbound_details.reduce((acc, data) => {
        if (!acc[data.item_id.nama_item]) {
          acc[data.item_id.nama_item] = 0;
        }
        acc[data.item_id.nama_item] += data.quantity;
        return acc;
      }, {});

      const result = Object.entries(itemsQuantity).map(
        ([nama_item, quantity]) => ({
          nama_item,
          quantity,
        })
      );

      return result;
    },
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
      let url = "inbound/inbound";

      let gudang;
      if (this.user.gudang_id) {
        gudang = this.user.gudang_id;
      } else {
        gudang = typeof this.form.gudang_id
          ? this.form.gudang_id.gudang_id
          : "";
      }

      let formData = {
        ...this.form,
        asn_id: this.form.asn_id
          ? typeof this.form.asn_id === "object"
            ? this.form.asn_id.asn_id
            : this.form.asn_id
          : "",
        purchase_order_id: this.form.purchase_order_id
          ? typeof this.form.purchase_order_id === "object"
            ? this.form.purchase_order_id.purchase_order_id
            : this.form.purchase_order_id
          : "",
        gudang_id: gudang,
        // supplier_id: this.form.asn_id ? this.form.asn_id.supplier_id : this.form.purchase_order_id.supplier_id,
      };

      // today's date

      // formData.tanggal_approve = formattedDate;
      console.log(this.form);
      formData.inbound_details = formData.inbound_details.map((item) => {
        return {
          ...item,
          detail_inbound_id: item.detail_inbound_id
            ? item.detail_inbound_id.detail_inbound_id
            : "",
          valuation_id: item.valuation_id ?? "",
          item_gudang_id:
            typeof item.item_gudang_id === "object"
              ? item.item_gudang_id.item_gudang_id
              : item.item_gudang_id,
          item_id: this.isEditable
            ? item.item.item_id
            : item.item_gudang_id.item_id,
          item_pelanggan_id: "",
          zona_gudang_id:
            typeof item.zona_gudang_id === "object"
              ? item.zona_gudang_id.zona_gudang_id
              : "",
          slot_penyimpanan_id_aisle:
            typeof item.slot_penyimpanan_id_aisle === "object" &&
            item.slot_penyimpanan_aisle
              ? item.slot_penyimpanan_id_aisle.slot_penyimpanan_id
              : "",
          slot_penyimpanan_id_rack:
            typeof item.slot_penyimpanan_id_rack === "object" &&
            item.slot_penyimpanan_rack
              ? item.slot_penyimpanan_id_rack.slot_penyimpanan_id
              : "",
          slot_penyimpanan_id_level:
            typeof item.slot_penyimpanan_id_level === "object" &&
            item.slot_penyimpanan_level
              ? item.slot_penyimpanan_id_level.slot_penyimpanan_id
              : "",
          slot_penyimpanan_id_bin:
            typeof item.slot_penyimpanan_id_bin === "object" &&
            item.slot_penyimpanan_bin
              ? item.slot_penyimpanan_id_bin.slot_penyimpanan_id
              : "",
          keterangan: item.keterangan || "",
          stok_transfer_detail_id: item.stok_transfer_detail_id,
        };
      });

      console.log("after inbound");

      formData.biaya_inbounds = formData.biaya_inbounds.map((item) => {
        return {
          ...item,
          biaya_inbound_id:
            typeof item.biaya_inbound_id === "object"
              ? item.biaya_inbound_id.biaya_inbound_id
              : "",
          jenis_biaya_id:
            typeof item.jenis_biaya_id === "object"
              ? item.jenis_biaya_id.jenis_biaya_id
              : item.jenis_biaya_id,
          berat: item.berat > 0 ? item.berat : 1,
          volume: item.volume > 0 ? item.volume : 1,
          jenis: item.jenis ? item.jenis : 0,
          keterangan: item.keterangan || "",
        };
      });

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

    AddDetailInbound() {
      this.form.inbound_details.push({
        detail_inbound_id: "",
        item_id: "",
        serial_number: "",
        quantity: "",
        valuation_id: "",
        panjang: "",
        lebar: "",
        tinggi: "",
        berat: "",
        zona_id: "",
        slot_penyimpanan_id_aisle: "",
        slot_penyimpanan_id_rack: "",
        slot_penyimpanan_id_level: "",
        slot_penyimpanan_id_bin: "",
        keterangan: "",
        alasan_beda_plan_id: "",
      });
    },

    AddBiayaInbound() {
      this.form.biaya_inbounds.push({
        biaya_inbound_id: "",
        jenis_biaya_id: "",
        nominal_satuan: "",
        jumlah: "",
        total: "",
        coa_id: "",
        divis_id: "",
        vendor_id: "",
      });
    },

    onDeleteDetails(index) {
      this.form.inbound_details = this.form.inbound_details.filter(
        (_, itemIndex) => index !== itemIndex
      );
    },

    onDeleteItem(index) {
      this.form.biaya_inbounds = this.form.biaya_inbounds.filter(
        (_, itemIndex) => index !== itemIndex
      );
    },

    // get asn
    onGetAsn(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchAsn);

      this.isStopSearchAsn = setTimeout(() => {
        this.asn_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchAsn();
      }, 600);
    },

    async onSearchAsn() {
      if (!this.isLoadingGetAsn) {
        this.isLoadingGetAsn = true;

        await this.lookUp({
          url: "inbound/asn/get-asn",
          lookup: "custom6",
          query:
            "?search=" +
            this.asn_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetAsn = false;
      }
    },

    // get po
    onGetPurchaseOrder(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPurchaseOrder);

      this.isStopSearchPurchaseOrder = setTimeout(() => {
        this.po_search = search;

        if (typeof isNext !== "function") {
          this.lookup_beam.current_page = isNext
            ? this.lookup_beam.current_page + 1
            : this.lookup_beam.current_page - 1;
        } else {
          this.lookup_beam.current_page = 1;
        }

        this.onSearchPurchaseOrder();
      }, 600);
    },

    async onSearchPurchaseOrder() {
      if (!this.isLoadingGetPurchaseOrder) {
        this.isLoadingGetPurchaseOrder = true;

        await this.lookUp({
          url: "inbound/purchase-order/get-purchase-order",
          lookup: "beam",
          query:
            "?search=" +
            this.po_search +
            "&page=" +
            this.lookup_beam.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPurchaseOrder = false;
      }
    },

    async onSelectAsn(item) {
      if (item) {
        this.form.inbound_details = [];
        this.items = [];
        this.form.asn_id = item;
        this.form.doc_type_sap = item.doc_type_sap;
        this.form.surat_jalan = item.surat_jalan;
        this.form.no_referensi_1 = item.no_referensi;
        this.form.no_referensi_2 = item.no_referensi_2;
        // this.form.tanggal = item.tanggal;
        this.form.gudang_id = item.gudang;
        if (item.asn_details) {
          this.items = item.asn_details.map((data) => {
            return {
              ...data,
              item_gudang_id: data.item_gudang_id,
              nama_item: data.item.nama_item,
              asn_detail_id: data.asn_detail_id,
              purchase_order_detail_id: data.purchase_order_detail_id ?? "",
              serial_number: data.serial_number ?? "",
              no_referensi: data.no_referensi ?? "",
              quantity: parseFloat(data.quantity),
              panjang: data.panjang,
              lebar: data.lebar,
              berat: data.berat,
              tinggi: data.tinggi,
              zona_gudang_id: data.zona_gudang_plan,
              slot_penyimpanan_id_aisle: data.slot_penyimpanan_aisle_plan
                ? item.slot_penyimpanan_aisle_plan
                : "",
              slot_penyimpanan_id_rack: data.slot_penyimpanan_rack_plan
                ? item.slot_penyimpanan_rack_plan
                : "",
              slot_penyimpanan_id_level: data.slot_penyimpanan_level_plan
                ? item.slot_penyimpanan_level_plan
                : "",
              slot_penyimpanan_id_bin: data.slot_penyimpanan_bin_plan
                ? item.slot_penyimpanan_bin_plan
                : "",
            };
          });
          console.log(this.items);
          let itemsQuantity = this.form.inbound_details.reduce((acc, data) => {
            if (!acc[data.item.nama_item]) {
              acc[data.item.nama_item] = 0;
            }
            acc[data.item.nama_item] += parseFloat(data.quantity) || 0;
            console.log(data.quantity);
            return acc;
          }, {});

          const result = Object.entries(itemsQuantity).map(
            ([nama_item, quantity]) => ({
              nama_item,
              quantity,
            })
          );

          this.items_quantity = result;
        }

        // await this.onSearchValuation();
        // await this.onSearchSlotAisle();
        // await this.onSearchSlotRack();
        // await this.onSearchSlotLevel();
        // await this.onSearchSlotBin();
      } else {
        this.form.asn_id = "";
        this.form.doc_type_sap = "";
        this.form.surat_jalan = "";
        this.form.no_referensi_1 = "";
        this.form.no_referensi_2 = "";
        this.form.tanggal = "";
        this.form.gudang_id = "";
        this.form.inbound_details = [];
      }
    },

    async onSelectPo(item) {
      if (item) {
        this.form.inbound_details = [];
        this.items = [];
        this.form.purchase_order_id = item;
        this.form.doc_type_sap = item.doc_type_sap;
        this.form.surat_jalan = item.surat_jalan;
        this.form.no_referensi_1 = item.no_referensi;
        this.form.no_referensi_2 = item.no_referensi_2;
        this.form.gudang_id = item.gudang;
        // this.form.tanggal = item.tanggal;
        // this.form.gudang_id = item.gudang_id;
        if (item.purchase_order_details) {
          this.items = item.purchase_order_details.map((data) => {
            return {
              ...data,
              item_gudang_id: data.item_gudang_id,
              nama_item: data.item_gudang.nama_item,
              purchase_order_detail_id: data.purchase_order_detail_id ?? "",
              serial_number: data.serial_number ?? "",
              no_referensi: data.no_referensi ?? "",
              quantity: parseFloat(data.quantity),
            };
          });
          console.log(this.items);
          let itemsQuantity = this.form.inbound_details.reduce((acc, data) => {
            if (!acc[data.item.nama_item]) {
              acc[data.item.nama_item] = 0;
            }
            acc[data.item.nama_item] += data.quantity;
            return acc;
          }, {});

          const result = Object.entries(itemsQuantity).map(
            ([nama_item, quantity]) => ({
              nama_item,
              quantity,
            })
          );

          this.items_quantity = result;
        }

        // await this.onSearchValuation();
        // await this.onSearchSlotAisle();
        // await this.onSearchSlotRack();
        // await this.onSearchSlotLevel();
        // await this.onSearchSlotBin();
      } else {
        this.form.purchase_order_id = "";
        this.form.doc_type_sap = "";
        this.form.surat_jalan = "";
        this.form.no_referensi_1 = "";
        this.form.no_referensi_2 = "";
        this.form.tanggal = "";
        this.form.gudang_id = "";
        this.form.inbound_details = [];
        this.items = [];
      }
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
          url: "master/gudang/get-gudang-user",
          lookup: "suppliers",
          query:
            "?search=" +
            this.gudang_search +
            "&user_id=" +
            this.user.user_id +
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
        this.form.inbound_details = [];
        this.form.biaya_inbounds = [];
        await this.onSearchItemGudang();
      } else {
        this.form.gudang_id = "";
      }
    },

    onCloseModal() {
      this.showModal = false;
      this.$router.push("/inbound/inbound");
    },

    onPrintLabel() {
      console.log("printing label");
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
  },
};
</script>
