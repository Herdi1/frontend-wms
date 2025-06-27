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
                            }} Po Supplier
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
                                                    <label for="date">Tgl </label>
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
                                            <div class="col-sm-2 align-self-center">
                                                <label for="supplier_id">Supplier </label>
                                            </div>
                                            <div class="col-sm-10 align-self-center">
                                                <v-select                           
                                                    label="name"   
                                                    :loading="isLoadingGetSupplier"
                                                    :options="lookup_suppliers.data"
                                                    :filterable="false"
                                                    @search="onGetSupplier"
                                                    @input="onSetSupplier"
                                                    v-model="form.supplier_id">              
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
                                                        :required="!form.supplier_id"
                                                        v-bind="attributes"
                                                        v-on="events"
                                                        />
                                                    </template>   
                                                    <li slot-scope="{search}" slot="list-footer"
                                                        class="d-flex justify-content-between"
                                                        v-if="lookup_suppliers.data.length || search">
                                                        <span v-if="lookup_suppliers.current_page > 1" 
                                                            @click="onGetSupplier(search,false)"
                                                            class="flex-fill bg-primary text-white text-center"
                                                            style="cursor:pointer">Sebelumnya</span>
                                                        <span v-if="lookup_suppliers.last_page > lookup_suppliers.current_page" 
                                                            @click="onGetSupplier(search,true)"
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
                                <div class="col-sm-6">                                                                               
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-2 align-self-center">
                                                <label for="address">Alamat </label>
                                            </div>
                                            <div class="col-sm-9 align-self-center ml-0 pr-5 pl-0">
                                                <textarea            
                                                    :value="form.supplier_id ? form.supplier_id.address : '-'"
                                                    class="form-control"
                                                    :disabled="true"></textarea>   
                                            </div>
                                        </div>                             
                                    </div>
                                </div>    

                                <!-- <div class="col-sm-6">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-2 align-self-center">
                                                <label for="type_discount">Disc</label>
                                            </div>
                                            <div class="col-sm-10 align-self-center">
                                            <select
                                                class="form-control form-control-sm"
                                                v-model="form.discount_type"
                                                @change="onChangeDiscountType()"
                                                >
                                                <option value="NOMINAL">Nominal (Rp)</option>
                                                <option value="PERCENT">Persen (%)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                             </div>                     -->
                             <!-- {{ lookup_units.data.data }} -->
                             <div class="col-sm-6">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-sm-2 align-self-center">
                                                    <label for="type_discount">PPN</label>
                                                </div>
                                                <div class="col-sm-10 align-self-center">
                                                <select
                                                    class="form-control form-control-sm"
                                                    v-model="form.tipe_vat_id"
                                                    >
                                                    <!-- <option value="">Pilih</option> -->
                                                    <option
                                                        v-for="item in lookup_units.data.data"
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
                            </div>

                            <div class="d-flex flex-row">    
                                <div class="col-sm-6">
                                <div class="form-group">
                                    <div class="row">
                                    <div class="col-sm-4 align-self-center mr-0 pr-0">
                                        <label for="due_date">Tgl Kirim</label>
                                    </div>
                                    <div class="col-sm-8 align-self-center ml-0 pl-0">
                                        <input
                                        type="date"
                                        class="form-control"
                                        name="due_date"
                                        v-model="form.date_send"
                                        />
                                    </div>
                                    </div>
                                </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div class="row">
                                        <div class="col-sm-2 align-self-center mr-0">
                                            <label for="chart_of_account_id">
                                            C/F Category
                                            </label>
                                        </div>
                                        <div class="col-sm-10 align-self-center ">
                                            <v-select label="name" :loading="isLoadingGetChartOfAccount"
                                            :options="lookup_chart_of_accounts.data" :filterable="false" @search="onGetChartOfAccount"
                                            @input="onSetChartOfAccount" v-model="form.chart_of_account_id"
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
                                                <input class="vs__search" :required="!form.chart_of_account_id" v-bind="attributes"
                                                v-on="events" />
                                            </template>
                                            <li slot-scope="{ search }" slot="list-footer" class="d-flex justify-content-between"
                                                v-if="lookup_chart_of_accounts.data.length || search">
                                                <span v-if="lookup_chart_of_accounts.current_page > 1"
                                                @click="onGetChartOfAccount(search, false)" class="
                                                flex-fill
                                                bg-primary
                                                text-white text-center
                                            " style="cursor: pointer">Sebelumnya</span>
                                                <span v-if="lookup_chart_of_accounts.last_page >
                                                    lookup_chart_of_accounts.current_page
                                                    " @click="onGetChartOfAccount(search, true)" class="
                                                flex-fill
                                                bg-primary
                                                text-white text-center
                                            " style="cursor: pointer">Selanjutnya</span>
                                            </li>
                                            </v-select>
                                            <div class="text-info">*Jika tidak diisi maka akan mengambil default</div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                
                           </div>

                            <div class="d-flex flex-row">   
    <div class="col-sm-6">
                                        <div class="form-group">
                                             <div class="row">
                                                <div class="col-sm-2 align-self-center">
                                                    <label for="supplier_id">Term Pembayaran </label>
                                                </div>
                                                <div class="col-sm-10 align-self-center">
                                                    <v-select                           
                                                        label="name"   
                                                        :loading="isLoadingGetTerm"
                                                        :options="lookup_custom1.data"
                                                        :filterable="false"
                                                        @search="onGetTerm"
                                                        @input="onSetTerm"
                                                        v-model="form.payterm_id">              
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
                                                            :required="!form.payterm_id"
                                                            v-bind="attributes"
                                                            v-on="events"
                                                            />
                                                        </template>   
                                                        <li slot-scope="{search}" slot="list-footer"
                                                            class="d-flex justify-content-between"
                                                            v-if="lookup_custom1.data.length || search">
                                                            <span v-if="lookup_custom1.current_page > 1" 
                                                                @click="onGetTerm(search, false)"
                                                                class="flex-fill bg-primary text-white text-center"
                                                                style="cursor:pointer">Sebelumnya</span>
                                                            <span v-if="lookup_custom1.last_page > lookup_custom1.current_page" 
                                                                @click="onGetTerm(search, true)"
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
                                            <div class="col-sm-4 align-self-center mr-0 pr-0">
                                                <label for="due_date">Tgl Tempo</label>
                                            </div>
                                            <div class="col-sm-8 align-self-center ml-0 pl-0">
                                                <input
                                                type="date"
                                                class="form-control"
                                                name="due_date"
                                                v-model="form.due_date"
                                                :required="form.transaction_type == 'CREDIT'"
                                                />
                                            </div>
                                            </div>
                                        </div>
                                        </div> 
                            </div>

                             <div class="d-flex flex-row">   
        <div class="col-sm-6">
                                            <div class="form-group">
                                                 <div class="row">
                                                    <div class="col-sm-2 align-self-center">
                                                        <label for="supplier_id">No Kontrak</label>
                                                    </div>
                                                    <div class="col-sm-10 align-self-center">
                                                        <input
                                                    type="text"
                                                    class="form-control"
                                                    name="due_date"
                                                    v-model="form.no_kontrak"
                                                    />       
                                                    </div>
                                                 </div>                                                      
                                            </div>
                                        </div>

                                    <div class="col-sm-6">
                                            <div class="form-group">
                                                <div class="row">
                                                <div class="col-sm-4 align-self-center mr-0 pr-0">
                                                    <label for="due_date">Biaya Lainnya</label>
                                                </div>
                                                <div class="col-sm-8 align-self-center ml-0 pl-0">
                                                     <money v-model="form.biaya_lain"
                                                        class="form-control"    
                                                        @keyup.native="countTotal"                                                               
                                                        @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                                    />  
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
                                        style="width:7%">Kode</td>
                                    <td class="text-left table-transaction-header"
                                        style="width: 8%">P/R</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:40%">Product</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:5%">Unit</td>   
                                    <td
                                        class="text-left table-transaction-header"
                                        style="width: 7%"
                                    >
                                        Grade
                                    </td>                                      
                                    <td class="text-left table-transaction-header"
                                        style="width:7%">Qty</td>                                        
                                    <td class="text-left table-transaction-header"
                                        style="width:10%">Harga</td>
                                    <!-- <td class="text-left table-transaction-header"
                                        style="width: 6%">
                                        Discount
                                        <span v-if="form.discount_type == 'NOMINAL'"> Rp </span>
                                        <span v-else> % </span>
                                    </td>
                                    <td class="text-left table-transaction-header"
                                        style="width:8%">PPN</td> -->
                                    <td class="text-left table-transaction-header"
                                        style="width:10%">Total</td>
                                    <td class="text-left table-transaction-header"
                                        style="width:1%">Opsi</td>
                                </tr>

                                <tr v-for="item,index in form.po_supplier_details"
                                    :key="index">
                                    <td class="table-transaction-row">
                                        <input type="text" 
                                            class="form-control"
                                            :value="item.product_id ? item.product_id.product.code : '-'"
                                            disabled
                                        />     

                                    </td>

                                    <td class="table-transaction-row">
                                         
                                            <input type="text" 
                                                class="form-control"
                                                :value="item.product_id ? item.product_id.permintaan_pembeliaan.code : '-'"
                                                disabled
                                            />        
                                        </td>

                                    <td class="table-transaction-row">
                                        <v-select                           
                                            :getOptionLabel="name => item.product_id ? item.product_id.product.name : '-'" 
                                            :loading="isLoadingGetProduct"
                                            :options="lookup_products.data"
                                            :filterable="false"
                                            @search="onGetProduct"
                                            @input="onSetProduct(index)"
                                            v-model="item.product_id">              
                                            <template v-slot:option="option">                    
                                                <div class="row">
                                                    <div class="col-md-3 p-1 m-0">
                                                        {{ option.permintaan_pembeliaan.code }}
                                                        </div>
                                                    <div class="col-md-7 p-1 m-0">
                                                    {{ option.product.name }}
                                                    </div>
                                                    <div class="col-md-2 p-1 m-0 text-right">
                                                        {{ option.product.code }}
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
                                            :value="item.product_id ? item.product_id.product.purchase_unit : '-'"
                                            disabled
                                        /> 
                                    </td>
                                    <td class="table-transaction-row">
                          <v-select
                            label="code"
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
                                        <money v-model="item.quantity"
                                                class="form-control"                                                                              
                                                @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                                @keyup.native="itemChange(index)"
                                            />   
                                        <!-- <money 
                                                :value="item.product_id ? item.product_id.quantity : ''"

                                            class="form-control"                                                                              
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                            @keyup.native="itemChange(index)"
                                        />                                            -->
                                    </td>
                                    <td class="table-transaction-row">
                                        <money v-model="item.price"
                                            class="form-control"                                                                              
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                            @keyup.native="itemChange(index)"
                                        />            
                                        <!-- <money
                                                :value="item.product_id ? item.product_id.price: ''"

                                                class="form-control"                                                                              
                                                @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                                @keyup.native="itemChange(index)"
                                            />                                    -->
                                    </td>
                                    <!-- <td class="table-transaction-row">
                                        <money
                                            v-model="item.discount"
                                            class="form-control"
                                            @keydown.native="
                                            $event.key === '-' ? $event.preventDefault() : null
                                            "
                                            @keyup.native="itemChange(index)"
                                        />
                                    </td>
                                    <td class="table-transaction-row">
                                        <money
                                            v-model="item.tax"
                                            class="form-control"
                                            @keydown.native="
                                            $event.key === '-' ? $event.preventDefault() : null
                                            "
                                            @keyup.native="itemChange(index)"
                                        />
                                    </td> -->
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

                                <tr v-if="!form.po_supplier_details.length">
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
                                    <td colspan="4"
                                        class="text-right pt-3">Total
                                    </td>
                                    <td colspan="2">
                                        <money v-model="form.total"
                                            class="form-control"                                                                   
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                        />   
                                    </td>
                                </tr>              

                                <tr>                                 
                                    <td colspan="7" class="text-right pt-3">
                                        Discount

                                        <div class="text-muted text-small">
                                            <span v-if="form.discount_type == 'NOMINAL'">
                                            * Rp
                                            </span>
                                            <span v-else> * % </span>
                                        </div>
                                    </td>
                                    <td colspan="2">
                                        <money
                                            v-model="form.discount"
                                            class="form-control"
                                            @keydown.native="
                                            $event.key === '-' ? $event.preventDefault() : null
                                            "
                                            @keyup.native="countTotal"
                                        />
                                    </td>
                                </tr>

                                <tr v-if="form.discount > 0.0">
                                    <td colspan="7" class="text-right pt-3">
                                    Total Stl Discount
                                    </td>
                                    <td colspan="2">
                                    <money
                                        v-model="form.total_discount_nominal"
                                        class="form-control"
                                        @keydown.native="
                                        $event.key === '-' ? $event.preventDefault() : null
                                        "
                                        disabled
                                    />
                                    </td>
                                </tr>
                                <tr v-if="form.tipe_vat_id == 2">                                 
                                        <td colspan="7" class="text-right pt-3">
                                            Tax
                                        </td>
                                        <td colspan="2">
                                             <money
                                                    v-model="form.tax"
                                                    class="form-control"
                                                    @keydown.native="
                                                        $event.key === '-' ? $event.preventDefault() : null
                                                        "
                                                    @keyup.native="countTotal"
                                                />
                                        </td>
                                    </tr>
    
                                 <tr>                                     
                                    <td colspan="7"
                                        class="text-right pt-3">Grand Total</td> 
                                    <td colspan="2">
                                        <money v-model="form.grand_total"
                                            class="form-control"    
                                            readonly                                                              
                                            @keydown.native="$event.key === '-' ? $event.preventDefault() : null"
                                        />   
                                    </td> 
                                </tr>                                      
                            </table>
                            
                            <div class="mt-5 mb-5"
                                style="height: 60px">                                
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
            title: 'Po Supplier',
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

            isStopSearchSupplier : false,
            isLoadingGetSupplier : false,
            supplier_search : '',

            isStopSearchProduct : false,
            isLoadingGetProduct : false,
            product_search: '',

            isStopSearchGrade: false,
            isLoadingGetGrade: false,
            grade_search: "",

            isStopSearchChartOfAccount: false,
            isLoadingGetChartOfAccount: false,
            chart_of_account_search: "",

            isStopSearchTerm: false,
            isLoadingGetTerm: false,
            term_search: "",

            form : {
                supplier_id : '',
                code: '',
                tipe_vat_id: 1,
                payterm_id: '',
                due_date: moment().format("YYYY-MM-DD"),
                chart_of_account_id: "",
                description : '',
                date : moment().format("YYYY-MM-DD"),
                total: 0.0,        
                discount: 0.0,
                no_kontrak: "",
                date_send: "",
                grand_total: 0.00,
                tax: 0.0,
                biaya_lain: 0.00, 
                total_discount_nominal : 0.00,
                discount_type : 'NOMINAL',
                po_supplier_details : [],
            },

            default_form : {
                supplier_id : '',
                code: '',
                tipe_vat_id: 1,
                payterm_id: '',
                due_date: moment().format("YYYY-MM-DD"),
                chart_of_account_id: "",
                description : '',
                date : moment().format("YYYY-MM-DD"),
                total: 0.0,   
                no_kontrak: "",   
                date_send: "",
                discount: 0.0,
                tax: 0.0,
                grand_total: 0.00,
                biaya_lain: 0.00,
                total_discount_nominal : 0.00,
                discount_type : 'NOMINAL',
                po_supplier_details : [],
            }
        }
    },

    async created(){
        try{        
            if(this.isEditable){
                let response = await this.$axios.get("purchaseing_module/po_supplier/"+this.id);

                Object.keys(this.form)
                    .forEach(item => {
                        if(item != "po_supplier_details"){
                            if(item === 'supplier_id'){
                                this.form.supplier_id = response.data.supplier || '';
                            }else if (item === "total_discount_nominal") {
                                if (response.data["discount_type"] == "NOMINAL") {
                                    this.form[item] = Math.ceil(
                                    parseFloat(response.data["total"]) -
                                        parseFloat(response.data["discount"])
                                    );
                                } else {
                                    let total_discount =
                                    parseFloat(response.data["total"]) *
                                    (parseFloat(response.data["discount"]) / 100.0);

                                    this.form[item] = Math.ceil(
                                    parseFloat(response.data["total"]) -
                                        parseFloat(total_discount)
                                    );
                                }
                            } else if (item === 'payterm_id') {
                                this.form.payterm_id = response.data.payterm || '';
                            } else{
                                this.form[item] = response.data[item];
                            }
                        }
                    });
            
                this.form.po_supplier_details = response.data
                    .po_supplier_details
                    .map(item => {
                        return {
                            ...item,
                            product_id: item.detail_permintaan_pembelian,
                            grade_id: item.grade
                        }
                    });

                this.isLoadingPage = false;        
            }
        }catch(err){
            this.$router.push("/purchaseing_module/po_supplier");
        }
    },

    async mounted(){
        await this.onSearchSupplier();
        await this.onSearchGrade();
        await this.onSearchTerm();
        await this.onSearchProduct();
        await this.onSearchChartOfAccount();

        if(!this.isEditable){
            this.setCode();
        };

        await this.lookUp({
            url: "master/tipe_vat/get-tipe-vat",
            lookup: "units",
            query: "?sort=asc",
        });
    },

    computed :{
        ...mapState('moduleApi',[
            'lookup_suppliers',
            'lookup_products', 
            "lookup_grade",
            "lookup_units",
            "lookup_custom1",
            "lookup_chart_of_accounts",
            'code'
        ]),
        
        tax(){
            return this.$store.state.setting.settings
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

        onGetTerm(search, isNext) {
            if (!search.length && typeof isNext === "function") return false;

            clearTimeout(this.isStopSearchTerm);

            this.isStopSearchTerm = setTimeout(() => {
                this.term_search = search;

                if (typeof isNext !== "function") {
                    this.lookup_custom1.current_page = isNext
                        ? this.lookup_custom1.current_page + 1
                        : this.lookup_custom1.current_page - 1;
                } else {
                    this.lookup_custom1.current_page = 1;
                }

                this.onSearchTerm();
            }, 600);
        },

        async onSearchTerm() {
            if (!this.isLoadingGetTerm) {
                this.isLoadingGetTerm = true;

                await this.lookUp({
                    url: "master/payterm/get-payterm",
                    lookup: "custom1",
                    query:
                        "?search=" + this.term_search +
                        "&page=" + this.lookup_custom1.current_page +
                        "&per_page=5&sort=asc",
                });

                this.isLoadingGetTerm= false;
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
                    url: "purchaseing_module/purchaseing/get-chart-of-account",
                    lookup: "chart_of_accounts",
                    query:
                        "?search=" +
                        this.chart_of_account_search +
                        "&page=" +
                        this.lookup_chart_of_accounts.current_page +
                        "&per_page=10" +
                        "&transaction_type=" + this.form.transaction_type
                });

                this.isLoadingGetChartOfAccount = false;
            }
        },

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

        onGetSupplier(search,isNext){      
            if(!search.length && typeof isNext === "function") return false;             

            clearTimeout(this.isStopSearchSupplier);
            
            this.isStopSearchSupplier = setTimeout(() => {
                this.supplier_search = search;

                if(typeof isNext !== "function"){
                    this.lookup_suppliers.current_page = isNext 
                        ? this.lookup_suppliers.current_page + 1 
                        : this.lookup_suppliers.current_page - 1;        
                }else{
                    this.lookup_suppliers.current_page = 1;
                }

                this.onSearchSupplier();
            },600);        
        },

        async onSearchSupplier(){
            if(!this.isLoadingGetSupplier){
                this.isLoadingGetSupplier = true;
                        
                await this.lookUp({    
                    url : "purchaseing_module/po_supplier/get-supplier",
                    lookup : "suppliers",
                    query : "?search="
                        + this.supplier_search + 
                        "&page="
                        + this.lookup_suppliers.current_page + 
                        "&per_page=10"
                })

                this.isLoadingGetSupplier = false;      
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
                    // url: "purchaseing_module/po_supplier/get-product",
                    url : "purchaseing_module/po_supplier/get-product-pr",
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

            if(!this.form.po_supplier_details.length){
                this.$toaster.error("Detail Po Supplier Masih Kosong");
                return;
            }
      
            this.isLoadingForm = true;

            let url = "purchaseing_module/po_supplier";

            let formData = {
                ...this.form,
                supplier_id : typeof this.form.supplier_id == 'object'
                    ? this.form.supplier_id.id 
                    : '',
                payterm_id: typeof this.form.payterm_id == 'object'
                    ? this.form.payterm_id.id
                    : '',
                chart_of_account_id: typeof this.form.chart_of_account_id == 'object' && this.form.chart_of_account_id
                    ? this.form.chart_of_account_id.id
                    : '',
            }

            formData.po_supplier_details = formData
                .po_supplier_details
                .map(item => {
                    return {
                        quantity : item.quantity,
                        price : item.price,
                        amount : item.amount,
                        discount: item.discount,
                        tax: item.tax,

                        fcprice: typeof item.product_id == 'object'
                            ? item.product_id.fcprice
                            : '',
                       product_id : typeof item.product_id == 'object'
                            ? item.product_id.product_id 
                            : '',
                        grade_id:
                            typeof item.grade_id == "object" && item.grade_id
                                ? item.grade_id.id
                                : "",
                        permintaan_pembelian_id:
                            typeof item.product_id == "object"
                                ? item.product_id.permintaan_pembelian_id
                                : "",
                        detail_permintaan_pembelian_id:
                            typeof item.product_id == "object"
                                ? item.product_id.id
                                : "",
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
                    " Po Supplier"
                );

                if(!this.isEditable){
                    this.form = {
                        ...this.default_form,
                        po_supplier_details : []
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
                            process.env.API_URL + "/purchaseing_module/po_supplier/get-print-detail/" + id + "?token=" + token
                            ,'_blank'
                        );    
                    } 
                }
            });
        },

        async setCode(){
            await this.getCode({
                url : "purchaseing_module/po_supplier",
                query : ""            
            });

            this.form.code = this.code;
        },

        addDetail(){
            if(parseInt(this.limit_item_transaction) <= this.form.po_supplier_details.length){
                this.$toaster.error("Hanya " + this.limit_item_transaction + " batas item yang di perbolehkan");
                return;
            }

            this.form.po_supplier_details.push({
                product_id : '',
                quantity : 0.00,
                price : 0.00,
                discount : 0.00,
                tax : 0.00,
                amount : 0.00
            })
        },

        deleteDetail(indexItem){
            this.form.po_supplier_details = this.form.po_supplier_details
                .filter((_,index) => index != indexItem);

            this.countTotal();
        },

        itemChange(index){
            let detail = {
                ...this.form.po_supplier_details[index]
            };

            let discount_type = this.form.discount_type;

            if(
                parseFloat(detail.quantity) >= 0.00
                &&
                parseFloat(detail.price) >= 0.00
            ){        
                if (discount_type == "NOMINAL") {
                    if (parseFloat(detail.discount) > parseFloat(detail.price)) {
                        detail.discount = parseFloat(detail.price);
                    }

                    detail.amount = (parseFloat(detail.price) - parseFloat(detail.discount)) *
                        parseFloat(detail.quantity);
                } else {
                    if (parseFloat(detail.discount) > 100.0) {
                        detail.discount = 100.0;
                    }

                    if (parseFloat(detail.discount) <= 0.0) {
                        detail.discount = 0.0;
                    }

                    let total_discount = (parseFloat(detail.price) * parseFloat(detail.discount)) / 100;

                    detail.amount = (parseFloat(detail.price) - total_discount) * parseFloat(detail.quantity);
                }

                if(
                    this.form.po_supplier_details[index].product_id 
                    &&
                    this.form.po_supplier_details[index].product_id.is_tax
                ){          
                    this.form.po_supplier_details[index].tax = parseFloat(Math.ceil(detail.amount)) * (this.tax / 100);          
                }else{
                    this.form.po_supplier_details[index].tax = 0;
                }

                this.form.po_supplier_details[index].amount = parseFloat(Math.ceil(detail.amount)) + this.form.po_supplier_details[index].tax;

                this.form.po_supplier_details[index].discount = detail.discount;

                this.countTotal();
            }
        },
    
        countTotal(){
            let { 
                total,
                discount,
                total_discount_nominal,
                grand_total,
                tipe_vat_id,
                discount_type,
                biaya_lain,
            }  = this.form;

            let taxSetting = this.tax;

            let details = [ ...this.form.po_supplier_details ];        
            let total_discount = 0.0;
            let total_tax = 0.0;

            total = details.reduce(
                (amount, item) => parseFloat(amount) + parseFloat(item.amount),
                0.0
            );

            if (discount_type == "NOMINAL") {
                if (
                    parseFloat(discount) > parseFloat(total) &&
                    parseFloat(total) > 0.0
                ) {
                    discount = total;
                }

                if (parseFloat(total) <= 0.0) {
                    discount = 0.0;
                }

                total_discount = parseFloat(discount);
            } else {
                if (parseFloat(discount) > 100.0) {
                    discount = 100.0;
                }

                if (parseFloat(total) <= 0.0) {
                    discount = 0.0;
                }

                total_discount = (parseFloat(total) * parseFloat(discount)) / 100.0;
            }

            if (tipe_vat_id == 2) {
                total_tax = (parseFloat(total) - parseFloat(total_discount)) * (parseFloat(taxSetting) / 100.0);
            }

            total_discount_nominal = parseFloat(total) - parseFloat(total_discount) +  parseFloat(biaya_lain) + parseFloat(total_tax);

            grand_total  = total_discount_nominal;

            this.form = {
                ...this.form,
                discount,
                total_discount_nominal: Math.ceil(total_discount_nominal),
                total: Math.ceil(total), 
                tax: Math.ceil(total_tax),
                grand_total: Math.ceil(grand_total),
            };
        },

        onSetProduct(index){
            let details = [
                ...this.form.po_supplier_details
            ];

            let itemProduct = {
                ...this.form.po_supplier_details[index]            
            };

            if(!itemProduct.product_id) {
                this.form.po_supplier_details[index].product_id = '';
                return
            };

            let product = itemProduct.product_id;

            let products = details.filter(item => (item.product_id ? item.product_id.id : 0) === product.id);            

            if(products.length < 2){
                this.form.po_supplier_details[index].price = product.price  
                this.form.po_supplier_details[index].quantity = product.quantity
                this.itemChange(index);
            }else{
                this.$toaster.error("Product sudah ada di dalam list");
                
                this.form.po_supplier_details = details.filter((_,indexItem) => index != indexItem);
            }        
        },

        onChangeDiscountType() {
            this.form.po_supplier_details.forEach((_, index) => {
                this.itemChange(index);
            });
        },

        onSetSupplier(item){
            if(!item){
                this.form.supplier_id = '';
            }
        },

        onSetTerm(item) {
            if (item) {
                let credit = item.credit; 
                let tgl = this.form.date;
                this.form.due_date = moment(tgl).add(credit, 'd').format('YYYY-MM-DD');
            }
        }
    }
}
</script>

