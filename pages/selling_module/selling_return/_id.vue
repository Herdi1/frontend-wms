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
                            }} Return Penjualaan
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
                                <ValidationProvider
                                    name="code"
                                    rules="required">          
                                    <div class="form-group" slot-scope="{errors,valid}">
                                         <div class="row">
                                                <div class="col-sm-3 align-self-center mr-0">
                                                    <label for="code">Kode </label>
                                                </div>
                                                <div class="col-sm-9 align-self-center ml-0 pl-0 mr-0 pr-0">
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
                                                <div class="col-sm-9 align-self-center ml-1">
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
                            <div class="col-sm-5">
                                <div class="form-group">
                                    <div class="row">
                                    <div class="col-sm-2 align-self-center mr-0 pl-0 pr-0 mr-0">
                                        <label for="selling_id">Penjualaan</label>
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
                                                    {{ option.customer ? option.customer.name  : '-' }}
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
                            </div>
                        </div>
                    
                            <div class="d-flex flex-row">

                                <div class="col-sm-4">
                                    <div class="form-group">
                                          <div class="row">
                                                <div class="col-sm-3 align-self-center mr-0">
                                                    <label for="customer_id">Pelanggan</label>
                                                </div>
                                                <div class="col-sm-9 align-self-center ml-0 pl-0 mr-0 pr-0">
                                                    <input class="form-control"
                                                        :value="form.customer_id ? form.customer_id.name : '-'"
                                                        disabled="true" 
                                                        />
                                                </div>
                                          </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                      <div class="form-group">
                                           <div class="row">
                                                <div class="col-sm-2 align-self-center ">
                                                    <label for="warehouse_id">Gudang</label>
                                                </div>
                                                <div class="col-sm-9 align-self-center ml-1">
                                                    <input class="form-control"
                                                        :value="form.warehouse_id ? form.warehouse_id.name : '-'"
                                                        :disabled="true" 
                                                    />
                                                </div>
                                           </div>
                                    </div>
                                </div>
                                
                                  <div class="col-sm-3">
                                       <div class="form-group">
                                            <div class="row">
                                                <div class="col-sm-3 align-self-center ml-0 pl-0">
                                                    <label for="saller_id">Sales</label>
                                                </div>
                                                <div class="col-sm-8 align-self-center ml-1 pl-1 mr-0 pr-0">
                                                    <input type="text"
                                                        class="form-control"
                                                        name="saller_id"
                                                        :value="form.customer_id ? (form.customer_id.seller.name || '-') : '-'"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group">
                                         <div class="row">
                                            <div class="col-sm-2 align-self-center ml-0 pl-0 mr-0 pr-0">
                                                <label for="customer_group">Group </label>
                                            </div>
                                            <div class="col-sm-10 align-self-center">
                                                <input type="text" 
                                                    class="form-control"
                                                    :value="form.customer_id ? form.customer_id.customer_group.name || '-' : '-'" 
                                                    disabled />
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
                                            :disabled="isEditable || transactionType == 'CREDIT'"
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

                        <!--<div class="container">                
                            <div class="d-flex flex-row">
                                
                                <div class="col-sm-5">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-2 align-self-center">
                                                <label for="address">Alamat Pelanggan</label>
                                            </div>
                                            <div class="col-sm-8 align-self-center">
                                            <textarea            
                                                :value="form.customer_id ? form.customer_id.address : '-'"
                                                class="form-control"
                                                :disabled="true"></textarea>  
                                            </div>
                                        </div>                              
                                    </div>
                                </div>
                                
                            </div>
                        </div> -->

                        <div class="mt-4">
                        </div>

                        <div class="row">
                            <div class="col-md-3">                        
                                <div class="clearfix">
                                    <h6>Product</h6>
                                </div>

                                <div class="table-responsive table-striped mb-3"
                                    style="max-height:350px;border:1px; solid lightgray">
                                    <table class="table table-sm">                     
                                        <tr>
                                            <td class="text-left table-transaction-header">Kode</td>
                                            <td class="text-left table-transaction-header">Item</td>
                                        </tr>
                                        <tr v-for="item,index in tem_selling_return_details"
                                            :key="index"
                                            class="tr-product">
                                            <td class="table-transaction-row"
                                                style="cursor:pointer;"
                                                @click="onSetSellingDetail(item.product_id.id)">
                                                {{ item.product_id ? item.product_id.code : '-' }}
                                            </td>
                                            <td class="table-transaction-row"
                                                style="cursor:pointer;"
                                                @click="onSetSellingDetail(item.product_id.id)">
                                                {{ item.product_id ? item.product_id.name : '-' }}
                                            </td>   
                                        </tr>
                                        <tr v-if="!tem_selling_return_details.length">
                                            <td colspan="2"
                                                class="text-center">
                                                Data tidak ditemukan
                                            </td>
                                        </tr>
                                    </table>
                                </div>                                                                
                            </div>
                            <div class="col-md-9 mt-1">
                                <div class="table-responsive table-striped">      
                                    <table class="table table-sm mt-4">
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
                                                style="width:8%">Harga</td>
                                            <td class="text-left table-transaction-header"
                                                style="width:8%">Disc (Rp)</td>
                                            <td class="text-left table-transaction-header"
                                                style="width:8%">Total</td>
                                            <td class="text-left table-transaction-header"
                                                style="width:1%">Opsi</td>
                                        </tr>

                                        <tr v-for="item,index in form.selling_return_details"
                                            :key="index">
                                            <td class="table-transaction-row">
                                                <input type="text" 
                                                    class="form-control"
                                                    :value="item.product_id ? item.product_id.code : '-'"
                                                    disabled
                                                />                            
                                            </td>
                                            <td class="table-transaction-row">
                                                <input type="text"
                                                    class="form-control"
                                                    :value="item.product_id ? item.product_id.name : '-'"
                                                    disabled
                                                />                                          
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
                                                    @keyup.native="itemChange(index)"
                                                />                                           
                                            </td>
                                            <td class="table-transaction-row">
                                                <money v-model="item.price"
                                                    class="form-control"                                           
                                                    @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                                    disabled
                                                />                                       
                                            </td>
                                            <td class="table-transaction-row">
                                                <money v-model="item.discount"
                                                    class="form-control"
                                                    @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                                    disabled
                                                />
                                            </td>
                                            <td class="table-transaction-row">
                                                <money v-model="item.amount"
                                                    class="form-control"                                            
                                                    @keydown.native="$event.key === '-' ? $event.preventDefault() : null"  
                                                    disabled
                                                />   
                                            </td>
                                            <td class="text-center table-transaction-row">
                                                <i class="fas fa-trash"
                                                    style="cursor:pointer"
                                                    @click="deleteDetail(index)"></i>
                                            </td>                                    
                                        </tr>

                                        <tr v-if="!form.selling_return_details.length">
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
                                            <td colspan="2" class="text-right pt-3">Total</td> 
                                            <td colspan="2">
                                                <money v-model="form.total"
                                                    class="form-control"                                             
                                                    @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                                    disabled
                                                />   
                                            </td> 
                                        </tr>                                                                     
                                        <tr>
                                            <td colspan="6" class="text-right pt-3">PPN</td>
                                            <td colspan="2">
                                                <money v-model="form.tax"
                                                    class="form-control"                                             
                                                    @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                                    disabled
                                                />   
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" class="text-right pt-3">Grand Total</td> 
                                            <td colspan="2">
                                                <money v-model="form.grand_total"
                                                    class="form-control"                                                 
                                                    @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                                    disabled
                                                />   
                                            </td>
                                        </tr>              
                                    </table>
                                </div>
                            </div>
                        </div>

                        <button class="btn btn-primary"
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
            title: 'Return Penjualaan',
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

            isStopSearchProduct : false,
            isLoadingGetProduct : false,
            product_search : '',

            isStopSearchChartOfAccount : false,
            isLoadingGetChartOfAccount : false,
            chart_of_account_search : "",
            
            form : {
                selling_id : '',
                warehouse_id : '',
                customer_id : '',
                chart_of_account_id : "",
                code : '',
                description : '',
                date : moment().format("YYYY-MM-DD"),                
                discount_type : 'NOMINAL',
                total : 0,
                tax : 0,            
                grand_total : 0,
                selling_return_details : [],        
            },

            default_form : {
                selling_id : '',
                warehouse_id : '',
                customer_id : '',
                chart_of_account_id : "",
                code : '',
                description : '',
                date : moment().format("YYYY-MM-DD"),                
                discount_type : 'NOMINAL',
                total : 0,
                tax : 0,            
                grand_total : 0,
                selling_return_details : [],        
            },

            tem_selling_return_details : [],

            transactionType : ''
        }
    },

    async created(){
        try{        
            if(this.isEditable){
                let response = await this.$axios.get("selling_module/selling_return/" + this.id);

                Object.keys(this.form)
                    .forEach(item => {
                        if(item != "selling_return_details"){
                            if(item === 'customer_id'){
                                this.form.customer_id = response.data.customer || '';
                            }else if(item === 'selling_id'){
                                this.form.selling_id = response.data.selling || '';              
                            }else if(item === 'warehouse_id'){
                                this.form.warehouse_id = response.data.warehouse || '';
                            }else if(item === 'chart_of_account_id'){
                                this.form.chart_of_account_id = response.data.chart_of_account || '';
                            }else{
                                this.form[item] = response.data[item];
                            }
                        }
                    });
            
                this.form.selling_return_details = response.data
                        .selling_return_details
                        .map(item => {
                            return {
                                ...item,
                                product_id : item.product
                            }
                        });

                this.tem_selling_return_details = this.form
                        .selling_id.selling_details
                        .filter(item => {
                            return !this.form
                                .selling_return_details
                                .find(
                                    itemDetail => itemDetail.product_id.id == item.product.id
                                );
                        });            

                this.tem_selling_return_details = this
                        .tem_selling_return_details
                        .map(item => {
                            return {
                                ...item,
                                product_id : item.product
                            }
                        });

                this.isLoadingPage = false;        
            }
        }catch(err){
            console.log(err);
            this.$router.push("/selling_module/selling_return");
        }
    },

    async mounted(){
        await this.onSearchSelling();

        await this.onSearchChartOfAccount();

        if(!this.isEditable){
            this.setCode();
        }
    },

    computed :{
        ...mapState('moduleApi',[
            'lookup_sellings',
            'lookup_chart_of_accounts',
            'code'
        ]),
        
        tax(){
            return this.$store.state.setting.settings
                .find(item => item.name == "tax")
                .value;
        }
    },

    methods: {    
        ...mapActions('moduleApi',[
            'lookUp',
            'getCode'
        ]),

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
                    url : "selling_module/selling_return/get-selling",
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

    
        onSubmit(isInvalid){
            if(isInvalid || this.isLoadingForm) return;            
      
            if(!this.form.selling_return_details.length){
                this.$toaster.error("Detail Return Penjualaan Masih Kosong");
                return;
            }

            this.isLoadingForm = true;

            let url = "selling_module/selling_return";

            let formData = {
                ...this.form,
                selling_id : typeof this.form.selling_id == 'object'
                    ? this.form.selling_id.id 
                    : '',
                warehouse_id : typeof this.form.warehouse_id == 'object'
                    ? this.form.warehouse_id.id
                    : '',
                customer_id : typeof this.form.customer_id == 'object'
                    ? this.form.warehouse_id.id 
                    : '',
                chart_of_account_id : typeof this.form.chart_of_account_id == 'object' 
                    ? this.form.chart_of_account_id.id 
                    : ''
            }

            formData.selling_return_details = formData
                .selling_return_details
                .map(item => {
                    return {
                        quantity : item.quantity,
                        price : item.price,
                        amount : item.amount,
                        discount : item.discount,
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
                    " Return Penjualaan"
                );

                if(!this.isEditable){
                    this.form = {
                        ...this.default_form,
                        selling_return_details : []
                    }
                    
                    this.tem_selling_return_details = [];

                    this.setCode();                
                }
            })
            .catch(err => {
                this.$globalErrorToaster(this.$toaster,err);
            })
            .finally(() => {
                this.isLoadingForm = false;
            })            
        },        

        async setCode(){
            await this.getCode({
                url : "selling_module/selling_return",
                query : ""            
            });

            this.form.code = this.code;
        },

        deleteDetail(indexItem){
            this.tem_selling_return_details
                .push(this.form.selling_return_details.find(
                    (_,index) => index == indexItem
                ))

            this.form.selling_return_details = this.form.selling_return_details
                .filter((_,index) => index != indexItem);

            this.countTotal();
        },


        itemChange(index){                                     
            let detail = {
                ...this.form.selling_return_details[index]
            };

            let discount_type = this.form.discount_type;

            if(
                parseFloat(detail.quantity) >= 0.00
                &&
                parseFloat(detail.price) >= 0.00
            ){                                         
                if(discount_type == "NOMINAL"){
                    if(parseFloat(detail.discount) > parseFloat(detail.price)){
                        detail.discount = parseFloat(detail.price);
                    }            

                    detail.amount = ( parseFloat(detail.price) - parseFloat(detail.discount) ) * parseFloat(detail.quantity);
                }else{
                    if(parseFloat(detail.discount) > 100.00){
                        detail.discount = 100.00;
                    } 

                    if(parseFloat(detail.discount) <= 0.00){                                                
                        detail.discount = 0.00;
                    }

                    let total_discount = parseFloat(detail.price) * parseFloat(detail.discount) / 100;
 
                    detail.amount = ( parseFloat(detail.price) - total_discount ) * parseFloat(detail.quantity);                
                }                    

                this.form.selling_return_details[index].amount   = Math.ceil(detail.amount);

                this.form.selling_return_details[index].discount = detail.discount;

                this.countTotal();
            }
        },      
    
        countTotal(){        
            let { 
                total,
                tax,
                grand_total,        
            }  = this.form;

            let taxSetting = this.tax;
        
            total = this.form.selling_return_details.reduce((amount,item) => parseFloat(amount) + parseFloat(item.amount),0.00);
                
            tax = parseFloat(taxSetting) * ( parseFloat(total) / 100.00 );

            grand_total = parseFloat(total) + parseFloat(tax);

            this.form = {
                ...this.form, 
                total : Math.ceil(total),
                tax : Math.ceil(tax),
                grand_total : Math.ceil(grand_total)
            }        
        },
    
        onSetSelling(item){
            if(item){         
                this.form = {
                    ...this.form,
                            
                    warehouse_id : item.warehouse || '',                
                    customer_id : item.customer || '',
                    // date : item.date,       
                    description : item.description,                                    
                    discount_type : item.discount_type,

                    total : 0.00,
                    tax : 0.00,
                    grand_total : 0.00,

                    selling_return_details : []
                }    

                this.tem_selling_return_details = item.selling_details
                    .map(item => {
                        return {
                            product_id : item.product,
                            quantity : item.quantity,
                            price : item.price,
                            amount : item.amount,
                            discount : item.discount || 0.00
                        }
                    });    


                this.transactionType = item.transaction_type           
            }else{
                this.form.selling_id = '';
            }
        },

        onSetSellingDetail(product_id){        
            this.form.selling_return_details
                .push(this.tem_selling_return_details.find(
                    item => (item.product_id ? item.product_id.id : 0) == product_id
                ));

            this.tem_selling_return_details = this.tem_selling_return_details
                .filter(item => (item.product_id ? item.product_id.id : 0) != product_id);

            this.form.selling_return_details.forEach((_,index) => {
                this.itemChange(index);
            });
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
                url: "selling_module/selling_return/get-chart-of-account",
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

        onSetChartOfAccount(item){
            if(!item){
                this.form.chart_of_account_id = '';
            }
        }
    }
}
</script>
