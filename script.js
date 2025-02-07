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

        // 创建删除按钮
        let btn = document.createElement("button");
        btn.textContent = "❌";
        btn.onclick = function () { removeTask(this); };

        // 插入文本和删除按钮
        li.textContent = taskText;
        li.appendChild(btn);
        list.appendChild(li);

        saveTasks();
        input.value = "";
    }
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
        let taskContent = li.firstChild.textContent.trim();  // 只存任务文本
        tasks.push(taskContent);
    });
    localStorage.setItem("todoTasks", JSON.stringify(tasks));

    // 调试日志（可以打开浏览器 F12 控制台查看）
    console.log("已保存的任务列表：", localStorage.getItem("todoTasks"));
}

// 加载任务
function loadTasks() {
    let savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
        let list = document.getElementById("todo-list");
        JSON.parse(savedTasks).forEach(taskText => {
            let li = document.createElement("li");
            li.textContent = taskText;  // 只插入任务文本

            // 创建删除按钮
            let btn = document.createElement("button");
            btn.textContent = "❌";
            btn.onclick = function () { removeTask(this); };
            
            li.appendChild(btn);
            list.appendChild(li);
        });
    }
}
