const newTagBtn = document.getElementById("new-tag-btn");
const tagsContainer = document.getElementById("tags-container");

function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

window.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("note");
  textarea.addEventListener("input", () => autoResize(textarea));
});
