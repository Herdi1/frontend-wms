<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} {{ title }}
        </h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>

      <div class="w-full">
        <ValidationObserver v-slot="{ invalid, validate }" ref="formVaidate">
          <form
            @submit.prevent="validate().then(() => onSubmit(invalid))"
            autocomplete="off"
          >
            <div class="w-full gap-3">
              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >

              <ValidationProvider name="status" rules="required">
                <div
                  class="form-group w-full items-center mb-5 flex"
                  slot-scope="{ errors, valid }"
                >
                  <label for="" class="w-4/12"
                    >Level<span class="text-danger">*</span></label
                  >
                  <select
                    class="w-full pl-2 py-1 border rounded focus:outline-none w-8/12" 
                    v-model="form.level"
                    @change="onChangeLevel"
                      :disabled="isEditable">
                      <option value="">Pilih</option>
                      <option value="1">INDUK</option>
                      <option value="2">CHILD</option>
                  </select>
                </div>
              </ValidationProvider>

              <ValidationProvider name="status" rules="" v-show="
                        form.level == 1
                      ">
                <div
                  class="form-group w-full items-center mb-5 flex"
                  slot-scope="{ errors, valid }"
                >
                  <label for="" class="w-4/12"
                    >Tipe<span class="text-danger">*</span></label
                  >
                  <select
                    class="w-full pl-2 py-1 border rounded focus:outline-none w-8/12" 
                    v-model="form.tipe"
                      @change="onChangeType"
                      :disabled="isEditable">
                      <option value="">Pilih</option>
                      <option value="HARTA">HARTA</option>
                      <option value="KEWAJIBAN">KEWAJIBAN</option>
                      <option value="MODAL">MODAL</option>
                      <option value="PENDAPATAN">PENDAPATAN</option>
                      <option value="BIAYA">BIAYA</option>
                  </select>
                </div>
              </ValidationProvider>

              <ValidationProvider
                    name="gudang_id"
                    rules="required"
                    class="w-full mt-1"
                  >
                    <div
                      slot-scope="{ errors, valid }"
                      v-show="
                        form.level == 2
                      "
                      class="form-group w-full items-center flex"
                    >
                      <label for="gudang_id" class="w-3/12"
                        >Parent <span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_coa"
                        :loading="isLoadingGetParent"
                        :options="lookup_parents.data"
                        :filterable="false"
                        @search="onGetParent"
                        v-model="form.coa_id_induk"
                        class="w-9/12"
                      >
                      <template v-slot:option="option">                    
                                                <div class="flex">
                                                    <div class="w-8/12 p-1 m-0">
                                                    {{ option.nama_coa }}
                                                    </div>
                                                    <div class="w-4/12 p-1 m-0 text-right">
                                                        {{ option.kode_coa }}
                                                    </div>
                                                </div>
                                            </template> 
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_parents.data.length || search"
                        >
                          <span
                            v-if="lookup_parents.current_page > 1"
                            @click="onGetParent(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_parents.last_page >
                              lookup_parents.current_page
                            "
                            @click="onGetParent(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider name="status" rules="required">
                <div
                  class="form-group w-full items-center mb-5 flex"
                  slot-scope="{ errors, valid }"
                >
                  <label for="" class="w-4/12"
                    >Fungsi COA<span class="text-danger">*</span></label
                  >
                  <select
                    class="w-full pl-2 py-1 border rounded focus:outline-none w-8/12" 
                    v-model="form.jenis_coa"
                      :disabled="isEditable">
                      <option value="UMUM">Umum</option>
                      <option value="SPESIFIK">Spesifik Gudang</option>
                  </select>
                </div>
              </ValidationProvider>

              <ValidationProvider
                    name="gudang_id"
                    rules=""
                    class="w-full mt-1"
                  >
                    <div
                      slot-scope="{ errors, valid }"
                      v-show="
                        form.jenis_coa == 'SPESIFIK'
                      "
                      class="form-group w-full items-center flex"
                    >
                      <label for="gudang_id" class="w-3/12"
                        >Gudang <span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_gudang"
                        :loading="isLoadingGetGudang"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetGudang"
                        v-model="form.gudang_id"
                        :reduce="(item) => item.gudang_id"
                        class="w-9/12"
                        @input="onSearchZonaGudang"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom1.data.length || search"
                        >
                          <span
                            v-if="lookup_custom1.current_page > 1"
                            @click="onGetGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom1.last_page >
                              lookup_custom1.current_page
                            "
                            @click="onGetGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>

                <div class="form-group">
                    <input-horizontal
                      label="Kode COA"
                      type="text"
                      name="Kode COA"
                      :required="true"
                      v-model="form.kode_coa"
                    />
                </div>

                 <div class="form-group">
                    <input-horizontal
                      label="Kode Referensi SAP"
                      type="text"
                      name="Kode Referensi SAP"
                      :required="true"
                      v-model="form.kode_coa_sap"
                    />
                </div>
                <div class="form-group">
                    <input-horizontal
                      label="Nama"
                      type="text"
                      name="Nama"
                      :required="true"
                      v-model="form.nama_coa"
                    />
                </div>

                
                <modal-footer-section
                  :isLoadingForm="isLoadingForm"
                  @reset="formReset()"
                />
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Chart Of Account",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

      title: "Chart Of Account",

      url: "finance/coa",
      form: {
        coa_id: "",
        tipe: "",
        level: "",
        kode_coa: "",
        kode_coa_sap: "",
        nama_coa: "",
        coa_id_induk: "",
        jenis_coa: "",
        gudang_id: "",
        
      },
      default_form: {
        coa_id: "",
        tipe: "",
        level: "",
        kode_coa: "",
        kode_coa_sap: "",
        nama_coa: "",
        gudang_id: "",
        coa_id_induk: "",
        jenis_coa: "",

      },

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchParent : false,
      isLoadingGetParent :  false,
      parent_search : '',

      user: this.$auth.user,
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get(
          "finance/coa/" + this.id
        );

        Object.keys(this.form).forEach((item) => {
            if(item === 'coa_id_induk'){
                  this.form.coa_id_induk = response.data.parent || '';
            }else{
                  this.form[item] = response.data[item];
            }
          })

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/finance/coa");
    }
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchParent();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_suppliers",
      "lookup_resellers",
      'lookup_parents'    
    ]),

   
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "finance/coa";

      if (this.user.gudang_id) {
        this.form.gudang_id = this.user.gudang_id;
      }

      let formData = {
        ...this.form,
       
         coa_id_induk : this.form.coa_id_induk
            ? this.form.coa_id_induk.coa_id 
            : this.form.coa_id_induk,   
      };

      if (this.isEditable) {
        url += "/" + this.id;
      }

      console.log(formData);
      console.log("sampe sini");
      this.$axios({
        url: url,
        method: this.isEditable ? "put" : "post",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Berhasil " +
              (this.isEditable ? "Update" : "Tambah") +
              " Chart of Account"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              jurnal_details: [],
            };
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    addJurnalDetails() {
      this.form.jurnal_details.push({
        jurnal_details_id: null,
        coa_id: null,
        divisi_id: null,
        zona_gudang_id: null,
        tipe: null,
        jumlah: 0,
        keterangan: null,
        keterangan_2: null,
        keterangan_3: null,
      });
    },

    onDeleteItem(index) {
      this.form.jurnal_details = this.form.jurnal_details.filter(
        (_, itemIndex) => index != itemIndex
      );
    },

    async formReset() {
      this.$refs.formValidate.reset();
      this.form = this.default_form;
      this.form.jurnal_details = [];
      await this.onSearchGudang();
      await this.onSearchParent();
      
    },

     onGetParent(search,isNext){      
      if(!search.length && typeof isNext === "function") return false;             

      clearTimeout(this.isStopSearchParent);
      
      this.isStopSearchParent= setTimeout(() => {
        this.parent_search = search;

        if(typeof isNext !== "function"){
          this.lookup_parents.current_page = isNext 
            ? this.lookup_parents.current_page + 1 
            : this.lookup_parents.current_page - 1;        
        }else{
          this.lookup_parents.current_page = 1;
        }

        this.onSearchParent();
      },600);        
    },

    async onSearchParent(){
      if(!this.isLoadingGetParent){
        this.isLoadingGetParent = true;
                
        await this.lookUp({    
          url : "finance/coa/get-parent",
          lookup  : 'parents',
          query : "?search=" + this.parent_search +
          "&page=" + this.lookup_parents.current_page +
          "&per_page=10"
        })

        this.isLoadingGetParent = false;      
      }
    },

    // onSetParent(item){
    //   if(item){        
    //     if(item.coa_id == this.form.coa_id) {
    //       this.$toaster.warning("Anda tidak dapat memilih parent sendiri");

    //       this.form.coa_id_induk = "";
    //     }

    //     // if(!this.isEditable){
    //     //   this.setCode();
    //     // }
    //   }else{
    //     this.form.coa_id_induk = '';
    //   }
    // },

    //gudang
    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    //coa
    onGetCoa(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoa);

      this.isStopSearchCoa = setTimeout(() => {
        this.coa_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchCoa();
      }, 600);
    },

    async onSearchCoa() {
      if (!this.isLoadingGetCoa) {
        this.isLoadingGetCoa = true;

        await this.lookUp({
          url: "finance/coa/get-coa",
          lookup: "custom2",
          query:
            "?search=" +
            this.coa_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoa = false;
      }
    },

    //divisi
    onGetDivisi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDivisi);

      this.isStopSearchDivisi = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchDivisi();
      }, 600);
    },

    async onSearchDivisi() {
      if (!this.isLoadingGetDivisi) {
        this.isLoadingGetDivisi = true;

        await this.lookUp({
          url: "master/divisi/get-divisi",
          lookup: "custom3",
          query:
            "?search=" +
            this.divisi_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDivisi = false;
      }
    },

    //jenis biaya
    onGetJenisBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisBiaya);

      this.isStopSearchJenisBiaya = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchJenisBiaya();
      }, 600);
    },

    async onSearchJenisBiaya() {
      if (!this.isLoadingGetJenisBiaya) {
        this.isLoadingGetJenisBiaya = true;

        await this.lookUp({
          url: "master/jenis-biaya/get-jenis-biaya",
          lookup: "suppliers",
          query:
            "?search=" +
            this.jenis_biaya_search +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisBiaya = false;
      }
    },

    //zona gudang
    onGetZonaGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchZonaGudang);

      this.isStopSearchZonaGudang = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_resellers.current_page = isNext
            ? this.lookup_resellers.current_page + 1
            : this.lookup_resellers.current_page - 1;
        } else {
          this.lookup_resellers.current_page = 1;
        }

        this.onSearchZonaGudang();
      }, 600);
    },

    onChangeType(){
      if(!this.isEditable){
        // this.setCode();
      }
    },

    onChangeLevel(){
      if(!this.isEditable){
        // this.setCode();
      }
    },

    async onSearchZonaGudang() {
      if (!this.isLoadingGetZonaGudang) {
        this.isLoadingGetZonaGudang = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "resellers",
          query:
            "?search=" +
            this.zona_gudang_search +
            "&gudang_id=" +
            this.form.gudang_id +
            "&page=" +
            this.lookup_resellers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetZonaGudang = false;
      }
    },
  },
};
</script>
