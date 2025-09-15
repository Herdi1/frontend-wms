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
                <div class="col-md-6 form-group">                  
                  <label for="code">Kode</label>
                  <div>{{ parameters.form.code }}</div>
                </div>

                <div class="col-md-6 form-group">                  
                  <label for="date">Tanggal</label>
                  <div>{{ parameters.form.date }}</div>
                </div>             
              </div>      

              <div class="row">
                <div class="col-md-4 form-group">
                  <label for="po_supplier_id">Po Supplier</label>
                  <div>
                    {{ parameters.form.po_supplier ? (parameters.form.po_supplier.code || '-') : '-'}}                    
                  </div>
                </div>

                <div class="col-md-4 form-group">
                  <label for="supplier_id">Supplier</label>
                  <div v-if="parameters.form.po_supplier">
                    {{ parameters.form.po_supplier.supplier ? parameters.form.po_supplier.supplier.name : "-" }}
                  </div>
                  <div v-else>
                    -
                  </div>
                </div>

                <div class="col-md-4 form-group">
                  <label for="user_id">Pengguna</label>
                  <div>
                    {{ parameters.form.user ? (parameters.form.user.username || '-') : '-' }}
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 form-group">
                  <label for="dp">Dp</label>
                  <div>{{ parameters.form.amount | formatPrice }}</div>
                </div>

                <div class="col-md-6 form-group">
                  <label for="description">Keterangan</label>
                  <div>{{ parameters.form.description || "-" }}</div>
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
}
</script>
