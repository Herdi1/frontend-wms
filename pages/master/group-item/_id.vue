<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Group Item
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Group Item
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
              name="kode_group_item"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Kode Group Item"
                  type="text"
                  name="kode_group_item"
                  :required="true"
                  v-model="parameters.form.kode_group_item"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              ref="inputProvider"
              name="kode_tipe_pajak"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Nama Group Item"
                  type="text"
                  name="nama_group_item"
                  :required="true"
                  v-model="parameters.form.nama_group_item"
                />
              </div>
            </ValidationProvider>
            <div class="form-group">
              <label for="status"
                >Status Kategori Item<span class="text-danger">*</span></label
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
                >Group Item Induk<span class="text-danger">*</span></label
              >
              <v-select
                label="nama_group_item"
                :loading="isLoadingGetGroupItem"
                :options="lookup_custom1.data"
                :filterable="false"
                @search="onGetGroupItem"
                :reduce="(item) => item.group_item_id"
                v-model="parameters.form.group_item_id_induk"
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
      id,

      isStopSearchGroupItem: false,
      isLoadingGetGroupItem: false,
      group_item_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Group Item",
      parameters: {
        url: "master/group-item",
        form: {
          kode_group_item: "",
          nama_group_item: "",
          group_item_id_induk: "",
          status: 1,
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchGroupItem();
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
          id: this.parameters.form.group_item_id
            ? this.parameters.form.group_item_id
            : "",
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );

        this.isEditable = false;
        this.parameters.form = {
          kode_group_item: "",
          nama_group_item: "",
          group_item_id_induk: "",
          status: 0,
        };
        (this.group_item_search = ""), this.$refs.formValidate.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
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
          url: "master/group-item/get-group-item",
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
      this.parameters.form.group_item_id_induk = "";
      this.group_item_search = "";
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kode_group_item: "",
        nama_group_item: "",
        group_item_id_induk: "",
        status: 0,
      };
      this.group_item_search = "";
    },
  },
};
</script>
