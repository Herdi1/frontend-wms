<template>
  <section class="section">
    <div class="section-body" v-if="!isLoadingPage">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <div class="d-flex justify-content-between">
                  <h6>{{ isEditable ? "Edit" : "Tambah" }} Weaving</h6>

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

                  <div class="form-group">
                      <label for="customer_id">No Order/Set</label>
                      <v-select
                        label="no_batch"
                        :loading="isLoadingGetCustomer"
                        :options="lookup_customers.data"
                        :filterable="false"
                        @search="onGetCustomer"
                        v-model="form.production_detail_id"
                      >
                        <template v-slot:option="option">
                          <div class="row">
                            <div class="col-md-5 p-1 m-0">
                              {{ option.no_batch }}
                            </div>
                          </div>
                        </template>
                        <template #search="{ attributes, events }">
                          <input
                            class="vs__search"
                            :required="!form.production_detail_id"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_customers.data.length || search"
                        >
                          <a
                            v-if="lookup_customers.current_page > 1"
                            @click="onGetCustomer(search, false)"
                            class="flex-fill bg-primary text-white text-center"
                            href="#"
                            >Sebelumnya</a
                          >
                          <a
                            v-if="lookup_customers.last_page >
                              lookup_customers.current_page
                              "
                            @click="onGetCustomer(search, true)"
                            class="flex-fill bg-primary text-white text-center"
                            href="#"
                            >Selanjutnya</a
                          >
                        </li>
                      </v-select>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <ValidationProvider name="purchase_unit" rules="required">
                          <div class="form-group" slot-scope="{ errors, valid }">
                            <label for="purchase_unit">No Beam</label>
                            <input
                              type="text"
                              class="form-control"
                              name="no_beam"
                              :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                "
                              v-model="form.no_beam"
                            />
                            <div class="invalid-feedback" v-if="errors[0]">
                              {{ errors[0] }}
                            </div>
                          </div>
                        </ValidationProvider>
                      </div>
                      <div class="col-md-6">
                        <ValidationProvider name="selling_unit" rules="required">
                          <div class="form-group" slot-scope="{ errors, valid }">
                            <label for="selling_unit">Mesin Tenun</label>
                            <v-select
                                    label="name"
                                    :loading="isLoadingGetMesinTenun"
                                    :options="lookup_mesin.data"
                                    :filterable="false"
                                    @search="onGetMesinTenun"
                                    v-model="form.master_machine_tenun_id"
                                  >
                                    <template v-slot:option="option">
                                      <div class="row">
                                        <div class="col-md-5 p-1 m-0">
                                              {{ option.code }}
                                            </div>
                                        <div class="col-md-5 p-1 m-0">
                                          {{ option.name }}
                                        </div>
                                      </div>
                                    </template>
                                    <template #search="{ attributes, events }">
                                      <input
                                        class="vs__search"
                                        :required="!form.master_machine_tenun_id"
                                        v-bind="attributes"
                                        v-on="events"
                                      />
                                    </template>
                                    <li
                                      slot-scope="{ search }"
                                      slot="list-footer"
                                      class="d-flex justify-content-between"
                                      v-if="lookup_mesin.data.length || search"
                                    >
                                      <a
                                        v-if="lookup_mesin.current_page > 1"
                                        @click="onGetMesinTenun(search, false)"
                                        class="flex-fill bg-primary text-white text-center"
                                        href="#"
                                        >Sebelumnya</a
                                      >
                                      <a
                                        v-if="lookup_mesin.last_page >
                                          lookup_mesin.current_page
                                          "
                                        @click="onGetMesinTenun(search, true)"
                                        class="flex-fill bg-primary text-white text-center"
                                        href="#"
                                        >Selanjutnya</a
                                      >
                                    </li>
                                  </v-select>
                            <div class="invalid-feedback" v-if="errors[0]">
                              {{ errors[0] }}
                            </div>
                          </div>
                        </ValidationProvider>
                      </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                          <ValidationProvider name="purchase_unit" rules="required">
                            <div class="form-group" slot-scope="{ errors, valid }">
                              <label for="purchase_unit">No Mesin Kanji</label>
                                <v-select
                                      label="name"
                                      :loading="isLoadingGetMesinKanji"
                                      :options="lookup_mesin.data"
                                      :filterable="false"
                                      @search="onGetMesinKanji"
                                      v-model="form.master_machine_kanji_id"
                                    >
                                      <template v-slot:option="option">
                                        <div class="row">
                                          <div class="col-md-5 p-1 m-0">
                                                {{ option.code }}
                                              </div>
                                          <div class="col-md-5 p-1 m-0">
                                            {{ option.name }}
                                          </div>
                                        </div>
                                      </template>
                                      <template #search="{ attributes, events }">
                                        <input
                                          class="vs__search"
                                          :required="!form.master_machine_kanji_id"
                                          v-bind="attributes"
                                          v-on="events"
                                        />
                                      </template>
                                      <li
                                        slot-scope="{ search }"
                                        slot="list-footer"
                                        class="d-flex justify-content-between"
                                        v-if="lookup_mesin.data.length || search"
                                      >
                                        <a
                                          v-if="lookup_mesin.current_page > 1"
                                          @click="onGetMesinKanji(search, false)"
                                          class="flex-fill bg-primary text-white text-center"
                                          href="#"
                                          >Sebelumnya</a
                                        >
                                        <a
                                          v-if="lookup_mesin.last_page >
                                            lookup_mesin.current_page
                                            "
                                          @click="onGetMesinKanji(search, true)"
                                          class="flex-fill bg-primary text-white text-center"
                                          href="#"
                                          >Selanjutnya</a
                                        >
                                      </li>
                                    </v-select>
                              <div class="invalid-feedback" v-if="errors[0]">
                                {{ errors[0] }}
                              </div>
                            </div>
                          </ValidationProvider>
                        </div>
                        <div class="col-md-6">
                          <ValidationProvider name="selling_unit" rules="required">
                            <div class="form-group" slot-scope="{ errors, valid }">
                              <label for="selling_unit">Tanggal</label>
                              <input
                                      type="date"
                                      class="form-control"
                                      name="tanggal"
                                      :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                        "
                                      v-model="form.tanggal" required
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
                            <ValidationProvider name="purchase_unit" rules="required">
                              <div class="form-group" slot-scope="{ errors, valid }">
                                <label for="purchase_unit">Beam ke</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    name="beam_ke"
                                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                      "
                                    v-model="form.beam_ke"
                                  />
                                <div class="invalid-feedback" v-if="errors[0]">
                                  {{ errors[0] }}
                                </div>
                              </div>
                            </ValidationProvider>
                          </div>
                          <div class="col-md-6">
                            <ValidationProvider name="selling_unit" rules="required">
                              <div class="form-group" slot-scope="{ errors, valid }">
                                <label for="selling_unit">Jumlah Benang</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  name="jumlah_benang"
                                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                    "
                                  v-model="form.jumlah_benang"
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
                              <ValidationProvider name="purchase_unit" rules="required">
                                <div class="form-group" slot-scope="{ errors, valid }">
                                  <label for="purchase_unit">SPU</label>
                                  <input
                                      type="number"
                                      class="form-control"
                                      name="spu"
                                      :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                        "
                                      v-model="form.spu"
                                    />
                                  <div class="invalid-feedback" v-if="errors[0]">
                                    {{ errors[0] }}
                                  </div>
                                </div>
                              </ValidationProvider>
                            </div>
                            <div class="col-md-6">
                              <ValidationProvider name="selling_unit" rules="required">
                                <div class="form-group" slot-scope="{ errors, valid }">
                                  <label for="selling_unit">Berat</label>
                                  <input
                                    type="number"
                                    class="form-control"
                                    name="berat"
                                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                      "
                                    v-model="form.berat"
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
                                <ValidationProvider name="purchase_unit" rules="required">
                                  <div class="form-group" slot-scope="{ errors, valid }">
                                    <label for="purchase_unit">Panjang Benang</label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        name="panjang_benang"
                                        :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                          "
                                        v-model="form.panjang_benang"
                                      />
                                    <div class="invalid-feedback" v-if="errors[0]">
                                      {{ errors[0] }}
                                    </div>
                                  </div>
                                </ValidationProvider>
                              </div>
                              <div class="col-md-6">
                                <ValidationProvider name="selling_unit" rules="required">
                                  <div class="form-group" slot-scope="{ errors, valid }">
                                    <label for="selling_unit">Tanggal Cucuk</label>
                                    <input
                                      type="date"
                                      class="form-control"
                                      name="cucuk_tanggal"
                                      :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                        "
                                      v-model="form.cucuk_tanggal"
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
                                  <ValidationProvider name="purchase_unit" rules="required">
                                    <div class="form-group" slot-scope="{ errors, valid }">
                                      <label for="purchase_unit">Operator Cucuk</label>
                                      <v-select
                                        label="fullname"
                                        :loading="isLoadingGetOperator"
                                        :options="lookup_operator.data"
                                        :filterable="false"
                                        @search="onGetOperator"
                                        v-model="form.operatorcucuk_user_id"
                                      >
                                        <template v-slot:option="option">
                                          <div class="row">
                                            <div class="col-md-5 p-1 m-0">
                                                  {{ option.nik }}
                                                </div>
                                            <div class="col-md-5 p-1 m-0">
                                              {{ option.fullname }}
                                            </div>
                                          </div>
                                        </template>
                                        <template #search="{ attributes, events }">
                                          <input
                                            class="vs__search"
                                            :required="!form.operatorcucuk_user_id"
                                            v-bind="attributes"
                                            v-on="events"
                                          />
                                        </template>
                                        <li
                                          slot-scope="{ search }"
                                          slot="list-footer"
                                          class="d-flex justify-content-between"
                                          v-if="lookup_mesin.data.length || search"
                                        >
                                          <a
                                            v-if="lookup_mesin.current_page > 1"
                                            @click="onGetOperator(search, false)"
                                            class="flex-fill bg-primary text-white text-center"
                                            href="#"
                                            >Sebelumnya</a
                                          >
                                          <a
                                            v-if="lookup_mesin.last_page >
                                              lookup_mesin.current_page
                                              "
                                            @click="onGetOperator(search, true)"
                                            class="flex-fill bg-primary text-white text-center"
                                            href="#"
                                            >Selanjutnya</a
                                          >
                                        </li>
                                      </v-select>
                                      <div class="invalid-feedback" v-if="errors[0]">
                                        {{ errors[0] }}
                                      </div>
                                    </div>
                                  </ValidationProvider>
                                </div>
                                <div class="col-md-6">
                                  <ValidationProvider name="selling_unit" rules="required">
                                    <div class="form-group" slot-scope="{ errors, valid }">
                                      <label for="selling_unit">Cucukan</label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        name="cucukan"
                                        :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                          "
                                        v-model="form.cucukan"
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
                                    <ValidationProvider name="purchase_unit" rules="required">
                                      <div class="form-group" slot-scope="{ errors, valid }">
                                        <label for="purchase_unit">Lebar Sisir</label>
                                        <input
                                            type="number"
                                            class="form-control"
                                            name="lebar_sisir"
                                            :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                              "
                                            v-model="form.lebar_sisir"
                                          />
                                        <div class="invalid-feedback" v-if="errors[0]">
                                          {{ errors[0] }}
                                        </div>
                                      </div>
                                    </ValidationProvider>
                                  </div>
                                  <div class="col-md-6">
                                    <ValidationProvider name="selling_unit" rules="required">
                                      <div class="form-group" slot-scope="{ errors, valid }">
                                        <label for="selling_unit">Tanggal Naik Beam/Tying</label>
                                        <input
                                          type="date"
                                          class="form-control"
                                          name="tanggal_naik_beam"
                                          :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                            "
                                          v-model="form.tanggal_naik_beam"
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
                                      <ValidationProvider name="purchase_unit" rules="required">
                                        <div class="form-group" slot-scope="{ errors, valid }">
                                          <label for="purchase_unit">Start</label>
                                          <input
                                              type="text"
                                              class="form-control"
                                              name="start"
                                              :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                                "
                                              v-model="form.start"
                                            />
                                          <div class="invalid-feedback" v-if="errors[0]">
                                            {{ errors[0] }}
                                          </div>
                                        </div>
                                      </ValidationProvider>
                                    </div>
                                    <div class="col-md-6">
                                      <ValidationProvider name="selling_unit" rules="required">
                                        <div class="form-group" slot-scope="{ errors, valid }">
                                          <label for="selling_unit">Beam Steller</label>
                                          <v-select
                          label="fullname"
                          :loading="isLoadingGetSupplier"
                          :options="lookup_suppliers.data"
                          :filterable="false"
                          @search="onGetSupplier"
                          v-model="form.beamsteller_user_id"
                        >
                          <template v-slot:option="option">
                            <div class="row">
                              <div class="col-md-5 p-1 m-0">
                                {{ option.nik }}
                              </div>
                              <div class="col-md-7 p-1 m-0 text-right">
                                {{ option.fullname }}
                              </div>
                            </div>
                          </template>
                          <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!form.beamsteller_user_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template>
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
                              v-if="lookup_suppliers.last_page >
                                lookup_suppliers.current_page
                                "
                              @click="onGetSupplier(search, true)"
                              class="flex-fill bg-primary text-white text-center"
                              href="#"
                              >Selanjutnya</a
                            >
                          </li>
                        </v-select>
                                          <div class="invalid-feedback" v-if="errors[0]">
                                            {{ errors[0] }}
                                          </div>
                                        </div>
                                      </ValidationProvider>
                                    </div>
                                  </div>

                                  <div class="row">
                                      <div class="col-md-6">
                                        <ValidationProvider name="purchase_unit" rules="required">
                                          <div class="form-group" slot-scope="{ errors, valid }">
                                            <label for="purchase_unit">Kondisi Jalan</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                name="kondisi_jalan"
                                                :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                                  "
                                                v-model="form.kondisi_jalan"
                                              />
                                            <div class="invalid-feedback" v-if="errors[0]">
                                              {{ errors[0] }}
                                            </div>
                                          </div>
                                        </ValidationProvider>
                                      </div>
                                      <div class="col-md-6">
                                        <ValidationProvider name="selling_unit" rules="required">
                                          <div class="form-group" slot-scope="{ errors, valid }">
                                            <label for="selling_unit">Tgl Turun Beam</label>
                                            <input
                                              type="date"
                                              class="form-control"
                                              name="tanggal_turun_beam"
                                              :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                                "
                                              v-model="form.tanggal_turun_beam"
                                            />
                                            <div class="invalid-feedback" v-if="errors[0]">
                                              {{ errors[0] }}
                                            </div>
                                          </div>
                                        </ValidationProvider>
                                      </div>
                                    </div>

                                    <div class="form-group">
                      <label for="supplier_id">Pengawas</label>
                      <v-select
                        label="fullname"
                        :loading="isLoadingGetPengawas"
                        :options="lookup_pengawas.data"
                        :filterable="false"
                        @search="onGetPengawas"
                        v-model="form.pengawas_user_id"
                      >
                        <template v-slot:option="option">
                          <div class="row">
                            <div class="col-md-5 p-1 m-0">
                              {{ option.nik }}
                            </div>
                            <div class="col-md-7 p-1 m-0 text-right">
                              {{ option.fullname }}
                            </div>
                          </div>
                        </template>
                        <template #search="{ attributes, events }">
                          <input
                            class="vs__search"
                            :required="!form.pengawas_user_id"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="d-flex justify-content-between"
                          v-if="lookup_pengawas.data.length || search"
                        >
                          <a
                            v-if="lookup_pengawas.current_page > 1"
                            @click="onGetPengawas(search, false)"
                            class="flex-fill bg-primary text-white text-center"
                            href="#"
                            >Sebelumnya</a
                          >
                          <a
                            v-if="lookup_pengawas.last_page >
                              lookup_pengawas.current_page
                              "
                            @click="onGetPengawas(search, true)"
                            class="flex-fill bg-primary text-white text-center"
                            href="#"
                            >Selanjutnya</a
                          >
                        </li>
                      </v-select>
                    </div>

                    <p>Catatan :</p>

                                  <div class="row">
                                      <div class="col-md-6">
                                        <ValidationProvider name="purchase_unit" rules="required">
                                          <div class="form-group" slot-scope="{ errors, valid }">
                                            <label for="purchase_unit">Effisensi Harus</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                name="catatan_effisensi"
                                                :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                                  "
                                                v-model="form.catatan_effisensi"
                                              />
                                            <div class="invalid-feedback" v-if="errors[0]">
                                              {{ errors[0] }}
                                            </div>
                                          </div>
                                        </ValidationProvider>
                                      </div>
                                      <div class="col-md-6">
                                        <ValidationProvider name="selling_unit" rules="required">
                                          <div class="form-group" slot-scope="{ errors, valid }">
                                            <label for="selling_unit">Produksi per Regu</label>
                                            <input
                                              type="text"
                                              class="form-control"
                                              name="catatan_produksi_peregu"
                                              :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                                "
                                              v-model="form.catatan_produksi_peregu"
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
                                          <ValidationProvider name="purchase_unit" rules="required">
                                            <div class="form-group" slot-scope="{ errors, valid }">
                                              <label for="purchase_unit">Produksi per Hari</label>
                                              <input
                                                  type="text"
                                                  class="form-control"
                                                  name="catatan_produksi_perhari"
                                                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                                                    "
                                                  v-model="form.catatan_produksi_perhari"
                                                />
                                              <div class="invalid-feedback" v-if="errors[0]">
                                                {{ errors[0] }}
                                              </div>
                                            </div>
                                          </ValidationProvider>
                                        </div>
                                        
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
                    <h6>Data Potong Kain</h6>

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
                          <td>Tanggal</td>
                          <td>Counter</td>
                          <td>Regu</td>
                          <td>Keterangan</td>
<!-- 
                          <td>Jenis Harga</td>
                          <td>Judul</td>
                          <td>Harga</td> -->
                          <td>Opsi</td>
                        </tr>
                        <tr
                          v-for="(item, index) in form.production_potong_kain"
                          :key="item.id"
                        >
                        <td style="width: 10%">
                              <input
                                type="date"
                                class="form-control"
                                v-model="item.tanggal"
                              />
                            </td>

                            <td style="width: 30%">
                              <input
                                type="text"
                                class="form-control"
                                v-model="item.counter"
                              />
                            </td>

                            <td style="width: 30%">
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="item.regu_id"
                                />
                              </td>
                              <td style="width: 30%">
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="item.keterangan"
                                  />
                                </td>
                          <!-- <td style="width: 30%">
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
                          </td> -->
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
      title: "Weaving",
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

      isStopSearchMesinTenun: false,
      isLoadingGetMesinTenun: false,
      mesintenun_search: "",

      isStopSearchMesinKanji: false,
      isLoadingGetMesinKanji: false,
      mesinkanji_search: "",

      isStopSearchOperator: false,
      isLoadingGetOperator: false,
      operator_search: "",

      isStopSearchPengawas: false,
      isLoadingGetPengawas: false,
      pengawas_search: '',

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
        production_potong_kain:[],

      },

      default_form: {
        supplier_id: "",
        customer_id: "",
        product_spesification_id: "",
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
        production_potong_kain: [],


      },      
      preview_images: [],

      indexPreviewImages: null,

      // production_potong_kain: [],
      product_prices:[],
      value_ids: [],
    };
  },

  async created() {          
    // this.set_lookup_product_properties([])

    // this.set_lookup_product_groups([])

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

        
         
        // response.data.images.forEach(item => {
        //   this.preview_images.push(
        //     process.env.IMAGES_API_URL + "products/" + item
        //   );
        // });

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

    await this.onSearchMesinTenun();

    await this.onSearchMesinKanji();

    await this.onSearchOperator();

    await this.onSearchPengawas();


    // await this.lookUp({
    //   url: "master/product/get-product-spesification",
    //   lookup: "product_groups",
    //   query: 
    //     "?search=" + 
    //     "&all=true" +
    //       "&id=1" +

    //     "&type=GROUP"       
    // });

    // await this.lookUp({
    //   url: "master/product/get-unit",
    //   lookup: "units",
    //   query: "",
    // });

    // await this.lookUp({
    //   url: "master/product/get-customer-group",
    //   lookup: "customer_groups",
    //   query: "",
    // });

    await this.lookUp({
      url: "manufactur/productionproses/get-konstruksi",
      lookup: "customers",
      query: "",
    });

    await this.lookUp({
      url: "machine/machine",
      lookup: "mesin",
      query: "?search=" + this.mesintenun_search + "&page=" + this.lookup_mesin.current_page + "&per_page=10&master_proces_id=2"
    });

     await this.lookUp({
      url: "machine/machine",
      lookup: "mesin",
      query: "?search=" + this.mesintenun_search + "&page=" + this.lookup_mesin.current_page + "&per_page=10&master_proces_id=2"
     });

    //  await this.lookUp({
    //   url: "setting/user",
    //   lookup: "operator",
    //   query: "?search=" + this.operator_search + "&page=" + this.lookup_operator.current_page + "&per_page=10&group_role_id=5"
    // });

    if(!this.isEditable){
      this.setCode();

    }

    // this.onGetPropertie()


    // this.value_ids.forEach(item => {     
    //    document.getElementById("properti-" + item.properti_id + "-option").value = item.id;
    // })    
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
      "lookup_mesin",
      "lookup_operator",
      "lookup_pengawas",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", [
      'getCode',
      "lookUp"
    ]), 

    // ...mapMutations("moduleApi", [
    //   "set_lookup_product_properties",
    //   "set_lookup_product_groups"
    // ]), 

     onGetPengawas(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPengawas);

      this.isStopSearchPengawas = setTimeout(() => {
        this.pengawas_search = search;

        if (typeof isNext !== "function") {
          this.lookup_pengawas.current_page = isNext
            ? this.lookup_pengawas.current_page + 1
            : this.lookup_pengawas.current_page - 1;
        } else {
          this.lookup_pengawas.current_page = 1;
        }

        this.onSearchPengawas();
      }, 600);
    },


    async onSearchPengawas() {
      if (!this.isLoadingGetPengawas) {
        this.isLoadingGetPengawas = true;
        await this.lookUp({
          url: "setting/user",
          lookup: 'pengawas',
          query: "?search=" + this.pengawas_search + "&page=" + this.lookup_pengawas.current_page + "&per_page=10&group_role_id=4"
        })

        this.isLoadingGetPengawas = false;
      }
    },

    onGetOperator(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchOperator);

      this.isStopSearchOperator = setTimeout(() => {
        this.operator_search = search;

        if (typeof isNext !== "function") {
          this.lookup_operator.current_page = isNext
            ? this.lookup_operator.current_page + 1
            : this.lookup_operator.current_page - 1;
        } else {
          this.lookup_operator.current_page = 1;
        }

        this.onSearchOperator();
      }, 600);
    },

    async onSearchOperator() {
      if (!this.isLoadingGetOperator) {
        this.isLoadingGetOperator = true;
        await this.lookUp({
          url: "setting/user",
          lookup: 'operator',
          query: "?search=" + this.operator_search + "&page=" + this.lookup_operator.current_page + "&per_page=10&group_role_id=5"
        })

        this.isLoadingGetOperator = false;
      }
    },

    onGetMesinTenun(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchMesinTenun);

      this.isStopSearchMesinTenun = setTimeout(() => {
        this.mesintenun_search = search;

        if (typeof isNext !== "function") {
          this.lookup_mesin.current_page = isNext
            ? this.lookup_mesin.current_page + 1
            : this.lookup_mesin.current_page - 1;
        } else {
          this.lookup_mesin.current_page = 1;
        }

        this.onSearchMesinTenun();
      }, 600);
    },

    async onSearchMesinTenun() {
      if (!this.isLoadingGetMesinTenun) {
        this.isLoadingGetMesinTenun = true;

        await this.lookUp({
          url: "machine/machine",
          lookup: 'mesin',
          query: "?search=" + this.mesintenun_search + "&page=" + this.lookup_mesin.current_page + "&per_page=10&master_proces_id=2"
        })

        this.isLoadingGetMesinTenun = false;
      }
    },

     onGetMesinKanji(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchMesinKanji);

      this.isStopSearchMesinKanji = setTimeout(() => {
        this.mesinkanji_search = search;

        if (typeof isNext !== "function") {
          this.lookup_mesin.current_page = isNext
            ? this.lookup_mesin.current_page + 1
            : this.lookup_mesin.current_page - 1;
        } else {
          this.lookup_mesin.current_page = 1;
        }

        this.onSearchMesinTenun();
      }, 600);
    },

    async onSearchMesinKanji() {
      if (!this.isLoadingGetMesinKanji) {
        this.isLoadingGetMesinKanji = true;

        await this.lookUp({
          url: "machine/machine",
          lookup: 'mesin',
          query: "?search=" + this.mesinkanji_search + "&page=" + this.lookup_mesin.current_page + "&per_page=10&master_proces_id=2"
        })

        this.isLoadingGetMesinKanji = false;
      }
    },

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
          url: "setting/user",
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
          url: "manufactur/productionproses/get-konstruksi",
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
     
      this.form.production_potong_kain.push({
        tanggal: "",
        counter: "",
        keterangan: "",
        regu_id: "",

      });
    },

    deleteProductPrice(indexItem) {
      this.form.production_potong_kain = this.form.production_potong_kain.filter(
        (_, index) => index != indexItem
      );
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      // let formData = new FormData(document.getElementById("form-upload"));
      let formData = {
        ...this.form,
        master_proces_id: "1",
        production_detail_id:
          typeof this.form.production_detail_id == "object"
            ? this.form.production_detail_id.id
            : "",
        master_machine_tenun_id:
          typeof this.form.master_machine_tenun_id == "object"
            ? this.form.master_machine_tenun_id.id
            : "",
        master_machine_kanji_id:
          typeof this.form.master_machine_kanji_id == "object"
            ? this.form.master_machine_kanji_id.id
            : "",
        operatorcucuk_user_id:
          typeof this.form.operatorcucuk_user_id == "object"
            ? this.form.operatorcucuk_user_id.id
            : "",
        beamsteller_user_id:
          typeof this.form.beamsteller_user_id == "object"
            ? this.form.beamsteller_user_id.id
            : "",
        pengawas_user_id:
          typeof this.form.pengawas_user_id == "object"
            ? this.form.pengawas_user_id.id
            : "",
      };


      let url = "manufactur/productionweaving";

      if (this.isEditable) {
        url += "/" + this.id;
        formData.append("_method", "PUT");
      }

      // Object.keys(this.form).forEach(item => {
      //   if (item == "production_detail_id") {
      //     formData.append(
      //       item,
      //       typeof this.form.production_detail_id == "object"
      //         ? this.form.production_detail_id.id
      //         : ""
      //     );
      //   }else if(item == "master_machine_tenun_id") {
      //     formData.append(
      //       item,
      //       typeof this.form.master_machine_tenun_id == "object"
      //         ? this.form.master_machine_tenun_id.id
      //         : ""
      //     );
      //   } else if (item == "master_machine_kanji_id") {
      //     formData.append(
      //       item,
      //       typeof this.form.master_machine_kanji_id == "object"
      //         ? this.form.master_machine_kanji_id.id
      //         : ""
      //     );
      //   } else if (item == "operatorcucuk_user_id") {
      //     formData.append(
      //       item,
      //       typeof this.form.operatorcucuk_user_id == "object"
      //         ? this.form.operatorcucuk_user_id.id
      //         : ""
      //     );
      //   } else if (item == "beamsteller_user_id") {
      //     formData.append(
      //       item,
      //       typeof this.form.beamsteller_user_id == "object"
      //         ? this.form.beamsteller_user_id.id
      //         : ""
      //     );
      //   } else if (item == "pengawas_user_id") {
      //     formData.append(
      //       item,
      //       typeof this.form.pengawas_user_id == "object"
      //         ? this.form.pengawas_user_id.id
      //         : ""
      //     );
      //   } else {
      //     if(item === "description"){
      //       console.log(this.form[item]);
      //     }

      //     formData.append(item, this.form[item]);
      //   }
      // });

      // this.product_prices.forEach((item, index) => {
      //   // formData.append("product_prices[" + index + "][name]", item.name);
      //   formData.append("product_prices[" + index + "][tanggal]", item.tanggal);
      //   formData.append("product_prices[" + index + "][counter]", item.counter);
      //   formData.append("product_prices[" + index + "][regu_id]", item.regu_id);
      //   formData.append("product_prices[" + index + "][keterangan]", item.keterangan);


      //   // formData.append("product_prices[" + index + "][price]", item.price);
      // });


      formData.production_potong_kain = formData.production_potong_kain.map((item) => {
        return {
          tanggal: item.tanggal,
          counter: item.counter,
          regu_id: item.regu_id,
          keterangan: item.keterangan,
          // product_id:
          //   typeof item.product_id == "object"
          //     ? item.product_id.id
          //     : "",
        };
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
                production_potong_kain: [],

            };

            // this.indexPreviewImages = null;
            // this.preview_images = [];

            // this.form.production_potong_kain = [];

            // this.value_ids = [];          
            // this.set_lookup_product_properties([])

            document.getElementById("form-upload").reset();

            // this.setCode();
          }
        })
        .catch(err => {
          // this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {        
          this.isLoadingForm = false;
        });
    },

    // async onProductGroupChange(event) {
    //   this.set_lookup_product_properties([])

    //   if(!event.target.value){
    //     return;
    //   }

    //   this.value_ids = [];
  
    //   this.onGetPropertie()
    // },

    // onChangeItem(item){
    //   let id = document.getElementById("properti-"+item.id+"-option").value;

    //   if(!this.value_ids.find(itemValue => itemValue.id == item.id)){
    //     this.value_ids.push({   
    //       id : id,   
    //       properti_id : item.id
    //     });    
    //   }else{
    //     let indexValue = this.value_ids.findIndex(itemValue => itemValue.id == item.id);

    //     this.value_ids[indexValue] = {
    //       id : id,   
    //       properti_id : item.id
    //     }
    //   }
    // },

    // async onGetPropertie(){ 
    //    await this.lookUp({
    //     url: "master/product/get-product-spesification",
    //     lookup: "product_properties",
    //     query: 
    //       "?search=" + 
    //       "&all=true" +
    //       "&type=PROPERTIE" + 
    //       // "&parent_id= 1" + this.form.product_spesification_id,

    //       "&parent_id= 1",
    //   });

    // }
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