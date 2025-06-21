<template>
  <portal to="modal">
    <div class="modal fade" 
      aria-hidden="true" 
      id="modal-form">
      <div class="modal-dialog">
        <div class="modal-content">

        <modal-header-section
          :self="this"
        />

        <ValidationObserver
          v-slot="{invalid,validate}"
          ref="form-validate">
            <form @submit.prevent="validate().then(onSubmit(invalid))"
              autocomplete="off">

            <div class="modal-body"> 
                  <div class="form-group">
                        <label for="type">
                          Jenis Department 
                        </label>
                        <select
                          class="form-control"    
                          v-model="parameters.form.jenis">
                          <option value="0">Induk</option>
                          <option value="1">Anak 1</option> 
                          <option value="2">Anak 2</option>  
                          <option value="3">Anak 3</option>                      
                        </select>                  
                  </div>   

                  <div class="form-group">
                        <label for="seller_id">Induk</label>
                        <v-select
                          label="name"
                          :loading="isLoadingGetDepartment"
                          :options="lookup_department.data"
                          :filterable="false"
                          @search="onGetDepartment"
                          @input="onChangeAnak1"

                          v-model="parameters.form.induk"

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
                              :required="!parameters.form.proces_induk_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template> -->
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_department.data.length || search"
                          >
                            <span
                              v-if="lookup_department.current_page > 1"
                              @click="onGetDepartment(search, false)"
                              class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                              >Sebelumnya</span
                            >
                            <span
                              v-if="lookup_department.last_page >
                                lookup_department.current_page
                                "
                              @click="onGetDepartment(search, true)"
                              class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>

                  <div class="form-group">
                          <label for="seller_id">Anak 2</label>
                          <v-select
                            label="name"
                            :loading="isLoadingGetDepartment2"
                            :options="lookup_custom1.data"
                            :filterable="false"
                            @search="onGetDepartment2"
                            @input="onChangeAnak2"

                            v-model="parameters.form.induk_2"

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
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="d-flex justify-content-between"
                              v-if="lookup_custom1.data.length || search"
                            >
                              <span
                                v-if="lookup_custom1.current_page > 1"
                                @click="onGetDepartment2(search, false)"
                                class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                                >Sebelumnya</span
                              >
                              <span
                                v-if="lookup_custom1.last_page >
                                  lookup_custom1.current_page
                                  "
                                @click="onGetDepartment2(search, true)"
                                class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </div>

                        <div class="form-group">
                            <label for="seller_id">Anak 3</label>
                            <v-select
                              label="name"
                              :loading="isLoadingGetDepartment3"
                              :options="lookup_custom2.data"
                              :filterable="false"
                              @search="onGetDepartment3"
                              v-model="parameters.form.induk_3"

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
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="d-flex justify-content-between"
                                v-if="lookup_custom2.data.length || search"
                              >
                                <span
                                  v-if="lookup_custom2.current_page > 1"
                                  @click="onGetDepartment3(search, false)"
                                  class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="lookup_custom2.last_page >
                                    lookup_custom2.current_page
                                    "
                                  @click="onGetDepartment3(search, true)"
                                  class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                                  >Selanjutnya</span
                                >
                              </li>
                            </v-select>
                          </div>
                          <div class="form-group">
                          <label for="seller_id">Tipe Department</label>
                          <v-select
                            label="name"
                            :loading="isLoadingGetProces"
                            :options="lookup_proces.data"
                            :filterable="false"
                            @search="onGetProces"
                            v-model="parameters.form.tipe_department_id"
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
                              :required="!parameters.form.proces_induk_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template> -->
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="d-flex justify-content-between"
                              v-if="lookup_proces.data.length || search"
                            >
                              <span
                                v-if="lookup_proces.current_page > 1"
                                @click="onGetProces(search, false)"
                                class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                                >Sebelumnya</span
                              >
                              <span
                                v-if="lookup_proces.last_page >
                                  lookup_proces.current_page
                                  "
                                @click="onGetProces(search, true)"
                                class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </div>

                  <ValidationProvider
                    name="code"
                    rules="required">
                    <div class="form-group" slot-scope="{errors,valid}">
                      <label for="code">Kode</label>
                      <input id="code"
                        type="text"
                        class="form-control"
                        name="code"
                        v-model="parameters.form.code"
                        :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                      />

                      <div class="invalid-feedback" v-if="errors[0]">
                        {{ errors[0] }}
                      </div>      
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    name="name"
                    rules="required">
                    <div class="form-group" slot-scope="{errors,valid}">
                      <label for="name">Nama</label>
                      <input id="name"
                        type="text"
                        class="form-control"
                        name="name"
                        v-model="parameters.form.name"
                        :class="errors[0] ? 'is-invalid' : (valid ? 'is-valid' : '')"
                      />               
                      <div class="invalid-feedback" v-if="errors[0]">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <div class="form-group">
                          <label for="type">
                            Status
                          </label>
                          <select
                            class="form-control"    
                            v-model="parameters.form.status">
                            <option value="1">AKTIF</option>
                            <option value="0">NON AKTIF</option> 
                          </select>                  
                    </div>   


            </div>
        
            <modal-footer-section     
              :isLoadingForm="isLoadingForm"
            />
          </form>
        </ValidationObserver>

        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {  
  middleware : ["isNotAccessable"],

  props: ["self"],

   async mounted() {
     await this.onSearchProces();
    await this.onSearchDepartment();
     await this.onSearchDepartment2();
    await this.onSearchDepartment3()

  },

  data() {
    return {
      isStopSearchProces: false,
      isLoadingGetProces: false,
      proces_search: '',

      isStopSearchDepartment: false,
      isLoadingGetDepartment: false,
      department_search: '',

      isStopSearchDepartment2: false,
      isLoadingGetDepartment2: false,
      department2_search: '',

      isStopSearchDepartment3: false,
      isLoadingGetDepartment3: false,
      department3_search: '',


      isEditable  : false,
      isLoadingForm : false,
      title: 'Proses',      
      parameters : { 
        url : 'master/department',
        // url: 'master/masterproses',

        form : {
         code : '',
          name: '',
          induk_2 :'',
          tipe_department_id:''

        },

      }
    };
  },

  computed :{
    ...mapState('moduleApi',[
      'error',
      'result',
      'code',
      "lookup_proces",
      "lookup_department",
      "lookup_custom1",
      "lookup_custom2",

    ]),  
  },

  methods: {    
    ...mapActions('moduleApi',[
       'addData',
       'updateData',
        'getCode',
        "lookUp"

    ]),

    onGetDepartment(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDepartment);

      this.isStopSearchDepartment = setTimeout(() => {
        this.department_search = search;

        if (typeof isNext !== "function") {
          this.lookup_department.current_page = isNext
            ? this.lookup_department.current_page + 1
            : this.lookup_department.current_page - 1;
        } else {
          this.lookup_department.current_page = 1;
        }

        this.onSearchDepartment();
      }, 600);
    },

    async onSearchDepartment() {
      if (!this.isLoadingGetDepartment) {
        this.isLoadingGetDepartment = true;

        await this.lookUp({
          url: "master/department",
          lookup: "department",
          query:
            "?search=" + this.department_search +
            "&page=" + this.lookup_department.current_page +
            "&jenis=0&per_page=10",
        });

        this.isLoadingGetDepartment = false;
      }
    },

    
    async onChangeAnak1() {
      clearTimeout(this.isStopSearchDepartment2);
          this.induk = '';
        // this.parameters.form.induk_2 = '';
        this.isStopSearchDepartment2 = setTimeout(() => {
        if (!this.parameters.form.induk) {
          this.parameters.form.induk_2 = '';
          this.induk = 'null';
        } else {
          this.induk = this.parameters.form.induk.id;
        }
          this.onSearchDepartment2();
        }, 20);
    },


    onGetDepartment2(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDepartment2);

      this.isStopSearchDepartment2 = setTimeout(() => {
        this.department2_search = search;
        // this.induk = this.parameters.form.induk.id;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchDepartment2();
      }, 600);
    },

    async onSearchDepartment2() {
      if (!this.isLoadingGetDepartment2) {
        this.isLoadingGetDepartment2 = true;

        await this.lookUp({
          url: "master/department",
          lookup: "custom1",
          query:
            "?search=" + this.department2_search +
            "&page=" + this.lookup_custom1.current_page +
            "&jenis=1&per_page=10&induk="+ this.induk,
        });

        this.isLoadingGetDepartment2 = false;
      }
    },

    async onChangeAnak2() {
      clearTimeout(this.isStopSearchDepartment3);
      this.induk_2 = '';
      this.isStopSearchDepartment3 = setTimeout(() => {
        if (!this.parameters.form.induk_2) {
          this.parameters.form.induk_3 = '';
          this.induk_2 = 'null';
        } else {
          this.induk_2 = this.parameters.form.induk_2.id;
        }
        this.onSearchDepartment3();
      }, 20);
    },

    onGetDepartment3(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDepartment3);

      this.isStopSearchDepartment3 = setTimeout(() => {
        this.department3_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchDepartment3();
      }, 600);
    },

    async onSearchDepartment3() {
      if (!this.isLoadingGetDepartment3) {
        this.isLoadingGetDepartment3 = true;

        await this.lookUp({
          url: "master/department",
          lookup: "custom2",
          query:
            "?search=" + this.department3_search +
            "&page=" + this.lookup_custom2.current_page +
            "&jenis=2&per_page=10&induk_2=" + this.induk_2,
        });

        this.isLoadingGetDepartment3 = false;
      }
    },

     onGetProces(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProces);

      this.isStopSearchProces = setTimeout(() => {
        this.proces_search = search;

        if (typeof isNext !== "function") {
          this.lookup_proces.current_page = isNext
            ? this.lookup_proces.current_page + 1
            : this.lookup_proces.current_page - 1;
        } else {
          this.lookup_proces.current_page = 1;
        }

        this.onSearchProces();
      }, 600);
    },

    async onSearchProces() {
      if (!this.isLoadingGetProces) {
        this.isLoadingGetProces = true;

        await this.lookUp({
          url: "master/tipe_department",
          lookup: "proces",
          query:
            "?search=" + this.proces_search +
            "&page=" + this.lookup_proces.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProces = false;
      }
    },

    async onSubmit(isInvalid){       
      if(isInvalid || this.isLoadingForm) return;            
      
      this.isLoadingForm = true;
      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          tipe_department_id: typeof this.parameters.form.tipe_department_id == 'object' && this.parameters.form.tipe_department_id
            ? this.parameters.form.tipe_department_id.id
            : '',
          induk: typeof this.parameters.form.induk == 'object' && this.parameters.form.induk
            ? this.parameters.form.induk.id
            : '',
          induk_2: typeof this.parameters.form.induk_2 == 'object' && this.parameters.form.induk_2
            ? this.parameters.form.induk_2.id
            : '',
          induk_3: typeof this.parameters.form.induk_3 == 'object' && this.parameters.form.induk_3
            ? this.parameters.form.induk_3.id
            : '',
        }
      };
      if(this.isEditable){
        await this.updateData(parameters)
      }else{ 
        await this.addData(parameters)
      }

      if (this.result == true) {      
        this.self.onLoad(this.self.parameters.params.page);  
        this.$toaster.success('Data berhasil di '+ (this.isEditable == true ? 'Diedit': 'Tambah'));
        window.$("#modal-form").modal("hide");
      }else {
        this.$globalErrorToaster(this.$toaster,this.error);      
      }

      this.isLoadingForm = false;
    },

  },
};
</script>
