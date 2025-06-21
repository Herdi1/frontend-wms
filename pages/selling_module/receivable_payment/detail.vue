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
                  <div class="col-md-6">                  
                    <div class="form-group">
                      <label for="code">Kode Penjualaan</label>
                      <div>{{ parameters.form.code }}</div>
                    </div>                  
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="date">Tanggal</label>
                    <div>{{ parameters.form.date }}</div>
                  </div>
                </div>             
              </div>      

              <div class="row">
                <div class="col-md-6 form-group">
                  <label for="supplier_id">Pelanggan</label>
                  <div>
                    {{ parameters.form.customer ? parameters.form.customer.name || '-' : '-'}}                    
                  </div>
                </div>

                <div class="col-md-6 form-group">
                  <label for="user_id">Pengguna</label>
                  <div>
                  {{ parameters.form.user ? parameters.form.user.username || '-' : '-' }}
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="is_paid">Sudah Lunas/Bayar</label>
                <div>                
                  <span class="badge badge-success"
                    v-if="parameters.form.is_paid">Sudah</span>
                  <span class="badge badge-danger"
                    v-else>Belum</span>                
                </div>
              </div>

              <div class="row">
                <div class="col-md-4 form-group">
                  <label for="grand_total">Total</label>
                  <div>{{ parameters.form.grand_total| formatPrice }}</div>
                </div>
                <div class="col-md-4 form-group">
                  <label for="debt">Kekurangan</label>
                  <div>{{ parameters.form.receivable | formatPrice }}</div>
                </div>
                <div class="col-md-4 form-group">
                  <label for="paid">Dibayar</label>
                  <div>{{ ( parseFloat(parameters.form.grand_total) - parseFloat(parameters.form.receivable) ) | formatPrice }}</div>
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
      }
    };
  }
};
</script>
