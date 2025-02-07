document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

// 添加任务
function addTask() {
    let input = document.getElementById("todo-input");
    let taskText = input.value.trim();

    if (taskText !== "") {
        let list = document.getElementById("todo-list");
        let li = document.createElement("li");

        // 创建拖动按钮
        let dragHandle = document.createElement("span");
        dragHandle.textContent = "≡";
        dragHandle.classList.add("drag-handle");

        // 创建完成按钮
        let completeBtn = document.createElement("button");
        completeBtn.textContent = "✅";
        completeBtn.onclick = function () { toggleComplete(this); };

        // 创建删除按钮
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = function () { removeTask(this); };

        // 组合元素
        li.appendChild(dragHandle);
        li.appendChild(completeBtn);
        li.appendChild(document.createTextNode(taskText)); // 任务文本
        li.appendChild(deleteBtn);
        list.appendChild(li);

        saveTasks();
        input.value = "";
    }
}

// 切换任务是否完成
function toggleComplete(button) {
    let li = button.parentElement;
    li.classList.toggle("completed");  // 切换完成状态
    saveTasks();
}

// 删除任务
function removeTask(button) {
    let li = button.parentElement;
    li.remove();
    saveTasks();
}

// 保存任务到 localStorage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        tasks.push({
            text: li.childNodes[2].textContent.trim(),  // 任务文本
            completed: li.classList.contains("completed")  // 是否完成
        });
    });
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// 加载任务
function loadTasks() {
    let savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
        let list = document.getElementById("todo-list");
        JSON.parse(savedTasks).forEach(taskData => {
            let li = document.createElement("li");

            // 创建拖动按钮
            let dragHandle = document.createElement("span");
            dragHandle.textContent = "≡";
            dragHandle.classList.add("drag-handle");

            // 创建完成按钮
            let completeBtn = document.createElement("button");
            completeBtn.textContent = "✅";
            completeBtn.onclick = function () { toggleComplete(this); };

            // 创建删除按钮
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.onclick = function () { removeTask(this); };

            li.appendChild(dragHandle);
            li.appendChild(completeBtn);
            li.appendChild(document.createTextNode(taskData.text)); // 任务文本
            li.appendChild(deleteBtn);
            list.appendChild(li);

            if (taskData.completed) {
                li.classList.add("completed");
            }
        });
    }
}

// 让任务可以拖动排序
new Sortable(document.getElementById("todo-list"), {
    animation: 150,
    handle: ".drag-handle",
    onEnd: function () { saveTasks(); }
});
