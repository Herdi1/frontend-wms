<template>
    <section class="section">
        <div class="section-body">
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        <div class="d-flex justify-content-between">                                
                            <h6>
                                Tambah Stok Opname
                            </h6>
                        
                            <button class="btn btn-primary"
                                @click="$router.back()">
                                <i class="fas fa-arrow-left"></i>
                                Kembali
                            </button>
                        </div>
                    </div>

                <ValidationObserver
                    v-slot="{invalid,validate}"
                    ref="form-validate">
                    <form @submit.prevent="() => console.log('Submit')"
                        autocomplete="off">                          
    
                        <div class="container">
                            <div class="d-flex flex-row">
                                <div class="col-sm-4"> 
                                     <div class="form-group">
                                          <div class="row">
                                                <div class="col-sm-2 align-self-center">
                                                    <label for="warehouse_id">Gudang</label>
                                                </div>
                                                <div class="col-sm-10 align-self-center">
                                                <v-select                           
                                                    label="name"   
                                                    :loading="isLoadingGetWarehouse"
                                                    :options="lookup_warehouses.data"
                                                    :filterable="false"
                                                    @search="onGetWarehouse"
                                                    @input="onSetWarehouse"
                                                    v-model="form.warehouse_id">              
                                                    <template v-slot:option="option">                    
                                                        <div class="row">
                                                            <div class="col-md-5 p-1 m-0">
                                                            {{ option.name }}
                                                            </div>
                                                            <div class="col-md-7 p-1 m-0 text-right">
                                                                {{ option.code }}
                                                            </div>
                                                        </div>
                                                    </template> 
                                                    <template #search="{attributes, events}">
                                                        <input
                                                        class="vs__search"
                                                        :required="!form.warehouse_id"
                                                        v-bind="attributes"
                                                        v-on="events"
                                                        />
                                                    </template>   
                                                    <li slot-scope="{search}" slot="list-footer"
                                                        class="d-flex justify-content-between"
                                                        v-if="lookup_warehouses.data.length || search">
                                                        <span v-if="lookup_warehouses.current_page > 1" 
                                                            @click="onGetWarehouse(search,false)"
                                                            class="flex-fill bg-primary text-white text-center"
                                                            style="cursor:pointer">Sebelumnya</span>
                                                        <span v-if="lookup_warehouses.last_page > lookup_warehouses.current_page" 
                                                            @click="onGetWarehouse(search,true)"
                                                            class="flex-fill bg-primary text-white text-center"
                                                            style="cursor:pointer">Selanjutnya</span>
                                                    </li> 
                                                </v-select>   
                                                </div>
                                          </div>                                                             
                                    </div>
                                </div>
                                <div class="col-sm-4">    
                                    <ValidationProvider
                                        name="date"
                                        rules="required">          
                                        <div class="form-group" slot-scope="{errors,valid}">
                                            <div class="row">
                                                <div class="col-sm-2 align-self-center">
                                                        <label for="date">Tgl</label>
                                                </div>
                                                <div class="col-sm-10 align-self-center">
                                                    <input type="date" 
                                                        class="form-control"
                                                        name="date"
                                                        v-model="form.date"                                    
                                                        :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"/>

                                                    <div class="invalid-feedback" v-if="errors[0]">
                                                        {{ errors[0] }}
                                                    </div>            
                                                </div>
                                            </div>           
                                        </div>
                                    </ValidationProvider>
                                </div>
                            </div>
                        </div>            

                        <div class="clearfix">
                            <span class="btn btn-primary float-right"
                                @click="addDetail"
                                style="cursor:pointer">
                                <i class="fas fa-plus"></i>
                                Tambah
                            </span>
                        </div>

                        <div class="table-responsive table-striped">                        
                            <table class="table table-sm mt-3">
                                <tr>
                                    <td class="text-left table-transaction-header"
                                        style="width:10%">Kode</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:20%">Product</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:10%">Stok Sistem</td>                                        
                                    <td class="text-left table-transaction-header"
                                        style="width:10%">Stok Nyata</td>                                        
                                    <td class="text-left table-transaction-header"
                                        style="width:10%">Stok Selisih</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:10%">Keterangan</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:1%">Opsi</td>
                                </tr>
                                <tr v-for="item,index in form.stock_opnames"
                                    :key="index">
                                    <td class="table-transaction-row">
                                        <input type="text" 
                                            class="form-control"
                                            :value="item.code"
                                            disabled/>                            
                                    </td>
                                    <td class="table-transaction-row">
                                        <v-select                           
                                            label="name"   
                                            :loading="isLoadingGetProduct"
                                            :options="lookup_products.data"
                                            :filterable="false"
                                            @search="onGetProduct"
                                            @input="onSetProduct(index)"
                                            v-model="item.product_id">              
                                            <template v-slot:option="option">                    
                                                <div class="row">
                                                    <div class="col-md-5 p-1 m-0">
                                                    {{ option.name }}
                                                    </div>
                                                    <div class="col-md-7 p-1 m-0 text-right">
                                                        {{ option.code }}
                                                    </div>
                                                </div>
                                            </template> 
                                            <template #search="{attributes, events}">
                                                <input
                                                class="vs__search"
                                                :required="!item.product_id"
                                                v-bind="attributes"
                                                v-on="events"
                                                />
                                            </template>   
                                            <li slot-scope="{search}" slot="list-footer"
                                                class="d-flex justify-content-between"
                                                v-if="lookup_products.data.length || search">
                                                <span v-if="lookup_products.current_page > 1" 
                                                    @click="onGetProduct(search,false)"
                                                    class="flex-fill bg-primary text-white text-center"
                                                    style="cursor:pointer">Sebelumnya</span>
                                                <span v-if="lookup_products.last_page > lookup_products.current_page" 
                                                    @click="onGetProduct(search,true)"
                                                    class="flex-fill bg-primary text-white text-center"
                                                    style="cursor:pointer">Selanjutnya</span>
                                            </li> 
                                        </v-select>       
                                    </td>
                                    <td class="table-transaction-row">
                                        <money v-model="item.system_stock"
                                            class="form-control"                                                                       
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"                                    
                                            disabled
                                        />     
                                    </td>
                                    <td class="table-transaction-row">
                                        <money v-model="item.real_stock"
                                            class="form-control"                                                                       
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                            @keyup.native="onChangeStock(index)"
                                        />                                             
                                    </td>
                                    <td class="table-transaction-row">
                                         <money v-model="item.difference_stock"
                                            class="form-control"                                                                       
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                            disabled
                                        />                                     
                                    </td>
                                    <td class="table-transaction-row">
                                        <textarea class="form-control" 
                                            v-model="item.description"></textarea>
                                    </td>                                  
                                    <td class="text-center table-transaction-row">
                                        <i class="fas fa-trash"
                                            style="cursor:pointer"
                                            @click="deleteDetail(index)"></i>
                                    </td>                                    
                                </tr>

                                <tr v-if="!form.stock_opnames.length">
                                    <td colspan="7"
                                        class="text-center pt-4 pb-4">
                                        Data tidak ditemukan
                                    </td>
                                </tr>                                             
                            </table>     

                             <div class="mt-5 mb-5"
                                style="height: 100px">                                
                            </div>                           
                        </div>

                        <button class="btn btn-primary mt-3"
                            @click="validate().then(onSubmit(invalid))"
                            type="button">
                            <span v-if="isLoadingForm">
                                <i class="fas fa-circle-notch fa-spin"></i>
                            </span>
                            <span v-else>
                                Simpan
                                <i class="fas fa-save"></i>
                            </span>
                        </button>                            
                    </form>
                </ValidationObserver>
                </div>
            </div>            
        </div>    
    </section>
</template>

<script>
import { mapActions,mapState } from 'vuex'

export default {
    middleware : ['checkRoleUserDetail'],

    head() {
        return {
            title: 'Stok Opname',
        }
    },

    data(){         
        return {            
            isLoadingForm : false,

            isStopSearchWarehouse : false,
            isLoadingGetWarehouse : false,
            warehouse_search : '',

            isStopSearchProduct : false,
            isLoadingGetProduct : false,
            product_search : '',

            form : {
                warehouse_id : '',
                date : moment().format("YYYY-MM-DD"),               
                stock_opnames : [],             
            },

            default_form : {              
                warehouse_id : '',
                date : moment().format("YYYY-MM-DD"),               
                stock_opnames : [],      
            }
        }
    },
   
    async mounted(){
        await this.onSearchWarehouse();

        await this.onSearchProduct();
    },

    computed :{
        ...mapState('moduleApi',[
            'lookup_warehouses',
            'lookup_products',   
            'code' 
        ]),      

        limit_item_transaction(){
            return this.$store.state.setting.settings
                .find(item => item.name == "limit_item_transaction")
                .value;
        }
    },

    methods: {    
        ...mapActions('moduleApi',[
            'lookUp',
            'getCode'
        ]),

        onGetWarehouse(search,isNext){      
            if(!search.length && typeof isNext === "function") return false;             

            clearTimeout(this.isStopSearchWarehouse);
            
            this.isStopSearchWarehouse = setTimeout(() => {
                this.warehouse_search = search;

                if(typeof isNext !== "function"){
                    this.lookup_warehouses.current_page = isNext 
                        ? this.lookup_warehouses.current_page + 1 
                        : this.lookup_warehouses.current_page - 1;        
                }else{
                    this.lookup_warehouses.current_page = 1;
                }

                this.onSearchWarehouse();
            },600);        
        },

        async onSearchWarehouse(){
            if(!this.isLoadingGetWarehouse){
                this.isLoadingGetWarehouse = true;
                        
                await this.lookUp({    
                    url : "inventory/stock_opname/get-warehouse",
                    lookup : "warehouses",
                    query : "?search="
                        + this.warehouse_search + 
                        "&page="
                        + this.lookup_warehouses.current_page + 
                        "&per_page=10"
                })

                this.isLoadingGetWarehouse = false;      
            }
        },

        onGetProduct(search,isNext){      
            if(!search.length && typeof isNext === "function") return false;             

            clearTimeout(this.isStopSearchProduct);
            
            this.isStopSearchProduct = setTimeout(() => {
                this.product_search = search;

                if(typeof isNext !== "function"){
                    this.lookup_products.current_page = isNext 
                        ? this.lookup_products.current_page + 1 
                        : this.lookup_products.current_page - 1;        
                }else{
                    this.lookup_products.current_page = 1;
                }

                this.onSearchProduct();
            },600);        
        },

        async onSearchProduct(){
            if(!this.isLoadingGetProduct){
                this.isLoadingGetProduct = true;
                        
                await this.lookUp({    
                    url : "inventory/stock_opname/get-product",
                    lookup : "products",
                    query : "?search="
                        + this.product_search + 
                        "&page=" 
                        + this.lookup_products.current_page +
                        "&per_page=5"
                })

                this.isLoadingGetProduct = false;      
            }
        },
    
        onSubmit(isInvalid){
            if(isInvalid || this.isLoadingForm) return;            
      
            if(!this.form.stock_opnames.length){
                this.$toaster.error("Detail Stok Opname Masih Kosong");
                return;
            }

            this.isLoadingForm = true;

            let url = "inventory/stock_opname";

            let formData = {
                ...this.form,            
                warehouse_id : typeof this.form.warehouse_id == 'object'
                    ? this.form.warehouse_id.id                 
                    : ''
            }

            formData.stock_opnames = formData
                .stock_opnames
                .map(item => {
                    return {
                        ...item,
                        product_id : typeof item.product_id == 'object'
                            ? item.product_id.id 
                            : ''
                    }
                });    

            this.$axios({
                url : url,
                method : "post",
                data : formData
            })
            .then(res => {
                this.$toaster.success("Berhasil Tambah Stok Opname");
            
                this.form = {
                    ...this.default_form,
                    stock_opnames : []
                }                                            
            })
            .catch(err => {
                this.$globalErrorToaster(this.$toaster,err);
            })
            .finally(() => {
                this.isLoadingForm = false;
            })            
        },        
      
        async addDetail(){
            await this.getCode({
                url : "inventory/stock_opname",
                query : ""            
            });

            if(parseInt(this.limit_item_transaction) <= this.form.stock_opnames.length){
                this.$toaster.error("Hanya " + this.limit_item_transaction + " batas item yang di perbolehkan");
                return;
            }

            this.form.stock_opnames.push({
                code : this.code,
                product_id : '',
                system_stock : 0.00,
                real_stock : 0.00,
                difference_stock : 0.00,
                description : ''
            })
        },

        deleteDetail(indexItem){
            this.form.stock_opnames = this.form
                .stock_opnames
                .filter((_,index) => index != indexItem);
        },

        onSetWarehouse(item){
            if(item){
                this.form.stock_opnames.forEach((_,index) => {
                    this.onGetSystemStock(index);
                })
            }else{
                this.form.warehouse_id = '';
            }
        },

        onSetProduct(index) {        
            let details = [
                ...this.form.stock_opnames
            ];

            let itemProduct = {
                ...this.form.stock_opnames[index]
            }            

            if(!itemProduct.product_id) {
                this.form.stock_opnames[index].product_id = '';
                return
            };                            

            let product = itemProduct.product_id;

            let products = details.filter(item => (item.product_id ? item.product_id.id : 0) === product.id);
    
            if(products.length > 1){
                this.$toaster.error("Product sudah ada di dalam list");
                    
                this.form.stock_opnames = details.filter((_,indexItem) => index != indexItem);            
            }else{
                this.onGetSystemStock(index);
            }      
        },

        onChangeStock(index){            
            this.form.stock_opnames[index].difference_stock = this.form.stock_opnames[index].real_stock - ( this.form.stock_opnames[index].system_stock );
        },

        onGetSystemStock(index){
            let product_id = this.form.stock_opnames[index].product_id;

            if(typeof this.form.warehouse_id == "object" && typeof  product_id == "object"){
                this.form.stock_opnames[index].system_stock = 0.00;

                this.onChangeStock(index);

                this.$axios.get("/inventory/stock_opname/get-stock/"+this.form.warehouse_id.id+"/"+product_id.id)
                .then(res => {
                    if(res.data){
                        this.form.stock_opnames[index].system_stock = res.data.quantity || 0.00;
                    }            

                    this.onChangeStock(index);
                })
            }        
        }
    }
}
</script>
