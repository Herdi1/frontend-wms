<template>
  <div class="form-group flex mb-3 w-full">
    <label :for="id">{{ label }}</label>
    <input type="text" :id="id" :name="id" v-model="value">
  </div>
</template>

<script>
export default{
  props:['label', 'id', 'value']


}
</script>
