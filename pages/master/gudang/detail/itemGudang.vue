<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
      <thead>
        <tr class="uppercase">
          <th class="w-52 border border-gray-300">Kode Item</th>
          <th class="w-52 border border-gray-300">Nama Item</th>
          <th class="w-52 border border-gray-300">Group Item</th>
          <th class="w-52 border border-gray-300">Batas Item</th>
          <th class="w-52 border border-gray-300">Kategori Item</th>
          <th class="w-52 border border-gray-300">Jumlah Palet</th>
          <th class="w-52 border border-gray-300">Kebutuhan Palet</th>
          <th class="w-52 border border-gray-300">Kapasitas Palet</th>
          <th class="w-52 border border-gray-300">Maksimal Tumpukan</th>
          <th class="w-52 border border-gray-300">Supplier</th>
          <th class="w-52 border border-gray-300">Vendor</th>
          <th class="w-52 border border-gray-300">Berat</th>
          <th class="w-52 border border-gray-300">Dimensi</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in this.self.detail_item.item_gudang"
          :key="i"
          class="align-top"
        >
          <td class="border border-gray-300">
            {{ item.kode_wms ? item.kode_wms : item.kode_item }}
          </td>
          <td class="border border-gray-300">{{ item.nama_item }}</td>
          <td class="border border-gray-300">
            <div>
              <p v-if="item.group_item_1">
                {{
                  item.group_item_1
                    ? item.group_item_1.nama_group_item
                    : "Tidak Ditemukan"
                }}
              </p>
              <p v-if="item.group_item_2">
                {{
                  item.group_item_2
                    ? item.group_item_2.nama_group_item
                    : "Tidak Ditemukan"
                }}
              </p>
              <p v-if="item.group_item_3">
                {{
                  item.group_item_3
                    ? item.group_item_3.nama_group_item
                    : "Tidak Ditemukan"
                }}
              </p>
              <p v-if="item.group_item_4">
                {{
                  item.group_item_4
                    ? item.group_item_4.nama_group_item
                    : "Tidak Ditemukan"
                }}
              </p>
              <p v-if="item.group_item_5">
                {{
                  item.group_item_5
                    ? item.group_item_5.nama_group_item
                    : "Tidak Ditemukan"
                }}
              </p>
            </div>
          </td>
          <td class="border border-gray-300">
            <div class="flex gap-2">
              <i class="fa fa-caret-up text-green-300"></i>
              <p>{{ item.batas_atas }}</p>
            </div>
            <div class="flex gap-2">
              <i class="fa fa-caret-down text-red-300"></i>
              <p>{{ item.batas_bawah }}</p>
            </div>
          </td>
          <td class="border border-gray-300">
            <div>
              <p v-if="item.kategori_1">
                {{
                  item.kategori_1
                    ? item.kategori_1.nama_kategori
                    : "Tidak Ditemukan"
                }}
              </p>
              <p v-if="item.kategori_2">
                {{
                  item.kategori_2
                    ? item.kategori_2.nama_kategori
                    : "Tidak Ditemukan"
                }}
              </p>
              <p v-if="item.kategori_3">
                {{
                  item.kategori_3
                    ? item.kategori_3.nama_kategori
                    : "Tidak Ditemukan"
                }}
              </p>
              <p v-if="item.kategori_4">
                {{
                  item.kategori_4
                    ? item.kategori_4.nama_kategori
                    : "Tidak Ditemukan"
                }}
              </p>
              <p v-if="item.kategori_5">
                {{
                  item.kategori_5
                    ? item.kategori_5.nama_kategori
                    : "Tidak Ditemukan"
                }}
              </p>
            </div>
          </td>
          <td class="border border-gray-300">{{ item.jumlah_palet }}</td>
          <td class="border border-gray-300">{{ item.kapasitas_palet }}</td>
          <td class="border border-gray-300">{{ item.kebutuhan_palet }}</td>
          <td class="border border-gray-300">{{ item.maksimal_tumpukan }}</td>
          <td class="border border-gray-300">
            {{
              item.supplier ? item.supplier.nama_supplier : "Tidak Ditemukan"
            }}
          </td>
          <td class="border border-gray-300">
            {{ item.vendor ? item.vendor.nama_vendor : "Tidak Ditemukan" }}
          </td>
          <td class="border border-gray-300">
            <div class="flex my-1 items-center justify-between">
              <p>Berat Bersih :</p>
              <span>{{ item.berat_bersih }}</span>
            </div>
            <div class="flex my-1 items-center justify-between">
              <p>Berat Kotor :</p>
              <span>{{ item.berat_kotor }}</span>
            </div>
          </td>
          <td class="border border-gray-300">
            <div class="flex my-1 items-center justify-between">
              <p>Panjang :</p>
              <span>{{ item.panjang }}</span>
            </div>
            <div class="flex my-1 items-center justify-between">
              <p>Lebar :</p>
              <span>{{ item.lebar }}</span>
            </div>
            <div class="flex my-1 items-center justify-between">
              <p>Tebal :</p>
              <span>{{ item.tebal }}</span>
            </div>
            <div class="flex my-1 items-center justify-between">
              <p>Volume :</p>
              <span>{{ item.volume }}</span>
            </div>
            <div class="flex my-1 items-center justify-between">
              <p>Warna :</p>
              <span>{{ item.warna }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["self"],
};
</script>
