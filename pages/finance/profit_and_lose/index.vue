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
                  <tbody :class="{'table-active': ActiveRow == i }"
                    @click="onRowSelected(i)"
                    v-for="(item,i) in data">                              
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
                        <span v-if="passiva_non_real_types.includes(item.type)">
                          {{ itemChild.profit | formatPrice }}                  
                        </span>
                        <span v-else>
                          {{ itemChild.cost | formatPrice }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      </td>
                      <td>
                        <b>Total</b>
                      </td>
                      <td class="text-right">
                        <span v-if="passiva_non_real_types.includes(item.type)">
                          {{ item.profit | formatPrice }}
                        </span>
                        <span v-else>
                          {{ item.cost | formatPrice }}
                        </span>
                      </td>
                    </tr>
                  </tbody>

                  <tbody v-if="data.length">
                    <tr>
                      <td colspan="3">
                        <b>PROFIT/LOSE</b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      </td>
                      <td>
                        PRODIT/LOSE 
                      </td>
                      <td class="text-right">
                        {{ real_profit_and_lose | formatPrice }}
                      </td>
                    </tr>
                  </tbody>

                  <table-data-loading-section
                    :self="this"
                  />

                  <table-data-not-found-section
                    :self="this"
                  />
              
                </table>
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
              v-model="parameters.params.start_date"/>          
          </div>

          <div class="mb-3"><b>Periode Akhir</b></div>
          <div class="form-group">
            <input type="date"
              class="form-control"
              v-model="parameters.params.end_date"/>          
                
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
      title: 'Laba Rugi',
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
      data : [],
      raw_data : [],
      ActiveRow : null,
      title               : 'LABA RUGI',
      isLoadingData       : false,
      isPaginate          : true,
      parameters : {
        url : 'finance/profit_and_lose',
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

      passiva_non_real_types : ["PENDAPATAN"],

      real_profit_and_lose : 0
    }
  },

  computed : {
    getRoles(){
      if(!this.user.parent_id){
        return this.default_roles;        
      }else{
        let main_role = this.user.group_role.roles.find(item => item.name == "profit_and_lose");

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

        let profit = 0;
        let cost = 0;

        res.data.forEach(itemParent => {
          itemParent.childs.forEach(itemChild => {
            if(this.passiva_non_real_types.includes(itemParent.type)){              
              profit += parseFloat(itemChild.profit || 0.00);
            }else{
              cost += parseFloat(itemChild.cost || 0.00);
            }
          })  
        })        

        this.real_profit_and_lose = parseFloat(profit) - parseFloat(cost);
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
    }
  }
}
</script>