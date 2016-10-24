var tasks = new Array();
var teammates = new Array();

// Classes objets
// Tâche
function Task(name, estimatedTime) {
	this.name = name;
	this.estimatedTime = estimatedTime;

	this.toString = function() {
		var ressource = "";
		var teammateIndex = this.getAssignedTeammateIndex();
		if(teammateIndex >= 0)
		{
			ressource = teammates[teammateIndex].name;
		}
		
		return this.name 
			+ "<br\>" + "Temps accordé: " + estimatedTime + "h"
			+ "<br\>" + "Ressource: " + ressource;
	}
	
	this.getAssignedTeammateIndex = function()
	{
		for(var index = 0; index < teammates.length; index++)
		{
			if(teammates[index].ownsTask(this.name))
				return index;
		}
		
		return -1;
	}
}

// Coéquipier
function Teammate(name, tasks) {
	this.name = name;
	this.tasks = tasks;

	this.toString = function() {
		return this.name 
			+ "<br\>" + "Nombre de tâches attitrées: " + tasks.length
			+ "<br\>" + "Charge estimée: " + this.getTasksEstimatedTime() + "h";
	}
	
	this.addTask = function(task)
	{
		this.tasks.push(task);
	}
	
	this.getTasksEstimatedTime = function()
	{
		var time = 0;
		for (var index = 0; index < this.tasks.length; index++) 
		{
			time += this.tasks[index].estimatedTime;
		}
		
		return time;
	}
	
	this.ownsTask = function(taskName)
	{
		for (var index = 0; index < this.tasks.length; index++) 
		{
			if(this.tasks[index].name == taskName)
				return true;
		}
		
		return false;
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
	
	var task = new Task(name, parseFloat(estimateTime));
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
	
	checkValidForTaskDistribution();
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
	
	checkValidForTaskDistribution();
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

// Renvoie «true» si on peut distribuer les tâches,
// sinon affiche les informations manquantes et indique
// que le bouton de distribution des tâches est désactivé.
function checkValidForTaskDistribution()
{
	var messageSpan = document.getElementById("distributeTasksMessages")
	messageSpan.innerHTML = "";
	if(tasks.length < 1)
	{
		messageSpan.innerHTML += " Vous devez d'abord ajouter au moins 1 tâche.";
	}
	
	if(teammates.length < 1)
	{
		messageSpan.innerHTML += " Vous devez d'abord ajouter au moins 1 coéquipier.";
	}
	
	var distributeTasksButton = document.getElementById("distributeTasksButton");
	if(messageSpan.innerHTML == "")
	{
		// Les informations sont prêtes pour la distribution de tâches.
		distributeTasksButton.className = "enabledButton";
		return true;
	}
	else
	{
		distributeTasksButton.className = "disabledButton";
		return false;
	}
	
}

// Traitement qui assigne toutes les tâches équitablement entre les coéquipiers.
function distributeTasks()
{
	if(!checkValidForTaskDistribution())
	{
		return;
	}
	
	// Désassigner les tâches si cela avait déjà été fait.
	for (var index = 0; index < teammates.length; index++) 
	{
		teammates[index].tasks = new Array();
	}
	
	// Mélanger l'ordre des tâches et des coéquipiers pour obtenir une 
	// distribution un peu différente à chaque fois.
	shuffleArray(tasks);
	shuffleArray(teammates);
	
	// On donne chaque tâche à celui qui a le moins de tâches attitrées.
	for (var index = 0; index < tasks.length; index++) 
	{
		var leastBusyTeammate = getLeastBusyTeammateIndex();
		teammates[leastBusyTeammate].addTask(tasks[index]);
	}
	
	updateLayout();
}

// Renvoie l'index du coéquipier qui a présentement la plus
// petite charge de travail.
function getLeastBusyTeammateIndex()
{
	var leastBusyIndex = 0;
	var leastBusyEstimatedTime = Number.MAX_VALUE;
	for (var index = 0; index < teammates.length; index++) 
	{
		var currentEstimatedTime = teammates[index].getTasksEstimatedTime();
		if(currentEstimatedTime < leastBusyEstimatedTime)
		{
			leastBusyIndex = index;
			leastBusyEstimatedTime = currentEstimatedTime;
		}
	}
	
	return leastBusyIndex;
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 *
 * Tiré de http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}