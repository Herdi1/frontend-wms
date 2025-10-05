<template>
  <div>
    <div class="w-full mb-7">
      <!-- <div
        class="flex w-full justify-between items-end p-2 border border-gray-300 rounded-md"
      > -->
      <div
        class="flex flex-col w-full justify-between p-2 border bg-white dark:bg-slate-800 border-gray-300 rounded-md"
      >
        <div class="grid grid-flow-col grid-rows-5 md:grid-rows-3 gap-2">
          <div class="flex">
            <label class="w-1/2" for="group_item_id_1"
              >Group Item Level 1</label
            >
            <v-select
              label="nama_group_item"
              :loading="isLoadingGetGroupItem1"
              :options="lookup_sellings.data"
              :filterable="false"
              @search="onGetGroupItem1"
              v-model="filter_params.group_item_id_1"
              :reduce="(item) => item.group_item_id"
              class="w-1/2 bg-white"
              @input="onSelectGroupItem1"
            >
              <!-- <template #search="{ attributes, events }">
                <input
                  class="w-full outline-none active:outline-none"
                  v-bind="attributes"
                  v-on="events"
                />
              </template> -->
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_sellings.data.length || search"
              >
                <span
                  v-if="lookup_sellings.current_page > 1"
                  @click="onGetGroupItem1(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="
                    lookup_sellings.last_page > lookup_sellings.current_page
                  "
                  @click="onGetGroupItem1(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>

          <div class="flex">
            <label class="w-1/2" for="group_item_id_2"
              >Group Item Level 2</label
            >
            <v-select
              label="nama_group_item"
              :loading="isLoadingGetGroupItem2"
              :options="lookup_roles.data"
              :filterable="false"
              @search="onGetGroupItem2"
              v-model="filter_params.group_item_id_2"
              :reduce="(item) => item.group_item_id"
              class="w-1/2 bg-white"
              @input="onSelectGroupItem2"
            >
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_roles.data.length || search"
              >
                <span
                  v-if="lookup_roles.current_page > 1"
                  @click="onGetGroupItem2(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="lookup_roles.last_page > lookup_roles.current_page"
                  @click="onGetGroupItem2(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>

          <div class="flex">
            <label class="w-1/2" for="group_item_id_3"
              >Group Item Level 3</label
            >
            <v-select
              label="nama_group_item"
              :loading="isLoadingGetGroupItem3"
              :options="lookup_sellers.data"
              :filterable="false"
              @search="onGetGroupItem3"
              v-model="filter_params.group_item_id_3"
              :reduce="(item) => item.group_item_id"
              class="w-1/2 bg-white"
              @input="onSelectGroupItem3"
            >
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_sellers.data.length || search"
              >
                <span
                  v-if="lookup_sellers.current_page > 1"
                  @click="onGetGroupItem3(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="lookup_sellers.last_page > lookup_sellers.current_page"
                  @click="onGetGroupItem3(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>

          <div class="flex">
            <label class="w-1/2" for="group_item_id_4"
              >Group Item Level 4</label
            >
            <v-select
              label="nama_group_item"
              :loading="isLoadingGetGroupItem4"
              :options="lookup_quotations.data"
              :filterable="false"
              @search="onGetGroupItem4"
              v-model="filter_params.group_item_id_4"
              :reduce="(item) => item.group_item_id"
              class="w-1/2 bg-white"
              @input="onSelectGroupItem4"
            >
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_quotations.data.length || search"
              >
                <span
                  v-if="lookup_quotations.current_page > 1"
                  @click="onGetGroupItem4(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="
                    lookup_quotations.last_page > lookup_quotations.current_page
                  "
                  @click="onGetGroupItem4(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>

          <div class="flex">
            <label class="w-1/2" for="group_item_id_5"
              >Group Item Level 5</label
            >
            <v-select
              label="nama_group_item"
              :loading="isLoadingGetGroupItem5"
              :options="lookup_customers.data"
              :filterable="false"
              @search="onGetGroupItem5"
              v-model="filter_params.group_item_id_5"
              :reduce="(item) => item.group_item_id"
              class="w-1/2 bg-white"
            >
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_customers.data.length || search"
              >
                <span
                  v-if="lookup_customers.current_page > 1"
                  @click="onGetGroupItem5(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="
                    lookup_customers.last_page > lookup_customers.current_page
                  "
                  @click="onGetGroupItem5(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>
        </div>
        <div class="flex gap-3 mt-5">
          <button
            type="button"
            @click="onLoad"
            class="bg-blue-500 flex gap-1 justify-center items-center hover:bg-blue-600 p-2 text-white rounded-md mb-3 text-center"
          >
            <i class="fa fa-plus text-white font-bold mr-2"></i>
            <p>Tambah</p>
            <!-- Tambah ke Item Gudang -->
          </button>
          <button
            type="button"
            @click="deleteSelectedItem"
            class="flex gap-1 justify-center items-center bg-red-500 hover:bg-red-600 p-2 text-white rounded-md mb-3 text-center"
          >
            <i class="fa fa-trash text-white font-bold mr-2"></i>
            <p>Hapus</p>
            <!-- Tambah ke Item Gudang -->
          </button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table
        class="mb-5 table-fixed border border-collapse border-gray-300"
        ref="formContainer"
      >
        <thead>
          <tr class="text-base uppercase text-nowrap">
            <th class="w-[50px] text-center border border-gray-300">
              <input
                type="checkbox"
                name=""
                v-model="selectAll"
                @change="toggleAllCheckboxes"
              />
            </th>
            <th
              @click="
                onSort(
                  'kode_wms',
                  parameters.params.sort == 'asc' ? 'desc' : 'asc'
                )
              "
              class="w-[200px] border border-gray-300"
            >
              <div class="flex justify-between items-baseline">
                <div>Kode Item</div>
                <div>
                  <i
                    class="fas fa-caret-up"
                    :class="
                      parameters.params.order == 'kode_wms' &&
                      parameters.params.sort == 'asc'
                        ? ''
                        : 'light-gray'
                    "
                  ></i>
                  <i
                    class="fas fa-caret-down"
                    :class="
                      parameters.params.order == 'kode_wms' &&
                      parameters.params.sort == 'desc'
                        ? ''
                        : 'light-gray'
                    "
                  ></i>
                </div>
              </div>
            </th>
            <th
              @click="
                onSort(
                  'nama_item',
                  parameters.params.sort == 'asc' ? 'desc' : 'asc'
                )
              "
              class="w-[200px] border border-gray-300"
            >
              <div class="flex justify-between items-baseline">
                <div>Nama Item</div>
                <div>
                  <i
                    class="fas fa-caret-up"
                    :class="
                      parameters.params.order == 'nama_item' &&
                      parameters.params.sort == 'asc'
                        ? ''
                        : 'light-gray'
                    "
                  ></i>
                  <i
                    class="fas fa-caret-down"
                    :class="
                      parameters.params.order == 'nama_item' &&
                      parameters.params.sort == 'desc'
                        ? ''
                        : 'light-gray'
                    "
                  ></i>
                </div>
              </div>
            </th>
            <!-- <th
              @click="
                onSort(
                  'satuan_id',
                  parameters.params.sort == 'asc' ? 'desc' : 'asc'
                )
              "
              class="cursor-pinter"
            >
              <div class="flex justify-between items-baseline">
                <div>Satuan</div>
                <div>
                  <i
                    class="fas fa-caret-up"
                    :class="
                      parameters.params.order == 'satuan_id' &&
                      parameters.params.sort == 'asc'
                        ? ''
                        : 'light-gray'
                    "
                  ></i>
                  <i
                    class="fas fa-caret-down"
                    :class="
                      parameters.params.order == 'satuan_id' &&
                      parameters.params.sort == 'desc'
                        ? ''
                        : 'light-gray'
                    "
                  ></i>
                </div>
              </div>
            </th> -->
            <!-- <th>Berat</th>
            <th>Volume</th>
            <th>Stocklevel</th> -->
            <th class="w-[200px] border border-gray-300">Group Item</th>
            <!-- <th>Group Item 2</th>
            <th>Group Item 3</th>
            <th>Group Item 4</th>
            <th>Group Item 5</th> -->
            <th class="w-[200px] border border-gray-300">Batas Item</th>
            <th class="w-[200px] border border-gray-300">Kategori Item</th>
            <!-- <th>Kategori Item 2</th>
            <th>Kategori Item 3</th>
            <th>Kategori Item 4</th>
            <th>Kategori Item 5</th> -->
            <th class="w-[200px] border border-gray-300">Jumlah Palet</th>
            <th class="w-[200px] border border-gray-300">Kebutuhan Palet</th>
            <th class="w-[200px] border border-gray-300">Kapasitas Palet</th>
            <th class="w-[200px] border border-gray-300">Maksimal Tumpukan</th>
            <th class="w-[200px] border border-gray-300">Supplier</th>
            <th class="w-[200px] border border-gray-300">Vendor</th>
            <th class="w-[200px] border border-gray-300">Berat</th>
            <th class="w-[200px] border border-gray-300">Dimensi</th>
            <!-- <th class="w-[200px] border border-gray-300">Biaya</th> -->
            <th class="w-[75px] border border-gray-300">Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in this.paginatedItemGudang"
            :key="i"
            class="align-top"
          >
            <td class="border border-gray-300 text-center">
              <input
                type="checkbox"
                name="item"
                :value="item.item_id"
                v-model="checkboxs"
                @change="checkIfAllSelected"
                id=""
              />
            </td>
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
              <ValidationProvider name="vendor_id" class="w-full">
                <div slot-scope="{ errors, valid }">
                  <v-select
                    label="nama_vendor"
                    :loading="isLoadingGetVendorPemilik"
                    :options="lookup_chart_of_accounts.data"
                    :filterable="false"
                    @search="onGetVendorPemilik"
                    v-model="item.vendor_id"
                    @input="(item) => onSelectVendor(item, i)"
                    class="w-full"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                    >
                      <span
                        v-if="lookup_chart_of_accounts.current_page > 1"
                        @click="onGetVendorPemilik(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_chart_of_accounts.last_page >
                          lookup_chart_of_accounts.current_page
                        "
                        @click="onGetVendorPemilik(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
            </td>
            <td class="border border-gray-300">
              <div>
                <div class="form-group">
                  <label for="berat_bersih">Berat Bersih</label>
                  <money
                    v-model="item.berat_bersih"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group">
                  <label for="berat_kotor">Berat Kotor</label>
                  <money
                    v-model="item.berat_kotor"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
              </div>
            </td>
            <td class="border border-gray-300">
              <div>
                <div class="form-group">
                  <label for="panjang">Panjang</label>
                  <money
                    v-model="item.panjang"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group">
                  <label for="lebar">Lebar</label>
                  <money
                    v-model="item.lebar"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group">
                  <label for="tebal">Tebal</label>
                  <money
                    v-model="item.tebal"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group">
                  <label for="volume">Volume</label>
                  <money
                    v-model="item.volume"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group">
                  <input-form
                    label="Warna"
                    type="text"
                    name="warna"
                    v-model="item.warna"
                    :required="false"
                  />
                  <!-- <label for="warna">Warna</label>
                  <money
                    v-model="item.warna"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  /> -->
                </div>
              </div>
            </td>
            <!-- <td class="border border-gray-300">
              <div>
                <div class="form-group">
                  <label for="biaya_gaji_sopir">Biaya Gaji Sopir</label>
                  <money
                    v-model="item.biaya_gaji_sopir"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group">
                  <label for="biaya_bongkartoko">Biaya Bongkar Toko</label>
                  <money
                    v-model="item.biaya_bongkartoko"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group">
                  <label for="biaya_bongkar">Biaya Bongkar </label>
                  <money
                    v-model="item.biaya_bongkar"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group">
                  <label for="biaya_muat">Biaya Muat</label>
                  <money
                    v-model="item.biaya_muat"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group">
                  <label for="biaya_pok">Biaya Pok</label>
                  <money
                    v-model="item.biaya_pok"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
              </div>
            </td> -->
            <td class="border border-gray-300 text-center">
              <small-detail-button @click="onDetail(item)" />
            </td>
          </tr>
          <!-- <tr v-for="(item, i) in data" :key="i">
            <td class="text-center">
              <input
                type="checkbox"
                name="checkboxs[]"
                :value="item"
                v-model="checkboxs"
                id=""
              />
            </td>
            <td>
              {{
                (parameters.params.page - 1) * parameters.params.per_page +
                i +
                1
              }}
            </td>
            <td>{{ item.kode_wms }}</td>
            <td>{{ item.nama_item }}</td>
            <td>
              {{ item.satuan ? item.satuan.nama_satuan : "Tidak Ditemukan" }}
            </td>
            <td>
              {{ item.berat + " " + item.satuan_berat.nama_satuan }}
            </td>
            <td>
              {{ item.volume + " " + item.satuan_volume.nama_satuan }}
            </td>
            <td>
              {{
                item.value_stocklevel + " " + item.satuan_stocklevel.nama_satuan
              }}
            </td>
            <td>
              {{
                item.group_item_1
                  ? item.group_item_1.nama_group_item
                  : "Tidak Ditemukan"
              }}
            </td>
            <td>
              {{
                item.group_item_2
                  ? item.group_item_2.nama_group_item
                  : "Tidak Ditemukan"
              }}
            </td>
            <td>
              {{
                item.group_item_3
                  ? item.group_item_3.nama_group_item
                  : "Tidak Ditemukan"
              }}
            </td>
            <td>
              {{
                item.group_item_4
                  ? item.group_item_4.nama_group_item
                  : "Tidak Ditemukan"
              }}
            </td>
            <td>
              {{
                item.group_item_5
                  ? item.group_item_5.nama_group_item
                  : "Tidak Ditemukan"
              }}
            </td>
            <td>{{ item.batas_atas }}</td>
            <td>{{ item.batas_bawah }}</td>
            <td>
              {{
                item.kategori_1
                  ? item.kategori_1.nama_kategori
                  : "Tidak Ditemukan"
              }}
            </td>
            <td>
              {{
                item.kategori_2
                  ? item.kategori_2.nama_kategori
                  : "Tidak Ditemukan"
              }}
            </td>
            <td>
              {{
                item.kategori_3
                  ? item.kategori_3.nama_kategori
                  : "Tidak Ditemukan"
              }}
            </td>
            <td>
              {{
                item.kategori_4
                  ? item.kategori_4.nama_kategori
                  : "Tidak Ditemukan"
              }}
            </td>
            <td>
              {{
                item.kategori_5
                  ? item.kategori_5.nama_kategori
                  : "Tidak Ditemukan"
              }}
            </td>
            <td>{{ item.jumlah_palet }}</td>
            <td>{{ item.kapasitas_palet }}</td>
            <td>{{ item.kebutuhan_palet }}</td>
            <td>{{ item.maksimal_tumpukan }}</td>
            <td>
              {{
                item.supplier ? item.supplier.nama_supplier : "Tidak Ditemukan"
              }}
            </td>
            <td class="text-center">
              <small-detail-button @click="onDetail(item)" />
            </td>
          </tr> -->
        </tbody>
        <!-- <table-data-loading-section :self="{ data: data }" /> -->

        <!-- <table-data-not-found-section :self="{ data: data }" /> -->
      </table>
    </div>

    <div class="flex gap-2 mx-3 mt-2 mb-4">
      <button
        type="button"
        @click="prevPage"
        class="bg-gray-300 p-2 rounded-sm"
        :disabled="item_gudang_current_page == 1"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="p-2">{{ item_gudang_current_page }}</div>
      <button
        type="button"
        @click="nextPage"
        class="bg-gray-300 p-2 rounded-sm"
        :disabled="item_gudang_current_page == totalPages"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  props: ["self"],

  created() {
    this.set_data([]);
    // this.onLoad();
  },

  data() {
    return {
      //list item gudang
      isLoadingData: false,
      isPaginate: true,
      itemData: [],
      parameters: {
        url: "master/item",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "item_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          group_item_id_1: "",
          group_item_id_2: "",
          group_item_id_3: "",
          group_item_id_4: "",
          group_item_id_5: "",
        },
      },

      filter_params: {
        group_item_id_1: "",
        group_item_id_2: "",
        group_item_id_3: "",
        group_item_id_4: "",
        group_item_id_5: "",
      },

      item_gudang_current_page: 1,
      item_gudang_per_page: 10,

      isStopSearchGroupItem1: false,
      isLoadingGetGroupItem1: false,
      group_item_1_search: "",

      isStopSearchGroupItem2: false,
      isLoadingGetGroupItem2: false,
      group_item_2_search: "",

      isStopSearchGroupItem3: false,
      isLoadingGetGroupItem3: false,
      group_item_3_search: "",

      isStopSearchGroupItem4: false,
      isLoadingGetGroupItem4: false,
      group_item_4_search: "",

      isStopSearchGroupItem5: false,
      isLoadingGetGroupItem5: false,
      group_item_5_search: "",

      isStopSearchVendorPemilik: false,
      isLoadingGetVendorPemilik: false,
      vendor_pemilik_search: "",

      //checkbox
      selectAll: false,
      checkboxs: [],
    };
  },

  async mounted() {
    await this.onSearchGroupItem1();
    // await this.onSearchGroupItem2();
    // await this.onSearchGroupItem3();
    // await this.onSearchGroupItem4();
    // await this.onSearchGroupItem5();
    await this.onSearchVendorPemilik();
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_sellings",
      "lookup_roles",
      "lookup_sellers",
      "lookup_quotations",
      "lookup_customers",
      "lookup_users",
      "lookup_chart_of_accounts",
    ]),

    totalPages() {
      return Math.ceil(
        this.self.form.item_gudang.length / this.item_gudang_per_page
      );
    },
    paginatedItemGudang() {
      const start =
        (this.item_gudang_current_page - 1) * this.item_gudang_per_page;
      return this.self.form.item_gudang.slice(
        start,
        start + this.item_gudang_per_page
      );
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp", "getData"]),
    ...mapMutations("moduleApi", ["set_data"]),

    nextPage() {
      if (this.item_gudang_current_page < this.item_gudang_per_page)
        this.item_gudang_current_page++;
      console.log(this.item_gudang_current_page);
    },
    prevPage() {
      if (this.item_gudang_current_page > 1) this.item_gudang_current_page--;
    },

    onGetGroupItem1(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem1);

      this.isStopSearchGroupItem1 = setTimeout(() => {
        this.group_item_1_search = search;

        if (typeof isNext !== "function") {
          this.lookup_sellings.current_page = isNext
            ? this.lookup_sellings.current_page + 1
            : this.lookup_sellings.current_page - 1;
        } else {
          this.lookup_sellings.current_page = 1;
        }

        this.onSearchGroupItem1();
      }, 600);
    },

    async onSearchGroupItem1() {
      if (!this.isLoadingGetGroupItem1) {
        this.isLoadingGetGroupItem1 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "sellings",
          query:
            "?search=" +
            this.group_item_1_search +
            "&status=1" +
            "&page=" +
            this.lookup_sellings.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem1 = false;
      }
    },

    onGetGroupItem2(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem2);

      this.isStopSearchGroupItem2 = setTimeout(() => {
        this.group_item_2_search = search;

        if (typeof isNext !== "function") {
          this.lookup_roles.current_page = isNext
            ? this.lookup_roles.current_page + 1
            : this.lookup_roles.current_page - 1;
        } else {
          this.lookup_roles.current_page = 1;
        }

        this.onSearchGroupItem2();
      }, 600);
    },

    async onSearchGroupItem2() {
      this.lookup_roles = {};
      if (!this.isLoadingGetGroupItem2) {
        this.isLoadingGetGroupItem2 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "roles",
          query:
            "?search=" +
            this.group_item_2_search +
            "&status=2" +
            "&group_item_id_induk=" +
            this.filter_params.group_item_id_1 +
            "&page=" +
            this.lookup_roles.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem2 = false;
      }
    },

    onGetGroupItem3(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem3);

      this.isStopSearchGroupItem3 = setTimeout(() => {
        this.group_item_3_search = search;

        if (typeof isNext !== "function") {
          this.lookup_sellers.current_page = isNext
            ? this.lookup_sellers.current_page + 1
            : this.lookup_sellers.current_page - 1;
        } else {
          this.lookup_sellers.current_page = 1;
        }

        this.onSearchGroupItem3();
      }, 600);
    },

    async onSearchGroupItem3() {
      if (!this.isLoadingGetGroupItem3) {
        this.isLoadingGetGroupItem3 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "sellers",
          query:
            "?search=" +
            this.group_item_3_search +
            "&status=3" +
            "&group_item_id_induk=" +
            this.filter_params.group_item_id_2 +
            "&page=" +
            this.lookup_sellers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem3 = false;
      }
    },

    onGetGroupItem4(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem4);

      this.isStopSearchGroupItem4 = setTimeout(() => {
        this.group_item_4_search = search;

        if (typeof isNext !== "function") {
          this.lookup_quotations.current_page = isNext
            ? this.lookup_quotations.current_page + 1
            : this.lookup_quotations.current_page - 1;
        } else {
          this.lookup_quotations.current_page = 1;
        }

        this.onSearchGroupItem4();
      }, 600);
    },

    async onSearchGroupItem4() {
      if (!this.isLoadingGetGroupItem4) {
        this.isLoadingGetGroupItem4 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "quotations",
          query:
            "?search=" +
            this.group_item_4_search +
            "&status=4" +
            "&group_item_id_induk=" +
            this.filter_params.group_item_id_3 +
            "&page=" +
            this.lookup_quotations.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem4 = false;
      }
    },

    onGetGroupItem5(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem5);

      this.isStopSearchGroupItem5 = setTimeout(() => {
        this.group_item_5_search = search;

        if (typeof isNext !== "function") {
          this.lookup_customers.current_page = isNext
            ? this.lookup_customers.current_page + 1
            : this.lookup_customers.current_page - 1;
        } else {
          this.lookup_customers.current_page = 1;
        }

        this.onSearchGroupItem5();
      }, 600);
    },

    async onSearchGroupItem5() {
      if (!this.isLoadingGetGroupItem5) {
        this.isLoadingGetGroupItem5 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "customers",
          query:
            "?search=" +
            this.group_item_5_search +
            "&status=5" +
            "&group_item_id_induk=" +
            this.filter_params.group_item_id_4 +
            "&page=" +
            this.lookup_customers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem5 = false;
      }
    },

    onGetVendorPemilik(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendorPemilik);

      this.isStopSearchVendorPemilik = setTimeout(() => {
        this.vendor_pemilik_search = search;

        if (typeof isNext !== "function") {
          this.lookup_chart_of_accounts.current_page = isNext
            ? this.lookup_chart_of_accounts.current_page + 1
            : this.lookup_chart_of_accounts.current_page - 1;
        } else {
          this.lookup_chart_of_accounts.current_page = 1;
        }

        this.onSearchVendorPemilik();
      }, 600);
    },

    async onSearchVendorPemilik() {
      if (!this.isLoadingGetVendorPemilik) {
        this.isLoadingGetVendorPemilik = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "chart_of_accounts",
          query:
            "?search=" +
            this.vendor_pemilik_search +
            // "&tipe_vendor=v" +
            "&page=" +
            this.lookup_chart_of_accounts.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendorPemilik = false;
      }
    },

    onSelectVendor(item, index) {
      if (item) {
        this.self.form.item_gudang[index].vendor_id = item;
      } else {
        this.self.form.item_gudang[index].vendor_id = "";
      }
    },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = page;

      // this.checkboxs = [];
      if (document.getElementById("checkAll")) {
        document.getElementById("checkAll").checked = false;
      }

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      this.parameters.params.group_item_id_1 =
        this.filter_params.group_item_id_1;
      this.parameters.params.group_item_id_2 =
        this.filter_params.group_item_id_2;
      this.parameters.params.group_item_id_3 =
        this.filter_params.group_item_id_3;
      this.parameters.params.group_item_id_4 =
        this.filter_params.group_item_id_4;
      this.parameters.params.group_item_id_5 =
        this.filter_params.group_item_id_5;

      if (this.parameters.params.group_item_id_1) {
        // this.$globalErrorToaster(
        //   this.$toaster,
        //   "Pilih Group Item Terlebih Dahulu"
        // );
        await this.getData(this.parameters);
      }
      if (this.data) {
        this.data.forEach((item) => {
          if (this.self.isEditable) {
            let index = this.self.form.item_gudang.findIndex(
              (data) => data.item_id === item.item_id
            );
            if (index !== -1) {
              this.self.form.item_gudang.splice(index, 1, item);
            }
          } else {
            if (
              !this.self.form.item_gudang.find(
                (data) => data.item_id === item.item_id
              )
            ) {
              this.self.form.item_gudang.push(item);
            }
          }
        });
      }

      if (this.result == true) {
        loader.hide();

        if (page == 1) {
          // this.$refs["pagination"].generatePage();
        }

        // this.$refs["pagination"].active_page = this.parameters.params.page;
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingData = false;
    },

    deleteSelectedItem() {
      this.checkboxs.forEach((item) => {
        let index = this.self.form.item_gudang.findIndex(
          (data) => data.item_id == item
        );
        if (index !== -1) {
          this.self.form.item_gudang.splice(index, 1);
        }
      });
    },

    inserCheckbox() {
      if (!this.form.item_gudang?.length) {
        this.form.item_gudang = [];
      }
      this.checkboxs.forEach((item) => {
        this.form.item_gudang.push(item);
      });
      console.log(this.form.item_gudang);
    },

    toggleAllCheckboxes() {
      if (this.selectAll) {
        this.checkboxs = this.self.form.item_gudang.map((item) => item.item_id);
      } else {
        this.checkboxs = [];
      }
    },

    checkIfAllSelected() {
      this.selectAll =
        this.checkboxs.length === this.self.form.item_gudang.length;
    },

    //dropdown
    async onSelectGroupItem1() {
      console.log(this.filter_params);
      await this.onSearchGroupItem2();
      this.filter_params.group_item_id_2 = "";
    },
    async onSelectGroupItem2() {
      await this.onSearchGroupItem3();
      this.filter_params.group_item_id_3 = "";
    },
    async onSelectGroupItem3() {
      await this.onSearchGroupItem4();
      this.filter_params.group_item_id_4 = "";
    },
    async onSelectGroupItem4() {
      await this.onSearchGroupItem5();
      this.filter_params.group_item_id_5 = "";
    },
  },
};
</script>
