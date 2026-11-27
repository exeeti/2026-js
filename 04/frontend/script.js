const tasksUrl = "/task";
const form = document.querySelector("#add-form");
const titleInput = document.querySelector("#title-input");
const addButton = form.querySelector("button");
const list = document.querySelector("#task-list");
const template = document.querySelector("#task-template");
const status = document.querySelector("#status");

async function request(url, method = "GET", data) {
  const options = { method };
  if (data !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

function showStatus(message = "") {
  status.textContent = message;
  status.hidden = !message;
}

function addTaskToList(task) {
  const row = template.content.firstElementChild.cloneNode(true);
  const checkbox = row.querySelector(".task-check");
  const deleteButton = row.querySelector(".task-delete");
  const taskUrl = `${tasksUrl}/${encodeURIComponent(task.id)}`;

  row.querySelector(".task-title").textContent = task.title;
  checkbox.checked = task.done;
  row.classList.toggle("done", task.done);

  function setPending(pending) {
    checkbox.disabled = pending;
    deleteButton.disabled = pending;
  }

  checkbox.addEventListener("change", async () => {
    showStatus();
    setPending(true);
    try {
      const updated = await request(taskUrl, "PUT", {
        title: task.title,
        done: checkbox.checked,
      });
      task = updated;
      checkbox.checked = task.done;
      row.classList.toggle("done", task.done);
    } catch {
      checkbox.checked = task.done;
      showStatus("Не удалось изменить состояние задачи.");
    } finally {
      setPending(false);
    }
  });

  deleteButton.addEventListener("click", async () => {
    showStatus();
    setPending(true);
    try {
      await request(taskUrl, "DELETE");
      row.remove();
    } catch {
      showStatus("Не удалось удалить задачу.");
      setPending(false);
    }
  });

  list.append(row);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (addButton.disabled) return;

  const title = titleInput.value.trim();
  if (!title) {
    showStatus("Введите название задачи.");
    titleInput.focus();
    return;
  }

  showStatus();
  addButton.disabled = true;
  titleInput.disabled = true;
  try {
    const task = await request(tasksUrl, "POST", { title });
    addTaskToList(task);
    form.reset();
  } catch {
    showStatus("Не удалось добавить задачу.");
  } finally {
    addButton.disabled = false;
    titleInput.disabled = false;
    titleInput.focus();
  }
});

async function loadTasks() {
  addButton.disabled = true;
  try {
    const tasks = await request(tasksUrl);
    tasks.forEach(addTaskToList);
  } catch {
    showStatus("Не удалось загрузить задачи. Проверьте, запущен ли сервер на порту 5000, и обновите страницу.");
  } finally {
    addButton.disabled = false;
  }
}

loadTasks();
