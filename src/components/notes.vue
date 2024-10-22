<template>
  <div>
    <div class="noteOpenDiv" v-if="selectedNote">
      <div class="noteOpenDivSection">
        <input v-model="selectedNote.titulo" class="noteTitleInput" placeholder="Titulo..."/>
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
  </div>
</template>


<script>
export default {
  name: 'notes',
  data() {
    return {
      notes: [],
      selectedNote: null
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
    selectNote(note) {
      this.selectedNote = note;
    }
  }
}
</script>

