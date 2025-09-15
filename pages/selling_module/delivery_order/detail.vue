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
                      <p class="text-right">
                        <i class="fa fa-phone"></i>
                        {{ app_profile.phone }}
                      </p>
                      <p class="text-right">
                        <i class="fa fa-envelope"></i>
                        {{ app_profile.email }} 
                      </p>
                      <p class="text-right">
                        <i class="fa fa-location-arrow"></i>
                        {{ app_profile.website }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>


              <div class="row mt-2">              
                <div class="col-md-6">
                  <h6>Pelanggan {{ parameters.form.is_dropship ? "Reseller" : "" }} </h6>

                  <div class="row m-n1 p-n1" v-if="parameters.form.is_dropship">
                    <div class="col-2 m-n1 p-n1">                     
                      <p>Reseller </p>
                    </div>
                     <div class="col-1 m-n1 p-n1">
                      <p>:</p>
                    </div>
                    <div class="col-9 ml-n3 mt-n1 mb-n1 mr-0 pl-n3 pt-n1 pb-n1 pr-0">
                      <p>
                        {{ parameters.form.reseller ? parameters.form.reseller.name : '-' }}
                      </p>
                    </div>
                  </div>

                  <div class="row m-n1 p-n1">               
                    <div class="col-2 m-n1 p-n1">
                      <p>Nama </p>
                    </div>
                    <div class="col-1 m-n1 p-n1">
                      <p>:</p>
                    </div>
                    <div class="col-9 ml-n3 mt-n1 mb-n1 mr-0 pl-n3 pt-n1 pb-n1 pr-0">
                      <p>
                      {{ parameters.form.customer ? parameters.form.customer.name || '-' : '-' }}
                      </p>
                    </div>
                  </div>

                  <div class="row m-n1 p-n1">
                    <div class="col-2 m-n1 p-n1">
                      <p>Alamat</p>
                    </div>
                    <div class="col-1 m-n1 p-n1">
                      <p>:</p>
                    </div>
                    <div class="col-9 ml-n3 mt-n1 mb-n1 mr-0 pl-n3 pt-n1 pb-n1 pr-0">
                      <p>{{ parameters.form.customer ? parameters.form.customer.address || '-' : '-'
                      }}
                      </p>
                    </div>
                  </div>            

                  <div class="row m-n1 p-n1">
                    <div class="col-2 m-n1 p-n1">
                      <p>Telp</p>
                    </div>
                    <div class="col-1 m-n1 p-n1">
                      <p>:</p>
                    </div>
                    <div class="col-9 ml-n3 mt-n1 mb-n1 mr-0 pl-n3 pt-n1 pb-n1 pr-0">
                      <p>{{ parameters.form.customer ? parameters.form.customer.phone || '-' : '-'
                      }}
                      </p>
                    </div>
                  </div>                
                </div>

                <div class="col-md-6 float-right ">
                  <div class="receipt-right text-right">
                    <h5 class="text-info">
                      NOMER # {{ parameters.form.code ? parameters.form.code : '-' }}
                    </h5>
                    <p>
                      <b>Selling :</b> 
                      {{ parameters.form.selling ? parameters.form.selling.code : '-' }}
                    </p>
                    <p><b>Tanggal :</b> {{ parameters.form.date }} </p>
                  </div>
                </div>
              </div>

              <div>
                <table class="table table-striped table-sm vld-parent mt-3">
                  <thead>
                    <tr>
                      <th style="width:10%">Kode</th>
                      <th style="width:40%">Product</th>
                      <th style="width:5%">Unit</th>
                      <th style="width:5%">Qty</th>
                      <th style="width:10%">Keterangan</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="item in parameters.form.delivery_order_details" 
                      :key="item.id">
                      <td>{{ item.product ? item.product.code : '-' }}</td>
                      <td>{{ item.product ? item.product.name : '-' }}</td>
                      <td>{{ item.product ? item.product.selling_unit : '-' }}</td>
                      <td>{{ item.quantity | formatPrice }}</td>
                      <td>{{ item.description || "-" }}</td>
                    </tr>

                    <tr v-if="!parameters.form.delivery_order_details.length">
                      <td colspan="5" class="text-center">
                        Data tidak ditemukan
                      </td>
                    </tr>

                    <tr>
                      <td class="text-right" colspan="3">
                        <p>
                          <strong>Total: </strong>
                        </p>                       
                      </td>
                      <td>
                        <p>
                          <strong>
                          {{
                             parameters.form
                              .delivery_order_details
                              .reduce((prev,next) => parseFloat(prev) + parseFloat(next.quantity),0) 
                          }}
                          </strong>
                        </p>                       
                      </td>
                    </tr>                  
                  </tbody>
                </table>
              </div>

              <div class="row">
                <div class="receipt-header receipt-header-mid receipt-footer">
                  <div class="col-xs-8 col-sm-8 col-md-8 text-left">
                    <div class="receipt-right">
                      <p>
                        <b>Keterangan :</b>
                      </p>

                      <h5 style="color: rgb(140, 140, 140);">
                        {{ parameters.form.description || '-' }}
                      </h5>
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
  middleware: ["isNotAccessable"],

  props: ["self"],

  data() {
    return {
      parameters: {
        form: {
          delivery_order_details : []
        }
      }
    };
  },
  computed: {
    ...mapState('setting', ['app_profile']),
  }
};
</script>