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
                  <div class="form-group">
                    <label for="selling_id">Penjualaan</label>
                    <input type="text"
                      class="form-control"
                      :value="parameters.form.selling_id ? parameters.form.selling_id.code : '-'"
                      disabled/>
                  </div>
                </div>      
              </div>            

                <div class="row">        
                  <div class="col-md-6">
                    <ValidationProvider
                        name="date"
                        rules="required">          
                        <div class="form-group" slot-scope="{errors,valid}">
                            <label for="date">Tgl</label>
                            <input type="date" 
                                class="form-control"
                                name="date"
                                v-model="parameters.form.date"                                    
                                :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"/>

                            <div class="invalid-feedback" v-if="errors[0]">
                                {{ errors[0] }}
                            </div>                       
                        </div>
                    </ValidationProvider>
                  </div>
        
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="customer_id">Pelanggan</label>
                      <input type="text"
                        class="form-control"
                        :value="parameters.form.selling_id ? (parameters.form.selling_id.customer ? parameters.form.selling_id.customer.name : '-') : '-'"
                        disabled=/>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="debt">Piutang</label>
                      <span v-if="parameters.form.selling_id">
                        <money class="form-control"          
                          v-model="parameters.form.selling_id.grand_total"
                          disabled
                        />        
                      </span>
                      <span v-else>
                        <input type="text"
                          class="form-control" 
                          value="0.00"
                          disabled
                        />
                      </span>
                    </div>
                  </div>
                </div>    
            
                <div class="form-group" >
                  <label for="debt">Kekurangan</label>
                  <span v-if="parameters.form.selling_id">
                    <money class="form-control"          
                      v-model="parameters.form.selling_id.receivable"
                      disabled
                    />                                                
                  </span>
                  <span v-else>
                    <input type="text"
                      class="form-control" 
                      value="0.00"
                      disabled
                    />
                  </span>
                </div>

                <ValidationProvider
                  name="amount"
                  rules="required">
                  <div class="form-group" slot-scope="{errors,valid}">
                    <label for="amount">Bayar</label>
                    <money class="form-control"          
                      name="amount"                                              
                      v-model="parameters.form.amount"
                      @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                      :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                      @keyup.native="changeAmount"
                    />                 
                    <div class="invalid-feedback" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <div class="form-group"
                  v-if="parameters.form.amount > 0.00">
                  <label for="rest_of_debt">Sisa Hutang</label>
                   <money class="form-control"          
                      v-model="parameters.form.rest_of_receivable"
                   />          
                </div>

                <div class="form-group">
                    <label for="chart_of_account_id">
                      Kas
                    </label> 

                    <v-select
                      label="name"
                      :loading="isLoadingGetChartOfAccount"
                      :options="lookup_chart_of_accounts.data"
                      :filterable="false"
                      @search="onGetChartOfAccount"
                      @input="onSetChartOfAccount"
                      v-model="parameters.form.chart_of_account_id"                    
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
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="d-flex justify-content-between"
                        v-if="lookup_chart_of_accounts.data.length || search"
                      >
                        <span
                          v-if="lookup_chart_of_accounts.current_page > 1"
                          @click="onGetChartOfAccount(search, false)"
                          class="
                            flex-fill
                            bg-primary
                            text-white text-center
                          "
                          style="cursor: pointer"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_chart_of_accounts.last_page >
                            lookup_chart_of_accounts.current_page
                          "
                          @click="onGetChartOfAccount(search, true)"
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

                    <div class="text-info">*Jika tidak diisi maka akan mengambil default</div>
                </div>

                <div class="form-group">
                  <label for="address">Keterangan</label>
                  <textarea class="form-control" v-model="parameters.form.description"></textarea>
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
      isEditable  : false,

      isLoadingForm : false,

      title: 'Piutang',      

      isStopSearchChartOfAccount : false,
      isLoadingGetChartOfAccount : false,
      chart_of_account_search : "",

      parameters : {
        url : 'selling_module/receivable_payment',
        form : {
         code : '',
         selling_id : '',        
         chart_of_account_id : '',
         rest_of_receivable : 0,
         description : '',
         date : '',
         amount : 0       
        }
      }
    };
  },

  async mounted(){
    await this.onSearchChartOfAccount();
  },

  computed :{
    ...mapState('moduleApi',[
      'error',
      'result',
      'code',
      'lookup_chart_of_accounts',
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
          selling_id : typeof this.parameters.form.selling_id == 'object'
            ? this.parameters.form.selling_id.id 
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
        url : this.parameters.url
      });

      this.parameters.form.code = this.code;
    },

    changeAmount(){
      if(this.parameters.form.selling_id){
        if(this.parameters.form.selling_id.receivable < this.parameters.form.amount){
          this.parameters.form.amount = this.parameters.form.selling_id.receivable;
        }

        this.parameters.form.rest_of_receivable = parseFloat(this.parameters.form.selling_id.receivable) - parseFloat(this.parameters.form.amount);
      }        
    },


    onGetChartOfAccount(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchChartOfAccount);

      this.isStopSearchChartOfAccount = setTimeout(() => {
        this.chart_of_account_search = search;

        if (typeof isNext !== "function") {
          this.lookup_chart_of_accounts.current_page = isNext
            ? this.lookup_chart_of_accounts.current_page + 1
            : this.lookup_chart_of_accounts.current_page - 1;
        } else {
          this.lookup_chart_of_accounts.current_page = 1;
        }

        this.onSearchChartOfAccount();
      }, 600);
    },

    async onSearchChartOfAccount() {
      if (!this.isLoadingGetChartOfAccount) {
        this.isLoadingGetChartOfAccount = true;

        await this.lookUp({
          url: "selling_module/receivable_payment/get-chart-of-account",
          lookup: "chart_of_accounts",
          query:
            "?search=" +
            this.chart_of_account_search +
            "&page=" +
            this.lookup_chart_of_accounts.current_page +
            "&per_page=10" 
        });

        this.isLoadingGetChartOfAccount = false;
      }
    },

    onSetChartOfAccount(item){
      if(!item){
        this.parameters.form.chart_of_account_id = '';
      }
    }
  }
};
</script>