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
          title : 'Pembelian',
          sub_title : '  Menampilkan laporan pembelian',
          condition : 'purchaseing',
          url : process.env.API_URL + "/report/tax/get-preview-purchasing"
        },
        {
          icon: 'hand-holding-usd',
          title: 'Penjualan',
          sub_title: '  Menampilkan laporan penjualan',
          condition: 'selling',
          url: process.env.API_URL + "/report/tax/get-preview-selling"
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
