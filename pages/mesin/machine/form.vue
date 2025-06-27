<template>
  <portal to="modal">
    <div class="modal fade" 
      aria-hidden="true" 
      id="modal-form">
      <div class="modal-dialog">
        <div class="modal-content">

        <modal-header-section
          :self="this"
        />

        <ValidationObserver
          v-slot="{invalid,validate}"
          ref="form-validate">
            <form @submit.prevent="validate().then(onSubmit(invalid))"
              autocomplete="off">

            <div class="modal-body">        
                  <ValidationProvider
                    name="code"
                    rules="required">
                    <div class="form-group" slot-scope="{errors,valid}">
                      <label for="code">Kode</label>
                      <input id="code"
                        type="text"
                        class="form-control"
                        name="code"
                        v-model="parameters.form.code"
                        :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                     
                        />

                      <div class="invalid-feedback" v-if="errors[0]">
                        {{ errors[0] }}
                      </div>      
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    name="name"
                    rules="required">
                    <div class="form-group" slot-scope="{errors,valid}">
                      <label for="name">Nama</label>
                      <input id="name"
                        type="text"
                        class="form-control"
                        name="name"
                        v-model="parameters.form.name"
                        :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                      />               
                      <div class="invalid-feedback" v-if="errors[0]">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                      name="tahun"
                      rules="required">
                      <div class="form-group" slot-scope="{errors,valid}">
                        <label for="name">Tahun</label>
                        <input id="tahun"
                          type="number"
                          class="form-control"
                          name="tahun"
                          v-model="parameters.form.tahun"
                          :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                        />               
                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>

                    <ValidationProvider
                      name="speed"
                     >
                      <div class="form-group" slot-scope="{errors,valid}">
                        <label for="code">Speed</label>
                        <input id="code"
                          type="text"
                          class="form-control"
                          name="code"
                          v-model="parameters.form.speed"
                          :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                     
                          />

                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>      
                      </div>
                    </ValidationProvider>

                  <!-- <div 
                    class="col-md-6">
                      <ValidationProvider
                        name="type"
                        rules="required">
                        <div class="form-group" slot-scope="{errors,valid}">            
                          <label for="type">Proses</label>
                          <select class="form-control" 
                            v-model="parameters.form.type"
                            @change="onChangeType"
                            :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')">
                            <option value="">Pilih</option>
                            <option v-for="(type, indexType) in types"
                              :key="indexType"
                              :value="type.value">
                              {{ type.title }}
                            </option>
                          </select>
                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </ValidationProvider>            
                  </div> -->

                  <div class="form-group">
                      <label for="vendor_machine_id">Vendor Mesin</label>
                      <v-select
                        label="name"
                        item-value="id"
                        :loading="isLoadingGetCustomer"
                        :options="lookup_customers.data"
                        :filterable="false"
                        @search="onGetCustomer"
                        v-model="parameters.form.vendor_machine_id"
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
                            :required="!parameters.form.vendor_machine_id"
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
                         
                        </li>
                      </v-select>
                    </div>   

                     <ValidationProvider 
                      name="location_id" 
                      >
                      <div class="form-group" 
                        slot-scope="{ errors, valid }">
                        <label for="location_id">Lokasi</label>
                        <select
                          name="location_id"
                          class="form-control"
                        
                          v-model="parameters.form.location_id"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          ">
                          <option 
                            v-for="(item, index) in lookup_product_groups"
                            :value="item.id">
                            {{ item.code }} - {{ item.name }}
                          </option>
                        </select>                    

                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>

                    <ValidationProvider 
                        name="tipe_mesin_id" 
                        rules="required">
                        <div class="form-group" 
                          slot-scope="{ errors, valid }">
                          <label for="location_id">Tipe Mesin</label>
                          <select
                            name="tipe_mesin_id"
                            class="form-control"
                        
                            v-model="parameters.form.tipe_mesin_id"
                            :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                              ">
                            <option 
                              v-for="(item, index) in lookup_custom1"
                              :value="item.id">
                              {{ item.code }} - {{ item.name }}
                            </option>
                          </select>                    

                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </ValidationProvider>

                      <div class="form-group">
                          <label for="seller_id">Department</label>
                          <v-select
                            label="name"
                            :loading="isLoadingGetDepartment"
                            :options="lookup_department.data"
                            :filterable="false"
                            @search="onGetDepartment"

                            v-model="parameters.form.department_id"

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
                            <!-- <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!parameters.form.proces_induk_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template> -->
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="d-flex justify-content-between"
                              v-if="lookup_department.data.length || search"
                            >
                              <span
                                v-if="lookup_department.current_page > 1"
                                @click="onGetDepartment(search, false)"
                                class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                                >Sebelumnya</span
                              >
                              <span
                                v-if="lookup_department.last_page >
                                  lookup_department.current_page
                                  "
                                @click="onGetDepartment(search, true)"
                                class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </div>
                    
                    <div class="form-group">
                        <label for="proses_id">Group Mesin</label>
                        <v-select
                          label="name"
                          :loading="isLoadingGetGroup"
                          :options="lookup_custom2.data"
                          :filterable="false"
                          @search="onGetGroup"
                          v-model="parameters.form.group_mesin_id"
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
                          <!-- <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!parameters.form.group_mesin_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template> -->
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_custom2.data.length || search"
                          >
                            <a
                              v-if="lookup_custom2.current_page > 1"
                              @click="onGetGroup(search, false)"
                              class="flex-fill bg-primary text-white text-center"
                              href="#"
                              >Sebelumnya</a
                            >
                            <a
                              v-if="
                                lookup_custom2.last_page >
                                lookup_custom2.current_page
                              "
                              @click="onGetGroup(search, true)"
                              class="flex-fill bg-primary text-white text-center"
                              href="#"
                              >Selanjutnya</a
                            > 
                          </li>
                        </v-select>
                      </div>

                  <div class="form-group">
                  <label for="address">Deskripsi  </label>
                  <textarea class="form-control" v-model="parameters.form.description"></textarea>
                </div>
            </div>
        
            <modal-footer-section     
              :isLoadingForm="isLoadingForm"
            />
          </form>
        </ValidationObserver>

        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
// import CoolLightBox from "vue-cool-lightbox";
// import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {  
  middleware : ["isNotAccessable"],

  props: ["self"],

  // components: {
  //   CoolLightBox,
  // },
  
  data() {
    return {
      isEditable  : false,
      isLoadingForm: false,

      isStopSearchCustomer: false,
      isLoadingGetCustomer: false,
      customer_search: "",

      isStopSearchDepartment: false,
      isLoadingGetDepartment: false,
      department_search: '',

      isStopSearchGroup: false,
      isLoadingGetGroup: false,
      group_search: '',

      title: 'Mesin',      
      parameters : { 
        url : 'machine/machine',

        form : {
         code : '',
          name: '',
          vendor_machine_id: '',
          tahun: '',


        },
        default_form: {
          code: '',
          name: '',
          vendor_machine_id: '',
          tahun: '',


        }

      }
    };
  },

  async created() {
    this.set_lookup_product_groups([]);
    this.set_lookup_custom1([])
  },

  async mounted() {
    await this.onSearchCustomer();
    await this.onSearchDepartment();
    await this.onSearchGroup();

    await this.lookUp({
      url: "machine/vendor",
      lookup: "customers",
      query: "",
    });

    await this.lookUp({
      url: "master/location",
      lookup: "product_groups",
      query:
        "?search=" +
        "&all=true" 
    });

      await this.lookUp({
      url: "machine/tipe_mesin",
      lookup: "custom1",
      query:
        "?search=" +
        "&all=true"
    });

 
  },

  computed :{
    ...mapState('moduleApi',[
      'error',
      'result',
      'code',
      'lookup_customers',
      'lookup_product_groups',
      'lookup_custom1',
      "lookup_department",
      'lookup_custom2',

    ]),  
  },

  methods: {    
    ...mapActions('moduleApi',[
       'addData',
       'updateData',
      'getCode',
      'lookUp',
      
    ]),

      ...mapMutations("moduleApi", [
        "set_lookup_product_groups",
      "set_lookup_custom1"

      ]),

    onGetGroup(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroup);

      this.isStopSearchGroup = setTimeout(() => {
        this.group_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchGroup();
      }, 600);
    },

    async onSearchGroup() {
      if (!this.isLoadingGetGroup) {
        this.isLoadingGetGroup = true;

        await this.lookUp({
          url: "machine/group_mesin",
          lookup: "custom2",
          query:
            "?search=" + this.group_search +
            "&page=" + this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroup = false;
      }
    },


    onGetDepartment(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDepartment);

      this.isStopSearchDepartment = setTimeout(() => {
        this.department_search = search;

        if (typeof isNext !== "function") {
          this.lookup_department.current_page = isNext
            ? this.lookup_department.current_page + 1
            : this.lookup_department.current_page - 1;
        } else {
          this.lookup_department.current_page = 1;
        }

        this.onSearchDepartment();
      }, 600);
    },

    async onSearchDepartment() {
      if (!this.isLoadingGetDepartment) {
        this.isLoadingGetDepartment = true;

        await this.lookUp({
          url: "master/department",
          lookup: "department",
          query:
            "?search=" + this.department_search +
            "&page=" + this.lookup_department.current_page +
            "&status=1&per_page=10",
        });

        this.isLoadingGetDepartment = false;
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
          url: "machine/vendor",
          lookup: "customers",
          query:
            "?search=" + this.customer_search +
            "&page=" + this.lookup_customers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCustomer = false;
      }
    },

    async onSubmit(isInvalid){       
      if(isInvalid || this.isLoadingForm) return;            
      
      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          vendor_machine_id:
            typeof this.parameters.form.vendor_machine_id == "object"
              ? this.parameters.form.vendor_machine_id.id
              : "",
          group_mesin_id:
            typeof this.parameters.form.group_mesin_id == "object" && this.parameters.form.group_mesin_id
              ? this.parameters.form.group_mesin_id.id
              : "",
          department_id:
            typeof this.parameters.form.department_id == "object"
              ? this.parameters.form.department_id.id
              : "",
        },
      };

      if(this.isEditable){
        await this.updateData(parameters)
      }else{ 
        await this.addData(parameters)
      }

      if (this.result == true) {      
        this.self.onLoad(this.self.parameters.params.page);  
        this.$toaster.success('Data berhasil di '+ (this.isEditable == true ? 'Diedit': 'Tambah'));
        window.$("#modal-form").modal("hide");
      }else {
        this.$globalErrorToaster(this.$toaster,this.error);      
      }

      this.isLoadingForm = false;
    }
  },
};
</script>
