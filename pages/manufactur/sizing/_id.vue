<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between">
              <h6>
                {{ isEditable ? "Edit" : "Tambah" }} Data Proses Sizing
              </h6>

              <button class="btn btn-primary btn-sm" 
                @click="$router.back()">
                <i class="fas fa-arrow-left"></i>
                Kembali
              </button>
            </div>
          </div>

          <ValidationObserver
            v-slot="{ invalid, validate }"
            ref="form-validate">
            <form
              @submit.prevent="() => console.log('Submit')"
              autocomplete="off">
              <div class="container m-0 p-0">
                <div class="d-flex flex-row">
                  <div class="col-sm-6">
                    <ValidationProvider name="code" rules="required">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <div class="row">
                          <div class="col-sm-2 align-self-center">
                            <label for="code">No Sizing </label>
                          </div>
                          <div class="col-sm-10 align-self-center">
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              name="no_sizing"
                              v-model="form.no_sizing"
                              :class="
                                errors[0]
                                  ? 'is-invalid'
                                  : valid
                                  ? 'is-valid'
                                  : ''
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

                  <div class="col-sm-6">
                    <div class="form-group">
                      <div class="row" style="heigth:30px">
                        <div class="col-sm-2 align-self-center">
                          <label for="work_order_id">No Batch</label>
                        </div>
                        <div class="col-sm-10 align-self-center">
                          <v-select
                            label="no_batch"
                            :loading="isLoadingGetWorkOrder"
                            :options="lookup_work_orders.data"
                            :filterable="false"
                            @search="onGetWorkOrder"
                            @input="onSetWorkOrder"
                            v-model="form.production_detail_id"
                            :disabled="isEditable"
                          >
                            <template v-slot:option="option">
                              <!-- <div class="row">
                                <div class="col-md-5 p-1 m-0"> -->
                                  {{ option.no_batch }}
                                <!-- </div>
                                <div class="col-md-7 p-1 m-0 text-right">
                                  {{ option.name }}
                                </div>
                              </div> -->
                            </template>
                            <template #search="{ attributes, events }">
                              <input
                                class="vs__search"
                                :required="!form.production_detail_id"
                                v-bind="attributes"
                                v-on="events"
                              />
                            </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="d-flex justify-content-between"
                              v-if="lookup_work_orders.data.length || search"
                            >
                              <span
                                v-if="lookup_work_orders.current_page > 1"
                                @click="onGetWorkOrder(search, false)"
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
                                  lookup_work_orders.last_page >
                                  lookup_work_orders.current_page
                                "
                                @click="onGetWorkOrder(search, true)"
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
              </div>  
              <div class="container m-0 p-0">
                <div class="d-flex flex-row">
                  <div class="col-sm-6">
                    <ValidationProvider name="date" rules="required">
                      <div class="form-group " slot-scope="{ errors, valid }">
                        <div class="row">
                          <div class="col-sm-2 align-self-center">
                            <label for="date">Tgl</label>
                          </div>
                          <div class="col-sm-10 align-self-center">
                            <input
                              type="date"
                              class="form-control form-control-sm"
                              name="tanggal"
                              v-model="form.tanggal"
                              :class="
                                errors[0]
                                  ? 'is-invalid'
                                  : valid
                                  ? 'is-valid'
                                  : ''
                              "
                            />
                          </div>
                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>  

                   <div class="col-sm-6">
                      <ValidationProvider name="code" rules="required">
                        <div class="form-group" slot-scope="{ errors, valid }">
                          <div class="row">
                            <div class="col-sm-2 align-self-center">
                              <label for="code">Set Sizing </label>
                            </div>
                            <div class="col-sm-10 align-self-center">
                              <input
                                type="text"
                                class="form-control form-control-sm"
                                name="no_sizing"
                                v-model="form.set_sizing"
                                :class="errors[0]
                                    ? 'is-invalid'
                                    : valid
                                      ? 'is-valid'
                                      : ''
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
                    </div>
                </div> 

                <div class="container m-0 p-0">
                  <div class="d-flex flex-row"> 
                    <div class="col-sm-6">
                        <ValidationProvider name="code" rules="required">
                          <div class="form-group" slot-scope="{ errors, valid }">
                            <div class="row">
                              <div class="col-sm-2 align-self-center">
                                <label for="code">Regu</label>
                              </div>
                              <div class="col-sm-10 align-self-center">
                                  <v-select           
                                    label="name"  
                                    :loading="isLoadingGetRegu"
                                    :options="lookup_regus.data"
                                    :filterable="false"
                                    @search="onGetRegu"
                                    v-model="form.regu_id"
                                    :required="true">     
                                    <template v-slot:option="option">                    
                                      {{ option.name }}
                                    </template> 
                                    <template #search="{ attributes, events }">
                                      <input
                                        class="vs__search"
                                        :required="!form.regu_id"
                                        v-bind="attributes"
                                        v-on="events"
                                      />
                                    </template>        
                                    <li slot-scope="{search}" slot="list-footer"
                                      class="d-flex justify-content-between"
                                      v-if="lookup_regus.data.length || search">
                                      <span v-if="lookup_regus.current_page > 1" 
                                        @click="onGetRegu(search, false)"
                                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                                        >Sebelumnya</span>
                                      <span v-if="lookup_regus.last_page > lookup_regus.current_page" 
                                        @click="onGetRegu(search, true)"
                                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                                        >Selanjutnya</span>
                                    </li> 
                                  </v-select> 
                                <div class="invalid-feedback" v-if="errors[0]">
                                  {{ errors[0] }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </ValidationProvider>
                      </div>  
                       <div class="col-sm-6">
                        <ValidationProvider name="code" rules="required">
                          <div class="form-group" slot-scope="{ errors, valid }">
                            <div class="row">
                              <div class="col-sm-2 align-self-center">
                                <label for="code">Benang No/EX </label>
                              </div>
                              <div class="col-sm-10 align-self-center">
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  name="benang_ex_sizing"
                                  v-model="form.benang_ex_sizing"
                                  :class="errors[0]
                                      ? 'is-invalid'
                                      : valid
                                        ? 'is-valid'
                                        : ''
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
                </div>
              </div>                    

              <div class="container m-0 p-0">
                    <div class="d-flex flex-row"> 
                      <div class="col-sm-6">
                           <ValidationProvider name="code" rules="required">
                              <div class="form-group" slot-scope="{ errors, valid }">
                                <div class="row">
                                  <div class="col-sm-2 align-self-center">
                                    <label for="code">Total Jumlah Benang</label>
                                  </div>
                                  <div class="col-sm-10 align-self-center">
                                    <input
                                      type="text"
                                      class="form-control form-control-sm"
                                      name="total_panjang_benang"
                                      v-model="form.total_panjang_benang"
                                      :class="errors[0]
                                          ? 'is-invalid'
                                          : valid
                                            ? 'is-valid'
                                            : ''
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
                         <div class="col-sm-6">
                          <ValidationProvider name="code" rules="required">
                            <div class="form-group" slot-scope="{ errors, valid }">
                              <div class="row">
                                <div class="col-sm-2 align-self-center">
                                  <label for="code">Lebar Beam Sizing</label>
                                </div>
                                <div class="col-sm-10 align-self-center">
                                  <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    name="lebar_beam"
                                    v-model="form.lebar_beam"
                                    :class="errors[0]
                                        ? 'is-invalid'
                                        : valid
                                          ? 'is-valid'
                                          : ''
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
                  </div>
                </div>   
                 <div class="container m-0 p-0">
                      <div class="d-flex flex-row"> 
                        <div class="col-sm-6">
                             <ValidationProvider name="code" rules="required">
                                <div class="form-group" slot-scope="{ errors, valid }">
                                  <div class="row">
                                    <div class="col-sm-2 align-self-center">
                                      <label for="code">Total Beam</label>
                                    </div>
                                    <div class="col-sm-10 align-self-center">
                                      <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        name="total_beam"
                                        v-model="form.total_beam"
                                        :class="errors[0]
                                            ? 'is-invalid'
                                            : valid
                                              ? 'is-valid'
                                              : ''
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
                           <div class="col-sm-6">
                            <ValidationProvider name="code" rules="required">
                              <div class="form-group" slot-scope="{ errors, valid }">
                                <div class="row">
                                  <div class="col-sm-2 align-self-center">
                                    <label for="code">Temp Cycl Dryer</label>
                                  </div>
                                  <div class="col-sm-10 align-self-center">
                                    <input
                                      type="text"
                                      class="form-control form-control-sm"
                                      name="temp"
                                      v-model="form.temp"
                                      :class="errors[0]
                                          ? 'is-invalid'
                                          : valid
                                            ? 'is-valid'
                                            : ''
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
                    </div>
                  </div>  
                  
                   <div class="container m-0 p-0">
                      <div class="d-flex flex-row"> 
                        <div class="col-sm-6">
                             <ValidationProvider name="code" rules="required">
                                <div class="form-group" slot-scope="{ errors, valid }">
                                  <div class="row">
                                    <div class="col-sm-2 align-self-center">
                                      <label for="code">Speed</label>
                                    </div>
                                    <div class="col-sm-10 align-self-center">
                                      <input
                                        type="number"
                                        class="form-control form-control-sm"
                                        name="speed"
                                        v-model="form.speed"
                                        :class="errors[0]
                                            ? 'is-invalid'
                                            : valid
                                              ? 'is-valid'
                                              : ''
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
                           <div class="col-sm-6">
                            <ValidationProvider name="code" rules="required">
                              <div class="form-group" slot-scope="{ errors, valid }">
                                <div class="row">
                                  <div class="col-sm-2 align-self-center">
                                    <label for="code">Size Box Temp</label>
                                  </div>
                                  <div class="col-sm-10 align-self-center">
                                    <input
                                      type="number"
                                      class="form-control form-control-sm"
                                      name="size_box_temp_sizing"
                                      v-model="form.size_box_temp_sizing"
                                      :class="errors[0]
                                          ? 'is-invalid'
                                          : valid
                                            ? 'is-valid'
                                            : ''
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
                    </div>
                  </div>   
                      

              <div class="clearfix mt-2">
                <span
                  class="btn btn-primary float-right btn-sm"
                  @click="addDetail"
                  style="cursor: pointer"
                >
                  <i class="fas fa-plus"></i>
                  Tambah
                </span>
              </div>

              <div class="table-striped">
                <table class="table table-sm mt-3">
                  
                  <tr>
                    <td rowspan="2"
                        class="text-left table-transaction-header"
                        style="width: 3%"
                      >
                        Pilih
                      </td>
                    <td rowspan="2"
                      class="text-left table-transaction-header"
                      style="width: 8%"
                    >
                      Beam Ke
                    </td>
                    <td rowspan="2"
                      class="text-left table-transaction-header"
                      style="width: 8%"
                    >
                      No Beam
                    </td>                
                    <td rowspan="2"
                      class="text-left table-transaction-header"
                      style="width: 10%"
                    >
                      Grup
                    </td>
                    <td rowspan="2"
                            class="text-center table-transaction-header"
                            style="width: 5%"
                          >
                            Panjang
                          </td> 
                     <td colspan="3"
                          class="text-center table-transaction-header "
                          style="width: 5%"
                        >
                          Berat KG
                        </td> 
                      
                   
                    <td rowspan="2"
                          class="text-left table-transaction-header"
                          style="width: 5%"
                        >
                          Size Box Temp
                    </td>  
                    <td rowspan="2"
                            class="text-left table-transaction-header"
                            style="width: 5%"
                          >
                            Viscositas
                    </td>  
                    <td colspan="2"
                            class="text-center table-transaction-header "
                            style="width: 5%"
                          >
                            Jam Proses
                          </td>                            
                    
                    <!-- <td
                      class="text-left table-transaction-header"
                      style="width: 10%"
                    >
                      Deskripsi
                    </td> -->
                    <td rowspan="2"
                      class="text-left table-transaction-header"
                      style="width: 3%"
                    >
                      SPU (%)
                    </td>
                  </tr>

                  <tr>
                    
                      <td
                          class="text-center table-transaction-header"
                          style="width: 5%"
                        >
                          Bruto
                        </td>         
                      <td
                        class="text-center table-transaction-header"
                        style="width: 5%"
                      >
                        Tara
                      </td> 
                       <td
                          class="text-left table-transaction-header"
                          style="width: 5%"
                        >
                          Netto
                      </td>   
                      <td
                                class="text-left table-transaction-header"
                                style="width: 5%"
                              >
                                Start
                      </td>
                      <td
                                  class="text-left table-transaction-header"
                                  style="width: 5%"
                                >
                                  Finish
                      </td>
                  </tr>
                  <tr
                    v-for="(item, index) in form.production_details"
                    :key="index"
                  >
                  <td class="table-transaction-row text-center">
                         <input type="checkbox" 
                                  :value="aa"  
                                  v-model="item.checkbox" />
                        <input
                            type="hidden"
                            class="form-control"
                            :value="item.production_detail_proces_id"
                            disabled
                          />
                                  
                      </td>
                    <td class="table-transaction-row">
                      <input
                        type="text"
                        class="form-control"
                        :value="item.beam_ke"
                        disabled
                      />
                    </td>
                    <td class="table-transaction-row">
                        <input
                          type="text"
                          class="form-control"
                          :value="item.no_beam"
                          disabled
                        />
                    </td>
                    <!-- <td class="table-transaction-row">
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
                    </td> -->

                    <td class="table-transaction-row">
                        <input
                            type="text"
                            class="form-control"
                            :value="item.no_beam"
                            disabled
                          />
                      </td>  
                      
                      <td class="table-transaction-row">
                            <input
                              type="text"
                              class="form-control"
                              :value="item.panjang_benang"
                              disabled
                            />
                      </td>

                    <td class="table-transaction-row">
                      <input
                                type="number"
                                class="form-control"
                                v-model="item.berat_bruto"
                                @keydown.native="$event.key === '-' ? $event.preventDefault() : null
                                  "
                          @keyup.native="countNetto(index)"
                                
                              />
                    </td>    

                    <td class="table-transaction-row">
                     <input
                                  type="number"
                                  class="form-control"
                                  v-model="item.tara"
                                  @keydown.native="$event.key === '-' ? $event.preventDefault() : null
                                    "
                            @keyup.native="countNetto(index)"

                                /> 
                    </td>    
                    
                    <td class="table-transaction-row">
                       <input
                                    type="number"
                                    class="form-control"
                            name="netto"

                                    v-model="item.netto"
                                  /> 
                    </td>

                    <td class="text-center table-transaction-row">
                      <input
                                    type="text"

                            v-model="item.size_box_temp_sizing"
                            name="no_batch"
                            class="form-control"
                          />
                    </td>
                    <td class="text-center table-transaction-row">
                        <input
                              v-model="item.viscositas_sizing"
                          
                              name="no_batch"
                              class="form-control"
                              @keydown.native="$event.key === '-' ? $event.preventDefault() : null
                                "
                            />
                      </td>
                      <td class="text-center table-transaction-row">
                        <input
                              v-model="item.mulai_sizing"
                          
                              name="no_batch"
                              class="form-control"
                              @keydown.native="$event.key === '-' ? $event.preventDefault() : null
                                "
                            />
                      </td>
                      <td class="text-center table-transaction-row">
                        <input
                              v-model="item.selesai_sizing"
                          
                              name="no_batch"
                              class="form-control"
                              @keydown.native="$event.key === '-' ? $event.preventDefault() : null
                                "
                            />
                      </td>
                      <td class="text-center table-transaction-row">
                        <input
                              v-model="item.spu_sizing"
                          
                              name="no_batch"
                              class="form-control"
                              @keydown.native="$event.key === '-' ? $event.preventDefault() : null
                                "
                            />
                      </td>
                  </tr>

                  <tr v-if="!form.production_details.length">
                    <td colspan="13" class="text-center pt-4 pb-4">
                      Data tidak ditemukan
                    </td>
                  </tr>
                  
                  <tr>
                    <td colspan="8" class="text-left border-top table-success">                        
                        <input
                          class="form-control form-control-sm"
                          v-model="form.description"
                          aria-placeholder="Keterangan"
                          placeholder="Keterangan ...."
                          name="description"
                        />                        
                     </td>                   
                  </tr>                  
                </table>
                
                <div class="mt-5 mb-5" style="height: 100px"></div>
              </div>

              <button class="btn btn-primary mt-3"
                @click="validate().then(onSubmit(invalid))"
                type="button">
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
              ">
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
  middleware : ['checkRoleUserDetail'],

  head() {
    return {
      title: "Rencana Proses Produksi",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,

      isLoadingPage: Number.isInteger(id) ? true : false,

      isLoadingForm: false,
    
      isStopSearchWorkOrder: false,
      isLoadingGetWorkOrder: false,
      work_order_search: "",

      isStopSearchProduct : false,
      isLoadingGetProduct : false,
      product_search : "",

      form: {
        production_detail_id : "",
        description: "",
        quantity : 0.00,
        tanggal: moment().format("YYYY-MM-DD"),
        production_details: [],
        master_proces_id: "1",
        no_batch: "",
        regu_id: 0,
        no_sizing: "",
        set_sizing: "",
        total_panjang_benang: 0,
        lebar_beam: 0,
        temp: 0,
        speed: 0,
        size_box_temp_sizing: "",
        benang_ex_sizing: "",
        total_beam: 0,
        lebar_beam: 0,
        total_panjang_benang: 0,
      },       

      default_form: {
        production_detail_id : "",
        description: "",
        quantity : 0.00,
        tanggal: moment().format("YYYY-MM-DD"),
        production_details: [],
        master_proces_id: "1",
        no_batch: "",
        regu_id: 0,
        no_sizing: "",
        set_sizing: "",
        total_panjang_benang: 0,
        lebar_beam: 0,
        temp: 0,
        speed: 0,
        size_box_temp_sizing: "",
        benang_ex_sizing: "",
        total_beam: 0,
        lebar_beam: 0,
        total_panjang_benang: 0,

      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("manufactur/productionproses/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != "production_details") {
            if(item === "work_order_id"){
              this.form[item] = response.data.work_order;
            }else {
              this.form[item] = response.data[item];
            }
          }
        });

        this.form.production_details = response.data.production_details.map(
          (item) => {
            return {
              ...item,
              product_id: item.product,
              units_id: item.units,
              netto: item.netto,

            };
          }
        );
        this.isLoadingPage = false;
      }

    } catch (err) {
      this.$router.push("/manufactur/productionproses");
    }
  },

  async mounted() {
    await this.onSearchWorkOrder();

    await this.onSearchProduct();
    await this.lookUp({
      url: "master/regu",
      lookup: "regus",
      query: "?order=name&sort=asc",
    });
    

    // if (!this.isEditable) {
    //   this.setCode();
    // };
  },



  computed: {
    ...mapState("moduleApi", [
      "lookup_products",
      "lookup_regus",
      "lookup_work_orders",
      "code"
    ])
  },

  methods: {
    ...mapActions("moduleApi", [
      "lookUp", 
      "getCode"
    ]),

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
          url: "manufactur/production/get-product",
          lookup: "products",
          query:          
            "?search=" + this.product_search +
            "&page=" + this.lookup_products.current_page +  
            "&per_page=5",
        });

        this.isLoadingGetProduct = false;
      }
    },

    onGetWorkOrder(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchWorkOrder);

      this.isStopSearchWorkOrder = setTimeout(() => {
        this.work_order_search = search;

        if (typeof isNext !== "function") {
          this.lookup_work_orders.current_page = isNext
            ? this.lookup_work_orders.current_page + 1
            : this.lookup_work_orders.current_page - 1;
        } else {
          this.lookup_work_orders.current_page = 1;
        }

        this.onSearchWorkOrder();
      }, 600);
    },

    async onSearchWorkOrder() {
      if (!this.isLoadingGetWorkOrder) {
        this.isLoadingGetWorkOrder = true;

        await this.lookUp({
          url: "manufactur/productionproses",
          lookup: "work_orders",
          query:
            "?search=" +  this.work_order_search +
            "&page=" + this.lookup_work_orders.current_page +
            "&master_proces_id= 2" +

            "&per_page=5",
        });

        this.isLoadingGetWorkOrder = false;
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      if (!this.form.production_details.length) {
        this.$toaster.error("Detail Produksi Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "manufactur/productionsizing";

      let formData = {
        ...this.form,
        master_proces_id: "3",
        production_detail_id:
          typeof this.form.production_detail_id == "object"
            ? this.form.production_detail_id.id
            : "",   
        regu_id:
          typeof this.form.regu_id == "object"
            ? this.form.regu_id.id
            : "",
      };

      formData.production_detail_proces = formData.production_details.map((item) => {
        return {    
          production_detail_proces_id: item.production_detail_proces_id,
          checkbox: item.checkbox,
          size_box_temp_sizing: item.size_box_temp_sizing,
          viscositas_sizing : item.viscositas_sizing,
          mulai_sizing: item.mulai_sizing,
          selesai_sizing: item.selesai_sizing,
          spu_sizing: item.spu_sizing,
          // units_id: typeof item.units_id == "object"
          //   ? item.units_id.id
          //   : "",
          // product_id:
          //   typeof item.product_id == "object" 
          //     ? item.product_id.id 
          //     : "",
        };
      });

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        url: url,
        method: this.isEditable ? "put" : "post",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success("Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Rencana Proses Produksi");

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              production_details: [],
            };

            this.setCode();
            
            this.$refs['form-validate'].reset();

            this.onPrint(res.data.id);

            this.onSearchWorkOrder();
          }
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
        });
    },

    onPrint(id) {
      this.$confirm({
        message: "Apakah anda ingin menampilkan halaman print",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: async (confirm) => {
          if (confirm) {
            var token = this.$cookiz
              .get("auth._token.local")
              .replace("Bearer ", "");

            window.open(
              process.env.API_URL +
                "/manufactur/production/get-print-detail/" +
                id +
                "?token=" +
                token,
              "_blank"
            );
          }
        },
      });
    },

  

    addDetail() {      
      this.form.production_details.push({
        product_id: "",
        netto: 0,

        quantity: 0.0,     
        quantity_finish : 0.0,     
        description : ""        
      });
    },

    deleteDetail(indexItem) {
      this.form.production_details = this.form.production_details.filter(
        (_, index) => index != indexItem
      );
    },

    countNetto(index) {
      let detail = {
        ...this.form.production_details[index],
      };

        detail.netto = detail.berat_bruto - detail.tara;
      this.form.production_details[index].netto = detail.netto;
        return

    },

    onSetProduct(index){    
      let itemProduct = {
        ...this.form.production_details[index],            
      };

      if(!itemProduct.product_id) {
        this.form.production_details[index].product_id = '';
        return
      };
    },

    onSetWorkOrder(item){
      if(item){
        this.form.production_details = item.detail_production_proses.map(item => {
          return {
            checkbox: false,
            beam_ke: item.beam_ke,
            tanggal: item.tanggal,
            no_beam: item.no_beam,
            regu: item.regu.name,
            panjang_benang: item.panjang_benang,
            berat_bruto: item.berat_bruto,
            tara: item.tara,
            netto: item.berat_bruto - item.tara,
            jumlah_benang: item.jumlah_benang,
            no_benang: item.no_benang,
            production_detail_proces_id: item.id,
          }
        })
        console.log(item);
      }else{
        this.form.production_detail_id = "";
      }
    }
  },
};
</script>
