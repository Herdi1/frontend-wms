<template>
  <portal to="modal">
    <div class="modal fade" 
      aria-hidden="true" 
      id="modal-form">
      <div class="modal-dialog modal-lg">
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
              <div class="row">
                <!-- <div class="col">
                  <div class="form-group">
                    <label for="no_npb">No NPB</label>
                    <input id="no_npb"
                      type="text"
                      class="form-control"
                      name="no_npb"
                      v-model="parameters.form.no_npb"
                    />               
                  </div>
                </div> -->

                <div class="col">
                  <ValidationProvider
                    name="tanggal"
                    rules="required">
                    <div class="form-group" slot-scope="{errors,valid}">
                      <label for="tanggal">Tanggal</label>
                      <input id="tanggal"
                        type="date"
                        class="form-control"
                        name="tanggal"
                        v-model="parameters.form.tanggal"
                        :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                      />

                      <div class="invalid-feedback" v-if="errors[0]">
                        {{ errors[0] }}
                      </div>      
                    </div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="row">
                <div class="col">
                <ValidationProvider
                  name="no_batch"
                  rules="required">
                  <div class="form-group" slot-scope="{errors,valid}">
                    <label for="production_detail_id">No Batch/Konstruksi</label>
                    <v-select           
                    label="no_batch"  
                    :loading="isLoadingGetGroupRole"
                    :options="lookup_group_roles.data"
                    :filterable="false"
                    @search="onGetGroupRole"
                    v-model="parameters.form.production_detail_id"
                    :required="true">     
                    <template v-slot:option="option">                    
                      {{ option.no_batch }}
                    </template> 
                    <template #search="{ attributes, events }">
                      <input
                        class="vs__search"
                        :required="!parameters.form.production_detail_id"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>        
                    <li slot-scope="{search}" slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_group_roles.data.length || search">
                      <span v-if="lookup_group_roles.current_page > 1" 
                        @click="onGetGroupRole(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Sebelumnya</span>
                      <span v-if="lookup_group_roles.last_page > lookup_group_roles.current_page" 
                        @click="onGetGroupRole(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer"
                        >Selanjutnya</span>
                    </li> 
                  </v-select> 

                    <div class="invalid-feedback" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>      
                  </div>
                </ValidationProvider>
                </div>
                
                </div>

                <div class="row">
  <div class="col">
                    <ValidationProvider
                      name="no_batch"
                      rules="required">
                      <div class="form-group" slot-scope="{errors,valid}">
                        <label for="production_detail_id">Nomor Mesin</label>
                        <v-select           
                        label="code"  
                        :loading="isLoadingGetMesin"
                        :options="lookup_mesin.data"
                        :filterable="false"
                        @search="onGetMesin"
                        v-model="parameters.form.master_machine_id"
                        :required="true">     
                        <template v-slot:option="option">                    
                          {{ option.code }} - {{ option.name }}
                        </template> 
                        <template #search="{ attributes, events }">
                          <input
                            class="vs__search"
                            :required="!parameters.form.master_machine_id"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>        
                        <li slot-scope="{search}" slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_mesin.data.length || search">
                          <span v-if="lookup_mesin.current_page > 1" 
                            @click="onGetMesin(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Sebelumnya</span>
                          <span v-if="lookup_mesin.last_page > lookup_mesin.current_page" 
                            @click="onGetMesin(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Selanjutnya</span>
                        </li> 
                      </v-select> 

                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>      
                      </div>
                    </ValidationProvider>
                    </div>

                  <div class="col">
                    <ValidationProvider
                        name="benang_ex"
                        rules="">
                        <div class="form-group" slot-scope="{errors,valid}">
                          <label for="benang_ex">Benang EX</label>
                          <input id="benang_ex"
                            type="text"
                            class="form-control"
                            name="benang_ex"            
                            v-model="parameters.form.benang_ex"
                            :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                          />
                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>      
                        </div>
                      </ValidationProvider>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                          <div class="form-group">
                          
                            <ValidationProvider
                            name="lot"
                            rules="">
                            <div class="form-group" slot-scope="{errors,valid}">
                              <label for="lot">LOT</label>
                              <input id="lot"
                                type="text"
                                class="form-control"
                                name="lot"            
                                v-model="parameters.form.nik"
                                :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                              />
                              <div class="invalid-feedback" v-if="errors[0]">
                                {{ errors[0] }}
                              </div>      
                            </div>
                          </ValidationProvider>               
                          </div>
                      </div>


                       <div class="col">
                                <div class="form-group">
                                  <ValidationProvider
                                  name="no_beam"
                                  rules="required">
                                  <div class="form-group" slot-scope="{errors,valid}">
                                    <label for="no_beam">No Beam</label>
                                    <input id="no_beam"
                                      type="text"
                                      class="form-control"
                                      name="no_beam"            
                                      v-model="parameters.form.no_beam"
                                      :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                                    />
                                    <div class="invalid-feedback" v-if="errors[0]">
                                      {{ errors[0] }}
                                    </div>      
                                  </div>
                                </ValidationProvider>                    
                                </div>
                            </div>
                    <!-- <div class="col">
                      <ValidationProvider
                          name="no_benang"
                          rules="required">
                          <div class="form-group" slot-scope="{errors,valid}">
                            <label for="nik">No Benang</label>
                            <input id="no_benang"
                              type="text"
                              class="form-control"
                              name="no_benang"            
                              v-model="parameters.form.no_benang"
                              :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                            />
                            <div class="invalid-feedback" v-if="errors[0]">
                              {{ errors[0] }}
                            </div>      
                          </div>
                        </ValidationProvider>
                    </div> -->

                    
                  </div>

                  <div class="row">
                    <div class="col">
                            <div class="form-group">
                            
                              <ValidationProvider
                                name="jumlah_benang"
                                rules="required">
                                <div class="form-group" slot-scope="{errors,valid}">
                                  <label for="jumlah_benang">Jumlah Benang (Total Ends)</label>
                                  <input id="jumlah_benang"
                                    type="number"
                                    class="form-control"
                                    name="jumlah_benang"            
                                    v-model="parameters.form.jumlah_benang"
                                    :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                                  />
                                  <div class="invalid-feedback" v-if="errors[0]">
                                    {{ errors[0] }}
                                  </div>      
                                </div>
                              </ValidationProvider>
                            </div>
                        </div>
                      <div class="col">
                        <ValidationProvider
                            name="panjang_benang"
                            rules="required">
                            <div class="form-group" slot-scope="{errors,valid}">
                              <label for="panjang_benang">Panjang Benang</label>
                              <input id="panjang_benang"
                                type="number"
                                class="form-control"
                                name="panjang_benang"            
                                v-model="parameters.form.panjang_benang"
                                :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                              />
                              <div class="invalid-feedback" v-if="errors[0]">
                                {{ errors[0] }}
                              </div>      
                            </div>
                          </ValidationProvider>
                      </div>
                    </div>

                    <div class="row">
                        <div class="col">
                              <div class="form-group">
                                <ValidationProvider
                                name=""
                                rules="">
                                <div class="form-group" slot-scope="{errors,valid}">
                                  <label for="beam_ke">Speed</label>
                                  <input id=""
                                    type="text"
                                    class="form-control"
                                    name="speed"            
                                    v-model="parameters.form.speed"
                                    :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                                  />
                                  <div class="invalid-feedback" v-if="errors[0]">
                                    {{ errors[0] }}
                                  </div>      
                                </div>
                              </ValidationProvider>                 
                              </div>
                          </div>

                          <div class="col">
                                <div class="form-group">
                                  <ValidationProvider
                                  name=""
                                  rules="">
                                  <div class="form-group" slot-scope="{errors,valid}">
                                    <label for="beam_ke">Jumlah Putus</label>
                                    <input id=""
                                      type="text"
                                      class="form-control"
                                      name="jumlah_putus"            
                                      v-model="parameters.form.jumlah_putus"
                                      :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                                    />
                                    <div class="invalid-feedback" v-if="errors[0]">
                                      {{ errors[0] }}
                                    </div>      
                                  </div>
                                </ValidationProvider>                 
                                </div>
                            </div>

                       
                      </div>

                      <div class="row"> 
                          <div class="col">
                            <ValidationProvider
                                name="berat_bruto"
                                rules="required">
                                <div class="form-group" slot-scope="{errors,valid}">
                                  <label for="berat_bruto">Berat Bruto</label>
                                  <input id="berat_bruto"
                                    type="number"
                                    class="form-control"
                                    name="berat_bruto"            
                                    v-model="parameters.form.berat_bruto"
                                    :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                                  />
                                  <div class="invalid-feedback" v-if="errors[0]">
                                    {{ errors[0] }}
                                  </div>      
                                </div>
                              </ValidationProvider>
                          </div>

                          <!-- <div class="col">
                                <ValidationProvider
                                  name="tara"
                                  rules="required">
                                  <div class="form-group" slot-scope="{errors,valid}">
                                    <label for="tara">Berat Tara</label>
                                    <input id="tara"
                                      type="number"
                                      class="form-control"
                                      name="tara"            
                                      v-model="parameters.form.tara"
                                      :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                                    />
                                    <div class="invalid-feedback" v-if="errors[0]">
                                      {{ errors[0] }}
                                    </div>      
                                  </div>
                                </ValidationProvider>
                            </div> -->

                            <div class="col">
                                  <!-- <ValidationProvider
                                    name="regu_id"
                                    rules="required">
                                    <div class="form-group" slot-scope="{errors,valid}">
                                      <label for="regu_id">Regu/Shift</label>
                                      <input id="regu_id"
                                        type="text"
                                        class="form-control"
                                        name="regu_id"            
                                        v-model="parameters.form.nik"
                                        :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                                      />
                                      <div class="invalid-feedback" v-if="errors[0]">
                                        {{ errors[0] }}
                                      </div>      
                                    </div>
                                  </ValidationProvider> 
                      @onchange ="onOperatorChange"
                                
                                -->

                  <ValidationProvider
                    name="regu_id"
                    rules="required">
                    <div class="form-group" slot-scope="{errors,valid}">
                      <label for="name">Regu</label>
                      <v-select           
                      label="name"  
                      :loading="isLoadingGetRegu"
                      :options="lookup_regus.data"
                      :filterable="false"
                      @search="onGetRegu"
                      @input="onSetOperator()"

                      v-model="parameters.form.regu_id"
                      :required="true">     
                      <template v-slot:option="option">                    
                        {{ option.name }}
                      </template> 
                      <template #search="{ attributes, events }">
                        <input
                          class="vs__search"
                          :required="!parameters.form.regu_id"
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
                  </ValidationProvider>
                              </div>
                        </div>

                        <!-- <div class="row">
                          <div class="col">
                    <ValidationProvider
                      name="operator_user_id"
                      rules="required">
                      <div class="form-group" slot-scope="{errors,valid}">
                        <label for="name">Operator</label>
                        <v-select           
                        label="fullname"  
                        :loading="isLoadingGetOperator"
                        :options="lookup_users.data"
                        @search="onGetOperator"

                        :filterable="false"
                        v-model="parameters.form.operator_user_id"
                        :required="true">     
                        <template v-slot:option="option">                    
                          {{ option.fullname }}
                        </template> 
                        <template #search="{ attributes, events }">
                          <input
                            class="vs__search"
                            :required="!parameters.form.operator_user_id"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>        
                        <li slot-scope="{search}" slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_users.data.length || search">
                          <span v-if="lookup_users.current_page > 1" 
                            @click="onGetOperator(search, false, parameters.form.regu_id.id)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Sebelumnya</span>
                          <span v-if="lookup_users.last_page > lookup_users.current_page" 
                            @click="onGetOperator(search, true, parameters.form.regu_id.id)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Selanjutnya</span>
                        </li> 
                      </v-select> 

                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>      
                      </div>
                    </ValidationProvider>

                   
                          </div>

                          <div class="col">
                                
                                <ValidationProvider
                        name="pengawas_user_id"
                        rules="required">
                        <div class="form-group" slot-scope="{errors,valid}">
                          <label for="name">Karu/Pengawas</label>
                          <v-select           
                          label="fullname"  
                          :loading="isLoadingGetPengawas"
                          :options="lookup_pengawas.data"
                          @search="onGetPengawas"

                          :filterable="false"
                          v-model="parameters.form.pengawas_user_id"
                          :required="true">     
                          <template v-slot:option="option">                    
                            {{ option.fullname }}
                          </template> 
                          <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!parameters.form.pengawas_user_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template>        
                          <li slot-scope="{search}" slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_pengawas.data.length || search">
                            <span v-if="lookup_pengawas.current_page > 1" 
                              @click="onGetPengawas(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer"
                              >Sebelumnya</span>
                            <span v-if="lookup_pengawas.last_page > lookup_pengawas.current_page" 
                              @click="onGetPengawas(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer"
                              >Selanjutnya</span>
                          </li> 
                        </v-select> 

                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>      
                        </div>
                      </ValidationProvider>
                            </div>
                        </div> -->

                         <div class="row">
                            <div class="col">
                              <ValidationProvider
                                  name="mulai"
                                  rules="required">
                                  <div class="form-group" slot-scope="{errors,valid}">
                                    <label for="mulai">Start</label>
                                    <input id="mulai"
                                      type="text"
                                      class="form-control"
                                      name="mulai"            
                                      v-model="parameters.form.mulai"
                                      :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                                    />
                                    <div class="invalid-feedback" v-if="errors[0]">
                                      {{ errors[0] }}
                                    </div>      
                                  </div>
                                </ValidationProvider>
                            </div>

                            <div class="col">
                                <ValidationProvider
                                    name="selesai"
                                    rules="required">
                                    <div class="form-group" slot-scope="{errors,valid}">
                                      <label for="selesai">Finish</label>
                                      <input id="selesai"
                                        type="text"
                                        class="form-control"
                                        name="selesai"            
                                        v-model="parameters.form.selesai"
                                        :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                                      />
                                      <div class="invalid-feedback" v-if="errors[0]">
                                        {{ errors[0] }}
                                      </div>      
                                    </div>
                                  </ValidationProvider>
                              </div>
                            
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
import { mapActions,mapState } from 'vuex'

export default {  
  middleware : ["isNotAccessable"],

  props: ["self"],

  async mounted(){
    await this.onSearchGroupRole();
    await this.onSearchRegu();
    await this.onSearchOperator();
    await this.onSearchPengawas();
    await this.onSearchMesin();
  },

  data() {
    return {
      isStopSearchGroupRole: false,
      isLoadingGetGroupRole: false,
      group_role_search: '',  

      isStopSearchRegu: false,
      isLoadingGetRegu: false,
      regu_search: '',
      itemOperator: '',


      isStopSearchOperator: false,
      isLoadingGetOperator: false,
      operator_search: '',

      isStopSearchPengawas: false,
      isLoadingGetPengawas: false,
      pengawas_search: '',

      isStopSearchMesin: false,
      isLoadingGetMesin: false,
      mesin_search: '',
      
      isEditable  : false,
      isLoadingForm : false,
      title: 'User',      
      parameters : {
        url : 'manufactur/productionproses',
        form : {
          group_id: '',
          nik: '',
          id: '',
          regu_id: '',
          operator_user_id: '',
          pengawas_user_id: '',
          production_detail_id: '',
          // selesai: '',
          // mulai: ,
          // tara: '',
          berat_bruto: '',
          no_beam: '',
          tanggal: '',
          master_proces_id: "1",
          selected: []

        }
      }
    };
  },

  computed :{
    ...mapState('moduleApi',[
      'error',
      'result',
      'lookup_group_roles',
      'lookup_regus',
      'lookup_users',
      'lookup_pengawas',
      'lookup_mesin'
    ]),  

  },

  methods: {    
    ...mapActions('moduleApi',[
      'addData',
      'updateData',
      'lookUp'
    ]),



    async onSubmit(isInvalid){       
      if(isInvalid || this.isLoadingForm) return;            
      
      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form : {
          ...this.parameters.form,
          // group_role_id : typeof this.parameters.form.group_role_id == 'object' 
          //   ? this.parameters.form.group_role_id.id
          //   : '',
          master_proces_id: "1",
          operator_user_id: "1",
          pengawas_user_id: "1",

          regu_id: typeof this.parameters.form.regu_id == 'object'
            ? this.parameters.form.regu_id.id
            : '',
          production_detail_id: typeof this.parameters.form.production_detail_id == 'object'
            ? this.parameters.form.production_detail_id.id
            : '',
          // operator_user_id: typeof this.parameters.form.operator_user_id == 'object'
          //   ? this.parameters.form.operator_user_id.id
          //   : '',
          // pengawas_user_id: typeof this.parameters.form.pengawas_user_id == 'object'
          //   ? this.parameters.form.pengawas_user_id.id
          //   : '',
          master_machine_id: typeof this.parameters.form.master_machine_id == 'object'
            ? this.parameters.form.master_machine_id.id
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
          url: "machine/machine",
          lookup: 'mesin',
          query: "?search=" + this.mesin_search + "&page=" + this.lookup_mesin.current_page + "&per_page=10&master_proces_id=2"
        })

        this.isLoadingGetMesin = false;
      }
    },

    onGetGroupRole(search,isNext){      
      if(!search.length && typeof isNext === "function") return false;             

      clearTimeout(this.isStopSearchGroupRole);
      
      this.isStopSearchGroupRole = setTimeout(() => {
        this.group_role_search = search;

        if(typeof isNext !== "function"){
          this.lookup_group_roles.current_page = isNext 
            ? this.lookup_group_roles.current_page + 1 
            : this.lookup_group_roles.current_page - 1;        
        }else{
          this.lookup_group_roles.current_page = 1;
        }

        this.onSearchGroupRole();
      },600);        
    },

    async onSearchGroupRole(){
      if(!this.isLoadingGetGroupRole){
        this.isLoadingGetGroupRole = true;
                
        await this.lookUp({    
          url : "manufactur/productionproses/get-konstruksi",      
          lookup  : 'group_roles',
          query : "?search="+this.group_role_search+"&page="+this.lookup_group_roles.current_page+"&per_page=10"
        })

        this.isLoadingGetGroupRole = false;      
      }
    },

    onGetRegu(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchRegu);

      this.isStopSearchRegu= setTimeout(() => {
        this.regu_search = search;

        if (typeof isNext !== "function") {
          this.lookup_regus.current_page = isNext
            ? this.lookup_regus.current_page + 1
            : this.lookup_regus.current_page - 1;
        } else {
          this.lookup_regus.current_page = 1;
        }
        let operator = this.parameters.form.regu_id;
        this.onSearchRegu();
      }, 600);
    },

    async onSearchRegu() {
      if (!this.isLoadingGetRegu) {
        this.isLoadingGetRegu = true;
        await this.lookUp({
          url: "master/regu",
          lookup: 'regus',
          query: "?search=" + this.regu_search + "&page=" + this.lookup_regus.current_page + "&per_page=10"
        })

        this.isLoadingGetRegu = false;
      }
    },

    onSetOperator() {
     clearTimeout(this.isStopSearchOperator);
      this.regu_id = '';
      this.parameters.form.operator_user_id = '';

      this.isStopSearchOperator = setTimeout(() => {
        this.regu_id = this.parameters.form.regu_id.id;

        this.onSearchOperator();
        this.onSearchPengawas();
      }, 20);
    },

    onGetOperator(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchOperator);

      this.isStopSearchOperator = setTimeout(() => {
        this.regu_search = search;
        this.regu_id = this.parameters.form.regu_id.id;

        if (typeof isNext !== "function") {
          this.lookup_regus.current_page = isNext
            ? this.lookup_regus.current_page + 1
            : this.lookup_regus.current_page - 1;
        } else {
          this.lookup_regus.current_page = 1;
        }

        this.onSearchOperator();
      }, 600);
    },


    async onSearchOperator() {
      if (!this.isLoadingGetOperator) {
        this.isLoadingGetOperator = true;
        await this.lookUp({
          url: "setting/user",
          lookup: 'users',
          query: "?search=" + this.regu_search + "&page=" + this.lookup_users.current_page + "&per_page=10&group_role_id=5&regu_id="+ this.regu_id
        })

        this.isLoadingGetOperator = false;
      }
    },

    onGetPengawas(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPengawas);

      this.isStopSearchPengawas = setTimeout(() => {
        this.regu_search = search;
        this.regu_id = this.parameters.form.regu_id.id;

        if (typeof isNext !== "function") {
          this.lookup_pengawas.current_page = isNext
            ? this.lookup_pengawas.current_page + 1
            : this.lookup_pengawas.current_page - 1;
        } else {
          this.lookup_pengawas.current_page = 1;
        }

        this.onSearchPengawas();
      }, 600);
    },


     async onSearchPengawas() {
      if (!this.isLoadingGetPengawas) {
        this.isLoadingGetPengawas = true;
        await this.lookUp({
          url: "setting/user",
          lookup: 'pengawas',
          query: "?search=" + this.regu_search + "&page=" + this.lookup_pengawas.current_page + "&per_page=10&group_role_id=4&regu_id=" + this.regu_id
        })

        this.isLoadingGetPengawas = false;
      }
    },


    // onOperatorChange() {
    //   if (
    //     this.form.regu_id &&
    //     this.form.operator_user_id
    //   ) {
    //     let itemOperator = this.form.regu_id
    //       // .operator_user_id.find(item => item.regu_id == this.form.operator_user_id)

    //     // this.form.quantity = itemOperator ? itemOperator.quantity : 0;
    //     this.$axios.get("setting/user?group_role_id=" + itemOperator.regu_id)
    //       .then(res => {
    //         if (res.data.bom) {
    //           if (
    //             res.data.bom.bom_details &&
    //             res.data.bom.bom_details.length
    //           ) {
    //             this.form.material_requirement_details = res.data.bom.bom_details.map(item => {
    //               return {
    //                 quantity: (parseFloat(item.quantity) * parseFloat(itemProduct.quantity)),
    //                 quantity_bom: item.quantity,
    //                 quantity_receive: 0,
    //                 product_id: item.product || "",
    //                 description: ""
    //               }
    //             })
    //           }
    //         }
    //       });
    //   }
    // }
    

  },
  
};


</script>
