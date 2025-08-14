<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">
          Detail Kontrak Lastmile Pelanggan
        </h1>

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
              <label class="w-[40%]">No Referensi</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_lastmile.no_referensi
                    ? this.detail_lastmile.no_referensi
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Pelanggan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_lastmile.pelanggan
                    ? this.detail_lastmile.pelanggan.nama_pelanggan
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Tanggal Kontrak</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_lastmile.tanggal_kontrak
                    ? this.detail_lastmile.tanggal_kontrak
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Tanggal Berlaku</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_lastmile.tanggal_berlaku
                    ? this.detail_lastmile.tanggal_berlaku
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Tanggal Berhenti</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_lastmile.tanggal_berhenti
                    ? this.detail_lastmile.tanggal_berhenti
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">PIC Kontrak</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_lastmile.user_pic
                    ? this.detail_lastmile.user_pic.nama_lengkap
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Jenis Kontrak</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_lastmile.jenis_kontrak
                    ? this.detail_lastmile.jenis_kontrak.nama_jenis_kontrak
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Status Kontrak</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_lastmile.status_kontrak
                    ? this.detail_lastmile.status_kontrak
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Keterangan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_lastmile.keterangan
                    ? this.detail_lastmile.keterangan
                    : "-"
                }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-7">
        <tab-component :tabs="tabs">
          <template #KontrakLastmileJarak>
            <KontrakLastmileJarak :self="{ detail_lastmile }" />
          </template>
          <template #KontrakLastmileRitase>
            <KontrakLastmileRitase :self="{ detail_lastmile }" />
          </template>
          <template #KontrakLastmileBerat>
            <KontrakLastmileBerat :self="{ detail_lastmile }" />
          </template>
          <template #KontrakLastmileAtcost>
            <KontrakLastmileAtcost :self="{ detail_lastmile }" />
          </template>
        </tab-component>
      </div>
    </div>
  </section>
</template>

<script>
import KontrakLastmileAtcost from "./KontrakLastmileAtcost.vue";
import KontrakLastmileBerat from "./KontrakLastmileBerat.vue";
import KontrakLastmileJarak from "./KontrakLastmileJarak.vue";
import KontrakLastmileRitase from "./KontrakLastmileRitase.vue";
export default {
  props: ["self"],

  components: {
    KontrakLastmileAtcost,
    KontrakLastmileBerat,
    KontrakLastmileJarak,
    KontrakLastmileRitase,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        { name: "Kontrak Lastmile Jarak", slotName: "KontrakLastmileJarak" },
        { name: "Kontrak Lastmile Ritase", slotName: "KontrakLastmileRitase" },
        { name: "Kontrak Lastmile Berat", slotName: "KontrakLastmileBerat" },
        { name: "Kontrak Lastmile Atcost", slotName: "KontrakLastmileAtcost" },
      ],

      id,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      detail_lastmile: {
        no_referensi: "",
        pelanggan_id: "",
        tanggal_kontrak: "",
        tanggal_berlaku: "",
        tanggal_berhenti: "",
        keterangan: "",
        status_kontrak: "",
        user_id_pic: "",
        jenis_kontrak_id: "",
        kontrak_lastmile_jarak_pelanggan_details: [],
        kontrak_lastmile_ritase_pelanggan_details: [],
        kontrak_lastmile_berat_pelanggan_details: [],
        kontrak_lastmile_atcost_pelanggan_details: [],
        pelanggan: {},
        user_pic: {},
        jenis_kontrak: {},
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`finance/kontrak-lastmile/${this.id}`);
      Object.keys(this.detail_lastmile).forEach((item) => {
        if (
          item !== "kontrak_lastmile_jarak_pelanggan_details" &&
          item !== "kontrak_lastmile_ritase_pelanggan_details" &&
          item !== "kontrak_lastmile_berat_pelanggan_details" &&
          item !== "kontrak_lastmile_atcost_pelanggan_details"
        ) {
          this.detail_lastmile[item] = res.data[item];
        }
      });
      this.detail_lastmile.kontrak_lastmile_jarak_pelanggan_details =
        res.data.kontrak_lastmile_jarak_pelanggan_details;
      this.detail_lastmile.kontrak_lastmile_ritase_pelanggan_details =
        res.data.kontrak_lastmile_ritase_pelanggan_details;
      this.detail_lastmile.kontrak_lastmile_berat_pelanggan_details =
        res.data.kontrak_lastmile_berat_pelanggan_details;
      this.detail_lastmile.kontrak_lastmile_atcost_pelanggan_details =
        res.data.kontrak_lastmile_atcost_pelanggan_details;

      this.isLoadingPage = false;
      console.log("res", res.data.kontrak_lastmile_atcost_pelanggan_details);
    } catch (error) {
      // this.$router.back();
      console.log("error", error);
    }
  },
};
</script>
