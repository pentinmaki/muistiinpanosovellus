document.getElementById('addNoteButton').addEventListener('click', function() {
  const noteInput = document.getElementById('noteInput');
  const noteText = noteInput.value.trim();

  if (noteText !== '') {
    addNoteToList(noteText);
    noteInput.value = ''; // Tyhjennetään kenttä
  }
});

function addNoteToList(noteText) {
  const noteList = document.getElementById('noteList');

  const noteItem = document.createElement('li');
  noteItem.classList.add('noteItem');
  noteItem.textContent = noteText;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('deleteButton');
  deleteButton.textContent = 'Poista';
  deleteButton.addEventListener('click', function() {
    noteList.removeChild(noteItem);
  });

  noteItem.appendChild(deleteButton);
  noteList.appendChild(noteItem);
}
