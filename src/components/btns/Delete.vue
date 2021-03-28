<template>
  <span>
    <button @click="btnDeleteHandler()"  class="btn btn-warning" data-toggle="modal" data-target="#deleteModal">Delete</button>
  </span>
</template>

<script>
    export default {
      methods: {
        btnDeleteHandler() {
          this.params.clicked(this.params.value);
        }
      }
    }
</script>