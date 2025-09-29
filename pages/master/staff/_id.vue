<template>
  <section>
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Staff
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Staff
        </h1>
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
            class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 w-full section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="form-group">
              <input-form
                label="Nama Lengkap"
                type="text"
                name="nama_lengkap"
                v-model="parameters.form.nama_lengkap"
                :required="true"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Kode Staff"
                type="text"
                name="kode_staff"
                v-model="parameters.form.kode_staff"
                :required="true"
              />
            </div>
            <div class="form-group w-full items-center">
              <label for="">Gudang <span class="text-danger">*</span></label>
              <v-select
                label="nama_gudang"
                :loading="isLoadingGetGudang"
                :options="lookup_custom6.data"
                :filterable="false"
                @search="onGetGudang"
                v-model="parameters.form.gudang_id"
                class="w-full"
              >
                <!-- :aria-disabled="parameters.form.status_user == 2" -->
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom6.data.length || search"
                >
                  <span
                    v-if="lookup_custom6.current_page > 1"
                    @click="onGetGudang(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom6.last_page > lookup_custom6.current_page
                    "
                    @click="onGetGudang(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="form-group">
              <input-form
                label="Nomor HP"
                type="text"
                name="nomor_hp"
                v-model="parameters.form.no_hp"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Email"
                type="email"
                name="email"
                v-model="parameters.form.email"
                :required="true"
              />
            </div>
            <ValidationProvider
              name="jenis_kelamin"
              class="w-full"
              rules="required"
            >
              <div
                class="form-group w-full items-center"
                slot-scope="{ errors, valid }"
              >
                <label for="jenis_kelamin" class="w-4/12">
                  Jenis Kelamin <span class="text-danger">*</span>
                </label>
                <select
                  class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                  v-model="parameters.form.jenis_kelamin"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <option value="l">Laki-laki</option>
                  <option value="p">Perempuan</option>
                </select>
                <!-- <div v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </div> -->
              </div>
            </ValidationProvider>
            <div class="form-group">
              <input-form
                label="Tanggal Lahir"
                type="date"
                name="tanggal_lahir"
                v-model="parameters.form.tanggal_lahir"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Nomor KTP"
                type="text"
                name="nomor_ktp"
                v-model="parameters.form.no_ktp"
                :required="true"
              />
            </div>
            <ValidationProvider
              name="jenis_staff"
              class="w-full"
              rules="required"
            >
              <div
                class="form-group w-full items-center"
                slot-scope="{ errors, valid }"
              >
                <label for="jenis_staff" class="w-4/12">
                  Jenis Staff <span class="text-danger">*</span>
                </label>
                <select
                  class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                  v-model="parameters.form.jenis_user"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <option value="staff">Staff</option>
                  <option value="pengemudi">Pengemudi</option>
                  <option value="operator">Operator</option>
                </select>
                <!-- <div v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </div> -->
              </div>
            </ValidationProvider>
            <div class="form-group">
              <input-form
                label="Nomor SIM"
                type="text"
                name="nomor_sim"
                v-model="parameters.form.no_sim"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Tanggal Expired SIM"
                type="date"
                name="tanggal_expired_sim"
                v-model="parameters.form.sim_expired"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Nomor BPJS"
                type="text"
                name="nomor_bpjs"
                v-model="parameters.form.no_bpjs"
                :required="true"
              />
            </div>
            <div class="form-group">
              <input-form
                label="SKCK"
                type="text"
                name="skck"
                v-model="parameters.form.skck"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Nomor NPWP"
                type="text"
                name="nomor_npwp"
                v-model="parameters.form.no_npwp"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-form
                label="NIK"
                type="text"
                name="nik"
                v-model="parameters.form.nik"
                :required="true"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Tanggal Gabung"
                type="date"
                name="tanggal_gabung"
                v-model="parameters.form.tanggal_gabung"
                :required="false"
              />
            </div>
            <ValidationProvider name="status" class="w-full" rules="required">
              <div
                class="form-group w-full items-center"
                slot-scope="{ errors, valid }"
              >
                <label for="status" class="w-4/12">
                  Status <span class="text-danger">*</span>
                </label>
                <select
                  class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                  v-model="parameters.form.status_aktif"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
                <!-- <div v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </div> -->
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="jabatan_id"
              class="w-full"
              rules="required"
            >
              <div
                class="form-group w-full items-center"
                slot-scope="{ errors, valid }"
              >
                <label for="">Jabatan <span class="text-danger">*</span></label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_jabatan"
                  :loading="isLoadingGetJabatan"
                  :options="lookup_custom1.data"
                  :filterable="false"
                  @search="onGetJabatan"
                  v-model="parameters.form.jabatan_id"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom1.data.length || search"
                  >
                    <span
                      v-if="lookup_custom1.current_page > 1"
                      @click="onGetJabatan(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom1.last_page > lookup_custom1.current_page
                      "
                      @click="onGetJabatan(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
                <!-- <div v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </div> -->
              </div>
            </ValidationProvider>
            <div class="form-group w-full items-center">
              <label for="">Pelanggan</label>
              <v-select
                label="nama_pelanggan"
                :loading="isLoadingGetPelanggan"
                :options="lookup_custom2.data"
                :filterable="false"
                @search="onGetPelanggan"
                v-model="parameters.form.pelanggan_id"
                class="w-full"
              >
                <!-- :aria-disabled="parameters.form.status_user == 2" -->
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom2.data.length || search"
                >
                  <span
                    v-if="lookup_custom2.current_page > 1"
                    @click="onGetPelanggan(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom2.last_page > lookup_custom2.current_page
                    "
                    @click="onGetPelanggan(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="form-group w-full items-center">
              <label for="">Tipe SIM</label>
              <v-select
                label="nama_tipe_sim"
                :loading="isLoadingGetTipeSIM"
                :options="lookup_custom3.data"
                :filterable="false"
                @search="onGetTipeSIM"
                v-model="parameters.form.tipe_sim_id"
                class="w-full"
              >
                <!-- :aria-disabled="parameters.form.status_user == 2" -->
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom3.data.length || search"
                >
                  <span
                    v-if="lookup_custom3.current_page > 1"
                    @click="onGetTipeSIM(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom3.last_page > lookup_custom3.current_page
                    "
                    @click="onGetTipeSIM(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <ValidationProvider
              name="vendor_id"
              class="w-full"
              rules="required"
            >
              <div
                class="form-group w-full items-center"
                slot-scope="{ errors, valid }"
              >
                <label for="">Vendor <span class="text-danger">*</span></label>
                <v-select
                  label="nama_vendor"
                  :loading="isLoadingGetVendor"
                  :options="lookup_custom4.data"
                  :filterable="false"
                  @search="onGetVendor"
                  v-model="parameters.form.vendor_id_operator"
                  class="w-full"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <!-- :aria-disabled="parameters.form.status_user == 2" -->
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom4.data.length || search"
                  >
                    <span
                      v-if="lookup_custom4.current_page > 1"
                      @click="onGetVendor(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom4.last_page > lookup_custom4.current_page
                      "
                      @click="onGetVendor(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
                <!-- <div v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </div> -->
              </div>
            </ValidationProvider>

            <ValidationProvider name="alamat" class="w-full" rules="required">
              <div class="form-group" slot-scope="{ errors, valid }">
                <label for="alamat"
                  >Alamat <span class="text-danger">*</span></label
                >
                <textarea
                  placeholder="Alamat"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  v-model="parameters.form.alamat"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                ></textarea>
                <!-- <div v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </div> -->
              </div>
            </ValidationProvider>
            <div class="form-group">
              <label for="keterangan">Keterangan</label>
              <textarea
                placeholder="Keterangan"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                v-model="parameters.form.keterangan"
              ></textarea>
            </div>
          </div>
          <div class="w-full mt-5 flex justify-between items-center">
            <h1 class="text-xl font-bold uppercase">Rekening Staff</h1>
            <div class=" ">
              <button
                type="button"
                @click="addRekening"
                class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
              >
                <i class="fas fa-plus"></i>
                <p class="text-xs font-medium">Tambah Rekening</p>
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
                  parameters.form.rekening_staffs.length ? 'mb-[300px]' : ''
                "
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <th class="w-60 border border-gray-300">Nama Bank</th>
                    <th class="w-40 border border-gray-300">No Rekening</th>
                    <th class="w-40 border border-gray-300">Nama Pemilik</th>
                    <th class="w-40 border border-gray-300">Status</th>
                    <th class="w-40 border border-gray-300">Keterangan</th>
                    <th class="w-20 border border-gray-300">Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in parameters.form.rekening_staffs"
                    :key="i"
                    class="border-t"
                  >
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_bank"
                        :loading="isLoadingGetBank"
                        :options="lookup_custom5.data"
                        :filterable="false"
                        @search="onGetBank"
                        v-model="item.bank_id"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom5.data.length || search"
                        >
                          <span
                            v-if="lookup_custom5.current_page > 1"
                            @click="onGetBank(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom5.last_page >
                              lookup_custom5.current_page
                            "
                            @click="onGetBank(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <div class="form-group">
                        <input-form
                          label=""
                          type="text"
                          name="nomor_rekening"
                          v-model="item.no_rekening"
                          :required="false"
                        />
                      </div>
                    </td>
                    <td class="border border-gray-300">
                      <div class="form-group">
                        <input-form
                          label=""
                          type="text"
                          name="nama_pemilik_rekening"
                          v-model="item.nama_pemilik"
                          :required="false"
                        />
                      </div>
                    </td>
                    <td class="border border-gray-300">
                      <select
                        class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                        v-model="item.status_aktif"
                      >
                        <option value="1">Aktif</option>
                        <option value="0">Tidak Aktif</option>
                      </select>
                    </td>
                    <td class="border border-gray-300">
                      <div class="form-group">
                        <input-form
                          label=""
                          type="text"
                          name="keterangan"
                          v-model="item.keterangan"
                          :required="false"
                        />
                      </div>
                    </td>
                    <td class="border border-gray-300 text-center">
                      <i
                        class="fas fa-trash mx-auto"
                        style="cursor: pointer"
                        @click="onDeleteRekening(i)"
                      ></i>
                    </td>
                  </tr>
                  <tr v-if="!parameters.form.rekening_staffs.length > 0">
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
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchJabatan: false,
      isLoadingGetJabatan: false,
      jabatan_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isStopSearchTipeSIM: false,
      isLoadingGetTipeSIM: false,
      tipeSIM_search: "",

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isStopSearchBank: false,
      isLoadingGetBank: false,
      bank_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Staff",
      parameters: {
        url: "master/staff",
        form: {
          gudang_id: "",
          nama_lengkap: "",
          kode_staff: "",
          no_hp: "",
          email: "",
          jenis_kelamin: "",
          tanggal_lahir: "",
          nik: "",
          jenis_user: "",
          no_sim: "",
          sim_expired: "",
          no_bpjs: "",
          skck: "",
          no_npwp: "",
          no_ktp: "",
          tanggal_gabung: "",
          status_aktif: "",
          jabatan_id: "",
          pelanggan_id: "",
          tipe_sim_id: "",
          vendor_id_operator: "",
          alamat: "",
          keterangan: "",

          rekening_staffs: [],
        },
      },
    };
  },

  async mounted() {
    await this.onSearchJabatan();
    await this.onSearchPelanggan();
    await this.onSearchTipeSIM();
    await this.onSearchVendor();
    await this.onSearchBank();
    await this.onSearchGudang();
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        // this.parameters.form = res.data;
        Object.keys(this.parameters.form).forEach((item) => {
          if (item != "rekening_staffs") {
            this.parameters.form[item] = res.data[item];
          }
        });
        this.parameters.form.gudang_id = res.data.gudang;
        this.parameters.form.jabatan_id = res.data.jabatan;
        this.parameters.form.pelanggan_id = res.data.pelanggan ?? "";
        this.parameters.form.tipe_sim_id = res.data.tipe_sim ?? "";
        this.parameters.form.vendor_id_operator = res.data.vendor_operator;
        this.parameters.form.rekening_staffs = res.data.rekening_staff.map(
          (item) => {
            return {
              ...item,
              rekening_staffs_id: item,
              bank_id: item.bank,
            };
          }
        );
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
      // console.log("error", error);
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", // jabatan
      "lookup_custom2", // pelanggan
      "lookup_custom3", // tipe_sim
      "lookup_custom4", // vendor
      "lookup_custom5", // bank
      "lookup_custom6", // gudang
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "master/staff";

      let formData = {
        ...this.parameters.form,
        gudang_id:
          typeof this.parameters.form.gudang_id === "object"
            ? this.parameters.form.gudang_id.gudang_id
            : this.parameters.form.gudang_id,
        jabatan_id:
          typeof this.parameters.form.jabatan_id === "object"
            ? this.parameters.form.jabatan_id.jabatan_id
            : this.parameters.form.jabatan_id,
        pelanggan_id:
          typeof this.parameters.form.pelanggan_id === "object"
            ? this.parameters.form.pelanggan_id.pelanggan_id
            : this.parameters.form.pelanggan_id,
        tipe_sim_id:
          typeof this.parameters.form.tipe_sim_id === "object"
            ? this.parameters.form.tipe_sim_id.tipe_sim_id
            : this.parameters.form.tipe_sim_id
            ? this.parameters.form.tipe_sim_id
            : "",
        vendor_id_operator:
          typeof this.parameters.form.vendor_id_operator === "object"
            ? this.parameters.form.vendor_id_operator.vendor_id
            : this.parameters.form.vendor_id_operator,
        rekening_staffs: this.parameters.form.rekening_staffs.map((item) => {
          return {
            ...item,
            rekening_staffs: item.rekening_staff_id
              ? item.rekening_staff_id
              : "",
            bank_id:
              typeof item.bank_id === "object"
                ? item.bank_id.bank_id
                : item.bank_id,
          };
        }),
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
            this.parameters.form = {
              gudang_id: "",
              nama_lengkap: "",
              kode_staff: "",
              no_hp: "",
              email: "",
              jenis_kelamin: "",
              tanggal_lahir: "",
              nik: "",
              jenis_user: "",
              no_sim: "",
              sim_expired: "",
              no_bpjs: "",
              skck: "",
              no_npwp: "",
              no_ktp: "",
              tanggal_gabung: "",
              status_aktif: "",
              jabatan_id: "",
              pelanggan_id: "",
              tipe_sim_id: "",
              vendor_id_operator: "",
              alamat: "",
              keterangan: "",

              rekening_staffs: [],
            };
          }
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
          this.$router.back();
        });
    },

    onGetJabatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJabatan);

      this.isStopSearchJabatan = setTimeout(() => {
        this.jabatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchJabatan();
      }, 600);
    },

    async onSearchJabatan() {
      if (!this.isLoadingGetJabatan) {
        this.isLoadingGetJabatan = true;

        await this.lookUp({
          url: "setting/jabatan",
          lookup: "custom1",
          query:
            "?search=" +
            this.jabatan_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJabatan = false;
      }
    },

    onGetPelanggan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPelanggan);

      this.isStopSearchPelanggan = setTimeout(() => {
        this.pelanggan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchPelanggan();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "custom2",
          query:
            "?search=" +
            this.pelanggan_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPelanggan = false;
      }
    },

    onGetTipeSIM(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchTipeSIM);

      this.isStopSearchTipeSIM = setTimeout(() => {
        this.tipeSIM_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchTipeSIM();
      }, 600);
    },

    async onSearchTipeSIM() {
      if (!this.isLoadingGetTipeSIM) {
        this.isLoadingGetTipeSIM = true;

        await this.lookUp({
          url: "master/tipe-sim/get-tipe-sim",
          lookup: "custom3",
          query:
            "?search=" +
            this.tipeSIM_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetTipeSIM = false;
      }
    },

    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendor);

      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "custom4",
          query:
            "?search=" +
            this.vendor_search +
            "&tipe_vendor=o" +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendor = false;
      }
    },

    onGetBank(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchBank);

      this.isStopSearchBank = setTimeout(() => {
        this.bank_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchBank();
      }, 600);
    },

    async onSearchBank() {
      if (!this.isLoadingGetBank) {
        this.isLoadingGetBank = true;

        await this.lookUp({
          url: "master/bank/get-bank",
          lookup: "custom5",
          query:
            "?search=" +
            this.bank_search +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetBank = false;
      }
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom6",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    addRekening() {
      this.parameters.form.rekening_staffs.push({
        bank_id: "",
        no_rekening: "",
        nama_pemilik: "",
        status_aktif: "",
        keterangan: "",
      });
    },

    onDeleteRekening(index) {
      this.parameters.form.rekening_staffs =
        this.parameters.form.rekening_staffs.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        gudang_id: "",
        nama_lengkap: "",
        kode_staff: "",
        no_hp: "",
        email: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        nik: "",
        jenis_user: "",
        no_sim: "",
        sim_expired: "",
        no_bpjs: "",
        skck: "",
        no_npwp: "",
        no_ktp: "",
        tanggal_gabung: "",
        status_aktif: "",
        jabatan_id: "",
        pelanggan_id: "",
        tipe_sim_id: "",
        vendor_id_operator: "",
        alamat: "",
        keterangan: "",

        rekening_staffs: [],
      };
    },
  },
};
</script>
