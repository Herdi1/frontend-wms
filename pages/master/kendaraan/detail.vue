<template>
  <portal v-if="visible" to="modal-detail">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 w-full max-w-md dark:bg-slate-700 dark:text-gray-100"
      aria-hidden="true"
      id="modal-detail"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="flex justify-between text-xl font-bold mb-3">
            <h5 class="">Detail Data Kendaraan</h5>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hide()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="grid grid-cols-3 gap-3 mb-3">
              <div class="col">
                <div>
                  <label class="font-bold" for="fullname">Nama Kendaraan</label>
                  <div>{{ detail_kendaraan.nama_kendaraan }}</div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Plat Nomor</label>
                  <div>{{ detail_kendaraan.plat_nomor }}</div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">CC Mesin</label>
                  <div>{{ detail_kendaraan.cc }}</div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Nomor Mesin</label>
                  <div>{{ detail_kendaraan.nomor_mesin }}</div>
                </div>
              </div>
              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Tahun Dibuat</label>
                  <div>{{ detail_kendaraan.tahun_buat }}</div>
                </div>
              </div>
              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Nomor Sasis</label>
                  <div>{{ detail_kendaraan.nomor_sasis }}</div>
                </div>
              </div>
              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Nomor STNK</label>
                  <div>{{ detail_kendaraan.stnk }}</div>
                </div>
              </div>
              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Nomor KIR</label>
                  <div>{{ detail_kendaraan.kir }}</div>
                </div>
              </div>
              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Jenis Kendaraan</label>
                  <div>
                    {{
                      detail_kendaraan.jenis_kendaraan
                        ? detail_kendaraan.jenis_kendaraan.nama_jenis_kendaraan
                        : "Tidak Ditemukan"
                    }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Gudang</label>
                  <div>
                    {{
                      detail_kendaraan.gudang
                        ? detail_kendaraan.gudang.nama_gudang
                        : "Tidak Ditemukan"
                    }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Vendor</label>
                  <div>
                    {{
                      detail_kendaraan.vendor
                        ? detail_kendaraan.vendor.nama_vendor
                        : "Tidak Ditemukan"
                    }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Vendor Operator</label>
                  <div>
                    {{
                      detail_kendaraan.vendor_operator
                        ? detail_kendaraan.vendor_operator.nama_vendor
                        : "Tidak Ditemukan"
                    }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div>
                  <label class="font-bold" for="uername"
                    >Standar Jenis Kendaraan</label
                  >
                  <div>
                    {{
                      detail_kendaraan.standar_jenis_kendaraan
                        ? detail_kendaraan.standar_jenis_kendaraan
                            .nama_standar_jenis_kendaraan
                        : "Tidak Ditemukan"
                    }}
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="table table-responsive">
               <table class="table-responsive">
                <thead>
                  <tr>
                    <th>Pengemudi</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in detail_kendaraan.pengemudi_kendaraan"
                   :key="index">
                   <td>{{item.pengemudi ? item.pengemudi.nama_pengemudi : '-'}}</td>
                   <td>
                     <span class="badge badge-success ml-1 mr-1 mb-2"">
                       {{item.status}}
                     </span>
                   </td>
                  </tr>
                  <tr v-if="!detail_kendaraan.pengemudi_kendaraan.length">
                    <td colspan="2" class="text-center">
                      Data tidak ditemukan
                    </td>
                  </tr>
                </tbody>
               </table>
             </div> -->
          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  middleware: ["isNotAccessable"],

  props: ["self"],

  data() {
    return {
      visible: false,
      detail_kendaraan: {},
      parameters: {
        form: {
          kendaraan_id: "",
        },
      },
    };
  },

  async created() {
    try {
      let response = await this.$axios.get(
        "master/kendaraan/" + this.form.kendaraan_id
      );
      this.detail_kendaraan = response.data;
    } catch (error) {
      // this.hide()
    }
  },

  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
