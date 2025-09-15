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
              <div class="form-group">
                <label for="date">Tanggal</label>
                <div>{{ parameters.form.date }}</div>
              </div>

              <div class="row">
                <div class="col-md-6 form-group">
                  <label for="code">Kode Master Akun</label>
                  <div>
                    {{ parameters.form.chart_of_account ? parameters.form.chart_of_account.code || '-' : '-'}}                    
                  </div>
                </div>

                <div class="col-md-6 form-group">
                  <label for="product_id">Produk Nama</label>
                  <div>
                  {{ parameters.form.chart_of_account ? parameters.form.chart_of_account.name || '-' : '-' }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 form-group">
                  <label for="saldo">Saldo Awal</label>
                  <div class="text-info">{{ parameters.form.saldo }}</div>
                </div>
                <div class="col-md-4 form-group">
                  <label for="credit">Kredit</label>
                  <div class="text-success">{{ parameters.form.credit }}</div>
                </div>
                <div class="col-md-4 form-group">
                  <label for="debit">Debit</label>
                  <div class="text-danger">{{ parameters.form.debit }}</div>
                </div>
              </div>  

              <div class="form-group">
                <label for="last_balance">Saldo Akhir</label>
                <div class="text-primary">
                  {{ parameters.form.last_balance }}
                </div>
              </div>      

              <div class="form-group">
                <label for="reference_code">
                  Referensi Kode
                </label>
                <div>{{ parameters.form.reference_code || '-' }}</div>
              </div> 

              <div class="form-group">
                <label for="description">
                  Deskripsi
                </label>
                <div>{{ parameters.form.description || '-' }}</div>
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
        form : {},
      }
    };
  }
};
</script>
