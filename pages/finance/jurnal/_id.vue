<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Jurnal Entri
        </h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>

      <div class="w-full">
        <ValidationObserver v-slot="{ invalid, validate }" ref="formVaidate">
          <form
            @submit.prevent="validate().then(() => onSubmit(invalid))"
            autocomplete="off"
          >
            <div class="w-full gap-3">
              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div
                  class="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-1 items-top w-full"
                >
                  <div class="form-group">
                    <input-horizontal
                      label="Tanggal"
                      type="date"
                      name="tanggal"
                      :required="true"
                      v-model="form.tanggal"
                    />
                  </div>
                  <ValidationProvider name="gudang_id" class="w-full mt-1">
                    <div slot-scope="{ errors, valid }" class="flex">
                      <label for="gudang_id" class="w-1/2">Gudang </label>
                      <v-select
                        label="nama_gudang"
                        :loading="isLoadingGetGudang"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetGudang"
                        v-model="form.gudang_id"
                        class="w-1/2"
                        @input="onSelectGudang"
                        :disabled="lookup_custom1.data.length == 1"
                      >
                        <template slot="selected-option" slot-scope="option">
                          <div
                            class="w-full whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {{ option.nama_gudang }}
                          </div>
                        </template>
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom1.data.length || search"
                        >
                          <span
                            v-if="lookup_custom1.current_page > 1"
                            @click="onGetGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom1.last_page >
                              lookup_custom1.current_page
                            "
                            @click="onGetGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <div class="form-group">
                    <input-horizontal
                      label="Kode Referensi 1"
                      type="text"
                      name="kode_referensi"
                      v-model="form.kode_referensi"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      label="Kode Referensi 2"
                      type="text"
                      name="kode_referensi_2"
                      v-model="form.kode_referensi_2"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      label="Kode Referensi 3"
                      type="text"
                      name="kode_referensi_3"
                      v-model="form.kode_referensi_3"
                    />
                  </div>
                  <div class="flex w-full m-1 pr-1">
                    <label for="" class="w-1/2"
                      >Jenis Jurnal<span class="text-danger">*</span></label
                    >
                    <select
                      required
                      name=""
                      id=""
                      v-model="form.jenis_jurnal"
                      class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                    >
                      <option value="UMUM">Umum</option>
                      <option value="BANK">Bank</option>
                    </select>
                  </div>
                </div>
                <!-- <div
                  class="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-3 items-top w-full mb-5"
                >

                </div> -->
                <div class="w-full mb-5">
                  <div class="w-full flex justify-between items-center">
                    <h1 class="text-xl font-bold">Detail Jurnal</h1>
                    <div class=" ">
                      <button
                        type="button"
                        @click="addJurnalDetails"
                        class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                      >
                        <i class="fas fa-plus"></i>
                        <p class="text-xs font-medium">Tambah Detail Jurnal</p>
                      </button>
                    </div>
                  </div>
                  <div
                    class="table-responsive overflow-y-hidden"
                    :style="
                      form.jurnal_details.length ? 'min-height:500px' : ''
                    "
                  >
                    <table
                      class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                    >
                      <thead>
                        <tr class="text-sm uppercase text-nowrap">
                          <th class="w-[100px] border border-gray-300">Kode</th>
                          <th class="w-[300px] border border-gray-300">
                            COA <span class="text-danger">*</span>
                          </th>
                          <th class="w-[100px] border border-gray-300">
                            Tipe <span class="text-danger">*</span>
                          </th>
                          <th class="w-[200px] border border-gray-300">
                            Jumlah <span class="text-danger">*</span>
                          </th>
                          <th class="w-[200px] border border-gray-300">
                            Divisi
                          </th>
                          <th class="w-[250px] border border-gray-300">
                            Plat Nomor / Nomor Lambung
                          </th>
                          <!-- <th class="w-[200px] border border-gray-300">
                            Jenis Biaya <span class="text-danger">*</span>
                          </th> -->
                          <th class="w-[200px] border border-gray-300">
                            Peralatan
                          </th>
                          <!-- <th
                            v-if="!user.gudang_id"
                            class="w-[200px] border border-gray-300"
                          >
                            Profit & Cost Center
                          </th> -->
                          <th class="w-[200px] border border-gray-300">
                            Keterangan
                          </th>
                          <th class="w-20 border border-gray-300">Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in form.jurnal_details"
                          :key="index"
                          style="border-top: 0.5px solid lightgray"
                          class="align-top mx-0"
                        >
                          <td class="border border-gray-300">
                            {{ item.coa_id ? item.coa_id.kode_coa : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            <v-select
                              label="nama_coa"
                              :loading="isLoadingGetCoa"
                              :options="lookup_custom2.data"
                              :filterable="false"
                              @search="onGetCoa"
                              v-model="item.coa_id"
                              class="w-full"
                            >
                              <template slot="option" slot-scope="option">
                                {{ option.nama_coa + " - " + option.kode_coa }}
                              </template>
                              <template
                                slot="selected-option"
                                slot-scope="option"
                              >
                                <div
                                  class="w-[200px] whitespace-nowrap text-ellipsis overflow-hidden"
                                >
                                  {{
                                    option.nama_coa + " - " + option.kode_coa
                                  }}
                                </div>
                              </template>
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_custom2.data.length || search"
                              >
                                <span
                                  v-if="lookup_custom2.current_page > 1"
                                  @click="onGetCoa(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_custom2.last_page >
                                    lookup_custom2.current_page
                                  "
                                  @click="onGetCoa(search, true)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Selanjutnya</span
                                >
                              </li>
                            </v-select>
                          </td>
                          <td class="border border-gray-300">
                            <select
                              class="w-full pl-2 py-1 border rounded focus:outline-none"
                              name="tipe"
                              id="tipe"
                              v-model="item.tipe"
                            >
                              <option value="DEBIT">Debit</option>
                              <option value="CREDIT">Kredit</option>
                            </select>
                          </td>
                          <td class="border border-gray-300">
                            <money
                              v-model="item.jumlah"
                              class="w-full pl-2 py-1 border rounded focus:outline-none"
                              @keydown.native="
                                $event.key === '-'
                                  ? $event.preventDefault()
                                  : null
                              "
                            />
                          </td>
                          <td class="border border-gray-300">
                            <v-select
                              label="nama_divisi"
                              :loading="isLoadingGetDivisi"
                              :options="lookup_custom3.data"
                              :filterable="false"
                              @search="onGetDivisi"
                              v-model="item.divisi_id"
                              class="w-full"
                            >
                              <template
                                slot="selected-option"
                                slot-scope="option"
                              >
                                <div
                                  class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                                >
                                  {{ option.nama_divisi }}
                                </div>
                              </template>
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_custom3.data.length || search"
                              >
                                <span
                                  v-if="lookup_custom3.current_page > 1"
                                  @click="onGetDivisi(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_custom3.last_page >
                                    lookup_custom3.current_page
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
                              label="nama_kendaraan"
                              :loading="isLoadingGetKendaraan"
                              :options="lookup_custom4.data"
                              :filterable="false"
                              @search="onGetKendaraan"
                              v-model="item.kendaraan_id"
                              class="w-full"
                            >
                              <template slot="option" slot-scope="option">
                                {{ option.plat_nomor }} -
                                {{ option.nama_kendaraan }}
                              </template>
                              <template
                                slot="selected-option"
                                slot-scope="option"
                              >
                                <div
                                  class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                                >
                                  {{ option.plat_nomor }} -
                                  {{ option.nama_kendaraan }}
                                </div>
                              </template>
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_custom4.data.length || search"
                              >
                                <span
                                  v-if="lookup_custom4.current_page > 1"
                                  @click="onGetKendaraan(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_custom4.last_page >
                                    lookup_custom4.current_page
                                  "
                                  @click="onGetKendaraan(search, true)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Selanjutnya</span
                                >
                              </li>
                            </v-select>
                          </td>
                          <!-- <td class="border border-gray-300">
                            <v-select
                              label="nama_jenis_biaya"
                              :loading="isLoadingGetJenisBiaya"
                              :options="lookup_suppliers.data"
                              :filterable="false"
                              @search="onGetJenisBiaya"
                              v-model="item.jenis_biaya_id"
                              class="w-full"
                            >
                              <template
                                slot="selected-option"
                                slot-scope="option"
                              >
                                <div
                                  class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                                >
                                  {{ option.nama_jenis_biaya }}
                                </div>
                              </template>
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_suppliers.data.length || search"
                              >
                                <span
                                  v-if="lookup_suppliers.current_page > 1"
                                  @click="onGetJenisBiaya(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_suppliers.last_page >
                                    lookup_suppliers.current_page
                                  "
                                  @click="onGetJenisBiaya(search, true)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Selanjutnya</span
                                >
                              </li>
                            </v-select>
                          </td> -->
                          <td class="border border-gray-300">
                            <v-select
                              label="nama_peralatan"
                              :loading="isLoadingGetZonaGudang"
                              :options="lookup_resellers.data"
                              :filterable="false"
                              @search="onGetZonaGudang"
                              v-model="item.peralatan_id"
                              class="w-full"
                            >
                              <template
                                slot="selected-option"
                                slot-scope="option"
                              >
                                <div
                                  class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                                >
                                  {{ option.nama_peralatan }}
                                </div>
                              </template>
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_resellers.data.length || search"
                              >
                                <span
                                  v-if="lookup_resellers.current_page > 1"
                                  @click="onGetZonaGudang(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_resellers.last_page >
                                    lookup_resellers.current_page
                                  "
                                  @click="onGetZonaGudang(search, true)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Selanjutnya</span
                                >
                              </li>
                            </v-select>
                          </td>
                          <!-- <td
                            v-if="!user.gudang_id"
                            class="border border-gray-300"
                          >
                            <div class="w-full">
                              <label for="">Profit Center</label>
                              <v-select
                                label="kode_profit_center"
                                :loading="isLoadingGetProfit"
                                :options="lookup_regus.data"
                                :filterable="false"
                                @search="onGetProfit"
                                :reduce="(item) => item.profit_center_id"
                                v-model="item.profit_center_id"
                                class="w-full"
                              >
                                <template
                                  slot="selected-option"
                                  slot-scope="option"
                                >
                                  <div
                                    class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                                  >
                                    {{ option.kode_profit_center }}
                                  </div>
                                </template>
                                <li
                                  slot-scope="{ search }"
                                  slot="list-footer"
                                  class="p-1 border-t flex justify-between"
                                  v-if="lookup_regus.data.length || search"
                                >
                                  <span
                                    v-if="lookup_regus.current_page > 1"
                                    @click="onGetProfit(search, false)"
                                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                    >Sebelumnya</span
                                  >
                                  <span
                                    v-if="
                                      lookup_regus.last_page >
                                      lookup_regus.current_page
                                    "
                                    @click="onGetProfit(search, true)"
                                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                    >Selanjutnya</span
                                  >
                                </li>
                              </v-select>
                            </div>
                            <div class="w-full">
                              <label for="">Cost Center</label>
                              <v-select
                                label="kode_cost_center"
                                :loading="isLoadingGetCost"
                                :options="lookup_grade.data"
                                :filterable="false"
                                @search="onGetCost"
                                :reduce="(item) => item.cost_center_id"
                                v-model="item.cost_center_id"
                                class="w-full"
                              >
                                <template
                                  slot="selected-option"
                                  slot-scope="option"
                                >
                                  <div
                                    class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                                  >
                                    {{ option.kode_cost_center }}
                                  </div>
                                </template>
                                <li
                                  slot-scope="{ search }"
                                  slot="list-footer"
                                  class="p-1 border-t flex justify-between"
                                  v-if="lookup_grade.data.length || search"
                                >
                                  <span
                                    v-if="lookup_grade.current_page > 1"
                                    @click="onGetCost(search, false)"
                                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                    >Sebelumnya</span
                                  >
                                  <span
                                    v-if="
                                      lookup_grade.last_page >
                                      lookup_grade.current_page
                                    "
                                    @click="onGetCost(search, true)"
                                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                    >Selanjutnya</span
                                  >
                                </li>
                              </v-select>
                            </div>
                          </td> -->
                          <td class="border border-gray-300">
                            <textarea
                              name="keterangan"
                              v-model="item.keterangan"
                              class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                            ></textarea>
                          </td>
                          <!-- <td>
                            <textarea
                              name="keterangan_pindah_gudang"
                              v-model="item.keterangan_2"
                              class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                            ></textarea>
                          </td>
                          <td>
                            <textarea
                              name="keterangan_pindah_gudang"
                              v-model="item.keterangan_3"
                              class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                            ></textarea>
                          </td> -->
                          <td
                            class="text-center text-gray-600 border border-gray-300"
                          >
                            <i
                              class="fas fa-trash mx-auto"
                              style="cursor: pointer"
                              @click="onDeleteItem(index)"
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                      <tr v-if="!form.jurnal_details.length > 0">
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
                    </table>
                    <div
                      class="w-full grid grid-cols-2 my-7 min-h-[200px] items-start"
                    >
                      <div class="form-group">
                        <label for="keterangan"> Keterangan </label>
                        <textarea
                          name="keterangan"
                          v-model="form.keterangan"
                          class="w-full h-10 border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                        ></textarea>
                      </div>
                      <div class="w-full mt-2">
                        <div class="ml-10">
                          <p class="w-[100px] mb-1">Balance</p>
                          <div
                            class="w-full border border-gray-300 p-1 rounded-md"
                          >
                            {{ balance | formatPrice }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <modal-footer-section
                  :isLoadingForm="isLoadingForm"
                  @reset="formReset()"
                />
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Jurnal Entri",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

      title: "Jurnal Entri",

      url: "finance/jurnal",
      form: {
        jurnal_id: "",
        tanggal: "",
        keterangan: "",
        keterangan_2: "",
        keterangan_3: "",
        kode_referensi: "",
        kode_referensi_2: "",
        kode_referensi_3: "",
        gudang_id: "",
        jenis_jurnal: "",
        jurnal_details: [],
      },
      default_form: {
        jurnal_id: "",
        tanggal: "",
        keterangan: "",
        keterangan_2: "",
        keterangan_3: "",
        kode_referensi: "",
        kode_referensi_2: "",
        kode_referensi_3: "",
        gudang_id: "",
        jenis_jurnal: "",
        jurnal_details: [],
      },

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isStopSearchDivisi: false,
      isLoadingGetDivisi: false,
      divisi_search: "",

      isStopSearchKendaraan: false,
      isLoadingGetKendaraan: false,
      kendaraan_search: "",

      isStopSearchJenisBiaya: false,
      isLoadingGetJenisBiaya: false,
      jenis_biaya_search: "",

      isStopSearchZonaGudang: false,
      isLoadingGetZonaGudang: false,
      zona_gudang_search: "",

      isStopSearchProfit: false,
      isLoadingGetProfit: false,
      profit_search: "",

      isStopSearchCost: false,
      isLoadingGetCost: false,
      cost_search: "",

      user: this.$auth.user,
    };
  },

  async created() {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      this.form.tanggal = formattedDate;
      if (this.isEditable) {
        let response = await this.$axios.get("finance/jurnal/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != "jurnal_details") {
            this.form[item] = response.data[item];
          }
        });

        this.form.jenis_jurnal = response.data.jenis_jurnal.trim() ?? "";

        this.form.gudang_id = response.data.gudang ?? "";

        this.form.jurnal_details = response.data.jurnal_details.map((item) => {
          return {
            ...item,
            jurnal_details_id: item ?? "",
            coa_id: item.coa ?? "",
            jenis_biaya_id: item.jenis_biaya ?? "",
            divisi_id: item.divisi ?? "",
            kendaraan_id: item.kendaraan ?? "",
            peralatan_id: item.peralatan ?? "",
          };
        });

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/finance/jurnal-manual");
    }
  },

  async mounted() {
    await this.onSearchGudang();
    if (this.lookup_custom1.data.length > 0) {
      this.onSelectGudang(this.lookup_custom1.data[0]);
    }
    await this.onSearchCoa();
    await this.onSearchDivisi();
    // await this.onSearchJenisBiaya();
    await this.onSearchZonaGudang();
    // await this.onSearchProfit();
    // await this.onSearchCost();
    if (this.lookup_custom1.data && !this.isEditable) {
      await this.onSelectGudang(this.lookup_custom1.data[0]);
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_custom4",
      "lookup_suppliers",
      "lookup_resellers",
      "lookup_regus",
      "lookup_grade",
    ]),

    balance() {
      let debitValue = this.form.jurnal_details.reduce((acc, item) => {
        if (item.tipe == "DEBIT") {
          return acc + item.jumlah;
        }

        return acc;
      }, 0);
      let kreditValue = this.form.jurnal_details.reduce((acc, item) => {
        if (item.tipe == "CREDIT") {
          return acc + item.jumlah;
        }

        return acc;
      }, 0);
      return debitValue - kreditValue;
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "finance/jurnal";

      // if (this.user.gudang_id) {
      //   this.form.gudang_id = this.user.gudang_id;
      // }

      let formData = {
        ...this.form,
      };

      formData.gudang_id =
        typeof this.form.gudang_id === "object"
          ? this.form.gudang_id.gudang_id
          : this.form.gudang_id;

      formData.jurnal_details = formData.jurnal_details.map((item) => {
        return {
          ...item,
          jurnal_detail_id:
            typeof item.jurnal_detail_id == "object"
              ? item.jurnal_detail_id.jurnal_detail_id
              : "",
          coa_id:
            typeof item.coa_id == "object"
              ? item.coa_id.coa_id ?? ""
              : item.coa_id ?? "",
          jenis_biaya_id:
            typeof item.jenis_biaya_id == "object"
              ? item.jenis_biaya_id.jenis_biaya_id ?? ""
              : item.jenis_biaya_id ?? "",
          divisi_id: item.divisi_id ? item.divisi_id.divisi_id ?? "" : "",
          kendaraan_id: item.kendaraan_id ? item.kendaraan_id.kendaraan_id : "",
          peralatan_id: item.peralatan_id
            ? item.peralatan_id.divisi_id ?? ""
            : "",
          // profit_center_id: item.profit_center_id || "",
          // cost_center_id: item.cost_center_id || "",
        };
      });

      if (this.isEditable) {
        url += "/" + this.id;
      }

      // console.log(formData);
      // console.log("sampe sini");
      this.$axios({
        url: url,
        method: this.isEditable ? "put" : "post",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Berhasil " +
              (this.isEditable ? "Update" : "Tambah") +
              " Jurnal Entri"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              jurnal_details: [],
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

    addJurnalDetails() {
      this.form.jurnal_details.push({
        jurnal_details_id: null,
        coa_id: null,
        divisi_id: null,
        peralatan_id: null,
        tipe: null,
        jumlah: 0,
        keterangan: null,
        keterangan_2: null,
        keterangan_3: null,
      });
    },

    onDeleteItem(index) {
      this.form.jurnal_details = this.form.jurnal_details.filter(
        (_, itemIndex) => index != itemIndex
      );
    },

    async formReset() {
      this.$refs.formValidate.reset();
      this.form = this.default_form;
      this.form.jurnal_details = [];
      await this.onSearchGudang();
      await this.onSearchCoa();
      await this.onSearchDivisi();
      await this.onSearchKendaraan();
      await this.onSearchJenisBiaya();
      await this.onSearchZonaGudang();
      // await this.onSearchProfit();
      // await this.onSearchCost();
    },

    //gudang
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
          url: "master/gudang/get-gudang-user",
          lookup: "custom1",
          query:
            "?search=" +
            this.gudang_search +
            "&user_id=" +
            this.user.user_id +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    async onSelectGudang(item) {
      if (item) {
        this.form.gudang_id = item;
        this.form.jurnal_details = [];
        await this.onSearchZonaGudang();
        await this.onSearchKendaraan();
      } else {
        this.form.gudang_id = "";
        this.form.jurnal_details = [];
      }
    },

    //coa
    onGetCoa(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoa);

      this.isStopSearchCoa = setTimeout(() => {
        this.coa_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchCoa();
      }, 600);
    },

    async onSearchCoa() {
      if (!this.isLoadingGetCoa) {
        this.isLoadingGetCoa = true;

        await this.lookUp({
          url: "finance/jurnal/get-coa",
          lookup: "custom2",
          query:
            "?search=" +
            this.coa_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoa = false;
      }
    },

    //divisi
    onGetDivisi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDivisi);

      this.isStopSearchDivisi = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchDivisi();
      }, 600);
    },

    async onSearchDivisi() {
      if (!this.isLoadingGetDivisi) {
        this.isLoadingGetDivisi = true;

        await this.lookUp({
          url: "master/divisi/get-divisi",
          lookup: "custom3",
          query:
            "?search=" +
            this.divisi_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDivisi = false;
      }
    },

    //kendaraan
    onGetKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKendaraan);

      this.isStopSearchKendaraan = setTimeout(() => {
        this.kendaraan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchKendaraan();
      }, 600);
    },

    async onSearchKendaraan() {
      if (!this.isLoadingGetKendaraan) {
        this.isLoadingGetKendaraan = true;

        await this.lookUp({
          url: "master/kendaraan/get-kendaraan",
          lookup: "custom4",
          query:
            "?search=" +
            this.kendaraan_search +
            "&gudang_id=" +
            this.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKendaraan = false;
      }
    },

    //jenis biaya
    onGetJenisBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisBiaya);

      this.isStopSearchJenisBiaya = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchJenisBiaya();
      }, 600);
    },

    async onSearchJenisBiaya() {
      if (!this.isLoadingGetJenisBiaya) {
        this.isLoadingGetJenisBiaya = true;

        await this.lookUp({
          url: "master/jenis-biaya/get-jenis-biaya",
          lookup: "suppliers",
          query:
            "?search=" +
            this.jenis_biaya_search +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisBiaya = false;
      }
    },

    //zona gudang
    onGetZonaGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchZonaGudang);

      this.isStopSearchZonaGudang = setTimeout(() => {
        this.zona_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_resellers.current_page = isNext
            ? this.lookup_resellers.current_page + 1
            : this.lookup_resellers.current_page - 1;
        } else {
          this.lookup_resellers.current_page = 1;
        }

        this.onSearchZonaGudang();
      }, 600);
    },

    async onSearchZonaGudang() {
      if (!this.isLoadingGetZonaGudang) {
        this.isLoadingGetZonaGudang = true;

        await this.lookUp({
          url: "master/peralatan/get-peralatan",
          lookup: "resellers",
          query:
            "?search=" +
            this.zona_gudang_search +
            "&gudang_id=" +
            this.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_resellers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetZonaGudang = false;
      }
    },

    //Profit
    onGetProfit(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProfit);

      this.isStopSearchProfit = setTimeout(() => {
        this.profit_search = search;

        if (typeof isNext !== "function") {
          this.lookup_regus.current_page = isNext
            ? this.lookup_regus.current_page + 1
            : this.lookup_regus.current_page - 1;
        } else {
          this.lookup_regus.current_page = 1;
        }

        this.onSearchProfit();
      }, 600);
    },

    async onSearchProfit() {
      if (!this.isLoadingGetProfit) {
        this.isLoadingGetProfit = true;

        await this.lookUp({
          url: "master/profit-center/get-profit-center",
          lookup: "regus",
          query:
            "?search=" +
            this.profit_search +
            "&page=" +
            this.lookup_regus.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProfit = false;
      }
    },

    //cost
    onGetCost(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCost);

      this.isStopSearchCost = setTimeout(() => {
        this.cost_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }

        this.onSearchCost();
      }, 600);
    },

    async onSearchCost() {
      if (!this.isLoadingGetCost) {
        this.isLoadingGetCost = true;

        await this.lookUp({
          url: "master/cost-center/get-cost-center",
          lookup: "grade",
          query:
            "?search=" +
            this.cost_search +
            "&page=" +
            this.lookup_grade.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCost = false;
      }
    },
  },
};
</script>
