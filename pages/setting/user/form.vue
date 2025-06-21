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
                <div class="col">
                  <div class="form-group">
                    <label for="fullname">Nama Lengkap</label>
                    <input id="fullname"
                      type="text"
                      class="form-control"
                      name="fullname"
                      v-model="parameters.form.fullname"
                    />               
                  </div>
                </div>

                <div class="col">
                  <ValidationProvider
                    name="username"
                    rules="required">
                    <div class="form-group" slot-scope="{errors,valid}">
                      <label for="uername">Username</label>
                      <input id="username"
                        type="text"
                        class="form-control"
                        name="username"
                        v-model="parameters.form.username"
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
                        name="nik"
                        >
                        <div class="form-group" slot-scope="{errors,valid}">
                          <label for="nik">NIK</label>
                          <input id="nik"
                            type="text"
                            class="form-control"
                            name="nik"            
                            v-model="parameters.form.nik"
                            :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                          />
                          <!-- <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>       -->
                        </div>
                      </ValidationProvider>
                  </div>

                  <div class="col">
                        <div class="form-group">
                          <label for="jenis_kelamin">
                            Jenis Kelamin
                          </label>
                          <select
                            class="form-control"                  
                            v-model="parameters.form.jenis_kelamin">
                            <option value="l">Laki-laki</option>
                            <option value="p">Perempuan</option>                      
                          </select>                  
                        </div>
                    </div>
                </div>

              <ValidationProvider
                name="email"
                rules="email">
                <div class="form-group" slot-scope="{errors,valid}">
                  <label for="email">Email</label>
                  <input id="email"
                    type="text"
                    class="form-control"
                    name="email"            
                    v-model="parameters.form.email"
                    :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                  />

                  <!-- <div class="invalid-feedback" v-if="errors[0]">
                    {{ errors[0] }}
                  </div>       -->
                </div>
              </ValidationProvider>

              
              <ValidationProvider
                name="password"
                :rules="isEditable ? 'min:8' : 'required|min:8'">
                <div class="form-group" slot-scope="{errors,valid}">
                  <label for="password">Password</label>
                  <input id="password"
                    type="password"
                    class="form-control"
                    name="password"            
                    v-model="parameters.form.password"
                    :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                  />

                  <div class="invalid-feedback" v-if="errors[0]">
                    {{ errors[0] }}
                  </div>      
                  <div class="text-muted" v-if="!errors[0] && isEditable">
                    * Isi password jika ingin mengantinya
                  </div>
                </div>
              </ValidationProvider>   

              <div class="form-group"
                v-if="!isEditable || parameters.form.parent_id">
                <label for="">Hak Akses Group</label>

                <v-select           
                  label="name"  
                  :loading="isLoadingGetGroupRole"
                  :options="lookup_group_roles.data"
                  :filterable="false"
                  @search="onGetGroupRole"
                  v-model="parameters.form.group_role_id"
                  :required="true">     
                  <template v-slot:option="option">                    
                    {{ option.name }}
                  </template> 
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      :required="!parameters.form.group_role_id"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>        
                  <li slot-scope="{search}" slot="list-footer"
                    class="d-flex justify-content-between"
                    v-if="lookup_group_roles.data.length || search">
                    <span v-if="lookup_group_roles.current_page > 1" 
                      @click="onGetGroupRole(search,false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer"
                      >Sebelumnya</span>
                    <span v-if="lookup_group_roles.last_page > lookup_group_roles.current_page" 
                      @click="onGetGroupRole(search,true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer"
                      >Selanjutnya</span>
                  </li> 
                </v-select>                     
              </div>

              <div class="form-group">
                  <label for="">Regu/Group</label>

                  <v-select           
                    label="name"  
                    :loading="isLoadingGetRegu"
                    :options="lookup_regus.data"
                    :filterable="false"
                    @search="onGetRegu"
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

  },

  data() {
    return {
      isStopSearchGroupRole : false,
      isLoadingGetGroupRole :  false,
      group_role_search: '', 

      isStopSearchRegu: false,
      isLoadingGetRegu: false,
      regu_search: '',

      isEditable  : false,
      isLoadingForm : false,
      title: 'User',      
      parameters : {
        url : 'setting/user',
        form : {
          fullname : '',
          username : '',
          password : '',
          email    : '',      
          group_id: '',
          nik: '',
          jenis_kelamin: '',
          parent_id: '',
          regu_id: ''

        }
      }
    };
  },

  computed :{
    ...mapState('moduleApi',[
      'error',
      'result',
      'lookup_group_roles',
      'lookup_regus'

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
          group_role_id : typeof this.parameters.form.group_role_id == 'object' 
            ? this.parameters.form.group_role_id.id
            : '',
          regu_id: typeof this.parameters.form.regu_id == 'object'
            ? this.parameters.form.regu_id.id
            : ''
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
          url : "setting/user/get-group-role",      
          lookup  : 'group_roles',
          query : "?search="+this.group_role_search+"&page="+this.lookup_group_roles.current_page+"&per_page=10"
        })

        this.isLoadingGetGroupRole = false;      
      }
    },

    onGetRegu(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchRegu);

      this.isStopSearchRegu = setTimeout(() => {
        this.regu_search = search;

        if (typeof isNext !== "function") {
          this.lookup_regus.current_page = isNext
            ? this.lookup_regus.current_page + 1
            : this.lookup_regus.current_page - 1;
        } else {
          this.lookup_regus.current_page = 1;
        }

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
    }
  },
};
</script>
