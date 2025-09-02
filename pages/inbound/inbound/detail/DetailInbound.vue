<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
      <thead>
        <tr class="uppercase">
          <th class="border border-gray-300 w-48">Item</th>
          <th class="border border-gray-300 w-48">Nomor</th>
          <th class="border border-gray-300 w-48">Quantity</th>
          <th class="border border-gray-300 w-48">Tanggal Expired</th>
          <th class="border border-gray-300 w-48" v-if="self.form.asn">
            Peralatan
          </th>
          <th class="border border-gray-300 w-48" v-if="self.form.asn">
            Lokasi Plan
          </th>
          <th class="border border-gray-300 w-48">Zona</th>
          <th class="border border-gray-300 w-48">Aisle</th>
          <th class="border border-gray-300 w-48">Rack</th>
          <th class="border border-gray-300 w-48">Level</th>
          <th class="border border-gray-300 w-48">Bin</th>
          <th class="border border-gray-300 w-48">Keterangan</th>
          <th class="border border-gray-300 w-48" v-if="self.form.asn">
            Alasan Beda Plan
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in this.self.form.inbound_details"
          :key="i"
          class="align-top"
        >
          <td class="border border-gray-300">
            {{ item.item_gudang ? item.item_gudang.nama_item : "" }}
          </td>
          <td class="border border-gray-300">
            <div>
              <h3>Serial Number</h3>
              <p class="text-right my-2">
                {{ item.serial_number ? item.serial_number : "-" }}
              </p>
            </div>
            <div>
              <h3>Jenis Biaya</h3>
              <p class="text-right my-2">
                {{ item.jenis_biaya ? item.jenis_biaya.nama_jenis_biaya : "-" }}
              </p>
            </div>
          </td>
          <td class="border border-gray-300">
            <div>
              <h3>Quantity Request</h3>
              <p class="text-right my-2">
                {{ item.quantity ? item.quantity : "-" }}
              </p>
            </div>
            <div>
              <h3>Quantity Terima</h3>
              <p class="text-right my-2">
                {{ item.quantity_terima ? item.quantity_terima : "-" }}
              </p>
            </div>
            <div>
              <h3>Valuation</h3>
              <p class="text-right my-2">
                {{ item.valuation ? item.valuation.nama_valuation : "-" }}
              </p>
            </div>
            <div>
              <h3>Status Terima</h3>
              <p class="text-right my-2">
                Diterima {{ item.status_terima ? item.status_terima : "-" }}
              </p>
            </div>
          </td>
          <td class="border border-gray-300">
            {{ formatDate(item.tanggal_expired ?? "-") }}
          </td>
          <td class="border border-gray-300" v-if="self.form.asn">
            {{ item.peralatan ? item.peralatan.nama_peralatan : "-" }}
          </td>
          <td class="border border-gray-300" v-if="self.form.asn">
            <div>
              <h3>Zona Gudang Plan</h3>
              <p class="text-right my-2">
                {{
                  item.asn_detail.zona_gudang_plan
                    ? item.asn_detail.zona_gudang_plan.nama_zona_gudang
                    : "-"
                }}
              </p>
            </div>
            <div>
              <h3>Ailse Plan</h3>
              <p class="text-right my-2">
                {{
                  item.asn_detail.slot_penyimpanan_aisle_plan
                    ? item.asn_detail.slot_penyimpanan_aisle_plan
                        .nama_slot_penyimpanan
                    : "-"
                }}
              </p>
            </div>
            <div>
              <h3>Rack Plan</h3>
              <p class="text-right my-2">
                {{
                  item.asn_detail.slot_penyimpanan_rack_plan
                    ? item.asn_detail.slot_penyimpanan_rack_plan
                        .nama_slot_penyimpanan
                    : "-"
                }}
              </p>
            </div>
            <div>
              <h3>Level Plan</h3>
              <p class="text-right my-2">
                {{
                  item.asn_detail.slot_penyimpanan_level_plan
                    ? item.asn_detail.slot_penyimpanan_level_plan
                        .nama_slot_penyimpanan
                    : "-"
                }}
              </p>
            </div>
            <div>
              <h3>Bin Plan</h3>
              <p class="text-right my-2">
                {{
                  item.asn_detail.slot_penyimpanan_bin_plan
                    ? item.asn_detail.slot_penyimpanan_bin_plan
                        .nama_slot_penyimpanan
                    : "-"
                }}
              </p>
            </div>
          </td>
          <td class="border border-gray-300">
            {{ item.zona_gudang ? item.zona_gudang.nama_zona_gudang : "-" }}
          </td>
          <td class="border border-gray-300">
            {{
              item.slot_penyimpanan_aisle
                ? item.slot_penyimpanan_aisle.nama_slot_penyimpanan
                : "-"
            }}
          </td>
          <td class="border border-gray-300">
            {{
              item.slot_penyimpanan_rack
                ? item.slot_penyimpanan_rack.nama_slot_penyimpanan
                : "-"
            }}
          </td>
          <td class="border border-gray-300">
            {{
              item.slot_penyimpanan_level
                ? item.slot_penyimpanan_level.nama_slot_penyimpanan
                : "-"
            }}
          </td>
          <td class="border border-gray-300">
            {{
              item.slot_penyimpanan_bin
                ? item.slot_penyimpanan_bin.nama_slot_penyimpanan
                : "-"
            }}
          </td>
          <td class="border border-gray-300">
            {{ item.keterangan ? item.keterangan : "-" }}
          </td>
          <td class="border border-gray-300">
            {{
              item.alasan_beda_plan
                ? item.alasan_beda_plan.nama_alasan_beda_plan
                : "-"
            }}
          </td>
        </tr>
        <tr v-if="!self.form.inbound_details.length > 0">
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
</template>

<script>
export default {
  props: ["self"],

  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    },
  },
};
</script>
