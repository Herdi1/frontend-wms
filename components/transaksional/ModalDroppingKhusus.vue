<template>
  <portal v-if="visible" to="modal-detail">
    <div @click="hide" class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="modal fade fixed top-6 left-1/2 -translate-x-1/2 w-[500px] bg-white rounded shadow-lg p-6 z-50 overflow-y-auto dark:bg-slate-700 dark:text-gray-100"
      aria-hidden="true"
      id="modal-detail"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header flex justify-between text-xl font-bold mb-3">
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
          <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
            <form
              @submit.prevent="validate().then(() => onSubmitRetur(invalid))"
            >
              <ValidationProvider name="coa_id" class="w-full mt-1">
                <label for="coa_id" class="w-[40%]">Coa </label>
                <v-select
                  label="nama_coa"
                  :loading="isLoadingGetBank"
                  :options="lookup_custom1.data"
                  :filterable="false"
                  @search="onGetBank"
                  v-model="form.coa_id"
                  class="w-[60%]"
                  @input="(item) => onSelectBank(item)"
                >
                  <template slot="option" slot-scope="option">
                    {{ option.nama_coa + " - " + option.kode_coa }}
                  </template>
                  <template slot="selected-option" slot-scope="option">
                    <div
                      class="w-[250px] whitespace-nowrap text-ellipsis overflow-hidden"
                    >
                      {{ option.nama_coa + " - " + option.kode_coa }}
                    </div>
                  </template>
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom1.data.length || search"
                  >
                    <span
                      v-if="lookup_custom1.current_page > 1"
                      @click="onGetBank(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom1.last_page > lookup_custom1.current_page
                      "
                      @click="onGetBank(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </ValidationProvider>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    return {
      visible: false,

      isStopSearchBiaya: false,
      isLoadingGetBiaya: false,
      biaya_search: "",

      isStopSearchBank: false,
      isLoadingGetBank: false,
      bank_search: "",

      form: {
        coa_id: "",
        coa_id_biaya: "",
      },
    };
  },

  async mounted() {
    await this.onSearchBank();
    await this.onSearchBiaya();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
    ]),
  },
  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },

    onGetBank(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchBank);

      this.isStopSearchBank = setTimeout(() => {
        this.bank_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchBank();
      }, 600);
    },

    async onSearchBank() {
      if (!this.isLoadingGetBank) {
        this.isLoadingGetBank = true;

        await this.lookUp({
          url: "finance/coa/get-coa",
          lookup: "custom1",
          query:
            "?search=" +
            this.bank_search +
            "&tipe=HARTA" +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetBank = false;
      }
    },

    onSelectBank(item) {
      if (item) {
        this.form.coa_id = item;
      } else {
        this.form.coa_id = "";
      }
    },

    onGetBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchBiaya);

      this.isStopSearchBiaya = setTimeout(() => {
        this.biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchBiaya();
      }, 600);
    },

    async onSearchBiaya() {
      if (!this.isLoadingGetBiaya) {
        this.isLoadingGetBiaya = true;

        await this.lookUp({
          url: "finance/jurnal/get-coa",
          lookup: "custom4",
          query:
            "?search=" +
            this.biaya_search +
            "&tipe=HARTA" +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetBiaya = false;
      }
    },

    onSelectBiaya(item) {
      if (item) {
        this.form.coa_id_biaya = item;
      } else {
        this.form.coa_id_biaya = "";
      }
    },
  },
};
</script>
