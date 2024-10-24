<template>
    <div id="mainGrid">
      <div class="mainGridSection"></div>
      <div class="mainGridSection centerV">
        <h1 id="title">Notes</h1>
  
        <div id="buttonsDiv">
          <div class="buttonsDivSection center" id="searchBtn">
            <img class="menuIcon" src="../public/images/search.svg">
          </div>
          <div class="buttonsDivSection center" id="infoBtn">
            <img class="menuIcon" src="../public/images/info.svg">
          </div>
        </div>
      </div>
      
      <div class="mainGridSection" id="notesGallery">
        <notes />
        
      </div>
    </div>
  </template>
  
  <script>
  import Notes from './components/notes.vue';
  
  export default {
    name: 'App',
    components: {
      Notes 
    }
  }
  </script>
  