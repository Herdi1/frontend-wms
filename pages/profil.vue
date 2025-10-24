<template>
  <div>
    <ul class="flex space-x-2 rtl:space-x-reverse">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">User</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>User Profil</span>
      </li>
    </ul>
    <div class="pt-5">
      <div class="mb-5 flex items-center justify-between">
        <h5 class="text-lg font-semibold dark:text-white-light">Profil</h5>
      </div>

      <div>
        <ValidationObserver v-slot="{ invalid, validate }" ref="form-validate">
          <form
            @submit.prevent="validate().then(onSubmit(invalid))"
            autocomplete="off"
            class="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-[#0e1726]"
          >
            <div class="flex flex-col sm:flex-row gap-5 p-2">
              <div
                class="mb-5 w-full sm:w-3/12 ltr:sm:mr-4 rtl:sm:ml-4"
                v-if="form.is_superadmin != 1"
              >
                <h6 class="mb-5 text-lg font-bold">Informasi Perusahaan</h6>

                <!-- <p class="col-span-2 font-bold">Gudang</p> -->
                <div class="xl:12/12 sm:w-12/12 lg:w-5/5">
                  <div class="mb-2 flex w-full items-center justify-between">
                    <div class="text-dark">Perusahaan :</div>
                    <div class="font-bold">
                      {{ form.pelanggan ? form.pelanggan.nama_pelanggan : "" }}
                    </div>
                  </div>
                  <div class="mb-2 flex w-full items-center justify-between">
                    <div class="text-dark">Nama Gudang :</div>
                    <div class="font-bold">
                      {{ form.gudang ? form.gudang.nama_gudang : "" }}
                    </div>
                  </div>
                  <div class="mb-2 flex w-full items-center justify-between">
                    <div class="text-dark">Kode Gudang :</div>
                    <div class="font-bold">
                      {{ form.gudang ? form.gudang.kode_gudang : "" }}
                    </div>
                  </div>

                  <!-- <div class="mb-2 flex w-full items-center justify-between">
                                              <div class="text-white-dark">Alamat Gudang :</div>
                                              <div class="font-bold">{{ form.gudang ? form.gudang.alamat_gudang : '' }}</div>
                                          </div> -->
                  <div class="mb-2 flex w-full items-center justify-between">
                    <div class="text-dark">Jabatan :</div>
                    <div class="font-bold">
                      {{ form.jabatan ? form.jabatan.nama_jabatan : "" }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-8">
                <h6 class="text-lg font-bold col-span-8">Informasi Pengguna</h6>

                <ValidationProvider
                  name="username"
                  rules="required"
                  class="col-span-4"
                >
                  <div class="form-group col" slot-scope="{ errors, valid }">
                    <label>Nama Lengkap</label>
                    <input
                      type="text"
                      class="form-input"
                      v-model="form.nama_lengkap"
                      name="username"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div class="invalid-feedback" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  name="username"
                  rules="required"
                  class="col-span-4"
                >
                  <div class="form-group col" slot-scope="{ errors, valid }">
                    <label>Username</label>
                    <input
                      type="text"
                      class="form-input"
                      v-model="form.username"
                      name="username"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div class="invalid-feedback" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <div class="col-span-2">
                  <label for="tanggal_lahir">Tanggal Lahir</label>
                  <input
                    id="tanggal_lahir"
                    type="date"
                    placeholder="Tanggal Lahir"
                    class="form-input"
                    v-model="form.tanggal_lahir"
                  />
                </div>

                <ValidationProvider name="no_hp" rules="" class="col-span-2">
                  <div class="form-group col" slot-scope="{ errors, valid }">
                    <label>No Handphone</label>
                    <input
                      type="text"
                      class="form-input"
                      v-model="form.no_hp"
                      name="no_hp"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div class="invalid-feedback" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  name="email"
                  rules="required"
                  class="col-span-4"
                >
                  <div class="form-group col" slot-scope="{ errors, valid }">
                    <label>Email</label>
                    <input
                      type="text"
                      class="form-input"
                      v-model="form.email"
                      name="gmail"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div class="invalid-feedback" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <hr class="col-span-8" />
                <p class="col-span-8 font-bold">
                  Isi untuk mengubah kata sandi.
                </p>
                <div class="col-span-4">
                  <label for="password">Kata Sandi Baru</label>
                  <input
                    id="password"
                    type="text"
                    placeholder="Kata Sandi Baru"
                    class="form-input"
                    v-model="form.password"
                  />
                  <div class="px-2 text-gray-500">
                    *Password minimal 12 karakter(mengandung huruf besar, kecil,
                    tanda baca, angka)
                  </div>
                </div>

                <div class="col-span-4">
                  <label for="old_password">Kata Sandi Lama</label>
                  <input
                    id="old_password"
                    type="text"
                    placeholder="Kata Sandi Lama"
                    class="form-input"
                    v-model="form.old_password"
                  />
                </div>

                <div class="card-footer text-right col-span-8">
                  <modal-footer-section-wo-reset
                    :isLoadingForm="isLoadingForm"
                  />
                </div>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Profil",
    };
  },

  data() {
    return {
      form: {
        username: "",
        fullname: "",
        email: "",
      },
      isLoadingForm: false,
    };
  },

  created() {
    this.form = {
      ...this.$auth.user,
    };
  },

  methods: {
    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      this.$axios
        .put("/profil", this.form)
        .then(() => {
          return this.$auth.fetchUser();
        })
        .then(() => {
          this.$toaster.success("Berhasil update data");
        })
        .catch((err) => {
          console.log(err);
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
        });
    },
  },
};
</script>
