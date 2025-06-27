<template>
  <portal to="modal-detail">
    <div class="modal fade" 
      aria-hidden="true" 
      id="modal-detail">
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Detail Data</h5>

              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
     
            <div class="modal-body">
              <div class="row">
                  <div class="col">                  
                    <div class="form-group">
                      <label for="code">Kode</label>
                      <div>{{ parameters.form.code }}</div>
                    </div>                  
                </div>

                <div class="col">
                  <div class="form-group">
                    <label for="name">Nama</label>
                    <div>{{ parameters.form.name }}</div>
                  </div>
                </div>                        
              </div>      

              <div class="form-group">
                <label for="chart_of_account_id">Akun</label>
                <div>{{ parameters.form.chart_of_account ? parameters.form.chart_of_account.name : "-"}}</div>
              </div>

              <div class="form-group">
                <label for="rule_name">Rule Nama</label>
                <div>{{ parameters.form.rule_name }}</div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="type">Type</label>
                    <div>{{checkType(parameters.form.type)}}</div>
                  </div>
                </div>              
                <div class="col">
                  <div class="form-group">
                    <label for="is_default">Default</label>
                    <div>{{parameters.form.is_default ? 'Ya' : 'Tidak'}}</div>
                  </div>
                </div>
              </div>
            
            </div>            
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  middleware : ["isNotAccessable"],
  
  props: ["self"],

  data() {
    return {    
      parameters : {    
        form : {}
      },
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
          {value : "STOCK_OPNAME",title : "Stok Opname"}        
      ]
    };
  },

  methods: {
    checkType(type){
      if(type){
        return this.types.find(item => item.value === type).title;
      }else{
        return "";
      }
    }
  }
};
</script>
