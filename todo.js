
const newItemInput = document.getElementById("new-item");

const markAllCompleteLabel = document.querySelector("#mark-all-complete + label");

const markAllCompleteInput = document.querySelector("#mark-all-complete");

const noteTemplate = document.getElementById("note-template");
noteTemplate.remove();
delete noteTemplate.id;

const noteList = document.getElementById("notes");

const dashboard = document.getElementById("dashboard");

const main = document.querySelector("main");

const clearButton = document.getElementById("clear");

const clearButtonLabel = document.querySelector("#clear + label");


clearButton.onclick = event => {
    clearCompleted(noteList);
}

// Make mutation observer to update page content when notes change.
const config = { attributes: true, childList: true, subtree: true };
const callback = function(mutationsList, observer){
    countNotes(noteList);
    saveToLocalStorage();
};
const observer = new MutationObserver(callback);
observer.observe(main, config);

window.onload = event => {
    loadFromLocalStorage();
    changeNoteFilter(location.hash, noteList);
};


// Add event handler for making new note.
newItemInput.onkeydown = event => {
    // If enter was pressed and input has a value.
    if (event.keyCode === 13 && newItemInput.value) {
        createNewNote(noteTemplate, newItemInput.value);
        // Empty the input field.
        newItemInput.value = null;
    }
};


markAllCompleteInput.onchange = event => {
    const notes = noteList.querySelectorAll("li");
    markAllAsComplete(markAllCompleteInput, notes);
};

const allFilterInput = dashboard.querySelector("#all");
allFilterInput.onclick = event => {
    location.hash = "all";
    changeNoteFilter(location.hash, noteList);
};


const activeFilterInput = dashboard.querySelector("#active");
activeFilterInput.onclick = event => {
    location.hash = "active";
    changeNoteFilter(location.hash, noteList);
};


const completedFilterInput = dashboard.querySelector("#completed");
completedFilterInput.onclick = event => {
    location.hash = "completed";
    changeNoteFilter(location.hash, noteList);
};

function createNewNote(template, content, finished = false){
    // Clone note template.
    const newNote = template.cloneNode(true);
    // Add note content.
    const noteInput = newNote.querySelector("#note-text");
    noteInput.value = content;
    
    noteInput.ondblclick = event => {
        // Make note editable.
        noteInput.readOnly = false;

        // Replace value to remove highligting.
        const oldValue = noteInput.value;
        noteInput.value = "";
        noteInput.value = oldValue;

        // Display border and shadow with note-focused class.
        noteInput.classList.add('note-focused');
        // Hide mark complete button and delete button while editing.
        newNote.querySelector("#mark-complete").style.visibility = "hidden";
        newNote.querySelector("#delete").style.display = "none";
    };
    // Unfocus event (e.g. clicking away).
    noteInput.onblur = event => {
        noteInput.readOnly = true;
        if(noteInput.value === "") {
            newNote.remove();
        }
        noteInput.classList.remove('note-focused');
        newNote.querySelector("#mark-complete").style.visibility = "visible";
        newNote.querySelector("#delete").style.display = "block";
    };
    noteInput.onkeydown = event => {
        // If enter was pressed.
        if (event.keyCode === 13) {
            noteInput.readOnly = true;
            if(noteInput.value === "") {
                newNote.remove();
            }
            noteInput.classList.remove('note-focused');
            newNote.querySelector("#mark-complete").style.visibility = "visible";
            newNote.querySelector("#delete").style.display = "block";
        }
    };
    const deleteButton = newNote.querySelector("#delete");

    const markComplete = newNote.querySelector("#mark-complete");
    
    // Set the status of note loaded from localStorage.
    markComplete.checked = finished;

    deleteButton.onclick = event => {
        newNote.remove();
    };

    markComplete.onchange = event => {
        markAsComplete(newNote, markComplete);
    }
    noteList.appendChild(newNote);
}


function markAsComplete(note, checkbox){

    const noteText = note.querySelector("#note-text");
    // Change style if marked as finished/unfinished.
    if (checkbox.checked){
        noteText.style.textDecoration = "line-through";
        noteText.style.color = "#d9d9d9";
    }
    else{
        noteText.style.textDecoration = "none";
        noteText.style.color = "#4d4d4d";
    }
}


function markAllAsComplete(checkbox, notes){
    
    if(checkbox.checked){
        for (const note of notes) {
            const noteCheckbox = note.querySelector("#mark-complete");
            noteCheckbox.checked = true;
            markAsComplete(note, noteCheckbox);
        }
    }else{
        for (const note of notes) {
            const noteCheckbox = note.querySelector("#mark-complete");
            noteCheckbox.checked = false;
            markAsComplete(note, noteCheckbox);
        } 
    }
}


function countNotes(noteList){
    const numberOfNotes = noteList.querySelectorAll("li").length;
    let numberOfUnfinished = 0;
    let numberOfFinished = 0;
    if (numberOfNotes > 0){
        markAllCompleteLabel.style.visibility = "visible";
        // Reveal dashboard.
        dashboard.style.display = "flex";
    }
    else {
        markAllCompleteLabel.style.visibility = "hidden";
        // Hide the dashboard.
        dashboard.style.display = "none";
    }

    const notes = noteList.querySelectorAll("li");
    // Count number of unfinished notes.
    for (const note of notes) {
        const noteCheckbox = note.querySelector("#mark-complete");
        if(!noteCheckbox.checked){
            numberOfUnfinished++;
        }
        else{
            numberOfFinished++;
        }
    }

    // Update items left counter.
    const itemsCounter = dashboard.querySelector("#items-left-counter");
    if(numberOfUnfinished === 1){
        itemsCounter.textContent = `${numberOfUnfinished} item left`;
    }
    else {
        itemsCounter.textContent = `${numberOfUnfinished} items left`;
    }

    if(numberOfFinished > 0){
        clearButtonLabel.style.visibility = "visible";
    }
    else{
        clearButtonLabel.style.visibility = "hidden";
    }
}


function changeNoteFilter(filter, noteList){
    const notes = noteList.querySelectorAll("li");
    if (filter === "#all") {
        // Click the filter button on page reload to highlight it.
        dashboard.querySelector("#all").checked = true;
        // Display all notes.
        for (const note of notes) {            
            note.style.display = "flex";
        }
    }
    else if(filter === "#active")
    {
        dashboard.querySelector("#active").checked = true;
        // Display only unfinished notes.
        for (const note of notes) {
            const noteCheckbox = note.querySelector("#mark-complete");
            if(noteCheckbox.checked){
                note.style.display = "none";
            }
            else {
                note.style.display = "flex";
            }
        }
    }
    else if(filter === "#completed"){
        dashboard.querySelector("#completed").checked = true;
        // Display only finished notes.
        for (const note of notes) {
            const noteCheckbox = note.querySelector("#mark-complete");
            if(noteCheckbox.checked){
                note.style.display = "flex";
            }
            else {
                note.style.display = "none";
            }
        }
    }
}


function clearCompleted(noteList){
    const notes = noteList.querySelectorAll("li");    
    for (const note of notes) {
        const noteCheckbox = note.querySelector("#mark-complete");
        if(noteCheckbox.checked){
            note.remove();
        }
    }
}


function saveToLocalStorage(){
    // Clear previous notes to overwrite, not append.
    localStorage.clear();

    const notes = noteList.querySelectorAll("li");
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const text = note.querySelector("#note-text").value;
        const progress = note.querySelector("#mark-complete").checked;
        // Save the content of the note.
        localStorage.setItem(`${i}-content`, text);
        // Save the progress state of the note.
        localStorage.setItem(`${i}-finished`, Number(progress));
    }
}

function loadFromLocalStorage(){
    // Grab content and progress properties for each note.
    for (let i = 0; i < localStorage.length / 2; i++) {
        const noteContent = localStorage.getItem(`${i}-content`);
        const noteFinished = Number(localStorage.getItem(`${i}-finished`));
        createNewNote(noteTemplate, noteContent, Boolean(noteFinished));
    }
}
