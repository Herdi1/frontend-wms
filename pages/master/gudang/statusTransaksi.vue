<template>
  <div>
    <div class="w-full flex justify-end gap-3">
      <button
        type="button"
        @click="onLoad"
        class="bg-blue-500 hover:bg-blue-600 p-2 text-white rounded-md mb-3 text-center"
      >
        <i class="fa fa-plus text-white font-bold"></i>
        <!-- Tambah ke Item Gudang -->
      </button>
      <button
        type="button"
        @click="deleteSelectedItem"
        class="bg-red-500 hover:bg-red-600 p-2 text-white rounded-md mb-3 text-center"
      >
        <i class="fa fa-trash text-white font-bold"></i>
        <!-- Tambah ke Item Gudang -->
      </button>
    </div>
    <div>
      <table ref="formContainer">
        <thead>
          <tr class="uppercase">
            <th class="w-[50px] text-center border border-gray-300">
              <input
                type="checkbox"
                name=""
                v-model="selectAll"
                @change="toggleAllCheckboxes"
              />
            </th>
            <th class="w-[50px] text-center border border-gray-300">No</th>
            <th class="w-[200px] border border-gray-300">Proses</th>
            <th class="w-[200px] border border-gray-300">Modul</th>
            <th class="w-[200px] border border-gray-300">Kode Transaksi</th>
            <th class="w-[200px] border border-gray-300">
              Keterangan Transaksi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in this.self.form.status_transaksis" :key="i">
            <td class="border border-gray-300 text-center">
              <input
                type="checkbox"
                name="item"
                :value="item.master_status_transaksi_id"
                v-model="checkboxs"
                @change="checkIfAllSelected"
                id=""
              />
            </td>
            <td class="border border-gray-300 text-center">
              <!-- {{
                (parameters.params.page - 1) * parameters.params.per_page +
                i +
                1
              }} -->
            </td>
            <td class="border border-gray-300 text-center">
              {{
                item.jenis_proses_transaksi
                  ? item.jenis_proses_transaksi.nama_jenis_proses_tansaksi
                  : "Tidak Ditemukan"
              }}
            </td>
            <td class="border border-gray-300 text-center">{{ item.modul }}</td>
            <td class="border border-gray-300 text-center">
              {{ item.kode_status_transaksi }}
            </td>
            <!-- <td>{{ item.nama_status_transaksi }}</td>
                  <td>{{ item.progres }}</td> -->
            <td class="border border-gray-300 text-center">
              {{ item.keterangan_transaksi ? item.keterangan_transaksi : "" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  props: ["self"],

  created() {
    this.set_data([]);
  },

  data() {
    return {
      data: [],
      selectAll: false,
      checkboxs: [],
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "master/master-status-transaksi",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "master_status_transaksi_id",
          sort: "desc",
          all: "1",
          per_page: 10,
          page: 1,
          form: {
            jenis_proses_transaksi_id: "",
            modul: "",
            kode_status_transaksi: "",
            nama_status_transaksi: "",
            keterangan_transaksi: "",
            progres: "",
          },
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },
    };
  },

  async mounted() {},

  computed: {
    ...mapState("moduleApi", ["data", "error", "result"]),
  },

  methods: {
    ...mapActions("moduleApi", ["getData", "deleteData"]),
    ...mapMutations("moduleApi", ["set_data"]),

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.checkboxs = [];
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      // await this.getData(this.parameters);
      try {
        let result = await this.$axios.get("/" + this.parameters.url, {
          params: this.parameters.params,
        });
        this.data = result.data;
      } catch (error) {
        console.error("Failed to fetch:", error);
      }

      if (this.data) {
        this.data.forEach((item) => {
          if (
            !this.self.form.status_transaksis.find(
              (data) =>
                data.master_status_transaksi_id ===
                item.master_status_transaksi_id
            )
          ) {
            this.self.form.status_transaksis.push(item);
          }
        });
      }

      if (this.result == true) {
        loader.hide();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingData = false;
    },

    deleteSelectedItem() {
      this.checkboxs.forEach((item) => {
        let index = this.self.form.status_transaksis.findIndex(
          (data) => data.master_status_transaksi_id == item
        );
        if (index !== -1) {
          this.self.form.status_transaksis.splice(index, 1);
          this.checkboxs.pop(item);
        }
      });
      console.log(this.checkboxs);
      this.checkboxs = [];
    },

    inserCheckbox() {
      if (!this.form.status_transaksis?.length) {
        this.form.status_transaksis = [];
      }
      this.checkboxs.forEach((item) => {
        this.form.status_transaksis.push(item);
      });
    },

    toggleAllCheckboxes() {
      if (this.selectAll) {
        this.checkboxs = this.self.form.status_transaksis.map(
          (item) => item.master_status_transaksi_id
        );
      } else {
        this.checkboxs = [];
      }
    },

    checkIfAllSelected() {
      this.selectAll =
        this.checkboxs.length === this.self.form.status_transaksis.length;
    },
  },
};
</script>
