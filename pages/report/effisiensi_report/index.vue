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
                  <label for="user_id">SN</label>
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
                <div class="form-group">
                      <label for="transaction_type">Pembayaran</label>
                      <select class="form-control" 
                        v-model="filters.location_id">
                        <option value="">Pilih</option>
                        <option value="2">Weaving 1</option>
                        <option value="3">Weaving 2</option>
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
      title: 'Laporan Effisiensi',
    }
  },


  async mounted(){
    await this.onSearchSupplier();
    await this.onSearchUser();
    await this.onSearchProduction();

  },

  computed :{
    ...mapState('moduleApi',[
      'lookup_suppliers',
      'lookup_users',
      "lookup_custom1",
    ]),  
  },

  data(){
    return {
      report_tabs : [        
        {
          icon : 'hand-holding-usd',
          title : 'Laporan Effisiensi per Kontruksi',
          sub_title : '  Menampilkan laporan effisisensi per konstruksi',
          condition : 'perkonstruksi',
          url : process.env.API_URL + "/report/machine_counter/get-counter-konstruksi"
        },
        {
          icon: 'hand-holding-usd',
          title: 'Laporan Efisiensi Harian',
          sub_title: '  Menampilkan laporan efisiensi',
          condition: 'production',
          url: process.env.API_URL + "/report/manufactur/get-produksi-harian"
        }
      ],
      
      isStopSearchProduction: false,
      isLoadingGetProduction: false,
      production_search: "",
    
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

    onSetProduction(item) {
      if (item) {
        this.filters.production_detail_id = item.id;
      } else {
        this.filters.production_detail_id = '';
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
