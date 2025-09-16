<template>
  <div class="mb-4">
    <div class="col-md-12 mb-2">
      <h5 class="uppercase text-xl font-bold" v-if="self.itemTitle">
        DATA {{ self.itemTitle }}
      </h5>
      <h5 class="uppercase text-xl font-bold" v-else>DATA {{ self.title }}</h5>
    </div>
    <div class="col-md-12" style="margin-top: -10px">
      <div class="flex gap-5">
        <!-- Pages -->
        <div class="col-md-1 mt-2" v-if="isShowingPage">
          <select
            class="border border-gray-300 rounded-sm outline-none w-[4rem]"
            style="
              height: calc(1.5em + 0.5rem + 2px);
              padding: 0px;
              padding-left: 2px;
              padding-right: 0px;
            "
            v-model="self.parameters.params.per_page"
            @change="
              self.parameters.params.page = 1;
              self.onLoad();
            "
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>

        <!-- Searching -->
        <div class="col-md-3 mt-2" v-if="isSearching">
          <div class="row">
            <div class="col-md-12">
              <input
                type="text"
                class="border border-gray-300 rounded-sm p-1 outline-none w-[15rem]"
                placeholder="search..."
                v-model="self.parameters.params.search"
                @keyup.enter="self.onLoad()"
              />
            </div>
          </div>
        </div>

        <div class="col-md-1 mt-2" v-if="isSearching">
          <button
            class="btn btn-sm btn-primary text-nowrap"
            data-toggle="tooltip"
            data-placement="top"
            data-original-title="Cari"
            @click="self.onLoad()"
          >
            <i class="fas fa-search mr-2"></i> Cari Data
          </button>
        </div>

        <div
          class="flex mt-2 w-full justify-between"
          :class="!isSearching && !isShowingPage ? 'col-md-12' : 'col-md-7'"
        >
          <!-- Maintenance Page (All, Active, Trashed) -->
          <!-- <div class="flex mx-2" v-if="isMaintenancePage"> -->
          <!-- <button
              class="btn btn-sm"
              :class="
                self.parameters.params.soft_deleted == 'all'
                  ? 'btn-primary active'
                  : ''
              "
              @click="
                self.parameters.params.soft_deleted = 'all';
                self.onLoad();
              "
              data-toggle="tooltip"
              data-placement="top"
              data-original-title="Semua Data"
            >
              <i
                :class="[
                  'fas fa-font',
                  {
                    'text-primary':
                      self.parameters.params.soft_deleted != 'all',
                  },
                ]"
              ></i>
              <span class="badge badge-danger">{{ total }}</span>
            </button> -->
          <!-- <button
              class="btn btn-sm"
              :class="
                self.parameters.params.soft_deleted == ''
                  ? 'btn-info active'
                  : ''
              "
              @click="
                self.parameters.params.soft_deleted = '';
                self.onLoad();
              "
              data-toggle="tooltip"
              data-placement="top"
              data-original-title="Data Active"
            >
              <i
                :class="[
                  'fas fa-list',
                  { 'text-info': self.parameters.params.soft_deleted != '' },
                ]"
              ></i>
              <span class="badge badge-danger">999</span>
            </button> -->
          <!-- <button
              class="btn btn-sm"
              :class="
                self.parameters.params.soft_deleted == 'deleted'
                  ? 'btn-danger active'
                  : ''
              "
              @click="
                self.parameters.params.soft_deleted = 'deleted';
                self.onLoad();
              "
              data-toggle="tooltip"
              data-placement="top"
              data-original-title="Data Terhapus"
            >
              <i
                :class="[
                  'fas fa-trash',
                  {
                    'text-danger':
                      self.parameters.params.soft_deleted !== 'deleted',
                  },
                ]"
              ></i>
              <span class="badge badge-primary">999</span>
            </button> -->
          <!-- </div> -->

          <!-- Filter -->
          <div class="btn-group" v-if="isFilter">
            <button
              class="btn btn-sm btn-outline-info"
              data-toggle="modal"
              data-target="#modal-filter"
              @click="self.onFilterShow()"
            >
              <i class="fas fa-filter text-info"></i> Filter
            </button>
          </div>

          <!-- Add data -->
          <div class="btn-group" v-if="isAddData">
            <button
              class="btn btn-sm btn-primary"
              data-toggle="tooltip"
              data-placement="top"
              data-original-title="Tambah Data"
              @click="self.onFormShow()"
            >
              <i class="fas fa-plus mr-2"></i> Tambah Data
            </button>
            <button
              class="btn btn-sm bg-green-600 btn-block text-white"
              data-toggle="tooltip"
              data-placement="top"
              v-if="isImport"
              data-original-title="Import Data"
              @click="self.onOpenModalImport()"
            >
              <i class="fas fa-file-import mr-2"></i> Import Data
            </button>
          </div>

          <!-- SLOT FOR DOWNLOD DATA SCHOOL DAPODIK -->

          <!-- Export (Excel, Pdf, Print) -->
          <div
            class="btn-group float-right ml-2 flex gap-1 align-self-end"
            v-if="isExport"
          >
            <button
              class="btn btn-sm bg-green-600 btn-block text-white"
              data-toggle="tooltip"
              data-placement="top"
              data-original-title="Download Excel"
              @click="
                exportFile({ type: 'excel', parameters: self.parameters })
              "
              v-if="isExportFile && isExportFileExcel"
            >
              <i class="fas fa-file-excel mr-2"></i> Excel
            </button>
            <!-- <button
              class="btn btn-sm bg-red-500 btn-block text-white"
              data-toggle="tooltip"
              data-placement="top"
              data-original-title="Download Pdf"
              @click="exportFile({ type: 'pdf', parameters: self.parameters })"
              v-if="isExportFile && isExportFilePdf"
            >
              <i class="fas fa-file-pdf mr-2"></i> PDF
            </button> -->
            <button
              class="btn btn-sm btn-primary btn-block text-white"
              data-toggle="tooltip"
              data-placement="top"
              data-original-title="Print Semua Data"
              @click="printFile({ parameters: self.parameters })"
              v-if="isExportPrint"
            >
              <i class="fas fa-print mr-2"></i> Print
            </button>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    self: Object,
  },

  data() {
    return {
      isMaintenancePage: true,
      isSearching: true,
      isFilter: true,
      isExport: true,
      isExportFile: true,
      isExportPrint: true,
      isAddData: true,
      isImport: false,
      isShowingPage: true,
      isExportFilePdf: true,
      isExportFileExcel: true,
    };
  },

  methods: {
    ...mapActions("print", ["printFile", "exportFile"]),
  },
};
</script>
