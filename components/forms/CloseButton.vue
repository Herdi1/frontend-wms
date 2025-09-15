<template>
  <button type="button" @click="$emit('click')" class="flex gap-2 justify-center items-center p-3 text-xl font-bold bg-red-500 text-white hover:bg-red-400 rounded md shadow-md">
    <i class="fa fa-xmark-large"></i>
    <p>Close</p></button>
</template>
