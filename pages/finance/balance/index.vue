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
                <div class="row">          
                  <div class="col-6">
                    <table class="table table-striped table-sm vld-parent table-hover"
                      ref="formContainer">      
                      <thead>
                        <tr>
                          <td colspan="3"
                            class="bg-primary text-center text-light">
                            ACTIVA
                          </td>
                        </tr>
                      </thead>          
                      <tbody :class="{'table-active': ActiveRow == i }"
                        @click="onRowSelected(i)"
                        v-for="(item,i) in data.activa">                              
                        <tr>                
                          <td colspan="3">
                            <b>{{item.name.toUpperCase()}}</b>
                          </td>      
                        </tr>
                        <tr v-for="(itemChild,iChild) in item.childs">
                          <td></td>
                          <td>
                            {{itemChild.code}} {{itemChild.name}}
                          </td>
                          <td class="text-right">                
                            {{ itemChild.cost | formatPrice }}                    
                          </td>
                        </tr>
                        <tr>
                          <td>
                          </td>
                          <td>
                            <b>Total</b>
                          </td>
                          <td class="text-right">                        
                            {{ item.cost | formatPrice }}                    
                          </td>
                        </tr>
                      </tbody>

                      <tbody v-if="data.activa.length">
                        <tr>
                          <td colspan="2">
                            <b>TOTAL AKTIVA</b>                     
                          </td>                                
                          <td class="text-right">
                            {{ total_activa | formatPrice }}
                          </td>
                        </tr>
                      </tbody>

                      <table-data-loading-section
                        :self="this"
                      />

                      <tr v-if="!data.activa.length && !isLoadingData">
                        <td colspan="100" class="text-center">
                          <img
                            src="/img/data-not-found.svg"
                            style="height: 250px; object-fit: cover"
                          />
                          <div class="mt-3">Data Tidak Ditemukan</div>
                        </td>
                      </tr>
                  
                    </table>
                  </div>
                  <div class="col-6">
                    <table class="table table-striped table-sm vld-parent table-hover"
                      ref="formContainer">      
                      <thead>
                        <tr>
                          <td colspan="3"
                            class="bg-primary text-center text-light">
                            PASSIVA
                          </td>
                        </tr>
                      </thead>          
                      <tbody :class="{'table-active': ActiveRow == i }"
                        @click="onRowSelected(i)"
                        v-for="(item,i) in data.passiva">                              
                        <tr>                
                          <td colspan="3">
                            <b>{{item.name.toUpperCase()}}</b>
                          </td>      
                        </tr>
                        <tr v-for="(itemChild,iChild) in item.childs">
                          <td></td>
                          <td>
                            {{itemChild.code}} {{itemChild.name}}
                          </td>
                          <td class="text-right">                
                            {{ itemChild.profit | formatPrice }}                    
                          </td>
                        </tr>
                        <tr>
                          <td>
                          </td>
                          <td>
                            <b>Total</b>
                          </td>
                          <td class="text-right">                        
                            {{ item.profit | formatPrice }}                    
                          </td>
                        </tr>
                      </tbody>

                      <tbody v-if="data.passiva.length">
                        <tr>
                          <td colspan="2">
                            <b>TOTAL PASSIVA</b>                     
                          </td>                                
                          <td class="text-right">
                            {{ total_passiva | formatPrice }}
                          </td>
                        </tr>
                      </tbody>

                      <table-data-loading-section
                        :self="this"
                      /> 

                      <tr v-if="!data.passiva.length && !isLoadingData">
                        <td colspan="100" class="text-center">
                          <img
                            src="/img/data-not-found.svg"
                            style="height: 250px; object-fit: cover"
                          />
                          <div class="mt-3">Data Tidak Ditemukan</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              <!-- end table -->
        
            </div>
          </div>
        </div>
      </div>
    </div>
        
    <filter-section
      :self="this"
      ref="form-filter">
      <template>
        <div class="col-md-12">

          <div class="mb-3"><b>Periode Awal</b></div>
          <div class="form-group">
            <input type="date"
              class="form-control"
              v-model="parameters.params.start_date"
              @change="onCheckingDate"/>          
          </div>

          <div class="mb-3"><b>Periode Akhir</b></div>
          <div class="form-group">
            <input type="date"
              class="form-control"
              v-model="parameters.params.end_date"
              @change="onCheckingDate"/>                          
          </div>        
        </div>      
      </template>
    </filter-section>
    
  </section>
</template>

<script>
import { mapActions,mapState } from 'vuex'

export default {
  middleware : ['checkRoleUser'],

  head() {
    return {
      title: 'Neraca',
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
  },

  data() {
    return {
      data : {
        passiva : [],
        activa : []
      },
      raw_data : [],
      ActiveRow : null,
      title               : 'NERACA',
      isLoadingData       : false,
      isPaginate          : true,
      parameters : {
        url : 'finance/balance',
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

      total_activa : 0,
      total_passiva : 0
    }
  },

  computed : {
    getRoles(){
      if(!this.user.parent_id){
        return this.default_roles;        
      }else{
        let main_role = this.user.group_role.roles.find(item => item.name == "balance");

        let roles = {};

        if(JSON.parse(main_role.pivot.operators).includes("all")){
          return this.default_roles;        
        }

        JSON.parse(main_role.pivot.operators).forEach(item => {
          roles[item.replace("-","_")] = true;
        })

        return roles;
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
      
      let url = this.parameters.url + "?" + 
        "&start_date=" + this.parameters.params.start_date + 
        "&end_date=" + this.parameters.params.end_date;

      this.$axios.get(url)
      .then(res => {                       
        this.data = res.data;      

        let total_passiva = 0;

        res.data.passiva.forEach(itemParent => {
          itemParent.childs.forEach(itemChild => {
              total_passiva += parseFloat(itemChild.profit || 0.00);
          })  
        })    

        this.total_passiva = parseFloat(total_passiva);

        // this.total_passiva = parseFloat(total_passiva) + parseFloat(res.data.profit_and_cost_running);

        let total_activa = 0;

        res.data.activa.forEach(itemParent => {
          itemParent.childs.forEach(itemChild => {
              total_activa += parseFloat(itemChild.cost || 0.00);
          })  
        })    

        this.total_activa = parseFloat(total_activa);
      })
      .catch(err => {
        console.log(err);
        this.$globalErrorToaster(this.$toaster,err);
      })      
      .finally(() => {
        loader.hide();  
        this.isLoadingData = false;
      })
    },

    onRowSelected(index){
      this.ActiveRow = index;
    },

    onCheckingDate(){  
      if(this.parameters.params.start_date && this.parameters.params.end_date){
        if(!moment(this.parameters.params.start_date).isSame(this.parameters.params.end_date,'month')){
          this.$toaster.error("Periode Awal Dan Akhir Harus Bulan Yang Sama");
          this.parameters.params.start_date = '';
          this.parameters.params.end_date = '';
        }
      }
    }
  }
}
</script>