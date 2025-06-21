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
                  <div class="col-md-6 form-group">
                    <label for="warehouse_id">Gudang</label>
                       <input type="text"
                      class="form-control"
                      :value="parameters.form.warehouse_id ? parameters.form.warehouse_id.name : '-'" 
                      disabled/>   
                  </div>
        
                  <div class="col-md-6 form-group">
                    <label for="product_id]">Produk</label>
                    <input type="text"
                      class="form-control"
                      :value="parameters.form.product ? parameters.form.product.name : '-'" 
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
                <label for="system_stock">Stok Sistem Sekarang</label>
                <money v-model="parameters.form.system_stock_now"
                    class="form-control"                                                                       
                    @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                    disabled
                />                                         
              </div>

              <div class="form-group">
                <label for="system_stock">Stok Sistem Sebelumnya</label>
                <money v-model="parameters.form.system_stock"
                    class="form-control"                                                                       
                    @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                    disabled
                />                                         
              </div>
          
              <ValidationProvider
                name="real_stock"
                rules="required">
                <div class="form-group" slot-scope="{errors,valid}">
                  <label for="real_stock">Stok Nyata</label>
                  <money v-model="parameters.form.real_stock"
                      class="form-control"                                                                       
                      @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                      @keyup.native="onChangeStock"
                      :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                  />                             
                  <div class="invalid-feedback" v-if="errors[0]">
                    {{ errors[0] }}
                  </div>
                </div>
              </ValidationProvider>  
                                      
              <div class="form-group">
                <label for="difference_stock">Selisih</label>
                <money v-model="parameters.form.difference_stock"
                    class="form-control"                                                                       
                    @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                    disabled
                />                                           
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
      isEditable  : true,
      isLoadingForm : false,

      title: 'Stok Opname',      

      parameters : {
        url : 'inventory/stock_opname',
        form : {
         id : 0,
         code : '',
         product_id : '',
         warehouse_id : '',
         date : '',
         description : '',

         system_stock : 0.00,
         real_stock : 0.00,
         difference_stock : 0.00,

         edited_system_stock : 0.00,               
         edited_real_stock : 0.00,               
         edited_difference_stock : 0.00,               
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
          warehouse_id : typeof this.parameters.form.warehouse_id == 'object'
            ? this.parameters.form.warehouse_id.id 
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

    onChangeStock(){   
      this.parameters.form.difference_stock = this.parameters.form.real_stock - this.parameters.form.system_stock
    },

    onGetSystemStock(){      
      let warehouse_id = this.parameters.form.warehouse_id ? this.parameters.form.warehouse_id.id : 0;
      let product_id = this.parameters.form.product_id ? this.parameters.form.product_id.id : 0;

      this.parameters.form.system_stock_now = 0.00;

      this.onChangeStock();    

      this.$axios.get("/inventory/stock_opname/get-stock/"+warehouse_id+"/"+product_id)
        .then(res => {
          if(res.data){
             this.parameters.form.system_stock_now = res.data.quantity || 0.00;
          }            

          this.onChangeStock();
        })
    }
  },
};
</script>
