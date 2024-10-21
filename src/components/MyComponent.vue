<template>
  <div>
    <h1 id="title">{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  data(){
    return{
      message: 'Wellcome to the Notes App'
    }
  }
}
</script>