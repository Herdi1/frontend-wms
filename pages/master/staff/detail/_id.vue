<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Staff</h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <div class="w-full">
        <div class="w-full md:flex gap-3">
          <div
            class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nama Lengkap</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.nama_lengkap
                      ? this.detail_staff.nama_lengkap
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kode Staff</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.kode_staff
                      ? this.detail_staff.kode_staff
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor HP</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_staff.no_hp ? this.detail_staff.no_hp : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Email</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_staff.email ? this.detail_staff.email : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Jenis Kelamin</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.jenis_kelamin === "l"
                      ? "Laki-laki"
                      : this.detail_staff.jenis_kelamin === "p"
                      ? "Perempuan"
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Tanggal Lahir</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.tanggal_lahir
                      ? this.detail_staff.tanggal_lahir
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor KTP</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.no_ktp ? this.detail_staff.no_ktp : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Jenis Staff</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.jenis_user === "staff"
                      ? "Staff"
                      : this.detail_staff.jenis_user === "pengemudi"
                      ? "Pengemudi"
                      : this.detail_staff.jenis_user === "operator"
                      ? "Operator"
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor SIM</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.no_sim ? this.detail_staff.no_sim : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Tanggal Expired SIM</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.sim_expired
                      ? this.detail_staff.sim_expired
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor BPJS</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.no_bpjs ? this.detail_staff.no_bpjs : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">SKCK</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_staff.skck ? this.detail_staff.skck : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor NPWP</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.no_npwp ? this.detail_staff.no_npwp : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">NIK</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_staff.nik ? this.detail_staff.nik : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Tanggal Gabung</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.tanggal_gabung
                      ? this.detail_staff.tanggal_gabung
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Status</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.status_aktif === "1"
                      ? "Aktif"
                      : this.detail_staff.status_aktif === "0"
                      ? "Tidak Aktif"
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Jabatan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.jabatan
                      ? this.detail_staff.jabatan.nama_jabatan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Pelanggan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.pelanggan
                      ? this.detail_staff.pelanggan.nama_pelanggan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Tipe SIM</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.tipe_sim
                      ? this.detail_staff.tipe_sim.nama_tipe_sim
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Vendor</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.vendor_operator
                      ? this.detail_staff.vendor_operator.nama_vendor
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Alamat</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.alamat ? this.detail_staff.alamat : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Keterangan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_staff.keterangan
                      ? this.detail_staff.keterangan
                      : "-"
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <h1 class="text-xl font-bold mb-2 uppercase">Detail Rekening Staff</h1>
      </div>
      <div
        class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
      >
        <div class="w-full relative overflow-x-auto">
          <table
            class="mb-5 table-fixed border border-collapse border-gray-300"
          >
            <thead>
              <tr class="uppercase">
                <th class="w-60 border border-gray-300">Nama Bank</th>
                <th class="w-40 border border-gray-300">No Rekening</th>
                <th class="w-40 border border-gray-300">Nama Pemilik</th>
                <th class="w-40 border border-gray-300">Status</th>
                <th class="w-40 border border-gray-300">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in detail_staff.rekening_staffs"
                :key="i"
                class="border-t"
              >
                <td class="border border-gray-300">
                  {{ item.bank ? item.bank.nama_bank : "Tidak Ditemukan" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.no_rekening ? item.no_rekening : "Tidak Ditemukan" }}
                </td>
                <td class="border border-gray-300">
                  {{
                    item.nama_pemilik ? item.nama_pemilik : "Tidak Ditemukan"
                  }}
                </td>
                <td class="border border-gray-300">
                  {{
                    item.status_aktif === "1"
                      ? "Aktif"
                      : item.status_aktif === "0"
                      ? "Tidak Aktif"
                      : "Tidak Ditemukan"
                  }}
                </td>
                <td class="border border-gray-300">
                  {{ item.keterangan ? item.keterangan : "Tidak Ditemukan" }}
                </td>
              </tr>
            </tbody>
          </table>
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
      detail_staff: {
        nama_lengkap: "",
        kode_staff: "",
        no_hp: "",
        email: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        nik: "",
        jenis_user: "",
        no_sim: "",
        sim_expired: "",
        no_bpjs: "",
        skck: "",
        no_npwp: "",
        no_ktp: "",
        tanggal_gabung: "",
        status_aktif: "",
        jabatan_id: "",
        pelanggan_id: "",
        tipe_sim_id: "",
        vendor_id_operator: "",
        alamat: "",
        keterangan: "",
        jabatan: {},
        pelanggan: {},
        tipe_sim: {},
        vendor_operator: {},

        rekening_staffs: [],
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`master/staff/${this.id}`);
      Object.keys(this.detail_staff).forEach((item) => {
        if (item != "rekening_staffs") {
          this.detail_staff[item] = res.data[item];
        }
      });
      this.detail_staff.rekening_staffs = res.data.rekening_staff.map(
        (item) => {
          return {
            ...item,
          };
        }
      );
      this.isLoadingPage = false;
      // console.log(this.detail_staff);
    } catch (error) {
      this.$router.back();
      // console.log("error", error);
    }
  },
};
</script>
