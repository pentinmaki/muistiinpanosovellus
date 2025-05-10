document.getElementById('addNoteButton').addEventListener('click', function() {
  const noteInput = document.getElementById('noteInput');
  const noteText = noteInput.value.trim();

  if (noteText !== '') {
    addNoteToList(noteText);
    saveNotes();  // Tallennetaan muistiinpanot
    noteInput.value = ''; // Tyhjennetään kenttä
  }
});

// Funktio, joka lisää muistiinpanon listaan
function addNoteToList(noteText) {
  const noteList = document.getElementById('noteList');

  const noteItem = document.createElement('li');
  noteItem.classList.add('noteItem');
  noteItem.textContent = noteText;

  // Poista-nappi
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('deleteButton');
  deleteButton.textContent = 'Poista';
  deleteButton.addEventListener('click', function() {
    noteList.removeChild(noteItem);
    saveNotes();  // Tallennetaan muistiinpanot
  });

  // Muokkaus-nappi
  const editButton = document.createElement('button');
  editButton.classList.add('editButton');
  editButton.textContent = 'Muokkaa';
  editButton.addEventListener('click', function() {
    const newText = prompt('Muokkaa muistiinpanoa:', noteItem.textContent);
    if (newText !== null && newText.trim() !== '') {
      noteItem.textContent = newText.trim(); // Päivitetään muistiinpano
      noteItem.appendChild(editButton); // Lisätään muokkauspainike takaisin
      noteItem.appendChild(deleteButton); // Lisätään poisto-painike takaisin
      saveNotes();  // Tallennetaan muistiinpanot
    }
  });

  // Lisää painikkeet muistiinpanoon
  noteItem.appendChild(editButton);
  noteItem.appendChild(deleteButton);

  // Lisää muistiinpano listaan
  noteList.appendChild(noteItem);
}

// Tallentaa muistiinpanot localStorageen
function saveNotes() {
  const notes = [];
  const noteItems = document.querySelectorAll('.noteItem');

  noteItems.forEach(item => {
    notes.push(item.textContent.replace('MuokkaaPoista', ''));  // Poistetaan painikkeet tekstistä
  });

  localStorage.setItem('notes', JSON.stringify(notes));  // Tallennetaan taulukko localStorageen
}

// Lataa muistiinpanot localStoragesta
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem('notes'));
  if (savedNotes) {
    savedNotes.forEach(note => {
      addNoteToList(note);
    });
  }
}

// Ladataan muistiinpanot sivun latautuessa
window.onload = function() {
  loadNotes();
}
