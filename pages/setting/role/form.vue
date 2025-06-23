<template>
  <portal v-if="visible" to="modal">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
    <div
      class="fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 w-full max-w-md dark:bg-slate-700 dark:text-gray-100"
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
                <div class="grid grid-cols-2 gap-2 mb-3 w-full">
                  <div class="col">
                    <ValidationProvider name="name" rules="required">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <label for="name">Rute</label>
                        <input
                          id="name"
                          type="text"
                          class="border border-gray-300 rounded md p-2 outline-none w-full"
                          name="name"
                          v-model="parameters.form.rute"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
                        />
                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>
                        <div class="text-danger text-small" v-if="isEditable">
                          * Hati-hati dalam menganti nama menu
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="col">
                    <ValidationProvider name="title" rules="required">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <label for="title">Judul</label>
                        <input
                          id="title"
                          type="text"
                          class="border border-gray-300 rounded md p-2 outline-none w-full"
                          name="title"
                          v-model="parameters.form.judul"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
                        />

                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label for="icon">Icon</label>
                  <input
                    id="icon"
                    type="text"
                    class="border border-gray-300 rounded md p-2 outline-none w-full"
                    name="icon"
                    v-model="parameters.form.icon"
                  />
                </div>

                <!-- menu induk 1 -->
                <div class="form-group">
                  <label for="parent_id">Module</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border border-gray-300"
                    label="judul"
                    :loading="isLoadingGetRole"
                    :options="lookup_roles.data"
                    :filterable="false"
                    @search="onGetRole"
                    v-model="parameters.form.menu_id_induk"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_roles.data.length || search"
                    >
                      <span
                        v-if="lookup_roles.current_page > 1"
                        @click="onGetRole(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_roles.last_page > lookup_roles.current_page
                        "
                        @click="onGetRole(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                  <span class="text-muted">
                    *Kosongi jika ingin membuat menu menjadi module
                  </span>
                </div>

                <!-- menu induk 2 -->
                <!-- <div class="form-group">
                  <label for="parent_id">Parent</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border border-gray-300"
                    label="judul"
                    :loading="isLoadingGetRole"
                    :options="lookup_roles_2.data"
                    :filterable="false"
                    @search="onGetRole2"
                    v-model="parameters.form.menu_id_induk_2"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_roles.data.length || search"
                    >
                      <span
                        v-if="lookup_roles.current_page > 1"
                        @click="onGetRole2(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_roles.last_page > lookup_roles.current_page
                        "
                        @click="onGetRole2(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                  <span class="text-muted">
                    *Kosongi jika ingin membuat menu menjadi module
                  </span>
                </div> -->
              </div>

              <modal-footer-section
                :isLoadingForm="isLoadingForm"
                @close="hide"
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

  async mounted() {
    await this.onSearchRole();
    // await this.onSearchRole2();
  },

  data() {
    return {
      visible: false,
      isStopSearchRole: false,
      isLoadingGetRole: false,
      role_search: "",

      isEditable: false,
      isLoadingForm: false,
      title: "Role",
      parameters: {
        url: "setting/menu",
        // params: {
        //   menu_id_induk: "",
        //   menu_id_induk_2: "",
        //   status_menu: "",
        //   all: "",
        // },
        form: {
          rute: "",
          judul: "",
          icon: "",
          menu_id_induk: "",
          menu_id_induk_2: "",
          urutan: "",
          status: "",
          status_menu: "",
        },
      },
    };
  },

  computed: {
    ...mapState("moduleApi", ["error", "result", "lookup_roles"]),
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
          parent_id: this.parameters.form.parent_id
            ? this.parameters.form.parent_id.id
            : "",
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
        this.hide();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    //get modul
    onGetRole(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchRole);

      this.isStopSearchRole = setTimeout(() => {
        this.role_search = search;

        if (typeof isNext !== "function") {
          this.lookup_roles.current_page = isNext
            ? this.lookup_roles.current_page + 1
            : this.lookup_roles.current_page - 1;
        } else {
          this.lookup_roles.current_page = 1;
        }

        this.onSearchRole();
      }, 600);
    },

    async onSearchRole() {
      if (!this.isLoadingGetRole) {
        this.isLoadingGetRole = true;

        await this.lookUp({
          url: "setting/menu/get-menu",
          lookup: "roles",
          query:
            "?status_menu=1" +
            "?search=" +
            this.role_search +
            "&page=" +
            this.lookup_roles.current_page +
            "&per_page=10",
        });

        this.isLoadingGetRole = false;
      }
    },

    //get parent 2
    // onGetRole2(search, isNext) {
    //   if (!search.length && typeof isNext === "function") return false;

    //   clearTimeout(this.isStopSearchRole);

    //   this.isStopSearchRole = setTimeout(() => {
    //     this.role_search = search;

    //     if (typeof isNext !== "function") {
    //       this.lookup_roles_2.current_page = isNext
    //         ? this.lookup_roles_2.current_page + 1
    //         : this.lookup_roles_2.current_page - 1;
    //     } else {
    //       this.lookup_roles_2.current_page = 1;
    //     }

    //     this.onSearchRole2();
    //   }, 600);
    // },

    // async onSearchRole2() {
    //   if (!this.isLoadingGetRole) {
    //     this.isLoadingGetRole = true;

    //     await this.lookUp({
    //       url: "setting/menu/get-menu",
    //       lookup: "roles",
    //       query:
    //         "?status_menu=2" +
    //         "?search=" +
    //         this.role_search +
    //         "&page=" +
    //         this.lookup_roles_2.current_page +
    //         "&per_page=10",
    //     });

    //     this.isLoadingGetRole = false;
    //   }
    // },

    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
