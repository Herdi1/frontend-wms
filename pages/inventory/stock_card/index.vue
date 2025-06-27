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
                      <th>Tgl</th>
                      <th>Kode</th>
                      <th>Nama</th>
                      <th class="text-info">Saldo Awal</th>  
                      <th class="text-primary">Masuk</th>
                      <th class="text-danger">Keluar</th>   
                      <th class="text-primary">Saldo Akhir</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>           
                    <tr v-if="data.length">
                      <td>{{data[0] ? data[0].date : '-'}}</td>
                      <td>{{product_id ? product_id.code : '-'}}</td>
                      <td style="font-size:10px !important">
                        Product : {{ product_id ? product_id.name : '-' }}
                        <br/>
                        Gudang : {{ warehouse_id ? warehouse_id.name : '-' }}
                      </td>
                      <td class="text-info">{{raw_data.first_balance ? raw_data.first_balance.saldo : '' }}</td>
                      <td class="text-success"></td>
                      <td class="text-danger"></td>
                      <td class="text-primary">{{raw_data.first_balance ? raw_data.first_balance.saldo : '' }}</td>
                      <td>-</td>
                    </tr>

                    <tr :class="{'table-active': ActiveRow == i }" v-for="(item,i) in data" :key="i"  @click="onRowSelected(i)">                                           
                      <td>{{ item.date }}</td>
                      <td>{{ item.product ? item.product.code : '-' }}</td>
                      <td>
                        Product : {{ item.product ? item.product.name : '-' }}
                        <br/>
                        Gudang : {{ item.warehouse ? item.warehouse.name : '-' }}
                      </td>
                      <td class="text-info">{{ item.saldo > 0 ? item.saldo : '' }}</td>
                      <td class="text-success">{{ item.in > 0 ? item.in : ''}}</td>
                      <td class="text-danger">{{ item.out > 0 ? item.out : ''}}</td> 
                      <td class="text-primary">{{ item.last_balance > 0 ? item.last_balance: '' }}</td>
                      <td>
                          <button class="btn btn-sm btn-primary"
                            @click="onDetail(item)"
                            v-if="getRoles.show">
                            <i class="fas fa-info-circle"></i>
                          </button>
                      </td>
                    </tr>

                    <tr v-if="data.length">
                      <td>{{data[data.length-1] ? data[data.length-1].date : '-'}}</td>
                      <td>{{product_id ? product_id.code : '-'}}</td>
                      <td>
                        Product : {{ product_id ? product_id.name : '-' }}
                        <br/>
                        Gudang : {{ warehouse_id ? warehouse_id.name : '-' }}
                      </td>
                      <td class="text-info"></td>
                      <td class="text-success"></td>
                      <td class="text-danger"></td>
                      <td class="text-primary">
                        {{ last_balance }}
                      </td>
                      <td>-</td>
                    </tr>
                  </tbody>

                  <table-data-loading-section
                    :self="this"
                  />

                  <table-data-not-found-section
                    :self="this"
                  />

                  <tr v-if="data && raw_data.current_page != raw_data.last_page">
                    <td colspan="10"
                      class="text-center">
                      <button class="btn btn-link" 
                        @click="loadMoreStock">Selanjutnya</button>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- end table -->
        
            </div>
          </div>
        </div>
      </div>
    </div>
        
    <ModalDetail
      :self="this"
      ref="modal-detail"
    />

    <filter-section
      :self="this"
      ref="form-filter">
      <template>
        <div class="col-md-12">

          <div class="mb-3"><b>Periode Awal</b></div>
          <div class="form-group">
            <input type="date"
              class="form-control"
              v-model="parameters.params.start_date"/>          
          </div>

          <div class="mb-3"><b>Periode Akhir</b></div>
          <div class="form-group">
            <input type="date"
              class="form-control"
              v-model="parameters.params.end_date"/>          
                
          </div>

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

          <div class="mb-3"><b>Produk</b></div>
          <div class="form-group">
              <v-select                           
                label="name"   
                :loading="isLoadingGetProduct"
                :options="lookup_products.data"
                :filterable="false"
                @search="onGetProduct"
                @input="onSetProduct"
                v-model="product_id">              
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
                    :required="!product_id"
                    v-bind="attributes"
                    v-on="events"
                    />
                </template>   
                <li slot-scope="{search}" slot="list-footer"
                    class="d-flex justify-content-between"
                    v-if="lookup_products.data.length || search">
                    <span v-if="lookup_products.current_page > 1" 
                        @click="onGetProduct(search,false)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor:pointer">Sebelumnya</span>
                    <span v-if="lookup_products.last_page > lookup_products.current_page" 
                        @click="onGetProduct(search,true)"
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
import { mapActions,mapState } from 'vuex'
import ModalDetail from "./detail";

export default {
  middleware : ['checkRoleUser'],

  head() {
    return {
      title: 'Kartu Stok',
    }
  },

  created() {
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
      this.$refs["form-option"].isExportPrint = true;
    }

    this.$refs["form-option"].isSearching = false;
    this.$refs["form-option"].isShowingPage = false;

    await this.onSearchWarehouse();

    await this.onSearchProduct();
  },

  data() {
    return {
      data : [],
      raw_data : [],
      ActiveRow : null,
      title               : 'KARTU STOK',
      isLoadingData       : false,
      isPaginate          : true,
      parameters : {
        url : 'inventory/stock_card',
        type : 'pdf',
        params :{
          soft_deleted : '',
          search      : '',
          order       : 'id',
          sort        : 'asc',
          all         : '',
          per_page    : 30,
          page        : 1,

          start_date  : '',
          end_date    : '',
          warehouse_id : '',
          product_id  : ''
        },
        default_params : {
          soft_deleted : '',
          search      : '',
          order       : 'id',
          sort        : 'asc',
          all         : '',
          per_page    : 30,
          page        : 1,

          start_date  : '',
          end_date    : '',
          warehouse_id : '',
          product_id  : ''
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

      isStopSearchWarehouse : false,
      isLoadingGetWarehouse : false,
      warehouse_search : '',

      isStopSearchProduct : false,
      isLoadingGetProduct : false,
      product_search : '',

      warehouse_id : '',
      product_id : '', 
    }
  },

  components : {
    ModalDetail,
  },

  computed : {
    ...mapState('moduleApi',[    
      'lookup_warehouses',
      'lookup_products', 
    ]),
    
    getRoles(){
      if(!this.user.parent_id){
        return this.default_roles;        
      }else{
        let main_role = this.user.group_role.roles.find(item => item.name == "stock_card");

        let roles = {};

        if(JSON.parse(main_role.pivot.operators).includes("all")){
          return this.default_roles;        
        }

        JSON.parse(main_role.pivot.operators).forEach(item => {
          roles[item.replace("-","_")] = true;
        })

        return roles;
      }    
    },

    last_balance(){
      let inAndOut = this.data.reduce((itemPrev,itemNext) => {
        itemPrev += parseFloat(itemNext.in) - parseFloat(itemNext.out)
        return itemPrev;
      },0.00) 
    
      let last_balance = (
        parseFloat(this.raw_data.first_balance ? this.raw_data.first_balance.saldo : 0.00) 
        + parseFloat(inAndOut)
      );
      
      return last_balance;
    }
  },

  watch : {
    'parameters.params.warehouse_id' : function(newValue,oldValue){
      if(!newValue){
        this.warehouse_id = '';
      }
    },
    'parameters.params.product_id' : function(newValue,oldValue){
       if(!newValue){
        this.product_id = '';
      }
    }
  },

  methods : {
    ...mapActions('moduleApi',[
      'lookUp',
    ]),

    async onLoad(page = 1){
      if(this.isLoadingData) return;

      this.isLoadingData = true;

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
      
      let url = this.parameters.url + 
        "?page=1" +
        "&warehouse_id=" + this.parameters.params.warehouse_id +
        "&product_id=" + this.parameters.params.product_id + 
        "&start_date=" + this.parameters.params.start_date + 
        "&end_date=" + this.parameters.params.end_date;

      this.$axios.get(url)
      .then(res => {             
        let newLastBalance = parseFloat(res.data.first_balance ? res.data.first_balance.saldo : 0.00);

        let newData = res.data.data.map(item => {
          newLastBalance = parseFloat(newLastBalance) + parseFloat(item.in) - parseFloat(item.out);          

          return {
            ...item,
            last_balance : newLastBalance
          }
        })

        this.raw_data =  res.data;
        this.data = newData;      
      })
      .catch(err => {
        this.$globalErrorToaster(this.$toaster,err);
      })      
      .finally(() => {
        loader.hide();  
        this.isLoadingData = false;
      })
    },

    loadMoreStock(){      
      if(this.isLoadingData) return;
      
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      this.parameters.params.page += 1;

      this.isLoadingData = true;

      let url = this.parameters.url + 
        "?page=" + this.parameters.params.page +
        "&warehouse_id=" + this.parameters.params.warehouse_id +
        "&product_id=" + this.parameters.params.product_id + 
        "&start_date=" + this.parameters.params.start_date + 
        "&end_date=" + this.parameters.params.end_date;

      this.$axios.get(url)
      .then(res => {
        let newData = [
          ...this.data,
          ...res.data.data
        ];      

        let newLastBalance = parseFloat(res.data.first_balance ? res.data.first_balance.saldo : 0.00);

        let newMapData = newData.map(item => {
          newLastBalance = parseFloat(newLastBalance) + parseFloat(item.in) - parseFloat(item.out);
          
          return {
            ...item,
            last_balance : newLastBalance
          }
        })

        this.data = newMapData;
        this.raw_data.current_page += 1;
      })
      .catch(err => {
        this.$globalErrorToaster(this.$toaster,err);
      })
      .finally(() => {
        loader.hide();
        this.isLoadingData = false;
      })
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
                url : "inventory/stock_card/get-warehouse",
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

    onGetProduct(search,isNext){      
        if(!search.length && typeof isNext === "function") return false;             

        clearTimeout(this.isStopSearchProduct);
        
        this.isStopSearchProduct = setTimeout(() => {
            this.product_search = search;

            if(typeof isNext !== "function"){
                this.lookup_products.current_page = isNext 
                    ? this.lookup_products.current_page + 1 
                    : this.lookup_products.current_page - 1;        
            }else{
                this.lookup_products.current_page = 1;
            }

            this.onSearchProduct();
        },600);        
    },

    async onSearchProduct(){
        if(!this.isLoadingGetProduct){
            this.isLoadingGetProduct = true;
                    
            await this.lookUp({    
                url : "inventory/stock_card/get-product",
                lookup : "products",
                query : "?search="
                    + this.product_search + 
                    "&page=" 
                    + this.lookup_products.current_page +
                    "&per_page=10"
            })

            this.isLoadingGetProduct = false;      
        }
    },

    onSetProduct(item){  
      this.parameters.params.product_id = item ? item.id : '';    
    },

    onSetWarehouse(item){    
      this.parameters.params.warehouse_id = item ? item.id : '';      
    },

    onDetail(item){
      this.$refs["modal-detail"].parameters.form = {
        ...item
      };

      window.$("#modal-detail").modal("show");
    },   
     onRowSelected(index){
      this.ActiveRow = index;
    }
  }
}
</script>