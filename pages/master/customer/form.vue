<template>
  <portal to="modal">
    <div class="modal fade" aria-hidden="true" id="modal-form">
      <div class="modal-dialog">
        <div class="modal-content">
          <modal-header-section :self="this" />

          <ValidationObserver
            v-slot="{ invalid, validate }"
            ref="form-validate"
          >
            <form
              @submit.prevent="validate().then(onSubmit(invalid))"
              autocomplete="off"
            >
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6">
                    <ValidationProvider name="code" rules="required">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <label for="code">Kode</label>
                        <input
                          id="code"
                          type="text"
                          class="form-control"
                          name="code"
                          v-model="parameters.form.code"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
                          disabled
                        />

                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="col-md-6">
                    <ValidationProvider name="name" rules="required">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <label for="name">Nama</label>
                        <input
                          id="name"
                          type="text"
                          class="form-control"
                          name="name"
                          v-model="parameters.form.name"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
                          @input="setCode"
                        />
                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="seller_id">Sales</label>
                      <v-select
                        label="name"
                        :loading="isLoadingGetSeller"
                        :options="lookup_sellers.data"
                        :filterable="false"
                        @search="onGetSeller"
                        v-model="parameters.form.seller_id"
                        
                      >
                        <!-- <template #search="{ attributes, events }">
                          <input
                            class="vs__search"
                            :required="!parameters.form.seller_id"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template> -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_sellers.data.length || search"
                        >
                          <span
                            v-if="lookup_sellers.current_page > 1"
                            @click="onGetSeller(search, false)"
                            class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_sellers.last_page >
                              lookup_sellers.current_page
                            "
                            @click="onGetSeller(search, true)"
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
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="customer_group ">Group</label>
                      <v-select
                          label="name"
                          :loading="isLoadingGetGroup"
                          :options="lookup_custom1.data"
                          :filterable="false"
                          @search="onGetGroup"
                          v-model="parameters.form.customer_induk_id"
                        >
                          <!-- <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!parameters.form.customer_induk_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template> -->
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_custom1.data.length || search"
                          >
                            <span
                              v-if="lookup_custom1.current_page > 1"
                              @click="onGetGroup(search, false)"
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
                              @click="onGetGroup(search, true)"
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
                      <!-- <select
                        class="form-control"
                        v-model="parameters.form.customer_group_id"
                      >
                        <option value="">Pilih</option>
                        <option
                          v-for="itemCustomerGroup in lookup_customer_groups.data"
                          :key="itemCustomerGroup.id"
                          :value="itemCustomerGroup.id"
                        >
                          {{ itemCustomerGroup.name }}
                        </option>
                      </select> -->
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div
                    :class="
                      parameters.form.type == 'USER' ? 'col-md-6' : 'col-md-12'
                    "
                  >
                    <div class="form-group">
                      <label for="type">Type</label>
                      <select
                        class="form-control"
                        v-model="parameters.form.type"
                      >
                        <option value="USER">User</option>
                        <option value="RESELLER">Reseller</option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="col-md-6"
                    v-if="parameters.form.type != 'RESELLER'"
                  >
                    <div class="form-group">
                      <label for="reseller_id">Reseller</label>
                      <v-select
                        label="name"
                        :loading="isLoadingGetReseller"
                        :options="lookup_resellers.data"
                        :filterable="false"
                        @search="onGetReseller"
                        @input="onSetReseller"
                        v-model="parameters.form.parent_id"
                        :required="true"
                      >
                        <template #search="{ attributes, events }">
                          <input
                            class="vs__search"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_resellers.data.length || search"
                        >
                          <span
                            v-if="lookup_resellers.current_page > 1"
                            @click="onGetReseller(search, false)"
                            class="
                              flex-fill
                              bg-primary
                              text-white text-center
                              cursor-pointer
                            "
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_resellers.last_page >
                              lookup_resellers.current_page
                            "
                            @click="onGetReseller(search, true)"
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
                  </div>
                </div>

                <div class="form-group">
                  <label for="address">Alamat</label>
                  <textarea
                    class="form-control"
                    v-model="parameters.form.address"
                  ></textarea>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <ValidationProvider name="city" rules="required">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <label for="city">Kota</label>
                        <input
                          id="city"
                          type="text"
                          class="form-control"
                          name="city"
                          v-model="parameters.form.city"
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
                    <ValidationProvider
                      name="phone"
                      
                    >
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <label for="phone">No Telepon</label>
                        <input
                          id="phone"
                          type="text"
                          class="form-control"
                          name="phone"
                          v-model="parameters.form.phone"
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

                <div class="row">
                  <div class="col-md-6">
                    <ValidationProvider name="email" rules="email">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <label for="email">Email</label>
                        <input
                          id="email"
                          type="text"
                          class="form-control"
                          name="email"
                          v-model="parameters.form.email"
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

                  <!-- <div class="col-md-6">
                    <ValidationProvider name="term_payment" rules="required">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <label for="term_payment">Include PPN</label>
                        <input
                          id="term_payment"
                          type="number"
                          class="form-control"
                          name="term_payment"
                          v-model="parameters.form.term_payment"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
                        />
                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div> -->
                </div>

                <div class="row">
                    <div class="col-md-6">
                      <ValidationProvider name="email" >
                        <div class="form-group" slot-scope="{ errors, valid }">
                          <label for="email">NPWP</label>
                          <input
                            id="email"
                            type="text"
                            class="form-control"
                            name="email"
                            v-model="parameters.form.npwp"
                            :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                              "
                          />
                          <div class="invalid-feedback" v-if="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>

                    <div class="col-md-6">
                      <ValidationProvider name="term_payment" rules="required">
                        <div class="form-group" slot-scope="{ errors, valid }">
                          <label for="term_payment">Tempo Pembayaran</label>
                          <input
                            id="term_payment"
                            type="number"
                            class="form-control"
                            name="term_payment"
                            v-model="parameters.form.term_payment"
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
              </div>

              <modal-footer-section :isLoadingForm="isLoadingForm" />
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  middleware: ["isNotAccessable"],

  props: ["self"],

  async mounted() {
    await this.onSearchSeller();
    await this.onSearchReseller();
    await this.onSearchGroup();

    await this.lookUp({
      url: "master/customer/get-customer-group",
      lookup: "customer_groups",
      query: "",
    });
  },

  data() {
    return {
      isStopSearchSeller: false,
      isLoadingGetSeller: false,
      seller_search: "",

      isStopSearchReseller: false,
      isLoadingGetReseller: false,
      reseller_search: "",

      isStopSearchGroup: false,
      isLoadingGetGroup: false,
      group_search: "",

      isEditable: false,
      isLoadingForm: false,
      title: "Pelanggan",
      parameters: {
        url: "master/customer",
        form: {
          code: "",
          name: "",
          address: "",
          city: "",
          email: "",
          npwp: "",
          phone: "0",
          term_payment: 0,
          seller_id: "",
          customer_group_id: "",
          customer_induk_id: "",

          parent_id: "",
          type: "USER",
        },
      },
    };
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "code",
      "lookup_sellers",
      "lookup_customer_groups",
      "lookup_custom1",
      "lookup_resellers",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "getCode", "lookUp"]),

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          parent_id:
            typeof this.parameters.form.parent_id == "object"
              ? this.parameters.form.parent_id.id
              : "",
          seller_id:
            typeof this.parameters.form.seller_id == "object" && this.parameters.form.seller_id
              ? this.parameters.form.seller_id.id
              : "",
          customer_induk_id:
            typeof this.parameters.form.customer_induk_id == "object"
              ? this.parameters.form.customer_induk_id.id
              : "",
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        this.self.onLoad(this.self.parameters.params.page);
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );
        window.$("#modal-form").modal("hide");
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    async setCode() {

      await this.getCode({
        url: this.parameters.url,
        query: "?name="+this.parameters.form.name,
      });

      this.parameters.form.code = this.code;
    },

    onGetGroup(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroup);

      this.isStopSearchGroup = setTimeout(() => {
        this.group_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchGroup();
      }, 600);
    },

    async onSearchGroup() {
      if (!this.isLoadingGetGroup) {
        this.isLoadingGetGroup = true;

        await this.lookUp({
          url: "master/customer",
          lookup: "custom1",
          query:
            "?search=" +
            this.group_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroup = false;
      }
    },

    onGetSeller(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSeller);

      this.isStopSearchSeller = setTimeout(() => {
        this.seller_search = search;

        if (typeof isNext !== "function") {
          this.lookup_sellers.current_page = isNext
            ? this.lookup_sellers.current_page + 1
            : this.lookup_sellers.current_page - 1;
        } else {
          this.lookup_sellers.current_page = 1;
        }

        this.onSearchSeller();
      }, 600);
    },

    async onSearchSeller() {
      if (!this.isLoadingGetSeller) {
        this.isLoadingGetSeller = true;

        await this.lookUp({
          url: "master/customer/get-seller",
          lookup: "sellers",
          query:
            "?search=" +
            this.seller_search +
            "&page=" +
            this.lookup_sellers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSeller = false;
      }
    },

    onGetReseller(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchReseller);

      this.isStopSearchReseller = setTimeout(() => {
        this.reseller_search = search;

        if (typeof isNext !== "function") {
          this.lookup_resellers.current_page = isNext
            ? this.lookup_resellers.current_page + 1
            : this.lookup_resellers.current_page - 1;
        } else {
          this.lookup_resellers.current_page = 1;
        }

        this.onSearchReseller();
      }, 600);
    },

    async onSearchReseller() {
      if (!this.isLoadingGetReseller) {
        this.isLoadingGetReseller = true;

        await this.lookUp({
          url: "master/customer/get-reseller",
          lookup: "resellers",
          query:
            "?search=" +
            this.reseller_search +
            "&page=" +
            this.lookup_resellers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetReseller = false;
      }
    },

    onSetReseller(item) {
      if (item) {
        if (item.id == this.parameters.form.id) {
          this.$toaster.warning("Anda tidak dapat memilih reseller sendiri");

          this.parameters.form.parent_id = "";
        }
      } else {
        this.parameters.form.parent_id = "";
      }
    },
  },
};
</script>
