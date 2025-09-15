<template>
    <section class="section">
        <div class="section-body">
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        <div class="d-flex justify-content-between">                                
                            <h6>
                                Tambah Stok Mutasi
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
                                <div class="col-4">
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

                                <div class="col-sm-4"> 
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-4 align-self-center">
                                                <label for="warehouse_from_id">Dari Gudang</label>
                                            </div>
                                            <div class="col-sm-8 align-self-center">
                                            <v-select                           
                                                label="name"   
                                                :loading="isLoadingGetWarehouse"
                                                :options="lookup_warehouses.data"
                                                :filterable="false"
                                                @search="onGetWarehouse"
                                                @input="onSetWarehouseFrom"
                                                v-model="form.warehouse_from_id">              
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
                                                    :required="!form.warehouse_from_id"
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
                                      <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-4 align-self-center">
                                                <label for="warehouse_to_id">Ke Gudang</label>
                                            </div>
                                            <div class="col-sm-8 align-self-center">
                                            <v-select                           
                                                label="name"   
                                                :loading="isLoadingGetWarehouse"
                                                :options="lookup_warehouses.data"
                                                :filterable="false"
                                                @search="onGetWarehouse"
                                                @input="onSetWarehouseTo"
                                                v-model="form.warehouse_to_id">              
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
                                                    :required="!form.warehouse_to_id"
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
                            </div>
                        </div>
                       
                        <div class="clearfix mt-4">
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
                                            style="width:10%">Grade</td>     
                                    <td class="text-left table-transaction-header"
                                        style="width:10%">Stok {{ form.warehouse_from_id ? form.warehouse_from_id.name : '-' }}</td>  
                                    <td class="text-left table-transaction-header"
                                        style="width:10%">Stok {{ form.warehouse_to_id ? form.warehouse_to_id.name : '-' }}</td>  
                                    <td class="text-left table-transaction-header"
                                        style="width:10%">Jumlah Mutasi</td>          

                                    <td class="text-left table-transaction-header"
                                        style="width:10%">Keterangan</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:1%">Opsi</td>
                                </tr>
                                <tr v-for="item,index in form.stock_mutations"
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
                            <v-select
                              label="name"
                              :loading="isLoadingGetGrade"
                              :options="lookup_grade.data"
                              :filterable="false"
                              @search="onGetGrade"
                              v-model="item.grade_id"
                            >
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
                              <template #search="{ attributes, events }">
                                <input
                                  class="vs__search"
                                  :required="!item.grade_id"
                                  v-bind="attributes"
                                  v-on="events"
                                />
                              </template>
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="d-flex justify-content-between"
                                v-if="lookup_grade.data.length || search"
                              >
                                <span
                                  v-if="lookup_grade.current_page > 1"
                                  @click="onGetGrade(search, false)"
                                  class="flex-fill bg-primary text-white text-center"
                                  style="cursor: pointer"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="lookup_grade.last_page >
                                      lookup_grade.current_page
                                      "
                                  @click="onGetGrade(search, true)"
                                  class="flex-fill bg-primary text-white text-center"
                                  style="cursor: pointer"
                                  >Selanjutnya</span
                                >
                              </li>
                            </v-select>
                          </td>
                                    <td class="table-transaction-row">
                                        <money v-model="item.stock_from"
                                            class="form-control"                                                                       
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"                                    
                                            disabled
                                        />    
                                    </td>
                                    <td class="table-transaction-row">
                                        <money v-model="item.stock_to"
                                            class="form-control"                                                                       
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"                                    
                                            disabled
                                        />    
                                    </td>
                                    <td class="table-transaction-row">
                                        <money v-model="item.quantity"
                                            class="form-control"                                                                       
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"                                    
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

                                <tr v-if="!form.stock_mutations.length">
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
            title: 'Stok Mutasi',
        }
    },

    data(){         
        return {            
            isLoadingForm : false,

            isStopSearchWarehouse : false,
            isLoadingGetWarehouse : false,
            warehouse_search: '',

            isStopSearchGrade: false,
            isLoadingGetGrade: false,
            grade_search: "",

            isStopSearchProduct : false,
            isLoadingGetProduct : false,
            product_search : '',

            form : {
                warehouse_from_id : '',
                warehouse_to_id : '',
                date : moment().format("YYYY-MM-DD"),               
                stock_mutations : [],             
            },

            default_form : {              
                warehouse_from_id : '',
                warehouse_to_id : '',
                date : moment().format("YYYY-MM-DD"),               
                stock_mutations : [],      
            }
        }
    },
   
    async mounted(){
        await this.onSearchWarehouse();
        await this.onSearchGrade();
        await this.onSearchProduct();
    },

    computed :{
        ...mapState('moduleApi',[
            'lookup_warehouses',
            'lookup_products', 
            "lookup_grade",
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

        onGetGrade(search, isNext) {
            if (!search.length && typeof isNext === "function") return false;

            clearTimeout(this.isStopSearchGrade);

            this.isStopSearchGrade = setTimeout(() => {
                this.grade_search = search;

                if (typeof isNext !== "function") {
                    this.lookup_grade.current_page = isNext
                        ? this.lookup_grade.current_page + 1
                        : this.lookup_grade.current_page - 1;
                } else {
                    this.lookup_grade.current_page = 1;
                }

                this.onSearchGrade();
            }, 600);
        },

        async onSearchGrade() {
            if (!this.isLoadingGetGrade) {
                this.isLoadingGetGrade = true;

                await this.lookUp({
                    url: "inventory/pemakaian_barang/get-grade",
                    lookup: "grade",
                    query:
                        "?search=" + this.grade_search +
                        "&page=" + this.lookup_grade.current_page +
                        "&per_page=5",
                });

                this.isLoadingGetGrade = false;
            }
        },

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
      
            if(!this.form.stock_mutations.length){
                this.$toaster.error("Detail Stok Opname Masih Kosong");
                return;
            }

            this.isLoadingForm = true;

            let url = "inventory/stock_mutation";

            let formData = {
                ...this.form,            
                warehouse_from_id : typeof this.form.warehouse_from_id == 'object'
                    ? this.form.warehouse_from_id.id                 
                    : '',
                warehouse_to_id : typeof this.form.warehouse_to_id == 'object'
                    ? this.form.warehouse_to_id.id                 
                    : ''
            }

            formData.stock_mutations = formData
                .stock_mutations
                .map(item => {
                    return {
                        ...item,
                        product_id : typeof item.product_id == 'object'
                            ? item.product_id.id 
                            : '',
                        grade_id: typeof item.grade_id == 'object'
                            ? item.grade_id.id
                            : '',

                    }
                });    

            this.$axios({
                url : url,
                method : "post",
                data : formData
            })
            .then(res => {
                this.$toaster.success("Berhasil Tambah Stok Mutasi");
            
                this.form = {
                    ...this.default_form,
                    stock_mutations : []
                }     

                // this.onPrint(res.data.id);

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
                url : "inventory/stock_mutation",
                query : ""            
            });

            if(parseInt(this.limit_item_transaction) <= this.form.stock_mutations.length){
                this.$toaster.error("Hanya " + this.limit_item_transaction + " batas item yang di perbolehkan");
                return;
            }

            this.form.stock_mutations.push({
                code : this.code,
                product_id : '',
                quantity : 0.00,
                stock_from : 0.00,
                stock_to : 0.00,
                description : ''
            })
        },

        deleteDetail(indexItem){
            this.form.stock_mutations = this.form
                .stock_mutations
                .filter((_,index) => index != indexItem);
        },
      
        onSetProduct(index) {        
            let details = [
                ...this.form.stock_mutations
            ];

            let itemProduct = {
                ...this.form.stock_mutations[index]
            }            

            if(!itemProduct.product_id) {
                this.form.stock_mutations[index].product_id = '';
                return
            };                            

            let product = itemProduct.product_id;

            let products = details.filter(item => (item.product_id ? item.product_id.id : 0) === product.id);
    
            if(products.length > 1){
                this.$toaster.error("Product sudah ada di dalam list");
                    
                this.form.stock_mutations = details.filter((_,indexItem) => index != indexItem);            
            }else{
                this.onGetSystemStock(index);
            }
        },

        onSetWarehouseFrom(item){
            if(item){
                if(typeof this.form.warehouse_to_id == 'object'){
                    if(this.form.warehouse_to_id.id == item.id){
                       this.$toaster.error("Gudang tidak boleh sama"); 
                       this.form.warehouse_to_id = '';
                    }
                }
            
                this.form.stock_mutations.forEach((_,index) => {
                    this.onGetSystemStock(index);
                })
            }else{
                this.form.warehouse_from_id = '';
            }
        },

        onSetWarehouseTo(item){
            if(item){
                if(typeof this.form.warehouse_from_id == 'object'){
                    if(this.form.warehouse_from_id.id == item.id){
                       this.$toaster.error("Gudang tidak boleh sama"); 
                       this.form.warehouse_from_id = '';
                    }
                }

                this.form.stock_mutations.forEach((_,index) => {
                    this.onGetSystemStock(index);
                })
            }else{
                this.form.warehouse_to_id = '';
            }
        },

        onGetSystemStock(index){
            let product_id = this.form.stock_mutations[index].product_id;

            if(typeof this.form.warehouse_from_id == "object" && typeof product_id == "object"){
                this.form.stock_mutations[index].stock_from = 0.00;

                this.$axios.get("/inventory/stock_mutation/get-stock/"+this.form.warehouse_from_id.id+"/"+product_id.id)
                .then(res => {
                    if(res.data){
                        this.form.stock_mutations[index].stock_from = res.data.quantity || 0.00;
                    }            
                })
            }        

            if(typeof this.form.warehouse_to_id == "object" && typeof  product_id == "object"){
                this.form.stock_mutations[index].stock_to = 0.00;

                this.$axios.get("/inventory/stock_mutation/get-stock/"+this.form.warehouse_to_id.id+"/"+product_id.id)
                .then(res => {
                    if(res.data){
                        this.form.stock_mutations[index].stock_to = res.data.quantity || 0.00;
                    }            
                })
            }        
        },   
     onRowSelected(index){
      this.ActiveRow = index;
    }
    }
}
</script>
