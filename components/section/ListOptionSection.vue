<template>
  <div class="mb-4">
    <div class="col-md-12 mb-2">
      <h5 class="uppercase text-xl font-bold">DATA {{ self.title }}</h5>
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
                class="border border-gray-300 rounded-sm p-1 outline-none w-[25rem]"
                placeholder="search..."
                v-model="self.parameters.params.search"
                @keyup.enter="self.onLoad()"
              />
            </div>
          </div>
        </div>

        <div class="col-md-1 mt-2">
          <button
            class="btn btn-sm btn-primary"
            data-toggle="tooltip"
            data-placement="top"
            data-original-title="Cari"
            @click="self.onLoad()"
          >
            <i class="fas fa-search"></i> Cari Data
          </button>
        </div>

        <div
          class="flex mt-2"
          :class="!isSearching && !isShowingPage ? 'col-md-12' : 'col-md-7'"
        >
          <!-- Maintenance Page (All, Active, Trashed) -->
          <div class="flex mx-2" v-if="isMaintenancePage">
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
              <span class="badge badge-danger">{{total}}</span>
            </button>
            <button
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
            <button
              class="border border-gray-300 w-10 h-auto rounded-sm"
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
              <!-- <span class="badge badge-primary">999</span> -->
            </button>
          </div>

          <!-- Filter -->
          <div class="btn-group" v-if="isFilter">
            <button
              class="btn btn-sm btn-outline-info"
              data-toggle="modal"
              data-target="#modal-filter"
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
              <i class="fas fa-plus"></i> Tambah Data
            </button>
          </div>

          <!-- SLOT FOR DOWNLOD DATA SCHOOL DAPODIK -->

          <!-- Export (Excel, Pdf, Print) -->
          <div class="btn-group float-right" v-if="isExport">
            <button
              class="btn btn-sm btn-primary btn-block"
              data-toggle="tooltip"
              data-placement="top"
              data-original-title="Download Excel"
              @click="
                exportFile({ type: 'excel', parameters: self.parameters })
              "
              v-if="isExportFile && isExportFileExcel"
            >
              <i class="fas fa-file-excel"></i> Excel
            </button>
            <!-- <button class="btn btn-sm btn-primary btn-block"
              data-toggle="tooltip"
              data-placement="top"      
              data-original-title="Download Pdf"
              @click="exportFile({type : 'pdf',parameters : self.parameters})"
              v-if="isExportFile && isExportFilePdf">
              <i class="fas fa-file-pdf"></i> PDF
            </button> -->
            <button
              class="btn btn-sm btn-primary btn-block"
              data-toggle="tooltip"
              data-placement="top"
              data-original-title="Print Semua Data"
              @click="printFile({ parameters: self.parameters })"
              v-if="isExportPrint"
            >
              <i class="fas fa-print"></i> Print
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
