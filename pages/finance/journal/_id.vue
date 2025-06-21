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
                            }} Journal 
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
                                        style="width:8%">Kode</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:20%">Master Akun</td>           
                                    <td class="text-left table-transaction-header"
                                        style="width:5%">Type</td>                                 
                                    <td class="text-left table-transaction-header"
                                        style="width:5%">Nominal</td>                                        
                                    <td class="text-left table-transaction-header"
                                        style="width:8%">Deksripsi</td>                                  
                                    <td class="text-left table-transaction-header"
                                        style="width:1%">Opsi</td>
                                </tr>
                                <tr v-for="item,index in form.journal_details"
                                    :key="index">
                                    <td class="table-transaction-row">
                                        <input type="text" 
                                            class="form-control"
                                            :value="item.chart_of_account_id ? item.chart_of_account_id.code : '-'"
                                            disabled/>                            
                                    </td>
                                    <td class="table-transaction-row">
                                        <v-select                           
                                            label="name"   
                                            :loading="isLoadingGetChartOfAccountDetail"
                                            :options="lookup_chart_of_account_details.data"
                                            :filterable="false"
                                            @search="onGetChartOfAccountDetail"
                                            @input="onSetChartOfAccountDetail(index)"
                                            v-model="item.chart_of_account_id">              
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
                                                :required="!item.chart_of_account_id"
                                                v-bind="attributes"
                                                v-on="events"
                                                />
                                            </template>   
                                            <li slot-scope="{search}" slot="list-footer"
                                                class="d-flex justify-content-between"
                                                v-if="lookup_chart_of_account_details.data.length || search">
                                                <span v-if="lookup_chart_of_account_details.current_page > 1" 
                                                    @click="onGetChartOfAccountDetail(search,false)"
                                                    class="flex-fill bg-primary text-white text-center"
                                                    style="cursor:pointer">Sebelumnya</span>
                                                <span v-if="lookup_chart_of_account_details.last_page > lookup_chart_of_account_details.current_page" 
                                                    @click="onGetChartOfAccountDetail(search,true)"
                                                    class="flex-fill bg-primary text-white text-center"
                                                    style="cursor:pointer">Selanjutnya</span>
                                            </li> 
                                        </v-select>       
                                    </td>                           
                                    <td class="table-transaction-row">     
                                        <select class="form-control"
                                            v-model="item.type">
                                            <option value="CREDIT">KREDIT</option>
                                            <option value="DEBIT">DEBIT</option>
                                        </select>
                                    </td>
                                    <td class="table-transaction-row">
                                        <money v-model="item.amount"
                                            class="form-control"                                                                       
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                            @keyup.native="itemChange(index)"
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

                                <tr v-if="!form.journal_details.length">
                                    <td colspan="5"
                                        class="text-center pt-4 pb-4">
                                        Data tidak ditemukan
                                    </td>
                                </tr>                  

                                <tr>
                                    <td colspan="2" class="text-left border-top table-success">                        
                                        <input
                                            class="form-control form-control-sm"
                                            v-model="form.description"
                                            aria-placeholder="Keterangan"
                                            placeholder="Keterangan ...."
                                        />                        
                                    </td>
                                    <td colspan="1" class="text-right pt-3">Total</td> 
                                    <td colspan="2">
                                        <money v-model="form.amount"
                                            class="form-control"                                                                    
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                        />   
                                    </td> 
                                </tr>                                  
                            </table>      

                            <div class="mt-3 mb-3" style="height: 100px"></div>                      
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
            title: 'Journal',
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

            isStopSearchChartOfAccountDetail : false,
            isLoadingGetChartOfAccountDetail : false,
            chart_of_account_detail_search : '',

            form : {
                code : '',
                description : '',
                date : moment().format("YYYY-MM-DD"),
                amount : 0.00,
                journal_details : []
            },

            default_form : {              
                code : '',
                description : '',
                date : moment().format("YYYY-MM-DD"),
                amount : 0.00,
                journal_details : []
            }
        }
    },

    async created(){
        try{        
            if(this.isEditable){
                let response = await this.$axios.get("finance/journal/"+this.id);

                Object.keys(this.form)
                    .forEach(item => {
                        if(item != "journal_details"){
                            this.form[item] = response.data[item];
                        }
                    });
            
                this.form.journal_details = response.data
                    .journal_details
                    .map(item => {
                        return {
                            ...item,
                            chart_of_account_id : item.chart_of_account
                        }
                    });

                this.isLoadingPage = false;        
            }
        }catch(err){
            this.$router.push("/finance/journal");
        }
    },

    async mounted(){
        await this.onSearchChartOfAccountDetail();

        if(!this.isEditable){
            this.setCode();
        }
    },

    computed :{
        ...mapState('moduleApi',[
            'lookup_chart_of_account_details',
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

        onGetChartOfAccountDetail(search,isNext){      
            if(!search.length && typeof isNext === "function") return false;             

            clearTimeout(this.isStopSearchChartOfAccountDetail);
            
            this.isStopSearchChartOfAccountDetail = setTimeout(() => {
                this.chart_of_account_detail_search = search;

                if(typeof isNext !== "function"){
                    this.lookup_chart_of_account_details.current_page = isNext 
                        ? this.lookup_chart_of_account_details.current_page + 1 
                        : this.lookup_chart_of_account_details.current_page - 1;        
                }else{
                    this.lookup_chart_of_account_details.current_page = 1;
                }

                this.onSearchChartOfAccountDetail();
            },600);        
        },

        async onSearchChartOfAccountDetail(){
            if(!this.isLoadingGetChartOfAccountDetail){
                this.isLoadingGetChartOfAccountDetail = true;
                        
                await this.lookUp({    
                    url : "finance/journal/get-chart-of-account",
                    lookup : "chart_of_account_details",
                    query : "?search=" + this.chart_of_account_detail_search + 
                        "&page=" + this.lookup_chart_of_account_details.current_page + 
                        "&per_page=5"
                })

                this.isLoadingGetChartOfAccountDetail = false;      
            }
        },

        onSubmit(isInvalid){
            if(isInvalid || this.isLoadingForm) return;            
      
            if(!this.form.journal_details.length){
                this.$toaster.error("Detail Journal Masih Kosong");
                return;
            }

            this.isLoadingForm = true;

            let url = "finance/journal";

            let formData = {
                ...this.form,
                chart_of_account_id : typeof this.form.chart_of_account_id == 'object'
                    ? this.form.chart_of_account_id.id 
                    : '',                
            }

            formData.journal_details = formData
                .journal_details
                .map(item => {
                    return {
                        description : item.description,
                        amount : item.amount,            
                        type : item.type,
                        chart_of_account_id : typeof item.chart_of_account_id == 'object'
                            ? item.chart_of_account_id.id 
                            : '',    
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
                    " Journal"
                );

                if(!this.isEditable){
                    this.form = {
                        ...this.default_form,
                        journal_details : []
                    }

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
                url : "finance/journal",
                query : ""            
            });

            this.form.code = this.code;
        },

        addDetail(){
            if(parseInt(this.limit_item_transaction) <= this.form.journal_details.length){
                this.$toaster.error("Hanya " + this.limit_item_transaction + " batas item yang di perbolehkan");
                return;
            }

            this.form.journal_details.push({
                chart_of_account_id : '',
                amount : 0.00,
                description : '',
                type : 'CREDIT'
            })
        },

        deleteDetail(indexItem){
            this.form.journal_details = this.form
                .journal_details
                .filter((_,index) => index != indexItem);

            this.countTotal();
        },

        itemChange(index){            
            this.countTotal();
        },

        countTotal(){
            this.form.amount = this.form.journal_details.reduce((itemPrev,itemNext) => parseFloat(itemPrev) + parseFloat(itemNext.amount),0);
        },

        onSetChartOfAccountDetail(index){
            let details = [
                ...this.form.journal_details
            ];

            let item = {
                ...this.form.journal_details[index],            
            };
           
            if(!item.chart_of_account_id) {
                this.form.journal_details[index].chart_of_account_id = '';
                return
            };

            let chartOfAccount = item.chart_of_account_id;

            let chartOfAccounts = details.filter(item => (item.chart_of_account_id ? item.chart_of_account_id.id : 0) === chartOfAccount.id);

            if(chartOfAccounts.length < 2){
            }else{
                this.$toaster.error("Master akun sudah ada di dalam list");
                        
                this.form.journal_details = details.filter((_,indexItem) => index != indexItem);            
            }
        }
    }
}
</script>
