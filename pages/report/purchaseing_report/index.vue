<template>
  <section class="section">
    <div class="section-body">
      <div class="row">
        <div class="col-12">
          <div class="card p-5">
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col-6 mb-3 p-2"
                    style="cursor:pointer"
                    v-for="item in report_tabs"
                    :class="selected_report == item.condition ? 'bg-success text-white' : ''"
                    @click="selectedReport(item.condition,item.url)">
                    <div class="row">
                      <div class="col-md-2 text-center">
                        <i :class="'fa fa-' + item.icon + ' fa-5x'"></i>
                      </div>
                      <div class="col-md-9">
                        <h5>{{item.title}}</h5>
                        <p>
                         {{item.sub_title}}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mt-3 p-4"
                v-if="selected_report">
                <h6>Filter Laporan : </h6>                
      
                <div class="form-group">
                  <label for="start_date">Periode Awal</label>
                  <input type="date"
                    class="form-control"
                    v-model="filters.start_date"
                  />
                </div>

                <div class="form-group">        
                  <label for="end_date">Periode Akhir</label>
                  <input type="date"
                    class="form-control"
                    v-model="filters.end_date"
                  />
                </div>

                <div class="form-group">
                  <label for="supplier_id">Supplier</label>
                  <v-select           
                    label="name"   
                    :loading="isLoadingGetSupplier"
                    :options="lookup_suppliers.data"
                    :filterable="false"
                    @input="onSetSupplier"
                    @search="onGetSupplier"
                    v-model="filters.supplier"
                    :required="true">                     
                    <template #search="{attributes, events}">
                      <input
                        class="vs__search"
                        :required="!filters.supplier"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>        
                    <li slot-scope="{search}" slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_suppliers.data.length || search">
                      <span v-if="lookup_suppliers.current_page > 1" 
                        @click="onGetSupplier(search,false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Sebelumnya</span>
                      <span v-if="lookup_suppliers.last_page > lookup_suppliers.current_page" 
                        @click="onGetSupplier(search,true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Selanjutnya</span>
                    </li> 
                  </v-select>   
                </div>

                <div class="form-group">
                  <label for="user_id">Pengguna</label>
                  <v-select           
                    label="username"   
                    :loading="isLoadingGetUser"
                    :options="lookup_users.data"
                    :filterable="false"
                    @input="onSetUser"
                    @search="onGetUser"
                    v-model="filters.user"
                    :required="true">                     
                    <template #search="{attributes, events}">
                      <input
                        class="vs__search"
                        :required="!filters.user"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>        
                    <li slot-scope="{search}" slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_users.data.length || search">
                      <span v-if="lookup_users.current_page > 1" 
                        @click="onGetUser(search,false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Sebelumnya</span>
                      <span v-if="lookup_users.last_page > lookup_users.current_page" 
                        @click="onGetUser(search,true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Selanjutnya</span>
                    </li> 
                  </v-select>   
                </div>

                <div class="row">
                  <div class="form-group col-md-4">
                    <label for="transaction_type">Pembayaran</label>
                    <select class="form-control" 
                      v-model="filters.transaction_type">
                      <option value="">Pilih</option>
                      <option value="CASH">CASH</option>
                      <option value="CREDIT">CREDIT</option>
                    </select>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="discount_type">Discount</label>
                    <select class="form-control" 
                      v-model="filters.discount_type">
                      <option value="">Pilih</option>
                      <option value="PERCENT">PERSEN</option>
                      <option value="NOMINAL">NOMINAL</option>
                    </select>
                  </div>
                  
                  <div class="form-group col-md-4">
                    <label for="discount_type">Sudah lunas/bayar</label>
                    <select class="form-control" 
                      v-model="filters.is_paid">
                      <option value="">Pilih</option>
                      <option value="0">Belum</option>
                      <option value="1">Sudah</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label for="is_show_detail_transaction">Tampilkan Detail Transaksi</label>
                  <select class="form-control" 
                    v-model="filters.is_show_detail_transaction">            
                    <option value="0">Tidak</option>
                    <option value="1">Ya</option>
                  </select>
                </div>
                
                <button class="btn btn-primary"
                  @click="onPreview">
                  Preview
                </button>

                <button class="btn btn-success"
                  @click="onDownload('excel')">
                  Download Excel
                </button>

                <button class="btn btn-success"
                  @click="onDownload('pdf')">
                  Download Pdf
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions,mapState } from 'vuex'

export default {  
  middleware : ['checkRoleUser'],

  head() {
    return {
      title: 'Laporan Pembelian',
    }
  },


  async mounted(){
    await this.onSearchSupplier();
    await this.onSearchUser();
  },

  computed :{
    ...mapState('moduleApi',[
      'lookup_suppliers',
      'lookup_users'
    ]),  
  },

  data(){
    return {
      report_tabs : [        
        {
          icon : 'hand-holding-usd',
          title : 'Laporan Pembelian',
          sub_title : '  Menampilkan laporan pembelian',
          condition : 'purchaseing',
          url : process.env.API_URL + "/report/purchaseing/get-preview"
        }
      ],
    
      isStopSearchSupplier : false,
      isLoadingGetSupplier :  false,
      supplier_search : '',

      isStopSearchUser : false,
      isLoadingGetUser :  false,
      user_search : '',

      selected_report : null,

      filters : {
        url : '',
        supplier_id : '',
        user_id : '',
        supplier : '',
        user : '',
        transaction_type : '',
        discount_type : '',
        is_paid : '',
        start_date : '',
        end_date : '',
        is_show_detail_transaction : '0'
      },

      filters_default : {
        url : '',
        supplier_id : '',
        user_id : '',
        supplier : '',
        user : '',
        transaction_type : '',
        discount_type : '',
        is_paid : '',
        start_date : '',
        end_date : '',
        is_show_detail_transaction : '0'
      }
    }
  },

  methods : {
    ...mapActions('moduleApi',[
       'lookUp'
    ]),

    selectedReport(selected_report,url){
      this.filters = {
        ...this.filters_default,
        url
      };

      this.selected_report = selected_report;
    },

    onDownload(type){
      var token = this.$cookiz
        .get(('auth._token.local'))
        .replace('Bearer ','');      

      let qs = "";

      Object.keys(this.filters).forEach(item => {
          qs += "&" + item + "=" + this.filters[item] ;                    
      });

      window.open(
        this.filters.url + "/export/" + type + "?token=" + token + qs
        ,'_blank'
      );    
    },

    onPreview(){
      var token = this.$cookiz
        .get(('auth._token.local'))
        .replace('Bearer ','');      

      let qs = "";

      Object.keys(this.filters).forEach(item => {
          qs += "&" + item + "=" + this.filters[item] ;                    
      });

      window.open(
        this.filters.url + "?token=" + token + qs
        ,'_blank'
      );    
    },


    onGetSupplier(search,isNext){      
      if(!search.length && typeof isNext === "function") return false;             

      clearTimeout(this.isStopSearchSupplier);
      
      this.isStopSearchSupplier= setTimeout(() => {
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
        url : "report/purchaseing/get-supplier",
          lookup  : 'suppliers',
          query : "?search="+this.supplier_search+"&page="+this.lookup_suppliers.current_page+"&per_page=10"
        })

        this.isLoadingGetSupplier = false;      
      }
    },

    onSetSupplier(item){
      if(item){
        this.filters.supplier_id = item.id;
      }else{
        this.filters.supplier_id = '';
      }
    },

    onGetUser(search,isNext){      
      if(!search.length && typeof isNext === "function") return false;             

      clearTimeout(this.isStopSearchUser);
      
      this.isStopSearchUser= setTimeout(() => {
        this.user_search = search;

        if(typeof isNext !== "function"){
          this.lookup_users.current_page = isNext 
            ? this.lookup_users.current_page + 1 
            : this.lookup_users.current_page - 1;        
        }else{
          this.lookup_users.current_page = 1;
        }

        this.onSearchUser();
      },600);        
    },

    async onSearchUser(){
      if(!this.isLoadingGetUser){
        this.isLoadingGetUser = true;
                
        await this.lookUp({    
        url : "report/purchaseing/get-user",
          lookup  : 'users',
          query : "?search="+this.user_search+"&page="+this.lookup_users.current_page+"&per_page=10"
        })

        this.isLoadingGetUser = false;      
      }
    },

    onSetUser(item){
      if(item){
        this.filters.user_id = item.id;
      }else{
        this.filters.user_id = '';
      }
    }
  }
}
</script>
