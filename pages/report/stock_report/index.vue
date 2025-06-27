<template>
  <section class="section">
    <div class="section-body">
      <div class="row">
        <div class="col-12 col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <list-option-section
                  :self="this"
                  ref="form-option"/>            
              </div>            

              <!-- start table -->
              <div class="table-responsive">
                <table class="table table-striped table-sm vld-parent"
                  ref="formContainer">
                  <thead>
                    <tr>                           
                      <th>
                        Kode
                      </th>
                      <th> 
                        Nama
                      </th>
                      <th>
                        Spec
                      </th>
                      <th>
                        Supplier
                      </th>
                      <th>
                        Cogs
                      </th>
                      <th>
                        Stok 
                      </th>
                      <th>
                        Total nilai stok
                      </th>                                                                           
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in data" :key="i">              
                      <td>{{ item.product ? item.product.code : '-' }}</td>
                      <td>{{ item.product ? item.product.name : '-' }}</td>
                      <td>
                        {{item.product ? item.product.shape : '-' }}
                        {{item.product ? item.product.detail_1 : '-'}}                      
                        {{item.product ? item.product.detail_2 : '-'}}                        
                        {{item.product ? item.product.finishing : '-'}}
                        {{item.product ? item.product.dominant : '-'}}                    
                        {{item.product ? item.product.category : '-'}}
                      </td>
                      <td>
                        <div v-if="item.product">
                          {{ item.product.supplier ? item.product.supplier.name : '-' }}
                        </div>
                        <div v-else>
                          -
                        </div>
                      </td>
                      <td>{{ (item.product ? item.product.cost_of_products_sold  : 0) | formatPrice }}</td>
                      <td>{{ item.quantity }} </td>                      
                      <td>
                        {{ ( parseFloat(item.quantity) * ( item.product ? parseFloat(item.product.cost_of_products_sold) : 0 ) ) | formatPrice }}
                      </td>
                    </tr>
                  </tbody>

                  <table-data-loading-section
                    :self="this"
                  />

                  <table-data-not-found-section
                    :self="this"
                  />
                </table>
              </div>
              <!-- end table -->

              <div class="card-title border-top"
                style="padding-bottom: -100px !important">
                <pagination-section
                  :self="this"
                  ref="pagination"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    

    <filter-section
      :self="this"
      ref="form-filter">
      <template>
        <div class="col-md-12">
          <div class="mb-3"><b>Gudang</b></div>
          <div class="form-group">
             <v-select                           
                label="name"   
                :loading="isLoadingGetWarehouse"
                :options="lookup_warehouses.data"
                :filterable="false"
                @search="onGetWarehouse"
                @input="onSetWarehouse"
                v-model="warehouse_id">              
                <template v-slot:option="option">                    
                    <div class="row">
                        <div class="col-md-5 p-1 m-0">
                        {{ option.name }}
                        </div>
                        <div class="col-md-7 p-1 m-0 text-right">
                            {{ option.code }}
                        </div>
                    </div>
                </template> 
                <template #search="{attributes, events}">
                    <input
                    class="vs__search"
                    :required="!warehouse_id"
                    v-bind="attributes"
                    v-on="events"
                    />
                </template>   
                <li slot-scope="{search}" slot="list-footer"
                    class="d-flex justify-content-between"
                    v-if="lookup_warehouses.data.length || search">
                    <span v-if="lookup_warehouses.current_page > 1" 
                        @click="onGetWarehouse(search,false)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor:pointer">Sebelumnya</span>
                    <span v-if="lookup_warehouses.last_page > lookup_warehouses.current_page" 
                        @click="onGetWarehouse(search,true)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor:pointer">Selanjutnya</span>
                </li> 
            </v-select>   
          </div>

          <div class="mb-3"><b>Supplier</b></div>
          <div class="form-group">
              <v-select                           
                label="name"   
                :loading="isLoadingGetSupplier"
                :options="lookup_suppliers.data"
                :filterable="false"
                @search="onGetSupplier"
                @input="onSetSupplier"
                v-model="supplier_id">              
                <template v-slot:option="option">                    
                    <div class="row">
                        <div class="col-md-5 p-1 m-0">
                        {{ option.name }}
                        </div>
                        <div class="col-md-7 p-1 m-0 text-right">
                            {{ option.code }}
                        </div>
                    </div>
                </template> 
                <template #search="{attributes, events}">
                    <input
                    class="vs__search"
                    :required="!supplier_id"
                    v-bind="attributes"
                    v-on="events"
                    />
                </template>   
                <li slot-scope="{search}" slot="list-footer"
                    class="d-flex justify-content-between"
                    v-if="lookup_suppliers.data.length || search">
                    <span v-if="lookup_suppliers.current_page > 1" 
                        @click="onGetSupplier(search,false)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor:pointer">Sebelumnya</span>
                    <span v-if="lookup_suppliers.last_page > lookup_suppliers.current_page" 
                        @click="onGetSupplier(search,true)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor:pointer">Selanjutnya</span>
                </li> 
            </v-select>  
          </div>
          
        </div>      
      </template>
    </filter-section>
    

  </section>
</template>

<script>
import { mapActions,mapState,mapMutations } from 'vuex'
// import FormInput from "./form";
// import ModalDetail from "./detail";

export default {
  middleware : ['checkRoleUser'],

  head() {
    return {
      title: 'Laporan Stok',
    }
  },

  created(){
    this.set_data([]);

    this.onLoad();
  },

  async mounted(){
    this.$refs["form-option"].isAddData = false;
    this.$refs["form-option"].isMaintenancePage = false;
    this.$refs['form-option'].isFilter          = true;
    this.$refs["form-option"].isExport          = true;
    this.$refs["form-option"].isExportFile      = false;
    this.$refs["form-option"].isExportPrint     = false;

    if(
      this.getRoles.destroy || 
      this.getRoles.destroy_all || 
      this.getRoles.restore || 
      this.getRoles.restore_all
    ){
      this.$refs["form-option"].isMaintenancePage = false;
    }
    
    if(this.getRoles.store){
      this.$refs["form-option"].isAddData = false;
    }

    if(this.getRoles.export){
      this.$refs["form-option"].isExportFile = true;

      this.$refs["form-option"].isExportFilePdf = true;          
      this.$refs["form-option"].isExportFileExcel = true;

      if("export_pdf" in this.getRoles || "export_excel" in this.getRoles){
        this.$refs["form-option"].isExportFilePdf = this.getRoles.export_pdf;          
        this.$refs["form-option"].isExportFileExcel = this.getRoles.export_excel;          
      }
    }

    if(this.getRoles.print){
      this.$refs["form-option"].isExportPrint = false;
    }

    this.$refs["form-option"].isSearching = false;
    this.$refs["form-option"].isShowingPage = false;

    await this.onSearchWarehouse();

    await this.onSearchSupplier();
  },

  data() {
    return {
      title               : 'Laporan Stok',
      isLoadingData       : false,
      isPaginate          : true,
      parameters : {
        url : 'report/stock',
        type : 'pdf',
        params :{
          soft_deleted : '',
          search      : '',
          order       : 'id',
          sort        : 'desc',
          all         : '',
          per_page    : 10,
          page        : 1,
          supplier_id : '',
          warehouse_id : ''
        },
        default_params : {
          soft_deleted : '',
          search      : '',
          order       : 'id',
          sort        : 'desc',
          all         : '',
          per_page    : 10,
          page        : 1,
          supplier_id : '',
          warehouse_id : ''
        },
        form : {
          checkboxs : []
        },
        loadings : {
          isDelete  : false,
          isRestore : false,
        }
      },
      default_roles : {
        store : true,
        update : true,
        destroy : true,
        restore : true,
        show : true,
        export : true,
        export_excel : true,
        export_pdf : true,
        print : true,
        destroy_all : true,
        restore_all : true,
        import : true
      },
      user : this.$auth.user,

      isStopSearchWarehouse : false,
      isLoadingGetWarehouse : false,
      warehouse_search : '',

      isStopSearchSupplier : false,
      isLoadingGetSupplier : false,
      supplier_search : '',

      warehouse_id : '',
      supplier_id : '', 
    }
  },

//   components : {
//      FormInput,
//      ModalDetail
//   },

  computed : {
    ...mapState('moduleApi',[    
      'lookup_warehouses',
      'lookup_suppliers', 
    ]),

    ...mapState('moduleApi',[
      'data',
      'error',
      'result'
    ]),

    getRoles(){
      if(!this.user.parent_id){
        return this.default_roles;        
      }else{
        let main_role = this.user.group_role.roles.find(item => item.name == "stock_report");

        let roles = {};

        if(JSON.parse(main_role.pivot.operators).includes("all")){
          return this.default_roles;        
        }

        JSON.parse(main_role.pivot.operators).forEach(item => {
          roles[item.replace("-","_")] = true;
        })

        return roles;
      }    
    }
  },

   watch : {
    'parameters.params.warehouse_id' : function(newValue,oldValue){
      if(!newValue){
        this.warehouse_id = '';
      }
    },
    'parameters.params.supplier_id' : function(newValue,oldValue){
       if(!newValue){
        this.supplier_id = '';
      }
    }
  },

  methods : {
    ...mapActions('moduleApi',[
      'getData',
      'deleteData',
      'restoreData',
      'deleteAllData',
      'restoreAllData',
      'lookUp',
    ]),

    ...mapMutations('moduleApi',[
      'set_data'
    ]),

    async onLoad(page = 1){
      if(this.isLoadingData) return;

      this.isLoadingData            = true;
      this.parameters.params.page   = page

      this.parameters.form.checkboxs = [];
      if(document.getElementById("checkAll")){
        document.getElementById("checkAll").checked = false;
      }

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      await this.getData(this.parameters);
      
      if(this.result == true){
        loader.hide();

        if (page == 1) {
            this.$refs['pagination'].generatePage();
        }

        this.$refs['pagination'].active_page = this.parameters.params.page;  
      }else{
        this.$globalErrorToaster(this.$toaster,this.error);
      }

      this.isLoadingData = false;
    },

    onGetWarehouse(search,isNext){      
        if(!search.length && typeof isNext === "function") return false;             

        clearTimeout(this.isStopSearchWarehouse);
        
        this.isStopSearchWarehouse = setTimeout(() => {
            this.warehouse_search = search;

            if(typeof isNext !== "function"){
                this.lookup_warehouses.current_page = isNext 
                    ? this.lookup_warehouses.current_page + 1 
                    : this.lookup_warehouses.current_page - 1;        
            }else{
                this.lookup_warehouses.current_page = 1;
            }

            this.onSearchWarehouse();
        },600);        
    },

    async onSearchWarehouse(){
        if(!this.isLoadingGetWarehouse){
            this.isLoadingGetWarehouse = true;
                    
            await this.lookUp({    
                url : "report/stock/get-warehouse",
                lookup : "warehouses",
                query : "?search="
                    + this.warehouse_search + 
                    "&page="
                    + this.lookup_warehouses.current_page + 
                    "&per_page=10"
            })

            this.isLoadingGetWarehouse = false;      
        }
    },

    onGetSupplier(search,isNext){      
        if(!search.length && typeof isNext === "function") return false;             

        clearTimeout(this.isStopSearchSupplier);
        
        this.isStopSearchSupplier = setTimeout(() => {
            this.supplier_search = search;

            if(typeof isNext !== "function"){
                this.lookup_suppliers.current_page = isNext 
                    ? this.lookup_suppliers.current_page + 1 
                    : this.lookup_suppliers.current_page - 1;        
            }else{
                this.lookup_suppliers.current_page = 1;
            }

            this.onSearchSupplier();
        },600);        
    },

    async onSearchSupplier(){
        if(!this.isLoadingGetSupplier){
            this.isLoadingGetSupplier = true;
                    
            await this.lookUp({    
                url : "report/stock/get-supplier",
                lookup : "suppliers",
                query : "?search="
                    + this.supplier_search + 
                    "&page=" 
                    + this.lookup_suppliers.current_page +
                    "&per_page=10"
            })

            this.isLoadingGetSupplier = false;      
        }
    },

    onSetSupplier(item){  
      this.parameters.params.supplier_id = item ? item.id : '';    
    },

    onSetWarehouse(item){    
      this.parameters.params.warehouse_id = item ? item.id : '';      
    },

  }
}
</script>