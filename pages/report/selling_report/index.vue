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

                <div class="form-group"
                  v-if="selected_report != 'selling_sale'">
                  <label for="customer_id">Pelanggan</label>
                  <v-select           
                    label="name"   
                    :loading="isLoadingGetCustomer"
                    :options="lookup_customers.data"
                    :filterable="false"
                    @input="onSetCustomer"
                    @search="onGetCustomer"
                    v-model="filters.customer"
                    :required="true">                     
                    <template #search="{attributes, events}">
                      <input
                        class="vs__search"
                        :required="!filters.customer"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>        
                    <li slot-scope="{search}" slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_customers.data.length || search">
                      <span v-if="lookup_customers.current_page > 1" 
                        @click="onGetCustomer(search,false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Sebelumnya</span>
                      <span v-if="lookup_customers.last_page > lookup_customers.current_page" 
                        @click="onGetCustomer(search,true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Selanjutnya</span>
                    </li> 
                  </v-select>   
                </div>

                <div class="form-group"
                v-if="selected_report != 'selling_product_and_customer' && selected_report != 'selling_sale'">
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

                <div class="form-group"
                  v-if="selected_report == 'selling_product_and_customer'">
                  <label for="product_id">Produk</label>
                  <v-select           
                    label="name"   
                    :loading="isLoadingGetProduct"
                    :options="lookup_products.data"
                    :filterable="false"
                    @input="onSetProduct"
                    @search="onGetProduct"
                    v-model="filters.product"
                    :required="true">                     
                    <template #search="{attributes, events}">
                      <input
                        class="vs__search"
                        :required="!filters.product"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>        
                    <li slot-scope="{search}" slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_products.data.length || search">
                      <span v-if="lookup_products.current_page > 1" 
                        @click="onGetProduct(search,false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Sebelumnya</span>
                      <span v-if="lookup_products.last_page > lookup_products.current_page" 
                        @click="onGetProduct(search,true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Selanjutnya</span>
                    </li> 
                  </v-select>   
                </div>

                <div class="form-group"
                  v-if="selected_report == 'selling_sale'">
                  <label for="product_spesification_id">Produk Group</label>
                  <v-select           
                    label="name"   
                    :loading="isLoadingGetProductGroup"
                    :options="lookup_product_groups.data"
                    :filterable="false"
                    @input="onSetProductGroup"
                    @search="onGetProductGroup"
                    v-model="filters.product_group"
                    :required="true">                     
                    <template #search="{attributes, events}">
                      <input
                        class="vs__search"
                        :required="!filters.product_group"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>        
                    <li slot-scope="{search}" slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_product_groups.data.length || search">
                      <span v-if="lookup_product_groups.current_page > 1" 
                        @click="onGetProductGroup(search,false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Sebelumnya</span>
                      <span v-if="lookup_product_groups.last_page > lookup_product_groups.current_page" 
                        @click="onGetProductGroup(search,true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Selanjutnya</span>
                    </li> 
                  </v-select>   
                </div>

                <div class="row"
                  v-if="selected_report != 'selling_product_and_customer' && selected_report != 'selling_sale'">
                  <div class="form-group col-md-4">
                    <label for="transaction_type">Pembayaran</label>
                    <select class="form-control" 
                      v-model="filters.transaction_type">
                      <option value="">Pilih</option>
                      <option value="CASH">Weaving 1</option>
                      <option value="CREDIT">Weaving 2</option>
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

                <div class="form-group"
                  v-if="selected_report != 'selling_profit' && selected_report != 'selling_product_and_customer' && selected_report != 'selling_sale'">
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
      title: 'Laporan Penjualaan',
    }
  },


  async mounted(){
    await this.onSearchCustomer();
    await this.onSearchUser();
    await this.onSearchProduct();
    await this.onSearchProductGroup();
  },

  computed :{
    ...mapState('moduleApi',[
      'lookup_customers',
      'lookup_users',
      'lookup_products',
      'lookup_product_groups'
    ]),  
  },

  data(){
    return {
      report_tabs : [        
        {
          icon : 'dollar-sign',
          title : 'Laporan Penjualaan',
          sub_title : '  Menampilkan laporan penjualaan',
          condition : 'selling',
          url : process.env.API_URL + "/report/selling/get-preview"
        },
         {
          icon : 'chart-bar',
          title : 'Laporan Profit Penjualaan',
          sub_title : '  Menampilkan laporan profit penjualaan',
          condition : 'selling_profit',
          url : process.env.API_URL + "/report/selling/get-preview-profit"
        },
        {
          icon : 'list',
          title : 'Laporan Penjualan Produk/Pelanggan',
          sub_title : 'Menampilkan Laporan Penjualaan Produk Dan Pelanggan',
          condition : 'selling_product_and_customer',
          url : process.env.API_URL + "/report/selling/get-preview-customer-and-product"
        },
        {
          icon : 'list-alt',
          title : "Laporan Penjualan Produk Terjual",
          sub_title : "Menampilkan Laporan Penjualaan Produk Terjual",
          condition : 'selling_sale',
          url : process.env.API_URL + "/report/selling/get-preview-sale"
        }
      ],
    
      isStopSearchCustomer : false,
      isLoadingGetCustomer :  false,
      customer_search : '',

      isStopSearchUser : false,
      isLoadingGetUser :  false,
      user_search : '',

      isStopSearchProduct : false,
      isLoadingGetProduct : false,
      product_search : '',

      isStopSearchProductGroup : false,
      isLoadingGetProductGroup : false,
      product_group_search : '',

      selected_report : null,

      filters : {
        url : '',

        customer_id : '',
        user_id : '',
        product_id : '',
        product_spesification_id : '',

        customer : '',
        user : '',
        product : '',
        product_group : '',

        transaction_type : '',
        discount_type : '',
        is_paid : '',
        start_date : '',
        end_date : '',
        is_show_detail_transaction : '0',        
      },

      filters_default : {
       url : '',
        customer_id : '',
        user_id : '',
        product_id : '',
        product_spesification_id : '',

        customer : '',
        user : '',
        product : '',
        product_group : '',

        transaction_type : '',
        discount_type : '',
        is_paid : '',
        start_date : '',
        end_date : '',
        is_show_detail_transaction : '0',        
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


    onGetCustomer(search,isNext){      
      if(!search.length && typeof isNext === "function") return false;             

      clearTimeout(this.isStopSearchCustomer);
      
      this.isStopSearchCustomer= setTimeout(() => {
        this.customer_search = search;

        if(typeof isNext !== "function"){
          this.lookup_customers.current_page = isNext 
            ? this.lookup_customers.current_page + 1 
            : this.lookup_customers.current_page - 1;        
        }else{
          this.lookup_customers.current_page = 1;
        }

        this.onSearchCustomer();
      },600);        
    },

    async onSearchCustomer(){
      if(!this.isLoadingGetCustomer){
        this.isLoadingGetCustomer = true;
                
        await this.lookUp({    
        url : "report/selling/get-customer",
          lookup  : 'customers',
          query : "?search="+this.customer_search+"&page="+this.lookup_customers.current_page+"&per_page=10"
        })

        this.isLoadingGetCustomer = false;      
      }
    },

    onSetCustomer(item){
      if(item){
        this.filters.customer_id = item.id;
      }else{
        this.filters.customer_id = '';
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
        url : "report/selling/get-user",
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
        url : "report/selling/get-product",
          lookup  : 'products',
          query : "?search="+this.product_search+"&page="+this.lookup_products.current_page+"&per_page=10"
        })

        this.isLoadingGetProduct = false;      
      }
    },
    
    onSetProduct(item){
      if(item){
        this.filters.product_id = item.id;
      }else{
        this.filters.product_id = '';
      }
    },

    onGetProductGroup(search,isNext){      
      if(!search.length && typeof isNext === "function") return false;             

      clearTimeout(this.isStopSearchProductGroup);
      
      this.isStopSearchProductGroup = setTimeout(() => {
        this.product_group_search = search;

        if(typeof isNext !== "function"){
          this.lookup_product_groups.current_page = isNext 
            ? this.lookup_product_groups.current_page + 1 
            : this.lookup_product_groups.current_page - 1;        
        }else{
          this.lookup_product_groups.current_page = 1;
        }

        this.onSearchProductGroup();
      },600);        
    },

    async onSearchProductGroup(){
      if(!this.isLoadingGetProductGroup){
        this.isLoadingGetProductGroup = true;
                
        await this.lookUp({    
        url : "report/selling/get-product-group",
          lookup  : 'product_groups',
          query : "?search="+this.product_group_search+"&page="+this.lookup_product_groups.current_page+"&per_page=10"
        })

        this.isLoadingGetProductGroup = false;      
      }
    },
    
    onSetProductGroup(item){
      if(item){
        this.filters.product_group_id = item.id;
      }else{
        this.filters.product_group_id = '';
      }
    }
  }
}
</script>
