<template>
  <portal v-if="visible" to="modal">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 w-full max-w-md dark:bg-slate-700 dark:text-gray-100 max-h-screen overflow-y-auto"
      aria-hidden="true"
      id="modal-form"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <modal-header-section :self="this" @close="hide" />

          <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
            <form
              @submit.prevent="validate().then(() => onSubmit(invalid))"
              autocomplete="off"
            >
              <div class="modal-body">
                <div class="grid gap-2 mb-3 w-full">
                  <div class="form-group">
                    <label for="vendor_id_operator"
                      >Vendor Operator<span class="text-danger">*</span></label
                    >
                    <!-- <v-select
                      label="nama_vendor"
                      :loading="isLoadingGetPelanggan"
                      :options="lookup_custom1.data"
                      :filterable="false"
                      @search="onGetPelanggan"
                      :reduce="(item) => item.vendor_id"
                      v-model="parameters.form.vendor_id_operator"
                    > -->
                    <v-select
                      label="nama_vendor"
                      :loading="isLoadingGetPelanggan"
                      :options="lookup_custom1.data"
                      :filterable="false"
                      @search="onGetPelanggan"
                      :reduce="(item) => item.vendor_id"
                      v-model="parameters.form.vendor_id_operator"
                      class="bg-white"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-2 border-t flex justify-between"
                        v-if="lookup_custom1.data.length || search"
                      >
                        <span
                          v-if="lookup_custom1.current_page > 1"
                          @click="onGetPelanggan(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom1.last_page >
                            lookup_custom1.current_page
                          "
                          @click="onGetPelanggan(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>

                  <div class="form-group">
                    <input-form
                      label="Nama Pengemudi"
                      type="text"
                      name="nama_pengemudi"
                      :required="true"
                      v-model="parameters.form.nama_pengemudi"
                    />
                  </div>
                  <div class="form-group">
                    <label>Alamat<span class="text-danger">*</span></label>
                    <textarea
                      name="alamat"
                      v-model="parameters.form.alamat"
                      class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <input-form
                      label="Nomor SIM"
                      type="text"
                      name="nomor_sim"
                      :required="true"
                      v-model="parameters.form.nomor_sim"
                    />
                  </div>
                  <div class="form-group">
                    <label for="status_pengemudi">Status Pengemudi</label>
                    <select
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      name="status_pengemudi"
                      id="status_pengemudi"
                      v-model="parameters.form.status_pengemudi"
                    >
                      <option value="">Pilih</option>
                      <option value="o">Organik</option>
                      <option value="s">Outsource</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="status_aktif">Status Aktif</label>
                    <select
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      name="status_aktif"
                      id="status_aktif"
                      v-model="parameters.form.status_aktif"
                    >
                      <option value="">Pilih</option>
                      <option value="1">Aktif</option>
                      <option value="0">Non Aktif</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3 w-full"></div>
              </div>

              <modal-footer-section
                :isLoadingForm="isLoadingForm"
                @reset="formReset"
              />
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  middleware: ["isNotAccessable"],

  props: ["self"],

  async created() {
    await this.onSearchPelanggan();
  },

  data() {
    return {
      visible: false,

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isEditable: false,
      isLoadingForm: false,
      title: "Pengemudi",
      parameters: {
        url: "master/pengemudi",
        form: {
          vendor_id_operator: "",
          nama_pengemudi: "",
          alamat: "",
          status_pengemudi: "",
          nomor_sim: "",
          status_aktif: "",
        },
      },
    };
  },

  computed: {
    ...mapState("moduleApi", ["error", "result", "lookup_custom1"]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        this.self.onLoad(this.self.parameters.params.page);
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );
        this.parameters.form = {
          vendor_id_operator: "",
          nama_pengemudi: "",
          alamat: "",
          status_pengemudi: "",
          nomor_sim: "",
          status_aktif: "",
        };
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    onGetPelanggan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPelanggan);

      this.isStopSearchPelanggan = setTimeout(() => {
        this.pelanggan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchPelanggan();
        this.onSearchGudang();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "custom1",
          query:
            "?search=" +
            this.pelanggan_search +
            "&tipe_vendor=o" +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPelanggan = false;
      }
    },

    formReset() {
      this.parameters.form = {
        vendor_id_operator: "",
        nama_pengemudi: "",
        alamat: "",
        status_pengemudi: "",
        nomor_sim: "",
        status_aktif: "",
      };
    },

    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
