<template>
  <div></div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import FormInput from "./form";
export default {
  middleware: ["checkRoleUser"],
};
</script>
