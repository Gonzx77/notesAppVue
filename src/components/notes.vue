<template>
  <div>
    <div class="noteOpenDiv" v-if="selectedNote">
      <div class="noteOpenDivSection">
        <input v-model="selectedNote.titulo" class="noteTitleInput" placeholder="Titulo..." />
      </div>
      <div class="noteOpenDivSection">
        <textarea v-model="selectedNote.contenido" class="noteContentInput" placeholder="Contenido..."></textarea>
      </div>
    </div>
    
    <div v-else-if="notes.length > 0">
      <div
        v-for="note in notes"
        :key="note._id"
        class="noteDiv"
        :title="note.contenido.length > 30 ? note.contenido.substring(0, 30) + '...' : note.contenido"
        :style="{ backgroundColor: getRandomCreamColor() }"
        @click="selectNote(note)"
      >
        <h1 class="noteTitle">{{ note.titulo.length > 44 ? note.titulo.substring(0, 44) + '...' : note.titulo }}</h1>
      </div>
    </div>

    <div v-else id="noNotesYet">
      <img id="noNotesImg" src="../../public/images/noNotes.svg" alt="No notes">
      <p id="noNotesText">Create your first note!</p>
    </div>

    <div v-if="showInfoBtn" @click="saveNote" class="buttonsDivSection center" id="saveBtn">
      <img class="menuIcon" src="../../public/images/save.svg">
    </div>

    <div v-if="showInfoBtn" @click="goBack" class="buttonsDivSection center" id="backBtn">
      <img class="menuIcon" src="../../public/images/back.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'notes',
  data() {
    return {
      notes: [],
      selectedNote: null,
      showInfoBtn: false,
    };
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:5000/notes');
      if (!response.ok) throw new Error('Error en la red');
      const data = await response.json();
      this.notes = data;
    } catch (error) {
      console.error('Error al obtener notas:', error);
    }
  },
  methods: {
    getRandomCreamColor() {
      const r = Math.floor(Math.random() * 80 + 60);
      const g = Math.floor(Math.random() * 80 + 60);
      const b = Math.floor(Math.random() * 80 + 60);
      return `rgb(${r}, ${g}, ${b})`;
    },
    saveNote() {
      if (this.selectedNote) {
        console.log({
          id: this.selectedNote._id,
          titulo: this.selectedNote.titulo,
          contenido: this.selectedNote.contenido
        });
      } else {
        console.log('No hay ninguna nota seleccionada');
      }
    },
    selectNote(note) {
      this.selectedNote = note;

      const addBtn = document.getElementById('addBtn');
      const searchBtn = document.getElementById('searchBtn');
      const infoBtn = document.getElementById('infoBtn');
      const title = document.getElementById('title');

      if (addBtn) {
        addBtn.style.display = 'none';
      }
      if (searchBtn) {
        searchBtn.style.opacity = 0;
        searchBtn.style.cursor = 'default';
      }
      if (infoBtn) {
        infoBtn.style.display = 'none';
      }
      if (title) {
        title.style.display = 'none';
      }

      this.showInfoBtn = true;
    },
    goBack() {
      const addBtn = document.getElementById('addBtn');
      const searchBtn = document.getElementById('searchBtn');
      const infoBtn = document.getElementById('infoBtn');
      const title = document.getElementById('title');

      if (addBtn) {
        addBtn.style.display = 'flex';
      }
      if (searchBtn) {
        searchBtn.style.opacity = 1;
        searchBtn.style.cursor = 'pointer';
      }
      if (infoBtn) {
        infoBtn.style.display = 'flex';
      }
      if (title) {
        title.style.display = 'flex';
      }

      this.selectedNote = null;

      this.showInfoBtn = false;
    },
  }
}
</script>