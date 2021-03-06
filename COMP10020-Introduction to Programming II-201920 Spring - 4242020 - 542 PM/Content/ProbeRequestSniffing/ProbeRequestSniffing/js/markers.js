$(document).ready(function() {
  $("#map").css({
		height: 850,
		width: 1200
	});
	var myLatLng = new google.maps.LatLng(17.74033553, 83.25067267);
  MYMAP.init('#map', myLatLng, 11);
  
  //$("#showmarkers").click(function(e){
		MYMAP.placeMarkers('ssidsFound.xml');
  //});
});

var MYMAP = {
  map: null,
	bounds: null
}

MYMAP.init = function(selector, latLng, zoom) {
  var myOptions = {
    zoom:zoom,
    center: latLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  this.map = new google.maps.Map($(selector)[0], myOptions);
	this.bounds = new google.maps.LatLngBounds();
}

MYMAP.placeMarkers = function(filename) {
	$.get(filename, function(xml){
		$(xml).find("marker").each(function(){
			var name = $(this).find('name').text();
			
			// create a new LatLng point for the marker
			var lat = $(this).find('lat').text();
			var lng = $(this).find('lng').text();
			var point = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
			
			var colourLabel = $(this).find('colour').text();
			var colour = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
			if(colourLabel == "green"){
				colour = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
			}

			// extend the bounds to include the new point
			MYMAP.bounds.extend(point);
			
			var marker = new google.maps.Marker({
				position: point,
				map: MYMAP.map,
				icon: colour
			});
			
			var infoWindow = new google.maps.InfoWindow();
			var html='<strong>'+name+'</strong.>';
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.setContent(html);
				infoWindow.open(MYMAP.map, marker);
			});
			MYMAP.map.fitBounds(MYMAP.bounds);
		});
	});
}