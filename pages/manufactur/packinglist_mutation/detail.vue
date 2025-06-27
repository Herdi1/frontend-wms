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
                  </div>
                </div>
              </div>              
              <div>
                <table class="table table-striped table-sm vld-parent">
                  <thead>
                    <tr>
                      <th style="width:5%">ProductID</th>
                      <th style="width:40%">ProductName</th>
                      <th style="width:40%">RefNo</th>
                      <th style="width:5%">Gulungan</th>                      
                      <th style="width:5%">Panjang</th>                      
                      <th style="width:5%">Berat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in parameters.form.detail_packing_list" :key="item.id">
                      <td>{{ parameters.form.product ? parameters.form.product.code : '-' }}</td>
                      <td>{{ parameters.form.product ? parameters.form.product.name : '-' }}</td>
                      <td>{{ item.production_activity ? item.production_activity.code : '-'}}</td>

                      <td>{{ item.no_set }}</td>

                      <td>{{ item.length | formatPrice }}</td>
                      <td>{{ item.weight | formatPrice }}</td>
                    </tr>

                    <tr v-if="!parameters.form.detail_packing_list.length">
                      <td colspan="3" class="text-center">
                        Data tidak ditemukan
                      </td>
                    </tr>                                                        
                  </tbody>
                </table>
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
          detail_packing_list : []
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