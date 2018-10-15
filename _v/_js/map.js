




/*--------------------------Map-------------------------------------*/
function map(coords1,coords2,id){
	function initialize_contact_map() {
		var map, marker;		
		var image = {
		url: '_i/icons/icon_map.png'}

		var addr1 = new google.maps.LatLng(coords1, coords2);		
		var styles = [
	  {
		/*stylers: [
		  { hue: "#ffffff" },
		  { saturation: -100,
		  lightness: 100}
		]*/
	  }
	];
    var center = new google.maps.LatLng(coords1, coords2);
	var mapOptions = {
         zoom: 13,
         center: center,
		 scrollwheel: false,
         streetViewControl: false,
		 mapTypeControl: false,
		 panControl: true,
		  panControlOptions: {
		  position: google.maps.ControlPosition.LEFT_CENTER
		},
		zoomControl: true,
		zoomControlOptions: {
		  style: google.maps.ZoomControlStyle.LARGE,
		  position: google.maps.ControlPosition.LEFT_CENTER
		}
		 /*,panControl: false,
		  disableDefaultUI: true
		  */
	}
    map = new google.maps.Map(document.getElementById(id), mapOptions);
    map.setOptions({styles: styles});
    marker = new google.maps.Marker({
        map: map,
        position: addr1,
        visible: true,
		icon:image
    });
}
google.maps.event.addDomListener(window, 'load', initialize_contact_map);
}








/*--------------------------Contact Page Map-------------------------------------*/
/*own zoom controls*/
function HomeControl(controlDiv, map) {
 google.maps.event.addDomListener(zoomout, 'click', function() {
   var currentZoomLevel = map.getZoom();
   if(currentZoomLevel != 0){
     map.setZoom(currentZoomLevel - 1);}     
  });

   google.maps.event.addDomListener(zoomin, 'click', function() {
   var currentZoomLevel = map.getZoom();
   if(currentZoomLevel != 21){
     map.setZoom(currentZoomLevel + 1);}
  });

}
/*end own zoom controls*/



function contact_map(coords1, coords2, id, directionstartcoord1, directionstartcoord2){
	function initialize_contact_map() {
		var map, marker;		
		var image = {
		url: '_i/icons/icon_map_2.png'}
		
		var image2 = new google.maps.MarkerImage('_i/icons/icon_map_2.png',
        new google.maps.Size(73, 52),
        new google.maps.Point(0,0),
        new google.maps.Point(7, 52)
    );

		var addr1 = new google.maps.LatLng(coords1, coords2);		
		var styles = [
		  {
			/*stylers: [
			  { hue: "#ffffff" },
			  { saturation: -100,
			  lightness: 100}
			]*/
		  }
		];
		
    var center = new google.maps.LatLng(coords1, coords2);
	var mapOptions = {
         zoom: 13,
         center: center,
		 scrollwheel: false,
         streetViewControl: false,
		 mapTypeControl: false,
		 panControl: true,
		  panControlOptions: {
		  position: google.maps.ControlPosition.LEFT_CENTER
		},
		zoomControl: false,
		zoomControlOptions: {
		  style: google.maps.ZoomControlStyle.LARGE,
		  position: google.maps.ControlPosition.LEFT_CENTER
		}
		 /*panControl: false,
		  disableDefaultUI: true
		  */
	}
    map = new google.maps.Map(document.getElementById(id), mapOptions);
    map.setOptions({styles: styles});
    marker = new google.maps.Marker({
        map: map,
        position: addr1,
        visible: true,
		icon:image2
    });
	
/*direction*/
	var directionsDisplay = new google.maps.DirectionsRenderer({
		preserveViewport: true, 
		suppressMarkers: true,
		polylineOptions: {
		  strokeColor: "#ec6b76",
		  strokeWeight: 6,
		  strokeOpacity: 1
		    /*icons: [{
            icon: lineSymbol,
            offset: '25px',
            repeat: '100px'
        	}]*/
		}
	});
	var directionsService = new google.maps.DirectionsService();
    var request = {
        origin: new google.maps.LatLng(directionstartcoord1, directionstartcoord2),//start route 55.545701, 37.585044
        destination: new google.maps.LatLng(coords1, coords2),//end route
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

    directionsDisplay.setMap(map);
/*end direction*/
	
	
/*adding own zoom on the map*/ 	
var homeControlDiv = document.createElement('div');
var homeControl = new HomeControl(homeControlDiv, map);
/*end adding own zoom on the map*/ 
}
google.maps.event.addDomListener(window, 'load', initialize_contact_map);
}


