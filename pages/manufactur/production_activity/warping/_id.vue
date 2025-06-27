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

                      <div class="form-group">
                        <label for="customer_id">No Batch</label>
                        <v-select
                          label="no_batch"
                          :loading="isLoadingGetCustomer"
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

                      <div class="row">
                        
                        <div class="col-md-6">
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
                        </div>

                        <div class="col-md-6">
                            <ValidationProvider name="tanggal" >
                              <div class="form-group" slot-scope="{ errors, valid }">
                                <label for="tanggal">No Set</label>
                                <input type="text" 
                            class="form-control"
                            v-model="form.no_set"
                          
                            />  
                              
                              </div>
                            </ValidationProvider>
                          </div>
                      </div>

                      <div class="form-group">
                      <label for="description">Nama Barang</label>
                      <textarea
                        class="form-control"
                        disabled
                      
                      >{{

                        form.production_detail_id
                        ? form.production_detail_id.product.name
                        : "-"


                      }}</textarea>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                     <div class="form-group">
                        <label for="purchase_price">Length</label>
                        <!-- <money
                          v-model="form.length"
                          class="form-control"
                          @keydown.native="
                            $event.key === '-' ? $event.preventDefault() : null
                            "
                        /> -->

                          <input type="number" 
                            class="form-control"
                            v-model="form.length"/>  
                      </div>
                      </div>
                      <div class="col-md-3">

                      <div class="form-group">
                          <label for="purchase_price">GrossWeight</label>
                          <!-- <money
                            v-model="form.gross_weight"
                            class="form-control"
                            @keydown.native="
                              $event.key === '-' ? $event.preventDefault() : null
                              "
                            @keyup.native="countTotal"
                          /> -->

                          <input type="number" 
                              class="form-control" step="any"
                              v-model="form.gross_weight"
                               v-on:keyup="countTotal"
                              />  

                          <!-- <input type="number" 
                              class="form-control"
                              v-model="form.gross_weight"
                              @keydown.native="
                                $event.key === '-' ? $event.preventDefault() : null
                                "
                            @keyup.native="countTotal"
                              
                              />   -->
                      </div>
                      </div>
                      <!-- </div>

                      <div class="row"> -->
                      <div class="col-md-3">
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

                            <!-- <input
                            :value="form.master_beam_id
                              ? form.master_beam_id.tara
                              : '0,00'
                              "
                            class="form-control"
                            :disabled="true"
                          /> -->
                      </div>
                      </div>
                      <div class="col-md-3">
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
                      </div>
  <div class="row">
                        <div class="col-md-6">
                      <div class="form-group">
                                <label for="purchase_price">TotalEnds</label>
                                <!-- <money
                                  v-model="form.counter"
                                  class="form-control"
                                  @keydown.native="
                                    $event.key === '-' ? $event.preventDefault() : null
                                    "
                                /> -->

                                <input type="number" 
                                class="form-control"
                                v-model="form.counter" required/>  
                        </div>
                          </div>
                          <div class="col-md-6">

                      <div class="form-group">
                        <label for="purchase_price">Speed (YARD/M)</label>
                        <!-- <money
                          v-model="form.speed"
                          class="form-control"
                          @keydown.native="
                            $event.key === '-' ? $event.preventDefault() : null
                            "
                        /> -->

                        <input type="number" 
                                  class="form-control"
                                  v-model="form.speed" required/>  
                      </div>
                      </div>
                        </div>

              

                  
                        

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
                      <div class="col-md-6">
                     <div class="form-group">
                          <label for="start_time">
                            Start Time
                          </label>
                          <input type="datetime-local" 
                            class="form-control"
                            v-model="form.start_time"/>                               
                        </div>
                        </div>
                        <div class="col-md-6">

                        <div class="form-group">
                            <label for="start_time">
                              End Time
                            </label>
                            <input type="datetime-local" 
                              class="form-control"
                              v-model="form.end_time"/>                               
                          </div>
                          </div>
                          </div>

                          <ValidationProvider name="safe_stock" rules="required">
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
                              <div class="invalid-feedback" v-if="errors[0]">
                                {{ errors[0] }}
                              </div>
                            </div>
                          </ValidationProvider>

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
        master_proces_id: 32,
        tanggal: moment().format("YYYY-MM-DD"),
        master_machine_id: '',
        production_detail_id: '',
        no_set: '',
        master_beam_id: '',
        length: '',
        gross_weight: '',
        beam_weight: '',
        nett_weight: '',
        counter: '',
        speed: '',
        start_time: '',
        end_time: '',
        regu_id: '',

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
        master_proces_id: 32,
        master_machine_id: '',
        production_detail_id: '',
        no_set: '',
        master_beam_id: '',
        length: '',
        gross_weight: '',
        beam_weight: '',
        nett_weight: '',
        counter: '',
        speed: '',
        start_time: '',
        end_time: '',
        regu_id: '',


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
          } else if (item === "master_beam_id") {
            this.form.master_beam_id = response.data.master_beam;
          }  else if (item === "master_machine_id") {
            this.form.master_machine_id = response.data.master_machine;
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

    await this.onSearchCustomer();
    await this.onSearchProces();
    await this.onSearchMesin();
    await this.onSearchBeam();
    await this.onChangeType();


    await this.lookUp({
      url: "master/product/get-product-spesification",
      lookup: "product_groups",
      query: 
        "?search=" + 
        "&all=true" +
          "&id=1" +

        "&type=GROUP"       
    });

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

    await this.lookUp({
      url: "master/product/get-customer-group",
      lookup: "customer_groups",
      query: "",
    });

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
      "lookup_custom2"
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

      // gross_weight = parseFloat(gross_weight);
      iki = parseFloat(tara)
      nett_weight = parseFloat(gross_weight) - iki;

      this.form = {
        ...this.form,
        gross_weight,
        // beam_weight: Math.ceil(iki),
        beam_weight: iki,
        // nett_weight: Math.ceil(nett_weight),
        nett_weight: nett_weight,

      };
    },

    async onChangeType(item) {
      let parent_id = 0;
      if (this.form.master_proces_id) {
        parent_id = this.form.master_proces_id.id;
      }
      await this.getCode({
        url: "manufactur/production_activity",
        query: "?master_proces_id=" + this.form.master_proces_id,
      });
      this.form.code = this.code;

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
            "&per_page=10&sort=asc&type=WARPING",
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
            "&per_page=10&sort=asc&master_proces_id=12",
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
        master_machine_id:
          typeof this.form.master_machine_id == "object"
            ? this.form.master_machine_id.id
            : "",
        master_beam_id:
          typeof this.form.master_beam_id == "object"
            ? this.form.master_beam_id.id
            : "",
        production_detail_id:
          typeof this.form.production_detail_id == "object"
            ? this.form.production_detail_id.id
            : "",
        master_machine_id:
          typeof this.form.master_machine_id == "object"
            ? this.form.master_machine_id.id
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
            let start_time = this.form.start_time;
            let end_time = this.form.end_time;
            let tanggal = this.form.tanggal;


            this.$refs["form-validate"].reset();

            this.form = {
              ...this.default_form,
              production_detail_id: param,
              start_time: start_time,
              end_time: end_time,
              tanggal: tanggal,
            };
            this.setCode();
            this.onChangeType();
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