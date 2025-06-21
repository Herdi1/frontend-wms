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

                <div class="row">                       
                  <div class="col-md-12 form-group">
                    <label for="product_id]">Produk</label>
                       <input type="text"
                      class="form-control"
                      :value="parameters.form.product_id ? parameters.form.product_id.name : '-'" 
                      disabled/>
                  </div>        
                </div>    

                <div class="row">        
                  <div class="col-md-6 form-group">
                    <label for="warehouse_from_id">Dari Gudang</label>
                    <input type="text"
                      class="form-control"
                      :value="parameters.form.warehouse_from_id ? parameters.form.warehouse_from_id.name : '-'" 
                      disabled/>
                  </div>
        
                  <div class="col-md-6 form-group">
                    <label for="warehouse_to_id">Ke Gudang</label>
                    <input type="text"
                      class="form-control"
                      :value="parameters.form.warehouse_from_id ? parameters.form.warehouse_from_id.name : '-'" 
                      disabled/>
                  </div>        
                </div>                                                                  

              <ValidationProvider
                name="date"
                rules="required">
                <div class="form-group" slot-scope="{errors,valid}">
                  <label for="date">Tgl</label>
                  <input id="date"
                    type="date"
                    class="form-control"
                    name="date"
                    v-model="parameters.form.date"
                    :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                  />               
                  <div class="invalid-feedback" v-if="errors[0]">
                    {{ errors[0] }}
                  </div>
                </div>
              </ValidationProvider>  

              <div class="form-group">
                <label for="description">Keterangan</label>
                <textarea class="form-control" v-model="parameters.form.description"></textarea>
              </div>

              <div class="form-group">
                <label for="stock_from">
                  Stok Gudang 
                  {{parameters.form.warehouse_from_id ? parameters.form.warehouse_from_id.name : '-'}}
                </label>
                <div>
                  <money v-model="parameters.form.stock_from"
                      class="form-control"                                                                       
                      @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                      disabled
                  />        
                </div>
              </div>

              <div class="form-group">
                <label for="stock_to">
                  Stok Gudang 
                  {{parameters.form.warehouse_to_id ? parameters.form.warehouse_to_id.name : '-'}}
                </label>
                <div>
                  <money v-model="parameters.form.stock_to"
                      class="form-control"                                                                       
                      @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                      disabled
                  />        
                </div>
              </div>

              <ValidationProvider
                name="quantity"
                rules="required">
                <div class="form-group" slot-scope="{errors,valid}">
                  <label for="quantity">Jumlah Mutasi</label>
                  <money v-model="parameters.form.quantity"
                      class="form-control"                                                                       
                      @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
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
      isEditable  : true,
      isLoadingForm : false,

      title: 'Stok Mutasi',      

      parameters : {
        url : 'inventory/stock_mutation',
        form : {
         id : 0,
         code : '',
         product_id : '',
         warehouse_from_id : '',
         warehouse_to_id : '',
         date : '',
         description : '',
         quantity : 0.00,         
         stock_to : 0.00,
         stock_from : 0.00      
        }
      }
    };
  },

  computed :{
    ...mapState('moduleApi',[
      'error',
      'result',
    ]),  
  },

  methods: {    
    ...mapActions('moduleApi',[
       'updateData',
    ]),

    async onSubmit(isInvalid){       
      if(isInvalid || this.isLoadingForm) return;            
      
      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form : {
          ...this.parameters.form,
          product_id : typeof this.parameters.form.product_id == 'object'
            ? this.parameters.form.product_id.id 
            : '',
          warehouse_from_id : typeof this.parameters.form.warehouse_from_id == 'object'
            ? this.parameters.form.warehouse_from_id.id 
            : '',
          warehouse_to_id : typeof this.parameters.form.warehouse_to_id == 'object'
            ? this.parameters.form.warehouse_to_id.id 
            : ''
        }
      }

      await this.updateData(parameters)

      if (this.result == true) {      
        this.self.onLoad(this.self.parameters.params.page);  
        this.$toaster.success('Data berhasil di Diedit');
        window.$("#modal-form").modal("hide");
      }else {
        this.$globalErrorToaster(this.$toaster,this.error);      
      }

      this.isLoadingForm = false;
    },
    
    onGetSystemStock(){      
      let warehouse_from_id = this.parameters.form.warehouse_from_id ? this.parameters.form.warehouse_from_id.id : 0;
      let warehouse_to_id = this.parameters.form.warehouse_to_id ? this.parameters.form.warehouse_to_id.id : 0;
      let product_id = this.parameters.form.product_id ? this.parameters.form.product_id.id : 0;

      this.parameters.form.stock_from = 0.00;
      this.parameters.form.stock_to = 0.00;

      this.$axios.get("/inventory/stock_mutation/get-stock/"+warehouse_from_id+"/"+product_id)
        .then(res => {
          if(res.data){
             this.parameters.form.stock_from = res.data.quantity || 0.00;
          }                    
        })

      this.$axios.get("/inventory/stock_mutation/get-stock/"+warehouse_to_id+"/"+product_id)
        .then(res => {
          if(res.data){
             this.parameters.form.stock_to = res.data.quantity || 0.00;
          }
        })
    }
  },
};
</script>
