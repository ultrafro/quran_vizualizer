function setupUI(){

	//sets up the search bar
	setupSearchBar();

	//setup x button on permanent box div
	document.getElementById("permanent_x_button").onclick=handleXOut;

	//setup the navigation bar on the right:
	setupNavBar();

	//setup the prophet table:
	setupProphetTable();

	//setup 99 names table:
	setupNamesTable();

	//setup explore table:
	setupExploreTable();

	//setup arabic text in the section content (ayas, etc...):
	setupArabicText();

	setup_selected_blink();

	//setupBoxClick();
	setupBoxHover();



}

//gets called when someone clicks on a box on the right side
function highlightAya(elem, chapter, verse){
	//console.log('highlighting: ' + chapter + ' ' + verse);

	var id_num = -1;
	for(var i = 0; i<quran_json_string.length; i++){
		if((quran_json_string[i].chapter == chapter) && (quran_json_string[i].verse == verse)){
			id_num = i;
		}
	}
	if(id_num==-1){
		return;
	}

	if(search_idx_list.includes(id_num)){
		box_list[id_num].transition()
				.attr('fill', hover_color)
	}else{
        box_list[id_num].transition()
				.attr('fill', hover_color)
	}

	highlighted_list.push(id_num);

	/*
	document.getElementById('infobox').classList.remove("infoBoxClassInvisible");
	document.getElementById('infobox').classList.add("infoBoxClassVisible");
	document.getElementById('arabic_text_p').innerHTML= quran_json_string[id_num].arabic;
	document.getElementById('english_text_p').innerHTML = quran_json_string[id_num].english;
	document.getElementById('juz_text_p').innerHTML ="juz: " + quran_json_string[id_num].juz_number;
	document.getElementById('sura_text_p').innerHTML ="surah: " + quran_json_string[id_num].chapter;
	document.getElementById('aya_text_p').innerHTML ="aya: " + quran_json_string[id_num].verse;

	//put id box in right spot
	document.getElementById('infobox').style.left = box_list[id_num].node().getBoundingClientRect().left + 50;
	document.getElementById('infobox').style.top = box_list[id_num].node().getBoundingClientRect().top + 0;	
	*/

	//add a leader line?
	for(var i = 0; i<line_list.length; i++){
		line_list[i].remove();
	}
	line_list = [];
	//the original aya, hmmmm.
	var myLine = new LeaderLine( elem, box_list[id_num].node());		
	line_list.push(myLine);	
}

function dehighlightAya(elem, chapter, verse){
	//console.log('dehighlighting: ' + chapter + ' ' + verse);

	for(var i = 0; i<line_list.length; i++){
		line_list[i].remove();
	}
	line_list = [];

	var id_num = -1;
	for(var i = 0; i<quran_json_string.length; i++){
		if((quran_json_string[i].chapter == chapter) && (quran_json_string[i].verse == verse)){
			id_num = i;
		}
	}
	if(id_num==-1){
		return;
	}

	if(search_idx_list.includes(id_num)){
		box_list[id_num].transition()
				.attr('fill', highlight_color)
	}else{
		if(selected_idx_list.includes(id_num)){
			box_list[id_num].transition()
					.attr('fill', select_color)
		}else{
			box_list[id_num].transition()
					.attr('fill', base_color)			
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

	document.getElementById('arabic_text_p').innerHTML = 'arabic text:';
	document.getElementById('english_text_p').innerHTML = 'english translation:';
	document.getElementById('juz_text_p').innerHTML ='juz number';
	document.getElementById('sura_text_p').innerHTML ='sura number';
	document.getElementById('aya_text_p').innerHTML ='aya number';

}

function clearSearchIfEmpty(){
	//console.log("test search!");
	var term =  document.getElementById("search_text_bar").value;
	if(term == ""){
		clearSearch();

	}
}

function clearSearch(){
	//console.log('clear search!');
	//clear search and go back to normal.
	fillActiveList();
	search_idx_list = [];
	//set everything to original color:
	//console.log('highlighted list: ' + highlighted_list);
	for(var i = 0; i<6235; i++){
		if(highlighted_list.includes(i)){
			//console.log('aya: ' + i + ' was on the highlighted list');
			box_list[i].transition()
				.attr('fill', highlight_color);				
		}else{
			box_list[i].transition()
				.attr('fill', base_color);				
		}
	}
	document.getElementById('search_text_bar').value = "Search for a term in the English translation"
}

//sets up the search bar above the Quran Sections
function setupSearchBar(){
	//set up search bar button
	//search is declared within utilities.js
	document.getElementById('search_button').onclick=search;
	document.getElementById('clear_search_button').onclick=clearSearch;

	//make it so when you hit the enter button after typing text, it will act as a click
	document.getElementById("search_text_bar").addEventListener("keyup", function(event) {
		// Cancel the default action, if needed
		event.preventDefault();
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			// Trigger the button element with a click
			document.getElementById("search_button").click();
		}
	});
}


//handle the next and previous buttons for cycling through highlighted ayas 
// or all ayas if nothign is highlighted
function next(){

	var currentActive = -1;
	if(selected_idx_list.length > 0){
		var selected = selected_idx_list[0];
		if(activeList[selected]){
			currentActive = selected;
		}else{
			console.log('warning: somehow an item was clicked thats not on the active list');
		}
	}else{
		console.log('couldnt find a selected one, so placing on the first');
		var firstActive = 0;
		for(var i = 0; i<activeList.length; i++){
			if(activeList[i] && !firstActive){
				firstActive = 1;
				currentActive = i;
			}
		}
	}

	//console.log("currentActive: " + i);

	//find the next legal thing
	var nextActive = currentActive;
	var found = 0;
	var firstFound = 0;
	var firstActive = -5;
	for(var i = 0; i<activeList.length; i++){
		if(activeList[i] && !found){

			if(!firstFound){
				firstFound = 1;
				firstActive = i;
			}

			if(i>currentActive){
				found = 1;
				nextActive = i;				
			}

		}
	}
	if(!found){
		nextActive = firstActive;
	}

	//click next active:

	console.log('clicking on next Active: ' + nextActive);
	var e = document.createEvent('UIEvents');
	e.initUIEvent('click', true, true, /* ... */);
	box_list[nextActive].node().dispatchEvent(e);
}



function previous(){
	var currentActive = -1;
	if(selected_idx_list.length > 0){
		var selected = selected_idx_list[0];
		if(activeList[selected]){
			currentActive = selected;
		}else{
			console.log('warning: somehow an item was clicked thats not on the active list');
		}
	}else{
		var firstActive = 0;
		for(var i = 0; i<activeList.length; i++){
			if(activeList[i] && !firstActive){
				firstActive = 1;
				currentActive = i;
			}
		}
	}

	//find the previous legal thing
	var firstFound = 0;
	var firstActive = -5;
	var previousActive = currentActive;
	var found = 0;
	for(var i = activeList.length-1; i>=0; i--){
		if(activeList[i] && !found){


			if(!firstFound){
				firstFound = 1;
				firstActive = i;
			}

			if(i<currentActive){
				found = 1;
				previousActive = i;				
			}
		}
	}

	if(!found){
		previousActive = firstActive;
	}

	//click previous active:
	console.log('clicking on previous Active: ' + previousActive);
	var e = document.createEvent('UIEvents');
	e.initUIEvent('click', true, true, /* ... */);
	box_list[previousActive].node().dispatchEvent(e);
}



function handleXOut(){
	if(document.getElementById('permanentbox').classList.contains("permanentBoxClassVisible")){
		//console.log('eliminating');
		document.getElementById('permanentbox').classList.remove("permanentBoxClassVisible");
		document.getElementById('permanentbox').classList.add("permanentBoxClassInvisible");
	}
}

//set up navigation bar:
function setupNavBar(){
	// Get the container element
	var btnContainer = document.getElementById("navbar");

	// Get all buttons with class="btn" inside the container
	var btns = btnContainer.getElementsByClassName("btn");

	// Loop through the buttons and add the active class to the current/clicked button
	for (var i = 0; i < btns.length; i++) {
	  btns[i].addEventListener("click", function() {
	  	console.log('clicked: ' + this);
	  	console.dir(this);
	    var current = document.getElementsByClassName("active");
	    current[0].className = current[0].className.replace(" active", "");
	    this.className += " active";
	  });
	}			
}

//highlight a navbar element by section name, dehighlights the others
function highlightNavBar(sectionName){
	var btnContainer = document.getElementById("navbar");
	var btns = btnContainer.getElementsByClassName("btn");
	for(var i = 0; i<btns.length; i++){
		//console.log('button href: ' + btns[i].getAttribute("sectionName") + ' section name: ' + sectionName);
		if(btns[i].getAttribute("sectionName") == sectionName){
			console.log('activating ' + btns[i].getAttribute("sectionName"));
			btns[i].classList.remove("active");
			btns[i].classList.add("active");
			//btns[i].className.replace("active","");
			//btns[i].className += " active";
		}else{
			console.log('clearing ' + btns[i].getAttribute("sectionName"));
			btns[i].classList.remove("active");
		}
	}
}

function setupProphetTable(){
	var table = document.getElementById('prophetTable');

	var numRows = 5;
	var numCols = 5;

	var rowDiv = null;
	for(var i = 0; i<prophet_json_string.length; i++){
		var row = Math.floor(i/numCols);
		var col = i%numCols;


		if(col==0){
			//add new row!
			var newRowDiv = document.createElement("div");
			newRowDiv.classList.add("prophetRow");
			table.appendChild(newRowDiv);
			rowDiv = newRowDiv;
		}

		//add new column element
		var newColDiv = document.createElement("div");
		newColDiv.classList.add("prophetColumn");
		newColDiv.classList.add("textUnselectable");
		newColDiv.index = i;
		prophetDivList.push(newColDiv);

		if((i)%2==0){
			newColDiv.classList.add("prophetOffColor");
		}

		//shape inspired by: https://www.istockphoto.com/vector/set-of-monochrome-icons-with-99-names-of-god-in-islam-gm672015226-123155375
		var arabicDiv = document.createElement("div");
		arabicDiv.classList.add("prophetArabic");
		arabicDiv.innerHTML = prophet_json_string[i].ArabicName;
		newColDiv.appendChild(arabicDiv);

		var transliteratedDiv = document.createElement("div");
		transliteratedDiv.classList.add("prophetTransliterated");
		transliteratedDiv.innerHTML = prophet_json_string[i].TransliteratedName;
		newColDiv.appendChild(transliteratedDiv);

		var englishDiv = document.createElement("div");
		englishDiv.classList.add("prophetEnglish");
		englishDiv.innerHTML = prophet_json_string[i].EnglishName;
		newColDiv.appendChild(englishDiv);



		newColDiv.addEventListener('click', function (event) {
			console.log('prophet selected: ' + prophet_json_string[this.index].TranslationName);
			searchTerm(prophet_json_string[this.index].TranslationName);


			ayaList = search_idx_list; //gross, but it works
			blink_prophet_list = [];
			blink_prophet_list = blink_prophet_list.concat(ayaList);

			highlightAyas(); //clear board?
			highlightAyas(ayaList);
			clearActiveList();
			for(var jj = 0; jj<ayaList.length; jj++){
				addToActiveList(ayaList[jj]);
			}


			//todo: get index and remove/add to active list.
			//clearActiveList();
			for(var jj = 0; jj<prophetDivList.length; jj++){
				prophetDivList[jj].classList.remove('prophetSelected');
			}
			this.classList.add('prophetSelected');
			//addToActiveList();
			prophets(); //call to clear the board.
        });

		rowDiv.appendChild(newColDiv);

	}

}

function setupExploreTable(){
	var table = document.getElementById('exploreTable');

	var numRows = 10;
	var numCols = 10;

	var rowDiv = null;
	for(var i = 0; i<explore_string.length; i++){
		var row = Math.floor(i/numCols);
		var col = i%numCols;

		if(col==0){
			//add new row!
			var newRowDiv = document.createElement("div");
			newRowDiv.classList.add("exploreRow");
			table.appendChild(newRowDiv);
			rowDiv = newRowDiv;
		}

		//add new column element
		var newColDiv = document.createElement("div");
		newColDiv.classList.add("exploreColumn");
		newColDiv.classList.add("textUnselectable");
		newColDiv.index = i;
		exploreDivList.push(newColDiv);

		if((i+row)%2==0){
			newColDiv.classList.add("exploreOffColor");
		}

		var englishDiv = document.createElement("div");
		englishDiv.classList.add("exploreEnglish");
		englishDiv.innerHTML = explore_string[i].term;
		newColDiv.appendChild(englishDiv);

		var countDiv = document.createElement("div");
		countDiv.classList.add("exploreCount");
		countDiv.innerHTML = "(" + explore_string[i].count + " mentions)";
		newColDiv.appendChild(countDiv);


		newColDiv.addEventListener('click', function (event) {
			console.log('explore selected: ' + explore_string[this.index].term);

			searchTerm(explore_string[this.index].term);


			ayaList = search_idx_list; //gross, but it works
			blink_explore_list = [];
			blink_explore_list = blink_explore_list.concat(ayaList);

			highlightAyas(); //clear board?
			highlightAyas(ayaList);
			clearActiveList();
			for(var jj = 0; jj<ayaList.length; jj++){
				addToActiveList(ayaList[jj]);
			}


			//todo: get index and remove/add to active list.
			//clearActiveList();
			for(var jj = 0; jj<exploreDivList.length; jj++){
				exploreDivList[jj].classList.remove('exploreSelected');
			}
			this.classList.add('exploreSelected');
			explore(); //call to clear the board.
		});

		rowDiv.appendChild(newColDiv);
	}
}

function setupNamesTable(){
	var table = document.getElementById('names99Table');

	var numRows = 10;
	var numCols = 10;

	var rowDiv = null;
	for(var i = 0; i<names99_string.length; i++){
		var row = Math.floor(i/numCols);
		var col = i%numCols;


		if(col==0){
			//add new row!
			var newRowDiv = document.createElement("div");
			newRowDiv.classList.add("names99Row");
			table.appendChild(newRowDiv);
			rowDiv = newRowDiv;
		}

		//add new column element
		var newColDiv = document.createElement("div");
		newColDiv.classList.add("names99Column");
		newColDiv.classList.add("textUnselectable");
		newColDiv.index = i;
		prophetDivList.push(newColDiv);

		if((i+row)%2==0){
			newColDiv.classList.add("names99OffColor");
		}


		var arabicDiv = document.createElement("div");
		arabicDiv.classList.add("names99Arabic");
		arabicDiv.innerHTML = names99_string[i].Arabic;
		newColDiv.appendChild(arabicDiv);

		var transliteratedDiv = document.createElement("div");
		transliteratedDiv.classList.add("names99Transliterated");
		transliteratedDiv.innerHTML = names99_string[i].Transliteration;
		newColDiv.appendChild(transliteratedDiv);

		var englishDiv = document.createElement("div");
		englishDiv.classList.add("names99English");
		englishDiv.innerHTML = names99_string[i].Translation;
		newColDiv.appendChild(englishDiv);

		newColDiv.addEventListener('click', function (event) {
			console.log('names99 selected: ' + names99_string[this.index].Translation);
			//searchTermArabic(names99_string[this.index].Arabic);

			/* manual search:
			arabicNameWithAL = names99_string[this.index].Arabic;
			arabicNameWithoutAL = arabicNameWithAL.substring(2); //grab 2nd index until end of string
			console.log('searching for: ' + arabicNameWithAL + ' and: ' + arabicNameWithoutAL);
			ayaList1 = getAyaIndiciesArabic(arabicNameWithAL);
			ayaList2 = getAyaIndiciesArabic(arabicNameWithoutAL);
			ayaList = ayaList1.concat(ayaList2);

			*/

			//precached search, done using function: preSearch99();
			ayaList = cache99_string[this.index].AyaList;

			blink_name_list = [];
			blink_name_list = blink_name_list.concat(ayaList);

			highlightAyas(); //clear board?
			highlightAyas(ayaList);
			clearActiveList();
			for(var jj = 0; jj<ayaList.length; jj++){
				addToActiveList(ayaList[jj]);
			}

			//searchTerm(names99_string[this.index].Translation);

			for(var jj = 0; jj<names99DivList.length; jj++){
				names99DivList[jj].classList.remove('names99Selected');
			}
			this.classList.add('names99Selected');
			names(); // call function to basically clear board
        });

        newColDiv.addEventListener('mouseover', function(event){
        	document.getElementById('highlightNamesBox').classList.remove("highlightNamesBoxClassInvisible");
			document.getElementById('highlightNamesBox').classList.add("highlightNamesBoxClassVisible");

			document.getElementById('highlightNamesBoxArabic').innerHTML = names99_string[this.index].Arabic;
			document.getElementById('highlightNamesBoxTransliterated').innerHTML = names99_string[this.index].Transliteration;
			document.getElementById('highlightNamesBoxEnglish').innerHTML = names99_string[this.index].Translation;

			document.getElementById('highlightNamesBox').style.left = this.getBoundingClientRect().right + 20;
			document.getElementById('highlightNamesBox').style.top = this.getBoundingClientRect().top - 20;	

        });

        newColDiv.addEventListener('mouseout', function(event){
        	document.getElementById('highlightNamesBox').classList.remove("highlightNamesBoxClassVisible");
			document.getElementById('highlightNamesBox').classList.add("highlightNamesBoxClassInvisible");
        });





        names99DivList.push(newColDiv);

		rowDiv.appendChild(newColDiv);

	}
}

function setupBoxHover(){
	var boxes = document.getElementsByClassName("box");
	//console.log('setting up boxes, length: ' + boxes.length);
	for(var i = 0; i<boxes.length; i++){

		var chapter = parseInt(boxes[i].getAttribute("chapter"));
		var verse = parseInt(boxes[i].getAttribute("verse"));
		//console.log('box: ' + i + ' ' + boxes[i] + ' chapter: ' + chapter + ' verse: ' + verse);
		boxes[i].onmouseover = function(){
			//console.log('for box: ' + i + ' chapter: ' + this.getAttribute("chapter") + ' verse ' + this.getAttribute("verse"));
			highlightAya(this, this.getAttribute("chapter"),this.getAttribute("verse"));
			this.classList.remove("boxDeselectedClass");
			this.classList.add("boxSelectedClass");
		};
		boxes[i].onmouseout = function(){
			dehighlightAya(this, this.getAttribute("chapter"),this.getAttribute("verse"));
			this.classList.remove("boxSelectedClass");
			this.classList.add("boxDeselectedClass");
		};

		boxes[i].onmousedown=function(){
			//clear all the others.

			if(this.classList.contains("boxClickedClass")){
				this.classList.remove("boxClickedClass");
			}else{
				var boxes2 = document.getElementsByClassName("box");
				for(var j = 0; j<boxes2.length; j++){
					boxes2[j].classList.remove("boxClickedClass");
				}
				this.classList.add("boxClickedClass");
			}
		};


	}
}

function setupBoxClick(){
	var boxes = document.getElementsByClassName("box");
	for(var i = 0; i<boxes.length; i++){

		var chapter = parseInt(boxes[i].getAttribute("chapter"));
		var verse = parseInt(boxes[i].getAttribute("verse"));
		console.log('box: ' + i + ' ' + boxes[i] + ' chapter: ' + chapter + ' verse: ' + verse);
		boxes[i].onclick = highlightAya(chapter,verse);
	}
}

function setupArabicText(){
	//console.log("setting up arabic text");
	var ayas = document.getElementsByClassName("aya");
	for(var i = 0; i<ayas.length; i++){
		var surah = parseInt(ayas[i].getAttribute("surah"));
		var aya = parseInt(ayas[i].getAttribute("aya"));
		var text = "";
		for(var jj = 0; jj<quran_json_string.length; jj++){
			if(quran_json_string[jj].chapter === surah & quran_json_string[jj].verse === aya){
				ayas[i].innerHTML = surah + ":" + aya + " " + quran_json_string[jj].arabic;
			}
		}
	}
}