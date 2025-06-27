<template>
  <portal to="modal-detail">
    <div class="modal fade" aria-hidden="true" id="modal-detail">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Data Packing List - {{parameters.form.code}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="col-md-12">
            <div class="receipt-main">
             
   <!-- {{parameters.form.detail_packing_list }} -->
             
              <div>
                <table class="table table-striped table-sm vld-parent mt-5">
                  <thead>
                    <tr>
                      <th style="width:10%">Kode</th>
                      <th style="width:10%">Panjang</th>
                      <th style="width:10%">Berat</th>
                      <th style="width:10%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in parameters.form.detail_packing_list" :key="item.id">
                      <td>{{ item.production_activity ? item.production_activity.code : '-' }}</td>
                      <td>{{ item.length}}</td>
                      <td>{{ item.weight}}</td>
                      <td></td>
                    </tr>

                    <!-- <tr v-if="!parameters.form.detail_packing_list.length">
                      <td colspan="4" class="text-center">
                        Data tidak ditemukan
                      </td>
                    </tr> -->
                  </tbody>
                </table>
              </div>

              <!-- <div class="row">
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
              </div> -->

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
          detail_packing_list: []
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