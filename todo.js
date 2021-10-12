
// Get the new note input box.
const newItemInput = document.getElementById("new-item");

// Get the label for the mark all complete checkbox.
const markAllCompleteLabel = document.querySelector("#mark-all-complete + label");

// Get the mark all complete checkbox.
const markAllCompleteInput = document.querySelector("#mark-all-complete");

// Get the note template.
const noteTemplate = document.getElementById("note-template");
noteTemplate.remove();
delete noteTemplate.id;

// Get the list to add notes to.
const noteList = document.getElementById("notes");

// Get the dashboard div.
const dashboard = document.getElementById("dashboard");

// Get the main element.
const main = document.querySelector("main");

// Get the clear all button.
const clearButton = document.getElementById("clear");

// Get the label associated with the clear button.
const clearButtonLabel = document.querySelector("#clear + label");

clearButton.onclick = event => {
    clearCompleted(noteList);
}


// Make mutation observer to update page content when notes change.
const config = { attributes: true, childList: true, subtree: true };
const callback = function(mutationsList, observer){
    countNotes(noteList);
};
const observer = new MutationObserver(callback);
observer.observe(main, config);

// Add event handler for making new note.
newItemInput.onkeydown = event => {
    // If enter was pressed and input has a value.
    if (event.keyCode === 13 && newItemInput.value) {
        // Make new note.
        let note = createNewNote(noteTemplate, newItemInput.value);
        noteList.appendChild(note);
        // Empty the input field.
        newItemInput.value = null;
        // Change parts of page depending on number of notes.
    }
};

// Add event handler for marking all complete/incomplete.
markAllCompleteInput.onchange = event => {
    // Get all notes.
    const notes = noteList.querySelectorAll("li");
    markAllAsComplete(markAllCompleteInput, notes);
};

// Add event handler to All filter.
const allFilterInput = dashboard.querySelector("#all");
allFilterInput.onclick = event => {
    changeNoteFilter("all", noteList);
};

// Add event handler to Active filter.
const activeFilterInput = dashboard.querySelector("#active");
activeFilterInput.onclick = event => {
    changeNoteFilter("active", noteList);
};

// Add event handler to Completed filter.
const completedFilterInput = dashboard.querySelector("#completed");
completedFilterInput.onclick = event => {
    changeNoteFilter("completed", noteList);
};

function createNewNote(template, content){
    // Clone note template.
    const newNote = template.cloneNode(true);
    // Add note content.
    const noteInput = newNote.querySelector("#note-text");
    noteInput.value = content;
    noteInput.ondblclick = event => {
        noteInput.readOnly = false;
        // Replace value to remove highligting.
        const oldValue = noteInput.value;
        noteInput.value = "";
        noteInput.value = oldValue;
        noteInput.classList.add('note-focused');
        newNote.querySelector("#mark-complete").style.visibility = "hidden";
        newNote.querySelector("#delete").style.display = "none";
    };
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
        // If enter was pressed and input has a value.
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
    // Get the delete button.
    const deleteButton = newNote.querySelector("#delete");
    
    // Get the mark complete button.
    const markComplete = newNote.querySelector("#mark-complete");

    // Add event handler for deleting.
    deleteButton.onclick = event => {
        deleteNote(newNote);
    };

    // Add event handler for marking as finished.
    markComplete.onchange = event => {
        markAsComplete(newNote, markComplete);
    }

    return newNote;
}


function deleteNote(note){
    note.remove();
}


function markAsComplete(note, checkbox){
    // Get p element in note.
    const noteText = note.querySelector("p");
    // Change style if marked as complete.
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
        // Reveal the mark all complete button.
        markAllCompleteLabel.style.visibility = "visible";
        // Reveal dashboard.
        dashboard.style.display = "flex";
    }
    else {
        // Hide the mark all complete button.
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
    
    // Display or hide clear completed button.
    if(numberOfFinished > 0){
        clearButtonLabel.style.visibility = "visible";
    }
    else{
        clearButtonLabel.style.visibility = "hidden";
    }

}


function changeNoteFilter(filter, noteList){
    const notes = noteList.querySelectorAll("li");
    if (filter === "all") {
        for (const note of notes) {
            note.style.display = "flex";
        }
    }
    else if(filter === "active")
    {
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
    else if(filter === "completed"){
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
