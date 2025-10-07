<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Relokasi Stok</h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <div class="w-full">
        <div
          class="mb-3 p-4 w-full space-y-2 bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <div class="flex w-full items-center">
            <label class="w-[40%] font-bold">Kode Mutasi Stok</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{
                this.form.kode_mutasi_stok ? this.form.kode_mutasi_stok : "-"
              }}
            </div>
          </div>
          <div class="flex w-full items-center">
            <label class="w-[40%] font-bold">Tanggal</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{ this.form.tanggal ? this.form.tanggal : "-" }}
            </div>
          </div>
          <div class="flex w-full items-center">
            <label class="w-[40%] font-bold">Gudang</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{ this.form.gudang_id ? this.form.gudang_id.nama_gudang : "-" }}
            </div>
          </div>
          <div class="flex w-full items-center">
            <label class="w-[40%] font-bold">Keterangan</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{ this.form.keterangan ? this.form.keterangan : "-" }}
            </div>
          </div>
        </div>

        <div
          class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <h1 class="text-xl font-bold uppercase">Detail Mutasi Stok</h1>
          <div class="table-responsive overflow-y-hidden mb-7">
            <table
              class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
            >
              <thead>
                <tr class="text-sm uppercase">
                  <th class="w-[200px] border border-gray-300">Item Gudang</th>
                  <th class="w-[200px] border border-gray-300">
                    Lokasi Penyimpanan Asal
                  </th>
                  <th class="w-[200px] border border-gray-300">Zona Tujuan</th>
                  <th class="w-[200px] border border-gray-300">
                    Lokasi Penyimpanan Tujuan
                  </th>

                  <th class="w-[200px] border border-gray-300">Quantity</th>
                  <th class="w-[200px] border border-gray-300">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="align-top"
                  v-for="(item, index) in this.form.mutasi_stok_details"
                  :key="index"
                >
                  <td class="w-[200px] border border-gray-300">
                    {{ item.item_gudang?.kode_item ?? "-" }} -
                    {{ item.item_gudang?.nama_item ?? "-" }}
                  </td>
                  <td class="w-[200px] border border-gray-300">
                    {{ item.zona_gudang_asal?.nama_zona_gudang ?? "-" }}
                  </td>
                  <td class="w-[200px] border border-gray-300">
                    {{ item.zona_gudang?.nama_zona_gudang ?? "-" }}
                  </td>
                  <td class="w-[200px] border border-gray-300">
                    <div>
                      <p>Aisle</p>
                      <p class="text-right">
                        {{
                          item.slot_penyimpanan_aisle?.nama_slot_penyimpanan ??
                          "-"
                        }}
                      </p>
                    </div>
                    <div>
                      <p>Rack</p>
                      <p class="text-right">
                        {{
                          item.slot_penyimpanan_rack?.nama_slot_penyimpanan ??
                          "-"
                        }}
                      </p>
                    </div>
                    <div>
                      <p>Level</p>
                      <p class="text-right">
                        {{
                          item.slot_penyimpanan_level?.nama_slot_penyimpanan ??
                          "-"
                        }}
                      </p>
                    </div>
                    <div>
                      <p>Bin</p>
                      <p class="text-right">
                        {{
                          item.slot_penyimpanan_bin?.nama_slot_penyimpanan ??
                          "-"
                        }}
                      </p>
                    </div>
                  </td>
                  <td class="w-[200px] border border-gray-300">
                    <div>
                      <p>Valuation</p>
                      <p class="text-right">
                        {{ item.valuation?.nama_valuation ?? "-" }}
                      </p>
                    </div>
                    <div>
                      <p>Saldo Stok</p>
                      <p class="text-right">
                        {{ item.quantity_asal | formatPrice }}
                      </p>
                    </div>
                    <div>
                      <p>Quantity Tujuan</p>
                      <p class="text-right">
                        {{ item.quantity_tujuan | formatPrice }}
                      </p>
                    </div>
                    <div>
                      <p>Quantity Mutasi</p>
                      <p class="text-right">
                        {{ item.quantity_mutasi | formatPrice }}
                      </p>
                    </div>
                  </td>
                  <td class="w-[200px] border border-gray-300">
                    {{ item.keterangan ?? "-" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      form: {
        kode_mutasi_stok: "",
        gudang_id: "",
        no_transaksi: "",
        tanggal: "",
        mutasi_stok_details: [],
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`inventory/mutasi-stok/${this.id}`);
      Object.keys(this.form).forEach((item) => {
        this.form[item] = res.data[item];
      });
      this.form.gudang_id = res.data.gudang;
      this.form.mutasi_stok_details = res.data.mutasi_stok_details.map(
        (item) => {
          return {
            ...item,
            quantity_asal: item.quantity_asal ?? 0,
            quantity_tujuan: item.quantity_tujuan ?? 0,
            quantity_mutasi: item.quantity_mutasi ?? 0,
          };
        }
      );
      this.isLoadingPage = false;
    } catch (error) {
      this.$router.back();
      // console.log(error);
    }
  },
};
</script>
