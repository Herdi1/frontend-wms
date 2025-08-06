<template>
  <div>
    <div class="w-full flex justify-between items-center">
      <h1 class="text-xl font-bold">Rute Shipment</h1>
      <div class=" ">
        <!-- <button
          type="button"
          @click="AddDetailRute"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Tambah Rute Shipment</p>
        </button> -->
      </div>
    </div>
    <div class="table-responsive overflow-y-hidden mb-7">
      <table
        class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
        :class="
          this.self.parameters.form.rute_shipments.length ? 'mb-[300px]' : ''
        "
      >
        <thead>
          <tr class="text-sm uppercase text-nowrap">
            <th class="w-[200px] border border-gray-300">Lokasi Asal</th>
            <th class="w-[200px] border border-gray-300">Lokasi Tujuan</th>
            <th class="w-[200px] border border-gray-300">Jarak</th>
            <th class="w-[200px] border border-gray-300">Biaya BBM</th>
            <th class="w-[200px] border border-gray-300">
              Waktu Sampai Tujuan (menit)
            </th>
            <th class="w-[200px] border border-gray-300">Jenis Routing</th>
            <!-- <th class="w-[100px] border border-gray-300 text-center">Hapus</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in self.parameters.form.rute_shipments"
            :key="i"
            class="border-t align-top"
          >
            <td class="border border-gray-300">
              <p>
                {{
                  item.lokasi_id_asal ? item.lokasi_id_asal.nama_lokasi : "-"
                }}
              </p>
              <p>
                {{
                  item.lokasi_id_asal ? item.lokasi_id_asal.kode_lokasi : "-"
                }}
              </p>
              <!-- <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_lokasi"
                :loading="isLoadingGetLokasi"
                :options="lookup_location.data"
                :filterable="false"
                @search="onGetLokasi"
                v-model="item.lokasi_id_asal"
                @input="(item) => onSelectLokasiAsal(item, i)"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_location.data.length || search"
                >
                  <span
                    v-if="lookup_location.current_page > 1"
                    @click="onGetLokasi(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_location.last_page > lookup_location.current_page
                    "
                    @click="onGetLokasi(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select> -->
            </td>
            <td class="border border-gray-300">
              <p>
                {{
                  item.lokasi_id_tujuan
                    ? item.lokasi_id_tujuan.nama_lokasi
                    : "-"
                }}
              </p>
              <p>
                {{
                  item.lokasi_id_tujuan
                    ? item.lokasi_id_tujuan.kode_lokasi
                    : "-"
                }}
              </p>
              <!-- <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_lokasi"
                :loading="isLoadingGetLokasi"
                :options="lookup_location.data"
                :filterable="false"
                @search="onGetLokasi"
                v-model="item.lokasi_id_tujuan"
                @input="(item) => onSelectLokasiTujuan(item, i)"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_location.data.length || search"
                >
                  <span
                    v-if="lookup_location.current_page > 1"
                    @click="onGetLokasi(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_location.last_page > lookup_location.current_page
                    "
                    @click="onGetLokasi(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select> -->
            </td>
            <td class="border border-gray-300">
              <!-- <money
                v-model="item.jarak"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              /> -->
              <p>
                {{ item.jarak }}
              </p>
            </td>
            <td class="border border-gray-300">
              <!-- <money
              v-model="item.biaya_bbm"
              class="w-full pl-2 py-1 border rounded focus:outline-none"
              @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                  "
              /> -->
              <p>
                {{ item.biaya_bbm }}
              </p>
            </td>
            <td class="border border-gray-300">
              <!-- <input
                type="number"
                v-model="item.waktu_sampai_tujuan"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              /> -->
              <p>
                {{ item.waktu_sampai_tujuan }}
              </p>
            </td>
            <td class="border border-gray-300">
              <select
                disabled
                name="jenis_routing"
                id="jenis_routing"
                v-model="item.jenis_routing"
                class="w-full p-1 rounded-md border border-gray-300 outline-none"
              >
                <option value="MUAT">Muat</option>
                <option value="KOSONG">Kosong</option>
              </select>
            </td>
            <!-- <td class="text-center text-gray-600 border border-gray-300">
              <i
                class="fas fa-trash mx-auto"
                style="cursor: pointer"
                @click="onDeleteDetailRute(i)"
              ></i>
            </td> -->
          </tr>
          <tr v-if="!self.parameters.form.rute_shipments.length > 0">
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
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["self"],

  data() {
    return {
      isStopSearchLokasi: false,
      isLoadingGetLokasi: false,
      lokasi_search: "",
    };
  },

  async mounted() {
    await this.onSearchLokasi();
  },

  computed: {
    ...mapState("moduleApi", ["data", "error", "result", "lookup_location"]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    AddDetailRute() {
      this.self.parameters.form.rute_shipments.push({
        lokasi_id_asal: "",
        lokasi_id_tujuan: "",
        jarak: "",
        biaya_bbm: "",
        waktu_sampai_tujuan: "",
        jenis_routing: "",
      });
    },

    onDeleteDetailRute(index) {
      this.self.parameters.form.rute_shipments =
        this.self.parameters.form.rute_shipments.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetLokasi(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchLokasi);

      this.isStopSearchLokasi = setTimeout(() => {
        this.lokasi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_location.current_page = isNext
            ? this.lookup_location.current_page + 1
            : this.lookup_location.current_page - 1;
        } else {
          this.lookup_location.current_page = 1;
        }
        this.onSearchLokasi();
      }, 600);
    },

    async onSearchLokasi() {
      if (!this.isLoadingGetLokasi) {
        this.isLoadingGetLokasi = true;

        await this.lookUp({
          url: "master/lokasi/get-lokasi",
          lookup: "location",
          query:
            "?search=" +
            this.lokasi_search +
            "&page=" +
            this.lookup_location.current_page +
            "&per_page=10",
        });
        this.isLoadingGetLokasi = false;
      }
    },

    onSelectLokasiAsal(item, index) {
      this.self.parameters.form.rute_shipments[index].lokasi_id_asal =
        item || "";
      console.log(this.self.parameters.form.rute_shipments);
    },

    onSelectLokasiTujuan(item, index) {
      this.self.parameters.form.rute_shipments[index].lokasi_id_tujuan =
        item || "";
      console.log(this.self.parameters.form.rute_shipments);
    },
  },
};
</script>
