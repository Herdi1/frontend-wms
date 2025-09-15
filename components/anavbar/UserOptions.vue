<template>
  <div class="absolute right-2 mt-2 bg-white border border-gray-200 rounded shadow-lg z-50 p-3 dark:bg-slate-700 dark:border-none"
    v-show="visible">
      <a href="#" data-toggle="dropdown" class="flex gap-2 items-center mb-3">
        <img alt="image" src="/img/avatar/avatar-1.png" class="rounded-xl w-10 h-auto">
        <div class="d-sm-none d-lg-inline-block text-gray-800 dark:text-white">
          <p class="text-base font-bold">Hi, {{$auth.user.nama_lengkap}}</p>
          <p>{{ $auth.user.email }}</p>
          <p v-if="$auth.user.gudang">{{ $auth.user.gudang?.nama_gudang }}</p>
        </div>
      </a>
      <div class="flex flex-col gap-2 w-full text-base justify-center text-gray-800 dark:text-white">
        <nuxt-link to="/profil" class="dropdown-item has-icon"><i class="far fa-user mr-2"></i> Profil </nuxt-link>
        <button @click="logout" class="dropdown-item has-icon text-danger cursor-pointer">
          <span v-if="isLoadingLogout" class="text-center">
            <i class="fas fa-circle-notch fa-spin"></i>
          </span>
          <span v-else>
            <i class="fas fa-sign-out-alt mr-2"></i> Logout
          </span>
        </button>
      </div>
  </div>
</template>
<script>
export default {
  props:{
    visible: Boolean,
    user: Object,
  },

  data(){
    return {
      isLoadingLogout : false
    }
  },

  methods : {
    logout(){
      if(this.isLoadingLogout) return;

      this.isLoadingLogout = true;

      this.$auth.logout()
      .then(() => {
        // window.location.reload()
        this.$router.push("/login");
      })
      .catch(err => {
        console.log(err);
        this.$globalErrorToaster(this.$toaster,err);
      })
      .finally(() => {
        this.isLoadingLogout = false;
      })
    }
  }
}
</script>
