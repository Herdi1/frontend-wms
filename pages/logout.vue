<template>
    <div class="row">
        <div class="col-12 d-flex align-items-center justify-content-center"
          style="margin-top:100px">
            <div class="text-center">
                <i class="fas fa-circle-notch fa-spin fa-5x"></i>
                <br/>
                Loading
            </div>    
        </div>
    </div>
</template>

<script>
export default {
    layout : "empty",

    middleware : ["isLogin"],

    created(){
      this.$auth.logout()
      .then(() => {
        // window.location.reload()
        this.$router.push("/login");
      })
      .catch(err => {
        console.log(err);
        this.$globalErrorToaster(this.$toaster,err);
      });    
    }
}
</script>
