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

                  <h6>Pelanggan </h6>
                  <div class="row m-n1 p-n1">
                    <div class="col-2 m-n1 p-n1">
                      <p>Nama</p>
                    </div>
                    <div class="col-1 m-n1 p-n1">
                      <p>:</p>
                    </div>
                    <div class="col-9 ml-n3 mt-n1 mb-n1 mr-0 pl-n3 pt-n1 pb-n1 pr-0">
                      <p>{{ parameters.form.customer ? parameters.form.customer.name || '-' : '-' }}
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
                      <p>{{ parameters.form.customer ? parameters.form.customer.phone || '-' : '-' }}
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
                      <p>Group</p>
                    </div>
                    <div class="col-1 m-n1 p-n1">
                      <p>:</p>
                    </div>
                    <div class="col-9 ml-n3 mt-n1 mb-n1 mr-0 pl-n3 pt-n1 pb-n1 pr-0">
                      <p><span v-if="parameters.form.customer">
                          {{ parameters.form.customer.customer_group ? parameters.form.customer.customer_group.name
                              || '-' : '-'
                          }}
                        </span>
                      </p>
                    </div>
                  </div>
                  <h6 class="mt-1">Sales </h6>
                  <span v-if="parameters.form.seller">
                    {{ parameters.form.seller ? parameters.form.seller.name || '-' : '-' }}
                  </span>
                  <span v-else>
                    -
                  </span>
                  <div class="row">
                    <div class="col-sm">
                      <h6 class="mt-1">Gudang </h6>
                      {{ parameters.form.warehouse ? parameters.form.warehouse.name : '-' }}
                    </div>
                    <div class="col-sm">
                      <h6>Status</h6>
                      <span class="text-success" v-if="parameters.form.is_paid">
                        Sudah
                      </span>
                      <span class="text-danger" v-else>
                        Belum
                      </span>
                    </div>
                    <div class="col-sm">
                      <h6>Pembayaran</h6>
                      {{ parameters.form.payment_term || '-' }}
                    </div>
                  </div>
                </div>
                <div class="col-md-6 float-right ">
                  <div class="receipt-right text-right">
                    <h5 class="text-info">NOMER # {{ parameters.form.code ? parameters.form.code : '-' }}</h5>
                    <p><b>Po Customer :</b> {{ parameters.form.po_customer ? parameters.form.po_customer.code : '-' }}
                    </p>
                    <p><b>Tanggal :</b> {{ parameters.form.date }} </p>
                    <p><b>Transaksi :</b>{{ parameters.form.transaction_type }}</p>
                    <p><b>Tgl Tempo :</b>{{ parameters.form.due_date || '-' }}</p>
                    <p><b>Discount Type :</b>{{ parameters.form.discount_type }} </p>
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
                      <th style="width:5%">Harga</th>
                      <th style="width:10%">
                        Discount
                        <span v-if="parameters.form.discount_type === 'NOMINAL'">
                          *Rp
                        </span>
                        <span v-else>
                          %
                        </span>
                      </th>
                      <th style="width:10%">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in parameters.form.selling_details" :key="item.id">
                      <td>{{ item.product ? item.product.code : '-' }}</td>
                      <td>{{ item.product ? item.product.name : '-' }}</td>
                      <td>{{ item.product ? item.product.selling_unit : '-' }}</td>
                      <td>{{ item.quantity | formatPrice }}</td>
                      <td>{{ item.price | formatPrice }}</td>
                      <td>{{ item.discount | formatPrice }}</td>
                      <td>{{ item.amount | formatPrice }}</td>
                    </tr>

                    <tr v-if="!parameters.form.selling_details.length">
                      <td colspan="6" class="text-center">
                        Data tidak ditemukan
                      </td>
                    </tr>
                    <tr>
                      <td class="text-right" colspan="6">
                        <p>
                          <strong>Total: </strong>
                        </p>
                        <p>
                          <strong>Discount
                            <span v-if="parameters.form.discount_type === 'NOMINAL'">
                              *Rp
                            </span>
                            <span v-else>
                              %
                            </span>: </strong>
                        </p>
                        <p>
                          <strong>PPN: </strong>
                        </p>
                        <p>
                          <strong>Grand Total: </strong>
                        </p>
                        <p>
                          <strong>DP: </strong>
                        </p>
                        <p>
                          <strong>Ongkir
                          </strong>
                        </p>
                      </td>
                      <td>
                        <p>
                          <strong>{{ parameters.form.total | formatPrice }}</strong>
                        </p>
                        <p>
                          <strong>{{ parameters.form.discount | formatPrice }}</strong>
                        </p>
                        <p>
                          <strong>{{ parameters.form.tax | formatPrice }}</strong>
                        </p>
                        <p>
                          <strong>{{ parameters.form.grand_total | formatPrice }}</strong>
                        </p>
                        <p>
                          <strong>{{ parameters.form.dp | formatPrice }}</strong>
                        </p>
                        <p>
                          <strong>{{ parameters.form.shipping_charge | formatPrice }}</strong>
                        </p>

                      </td>
                    </tr>
                    <tr>

                      <td class="text-right" colspan="6">
                        <h2><strong>Total: </strong></h2>
                      </td>
                      <td class="text-left text-danger">
                        <h2><strong><i class="fa fa-inr"></i>{{ parameters.form.grand_total | formatPrice }}</strong>
                        </h2>
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
          selling_details: []
        }
      }
    };
  },
  computed: {
    ...mapState('setting', ['app_profile']),
  }
};
</script>