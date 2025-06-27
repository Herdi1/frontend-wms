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
                <table class="table table-striped table-sm vld-parent table-hover"
                  ref="formContainer">
                  <thead>
                    <tr>                              
                      <th>No</th>
                      <th @click="onSort('code',parameters.params.sort == 'asc' ? 'desc' : 'asc')"
                        class="cursor-pointer"
                        style="min-width:100px">
                        <div class="d-flex flex-row justify-content-between align-items-baseline">
                          <div>Kode</div>
                          <div>
                            <i class="fas fa-caret-up"
                              :class="parameters.params.order == 'code' && parameters.params.sort == 'asc' ? '' : 'light-gray'"></i>
                            <i class="fas fa-caret-down"
                              :class="parameters.params.order == 'code' && parameters.params.sort == 'desc' ? '' : 'light-gray'"></i>
                          </div>
                        </div>
                      </th>
                      <th @click="onSort('name',parameters.params.sort == 'asc' ? 'desc' : 'asc')"
                        class="cursor-pointer"
                        style="min-width:100px">
                        <div class="d-flex flex-row justify-content-between align-items-baseline">
                          <div>Nama</div>
                          <div>
                            <i class="fas fa-caret-up"
                              :class="parameters.params.order == 'name' && parameters.params.sort == 'asc' ? '' : 'light-gray'"></i>
                            <i class="fas fa-caret-down"
                              :class="parameters.params.order == 'name' && parameters.params.sort == 'desc' ? '' : 'light-gray'"></i>
                          </div>
                        </div>
                      </th>      
                      <template v-if="raw_data.warehouses">
                        <th v-for="(item,index) in raw_data.warehouses.data"
                          :key="index"
                          style="min-width:120px">
                          <div>{{ item.name }}</div>
                        </th>                            
                      </template>
                      <th v-if="!parameters.params.warehouse_is_last_page"
                        style="min-width:100px">
                        <div v-if="!parameters.params.warehouse_is_loading"
                          class="text-center">                        
                          <a href="#" @click="loadMorePivot">
                            Load More 
                          </a>   
                        </div>
                        <div 
                          class="text-center" 
                          v-else>                  
                          <i class="fas fa-circle-notch fa-spin"></i>
                        </div>
                      </th>                                           
                      <th class="text-center"
                        style="min-width:100px">
                        Total Stok
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :class="{'table-active': ActiveRow == i }" v-for="(item,i) in data" :key="i"  @click="onRowSelected(i)">                     
                      <td>{{ ((parameters.params.page-1) * parameters.params.per_page)+i  + 1 }}</td>
                      <td>{{ item.code }}</td>
                      <td>{{ item.name }}</td>
                      <td v-for="(itemStock,indexStock) in item.stocks"
                        :key="indexStock">
                        {{ parseFloat(itemStock) }}
                      </td>
                      <td v-if="!parameters.params.warehouse_is_last_page"> 
                        <div v-if="!parameters.params.warehouse_is_loading"
                          class="text-center">                        
                          <a href="#" @click="loadMorePivot">
                            . . . 
                          </a>   
                        </div>
                        <div 
                          class="text-center" 
                          v-else>                  
                          <i class="fas fa-circle-notch fa-spin"></i>
                        </div>
                      </td>
                      <td>
                        {{ parseFloat(item.stocks.reduce((itemPrev,itemNext) => itemPrev += parseFloat(itemNext),0.00)) }}
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
          <div class="form-group">
            <label>Gudang Per Page</label>
            <select class="form-control"
              v-model="parameters.params.warehouse_per_page">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>              

          <div class="row">
            <div class="col-md-6 form-group">
              <label>Gudang Kolom</label>
              <select class="form-control"
                v-model="parameters.params.warehouse_order">
                <option value="id">Id</option>
                <option value="name">Nama</option>
              </select>
            </div>

            <div class="col-md-6 form-group">
              <label>Gudang Kolom Order</label>
              <select class="form-control"
                v-model="parameters.params.warehouse_sort">
                <option value="asc">Terkecil</option>
                <option value="desc">Terbesar</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="mb-3"><b>Bentuk</b></div>
              <div class='form-group'>
                <select class="form-control"
                  v-model="parameters.params.shape">
                  <option value="">Pilih</option>
                  <option v-for="(item,index) in spesifications.shape"
                    :key="index"
                    :value="item.name">
                    {{item.name}}
                  </option>
                </select>
              </div>        
            </div>

            <div class="col-md-6">
              <div class="mb-3"><b>Detail 1</b></div>
              <div class="form-group">
                <select class="form-control"
                  v-model="parameters.params.detail_1">
                  <option value="">Pilih</option>
                  <option v-for="(item,index) in spesifications.detail_1"
                    :key="index"
                    :value="item.name">
                    {{item.name}}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="mb-3"><b>Detail 2</b></div>
              <div class="form-group">
                <select class="form-control"
                  v-model="parameters.params.detail_2">
                  <option value="">Pilih</option>
                  <option v-for="(item,index) in spesifications.detail_2"
                    :key="index"
                    :value="item.name">
                    {{item.name}}
                  </option>
                </selecT>
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-3"><b>Finishing</b></div>
              <div class="form-group">
                <select class="form-control"
                  v-model="parameters.params.finishing">
                  <option value="">Pilih</option>
                  <option v-for="(item,index) in spesifications.finishing"
                    :key="index"
                    :value="item.name">
                    {{item.name}}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class='mb-3'><b>Dominan</b></div>
          <div class="form-group">
            <select class="form-control"
              v-model="parameters.params.dominant">
              <option value="">Pilih</option>
              <option v-for="(item,index) in spesifications.dominant"
                :key="index"
                :value="item.name">
                {{item.name}}
              </option>
            </select>
          </div>
        </div>
      </template>
    </filter-section>
    
  </section>
</template>

<script>
import { mapActions,mapState,mapMutations } from 'vuex'

export default {
  middleware : ['checkRoleUser'],

  head() {
    return {
      title: 'Stok',
    }
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  mounted() {
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
      this.$refs["form-option"].isExportFilePdf = false;          
      this.$refs["form-option"].isExportFileExcel = this.getRoles.export_excel;    
    }

    if(this.getRoles.print){
      this.$refs["form-option"].isExportPrint = false;
    }

    this.$axios.get(this.parameters.url + "/get-spesification")
    .then(res => {
      this.spesifications = { 
        ...res.data 
      };
    });  
  },

  data() {
    return {
      title               : 'STOK',
      isLoadingData       : false,
      isPaginate          : true,
      ActiveRow           : null,
      parameters : {
        url : 'inventory/stock',
        type : 'pdf',
        params :{
          soft_deleted : '',
          search      : '',
          order       : 'id',
          sort        : 'desc',
          all         : '',
          per_page    : 10,
          page        : 1,

          shape : '',
          detail_1 : '',
          detail_2 : '',
          finishing : '',
          dominant:  '',

          warehouse_page : 1,
          warehouse_per_page : 10,
          warehouse_order : 'id',
          warehouse_sort : 'desc',
          warehouse_is_loading : false,        
          warehouse_is_last_page : false,
          warehouse_last_id : 0
        },
        default_params : {
          soft_deleted : '',
          search      : '',
          order       : 'id',
          sort        : 'desc',
          all         : '',
          per_page    : 10,
          page        : 1,
      
          shape : '',
          detail_1 : '',
          detail_2 : '',
          finishing : '',
          dominant:  '',

          warehouse_page : 1,
          warehouse_per_page : 10,
          warehouse_order : 'id',
          warehouse_sort : 'desc',
          warehouse_is_loading : false,        
          warehouse_is_last_page : false,
          warehouse_last_id : 0
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

      user : {...this.$auth.user},

      spesifications : {
        shape : [],
        detail_1 : [],
        detail_2 : [],
        finishing : [],
        dominant : []
      }      
    }
  },

  computed : {
    ...mapState('moduleApi',[
      'data',
      'raw_data',
      'error',
      'result'
    ]),

    getRoles(){
      if(!this.user.parent_id){
        return this.default_roles;        
      }else{
        let main_role = this.user.group_role.roles.find(item => item.name == "stock");

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

  methods : {
    ...mapActions('moduleApi',[
      'getData',      
    ]),

    ...mapMutations('moduleApi',[
      'set_data'
    ]),

    async onLoad(page = 1){
      if(this.isLoadingData) return;

      this.isLoadingData            = true;
      this.parameters.params.page   = page;

      this.parameters.params.warehouse_page = 1;
      this.parameters.params.warehouse_is_last_page = false;
      
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
        
        this.parameters.params.warehouse_is_last_page = this.raw_data.warehouses.current_page == this.raw_data.warehouses.last_page
        this.parameters.params.warehouse_last_id = this.raw_data.warehouses.data[this.raw_data.warehouses.data.length-1].id
      }else{
        this.$globalErrorToaster(this.$toaster,this.error);
      }

      this.isLoadingData = false;
    },

    loadMorePivot(){
      if(this.parameters.params.warehouse_is_loading) return;

      let product_ids = this.data.reduce((itemPrev,itemNext) => itemPrev += "product_ids[]="+itemNext.id+"&","");      

      this.parameters.params.warehouse_page += 1;

      this.parameters.params.warehouse_is_loading = true;

      let url = this.parameters.url + 
        "/get-warehouse-stock?warehouse_page=" + 
        this.parameters.params.warehouse_page + 
        "&warehouse_per_page=" + 
        this.parameters.params.warehouse_per_page + 
        "&warehouse_order=" + 
        this.parameters.params.warehouse_order + 
        "&warehouse_sort=" + 
        this.parameters.params.warehouse_sort +
        "&"+ product_ids;

      this.$axios.get(url)
      .then(res => {
        let data = this.data.map(item => {
          let stocks = res.data.warehouse_stocks.find(itemRes => itemRes.product_id == item.id);

          return {
            ...item,
            stocks : [
              ...item.stocks,
              ...stocks.stocks
            ]
          }
        })
      
        this.set_data(data);

        this.raw_data.warehouses.data =  [
          ...this.raw_data.warehouses.data,
          ...res.data.warehouses.data
        ];  

        this.parameters.params.warehouse_last_id = this.raw_data.warehouses.data[this.raw_data.warehouses.data.length-1].id
        this.parameters.params.warehouse_is_last_page = ( res.data.warehouses.current_page == res.data.warehouses.last_page )
      })
      .catch(err => {  
        this.$globalErrorToaster(this.$toaster,err);
      })
      .finally(() => {
        this.parameters.params.warehouse_is_loading = false;
      })
    },

    onSort(column,sort = 'asc'){
      this.parameters.params = {
        ...this.parameters.params,
        order : column,
        sort : sort
      }

      this.onLoad(this.parameters.params.page)
    },   
     onRowSelected(index){
      this.ActiveRow = index;
    }
  }
}
</script>