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
                      name="name"
                      rules="required">
                      <div class="form-group" slot-scope="{errors,valid}">
                        <label for="name">Code</label>
                        <input id="name"
                          type="text"
                          class="form-control"
                          name="name"
                          v-model="parameters.form.code"
                          :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                        />               
                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
              
                  <div class="form-group">
                        <label for="seller_id">Man Power Type</label>
                        <v-select
                          label="name"
                          :loading="isLoadingGetProces"
                          :options="lookup_proces.data"
                          :filterable="false"
                          @search="onGetProces"
                          @input="onSetProces"
                          v-model="parameters.form.man_power_type_id"

                        >
                        <template v-slot:option="option">
                        <div class="row">
                          <div class="col-md-7 p-1 m-0 text-left">
                            {{ option.name }}
                          </div>
                          <div class="col-md-5 p-1 m-0 text-right">
                              {{ option.code }}
                            </div>
                        </div>
                      </template>
                          <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!parameters.form.man_power_type_id"
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
                            <span
                              v-if="lookup_proces.current_page > 1"
                              @click="onGetProces(search, false)"
                              class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                              >Sebelumnya</span
                            >
                            <span
                              v-if="lookup_proces.last_page >
                                lookup_proces.current_page
                                "
                              @click="onGetProces(search, true)"
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
                          <label for="seller_id">Location</label>
                          <v-select
                            label="name"
                            :loading="isLoadingGetLocation"
                            :options="lookup_location.data"
                            :filterable="false"
                            @search="onGetLocation"
                            @input="onSetLocation"
                            v-model="parameters.form.location_id"

                          >
                          <template v-slot:option="option">
                          <div class="row">
                            <div class="col-md-7 p-1 m-0 text-left">
                              {{ option.name }}
                            </div>
                            <div class="col-md-5 p-1 m-0 text-right">
                                {{ option.code }}
                              </div>
                          </div>
                        </template>
                            <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!parameters.form.location_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="d-flex justify-content-between"
                              v-if="lookup_location.data.length || search"
                            >
                              <span
                                v-if="lookup_location.current_page > 1"
                                @click="onGetLocation(search, false)"
                                class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                                >Sebelumnya</span
                              >
                              <span
                                v-if="lookup_location.last_page >
                                  lookup_location.current_page
                                  "
                                @click="onGetLocation(search, true)"
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

                     <div class="form-group">
                            <label for="type">
                              Status
                            </label>
                            <select
                              class="form-control"    
                              v-model="parameters.form.status">
                              <option value="1">AKTIF</option>
                              <option value="0">NON AKTIF</option> 
                            </select>                  
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
import { mapActions, mapState } from 'vuex'

export default {  
  middleware : ["isNotAccessable"],

  props: ["self"],

   async mounted() {
    await this.onSearchProces();
    await this.onSearchLocation();

  },

  data() {
    return {
      isStopSearchProces: false,
      isLoadingGetProces: false,
      proces_search: '',

      isStopSearchLocation: false,
      isLoadingGetLocation: false,
      location_search: '',

      isEditable  : false,
      isLoadingForm : false,
      title: 'WORK CENTER',      
      parameters : { 
        url : 'master/work_center',
        // url: 'master/masterproses',

        form : {
         code : '',
         name : '',
        }
      }
    };
  },

  computed :{
    ...mapState('moduleApi',[
      'error',
      'result',
      'code',
      "lookup_proces",
      "lookup_location",

    ]),  
  },

  methods: {    
    ...mapActions('moduleApi',[
       'addData',
       'updateData',
      'getCode',
      "lookUp"

    ]),


    onGetLocation(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchLocation);

      this.isStopSearchLocation = setTimeout(() => {
        this.location_search = search;

        if (typeof isNext !== "function") {
          this.lookup_location.current_page = isNext
            ? this.lookup_location.current_page + 1
            : this.lookup_location.current_page - 1;
        } else {
          this.lookup_location.current_page = 1;
        }

        this.onSearchLocation();
      }, 600);
    },

    async onSearchLocation() {
      if (!this.isLoadingGetLocation) {
        this.isLoadingGetLocation = true;

        await this.lookUp({
          url: "master/location/get-location",
          lookup: "location",
          query:
            "?search=" + this.location_search +
            "&page=" + this.lookup_location.current_page +
            "&per_page=10&sort=asc",
        });

        this.isLoadingGetLocation = false;
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
          url: "master/man_power_type/get-man-power",
          lookup: "proces",
          query:
            "?search=" + this.proces_search +
            "&page=" + this.lookup_proces.current_page +
            "&per_page=10&sort=asc",
        });

        this.isLoadingGetProces = false;
      }
    },

    async onSubmit(isInvalid){       
      if(isInvalid || this.isLoadingForm) return;            
      
      this.isLoadingForm = true;
      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          man_power_type_id: typeof this.parameters.form.man_power_type_id == 'object'
            ? this.parameters.form.man_power_type_id.id
            : '',
          location_id: typeof this.parameters.form.location_id == 'object'
            ? this.parameters.form.location_id.id
            : '',
        }
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
    },

    onSetProces(item) {
      if (!item) {
        this.parameters.form.master_proces_id = '';
      }
    }
  },
};
</script>
