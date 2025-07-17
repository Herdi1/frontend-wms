<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">
          {{ isEditable ? "Edit" : "Tambah" }} {{ title }}
        </h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>

      <div class="w-full">
        <ValidationObserver v-slot="{ invalid, validate }" ref="formVaidate">
          <form
            @submit.prevent="validate().then(() => onSubmit(invalid))"
            autocomplete="off"
          >
            <div
              class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <div class="grid grid-flow-col grid-rows-3 gap-1 w-full">
                <div>
                  <input-horizontal
                    label="No Ajuan"
                    type="text"
                    name="no_ajuan"
                    :isHorizontal="true"
                    v-model="form.no_ajuan"
                    :required="false"
                    :disabled="true"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Tanggal"
                    type="text"
                    name="tanggal"
                    :isHorizontal="true"
                    v-model="form.tanggal"
                    :required="false"
                    :disabled="true"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Gudang"
                    type="text"
                    name="gudang_id"
                    :isHorizontal="true"
                    v-model="form.gudang_id"
                    :required="false"
                    :disabled="true"
                  />
                </div>
                <div class="form-group">
                  <input-horiontal
                    label="Periode Awal"
                    type="text"
                    name="periode_awal"
                    v-model="form.periode_awal"
                    :required="false"
                  />
                </div>
                <div class="form-group">
                  <input-horiontal
                    label="Periode Akhir"
                    type="text"
                    name="periode_akhir"
                    v-model="form.periode_akhir"
                    :required="false"
                  />
                </div>
                <div class="form-group">
                  <input-horiontal
                    label="Status"
                    type="text"
                    name="status"
                    v-model="form.status"
                    :required="false"
                  />
                </div>
              </div>
            </div>

            <div
              class="mb-3 mt-7 text-xl font-bold uppercase flex justify-between items-start w-full"
            >
              <span class="w-1/2"><h1>Pengajuan Dropping Detail</h1></span>
              <div class="w-full relative flex justify-end gap-2">
                <button
                  type="button"
                  @click="addPengajuanDropping"
                  class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                >
                  <i class="fas fa-plus"></i>
                  <p class="text-xs font-medium">Pengajuan Dropping Detail</p>
                </button>
              </div>
            </div>
            <div
              class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <table
                class="table border-collapse border border-gray-300 mt-5 table-fixed"
              >
                <thead>
                  <tr class="uppercase">
                    <th class="w-20 border border-gray-300 text-center">
                      Delete
                    </th>
                    <th class="w-full border border-gray-300">Keterangan</th>
                    <th class="w-full border border-gray-300">Nominal</th>
                    <th class="w-full border border-gray-300">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in form.detail_pengajuan_dropping"
                    :key="i"
                    class="border-t border-gray-400 align-top"
                  >
                    <td
                      class="text-center text-gray-600 border border-gray-300"
                    >
                      <i
                        class="fas fa-trash mx-auto"
                        style="cursor: pointer"
                        @click="onDeleteItem(i)"
                      ></i>
                    </td>
                    <td class="border border-gray-300">
                      <textarea
                        placeholder="Keterangan"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        v-model="item.keterangans"
                      ></textarea>
                    </td>
                    <td class="border border-gray-300">
                      <money
                        v-model="item.nominal"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <td class="border border-gray-300">
                      <money
                        v-model="item.total"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                  </tr>
                  <tr v-if="!form.detail_pengajuan_dropping.length > 0">
                    <td colspan="12" class="text-center">
                      <span class="flex justify-center w-full">
                        <img
                          src="/img/data-not-found.svg"
                          alt="Data Tidak Ditemukan"
                          class="h-64 object-cover"
                        />
                      </span>
                      <div class="mt-3 w-full">Data Tidak Ditemukan</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="w-full flex justify-start items-center">
              <modal-footer-section
                class="mt-5"
                :isLoadingForm="isLoadingForm"
                @reset="formReset()"
              />
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Pengajuan Dropping",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Pengajuan Dropping",
      url: "finance/pengajuan-dropping",
      form: {
        no_ajuan: "",
        tanggal: "",
        gudang_id: "",
        periode_awal: "",
        periode_akhir: "",
        status: "",
        detail_pengajuan_dropping: [],
      },
      defaultForm: {
        no_ajuan: "",
        tanggal: "",
        gudang_id: "",
        periode_awal: "",
        periode_akhir: "",
        status: "",
        detail_pengajuan_dropping: [],
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.url}/${this.id}`);

        Object.keys(this.form).forEach((item) => {
          this.form[item] = res.data[item];
        });
        this.form.detail_pengajuan_dropping =
          res.data.detail_pengajuan_dropping.map((item) => {
            return {
              ...item,
              detail_pengajuan_dropping_id: item || "",
            };
          });
        this.form.gudang_id = res.data.gudang_id;
        this.isLoadingPage = false;
      }
    } catch (error) {
      console.log("error", error);
      //this.$router.back()
    }
  },

  computed: {
    ...mapState("moduleApi", ["error", "result"]),

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = this.url;

      let formData = {
        ...this.form,
        detail_pengajuan_dropping: this.form.detail_pengajuan_dropping.map(
          (item) => {
            return {
              ...item,
              detail_pengajuan_dropping_id: item.detail_pengajuan_dropping_id,
            };
          }
        ),
      };

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        url: url,
        method: this.isEditable ? "put" : "post",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data Berhasil di " + (this.isEditable ? "Update" : "Tambah")
          );
          if (!this.isEditable) {
            this.defaultForm;
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formVaidate.reset();
        });
    },

    addPengajuanDropping() {
      this.form.detail_pengajuan_dropping.push({
        keterangan: "",
        nominal: "",
        total: "",
      });
    },

    onDeleteItem(index) {
      this.form.detail_pengajuan_dropping =
        this.form.detail_pengajuan_dropping.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    formReset() {
      this.isEditable = false;
      this.form = {
        ...this.defaultForm,
      };
    },
  },
};
</script>
