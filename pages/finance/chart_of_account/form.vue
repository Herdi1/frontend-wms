<template>
  <portal to="modal">
    <div class="modal fade" 
      aria-hidden="true" 
      id="modal-form">
      <div class="modal-dialog modal-md">
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
                <div 
                  :class="!parameters.form.type ? 'col-md-6' : 'col-md-12'">
                  <div class="form-group">
                    <label for="type">Type</label>
                    <select class="form-control" 
                      v-model="parameters.form.type"
                      @change="onChangeType"
                      :disabled="isEditable">
                      <option value="">Pilih</option>
                      <option value="HARTA">HARTA</option>
                      <option value="KEWAJIBAN">KEWAJIBAN</option>
                      <option value="MODAL">MODAL</option>
                      <option value="PENDAPATAN">PENDAPATAN</option>
                      <option value="BIAYA">BIAYA</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6"
                  v-if="!parameters.form.type">
                  <div class="form-group">
                    <label for="parent_id">Parent</label>
                      <v-select           
                        label="name"   
                        :loading="isLoadingGetParent"
                        :options="lookup_parents.data"
                        :filterable="false"
                        @search="onGetParent"
                        @input="onSetParent"
                        v-model="parameters.form.parent_id"
                        :required="true"
                        :disabled="isEditable">
                        <template #search="{attributes, events}">
                          <input
                            class="vs__search"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>        
                        <li slot-scope="{search}" slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_parents.data.length || search">
                          <span v-if="lookup_parents.current_page > 1" 
                            @click="onGetParent(search,false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Sebelumnya</span>
                          <span v-if="lookup_parents.last_page > lookup_parents.current_page" 
                            @click="onGetParent(search,true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Selanjutnya</span>
                        </li> 
                      </v-select>   
                  </div>
                </div>                 
              </div>

              <div class="row">
                <div class="col-md-6">
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
                        disabled
                      />

                      <div class="invalid-feedback" v-if="errors[0]">
                        {{ errors[0] }}
                      </div>      
                    </div>
                  </ValidationProvider>
                </div>

                <div class="col-md-6">
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

  data() {
    return {
      isStopSearchParent : false,
      isLoadingGetParent :  false,
      parent_search : '',

      isEditable  : false,
      isLoadingForm : false,
      title: 'Master Akun',      
      parameters : {
        url : 'finance/chart_of_account',
        form : {
         code : '',
         name : '',
         parent_id : '',
         type : 'HARTA'          
        }
      }
    };
  },

  computed :{
    ...mapState('moduleApi',[
      'error',
      'result',
      'code',
      'lookup_parents'    
    ]),  
  },

  methods: {    
    ...mapActions('moduleApi',[
       'addData',
       'updateData',
       'getCode',
       'lookUp'
    ]),

    async onSubmit(isInvalid){       
      if(isInvalid || this.isLoadingForm) return;            
      
      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form : {
          ...this.parameters.form,
          parent_id : typeof this.parameters.form.parent_id == 'object'
            ? this.parameters.form.parent_id.id 
            : '',       
        }
      }

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

    async setCode(){      
      let parent_id = this.parameters.form.parent_id 
        ? this.parameters.form.parent_id.id 
        : "";      
        
      await this.getCode({
        url : this.parameters.url,        
        query : "?parent_id=" + parent_id
      });

      this.parameters.form.code = this.code;
    },

    onGetParent(search,isNext){      
      if(!search.length && typeof isNext === "function") return false;             

      clearTimeout(this.isStopSearchParent);
      
      this.isStopSearchParent= setTimeout(() => {
        this.parent_search = search;

        if(typeof isNext !== "function"){
          this.lookup_parents.current_page = isNext 
            ? this.lookup_parents.current_page + 1 
            : this.lookup_parents.current_page - 1;        
        }else{
          this.lookup_parents.current_page = 1;
        }

        this.onSearchParent();
      },600);        
    },

    async onSearchParent(){
      if(!this.isLoadingGetParent){
        this.isLoadingGetParent = true;
                
        await this.lookUp({    
          url : "finance/chart_of_account/get-parent",
          lookup  : 'parents',
          query : "?search=" + this.parent_search +
          "&page=" + this.lookup_parents.current_page +
          "&per_page=10"
        })

        this.isLoadingGetParent = false;      
      }
    },

    onSetParent(item){
      if(item){        
        if(item.id == this.parameters.form.id) {
          this.$toaster.warning("Anda tidak dapat memilih parent sendiri");

          this.parameters.form.parent_id = "";
        }

        if(!this.isEditable){
          this.setCode();
        }
      }else{
        this.parameters.form.parent_id = '';
      }
    },

    onChangeType(){
      if(!this.isEditable){
        this.setCode();
      }
    }
  },
};
</script>
