<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>{{ isEditable ? "Edit" : "Tambah" }} Pembelian</h6>

              <button class="btn btn-primary" @click="$router.back()">
                <i class="fas fa-arrow-left"></i>
                Kembali
              </button>
            </div>
          </div>

          <ValidationObserver
            v-slot="{ invalid, validate }"
            ref="form-validate"
          >
            <form
              @submit.prevent="() => console.log('Submit')"
              autocomplete="off"
            >
              <div class="d-flex flex-row">
                <div class="col-sm-3">
                  <ValidationProvider name="code" rules="required">
                    <div class="form-group" slot-scope="{ errors, valid }">
                      <div class="row">
                        <div class="col-sm-4 align-self-center mr-0 pr-0">
                          <label for="code">Kode</label>
                        </div>
                        <div class="col-sm-8 align-self-center ml-0 pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="code"
                            v-model="form.code"
                            :class="
                              errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                            "
                            disabled
                          />

                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="col-sm-3">
                  <ValidationProvider name="date" rules="required">
                    <div class="form-group" slot-scope="{ errors, valid }">
                      <div class="row">
                        <div class="col-sm-2 align-self-center mr-0 pr-0">
                          <label for="date">Tgl</label>
                        </div>
                        <div class="col-sm-10 align-self-center ml-0 pl-0">
                          <input
                            type="date"
                            class="form-control"
                            name="date"
                            v-model="form.date"
                            :class="
                              errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                            "
                          />

                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="col-sm-3">
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-4 align-self-center mr-0 pr-0">
                        <label for="transaction_type">Transaksi</label>
                      </div>
                      <div class="col-sm-8 align-self-center ml-0 pl-0">
                        <select
                          v-model="form.transaction_type"
                          class="form-control"
                          :disabled="isEditable || (form.dp > 0 && form.po_supplier_id !== '')"
                          @change="onChangeTransactionType"
                        >
                          <option value="CASH">Cash</option>
                          <option value="CREDIT">Credit</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-sm-3">
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-4 align-self-center mr-0 pr-0">
                        <label for="due_date">Tgl Tempo</label>
                      </div>
                      <div class="col-sm-8 align-self-center ml-0 pl-0">
                        <input
                          type="date"
                          class="form-control"
                          name="due_date"
                          v-model="form.due_date"
                          :required="form.transaction_type == 'CREDIT'"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex flex-row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-2 align-self-center mr-0">
                        <label for="po_supplier_id">PO Supp.</label>
                      </div>
                      <div class="col-sm-10 align-self-center mr-0 pl-0">
                        <v-select
                          label="code"
                          :loading="isLoadingGetPoSupplier"
                          :options="lookup_po_suppliers.data"
                          :filterable="false"
                          @search="onGetPoSupplier"
                          @input="onSetPoSupplier"
                          v-model="form.po_supplier_id"
                          :disabled="isEditable"
                        >
                          <template v-slot:option="option">
                            <div class="row">
                              <div class="col-md-5 p-1 m-0">
                                {{ option.code }}
                              </div>
                              <div class="col-md-7 p-1 m-0 text-right">
                                {{
                                  option.supplier ? option.supplier.name : "-"
                                }}
                              </div>
                            </div>
                          </template>
                          <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!form.po_supplier_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template>
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_po_suppliers.data.length || search"
                          >
                            <span
                              v-if="lookup_po_suppliers.current_page > 1"
                              @click="onGetPoSupplier(search, false)"
                              class="
                                flex-fill
                                bg-primary
                                text-white text-center
                              "
                              style="cursor: pointer"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_po_suppliers.last_page >
                                lookup_po_suppliers.current_page
                              "
                              @click="onGetPoSupplier(search, true)"
                              class="
                                flex-fill
                                bg-primary
                                text-white text-center
                              "
                              style="cursor: pointer"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6">
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-2 align-self-center mr-0">
                        <label for="supllier_id">Supplier</label>
                      </div>
                      <div class="col-sm-10 align-self-center ml-0 pl-0">
                        <v-select
                          label="name"
                          :loading="isLoadingGetSupplier"
                          :options="lookup_suppliers.data"
                          :filterable="false"
                          @search="onGetSupplier"
                          @input="onSetSupplier"
                          v-model="form.supplier_id"
                        >
                          <template v-slot:option="option">
                            <div class="row">
                              <div class="col-md-5 p-1 m-0">
                                {{ option.code }}
                              </div>
                              <div class="col-md-7 p-1 m-0 text-right">
                                {{ option.name }}
                              </div>
                            </div>
                          </template>
                          <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!form.supplier_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template>
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_suppliers.data.length || search"
                          >
                            <span
                              v-if="lookup_suppliers.current_page > 1"
                              @click="onGetSupplier(search, false)"
                              class="
                                flex-fill
                                bg-primary
                                text-white text-center
                              "
                              style="cursor: pointer"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_suppliers.last_page >
                                lookup_suppliers.current_page
                              "
                              @click="onGetSupplier(search, true)"
                              class="
                                flex-fill
                                bg-primary
                                text-white text-center
                              "
                              style="cursor: pointer"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex flex-row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-2 align-self-center mr-0">
                        <label for="addresss">Alamat</label>
                      </div>
                      <div class="col-sm-10 align-self-center ml-0 pl-0">
                        <input
                          class="form-control"
                          disabled
                          :value="
                            form.supplier_id
                              ? form.supplier_id.address || '-'
                              : '-'
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>                

                <div class="col-sm-6">
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-2 align-self-center">
                        <label for="type_discount">Disc</label>
                      </div>
                      <div class="col-sm-10 align-self-center">
                        <select
                          class="form-control form-control-sm"
                          v-model="form.discount_type"
                          @change="onChangeDiscountType()"
                        >
                          <option value="NOMINAL">Nominal (Rp)</option>
                          <option value="PERCENT">Persen (%)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex flex-row">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-2 align-self-center mr-0">
                        <label for="chart_of_account_id">
                          Kas
                        </label>
                      </div>
                      <div class="col-sm-10 align-self-center ml-0 pl-0">
                        <v-select
                          label="name"
                          :loading="isLoadingGetChartOfAccount"
                          :options="lookup_chart_of_accounts.data"
                          :filterable="false"
                          @search="onGetChartOfAccount"
                          @input="onSetChartOfAccount"
                          v-model="form.chart_of_account_id"
                          :disabled="form.transaction_type.toLowerCase()  === 'credit' || isEditable || (form.dp > 0 && form.po_supplier_id !== '')"
                        >
                          <template v-slot:option="option">
                            <div class="row">
                              <div class="col-md-5 p-1 m-0">
                                {{ option.code }}
                              </div>
                              <div class="col-md-7 p-1 m-0 text-right">
                                {{ option.name }}
                              </div>
                            </div>
                          </template>
                          <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!form.chart_of_account_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template>
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_chart_of_accounts.data.length || search"
                          >
                            <span
                              v-if="lookup_chart_of_accounts.current_page > 1"
                              @click="onGetChartOfAccount(search, false)"
                              class="
                                flex-fill
                                bg-primary
                                text-white text-center
                              "
                              style="cursor: pointer"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_chart_of_accounts.last_page >
                                lookup_chart_of_accounts.current_page
                              "
                              @click="onGetChartOfAccount(search, true)"
                              class="
                                flex-fill
                                bg-primary
                                text-white text-center
                              "
                              style="cursor: pointer"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                        <div class="text-info">*Jika tidak diisi maka akan mengambil default</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="clearfix mt-4">
                <span
                  class="btn btn-primary float-right"
                  @click="addDetail"
                  style="cursor: pointer"
                >
                  <i class="fas fa-plus"></i>
                  Tambah
                </span>
              </div>

              <div class="table-responsive table-striped">
                <table class="table table-sm mt-3">
                  <tr>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 8%"
                    >
                      Kode
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 40%"
                    >
                      Product
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Unit
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 5%"
                    >
                      Qty
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 8%"
                    >
                      Harga
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 6%"
                    >
                      Discount
                      <span v-if="form.discount_type == 'NOMINAL'"> Rp </span>
                      <span v-else> % </span>
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 6%"
                    >
                      PPN
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 6%"
                    >
                      Total
                    </td>
                    <td
                      class="text-left table-transaction-header"
                      style="width: 1%"
                    >
                      Opsi
                    </td>
                  </tr>

                  <tr
                    v-for="(item, index) in form.purchaseing_details"
                    :key="index"
                  >
                    <td class="table-transaction-row">
                      <input
                        type="text"
                        class="form-control"
                        :value="item.product_id ? item.product_id.code : '-'"
                        disabled
                      />
                    </td>

                    <td class="table-transaction-row">
                      <v-select
                        label="name"
                        :loading="isLoadingGetProduct"
                        :options="lookup_products.data"
                        :filterable="false"
                        @search="onGetProduct"
                        @input="onSetProduct(index)"
                        v-model="item.product_id"
                      >
                        <template v-slot:option="option">
                          <div class="row">
                            <div class="col-md-5 p-1 m-0">
                              {{ option.name }}
                            </div>
                            <div class="col-md-7 p-1 m-0 text-right">
                              {{ option.code }}
                            </div>
                          </div>
                        </template>
                        <template #search="{ attributes, events }">
                          <input
                            class="vs__search"
                            :required="!item.product_id"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_products.data.length || search"
                        >
                          <span
                            v-if="lookup_products.current_page > 1"
                            @click="onGetProduct(search, false)"
                            class="flex-fill bg-primary text-white text-center"
                            style="cursor: pointer"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_products.last_page >
                              lookup_products.current_page
                            "
                            @click="onGetProduct(search, true)"
                            class="flex-fill bg-primary text-white text-center"
                            style="cursor: pointer"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>

                    <td class="table-transaction-row">
                      <input
                        type="text"
                        class="form-control"
                        :value="
                          item.product_id ? item.product_id.purchase_unit : '-'
                        "
                        disabled
                      />
                    </td>
                    <td class="table-transaction-row">
                      <money
                        v-model="item.quantity"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        @keyup.native="itemChange(index)"
                      />
                    </td>
                    <td class="table-transaction-row">
                      <money
                        v-model="item.price"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        @keyup.native="itemChange(index)"
                      />
                    </td>
                    <td class="table-transaction-row">
                      <money
                        v-model="item.discount"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        @keyup.native="itemChange(index)"
                      />
                    </td>
                    <td class="table-transaction-row">
                      <money
                        v-model="item.tax"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        @keyup.native="itemChange(index)"
                      />
                    </td>
                    <td class="table-transaction-row">
                      <money
                        v-model="item.amount"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <td class="text-center table-transaction-row">
                      <i
                        class="fas fa-trash"
                        style="cursor: pointer"
                        @click="deleteDetail(index)"
                      ></i>
                    </td>
                  </tr>

                  <tr v-if="!form.purchaseing_details.length">
                    <td colspan="8" class="text-center pt-4 pb-4">
                      Data tidak ditemukan
                    </td>
                  </tr>

                  <tr>
                    <td colspan="5" class="text-left border-top table-success">
                      <input
                        class="form-control form-control-sm"
                        v-model="form.description"
                        aria-placeholder="Keterangan"
                        placeholder="Keterangan ...."
                      />
                    </td>
                    <td colspan="2" class="text-right pt-3">Total</td>
                    <td colspan="2">
                      <money
                        v-model="form.total"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                  </tr>

                  <tr>
                    <td colspan="7" class="text-right pt-3">
                      Discount

                      <div class="text-muted text-small">
                        <span v-if="form.discount_type == 'NOMINAL'">
                          * Rp
                        </span>
                        <span v-else> * % </span>
                      </div>
                    </td>
                    <td colspan="2">
                      <money
                        v-model="form.discount"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        @keyup.native="countTotal"
                      />
                    </td>
                  </tr>

                  <tr v-if="form.discount > 0.0">
                    <td colspan="7" class="text-right pt-3">
                      Total Stl Discount
                    </td>
                    <td colspan="2">
                      <money
                        v-model="form.total_discount_nominal"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        disabled
                      />
                    </td>
                  </tr>

                  <!-- <tr>
                    <td colspan="7" class="text-right pt-3">PPN</td>
                    <td colspan="2">
                      <money
                        v-model="form.tax"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                  </tr>
                  -->

                  <tr>
                    <td colspan="7" class="text-right pt-3">Grand Total</td>
                    <td colspan="2">
                      <money
                        v-model="form.grand_total"
                        class="form-control"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                  </tr>

                  <tr v-if="form.po_supplier_id">
                      <td colspan="7" class="text-right pt-3">Dp (Uang Muka)</td>
                      <td colspan="2">                                    
                          <money
                              class="form-control"
                              v-model="form.dp"                                    
                              @keyup.native="checkValidDp"
                          />                                                                                     
                      </td>         
                  </tr>

                  <tr v-if="form.dp > 0.00">
                      <td colspan="7" class="text-right pt-3">Grand Total Stl Dp</td>
                      <td colspan="2">
                          <money
                              class="form-control"
                              v-model="form.grand_total_and_dp"
                              disabled
                          />                                        
                      </td>
                  </tr>
                </table>
              </div>

              <button
                class="btn btn-primary"
                @click="validate().then(onSubmit(invalid))"
                type="button"
              >
                <span v-if="isLoadingForm">
                  <i class="fas fa-circle-notch fa-spin"></i>
                </span>
                <span v-else>
                  Simpan
                  <i class="fas fa-save"></i>
                </span>
              </button>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <div class="section-body" v-else>
      <div class="row">
        <div class="col-12">
          <div class="card" style="min-height: 300px">
            <div
              class="
                card-body
                d-flex
                flex-column
                justify-content-center
                align-items-center
              "
            >
              <div>Loading</div>
              <div><i class="fas fa-circle-notch fa-spin"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Pembelian",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,

      isLoadingPage: Number.isInteger(id) ? true : false,

      isLoadingForm: false,

      isStopSearchSupplier: false,
      isLoadingGetSupplier: false,
      supplier_search: "",

      isStopSearchPoSupplier: false,
      isLoadingGetPoSupplier: false,
      po_supplier_search: "",

      isStopSearchProduct: false,
      isLoadingGetProduct: false,
      product_search: "",

      isStopSearchChartOfAccount : false,
      isLoadingGetChartOfAccount : false,
      chart_of_account_search : "",

      form: {
        po_supplier_id: "",
        supplier_id: "",
        chart_of_account_id : "",
        code: "",
        description: "",
        date: moment().format("YYYY-MM-DD"),
        due_date: "",
        total: 0.0,
        // tax: 0.0,
        discount: 0.0,
        grand_total: 0.0,
        purchaseing_details: [],
        transaction_type: "CASH",
        discount_type: "NOMINAL",
        total_discount_nominal: 0.0,
        dp : 0.00,
        grand_total_and_dp : 0.00
      },

      default_form: {
        po_supplier_id: "",
        supplier_id: "",
        chart_of_account_id : "",
        code: "",
        description: "",
        date: moment().format("YYYY-MM-DD"),
        due_date: "",
        total: 0.0,
        // tax: 0.0,
        discount: 0.0,
        grand_total: 0.0,
        purchaseing_details: [],
        transaction_type: "CASH",
        discount_type: "NOMINAL",
        total_discount_nominal: 0.0,
        dp : 0.00,
        grand_total_and_dp : 0.00
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get(
          "purchaseing_module/purchaseing/" + this.id
        );

        Object.keys(this.form).forEach((item) => {
          if (item != "purchaseing_details") {
            if (item === "supplier_id") {
              this.form.supplier_id = response.data.supplier || "";
            } else if (item === "po_supplier_id") {
              this.form.po_supplier_id = response.data.po_supplier || "";
            } else if(item === "chart_of_account_id"){
              this.form.chart_of_account_id = response.data.chart_of_account || "";
            }else if(item === 'grand_total_and_dp'){
              let grand_total_and_dp = parseFloat(response.data["grand_total"]) - parseFloat(response.data["dp"]);

              this.form[item] = parseFloat(grand_total_and_dp);
            } else if (item === "total_discount_nominal") {
              if (response.data["discount_type"] == "NOMINAL") {
                this.form[item] = Math.ceil(
                  parseFloat(response.data["total"]) -
                    parseFloat(response.data["discount"])
                );
              } else {
                let total_discount =
                  parseFloat(response.data["total"]) *
                  (parseFloat(response.data["discount"]) / 100.0);

                this.form[item] = Math.ceil(
                  parseFloat(response.data["total"]) -
                    parseFloat(total_discount)
                );
              }
            } else {
              this.form[item] = response.data[item];
            }
          }
        });

        this.form.purchaseing_details = response.data.purchaseing_details.map(
          (item) => {
            return {
              ...item,
              product_id: item.product,
            };
          }
        );

        this.isLoadingPage = false;
      }
    } catch (err) {
      this.$router.push("/purchaseing_module/purchaseing");
    }
  },

  async mounted() {
    await this.onSearchPoSupplier();

    await this.onSearchSupplier();

    await this.onSearchProduct();

    await this.onSearchChartOfAccount();

    if (!this.isEditable) {
      this.setCode();
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "lookup_po_suppliers",
      "lookup_products",
      "lookup_suppliers",
      "lookup_chart_of_accounts",
      "code",
    ]),

    tax() {
      return this.$store.state.setting.settings.find(
        (item) => item.name == "tax"
      ).value;
    },

    limit_item_transaction() {
      return this.$store.state.setting.settings.find(
        (item) => item.name == "limit_item_transaction"
      ).value;
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp", "getCode"]),

    onGetSupplier(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSupplier);

      this.isStopSearchSupplier = setTimeout(() => {
        this.supplier_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchSupplier();
      }, 600);
    },

    async onSearchSupplier() {
      if (!this.isLoadingGetSupplier) {
        this.isLoadingGetSupplier = true;

        await this.lookUp({
          url: "purchaseing_module/purchaseing/get-supplier",
          lookup: "suppliers",
          query:
            "?search=" +
            this.supplier_search +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSupplier = false;
      }
    },

    onGetPoSupplier(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPoSupplier);

      this.isStopSearchPoSupplier = setTimeout(() => {
        this.po_supplier_search = search;

        if (typeof isNext !== "function") {
          this.lookup_po_suppliers.current_page = isNext
            ? this.lookup_po_suppliers.current_page + 1
            : this.lookup_po_suppliers.current_page - 1;
        } else {
          this.lookup_po_suppliers.current_page = 1;
        }

        this.onSearchPoSupplier();
      }, 600);
    },

    async onSearchPoSupplier() {
      if (!this.isLoadingGetPoSupplier) {
        this.isLoadingGetPoSupplier = true;

        await this.lookUp({
          url: "purchaseing_module/purchaseing/get-po-supplier",
          lookup: "po_suppliers",
          query:
            "?search=" +
            this.po_supplier_search +
            "&page=" +
            this.lookup_po_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPoSupplier = false;
      }
    },

    onGetProduct(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProduct);

      this.isStopSearchProduct = setTimeout(() => {
        this.product_search = search;

        if (typeof isNext !== "function") {
          this.lookup_products.current_page = isNext
            ? this.lookup_products.current_page + 1
            : this.lookup_products.current_page - 1;
        } else {
          this.lookup_products.current_page = 1;
        }

        this.onSearchProduct();
      }, 600);
    },

    async onSearchProduct() {
      if (!this.isLoadingGetProduct) {
        this.isLoadingGetProduct = true;

        await this.lookUp({
          url: "purchaseing_module/purchaseing/get-product",
          lookup: "products",
          query:
            "?search=" +
            this.product_search +
            "&page=" +
            this.lookup_products.current_page +
            "&per_page=5",
        });

        this.isLoadingGetProduct = false;
      }
    },

    onGetChartOfAccount(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchChartOfAccount);

      this.isStopSearchChartOfAccount = setTimeout(() => {
        this.chart_of_account_search = search;

        if (typeof isNext !== "function") {
          this.lookup_chart_of_accounts.current_page = isNext
            ? this.lookup_chart_of_accounts.current_page + 1
            : this.lookup_chart_of_accounts.current_page - 1;
        } else {
          this.lookup_chart_of_accounts.current_page = 1;
        }

        this.onSearchChartOfAccount();
      }, 600);
    },

    async onSearchChartOfAccount() {
      if (!this.isLoadingGetChartOfAccount) {
        this.isLoadingGetChartOfAccount = true;

        await this.lookUp({
          url: "purchaseing_module/purchaseing/get-chart-of-account",
          lookup: "chart_of_accounts",
          query:
            "?search=" +
            this.chart_of_account_search +
            "&page=" +
            this.lookup_chart_of_accounts.current_page +
            "&per_page=10" + 
            "&transaction_type="+this.form.transaction_type
        });

        this.isLoadingGetChartOfAccount = false;
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      if (!this.form.purchaseing_details.length) {
        this.$toaster.error("Detail Pembelian Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "purchaseing_module/purchaseing";

      let formData = {
        ...this.form,
        po_supplier_id:
          typeof this.form.po_supplier_id == "object"
            ? this.form.po_supplier_id.id
            : "",
        supplier_id:
          typeof this.form.supplier_id == "object"
            ? this.form.supplier_id.id
            : "",
        chart_of_account_id : 
          typeof this.form.chart_of_account_id == "object"
            ? this.form.chart_of_account_id.id 
            : ""
      };

      formData.purchaseing_details = formData.purchaseing_details.map(
        (item) => {
          return {
            quantity: item.quantity,
            price: item.price,
            amount: item.amount,
            discount: item.discount,
            tax : item.tax,
            product_id:
              typeof item.product_id == "object" ? item.product_id.id : "",
          };
        }
      );

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        url: url,
        method: this.isEditable ? "put" : "post",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Pembelian"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              purchaseing_details: [],
            };

            this.setCode();

            this.onSearchPoSupplier();
          }
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
        });
    },

    async setCode() {
      await this.getCode({
        url: "purchaseing_module/purchaseing",
        query: "",
      });

      this.form.code = this.code;
    },

    addDetail() {
      if (
        parseInt(this.limit_item_transaction) <=
        this.form.purchaseing_details.length
      ) {
        this.$toaster.error(
          "Hanya " +
            this.limit_item_transaction +
            " batas item yang di perbolehkan"
        );
        return;
      }

      this.form.purchaseing_details.push({
        product_id: "",
        quantity: 0.0,
        price: 0.0,
        amount: 0.0,
        discount: 0.0,
        tax : 0.0
      });
    },

    deleteDetail(indexItem) {
      this.form.purchaseing_details = this.form.purchaseing_details.filter(
        (_, index) => index != indexItem
      );

      this.countTotal();
    },

    onChangeDiscountType() {
      this.form.purchaseing_details.forEach((_, index) => {
        this.itemChange(index);
      });
    },

    itemChange(index) {
      let detail = {
        ...this.form.purchaseing_details[index],
      };

      let discount_type = this.form.discount_type;

      if (
        parseFloat(detail.quantity) >= 0.0 &&
        parseFloat(detail.price) >= 0.0
      ) {
        if (discount_type == "NOMINAL") {
          if (parseFloat(detail.discount) > parseFloat(detail.price)) {
            detail.discount = parseFloat(detail.price);
          }

          detail.amount =
            (parseFloat(detail.price) - parseFloat(detail.discount)) *
            parseFloat(detail.quantity);
        } else {
          if (parseFloat(detail.discount) > 100.0) {
            detail.discount = 100.0;
          }

          if (parseFloat(detail.discount) <= 0.0) {
            detail.discount = 0.0;
          }

          let total_discount =
            (parseFloat(detail.price) * parseFloat(detail.discount)) / 100;

          detail.amount =
            (parseFloat(detail.price) - total_discount) *
            parseFloat(detail.quantity);
        }
        
        if(
          this.form.purchaseing_details[index].product_id 
          &&
          this.form.purchaseing_details[index].product_id.is_tax
        ){
          
          this.form.purchaseing_details[index].tax = parseFloat(Math.ceil(detail.amount)) * (this.tax / 100);          
        }else{
          this.form.purchaseing_details[index].tax = 0;
        }

        this.form.purchaseing_details[index].amount = parseFloat(Math.ceil(detail.amount)) + this.form.purchaseing_details[index].tax;

        this.form.purchaseing_details[index].discount = detail.discount;

        this.countTotal();
      }
    },

    countTotal() {
      let {
        total,
        discount,
        total_discount_nominal,
        // tax,
        grand_total,
        discount_type,
      } = this.form;

      // let taxSetting = this.tax;

      let details = [...this.form.purchaseing_details];

      let total_discount = 0.0;

      total = details.reduce(
        (amount, item) => parseFloat(amount) + parseFloat(item.amount),
        0.0
      );

      if (discount_type == "NOMINAL") {
        if (
          parseFloat(discount) > parseFloat(total) &&
          parseFloat(total) > 0.0
        ) {
          discount = total;
        }

        if (parseFloat(total) <= 0.0) {
          discount = 0.0;
        }

        total_discount = parseFloat(discount);
      } else {
        if (parseFloat(discount) > 100.0) {
          discount = 100.0;
        }

        if (parseFloat(total) <= 0.0) {
          discount = 0.0;
        }

        total_discount = (parseFloat(total) * parseFloat(discount)) / 100.0;
      }

      total_discount_nominal = parseFloat(total) - parseFloat(total_discount);

      grand_total  = total_discount_nominal;

      // tax = parseFloat(taxSetting) * (parseFloat(total_discount_nominal) / 100.0);

      // grand_total = parseFloat(total_discount_nominal) + parseFloat(tax);

      this.form = {
        ...this.form,
        discount,
        total_discount_nominal: Math.ceil(total_discount_nominal),
        total: Math.ceil(total),
        // tax: Math.ceil(tax),
        grand_total: Math.ceil(grand_total),
      };
    },

    onSetProduct(index) {
      let details = [...this.form.purchaseing_details];

      let itemProduct = {
        ...this.form.purchaseing_details[index],
      };

      if (!itemProduct.product_id) {
        this.form.purchaseing_details[index].product_id = "";
        return;
      }

      let product = itemProduct.product_id;

      let products = details.filter(
        (item) => (item.product_id ? item.product_id.id : 0) === product.id
      );

      if (products.length < 2) {
        this.form.purchaseing_details[index].price = product.purchase_price;
      } else {
        this.$toaster.error("Product sudah ada di dalam list");

        this.form.purchaseing_details = details.filter(
          (_, indexItem) => index != indexItem
        );
      }
    },

    onSetPoSupplier(item) {
      if (item) {
        this.form = {
          ...this.form,

          supplier_id: item.supplier || "",
          // date : item.date,
          total: item.total,
          discount: item.discount,
          // tax: item.tax,
          grand_total: item.grand_total,
          description: item.description,
          discount_type : item.discount_type,
          
          dp : item.purchaseing_dps_sum_amount || 0.00,          

          purchaseing_details: item.po_supplier_details.map((item) => {
            return {
              product_id: item.product,
              quantity: item.quantity,
              price: item.price,
              amount: item.amount,
              tax : item.tax,
              discount: item.discount,
            };
          }),
        };

        this.form.purchaseing_details.forEach((_, index) => {
          this.itemChange(index);
        });
      } else {
        this.form.po_supplier_id = "";
      }
    },

    onSetSupplier(item) {
      if (!item) {
        this.form.supplier_id = "";
      }
    },

    checkValidDp(){
        let dp = this.form.dp;
        let grand_total = this.form.grand_total;

        if(parseFloat(dp) > parseFloat(grand_total)){
            this.form.dp = grand_total;
        }

        this.form.grand_total_and_dp = parseFloat(grand_total) - parseFloat(this.form.dp);
    },

    onSetChartOfAccount(item){
      if(!item){
        this.form.chart_of_account_id = "";
      }
    },

    onChangeTransactionType(){
      if(this.form.transaction_type.toLowerCase()  !== "cash"){      
        this.form.chart_of_account_id = '';
      }
    }
  },
};
</script>
