<template>
  <div v-if="showModal">
    <div @click="hide" class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="modal fade fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 overflow-y-auto dark:bg-slate-700 dark:text-gray-100"
      aria-hidden="true"
      id="modal-insentif-jarak"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header flex justify-between text-xl font-bold mb-3">
            <h5 class="modal-title">Tambah Kontrak TKBM</h5>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hide()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <ValidationObserver
              v-slot="{ invalid, validate }"
              ref="validateTkbm"
            >
              <form
                @submit.prevent="validate().then(() => onSubmitTkbm(invalid))"
              >
                <div class="grid grid-cols-2 w-[700px] gap-2 mt-10">
                  <div class="form-group flex items-start mb-5 justify-between">
                    <label for="jenis_kontrak_id">Jenis Kontrak</label>
                    <v-select
                      label="nama_jenis_kontrak"
                      :loading="self.isLoadingGetJenisKontrak"
                      :options="self.lookup_custom3.data"
                      @search="self.onGetJenisKontrak"
                      :filterable="false"
                      v-model="parameters.form.jenis_kontrak_id"
                      class="w-[60%] mb-2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_custom3.data.length || search"
                      >
                        <span
                          v-if="self.lookup_custom3.current_page > 1"
                          @click="self.onGetJenisKontrak(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_custom3.last_page >
                            self.lookup_custom3.current_page
                          "
                          @click="self.onGetJenisKontrak(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>

                  <div class="form-grup flex items-start mb-5 justify-between">
                    <label for="divisi_id">Divisi</label>
                    <v-select
                      label="nama_divisi"
                      :loading="self.isLoadingGetDivisi"
                      :options="self.lookup_custom4.data"
                      @search="self.onGetDivisi"
                      :filterable="false"
                      v-model="parameters.form.divisi_id"
                      class="w-[60%] mb-2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_custom4.data.length || search"
                      >
                        <span
                          v-if="self.lookup_custom4.current_page > 1"
                          @click="self.onGetDivisi(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_custom4.last_page >
                            self.lookup_custom4.current_page
                          "
                          @click="self.onGetDivisi(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="form-grup flex items-start mb-5 justify-between">
                    <label for="jenis_biaya_id">Jenis Biaya</label>
                    <v-select
                      label="nama_jenis_biaya"
                      :loading="self.isLoadingGetJenisBiaya"
                      :options="self.lookup_custom5.data"
                      @search="self.onGetJenisBiaya"
                      :filterable="false"
                      v-model="parameters.form.jenis_biaya_id"
                      class="w-[60%] mb-2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_custom5.data.length || search"
                      >
                        <span
                          v-if="self.lookup_custom5.current_page > 1"
                          @click="self.onGetJenisBiaya(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_custom5.last_page >
                            self.lookup_custom5.current_page
                          "
                          @click="self.onGetJenisBiaya(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="form-grup flex items-start mb-5 justify-between">
                    <label for="gudang_id">Gudang</label>
                    <v-select
                      label="nama_gudang"
                      :loading="self.isLoadingGetGudang"
                      :options="self.lookup_custom6.data"
                      @search="self.onGetGudang"
                      :filterable="false"
                      v-model="parameters.form.gudang_id"
                      @input="(item) => self.onSearchItem(item.gudang_id)"
                      class="w-[60%] mb-2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_custom6.data.length || search"
                      >
                        <span
                          v-if="self.lookup_custom6.current_page > 1"
                          @click="self.onGetGudang(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_custom6.last_page >
                            self.lookup_custom6.current_page
                          "
                          @click="self.onGetGudang(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="form-grup flex items-start mb-5 justify-between">
                    <label for="group_item_id">Group Item</label>
                    <v-select
                      class="w-[60%] rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_group_item"
                      :loading="self.isLoadingGetGroup"
                      :options="self.lookup_custom8.data"
                      :filterable="false"
                      @search="self.onGetGroup"
                      v-model="parameters.form.group_item_id"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_custom8.data.length || search"
                      >
                        <span
                          v-if="self.lookup_custom8.current_page > 1"
                          @click="self.onGetGroup(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_custom8.last_page >
                            self.lookup_custom8.current_page
                          "
                          @click="self.onGetGroup(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="form-grup flex items-start mb-5 justify-between">
                    <label for="group_item_id">Item Gudang</label>
                    <v-select
                      class="w-[60%] rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_item"
                      :loading="self.isLoadingGetItem"
                      :options="self.lookup_custom10.data"
                      :filterable="false"
                      @search="
                        (search) =>
                          self.onGetItem(
                            parameters.form.gudang_id?.gudang_id,
                            search
                          )
                      "
                      v-model="parameters.form.item_gudang_id"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_custom10.data.length || search"
                      >
                        <span
                          v-if="self.lookup_custom10.current_page > 1"
                          @click="
                            self.onGetItem(
                              parameters.form.gudang_id?.gudang_id,
                              search,
                              false
                            )
                          "
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_custom10.last_page >
                            self.lookup_custom10.current_page
                          "
                          @click="
                            self.onGetItem(
                              parameters.form.gudang_id?.gudang_id,
                              search,
                              true
                            )
                          "
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="form-grup flex items-start mb-5 justify-between">
                    <label for="mata_uang_id">Mata Uang</label>
                    <v-select
                      label="nama_mata_uang"
                      :loading="self.isLoadingGetUang"
                      :options="self.lookup_beam.data"
                      @search="self.onGetUang"
                      :filterable="false"
                      v-model="parameters.form.mata_uang_id"
                      class="w-[60%] mb-2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_beam.data.length || search"
                      >
                        <span
                          v-if="self.lookup_beam.current_page > 1"
                          @click="self.onGetUang(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_beam.last_page >
                            self.lookup_beam.current_page
                          "
                          @click="self.onGetUang(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="form-grup flex items-start mb-5 justify-between">
                    <label for="pembayaran_id">Pembayaran</label>
                    <v-select
                      label="nama_pembayaran"
                      :loading="self.isLoadingGetPembayaran"
                      :options="self.lookup_custom2.data"
                      @search="self.onGetPembayaran"
                      :filterable="false"
                      v-model="parameters.form.pembayaran_id"
                      class="w-[60%] mb-2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_custom2.data.length || search"
                      >
                        <span
                          v-if="self.lookup_custom2.current_page > 1"
                          @click="self.onGetPembayaran(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_custom2.last_page >
                            self.lookup_custom2.current_page
                          "
                          @click="self.onGetPembayaran(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="form-grup flex items-start mb-5 justify-between">
                    <label for="term_pembayaran_id">Term Pembayaran</label>
                    <v-select
                      label="nama_term_pembayaran"
                      :loading="self.isLoadingGetTerm"
                      :options="self.lookup_custom7.data"
                      @search="self.onGetTerm"
                      :filterable="false"
                      v-model="parameters.form.term_pembayaran_id"
                      class="w-[60%] mb-2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_custom7.data.length || search"
                      >
                        <span
                          v-if="self.lookup_custom7.current_page > 1"
                          @click="self.onGetTerm(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_custom7.last_page >
                            self.lookup_custom7.current_page
                          "
                          @click="self.onGetTerm(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="form-grup flex items-start justify-between mb-5">
                    <label for="payable_to">Payable To</label>
                    <select
                      v-model="parameters.form.payable_to"
                      name=""
                      id=""
                      class="pl-2 py-1 border border-gray-300 rounded focus:outline-none w-[60%]"
                    >
                      <option value=""></option>
                      <option value="DRIVER">Driver</option>
                      <option value="VENDOR">Vendor</option>
                      <option value="PIC">PIC</option>
                    </select>
                  </div>
                  <!-- <div class="form-grup flex items-start justify-between mb-5">
                    <label for="jenis_kendaraan_id">Jenis Kendaraan</label>
                    <v-select
                      label="nama_jenis_kendaraan"
                      :loading="self.isLoadingGetJenisKendaraan"
                      :options="self.lookup_custom9.data"
                      @search="self.onGetJenisKendaraan"
                      :filterable="false"
                      v-model="parameters.form.jenis_kendaraan_id"
                      class="w-[60%] mb-2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_custom9.data.length || search"
                      >
                        <span
                          v-if="self.lookup_custom9.current_page > 1"
                          @click="self.onGetJenisKendaraan(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_custom9.last_page >
                            self.lookup_custom9.current_page
                          "
                          @click="self.onGetJenisKendaraan(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div> -->
                  <div class="flex items-start justify-between form-group mb-5">
                    <label for="">Dasar Perhitungan</label>
                    <select
                      class="border border-gray-300 rounded md p-1 outline-none w-[60%] text-gray-500"
                      v-model="parameters.form.dasar_perhitungan"
                    >
                      <option value="QTY">Qty</option>
                      <option value="BERAT">Berat</option>
                      <option value="VOLUME">Volume</option>
                    </select>
                  </div>
                  <div class="flex items-start justify-between form-group mb-5">
                    <label for="">Satuan</label>
                    <v-select
                      class="w-[60%] rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_satuan"
                      :loading="self.isLoadingGetSatuan"
                      :options="self.lookup_custom9.data"
                      :filterable="false"
                      @search="self.onGetSatuan"
                      v-model="parameters.form.satuan_id"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_custom9.data.length || search"
                      >
                        <span
                          v-if="self.lookup_custom9.current_page > 1"
                          @click="self.onGetSatuan(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_custom9.last_page >
                            self.lookup_custom9.current_page
                          "
                          @click="self.onGetSatuan(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="form-grup mb-5">
                    <input-koma
                      name="nilai_kontrak"
                      label="Nilai Kontrak"
                      :value="parameters.form.nilai_kontrak"
                      v-model="parameters.form.nilai_kontrak"
                      isFlex="flex justify-between"
                    />
                  </div>
                </div>
                <modal-footer-section
                  class="mt-5"
                  :isLoadingForm="isLoadingFormTkbm"
                  @reset="formReset()"
                />
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  props: {
    self: Object,
  },

  data() {
    return {
      showModal: false,

      isLoadingFormTkbm: false,

      parameters: {
        form: {
          kontrak_tkbm_id: "",
          kontrak_tkbm_detail_id: "",
          jenis_kontrak_id: "",
          divisi_id: "",
          jenis_biaya_id: "",
          gudang_id: "",
          term_pembayaran_id: "",
          group_item_id: "",
          item_id: "",
          dasar_perhitungan: "",
          satuan_id: "",
          payable_to: "",
          mata_uang_id: "",
          item_gudang_id: "",
          nilai_kontrak: "",
        },
      },
    };
  },

  methods: {
    async onSubmitTkbm(isInvalid) {
      if (isInvalid || this.isLoadingFormTkbm) return;

      this.isLoadingForm = true;
      let url;

      if (this.parameters.form.kontrak_tkbm_detail_id) {
        url = `finance/kontrak-tkbm/put-detail-kontrak-tkbm/${this.parameters.form.kontrak_tkbm_detail_id}`;
      } else {
        url = `finance/kontrak-tkbm/post-detail-kontrak-tkbm/${this.parameters.form.kontrak_tkbm_id}`;
      }

      let formData = {
        ...this.parameters.form,
        kontrak_tkbm_detail_id: this.parameters.form.kontrak_tkbm_detail_id,
        jenis_kontrak_id:
          typeof this.parameters.form.jenis_kontrak_id == "object"
            ? this.parameters.form.jenis_kontrak_id.jenis_kontrak_id
            : "",
        item_gudang_id:
          typeof this.parameters.form.item_gudang_id == "object"
            ? this.parameters.form.item_gudang_id.item_gudang_id
            : this.parameters.form.item_gudang_id,
        item_id:
          typeof this.parameters.form.item_gudang_id == "object"
            ? this.parameters.form.item_gudang_id.item_id ?? ""
            : "",
        satuan_id:
          typeof this.parameters.form.satuan_id == "object"
            ? this.parameters.form.satuan_id.satuan_id
            : this.parameters.form.satuan_id,
        gudang_id:
          typeof this.parameters.form.gudang_id == "object"
            ? this.parameters.form.gudang_id.gudang_id
            : this.parameters.form.gudang_id,
        divisi_id:
          typeof this.parameters.form.divisi_id == "object"
            ? this.parameters.form.divisi_id.divisi_id
            : this.parameters.form.divisi_id,
        jenis_biaya_id:
          typeof this.parameters.form.jenis_biaya_id == "object"
            ? this.parameters.form.jenis_biaya_id.jenis_biaya_id
            : this.parameters.form.jenis_biaya_id,
        mata_uang_id:
          typeof this.parameters.form.mata_uang_id == "object"
            ? this.parameters.form.mata_uang_id.mata_uang_id
            : this.parameters.form.mata_uang_id,
        pembayaran_id:
          typeof this.parameters.form.pembayaran_id == "object"
            ? this.parameters.form.pembayaran_id.pembayaran_id
            : this.parameters.form.pembayaran_id,
        term_pembayaran_id:
          typeof this.parameters.form.term_pembayaran_id == "object"
            ? this.parameters.form.term_pembayaran_id.term_pembayaran_id
            : this.parameters.form.term_pembayaran_id,
        group_item_id:
          typeof this.parameters.form.group_item_id == "object"
            ? this.parameters.form.group_item_id.group_item_id
            : this.parameters.form.group_item_id,
      };

      this.$axios({
        method: this.parameters.form.kontrak_tkbm_detail_id ? "put" : "post",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " + this.parameters.form.kontrak_tkbm_detail_id
              ? "Edit"
              : "Tambah"
          );
          this.self.onLoad();
          this.hide();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
        });
    },

    formReset() {
      this.parameters.form = {
        kontrak_tkbm_id: "",
        jenis_kontrak_id: "",
        divisi_id: "",
        jenis_biaya_id: "",
        gudang_id: "",
        term_pembayaran_id: "",
        group_item_id: "",
        item_id: "",
        dasar_perhitungan: "",
        satuan_id: "",
        payable_to: "",
        mata_uang_id: "",
        item_gudang_id: "",
        nilai_kontrak: "",
      };
    },

    show() {
      this.showModal = true;
      console.log(this.showModal);
    },
    hide() {
      this.showModal = false;
      this.formReset();
    },
  },
};
</script>
