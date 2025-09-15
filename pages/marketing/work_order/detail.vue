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

            <div class="col-md-12">
            <div class="receipt-main">
              <div class="row">
                <div class="col-md-6">
                  <div class="receipt-header">

                    <div class="receipt-left">
                      <img class="img-responsive" :src=app_profile.logo_print style="width:200px;heigth:80px;background-repeat: no-repeat;
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
                <div class="col-md-6">

                  <h5>Pelanggan </h5>
                  <div class="row m-n1 p-n1">
                    <div class="col-2 m-n1 p-n1">
                      <p>Nama</p>
                    </div>
                    <div class="col-1 m-n1 p-n1">
                      <p>:</p>
                    </div>
                    <div class="col-9 ml-n3 mt-n1 mb-n1 mr-0 pl-n3 pt-n1 pb-n1 pr-0">
                      <p>{{ parameters.form.po_customer ? parameters.form.po_customer.name || '-' :'-' }}
                      </p>
                    </div>
                  </div>
                                                      
                  

                </div>
                <div class="col-md-6 float-right ">
                  <div class="receipt-right text-right">
                    <h5 class="text-info">NOMER # {{ parameters.form.code ? parameters.form.code : '-' }}</h5>
                    <p><b>PO Customer :</b> {{ parameters.form.po_customer ? parameters.form.po_customer.code : '-' }}</p>
                    <p><b>Tanggal :</b> {{ parameters.form.date }} </p>
                    <p><b>Batas Waktu:</b> {{ parameters.form.due_date }} </p>
                    <p><b>Divisi  :</b>{{ parameters.form.departement || '-' }} </p>
                  </div>
                </div>

              </div>

              <div>
                <table class="table table-striped table-sm vld-parent">
                  <thead>
                    <tr>
                      <th style="width:10%">Kode</th>
                      <th style="width:40%">Product</th>
                      <th style="width:5%">Unit</th>
                      <th style="width:5%">Qty</th>
                      <th style="width:5%">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in parameters.form.work_order_details" :key="item.id">
                      <td>{{ item.product ? item.product.code : '-' }}</td>
                      <td>{{ item.product ? item.product.name : '-' }}</td>
                      <td>{{ item.product ? item.product.selling_unit : '-' }}</td>
                      <td>{{ item.quantity | formatPrice }}</td>
                      <td>
                        <b> {{ item.status }} </b>
                      </td>
                    </tr>

                    <tr v-if="!parameters.form.work_order_details.length">
                      <td colspan="4" class="text-center">
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
          work_order_details : []
        }
      }
    }
  },
   computed: {
    ...mapState('setting', ['app_profile']),
  }
};
</script>