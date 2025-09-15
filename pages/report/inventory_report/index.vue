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
      
                  <div class="form-group" v-if="selected_report != 'pemakaian_barang_batch' && selected_report == 'cogs'">
                    <label for="start_date">Periode</label>
                    <input type="month"
                      class="form-control"
                      v-model="filters.periode"
                    />
                  </div>

                <div class="form-group" v-if="selected_report != 'pemakaian_barang_batch' && selected_report != 'cogs'">
                  <label for="start_date">Periode Awal</label>
                  <input type="date"
                    class="form-control"
                    v-model="filters.start_date"
                  />
                </div>

                <div class="form-group" v-if="selected_report != 'pemakaian_barang_batch' && selected_report != 'cogs'">        
                  <label for="end_date">Periode Akhir</label>
                  <input type="date"
                    class="form-control"
                    v-model="filters.end_date"
                  />
                </div>

                <div class="form-group"
                    v-if="selected_report == 'pemakaian_barang_batch'">
                    <label for="product_id">SN</label>
                    <v-select
                          label="no_batch"
                          :loading="isLoadingGetProduction"
                          :options="lookup_custom1.data"
                          :filterable="false"
                          @input="onSetProduction"
                          @search="onGetProduction"
                          v-model="filters.production_detail"
                        >
                          <template v-slot:option="option">
                          
                                {{ option.no_batch }}
                            
                          </template>
                          <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!filters.production_detail"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template>
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_custom1.data.length || search"
                          >
                            <a
                              v-if="lookup_custom1.current_page > 1"
                              @click="onGetProduction(search, false)"
                              class="flex-fill bg-primary text-white text-center"
                              href="#"
                              >Sebelumnya</a
                            >
                            <a
                              v-if="lookup_custom1.last_page >
                                lookup_custom1.current_page
                                "
                              @click="onGetProduction(search, true)"
                              class="flex-fill bg-primary text-white text-center"
                              href="#"
                              >Selanjutnya</a
                            >
                          </li>
                        </v-select>
                  </div>
  
                  <div class="form-group"
                      v-if="selected_report == 'pemakaian_barang_batch' || selected_report == 'cogs'">
                      <label for="product_id">Process</label>
                      <v-select
                                  label="name"
                                  :loading="isLoadingGetProces"
                                  :options="lookup_proces.data"
                                  :filterable="false"
                                  @input="onSetProces"
                                  @search="onGetProces"
                                  v-model="filters.master_proces"
                                >
                                  <template v-slot:option="option">
                                    <div class="row">
                                      <div class="col-md-5 p-1 m-0">
                                        {{ option.code }}
                                      </div>
                                      <div class="col-md-7 p-1 m-0 text-right">
                                        {{ option.name }}
                                      </div>
                                    </div>
                                  </template>
                                  <template #search="{ attributes, events }">
                                    <input
                                      class="vs__search"
                                      :required="!filters.master_proces"
                                      v-bind="attributes"
                                      v-on="events"
                                    />
                                  </template>
                                  <li
                                    slot-scope="{ search }"
                                    slot="list-footer"
                                    class="d-flex justify-content-between"
                                    v-if="lookup_proces.data.length || search"
                                  >
                                    <span
                                      v-if="lookup_proces.current_page > 1"
                                      @click="onGetProces(search, false)"
                                      class="
                                  flex-fill
                                  bg-primary
                                  text-white text-center
                                "
                                      style="cursor: pointer"
                                      >Sebelumnya</span
                                    >
                                    <span
                                      v-if="lookup_proces.last_page >
                                        lookup_proces.current_page
                                        "
                                      @click="onGetProces(search, true)"
                                      class="
                                  flex-fill
                                  bg-primary
                                  text-white text-center
                                "
                                      style="cursor: pointer"
                                      >Selanjutnya</span
                                    >
                                  </li>
                                </v-select>
                    </div>

                

                <div class="form-group"
                  v-if="selected_report != 'cogs' && selected_report != 'pemakaian_barang_batch'">
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
                    v-if="selected_report == 'pemakaian_barang' && selected_report != 'pemakaian_barang_batch'">
                    <label for="product_spesification_id">Jenis Pemakaian</label>
                    <select class="form-control" 
                        v-model="filters.jenis">
                        <option value="">Pilih</option>
                        <option value="1">Pemakaian WIP</option>
                        <option value="2">Pemakaian Bahan Penolong</option>
                        <option value="3">Pemakaian Lain-lain</option>

                      </select>
                  </div>

                
                
                <button class="btn btn-primary"
                  @click="onPreview">
                  Preview
                </button>

                <button class="btn btn-success"
                  @click="onDownload('excel')" v-if="selected_report != 'pemakaian_barang_batch' && selected_report != 'cogs'">
                  Download Excel
                </button>

                <button class="btn btn-success"
                  @click="onDownload('pdf')" v-if="selected_report != 'pemakaian_barang_batch' && selected_report != 'cogs'">
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
    await this.onSearchProduction();
    await this.onSearchProces();

  },

  computed :{
    ...mapState('moduleApi',[
      'lookup_customers',
      'lookup_users',
      'lookup_products',
      'lookup_product_groups',
      "lookup_custom1",
      "lookup_proces",

    ]),  
  },

  data(){
    return {
      report_tabs : [        
        // {
        //   icon : 'dollar-sign',
        //   title : 'Laporan ',
        //   sub_title : '  Menampilkan laporan penjualaan',
        //   condition : 'selling',
        //   url : process.env.API_URL + "/report/selling/get-preview"
        // },
        //  {
        //   icon : 'chart-bar',
        //   title : 'Laporan Profit Penjualaan',
        //   sub_title : '  Menampilkan laporan profit penjualaan',
        //   condition : 'selling_profit',
        //   url : process.env.API_URL + "/report/selling/get-preview-profit"
        // },
        // {
        //   icon : 'list',
        //   title : 'Laporan Penjualan Produk/Pelanggan',
        //   sub_title : 'Menampilkan Laporan Penjualaan Produk Dan Pelanggan',
        //   condition : 'selling_product_and_customer',
        //   url : process.env.API_URL + "/report/selling/get-preview-customer-and-product"
        // },
        // {
        //   icon : 'list-alt',
        //   title : "Laporan Penjualan Produk Terjual",
        //   sub_title : "Menampilkan Laporan Penjualaan Produk Terjual",
        //   condition : 'selling_sale',
        //   url : process.env.API_URL + "/report/selling/get-preview-sale"
        // },
        {
          icon: 'chart-bar',
          title: "Laporan Pemakaian Barang",
          sub_title: "Menampilkan Laporan Pemakaian Barang Produksi",
          condition: 'pemakaian_barang',
          url: process.env.API_URL + "/report/pemakaian_barang/get-pemakaian-barang"
        },
        {
          icon: 'list-alt',
          title: "Laporan Pemakaian / Biaya",
          sub_title: "Menampilkan Laporan Pemakaian Barang / Biaya per Batch",
          condition: 'pemakaian_barang_batch',
          url: process.env.API_URL + "/report/pemakaian_barang/get-pemakaian-barang-batch"
        },
        {
          icon: 'list-alt',
          title: "COGS Produksi",
          sub_title: "Menampilkan COGS Produksi",
          condition: 'cogs',
          url: process.env.API_URL + "/report/pemakaian_barang/get-cogs-produksi"
        },
      ],

      isStopSearchProduction: false,
      isLoadingGetProduction: false,
      production_search: "",

      isStopSearchProces: false,
      isLoadingGetProces: false,
      proces_search: "",
    
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

        transaction_type: '',
        production_detail_id: '',
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
        production_detail_id: '',
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

    onGetProces(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProces);

      this.isStopSearchProces = setTimeout(() => {
        this.proces_search = search;

        if (typeof isNext !== "function") {
          this.lookup_proces.current_page = isNext
            ? this.lookup_proces.current_page + 1
            : this.lookup_proces.current_page - 1;
        } else {
          this.lookup_proces.current_page = 1;
        }

        this.onSearchProces();
      }, 600);
    },

    async onSearchProces() {
      if (!this.isLoadingGetProces) {
        this.isLoadingGetProces = true;

        await this.lookUp({
          url: "setting/masterprocess",
          lookup: "proces",
          query:
            "?search=" + this.proces_search +
            "&page=" + this.lookup_proces.current_page +
            "&per_page=10&sort=asc",
        });

        this.isLoadingGetProces = false;
      }
    },

     onGetProduction(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProduction);

      this.isStopSearchProduction = setTimeout(() => {
        this.production_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchProduction();
      }, 600);
    },

    async onSearchProduction() {
      if (!this.isLoadingGetProduction) {
        this.isLoadingGetProduction = true;

        await this.lookUp({
          url: "manufactur/productionproses/get-konstruksi",
          lookup: "custom1",
          query:
            "?search=" + this.production_search +
            "&page=" + this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProduction = false;
      }
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

    onSetProduction(item) {
      if (item) {
        this.filters.production_detail_id = item.id;
      } else {
        this.filters.production_detail_id = '';
      }
    },

    onSetProces(item) {
      if (item) {
        this.filters.master_proces_id = item.id;
      } else {
        this.filters.master_proces_id = '';
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
