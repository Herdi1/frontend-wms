<template>
  <div>
    <div>
      <div>
        <div class="w-full flex justify-between items-center">
          <h1 class="text-xl font-bold">Detail Biaya Premi</h1>
          <div class=" ">
            <button
              type="button"
              @click="addDetailBerat"
              class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
            >
              <i class="fas fa-plus"></i>
              <p class="text-xs font-medium">Tambah Detail</p>
            </button>
          </div>
        </div>
        <div class="flex gap-5">
          <div class="col-md-1 mt-2">
            <select
              class="border border-gray-300 rounded-sm outline-none w-[4rem]"
              style="
                height: calc(1.5em + 0.5rem + 2px);
                padding: 0px;
                padding-left: 2px;
                padding-right: 0px;
              "
              v-model="parameters.params.per_page"
              @change="
                parameters.params.page = 1;
                onLoad();
              "
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
          <div class="col-md-1 mt-2 flex gap-3 items-center">
            <label for="">Gudang</label>
            <v-select
              label="nama_gudang"
              :loading="isLoadingGetGudang"
              :options="lookup_custom6.data"
              :filterable="false"
              v-model="parameters.params.gudang_id"
              @input="(item) => onSelectGudang(item)"
              class="w-[300px] mb-2"
            >
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
                  v-if="lookup_custom6.last_page > lookup_custom6.current_page"
                  @click="onGetGudang(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>
          <div class="col-md-1 mt-2 flex gap-3 items-center">
            <label for="">Item Gudang</label>
            <v-select
              label="nama_item"
              :loading="isLoadingGetItemGudang"
              :options="lookup_grade.data"
              :filterable="false"
              v-model="parameters.params.item_gudang_id"
              @search="
                (search) =>
                  onGetItemGudang(
                    parameters.params.gudang_id?.gudang_id,
                    search
                  )
              "
              @input="onSelectItemParams"
              class="w-[300px] mb-2"
            >
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_grade.data.length || search"
              >
                <span
                  v-if="lookup_grade.current_page > 1"
                  @click="
                    onGetItemGudang(
                      parameters.params.gudang_id?.gudang_id,
                      search,
                      false
                    )
                  "
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="lookup_grade.last_page > lookup_grade.current_page"
                  @click="
                    onGetItemGudang(
                      parameters.params.gudang_id?.gudang_id,
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
        </div>
        <div class="table-responsive overflow-y-hidden mb-7">
          <table
            class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
          >
            <thead>
              <tr class="uppercase">
                <th class="w-60 border border-gray-300">
                  Jenis Kontrak <span class="text-danger">*</span>
                </th>
                <th class="w-60 border border-gray-300">
                  Divisi <span class="text-danger">*</span>
                </th>
                <th class="w-60 border border-gray-300">
                  Jenis Biaya <span class="text-danger">*</span>
                </th>
                <th class="w-60 border border-gray-300">
                  Gudang <span class="text-danger">*</span>
                </th>
                <th class="w-60 border border-gray-300">
                  Mata Uang <span class="text-danger">*</span>
                </th>
                <th class="w-60 border border-gray-300">Pembayaran</th>
                <th class="w-60 border border-gray-300">
                  Term Pembayaran <span class="text-danger">*</span>
                </th>
                <th class="w-60 border border-gray-300">
                  Payable To <span class="text-danger">*</span>
                </th>
                <th class="w-60 border border-gray-300">Group Item</th>
                <th class="w-60 border border-gray-300">
                  Item Gudang <span class="text-danger">*</span>
                </th>
                <th class="w-60 border border-gray-300">
                  Berat <span class="text-danger">*</span>
                </th>
                <th class="w-60 border border-gray-300">
                  Nilai Kontrak <span class="text-danger">*</span>
                </th>
                <th class="w-20 border border-gray-300">Edit</th>
                <th class="w-20 border border-gray-300">Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in this.self.parameters.form
                  .kontrak_lastmile_premi_details"
                :key="i"
                class="align-top"
              >
                <td class="border border-gray-300">
                  <!-- <v-select
                    label="nama_jenis_kontrak"
                    :loading="isLoadingGetJenisKontrak"
                    :options="lookup_custom3.data"
                    :filterable="false"
                    v-model="item.jenis_kontrak_id"
                    @input="(item) => onSelectJenisKontrak(item, i)"
                    class="w-full mb-2"
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
                          lookup_custom3.last_page > lookup_custom3.current_page
                        "
                        @click="onGetJenisKontrak(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select> -->
                  {{ item.jenis_kontrak_id?.nama_jenis_kontrak ?? "" }}
                </td>
                <td class="border border-gray-300">
                  <!-- <v-select
                    label="nama_divisi"
                    :loading="isLoadingGetDivisi"
                    :options="lookup_custom4.data"
                    :filterable="false"
                    v-model="item.divisi_id"
                    @input="(item) => onSelectDivisi(item, i)"
                    class="w-full mb-2"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom4.data.length || search"
                    >
                      <span
                        v-if="lookup_custom4.current_page > 1"
                        @click="onGetDivisi(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom4.last_page > lookup_custom4.current_page
                        "
                        @click="onGetDivisi(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select> -->
                  {{ item.divisi_id?.nama_divisi ?? "" }}
                </td>
                <td class="border border-gray-300">
                  <!-- <v-select
                    label="nama_jenis_biaya"
                    :loading="isLoadingGetJenisBiaya"
                    :options="lookup_custom5.data"
                    :filterable="false"
                    v-model="item.jenis_biaya_id"
                    @input="(item) => onSelectJenisBiaya(item, i)"
                    class="w-full mb-2"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom5.data.length || search"
                    >
                      <span
                        v-if="lookup_custom5.current_page > 1"
                        @click="onGetJenisBiaya(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom5.last_page > lookup_custom5.current_page
                        "
                        @click="onGetJenisBiaya(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select> -->
                  {{ item.jenis_biaya_id?.nama_jenis_biaya ?? "" }}
                </td>
                <td class="border border-gray-300">
                  <!-- <v-select
                    label="nama_gudang"
                    :loading="isLoadingGetGudang"
                    :options="lookup_custom6.data"
                    :filterable="false"
                    v-model="item.gudang_id"
                    @input="(item) => onSelectGudang(item, i)"
                    class="w-full mb-2"
                  >
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
                  </v-select> -->
                  {{ item.gudang_id?.nama_gudang ?? "" }}
                </td>
                <td class="border border-gray-300">
                  <!-- <v-select
                    label="nama_mata_uang"
                    :loading="isLoadingGetUang"
                    :options="lookup_custom10.data"
                    :filterable="false"
                    v-model="item.mata_uang_id"
                    @input="(item) => onSelectUang(item, i)"
                    class="w-full mb-2"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom10.data.length || search"
                    >
                      <span
                        v-if="lookup_custom10.current_page > 1"
                        @click="onGetUang(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom10.last_page >
                          lookup_custom10.current_page
                        "
                        @click="onGetUang(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select> -->
                  {{ item.mata_uang_id?.nama_mata_uang ?? "" }}
                </td>
                <td class="border border-gray-300">
                  <!-- <v-select
                    label="nama_pembayaran"
                    :loading="isLoadingGetPembayaran"
                    :options="lookup_custom7.data"
                    :filterable="false"
                    v-model="item.pembayaran_id"
                    @input="(item) => onSelectPembayaran(item, i)"
                    class="w-full mb-2"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom7.data.length || search"
                    >
                      <span
                        v-if="lookup_custom7.current_page > 1"
                        @click="onGetPembayaran(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom7.last_page > lookup_custom7.current_page
                        "
                        @click="onGetPembayaran(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select> -->
                  {{ item.pembayaran_id?.nama_pembayaran ?? "" }}
                </td>
                <td class="border border-gray-300">
                  <!-- <v-select
                    label="nama_term_pembayaran"
                    :loading="isLoadingGetTerm"
                    :options="lookup_custom8.data"
                    :filterable="false"
                    v-model="item.term_pembayaran_id"
                    @input="(item) => onSelectTerm(item, i)"
                    class="w-full mb-2"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom8.data.length || search"
                    >
                      <span
                        v-if="lookup_custom8.current_page > 1"
                        @click="onGetTerm(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom8.last_page > lookup_custom8.current_page
                        "
                        @click="onGetTerm(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select> -->
                  {{ item.term_pembayaran_id?.nama_term_pembayaran ?? "" }}
                </td>
                <td class="border border-gray-300">
                  <!-- <select
                    v-model="item.payable_to"
                    name=""
                    id=""
                    class="pl-2 py-1 border border-gray-300 rounded focus:outline-none w-full"
                  >
                    <option value=""></option>
                    <option value="DRIVER">Driver</option>
                    <option value="VENDOR">Vendor</option>
                    <option value="PIC">PIC</option>
                  </select> -->
                  {{ item.payable_to ?? "" }}
                </td>
                <td class="border border-gray-300">
                  <!-- <v-select
                    label="nama_group_item"
                    :loading="isLoadingGetGroupItem"
                    :options="lookup_customers.data"
                    :filterable="false"
                    @search="onGetGroupItem"
                    v-model="item.group_item_id"
                    class="w-full mb-2"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_customers.data.length || search"
                    >
                      <span
                        v-if="lookup_customers.current_page > 1"
                        @click="onGetGroupItem(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_customers.last_page >
                          lookup_customers.current_page
                        "
                        @click="onGetGroupItem(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select> -->
                  {{ item.group_item_id?.nama_group_item ?? "" }}
                </td>
                <td class="border border-gray-300">
                  <!-- <v-select
                    label="nama_item"
                    :loading="isLoadingGetItemGudang"
                    :options="lookup_grade.data"
                    :filterable="false"
                    v-model="item.item_gudang_id"
                    @search="onGetItemGudang(i)"
                    @input="(item) => onSelectItemGudang(item, i)"
                    class="w-full mb-2"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_grade.data.length || search"
                    >
                      <span
                        v-if="lookup_grade.current_page > 1"
                        @click="onGetItemGudang(i, search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_grade.last_page > lookup_grade.current_page
                        "
                        @click="onGetItemGudang(i, search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select> -->
                  {{ item.item_gudang_id?.nama_item ?? "" }}
                </td>
                <td class="border border-gray-300">
                  <!-- <money
                    v-model="item.berat"
                    class="w-full mb-2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  /> -->
                  <p class="text-right">
                    {{ parseFloat(item.berat ?? 0) | formatPrice }}
                  </p>
                </td>
                <td class="border border-gray-300">
                  <!-- <money
                    v-model="item.nilai_kontrak"
                    class="w-full mb-2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  /> -->
                  <p class="text-right">
                    {{ parseFloat(item.nilai_kontrak ?? 0) | formatPrice }}
                  </p>
                </td>
                <td class="border border-gray-300 text-center">
                  <i
                    class="fas fa-pen mx-auto"
                    style="cursor: pointer"
                    @click="editBerat(item)"
                  ></i>
                </td>
                <td class="border border-gray-300 text-center">
                  <i
                    class="fas fa-trash mx-auto"
                    style="cursor: pointer"
                    @click="deleteBerat(item)"
                  ></i>
                </td>
              </tr>
              <tr
                v-if="
                  !this.self.parameters.form.kontrak_lastmile_premi_details
                    .length > 0
                "
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
        <div class="mx-3 mt-2 mb-4">
          <pagination-component :self="this" ref="pagination" />
        </div>
      </div>
    </div>
    <KontrakLastmileInsentifBeratModal
      :self="this"
      ref="modal-insentif-premi"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import KontrakLastmileInsentifBeratModal from "./KontrakLastmileInsentifBeratModal.vue";

export default {
  props: ["self"],

  components: {
    KontrakLastmileInsentifBeratModal,
  },

  data() {
    return {
      isStopSearchJenisKontrak: false,
      isLoadingGetJenisKontrak: false,
      jenis_kontrak_search: "",

      isStopSearchDivisi: false,
      isLoadingGetDivisi: false,
      divisi_search: "",

      isStopSearchJenisBiaya: false,
      isLoadingGetJenisBiaya: false,
      jenis_biaya_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchPembayaran: false,
      isLoadingGetPembayaran: false,
      pembayaran_search: "",

      isStopSearchTerm: false,
      isLoadingGetTerm: false,
      term_search: "",

      isStopSearchJenisKendaraan: false,
      isLoadingGetJenisKendaraan: false,
      jenis_kendaraan_search: "",

      isStopSearchUang: false,
      isLoadingGetUang: false,
      uang_search: "",

      isStopSearchGroupItem: false,
      isLoadingGetGroupItem: false,
      group_item_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      parameters: {
        params: {
          soft_deleted: "",
          search: "",
          order: "kontrak_lastmile_premi_detail_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          gudang_id: "",
          item_gudang_id: "",
        },
      },
    };
  },

  async created() {
    await this.onLoad();
  },

  async mounted() {
    await this.onSearchJenisKontrak();
    await this.onSearchDivisi();
    await this.onSearchJenisBiaya();
    await this.onSearchGudang();
    await this.onSearchPembayaran();
    await this.onSearchTerm();
    await this.onSearchJenisKendaraan();
    await this.onSearchUang();
    await this.onSearchGroupItem();
    // await this.onSearchItemGudang();

    // await this.$axios
    //   .get(
    //     `finance/kontrak-lastmile/get-detail-kontrak-premi/${this.self.parameters.form.kontrak_lastmile_id}`
    //   )
    //   .then((res) => {
    //     this.self.parameters.form.kontrak_lastmile_premi_details =
    //       res.data.data.map((item) => {
    //         return {
    //           ...item,
    //           kontrak_lastmile_premi_detail_id:
    //             item.kontrak_lastmile_premi_detail_id
    //               ? item.kontrak_lastmile_premi_detail_id
    //               : "",
    //           jenis_kontrak_id: item.jenis_kontrak ? item.jenis_kontrak : "",
    //           divisi_id: item.divisi ? item.divisi : "",
    //           jenis_biaya_id: item.jenis_biaya ? item.jenis_biaya : "",
    //           gudang_id: item.gudang ? item.gudang : "",
    //           mata_uang_id: item.mata_uang ? item.mata_uang : "",
    //           pembayaran_id: item.pembayaran ? item.pembayaran : "",
    //           term_pembayaran_id: item.term_pembayaran
    //             ? item.term_pembayaran
    //             : "",
    //           group_item_id: item.group_item ? item.group_item : "",
    //           item_gudang_id: item.item_gudang ? item.item_gudang : "",
    //         };
    //       });
    //   });
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_custom3", //jenis kontrak
      "lookup_custom4", //divisi
      "lookup_custom5", //jenis biaya
      "lookup_custom6", //gudang
      "lookup_custom7", //pembayaran
      "lookup_custom8", //term
      "lookup_custom9", //jenis kendaraan
      "lookup_custom10", //uang
      "lookup_pengawas", //satuan dimensi
      "lookup_operator", //satuan volume
      "lookup_customers", //group item
      "lookup_grade", //item gudang
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    addDetailBerat() {
      // this.self.parameters.form.kontrak_lastmile_premi_details.push({
      //   jenis_kontrak_id: "",
      //   divisi_id: "",
      //   jenis_biaya_id: "",
      //   gudang_id: "",
      //   mata_uang_id: "",
      //   pembayaran_id: "",
      //   term_pembayaran_id: "",
      //   payable_to: "",
      //   jenis_kendaraan_id: "",
      //   biaya_perkm_muat: "",
      //   biaya_perkm_kosong: "",
      //   standar_muat: "",
      //   minimal_muat: "",
      //   maksimal_muat: "",
      //   kecepatan_muat: "",
      //   kecepatan_kosong: "",
      //   standar_waktu_muat: "",
      //   standar_waktu_bongkar: "",
      //   standar_waktu_istirahat_perkm: "",
      //   maksimal_panjang: "",
      //   maksimal_lebar: "",
      //   maksimal_tinggi: "",
      //   satuan_id_dimensi: "",
      //   group_item_id: "",
      //   item_gudang_id: "",
      //   berat: "",
      //   nilai_kontrak: "",
      // });
      this.$refs["modal-insentif-premi"].parameters.form.kontrak_lastmile_id =
        this.self.parameters.form.kontrak_lastmile_id;
      this.$refs["modal-insentif-premi"].show();
      // this.$refs["modal-insentif-premi"].show();
    },

    editBerat(item) {
      this.$refs["modal-insentif-premi"].parameters.form = { ...item };
      this.$refs["modal-insentif-premi"].show();
    },

    async deleteBerat(item) {
      // this.self.parameters.form.kontrak_lastmile_premi_details =
      //   this.self.parameters.form.kontrak_lastmile_premi_details.filter(
      //     (_, itemIndex) => index !== itemIndex
      //   );
      await this.$axios.delete(
        "finance/kontrak-lastmile/delete-detail-kontrak-premi/" +
          item.kontrak_lastmile_premi_detail_id
      );
      await this.onLoad();
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

    onGetDivisi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDivisi);

      this.isStopSearchDivisi = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchDivisi();
      }, 600);
    },

    async onSearchDivisi() {
      if (!this.isLoadingGetDivisi) {
        this.isLoadingGetDivisi = true;

        await this.lookUp({
          url: "master/divisi/get-divisi",
          lookup: "custom4",
          query:
            "?search=" +
            this.divisi_search +
            "&page=" +
            this.lookup_custom4.current_page +
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
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchJenisBiaya();
      }, 600);
    },

    async onSearchJenisBiaya() {
      if (!this.isLoadingGetJenisBiaya) {
        this.isLoadingGetJenisBiaya = true;

        await this.lookUp({
          url: "master/jenis-biaya/get-jenis-biaya",
          lookup: "custom5",
          query:
            "?search=" +
            this.jenis_biaya_search +
            "&page=" +
            this.lookup_custom5.current_page +
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
          url: "master/gudang/get-gudang-user",
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

    onGetPembayaran(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPembayaran);

      this.isStopSearchPembayaran = setTimeout(() => {
        this.pembayaran_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchPembayaran();
      }, 600);
    },

    async onSearchPembayaran() {
      if (!this.isLoadingGetPembayaran) {
        this.isLoadingGetPembayaran = true;

        await this.lookUp({
          url: "master/pembayaran/get-pembayaran",
          lookup: "custom7",
          query:
            "?search=" +
            this.pembayaran_search +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPembayaran = false;
      }
    },

    onGetTerm(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchTerm);

      this.isStopSearchTerm = setTimeout(() => {
        this.term_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchTerm();
      }, 600);
    },

    async onSearchTerm() {
      if (!this.isLoadingGetTerm) {
        this.isLoadingGetTerm = true;

        await this.lookUp({
          url: "master/term-pembayaran/get-term-pembayaran",
          lookup: "custom8",
          query:
            "?search=" +
            this.term_search +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetTerm = false;
      }
    },

    onGetJenisKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisKendaraan);

      this.isStopSearchJenisKendaraan = setTimeout(() => {
        this.jenis_kendaraan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchJenisKendaraan();
      }, 600);
    },

    async onSearchJenisKendaraan() {
      if (!this.isLoadingGetJenisKendaraan) {
        this.isLoadingGetJenisKendaraan = true;

        await this.lookUp({
          url: "master/jenis-kendaraan/get-jenis-kendaraan",
          lookup: "custom9",
          query:
            "?search=" +
            this.jenis_kendaraan_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisKendaraan = false;
      }
    },

    onGetUang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchUang);

      this.isStopSearchUang = setTimeout(() => {
        this.uang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom10.current_page = isNext
            ? this.lookup_custom10.current_page + 1
            : this.lookup_custom10.current_page - 1;
        } else {
          this.lookup_custom10.current_page = 1;
        }

        this.onSearchUang();
      }, 600);
    },

    async onSearchUang() {
      if (!this.isLoadingGetUang) {
        this.isLoadingGetUang = true;

        await this.lookUp({
          url: "master/mata-uang/get-mata-uang",
          lookup: "custom10",
          query:
            "?search=" +
            this.uang_search +
            "&page=" +
            this.lookup_custom10.current_page +
            "&per_page=10",
        });

        this.isLoadingGetUang = false;
      }
    },

    onGetGroupItem(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem);

      this.isStopSearchGroupItem = setTimeout(() => {
        this.group_item_search = search;

        if (typeof isNext !== "function") {
          this.lookup_customers.current_page = isNext
            ? this.lookup_customers.current_page + 1
            : this.lookup_customers.current_page - 1;
        } else {
          this.lookup_customers.current_page = 1;
        }

        this.onSearchGroupItem();
      }, 600);
    },

    async onSearchGroupItem() {
      if (!this.isLoadingGetGroupItem) {
        this.isLoadingGetGroupItem = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "customers",
          query:
            "?search=" +
            this.group_item_search +
            "&page=" +
            this.lookup_customers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem = false;
      }
    },

    onGetItemGudang(gudang_id, search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.item_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }

        this.onSearchItemGudang(gudang_id);
      }, 600);
    },

    async onSearchItemGudang(gudang_id) {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "grade",
          query:
            "?search=" +
            this.item_gudang_search +
            "&gudang_id=" +
            gudang_id +
            "&page=" +
            this.lookup_grade.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItemGudang = false;
      }
    },

    async onSelectItemParams(item) {
      if (item) {
        this.parameters.params.item_gudang_id = item;
        await this.onLoad();
      } else {
        this.parameters.params.item_gudang_id = "";
      }
    },

    onSelectJenisKontrak(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].jenis_kontrak_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].jenis_kontrak_id = "";
      }
    },

    onSelectDivisi(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].divisi_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].divisi_id = "";
      }
    },

    onSelectJenisBiaya(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].jenis_biaya_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].jenis_biaya_id = "";
      }
    },

    async onSelectGudang(item) {
      if (item) {
        this.parameters.params.gudang_id = item;
        await this.onSearchItemGudang(item.gudang_id);
        await this.onLoad();
      } else {
        this.parameters.params.gudang_id = "";
      }
    },

    onSelectItemGudang(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].item_gudang_id = item;
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].item_id = item.item_id;
        this.self.parameters.form.kontrak_lastmile_premi_details[index].berat =
          item.berat_kotor ?? 0;
        // console.log(item);
      } else {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].item_gudang_id = "";
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].item_id = "";
      }
    },

    onSelectPembayaran(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].pembayaran_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].pembayaran_id = "";
      }
    },

    onSelectTerm(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].term_pembayaran_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].term_pembayaran_id = "";
      }
    },

    onSelectJenisKendaraan(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].jenis_kendaraan_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].jenis_kendaraan_id = "";
      }
    },

    onSelectUang(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].mata_uang_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_premi_details[
          index
        ].mata_uang_id = "";
      }
    },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = parseInt(page) || 1;

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      await this.$axios
        .get(
          `finance/kontrak-lastmile/get-detail-kontrak-premi/${this.self.parameters.form.kontrak_lastmile_id}`,
          {
            params: {
              ...this.parameters.params,
              gudang_id: this.parameters.params.gudang_id?.gudang_id,
            },
          }
        )
        .then((res) => {
          this.self.parameters.form.kontrak_lastmile_premi_details =
            res.data.data.map((item) => {
              return {
                ...item,
                kontrak_lastmile_premi_detail_id:
                  item.kontrak_lastmile_premi_detail_id
                    ? item.kontrak_lastmile_premi_detail_id
                    : "",
                jenis_kontrak_id: item.jenis_kontrak ? item.jenis_kontrak : "",
                divisi_id: item.divisi ? item.divisi : "",
                jenis_biaya_id: item.jenis_biaya ? item.jenis_biaya : "",
                gudang_id: item.gudang ? item.gudang : "",
                mata_uang_id: item.mata_uang ? item.mata_uang : "",
                pembayaran_id: item.pembayaran ? item.pembayaran : "",
                term_pembayaran_id: item.term_pembayaran
                  ? item.term_pembayaran
                  : "",
                group_item_id: item.group_item ? item.group_item : "",
                item_gudang_id: item.item_gudang ? item.item_gudang : "",
              };
            });
          loader.hide();
          this.$store.dispatch("pagination/setPagination", res.data);
          this.$refs["pagination"].active_page = this.parameters.params.page;
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingData = false;
        });
    },
  },
};
</script>
