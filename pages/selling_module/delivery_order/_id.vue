<template>
    <section class="section">
        <div class="section-body" 
            v-if="!isLoadingPage">                
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        <div class="d-flex justify-content-between">                                
                            <h6>
                            {{ isEditable 
                                ? 'Edit' 
                                : 'Tambah' 
                            }} Pengiriman Pesanan
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
                                <div class="col-sm-3"> 
                                    <ValidationProvider
                                        name="code"
                                        rules="required">          
                                        <div class="form-group" slot-scope="{errors,valid}">
                                            <div class="row">
                                                <div class="col-sm-4 align-self-center mr-0">
                                                    <label for="code">Kode </label>
                                                </div>
                                                <div class="col-sm-8 align-self-center ml-0 pl-0">
                                                    <input type="text" 
                                                        class="form-control"
                                                        name="code"
                                                        v-model="form.code"                                    
                                                        :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                                                        disabled/>

                                                    <div class="invalid-feedback" v-if="errors[0]">
                                                        {{ errors[0] }}
                                                    </div>                  
                                                </div>
                                            </div> 
                                        </div>
                                    </ValidationProvider>
                                </div>

                                <div class="col-sm-3">    
                                    <ValidationProvider
                                        name="date"
                                        rules="required">          
                                        <div class="form-group" slot-scope="{errors,valid}">
                                            <div class="row">
                                                <div class="col-sm-2 align-self-center mr-0">
                                                        <label for="date">Tgl</label>
                                                </div>
                                                <div class="col-sm-10 align-self-center ml-0 pl-0">
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

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-2 align-self-center mr-0">
                                                <label for="reseller_id">
                                                    {{ 
                                                        form.is_dropship
                                                            ? "Reseller" 
                                                            : "Pelanggan" 
                                                    }}                                                        
                                                </label>
                                            </div>
                                            <div class="col-sm-10 align-self-center ml-0 pl-0">
                                                <input type="text"  
                                                    class="form-control"
                                                    :value="form.reseller_id ? form.reseller_id.name : '-'"
                                                    disabled
                                                />
                                            </div>                                            
                                        </div>                                                              
                                    </div>
                                </div>                                   
                            </div>
                        </div>
        
                        <div class="container">
                            <div class="d-flex flex-row">
                                <div class="col-sm-6"> 
                                    <div class="row">
                                        <div class="col-sm-2 align-self-center mr-0">
                                            <label for="po_customer_id">Penjualaan</label>
                                        </div>
                                        <div class="col-sm-10 align-self-center ml-0 pl-0">
                                            <v-select                           
                                                label="code"   
                                                :loading="isLoadingGetSelling"
                                                :options="lookup_sellings.data"
                                                :filterable="false"
                                                @search="onGetSelling"
                                                @input="onSetSelling"
                                                v-model="form.selling_id"
                                                :disabled="isEditable">              
                                                <template v-slot:option="option">                    
                                                        <div class="row">
                                                        <div class="col-md-5 p-1 m-0">
                                                        {{ option.code }}
                                                        </div>
                                                        <div class="col-md-7 p-1 m-0 text-right">
                                                            {{ option.customer ? option.customer.name : '-' }}
                                                        </div>
                                                    </div>
                                                </template> 
                                                <template #search="{attributes, events}">
                                                    <input
                                                    class="vs__search"
                                                    :required="!form.selling_id"
                                                    v-bind="attributes"
                                                    v-on="events"
                                                    />
                                                </template>   
                                                <li slot-scope="{search}" slot="list-footer"
                                                    class="d-flex justify-content-between"
                                                    v-if="lookup_sellings.data.length || search">
                                                    <span v-if="lookup_sellings.current_page > 1" 
                                                        @click="onGetSelling(search,false)"
                                                        class="flex-fill bg-primary text-white text-center"
                                                        style="cursor:pointer">Sebelumnya</span>
                                                    <span v-if="lookup_sellings.last_page > lookup_sellings.current_page" 
                                                        @click="onGetSelling(search,true)"
                                                        class="flex-fill bg-primary text-white text-center"
                                                        style="cursor:pointer">Selanjutnya</span>
                                                </li> 
                                            </v-select>   
                                        </div>
                                    </div>                                                             
                                </div>                                                    

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-2 align-self-center">
                                                <label for="is_dropship">Dropship</label>
                                            </div>
                                            <div class="col-sm-10 align-self-center">
                                                <select class="form-control"
                                                    v-model="form.is_dropship"
                                                    :disabled="is_disabled_dropship"
                                                    @change="onChangeDropship">
                                                    <option value="0">Tidak</option>
                                                    <option value="1">Ya</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group"
                                        v-if="form.is_dropship">
                                        <div class="row">
                                            <div class="col-sm-2 align-self-center mr-0">
                                                <label for="customer_id">Pelanggan</label>
                                            </div>
                                            <div class="col-sm-10 align-self-center ml-0 pl-2">
                                                <v-select                           
                                                    label="name"   
                                                    :loading="isLoadingGetCustomer"
                                                    :options="lookup_customers.data"
                                                    :filterable="false"
                                                    @search="onGetCustomer"
                                                    v-model="form.customer_id">              
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
                                                        :required="!form.customer_id"
                                                        v-bind="attributes"
                                                        v-on="events"
                                                        />
                                                    </template>   
                                                    <li slot-scope="{search}" slot="list-footer"
                                                        class="d-flex justify-content-between"
                                                        v-if="lookup_customers.data.length || search">
                                                        <span v-if="lookup_customers.current_page > 1" 
                                                            @click="onGetCustomer(search,false)"
                                                            class="flex-fill bg-primary text-white text-center"
                                                            style="cursor:pointer">Sebelumnya</span>
                                                        <span v-if="lookup_customers.last_page > lookup_customers.current_page" 
                                                            @click="onGetCustomer(search,true)"
                                                            class="flex-fill bg-primary text-white text-center"
                                                            style="cursor:pointer">Selanjutnya</span>
                                                    </li> 
                                                </v-select>  
                                            </div>
                                        </div>                                                              
                                    </div>

                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-2 align-self-center mr-0">
                                                <label for="address">Alamat</label>
                                            </div>
                                            <div class="col-sm-10 align-self-center ml-0 pl-2">
                                                <div  v-if="form.is_dropship">
                                                    <textarea                                             
                                                        class="form-control"
                                                        disabled>{{ form.customer_id ? form.customer_id.address : '-' }}</textarea>
                                                </div>
                                                <div v-else>
                                                    <textarea
                                                        class="form-control"
                                                        disabled>{{ form.reseller_id ? form.reseller_id.address : '-' }}</textarea>                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                    

                                    <div class="form-group">
                                      <div class="row">
                                            <div class="col-sm-2 align-self-center mr-0">
                                                <label for="address">Telp</label>
                                            </div>
                                            <div class="col-sm-10 align-self-center ml-0 pl-2">
                                                <div  v-if="form.is_dropship">
                                                    <input                                             
                                                        class="form-control"
                                                        :value="form.customer_id ? form.customer_id.phone : '-'"
                                                        disabled/>
                                                </div>
                                                <div v-else>
                                                     <input                                             
                                                        class="form-control"
                                                        :value="form.reseller_id ? form.reseller_id.phone : '-'"
                                                        disabled/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="clearfix mt-4">
                            <div class="row">
                      <div class="col-md-7">

                      </div>
                      <div class="col-md-4 float-right">
                        <div class="row">
                          <div class="col-md-5">
                            Import
                          </div>
                          <div class="col-md-7">
                                <v-select
                                label="code"
                                :loading="isLoadingGetPacking"
                                :options="lookup_custom2.data"
                                :filterable="false"
                                @search="onGetPacking"
                                @input="addPackingList"
                                v-model="form.packing_list_id"
                              >
                                <template v-slot:option="option">
                          
                                      {{ option.code }}
                            
                                </template>
                                <template #search="{ attributes, events }">
                                  <input
                                    class="vs__search"
                                    :required="!form.packing_list_id"
                                    v-bind="attributes"
                                    v-on="events"
                                  />
                                </template>
                                <li
                                  slot-scope="{ search }"
                                  slot="list-footer"
                                  class="d-flex justify-content-between"
                                  v-if="lookup_custom2.data.length || search"
                                >
                                  <a
                                    v-if="lookup_custom2.current_page > 1"
                                    @click="onGetPacking(search, false)"
                                    class="flex-fill bg-primary text-white text-center"
                                    href="#"
                                    >Sebelumnya</a
                                  >
                                  <a
                                    v-if="lookup_custom2.last_page >
                                        lookup_custom2.current_page
                                        "
                                    @click="onGetPacking(search, true)"
                                    class="flex-fill bg-primary text-white text-center"
                                    href="#"
                                    >Selanjutnya</a
                                  >
                                </li>
                              </v-select>
                          </div>
                     
                        </div>

                      </div>
                    <div class="col-md-1">
                            <span class="btn btn-primary float-right"
                                @click="addDetail"
                                style="cursor:pointer">
                                <i class="fas fa-plus"></i>
                                Tambah
                            </span>
                        </div>
                            </div>
                            </div>

                        <div class="table-responsive table-striped">                        
                            <table class="table table-sm mt-3">
                                <tr>
                                    <td class="text-left table-transaction-header"
                                        style="width:8%">Kode</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:20%">Product</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:5%">Unit</td>                                        
                                    <td class="text-left table-transaction-header"
                                        style="width:5%">Qty</td>                                        
                                    <td class="text-left table-transaction-header"
                                        style="width:8%">Keterangan</td>                                  
                                    <td class="text-left table-transaction-header"
                                        style="width:1%">Opsi</td>
                                </tr>
                                <tr v-for="item,index in form.delivery_order_details"
                                    :key="index">
                                    <td class="table-transaction-row">
                                        <input type="text" 
                                            class="form-control"
                                            :value="item.product_id ? item.product_id.code : '-'"
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
                                         <input type="text" 
                                            class="form-control"
                                            :value="item.product_id ? item.product_id.selling_unit : '-'"
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
                                        <textarea
                                            class="form-control"
                                            v-model="item.description"/></textarea>                               
                                    </td>                                  
                                    <td class="text-center table-transaction-row">
                                        <i class="fas fa-trash"
                                            style="cursor:pointer"
                                            @click="deleteDetail(index)"></i>
                                    </td>                                    
                                </tr>

                                <tr v-if="!form.delivery_order_details.length">
                                    <td colspan="7"
                                        class="text-center pt-4 pb-4">
                                        Data tidak ditemukan
                                    </td>
                                </tr>                  

                                <tr>
                                    <td colspan="3" class="text-left border-top table-success">                        
                                        <input
                                            class="form-control form-control-sm"
                                            v-model="form.description"
                                            aria-placeholder="Keterangan"
                                            placeholder="Keterangan ...."
                                        />                        
                                    </td>             
                                    <td>
                                        <input type="text"
                                            class="form-control"
                                            :value="form.delivery_order_details.reduce((prev,next) => prev + next.quantity,0)"
                                            disabled/>
                                    </td>                      
                                </tr>                                  
                            </table>       

                            <div class="mt-5 mb-5" style="height: 100px"></div>                     
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
        <div class="section-body" 
            v-else>
            <div class="row">
                <div class="col-12">
                    <div class="card"
                        style="min-height:300px">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center">                        
                            <div>Loading</div>
                            <div><i class="fas fa-circle-notch fa-spin"></i> </div>
                        </div>
                    </div>
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
            title: 'Pengiriman Pesanan',
        }
    },

    data(){     
        let id = parseInt(this.$route.params.id);               

        return {
            id,
            
            isEditable : Number.isInteger(id)
                ? true
                : false,

            isLoadingPage : Number.isInteger(id) 
                ? true 
                : false,

            isLoadingForm : false,

            isStopSearchSelling : false,
            isLoadingGetSelling : false,
            selling_search : '',

            isStopSearchCustomer : false,
            isLoadingGetCustomer : false,
            customer_search : '',         
            
            isStopSearchProduct : false,
            isLoadingGetProduct : false,
            product_search: '',

            isStopSearchPacking: false,
            isLoadingGetPacking: false,
            packing_search: "",

            form : {
                selling_id : '',
                customer_id : '',
                reseller_id : '',                
                code : '',
                description : '',
                is_dropship : 0,
                date : moment().format("YYYY-MM-DD"),        
                delivery_order_details : [],            
            },

            default_form : {              
                selling_id : '',
                customer_id : '',
                reseller_id : '',                
                code : '',
                description : '',
                is_dropship : 0,
                date : moment().format("YYYY-MM-DD"),        
                delivery_order_details : [],            
            },

            is_disabled_dropship : false
        }
    },

    async created(){
        try{        
            if(this.isEditable){
                let response = await this.$axios.get("selling_module/delivery_order/"+this.id);

                Object.keys(this.form)
                    .forEach(item => {
                        if(item != "deliver_order_details"){
                            if(item === 'selling_id'){
                                this.form.selling_id = response.data.selling || '';
                            }else if (item === 'customer_id') {                                
                                if(response.data["is_dropship"]){
                                    this.form.customer_id = response.data.customer || '';
                                }else{
                                    this.form.reseller_id = response.data.customer || '';
                                }
                            }else if ( item === 'reseller_id'){
                                if(response.data["is_dropship"]){
                                    this.form.reseller_id = response.data.reseller || '';
                                }
                            }else if ( item === 'is_dropship') {
                                if(!response.data['is_dropship']){                            
                                    this.is_disabled_dropship = response.data.customer.type === "RESELLER"  
                                        ? false 
                                        : true;
                                }
                                    
                                this.form[item] = response.data[item];
                            }else{
                                this.form[item] = response.data[item];
                            }
                        }
                    });
            
                this.form.delivery_order_details = response.data
                    .delivery_order_details
                    .map(item => {
                        return {
                            ...item,
                            product_id : item.product
                        }
                    });

                this.isLoadingPage = false;        
            }
        }catch(err){
            this.$router.push("/selling_module/delivery_order");
        }
    },

    async mounted(){
        await this.onSearchSelling();
        await this.onSearchPacking();
        await this.onSearchProduct();

        if(!this.isEditable){
            this.setCode();
        }
    },

    computed :{
        ...mapState('moduleApi',[
            'lookup_sellings',
            'lookup_customers',
            'lookup_products',    
            'lookup_custom2',
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

        onGetPacking(search, isNext) {
            if (!search.length && typeof isNext === "function") return false;

            clearTimeout(this.isStopSearchPacking);

            this.isStopSearchPacking = setTimeout(() => {
                this.packing_search = search;

                if (typeof isNext !== "function") {
                    this.lookup_packing.current_page = isNext
                        ? this.lookup_packing.current_page + 1
                        : this.lookup_packing.current_page - 1;
                } else {
                    this.lookup_packing.current_page = 1;
                }

                this.onSearchPacking();
            }, 600);
        },

        async onSearchPacking() {
            if (!this.isLoadingGetPacking) {
                this.isLoadingGetPacking = true;

                await this.lookUp({
                    url: "manufactur/packinglist/get-packing-list",
                    lookup: "custom2",
                    query:
                        "?search=" + this.packing_search +
                        "&page=" + this.lookup_custom2.current_page +
                        "&per_page=5&position=WAREHOUSE",
                });

                this.isLoadingGetPacking = false;
            }
        },

        onGetSelling(search,isNext){      
            if(!search.length && typeof isNext === "function") return false;             

            clearTimeout(this.isStopSearchSelling);
            
            this.isStopSearchSelling = setTimeout(() => {
                this.selling_search = search;

                if(typeof isNext !== "function"){
                    this.lookup_sellings.current_page = isNext 
                        ? this.lookup_sellings.current_page + 1 
                        : this.lookup_sellings.current_page - 1;        
                }else{
                    this.lookup_sellings.current_page = 1;
                }

                this.onSearchSelling();
            },600);        
        },

        async onSearchSelling(){
            if(!this.isLoadingGetSelling){
                this.isLoadingGetSelling = true;
                        
                await this.lookUp({    
                    url : "selling_module/delivery_order/get-selling",
                    lookup : "sellings",
                    query : "?search="
                        + this.selling_search + 
                        "&page="
                        + this.lookup_sellings.current_page + 
                        "&per_page=10"
                })

                this.isLoadingGetSelling = false;      
            }
        },

        onGetCustomer(search,isNext){      
            if(!search.length && typeof isNext === "function") return false;             

            clearTimeout(this.isStopSearchCustomer);
            
            this.isStopSearchCustomer = setTimeout(() => {
                this.customer_search = search;

                if(typeof isNext !== "function"){
                    this.lookup_customers.current_page = isNext 
                        ? this.lookup_customers.current_page + 1 
                        : this.lookup_customers.current_page - 1;        
                }else{
                    this.lookup_customers.current_page = 1;
                }

                this.onSearchCustomer();
            },600);        
        },

        async onSearchCustomer(){
            if(!this.isLoadingGetCustomer){
                this.isLoadingGetCustomer = true;
                        
                await this.lookUp({    
                    url : "selling_module/delivery_order/get-customer",
                    lookup : "customers",
                    query : "?search=" + this.customer_search + 
                        "&page=" + this.lookup_customers.current_page +                         
                        "&per_page=10" +
                        "&type=USER" + 
                        "&reseller_id=" + (this.form.reseller_id ? this.form.reseller_id.id : 0)
                })

                this.isLoadingGetCustomer = false;      
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
                    url : "selling_module/selling/get-product",
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
      
            if(!this.form.delivery_order_details.length){
                this.$toaster.error("Detail Pengiriman Pesanan Masih Kosong");
                return;
            }

            this.isLoadingForm = true;

            let url = "selling_module/delivery_order";

            let formData = {
                ...this.form,
                selling_id : typeof this.form.selling_id == 'object'
                    ? this.form.selling_id.id 
                    : '',
                customer_id : typeof this.form.reseller_id == 'object'
                    ? this.form.reseller_id.id 
                    : '',
                reseller_id : ''
            }

            if(this.form.is_dropship){
                formData = {
                    ...this.form,
                    selling_id : typeof this.form.selling_id == 'object'
                        ? this.form.selling_id.id 
                        : '',
                    customer_id : typeof this.form.customer_id == 'object'
                        ? this.form.customer_id.id 
                        : '',
                    reseller_id : typeof this.form.reseller_id == 'object'
                        ? this.form.reseller_id.id 
                        : '',
                }
            }

            formData.delivery_order_details = formData
                .delivery_order_details
                .map(item => {
                    return {
                        description : item.description,
                        quantity : item.quantity,
                        product_id : typeof item.product_id == 'object'
                            ? item.product_id.id 
                            : ''
                    }
                });
            
            if(this.isEditable){
                url += "/"+this.id;        
            }

            this.$axios({
                url : url,
                method : this.isEditable ? "put" : "post",
                data : formData
            })
            .then(res => {
                this.$toaster.success(
                    "Berhasil " 
                    + (this.isEditable ? "Update" : "Tambah") + 
                    " Pengiriman Pesanan"
                );

                if(!this.isEditable){
                    this.form = {
                        ...this.default_form,
                        delivery_order_details : []
                    }

                    this.setCode();

                    this.onPrint(res.data.id);
                }
            })
            .catch(err => {
                this.$globalErrorToaster(this.$toaster,err);
            })
            .finally(() => {
                this.isLoadingForm = false;
            })            
        },        

        onPrint(id){
            this.$confirm({
                message: "Apakah anda ingin menampilkan halaman print",
                button: {
                    no: 'No',
                    yes: 'Yes'
                },
                callback: async confirm => {         
                    if(confirm){
                        var token = this.$cookiz
                            .get(('auth._token.local'))
                            .replace('Bearer ','');      

                        window.open(
                            process.env.API_URL + "/selling_module/delivery_order/get-print-detail/" + id + "?token=" + token
                            ,'_blank'
                        );    
                    } 
                }
            });
        },

        async setCode(){
            await this.getCode({
                url : "selling_module/delivery_order",
                query : ""            
            });

            this.form.code = this.code;
        },

        async addPackingList() {
            if (this.form.packing_list_id) {
                let dataneiki = this.form.packing_list_id;

                if (typeof dataneiki == "object") {
                    this.form.delivery_order_details.push({
                        product_id: dataneiki.product,
                        grade_id: dataneiki.parent_grade,
                        unit: dataneiki.product.selling_unit,
                        quantity: dataneiki.detail_packing_list_sum_length,
                    });
                }
                this.form.cobanen = dataneiki;
            }
        },

        addDetail(){
            if(parseInt(this.limit_item_transaction) <= this.form.delivery_order_details.length){
                this.$toaster.error("Hanya " + this.limit_item_transaction + " batas item yang di perbolehkan");
                return;
            }

            this.form.delivery_order_details.push({
                product_id : '',
                quantity : 0.00,
                description : ''
            })
        },

        deleteDetail(indexItem){
            this.form.delivery_order_details = this.form
                .delivery_order_details
                .filter((_,index) => index != indexItem);
        },

        onSetProduct(index){            
            let details = [
                ...this.form.delivery_order_details
            ];

            let itemProduct = {
                ...this.form.delivery_order_details[index],            
            };
           
            if(!itemProduct.product_id) {
                this.form.delivery_order_details[index].product_id = '';
                return
            };

            let product = itemProduct.product_id;

            let products = details.filter(item => (item.product_id ? item.product_id.id : 0) === product.id);

            if(products.length > 1){                
                this.$toaster.error("Product sudah ada di dalam list");
                        
                this.form.delivery_order_details = details.filter((_,indexItem) => index != indexItem);            
            }
        },    

        onSetSelling(item){
            if(item){          
                this.form.reseller_id = item.customer;
                this.form.is_dropship = 0;   
                this.form.customer_id = '';
                this.is_disabled_dropship = true;                    

                // this.form.delivery_order_details = item.selling_details 
                //     .map(item => {
                //         return {
                //             product_id :  item.product,
                //             quantity : item.quantity,
                //             description : ""
                //         }
                //     })

                if(this.form.reseller_id.type != "USER"){                        
                    this.is_disabled_dropship = false;                
                    this.onSearchCustomer();
                }                    
            }else{
                this.form.selling_id = '';
            }
        },

        onChangeDropship(){
            this.form.is_dropship = parseInt(this.form.is_dropship);
            
            if(this.form.is_dropship){
                this.onSearchCustomer();
            }
        }
    }
}
</script>
