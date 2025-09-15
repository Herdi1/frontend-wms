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
                  <label for="customer_group">Group Pelanggan</label>
                  <select class="form-control"
                    v-model="filters.customer_group_id">
                    <option value="">Pilih</option>
                    <option v-for="item in lookup_customer_groups.data"
                      :key="item.id"
                      :value="item.id">
                      {{item.name}}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="seller_id">Sales</label>
                  <v-select           
                    label="name"   
                    :loading="isLoadingGetSeller"
                    :options="lookup_sellers.data"
                    :filterable="false"
                    @input="onSetSeller"
                    @search="onGetSeller"
                    v-model="filters.seller"
                    :required="true">                     
                    <template #search="{attributes, events}">
                      <input
                        class="vs__search"
                        :required="!filters.seller"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>        
                    <li slot-scope="{search}" slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_sellers.data.length || search">
                      <span v-if="lookup_sellers.current_page > 1" 
                        @click="onGetSeller(search,false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Sebelumnya</span>
                      <span v-if="lookup_sellers.last_page > lookup_sellers.current_page" 
                        @click="onGetSeller(search,true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Selanjutnya</span>
                    </li> 
                  </v-select>   
                </div>

                <div class="form-group"
                  v-if="selected_report == 'customer_receivable'">
                  <label for="start_date">Periode Awal</label>
                  <input type="date"
                    class="form-control"
                    v-model="filters.start_date"
                  />
                </div>

                <div class="form-group"
                  v-if="selected_report == 'customer_receivable'">
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
      title: 'Laporan Pelanggan',
    }
  },

  async mounted(){
    await this.onSearchSeller();
    
    await this.lookUp({    
      url : "report/customer/get-customer-group",
      lookup  : 'customer_groups',
      query : ""
    })    
  },

  computed :{
    ...mapState('moduleApi',[
      'lookup_sellers',
      'lookup_customer_groups'
    ]),  
  },

  data(){
    return {
      report_tabs : [
        {
          icon : 'user',
          title : 'Laporan Pelanggan',
          sub_title : ' Menampilkan laporan pelanggan',
          condition : 'customer',
          url : process.env.API_URL + "/report/customer/get-preview"
        },   
        {
          icon : 'dollar-sign',
          title : 'Laporan Piutang Pelanggan',
          sub_title : '  Menampilkan laporan piutang pelanggan',
          condition : 'customer_receivable',
          url : process.env.API_URL + "/report/customer/get-preview-receivable"
        }
      ],

      isStopSearchSeller : false,
      isLoadingGetSeller :  false,
      seller_search : '',
  
      selected_report : null,

      filters : {
        url : '',
        customer_group_id : '',
        seller : '',
        seller_id : '',
        start_date : '',
        end_date : ''
      },

      filters_default : {
        url : '',
        customer_group_id : '',
        seller : '',
        seller_id : '',
        start_date : '',
        end_date : ''
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

    onGetSeller(search,isNext){      
      if(!search.length && typeof isNext === "function") return false;             

      clearTimeout(this.isStopSearchSeller);
      
      this.isStopSearchSeller= setTimeout(() => {
        this.seller_search = search;

        if(typeof isNext !== "function"){
          this.lookup_sellers.current_page = isNext 
            ? this.lookup_sellers.current_page + 1 
            : this.lookup_sellers.current_page - 1;        
        }else{
          this.lookup_sellers.current_page = 1;
        }

        this.onSearchSeller();
      },600);        
    },

    async onSearchSeller(){
      if(!this.isLoadingGetSeller){
        this.isLoadingGetSeller = true;
                
        await this.lookUp({    
        url : "report/customer/get-seller",
          lookup  : 'sellers',
          query : "?search="+this.seller_search+"&page="+this.lookup_sellers.current_page+"&per_page=10"
        })

        this.isLoadingGetSeller = false;      
      }
    },

    onSetSeller(item){
      if(item){
        this.filters.seller_id = item.id;
      }else{
        this.filters.seller_id = '';
      }
    }
  }
}
</script>
