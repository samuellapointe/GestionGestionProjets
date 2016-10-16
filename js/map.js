function initMap() 
{
	var myHomePosition = {lat: 48.4199, lng: -71.052188}; // Address: UQAC

	var mapDiv = document.getElementById('map');
	var map = new google.maps.Map(mapDiv, {
		center: myHomePosition,
		zoom: 14
	});
	
	var marker = new google.maps.Marker({
		position: myHomePosition,
		map: map,
		title: 'Hello World!'
	});

}
