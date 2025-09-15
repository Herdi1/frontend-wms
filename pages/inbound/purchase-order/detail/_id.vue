<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Purchase Order</h1>

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
          <div class="w-full">
            <div
              class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
            >
              <div
                class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 w-full"
              >
                <div class="flex w-full items-center">
                  <label class="w-[40%]">Kode PO</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.kode_po ? parameters.form.kode_po : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%]">Referensi External</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.kode_sap ? parameters.form.kode_sap : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%]">Gudang</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.gudang_id
                        ? parameters.form.gudang_id.nama_gudang
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%]">Doc Type External</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.doc_type_sap
                        ? parameters.form.doc_type_sap
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%]">Lokasi Asal Muat</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.lokasi_id_asal_muat
                        ? parameters.form.lokasi_id_asal_muat.nama_lokasi
                        : "-"
                    }}
                  </div>
                </div>
                <div
                  class="flex w-full items-center"
                  v-if="!parameters.form.lokasi_id_asal_muat"
                >
                  <label class="w-[40%]">Asal Muat</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.asal_muat
                        ? parameters.form.asal_muat
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%]">Pelanggan</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.pelanggan_id
                        ? parameters.form.pelanggan_id.nama_pelanggan
                        : "-"
                    }}
                  </div>
                </div>

                <div class="flex w-full items-center">
                  <label class="w-[40%]">Nomor Referensi</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.no_referensi
                        ? parameters.form.no_referensi
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%]">Nomor Referensi 2</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.no_referensi_2
                        ? parameters.form.no_referensi_2
                        : "-"
                    }}
                  </div>
                </div>

                <div class="flex w-full items-center">
                  <label class="w-[40%]">Supplier</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.supplier_id
                        ? parameters.form.supplier_id.nama_supplier
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%]">Perkiraan Tiba</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.perkiraan_tiba
                        ? parameters.form.perkiraan_tiba
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%]">Kebutuhan Peralatan</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.kebutuhan_peralatan
                        ? parameters.form.kebutuhan_peralatan
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%]">Handling Instruction</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.handling_instruction
                        ? parameters.form.handling_instruction
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%]">Catatan</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      parameters.form.catatan ? parameters.form.catatan : "-"
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
            >
              <div class="form-group w-full flex">
                <div class="mb-3 w-1/2">Status PO</div>

                <select
                  class="p-1 w-1/2 border border-gray-300 rounded-sm outline-none"
                  name="status_selesai"
                  id="status_selesai"
                  v-model="parameters.form.status_selesai"
                >
                  <option value="0">Open</option>
                  <option value="1">Close</option>
                </select>
              </div>
              <div class="form-group w-full flex">
                <label for="" class="mb-3 w-1/2">Catatan Selesai</label>
                <textarea
                  name="catatan"
                  v-model="parameters.form.catatan_selesai"
                  class="w-1/2 border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <h1 class="text-xl font-bold mb-2 uppercase">
              Detail Purchase Order
            </h1>
          </div>
          <div
            class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
          >
            <div class="w-full relative overflow-x-auto">
              <table
                class="mb-5 table-fixed border border-collapse border-gray-300"
              >
                <thead>
                  <tr class="uppercase">
                    <th class="w-40 border border-gray-300">Item Gudang</th>
                    <th class="w-40 border border-gray-300">Quantity</th>
                    <th class="w-40 border border-gray-300">Serial Number</th>
                    <th class="w-40 border border-gray-300">Nomor Referensi</th>
                    <th class="w-40 border border-gray-300">Dimensi</th>
                    <th class="w-40 border border-gray-300">Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in parameters.form.purchase_order_details"
                    :key="i"
                    class="border-t border-gray-400 align-top"
                  >
                    <td class="border border-gray-300">
                      {{ item.item_gudang ? item.item_gudang.nama_item : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.quantity ? item.quantity : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.serial_number ? item.serial_number : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.no_referensi ? item.no_referensi : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      <div class="flex justify-between">
                        <h2>Panjang</h2>
                        <span>
                          {{ item.panjang }}
                        </span>
                      </div>
                      <div class="flex justify-between">
                        <h2>Lebar</h2>
                        <span>
                          {{ item.lebar }}
                        </span>
                      </div>
                      <div class="flex justify-between">
                        <h2>Tinggi</h2>
                        <span>
                          {{ item.tinggi }}
                        </span>
                      </div>
                      <div class="flex justify-between">
                        <h2>Berat</h2>
                        <span>
                          {{ item.berat }}
                        </span>
                      </div>
                    </td>
                    <td class="border border-gray-300">
                      {{ item.note ? item.note : "-" }}
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
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      user: this.$auth.user,
      parameters: {
        form: {
          gudang_id: "",
          kode_po: "",
          kode_sap: "",
          doc_type_sap: "",
          tanggal: "",
          lokasi_id_asal_muat: "",
          asal_muat: "",
          vendor_id_transporter: "",
          nama_transporter: "",
          surat_jalan: "",
          no_referensi: "",
          no_referensi_2: "",
          kendaraan_id: "",
          nama_kendaraan: "",
          staff_id: "",
          nama_pengemudi: "",
          supplier_id: "",
          perkiraan_tiba: "",
          kebutuhan_peralatan: "",
          handling_instruction: "",
          catatan: "",
          pelanggan_id: "",
          status_selesai: "",
          catatan_selesai: "",
          purchase_order_details: [],
        },
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`inbound/purchase-order/${this.id}`);
      Object.keys(this.parameters.form).forEach((item) => {
        if (item != "purchase_order_details") {
          this.parameters.form[item] = res.data[item];
        }
      });
      this.parameters.form.gudang_id = res.data.gudang ?? "";
      this.parameters.form.lokasi_id_asal_muat =
        res.data.lokasi_asal_muat ?? "";
      this.parameters.form.vendor_id_transporter =
        res.data.vendor_transporter ?? "";
      this.parameters.form.kendaraan_id = res.data.kendaraan ?? "";
      this.parameters.form.pengemudi_id = res.data.pengemudi ?? "";
      this.parameters.form.supplier_id = res.data.supplier ?? "";
      this.parameters.form.pelanggan_id = res.data.pelanggan ?? "";
      this.parameters.form.staff_id = res.data.staff ?? "";
      this.parameters.form.purchase_order_details =
        res.data.purchase_order_details.map((item) => {
          return {
            ...item,
            item_gudang_id: item.item_gudang,
          };
        });
      this.isLoadingPage = false;
      console.log(this.parameters.form);
    } catch (error) {
      this.$router.back();
      // console.log("erorr", error);
    }
  },

  methods: {
    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "inbound/purchase-order/close";

      let formData = {
        status_selesai: this.parameters.form.status_selesai,
        catatan_selesai: this.parameters.form.catatan_selesai,
      };

      if (this.user.gudang_id) {
        formData.gudang_id = this.user.gudang_id;
      }

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
          this.$toaster.success("Data berhasil di Edit");

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

    formReset() {
      this.parameters.form = {
        gudang_id: "",
        kode_po: "",
        kode_sap: "",
        doc_type_sap: "",
        tanggal: "",
        lokasi_id_asal_muat: "",
        asal_muat: "",
        vendor_id_transporter: "",
        nama_transporter: "",
        surat_jalan: "",
        no_referensi: "",
        no_referensi_2: "",
        kendaraan_id: "",
        nama_kendaraan: "",
        staff_id: "",
        nama_pengemudi: "",
        supplier_id: "",
        perkiraan_tiba: "",
        kebutuhan_peralatan: "",
        handling_instruction: "",
        catatan: "",
        pelanggan_id: "",
        status_selesai: "",
        catatan_selesai: "",
        purchase_order_details: [],
      };
    },
  },
};
</script>
