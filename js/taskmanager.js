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

function ExportToXML(){
	if(tasks.length != 0)
	{
		var a = document.createElement("a"),
        file = new Blob([formatTasksToXml()], {type: 'text/plain;charset=utf-8'});
		if (window.navigator.msSaveOrOpenBlob) // Internet Explorer
        window.navigator.msSaveOrOpenBlob(file, "Taches.xml");
		else//Reste
		{
			a.href = window.URL.createObjectURL(file);
			a.download = "Taches.xml";
			document.body.appendChild(a);
			a.click();
			setTimeout(function() {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);  
			}, 0); 
		}
	}
	else
	{
		alert("Vous devez avoir au moins une tâche!");
	}
}

function importXML(){
	var leFichierXml = document.getElementById("MonFichier");
	if(leFichierXml.value != '')
	{
		var file = leFichierXml.files[0];
		var textType = /xml.*/;
		
		if(file.type.match(textType))
		{
			var reader = new FileReader();
			reader.onload = function(e){
				formatXMLToTask(reader.result);
			}
			reader.readAsText(file);
		}
		else
			alert("Choisir un fichier XML!");
	}
	else
	{
		alert("Choisir un fichier avant");
	}
	
	
}

function formatTasksToXml(){
	var fichierXml = "<?xml version =\"1.0\" ?>\n<listeTaches>";
	for(var i = 0; i < tasks.length; i++)
	{
		fichierXml+="\n\t<Tache>";
		fichierXml+="\n\t\t<nomTache>" + tasks[i].name + "</nomTache>";
		fichierXml+="\n\t\t<tempEstime>" + tasks[i].estimatedTime + "</tempEstime>";
		fichierXml+="\n\t</Tache>";
	}
	fichierXml+="\n</listeTaches>";
	return fichierXml;
}

function formatXMLToTask(fileResults){
	var lines = fileResults.split('\n');
	for(var i = 3; i < lines.length; i++)
	{
		var taskName = lines[i].split('>')[1].split('<')[0];
		var taskTime = lines[i+1].split('>')[1].split('<')[0];
		
		tasks.push(new Task(taskName, taskTime));

		if(lines[i+3] == "\t<Tache>")
			i+=3;
		else
			break;
	}
	
	updateTasksLayout();
}