<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Shipment</h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <div class="w-full">
        <div
          class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kode Shipment</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_shipment.kode_shipment
                    ? this.detail_shipment.kode_shipment
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Gudang</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_shipment.gudang
                    ? this.detail_shipment.gudang.nama_gudang
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Nomor Referensi</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_shipment.no_referensi
                    ? this.detail_shipment.no_referensi
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Tanggal</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_shipment.tanggal
                    ? this.detail_shipment.tanggal
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">User PIC</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_shipment.user_pic
                    ? this.detail_shipment.user_pic.nama_lengkap
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Pengemudi</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_shipment.staff
                    ? this.detail_shipment.staff.nama_lengkap
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kendaraan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_shipment.kendaraan
                    ? this.detail_shipment.kendaraan.nama_kendaraan
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Jenis Kendaraan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_shipment.jenis_kendaraan
                    ? this.detail_shipment.jenis_kendaraan.nama_jenis_kendaraan
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Keterangan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_shipment.keterangan
                    ? this.detail_shipment.keterangan
                    : "-"
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-7">
        <tab-component :tabs="tabs">
          <template #DetailShipment>
            <ShipmentDetails :self="{ detail_shipment }" />
          </template>
          <template #RuteShipment>
            <RuteShipment :self="{ detail_shipment }" />
          </template>
          <template #BiayaLastmile>
            <BiayaLastmile :self="{ detail_shipment }" />
          </template>
          <template #TagihanLastmile>
            <TagihanLastmiles :self="{ detail_shipment }" />
          </template>
          <template #RiwayatShipment>
            <div>
              <table
                class="mb-5 table-fixed border border-collapse border-gray-300"
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <th class="border border-gray-300">Status</th>
                    <th class="border border-gray-300">Tanggal</th>
                    <th class="border border-gray-300">User</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-t border-gray-400 align-top"
                    v-if="detail_shipment.user_input"
                  >
                    <td class="border border-gray-300">
                      <p>Dibuat</p>
                    </td>
                    <td class="border border-gray-300">
                      <p>{{ detail_shipment.tanggal }}</p>
                    </td>
                    <td class="border border-gray-300">
                      <p>
                        {{ detail_shipment.user_input.nama_lengkap }}
                      </p>
                    </td>
                  </tr>
                  <tr
                    class="border-t border-gray-400 align-top"
                    v-if="detail_shipment.user_muat"
                  >
                    <td class="border border-gray-300">
                      <p>Muat</p>
                    </td>
                    <td class="border border-gray-300">
                      <p>{{ detail_shipment.tanggal_muat }}</p>
                    </td>
                    <td class="border border-gray-300">
                      <p>
                        {{ detail_shipment.user_muat.nama_lengkap }}
                      </p>
                    </td>
                  </tr>
                  <tr
                    class="border-t border-gray-400 align-top"
                    v-if="detail_shipment.user_inspeksi"
                  >
                    <td class="border border-gray-300">
                      <p>Inspeksi</p>
                    </td>
                    <td class="border border-gray-300">
                      <p>{{ detail_shipment.tanggal_inspeksi }}</p>
                    </td>
                    <td class="border border-gray-300">
                      <p>
                        {{ detail_shipment.user_inspeksi.nama_lengkap }}
                      </p>
                    </td>
                  </tr>
                  <tr
                    class="border-t border-gray-400 align-top"
                    v-if="detail_shipment.user_kiriman"
                  >
                    <td class="border border-gray-300">
                      <p>Dikirim</p>
                    </td>
                    <td class="border border-gray-300">
                      <p>{{ detail_shipment.tanggal_kiriman }}</p>
                    </td>
                    <td class="border border-gray-300">
                      <p>
                        {{ detail_shipment.user_kiriman.nama_lengkap }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </tab-component>
      </div>
    </div>
  </section>
</template>

<script>
import ShipmentDetails from "./ShipmentDetails.vue";
import RuteShipment from "./RuteShipments.vue";
import BiayaLastmile from "./BiayaLastmiles.vue";
import TagihanLastmiles from "./TagihanLastmiles.vue";
export default {
  props: ["self"],

  components: {
    ShipmentDetails,
    RuteShipment,
    BiayaLastmile,
    TagihanLastmiles,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        {
          name: "Detail Shipment",
          slotName: "DetailShipment",
        },
        {
          name: "Rute Shipment",
          slotName: "RuteShipment",
        },
        {
          name: "Biaya Lastmile",
          slotName: "BiayaLastmile",
        },
        {
          name: "Tagihan Lastmile",
          slotName: "TagihanLastmile",
        },
        {
          name: "Riwayat Shipment",
          slotName: "RiwayatShipment",
        },
      ],

      id,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      detail_shipment: {
        kode_shipment: "",
        staff_id: "",
        gudang_id: "",
        tanggal: "",
        tanggal_muat: "",
        tanggal_inspeksi: "",
        tanggal_kiriman: "",
        kendaraan_id: "",
        jenis_kendaraan_id: "",
        pengemudi_id: "",
        keterangan: "",
        no_referensi: "",
        status_muat: "",
        catatan_muat: "",
        user_id_pic: "",
        user_input: "",
        user_muat: "",
        user_inspeksi: "",
        user_kiriman: "",

        shipment_details: [],
        rute_shipments: [],
        biaya_lastmiles: [],
        tagihan_lastmiles: [],

        staff: {},
        gudang: {},
        kendaraan: {},
        jenis_kendaraan: {},
        pengemudi: {},
        user_pic: {},
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`outbound/shipment/${this.id}`);
      Object.keys(this.detail_shipment).forEach((item) => {
        if (
          item != "shipment_details" &&
          item != "rute_shipments" &&
          item != "biaya_lastmiles"
        ) {
          this.detail_shipment[item] = res.data[item];
        }
      });
      this.detail_shipment.shipment_details = res.data.shipment_details
        ? res.data.shipment_details
        : [];
      this.detail_shipment.rute_shipments = res.data.rute_shipments
        ? res.data.rute_shipments
        : [];
      this.detail_shipment.biaya_lastmiles = res.data.biaya_lastmiles
        ? res.data.biaya_lastmiles
        : [];
      this.isLoadingPage = false;
      // console.log("data", this.detail_shipment.biaya_lastmiles);
    } catch (error) {
      this.$router.back();
    }
  },
};
</script>
