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

    <div v-if="showInfoBtn && selectedNote && selectedNote._id" @click="deleteNote" class="buttonsDivSection center" id="deleteBtn">
      <img class="menuIcon2" src="../../public/images/trash.svg">
    </div>

    <div v-if="showInfoBtn" @click="saveNote" class="buttonsDivSection center" id="saveBtn">
      <img class="menuIcon" src="../../public/images/save.svg">
    </div>

    <div v-if="showInfoBtn" @click="refreshPage" class="buttonsDivSection center" id="backBtn">
      <img class="menuIcon" src="../../public/images/back.svg">
    </div>

    <div id="addBtn" class="center" @click="createNewNote">
      <img class="menuIcon" src="../../public/images/add.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'notes',
  props: {
    notes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedNote: null,
      showInfoBtn: false,
    };
  },
  methods: {
    getRandomCreamColor() {
      const r = Math.floor(Math.random() * 80 + 60);
      const g = Math.floor(Math.random() * 80 + 60);
      const b = Math.floor(Math.random() * 80 + 60);
      return `rgb(${r}, ${g}, ${b})`;
    },
    refreshPage() {
      const confirmation = confirm(
`¿Estas seguro de retroceder? 
Todo cambio sin guardar sera descartado !`);
      if (confirmation) {
        window.location.reload();
      }
    },
    async deleteNote() {
      if (this.selectedNote && this.selectedNote._id) {
        const confirmation = confirm('¿Desea eliminar la nota?');
        if (confirmation) {
          window.location.reload();
          try {
            const response = await fetch('http://localhost:5000/notes/delete', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: this.selectedNote._id,
              })
            });
          } catch (error) {
            console.error('Error al eliminar la nota:', error);
          }
        }
      }
    },
    async saveNote() {
      if (this.selectedNote) {
        const confirmation = confirm('¿Desea guardar la nota?');
        if (confirmation) {
          try {
            const response = await fetch('http://localhost:5000/notes/update', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: this.selectedNote._id,
                titulo: this.selectedNote.titulo,
                contenido: this.selectedNote.contenido
              })
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`Error al guardar la nota: ${errorData.message || 'Error desconocido'}`);
            }

            alert('Nota guardada')
          } catch (error) {
            console.error('Error al guardar la nota:', error);
          }
        }
      }
    },
    selectNote(note) {
      this.selectedNote = note;
      this.hideMenuButtons();
      this.showInfoBtn = true;
    },
    createNewNote() {
      this.selectedNote = {
        _id: null,
        titulo: '',
        contenido: ''
      };
      this.hideMenuButtons();
      this.showInfoBtn = true;
    },
    hideMenuButtons() {
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
    }
  }
}
</script>
