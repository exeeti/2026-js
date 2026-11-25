const container = document.querySelector("#forms-container");
const template = document.querySelector("#password-template");
const addButton = document.querySelector(".btn-add");

function addForm(focusInput = false) {
  const form = template.content.firstElementChild.cloneNode(true);
  const input = form.querySelector(".password-input");
  const output = form.querySelector(".placeholder");
  const checkboxes = form.querySelectorAll(".vowels-area input");
  const toggleButton = form.querySelector(".btn-toggle");
  const deleteButton = form.querySelector(".btn-delete");

  function updateOutput() {
    const selectedVowels = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.dataset.vowel);

    const result = Array.from(input.value, character =>
      selectedVowels.includes(character.toLowerCase()) ? "*" : character
    ).join("");

    output.textContent = result || "здесь будет пароль";
    output.classList.toggle("placeholder", input.value === "");
  }

  input.addEventListener("input", updateOutput);
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updateOutput);
  });

  toggleButton.addEventListener("click", () => {
    const showPassword = input.type === "password";
    input.type = showPassword ? "text" : "password";
    toggleButton.textContent = showPassword ? "Скрыть" : "👁️ Показать";
  });

  deleteButton.addEventListener("click", () => {
    form.remove();
    addButton.focus();
  });

  container.append(form);
  if (focusInput) input.focus();
}

addButton.addEventListener("click", () => addForm(true));
addForm();
