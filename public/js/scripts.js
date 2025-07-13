document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded ✅");

  const todoForm = document.querySelector(".todo-form");
  const taskInput = todoForm.querySelector('input[name="task"]');

  todoForm.addEventListener("submit", (e) => {
    if (taskInput.value.trim() === "") {
      e.preventDefault();
      alert("Task field cannot be empty!");
    }
  });
});
