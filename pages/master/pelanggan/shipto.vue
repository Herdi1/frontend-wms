<template>
  <div>
    <div class="w-full flex gap-3">
      <button
        type="button"
        class="bg-blue-500 flex gap-1 hover:bg-blue-600 p-2 text-white rounded-md mb-3 text-center"
        @click="onLoad"
      >
        <i class="fa fa-plus text-white font-bold"></i>
        Tambah
      </button>
      <button
        class="bg-red-500 hover:bg-red-600 p-2 text-white rounded-md mb-3 text-center"
        type="button"
        @click="deleteSelectedItem"
      >
        <i class="fa fa-trash text-white font-bold"></i>
        Hapus
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
            <th class="w-[200px] border border-gray-300">Tipe Lokasi</th>
            <th class="w-[200px] border border-gray-300">Kode Referensi</th>
            <th class="w-[200px] border border-gray-300">Kode Lokasi</th>
            <th class="w-[200px] border border-gray-300">Nama Lokasi</th>
            <th class="w-[200px] border border-gray-300">Nomor Telp</th>
            <th class="w-[200px] border border-gray-300">Nomor HP</th>
            <th class="w-[200px] border border-gray-300">Nama Pemilik</th>
            <th class="w-[200px] border border-gray-300">Kota</th>
            <th class="w-[200px] border border-gray-300">Provinsi</th>
            <th class="w-[200px] border border-gray-300">Negara</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in this.self.form.lokasi_pelanggans" :key="i">
            <td class="border border-gray-300 text-center">
              <input
                type="checkbox"
                name="item"
                :value="item.lokasi_id"
                v-model="checkboxs"
                @change="checkIfAllSelected"
              />
            </td>
            <td class="border border-gray-300">
              {{ item.tipe_lokasi }}
            </td>
            <td class="border border-gray-300">
              {{ item.kode_referensi }}
            </td>
            <td class="border border-gray-300">
              {{ item.kode_lokasi }}
            </td>
            <td class="border border-gray-300">
              {{ item.nama_lokasi }}
            </td>
            <td class="border border-gray-300">
              {{ item.no_telp }}
            </td>
            <td class="border border-gray-300">
              {{ item.no_hp }}
            </td>
            <td class="border border-gray-300">
              {{ item.nama_pemilik }}
            </td>
            <td class="border border-gray-300">
              {{ item.kota?.nama_kota }}
            </td>
            <td class="border border-gray-300">
              {{ item.provinsi?.nama_provinsi }}
            </td>
            <td class="border border-gray-300">
              {{ item.negara?.nama_negara }}
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

  async created() {
    this.set_data([]);
    if (this.self.isEditable) {
      await this.onLoad();
    }
  },

  data() {
    return {
      data: [],
      selectAll: false,
      checkboxs: [],
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "master/lokasi",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "lokasi_id",
          sort: "desc",
          all: "1",
          per_page: 10,
          page: 1,
          // form: {
          //   lokasi_id_induk: "",
          //   tipe_lokasi: "",
          //   kode_referensi: "",
          //   kode_lokasi: "",
          //   nama_lokasi: "",
          //   negara_id: "",
          //   provinsi_id: "",
          //   kota_id: "",
          //   kecamatan_id: "",
          //   kelurahan_id: "",
          //   kode_pos_id: "",
          //   email: "",
          //   nilai_plafon: "",
          //   no_telp: "",
          //   no_hp: "",
          //   no_npwp: "",
          //   longitude: "",
          //   latitude: "",
          //   radius: "",
          //   longitude2: "",
          //   latitude2: "",
          //   radius2: "",
          //   longitude3: "",
          //   latitude3: "",
          //   radius3: "",
          //   alamat: "",
          //   alamat_lokasi: "",
          //   nama_pemilik: "",
          //   nik_pemilik: "",
          //   npwp_pemilik: "",
          //   negara_id_pemilik: "",
          //   provinsi_id_pemilik: "",
          //   kota_id_pemilik: "",
          //   kecamatan_id_pemilik: "",
          //   kelurahan_id_pemilik: "",
          //   alamat_pemilik: "",
          // },
        },
        // loadings: {
        //   isDelete: false,
        //   isRestore: false,
        // },
      },
    };
  },

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

      try {
        let res = await this.$axios.get("/" + this.parameters.url, {
          params: this.parameters.params,
        });
        this.data = res.data;
      } catch (error) {
        console.log("Failed to fetch:", error);
      }

      if (this.data) {
        if (this.self.isEditable) {
          this.data.forEach((item) => {
            let index = this.self.form.lokasi_pelanggans.findIndex(
              (data) => data.lokasi_id === item.lokasi_id
            );
            if (index !== -1) {
              this.self.form.lokasi_pelanggans.splice(index, 1, item);
            }
          });
        } else {
          this.data.forEach((item) => {
            if (
              !this.self.form.lokasi_pelanggans.find(
                (data) => data.lokasi_id === item.lokasi_id
              )
            ) {
              this.self.form.lokasi_pelanggans.push(item);
            }
          });
        }
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
        let index = this.self.form.lokasi_pelanggans.findIndex(
          (data) => data.lokasi_id === item
        );
        if (index !== -1) {
          this.self.form.lokasi_pelanggans.splice(index, 1);
          this.checkboxs.pop(item);
        }
      });
      this.checkboxs = [];
    },

    insertCheckbox() {
      if (!this.form.lokasi_pelanggans?.length) {
        this.form.lokasi_pelanggans = [];
      }
      this.checkboxs.forEach((item) => {
        this.form.lokasi_pelanggans.push(item);
      });
    },

    toggleAllCheckboxes() {
      if (this.selectAll) {
        this.checkboxs = this.self.form.lokasi_pelanggans.map(
          (item) => item.lokasi_id
        );
      } else {
        this.checkboxs = [];
      }
    },

    checkIfAllSelected() {
      this.selectAll =
        this.checkboxs.length === this.self.form.lokasi_pelanggans.length;
    },
  },
};
</script>
