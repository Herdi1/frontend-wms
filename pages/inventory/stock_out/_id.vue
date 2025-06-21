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
                            }} Stok Keluar
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
                                                <div class="col-sm-4 align-self-center">
                                                    <label for="code">Kode </label>
                                                </div>
                                                <div class="col-sm-8 align-self-center">

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
                                <div class="col-sm-6"> 
                                        <div class="form-group">
                                             <div class="row">
                                                    <div class="col-sm-4 align-self-center mr-0 pr-0">
                                                        <label for="purchaseing_return_id">Jenis Transaksi</label>
                                                    </div>
                                                    <div class="col-sm-8 align-self-center ml-0 pl-0">
                                                        <select
                                                            class="form-control"
                                                            v-model="form.transaction_type_id"
                                                            @change="setCode()"
                                                            required
                                                            >
                                                            <option value="">Pilih</option>
                                                            <option
                                                                v-for="item in lookup_custom1.data"
                                                                :key="item.id"
                                                                :value="item.id"
                                                            >
                                                                {{ item.name }}
                                                            </option>
                                                        </select>
                                                    </div>
                                             </div>                                                             
                                        </div>
                                    </div>
                                <!-- <div class="col-sm-6"> 
                                    <div class="form-group">
                                         <div class="row">
                                                <div class="col-sm-4 align-self-center mr-0 pr-0">
                                                    <label for="purchaseing_return_id">Return Pembelian</label>
                                                </div>
                                                <div class="col-sm-8 align-self-center ml-0 pl-0">
                                                    <v-select                           
                                                        label="code"   
                                                        :loading="isLoadingGetPurchaseingReturn"
                                                        :options="lookup_purchaseing_returns.data"
                                                        :filterable="false"
                                                        @search="onGetPurchaseingReturn"
                                                        @input="onSetPurchaseingReturn"
                                                        v-model="form.purchaseing_return_id"
                                                        :disabled="isEditable">              
                                                        <template v-slot:option="option">                    
                                                             <div class="row">
                                                                <div class="col-md-5 p-1 m-0">
                                                                {{ option.code }}
                                                                </div>
                                                                <div class="col-md-7 p-1 m-0 text-right">
                                                                    {{ option.supplier ? option.supplier.name : '-' }}
                                                                </div>
                                                            </div>
                                                        </template> 
                                                        <template #search="{attributes, events}">
                                                            <input
                                                            class="vs__search"
                                                            :required="!form.purchaseing_return_id"
                                                            v-bind="attributes"
                                                            v-on="events"
                                                            />
                                                        </template>   
                                                        <li slot-scope="{search}" slot="list-footer"
                                                            class="d-flex justify-content-between"
                                                            v-if="lookup_purchaseing_returns.data.length || search">
                                                            <span v-if="lookup_purchaseing_returns.current_page > 1" 
                                                                @click="onGetPurchaseingReturn(search,false)"
                                                                class="flex-fill bg-primary text-white text-center"
                                                                style="cursor:pointer">Sebelumnya</span>
                                                            <span v-if="lookup_purchaseing_returns.last_page > lookup_purchaseing_returns.current_page" 
                                                                @click="onGetPurchaseingReturn(search,true)"
                                                                class="flex-fill bg-primary text-white text-center"
                                                                style="cursor:pointer">Selanjutnya</span>
                                                        </li> 
                                                    </v-select>   
                                                </div>
                                         </div>                                                             
                                    </div>
                                </div> -->
                            </div>
                          </div>
        
                        <div class="container">
                            <div class="d-flex flex-row">                                
                                <div class="col-sm-6"> 
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
                                                    v-model="form.warehouse_id"
                                                    :disabled="isEditable">                           
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
                            </div>
                        </div>

                        <div class="container">
                            <div class="d-flex flex-row">
                                <div class="col-md-6">
                                <div class="form-group">
                                    <div class="row">
                                    <div class="col-sm-2 align-self-center mr-0">
                                        <label for="chart_of_account_id">
                                        Kas
                                        </label>
                                    </div>
                                    <div class="col-sm-10 align-self-center ml-0 pl-0">
                                        <v-select
                                        label="name"
                                        :loading="isLoadingGetChartOfAccount"
                                        :options="lookup_chart_of_accounts.data"
                                        :filterable="false"
                                        @search="onGetChartOfAccount"
                                        @input="onSetChartOfAccount"
                                        v-model="form.chart_of_account_id"
                                        :disabled="isDisabledKas() || isEditable"
                                        >
                                        <template v-slot:option="option">
                                            <div class="row">
                                            <div class="col-md-5 p-1 m-0">
                                                {{ option.code }}
                                            </div>
                                            <div class="col-md-7 p-1 m-0 text-right">
                                                {{ option.name }}
                                            </div>
                                            </div>
                                        </template>
                                        <template #search="{ attributes, events }">
                                            <input
                                            class="vs__search"
                                            :required="!form.chart_of_account_id"
                                            v-bind="attributes"
                                            v-on="events"
                                            />
                                        </template>
                                        <li
                                            slot-scope="{ search }"
                                            slot="list-footer"
                                            class="d-flex justify-content-between"
                                            v-if="lookup_chart_of_accounts.data.length || search"
                                        >
                                            <span
                                            v-if="lookup_chart_of_accounts.current_page > 1"
                                            @click="onGetChartOfAccount(search, false)"
                                            class="
                                                flex-fill
                                                bg-primary
                                                text-white text-center
                                            "
                                            style="cursor: pointer"
                                            >Sebelumnya</span
                                            >
                                            <span
                                            v-if="
                                                lookup_chart_of_accounts.last_page >
                                                lookup_chart_of_accounts.current_page
                                            "
                                            @click="onGetChartOfAccount(search, true)"
                                            class="
                                                flex-fill
                                                bg-primary
                                                text-white text-center
                                            "
                                            style="cursor: pointer"
                                            >Selanjutnya</span
                                            >
                                        </li>
                                        </v-select>
                                        <div class="text-info">*Jika tidak diisi maka akan mengambil default</div>
                                    </div>
                                    </div>
                                </div>
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
                                        style="width:8%">Kode</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:20%">Product</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:5%">Grade</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:5%">Unit</td>                                        
                                    <td class="text-left table-transaction-header"
                                        style="width:5%">Qty</td>                                        
                                    <td class="text-left table-transaction-header"
                                        style="width:8%">Keterangan</td>                                                                     
                                    <td class="text-left table-transaction-header"
                                        style="width:1%">Opsi</td>
                                </tr>
                                <tr v-for="item,index in form.stock_out_details"
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
                                         <input type="text" 
                                            class="form-control"
                                            :value="item.product_id ? item.product_id.purchase_unit : '-'"
                                            disabled
                                        /> 
                                    </td>
                                    <td class="table-transaction-row">
                                        <money v-model="item.quantity"
                                            class="form-control"                                                                       
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                        />                                           
                                    </td>
                                    <td class="text-center table-transaction-row">
                                        <textarea v-model="item.description"
                                            class="form-control"></textarea>
                                    </td>
                                    <td class="text-center table-transaction-row">
                                        <i class="fas fa-trash"
                                            style="cursor:pointer"
                                            @click="deleteDetail(index)"></i>
                                    </td>                                    
                                </tr>

                                <tr v-if="!form.stock_out_details.length">
                                    <td colspan="7"
                                        class="text-center pt-4 pb-4">
                                        Data tidak ditemukan
                                    </td>
                                </tr>                  

                                <tr>
                                    <td colspan="4" class="text-left border-top table-success">                        
                                        <input
                                            class="form-control form-control-sm"
                                            v-model="form.description"
                                            aria-placeholder="Keterangan"
                                            placeholder="Keterangan ...."
                                        />                        
                                    </td>
                                    <td colspan="4"></td>                               
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
            title: 'Stok Keluar',
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

            isStopSearchPurchaseingReturn : false,
            isLoadingGetPurchaseingReturn : false,
            purchaseing_return_search : '',

            isStopSearchWarehouse : false,
            isLoadingGetWarehouse : false,
            warehouse_search : '',

            isStopSearchProduct : false,
            isLoadingGetProduct : false,
            product_search : '',

            isStopSearchChartOfAccount : false,
            isLoadingGetChartOfAccount : false,
            chart_of_account_search: "",

            isStopSearchGrade: false,
            isLoadingGetGrade: false,
            grade_search: "",

            form : {
                purchaseing_return_id : '',
                warehouse_id : '',
                chart_of_account_id : "",
                code : '',
                description : '',
                date : moment().format("YYYY-MM-DD"),
                stock_out_details: [],
                transaction_type_id: '',

            },

            default_form : {              
                purchaseing_return_id : '',
                warehouse_id : '',
                chart_of_account_id : "",
                code : '',
                description : '',
                date : moment().format("YYYY-MM-DD"),
                stock_out_details: [],
                transaction_type_id: '',

            }
        }
    },

    async created(){
        try{        
            if(this.isEditable){
                let response = await this.$axios.get("inventory/stock_out/"+this.id);

                Object.keys(this.form)
                    .forEach(item => {
                        if(item != "stock_out_details"){
                            if(item === 'purchaseing_return_id'){
                                this.form.purchaseing_return_id = response.data.purchaseing_return || '';
                            }else if(item === "chart_of_account_id"){
                                this.form.chart_of_account_id = response.data.chart_of_account || "";
                            }else if ( item === 'warehouse_id'){
                                this.form.warehouse_id = response.data.warehouse || '';
                            }else{
                                this.form[item] = response.data[item];
                            }
                        }
                    });
            
                this.form.stock_out_details = response.data
                    .stock_out_details
                    .map(item => {
                        return {
                            ...item,
                            product_id: item.product,
                            grade_id: item.grade
                        }
                    });

                this.isLoadingPage = false;        
            }
        }catch(err){
            this.$router.push("/inventory/stock_out");
        }
    },

    async mounted(){
        // await this.onSearchPurchaseingReturn();
        await this.onSearchGrade();
        await this.onSearchWarehouse();

        await this.onSearchProduct();

        await this.onSearchChartOfAccount();

        if(!this.isEditable){
            this.setCode();
        };
        await this.lookUp({
            url: "master/transaction_type/get-transaction_type",
            lookup: "custom1",
            query: "?order=id&sort=asc&type=OTO",
        });
    },

    computed :{
        ...mapState('moduleApi',[
            'lookup_purchaseing_returns',
            'lookup_warehouses',
            'lookup_products',    
            "lookup_chart_of_accounts",
            "lookup_custom1",
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

        onGetPurchaseingReturn(search,isNext){      
            if(!search.length && typeof isNext === "function") return false;             

            clearTimeout(this.isStopSearchPurchaseingReturn);
            
            this.isStopSearchPurchaseingReturn = setTimeout(() => {
                this.purchaseing_return_search = search;

                if(typeof isNext !== "function"){
                    this.lookup_purchaseing_returns.current_page = isNext 
                        ? this.lookup_purchaseing_returns.current_page + 1 
                        : this.lookup_purchaseing_returns.current_page - 1;        
                }else{
                    this.lookup_purchaseing_returns.current_page = 1;
                }

                this.onSearchPurchaseingReturn();
            },600);        
        },

        async onSearchPurchaseingReturn(){
            if(!this.isLoadingGetPurchaseingReturn){
                this.isLoadingGetPurchaseingReturn = true;
                        
                await this.lookUp({    
                    url : "inventory/stock_out/get-purchaseing-return",
                    lookup : "purchaseing_returns",
                    query : "?search="
                        + this.purchaseing_return_search + 
                        "&page="
                        + this.lookup_purchaseing_returns.current_page + 
                        "&per_page=10"
                })

                this.isLoadingGetPurchaseingReturn = false;      
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
                    url : "inventory/stock_out/get-warehouse",
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
                    url : "inventory/stock_out/get-product",
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
        

        onGetChartOfAccount(search, isNext) {
            if (!search.length && typeof isNext === "function") return false;

            clearTimeout(this.isStopSearchChartOfAccount);

            this.isStopSearchChartOfAccount = setTimeout(() => {
                this.chart_of_account_search = search;

                if (typeof isNext !== "function") {
                this.lookup_chart_of_accounts.current_page = isNext
                    ? this.lookup_chart_of_accounts.current_page + 1
                    : this.lookup_chart_of_accounts.current_page - 1;
                } else {
                this.lookup_chart_of_accounts.current_page = 1;
                }

                this.onSearchChartOfAccount();
            }, 600);
        },

        async onSearchChartOfAccount() {
            if (!this.isLoadingGetChartOfAccount) {
                this.isLoadingGetChartOfAccount = true;

                await this.lookUp({
                url: "inventory/stock_out/get-chart-of-account",
                lookup: "chart_of_accounts",
                query:
                    "?search=" +
                    this.chart_of_account_search +
                    "&page=" +
                    this.lookup_chart_of_accounts.current_page +
                    "&per_page=10" 
                });

                this.isLoadingGetChartOfAccount = false;
            }
        },

        onSubmit(isInvalid){
            if(isInvalid || this.isLoadingForm) return;            
      
            if(!this.form.stock_out_details.length){
                this.$toaster.error("Detail Stok Keluar Masih Kosong");
                return;
            }

            this.isLoadingForm = true;

            let url = "inventory/stock_out";

            let formData = {
                ...this.form,
                purchaseing_return_id : typeof this.form.purchaseing_return_id == 'object'
                    ? this.form.purchaseing_return_id.id 
                    : '',              
                warehouse_id : typeof this.form.warehouse_id == 'object'
                    ? this.form.warehouse_id.id                 
                    : '',
                chart_of_account_id : typeof this.form.chart_of_account_id == "object"
                    ? this.form.chart_of_account_id.id 
                    : ""
            }

            formData.stock_out_details = formData
                .stock_out_details
                .map(item => {
                    return {
                        ...item,
                        product_id : typeof item.product_id == 'object'
                            ? item.product_id.id 
                            : '',
                        grade_id: typeof item.grade_id == 'object'
                            ? item.grade_id.id
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
                    " Stok Keluar"
                );

                if(!this.isEditable){
                    this.form = {
                        ...this.default_form,
                        stock_out_details : []
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
                            process.env.API_URL + "/inventory/stock_out/get-print-detail/" + id + "?token=" + token
                            ,'_blank'
                        );    
                    } 
                }
            });
        },

        async setCode(){
            await this.getCode({
                url : "inventory/stock_out",
                query : ""            
            });

            this.form.code = this.code;
        },

        addDetail(){
            if(parseInt(this.limit_item_transaction) <= this.form.stock_out_details.length){
                this.$toaster.error("Hanya " + this.limit_item_transaction + " batas item yang di perbolehkan");
                return;
            }

            this.form.stock_out_details.push({
                product_id : '',
                quantity : 0.00,
                description : ''
            })
        },

        deleteDetail(indexItem){
            this.form.stock_out_details = this.form
                .stock_out_details
                .filter((_,index) => index != indexItem);
        },

        onSetProduct(index){            
            let details = [
                ...this.form.stock_out_details
            ];

            let itemProduct = {
                ...this.form.stock_out_details[index],            
            };
           
            if(!itemProduct.product_id) {
                this.form.stock_out_details[index].product_id = '';
                return
            };

            let product = itemProduct.product_id;

            let products = details.filter(item => (item.product_id ? item.product_id.id : 0) === product.id);

            if(products.length > 1){        
                this.$toaster.error("Product sudah ada di dalam list");
                        
                this.form.stock_out_details = details.filter((_,indexItem) => index != indexItem);            
            }
        },    

        onSetWarehouse(item){
            if(!item){
                this.form.warehouse_id = '';
            }
        },

        onSetPurchaseingReturn(item){
            if(item){                         
                 this.form = {
                    ...this.form,                                                 
                    stock_out_details : item.purchaseing_return_details 
                        .map(item => {
                            return {                            
                                product_id :  item.product,
                                quantity : item.quantity,
                                description : '',
                            }
                        })
                }       
            }else{
                this.form.purchaseing_return_id = '';
                this.form.chart_of_account_id = '';
            }
        },

        onSetChartOfAccount(item){
            if(!item){
                this.form.chart_of_account_id = '';
            }
        },

        isDisabledKas(){
            if(!this.form.purchaseing_return_id){
                return true;
            } 
            
            if(!this.form.purchaseing_return_id.purchaseing.is_paid){
                return true;
            }
        }
    }
}
</script>
