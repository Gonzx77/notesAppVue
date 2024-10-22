<template>
  <div>
    <div v-if="notes.length > 0">
      <div
        v-for="note in notes"
        :key="note._id"
        class="noteDiv"
        :title="note.contenido.length > 30 ? note.contenido.substring(0, 30) + '...' : note.contenido"
        :style="{ backgroundColor: getRandomCreamColor() }"
      >
        <h1 class="noteTitle">{{ note.titulo }}</h1>
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
      notes: []
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
    const r = Math.floor(Math.random() * 56 + 150);
    const g = Math.floor(Math.random() * 56 + 150);
    const b = Math.floor(Math.random() * 56 + 100);
    return `rgb(${r}, ${g}, ${b})`;
  }
  }
}
</script>

