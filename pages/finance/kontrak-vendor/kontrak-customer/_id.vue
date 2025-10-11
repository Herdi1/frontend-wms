<template>
  <section class="section min-h-screen">
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
            <div class="form-group" v-if="isEditable">
              <input-horiontal
                label="Kode Kontrak"
                type="text"
                name="kode_kontrak"
                v-model="parameters.form.kode_kontrak"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="No Referensi"
                type="text"
                name="no_referensi"
                v-model="parameters.form.no_referensi"
                :required="false"
              />
            </div>
            <div class="form-group">
              <select-button
                :self="{
                  label: 'Pelanggan',
                  optionLabel: 'nama_pelanggan',
                  lookup: lookup_custom1,
                  value: parameters.form.pelanggan_id,
                  onGet: onGetPelanggan,
                  isLoadingL: isLoadingGetPelanggan,
                  input: onSelectPelanggan,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Kontrak"
                type="date"
                name="tanggal_kontrak"
                v-model="parameters.form.tanggal_kontrak"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Berlaku"
                type="date"
                name="tanggal_berlaku"
                v-model="parameters.form.tanggal_berlaku"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Berhenti"
                type="date"
                name="tanggal_berhenti"
                v-model="parameters.form.tanggal_berhenti"
                :required="false"
              />
            </div>
            <div class="form-group">
              <select-button
                :self="{
                  label: 'Jenis Kontrak',
                  optionLabel: 'nama_jenis_kontrak',
                  lookup: lookup_custom3,
                  value: parameters.form.jenis_kontrak_id,
                  onGet: onGetJenisKontrak,
                  isLoadingL: isLoadingGetJenisKontrak,
                  input: onSelectJenisKontrak,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>
            <div class="form-group">
              <select-button
                :self="{
                  label: 'PIC Kontrak',
                  optionLabel: 'nama_lengkap',
                  lookup: lookup_custom2,
                  value: parameters.form.user_id_pic,
                  onGet: onGetUser,
                  isLoadingL: isLoadingGetUser,
                  input: onSelectPIC,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>

            <!-- <div class="form-group">
              <select-button
                :self="{
                  label: 'Approver Kontrak',
                  optionLabel: 'nama_lengkap',
                  lookup: lookup_custom2,
                  value: parameters.form.user_id_approve,
                  onGet: onGetUser,
                  isLoadingL: isLoadingGetUser,
                  input: onSelectApprove,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div> -->
            <!-- <div class="form-group">
              <input-horiontal
                label="Tanggal Approve"
                type="date"
                name="tanggal_approve"
                v-model="parameters.form.tanggal_approve"
                :required="false"
              />
            </div> -->

            <div class="form-group w-full flex items-center">
              <label for="status" class="w-1/2 ml-1"> Status Kontrak</label>
              <select
                class="w-1/2 pl-2 mr-1 py-1 border border-gray-300 rounded focus:outline-none"
                v-model="parameters.form.status_kontrak"
              >
                <option value="FISIK">Fisik</option>
                <option value="VIRTUAL">Virtual</option>
              </select>
            </div>

            <div class="form-group flex justify-between">
              <label for="keterangan" class="w-1/2 pt-1">Keterangan</label>
              <textarea
                placeholder="Keterangan"
                class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                v-model="parameters.form.keterangan"
              ></textarea>
            </div>
          </div>
          <div class="w-full mt-5 flex justify-between items-center">
            <h1 class="text-xl font-bold uppercase">Detail Kontak Pelanggan</h1>
            <div class=" ">
              <button
                type="button"
                @click="addDetailCustomer"
                class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
              >
                <i class="fas fa-plus"></i>
                <p class="text-xs font-medium">Tambah Detail</p>
              </button>
            </div>
          </div>
          <div
            class="mt-4 w-full bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="table-responsive overflow-y-hidden mb-7">
              <table
                class="border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                :class="
                  parameters.form.kontrak_pelanggan_details.length
                    ? 'mb-[300px]'
                    : ''
                "
              >
                <thead>
                  <tr class="uppercase">
                    <th class="w-60 border border-gray-300">Jenis Kontrak</th>
                    <th class="w-60 border border-gray-300">Divisi</th>
                    <th class="w-60 border border-gray-300">Jenis Biaya</th>
                    <th class="w-60 border border-gray-300">Gudang</th>
                    <th class="w-60 border border-gray-300">Mata Uang</th>
                    <th class="w-60 border border-gray-300">Pembayaran</th>
                    <th class="w-60 border border-gray-300">Term Pembayaran</th>
                    <th class="w-60 border border-gray-300">Payable To</th>
                    <th class="w-60 border border-gray-300">Jenis Kendaraan</th>
                    <th class="w-60 border border-gray-300">KM Awal</th>
                    <th class="w-60 border border-gray-300">KM Akhir</th>
                    <th class="w-60 border border-gray-300">Nilai Kontrak</th>
                    <th class="w-20 border border-gray-300">Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in parameters.form
                      .kontrak_pelanggan_details"
                    :key="i"
                    class="border-t"
                  >
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_jenis_kontrak"
                        :loading="isLoadingGetJenisKontrak"
                        :options="lookup_custom3.data"
                        :filterable="false"
                        @search="onGetJenisKontrak"
                        @input="(item) => onSelectJenisKontrakDetail(item, i)"
                        v-model="item.jenis_kontrak_id"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom3.data.length || search"
                        >
                          <span
                            v-if="lookup_custom3.current_page > 1"
                            @click="onGetJenisKontrak(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom3.last_page >
                              lookup_custom3.current_page
                            "
                            @click="onGetJenisKontrak(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_divisi"
                        :loading="isLoadingGetDivisi"
                        :options="lookup_custom5.data"
                        :filterable="false"
                        @search="onGetDivisi"
                        :reduce="(item) => item.divisi_id"
                        v-model="item.divisi_id"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom5.data.length || search"
                        >
                          <span
                            v-if="lookup_custom5.current_page > 1"
                            @click="onGetDivisi(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom5.last_page >
                              lookup_custom5.current_page
                            "
                            @click="onGetDivisi(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_jenis_biaya"
                        :loading="isLoadingGetJenisBiaya"
                        :options="lookup_custom6.data"
                        :filterable="false"
                        @search="onGetJenisBiaya"
                        :reduce="(item) => item.jenis_biaya_id"
                        v-model="item.jenis_biaya_id"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom6.data.length || search"
                        >
                          <span
                            v-if="lookup_custom6.current_page > 1"
                            @click="onGetJenisBiaya(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom6.last_page >
                              lookup_custom6.current_page
                            "
                            @click="onGetJenisBiaya(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_gudang"
                        :loading="isLoadingGetGudang"
                        :options="lookup_custom7.data"
                        :filterable="false"
                        @search="onGetGudang"
                        :reduce="(item) => item.gudang_id"
                        v-model="item.gudang_id"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom7.data.length || search"
                        >
                          <span
                            v-if="lookup_custom7.current_page > 1"
                            @click="onGetGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom7.last_page >
                              lookup_custom7.current_page
                            "
                            @click="onGetGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_mata_uang"
                        :loading="isLoadingGetUang"
                        :options="lookup_custom8.data"
                        :filterable="false"
                        @search="onGetUang"
                        :reduce="(item) => item.mata_uang_id"
                        v-model="item.mata_uang_id"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom8.data.length || search"
                        >
                          <span
                            v-if="lookup_custom8.current_page > 1"
                            @click="onGetUang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom8.last_page >
                              lookup_custom8.current_page
                            "
                            @click="onGetUang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_pembayaran"
                        :loading="isLoadingGetPembayaran"
                        :options="lookup_custom9.data"
                        :filterable="false"
                        @search="onGetPembayaran"
                        :reduce="(item) => item.pembayaran_id"
                        v-model="item.pembayaran_id"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom9.data.length || search"
                        >
                          <span
                            v-if="lookup_custom9.current_page > 1"
                            @click="onGetPembayaran(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom9.last_page >
                              lookup_custom9.current_page
                            "
                            @click="onGetPembayaran(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_term_pembayaran"
                        :loading="isLoadingGetTerm"
                        :options="lookup_custom4.data"
                        :filterable="false"
                        @search="onGetTerm"
                        :reduce="(item) => item.term_pembayaran_id"
                        v-model="item.term_pembayaran_id"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom4.data.length || search"
                        >
                          <span
                            v-if="lookup_custom4.current_page > 1"
                            @click="onGetTerm(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom4.last_page >
                              lookup_custom4.current_page
                            "
                            @click="onGetTerm(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <select
                        class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                        v-model="item.payable_to"
                      >
                        <option value="DRIVER">Driver</option>
                        <option value="VENDOR">Vendor</option>
                        <option value="PIC">PIC</option>
                      </select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_jenis_kendaraan"
                        :loading="isLoadingGetJenisKendaraan"
                        :options="lookup_custom10.data"
                        :filterable="false"
                        @search="onGetJenisKendaraan"
                        :reduce="(item) => item.jenis_kendaraan_id"
                        v-model="item.jenis_kendaraan_id"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom10.data.length || search"
                        >
                          <span
                            v-if="lookup_custom10.current_page > 1"
                            @click="onGetJenisKendaraan(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom10.last_page >
                              lookup_custom10.current_page
                            "
                            @click="onGetJenisKendaraan(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <money
                        v-model="item.km_awal"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <td class="border border-gray-300">
                      <money
                        v-model="item.km_akhir"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <td class="border border-gray-300">
                      <money
                        v-model="item.nilai_kontrak"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <td class="border border-gray-300 text-center">
                      <i
                        class="fas fa-trash mx-auto"
                        style="cursor: pointer"
                        @click="onDeleteCustomer(i)"
                      ></i>
                    </td>
                  </tr>
                  <tr
                    v-if="!parameters.form.kontrak_pelanggan_details.length > 0"
                  >
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
          <modal-footer-section
            class="mt-5"
            :isLoadingForm="isLoadingForm"
            @reset="formReset()"
          />
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isStopSearchUser: false,
      isLoadingGetUser: false,
      user_search: "",

      isStopSearchJenisKontrak: false,
      isLoadingGetJenisKontrak: false,
      jenis_kontrak_search: "",

      isStopSearchTerm: false,
      isLoadingGetTerm: false,
      term_search: "",

      // isStopSearchSatuan: false,
      // isLoadingGetSatuan: false,
      // satuan_search: "",

      isStopSearchDivisi: false,
      isLoadingGetDivisi: false,
      divisi_search: "",

      isStopSearchJenisBiaya: false,
      isLoadingGetJenisBiaya: false,
      jenis_biaya_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchUang: false,
      isLoadingGetUang: false,
      uang_search: "",

      isStopSearchPembayaran: false,
      isLoadingGetPembayaran: false,
      pembayaran_search: "",

      isStopSearchJenisKendaraan: false,
      isLoadingGetJenisKendaraan: false,
      jenis_kendaraan_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Kontrak Pelanggan",
      parameters: {
        url: "finance/kontrak-pelanggan",
        form: {
          kode_kontrak: "",
          no_referensi: "",
          pelanggan_id: "",
          tanggal_kontrak: "",
          tanggal_berlaku: "",
          tanggal_berhenti: "",
          user_id_pic: "",
          jenis_kontrak_id: "",
          status_kontrak: "",
          keterangan: "",
          kontrak_pelanggan_details: [],

          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
        },
      },
      default_form: {
        kode_kontrak: "",
        no_referensi: "",
        pelanggan_id: "",
        tanggal_kontrak: "",
        tanggal_berlaku: "",
        tanggal_berhenti: "",
        user_id_pic: "",
        jenis_kontrak_id: "",
        status_kontrak: "",
        keterangan: "",
        kontrak_pelanggan_details: [],

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
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          if (item != "kontrak_pelanggan_details") {
            this.parameters.form[item] = res.data[item];
          }
        });
        this.parameters.form.pelanggan_id = res.data.pelanggan;
        this.parameters.form.user_id_pic = res.data.user_pic;
        this.parameters.form.jenis_kontrak_id = res.data.jenis_kontrak;

        this.parameters.form.kontrak_pelanggan_details =
          res.data.kontrak_pelanggan_details.map((item) => {
            return {
              ...item,
              kontrak_pelanggan_detail_id: item.kontrak_pelanggan_detail_id
                ? item.kontrak_pelanggan_detail_id
                : "",
              jenis_kontrak_id: item.jenis_kontrak ? item.jenis_kontrak : "",
            };
          });
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
      // console.log("error",error)
    }
  },

  async mounted() {
    await this.onSearchPelanggan();
    await this.onSearchUser();
    await this.onSearchJenisKontrak();

    this.getUserAgent();
    this.getGeoLocation();

    await this.onSearchTerm();
    await this.onSearchDivisi();
    await this.onSearchJenisBiaya();
    await this.onSearchGudang();
    await this.onSearchUang();
    await this.onSearchPembayaran();
    await this.onSearchJenisKendaraan();
    // await this.onSearchSatuan();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //pelanggan
      "lookup_custom2", //user pic & approver
      "lookup_custom3", //jenis kontrak
      "lookup_custom4", //term
      // "lookup_custom5", //satuan
      "lookup_custom5", //divisi
      "lookup_custom6", //jenis biaya
      "lookup_custom7", //gudang
      "lookup_custom8", //uang
      "lookup_custom9", //pembayaran
      "lookup_custom10", //jenis kendaraan
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    getUserAgent() {
      this.parameters.form.user_agent = navigator.userAgent;
      if (this.parameters.form.user_agent.includes("Mobile")) {
        this.parameters.form.device = "Mobile";
      } else if (this.parameters.form.user_agent.includes("Tablet")) {
        this.parameters.form.device = "Tablet";
      } else {
        this.parameters.form.device = "Desktop";
      }
      // console.log("user agent", this.form.user_agent);
      // console.log("device", this.form.device);
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

    onGetPelanggan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPelanggan);

      this.isStopSearchPelanggan = setTimeout(() => {
        this.pelanggan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchPelanggan();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "custom1",
          query:
            "?search=" +
            this.pelanggan_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPelanggan = false;
      }
    },

    onGetUser(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchUser);

      this.isStopSearchUser = setTimeout(() => {
        this.user_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchUser();
      }, 600);
    },

    async onSearchUser() {
      if (!this.isLoadingGetUser) {
        this.isLoadingGetUser = true;

        await this.lookUp({
          url: "setting/user",
          lookup: "custom2",
          query:
            "?search=" +
            this.user_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetUser = false;
      }
    },

    onGetJenisKontrak(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisKontrak);

      this.isStopSearchJenisKontrak = setTimeout(() => {
        this.jenis_kontrak_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchJenisKontrak();
      }, 600);
    },

    async onSearchJenisKontrak() {
      if (!this.isLoadingGetJenisKontrak) {
        this.isLoadingGetJenisKontrak = true;

        await this.lookUp({
          url: "master/jenis-kontrak/get-jenis-kontrak",
          lookup: "custom3",
          query:
            "?search=" +
            this.jenis_kontrak_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisKontrak = false;
      }
    },

    onSelectPelanggan(item) {
      if (item) {
        this.parameters.form.pelanggan_id = item;
      } else {
        this.parameters.form.pelanggan_id = "";
      }
    },

    onSelectPIC(item) {
      if (item) {
        this.parameters.form.user_id_pic = item;
      } else {
        this.parameters.form.user_id_pic = "";
      }
    },

    onSelectJenisKontrak(item) {
      if (item) {
        this.parameters.form.jenis_kontrak_id = item;
      } else {
        this.parameters.form.jenis_kontrak_id = "";
      }
    },

    onSelectJenisKontrakDetail(item, index) {
      if (item) {
        this.parameters.form.kontrak_pelanggan_details[index].jenis_kontrak_id =
          item;
      } else {
        this.parameters.form.kontrak_pelanggan_details[index].jenis_kontrak_id =
          "";
      }
    },

    addDetailCustomer() {
      this.parameters.form.kontrak_pelanggan_details.push({
        jenis_kontrak_id: "",
        divisi_id: "",
        jenis_biaya_id: "",
        gudang_id: "",
        mata_uang_id: "",
        pembayaran_id: "",
        term_pembayaran_id: "",
        payable_to: "",
        jenis_kendaraan_id: "",
        km_awal: "",
        km_akhir: "",
        // satuan_id: "",
        // insentif: "",
        nilai_kontrak: "",
      });
    },

    onDeleteCustomer(index) {
      this.parameters.form.kontrak_pelanggan_details =
        this.parameters.form.kontrak_pelanggan_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetTerm(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchTerm);

      this.isStopSearchTerm = setTimeout(() => {
        this.term_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchTerm();
      }, 600);
    },

    async onSearchTerm() {
      if (!this.isLoadingGetTerm) {
        this.isLoadingGetTerm = true;

        await this.lookUp({
          url: "master/term-pembayaran/get-term-pembayaran",
          lookup: "custom4",
          query:
            "?search=" +
            this.term_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetTerm = false;
      }
    },

    onGetDivisi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDivisi);

      this.isStopSearchDivisi = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchDivisi();
      }, 600);
    },

    async onSearchDivisi() {
      if (!this.isLoadingGetDivisi) {
        this.isLoadingGetDivisi = true;

        await this.lookUp({
          url: "master/divisi/get-divisi",
          lookup: "custom5",
          query:
            "?search=" +
            this.divisi_search +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDivisi = false;
      }
    },

    onGetJenisBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisBiaya);

      this.isStopSearchJenisBiaya = setTimeout(() => {
        this.jenis_biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchJenisBiaya();
      }, 600);
    },

    async onSearchJenisBiaya() {
      if (!this.isLoadingGetJenisBiaya) {
        this.isLoadingGetJenisBiaya = true;

        await this.lookUp({
          url: "master/jenis-biaya/get-jenis-biaya",
          lookup: "custom6",
          query:
            "?search=" +
            this.jenis_biaya_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisBiaya = false;
      }
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

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
          url: "master/gudang/get-gudang-user",
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

    onGetUang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchUang);

      this.isStopSearchUang = setTimeout(() => {
        this.uang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchUang();
      }, 600);
    },

    async onSearchUang() {
      if (!this.isLoadingGetUang) {
        this.isLoadingGetUang = true;

        await this.lookUp({
          url: "master/mata-uang/get-mata-uang",
          lookup: "custom8",
          query:
            "?search=" +
            this.uang_search +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetUang = false;
      }
    },

    onGetPembayaran(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPembayaran);

      this.isStopSearchPembayaran = setTimeout(() => {
        this.pembayaran_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchPembayaran();
      }, 600);
    },

    async onSearchPembayaran() {
      if (!this.isLoadingGetPembayaran) {
        this.isLoadingGetPembayaran = true;

        await this.lookUp({
          url: "master/pembayaran/get-pembayaran",
          lookup: "custom9",
          query:
            "?search=" +
            this.pembayaran_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPembayaran = false;
      }
    },

    onGetJenisKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisKendaraan);

      this.isStopSearchJenisKendaraan = setTimeout(() => {
        this.jenis_kendaraan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom10.current_page = isNext
            ? this.lookup_custom10.current_page + 1
            : this.lookup_custom10.current_page - 1;
        } else {
          this.lookup_custom10.current_page = 1;
        }

        this.onSearchJenisKendaraan();
      }, 600);
    },

    async onSearchJenisKendaraan() {
      if (!this.isLoadingGetJenisKendaraan) {
        this.isLoadingGetJenisKendaraan = true;

        await this.lookUp({
          url: "master/jenis-kendaraan/get-jenis-kendaraan",
          lookup: "custom10",
          query:
            "?search=" +
            this.jenis_kendaraan_search +
            "&page=" +
            this.lookup_custom10.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisKendaraan = false;
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = this.parameters.url;

      let formData = {
        ...this.parameters.form,
        pelanggan_id:
          typeof this.parameters.form.pelanggan_id == "object"
            ? this.parameters.form.pelanggan_id.pelanggan_id
            : this.parameters.form.pelanggan_id,
        user_id_pic:
          typeof this.parameters.form.user_id_pic == "object"
            ? this.parameters.form.user_id_pic.user_id
            : this.parameters.form.user_id_pic,
        jenis_kontrak_id:
          typeof this.parameters.form.jenis_kontrak_id == "object"
            ? this.parameters.form.jenis_kontrak_id.jenis_kontrak_id
            : this.parameters.form.jenis_kontrak_id,
      };

      formData.kontrak_pelanggan_details =
        this.parameters.form.kontrak_pelanggan_details.map((item) => {
          return {
            ...item,
            kontrak_pelanggan_detail_id:
              typeof item.kontrak_pelanggan_detail_id == "object"
                ? item.kontrak_pelanggan_detail_id.kontrak_pelanggan_detail_id
                : item.kontrak_pelanggan_detail_id,
            jenis_kontrak_id:
              typeof item.jenis_kontrak_id == "object"
                ? item.jenis_kontrak_id.jenis_kontrak_id
                : item.jenis_kontrak_id,
          };
        });

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
            this.parameters.form = this.default_form;
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

    formReset() {
      this.isEditable = false;
      this.parameters.form = this.default_form;
    },
  },
};
</script>
