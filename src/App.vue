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
      <notes :notes="filteredNotes" />
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
      isTitleVisible: true,
      allNotes: [],
      filteredNotes: []
    };
  },
  methods: {
    toggleSearch() {
      this.isTitleVisible = !this.isTitleVisible;
    },
    async logSearch(event) {
      const searchText = event.target.value;

      try {
        const response = await fetch(`https://notes-app-vue-zeta.vercel.app/notes/search?text=${searchText}`);
        if (!response.ok) throw new Error('Error en la red');
        const data = await response.json();

        this.filteredNotes = data;

        event.target.value = '';
      } catch (error) {
        console.error('Error al buscar notas:', error);
      }
    }
  },
  async mounted() {
    try {
      const response = await fetch('https://notes-app-vue-zeta.vercel.app/notes');
      if (!response.ok) throw new Error('Error en la red');
      const data = await response.json();
      this.allNotes = data;
      this.filteredNotes = data;
    } catch (error) {
      console.error('Error al obtener notas:', error);
    }
  }
}
</script>
