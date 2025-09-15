<template>
  <portal to="modal">
    <div class="modal fade" 
      aria-hidden="true" 
      id="modal-form">
      <div class="modal-dialog modal-md">
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

              <div class="row">
                <div class="col-md-6">
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
                </div>

                <div class="col-md-6">
                  <ValidationProvider
                    name="name"
                    rules="required">
                    <div class="form-group" slot-scope="{errors,valid}">
                      <label for="name">Nama</label>
                      <input id="name"
                        type="text"
                        class="form-control"
                        name="name"
                        v-model="parameters.form.name"
                        :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                      />               
                      <div class="invalid-feedback" v-if="errors[0]">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                </div>        
              </div>      

               <div class="row">        
                <div 
                  class="col-md-6">
                    <ValidationProvider
                      name="type"
                      rules="required">
                      <div class="form-group" slot-scope="{errors,valid}">            
                        <label for="type">Type</label>
                        <select class="form-control" 
                          v-model="parameters.form.type"
                          @change="onChangeType"
                          :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')">
                          <option value="">Pilih</option>
                          <option v-for="(type,indexType) in types"
                            :key="indexType"
                            :value="type.value">
                            {{type.title}}
                          </option>
                        </select>
                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>            
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="chart_of_account_id">Untuk Master Akun</label>
                      <v-select           
                        label="name"   
                        :loading="isLoadingGetChartOfAccount"
                        :options="lookup_chart_of_accounts.data"
                        :filterable="false"
                        @search="onGetChartOfAccount"
                        @input="onSetChartOfAccount"
                        v-model="parameters.form.chart_of_account_id"
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
                          v-if="lookup_chart_of_accounts.data.length || search">
                          <span v-if="lookup_chart_of_accounts.current_page > 1" 
                            @click="onGetChartOfAccount(search,false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Sebelumnya</span>
                          <span v-if="lookup_chart_of_accounts.last_page > lookup_chart_of_accounts.current_page" 
                            @click="onGetChartOfAccount(search,true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Selanjutnya</span>
                        </li> 
                      </v-select>   
                  </div>
                </div>                 
              </div>

              <ValidationProvider
                name="rule_name"
                rules="required">
                <div class="form-group" slot-scope="{errors,valid}">    
                  <label for="rule_name">Rule Nama</label>
                  <select name="rule_name"
                    v-model="parameters.form.rule_name"
                    class="form-control"
                    :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"> 
                    <option value="">Pilih</option>
                    <option v-for="(item,i) in rules"
                      :value="item">
                      {{ item }}
                    </option>
                  </select>

                  <div class="invalid-feedback" v-if="errors[0]">
                    {{ errors[0] }}
                  </div>
                </div>
              </ValidationProvider>

              <div class="form-group">
                <label for="is_default">Default</label>
                <select name="is_default"
                  v-model="parameters.form.is_default"
                  class="form-control">
                  <option value="1">Ya</option>
                  <option value="0">Tidak</option>
                </select>
              </div>           
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
      isStopSearchChartOfAccount : false,
      isLoadingGetChartOfAccount :  false,
      chart_of_account_search : '',

      isEditable  : false,
      isLoadingForm : false,
      title: 'Master Akun Transaksi',      
      parameters : {
        url : 'finance/chart_of_account_transaction',
        form : {
         code : '',
         name : '',
         rule_name : '',
         chart_of_account_id : '',
         type : '',
         is_default : 0,
        }
      },
      rules : [],
      types : [
          {value : "PURCHASEING",title : "Pembeliaan"},                            
          {value : "PURCHASEING_DP",title : "Pembeliaan Dp"},      
          {value : "DEBT_PAYMENT",title : "Pembayaran Hutang"},            
          {value : "SELLING",title : "Penjualaan"},        
          {value : "SELLING_DP",title : "Penjualaan Dp"},           
          {value : "SELLING_RETURN",title : "Penjualaan Return"},            
          {value : "RECEIVABLE_PAYMENT",title : "Pembayaran Piutang"},            
          {value : "STOCK_IN",title : "Stok Masuk"},                      
          {value : "STOCK_OUT",title : "Stok Keluar"},        
          {value : "STOCK_BROKEN",title : "Stok Rusak"},        
          { value: "STOCK_OPNAME", title: "Stok Opname" },
          { value: "PEMAKAIAN_BARANG", title: "Pemakaian Barang" }
                  
      ]
    };
  },

  computed :{
    ...mapState('moduleApi',[
      'error',
      'result',
      'code',
      'lookup_chart_of_accounts'    
    ]),  
  },

  methods: {    
    ...mapActions('moduleApi',[
       'addData',
       'updateData',
       'getCode',
       'lookUp'
    ]),

    async onSubmit(isInvalid){       
      if(isInvalid || this.isLoadingForm) return;            
      
      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form : {
          ...this.parameters.form,
          chart_of_account_id : typeof this.parameters.form.chart_of_account_id == 'object'
            ? this.parameters.form.chart_of_account_id.id 
            : '',       
        }
      }

      if(this.isEditable){
        await this.updateData(parameters)
      }else{ 
        await this.addData(parameters)
      }

      if (this.result == true) {      
        this.self.onLoad(this.self.parameters.params.page);  

        this.$toaster.success('Data berhasil di '+ (this.isEditable == true ? 'Diedit': 'Tambah'));

        window.$("#modal-form").modal("hide");
      }else {
        this.$globalErrorToaster(this.$toaster,this.error);      
      }

      this.isLoadingForm = false;
    },

    async setCode(){            
      await this.getCode({
        url : this.parameters.url,       
        query : ""
      });

      this.parameters.form.code = this.code;
    },

    onGetChartOfAccount(search,isNext){      
      if(!search.length && typeof isNext === "function") return false;             

      clearTimeout(this.isStopSearchChartOfAccount);
      
      this.isStopSearchChartOfAccount = setTimeout(() => {
        this.chart_of_account_search = search;

        if(typeof isNext !== "function"){
          this.lookup_chart_of_accounts.current_page = isNext 
            ? this.lookup_chart_of_accounts.current_page + 1 
            : this.lookup_chart_of_accounts.current_page - 1;        
        }else{
          this.lookup_chart_of_accounts.current_page = 1;
        }

        this.onSearchChartOfAccount();
      },600);        
    },

    async onSearchChartOfAccount(){
      if(!this.isLoadingGetChartOfAccount){
        this.isLoadingGetChartOfAccount = true;
                
        await this.lookUp({    
          url : "finance/chart_of_account_transaction/get-chart-of-account",
          lookup  : 'chart_of_accounts',
          query : "?search=" + this.chart_of_account_search +
          "&page=" + this.lookup_chart_of_accounts.current_page +
          "&per_page=10"
        })

        this.isLoadingGetChartOfAccount = false;      
      }
    },

    onSetChartOfAccount(item){
      if(item){             
      }else{
        this.parameters.form.chart_of_account_id = '';
      }
    },

    onChangeType(isInit = true){
      if(isInit){
        this.parameters.form.rule_name = '';
      }
      
      this.$axios.get("/finance/chart_of_account_transaction/get-rule",{
        params : {
          type : this.parameters.form.type 
        }
      })
      .then(res => {
        this.rules = res.data;
      });
    }
  },
};
</script>
