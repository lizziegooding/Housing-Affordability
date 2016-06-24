var map, timestamp = Infinity, scaleFactor = 3, timer, timerInterval = 500

L.mapbox.accessToken = 'pk.eyJ1IjoiZWNvbnciLCJhIjoiWUZxcXRMVSJ9.tmmSP9rEmDmhB54B8ARtQQ';

function initialize(){
	setMap();  
	setIU(); 
	
};

function setMap() {
	
	map = L.mapbox.map('map', '',{
    
		maxZoom: 13,
    	minZoom: 9
	}).setView([45.5231, -122.6765], 11);

	loadVScoreLayers();
	//sequenceInteractions();
	
	
	var basemap = L.mapbox.tileLayer("econw.0iw1bc23");	
	basemap.addTo(map);
	basemap.bringToFront();
	
};
  
 

  
function loadVScoreLayers(){

	var group1990 = L.layerGroup();
		var layer1990 = L.mapbox.tileLayer('econw.52npqkgv').addTo(group1990);
		var grid1990 = L.mapbox.gridLayer('econw.52npqkgv').addTo(group1990);

	var group2000 = L.layerGroup();
		var layer2000 = L.mapbox.tileLayer('econw.8o4p8g7s').addTo(group2000);
		var grid2000 = L.mapbox.gridLayer('econw.8o4p8g7s').addTo(group2000);

	var group2009 = L.layerGroup();
		var layer2009 = L.mapbox.tileLayer('econw.7m9tay6n').addTo(group2009);
		var grid2009 = L.mapbox.gridLayer('econw.7m9tay6n').addTo(group2009);
	
	var group2010 = L.layerGroup();
		var layer2010 = L.mapbox.tileLayer('econw.09d826j1').addTo(group2010);
		var grid2010 = L.mapbox.gridLayer('econw.09d826j1').addTo(group2010);

	var group2011 = L.layerGroup();
		var layer2011 = L.mapbox.tileLayer('econw.9l95weq7').addTo(group2011);
		var grid2011 = L.mapbox.gridLayer('econw.9l95weq7').addTo(group2011);

	var group2012 = L.layerGroup();
		var layer2012 = L.mapbox.tileLayer('econw.0ptmwtk6').addTo(group2012);
		var grid2012 = L.mapbox.gridLayer('econw.0ptmwtk6').addTo(group2012);

	var group2013 = L.layerGroup();
		var layer2013 = L.mapbox.tileLayer('econw.53vdnrpt').addTo(group2013);
		var grid2013 = L.mapbox.gridLayer('econw.53vdnrpt').addTo(group2013);

	var group2014 = L.layerGroup();
		var layer2014 = L.mapbox.tileLayer('econw.4zt73kt0').addTo(group2014);
		var grid2014 = L.mapbox.gridLayer('econw.4zt73kt0').addTo(group2014);

	var group2015 = L.layerGroup();
		var layer2015 = L.mapbox.tileLayer('econw.20714ksw').addTo(group2015);
		var grid2015 = L.mapbox.gridLayer('econw.20714ksw').addTo(group2015);

	var group2016 = L.layerGroup();
		var layer2016 = L.mapbox.tileLayer('econw.315dyfs7').addTo(group2016);
		var grid2016 = L.mapbox.gridLayer('econw.315dyfs7').addTo(group2016);

	var group2017 = L.layerGroup();
		var layer2017 = L.mapbox.tileLayer('econw.dcyt5qvp').addTo(group2017);
		var grid2017 = L.mapbox.gridLayer('econw.dcyt5qvp').addTo(group2017);

	var group2018 = L.layerGroup();
		var layer2018 = L.mapbox.tileLayer('econw.7znr77li').addTo(group2018);
		var grid2018 = L.mapbox.gridLayer('econw.7znr77li').addTo(group2018);

	var group2019 = L.layerGroup();
		var layer2019 = L.mapbox.tileLayer('econw.57r6spx6').addTo(group2019);
		var grid2019 = L.mapbox.gridLayer('econw.57r6spx6').addTo(group2019);

	var group2020 = L.layerGroup();
		var layer2020 = L.mapbox.tileLayer('econw.48hicpvs').addTo(group2020);
		var grid2020 = L.mapbox.gridLayer('econw.48hicpvs').addTo(group2020);


	map.addControl(L.mapbox.gridControl(grid1990, {follow: true}));
	map.addControl(L.mapbox.gridControl(grid2000, {follow: true}));
	map.addControl(L.mapbox.gridControl(grid2009, {follow: true}));
	map.addControl(L.mapbox.gridControl(grid2010, {follow: true}));
	map.addControl(L.mapbox.gridControl(grid2011, {follow: true}));
	map.addControl(L.mapbox.gridControl(grid2012, {follow: true}));
	map.addControl(L.mapbox.gridControl(grid2013, {follow: true}));
	map.addControl(L.mapbox.gridControl(grid2014, {follow: true}));
	map.addControl(L.mapbox.gridControl(grid2015, {follow: true}));
	map.addControl(L.mapbox.gridControl(grid2016, {follow: true}));
	map.addControl(L.mapbox.gridControl(grid2017, {follow: true}));
	map.addControl(L.mapbox.gridControl(grid2018, {follow: true}));
	map.addControl(L.mapbox.gridControl(grid2019, {follow: true}));
	map.addControl(L.mapbox.gridControl(grid2020, {follow: true}));
	
	//initial view
	group1990.addTo(map);
	
	var years=[1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];

	
    var slider = $( "#slider" ).slider({
      min: 0,
      max: years.length - 1,
      step: 1,
      animate: true,

      slide: function( event, ui ) {
        $( "#year-label" ).text(years[ui.value]);
		
        if (years[ui.value]==1990) {
        	$('#year-label').addClass('data').removeClass('noData');
        	//add this layer
        	group1990.addTo(map);
        	//remove these layers
        	map.removeLayer(group2000);
        	map.removeLayer(group2009);
        	map.removeLayer(group2010);
        	map.removeLayer(group2011);
        	map.removeLayer(group2012);
        	map.removeLayer(group2013);
        	map.removeLayer(group2014);
        	map.removeLayer(group2015);
			map.removeLayer(group2016);
			map.removeLayer(group2017);
			map.removeLayer(group2018);
			map.removeLayer(group2019);
			map.removeLayer(group2020);       	
        } else if (years[ui.value]==2000) {
        	$('#year-label').addClass('data').removeClass('noData');
        	//add this group
        	group2000.addTo(map);
        	//remove these groups
        	map.removeLayer(group1990);
        	map.removeLayer(group2009);
        	map.removeLayer(group2010);
        	map.removeLayer(group2011);
        	map.removeLayer(group2012);
        	map.removeLayer(group2013);
        	map.removeLayer(group2014);
        	map.removeLayer(group2015);
			map.removeLayer(group2016);
			map.removeLayer(group2017);
			map.removeLayer(group2018);
			map.removeLayer(group2019);
			map.removeLayer(group2020); 
      	} else if (years[ui.value]==2009) {
      		$('#year-label').addClass('data').removeClass('noData');
        	//add this group
        	group2009.addTo(map);
        	//remove these groups
        	map.removeLayer(group1990);
        	map.removeLayer(group2000);
        	map.removeLayer(group2010);
        	map.removeLayer(group2011);
        	map.removeLayer(group2012);
        	map.removeLayer(group2013);
        	map.removeLayer(group2014);
        	map.removeLayer(group2015);
			map.removeLayer(group2016);
			map.removeLayer(group2017);
			map.removeLayer(group2018);
			map.removeLayer(group2019);
			map.removeLayer(group2020); 
      	} else if (years[ui.value]==2010) {
      		$('#year-label').addClass('data').removeClass('noData');
        	//add this group
        	group2010.addTo(map);
        	//remove these groups
        	map.removeLayer(group1990);
        	map.removeLayer(group2000);
        	map.removeLayer(group2009);
        	map.removeLayer(group2011);
        	map.removeLayer(group2012);
        	map.removeLayer(group2013);
        	map.removeLayer(group2014);
        	map.removeLayer(group2015);
			map.removeLayer(group2016);
			map.removeLayer(group2017);
			map.removeLayer(group2018);
			map.removeLayer(group2019);
			map.removeLayer(group2020); 
      	} else if (years[ui.value]==2011) {
      		$('#year-label').addClass('data').removeClass('noData');
        	//add this group
        	group2011.addTo(map);
        	//remove these groups
        	map.removeLayer(group1990);
        	map.removeLayer(group2000);
        	map.removeLayer(group2009);
        	map.removeLayer(group2010);
        	map.removeLayer(group2012);
        	map.removeLayer(group2013);
        	map.removeLayer(group2014);
        	map.removeLayer(group2015);
			map.removeLayer(group2016);
			map.removeLayer(group2017);
			map.removeLayer(group2018);
			map.removeLayer(group2019);
			map.removeLayer(group2020); 
      	} else if (years[ui.value]==2012) {
      		$('#year-label').addClass('data').removeClass('noData');
        	//add this group
        	group2012.addTo(map);
        	//remove these groups
        	map.removeLayer(group1990);
        	map.removeLayer(group2000);
        	map.removeLayer(group2009);
        	map.removeLayer(group2010);
        	map.removeLayer(group2011);
        	map.removeLayer(group2013);
        	map.removeLayer(group2014);
        	map.removeLayer(group2015);
			map.removeLayer(group2016);
			map.removeLayer(group2017);
			map.removeLayer(group2018);
			map.removeLayer(group2019);
			map.removeLayer(group2020); 
      	} else if (years[ui.value]==2013) {
      		$('#year-label').addClass('data').removeClass('noData');
        	//add this group
        	group2013.addTo(map);
        	//remove these groups
        	map.removeLayer(group1990);
        	map.removeLayer(group2000);
        	map.removeLayer(group2009);
        	map.removeLayer(group2010);
        	map.removeLayer(group2011);
        	map.removeLayer(group2012);
        	map.removeLayer(group2014);
        	map.removeLayer(group2015);
			map.removeLayer(group2016);
			map.removeLayer(group2017);
			map.removeLayer(group2018);
			map.removeLayer(group2019);
			map.removeLayer(group2020); 
      	} else if (years[ui.value]==2014) {
      		$('#year-label').addClass('data').removeClass('noData');
        	//add this group
        	group2014.addTo(map);
        	//remove these groups
        	map.removeLayer(group1990);
        	map.removeLayer(group2000);
        	map.removeLayer(group2009);
        	map.removeLayer(group2010);
        	map.removeLayer(group2011);
        	map.removeLayer(group2012);
        	map.removeLayer(group2013);
        	map.removeLayer(group2015);
			map.removeLayer(group2016);
			map.removeLayer(group2017);
			map.removeLayer(group2018);
			map.removeLayer(group2019);
			map.removeLayer(group2020); 
      	} else if (years[ui.value]==2015) {
      		$('#year-label').addClass('data').removeClass('noData');
        	//add this group
        	group2015.addTo(map);
        	//remove these groups
        	map.removeLayer(group1990);
        	map.removeLayer(group2000);
        	map.removeLayer(group2009);
        	map.removeLayer(group2010);
        	map.removeLayer(group2011);
        	map.removeLayer(group2012);
        	map.removeLayer(group2013);
        	map.removeLayer(group2014);
			map.removeLayer(group2016);
			map.removeLayer(group2017);
			map.removeLayer(group2018);
			map.removeLayer(group2019);
			map.removeLayer(group2020); 
      	} else if (years[ui.value]==2016) {
      		$('#year-label').addClass('data').removeClass('noData');
        	//add this group
        	group2016.addTo(map);
        	//remove these groups
        	map.removeLayer(group1990);
        	map.removeLayer(group2000);
        	map.removeLayer(group2009);
        	map.removeLayer(group2010);
        	map.removeLayer(group2011);
        	map.removeLayer(group2012);
        	map.removeLayer(group2013);
        	map.removeLayer(group2014);
			map.removeLayer(group2015);
			map.removeLayer(group2017);
			map.removeLayer(group2018);
			map.removeLayer(group2019);
			map.removeLayer(group2020); 
      	} else if (years[ui.value]==2017) {
      		$('#year-label').addClass('data').removeClass('noData');
        	//add this group
        	group2017.addTo(map);
        	//remove these groups
        	map.removeLayer(group1990);
        	map.removeLayer(group2000);
        	map.removeLayer(group2009);
        	map.removeLayer(group2010);
        	map.removeLayer(group2011);
        	map.removeLayer(group2012);
        	map.removeLayer(group2013);
        	map.removeLayer(group2014);
			map.removeLayer(group2015);
			map.removeLayer(group2016);
			map.removeLayer(group2018);
			map.removeLayer(group2019);
			map.removeLayer(group2020); 
      	} else if (years[ui.value]==2018) {
      	  	$('#year-label').addClass('data').removeClass('noData');
        	//add this group
        	group2018.addTo(map);
        	//remove these groups
        	map.removeLayer(group1990);
        	map.removeLayer(group2000);
        	map.removeLayer(group2009);
        	map.removeLayer(group2010);
        	map.removeLayer(group2011);
        	map.removeLayer(group2012);
        	map.removeLayer(group2013);
        	map.removeLayer(group2014);
			map.removeLayer(group2015);
			map.removeLayer(group2016);
			map.removeLayer(group2017);
			map.removeLayer(group2019);
			map.removeLayer(group2020); 
      	} else if (years[ui.value]==2019) {
      		$('#year-label').addClass('data').removeClass('noData');
        	//add this group
        	group2019.addTo(map);
        	//remove these groups
        	map.removeLayer(group1990);
        	map.removeLayer(group2000);
        	map.removeLayer(group2009);
        	map.removeLayer(group2010);
        	map.removeLayer(group2011);
        	map.removeLayer(group2012);
        	map.removeLayer(group2013);
        	map.removeLayer(group2014);
			map.removeLayer(group2015);
			map.removeLayer(group2016);
			map.removeLayer(group2017);
			map.removeLayer(group2018);
			map.removeLayer(group2020); 
      	} else if (years[ui.value]==2020) {
      		$('#year-label').addClass('data').removeClass('noData');
        	//add this group
        	group2020.addTo(map);
        	//remove these groups
        	map.removeLayer(group1990);
        	map.removeLayer(group2000);
        	map.removeLayer(group2009);
        	map.removeLayer(group2010);
        	map.removeLayer(group2011);
        	map.removeLayer(group2012);
        	map.removeLayer(group2013);
        	map.removeLayer(group2014);
			map.removeLayer(group2015);
			map.removeLayer(group2016);
			map.removeLayer(group2017);
			map.removeLayer(group2018);
			map.removeLayer(group2019); 
      	} else {
      		$('#year-label').addClass('noData').removeClass('data');
      		map.removeLayer(group1990);
        	map.removeLayer(group2000);
        	map.removeLayer(group2009);
        	map.removeLayer(group2010);
        	map.removeLayer(group2011);
        	map.removeLayer(group2012);
        	map.removeLayer(group2013);
        	map.removeLayer(group2014);
			map.removeLayer(group2015);
			map.removeLayer(group2016);
			map.removeLayer(group2017);
			map.removeLayer(group2018);
			map.removeLayer(group2019); 
			map.removeLayer(group2020); 
      	
      	}    	
      }

    });

}



	
 	



function updateLayers(){

	var radiusArray = [];

	markersLayer.eachLayer(function(layer) {
		var r = onEachFeature(layer);
		radiusArray.push(r);
	});

	updateLegend(radiusArray);

}


function setIU(){

	var uiControl = L.Control.extend({
		initialize: function (foo, options) {
			L.Util.setOptions(this, options);
		element = foo.replace('#','');
		},
		onAdd: function (map) {
			return L.DomUtil.get(element);
		}
	});

	
	map.addControl(new uiControl('#vcr-controls', { position: 'topright' }));
}


function sequenceInteractions(){
		
	$(".pause").hide();
	
	$(".play").click(function(){
		$(".pause").show();
		$(".play").hide();
		animateMap();
	});
	
	$(".pause").click(function(){
		$(".pause").hide();
		$(".play").show();
		stopMap();
	});
	
	$(".step").click(function(){
		step();
	});
	
	$(".step-full").click(function(){
		jump(2020); 
	});
	
	$(".back").click(function(){
		back();
	});
	
	$(".back-full").click(function(){
		jump(1990); 
	});
		
	$("#slider").slider({
		min: 1990,
		max: 2020,
		step: 1,
		animate: "slow",
		slide: function(e, ui){
			stopMap();
			timestamp = ui.value;
			updateLayers();
		}
	});	
}
function animateMap() {
	
	timer = setInterval(function(){
		step();
	},timerInterval);
}

function stopMap() {
	clearInterval(timer);
}

function step(){
	

	if (timestamp < 2020){ 
		timestamp+=1;
	} else {
		timestamp = 1990; 
	};
	
	updateLayers();
	updateSlider();
}
function back(){
	
	if (timestamp > 1990){ 
		timestamp-=1;
	} else {
		timestamp = 2020; 
	};
	
	updateLayers();
	updateSlider();
}

function jump(t){
	
	
	timestamp = t;
	
	updateLayers();
	updateSlider();
}

function updateSlider(){
	
	$("#slider").slider("value",timestamp);
}






window.onload = initialize(); 