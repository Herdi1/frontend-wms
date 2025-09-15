<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <div class="d-flex justify-content-between">
                  <h6>{{ isEditable ? "Edit" : "Tambah" }} Production Activity</h6>

                  <button class="btn btn-primary" @click="$router.back()">
                    <i class="fas fa-arrow-left"></i>
                    Kembali
                  </button>
                </div>
              </div>
              <!-- <ValidationProvider name="purchase_unit" rules="required">
                          <div class="form-group" slot-scope="{ errors, valid }">
                            <label for="purchase_unit">Proses</label>

                            <v-select
                          label="name"
                          :loading="isLoadingGetProces"
                          :options="lookup_proces.data"
                          :filterable="false"
                          @search="onGetProces"
                          @input="onChangeType"

                          v-model="form.master_proces_id"
                          :disabled="isEditable"
                            
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
                              :required="!form.master_proces_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template>
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_proces.data.length || search"
                          >
                            <a
                              v-if="lookup_proces.current_page > 1"
                              @click="onGetProces(search, false)"
                              class="flex-fill bg-primary text-white text-center"
                              href="#"
                              >Sebelumnya</a
                            >
                            <a
                              v-if="lookup_proces.last_page >
                                lookup_proces.current_page
                                "
                              @click="onGetProces(search, true)"
                              class="flex-fill bg-primary text-white text-center"
                              href="#"
                              >Selanjutnya</a
                            >
                          </li>
                        </v-select>
                            <div class="invalid-feedback" v-if="errors[0]">
                              {{ errors[0] }}
                            </div>
                          </div>
              </ValidationProvider> -->

              <ValidationObserver
                  v-slot="{ invalid, validate }"
                  ref="form-validate">
                  <form
                    @submit.prevent="validate().then(onSubmit(invalid))"
                    autocomplete="off">

                    <div class="row">
                      <div class="col-md-6">

                      
                    <ValidationProvider name="code" rules="required">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <label for="code">Kode                      
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="code"
                          v-model="form.code"
                          :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                            "
                          disabled
                        />

                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                        </div>

                        <div class="col-md-6">

                    <ValidationProvider name="tanggal" rules="required">
                            <div class="form-group" slot-scope="{ errors, valid }">
                              <label for="tanggal">Tanggal</label>
                              <input type="date" 
                          class="form-control"
                          v-model="form.tanggal" :class="errors[0]
                            ? 'is-invalid'
                            : valid
                              ? 'is-valid'
                              : ''
                            "/>  
                              <div class="invalid-feedback" v-if="errors[0]">
                                {{ errors[0] }}
                              </div>
                            </div>
                    </ValidationProvider>
                    </div>
                      </div>

                    <div class="row">
                      <div class="col-md-6">

                    <div class="form-group">
                        <label for="supplier_id">No Mesin</label>
                        <v-select
                          label="name"
                          :loading="isLoadingGetMesin"
                          :options="lookup_mesin.data"
                          :filterable="false"
                          @search="onGetMesin"
                          v-model="form.master_machine_id"
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
                              :required="!form.master_machine_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template>
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_mesin.data.length || search"
                          >
                            <a
                              v-if="lookup_mesin.current_page > 1"
                              @click="onGetMesin(search, false)"
                              class="flex-fill bg-primary text-white text-center"
                              href="#"
                              >Sebelumnya</a
                            >
                            <a
                              v-if="lookup_mesin.last_page >
                                lookup_mesin.current_page
                                "
                              @click="onGetMesin(search, true)"
                              class="flex-fill bg-primary text-white text-center"
                              href="#"
                              >Selanjutnya</a
                            >
                          </li>
                        </v-select>
                      </div>
                        </div>

                      <div class="col-md-6">
   <div class="form-group">
                          <label for="customer_id">No Batch</label>
                          <v-select
                            label="no_batch"
                            :loading="isLoadingGetProductionDetail"
                            :options="lookup_customers.data"
                            :filterable="false"
                            @search="onGetCustomer"
                            v-model="form.production_detail_id"
                          >
                            <template v-slot:option="option">
                          
                                  {{ option.no_batch }}
                            
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
                              v-if="lookup_customers.data.length || search"
                            >
                              <a
                                v-if="lookup_customers.current_page > 1"
                                @click="onGetSupplier(search, false)"
                                class="flex-fill bg-primary text-white text-center"
                                href="#"
                                >Sebelumnya</a
                              >
                              <a
                                v-if="lookup_customers.last_page >
                                  lookup_customers.current_page
                                  "
                                @click="onGetSupplier(search, true)"
                                class="flex-fill bg-primary text-white text-center"
                                href="#"
                                >Selanjutnya</a
                              >
                            </li>
                          </v-select>
                        </div>


                      
                      </div>
                      </div>
                        <div class="row">
<div class="col-md-10">
  <div class="form-group">
                            <label for="supplier_id">Ex Start #</label>
                            <v-select
                              label="code"
                              :loading="isLoadingGetExMesin"
                              :options="lookup_custom3.data"
                              :filterable="false"
                              @search="onGetExMesin"
                            @input="onSetExMesin"

                              v-model="form.production_planning_id"
                            >
                              <template v-slot:option="option">
                                <div class="row">
                                  <div class="col-md-5 p-1 m-0">
                                    {{ option.code }}
                                  </div>
                                  <div class="col-md-7 p-1 m-0 text-right">
                                    {{ option.production_detail.product ? option.production_detail.product.name : '-' }}
                                  </div>
                                </div>
                              </template>
                              <template #search="{ attributes, events }">
                                <input
                                  class="vs__search"
                                  :required="!form.production_planning_id"
                                  v-bind="attributes"
                                  v-on="events"
                                />
                              </template>
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="d-flex justify-content-between"
                                v-if="lookup_custom3.data.length || search"
                              >
                                <a
                                  v-if="lookup_custom3.current_page > 1"
                                  @click="onGetExMesin(search, false)"
                                  class="flex-fill bg-primary text-white text-center"
                                  href="#"
                                  >Sebelumnya</a
                                >
                                <a
                                  v-if="lookup_custom3.last_page >
                                    lookup_custom3.current_page
                                    "
                                  @click="onGetExMesin(search, true)"
                                  class="flex-fill bg-primary text-white text-center"
                                  href="#"
                                  >Selanjutnya</a
                                >
                              </li>
                            </v-select>
                          </div>
                     
  </div>
                        <div class="col-md-2">
                          <ValidationProvider name="tanggal" >
                            <div class="form-group" slot-scope="{ errors, valid }">
                              <label for="tanggal">No Piece</label>
                              <input type="text" 
                          class="form-control"
                          v-model="form.no_set" />  
                              
                            </div>
                          </ValidationProvider>
                        </div>
                        <!-- <div class="col-md-6">
                          <ValidationProvider name="safe_stock" rules="required">
                            <div class="form-group" slot-scope="{ errors, valid }">
                              <label for="safe_stock">Beam</label>
                               <v-select
                            label="code"
                            :loading="isLoadingGetBeam"
                            :options="lookup_beam.data"
                            :filterable="false"
                            @search="onGetBeam"
                            @input="countTotal"
                            v-model="form.master_beam_id"
                            
                          >
                            <template v-slot:option="option">
                          
                                  {{ option.code }}
                            
                            </template>
                            <template #search="{ attributes, events }">
                              <input
                                class="vs__search"
                                :required="!form.master_beam_id"
                                v-bind="attributes"
                                v-on="events"
                              />
                            </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="d-flex justify-content-between"
                              v-if="lookup_beam.data.length || search"
                            >
                              <a
                                v-if="lookup_beam.current_page > 1"
                                @click="onGetBeam(search, false)"
                                class="flex-fill bg-primary text-white text-center"
                                href="#"
                                >Sebelumnya</a
                              >
                              <a
                                v-if="lookup_beam.last_page >
                                  lookup_beam.current_page
                                  "
                                @click="onGetBeam(search, true)"
                                class="flex-fill bg-primary text-white text-center"
                                href="#"
                                >Selanjutnya</a
                              >
                            </li>
                          </v-select>
                              <div class="invalid-feedback" v-if="errors[0]">
                                {{ errors[0] }}
                              </div>
                            </div>
                          </ValidationProvider>
                        </div> -->
                      </div>

                    

                    <div class="form-group">
                      <div class="row">
                          <div class="col-md-2">

                      <label for="description">Nama Barang</label>
                      </div>
                            <div class="col-md-10">

                      <textarea
                        class="form-control"
                        disabled
                      
                      >{{

                        form.production_detail_id
                        ? form.production_detail_id.product.name
                        : "-"


                      }}</textarea>
                      </div>
  </div>
                    </div>

                      <div class="row my-3 ">
                          <div class="col-md-2">
                          <div class="form-group">

                            <label for="purchase_price">Grade</label>
                          </div>
                          </div>

                          <div class="col-md-5">
                               <select
                                class="form-control"                  
                                v-model="form.parent_grade_id"
                                @change="changeGrade"
                                  >
                                <option value="2">AVAL</option>
                                <option value="3">BS</option> 
                                <option value="6">RB</option>                      
                                <option value="7">RK</option>                      
                              </select> 
                            </div>

                          <div class="col-md-5">
                            <ValidationProvider name="safe_stock" rules="required">
                                <div class="form-group" slot-scope="{ errors, valid }">
                                   <v-select
                                label="code"
                                :loading="isLoadingGetGrade"
                                :options="lookup_grade.data"
                                :filterable="false"
                                @search="onGetPacking"
                                v-model="form.grade_id"
                            
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
                                    :required="!form.grade_id"
                                    v-bind="attributes"
                                    v-on="events"
                                  />
                                </template>
                                <li
                                  slot-scope="{ search }"
                                  slot="list-footer"
                                  class="d-flex justify-content-between"
                                  v-if="lookup_grade.data.length || search"
                                >
                                  <a
                                    v-if="lookup_grade.current_page > 1"
                                    @click="onGetGrade(search, false)"
                                    class="flex-fill bg-primary text-white text-center"
                                    href="#"
                                    >Sebelumnya</a
                                  >
                                  <a
                                    v-if="lookup_grade.last_page >
                                      lookup_grade.current_page
                                      "
                                    @click="onGetGrade(search, true)"
                                    class="flex-fill bg-primary text-white text-center"
                                    href="#"
                                    >Selanjutnya</a
                                  >
                                </li>
                              </v-select>
                                  <div class="invalid-feedback" v-if="errors[0]">
                                    {{ errors[0] }}
                                  </div>
                                </div>
                              </ValidationProvider>
                          </div>

                          <!-- <div class="col-md-5">
                              <input
                                  type="number"
                                  class="form-control"
                                  name="name_marketplace"
                                  v-model="form.length"
                                />
                            </div> -->
                        </div>
                      

                        <div class="form-group">
                        <label for="description">Packing List</label>
                        <div class="row">
                          <div class="col-md-9">
                              <!-- <ValidationProvider name="safe_stock">
                                <div class="form-group" slot-scope="{ errors, valid }"> -->
                                   <v-select
                                label="code"
                                :loading="isLoadingGetPacking"
                                :options="lookup_packing.data"
                                :filterable="false"
                                @search="onGetPacking"
                                v-model="form.packing_list_id"
                            
                              >
                                <template v-slot:option="option">
                                    <div class="row">
                                      <div class="col-md-4 p-1 m-0">
                                        {{ option.code }}
                                      </div>
                                    
                                      <div class="col-md-3 p-1 m-0 text-right">
                                        {{ option.parent_grade ? option.parent_grade.name : "" }}
                                      </div>
                                    
                                      <div class="col-md-5 p-1 m-0 text-right">
                                          {{ option.product ? option.product.name : "" }}
                                        </div>
                                    </div>
                            
                                </template>
                                <!-- <template #search="{ attributes, events }">
                                  <input
                                    class="vs__search"
                                    :required="!form.packing_list_id"
                                    v-bind="attributes"
                                    v-on="events"
                                  />
                                </template> -->
                                <li
                                  slot-scope="{ search }"
                                  slot="list-footer"
                                  class="d-flex justify-content-between"
                                  v-if="lookup_packing.data.length || search"
                                >
                                  <a
                                    v-if="lookup_packing.current_page > 1"
                                    @click="onGetPacking(search, false)"
                                    class="flex-fill bg-primary text-white text-center"
                                    href="#"
                                    >Sebelumnya</a
                                  >
                                  <a
                                    v-if="lookup_packing.last_page >
                                      lookup_packing.current_page
                                      "
                                    @click="onGetPacking(search, true)"
                                    class="flex-fill bg-primary text-white text-center"
                                    href="#"
                                    >Selanjutnya</a
                                  >
                                </li>
                              </v-select>
                                  <!-- <div class="invalid-feedback" v-if="errors[0]">
                                    {{ errors[0] }}
                                  </div> -->
                                <!-- </div>
                              </ValidationProvider> -->
                          </div>
                          <div class="col-md-3">
                            <button
                            class="btn btn-primary float-right"
                            @click="addPackingList"
                          >
                            <i class="fas fa-plus"></i> Tambah
                          </button>
                          </div>
                        </div>
                      </div>
                      
                      <hr>
                    <div class="row">
                      <div class="col-md-6">
                     <div class="form-group">
                        <label for="purchase_price">Length</label>
                        <!-- <money
                          v-model="form.length"
                          class="form-control"
                          @keydown.native="
                            $event.key === '-' ? $event.preventDefault() : null
                            "
                        /> -->
                         <input
                            type="number"
                            class="form-control"
                            name="name_marketplace" step="any"
                            v-model="form.length"
                          />
                      </div>
                      </div>
                      <div class="col-md-6">

                      <div class="form-group">
                          <label for="purchase_price">Weight</label>
                          <!-- <money
                            v-model="form.gross_weight"
                            class="form-control"
                            @keydown.native="
                              $event.key === '-' ? $event.preventDefault() : null
                              "
                            @keyup.native="countTotal"
                          /> -->
                          <input
                              type="number"
                              class="form-control"
                              name="name_marketplace" step="any"
                              v-model="form.gross_weight"
                            />
                         
                      </div>
                      </div>
                      </div>

                      <!-- <div class="row">
                      <div class="col-md-6">
                      <div class="form-group">
                            <label for="purchase_price">BeamWeight</label>
                            <money
                            
                              v-model="form.beam_weight"
                             
                              class="form-control"
                              
                              @keydown.native="
                                $event.key === '-' ? $event.preventDefault() : null
                                "
                                disabled
                            />
                      </div>
                      </div>
                      <div class="col-md-6">
                      <div class="form-group">
                              <label for="purchase_price">NettWeight</label>
                              <money
                                v-model="form.nett_weight"
                                
                                class="form-control"
                                @keydown.native="
                                  $event.key === '-' ? $event.preventDefault() : null
                                  "
                                  disabled
                              />
                      </div>
                      </div>
                      </div> -->

                      <!-- <div class="form-group">
                                <label for="purchase_price">Counter</label>
                                <money
                                  v-model="form.counter"
                                  class="form-control"
                                  @keydown.native="
                                    $event.key === '-' ? $event.preventDefault() : null
                                    "
                                />
                        </div> -->
<!-- 
                      <div class="form-group">
                        <label for="purchase_price">Speed (YARD/M)</label>
                        <money
                          v-model="form.speed"
                          class="form-control"
                          @keydown.native="
                            $event.key === '-' ? $event.preventDefault() : null
                            "
                        />
                      </div>
               -->

                  
                        

                  <!-- <div class="form-group">
                    <label for="name_marketplace">Nama Marketplace</label>
                    <input
                      type="text"
                      class="form-control"
                      name="name_marketplace"
                      v-model="form.name_marketplace"
                    />
                  </div> -->

                  

                      <div class="row">
                      <div class="col-md-4">
                     <div class="form-group">
                          <label for="start_time">
                            Jam Timbang
                          </label>
                          <input type="datetime-local" 
                            class="form-control"
                            v-model="form.start_time"/>  

                        </div>
                        </div>

                        <div class="col-md-4">
                       <div class="form-group">
                            <label for="start_time">
                              End Time
                            </label>
                            <input type="datetime-local" 
                              class="form-control"
                              v-model="form.end_time"/>  

                          </div>
                          </div>

                        <div class="col-md-4">
                          <ValidationProvider name="safe_stock" >
                              <div class="form-group" slot-scope="{ errors, valid }">
                                <label for="safe_stock">Regu</label>
                                 <select
                                    class="form-control"
                                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                      "
                                    v-model="form.regu_id"
                                  >
                                    <option value="">Pilih</option>
                                    <option
                                      v-for="item in lookup_custom1.data"
                                      :key="item.id"
                                      :value="item.id"
                                    >
                                      {{ item.name }}
                                    </option>
                                  </select>
                           
                              </div>
                            </ValidationProvider>
                        </div>
                        
                          </div>

                          

                  <div class="float-right mt-4">
                    <button
                      
                      class="btn btn-primary"
                    >
                      <span v-if="isLoadingForm">
                        <i class="fas fa-circle-notch fa-spin"></i>
                      </span>
                      <span v-else>
                        Simpan
                        <i class="fas fa-save"></i>
                      </span>
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <div class="card-title">

                    <div class="table-responsive">
                      <table class="table p-0 m-0 table-sm">
                        <tr>
                          <td>No</td>
                          <td>Caption</td>
                          <td>Value</td>
                          

                        </tr>
                        <tr
                          v-for="(item, index) in form.detail_production_activities"
                          :key="item.id"
                        >
                          <td style="width: 5%">
                            {{ index + 1 }}
                        <input
                        type="hidden"
                        class="form-control"
                        name="name_marketplace"
                        v-model="item.id"
                      />
                          </td>
                          <td style="width: 15%">
                            {{ item.name}}
                          </td>
                          <td style="width: 25%">
                            <!-- <money
                              v-model="item.value"
                              class="form-control"
                              @keydown.native="
                                $event.key === '-'
                                  ? $event.preventDefault()
                                  : null
                              "
                            /> -->
                            <input
                            type="number"
                            class="form-control"
                            name="name_marketplace"
                            v-model="item.value"
                          />
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
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
import { mapActions, mapMutations, mapState } from "vuex";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Production Activity",
    };
  },

  components: {
    CoolLightBox,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) 
        ? true 
        : false,
        
      isLoadingPage: Number.isInteger(id) 
        ? true 
        : false,

      isLoadingForm: false,

      isStopSearchSupplier: false,
      isLoadingGetSupplier: false,
      supplier_search: "",

      isStopSearchCustomer: false,
      isLoadingGetCustomer: false,
      customer_search: "",

      isStopSearchProces: false,
      isLoadingGetProces: false,
      proces_search: "",

      isStopSearchMesin: false,
      isLoadingGetMesin: false,
      mesin_search: "",

      isStopSearchBeam: false,
      isLoadingGetBeam: false,
      beam_search: "",

      isStopSearchExMesin: false,
      isLoadingGetExMesin: false,
      exmesin_search: "",

      isStopSearchPacking: false,
      isLoadingGetPacking: false,
      packing_search: "",
      
      isStopSearchGrade: false,
      isLoadingGetGrade: false,
      grade_search: "",
      
      form: {
        supplier_id: "",
        customer_id:"",
        product_spesification_id: "1",
        code: "",
        name: "",        
        purchase_unit: "",
        selling_unit: "",
        purchase_price: 0.0,
        cost_of_products_sold: 0.0,
        name_marketplace: "",
        description: "",
        safe_stock : 0,
        minimum_stock : 0,
        is_tax : 1,
        rack: '',
        master_proces_id: 31,
        tanggal: moment().format("YYYY-MM-DD"),
        master_machine_id: '',
        production_detail_id: '',
        no_set: '',
        master_beam_id: 0,
        length: '',
        gross_weight: '',
        beam_weight: 0,
        nett_weight: '',
        counter: 1,
        speed: 0,
        // start_time: '',
        production_planning_id: '',
        start_time: moment().format("YYYY-MM-DD HH:mm"),
        end_time: moment().format("YYYY-MM-DD HH:mm"),
        regu_id: '',
        packing_list_id: '',
        grade_id: '',
        parent_grade_id:'',
        status_product: '0',
        detail_production_activities : []


      },

      default_form: {
        supplier_id: "",
        customer_id: "",
        product_spesification_id: "",
        code: "",
        name: "",        
        purchase_unit: "",
        selling_unit: "",
        purchase_price: 0.0,
        cost_of_products_sold: 0.0,
        name_marketplace: "",
        description: "",
        safe_stock : 0,
        minimum_stock : 0,
        is_tax : 1,
        rack: '',
        master_proces_id: 31,
        master_machine_id: '',
        production_detail_id: '',
        no_set: '',
        master_beam_id: 0,
        length: '',
        gross_weight: '',
        beam_weight: 0,
        nett_weight: '',
        counter: 1,
        speed: 0,
        // start_time: '',
        start_time: moment().format("YYYY-MM-DD HH:mm"),
        end_time: moment().format("YYYY-MM-DD HH:mm"),
        regu_id: '',
        packing_list_id: '',
        grade_id:'',
        parent_grade_id: '',
        production_planning_id:'',
        tanggal: moment().format("YYYY-MM-DD"),

        status_product: '0',
        detail_production_activities: []


      },      
      preview_images: [],

      indexPreviewImages: null,

      product_prices: [],

      value_ids: [],
    };
  },

  async created() {          
    if (this.isEditable) {    
      try {
        let response = await this.$axios.get("manufactur/production_activity/" + this.id);
        
        Object.keys(this.form).forEach((item) => {
          if (item === "production_detail_id") {
            this.form.production_detail_id = response.data.production_detail;
          }
          // else if (item === "master_beam_id") {
          //   this.form.master_beam_id = response.data.master_beam;
          // }
          else if (item === "master_machine_id") {
            this.form.master_machine_id = response.data.master_machine;
          } else if (item === "packing_list_id") {
            this.form.packing_list_id = response.data.packing_list;
          } else if (item === "grade_id") {
            this.form.grade_id = response.data.grade;
          }  else if (item === "ex_master_machine_id") {
            this.form.ex_master_machine_id = response.data.ex_master_machine;
          }  else if (item === "production_planning_id") {
            this.form.production_planning_id = response.data.production_planning;
          } else if (item === "product_spesification_id") {
            this.form.product_spesification_id = response.data.product_group 
              ? response.data.product_group.id 
              : "";
          }else {
            this.form[item] = response.data[item] === null 
              ? "" 
              : response.data[item];
          }
        });

        this.form.detail_production_activities = response.data.detail_production_activities.map(
          (item) => {
            return {
              ...item,
                  id: item.master_atribut_production_activity_id,
                  value: item.value,
                  name: item.master_production_activity.name,
            };
          }
        );

        this.isLoadingPage = false;       
      } catch (err) {
        this.$router.push("/manufactur/production_activity");
      }
    }
  },

  async mounted() {
    // await this.onSearchSupplier();

    // await this.onSearchCustomer();
    await this.onSearchProces();
    await this.onSearchMesin();
    await this.onSearchPacking();
    await this.onSearchBeam();
    await this.onSearchExMesin();
    await this.onSearchGrade();
    await this.onChangeType();


    // await this.lookUp({
    //   url: "master/product/get-product-spesification",
    //   lookup: "product_groups",
    //   query: 
    //     "?search=" + 
    //     "&all=true" +
    //       "&id=1" +

    //     "&type=GROUP"       
    // });

    await this.lookUp({
      url: "master/product/get-unit",
      lookup: "units",
      query: "",
    });

    await this.lookUp({
      url: "setting/masterprocess",
      lookup: "proces",
      query: "?jenis=2&sort=asc",
    });

    // await this.lookUp({
    //   url: "master/product/get-customer-group",
    //   lookup: "customer_groups",
    //   query: "",
    // });

    await this.lookUp({
      url: "master/regu/get-regu",
      lookup: "custom1",
      query: "?order=id&sort=asc",
    });

    // if(!this.isEditable){
    //   this.setCode();
    // }

    this.onGetPropertie()


    this.value_ids.forEach(item => {     
       document.getElementById("properti-" + item.properti_id + "-option").value = item.id;
    })    
  },

  computed: {
    ...mapState("moduleApi", [
      'code',
      "lookup_suppliers",
      "lookup_units",
      "lookup_customer_groups",
      "lookup_product_groups",
      "lookup_customers",
      "lookup_product_properties",
      "lookup_proces",
      "lookup_custom1",
      "lookup_mesin",
      "lookup_beam",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_grade",
      "lookup_packing"

    ]),
  },

  methods: {
    ...mapActions("moduleApi", [
      'getCode',
      "lookUp"
    ]), 

    ...mapMutations("moduleApi", [
      "set_lookup_product_properties",
      "set_lookup_product_groups"
    ]),

    changeGrade() {
      if (this.form.parent_grade_id == 3) {
        this.form.grade_id = { "id": 11, "grade_kategori_id": 2, "code": "TBS", "name": "BS" };
      }
    },

    
    onSetExMesin() {
      let production = '';
      if (this.form.production_planning_id) {
        production = this.form.production_planning_id.production_detail;
      }
      this.form.production_detail_id = production;
    },
    

    countTotal() {
      let {
        total,
        gross_weight,
        nett_weight,
        beam_weight,
        discount_type,

      } = this.form;
      let iki = 0.00;
      let tara = 0.00;
        if (this.form.master_beam_id) {
          tara = this.form.master_beam_id.tara;
        } else {
          tara = this.form.beam_weight
          // tara = 0.00;
        }

      gross_weight = parseFloat(gross_weight);
      iki = parseFloat(0.00)
      nett_weight = parseFloat(gross_weight) - iki;

      this.form = {
        ...this.form,
        gross_weight,
        // beam_weight: Math.ceil(iki),
        // nett_weight: Math.ceil(nett_weight),
        beam_weight: iki,
        nett_weight: nett_weight,
      };
    },

    onPrint(id) {
      // this.$confirm({
      //   message: "Apakah anda ingin menampilkan halaman print",
      //   button: {
      //     no: "No",
      //     yes: "Yes",
      //   },
      //   callback: async (confirm) => {
      //     if (confirm) {
      var token = this.$cookiz
        .get("auth._token.local")
        .replace("Bearer ", "");

      window.open(
        process.env.API_URL +
        "/manufactur/production_activity/get-folding/" +
        id +
        "?token=" +
        token,
        "_blank"
      );
      //     }
      //   },
      // });
    },


    async onChangeType(item) {
      let parent_id = 0;
      if (this.form.master_proces_id) {
        parent_id = this.form.master_proces_id.id;
      }
       if(!this.isEditable){
      await this.getCode({
        url: "manufactur/production_activity",
        query: "?master_proces_id=" + this.form.master_proces_id,
      });
      this.form.code = this.code;
      //   this.setCode();
      }
      await this.lookUp({
        url: "master/atribut_production_activity/get-atribut",
        lookup: "custom2",
        query: "?order=id&sort=asc&master_proces_id=" + this.form.master_proces_id,
      });
      // try {
      // let response = await this.$axios.get("master/atribut_production_activity?order=id&sort=asc&master_proces_id=" + parent_id);
      this.form.detail_production_activities = this.lookup_custom2.data.map(
        (item) => {
          return {
            // ...item,
            id: item.id,
            name: item.name,
            value: 0,
          };
        }
      );
        // console.log(item);
      // } catch (err) {
      //   console.log("eror");
      // }

      // clearTimeout(this.isStopSearchMesin);
      // this.isStopSearchMesin = setTimeout(() => {
      //   if (!this.form.master_proces_id) {
      //     this.induk = 'null';
      //   } else {
      //     this.induk = this.form.master_proces_id.proces_induk_id;
      //   }
      //     this.onSearchMesin();
      // }, 20);

    },

    onGetGrade(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGrade);

      this.isStopSearchGrade = setTimeout(() => {
        this.grade_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }

        this.onSearchGrade();
      }, 600);
    },

    async onSearchGrade() {
      if (!this.isLoadingGetGrade) {
        this.isLoadingGetGrade = true;

        await this.lookUp({
          url: "master/grade/get-grade",
          lookup: "grade",
          query:
            "?search=" + this.grade_search +
            "&page=" + this.lookup_grade.current_page +
            "&per_page=10&sort=asc&grade_kategori_id=2",
        });

        this.isLoadingGetGrade = false;
      }
    },

    onGetPacking(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPacking);

      this.isStopSearchPacking = setTimeout(() => {
        this.packing_search = search;

        if (typeof isNext !== "function") {
          this.lookup_packing.current_page = isNext
            ? this.lookup_packing.current_page + 1
            : this.lookup_packing.current_page - 1;
        } else {
          this.lookup_packing.current_page = 1;
        }

        this.onSearchPacking();
      }, 600);
    },

    async onSearchPacking() {
      if (!this.isLoadingGetPacking) {
        this.isLoadingGetPacking = true;

        await this.lookUp({
          url: "manufactur/packinglist/get-packing-list",
          lookup: "packing",
          query:
            "?search=" + this.packing_search +
            "&page=" + this.lookup_packing.current_page +
            "&per_page=10&sort=asc&tanggal="+ moment().format("YYYY-MM-DD") +"&status=OPEN&jenis_produksi=FINISHING",
        });

        this.isLoadingGetPacking = false;
      }
    },

    onGetBeam(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchBeam);

      this.isStopSearchBeam = setTimeout(() => {
        this.beam_search = search;

        if (typeof isNext !== "function") {
          this.lookup_beam.current_page = isNext
            ? this.lookup_beam.current_page + 1
            : this.lookup_beam.current_page - 1;
        } else {
          this.lookup_beam.current_page = 1;
        }

        this.onSearchBeam();
      }, 600);
    },

    async onSearchBeam() {
      if (!this.isLoadingGetBeam) {
        this.isLoadingGetBeam = true;

        await this.lookUp({
          url: "master/masterbeam/get-beam",
          lookup: "beam",
          query:
            "?search=" + this.beam_search +
            "&page=" + this.lookup_beam.current_page +
            "&per_page=10&sort=asc&type=SIZING",
        });

        this.isLoadingGetBeam = false;
      }
    },

    onGetProces(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProces);

      this.isStopSearchProces = setTimeout(() => {
        this.proces_search = search;

        if (typeof isNext !== "function") {
          this.lookup_proces.current_page = isNext
            ? this.lookup_proces.current_page + 1
            : this.lookup_proces.current_page - 1;
        } else {
          this.lookup_proces.current_page = 1;
        }

        this.onSearchProces();
      }, 600);
    },

    async onSearchProces() {
      if (!this.isLoadingGetProces) {
        this.isLoadingGetProces = true;

        await this.lookUp({
          url: "setting/masterprocess",
          lookup: "proces",
          query:
            "?search=" + this.proces_search +
            "&page=" + this.lookup_proces.current_page +
            "&per_page=10&jenis=2&sort=asc",
        });

        this.isLoadingGetProces = false;
      }
    },

    
    onGetExMesin(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchExMesin);

      this.isStopSearchExMesin = setTimeout(() => {
        this.exmesin_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchExMesin();
      }, 600);
    },

    async onSearchExMesin() {
      if (!this.isLoadingGetExMesin) {
        this.isLoadingGetExMesin = true;

        await this.lookUp({
          url: "manufactur/production_planning/get-planning",
          lookup: "custom3",
          query:
            "?search=" + this.exmesin_search +
            "&page=" + this.lookup_custom3.current_page +
            "&per_page=10&sort=asc&master_proces_id=19",
        });

        this.isLoadingGetExMesin = false;
      }
    },

    onGetMesin(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchMesin);

      this.isStopSearchMesin = setTimeout(() => {
        this.mesin_search = search;

        if (typeof isNext !== "function") {
          this.lookup_mesin.current_page = isNext
            ? this.lookup_mesin.current_page + 1
            : this.lookup_mesin.current_page - 1;
        } else {
          this.lookup_mesin.current_page = 1;
        }

        this.onSearchMesin();
      }, 600);
    },

    async onSearchMesin() {
      if (!this.isLoadingGetMesin) {
        this.isLoadingGetMesin = true;

        await this.lookUp({
          url: "machine/machine/get-mesin",
          lookup: "mesin",
          query:
            "?search=" + this.mesin_search +
            "&page=" + this.lookup_mesin.current_page +
            "&per_page=10&sort=asc&master_proces_id=7",
        });

        this.isLoadingGetMesin = false;
      }
    },

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
          url: "master/product/get-supplier",
          lookup: "suppliers",
          query:
            "?search=" + this.supplier_search +
            "&page=" + this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSupplier = false;
      }
    },

    onGetCustomer(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCustomer);

      this.isStopSearchCustomer = setTimeout(() => {
        this.customer_search = search;

        if (typeof isNext !== "function") {
          this.lookup_customers.current_page = isNext
            ? this.lookup_customers.current_page + 1
            : this.lookup_customers.current_page - 1;
        } else {
          this.lookup_customers.current_page = 1;
        }

        this.onSearchCustomer();
      }, 600);
    },

    async onSearchCustomer() {
      if (!this.isLoadingGetCustomer) {
        this.isLoadingGetCustomer = true;

        await this.lookUp({
          url: "manufactur/productionproses/get-konstruksi",
          lookup: "customers",
          query:
            "?search=" + this.customer_search +
            "&page=" + this.lookup_customers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCustomer = false;
      }
    },


    async setCode() {
      await this.getCode({
        url: "manufactur/production_activity",
        query: "?master_proces_id=" + this.form.master_proces_id,
      });

      this.form.code = this.code;
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      // let formData = new FormData(document.getElementById("form-upload"));


      let url = "manufactur/production_activity";
      if (this.isEditable) {
        url += "/" + this.id;
      }
      // if (this.isEditable) {
      //   url += "/" + this.id;
      //   formData.append("_method", "PUT");
      // }

      let formData = {
        ...this.form,
        nett_weight: this.form.gross_weight - this.form.beam_weight,
        // master_proces_id:
        //   typeof this.form.master_proces_id == "object"
        //     ? this.form.master_proces_id.id
        //     : "",
        // master_machine_id:
        //   typeof this.form.master_machine_id == "object"
        //     ? this.form.master_machine_id.id
        //     : "",
        master_beam_id: 
          typeof this.form.master_beam_id == "object"
            ? this.form.master_beam_id.id
            : 0,
        production_detail_id:
          typeof this.form.production_detail_id == "object"
            ? this.form.production_detail_id.id
            : "",
        master_machine_id:
          typeof this.form.master_machine_id == "object"
            ? this.form.master_machine_id.id
            : "",
        grade_id:
          typeof this.form.grade_id == "object"
            ? this.form.grade_id.id
            : "",
        packing_list_id:
          typeof this.form.packing_list_id == "object"
            ? this.form.packing_list_id.id
            : 0,
        // ex_master_machine_id:
        //   typeof this.form.ex_master_machine_id == "object"
        //     ? this.form.ex_master_machine_id.id
        //     : "",
        production_planning_id:
          typeof this.form.production_planning_id == "object"
            ? this.form.production_planning_id.id
            : "",
      };

      formData.detail_production_activities = formData.detail_production_activities.map((item) => {
        return {
          master_atribut_production_activity_id: item.id,
          value: item.value,
        };
      });

      this.$axios({
        url: url,
        method: this.isEditable ? "put" : "post",
        data: formData,
      })
        .then(res => {
          this.$toaster.success("Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Data");

          if (this.isEditable) {
            // this.form.code = res.data.code;
          } else {
            let param = this.form.production_detail_id;
            let grade = this.form.grade_id;
            let regu = this.form.regu_id;
            let master_machine = this.form.master_machine_id;

            this.$refs["form-validate"].reset();

            this.form = {
              ...this.default_form,
              production_detail_id: param,
              master_machine_id: master_machine,
              regu_id: regu,
            };
            this.onPrint(res.data.id);
            this.setCode();
            this.onSearchPacking();
          }
        })
        .catch(err => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {        
          this.isLoadingForm = false;
        });
    },

    async onProductGroupChange(event) {
      this.set_lookup_product_properties([])

      if(!event.target.value){
        return;
      }

      this.value_ids = [];
  
      this.onGetPropertie()
    },

    onChangeItem(item){
      let id = document.getElementById("properti-"+item.id+"-option").value;

      if(!this.value_ids.find(itemValue => itemValue.id == item.id)){
        this.value_ids.push({   
          id : id,   
          properti_id : item.id
        });    
      }else{
        let indexValue = this.value_ids.findIndex(itemValue => itemValue.id == item.id);

        this.value_ids[indexValue] = {
          id : id,   
          properti_id : item.id
        }
      }
    },

    addPackingList() {
     
      let url = "manufactur/packinglist/add-packing-list";

      let formData = {
          master_proces_id: this.form.master_proces_id,
          jenis_produksi: "FINISHING",
      };
      this.$axios({
        url: url,
        method: "post",
        data: formData,
      })
        .then(res => {

            // this.setCode();
            // this.onChangeType();
            this.onSearchPacking();
            //  Object.keys(this.form).forEach((item) => {
              this.form.packing_list_id = res.data.data;
            // });
          this.isLoadingPage = false;

        })
        .catch(err => {
          this.$globalErrorToaster(this.$toaster, err);
        });
    },

    async onGetPropertie(){ 
       await this.lookUp({
        url: "master/product/get-product-spesification",
        lookup: "product_properties",
        query: 
          "?search=" + 
          "&all=true" +
          "&type=PROPERTIE" + 
          // "&parent_id= 1" + this.form.product_spesification_id,
          "&parent_id= 1",
      });

    }
  },
};

</script>

<style scoped>
.images-warpper {
  text-align: center;
  width: 100%;
}

.images-warpper > .image-warpper {
  margin-bottom: 20px;
  width: 100px;
  object-fit: contain;
  margin-right: 20px;
  cursor: pointer;
}
</style>