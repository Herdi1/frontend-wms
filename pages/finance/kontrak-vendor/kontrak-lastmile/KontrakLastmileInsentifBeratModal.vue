<template>
  <div v-if="showModal">
    <div @click="hide" class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="modal fade fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 overflow-y-auto dark:bg-slate-700 dark:text-gray-100"
      aria-hidden="true"
      id="modal-insentif-premi"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header flex justify-between text-xl font-bold mb-3">
            <h5 class="modal-title">Tambah Kontrak Lastmile Premi</h5>

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
              ref="validateInsentifPremi"
            >
              <form
                @submit.prevent="
                  validate().then(() => onSubmitInsentifPremi(invalid))
                "
              >
                <div class="grid grid-cols-2 w-[900px] gap-2 mt-10">
                  <div class="form-grup flex items-start mb-5 justify-between">
                    <label for="gudang_id">Gudang</label>
                    <v-select
                      label="nama_gudang"
                      :loading="self.isLoadingGetGudang"
                      :options="self.lookup_custom6.data"
                      @search="self.onGetGudang"
                      :filterable="false"
                      v-model="parameters.form.gudang_id"
                      class="w-[60%] mb-2"
                      @input="
                        self.onSearchItemGudang(
                          parameters.form.gudang_id?.gudang_id
                        )
                      "
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
                  <div class="form-group flex items-start mb-5 justify-between">
                    <label for="item_gudang_id">Item Gudang</label>
                    <v-select
                      label="nama_item"
                      :loading="self.isLoadingGetItemGudang"
                      :options="self.lookup_grade.data"
                      :filterable="false"
                      v-model="parameters.form.item_gudang_id"
                      @search="
                        (search) =>
                          self.onGetItemGudang(
                            parameters.form.gudang_id?.gudang_id,
                            search
                          )
                      "
                      class="w-[60%] mb-2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_grade.data.length || search"
                      >
                        <span
                          v-if="self.lookup_grade.current_page > 1"
                          @click="
                            self.onGetItemGudang(
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
                            self.lookup_grade.last_page >
                            self.lookup_grade.current_page
                          "
                          @click="
                            self.onGetItemGudang(
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
                  <div class="form-group flex items-start mb-5 justify-between">
                    <label for="group_item_id">Group Item</label>
                    <v-select
                      label="nama_group_item"
                      :loading="self.isLoadingGetGroupItem"
                      :options="self.lookup_customers.data"
                      :filterable="false"
                      @search="self.onGetGroupItem"
                      v-model="parameters.form.group_item_id"
                      class="w-[60%] mb-2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_customers.data.length || search"
                      >
                        <span
                          v-if="self.lookup_customers.current_page > 1"
                          @click="self.onGetGroupItem(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_customers.last_page >
                            self.lookup_customers.current_page
                          "
                          @click="self.onGetGroupItem(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
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
                    <label for="mata_uang_id">Mata Uang</label>
                    <v-select
                      label="nama_mata_uang"
                      :loading="self.isLoadingGetUang"
                      :options="self.lookup_custom10.data"
                      @search="self.onGetUang"
                      :filterable="false"
                      v-model="parameters.form.mata_uang_id"
                      class="w-[60%] mb-2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_custom10.data.length || search"
                      >
                        <span
                          v-if="self.lookup_custom10.current_page > 1"
                          @click="self.onGetUang(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_custom10.last_page >
                            self.lookup_custom10.current_page
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
                      :options="self.lookup_custom7.data"
                      @search="self.onGetPembayaran"
                      :filterable="false"
                      v-model="parameters.form.pembayaran_id"
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
                          @click="self.onGetPembayaran(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_custom7.last_page >
                            self.lookup_custom7.current_page
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
                      :options="self.lookup_custom8.data"
                      @search="self.onGetTerm"
                      :filterable="false"
                      v-model="parameters.form.term_pembayaran_id"
                      class="w-[60%] mb-2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_custom8.data.length || search"
                      >
                        <span
                          v-if="self.lookup_custom8.current_page > 1"
                          @click="self.onGetTerm(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_custom8.last_page >
                            self.lookup_custom8.current_page
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
                  <!-- <div class="form-grup mb-5">
                    <input-koma
                      name="biaya_perkm_muat"
                      label="Biaya PerKM Muat"
                      :value="parameters.form.biaya_perkm_muat"
                      v-model="parameters.form.biaya_perkm_muat"
                      isFlex="flex justify-between"
                    />
                  </div>
                  <div class="form-grup mb-5">
                    <input-koma
                      name="biaya_perkm_kosong"
                      label="Biaya PerKM Kosong"
                      :value="parameters.form.biaya_perkm_kosong"
                      v-model="parameters.form.biaya_perkm_kosong"
                      isFlex="flex justify-between"
                    />
                  </div>
                  <div class="form-grup mb-5">
                    <input-koma
                      name="standar_muat"
                      label="Standar Muat"
                      :value="parameters.form.standar_muat"
                      v-model="parameters.form.standar_muat"
                      isFlex="flex justify-between"
                    />
                  </div>
                  <div class="form-grup mb-5">
                    <input-koma
                      name="minimal_muat"
                      label="Minimal Muat"
                      :value="parameters.form.minimal_muat"
                      v-model="parameters.form.minimal_muat"
                      isFlex="flex justify-between"
                    />
                  </div>
                  <div class="form-grup mb-5">
                    <input-koma
                      name="maksimal_muat"
                      label="Maksimal Muat"
                      :value="parameters.form.maksimal_muat"
                      v-model="parameters.form.maksimal_muat"
                      isFlex="flex justify-between"
                    />
                  </div>
                  <div class="form-grup mb-5">
                    <input-koma
                      name="kecepatan_muat"
                      label="Kecepatan Muat"
                      :value="parameters.form.kecepatan_muat"
                      v-model="parameters.form.kecepatan_muat"
                      isFlex="flex justify-between"
                    />
                  </div>
                  <div class="form-grup mb-5">
                    <input-koma
                      name="kecepatan_kosong"
                      label="Kecepatan Kosong"
                      :value="parameters.form.kecepatan_kosong"
                      v-model="parameters.form.kecepatan_kosong"
                      isFlex="flex justify-between"
                    />
                  </div>
                  <div class="form-grup mb-5">
                    <input-koma
                      name="standar_waktu_muat"
                      label="Standar Waktu Muat"
                      :value="parameters.form.standar_waktu_muat"
                      v-model="parameters.form.standar_waktu_muat"
                      isFlex="flex justify-between"
                    />
                  </div>
                  <div class="form-grup mb-5">
                    <input-koma
                      name="standar_waktu_bongkar"
                      label="Standar Waktu Bongkar"
                      :value="parameters.form.standar_waktu_bongkar"
                      v-model="parameters.form.standar_waktu_bongkar"
                      isFlex="flex justify-between"
                    />
                  </div>
                  <div class="form-grup mb-5">
                    <input-koma
                      name="standar_waktu_istirahat_perkm"
                      label="Standar Waktu Isirahat PerKM"
                      :value="parameters.form.standar_waktu_istirahat_perkm"
                      v-model="parameters.form.standar_waktu_istirahat_perkm"
                      isFlex="flex justify-between"
                    />
                  </div>
                  <div class="form-grup mb-5">
                    <input-koma
                      name="maksimal_panjang"
                      label="Maksimal Panjang"
                      :value="parameters.form.maksimal_panjang"
                      v-model="parameters.form.maksimal_panjang"
                      isFlex="flex justify-between"
                    />
                  </div>
                  <div class="form-grup mb-5">
                    <input-koma
                      name="maksimal_lebar"
                      label="Maksimal Lebar"
                      :value="parameters.form.maksimal_lebar"
                      v-model="parameters.form.maksimal_lebar"
                      isFlex="flex justify-between"
                    />
                  </div>
                  <div class="form-grup mb-5">
                    <input-koma
                      name="maksimal_tinggi"
                      label="Maksimal Tinggi"
                      :value="parameters.form.maksimal_tinggi"
                      v-model="parameters.form.maksimal_tinggi"
                      isFlex="flex justify-between"
                    />
                  </div>
                  <div class="form-grup flex items-start justify-between mb-5">
                    <label for="satuan_id_dimensi">Satuan Dimensi</label>
                    <v-select
                      disabled
                      label="nama_satuan"
                      :loading="self.isLoadingGetDimensi"
                      :options="self.lookup_pengawas.data"
                      @search="self.onGetDimensi"
                      :filterable="false"
                      v-model="parameters.form.satuan_id_dimensi"
                      class="w-full mb-2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="self.lookup_pengawas.data.length || search"
                      >
                        <span
                          v-if="self.lookup_pengawas.current_page > 1"
                          @click="self.onGetDimensi(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            self.lookup_pengawas.last_page >
                            self.lookup_pengawas.current_page
                          "
                          @click="self.onGetDimensi(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div> -->
                  <div class="form-grup mb-5">
                    <input-koma
                      name="berat"
                      label="Berat"
                      :value="parameters.form.berat"
                      v-model="parameters.form.berat"
                      isFlex="flex justify-between"
                    />
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
                  :isLoadingForm="isLoadingFormInsentifRitese"
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

      isLoadingFormInsentifRitese: false,

      parameters: {
        form: {
          kontrak_lastmile_id: "",
          jenis_kontrak_id: "",
          divisi_id: "",
          jenis_biaya_id: "",
          gudang_id: "",
          mata_uang_id: "",
          pembayaran_id: "",
          term_pembayaran_id: "",
          payable_to: "",
          jenis_kendaraan_id: "",
          biaya_perkm_muat: "",
          biaya_perkm_kosong: "",
          standar_muat: "",
          minimal_muat: "",
          maksimal_muat: "",
          kecepatan_muat: "",
          kecepatan_kosong: "",
          standar_waktu_muat: "",
          standar_waktu_bongkar: "",
          standar_waktu_istirahat_perkm: "",
          maksimal_panjang: "",
          maksimal_lebar: "",
          maksimal_tinggi: "",
          satuan_id_dimensi: "",
          group_item_id: "",
          item_gudang_id: "",
          berat: "",
          nilai_kontrak: "",
        },
      },
    };
  },

  methods: {
    async onSubmitInsentifPremi(isInvalid) {
      if (isInvalid || this.isLoadingFormInsentifRitese) return;

      this.isLoadingFormInsentifRitese = true;
      let url;

      if (this.parameters.form.kontrak_lastmile_premi_detail_id) {
        url = `finance/kontrak-lastmile/put-detail-kontrak-premi/${this.parameters.form.kontrak_lastmile_premi_detail_id}`;
      } else {
        url = `finance/kontrak-lastmile/post-detail-kontrak-premi/${this.parameters.form.kontrak_lastmile_id}`;
      }

      let formData = {
        ...this.parameters.form,
        kontrak_lastmile_premi_detail_id:
          typeof this.parameters.form.kontrak_lastmile_premi_detail_id ===
          "object"
            ? this.parameters.form.kontrak_lastmile_premi_detail_id
                .kontrak_lastmile_premi_detail_id
            : this.parameters.form.kontrak_lastmile_premi_detail_id,
        jenis_kontrak_id:
          typeof this.parameters.form.jenis_kontrak_id === "object"
            ? this.parameters.form.jenis_kontrak_id.jenis_kontrak_id
            : this.parameters.form.jenis_kontrak_id,
        divisi_id:
          typeof this.parameters.form.divisi_id === "object"
            ? this.parameters.form.divisi_id.divisi_id
            : this.parameters.form.divisi_id,
        jenis_biaya_id:
          typeof this.parameters.form.jenis_biaya_id === "object"
            ? this.parameters.form.jenis_biaya_id.jenis_biaya_id
            : this.parameters.form.jenis_biaya_id,
        gudang_id:
          typeof this.parameters.form.gudang_id === "object"
            ? this.parameters.form.gudang_id.gudang_id
            : this.parameters.form.gudang_id,
        mata_uang_id:
          typeof this.parameters.form.mata_uang_id === "object"
            ? this.parameters.form.mata_uang_id.mata_uang_id
            : this.parameters.form.mata_uang_id,
        pembayaran_id:
          typeof this.parameters.form.pembayaran_id === "object"
            ? this.parameters.form.pembayaran_id.pembayaran_id
            : this.parameters.form.pembayaran_id,
        term_pembayaran_id:
          typeof this.parameters.form.term_pembayaran_id === "object"
            ? this.parameters.form.term_pembayaran_id.term_pembayaran_id
            : this.parameters.form.term_pembayaran_id,
        group_item_id:
          typeof this.parameters.form.group_item_id === "object"
            ? this.parameters.form.group_item_id.group_item_id
            : this.parameters.form.group_item_id,
        item_gudang_id:
          typeof this.parameters.form.item_gudang_id === "object"
            ? this.parameters.form.item_gudang_id.item_gudang_id
            : this.parameters.form.item_gudang_id,
      };

      this.$axios({
        method: this.parameters.form.kontrak_lastmile_premi_detail_id
          ? "put"
          : "post",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " +
              this.parameters.form.kontrak_lastmile_premi_detail_id
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
          this.isLoadingFormInsentifRitese = false;
        });
    },

    formReset() {
      this.parameters.form = {
        kontrak_lastmile_id: "",
        jenis_kontrak_id: "",
        divisi_id: "",
        jenis_biaya_id: "",
        gudang_id: "",
        mata_uang_id: "",
        pembayaran_id: "",
        term_pembayaran_id: "",
        payable_to: "",
        jenis_kendaraan_id: "",
        biaya_perkm_muat: "",
        biaya_perkm_kosong: "",
        standar_muat: "",
        minimal_muat: "",
        maksimal_muat: "",
        kecepatan_muat: "",
        kecepatan_kosong: "",
        standar_waktu_muat: "",
        standar_waktu_bongkar: "",
        standar_waktu_istirahat_perkm: "",
        maksimal_panjang: "",
        maksimal_lebar: "",
        maksimal_tinggi: "",
        satuan_id_dimensi: "",
        group_item_id: "",
        item_gudang_id: "",
        berat: "",
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
