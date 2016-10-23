var tasks = new Array();
var teammates = new Array();

// Classes objets
// Tâche
function Task(name, estimatedTime) {
	this.name = name;
	this.estimatedTime = estimatedTime;

	this.toString = function() {
		return this.name + "<br\>" + "Temps accordé: " + estimatedTime + "h";
	}
}

// Coéquipier
function Teammate(name, tasks) {
	this.name = name;
	this.tasks = tasks;

	this.toString = function() {
		return this.name + "<br\>" + "Nombre de tâches attitrées: " + tasks.length;
	}
	
	this.addTask = function(task)
	{
		this.tasks.push(task);
	}
}

// Fonctions interface
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

function addTeammate() {
	var name;
	do{
		name= prompt("Quel est le nom de l'équipier?","");
		name = name.trim();
	}while(name == null || name == "");
	
	var teammate = new Teammate(name, []);
	teammates.push(teammate);
	updateTeammatesLayout();
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

// Update tasks et teammates
function updateLayout() {
	updateTasksLayout();
	updateTeammatesLayout();
}

function updateTeammatesLayout() {
	var container = document.getElementById("teammateContainer");
	container.innerHTML = ""; // Empty the container

	var nbTeammates = teammates.length;

	// Add every teammate
	for (var i = 0; i < nbTeammates; i++) {
		var teammate = createTeammateElement(teammates[i].toString(), false);
		container.appendChild(teammate);
	}

	// Add the "Add teammate" button
	var addTeammateButton = createTeammateElement("Ajouter un équipier", true);
	container.appendChild(addTeammateButton);
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

// Créer un élement de base
function createBaseElement(type) {
	var outerDiv = document.createElement("div");
	outerDiv.className = type + "Outer";

	var innerDiv = document.createElement("div");
	innerDiv.className = type + "Inner";
	innerDiv.onclick = function() { deleteTask(taskName);};
	
	outerDiv.appendChild(innerDiv);
	return outerDiv;
}

// Si isAddTask = true, alors c'est le bouton d'ajout de tâche
function createTaskElement(text, taskName, isAddTask) {
	outerDiv = createBaseElement("task");
	innerDiv = outerDiv.childNodes[0];
	innerDiv.innerHTML = text;

	if (isAddTask) {
		innerDiv.className = "taskInner taskAdd";
		innerDiv.onclick = function() { addTask(); };
	}

	outerDiv.appendChild(innerDiv);
	return outerDiv;
}

// Si isAddTeammate = true, alors c'est le bouton d'ajout de tâche
function createTeammateElement(text, isAddTeammate) {
	var outerDiv = createBaseElement("teammate");
	innerDiv = outerDiv.childNodes[0];
	innerDiv.innerHTML = text;

	if (isAddTeammate) {
		innerDiv.className = "teammateInner teammateAdd";
		innerDiv.onclick = function() { addTeammate(); };
	}

	outerDiv.appendChild(innerDiv);
	return outerDiv;
}