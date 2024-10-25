<template>
  <div id="mainGrid">
    <div class="mainGridSection"></div>
    <div class="mainGridSection centerV">
      <h1 id="title" v-show="isTitleVisible">Notes</h1>
      <input 
        type="text" 
        id="searchBar" 
        v-show="!isTitleVisible" 
        placeholder="Search note" 
        @keyup.enter="logSearch"
      >

      <div id="buttonsDiv">
        <div class="buttonsDivSection center" id="searchBtn" @click="toggleSearch">
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
  },
  data() {
    return {
      isTitleVisible: true
    };
  },
  methods: {
    toggleSearch() {
      this.isTitleVisible = !this.isTitleVisible;
    },
    logSearch(event) {
      let seacrhText = event.target.value;
    }
  }
}
</script>
