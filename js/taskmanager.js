var tasks = new Array();

function Task(name, estimatedTime) {
	this.name = name;
	this.estimatedTime = estimatedTime;

	this.toString = function() {
		return this.name + "<br\>" + "Temps accordé: " + estimatedTime + "h";
	}
}

function addTask() {
	var task = new Task("Créer un formulaire", 1.5);
	tasks.push(task);
	updateTasksLayout();
}

function updateTasksLayout() {
	var container = document.getElementById("taskContainer");
	container.innerHTML = ""; // Empty the container

	var nbTasks = tasks.length;

	// Add every task
	for (var i = 0; i < nbTasks; i++) {
		var task = createTaskElement(tasks[i].toString(), false);
		container.appendChild(task);
	}

	// Add the "Add task" button
	var addTaskButton = createTaskElement("Ajouter une tâche", true);
	container.appendChild(addTaskButton);
}

// Si isAddTask = true, alors c'est le bouton d'ajout de tâche
function createTaskElement(text, isAddTask) {
	var outerDiv = document.createElement("div");
	outerDiv.className = "taskOuter";

	var innerDiv = document.createElement("div");
	innerDiv.className = "taskInner";
	innerDiv.innerHTML = text;

	if (isAddTask) {
		innerDiv.className = "taskInner taskAdd";
		innerDiv.onclick = function() { addTask(); };
	}

	outerDiv.appendChild(innerDiv);
	return outerDiv;
}