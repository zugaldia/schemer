/*
 * The only JS code, it's all jQuery + d3.js
 * 
 * We're loading ~1,000 circles and animating them all, this requires
 * a decent processor and browser. So far, Chrome handles it better
 * than the rest but it should be able to run anywhere.
 */

$(document).ready(function () {
	// # of coordinates. FIXME: read from CSV
	var cvs_entries = 895
	
	// First, we take care of the search form, a simple GET request to the search URL
	$('#form-search').submit(function() {
		if ($('#form-search #query').val() == '') {
			$('#form-search #query').val('What do you fancy doing?');
		} else {
			window.location.href = 'https://www.schemer.com/find/_/q/' + $('#form-search #query').val().replace(" ", "+");
		}
		
		return false;
	});
	
	// Clear the search string
	$('#form-search #query').focus(function() {
		if ($('#form-search #query').val() == 'Search' ||
			$('#form-search #query').val() == 'What do you fancy doing?') {
			$('#form-search #query').val('')
		}
	});
		
	$('#status').text("Loading " + cvs_entries + " coordinates...");
	
	// Unfortunately there is no Schemer API yet. These are a few actual schemes we got from
	// the public section of the website... with some extra "Attend Google I/O 2012" :-)
	var messages = ['Attend Google I/O 2012',
	                'Visit the Seven Wonders of the World',
	                'Watch all the Star Wars movies in a row',
	                'Visit the Grand Canyon',
	                'Visit Rome, Italy and see ancient Roman buildings and ruins',
	                'Hike Machu Picchu and the Inca Trail in Peru',
	                'Attend Google I/O 2012',
	                'Watch the IMDb top 500 movies of all time',
	                'Watch the Lord of the Rings Trilogy all in one sitting',
	                'See the Mona Lisa at the Louvre',
	                'Attend a Comic-Con event',
	                'Run a Marathon',
	                'Attend Google I/O 2012',
	                'Teach yourself guitar',
	                'Visit Tokyos Tsukiji Fish Market',
	                'Learn to fly a helicopter',
	                'Lose 30 pounds.',
	                'Stand before the pyramids of Egypt',
	                'Take Photos From The Sky In A Hot Air Balloon',
	                'Learn Sketching',
	                'Did we mention attending Google I/O 2012?',
	                'Quit TV for a month',
	                'Drink beer at Oktoberfest in Munich',
	                'Cook through an entire cookbook',
	                'Finish The Elder Scrolls V: Skryim',
	                'Visit Disney World Without Kids',
	                'Create a website',
	                'Attend Burning Man',
	                'Did we mention attending Google I/O 2012?',
	                'Visit the 50 United States',
	                'Hike the Appalachian National Scenic Trail',
	                'Visit Canada',
	                'Go up in a hot air ballon',
	                'Go into space',
	                'Visit USA',
	                'Attend Google I/O 2012',
	                'Watch all the Harry Potter movies in a row',
	                'Write yourself a letter from the future',
	                'See the Aurora Bourealis',
	                'Have my photography published in print',
	                'Climb Mount Kilimanjaro in Tanzania',
	                'Visit stonehenge',
	                'Attend Google I/O 2012',
	                'Live in NYC',
	                'Visit London',
	                'Get a tattoo',
	                'Attend Google I/O 2012',
	                'Watch every episode of The West Wing',
	                'Go for a hot air balloon ride',
	                'Run a lap around the Washington DC National Mall',
	                'See the northern lights',
	                'Buy an Android tablet',
	                'Own a Google Driverless Car',
	                'Start a Company',
	                'Take a photo of Earth from space',
	                'Learn to speak fluent french',
	                'Buy a house',
	                'Visit Vanuatu',
	                'Learn to play the harmonica',
	                'Fly an arducopter',
	                'Go to a Washington Capitals game'];
	
	// See http://www.janwillemtulp.com/2011/03/20/tutorial-introduction-to-d3 for a great d3.js starting point.
	var data = []
	for (var i=0; i < cvs_entries; i++) {
	    data.push({"x": Math.random(), "y": Math.random()})
	}
	
	// Create the SVG element
	var h = 100
	var vis = d3.select("body")
	    .append("svg:svg")
	    .attr("width", screen.width)
	    .attr("height", screen.innerHeight)
	    
	// The tooltip component
	var tooltip = d3.select("body")
		.append("div")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.style("background-color", "rgba(0,0,0,0.6)")
		.style("padding", "10px")
		.style("color", "white")
		.text("");
	
	// Basic scalings
	var x = d3.scale.linear().domain([0,1]).range([screen.width / 2 - 500,screen.width / 2 + 300]),
	y = d3.scale.linear().domain([0,1]).range([0,500]),
	r = d3.scale.linear().domain([0,1]).range([2,7]),
	
	// This makes a green color range similar to Schemer's
	c = d3.scale.linear().domain([0,1]).range(["hsl(0%, 0%, 0%)", "hsl(100%, 100%, 100%)"]).interpolate(d3.interpolateHsl)
	 
	// Initial set
	vis.selectAll("circle")
	    .data(data)
	    .enter().append("svg:circle")
	    .attr("cx", function(d) { return x(d.x) })
	    .attr("cy", function(d) { return y(d.y) })
	    .attr("stroke-width", "none")
	    .attr("fill", function() { return c(Math.random()) })
	    .attr("fill-opacity", .5)
	    .attr("visibility", "hidden")
	    .attr("r", function() { return r(Math.random()) })
	    // Tooltips
	    .on("mouseover", function(){return tooltip.style("visibility", "visible").text(messages[Math.floor((Math.random() * (messages.length - 1)))]);})
		.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
		.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
	
	// New scales for transtions
	var y2 = d3.scale.linear().domain([0,1]).range([h/2 - 20, h/2 + 20])
	var del = d3.scale.linear().domain([0,1]).range([0,1])
	
	// Put the Schemer logo together
	d3.csv('coordinates/logo.csv', function (parsedRows) {
		// CSV has been loaded, let's start showing the other elements in the page
		$('#status').remove();
		$('#schemer').fadeIn(5000);
		$('#icon-search').fadeIn(5000);
		$('#legend').fadeIn(5000);
	
		d3.selectAll("circle")
			.data(parsedRows)
			.transition()
		    .attr("cx", function(d) {  return x(d.x) })
		    .attr("cy", function(d) {  return 5.72 * y2(d.y) })
		    .attr("visibility", "visible")
		    .delay(function(d,i) { return 3 * i * del(Math.random()) })
		    .duration(6000)
		    .ease("elastic", 20, .15)
		    .each("end", animateFirstStep);
	})
	
	// Beat up
	function animateFirstStep(){
	    d3.select(this)
		    .transition()
		    .duration(2500)
		    .attr("r", 5)
		    .each("end", animateSecondStep);
	};
	
	// Beat down
	function animateSecondStep(){
	    d3.select(this)
		    .transition()
		    .duration(2500)
		    .attr("r", 10)
		    .each("end", animateFirstStep);
	};
});
