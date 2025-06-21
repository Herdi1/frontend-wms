<template>
  <portal to="modal-detail">
    <div class="modal fade" aria-hidden="true" id="modal-detail">
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
            <div class="col-12">
              <div class="row">
                <div class="col-sm-3">
                  <label for="code"><b>Kode Stok Opname</b></label>
                  </div>

                <div class="col-sm-2 ml-0 pl-0"> <b>: </b></div>
                <div class="col-sm-7 ml-0 pl-0 text-left">
                  <div><b>{{ parameters.form.code }}</b></div>
                </div>

              </div>
            </div>

            <label for="product_id">Produk</label>
            <div>{{ parameters.form.product ? parameters.form.product.name : '-' }}</div>


            <div class="col-md-4 form-group">
              <label for="warehouse_id">Gudang</label>
              <div>{{ parameters.form.warehouse ? parameters.form.warehouse.name : '-' }}</div>
            </div>
            <div class="col-md-4 form-group">
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


            <div class="col-md-4 form-group">
              <label for="system_stcok">Stok Sistem</label>
              <div>{{ parameters.form.system_stock }}</div>
            </div>
            <div class="col-md-4 form-group">
              <label for="real_stock">Stok Nyata</label>
              <div>{{ parameters.form.real_stock }}</div>
            </div>
            <div class="col-md-4 form-group">
              <label for="difference_stock">Selisih</label>
              <div>{{ parameters.form.difference_stock }}</div>
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
  middleware: ["isNotAccessable"],

  props: ["self"],

  data() {
    return {
      parameters: {
        form: {}
      }
    };
  }
};
</script>