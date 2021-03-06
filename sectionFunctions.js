//this file contains all the functions that define the behavior of each section


function setupActivateFunctions(){
	activateFunctions[0] = freeform;
	activateFunctions[1] = freeform;
	activateFunctions[2] = alaq;
	activateFunctions[3] = surah;
	activateFunctions[4] = fatiha;
	activateFunctions[5] = jesus;
	activateFunctions[6] = prophets;
	activateFunctions[7] = names;
	//activateFunctions[7] = explore;
	activateFunctions[8] = about;		
}

function setupSectionPositions(){
	//get section positions:
	var startPos;
	d3.selectAll('section').each(function(d,i) {
	  var top = this.getBoundingClientRect().top;

	  if(i === 0) {
	    startPos = top;
	  }
	  sectionPositions.push(top - startPos);
	  sectionNames.push(this.id);
	  console.log('adding section: ' + top);
	});
}

function setup_selected_blink(){
	selected_interval = setInterval(function(){handle_selected_blink()},1600);
}

function handle_selected_blink(){
	//console.log('handle selected blink');
	for(i=0; i<selected_idx_list.length; i++){
		console.log('making selected blink: ' + selected_idx_list[i]);
		//console.log('length of selected idx list: ' + selected_idx_list.length);
		//console.log('transitioning: ' + i + '-' +  selected_idx_list[i]);
		box_list[selected_idx_list[i]].transition()
					.duration(200)
					.attr('fill',select_color)
					.transition()
					.duration(200)
					.attr('fill',select_off_color)
					.transition()
					.duration(200)
					.attr('fill',select_color)
					.transition()
					.duration(200)
					.attr('fill',select_off_color)

	}
}



function setupSectionScroll(){
	return;
	/*
	window.addEventListener('scroll',function(e) {
		//var pos = window.pageYOffset+10;
		var pos = window.pageYOffset;
		console.log(pos);

		//find first element > pos, select oen right before it:
		greaterSection = -1;
		for(i = 0; i<sectionPositions.length; i++){
			if(pos>sectionPositions[i]){
				greaterSection = i;
			}
		}
		greaterSection = greaterSection + 1;
		var sectionIndex;
		if(greaterSection > 0){
			sectionIndex = greaterSection - 1;
		}else{
			sectionIndex = 0;
		}

		var progress = pos;
		sectionIndex = Math.min(sectionPositions.length - 1, sectionIndex);

		if (currentIndex !== sectionIndex) {
			console.log('change in scroll, going from: ' + currentIndex + ' to: ' + sectionIndex );

			if(currentIndex == 8){
				//exiting about section:
				exitAbout();
			}


			//dispatch.active(sectionIndex);
			console.log('setting current index to: ' + sectionIndex);
			clearInterval(interval);
		    currentIndex = sectionIndex;
		    console.log('starting interval: ' + sectionIndex);

		    //highlight correct nav bar item:
		    highlightNavBar(sectionNames[currentIndex]);

		    //if(sectionIndex != 11 && sectionIndex != 12){
		    if(true){	
			    activateFunctions[sectionIndex]();
			    interval = setInterval(function(){
			    	//console.log('interval function');
			    	activateFunctions[sectionIndex]()
			    },1600);
			    freeformCleared = 0;
		    }else{
		    	activateFunctions[sectionIndex]();
		    }
		}else{
			//progressFunctions[sectionIndex](progress);
		}
	});
	*/
}




function freeform(){
	if(!freeformCleared){
		for(i=0; i<box_list.length; i++){
			box_list[i].transition()
						.duration(800)
						.attr('fill', base_color)
		}
		console.log('freeform cleaned');
		freeformCleared = 1;

		fillActiveList();							
	}

}


function about(){
	//console.log('about');
	if(!freeformCleared){
		for(i=0; i<box_list.length; i++){
			box_list[i].transition()
						.duration(800)
						.attr('fill', base_color)
		}
		//console.log('freeform cleaned');
		freeformCleared = 1;

		fillActiveList();							
	}

	//switch out the aya.
	var marquee = document.getElementById('marquee').querySelector('.aya');

	var surah = parseInt(marquee.getAttribute("surah"));
	var aya = parseInt(marquee.getAttribute("aya"));

	dehighlightAya(document.getElementById('marquee'),surah, aya);

	//console.log('surah: ' + surah + ' aya: ' + aya);
	//find next available aya
	var higher = -1;
	for(var i = 0; i<quran_json_string.length; i++){

		if((higher==-1) && (quran_json_string[i].verse > aya) && (quran_json_string[i].chapter==surah)){
			higher = i;
		}
		if((higher==-1) && (quran_json_string[i].chapter > surah)){
			higher = i;
		}
	}
	//console.log('higher: ' + higher);

	if(higher!=-1){

		highlightAya(document.getElementById('marquee'),quran_json_string[higher].chapter, quran_json_string[higher].verse);

		marquee.innerHTML = quran_json_string[higher].chapter + ":" + quran_json_string[higher].verse + " " + quran_json_string[higher].arabic;
		marquee.setAttribute("surah", quran_json_string[higher].chapter);
		marquee.setAttribute("aya",quran_json_string[higher].verse);
		marquee.parentElement.querySelector('.ayaEnglish').innerHTML = quran_json_string[higher].english;		
	}



}


function exitAbout(){
	console.log('*************exit about!!!');

	var marquee = document.getElementById('marquee').querySelector('.aya');

	var surah = parseInt(marquee.getAttribute("surah"));
	var aya = parseInt(marquee.getAttribute("aya"));

	dehighlightAya(document.getElementById('marquee'),surah, aya);
	//dehighlightAya(document.getElementById('marquee'),surah, aya);
}

function alaq(){
	//console.log('alaq called');
	clearActiveList();
	//surah 96
	for(i=0; i<box_list.length; i++){

		//if(quran_json_string[i].chapter>=90){
		if(quran_json_string[i].chapter==96){
			addToActiveList(i);	
			//console.log('setting: ' + i + ' red');
			box_list[i].transition()
					.duration(200)
					.attr('fill', 'black')
					.transition()
					.duration(200)
					.attr('fill',sura_blink_color)
					.transition()
					.duration(200)
					.attr('fill','black')
					.transition()
					.duration(200)
					.attr('fill',sura_blink_color)
		}else{
			
			
			box_list[i].transition()
					.duration(200)
					.attr('fill', disabled_color)
			

			/*
			box_list[i].transition()
					.duration(400)
					.attr('fill', 'rgba(255,255,255,.5)')
					.transition()
					.duration(400)
					.attr('fill','rgba(0,0,0,.5)')
					.transition()
					.duration(400)
					.attr('fill','rgba(255,255,255,.5)')
					.transition()
					.duration(400)
					.attr('fill','rgba(0,0,0,.5)')    						
			*/
		}
	}

}

function surah(){
	//color_list = colors.distinct(114);

	fillActiveList();
	color_idx = [];
	for(i = 0; i<114; i++){
		color_idx.push(i);
	}
	//console.dir(color_idx);
	shuffleArray(color_idx);

	for(i = 0; i<box_list.length; i++){
		chapter = quran_json_string[i].chapter;
		box_list[i].transition()
					.duration(800)
					.attr('fill',d3.hsl(color_idx[[chapter-1]]/114*360, 1, .5));
	}
}

//todo: handle case where term ends with a period.
function jesus(){
	//console.log('calling jesus');

	clearActiveList();
	for(i = 0; i<box_list.length; i++){
		english = quran_json_string[i].english;
		found = 0;	
		if(english.toUpperCase().includes(' JESUS') | english.toUpperCase().includes('JESUS ')){
			addToActiveList(i);
			box_list[i].transition()
					.duration(400)
					.attr('fill','white')
					.transition()
					.duration(400)
					.attr('fill','black')
					.transition()
					.duration(400)
					.attr('fill','white')
					.transition()
					.duration(400)
					.attr('fill','black')
			found = 1;
		}
		if(english.toUpperCase().includes(' MARY') | english.toUpperCase().includes('MARY ') ){
			addToActiveList(i);
			box_list[i].transition()
					.duration(400)
					.attr('fill','yellow')
					.transition()
					.duration(400)
					.attr('fill','black')
					.transition()
					.duration(400)
					.attr('fill','yellow')
					.transition()
					.duration(400)
					.attr('fill','black')
			found = 1;
		}
		if(!found){
			box_list[i].transition()
						.duration(800)
						.attr('fill',disabled_color);
		}
			
	}

}


function fatiha(){
	//console.log('fatiha called');
	clearActiveList();
	//surah 96
	for(i=0; i<box_list.length; i++){

		//if(quran_json_string[i].chapter>=90){
		if(quran_json_string[i].chapter==1){	
			addToActiveList(i);
			//console.log('setting: ' + i + ' red');
			box_list[i].transition()
					.duration(200)
					.attr('fill', 'black')
					.transition()
					.duration(200)
					.attr('fill',sura_blink_color)
					.transition()
					.duration(200)
					.attr('fill','black')
					.transition()
					.duration(200)
					.attr('fill',sura_blink_color)
		}else{
			
			box_list[i].transition()
					.duration(200)
					.attr('fill', disabled_color)
			
		}
	}
}


function explore(){
	//console.log('handle explore');
	//fillActiveList();
	clearActiveList();
	for(i=0; i<box_list.length; i++){
		if(blink_explore_list.includes(i)){
			addToActiveList(i);
			if(!selected_idx_list.includes(i) && !highlighted_list.includes(i)){
				box_list[i].transition()
						.duration(200)
						.attr('fill','white')
						.transition()
						.duration(200)
						.attr('fill','black')
						.transition()
						.duration(200)
						.attr('fill','white')
						.transition()
						.duration(200)
						.attr('fill','black');				
			}

		}else{
			if(!selected_idx_list.includes(i) && !highlighted_list.includes(i)){
				box_list[i].transition()
							.duration(200)
							.attr('fill', disabled_color);			
			}
		}
	}
}

function prophets(){
	//console.log('handle prophets');
	//fillActiveList();
	clearActiveList();
	for(i=0; i<box_list.length; i++){
		if(blink_prophet_list.includes(i)){
			addToActiveList(i);
			if(!selected_idx_list.includes(i) && !highlighted_list.includes(i)){
				box_list[i].transition()
						.duration(200)
						.attr('fill','white')
						.transition()
						.duration(200)
						.attr('fill','black')
						.transition()
						.duration(200)
						.attr('fill','white')
						.transition()
						.duration(200)
						.attr('fill','black');				
			}

		}else{
			if(!selected_idx_list.includes(i) && !highlighted_list.includes(i)){
				box_list[i].transition()
							.duration(200)
							.attr('fill', disabled_color);			
			}
		}
	}
}

function names(){
	//fillActiveList();
	//clearActiveList();
	//console.log('clearing for names!');
	for(i=0; i<box_list.length; i++){
		if(blink_name_list.includes(i)){
			box_list[i].transition()
					.duration(200)
					.attr('fill','white')
					.transition()
					.duration(200)
					.attr('fill','black')
					.transition()
					.duration(200)
					.attr('fill','white')
					.transition()
					.duration(200)
					.attr('fill','black')
		}else{
			box_list[i].transition()
						.duration(200)
						.attr('fill', disabled_color)			
		}
	}
}