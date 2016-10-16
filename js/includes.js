function addHeader()
{	
	var header = document.createElement("header");
	header.innerHTML =
		"<div class=\"menu\">"
			+ "<a href=\"./index.html\"><img src=\"./img/logo.png\" alt=\"Rate my teammates\" id=\"logo\"></a>"
			+ "<div class=\"alignHelper\">"
				+ "<ul class=\"left\">"
					+ "<li></li>"
					+ "<li></li>"
				+ "</ul>"
				+ "<ul class=\"right\">"
					+ "<li><a class=\"lienMenu\" href=\"./about.html\">À propos</a></li>"
				+ "</ul>"
			+ "</div>"
		+ "</div>"
		
	var content = document.getElementById("pageContent");
	content.insertBefore(header, content.firstChild);
}

function addFooter()
{
	var footer = document.createElement("footer");
	footer.innerHTML =
		"<footer>"
			+ "Site web réalisé par des étudiants de l'Université du Québec à Chicoutimi<br />"
			+ "Rate My Teammates™, tous droits réservés - Octobre 2016"
			+ "<p>"
				+ "<a href=\"http://jigsaw.w3.org/css-validator/check/referer\">"
					+ "<img style=\"border:0;width:88px;height:31px\""
						+ "src=\"http://jigsaw.w3.org/css-validator/images/vcss-blue\""
						+ "alt=\"Valid CSS!\" />"
					+ "</a>"
			+ "</p>"
		+ "</footer>";
		
	var content = document.getElementById("pageContent");
	content.appendChild(footer);
}