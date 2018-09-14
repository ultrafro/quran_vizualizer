
//todo: what is active list again? haha.
function addToActiveList(index){
	activeList[index]=1;
}

function clearActiveList(){
	for(var i = 0; i<6235; i++){
		activeList[i] = 0;
	}			
}

function fillActiveList(){
	for(var i = 0; i<6235; i++){
		activeList[i] = 1;
	}				
}

//strips the diacritics (harakat) from arabic text. not the fastest, but works.
function stripDiacritics(rawString) {
	var list = [];
   //return rawString.replace(/ُ|ِ|َ|ٍ|ً|ّ/g,"");
   stripped = rawString; 


   //var re = new RegExp(diacritics,'g');
  // stripped = rawString.replace(re,'');

  var broken = stripped.split(daggerAliph).join(clean_aliph);
  var together = stripped.split(daggerAliph).join('');

   for(var i = 0; i<diacritics.length; i++){

   		broken = broken.split(diacritics[i]).join('');
   		together = together.split(diacritics[i]).join('');

   		stripped = stripped.split(diacritics[i]).join('');
   		//stripped = stripped.replace(diacritics[i],"");
   		//console.log("stripped: " + stripped);
   }

   for(var i = 0; i<aliphs.length; i++){
   		broken = broken.split(aliphs[i]).join(clean_aliph);
   		together = together.split(aliphs[i]).join(clean_aliph);
   		stripped = stripped.split(aliphs[i]).join(clean_aliph);
   		//console.log("stripped: " + stripped);
   }

   list.push(broken);
   list.push(together);
   return list;  
}


//given an array, it shuffles that array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


function search(){
	term = document.getElementById("search_text_bar").value;
	console.log('searching for: ' + term.toUpperCase());
	clearActiveList();
	//clear previous search index list:
	for(i = 0; i<search_idx_list.length; i++){
		box_list[search_idx_list[i]].attr('fill',base_color);
	}
	search_idx_list=[];

	for(i = 0; i<6235; i++){
		if(quran_json_string[i].english.toUpperCase().includes(term.toUpperCase())){
			search_idx_list.push(i);
			addToActiveList(i);
			box_list[i].attr('fill',highlight_color);
		}
	}
}


function searchTerm(term){
	console.log('searching for: ' + term.toUpperCase());
	clearActiveList();
	//clear previous search index list:
	for(i = 0; i<search_idx_list.length; i++){
		box_list[search_idx_list[i]].attr('fill',base_color);
	}
	search_idx_list=[];

	for(i = 0; i<6235; i++){
		if(quran_json_string[i].english.toUpperCase().includes(term.toUpperCase())){
			search_idx_list.push(i);
			addToActiveList(i);
			box_list[i].attr('fill',highlight_color);
		}
	}
}

function highlightAyas(ayaList){

	//console.log('highlighting ayas: ' + ayaList);
	//console.log('current search idx list: ' + search_idx_list);
	clearActiveList();

	//clear previous search index list:
	for(i = 0; i<search_idx_list.length; i++){
		box_list[search_idx_list[i]].attr('fill',base_color);
	}
	search_idx_list=[];
	
	for(i = 0; i<ayaList.length; i++){
		search_idx_list.push(ayaList[i]);
		addToActiveList(ayaList[i]);
		box_list[ayaList[i]].attr('fill',highlight_color);
	}	
}



function getAyaIndiciesArabic(term){
	var ayaList = [];

	for(i = 0; i<6235; i++){
		var strippedAyaList = stripDiacritics(quran_json_string[i].arabic);
		var strippedTermList = stripDiacritics(term);
		var strippedTerm = strippedTermList[0];
		for(jj = 0; jj<strippedAyaList.length; jj++){
			if(strippedAyaList[jj].includes(strippedTerm)){
				ayaList.push(i);
			}					
		}
	}

	return ayaList;
}


function searchTermArabic(term){
	console.log('searching for: ' + term);

	//clear previous search index list:
	for(i = 0; i<search_idx_list.length; i++){
		box_list[search_idx_list[i]].attr('fill',base_color);
	}
	search_idx_list=[];

	for(i = 0; i<6235; i++){
		var strippedAyaList = stripDiacritics(quran_json_string[i].arabic);
		var strippedTermList = stripDiacritics(term);
		var strippedTerm = strippedTermList[0];
		for(jj = 0; jj<strippedAyaList.length; jj++){
			if(strippedAyaList[jj].includes(strippedTerm)){
				search_idx_list.push(i);
				box_list[i].attr('fill',highlight_color);
			}					
		}
	}
}





//function used to presearch the 99 names to find where they show up. 
//This isn't actively used now in the code, 
//instead it was used to find the references which are hard-coded now. 
//This function is super slow.
function preSearch99(){
	var cache99 = [];

	for(var i = 0; i<names99_string.length; i++){
	//for(var i = 0; i<10; i++){				
		arabicNameWithAL = names99_string[i].Arabic;
		arabicNameWithoutAL = arabicNameWithAL.substring(2); //grab 2nd index until end of string
		ayaList1 = getAyaIndiciesArabic(arabicNameWithAL);
		ayaList2 = getAyaIndiciesArabic(arabicNameWithoutAL);
		ayaList = ayaList1.concat(ayaList2);

		var entry = new Object();
		entry.Number = i;
		entry.Transliteration = names99_string[i].Transliteration;
		entry.Arabic = names99_string[i].Arabic;
		entry.Translation = names99_string[i].Translation;
		entry.SearchTerm = names99_string[i].SearchTerm;
		entry.AyaList = ayaList;

		cache99[i] = entry;
		console.log('term: ' + names99_string[i].Arabic + ' ' + ayaList);
	}
	var cache99_string = JSON.stringify(cache99);
	console.log(cache99_string);
}