var tasks = new Array();

function addTask() {
	var task = {
		name: "Test"
	}
	tasks.push(task);
	console.log("Test");
	updateTasksLayout();
}

function updateTasksLayout() {
	var container = document.getElementById("taskContainer");
	container.innerHTML = ""; // Empty the container
	
	var nbTasks = tasks.length;
	
	// Add every task
	for (var i = 0; i < nbTasks; i++) {
		var task = createTaskElement(tasks[i].name, "taskInner");
		container.appendChild(task);
	}
	
	// Add the "Add task" button
	var addTaskButton = createTaskElement("Ajouter une tâche", "taskInner taskAdd");
	container.appendChild(addTaskButton);
}

function createTaskElement(text, className) {
	var outerDiv = document.createElement("div");
	outerDiv.className = "taskOuter";
	
	var innerDiv = document.createElement("div");
	innerDiv.className = className;
	innerDiv.innerHTML = text;
	innerDiv.onclick = function() { addTask(); };
	
	outerDiv.appendChild(innerDiv);
	return outerDiv;
}