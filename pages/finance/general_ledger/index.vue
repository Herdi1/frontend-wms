<template>
  <section class="section">
    <div class="section-body">
      <div class="row">
        <div class="col-12 col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <list-option-section
                  :self="this"
                  ref="form-option"/>
              </div>            

              <!-- start table -->
              <div class="table-responsive">          
                <table class="table table-striped table-sm vld-parent table-hover"
                  ref="formContainer">
                  <thead>
                    <tr>                              
                      <th>Tgl</th>
                      <th>Kode</th>
                      <th>Nama</th>
                      <th class="text-info">Saldo Awal</th>  
                      <th class="text-primary">Kredit</th>
                      <th class="text-danger">Debit</th>   
                      <th class="text-primary">Saldo Akhir</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>           
                    <tr v-if="data.length">
                      <td>
                        {{data[0] ? data[0].date : '-'}}
                      </td>
                      <td>
                        {{chart_of_account_id ? chart_of_account_id.code : '-'}}
                      </td>
                      <td style="font-size:10px !important">                
                        {{chart_of_account_id ? chart_of_account_id.name : '-'}}
                      </td>
                      <td class="text-info">
                        {{raw_data.first_balance ? raw_data.first_balance.saldo : '' }}
                      </td>
                      <td class="text-success"></td>
                      <td class="text-danger"></td>
                      <td class="text-primary">
                        {{raw_data.first_balance ? raw_data.first_balance.saldo : '' }}
                      </td>
                      <td>-</td>
                    </tr>

                    <tr :class="{'table-active': ActiveRow == i }" v-for="(item,i) in data" :key="i"  @click="onRowSelected(i)">                                           
                      <td>{{ item.date }}</td>
                      <td>
                        {{ item.chart_of_account ? item.chart_of_account.code : '-' }}
                      </td>
                      <td>                    
                         {{ item.chart_of_account ? item.chart_of_account.name : "-" }}
                      </td>
                      <td class="text-info">
                        {{ item.saldo > 0 ? item.saldo : '' }}
                      </td>
                      <td class="text-success">
                        {{ item.credit > 0 ? item.credit : ''}}
                      </td>
                      <td class="text-danger">
                        {{ item.debit > 0 ? item.debit : ''}}
                      </td> 
                      <td class="text-primary">
                        {{ item.last_balance ? item.last_balance: '' }}
                      </td>
                      <td>
                          <button class="btn btn-sm btn-primary"
                            @click="onDetail(item)"
                            v-if="getRoles.show">
                            <i class="fas fa-info-circle"></i>
                          </button>
                      </td>
                    </tr>

                    <tr v-if="data.length">
                      <td>
                        {{data[data.length-1] ? data[data.length-1].date : '-'}}
                      </td>
                      <td>
                        {{chart_of_account_id ? chart_of_account_id.code : '-'}}
                      </td>
                      <td>                    
                        {{chart_of_account_id ? chart_of_account_id.name : '-'}}
                      </td>
                      <td class="text-info"></td>
                      <td class="text-success"></td>
                      <td class="text-danger"></td>
                      <td class="text-primary">
                        {{ last_balance }}
                      </td>
                      <td>-</td>
                    </tr>
                  </tbody>

                  <table-data-loading-section
                    :self="this"
                  />

                  <table-data-not-found-section
                    :self="this"
                  />

                  <tr v-if="data && raw_data.current_page != raw_data.last_page">
                    <td colspan="10"
                      class="text-center">
                      <button class="btn btn-link" 
                        @click="loadMoreStock">Selanjutnya</button>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- end table -->
        
            </div>
          </div>
        </div>
      </div>
    </div>
        
    <ModalDetail
      :self="this"
      ref="modal-detail"
    />

    <filter-section
      :self="this"
      ref="form-filter">
      <template>
        <div class="col-md-12">

          <div class="mb-3"><b>Periode Awal</b></div>
          <div class="form-group">
            <input type="date"
              class="form-control"
              v-model="parameters.params.start_date"/>          
          </div>

          <div class="mb-3"><b>Periode Akhir</b></div>
          <div class="form-group">
            <input type="date"
              class="form-control"
              v-model="parameters.params.end_date"/>          
                
          </div>        

          <div class="mb-3"><b>Master Akun</b></div>
          <div class="form-group">
              <v-select                           
                label="name"   
                :loading="isLoadingGetChartOfAccount"
                :options="lookup_chart_of_accounts.data"
                :filterable="false"
                @search="onGetChartOfAccount"
                @input="onSetChartOfAccount"
                v-model="chart_of_account_id">              
                <template v-slot:option="option">                    
                    <div class="row">
                        <div class="col-md-5 p-1 m-0">
                        {{ option.name }}
                        </div>
                        <div class="col-md-7 p-1 m-0 text-right">
                            {{ option.code }}
                        </div>
                    </div>
                </template> 
                <template #search="{attributes, events}">
                    <input
                    class="vs__search"
                    :required="!chart_of_account_id"
                    v-bind="attributes"
                    v-on="events"
                    />
                </template>   
                <li slot-scope="{search}" slot="list-footer"
                    class="d-flex justify-content-between"
                    v-if="lookup_chart_of_accounts.data.length || search">
                    <span v-if="lookup_chart_of_accounts.current_page > 1" 
                        @click="onGetChartOfAccount(search,false)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor:pointer">Sebelumnya</span>
                    <span v-if="lookup_chart_of_accounts.last_page > lookup_chart_of_accounts.current_page" 
                        @click="onGetChartOfAccount(search,true)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor:pointer">Selanjutnya</span>
                </li> 
            </v-select>  
          </div>
          
        </div>      
      </template>
    </filter-section>
    
  </section>
</template>

<script>
import { mapActions,mapState } from 'vuex'
import ModalDetail from "./detail";

export default {
  middleware : ['checkRoleUser'],

  head() {
    return {
      title: 'Buku Besar',
    }
  },

  created() {
    this.onLoad();
  },

  async mounted(){
    this.$refs["form-option"].isAddData = false;
    this.$refs["form-option"].isMaintenancePage = false;
    this.$refs['form-option'].isFilter          = true;
    this.$refs["form-option"].isExport          = true;
    this.$refs["form-option"].isExportFile      = false;
    this.$refs["form-option"].isExportPrint     = false;

    if(
      this.getRoles.destroy || 
      this.getRoles.destroy_all || 
      this.getRoles.restore || 
      this.getRoles.restore_all
    ){
      this.$refs["form-option"].isMaintenancePage = false;
    }
    
    if(this.getRoles.store){
      this.$refs["form-option"].isAddData = false;
    }

    if(this.getRoles.export){
      this.$refs["form-option"].isExportFile = true;
      
      this.$refs["form-option"].isExportFilePdf = true;          
      this.$refs["form-option"].isExportFileExcel = true;

      if("export_pdf" in this.getRoles || "export_excel" in this.getRoles){
        this.$refs["form-option"].isExportFilePdf = this.getRoles.export_pdf;          
        this.$refs["form-option"].isExportFileExcel = this.getRoles.export_excel;          
      }
    }

    if(this.getRoles.print){
      this.$refs["form-option"].isExportPrint = true;
    }

    this.$refs["form-option"].isSearching = false;
    this.$refs["form-option"].isShowingPage = false;

    await this.onSearchChartOfAccount();
  },

  data() {
    return {
      data : [],
      raw_data : [],
      ActiveRow : null,
      title               : 'BUKU BESAR',
      isLoadingData       : false,
      isPaginate          : true,
      parameters : {
        url : 'finance/general_ledger',
        type : 'pdf',
        params :{
          soft_deleted : '',
          search      : '',
          order       : 'id',
          sort        : 'asc',
          all         : '',
          per_page    : 30,
          page        : 1,

          start_date  : '',
          end_date    : '',
          chart_of_account_id  : ''
        },
        default_params : {
          soft_deleted : '',
          search      : '',
          order       : 'id',
          sort        : 'asc',
          all         : '',
          per_page    : 30,
          page        : 1,

          start_date  : '',
          end_date    : '',
          chart_of_account_id  : ''
        },
        form : {
          checkboxs : []
        },
        loadings : {
          isDelete  : false,
          isRestore : false,
        }
      },
      default_roles : {
        store : true,
        update : true,
        destroy : true,
        restore : true,
        show : true,
        export : true,
        export_excel : true,
        export_pdf : true,
        print : true,
        destroy_all : true,
        restore_all : true,
        import : true
      },
      user : {...this.$auth.user},

      isStopSearchChartOfAccount : false,
      isLoadingGetChartOfAccount : false,
      chart_of_account_search : '',

      chart_of_account_id : '',

      passiva_types : ["MODAL","KEWAJIBAN","PENDAPATAN"],
    }
  },

  components : {
    ModalDetail,
  },

  computed : {
    ...mapState('moduleApi',[    
      'lookup_chart_of_accounts',  
    ]),
    
    getRoles(){
      if(!this.user.parent_id){
        return this.default_roles;        
      }else{
        let main_role = this.user.group_role.roles.find(item => item.name == "general_leadger");

        let roles = {};

        if(JSON.parse(main_role.pivot.operators).includes("all")){
          return this.default_roles;        
        }

        JSON.parse(main_role.pivot.operators).forEach(item => {
          roles[item.replace("-","_")] = true;
        })

        return roles;
      }    
    },

    last_balance(){
      let creditAndDebit = this.data.reduce((itemPrev,itemNext) => {
        if(this.chart_of_account_id && this.chart_of_account_id.parent){
          if(this.passiva_types.includes(this.chart_of_account_id.parent.type)){
            itemPrev += parseFloat(itemNext.credit) - parseFloat(itemNext.debit);          
          }else{
            itemPrev += parseFloat(itemNext.debit) - parseFloat(itemNext.credit);          
          }
        }else{
          itemPrev += 0;
        }

        return itemPrev;
      },0.00) 
    
      let last_balance = (
        parseFloat(this.raw_data.first_balance ? this.raw_data.first_balance.saldo : 0.00) 
        + parseFloat(creditAndDebit)
      );
      
      return last_balance;
    }
  },

  watch : {   
    'parameters.params.chart_of_account_id' : function(newValue,oldValue){
       if(!newValue){
        this.chart_of_account_id = '';
      }
    }
  },

  methods : {
    ...mapActions('moduleApi',[
      'lookUp',
    ]),

    async onLoad(page = 1){
      if(this.isLoadingData) return;

      this.isLoadingData = true;

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
      
      let url = this.parameters.url + 
        "?page=1" +
        "&chart_of_account_id=" + this.parameters.params.chart_of_account_id +
        "&start_date=" + this.parameters.params.start_date + 
        "&end_date=" + this.parameters.params.end_date;

      this.$axios.get(url)
      .then(res => {             
        let newLastBalance = parseFloat(res.data.first_balance ? res.data.first_balance.saldo : 0.00);

        let newData = res.data.data.map(item => {
          if(this.chart_of_account_id && this.chart_of_account_id.parent){
            if(this.passiva_types.includes(this.chart_of_account_id.parent.type)){
              newLastBalance = parseFloat(newLastBalance) + parseFloat(item.credit) - parseFloat(item.debit);          
            }else{
              newLastBalance = parseFloat(newLastBalance) + parseFloat(item.debit) - parseFloat(item.credit);          
            }
          }else{
            newLastBalance = 0;
          }

          return {
            ...item,
            last_balance : newLastBalance
          }
        })

        this.raw_data =  res.data;
        this.data = newData;      
      })
      .catch(err => {
        this.$globalErrorToaster(this.$toaster,err);
      })      
      .finally(() => {
        loader.hide();  
        this.isLoadingData = false;
      })
    },

    loadMoreStock(){      
      if(this.isLoadingData) return;
      
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      this.parameters.params.page += 1;

      this.isLoadingData = true;

      let url = this.parameters.url + 
        "?page=" + this.parameters.params.page +
        "&chart_of_account_id=" + this.parameters.params.chart_of_account_id +
        "&start_date=" + this.parameters.params.start_date + 
        "&end_date=" + this.parameters.params.end_date;

      this.$axios.get(url)
      .then(res => {
        let newData = [
          ...this.data,
          ...res.data.data
        ];      

        let newLastBalance = parseFloat(res.data.first_balance ? res.data.first_balance.saldo : 0.00);

        let newMapData = newData.map(item => {          
          if(this.chart_of_account_id && this.chart_of_account_id.parent){
            if(this.passiva_types.includes(this.chart_of_account_id.parent.type)){
              newLastBalance = parseFloat(newLastBalance) + parseFloat(item.credit) - parseFloat(item.debit);          
            }else{
              newLastBalance = parseFloat(newLastBalance) + parseFloat(item.debit) - parseFloat(item.credit);          
            }
          }else{
            newLastBalance = 0;
          }

          return {
            ...item,
            last_balance : newLastBalance
          }
        })

        this.data = newMapData;
        this.raw_data.current_page += 1;
      })
      .catch(err => {
        this.$globalErrorToaster(this.$toaster,err);
      })
      .finally(() => {
        loader.hide();
        this.isLoadingData = false;
      })
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
                url : "finance/general_ledger/get-chart-of-account",
                lookup : "chart_of_accounts",
                query : "?search=" + this.chart_of_account_search + 
                    "&page=" + this.lookup_chart_of_accounts.current_page +
                    "&per_page=10"
            })

            this.isLoadingGetChartOfAccount = false;      
        }
    },

    onSetChartOfAccount(item){  
      this.parameters.params.chart_of_account_id = item ? item.id : '';    
    },

    onDetail(item){
      this.$refs["modal-detail"].parameters.form = {
        ...item
      };

      window.$("#modal-detail").modal("show");
    },   

    onRowSelected(index){
      this.ActiveRow = index;
    }
  }
}
</script>