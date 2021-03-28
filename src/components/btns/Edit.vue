<template>
  <span>
    <button
      type="button" 
      class="btn btn-primary" 
      data-toggle="modal" 
      data-target="#oneModal" 
      @click="btnEditHandler()">Edit</button>
  </span>
</template>

<script>
    export default {
      methods: {
        btnEditHandler() {
          this.params.clicked(this.params.value);
        }
      }
    }
</script>