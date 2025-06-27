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
                  <label for="warehouse_id">Gudang</label>
                  <div>{{ parameters.form.warehouse ? parameters.form.warehouse.name : '-' }}</div>
                </div>
                <div class="col-md-4 form-group">
                  <label for="purchaseing_return_id">Refference Kode</label>
                  <div>{{ parameters.form.purchaseing_return ? parameters.form.purchaseing_return.code : '-' }}</div>
                </div>
                <div class="col-md-4 form-group">
                  <label for="user_id">Pengguna</label>
                  <div>{{ parameters.form.user ? parameters.form.user.username : '-' }}</div>
                </div>
              </div>
             
              <div class="form-group">
                <label for="date">Tanggal</label>
                <div>{{ parameters.form.date }}</div>
              </div>
                                                     
              <div class="form-group">
                <label for="address">Deskripsi</label>
                <div>{{ parameters.form.description || '-' }}</div>
              </div>

              <div class="table-responsive">
                <table class="table table-sm">
                  <tr>
                    <th>Kode</th>
                    <th>Product</th>              
                    <th>Unit</th>
                    <th>Qty</th>
                    <th>Keterangan</th>                                   
                  </tr>

                  <tr v-for="item in parameters.form.stock_broken_details"
                    :key="item.id">                  
                    <td>{{ item.product ? item.product.code : '-' }}</td>
                    <td>{{ item.product ? item.product.name : '-' }}</td>
                    <td>{{ item.product ? item.product.purchase_unit : '-' }}</td>
                    <td>{{ item.quantity | formatPrice }}</td>
                    <td>{{ item.description || '-' }}</td>
                  </tr>

                  <tr v-if="!parameters.form.stock_broken_details.length">
                    <td colspan="6"
                      class="text-center">
                      Data tidak ditemukan
                    </td>
                  </tr>
                </table>        
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
        form : {
          stock_broken_details: []
        }
      }
    };
  }
};
</script>