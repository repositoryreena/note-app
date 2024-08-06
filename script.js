const container = document.getElementById("container");
const plus = document.getElementById("plus");

function saveNotes() {
    const textareas = document.getElementsByTagName('textarea');
    const notes = Array.from(textareas).map(textarea => ({
        value: textarea.value,
        placeholder: textarea.placeholder
    }));
    console.log("Saving notes:", notes);
    localStorage.setItem('notes', JSON.stringify(notes));
}

plus.addEventListener("click", () => {
    const newTextarea = document.createElement("textarea");
    newTextarea.className = "box";
    newTextarea.placeholder = "Empty note";
    container.insertBefore(newTextarea, plus);
    saveNotes();
});

function handleTextareaDoubleClick(event) {
    if (event.target.tagName.toLowerCase() === 'textarea') {
        const confirmation = confirm("Do you want to delete this note?");
        if (confirmation) {
            event.target.remove();
            saveNotes();
        }
    }
}

container.addEventListener("dblclick", handleTextareaDoubleClick);

window.addEventListener('load', () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    console.log("Loaded notes:", savedNotes);
    savedNotes.forEach(note => {
        const newTextarea = document.createElement("textarea");
        newTextarea.className = "box";
        newTextarea.placeholder = note.placeholder || '';
        newTextarea.value = note.value || '';
        container.insertBefore(newTextarea, plus);
    });
});

