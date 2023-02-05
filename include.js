//shwoing  the saved notes
shownotes();


//Function to add notes in local storage using click event
let btn = document.getElementById('btn');
btn.addEventListener('click', function () {
    let title = document.getElementById('title-box');
    let addnotes = document.getElementById('write-box');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        //initalize noteObj as an array
        noteObj = [];
        // alert("pls add notes");
    }
    else {
        noteObj = JSON.parse(notes);
    }
    //initialize myObj as an object
    let myObj = {
        //title's value will be the value entered by user in title box
        title: title.value,
        note: addnotes.value,
        class: 'saved-notes',
        buttonHTM : 'important'
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
        //the values that are stored in myObj object are then pushed into the noteObj array which was initialized above when notes are null
        noteObj.push(myObj);
        //noteObj is an array . The array is then converted to string and is added to local storage finally
        localStorage.setItem("notes", JSON.stringify(noteObj));
        title.value = "";//this will empty the text area value after adding the note
        addnotes.value = "";//this will empty the text area value after adding the note
        shownotes();
    }
    window.location.reload();
});



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
        // console.log(element);
        // console.log(index);
        html += ` 
        <div class=${element.class} id="saved-notes${index}">
        <h4 class="saved-heading">${element.title}</h4>
        <p id="p${index}">${element.note}</p><br>
        <div class= "both-btn">
        <img src="img/delete.png" class="delete" id="${index}" onclick="deleteNote(this.id)">
        <button class="imp" id="imp${index}" >${element.buttonHTM}</button>
        </div>
        </div>
        `
    });
    // console.log(Array(Array(notes)));

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
    let a = confirm('Delete this note?');
    if (a == true) {
        // console.log(a);
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

}

//function to mark note as important
let imp = document.getElementsByClassName('imp');
Array.from(imp).forEach((imp) => {
    imp.addEventListener('click', e => {
        //to get the index number of the note marked to be important
        let num = e.target.id.slice(3);
        //getting local storage data
      let storage = localStorage.getItem('notes');
      if(storage == null){
        // if it is null then noteObj is defined as an array
        noteObj = [];
      }
      else{
        //else the data is parsed in the noteObj array
        noteObj = JSON.parse(storage);
      }
    if(noteObj[num].class == 'saved-notes' && noteObj[num].buttonHTM == 'important'){

        noteObj[num].class = 'imp-note';
        noteObj[num].buttonHTM = 'un-imp';
        //after updating the data in js the data is updated to local storage for permanent change
        localStorage.setItem('notes',JSON.stringify(noteObj));
        //page need to be reloaded to deploy changes
        window.location.reload();
    }
    else{
        noteObj[num].class = 'saved-notes';
        noteObj[num].buttonHTM = 'important';
        localStorage.setItem('notes',JSON.stringify(noteObj));
        window.location.reload();
    }
    })
})
