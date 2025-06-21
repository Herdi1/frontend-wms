<template>
  <portal to="modal">
    <div class="modal fade" aria-hidden="true" id="modal-form">
      <div class="modal-dialog">
        <div class="modal-content">
          <modal-header-section :self="this" />

          <ValidationObserver
            v-slot="{ invalid, validate }"
            ref="form-validate">
            <form @submit.prevent="validate().then(invalid)" autocomplete="off">
              <div class="modal-body">

                <div v-if="!isEditable">
                  <h6 class="text-primary">PRODUK GROUP</h6>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-md-8">
                        <label for="name">Nama</label>
                        <v-select
                          label="name"
                          :loading="isLoadingGetProductGroup"
                          :options="lookup_product_groups.data"
                          :filterable="false"
                          @search="onGetProductGroup"
                          @input="onChangeGroup"
                          v-model="parameters.form_propertie.parent_id"
                          :required="true">
                          <template #search="{ attributes, events }">                           
                            <input
                              class="vs__search"
                              :required="!parameters.form_propertie.parent_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template>
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_product_groups.data.length || search">
                            <span
                              v-if="lookup_product_groups.current_page > 1"
                              @click="onGetProductGroup(search, false)"
                              class="
                                flex-fill
                                bg-primary
                                text-white text-center
                                cursor-pointer
                              ">Sebelumnya</span>
                            <span
                              v-if="
                                lookup_product_groups.last_page >
                                lookup_product_groups.current_page
                              "
                              @click="onGetProductGroup(search, true)"
                              class="
                                flex-fill
                                bg-primary
                                text-white text-center
                                cursor-pointer
                              ">Selanjutnya</span>
                          </li>
                        </v-select>
                      </div>
                      <div
                        class="col-md-4 align-self-end"
                        v-if="isGroupEmpty">
                        <button
                          type="button"
                          class="btn btn-sm btn-primary m-auto"
                          @click="onAdd(false, 'GROUP')">
                          Tambah
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="isEditable && editType == 'GROUP'">
                  <div class="form-group">
                    <label for="name">Nama Group</label>
                    <input
                      class="form-control form-control-sm"
                      name="name"
                      v-model="parameters.form_group.name"
                      />
                  </div>

                  <div class="form-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-primary m-auto"
                      @click="onAdd(false, 'GROUP')">
                      Edit
                    </button>
                  </div>
                </div>
                
                <div v-if="!isEditable">
                  <h6 class="text-primary pt-3">PROPERTIE</h6>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-md-8">
                        <label for="name">Nama</label>
                        <v-select
                          label="name"
                          :loading="isLoadingGetProductPropertie"
                          :options="lookup_product_properties.data"
                          :filterable="false"
                          @search="onGetProductPropertie"
                          @input="onChangePropertie"
                          v-model="parameters.form_value.parent_id"
                          :required="true"
                          :disabled="!parameters.form_propertie.parent_id"
                        >
                          <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!parameters.form_value.parent_id"
                              v-bind="attributes"                             
                              v-on="events"
                            />
                          </template>
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_product_properties.data.length || search"
                          >
                            <span
                              v-if="lookup_product_properties.current_page > 1"
                              @click="onGetProductProperties(search, false)"
                              class="
                                flex-fill
                                bg-primary
                                text-white text-center
                                cursor-pointer
                              ">Sebelumnya</span>
                            <span
                              v-if="
                                lookup_product_properties.last_page >
                                lookup_product_properties.current_page
                              "
                              @click="onGetProductProperties(search, true)"
                              class="
                                flex-fill
                                bg-primary
                                text-white text-center
                                cursor-pointer">Selanjutnya</span>
                          </li>
                        </v-select>
                      </div>
                      <div
                        class="col-md-4 align-self-end"
                        v-if="isPropertieEmpty">
                        <button
                          type="button"
                          class="btn btn-sm btn-primary m-auto"
                          @click="onAdd(false, 'PROPERTIE')">
                          Tambah
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="isEditable && editType == 'PROPERTIE'">
                  <div class="form-group">
                    <label for="name">Nama Propertie</label>


                    <input
                      class="form-control form-control-sm"
                      name="name"
                      v-model="parameters.form_propertie.name"
                      />
                  </div>
          
                  <div class="form-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-primary m-auto"
                      @click="onAdd(false, 'PROPERTIE')">
                      Edit
                    </button>
                  </div>
                </div>

                <div v-if="!isEditable">
                  <h6 class="text-primary pt-3">VALUE</h6>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-md-8">
                        <label for="code">Kode</label>
                        <input
                          class="form-control form-control-sm"
                          name="code"
                          v-model="parameters.form_value.code"
                          disabled
                        />
                        <label for="name">Nama</label>
                        <input
                          class="form-control form-control-sm"
                          name="name"
                          v-model="parameters.form_value.name"
                          :disabled="!parameters.form_value.parent_id"
                        />
                      </div>
                      <div class="col-md-4 align-self-end">
                        <button
                          type="button"
                          class="btn btn-sm btn-primary m-auto"
                          @click="onAdd(false, 'VALUE')"
                          v-if="parameters.form_value.parent_id">
                          Tambah                      
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="isEditable && editType == 'VALUE'">                                    
                  <div class="form-group">
                    <label for="code">Kode Value</label>
                    <input
                      class="form-control form-control-sm"
                      name="code"
                      v-model="parameters.form_value.code"
                      disabled
                    />

                    <label for="name">Nama Value</label>
                    <input
                      class="form-control form-control-sm"
                      name="name"
                      v-model="parameters.form_value.name"
                      :disabled="!parameters.form_value.parent_id"
                    />                    
                  </div>
                      
                  <div class="form-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-primary m-auto"
                      @click="onAdd(false, 'VALUE')">
                      Edit                
                    </button>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal">
                  <i class="fas fa-ban"></i> Close
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  middleware: ["isNotAccessable"],

  props: ["self"],

  data() {
    return {
      isStopSearchProductGroup: false,
      isLoadingGetProductGroup: false,
      product_group_search: "",

      isLoadingGetProductPropertie: false,
      isStopSearchProductPropertie: false,
      product_propertie_search: "",

      isGroupEmpty: false,
      isPropertieEmpty: false,

      isEditable: false,

      isLoadingForm: false,

      title: "Produk Spec",

      editType: "",

      parameters: {
        url: "master/product_spesification",
        form_group: {
          code: "",
          name: "",
          type: "GROUP",
        },
        form_propertie : {
          code: "",
          name: "",
          type: "PROPERTIE",
          parent_id: "",
        },
        form_value: {
          code: "",
          name: "",
          type: "VALUE",
          parent_id: "",
        },
      },
    };
  },

  created() {          
    this.set_lookup_product_properties({
      data : [],
      current_page : 1
    })

    this.set_lookup_product_groups({
      data : [],
      current_page : 1
    })
  },

  async mounted() {
    await this.onSearchProductGroup();    
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "code",
      "lookup_product_groups",
      "lookup_product_properties",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", [
      "addData", 
      "updateData",
      "getCode", 
      "lookUp"
    ]),

    ...mapMutations("moduleApi", [
      "set_lookup_product_properties",
      "set_lookup_product_groups"
    ]),

    async onAdd(isInvalid, isType) {
      if (
        isInvalid ||
        this.isLoadingGetProductGroup ||
        this.isLoadingGetProductPropertie ||
        this.isLoadingForm
      ) return;

      let payload;

      switch (isType) {
        case "GROUP":
          this.isLoadingGetProductGroup = true;

          payload = {
            url: this.parameters.url,
            form: {
              ...this.parameters.form_group,
              id: this.parameters.form_group.id,       
            },
          };
          break;
        case "PROPERTIE":
          this.isLoadingGetProductPropertie = true;

          let parent_id = this.parameters.form_propertie.parent_id
            ? this.parameters.form_propertie.parent_id.id
            : 0;

          payload = {
            url: this.parameters.url,
            form: {
              ...this.parameters.form_propertie,
              parent_id: parent_id,
              id: this.parameters.form_propertie.id,
            },
          };
          break;
        case "VALUE":
          this.isLoadingForm = true;

          let parent_propertie = this.parameters.form_value.parent_id
            ? this.parameters.form_value.parent_id.id
            : 0;

          payload = {
            url: this.parameters.url,
            form: {
              ...this.parameters.form_value,
              parent_id: parent_propertie,
              id:this.parameters.form_value.id
            },
          };
          break;
      }

      if (this.isEditable) {
        await this.updateData(payload);
      } else {
        await this.addData(payload);
      }

      if (this.result == true) {
        this.self.onLoad(this.self.parameters.params.page);
        
        this.$toaster.success("Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah"));
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;

      this.isLoadingGetProductGroup = false;

      this.isLoadingGetProductPropertie = false;

      if(!this.isEditable){
        switch (isType) {
          case "GROUP":
            this.parameters.form_group.name = "";          

            this.isGroupEmpty = false;

            this.product_group_search = "";

            this.onSearchProductGroup();
            break;
          case "PROPERTIE":
            this.parameters.form_propertie.name = "";      

            this.isPropertiesEmpty = false;        

            this.product_propertie_search = "";

            this.onSearchProductPropertie();

            break;
          case "VALUE":
            this.parameters.form_value.name = "";

            this.isPropertieEmpty = false;

            this.setCode();
            break;
        }
      }
    },

    async setCode(){    
      let query = "?type=VALUE";

      if(this.parameters.form_value.parent_id){
        query += "&parent_id="+this.parameters.form_value.parent_id.id;
      }

      await this.getCode({
        url: this.parameters.url,
        query
      });

      this.parameters.form_value.code = this.code;      
    },

    onGetProductGroup(search, isNext) {
      if ((!search.length && typeof isNext === "function") || this.isEditable)
        return false;

      clearTimeout(this.isStopSearchProductGroup);

      this.parameters.form_propertie.parent_id = '';

      this.isStopSearchProductGroup = setTimeout(() => {
        this.product_group_search = search;
        if (typeof isNext !== "function") {
          this.lookup_product_groups.current_page = isNext
            ? this.lookup_product_groups.current_page + 1
            : this.lookup_product_groups.current_page - 1;
        } else {
          this.lookup_product_groups.current_page = 1;
        }

        this.onSearchProductGroup();
      }, 600);
    },

    async onSearchProductGroup() {      
      if (!this.isLoadingGetProductGroup) {
        this.isLoadingGetProductGroup = true;

        await this.lookUp({
          url: "master/product_spesification/get-product-spesification",
          lookup: "product_groups",
          query:
            "?search=" + this.product_group_search +
            "&type=GROUP" +
            "&page=" + this.lookup_product_groups.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProductGroup = false;

        this.isGroupEmpty = !this.lookup_product_groups.data.length && this.product_group_search.length;

        this.parameters.form_group.name = this.product_group_search;
      }
    },

    onChangeGroup(item) {
      this.parameters.form_value.parent_id = "";

      if (item) {
        this.parameters.form_group.name = "";
        this.propertie_search = "";

        this.isGroupEmpty = false;

        this.onSearchProductPropertie();     
      } else {
        this.set_lookup_product_properties({
          data : [],
          current_page : 1
        });
      }      
    },

    onGetProductPropertie(search, isNext) {
      if ((!search.length && typeof isNext === "function") || this.isEditable)
        return false;

      clearTimeout(this.isStopSearchProductPropertie);

      this.parameters.form_value.parent_id = '';

      this.isStopSearchProductPropertie = setTimeout(() => {
        this.product_propertie_search = search;

        if (typeof isNext !== "function") {
          this.lookup_product_properties.current_page = isNext
            ? this.lookup_product_properties.current_page + 1
            : this.lookup_product_properties.current_page - 1;
        } else {
          this.lookup_product_properties.current_page = 1;
        }

        this.onSearchProductPropertie();
      }, 600);
    },

    async onSearchProductPropertie() {
      if (!this.isLoadingGetProductPropertie) {
        this.isLoadingGetProductPropertie = true;

        await this.lookUp({
          url: "master/product_spesification/get-product-spesification",
          lookup: "product_properties",
          query:
            "?search=" + this.product_propertie_search +
            "&type=PROPERTIE" +
            "&parent_id=" + this.parameters.form_propertie.parent_id.id +
            "&page=" + this.lookup_product_properties.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProductPropertie = false;

        this.isPropertieEmpty = !this.lookup_product_properties.data.length && this.product_propertie_search.length;

        this.parameters.form_propertie.name = this.product_propertie_search;
      }
    },

    onChangePropertie(item){
      if(item){
        this.setCode();
      }else{
        this.parameters.form_value.parent_id = '';
      }
    }
  },
};
</script>