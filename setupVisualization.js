function setupVisualization(){
	//console.log('setup visualization!!!!!!!!!!!!!!!!!!!!!!');
	//Make an SVG Container
	svgContainer = d3.select(document.getElementById("quran_container")).append("svg")
	svgContainer.node().id = "quranSVG";

		//do touch move test!
	console.log('touch change!!!!');
	//d3.select("svg").on("touchstart.zoom", null);
	d3.select("svg").on("touchstart", touchQuranMobile);
    d3.select("svg").on("touchmove", touchQuranMobile);
    d3.select("svg").on("touchend", untouchQuranMobile);
    d3.selectAll(".textBlock,.main-carousel,.names-carousel").on("touchstart", touchQuranMobile);
    d3.selectAll(".textBlock,.main-carousel,.names-carousel").on("touchmove", touchQuranMobile);
   	d3.select(".textBlock,.main-carousel,.names-carousel").on("touchend", untouchQuranMobile);





    //d3.select(".nonclick").on("touchmove", touchQuranMobile);
    //d3.select(".nonclick").on("touchend", untouchQuranMobile);
	d3.select("#content").on("touchstart", touchQuranMobile);
	//d3.select(".nonclick").on("touchstart", touchQuranMobile);
    d3.select("#content").on("touchmove", touchQuranMobile);
    d3.select("#content").on("touchend", untouchQuranMobile);
    


    //d3.select("#content").on("touchstart", touchAyaMobile);
    //d3.select("#content").on("touchmove", touchAyaMobile);
    //d3.select("#content").on("touchend",untouchAyaMobile);
    
    d3.select("svg").on("mousemove", touchQuranDesktop);
	console.log('finish touch change!!!!');
	
	window.addEventListener("resize",function(){
		if(!screen_fixed){
			clearTimeout(resizeId);
			resizeId = setTimeout(redraw, 100);			
		}

	});

	redraw();
}



function searchBar(){
	if(document.getElementById("searchBarButton").classList.contains("searchOpen")){
		console.log('closing searchbar!');
		document.getElementById("searchBarButton").classList.remove("searchOpen");
		document.getElementById("searchBarButton").classList.add("searchClosed");
		document.getElementById("content").style.zIndex=-1;
		//document.getElementById("content").style.display="block";

		var step_list = document.getElementsByClassName("step");
		
		for(var i = 0; i<step_list.length; i++){
			if(i==current_swipe_section){
				step_list[i].style.display="block";
				step_list[i].style.zIndex=100;
			}else{
				step_list[i].style.display="none";
				step_list[i].style.zIndex=0;
			}
		}

		searchBar_open = 0;
		document.getElementById("searchBar").style.display = "none";

		clearInterval(interval);
		activateFunctions[currentIndex]();
		interval = setInterval(function(){
		//console.log('interval function');
			activateFunctions[currentIndex]()
		},1600);
	}else{
		console.log('opening searchbar');
		document.getElementById("searchBarButton").classList.remove("searchClosed");
		document.getElementById("searchBarButton").classList.add("searchOpen");
		document.getElementById("content").style.zIndex=-1;
		//document.getElementById("content").style.display="none";


		var step_list = document.getElementsByClassName("step");
		
		for(var i = 0; i<step_list.length; i++){
			if(i==0){
				step_list[i].style.display="block";
				step_list[i].style.zIndex=100;
			}else{
				step_list[i].style.display="none";
				step_list[i].style.zIndex=0;
			}
		}

		searchBar_open = 1;
		document.getElementById("searchBar").style.display = "block";

		clearInterval(interval);
		activateFunctions[0]();
		//console.log('starting interval: ' + currentIndex);
		//highlightNavBar(sectionNames[currentIndex]);
	}

	if(true){	

		/*
		var step_list = document.getElementsByClassName("step");
		for(var i = 0; i<step_list.length; i++){
			if(i==current_swipe_section){
				step_list[i].style.display="block";	
				step_list[i].style.zIndex=100;				
			}
		}

		document.getElementById("swipeLeft").style.display="block";
		document.getElementById("swipeRight").style.display="block";

		document.getElementById("navbar").style.display="block";
		*/
	}
}



function burger(){
	if(document.getElementById("burger").classList.contains("burgerOpen")){
		console.log('closing burger!');
		document.getElementById("burger").classList.remove("burgerOpen");
		document.getElementById("burger").classList.add("burgerClosed");
		burger_open = 0;

		document.getElementById("content").style.zIndex=-1;
		var step_list = document.getElementsByClassName("step");
		for(var i = 0; i<step_list.length; i++){
			step_list[i].style.display="none";
			step_list[i].style.zIndex=0;
		}

		document.getElementById("swipeLeft").style.display="none";
		document.getElementById("swipeRight").style.display="none";

		document.getElementById("navbar").style.display="none";
	}else{
		console.log('opening burger');
		document.getElementById("burger").classList.remove("burgerClosed");
		document.getElementById("burger").classList.add("burgerOpen");
				document.getElementById("content").style.zIndex=0;
		burger_open = 1;

		var step_list = document.getElementsByClassName("step");
		for(var i = 0; i<step_list.length; i++){
			if(i==current_swipe_section){
				step_list[i].style.display="block";	
				step_list[i].style.zIndex=100;				
			}
		}

		document.getElementById("swipeLeft").style.display="block";
		document.getElementById("swipeRight").style.display="block";

		document.getElementById("navbar").style.display="block";
	}
}

function swipe_right(){
	console.log('swipe right');
	console.log('current swipe sectoin is: ' + current_swipe_section);
	if(!burger_open){
		return;
	}

	var step_list = document.getElementsByClassName("step");
	current_swipe_section = current_swipe_section + 1;
	if(current_swipe_section > step_list.length-1){
		current_swipe_section = step_list.length-1;
	}
	for(var i = 0; i<step_list.length; i++){
		if(i==current_swipe_section){
			step_list[i].style.display="block";
			step_list[i].style.zIndex=100;
		}else{
			step_list[i].style.display="none";
			step_list[i].style.zIndex=0;
		}
	}



	console.log('set current swipe section to: ' + current_swipe_section);

	window.location.href = "#IntroductionAnchor";
	loadSection(current_swipe_section);
	//nextSection();
}

function swipe_left(){
	if(!burger_open){
		return;
	}

	var step_list = document.getElementsByClassName("step");

	current_swipe_section = current_swipe_section -1;
	if(current_swipe_section < 0){
		current_swipe_section = 0;
	}
	for(var i = 0; i<step_list.length; i++){
		if(i==current_swipe_section){
			step_list[i].style.display="block";
			step_list[i].style.zIndex=100;
		}else{
			step_list[i].style.display="none";
			step_list[i].style.zIndex=0;
		}
	}

	window.location.href = "#IntroductionAnchor";

	loadSection(current_swipe_section);
	//previousSection();
}

function loadSection(sectionNumber){

	/*
	if(sectionNumber == 0){
		document.getElementById('navbar').style.display = 'none';
	}else{
		document.getElementById('navbar').style.display = 'block';
	}
	*/


	last_index = currentIndex;
	currentIndex = sectionNumber;
	if(last_index==8){
		exitAbout();
	}
	console.log('setting current index to: ' + currentIndex);
	clearInterval(interval);
	console.log('starting interval: ' + currentIndex);
	highlightNavBar(sectionNames[currentIndex]);

	//if search is open, close it?
	if(searchBar_open){
		clearSearch(); 
		closeAutocompleteList();
		searchBar();
	}

	if(true){	
		activateFunctions[currentIndex]();
		interval = setInterval(function(){
		//console.log('interval function');
			activateFunctions[currentIndex]()
		},1600);
		freeformCleared = 0;
	}else{
		activateFunctions[currentIndex]();
	}
}



function nextSection(){
	var last_index = currentIndex;
	if(currentIndex<0){
		currentIndex = 0;
	}else{
		if(currentIndex<(activateFunctions.length-1)){
			currentIndex = currentIndex + 1;
		}else{
			//grey out next button.
		}		
	}

	if(last_index==8){
		exitAbout();
	}

	console.log('setting current index to: ' + currentIndex);
	clearInterval(interval);
	//currentIndex = sectionIndex;
	console.log('starting interval: ' + currentIndex);

	//highlight correct nav bar item:
	highlightNavBar(sectionNames[currentIndex]);

	if(true){	
		activateFunctions[currentIndex]();
		interval = setInterval(function(){
		//console.log('interval function');
			activateFunctions[currentIndex]()
		},1600);
		freeformCleared = 0;
	}else{
		activateFunctions[currentIndex]();
	}


}

function previousSection(){
		var last_index = currentIndex;
	if(currentIndex<0){
		//grey out previous button.
		//current_index = 0;
	}else{
		if(currentIndex>0){
			currentIndex = currentIndex -1;
		}else{
			//grey out previous button.
		}		
	}

	if(last_index==8){
		exitAbout();
	}

	console.log('setting current index to: ' + currentIndex);
	clearInterval(interval);
	//currentIndex = sectionIndex;
	console.log('starting interval: ' + currentIndex);

	//highlight correct nav bar item:
	highlightNavBar(sectionNames[currentIndex]);

	if(true){	
		activateFunctions[currentIndex]();
		interval = setInterval(function(){
		//console.log('interval function');
			activateFunctions[currentIndex]()
		},1600);
		freeformCleared = 0;
	}else{
		activateFunctions[currentIndex]();
	}
}



function touchQuranDesktop(){
	console.log('touch quran desktop!');
	touchQuran(d3.mouse(this)[0], d3.mouse(this)[1]);
}

function touchQuranMobile(){
	//console.log("touch quran. This: " + this);
	//console.dir(this);

	//console.log("target: " + d3.event.target);
	//console.dir(d3.event.target);

	if(searchBar_open || current_swipe_section==0){
		d3.event.preventDefault();
	    d3.event.stopPropagation();		
	}

	if(this.classList.contains("textBlock") ||
		this.classList.contains("main-carousel") ||
		this.classList.contains("names-carousel") ){
		//console.log('element contains class nonclick, stopping propagation');
		d3.event.stopPropagation();
		return;
	}else{
		//console.log('element does not contain class nonclick, continuing propagation');
	}

    d = d3.touches(this);
    //console.log('length of touches:');
    //console.log(d.length);
    //console.dir(d);



    if(d.length == 1){
    	//var touch_x = d[0][0];
    	//var touch_y = ;
    	var element = null;
    	if(!this.classList.contains("textBlock")){
    		touchQuran(d[0][0], d[0][1], this);
    	}
    	
    }

}

function touchAyaMobile(){
	console.log("touch aya");
	d = d3.touches(this);
	cursor_x = d[0][0];
	cursor_y = d[0][1];


	touch_x = cursor_x + document.getElementById("content").getBoundingClientRect().left;
    touch_y = cursor_y + document.getElementById("content").getBoundingClientRect().top;









    /*
	if(current_swipe_section == 8){
		//about section:
		return;
	}
	*/



    console.log('not in beginning section: ' + current_swipe_section);
	console.log('touch is: ' + cursor_x + ' ' + cursor_y);
	//do classical behavior of touching and highlighting ayas

	//cycle through active list to find closest one.
	//concatenate highlighted_list and search_idx_list
	var option_list = highlighted_list.concat(search_idx_list);

	if(!searchBar_open && current_swipe_section!=8){

		option_list = option_list.concat(interestingList);    	
    }

    if(searchBar_open){
    	console.log('AMENDING FOR SEARCH BEING OPEN AND TOUCHING AYA')
    	touch_x = cursor_x + document.getElementById("quran_container").getBoundingClientRect().left;
    	touch_y = cursor_y + document.getElementById("quran_container").getBoundingClientRect().top;
    }



	//console.log('option list: ' + option_list);
	//find closest one:
	id_num = -1;
    closest_dist = 1000000000;
    for(var i = 0; i<option_list.length; i++){
    	dist = Math.abs(box_list[option_list[i]].node().getBoundingClientRect().left - touch_x) + Math.abs(box_list[option_list[i]].node().getBoundingClientRect().top - touch_y);
		//dist = Math.abs(box_list[i].node().offsetLeft - touch_x) + Math.abs(box_list[i].node().getBoundingClientRect().top - touch_y);

    	if(dist<closest_dist){
    		closest_dist = dist;
    		id_num = box_list[option_list[i]].id_num;
    	}
    }
    if(closest_dist > window.innerWidth*.1){
    	id_num = -1;
    }
    console.log('closest id num: ' + id_num);

	//handle the click/declick
	if(id_num!=-1){
		d3.event.preventDefault();
    	d3.event.stopPropagation();

		untouch();

		document.getElementById('infobox').classList.remove("infoBoxClassInvisible");
		document.getElementById('infobox').classList.add("infoBoxClassVisible");
		document.getElementById('arabic_text_p').innerHTML= quran_json_string[id_num].arabic;
		document.getElementById('english_text_p').innerHTML = quran_json_string[id_num].english;
		document.getElementById('juz_text_p').innerHTML ="juz: " + quran_json_string[id_num].juz_number;
		document.getElementById('sura_text_p').innerHTML ="surah: " + quran_json_string[id_num].chapter;
		document.getElementById('aya_text_p').innerHTML ="aya: " + quran_json_string[id_num].verse;

		//add a leader line?*
		for(var i = 0; i<line_list.length; i++){
			line_list[i].remove();
		}
		line_list = [];
		var myLine = new LeaderLine( document.getElementById('infobox'), box_list[id_num].node(), {color: 'orange', size: 8});		
		line_list.push(myLine);

		if(isInViewport(myLine.start)){
			myLine.show();
		}else{
			myLine.hide();
		}
	}

}

function untouchAyaMobile(){
	untouch();
}

function touchQuran(cursor_x, cursor_y, element){
	//console.log('touchquran');
	//console.log('element: ' + element);


	//if search: do search for closest search idx
	//if current_swipe_section == 0, do main page functionality
	//if >0, do interesting list functionality (highlighted ayas)

	touch_x = cursor_x + element.getBoundingClientRect().left;
    touch_y = cursor_y + element.getBoundingClientRect().top;

	//console.log("touch quran. element: " + element);
	//console.dir(element);
	id_num = -1;
	closest_dist = 1000000000;

	if(searchBar_open){
		id_num = -1;
		closest_dist = 1000000000;
		for(var i = 0; i<search_idx_list.length; i++){
	    	dist = Math.abs(box_list[search_idx_list[i]].node().getBoundingClientRect().left - touch_x) + Math.abs(box_list[search_idx_list[i]].node().getBoundingClientRect().top - touch_y);
			//dist = Math.abs(box_list[i].node().offsetLeft - touch_x) + Math.abs(box_list[i].node().getBoundingClientRect().top - touch_y);

	    	if(dist<closest_dist){
	    		closest_dist = dist;
	    		id_num = box_list[search_idx_list[i]].id_num;
	    	}
	    	box_list[search_idx_list[i]].transition()
					.attr('fill', base_color)
	    }

		
	}else{
		if(current_swipe_section == 0){
		 	q_width = document.getElementById("quran_container").getBoundingClientRect().right - document.getElementById("quran_container").getBoundingClientRect().left;
		    q_height = document.getElementById("quran_container").getBoundingClientRect().bottom - document.getElementById("quran_container").getBoundingClientRect().top;
		    percent_x = (cursor_x - document.getElementById("quran_container").getBoundingClientRect().left) / q_width;
		    percent_y = (cursor_y - document.getElementById("quran_container").getBoundingClientRect().top) / q_height;

		    selected_juz = Math.floor((1-percent_x)*30); //i don't know why i have to flip the percentage, but it works...
		    box_list_in_juz = box_juz_dict[selected_juz];

		    closest_dist = 1000000000;
		    for(var i = 0; i<box_list_in_juz.length; i++){
		    	dist = Math.abs(box_list_in_juz[i].node().getBoundingClientRect().left - touch_x) + Math.abs(box_list_in_juz[i].node().getBoundingClientRect().top - touch_y);
				//dist = Math.abs(box_list[i].node().offsetLeft - touch_x) + Math.abs(box_list[i].node().getBoundingClientRect().top - touch_y);

		    	if(dist<closest_dist){
		    		closest_dist = dist;
		    		id_num = box_list_in_juz[i].id_num;
		    	}
		    	box_list_in_juz[i].transition()
						.attr('fill', base_color)
			}

		}else{
			if(current_swipe_section == 5 || current_swipe_section == 6 || current_swipe_section == 7){
				var option_list = highlighted_list.concat(search_idx_list);
				option_list = option_list.concat(interestingList);
				//console.log('option list: ' + option_list);
				//find closest one:
				id_num = -1;
			    closest_dist = 1000000000;
			    for(var i = 0; i<option_list.length; i++){
			    	dist = Math.abs(box_list[option_list[i]].node().getBoundingClientRect().left - touch_x) + Math.abs(box_list[option_list[i]].node().getBoundingClientRect().top - touch_y);
					//dist = Math.abs(box_list[i].node().offsetLeft - touch_x) + Math.abs(box_list[i].node().getBoundingClientRect().top - touch_y);

			    	if(dist<closest_dist){
			    		closest_dist = dist;
			    		id_num = box_list[option_list[i]].id_num;
			    	}
			    }				
			}

		}
	}


	if(closest_dist > window.innerWidth*.1){
    	id_num = -1;
    }


	if(id_num != -1){
    	   box_list[id_num].transition()
				.attr('fill', hover_color)




		document.getElementById('infobox').classList.remove("infoBoxClassInvisible");
		document.getElementById('infobox').classList.add("infoBoxClassVisible");
		document.getElementById('arabic_text_p').innerHTML= quran_json_string[id_num].arabic;
		document.getElementById('english_text_p').innerHTML = quran_json_string[id_num].english;
		document.getElementById('juz_text_p').innerHTML ="juz: " + quran_json_string[id_num].juz_number;
		document.getElementById('sura_text_p').innerHTML ="surah: " + quran_json_string[id_num].chapter;
		document.getElementById('aya_text_p').innerHTML ="aya: " + quran_json_string[id_num].verse;

		/*
		//put id box in right spot
		var newX = box_list[id_num].node().getBoundingClientRect().left;
		var newY = box_list[id_num].node().getBoundingClientRect().top - 500;

		newX = Math.min( (window.innerWidth - 200), newX);
		

		document.getElementById('infobox').style.left = newX;
		document.getElementById('infobox').style.top = newY;	
		*/

		//add a leader line?*
		for(var i = 0; i<line_list.length; i++){
			line_list[i].remove();
		}
		line_list = [];
		var myLine = new LeaderLine( document.getElementById('infobox'), box_list[id_num].node(), {color: 'orange', size: 8});		
		line_list.push(myLine);
		if(isInViewport(myLine.start)){
			myLine.show();
		}else{
			myLine.hide();
		}
    }

    return;






	/*
	if(burger_open){
		return;
	}
	*/
	if(current_swipe_section!=0){ //todo: add if search bar is on condition
		console.log('not in beginning section: ' + current_swipe_section);
		console.log('touch is: ' + cursor_x + ' ' + cursor_y);
		//do classical behavior of touching and highlighting ayas

		//cycle through active list to find closest one.
		//concatenate highlighted_list and search_idx_list
		var option_list = highlighted_list.concat(search_idx_list);

		console.log('option list: ' + option_list);
		//find closest one:
		id_num = -1;
	    closest_dist = 1000000000;
	    for(var i = 0; i<option_list.length; i++){
	    	dist = Math.abs(box_list[option_list[i]].node().getBoundingClientRect().left - cursor_x) + Math.abs(box_list[option_list[i]].node().getBoundingClientRect().top - cursor_y);
			//dist = Math.abs(box_list[i].node().offsetLeft - touch_x) + Math.abs(box_list[i].node().getBoundingClientRect().top - touch_y);

	    	if(dist<closest_dist){
	    		closest_dist = dist;
	    		id_num = box_list[option_list[i]].id_num;
	    	}
	    }
	    console.log('closest id num: ' + id_num);

		//handle the click/declick
		if(id_num!=-1){

			untouch();

			document.getElementById('infobox').classList.remove("infoBoxClassInvisible");
			document.getElementById('infobox').classList.add("infoBoxClassVisible");
			document.getElementById('arabic_text_p').innerHTML= quran_json_string[id_num].arabic;
			document.getElementById('english_text_p').innerHTML = quran_json_string[id_num].english;
			document.getElementById('juz_text_p').innerHTML ="juz: " + quran_json_string[id_num].juz_number;
			document.getElementById('sura_text_p').innerHTML ="surah: " + quran_json_string[id_num].chapter;
			document.getElementById('aya_text_p').innerHTML ="aya: " + quran_json_string[id_num].verse;

			//add a leader line?*
			for(var i = 0; i<line_list.length; i++){
				line_list[i].remove();
			}
			line_list = [];
			var myLine = new LeaderLine( document.getElementById('infobox'), box_list[id_num].node(), {color: 'orange', size: 8});		
			line_list.push(myLine);

			if(isInViewport(myLine.start)){
				myLine.show();
			}else{
				myLine.hide();
			}
		}







		return;
	}


	console.log('Touch Quran!');
	document.getElementById('infobox-nav').style.display = "block";
	console.log('set nav style to: ' + document.getElementById('infobox-nav').style.display);

    touch_x = cursor_x + document.getElementById("quran_container").getBoundingClientRect().left;
    touch_y = cursor_y + document.getElementById("quran_container").getBoundingClientRect().top;






    //d = new Date();
	//start = d.getMilliseconds();

    //get id num which is closest to click, but do it fast! measured to 4ms on pixel 2
    q_width = document.getElementById("quran_container").getBoundingClientRect().right - document.getElementById("quran_container").getBoundingClientRect().left;
    q_height = document.getElementById("quran_container").getBoundingClientRect().bottom - document.getElementById("quran_container").getBoundingClientRect().top;
    percent_x = (cursor_x - document.getElementById("quran_container").getBoundingClientRect().left) / q_width;
    percent_y = (cursor_y - document.getElementById("quran_container").getBoundingClientRect().top) / q_height;

    selected_juz = Math.floor((1-percent_x)*30); //i don't know why i have to flip the percentage, but it works...
    box_list_in_juz = box_juz_dict[selected_juz];

    id_num = -1;
    if(!searchBar_open){
	    closest_dist = 1000000000;
	    for(var i = 0; i<box_list_in_juz.length; i++){
	    	dist = Math.abs(box_list_in_juz[i].node().getBoundingClientRect().left - touch_x) + Math.abs(box_list_in_juz[i].node().getBoundingClientRect().top - touch_y);
			//dist = Math.abs(box_list[i].node().offsetLeft - touch_x) + Math.abs(box_list[i].node().getBoundingClientRect().top - touch_y);

	    	if(dist<closest_dist){
	    		closest_dist = dist;
	    		id_num = box_list_in_juz[i].id_num;
	    	}
	    	box_list_in_juz[i].transition()
					.attr('fill', base_color)
	    }
    }else{
     	closest_dist = 1000000000;
	    for(var i = 0; i<search_idx_list.length; i++){
	    	dist = Math.abs(box_list[search_idx_list[i]].node().getBoundingClientRect().left - touch_x) + Math.abs(box_list[search_idx_list[i]].node().getBoundingClientRect().top - touch_y);
			//dist = Math.abs(box_list[i].node().offsetLeft - touch_x) + Math.abs(box_list[i].node().getBoundingClientRect().top - touch_y);

	    	if(dist<closest_dist){
	    		closest_dist = dist;
	    		id_num = box_list[search_idx_list[i]].id_num;
	    	}
	    	box_list[search_idx_list[i]].transition()
					.attr('fill', base_color)
	    }   	
    }



    console.log('found id num: ' + id_num);
    console.dir('foudn box: ' + box_list[id_num]);
       
    //d = new Date();
	//stop = d.getMilliseconds();
	//console.log('fast method elapsed time: ' + (stop-start) + ' milliseconds');


	/*
    d = new Date();
	start = d.getMilliseconds();

    //find closest id num. brute force search. measured to 95ms on pixel 2
    id_num = -1;
    closest_dist = 1000000000;
    for(var i = 0; i<box_list.length; i++){
    	dist = Math.abs(box_list[i].node().getBoundingClientRect().left - touch_x) + Math.abs(box_list[i].node().getBoundingClientRect().top - touch_y);
		//dist = Math.abs(box_list[i].node().offsetLeft - touch_x) + Math.abs(box_list[i].node().getBoundingClientRect().top - touch_y);

    	if(dist<closest_dist){
    		closest_dist = dist;
    		id_num = i;
    	}
    	box_list[i].transition()
				.attr('fill', base_color)
    }

    d = new Date();
	stop = d.getMilliseconds();
	console.log('slow method elapsed time: ' + (stop-start) + ' milliseconds');
	*/

    if(id_num != -1){
    	   box_list[id_num].transition()
				.attr('fill', hover_color)




		document.getElementById('infobox').classList.remove("infoBoxClassInvisible");
		document.getElementById('infobox').classList.add("infoBoxClassVisible");
		document.getElementById('arabic_text_p').innerHTML= quran_json_string[id_num].arabic;
		document.getElementById('english_text_p').innerHTML = quran_json_string[id_num].english;
		document.getElementById('juz_text_p').innerHTML ="juz: " + quran_json_string[id_num].juz_number;
		document.getElementById('sura_text_p').innerHTML ="surah: " + quran_json_string[id_num].chapter;
		document.getElementById('aya_text_p').innerHTML ="aya: " + quran_json_string[id_num].verse;

		/*
		//put id box in right spot
		var newX = box_list[id_num].node().getBoundingClientRect().left;
		var newY = box_list[id_num].node().getBoundingClientRect().top - 500;

		newX = Math.min( (window.innerWidth - 200), newX);
		

		document.getElementById('infobox').style.left = newX;
		document.getElementById('infobox').style.top = newY;	
		*/

		//add a leader line?*
		for(var i = 0; i<line_list.length; i++){
			line_list[i].remove();
		}
		line_list = [];
		var myLine = new LeaderLine( document.getElementById('infobox'), box_list[id_num].node(), {color: 'orange', size: 8});		
		line_list.push(myLine);

		if(isInViewport(myLine.start)){
			myLine.show();
		}else{
			myLine.hide();
		}
    }

}

function untouchQuranMobile(){
	untouch();
}

function untouch(){
	for(var i = 0; i<line_list.length; i++){
		line_list[i].remove();
	}
	line_list = [];

	document.getElementById('infobox').classList.remove("infoBoxClassVisible");
	document.getElementById('infobox').classList.add("infoBoxClassInvisible");
	document.getElementById('infobox-nav').style.display = "none";
}

function addBox(text, width, start_x, start_y, id_num, juz_num){
	var box = svgContainer.append("rect")
			                            .attr("x", start_x)
			                            .attr("y", start_y)
			                            .attr("width", width)
			                            .attr("height", factor*text.length)
			                            .attr("id", "id_" + id_num)
			                            .attr("fill",base_color)
			                            .attr("visibility","hidden")
			                            .attr("state","default")
			                            //.on("click",handleMouseDown)
			                            //.on("mouseout", handleMouseOut)
			                            //.on("mouseover", handleMouseOver)
  										//.on("touchmove",handleMouseOver);


	// var box = svgContainer.append("rect")
	// 		                            .attr("x", start_x)
	// 		                            .attr("y", start_y)
	// 		                            .attr("width", width)
	// 		                            .attr("height", factor*text.length)										
	box.id = "id_" + id_num;
	box.id_num = id_num;
	box.juz = juz_num;
	box.node().classList.add("pointable");
	box_list.push(box);
	if(box_juz_dict[juz_num] == null){
		box_juz_dict[juz_num]=[];
	}
	box_juz_dict[juz_num].push(box);

	return factor* text.length;
}

function revealBox(id_num){
	//console.log('revealing box: '  + id_num);
	box_list[id_num].transition()
					.attr("visibility","visible");
}

function revealBoxSection(sectionNumber, numSections){
	//console.log('revealing box: '  + id_num);
	var N = Math.ceil(box_list.length / numSections);
	var start = (sectionNumber*N);
	for(var i = 0; i<N; i++){
		box_list[start + i].transition()
							.attr("visibility","visible");
	}
}



function redraw()
{

	screen_fixed = 1;
	console.log("redrawing!");
	// var width = document.getElementById("quran_container").clientWidth;
//      	var height = document.getElementById("quran_container").clientHeight;
	var width = window.innerWidth;
	var height = window.innerHeight;
	svgContainer
      .attr("width", width*container_width)
      .attr("height", height*container_height);
    box_width = ((container_width*window.innerWidth)/31 - padding_x);


    //number of ayas in first juz: 111
    //length of arabic text in first juz (characters): 23959
    //number of ayas in first juz: 563
    //length of arabic text in first juz (characters): 21823
    //height of juz stack = num_ayas*padding + length_arabic*factor
    //so: factor = (height_juz_stack - (num_ayas*padding))/length_arabic
    //factor = (height*container_height) / (23170 + padding_y);
	//factor = (height*container_height - 111*padding_y)/23959;
	factor = (height*container_height - 563*padding_y)/21823;
	console.log('setting factor to: ' + factor);

	for(i = 0; i<box_list.length; i++){
		//svgContainer.select(box_list[i]).remove();
		box_list[i].remove();
	}
	box_list=[];
	svgContainer.selectAll("*").remove();

	//setup quran element
	juz_height = [];
	for(juz_counter = 0; juz_counter<30; juz_counter++){
		juz_height[juz_counter] = 0;
	}


	//column length determiend using following code: 23170 characters.
	// col_length = 0;
	// for(i = 0; i<number_of_ayas; i++){
	// 	aya = quran_json_string[i];
	// 	if(aya.juz_number==1){
	// 		col_length = col_length + aya.arabic.length;
	// 	}
	// }
	// console.log('col length: '  + col_length);

	debug_n_aya_count = 0;
	debug_l_arabic_count = 0;
	var lastJuz = -1;
	for(i = 0; i<number_of_ayas; i++)
	//for(i = 0; i<1000; i++)
	{
		thisDelay = i*delay;//+ .0001;
		aya = quran_json_string[i];
		juz = aya.juz_number-1;
		arabic = aya.arabic;



		clientWidth = svgContainer.attr("width");
		clientHeight = svgContainer.attr("height");
		//clientWidth = svgContainer[0][0].clientWidth;
		//clientHeight = svgContainer[0][0].clientHeight;

		super_offset = (clientWidth - (box_width + padding_x)*30)/2;
		c_start_x = clientWidth - super_offset - (juz*(box_width+padding_x));
		c_start_x = clientWidth - ((juz+1)*(box_width+padding_x));
		c_start_y = juz_height[juz];



		//for debugging purposes:
		//console.log("number: " + i + " chapter: " + aya.chapter + " verse: " + aya.verse + " juz: " + juz + " " + box_width + " " + c_start_x + " " + c_start_y);



		//addBox(arabic,box_width,c_start_x,c_start_y,i);
		addBox(arabic,box_width,c_start_x,c_start_y,i,juz); //made a change to add juz number and place box in juz list.

		/*
		//add circles on top.
		if(juz != lastJuz){
			console.log("new juz at: " + c_start_x + " " + c_start_y);
			lastJuz = juz;
			//put a circle with number on top.
			svgContainer.append("circle")
										.attr("cx", c_start_x+box_width/2)
			                            .attr("cy", c_start_y)
			                            .attr("r", 5)
			                            .attr("stroke","black")
	    								.attr("fill", "black")
			                            .attr("visibility","visible");
		}
		*/

		//console.log('thisDela: ' + thisDelay);
		//setTimeout(addBox,thisDelay,arabic,box_width,c_start_x,c_start_y,i);
		//setTimeout(revealBox,thisDelay,i);


		
		//juz_height[juz] = juz_height[juz]+additional_height;
		juz_height[juz] = juz_height[juz]+arabic.length*factor+padding_y;

		if(juz==29){
			debug_n_aya_count++;
			debug_l_arabic_count = debug_l_arabic_count + arabic.length;
		}
	}

	var numSections = 90;
	for(var i = 0; i<numSections; i++){
		var thisDelay = delay*i;
		setTimeout(revealBoxSection, thisDelay, i, numSections);
	}

	console.log('number of ayas in 30th juz: ' + debug_n_aya_count);
	console.log('length of arabic in 30th juz: ' + debug_l_arabic_count);
}


function handleMouseDown(d,i){
	console.log("handle mousedown for: ");
	console.dir(d);
	id_num = this.id.substring(3,this.id.length);
	id_num = parseInt(id_num);
	console.log(id_num);

	if(!activeList[id_num]){
		return;
	}

	var alreadyClicked = 0;
	for(var ss = 0; ss<selected_idx_list.length; ss++){
		//console.log('searching selected for: ' + id_num);
		if(id_num == selected_idx_list[ss]){
			selected_idx_list = [];
			//console.log('found and reclosing');
			alreadyClicked = 1;
			handleXOut();

			//return to state before selected -> 
			if(highlighted_list.includes(selected_idx_list[i])){
				box_list[id_num].transition()
					.attr('fill', highlight_color)
			}else{
				box_list[id_num].transition()
					.attr('fill', base_color)				
			}
		}
	}
	if(!alreadyClicked){
		console.log('was not already clicked');

		if(search_idx_list.includes(id_num)){
			//console.log('orange!: ' + d3.select(this));
			//console.dir('orange!: ' + d3.select(this));
			box_list[id_num].transition()
				.attr('fill', select_color)
			/*
			d3.select(this).attr({
	          fill: "orange"
	        });
	        */
	        /*
	        //color other search_idx_list elements the select_color:
	        for(var i = 0; i<selected_idx_list.length; i++){
	        	box_list[selected_idx_list[i]].attr({
	        		fill: select_color
	        	});
	        }
	        */


			//this.setAttributeNS(null,'fill','purple');
		}else{
			//console.log('clicking something not on thte search idx list');
			//console.dir(d3.select(this));
			box_list[id_num].transition()
				.attr('fill', select_color)

			/*
			d3.select(this).attr({
	          fill: select_color
	        });
	        */
	        /*
	        d3.select(this).attr({
	          fill: "orange"
	        });
	        */
			//this.setAttributeNS(null,'fill',select_color);
		}
		//highlighted_list.push(id_num);	

		//selected_list=[];
		//turn off all those that are on the selected idx list:
		//console.log("selected idx length: " + selected_idx_list.length);
		for(var i = 0; i<selected_idx_list.length; i++){
			if(search_idx_list.includes(selected_idx_list[i])){
				box_list[selected_idx_list[i]].transition()
					.attr('fill', highlight_color);	
			}else{
				box_list[selected_idx_list[i]].transition()
					.attr('fill', base_color);	
			}

			// if(selected_idx_list.includes(selected_idx_list[i])){
			// 	box_list[selected_idx_list[i]].transition()
			// 		.attr('fill', highlight_color);				
			// }else{
			// 	box_list[selected_idx_list[i]].transition()
			// 		.attr('fill', base_color);				
			// }

		}
		selected_idx_list=[];
		selected_idx_list.push(id_num);	
		handle_selected_blink();

		document.getElementById('permanentbox').classList.remove("permanentBoxClassVisible");
		document.getElementById('permanentbox').classList.remove("permanentBoxClassInvisible");
		document.getElementById('permanentbox').classList.add("permanentBoxClassVisible");
		document.getElementById('permanent_arabic_text_p').innerHTML= quran_json_string[id_num].arabic;
		document.getElementById('permanent_english_text_p').innerHTML = quran_json_string[id_num].english;
		document.getElementById('permanent_juz_text_p').innerHTML ="juz: " + quran_json_string[id_num].juz_number;
		document.getElementById('permanent_sura_text_p').innerHTML ="surah: " + quran_json_string[id_num].chapter;
		document.getElementById('permanent_aya_text_p').innerHTML ="aya: " + quran_json_string[id_num].verse;						
	}

}


function handleMouseOver(d,i){
	//console.log('this id: ' + this.id);
	//console.dir(this);
	//console.dir(d);
	//console.dir(i);
	//console.dir(d3.select(this));
	id_num = this.id.substring(3,this.id.length);
	id_num = parseInt(id_num);
	//console.log('found id num: ' + id_num);

	if(!activeList[id_num]){
		return;
	}

	if(search_idx_list.includes(id_num)){
		box_list[id_num].transition()
				.attr('fill', hover_color)
		/*
		d3.select(this).attr({
          fill: "orange"
        });
        */			
		//this.setAttributeNS(null,'fill','purple');
	}else{
		/*
		d3.select(this).attr({
          fill: select_color
        });
        */
        box_list[id_num].transition()
				.attr('fill', hover_color)
		//this.setAttributeNS(null,'fill',select_color);
	}

	highlighted_list.push(id_num);
	//console.log('added to highlihgted list: ');
	//console.log(highlighted_list);

	//console.log('displaying block');
	//document.getElementById('infobox').display = "block";
	document.getElementById('infobox').classList.remove("infoBoxClassInvisible");
	document.getElementById('infobox').classList.add("infoBoxClassVisible");
	document.getElementById('arabic_text_p').innerHTML= quran_json_string[id_num].arabic;
	document.getElementById('english_text_p').innerHTML = quran_json_string[id_num].english;
	document.getElementById('juz_text_p').innerHTML ="juz: " + quran_json_string[id_num].juz_number;
	document.getElementById('sura_text_p').innerHTML ="surah: " + quran_json_string[id_num].chapter;
	document.getElementById('aya_text_p').innerHTML ="aya: " + quran_json_string[id_num].verse;

	//put id box in right spot
	document.getElementById('infobox').style.left = this.getBoundingClientRect().left + 50;
	document.getElementById('infobox').style.top = this.getBoundingClientRect().top + 0;	

	//add a leader line?
	for(var i = 0; i<line_list.length; i++){
		line_list[i].remove();
	}
	line_list = [];
	var myLine = new LeaderLine( document.getElementById('infobox'), box_list[id_num].node());		
	line_list.push(myLine);

	if(isInViewport(myLine.start)){
		myLine.show();
	}else{
		myLine.hide();
	}
}


function handleMouseOut(d,i){
	//console.log('mouse out: ' + this);

	for(var i = 0; i<line_list.length; i++){
		line_list[i].remove();
	}
	line_list = [];

	id_num = this.id.substring(3,this.id.length);
	id_num = parseInt(id_num);

	//console.log('handling mouseout for: ' + id_num);
	if(!activeList[id_num]){
		//console.log('element: ' + id_num + ' is not active during mouseout');
		return;
	}


	if(selected_idx_list.includes(id_num)){
		box_list[id_num].transition()
					.attr('fill', select_color);
	}else{
		if(search_idx_list.includes(id_num)){
			box_list[id_num].transition()
							.attr('fill', highlight_color);
		}else{
			box_list[id_num].transition()
							.attr('fill', base_color);
		}
	}


	for(var i = highlighted_list.length - 1; i >= 0; i--) {
	    if(highlighted_list[i] === id_num) {

	       highlighted_list.splice(i, 1);
	     	//console.log('removing: ' + id_num + ' now its: ' + highlighted_list)
	    }
	}

	document.getElementById('infobox').classList.add("infoBoxClassInvisible");
	document.getElementById('infobox').classList.remove("infoBoxClassVisible");


	//highlighted_list.remove(id_num);
	//console.log('highlihgt list length after removal: ' + highlighted_list.length);
	if(highlighted_list.length == 0){
		//console.log(highlighted_list);
		//console.log('displaying none');	
		//document.getElementById('infobox').display = "none";	

		//document.getElementById('infobox').classList.add("infoBoxClassInvisible");
		//document.getElementById('infobox').classList.remove("infoBoxClassVisible");		
	}

	
	document.getElementById('arabic_text_p').innerHTML = 'arabic text:';
	document.getElementById('english_text_p').innerHTML = 'english translation:';
	document.getElementById('juz_text_p').innerHTML ='juz number';
	document.getElementById('sura_text_p').innerHTML ='sura number';
	document.getElementById('aya_text_p').innerHTML ='aya number';

	//console.log(this.id);
}






function closeAutocompleteList(){
	/*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
    	x[i].parentNode.removeChild(x[i]);
      //if (elmnt != x[i] && elmnt != inp) {
      //x[i].parentNode.removeChild(x[i]);
    }
}



function autocomplete(inp, arr, mentions) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          var term = arr[i];
          var num_mentions = mentions[i];
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "       [" + num_mentions + "]";
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/



          // b.addEventListener("click", function(e) {
          //     /*insert the value for the autocomplete text field:*/
          //     inp.value = this.getElementsByTagName("input")[0].value;
          //     /*close the list of autocompleted values,
          //     (or any other open lists of autocompleted values:*/
          //     closeAllLists();
          // });
          b.searchTerm = term;
          b.onclick=function(){
          		console.log('')
          	    //var term = arr[i];
          		console.log('searching for autocomplete term: ' + this.searchTerm);
          		searchTerm(this.searchTerm);
          		document.getElementById("myInput").value = this.searchTerm;
          		closeAllLists();
          }
          // b.addEventListener('click', function() { 

          //  });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      	if (elmnt != x[i] && elmnt != inp) {
      		x[i].parentNode.removeChild(x[i]);
    	}
    }
  }
}