var teammates = new Array();

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

// Si isAddTeammate = true, alors c'est le bouton d'ajout de tâche
function createTeammateElement(text, isAddTeammate) {
	var outerDiv = document.createElement("div");
	outerDiv.className = "taskOuter";

	var innerDiv = document.createElement("div");
	innerDiv.className = "taskInner";
	innerDiv.innerHTML = text;

	if (isAddTeammate) {
		innerDiv.className = "taskInner taskAdd";
		innerDiv.onclick = function() { addTeammate(); };
	}

	outerDiv.appendChild(innerDiv);
	return outerDiv;
}