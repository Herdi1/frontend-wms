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
                        <label for="po_supplier_id">PO</label>
                        <v-select
                          label="code"
                          :loading="isLoadingGetPoSupplier"
                          :options="lookup_po_suppliers.data"
                          :filterable="false"
                          @search="onGetPoSupplier"
                          v-model="parameters.form.po_supplier_id"
                          :disabled="isEditable"
                        >
                        <!-- @input="onSetPoSupplier" -->
                          <template v-slot:option="option">
                            <div class="row">
                              <div class="col-md-5 p-1 m-0">
                                {{ option.code }}
                              </div>
                              <div class="col-md-7 p-1 m-0 text-right">
                                {{
                                  option.supplier ? option.supplier.name : "-"
                                }}
                              </div>
                            </div>
                          </template>
                          <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!parameters.form.po_supplier_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template>
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_po_suppliers.data.length || search"
                          >
                            <span
                              v-if="lookup_po_suppliers.current_page > 1"
                              @click="onGetPoSupplier(search, false)"
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
                                lookup_po_suppliers.last_page >
                                lookup_po_suppliers.current_page
                              "
                              @click="onGetPoSupplier(search, true)"
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
        
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="supplier_id">Supplier</label>
                      <input type="text"
                        class="form-control"
                        :value="parameters.form.po_supplier_id 
                          ? (parameters.form.po_supplier_id.supplier ? parameters.form.po_supplier_id.supplier.name : '-') 
                          : '-'"
                        disabled/>
                    </div>
                  </div>                
                </div>    
            
                <ValidationProvider
                  name="amount"
                  rules="required">
                  <div class="form-group" slot-scope="{errors,valid}">
                    <label for="amount">Dp</label>
                    <money class="form-control"          
                      name="amount"                                              
                      v-model="parameters.form.amount"
                      @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                      :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                    />                 
                    <div class="invalid-feedback" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>                

                <div class="form-group">                 
                  <label for="chart_of_account_id">
                    Kas <span class="text-info">(Jika tidak diisi maka akan mengambil default)</span>
                  </label>                  
                  <v-select
                    label="name"
                    :loading="isLoadingGetChartOfAccount"
                    :options="lookup_chart_of_accounts.data"
                    :filterable="false"
                    @search="onGetChartOfAccount"
                    @input="onSetChartOfAccount"
                    v-model="parameters.form.chart_of_account_id"
                    :disabled="isEditable"
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
                </div>

                <div class="form-group">
                  <label for="address">Keterangan</label>
                  <textarea 
                    class="form-control" 
                    v-model="parameters.form.description"></textarea>
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

      isStopSearchPoSupplier: false,
      isLoadingGetPoSupplier: false,
      po_supplier_search: "",

      isStopSearchChartOfAccount : false,
      isLoadingGetChartOfAccount : false,
      chart_of_account_search : "",

      title: 'Pembelian Dp',      

      parameters : {
        url : 'purchaseing_module/purchaseing_dp',
        form : {
         code : '',
         po_supplier_id : '',              
         chart_of_account_id : "",
         description : '',
         date : '',
         amount : 0       
        }
      }
    };
  },

  async mounted() {
    await this.onSearchPoSupplier();

    await this.onSearchChartOfAccount();

    if (!this.isEditable) {
      this.setCode();
    }
  },

  computed :{
    ...mapState('moduleApi',[
      "lookup_po_suppliers",
      "lookup_chart_of_accounts",
      'error',
      'result',
      'code',
    ]),  
  },

  methods: {    
    ...mapActions('moduleApi',[
       'addData',
       'updateData',
       'getCode',
       'lookUp'
    ]),

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
          url: "purchaseing_module/purchaseing_dp/get-chart-of-account",
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

    async onSubmit(isInvalid){       
      if(isInvalid || this.isLoadingForm) return;            
      
      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form : {
          ...this.parameters.form,
          po_supplier_id : typeof this.parameters.form.po_supplier_id == 'object'
            ? this.parameters.form.po_supplier_id.id 
            : '',         
          chart_of_account_id : typeof this.parameters.form.chart_of_account_id == 'object'
            ? this.parameters.form.chart_of_account_id.id 
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

    onGetPoSupplier(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPoSupplier);

      this.isStopSearchPoSupplier = setTimeout(() => {
        this.po_supplier_search = search;

        if (typeof isNext !== "function") {
          this.lookup_po_suppliers.current_page = isNext
            ? this.lookup_po_suppliers.current_page + 1
            : this.lookup_po_suppliers.current_page - 1;
        } else {
          this.lookup_po_suppliers.current_page = 1;
        }

        this.onSearchPoSupplier();
      }, 600);
    },

    async onSearchPoSupplier() {
      if (!this.isLoadingGetPoSupplier) {
        this.isLoadingGetPoSupplier = true;

        await this.lookUp({
          url: "purchaseing_module/purchaseing_dp/get-po-supplier",
          lookup: "po_suppliers",
          query:
            "?search=" +
            this.po_supplier_search +
            "&page=" +
            this.lookup_po_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPoSupplier = false;
      }
    },

    onSetChartOfAccount(item){
      if(item){
        
      }else{
        this.parameters.form.chart_of_account_id = '';
      }
    }
  }
};
</script>