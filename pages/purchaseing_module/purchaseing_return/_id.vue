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
                            }} Return Pembelian                
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
                    <form 
                        @submit.prevent="() => console.log('Submit')"
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
                                                <label for="purchaseing">Pembelian</label>
                                            </div>
                                            <div class="col-sm-10 align-self-center ml-0 pl-0">
                                                <v-select                           
                                                    label="code"   
                                                    :loading="isLoadingGetPurchaseing"
                                                    :options="lookup_purchaseings.data"
                                                    :filterable="false"
                                                    @search="onGetPurchaseing"
                                                    @input="onSetPurchaseing"
                                                    v-model="form.purchaseing_id"
                                                    :disabled="isEditable">              
                                                    <template v-slot:option="option">                    
                                                       <div class="row">
                                                            <div class="col-md-5 p-1 m-0">
                                                            {{ option.code }}
                                                            </div>
                                                            <div class="col-md-7 p-1 m-0 text-right">
                                                            {{ option.supplier ? option.supplier.name  : '-' }}
                                                            </div>
                                                        </div>
                                                    </template> 
                                                    <template #search="{attributes, events}">
                                                        <input
                                                        class="vs__search"
                                                        :required="!form.purchaseing_id"
                                                        v-bind="attributes"
                                                        v-on="events"
                                                        />
                                                    </template>   
                                                    <li slot-scope="{search}" slot="list-footer"
                                                        class="d-flex justify-content-between"
                                                        v-if="lookup_purchaseings.data.length || search">
                                                        <span v-if="lookup_purchaseings.current_page > 1" 
                                                            @click="onGetPurchaseing(search,false)"
                                                            class="flex-fill bg-primary text-white text-center"
                                                            style="cursor:pointer">Sebelumnya</span>
                                                        <span v-if="lookup_purchaseings.last_page > lookup_purchaseings.current_page" 
                                                            @click="onGetPurchaseing(search,true)"
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
                                
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-2 align-self-center mr-0">
                                                <label for="supplier_id">Supplier</label>
                                            </div>
                                            <div class="col-sm-10 align-self-center ml-0 pl-0">
                                                <input
                                                    :value="form.supplier_id ? form.supplier_id.name : '-'"
                                                    class="form-control"
                                                    :disabled="true"/>
                                            </div>
                                        </div>
                                    </div>     
                                </div>
                                <div class="col-sm-6">
                                     <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-2 align-self-center mr-0">
                                                <label for="address">Alamat</label>
                                            </div>
                                            <div class="col-sm-10 align-self-center ml-0 pl-0">
                                                <input class="form-control" disabled :value="form.supplier_id ? form.supplier_id.address || '-' : '-'"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4">
                        </div>
                        <div class="row">
                            <div class="col-md-3">                        
                                <div class="clearfix">
                                    <h6>Product</h6>
                                </div>

                                <div class="table-responsive table-striped mb-3"
                                    style="max-height:350px;border-right:1px solid lightgray">
                                    <table class="table table-sm">                       
                                        <tr>
                                            <td class="text-left table-transaction-header">Kode</td>
                                            <td class="text-left table-transaction-header">Item</td>
                                        </tr>
                                        <tr v-for="item,index in tem_purchaseing_return_details"
                                            :key="index"
                                            class="tr-product">                            
                                            <td class="table-transaction-row"
                                                style="cursor:pointer;padding-top:10px;padding-bottom:10px"
                                                @click="onSetPurchaseingDetail(item.product_id.id)">
                                                {{ item.product_id ? item.product_id.code : '-' }}
                                            </td>
                                            <td class="table-transaction-row"
                                                style="cursor:pointer;padding-top:10px;padding-bottom:10px"
                                                @click="onSetPurchaseingDetail(item.product_id.id)">
                                                {{ item.product_id ? item.product_id.name : '-' }}
                                            </td>   
                                        </tr>
                                        <tr v-if="!tem_purchaseing_return_details.length">
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
                                                style="width:8%">
                                                Discount 
                                                <span v-if="form.discount_type == 'NOMINAL'">
                                                    Rp
                                                </span>
                                                <span v-else>
                                                    %
                                                </span>
                                            </td>
                                            <td class="text-left table-transaction-header"
                                                style="width:8%">
                                                PPN
                                            </td>
                                            <td class="text-left table-transaction-header"
                                                style="width:6%">Total</td>
                                            <td class="text-left table-transaction-header"
                                                style="width:1%">Opsi</td>
                                        </tr>
                                        <tr v-for="item,index in form.purchaseing_return_details"
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
                                                    :value="item.product_id ? item.product_id.purchase_unit : '-'"
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
                                                    @keyup.native="itemChange(index)"
                                                    disabled
                                                />                                       
                                            </td>
                                            <td class="table-transaction-row">
                                                <money v-model="item.discount"
                                                    class="form-control"
                                                    @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                                    @keyup.native="itemChange(index)"
                                                    disabled/>
                                            </td>
                                            <td class="table-transaction-row">
                                                <money v-model="item.tax"
                                                    class="form-control"
                                                    @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                                    @keyup.native="itemChange(index)"
                                                    disabled/>
                                            </td>
                                            <td class="table-transaction-row">
                                                <money v-model="item.amount"
                                                    class="form-control"                                                              
                                                    @keydown.native="$event.key === '-' ? $event.preventDefault() : null"              
                                                    disabled/>   
                                            </td>
                                            <td class="text-center table-transaction-row">
                                                <i class="fas fa-trash"
                                                    style="cursor:pointer"
                                                    @click="deleteDetail(index)"></i>
                                            </td>                                    
                                        </tr>

                                        <tr v-if="!form.purchaseing_return_details.length">
                                            <td colspan="8"
                                                class="text-center pt-4 pb-4">
                                                Data tidak ditemukan
                                            </td>
                                        </tr>                  

                                        <tr>
                                            <td colspan="5" class="text-left border-top table-success">                        
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

                                        <!-- <tr>
                                            <td colspan="6" class="text-right pt-3">PPN</td>
                                            <td colspan="2">
                                                <money v-model="form.tax"
                                                    class="form-control"                                                             
                                                    @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                                    disabled
                                                />   
                                            </td>
                                        </tr> 
                                        -->

                                        <tr>
                                            <td colspan="7" class="text-right pt-3">Grand Total</td> 
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
            title: 'Return Pembelian',
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

            isStopSearchPurchaseing : false,
            isLoadingGetPurchaseing : false,
            purchaseing_search : '',            

            form : {
                purchaseing_id : '',
                supplier_id : '',
                code : '',
                description : '',
                date : moment().format("YYYY-MM-DD"),                
                total : 0.00,
                // tax : 0.00,
                grand_total : 0.00,
                discount_type : "NOMINAL",
                purchaseing_return_details : [],        
            },

            default_form : {
                purchaseing_id : '',
                supplier_id : '',
                code : '',
                description : '',
                date : moment().format("YYYY-MM-DD"),
                total : 0.00,
                // tax : 0.00,
                grand_total : 0.00,
                discount_type : "NOMINAL",
                purchaseing_return_details : [],        
            },

            tem_purchaseing_return_details : [],        
        }
    },

    async created(){
        try{        
            if(this.isEditable){
                let response = await this.$axios.get("purchaseing_module/purchaseing_return/" + this.id);

                Object.keys(this.form)
                    .forEach(item => {
                        if(item != "purchaseing_return_details"){
                            if(item === 'supplier_id'){
                                this.form.supplier_id = response.data.supplier || '';
                            }else if(item === 'purchaseing_id'){
                                this.form.purchaseing_id = response.data.purchaseing || '';              
                            }else{
                                this.form[item] = response.data[item];
                            }
                        }
                    });
            
                this.form.purchaseing_return_details = response.data
                        .purchaseing_return_details
                        .map(item => {
                            return {
                                ...item,
                                product_id : item.product
                            }
                        });

                this.tem_purchaseing_return_details = this.form
                        .purchaseing_id.purchaseing_details
                        .filter(item => {
                            return !this.form
                                .purchaseing_return_details
                                .find(
                                    itemDetail => ( itemDetail.product_id ? itemDetail.product_id.id  :  0 ) == item.product.id
                                );
                        });            

                this.tem_purchaseing_return_details = this
                        .tem_purchaseing_return_details
                        .map(item => {
                            return {
                                ...item,
                                product_id : item.product
                            }
                        });

                this.isLoadingPage = false;        
            }
        }catch(err){
            this.$router.push("/purchaseing_module/purchaseing_return");
        }
    },

    async mounted(){
        await this.onSearchPurchaseing();

        if(!this.isEditable){
            this.setCode();
        }
    },

    computed :{
        ...mapState('moduleApi',[
            'lookup_purchaseings',
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

        onGetPurchaseing(search,isNext){      
            if(!search.length && typeof isNext === "function") return false;             

            clearTimeout(this.isStopSearchPurchaseing);
            
            this.isStopSearchPurchaseing = setTimeout(() => {
                this.purchaseing_search = search;

                if(typeof isNext !== "function"){
                    this.lookup_purchaseings.current_page = isNext 
                        ? this.lookup_purchaseings.current_page + 1 
                        : this.lookup_purchaseings.current_page - 1;        
                }else{
                    this.lookup_purchaseings.current_page = 1;
                }

                this.onSearchPurchaseing();
            },600);        
        },

        async onSearchPurchaseing(){
            if(!this.isLoadingGetPurchaseing){
                this.isLoadingGetPurchaseing = true;
                        
                await this.lookUp({    
                    url : "purchaseing_module/purchaseing_return/get-purchaseing",
                    lookup : "purchaseings",
                    query : "?search="
                        + this.purchaseing_search +
                        "&page="
                        + this.lookup_purchaseings.current_page +
                        "&per_page=10"
                })

                this.isLoadingGetPurchaseing = false;      
            }
        },

        onSubmit(isInvalid){
            if(isInvalid || this.isLoadingForm) return;            

            if(!this.form.purchaseing_return_details.length){
                this.$toaster.error("Detail Return Pembelian Masih Kosong");
                return;
            }

            this.isLoadingForm = true;

            let url = "purchaseing_module/purchaseing_return";

            let formData = {
                ...this.form,
                purchaseing_id : typeof this.form.purchaseing_id == 'object'
                    ? this.form.purchaseing_id.id 
                    : '',
                supplier_id : typeof this.form.supplier_id == 'object'
                    ? this.form.supplier_id.id
                    : ''
            }

            formData.purchaseing_return_details = formData
                .purchaseing_return_details
                .map(item => {
                    return {
                        quantity : item.quantity,
                        price : item.price,
                        amount : item.amount,
                        discount : item.discount,
                        tax : item.tax,
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
                    " Return Pembelian"
                );

                if(!this.isEditable){
                    this.form = {
                        ...this.default_form,
                        purchaseing_return_details : []
                    }
                    
                    this.tem_purchaseing_return_details = [];

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
                url : "purchaseing_module/purchaseing_return",
                query : ""            
            });

            this.form.code = this.code;
        },
      
        deleteDetail(indexItem){
            this.tem_purchaseing_return_details
                .push(this.form.purchaseing_return_details.find(
                    (_,index) => index == indexItem
                ))

            this.form.purchaseing_return_details = this.form.purchaseing_return_details
                .filter((_,index) => index != indexItem);

            this.countTotal();
        },

        itemChange(index){                                     
            let detail = {
                ...this.form.purchaseing_return_details[index]
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

                if(
                    this.form.purchaseing_return_details[index].product_id 
                    &&
                    this.form.purchaseing_return_details[index].product_id.is_tax
                ){                
                    this.form.purchaseing_return_details[index].tax = parseFloat(Math.ceil(detail.amount)) * (this.tax / 100);          
                }else{
                    this.form.purchaseing_return_details[index].tax = 0;
                }

                this.form.purchaseing_return_details[index].amount = parseFloat(Math.ceil(detail.amount)) + this.form.purchaseing_return_details[index].tax;

                this.form.purchaseing_return_details[index].discount = detail.discount;

                this.countTotal();
            }
        },      
    
        countTotal(){        
            let { 
                total,
                // tax,
                grand_total,        
            }  = this.form;

            let taxSetting = this.tax;
        
            total = this.form.purchaseing_return_details.reduce((amount,item) => parseFloat(amount) + parseFloat(item.amount),0.00);
                
            // tax = parseFloat(taxSetting) * ( parseFloat(total) / 100.00 );

            // grand_total = parseFloat(total) + parseFloat(tax);

            grand_total = parseFloat(total);

            this.form = {
                ...this.form, 
                total : Math.ceil(total),
                // tax : Math.ceil(tax),
                grand_total : Math.ceil(grand_total)
            }        
        },
    
        onSetPurchaseing(item){
            if(item){         
                this.form = {
                    ...this.form,
                    
                    supplier_id : item.supplier || '',                                        
                    // date : item.date,       
                    description : item.description,                                    
                    discount_type : item.discount_type,

                    total : 0.00,
                    // tax : 0.00,
                    grand_total : 0.00,

                    purchaseing_return_details : []
                }    

                this.tem_purchaseing_return_details = item.purchaseing_details
                    .map(item => {
                        return {
                            product_id : item.product,
                            quantity : item.quantity,
                            price : item.price,
                            amount : item.amount,
                            tax : item.tax || 0.00,
                            discount : item.discount || 0.00
                        }
                    });                  
            }else{
                this.form.purchaseing_id = '';
            }
        },

        onSetPurchaseingDetail(product_id){        
            this.form.purchaseing_return_details
                .push(this.tem_purchaseing_return_details.find(
                    item => (item.product_id ? item.product_id.id : 0) == product_id
                ));

            this.tem_purchaseing_return_details = this.tem_purchaseing_return_details
                .filter(item => (item.product_id ? item.product_id.id : 0) != product_id);

            this.form.purchaseing_return_details.forEach((_,index) => {
                this.itemChange(index);
            });
        }
    }
}
</script>

