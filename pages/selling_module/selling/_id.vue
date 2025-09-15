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
                            }} Penjualaan
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
                                

                                <div class="col-sm-3">    
                                    <div class="form-group">
                                          <div class="row">
                                            <div class="col-sm-4 align-self-center mr -0">
                                                <label for="transaction_type">Transaksi</label>
                                            </div>
                                            <div class="col-sm-8 align-self-center ml-0 pl-2">
                                                <select v-model="form.transaction_type"
                                                    class="form-control"
                                                    :disabled="isEditable || (form.dp > 0 && form.po_customer_id !== '')"
                                                    @change="onChangeTransactionType">
                                                    <option value="CASH">CASH</option>
                                                    <option value="CREDIT">CREDIT</option>
                                                </select>
                                            </div>
                                          </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                     <div class="form-group">
                                          <div class="row">
                                            <div class="col-sm-4 align-self-center mr-0">
                                                <label for="due_date">Temp Tgl</label>
                                            </div>
                                            <div class="col-sm-8 align-self-center ml-0 pl-0">
                                                <input type="date"
                                                    class="form-control"
                                                    name="due_date"
                                                    v-model="form.due_date"                            
                                                    :required="form.transaction_type == 'CREDIT'"/>                                                                    
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
                                                    <label for="po_customer_id">Po Cust</label>
                                                </div>
                                                <div class="col-sm-10 align-self-center ml-0 pl-0">
                                                    <v-select                           
                                                        label="code"   
                                                        :loading="isLoadingGetPoCustomer"
                                                        :options="lookup_po_customers.data"
                                                        :filterable="false"
                                                        @search="onGetPoCustomer"
                                                        @input="onSetPoCustomer"
                                                        v-model="form.po_customer_id"
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
                                                            :required="!form.po_customer_id"
                                                            v-bind="attributes"
                                                            v-on="events"
                                                            />
                                                        </template>   
                                                        <li slot-scope="{search}" slot="list-footer"
                                                            class="d-flex justify-content-between"
                                                            v-if="lookup_po_customers.data.length || search">
                                                            <span v-if="lookup_po_customers.current_page > 1" 
                                                                @click="onGetPoCustomer(search,false)"
                                                                class="flex-fill bg-primary text-white text-center"
                                                                style="cursor:pointer">Sebelumnya</span>
                                                            <span v-if="lookup_po_customers.last_page > lookup_po_customers.current_page" 
                                                                @click="onGetPoCustomer(search,true)"
                                                                class="flex-fill bg-primary text-white text-center"
                                                                style="cursor:pointer">Selanjutnya</span>
                                                        </li> 
                                                    </v-select>   
                                                </div>
                                         </div>                                                             
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                     <div class="form-group">
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
                                                        @input="onSetCustomer"
                                                        v-model="form.customer_id">              
                                                        <template v-slot:option="option">                    
                                                           
                                                                {{ option.name }}
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
                                </div>
                           
                            </div>
                        </div>

                        <div class="container">
                            <div class="d-flex flex-row">

                                <!-- <div class="col-sm-3">                                         
                                    <div class="form-group">
                                         <div class="row">
                                            <div class="col-sm-4 align-self-center mr-0">
                                                <label for="customer_group">Group</label>
                                            </div>
                                            <div class="col-sm-8 align-self-center ml-0 pl-0">
                                                <input type="text" 
                                                    class="form-control"
                                                    :value="form.customer_id ? form.customer_id.customer_group.name || '-' : '-'" 
                                                    disabled />
                                            </div>
                                         </div>
                                    </div>   
                                </div> -->

                               <div class="col-sm-3"> 
                                     <div class="form-group">
                                          <div class="row">
                                                <div class="col-sm-2 align-self-center mr-0 ml-0 pl-0">
                                                    <label for="warehouse_id">Gudang</label>
                                                </div>
                                                <div class="col-sm-10 align-self-center ml-0 pl-1">
                                                <v-select                           
                                                    label="name"   
                                                    :loading="isLoadingGetWarehouse"
                                                    :options="lookup_warehouses.data"
                                                    :filterable="false"
                                                    @search="onGetWarehouse"
                                                    v-model="form.warehouse_id"
                                                    :disabled="isEditable">                           
                                                    <template v-slot:option="option">                    
                                                        
                                                            {{ option.name }}
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

                                <div class="col-sm-3">    
                                    <div class="form-group">
                                          <div class="row">
                                                <div class="col-sm-4 align-self-center mr-0">
                                                    <label for="payment_term">Pembayaran</label>
                                                </div>
                                                <div class="col-sm-8 align-self-center ml-0 pl-2">
                                                    <input type="text" 
                                                        class="form-control"
                                                        name="payment_term"
                                                        v-model="form.payment_term"
                                                    />
                                                </div>
                                          </div>
                                    </div>
                                </div>

                                <div class="col-sm-3">   
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-2 align-self-center">
                                                <label for="type_discount">Diskon</label>
                                            </div>
                                            <div class="col-sm-10 align-self-center">
                                                <select class="form-control"
                                                    v-model="form.discount_type"
                                                    @change="onChangeDiscountType()">
                                                    <option value="NOMINAL">Nominal (Rp)</option>
                                                    <option value="PERCENT">Persen (%)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--<div class="col-sm-5">    
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-2 align-self-center">
                                                <label for="address">Alamat Pelanggan</label>
                                            </div>
                                            <div class="col-sm-10 align-self-center">
                                                <textarea            
                                                    :value="form.customer_id ? form.customer_id.address : '-'"
                                                    class="form-control"
                                                    :disabled="true"></textarea>   
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
                                            <div class="col-sm-2 align-self-center mr-0">
                                                <label for="saller_id">Sales</label>
                                            </div>
                                            <div class="col-sm-8 align-self-center mr-0 p-0">
                                                <v-select                           
                                                    label="name"   
                                                    :loading="isLoadingGetSeller"
                                                    :options="lookup_sellers.data"
                                                    :filterable="false"
                                                    @search="onGetSeller"
                                                    @input="onSetSeller"
                                                    v-model="form.seller_id">              
                                                    <template v-slot:option="option">                    
                                                        <div class="row">
                                                            <div class="col-md-5 p-1 m-0">
                                                            {{ option.name }}
                                                            </div>                                                        
                                                        </div>
                                                    </template> 
                                                    <template #search="{attributes, events}">
                                                        <input
                                                        class="vs__search"
                                                        :required="!form.seller_id"
                                                        v-bind="attributes"
                                                        v-on="events"
                                                        />
                                                    </template>   
                                                    <li slot-scope="{search}" slot="list-footer"
                                                        class="d-flex justify-content-between"
                                                        v-if="lookup_sellers.data.length || search">
                                                        <span v-if="lookup_sellers.current_page > 1" 
                                                            @click="onGetSeller(search,false)"
                                                            class="flex-fill bg-primary text-white text-center"
                                                            style="cursor:pointer">Sebelumnya</span>
                                                        <span v-if="lookup_sellers.last_page > lookup_sellers.current_page" 
                                                            @click="onGetSeller(search,true)"
                                                            class="flex-fill bg-primary text-white text-center"
                                                            style="cursor:pointer">Selanjutnya</span>
                                                    </li> 
                                                </v-select>  
                                            </div>
                                        </div>
                                    </div>  
                                </div>    
                                
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div class="row">
                                        <div class="col-sm-2 align-self-center mr-0">
                                            <label for="chart_of_account_id">
                                            Kas
                                            </label>
                                        </div>
                                        <div class="col-sm-10 align-self-center ml-0 pl-2">
                                            <v-select
                                            label="name"
                                            :loading="isLoadingGetChartOfAccount"
                                            :options="lookup_chart_of_accounts.data"
                                            :filterable="false"
                                            @search="onGetChartOfAccount"
                                            @input="onSetChartOfAccount"
                                            v-model="form.chart_of_account_id"
                                            :disabled="form.transaction_type.toLowerCase()  === 'credit' || isEditable || (form.dp > 0 && form.po_customer_id !== '')"
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
                                        style="width:40%">Product</td>
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
                                        style="width:6%">Total</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:1%">Opsi</td>
                                </tr>
                                <tr v-for="item,index in form.selling_details"
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
                                            @keyup.native="itemChange(index)"
                                        />                                           
                                    </td>
                                    <td class="table-transaction-row">
                                        <money v-model="item.price"
                                            class="form-control"                                                                        
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                            @keyup.native="itemChange(index)"
                                        />                                       
                                    </td>
                                    <td class="table-transaction-row">
                                        <money v-model="item.discount"
                                            class="form-control"
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                            @keyup.native="itemChange(index)"
                                        />
                                    </td>
                                    <td class="table-transaction-row">
                                        <money v-model="item.amount"
                                            class="form-control"                                                                       
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"                     
                                        />   
                                    </td>
                                    <td class="text-center table-transaction-row">
                                        <i class="fas fa-trash"
                                            style="cursor:pointer"
                                            @click="deleteDetail(index)"></i>
                                    </td>                                    
                                </tr>

                                <tr v-if="!form.selling_details.length">
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
                                            />   
                                    </td> 
                                </tr>                                  

                                <tr>
                                    <td colspan="6" class="text-right pt-3">
                                        Discount
                                        <div class="text-muted text-small">
                                            <span v-if="form.discount_type == 'NOMINAL'">
                                                * Rp
                                            </span>
                                            <span v-else>
                                                * %
                                            </span>
                                        </div>
                                    </td> 
                                    <td colspan="2">
                                        <money v-model="form.discount"
                                            class="form-control"                                                                     
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                            @keyup.native="countTotal"
                                        />                                           
                                    </td>
                                </tr>

                                <tr v-if="form.discount > 0.00">
                                    <td colspan="6" class="text-right pt-3">
                                        Total Stl Discount 
                                    </td>
                                    <td colspan="2">
                                        <money v-model="form.total_discount_nominal"
                                            class="form-control"                                                            
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                            disabled
                                        />   
                                    </td>
                                </tr>
<!-- 
                                <tr>
                                    <td colspan="6" class="text-right pt-3">PPN</td>
                                    <td colspan="2">
                                        <money v-model="form.tax"
                                            class="form-control"                                                                    
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                        />   
                                    </td>
                                </tr> -->

                                <tr>
                                    <td colspan="6" class="text-right pt-3">Grand Total</td> 
                                    <td colspan="2">
                                        <money v-model="form.grand_total"
                                            class="form-control"                                                                   
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                        />   
                                    </td>
                                </tr>                                

                                <tr>
                                    <td colspan="6" class="text-right pt-3">
                                        Pembulat
                                    </td>
                                    <td colspan="2">
                                        <money v-model="form.fixed_price"
                                            class="form-control"                                                            
                                            @keyup.native="checkValidFixedPrice"            
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td colspan="6" class="text-right pt-3">Grand Total Stl Pembulatan</td>
                                    <td colspan="2">
                                        <money
                                            class="form-control"
                                            v-model="form.grand_total_and_fixed_price"
                                            disabled
                                        />                                        
                                    </td>
                                </tr>

                                <tr v-if="form.po_customer_id">
                                    <td colspan="6" class="text-right pt-3">Dp (Uang Muka)</td>
                                    <td colspan="2">                                    
                                        <money
                                            class="form-control"
                                            v-model="form.dp"                                    
                                            @keyup.native="checkValidFixedPrice"
                                        />                                                                                     
                                    </td>         
                                </tr>

                                <tr v-if="form.dp > 0.00">
                                    <td colspan="6" class="text-right pt-3">Grand Total Stl Dp</td>
                                    <td colspan="2">
                                        <money
                                            class="form-control"
                                            v-model="form.grand_total_and_dp"
                                            disabled
                                        />                                        
                                    </td>
                                </tr>                    

                                <tr>
                                    <td colspan="6" class="text-right pt-3">Ongkir</td>
                                    <td colspan="2">
                                        <money v-model="form.shipping_charge"
                                            class="form-control"                                                         
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                        />   
                                    </td>
                                </tr>
                            </table>                            
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
            title: 'Penjualaan',
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

            isStopSearchPoCustomer : false,
            isLoadingGetPoCustomer : false,
            po_customer_search : '',

            isStopSearchCustomer : false,
            isLoadingGetCustomer : false,
            customer_search : '',

            isStopSearchWarehouse : false,
            isLoadingGetWarehouse : false,
            warehouse_search : '',

            isStopSearchProduct : false,
            isLoadingGetProduct : false,
            product_search : '',

            isStopSearchSeller : false,
            isLoadingGetSeller : false,
            seller_search : '',

            isStopSearchChartOfAccount : false,
            isLoadingGetChartOfAccount : false,
            chart_of_account_search : "",

            form : {
                po_customer_id : '',
                customer_id : '',
                warehouse_id : '',
                seller_id : '',
                chart_of_account_id : "",
                code : '',
                description : '',
                date : moment().format("YYYY-MM-DD"),
                due_date : '',
                transaction_type : "CASH",
                total : 0.00,
                tax : 0.00,
                grand_total : 0.00,
                discount : 0.00,
                selling_details : [],
                discount_type : 'NOMINAL',
                payment_term : '',
                shipping_charge : 0.00,
                total_discount_nominal : 0.00,
                grand_total_and_dp : 0.00,
                dp : 0.00,
                fixed_price : 0.00,
                grand_total_and_fixed_price : 0.00,
            },

            default_form : {              
                po_customer_id : '',
                customer_id : '',
                warehouse_id : '',
                seller_id : '',
                chart_of_account_id : "",
                code : '',
                description : '',
                date : moment().format("YYYY-MM-DD"),
                due_date : '',
                transaction_type : "CASH",
                total : 0.00,
                tax : 0.00,
                grand_total : 0.00,
                discount : 0.00,
                selling_details : [],
                discount_type : 'NOMINAL',
                payment_term : '',
                shipping_charge : 0.00,
                total_discount_nominal : 0.00,
                grand_total_and_dp : 0.00,
                dp : 0.00,
                fixed_price : 0.00,
                grand_total_and_fixed_price : 0.00,
            }
        }
    },

    async created(){
        try{        
            if(this.isEditable){
                let response = await this.$axios.get("selling_module/selling/"+this.id);

                Object.keys(this.form)
                    .forEach(item => {
                        if(item != "selling_details"){
                            if(item === 'po_customer_id'){
                                this.form.po_customer_id = response.data.po_customer || '';
                            }else if (item === 'customer_id') {
                                this.form.customer_id = response.data.customer || '';
                            }else if ( item === 'warehouse_id'){
                                this.form.warehouse_id = response.data.warehouse || '';
                            }else if (item === 'seller_id'){
                                this.form.seller_id = response.data.seller || '';
                            }else if (item === 'chart_of_account_id'){
                                this.form.chart_of_account_id = response.data.chart_of_account || '';
                            }else if(item === 'total_discount_nominal'){
                                if(response.data["discount_type"] == "NOMINAL"){
                                    this.form[item] = Math.ceil( parseFloat(response.data["total"]) - parseFloat(response.data["discount"]) );
                                }else{
                                    let total_discount = parseFloat(response.data["total"]) * (parseFloat(response.data["discount"]) / 100.00);

                                    this.form[item] = Math.ceil( parseFloat(response.data["total"]) - parseFloat(total_discount) );
                                }
                            }else if(item === 'grand_total_and_fixed_price'){
                               this.form[item] = parseFloat(response.data["grand_total"]) + parseFloat(response.data["fixed_price"]);
                            }
                            else if(item === 'grand_total_and_dp'){
                                let grand_total_and_fixed_price = parseFloat(response.data["grand_total"]) + parseFloat(response.data["fixed_price"]);

                                this.form[item] = parseFloat(grand_total_and_fixed_price) - parseFloat(response.data["dp"]);
                            }else{
                                this.form[item] = response.data[item];
                            }
                        }
                    });
            
                this.form.selling_details = response.data
                    .selling_details
                    .map(item => {
                        return {
                            ...item,
                            product_id : item.product
                        }
                    });

                this.isLoadingPage = false;        
            }
        }catch(err){
            this.$router.push("/selling_module/selling");
        }
    },

    async mounted(){
        await this.onSearchPoCustomer();

        await this.onSearchCustomer();

        await this.onSearchWarehouse();

    //    await this.onSearchProduct();

        await this.onSearchSeller();

        await this.onSearchChartOfAccount();
        
        if(!this.isEditable){
            this.setCode();
        }
    },

    computed :{
        ...mapState('moduleApi',[
            'lookup_po_customers',
            'lookup_customers',
            'lookup_warehouses',
            'lookup_products',    
            'lookup_sellers',
            'lookup_chart_of_accounts',
            'code'
        ]),
        
        tax(){
            return this.$store.state.setting
                .settings
                .find(item => item.name == "tax")
                .value;
        },

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

        onGetPoCustomer(search,isNext){      
            if(!search.length && typeof isNext === "function") return false;             

            clearTimeout(this.isStopSearchPoCustomer);
            
            this.isStopSearchPoCustomer = setTimeout(() => {
                this.po_customer_search = search;

                if(typeof isNext !== "function"){
                    this.lookup_po_customers.current_page = isNext 
                        ? this.lookup_po_customers.current_page + 1 
                        : this.lookup_po_customers.current_page - 1;        
                }else{
                    this.lookup_po_customers.current_page = 1;
                }

                this.onSearchPoCustomer();
            },600);        
        },

        async onSearchPoCustomer(){
            if(!this.isLoadingGetPoCustomer){
                this.isLoadingGetPoCustomer = true;
                        
                await this.lookUp({    
                    url : "selling_module/selling/get-po-customer",
                    lookup : "po_customers",
                    query : "?search="
                        + this.po_customer_search + 
                        "&page="
                        + this.lookup_po_customers.current_page + 
                        "&per_page=10"
                })

                this.isLoadingGetPoCustomer = false;      
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
                    url : "selling_module/selling/get-customer",
                    lookup : "customers",
                    query : "?search="
                        + this.customer_search + 
                        "&page="
                        + this.lookup_customers.current_page + 
                        "&per_page=10"
                })

                this.isLoadingGetCustomer = false;      
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
                    url : "selling_module/selling/get-warehouse",
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
                    url : "selling_module/selling/get-product",
                    lookup : "products",
                    query : "?search="
                        + this.product_search + 
                        "&page=" 
                        + this.lookup_products.current_page +
                        "&per_page=5"+
                        "&customer_id="+(this.form.customer_id ? this.form.customer_id.id :"''")
                })

                this.isLoadingGetProduct = false;      
            }
        },

        onGetSeller(search,isNext){      
            if(!search.length && typeof isNext === "function") return false;             

            clearTimeout(this.isStopSearchSeller);
            
            this.isStopSearchSeller = setTimeout(() => {
                this.seller_search = search;

                if(typeof isNext !== "function"){
                    this.lookup_sellers.current_page = isNext 
                        ? this.lookup_sellers.current_page + 1 
                        : this.lookup_sellers.current_page - 1;        
                }else{
                    this.lookup_sellers.current_page = 1;
                }

                this.onSearchSeller();
            },600);        
        },

        async onSearchSeller(){
            if(!this.isLoadingGetSeller){
                this.isLoadingGetSeller = true;
                        
                await this.lookUp({    
                    url : "selling_module/selling/get-seller",
                    lookup : "sellers",
                    query : "?search="
                        + this.seller_search + 
                        "&page=" 
                        + this.lookup_sellers.current_page +
                        "&per_page=5"
                })

                this.isLoadingGetSeller = false;      
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
                url: "selling_module/selling/get-chart-of-account",
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
      
            if(!this.form.selling_details.length){
                this.$toaster.error("Detail Penjualaan Masih Kosong");
                return;
            }

            this.isLoadingForm = true;

            let url = "selling_module/selling";

            let formData = {
                ...this.form,
                po_customer_id : typeof this.form.po_customer_id == 'object'
                    ? this.form.po_customer_id.id 
                    : '',
                customer_id : typeof this.form.customer_id == 'object'
                    ? this.form.customer_id.id 
                    : '',
                warehouse_id : typeof this.form.warehouse_id == 'object'
                    ? this.form.warehouse_id.id                 
                    : '',
                seller_id : typeof this.form.seller_id == 'object'
                    ? this.form.seller_id.id 
                    : '',
                chart_of_account_id : typeof this.form.chart_of_account_id == 'object'
                    ? this.form.chart_of_account_id.id 
                    : ''
            }

            formData.selling_details = formData
                .selling_details
                .map(item => {
                    return {
                        discount : item.discount,
                        quantity : item.quantity,
                        price : item.price,
                        amount : item.amount,
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
                    " Penjualaan"
                );

                if(!this.isEditable){
                    this.form = {
                        ...this.default_form,
                        selling_details : []
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
                            process.env.API_URL + "/selling_module/selling/get-print-detail/" + id + "?token=" + token
                            ,'_blank'
                        );    
                    } 
                }
            });
        },

        async setCode(){
            await this.getCode({
                url : "selling_module/selling",
                query : ""            
            });

            this.form.code = this.code;
        },

        addDetail(){
            if(parseInt(this.limit_item_transaction) <= this.form.selling_details.length){
                this.$toaster.error("Hanya " + this.limit_item_transaction + " batas item yang di perbolehkan");
                return;
            }

            this.form.selling_details.push({
                product_id : '',
                quantity : 0.00,
                price : 0.00,
                amount : 0.00,
                discount : 0.00,
            })
        },

        deleteDetail(indexItem){
            this.form.selling_details = this.form
                .selling_details
                .filter((_,index) => index != indexItem);

            this.countTotal();
        },
 
        onChangeDiscountType(){
            this.form.selling_details.forEach((_,index) => {
                this.itemChange(index)
            });
        },

        checkValidFixedPrice(){
            let fixed_price = this.form.fixed_price;        
            let grand_total = this.form.grand_total;

            if(parseFloat(fixed_price) > parseFloat(grand_total)){
                this.form.fixed_price = 0;
            }

            if(parseFloat(fixed_price) < 0.00){
                if(Math.abs(parseFloat(fixed_price)) > parseFloat(grand_total)){
                    this.form.fixed_price = 0;
                }
            }

            this.form.grand_total_and_fixed_price = parseFloat(grand_total) + parseFloat(this.form.fixed_price);

            this.checkValidDp();
        },

        checkValidDp(){
            let dp = this.form.dp;
            let grand_total_and_fixed_price = this.form.grand_total_and_fixed_price;

            if(parseFloat(dp) > parseFloat(grand_total_and_fixed_price)){
                this.form.dp = grand_total_and_fixed_price;
            }

            this.form.grand_total_and_dp = parseFloat(grand_total_and_fixed_price) - parseFloat(this.form.dp);
        },

        itemChange(index){                
            let detail = {
                ...this.form.selling_details[index]
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

                    let total_discount =  parseFloat(detail.price) * ( parseFloat(detail.discount) / 100.00 );                   

                    detail.amount = ( parseFloat(detail.price) - parseFloat(total_discount) ) * parseFloat(detail.quantity);
                }            

                this.form.selling_details[index].amount = Math.ceil(detail.amount);

                this.form.selling_details[index].discount = detail.discount;

                this.countTotal();
            }
        },      
    
        countTotal(){            
            let { 
                total,
                discount,
                total_discount_nominal,
                tax,
                grand_total,
                discount_type,                
            }  = this.form;

            let taxSetting = this.tax;

            let details = [ ...this.form.selling_details ];        

            let total_discount = 0.00;

            total = details.reduce((amount,item) => parseFloat(amount) + parseFloat(item.amount),0.00);
        
            if(discount_type == "NOMINAL"){
                if(parseFloat(discount) > parseFloat(total) && parseFloat(total) > 0.00){
                    discount = total;                    
                }

                if(parseFloat(total) <= 0.00){
                    discount = 0.00;
                }

                total_discount = parseFloat(discount);        
            }else{
                if(parseFloat(discount) > 100.00){
                    discount = 100.00
                }
                
                if(parseFloat(total) <= 0.00){
                    discount = 0.00;                
                }

                total_discount = parseFloat(total) * ( parseFloat(discount) / 100.00 );      
            }

            total_discount_nominal = parseFloat(total) - parseFloat(total_discount);

            // tax = parseFloat(total_discount_nominal) * (parseFloat(taxSetting) / 100.00);
            tax = 0;


            grand_total = parseFloat(total_discount_nominal) + parseFloat(tax);
        
            this.form = {
                ...this.form, 
                discount,
                total_discount_nominal : Math.ceil(total_discount_nominal),
                total : Math.ceil(total),
                tax : Math.ceil(tax),
                grand_total : Math.ceil(grand_total)
            }        

            this.checkValidFixedPrice();
        },

        onSetProduct(index){            
            let details = [
                ...this.form.selling_details
            ];

            let itemProduct = {
                ...this.form.selling_details[index],            
            };

            let customer = this.form.customer_id;
           
            if(!itemProduct.product_id) {
                this.form.selling_details[index].product_id = '';
                return
            };

            let product = itemProduct.product_id;

            let product_prices = product.product_prices;
       
            let price = 0.00;

            if(
                product_prices && 
                Array.isArray(product_prices) && 
                product_prices.length && 
                customer
            ){        
                // let name  = customer.customer_group ? customer.customer_group.name : '';            

                // let product_price = product_prices.find(item => item.name.toLowerCase() == name.toLowerCase());
        
                // price = !product_price ? product_prices[0].price : product_price.price   
                price = product_price.price

            }else{            
                price = (itemProduct.price > 0.00 ? itemProduct.price : 0);
            }                

            let products = details.filter(item => (item.product_id ? item.product_id.id : 0) === product.id);

            if(products.length < 2){
                this.form.selling_details[index].price = price;

                this.itemChange(index);
            }else{
                this.$toaster.error("Product sudah ada di dalam list");
                        
                this.form.selling_details = details.filter((_,indexItem) => index != indexItem);            
            }
        },    

        onSetCustomer(customer){        
            let details = [
                ...this.form.selling_details
            ];
    
            if(customer){
                if(customer.seller){
                    this.form.seller_id = customer.seller;
                }

                details = details.map(item => {
                 if(!item.product_id){
                    return {
                        ...item,
                        price : (item.price > 0.00 ? item.price : 0.00)
                    }
                 }

                 let product_prices = item.product_id.product_prices;

                 if(
                    !product_prices || 
                    !Array.isArray(product_prices) || 
                    !product_prices.length
                ){
                    return {
                        ...item,
                        price : ( item.price > 0.00 ? item.price : 0.00 )
                    }
                 }

                //  let name = customer.customer_group ? customer.customer_group.name : '';                     

                //  let product_price = product_prices.find(item => item.name.toLowerCase() == name.toLowerCase());

                 return {
                    ...item,
                    //  price: !product_price ? product_prices[0].price : product_price.price 
                    price: product_price.price

                 }
                })
            }else{                
                this.form.customer_id = '';

                details = details.map(item => {
                    return {
                        ...item,
                        price : ( item.price > 0.00 ? item.price : 0.00 )
                    }
                })
            }

            this.form.selling_details = [
                ...details
            ];

            this.form.selling_details.forEach((_,index) => {
                this.itemChange(index)
            });
        },

        onSetPoCustomer(item){
            if(item){          
                if(item.customer){
                    if(item.customer.seller){
                        this.form.seller_id = item.customer.seller;
                    }
                }

                this.form = {
                    ...this.form,

                    customer_id : item.customer || '',

                    // date : item.date,
                    total : item.total,
                    discount : item.discount ||  0.00,
                    tax : item.tax,
                    grand_total : item.grand_total,
                    description : item.description,                
                    discount_type : item.discount_type,
                    dp : item.selling_dps_sum_amount || 0.00,

                    selling_details : item.po_customer_details 
                        .map(item => {
                            return {
                                product_id :  item.product,
                                quantity : item.quantity,
                                price : item.price,
                                amount : item.amount,
                                discount : item.discount || 0.00,
                            }
                        })
                }       

                this.form.selling_details.forEach((_,index) => {
                    this.itemChange(index);
                })      

                this.checkValidFixedPrice();
            }else{
                this.form.po_customer_id = '';
            }
        },

        onSetSeller(item){
         if(!item){    
            this.form.seller_id = '';
         }
        },

        onSetChartOfAccount(item){
            if(!item){
                this.form.chart_of_account_id = '';
            }
        },

        onChangeTransactionType(){
            if(this.form.transaction_type.toLowerCase()  !== "cash"){      
                this.form.chart_of_account_id = '';
            }
        }
    }
}
</script>
