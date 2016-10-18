var tasks = new Array();

function Task(name, estimatedTime) {
	this.name = name;
	this.estimatedTime = estimatedTime;

	this.toString = function() {
		return this.name + "<br\>" + "Temps accordé: " + estimatedTime + "h";
	}
}


function addTask() {
	var name;
	var estimatedTime;
	
	do{
		name= prompt("Quel est le nom de la tâche?","");
		name = name.trim();
	}while(name == null || name == "");
	
	do{
		estimateTime= prompt("Quel est la durée de la tâche?","0");
	}while(!isFinite(String(estimateTime)));
	
	var task = new Task(name, estimateTime);
	tasks.push(task);
	updateTasksLayout();
}
function deleteTask(name)
{
	var nbTasks = tasks.length;
	
	for (var i = 0; i < nbTasks; i++)
	{
		if(tasks[i].name == name)
		{
			tasks.splice(i,1);
		}
	}
	updateTasksLayout();
}

function updateTasksLayout() {
	var container = document.getElementById("taskContainer");
	container.innerHTML = ""; // Empty the container

	var nbTasks = tasks.length;

	// Add every task
	for (var i = 0; i < nbTasks; i++) {
		var task = createTaskElement(tasks[i].toString(),tasks[i].name, false);
		container.appendChild(task);
	}

	// Add the "Add task" button
	var addTaskButton = createTaskElement("Ajouter une tâche", "", true);
	container.appendChild(addTaskButton);
}

// Si isAddTask = true, alors c'est le bouton d'ajout de tâche
function createTaskElement(text, taskName, isAddTask) {
	var outerDiv = document.createElement("div");
	outerDiv.className = "taskOuter";

	var innerDiv = document.createElement("div");
	innerDiv.className = "taskInner";
	innerDiv.innerHTML = text;
	innerDiv.onclick = function() { deleteTask(taskName);};

	if (isAddTask) {
		innerDiv.className = "taskInner taskAdd";
		innerDiv.onclick = function() { addTask(); };
	}
	

	outerDiv.appendChild(innerDiv);
	return outerDiv;
}