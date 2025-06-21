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
              
              <div class="form-group">
                      <label for="type">
                        Type 
                      </label>
                      <select
                        class="form-control" 
                          @change="onChangeType"

                        v-model="parameters.form.type">
                        <option value="WARPING">WARPING</option>
                        <option value="SIZING">SIZING</option>                      
                      </select>                  
                    </div>

                  <ValidationProvider
                    name="code"
                    rules="required">
                    <div class="form-group" slot-scope="{errors,valid}">
                      <label for="code">Kode</label>
                      <input id="code"
                        type="text"
                        class="form-control"
                        name="code"
                        :disabled="!parameters.form.type"
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
                    >
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
                      name="tara"
                      rules="required">
                      <div class="form-group" slot-scope="{errors,valid}">
                        <label for="tara">Tara</label>
                        <input id="tara"
                          type="text"
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
      isEditable  : false,
      isLoadingForm : false,
      title: 'BEAM',      
      parameters : {
        url : 'master/masterbeam',
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
    ]),  
  },

  methods: {    
    ...mapActions('moduleApi',[
       'addData',
       'updateData',
       'getCode',
    ]), 

    async onChangeType() {
      let parent_id = this.parameters.form.type;
      await this.getCode({
        url: "master/masterbeam",
        query: "?type="+ parent_id,
      });

      this.parameters.form.code = this.code;
    },

    async onSubmit(isInvalid){       
      if(isInvalid || this.isLoadingForm) return;            
      
      this.isLoadingForm = true;

      if(this.isEditable){
        await this.updateData(this.parameters)
      }else{ 
        await this.addData(this.parameters)
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
