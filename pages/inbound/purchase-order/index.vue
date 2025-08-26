<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Inbound</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Purchase Order</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div class="flex gap-5">
      <div
        class="relative p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
      >
        <div class="card-body">
          <div class="card-title">
            <list-option-section :self="this" ref="form-option" />
          </div>

          <div class="w-full mt-3 mb-7">
            <div class="w-full gap-5 p-2 border border-gray-300 rounded-md">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div class="form-group">
                  <input-horizontal
                    label="Periode Awal"
                    type="date"
                    name="kode_sap"
                    :isHorizontal="true"
                    v-model="parameters.params.start_date"
                    :required="false"
                  />
                </div>

                <div class="form-group">
                  <input-horizontal
                    label="Periode Akhir"
                    type="date"
                    name="periode_akhir"
                    :isHorizontal="true"
                    v-model="parameters.params.end_date"
                    :required="false"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Gudang</b></div>

                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_gudang"
                    :loading="isLoadingGetGudang"
                    :options="lookup_custom1.data"
                    :filterable="false"
                    @search="onGetGudang"
                    v-model="parameters.params.gudang_id"
                    :reduce="(item) => item.gudang_id"
                  >
                    <!-- @input="onSelectGudang" -->
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_custom1.data.length || search"
                    >
                      <span
                        v-if="lookup_custom1.current_page > 1"
                        @click="onGetGudang(search, false)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom1.last_page > lookup_custom1.current_page
                        "
                        @click="onGetGudang(search, true)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Status PO</b></div>

                  <select
                    class="p-1 w-1/2 border border-gray-300 rounded-sm outline-none"
                    name="status_selesai"
                    id="status_selesai"
                    v-model="parameters.params.status_po"
                  >
                    <option value=""></option>
                    <option value="0">Belum Dibuat ASN</option>
                    <option value="1">Sudah Dibuat ASN</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Status Selesai</b></div>

                  <select
                    class="p-1 w-1/2 border border-gray-300 rounded-sm outline-none"
                    name="status_selesai"
                    id="status_selesai"
                    v-model="parameters.params.status_selesai"
                  >
                    <option value=""></option>
                    <option value="0">Open</option>
                    <option value="1">Close</option>
                  </select>
                </div>
              </div>

              <div class="flex gap-3 mt-5">
                <button
                  @click="onLoad"
                  class="bg-blue-500 shadow-md hover:shadow-none p-2 text-white rounded-md flex"
                >
                  <i class="fa fa-filter text-white font-bold mr-2"></i>
                  <div>Filter</div>
                </button>
              </div>
            </div>
          </div>

          <div class="table-responsive w-full relative overflow-y-auto">
            <table
              class="mb-5 overflow-auto table-fixed border border-gray-300"
              ref="formContainer"
            >
              <thead>
                <tr class="text-base uppercase">
                  <th class="w-28 border border-gray-300">Generate ASN</th>
                  <th class="w-20 border border-gray-300">Edit</th>
                  <th class="w-20 border border-gray-300">Details</th>
                  <th class="w-20 border border-gray-300">No</th>
                  <!-- <th
                  @click="
                  onSort(
                    'nama_provinsi',
                    parameters.params.sort == 'asc' ? 'desc' : 'asc'
                    )
                    "
                    class="cursor-pinter w-[30%]"
                    >
                    <div class="flex justify-between items-baseline">
                      <div>Nama Provinsi</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                          parameters.params.order == 'nama_provinsi' &&
                          parameters.params.sort == 'asc'
                          ? ''
                          : 'light-gray'
                          "
                          ></i>
                          <i
                          class="fas fa-caret-down"
                          :class="
                          parameters.params.order == 'nama_provinsi' &&
                          parameters.params.sort == 'desc'
                          ? ''
                          : 'light-gray'
                          "
                          ></i>
                        </div>
                      </div>
                    </th> -->
                  <th class="w-60 border border-gray-300">Kode PO</th>
                  <th class="w-60 border border-gray-300">Kode ASN</th>
                  <th class="w-60 border border-gray-300">Gudang</th>
                  <th class="w-60 border border-gray-300">Item</th>
                  <th class="w-60 border border-gray-300">Quantity</th>
                  <th class="w-60 border border-gray-300">Tanggal</th>
                  <!-- <th class="w-60 border border-gray-300">Vendor</th>
                  <th class="w-60 border border-gray-300">Surat Jalan</th>
                  <th class="w-60 border border-gray-300">Kendaraan</th>
                  <th class="w-60 border border-gray-300">Staff</th> -->
                  <th class="w-60 border border-gray-300">Status PO</th>
                  <th class="w-60 border border-gray-300">Total QTY ASN</th>

                  <th class="w-20 border border-gray-300">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in data" :key="i">
                  <td class="text-center border border-gray-300">
                    <button
                      @click="onGenerate(item)"
                      class="text-white p-1 rounded-md bg-orange-500 px-3"
                      :class="
                        item.status_selesai === '1'
                          ? 'bg-gray-200 cursor-not-allowed'
                          : 'bg-orange-500 hover:bg-orange-600'
                      "
                      :disabled="item.status_selesai === '1'"
                    >
                      <i class="fa fa-plus"></i>
                    </button>
                  </td>

                  <td
                    class="text-center border border-gray-300 place-items-center"
                  >
                    <small-edit-button
                      @click="onEdit(item)"
                      :disabled="item.status_selesai === '1'"
                    />
                  </td>
                  <td
                    class="text-center border border-gray-300 place-items-center"
                  >
                    <small-detail-button @click="onDetail(item)" />
                  </td>
                  <td class="border border-gray-300 text-center">
                    {{
                      (parameters.params.page - 1) *
                        parameters.params.per_page +
                      i +
                      1
                    }}
                  </td>

                  <td class="border border-gray-300">
                    <div>
                      {{ item.kode_po }}
                      <p v-if="item.user_id_input" class="text-blue-500">
                        <i>Dibuat oleh: {{ item.user_id_input.username }}</i>
                      </p>
                      <p v-else class="text-blue-500">
                        <i>Dibuat oleh: Sistem</i>
                      </p>
                    </div>
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="item.asns.length > 0"
                  >
                    <span v-for="(asn, index) in item.asns" :key="index">
                      {{ asn.kode_asn }}
                    </span>
                  </td>
                  <td class="border border-gray-300" v-else></td>
                  <td class="border border-gray-300">
                    {{ item.gudang ? item.gudang.nama_gudang : "-" }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-for="(itemDetail, index) in item.purchase_order_details"
                    :key="index"
                  >
                    <p>{{ itemDetail.item_gudang.nama_item }}</p>
                  </td>
                  <td
                    class="border border-gray-300"
                    v-for="(itemDetail, index) in item.purchase_order_details"
                    :key="index"
                  >
                    <p>
                      {{ itemDetail.quantity | formatPrice }}
                      {{ itemDetail.item_gudang.satuan.nama_satuan }}
                    </p>
                  </td>
                  <td class="border border-gray-300">
                    {{ formatDate(item.tanggal) }}
                  </td>

                  <!-- <td class="border border-gray-300">
                    {{
                      item.vendor_transporter
                        ? item.vendor_transporter.nama_vendor
                        : "-"
                    }}
                  </td> -->
                  <!-- <td class="border border-gray-300">{{ item.surat_jalan }}</td> -->
                  <!-- <td class="border border-gray-300">
                    {{
                      item.kendaraan
                        ? item.kendaraan.nama_kendaraan +
                          " - " +
                          item.kendaraan.kode_kendaraan
                        : "-"
                    }}
                  </td> -->
                  <!-- <td class="border border-gray-300">
                    {{
                      item.staff
                        ? item.staff.nama_lengkap +
                          " - " +
                          item.staff.kode_staff
                        : "-"
                    }}
                  </td> -->
                  <td class="border border-gray-300">
                    <span
                      v-if="item.asns_count == 0"
                      class="p-1 rounded-md bg-orange-500 text-white"
                    >
                      PO
                    </span>
                    <span
                      v-if="item.asns_count > 0"
                      class="p-1 rounded-md bg-blue-500 text-white"
                    >
                      Dibuat {{ item.asns_count }} ASN
                    </span>
                  </td>
                  <td
                    class="border border-gray-300"
                    v-for="(itemDetail, index) in item.purchase_order_details"
                    :key="index"
                  >
                    <p>
                      {{
                        itemDetail.asn_details_sum_quantity ?? 0 | formatPrice
                      }}
                    </p>
                  </td>

                  <td
                    class="text-center border border-gray-300 place-items-center"
                  >
                    <small-delete-button
                      @click="onTrashed(item)"
                      v-if="!item.deleted_at"
                      :disabled="item.status_selesai === '1'"
                    />
                  </td>
                </tr>
              </tbody>
              <table-data-loading-section :self="this" />

              <table-data-not-found-section :self="this" />
            </table>
          </div>

          <div class="mx-3 mt-2 mb-4">
            <pagination-section :self="this" ref="pagination" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Purchase Order",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  mounted() {
    this.$refs["form-option"].isExport = false;
    this.$refs["form-option"].isFilter = false;
    this.$refs["form-option"].isMaintenancePage = true;
    this.$refs["form-option"].isAddData = true;

    if (
      this.getRoles.destroy ||
      this.getRoles.destroy_all ||
      this.getRoles.restore ||
      this.getRoles.restore_all
    ) {
      this.$refs["form-option"].isMaintenancePage = true;
    }

    if (this.getRoles.store) {
      this.$refs["form-option"].isAddData = true;
    }

    if (this.getRoles.export) {
      this.$refs["form-option"].isExportFile = true;

      this.$refs["form-option"].isExportFilePdf = true;
      this.$refs["form-option"].isExportFileExcel = true;

      if ("export_pdf" in this.getRoles || "export_excel" in this.getRoles) {
        this.$refs["form-option"].isExportFilePdf = this.getRoles.export_pdf;
        this.$refs["form-option"].isExportFileExcel =
          this.getRoles.export_excel;
      }
    }

    if (this.getRoles.print) {
      this.$refs["form-option"].isExportPrint = true;
    }
  },

  async mounted() {
    await this.onSearchGudang();
  },

  data() {
    return {
      title: "Purchase Order",
      isLoadingData: false,
      isLoadingGenerate: false,
      isPaginate: true,
      parameters: {
        url: "inbound/purchase-order",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "purchase_order_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_date: "",
          gudang_id: "",
          status_po: "",
          status_selesai: "",
        },
        form: {
          gudang_id: "",
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
          pengemudi_id: "",
          supplier_id: "",
          perkiraan_tiba: "",
          kebutuhan_peralatan: "",
          handling_instruction: "",
          catatan: "",

          //Tracking
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
          purchase_order_details: [],
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },
      default_roles: {
        store: true,
        update: true,
        destroy: true,
        restore: true,
        show: true,
        export: true,
        export_excel: true,
        export_pdf: true,
        print: true,
        destroy_all: true,
        restore_all: true,
        import: true,
      },
      user: this.$auth.user,
      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",
    };
  },

  computed: {
    ...mapState("moduleApi", ["data", "error", "result", "lookup_custom1"]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "purchase-order"
        );

        let roles = {};

        if (JSON.parse(main_role.pivot.operators).includes("all")) {
          return this.default_roles;
        }

        JSON.parse(main_role.pivot.operators).forEach((item) => {
          roles[item.replace("-", "_")] = true;
        });

        return roles;
      }
    },
  },

  methods: {
    ...mapActions("moduleApi", [
      "getData",
      "deleteData",
      "restoreData",
      "deleteAllData",
      "restoreAllData",
      "lookUp",
    ]),

    ...mapMutations("moduleApi", ["set_data"]),

    formatDate(dateString) {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    },

    onFormShow() {
      this.$router.push("/inbound/purchase-order/add");
    },

    onEdit(item) {
      this.$router.push("/inbound/purchase-order/" + item.purchase_order_id);
    },

    onDetail(item) {
      this.$router.push(
        "/inbound/purchase-order/detail/" + item.purchase_order_id
      );
    },

    async onGenerate(item) {
      try {
        this.isLoadingGenerate = true;

        const response = await this.$axios.get(
          `inbound/purchase-order/${item.purchase_order_id}`
        );

        const fullPOData = response.data;

        if (fullPOData.purchase_order_details) {
          fullPOData.purchase_order_details =
            fullPOData.purchase_order_details.map((detail) => ({
              ...detail,
              serial_number: detail.serial_number || "",
              panjang: detail.panjang || "",
              lebar: detail.lebar || "",
              tinggi: detail.tinggi || "",
              berat: detail.berat || "",
              no_referensi: detail.no_referensi || "",
              note: detail.note || "",
            }));
        }

        console.log("Full PO data with complete details:", fullPOData);

        sessionStorage.setItem("asnGenerateData", JSON.stringify(fullPOData));

        this.$router.push("/inbound/asn/add");
      } catch (error) {
        this.isLoadingGenerate = false;

        this.$toaster.error(
          "Gagal generate ASN: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        this.isLoadingGenerate = false;
      }
    },

    onTrashed(item) {
      if (this.parameters.loadings.isDelete) return;

      this.$confirm({
        auth: false,
        message: "Data ini akan dipindahkan ke dalam Trash. Yakin ??",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: async (confirm) => {
          if (confirm) {
            this.parameters.loadings.isDelete = true;

            await this.deleteData({
              url: this.parameters.url,
              id: item.purchase_order_id,
              params: this.parameters.params,
            });

            if (this.result == true) {
              this.onLoad(this.parameters.params.page);
              this.$toaster.success(
                "Data berhasil di pindahkan ke dalam Trash!"
              );
            } else {
              this.$globalErrorToaster(this.$toaster, this.error);
            }

            this.parameters.loadings.isDelete = false;
          }
        },
      });
    },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = parseInt(page) || 1;

      this.parameters.form.checkboxs = [];
      if (document.getElementById("checkAll")) {
        document.getElementById("checkAll").checked = false;
      }

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      await this.getData(this.parameters);

      if (this.result == true) {
        loader.hide();

        if (page == 1) {
          this.$refs["pagination"].generatePage();
        }

        this.$refs["pagination"].active_page = this.parameters.params.page;
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingData = false;
      console.log(this.parameters.params);
    },

    onSort(column, sort = "asc") {
      this.parameters.params = {
        ...this.parameters.params,
        order: column,
        sort: sort,
      };

      this.onLoad(this.parameters.params.page);
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudangGudang);

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
      if (!this.isLoadingGetGudangGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang-user",
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
  },
};
</script>
