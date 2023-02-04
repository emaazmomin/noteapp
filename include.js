//shwoing  the saved notes
shownotes();


//Function to add notes in local storage using click event
let btn = document.getElementById('btn');
btn.addEventListener('click', function() {
    let title = document.getElementById('title-box');
    let addnotes = document.getElementById('write-box');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
        // alert("pls add notes");
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let myObj = {
        title: title.value,
        note: addnotes.value
    }
    //If the notes text area is empty then the alert box will appear
    if (title.value == '') {
        alert("Please add title");
        shownotes();
    }
    else if (addnotes.value == '') {
        alert("Add notes");
        shownotes();
    }
    //else the value fof text area is saved inside the notes
    else {
        
        noteObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(noteObj));
        title.value = "";//this will empty the text area value after adding the note
        addnotes.value = "";//this will empty the text area value after adding the note
        shownotes();
    }
    });
    

//function to mark note as important
let imp = document.getElementsByClassName('imp');
Array.from(imp).forEach((imp)=>{
    imp.addEventListener('click',e=>{
        // console.log(e.target);
    if(e.target.parentNode.parentNode.className == 'saved-notes'){
        e.target.parentNode.parentNode.className = 'imp-note';
        e.target.innerHTML = 'Un-Imp';
    }
    else{
        e.target.parentNode.parentNode.className = 'saved-notes';
        e.target.innerHTML = 'Important';
    }
    })
})

    // document.getElementsByClassName('imp').innerHTML = "Undo";

//function to show notes from local storage
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let html = "";
    noteObj.forEach(function (element, index) {
        html += ` 
        <div class="saved-notes" id="saved-notes${index}">
        <h4 class="saved-heading">${element.title}</h4>
        <p id="p${index}">${element.note}</p><br>
        <div class= "both-btn">
        <img src="img/delete.png" class="delete" id="${index}" onclick="deleteNote(this.id)">
        <button class="imp" id="imp${index}" >Important</button>
        </div>
        </div>
        `
    });

    let noteelem = document.getElementById("saved-notes-div");

    if (noteObj.length != 0) {
        noteelem.innerHTML = html;

    }

    else {
        noteelem.innerHTML = `<div id="no-notes">No Notes are saved</div>`;
    }

}


//delete function
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }

    noteObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    shownotes();

}




