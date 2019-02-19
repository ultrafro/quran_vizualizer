function setupVisualization(){
	//Make an SVG Container
	svgContainer = d3.select(document.getElementById("quran_container")).append("svg")
	
	window.addEventListener("resize",function(){
		clearTimeout(resizeId);
		resizeId = setTimeout(redraw, 100);
		setupSectionPositions();
	});

	redraw();
}

function addBox(text, width, start_x, start_y, id_num){
	var box = svgContainer.append("rect")
			                            .attr("x", start_x)
			                            .attr("y", start_y)
			                            .attr("width", width)
			                            .attr("height", factor*text.length)
			                            .attr("id", "id_" + id_num)
			                            .attr("fill",base_color)
			                            .attr("visibility","hidden")
			                            .attr("state","default")
			                            .on("mouseover", handleMouseOver)
  										.on("mouseout", handleMouseOut)
  										.on("click",handleMouseDown);


	// var box = svgContainer.append("rect")
	// 		                            .attr("x", start_x)
	// 		                            .attr("y", start_y)
	// 		                            .attr("width", width)
	// 		                            .attr("height", factor*text.length)										
	box.id = "id_" + id_num;
	box.node().classList.add("pointable");
	box_list.push(box);

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



		addBox(arabic,box_width,c_start_x,c_start_y,i);

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
		document.getElementById('sura_text_p').innerHTML ="surah: " + quran_json_string[id_num].chapter + " - " + surah_info[quran_json_string[id_num].chapter-1].transliterated;
		document.getElementById('permanent_sura_text_p').innerHTML ="surah: " + quran_json_string[id_num].chapter + " - " + surah_info[quran_json_string[id_num].chapter-1].transliterated;
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
	document.getElementById('sura_text_p').innerHTML ="surah: " + quran_json_string[id_num].chapter + " - " + surah_info[quran_json_string[id_num].chapter-1].transliterated;
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