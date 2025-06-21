<template>
  <portal to="modal-detail">
    <div class="modal fade" 
      aria-hidden="true" 
      id="modal-detail">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Detail Data</h5>

              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
     
            <div class="modal-body">                            
              <div class="form-group">
                <label for="code">Kode</label>
                <div>{{ parameters.form.code }}</div>
              </div>                                         
           
              <div class="row">
                <div class="col-md-4 form-group">
                  <label for="product_id">Produk</label>
                  <div>{{ parameters.form.product ? parameters.form.product.name : '-' }}</div>    
                </div>
                <div class="col-md-4 form-group">
                  <label for="warehouse_from_id">Dari Gudang</label>
                  <div>{{ parameters.form.warehouse_from ? parameters.form.warehouse_from.name : '-' }}</div>
                </div>
                <div class="col-md-4 form-group">
                  <label for="warehouse_to_id">Ke Gudang</label>
                  <div>{{ parameters.form.warehouse_to ? parameters.form.warehouse_to.name : '-' }}</div>
                </div>
              </div>

              <div class="form-group">
                <label for="user_id">Pengguna</label>
                <div>{{ parameters.form.user ? parameters.form.user.username : '-' }}</div>
              </div>
             
              <div class="form-group">
                <label for="date">Tanggal</label>
                <div>{{ parameters.form.date }}</div>
              </div>
                                                     
              <div class="form-group">
                <label for="address">Deskripsi</label>
                <div>{{ parameters.form.description || '-' }}</div>
              </div>

              <div class="form-group">
                <label for="quantity">Jumlah</label>
                <div>{{ parameters.form.quantity }}</div>
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