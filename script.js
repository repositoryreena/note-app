const container = document.getElementById("container");
const plus = document.getElementById("plus");

// Function to save notes to localStorage
function saveNotes() {
    const textareas = document.getElementsByTagName('textarea');
    const notes = Array.from(textareas).map(textarea => ({
        value: textarea.value,
        placeholder: textarea.placeholder
    }));
    console.log("Saving notes:", notes);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to add an input event listener to a textarea
function addInputListener(textarea) {
    textarea.addEventListener('input', saveNotes);
}

// Function to handle adding a new note
plus.addEventListener("click", () => {
    const newTextarea = document.createElement("textarea");
    newTextarea.className = "box";
    newTextarea.placeholder = "Empty note";
    container.insertBefore(newTextarea, plus);
    addInputListener(newTextarea); // Add the input listener to the new textarea
    saveNotes(); // Save notes after adding the new textarea
});

// Function to handle double-click event for deletion
function handleTextareaDoubleClick(event) {
    if (event.target.tagName.toLowerCase() === 'textarea') {
        const confirmation = confirm("Do you want to delete this note?");
        if (confirmation) {
            event.target.remove();
            saveNotes(); // Save notes after deleting
        }
    }
}

container.addEventListener("dblclick", handleTextareaDoubleClick);

// Function to load saved notes from localStorage
window.addEventListener('load', () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    console.log("Loaded notes:", savedNotes);
    savedNotes.forEach(note => {
        const newTextarea = document.createElement("textarea");
        newTextarea.className = "box";
        newTextarea.placeholder = note.placeholder || '';
        newTextarea.value = note.value || '';
        container.insertBefore(newTextarea, plus);
        addInputListener(newTextarea); // Add the input listener to loaded textareas
    });
});
