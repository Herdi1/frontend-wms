<template>
  <portal to="modal-detail">
    <div class="modal fade" 
      aria-hidden="true" 
      id="modal-detail">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Detail Data</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="col-md-12">
            <div class="receipt-main">
              <div class="row">
                <div class="col-md-6">
                  <div class="receipt-header">
                    <div class="receipt-left">
                      <img class="img-responsive" 
                        :src=app_profile.logo_print 
                        style="width:200px;heigth:80px;background-repeat: no-repeat;
                          background-size: 200px 80px;background-color: crimson;">
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="receipt-header float-right">
                    <div class="receipt-right">
                      <h5>{{ app_profile.company_name }}</h5>
                      <p class="text-right"><i class="fa fa-phone"></i>{{ app_profile.phone }}</p>
                      <p class="text-right"><i class="fa fa-envelope"></i>{{ app_profile.email }} </p>
                      <p class="text-right"><i class="fa fa-location-arrow"></i>{{ app_profile.website }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mt-2">                               
                <div class="col-md-12 float-right ">
                  <div class="receipt-right text-right">
                    <h5 class="text-info">NOMER # {{ parameters.form.code ? parameters.form.code : '-' }}</h5>
                    <p><b>Tanggal :</b> {{ parameters.form.date }} </p>
                    <p><b>Kode Work Order :</b> {{ parameters.form.work_order ? parameters.form.work_order.code : "-" }}</p>
                    <p><b>Produk : </b> {{ parameters.form.product ? parameters.form.product.name : "-" }}</p>
                    <p><b>Jumlah Produksi (Qty) : </b> {{ parameters.form.quantity }} </p>
                  </div>
                </div>
              </div>              
              <div>
                <!-- <table class="table table-striped table-sm vld-parent">
                  <thead>
                    <tr>
                      <th style="width:5%">Kode</th>
                      <th style="width:40%">Product</th>
                      <th style="width:10%">Qty</th>                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in parameters.form.material_requirement_details" :key="item.id">
                      <td>{{ item.product ? item.product.code : '-' }}</td>
                      <td>{{ item.product ? item.product.name : '-' }}</td>
                      <td>
                        Jumlah Dibutuhkan : {{ item.quantity | formatPrice }} <br/>
                        Jumlah Bom : {{ item.quantity_bom | formatPrice }} <br/>
                        Jumlah Diterima : {{ item.quantity_receive | formatPrice}}
                      </td>
                    </tr>

                    <tr v-if="!parameters.form.material_requirement_details.length">
                      <td colspan="3" class="text-center">
                        Data tidak ditemukan
                      </td>
                    </tr>                                                        
                  </tbody>
                </table> -->
              </div>

              <div class="row">
                <div class="receipt-header receipt-header-mid receipt-footer">
                  <div class="col-xs-8 col-sm-8 col-md-8 text-left">
                    <div class="receipt-right">
                      <p><b>Keterangan :</b></p>
                      <h5 style="color: rgb(140, 140, 140);">{{ parameters.form.description || '-' }}</h5>
                    </div>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-4">
                    <div class="receipt-left">
                      <h1>Stamp</h1>
                    </div>
                  </div>
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
import { mapState } from "vuex";
export default {
  middleware : ["isNotAccessable"],
  
  props: ["self"],

  data() {
    return {    
      parameters : {    
        form : {
          material_requirement_details : []
        }
      }
    };
  },

  computed: {
    ...mapState('setting', [
      'app_profile'
    ])  
  }
};
</script>