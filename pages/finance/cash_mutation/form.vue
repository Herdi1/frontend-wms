<template>
  <portal to="modal">
    <div class="modal fade" 
      aria-hidden="true" 
      id="modal-form">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

        <modal-header-section
          :self="this"
        />

        <ValidationObserver
          v-slot="{invalid,validate}"
          ref="form-validate">
            <form @submit.prevent="validate().then(onSubmit(invalid))"
              autocomplete="off">

            <div class="modal-body">              
                <ValidationProvider
                    name="code"
                    rules="required">
                    <div class="form-group" slot-scope="{errors,valid}">
                        <label for="code">Kode</label>
                        <input id="code"
                            type="text"
                            class="form-control"
                            name="code"
                            v-model="parameters.form.code"
                            :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                            disabled
                            />

                        <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                        </div>      
                    </div>
                </ValidationProvider>                                      

                <div class="row m-0 p-0">        
                  <div class="col-md-6 p-0 m-0">
                    <div class="form-group">
                      <label for="from_id">Dari Master Akun</label>
                      <v-select           
                        label="name"   
                        :loading="isLoadingGetChartOfAccountFrom"
                        :options="lookup_chart_of_account_froms.data"
                        :filterable="false"
                        @search="onGetChartOfAccountFrom"
                        @input="onSetChartOfAccountFrom"
                        v-model="parameters.form.from_id"                      
                        :required="true"
                        :disabled="isEditable">
                        <template #search="{attributes, events}">
                          <input
                            class="vs__search"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>        
                        <li slot-scope="{search}" slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_chart_of_account_froms.data.length || search">
                          <span v-if="lookup_chart_of_account_froms.current_page > 1" 
                            @click="onGetChartOfAccountFrom(search,false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Sebelumnya</span>
                          <span v-if="lookup_chart_of_account_froms.last_page > lookup_chart_of_account_froms.current_page" 
                            @click="onGetChartOfAccountFrom(search,true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Selanjutnya</span>
                        </li> 
                      </v-select>   
                    </div>
                  </div>
                  <div class="col-md-6 p-0 m-0">
                    <div class="form-group">
                      <label for="from_id">Ke Master Akun</label>
                      <v-select           
                        label="name"   
                        :loading="isLoadingGetChartOfAccountTo"
                        :options="lookup_chart_of_account_tos.data"
                        :filterable="false"
                        @search="onGetChartOfAccountTo"
                        @input="onSetChartOfAccountTo"
                        v-model="parameters.form.to_id"
                        :required="true"
                        :disabled="isEditable">
                        <template #search="{attributes, events}">
                          <input
                            class="vs__search"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>        
                        <li slot-scope="{search}" slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_chart_of_account_tos.data.length || search">
                          <span v-if="lookup_chart_of_account_tos.current_page > 1" 
                            @click="onGetChartOfAccountTo(search,false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Sebelumnya</span>
                          <span v-if="lookup_chart_of_account_tos.last_page > lookup_chart_of_account_tos.current_page" 
                            @click="onGetChartOfAccountTo(search,true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Selanjutnya</span>
                        </li> 
                      </v-select>   
                    </div>
                  </div>  
                </div>                                                                  

              <ValidationProvider
                name="date"
                rules="required">
                <div class="form-group" slot-scope="{errors,valid}">
                  <label for="date">Tgl</label>
                  <input id="date"
                    type="date"
                    class="form-control"
                    name="date"
                    v-model="parameters.form.date"
                    :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                  />               
                  <div class="invalid-feedback" v-if="errors[0]">
                    {{ errors[0] }}
                  </div>
                </div>
              </ValidationProvider>  

              <div class="form-group">
                <label for="description">Keterangan</label>
                <textarea class="form-control" v-model="parameters.form.description"></textarea>
              </div>          

              <ValidationProvider
                name="amount"
                rules="required">
                <div class="form-group" slot-scope="{errors,valid}">
                  <label for="amount">Nominal Mutasi</label>
                  <money v-model="parameters.form.amount"
                      class="form-control"                                                                       
                      @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                      :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                  />                             
                  <div class="invalid-feedback" v-if="errors[0]">
                    {{ errors[0] }}
                  </div>
                </div>
              </ValidationProvider>  
            </div>
        
            <modal-footer-section     
              :isLoadingForm="isLoadingForm"
            />
          </form>
        </ValidationObserver>

        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapActions,mapState } from 'vuex'

export default {  
  middleware : ["isNotAccessable"],

  props: ["self"],

  data() {
    return {
      isEditable  : true,
      isLoadingForm : false,

      title: 'Mutasi Kas',      

      isStopSearchChartOfAccountFrom : false,
      isLoadingGetChartOfAccountFrom :  false,
      chart_of_account_from_search : '',

      isStopSearchChartOfAccountTo : false,
      isLoadingGetChartOfAccountTo :  false,
      chart_of_account_to_search : '',

      parameters : {
        url : 'finance/cash_mutation',
        form : {
        code : "",
          from_id : "",
          to_id : "",
          date : moment().format("YYYY-MM-DD"),
          description  : "",
          amount : 0.00  
        }
      }
    };
  },

  computed :{
    ...mapState('moduleApi',[
      'error',
      'result',
      'code',
      'lookup_chart_of_account_froms',
      'lookup_chart_of_account_tos'
    ]),  
  },


  async mounted() {
    await this.onSearchChartOfAccountFrom();

    await this.onSearchChartOfAccountTo();
  },


  methods: {    
    ...mapActions('moduleApi',[
      'updateData',
      'addData',
      'getCode',
      'lookUp'
    ]),

    onGetChartOfAccountFrom(search,isNext){      
      if(!search.length && typeof isNext === "function") return false;             

      clearTimeout(this.isStopSearchChartOfAccountFrom);
      
      this.isStopSearchChartOfAccountFrom = setTimeout(() => {
        this.chart_of_account_from_search = search;

        if(typeof isNext !== "function"){
          this.lookup_chart_of_account_froms.current_page = isNext 
            ? this.lookup_chart_of_account_froms.current_page + 1 
            : this.lookup_chart_of_account_froms.current_page - 1;        
        }else{
          this.lookup_chart_of_account_froms.current_page = 1;
        }

        this.onSearchChartOfAccountFrom();
      },600);        
    },

    async onSearchChartOfAccountFrom(){
      if(!this.isLoadingGetChartOfAccountFrom){
        this.isLoadingGetChartOfAccountFrom = true;
                
        await this.lookUp({    
          url : "finance/cash_mutation/get-chart-of-account",
          lookup  : 'chart_of_account_froms',
          query : "?search=" + this.chart_of_account_from_search +
          "&page=" + this.lookup_chart_of_account_froms.current_page +
          "&per_page=10"
        })

        this.isLoadingGetChartOfAccountFrom = false;      
      }
    },

    onGetChartOfAccountTo(search,isNext){      
      if(!search.length && typeof isNext === "function") return false;             

      clearTimeout(this.isStopSearchChartOfAccountTo);
      
      this.isStopSearchChartOfAccountTo = setTimeout(() => {
        this.chart_of_account_to_search = search;

        if(typeof isNext !== "function"){
          this.lookup_chart_of_account_tos.current_page = isNext 
            ? this.lookup_chart_of_account_tos.current_page + 1 
            : this.lookup_chart_of_account_tos.current_page - 1;        
        }else{
          this.lookup_chart_of_account_tos.current_page = 1;
        }

        this.onSearchChartOfAccountTo();
      },600);        
    },

    async onSearchChartOfAccountTo(){
      if(!this.isLoadingGetChartOfAccountTo){
        this.isLoadingGetChartOfAccountTo = true;
                
        await this.lookUp({    
          url : "finance/cash_mutation/get-chart-of-account",
          lookup  : 'chart_of_account_tos',
          query : "?search=" + this.chart_of_account_to_search +
          "&page=" + this.lookup_chart_of_account_tos.current_page +
          "&per_page=10"
        })

        this.isLoadingGetChartOfAccountTo = false;      
      }
    },

    onSetChartOfAccountFrom(item){
      if(item){
        if(this.parameters.form.to_id){
          if(this.parameters.form.to_id.id === this.parameters.form.from_id.id){
            this.$toaster.error("Data dari master akun harus tidak sama dengan ke master akun")
            this.parameters.form.from_id = '';
          }
        }
      }else{
        this.parameters.form.from_id = '';
      }
    },

    onSetChartOfAccountTo(item){
      if(item){
        if(this.parameters.form.from_id){
          if(this.parameters.form.from_id.id === this.parameters.form.to_id.id){
            this.$toaster.error("Data ke master akun harus tidak sama dengan dari master akun")
            this.parameters.form.to_id = '';
          }
        }
      }else{
        this.parameters.form.to_id = '';
      }
    },

    async setCode(){            
      await this.getCode({
        url : this.parameters.url,        
      });

      this.parameters.form.code = this.code;
    },

    async onSubmit(isInvalid){       
      if(isInvalid || this.isLoadingForm) return;            
      
      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form : {
          ...this.parameters.form,         
          from_id : typeof this.parameters.form.from_id == 'object'
            ? this.parameters.form.from_id.id 
            : '',
          to_id : typeof this.parameters.form.to_id == 'object'
            ? this.parameters.form.to_id.id 
            : ''
        }
      }

      if(this.isEditable){
        await this.updateData(parameters)
      }else{ 
        await this.addData(parameters)
      }

      if (this.result == true) {      
        this.self.onLoad(this.self.parameters.params.page);  
        this.$toaster.success('Data berhasil di Diedit');
        window.$("#modal-form").modal("hide");
      }else {
        this.$globalErrorToaster(this.$toaster,this.error);      
      }

      this.isLoadingForm = false;
    }  
  },
};
</script>
