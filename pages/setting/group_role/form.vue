<template>
  <portal to="modal">
    <div class="modal fade" 
      aria-hidden="true" 
      id="modal-form">
      <div class="modal-dialog modal-lg">
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
                <label for="type_option">Opsi Pilihan</label>
                <select class="form-control" v-model="parameters.form.type_option">
                  <option value="chcekbox">Checkbox</option>
                  <option value="multiselect">Multiselect</option>                    
                </select>
              </div>
              
              <div>
                <a href="#" class="btn btn-primary"
                  @click="onAddGrant">
                  <i class="fas fa-plus"></i>
                </a>

                <div class="table-responsive"
                  style="max-height:500px"
                  :style="parameters.form.grants.length 
                    ? 'min-height:500px'
                    : ''">
                  <table class="table">
                    <tr>
                      <td style="width:300px">Hak Akses</td>
                      <td
                        style="width:400px">
                        Operator                      
                      </td>
                      <td>Opsi</td>
                    </tr>
                    <tr v-for="item,index in parameters.form.grants"
                      :key="index"
                      style="border-top:0.5px solid lightgray">
                      <td>                        
                       <v-select           
                        label="title"   
                        :loading="isLoadingGetRole"
                        :options="filter_lookup_roles"
                        :filterable="false"
                        @search="onGetRole"
                        v-model="item.role_id"
                        :required="true">     
                        <template v-slot:option="option">   
                          <div class="row">
                            <div class="col-md-5 p-1 m-0">
                              {{ option.title }}
                            </div>
                            <div class="col-md-7 p-1 m-0 text-right">
                              {{ option.parent ? option.parent.title : '-' }}
                            </div>
                          </div>                 
                        </template> 
                        <template #search="{attributes, events}">
                          <input
                            class="vs__search"
                            :required="!item.role_id"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>        
                        <li slot-scope="{search}" slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_roles.data.length || search">
                          <span v-if="lookup_roles.current_page > 1" 
                            @click="onGetRole(search,false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Sebelumnya</span>
                          <span v-if="lookup_roles.last_page > lookup_roles.current_page" 
                            @click="onGetRole(search,true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer"
                            >Selanjutnya</span>
                        </li> 
                      </v-select>                                  
                      </td>
                      <td>
                        <div v-if="parameters.form.type_option == 'multiselect'">
                          <multiselect 
                            :options="options"
                            v-model="item.operators" 
                            :multiple="true" 
                            :taggable="true"
                            openDirection="bottom"
                            @tag="addTag">
                            <template slot="option" slot-scope="props">                        
                              <div class="option__desc">
                                <span class="option__title">
                                  <span class="text-small"
                                    v-if="props.option == 'all'">
                                    semua operator
                                  </span>            
                                  <span class="text-small"
                                    v-else-if="props.option == 'index'">
                                    lihat data
                                  </span>
                                  <span class="text-small"
                                    v-else-if="props.option == 'store'">
                                    tambah data
                                  </span>
                                  <span class="text-small"
                                    v-else-if="props.option == 'update'">
                                    update data
                                  </span>
                                  <span class="text-small"
                                    v-else-if="props.option == 'destroy'">
                                    hapus data 
                                  </span>
                                  <span class="text-small"
                                    v-else-if="props.option == 'restore'">
                                    pulihkan data
                                  </span>
                                  <span class='text-small'
                                    v-else-if="props.option == 'print'">
                                    print data pdf
                                  </span>
                                  <span class="text-small"
                                    v-else-if="props.option == 'export'">
                                    export data pdf/excel
                                  </span>
                                  <span class="text-small"
                                    v-else-if="props.option== 'export_pdf'">                      
                                    export data pdf                                  
                                  </span>
                                  <span class="text-small"
                                    v-else-if="props.option == 'export_excel'">                            
                                    export data excel                                  
                                  </span>
                                  <span class="text-small"
                                    v-else-if="props.option == 'show'">
                                    lihat detail data
                                  </span>
                                  <span class="text-small"
                                    v-else-if="props.option == 'destroy-all'">
                                    hapus banyak data
                                  </span>
                                  <span class="text-small"
                                    v-else-if="props.option == 'restore-all'">
                                    pulihkan banyak data
                                  </span>                               
                                  <span class="text-small"
                                    v-else-if="props.option == 'import'">
                                    import file ke database
                                  </span>
                                  <span class="text-small"
                                    v-else-if="props.option == 'import-template'">
                                    download template import
                                  </span>
                                </span>
                              </div>
                            </template>
                          </multiselect>
                        </div>
                        <div v-else>
                          <div class="row">
                            <div class="col-md-6 mt-2"
                              v-for="(itemOption,index) in options"
                              :key="index">
                              <input type="checkbox" 
                                :value="itemOption"  
                                v-model="item.operators" />
                                 <span class="text-small"
                                    v-if="itemOption == 'all'"
                                    style="font-size:10px">
                                    semua operator
                                  </span>            
                                  <span class="text-small"
                                    v-else-if="itemOption == 'index'"
                                    style="font-size:10px">
                                    lihat data
                                  </span>
                                  <span class="text-small"
                                    v-else-if="itemOption == 'store'"
                                    style="font-size:10px">
                                    tambah data
                                  </span>
                                  <span class="text-small"
                                    v-else-if="itemOption == 'update'"
                                    style="font-size:10px">
                                    update data
                                  </span>
                                  <span class="text-small"
                                    v-else-if="itemOption == 'destroy'"
                                    style="font-size:10px">
                                    hapus data
                                  </span>
                                  <span class="text-small"
                                    v-else-if="itemOption == 'restore'"
                                    style="font-size:10px">
                                    pulihkan data
                                  </span>
                                  <span class='text-small'
                                    v-else-if="itemOption == 'print'"
                                    style="font-size:10px">
                                    print data pdf
                                  </span>
                                  <span class="text-small"
                                    v-else-if="itemOption == 'export'"
                                    style="font-size:10px">
                                    export data pdf/excel                                 
                                  </span>
                                  <span class="text-small"
                                    v-else-if="itemOption == 'export_pdf'"
                                    style="font-size:10px">
                                    export data pdf                                
                                  </span>
                                  <span class="text-small"
                                    v-else-if="itemOption == 'export_excel'"
                                    style="font-size:10px">
                                    export data excel                                 
                                  </span>
                                  <span class="text-small"
                                    v-else-if="itemOption == 'show'"
                                    style="font-size:10px">
                                    lihat detail data
                                  </span>
                                  <span class="text-small"
                                    v-else-if="itemOption == 'destroy-all'"
                                    style="font-size:10px">
                                    hapus banyak data
                                  </span>
                                  <span class="text-small"
                                    v-else-if="itemOption == 'restore-all'"
                                    style="font-size:10px">
                                    pulihkan banyak data
                                  </span>                              
                                  <span class="text-small"
                                    v-else-if="itemOption == 'import'"
                                    style="font-size:10px">
                                    import file ke database
                                  </span>
                                  <span class="text-small"
                                    v-else-if="itemOption == 'import-template'"
                                    style="font-size:10px">
                                    download template import
                                  </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <i class="fas fa-trash"
                          style="cursor:pointer"
                          @click="onDeleteGrant(index)"></i>
                      </td>
                    </tr>
                    <tr v-if="!parameters.form.grants.length">
                      <td colspan="3"
                        class="text-center">
                        Data tidak ditemukan
                      </td>
                    </tr>
                  </table>
                </div>
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
import { mapActions,mapState } from 'vuex'

export default {  
  middleware : ["isNotAccessable"],

  props: ["self"],

  async mounted(){
    await this.onSearchRole()    
  },

  data() {
    return {
      isStopSearchRole : false,
      isLoadingGetRole :  false,
      role_search : '',

      options : [
        "all",
        "index",
        "store",
        "update",
        "show",
        "destroy",
        "destroy-all",
        "restore",
        "restore-all",
        "print",
        "export",
        "export_pdf",
        "export_excel",
        "import",
        "import-template"
      ],

      isEditable  : false,
      isLoadingForm : false,
      title: 'User',      
      parameters : {
        url : 'setting/group_role',
        form : {
          name : '',
          type_option : 'multiselect',
          grants   : []
        }
      }
    };
  },

  computed :{
    ...mapState('moduleApi',[
      'error',
      'result',
      'lookup_roles'
    ]),  

    filter_lookup_roles(){
      let new_roles = this.lookup_roles.data.filter(item => item.parent_id != null);

      return new_roles.filter(item => {
        return !this.parameters.form.grants.find(itemGrant => item.name == (itemGrant.role_id ? itemGrant.role_id.name : ''))            
      })
    }
  },

  methods: {    
    ...mapActions('moduleApi',[
      'addData',
      'updateData',
      'lookUp'
    ]),

    async onSubmit(isInvalid){       
      if(isInvalid || this.isLoadingForm) return;            
      
      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form : {
          ...this.parameters.form,
          grants : this.parameters.form.grants.map(item => {
            return {
              operators : item.operators,
              role_id : item.role_id.id
            }
          })
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

    addTag(newTag){
      this.options.push(newTag)
    },

    onAddGrant(){
      this.parameters.form.grants.push({
        role_id : null,
        operators : [],
      })
    },

    onDeleteGrant(index){
      this.parameters.form.grants = this.parameters.form.grants.filter((_,itemIndex) => index != itemIndex);
    },

    onGetRole(search,isNext){      
      if(!search.length && typeof isNext === "function") return false;             

      clearTimeout(this.isStopSearchRole);
      
      this.isStopSearchRole = setTimeout(() => {
        this.role_search = search;

        if(typeof isNext !== "function"){
          this.lookup_roles.current_page = isNext 
            ? this.lookup_roles.current_page + 1 
            : this.lookup_roles.current_page - 1;        
        }else{
          this.lookup_roles.current_page = 1;
        }

        this.onSearchRole();
      },600);        
    },

    async onSearchRole(){
      if(!this.isLoadingGetRole){
        this.isLoadingGetRole = true;
                
        await this.lookUp({    
          url : "setting/group_role/get-role",
          lookup  : 'roles',
          query : "?search="+this.role_search+"&page="+this.lookup_roles.current_page+"&per_page=10"
        })

        this.isLoadingGetRole = false;      
      }
    }
  },
};
</script>
