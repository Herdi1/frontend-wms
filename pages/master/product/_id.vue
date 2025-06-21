<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <div class="d-flex justify-content-between">
                  <h6>{{ isEditable ? "Edit" : "Tambah" }} Produk</h6>

                  <button class="btn btn-primary" @click="$router.back()">
                    <i class="fas fa-arrow-left"></i>
                    Kembali
                  </button>
                </div>
              </div>

              <ValidationObserver
                v-slot="{ invalid, validate }"
                ref="form-validate">
                <form
                  @submit.prevent="validate().then(onSubmit(invalid))"
                  autocomplete="off">
                  <div class="row">
                  <div class="col-md-6">
                  <ValidationProvider name="code" rules="required">
                    <div class="form-group" slot-scope="{ errors, valid }">
                      <label for="code">Kode                      
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="code"
                        v-model="form.code"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      />

                      <div class="invalid-feedback" v-if="errors[0]">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                  </div>
                  <div class="col-md-6">
                    <ValidationProvider name="code" rules="required">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <label for="code">Kode 2                     
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="code"
                          v-model="form.code_2"
                          :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                            "
                        />

                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                    </div>
                  </div>

                  <ValidationProvider name="name" rules="required">
                    <div class="form-group" slot-scope="{ errors, valid }">
                      <label for="name">Nama</label>
                      <input
                        type="text"
                        class="form-control"
                        name="name"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                        v-model="form.name"
                      />
                      <div class="invalid-feedback" v-if="errors[0]">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <!-- <div class="form-group">
                    <label for="name_marketplace">Nama Marketplace</label>
                    <input
                      type="text"
                      class="form-control"
                      name="name_marketplace"
                      v-model="form.name_marketplace"
                    />
                  </div> -->

                  <div class="form-group">
                    <label for="description">Deskripsi</label>
                    <textarea
                      class="form-control"
                      v-model="form.description"
                    ></textarea>
                  </div>

                  <div class="form-group">
                      <label for="description">Dimensions</label>
                      <textarea
                        class="form-control"
                        v-model="form.dimensions"
                      ></textarea>
                    </div>
                  <div class="form-group">
                    <label for="customer_id">Customer</label>
                    <v-select
                      label="name"
                      :loading="isLoadingGetCustomer"
                      :options="lookup_customers.data"
                      :filterable="false"
                      @search="onGetCustomer"
                      v-model="form.customer_id"
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
                      <!-- <template #search="{ attributes, events }">
                        <input
                          class="vs__search"
                          :required="!form.customer_id"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template> -->
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="d-flex justify-content-between"
                        v-if="lookup_customers.data.length || search"
                      >
                        <a
                          v-if="lookup_customers.current_page > 1"
                          @click="onGetSupplier(search, false)"
                          class="flex-fill bg-primary text-white text-center"
                          href="#"
                          >Sebelumnya</a
                        >
                        <a
                          v-if="
                            lookup_customers.last_page >
                            lookup_customers.current_page
                          "
                          @click="onGetSupplier(search, true)"
                          class="flex-fill bg-primary text-white text-center"
                          href="#"
                          >Selanjutnya</a
                        >
                      </li>
                    </v-select>
                  </div>

                  <div class="form-group">
                    <label for="supplier_id">Supplier</label>
                    <v-select
                      label="name"
                      :loading="isLoadingGetSupplier"
                      :options="lookup_suppliers.data"
                      :filterable="false"
                      @search="onGetSupplier"
                      v-model="form.supplier_id"
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
                      <!-- <template #search="{ attributes, events }">
                        <input
                          class="vs__search"
                          :required="!form.supplier_id"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template> -->
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="d-flex justify-content-between"
                        v-if="lookup_suppliers.data.length || search"
                      >
                        <a
                          v-if="lookup_suppliers.current_page > 1"
                          @click="onGetSupplier(search, false)"
                          class="flex-fill bg-primary text-white text-center"
                          href="#"
                          >Sebelumnya</a
                        >
                        <a
                          v-if="
                            lookup_suppliers.last_page >
                            lookup_suppliers.current_page
                          "
                          @click="onGetSupplier(search, true)"
                          class="flex-fill bg-primary text-white text-center"
                          href="#"
                          >Selanjutnya</a
                        >
                      </li>
                    </v-select>
                  </div>

                  <ValidationProvider 
                    name="product_sepesification_id" 
                    rules="required">
                    <div class="form-group" 
                      slot-scope="{ errors, valid }">
                      <label for="product_sepesification_id">Produk Group</label>
                      <!-- @change="onProductGroupChange" -->
                      <select
                        name="product_sepesification_id"
                        class="form-control"
                        
                        v-model="form.product_spesification_id"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        " disabled>
                        <option 
                          v-for="(item,index) in lookup_product_groups"
                          :value="item.id">
                          {{ item.name }}
                        </option>
                      </select>                    

                      <div class="invalid-feedback" v-if="errors[0]">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <!-- <template v-if="lookup_product_properties.length">
                    <div
                      class="row" 
                      v-for="i in Math.ceil(lookup_product_properties.length / 2)">
                      <div
                        class="col-md-6"
                        v-for="(itemcol, itemcolindex) in lookup_product_properties.slice((i - 1) * 2, i * 2)"
                        :key="itemcolindex">                       
                        <div class="form-group">                          
                          <label :for="itemcol.name">
                            {{ itemcol.name }}
                          </label>
                          <select                            
                            class="form-control"                                                   
                            :name="itemcol.name"
                            :id="'properti-' + itemcol.id + '-option'" 
                            @change="onChangeItem(itemcol)">
                            <option value="">Pilih</option>
                            <option
                              v-for="child in itemcol.childs"
                              :key="child.id"
                              :value="child.id">
                              {{ child.name }}
                            </option>
                          </select>                        
                        </div>                      

                      </div>
                    </div>
                  </template> -->

                  <div class="row">
                    <div class="col-md-6">
                      <ValidationProvider name="purchase_unit" rules="required">
                        <div class="form-group" slot-scope="{ errors, valid }">
                          <label for="purchase_unit">Satuan Beli</label>
                          <select
                            class="form-control"
                            :class="
                              errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                            "
                            v-model="form.purchase_unit"
                          >
                            <option value="">Pilih</option>
                            <option
                              v-for="item in lookup_units.data"
                              :key="item.id"
                              :value="item.name"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider name="selling_unit" rules="required">
                        <div class="form-group" slot-scope="{ errors, valid }">
                          <label for="selling_unit">Satuan Jual</label>
                          <select
                            class="form-control"
                            :class="
                              errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                            "
                            v-model="form.selling_unit"
                          >
                            <option value="">Pilih</option>
                            <option
                              v-for="item in lookup_units.data"
                              :key="item.id"
                              :value="item.name"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <ValidationProvider name="minimum_stock" rules="required">
                        <div class="form-group" slot-scope="{ errors, valid }">
                          <label for="minimum_stock">Min Stok</label>
                          <money
                            v-model="form.minimum_stock"
                            class="form-control"
                            @keydown.native="
                              $event.key === '-' ? $event.preventDefault() : null
                            "
                            :class="
                              errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                            "
                          />
                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider name="safe_stock" rules="required">
                        <div class="form-group" slot-scope="{ errors, valid }">
                          <label for="safe_stock">Aman Stok</label>
                           <money
                            v-model="form.safe_stock"
                            class="form-control"
                            @keydown.native="
                              $event.key === '-' ? $event.preventDefault() : null
                            "
                            :class="
                              errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                            "
                          />
                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="purchase_price">Harga Beli</label>
                    <money
                      v-model="form.purchase_price"
                      class="form-control"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>            

                  <div class="form-group">
                    <label for="is_tax">
                      Dengan PPN 
                    </label>
                    <select
                      class="form-control"                  
                      v-model="form.is_tax">
                      <option value="1">Ya</option>
                      <option value="0">Tidak</option>                      
                    </select>                  
                  </div>

                  <div class="form-group">
                      <label for="status_product">
                        Status Produk
                      </label>
                      <select
                        class="form-control"                  
                        v-model="form.status_product">
                        <option value="0">Umum</option>
                        <option value="1">Khusus</option>                      
                      </select>                  
                    </div>

                  <div class="form-group">
                    <label for="rack">
                      Rak
                    </label>
                    <input type="text" 
                      class="form-control"
                      v-model="form.rack"/>                               
                  </div>

                  <div class="float-right mt-4">
                    <button
                      
                      class="btn btn-primary"
                    >
                      <span v-if="isLoadingForm">
                        <i class="fas fa-circle-notch fa-spin"></i>
                      </span>
                      <span v-else>
                        Simpan
                        <i class="fas fa-save"></i>
                      </span>
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <div class="card-title">
                    <h6>Setting Harga Jual</h6>

                    <div class="clearfix mb-3">
                      <button
                        class="btn btn-primary float-right"
                        @click="addProductPrice"
                      >
                        <i class="fas fa-plus"></i> Tambah
                      </button>
                    </div>

                    <div class="table-responsive">
                      <table class="table p-0 m-0 table-sm">
                        <tr>
                          <td>Jenis Harga</td>
                          <td>Judul</td>
                          <td>Harga</td>
                          <td>Opsi</td>
                        </tr>
                        <tr
                          v-for="(item, index) in product_prices"
                          :key="item.id"
                        >
                          <td style="width: 30%">
                            <select
                              class="form-control"
                              v-model="item.name"
                              @change="checkProductPrice"
                              :id="item.id"
                            >
                              <option value="">Pilih</option>
                              <option
                                v-for="itemCustomerGroup in lookup_customer_groups.data"
                                :key="itemCustomerGroup.id"
                                :value="itemCustomerGroup.name" 
                              >
                                {{ itemCustomerGroup.name }}
                              </option>
                            </select>
                          </td>
                          <td style="width: 30%">
                            <input
                              type="text"
                              class="form-control"
                              v-model="item.title"
                            />
                          </td>
                          <td style="width: 25%">
                            <money
                              v-model="item.price"
                              class="form-control"
                              @keydown.native="
                                $event.key === '-'
                                  ? $event.preventDefault()
                                  : null
                              "
                            />
                          </td>
                          <td style="width: 10%" class="text-center">
                            <i
                              class="fas fa-trash"
                              style="cursor: pointer"
                              @click="deleteProductPrice(index)"
                            >
                            </i>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <div class="card-title">
                    <form id="form-upload" enctype="multipart/form-data">
                      <h6>Upload Gambar Produk (Max 3 Gambar)</h6>

                      <div
                        class="text-center mt-4 mb-4"
                        v-if="!preview_images.length"
                      >
                        <i class="fas fa-upload" style="font-size: 4em"></i>
                      </div>
                      <div class="text-center mt-4 mb-4" v-else>
                        <portal to="modal-coolligtbox">
                          <CoolLightBox
                            :items="preview_images"
                            :index="indexPreviewImages"
                            @close="indexPreviewImages = null"
                          />
                        </portal>

                        <div class="images-warpper">
                          <img
                            class="image-warpper"
                            v-for="(image, imageIndex) in preview_images"
                            :key="imageIndex"
                            @click="indexPreviewImages = imageIndex"
                            :src="image"
                          />
                        </div>
                      </div>

                      <div class="text-center">
                        <input
                          type="file"
                          @change="onChangeImages"
                          name="images[]"
                          multiple
                        />
                        <div
                          class="text-muted mt-3 text-info"
                          v-if="isEditable"
                        >
                          * Isi jika ingin menganti gambar
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-body" v-else>
      <div class="row">
        <div class="col-12">
          <div class="card" style="min-height: 300px">
            <div
              class="
                card-body
                d-flex
                flex-column
                justify-content-center
                align-items-center
              "
            >
              <div>Loading</div>
              <div><i class="fas fa-circle-notch fa-spin"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Products",
    };
  },

  components: {
    CoolLightBox,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) 
        ? true 
        : false,
        
      isLoadingPage: Number.isInteger(id) 
        ? true 
        : false,

      isLoadingForm: false,

      isStopSearchSupplier: false,
      isLoadingGetSupplier: false,
      supplier_search: "",

      isStopSearchCustomer: false,
      isLoadingGetCustomer: false,
      customer_search: "",

      form: {
        supplier_id: "",
        customer_id:"",
        product_spesification_id: "1",
        code: "",
        name: "",        
        purchase_unit: "",
        selling_unit: "",
        purchase_price: 0.0,
        cost_of_products_sold: 0.0,
        name_marketplace: "",
        description: "",
        safe_stock : 0,
        minimum_stock : 0,
        is_tax : 1,
        rack: '',
        status_product: '0', 
        code_2: "",
        dimensions: ''

      },

      default_form: {
        supplier_id: "",
        customer_id: "",
        product_spesification_id: "",
        code: "",
        code_2: "",
        name: "",        
        purchase_unit: "",
        selling_unit: "",
        purchase_price: 0.0,
        cost_of_products_sold: 0.0,
        name_marketplace: "",
        description: "",
        safe_stock : 0,
        minimum_stock : 0,
        is_tax : 1,
        rack: '',
        status_product: '0',
        dimensions: ''

      },      
      preview_images: [],

      indexPreviewImages: null,

      product_prices: [],

      value_ids: [],
    };
  },

  async created() {          
    this.set_lookup_product_properties([])

    this.set_lookup_product_groups([])

    if (this.isEditable) {    
      try {
        let response = await this.$axios.get("master/product/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item === "customer_id") {
            this.form.customer_id = response.data.customer;
          } else if (item === "supplier_id") {
            this.form.supplier_id = response.data.supplier;
          } else if (item === "product_spesification_id") {
            this.form.product_spesification_id = response.data.product_group 
              ? response.data.product_group.id 
              : "";
          }else {
            this.form[item] = response.data[item] === null 
              ? "" 
              : response.data[item];
          }
        });

        
         
        response.data.images.forEach(item => {
          this.preview_images.push(
            process.env.IMAGES_API_URL + "products/" + item
          );
        });

        response.data.product_details.forEach((item) => {                  
            this.value_ids.push({
              id : item.value 
                ? item.value.id 
                : 0,
              properti_id : item.value
                ? (item.value.parent ? item.value.parent.id : 0)
                : 0,              
            });                        
        })
                
        this.product_prices = response.data.product_prices;          

        this.onGetPropertie();
        
        this.isLoadingPage = false;       
      } catch (err) {
        this.$router.push("/master/product");
      }
    }
  },

  async mounted() {
    await this.onSearchSupplier();

    await this.onSearchCustomer();

    await this.lookUp({
      url: "master/product/get-product-spesification",
      lookup: "product_groups",
      query: 
        "?search=" + 
        "&all=true" +
          "&id=1" +

        "&type=GROUP"       
    });

    await this.lookUp({
      url: "master/product/get-unit",
      lookup: "units",
      query: "",
    });

    await this.lookUp({
      url: "master/product/get-customer-group",
      lookup: "customer_groups",
      query: "",
    });

    await this.lookUp({
      url: "master/product/get-customer",
      lookup: "customers",
      query: "",
    });

    if(!this.isEditable){
      this.setCode();

    }

    this.onGetPropertie()


    this.value_ids.forEach(item => {     
       document.getElementById("properti-" + item.properti_id + "-option").value = item.id;
    })    
  },

  computed: {
    ...mapState("moduleApi", [
      'code',
      "lookup_suppliers",
      "lookup_units",
      "lookup_customer_groups",
      "lookup_product_groups",
      "lookup_customers",
      "lookup_product_properties",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", [
      'getCode',
      "lookUp"
    ]), 

    ...mapMutations("moduleApi", [
      "set_lookup_product_properties",
      "set_lookup_product_groups"
    ]),

    onGetSupplier(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSupplier);

      this.isStopSearchSupplier = setTimeout(() => {
        this.supplier_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchSupplier();
      }, 600);
    },

    async onSearchSupplier() {
      if (!this.isLoadingGetSupplier) {
        this.isLoadingGetSupplier = true;

        await this.lookUp({
          url: "master/product/get-supplier",
          lookup: "suppliers",
          query:
            "?search=" + this.supplier_search +
            "&page=" + this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSupplier = false;
      }
    },

    onGetCustomer(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCustomer);

      this.isStopSearchCustomer = setTimeout(() => {
        this.customer_search = search;

        if (typeof isNext !== "function") {
          this.lookup_customers.current_page = isNext
            ? this.lookup_customers.current_page + 1
            : this.lookup_customers.current_page - 1;
        } else {
          this.lookup_customers.current_page = 1;
        }

        this.onSearchCustomer();
      }, 600);
    },

    async onSearchCustomer() {
      if (!this.isLoadingGetCustomer) {
        this.isLoadingGetCustomer = true;

        await this.lookUp({
          url: "master/product/get-customer",
          lookup: "customers",
          query:
            "?search=" + this.customer_search +
            "&page=" + this.lookup_customers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCustomer = false;
      }
    },

    async setCode(){      
      await this.getCode({
        url : "master/product"
      });

      this.form.code = this.code;    
    },
  
    addProductPrice() {
      if (this.product_prices.length >= this.lookup_customer_groups.data.length){
        this.$toaster.warning("Harga Produk tidak boleh lebih dari pelanggan group");
        return;
      }

      this.product_prices.push({
        name: "",
        title: "",
        price: 0.0,
      });
    },

    deleteProductPrice(indexItem) {
      this.product_prices = this.product_prices.filter(
        (_, index) => index != indexItem
      );
    },

    onChangeImages(event) {
      if (!event.target.files.length) return;

      if (event.target.files.length >= 4) {
        this.$toaster.error("Gambar hanya boleh 3");
        event.target.value = "";
        this.preview_images = [];
        return;
      }

      this.preview_images = [];

      for (let i = 0; i < event.target.files.length; i++) {
        let item = event.target.files[i];

        if (!["image/jpeg", "image/jpg", "image/png"].includes(item.type)) {
          this.$toaster.error("Gambar tidak valid");
          event.target.value = "";
          this.preview_images = [];
          return;
        }

        this.preview_images.push(URL.createObjectURL(item));
      }
    },

    checkProductPrice(event) {
      if (this.product_prices.filter((item) => item.name == event.target.value)
          .length > 1) {
        this.$toaster.warning("Harga ini telah ditetapkan sebelumnya");
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let formData = new FormData(document.getElementById("form-upload"));
      let url = "master/product";

      if (this.isEditable) {
        url += "/" + this.id;
        formData.append("_method", "PUT");
      }

      Object.keys(this.form).forEach(item => {
        if (item == "customer_id") {
          formData.append(
            item,
            typeof this.form.customer_id == "object"
              ? this.form.customer_id.id
              : ""
          );
        }else if(item == "supplier_id") {
          formData.append(
            item,
            typeof this.form.supplier_id == "object"
              ? this.form.supplier_id.id
              : ""
          );
        } else {
          if(item === "description"){
            console.log(this.form[item]);
          }

          formData.append(item, this.form[item]);
        }
      });

      this.product_prices.forEach((item, index) => {
        formData.append("product_prices[" + index + "][name]", item.name);
        formData.append("product_prices[" + index + "][title]", item.title);
        formData.append("product_prices[" + index + "][price]", item.price);
      });

      this.value_ids.forEach((item, index) => {            
        formData.append("product_details[" + index + "][product_spesification_id]", item.id);
      });

      this.$axios
        .post(url, formData)
        .then(res => {
          this.$toaster.success("Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Produk");

          if (this.isEditable) {
            this.form.code = res.data.code;
          } else {
            this.$refs["form-validate"].reset();

            this.form = {
              ...this.default_form,
            };

            this.indexPreviewImages = null;
            this.preview_images = [];

            this.product_prices = [];

            this.value_ids = [];          
            this.set_lookup_product_properties([])

            document.getElementById("form-upload").reset();

            this.setCode();
          }
        })
        .catch(err => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {        
          this.isLoadingForm = false;
        });
    },

    async onProductGroupChange(event) {
      this.set_lookup_product_properties([])

      if(!event.target.value){
        return;
      }

      this.value_ids = [];
  
      this.onGetPropertie()
    },

    onChangeItem(item){
      let id = document.getElementById("properti-"+item.id+"-option").value;

      if(!this.value_ids.find(itemValue => itemValue.id == item.id)){
        this.value_ids.push({   
          id : id,   
          properti_id : item.id
        });    
      }else{
        let indexValue = this.value_ids.findIndex(itemValue => itemValue.id == item.id);

        this.value_ids[indexValue] = {
          id : id,   
          properti_id : item.id
        }
      }
    },

    async onGetPropertie(){ 
       await this.lookUp({
        url: "master/product/get-product-spesification",
        lookup: "product_properties",
        query: 
          "?search=" + 
          "&all=true" +
          "&type=PROPERTIE" + 
          // "&parent_id= 1" + this.form.product_spesification_id,

          "&parent_id= 1",
      });

    }
  },
};

</script>

<style scoped>
.images-warpper {
  text-align: center;
  width: 100%;
}

.images-warpper > .image-warpper {
  margin-bottom: 20px;
  width: 100px;
  object-fit: contain;
  margin-right: 20px;
  cursor: pointer;
}
</style>