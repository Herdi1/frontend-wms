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
                      <p class="text-right"><i class="fa fa-phone"></i>{{ app_profile.phone }}</p>
                      <p class="text-right"><i class="fa fa-envelope"></i>{{ app_profile.email }} </p>
                      <p class="text-right"><i class="fa fa-location-arrow"></i>{{ app_profile.website }}</p>
                    </div>
                  </div>
                </div>
              </div>


              <div class="row mt-2">
                <div class="col-md-6">
                </div>
                <div class="col-md-6">
                  <div class="receipt-right text-right">
                    <h5 class="text-info">NOMER # {{ parameters.form.code ? parameters.form.code : '-' }}</h5>
                    </p>
                    <p><b>Tanggal :</b> {{ parameters.form.date }} </p>
                    <p><b>Master Akun : </b> {{ parameters.form.chart_of_account ? parameters.form.chart_of_account.name : "-" }} </p>
                  </div>
                </div>
              </div>

              <div>
                <table class="table table-striped table-sm vld-parent mt-3">
                  <thead>
                    <tr>
                      <th>Nama Akun</th>
                      <th style="width:40%">Nominal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in parameters.form.cash_out_details" :key="item.id">
                      <td>{{ item.chart_of_account ? item.chart_of_account.name : '-' }}</td>
                      <td>{{ item.amount | formatPrice }}</td>
                    </tr>

                    <tr v-if="!parameters.form.cash_out_details.length">
                      <td colspan="2" class="text-center">
                        Data tidak ditemukan
                      </td>
                    </tr>

                    <tr>
                      <td class="text-right">
                        <p>
                          <strong>Total: </strong>
                        </p>                    
                      </td>
                      <td>
                        <p>
                          <strong>{{ parameters.form.amount | formatPrice }}</strong>
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
  middleware: ["isNotAccessable"],

  props: ["self"],

  data() {
    return {
      parameters: {
        form: {
          cash_out_details: []
        }
      }
    };
  },
  computed: {
    ...mapState('setting', ['app_profile']),
  }
};
</script>