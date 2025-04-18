window.addEventListener("DOMContentLoaded", () => {
  //textarea auto-resize

  function setupAutoResizing() {
    const textareas = document.querySelectorAll(".textarea-b");

    textareas.forEach((textarea) => {
      // Prevent duplicate listeners
      textarea.removeEventListener("input", autoResizeWrapper);
      textarea.addEventListener("input", autoResizeWrapper);
    });
  }

  function autoResizeWrapper(event) {
    autoResize(event.target);
  }

  function autoResize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  setupAutoResizing();

  document.addEventListener("submit", (event) => {
    if (event.target.matches("#note-form, #todo-form")) {
      document.querySelectorAll(".textarea-b").forEach((textarea) => {
        textarea.style.height = "auto";
      });
    }
  });

  //theme switch

  let currentTheme = null;

  function setTheme(theme) {
    if (currentTheme === theme) return; // Do nothing if already active

    const root = document.documentElement;

    if (theme === "themeA") {
      root.style.setProperty("--clr-primary-200", "#76abae");
    } else if (theme === "themeB") {
      root.style.setProperty("--clr-primary-200", "#882000");
    }
    currentTheme = theme;
  }
  //form option

  const choiceNotes = document.getElementById("choice-notes");
  const choiceTodo = document.getElementById("choice-todo");
  const choiceBtn = document.querySelectorAll(".choice-btn");

  const formBox = document.getElementById("form-box");

  document.addEventListener("click", function (event) {
    const clickedBtn = event.target.closest(".choice-btn");

    if (clickedBtn) {
      choiceBtn.forEach((btn) => {
        btn.classList.remove("active");
      });
      clickedBtn.classList.add("active");

      if (clickedBtn === choiceNotes) {
        formBox.innerHTML = `
          <h1>Take a Note</h1>
          <form class="form-layout" id="note-form">
            <div class="input-field-spacing">
              <label for="title">Title</label>
              <input
                class="form-field form-text"
                type="text"
                id="title"
                placeholder="Title..."
                required
              />
            </div>
            <div class="input-field-spacing">
              <label for="note">Note</label>
              <textarea
                class="form-field form-text textarea-b"
                id="note"
                placeholder="Note..."
                required
                rows="1"
              ></textarea>
            </div>
            <div class="input-field-spacing">
              <label for="tags">Tags</label>
              <div class="tag-box">
                <select
                  name="tags"
                  class="form-field"
                  id="tags-container"
                  required
                >
                  <option value="Inbox">Inbox</option>
                  <option value="school">School</option>
                  <option value="programming">Programming</option>
                </select>
                <button
                  type="button"
                  class="note-btn form-btn"
                  id="new-tag-btn"
                >
                  New Tag
                </button>
              </div>
            </div>
            <button type="submit" class="note-btn form-btn" id="submit-btn">
              Submit
            </button>
          </form>`;
        setupAutoResizing();
        setTheme("themeA");
      } else if (clickedBtn === choiceTodo) {
        formBox.innerHTML = `
       <h1>Add To-Dos</h1>
          <form class="form-layout" id="todo-form">
            <div class="input-field-spacing">
              <label for="title">Title</label>
              <input
                class="form-field form-text"
                type="text"
                id="title"
                placeholder="Title..."
                required
              />
            </div>
            <div class="input-field-spacing">
              <label for="task">Task</label>
              <textarea
                class="form-field form-text textarea-b"
                id="task"
                placeholder="Task..."
                required
                rows="1"
              ></textarea>
            </div>

            <button type="submit" class="todo-btn form-btn" id="submit-btn">
              Submit
            </button>
          </form>`;
        setupAutoResizing();
        setTheme("themeB");
      }
    }
  });
});
