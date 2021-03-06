var watchid;
var map_expr=document.getElementById('map_expr');
function startwatch(){
  if (navigator.geolocation)
    {
      watchid=navigator.geolocation.watchPosition(showMap,showError,{enableHighAccuracy:true});
      //clear the explaination
      map_expr.innerHTML='';
    }
  else{
    map_expr.innerHTML="Geolocation is not supported by this browser.";
  }
}
function stopwatch(){
  navigator.geolocation.clearWatch(watchid);
  alert("Operation Finished!");
}
function showMap(position) {
    var coords=position.coords;
    var latlng = new google.maps.LatLng(coords.latitude,coords.longitude);
    var myOptions = {
      zoom: 16,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      //map control in the right corner
      //mapTypeControl:false,
      //navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
    map_canvas=document.getElementById('map_canvas');
    map_canvas.style.height='500px';
    map_canvas.style.width='1000px';
    //create marker in the map
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title:"You are here!"
    });
    // To add the marker to the map, call setMap();
    //marker.setMap(map);
    var infowindow=new google.maps.InfoWindow({
       content:"Current Positon"
    });
    infowindow.open(map,marker);
}

function showError(error){
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
    }
}