<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Group Gudang
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Group Gudang
        </h1>
        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div class="modal-body mt-4">
            <ValidationProvider
              ref="inputProvider"
              name="nama_group_gudang"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Nama Group Gudang"
                  type="text"
                  name="nama_group_gudang"
                  :required="true"
                  v-model="parameters.form.nama_group_gudang"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              ref="inputProvider"
              name="kode_group_gudang"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Kode Group Gudang"
                  type="text"
                  name="kode_group_gudang"
                  :required="true"
                  v-model="parameters.form.kode_group_gudang"
                />
              </div>
            </ValidationProvider>
            <div class="form-group">
              <label for="status"
                >Status Group Gudang<span class="text-danger">*</span></label
              >
              <select
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                name="status"
                id="status"
                v-model="parameters.form.status"
                @change="onSelectStatus"
              >
                <option value="">Pilih</option>
                <option :value="1">Level 1</option>
                <option :value="2">Level 2</option>
                <option :value="3">Level 3</option>
                <option :value="4">Level 4</option>
                <option :value="5">Level 5</option>
              </select>
            </div>
            <div class="form-group" v-show="parameters.form.status > 1">
              <label for=""
                >Group Gudang Induk<span class="text-danger">*</span></label
              >
              <v-select
                label="nama_group_gudang"
                :loading="isLoadingGetGroupItem"
                :options="lookup_custom1.data"
                :filterable="false"
                @search="onGetGroupItem"
                v-model="parameters.form.group_gudang_id_induk"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-2 border-t flex justify-between"
                  v-if="lookup_custom1.data.length || search"
                >
                  <span
                    v-if="lookup_custom1.current_page > 1"
                    @click="onGetGroupItem(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom1.last_page > lookup_custom1.current_page
                    "
                    @click="onGetGroupItem(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
          </div>
          <modal-footer-section
            class="mt-5"
            :isLoadingForm="isLoadingForm"
            @reset="formReset()"
          />
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      isStopSearchGroupItem: false,
      isLoadingGetGroupItem: false,
      group_item_search: "",

      id,
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Group Gudang",
      parameters: {
        url: "master/group-gudang",
        form: {
          nama_group_gudang: "",
          group_gudang_id_induk: "",
          kode_group_gudang: "",
          status: 1,
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/group-gudang/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.group_gudang_id_induk = res.data.groupinduk ?? "";
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
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
          // id: this.parameters.form.fungsi_zona_id
          //   ? this.parameters.form.fungsi_zona_id
          //   : "",
          status: String(this.parameters.form.status),
          group_gudang_id_induk:
            typeof this.parameters.form.group_gudang_id_induk === "object"
              ? this.parameters.form.group_gudang_id_induk.group_gudang_id
              : "",
        },
      };

      if (this.isEditable) {
        parameters.url += `/${this.id}`;
        // await this.updateData(parameters);
      }
      // else {
      //   await this.addData(parameters);
      // }

      this.$axios({
        method: this.isEditable ? "put" : "post",
        url: parameters.url,
        data: parameters.form,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " +
              (this.isEditable == true ? "Diedit" : "Tambah")
          );

          this.isEditable = false;
          this.parameters.form = {
            nama_group_gudang: "",
            group_gudang_id_induk: "",
            kode_group_gudang: "",
            status: 1,
          };

          this.$refs.formValidate.reset();
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.parameters.url = "master/group-gudang";
        });
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        nama_group_gudang: "",
        group_gudang_id_induk: "",
        kode_group_gudang: "",
        status: 1,
      };
    },

    onGetGroupItem(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem);

      this.isStopSearchGroupItem = setTimeout(() => {
        this.group_item_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchGroupItem();
      }, 600);
    },

    async onSearchGroupItem() {
      if (!this.isLoadingGetGroupItem) {
        this.isLoadingGetGroupItem = true;

        await this.lookUp({
          url: "master/group-gudang/get-group-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.group_item_search +
            "&status=" +
            (parseInt(this.parameters.form.status) - 1) +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem = false;
      }
    },

    onSelectStatus() {
      this.onSearchGroupItem();
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        group_gudang_id_induk: "",
        nama_group_gudang: "",
        kode_group_gudang: "",
        status: 0,
      };
    },
  },
};
</script>
