import $ from "jquery";

class myNotes {
  constructor() {
    this.events();
  }

  events() {
    $(".delete-note").on("click", this.deleteNote);
    $(".edit-note").on("click", this.editNote.bind(this));
    $(".update-note").on("click", this.updateNote.bind(this));

  }

  //Methods will g here

  deleteNote(e) {
    var thisNote = $(e.target).parent('li')

    $.ajax({
      beforeSend: (xhr) =>{
        xhr.setRequestHeader('X-WP-Nonce',universitydata.nonce);
      },
      url: universitydata.root_url + "/wp-json/wp/v2/note/"+thisNote.data('id'),
      type: "DELETE",
      success: (response) => {
        thisNote.slideUp();
        console.log("congrat");
        console.log(response);
      },
      error: (response) => {
        console.log("sorry");
        console.log(response);
      },
    });
  }

// Update note

updateNote(e) {
    var thisNote = $(e.target).parent('li');

    var ourUpdatedPost = {
        'title': thisNote.find(".note-title-field").val(),
        'content':thisNote.find(".note-body-field").val(),
    };

    $.ajax({
      beforeSend: (xhr) =>{
        xhr.setRequestHeader('X-WP-Nonce',universitydata.nonce);
      },
      url: universitydata.root_url + "/wp-json/wp/v2/note/"+thisNote.data('id'),
      type: "POST",
      data: ourUpdatedPost,
      success: (response) => {
        this.makeNoteReadonly(thisNote);
        console.log("congrat");
        console.log(response);
      },
      error: (response) => {
        console.log("sorry");
        console.log(response);
      },
    });
  }

  // Edit Note Methods


  editNote(e) {
    var thisNote = $(e.target).parent('li');

    if(thisNote.data("state")=='editable') {
        // make read only
        this.makeNoteReadonly(thisNote);
    } else {
        // make editable
        this.makeNoteEditable(thisNote);
    }

  }


  makeNoteEditable(thisNote) {
    thisNote.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i>Cancel');
    thisNote.find(".note-title-field, .note-body-field").removeAttr("readonly").addClass("note-active-field");
    thisNote.find(".update-note").addClass("update-note--visible");
    thisNote.data("state","editable");

  };


  makeNoteReadonly(thisNote) {
    thisNote.find(".edit-note").html('<i class="fa fa-pencil" aria-hidden="true"></i>Edit');
    thisNote.find(".note-title-field, .note-body-field").attr("readonly","readonly").removeClass("note-active-field");
    thisNote.find(".update-note").removeClass("update-note--visible");
    thisNote.data("state","cancel");

  }





}

export default myNotes;
