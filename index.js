const newTagBtn = document.getElementById("new-tag-btn");
const tagsContainer = document.getElementById("tags-container");

window.addEventListener("DOMContentLoaded", () => {
  //note opener

  let openContainer = null;

  document.addEventListener("click", function (event) {
    const container = event.target.closest(".note-container");

    if (container) {
      const noteUl = container.querySelector(".note-list");
      const clickedInsideUl = event.target.closest(".note-list");

      if (noteUl && !clickedInsideUl) {
        if (openContainer && openContainer !== container) {
          const openNoteUl = openContainer.querySelector(".note-list");
          openNoteUl.style.display = "none";
        }

        if (noteUl.style.display === "block") {
          noteUl.style.display = "none";
        } else {
          noteUl.style.display = "block";
        }

        openContainer = container;
      }
    } else if (openContainer) {
      const openNoteUl = openContainer.querySelector(".note-list");
      openNoteUl.style.display = "none";
      openContainer = null;
    }
  });
});
