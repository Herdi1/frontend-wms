<template>
  <section
    class="relative p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
  >
    <div class="">
      <div class="row">
        <div class="col-12 col-md-12">
          <div class="">
            <div class="card-body">
              <div class="card-title relative inline-block">
                <list-option-section :self="this" ref="form-option" />
                <!-- <filter-section :self="this" :visible="this.isFilterVisible">
                  <template>
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="created_at">Dibuat Pada</label>
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label for="start_date">Awal</label>
                              <input
                                type="date"
                                class="form-control"
                                v-model="parameters.params.start_date"
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div class="form-group">
                              <label for="end_date">Akhir</label>
                              <input
                                type="date"
                                class="form-control"
                                v-model="parameters.params.end_date"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </filter-section> -->
              </div>

              <!-- start table -->
              <div class="table-responsive">
                <table
                  ref="formContainer"
                  class="min-w-[500px] overflow-x-auto"
                >
                  <thead>
                    <tr>
                      <th class="w-[5%]">No</th>
                      <th class="w-[20%]">Username</th>
                      <th class="w-[25%]">Deskripsi</th>
                      <th class="w-[20%]">Detail</th>
                      <th class="w-[25%]">Dibuat</th>
                      <th class="text-center w-[5%]">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in data" :key="i">
                      <td>{{ i + 1 }}</td>
                      <td>{{ item.causer ? item.causer.username : "-" }}</td>
                      <td>{{ item.description }}</td>
                      <td>
                        Table :
                        {{
                          item.properties ? item.properties.table || "-" : "-"
                        }}
                        <br />
                        Nama :
                        {{
                          item.properties ? item.properties.name || "-" : "-"
                        }}
                      </td>
                      <td>
                        {{ onHumanReadAble(item.created_at) }}
                      </td>
                      <td class="text-center">
                        <div class="btn-group">
                          <button
                            class="btn btn-sm btn-success"
                            @click="onDetail(item)"
                          >
                            <i class="fas fa-info-circle"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>

                  <table-data-loading-section :self="this" />

                  <table-data-not-found-section :self="this" />
                </table>
              </div>
              <!-- end table -->

              <div
                class="card-title border-top"
                style="padding-bottom: -100px !important"
              >
                <pagination-section :self="this" ref="pagination" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalDetail :self="this" ref="modalDetail" />
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import ModalDetail from "./detail";

export default {
  middleware: ["checkRoleSuperAdmin"],

  head() {
    return {
      title: "Aktifitas",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  mounted() {
    this.$refs["form-option"].isExport = false;
    this.$refs["form-option"].isAddData = false;
    this.$refs["form-option"].isMaintenancePage = false;
    this.$refs["form-option"].isFilter = true;
  },

  data() {
    return {
      title: "Log Aktifitas",
      isLoadingData: false,
      isPaginate: true,
      isFilterVisible: false,
      parameters: {
        url: "setting/activity",
        params: {
          soft_deleted: "",
          search: "",
          order: "id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_date: "",
        },
        default_params: {
          soft_deleted: "",
          search: "",
          order: "id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_date: "",
        },
      },
    };
  },

  components: {
    ModalDetail,
  },

  computed: {
    ...mapState("moduleApi", ["data", "error", "result"]),
  },

  methods: {
    ...mapActions("moduleApi", ["getData"]),

    ...mapMutations("moduleApi", ["set_data"]),

    onFilterShow() {
      this.isFilterVisible = !this.isFilterVisible;
    },

    onDetail(item) {
      this.$refs.modalDetail.parameters.form = {
        ...item,
      };
      console.log(item);

      this.$refs.modalDetail.show();
    },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = parseInt(page) || 1;

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      await this.getData(this.parameters);

      if (this.result == true) {
        loader.hide();

        if (page == 1) {
          this.$refs["pagination"].generatePage();
        }

        this.$refs["pagination"].active_page = this.parameters.params.page;
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingData = false;
    },

    onSort(column, sort = "asc") {
      this.parameters.params = {
        ...this.parameters.params,
        order: column,
        sort: sort,
      };

      this.onLoad(this.parameters.params.page);
    },

    onHumanReadAble(date) {
      return moment(date).locale("id").format("LLLL");
    },
  },
};
</script>
