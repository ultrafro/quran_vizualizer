var prophetDivList = [];
var names99DivList = [];
var exploreDivList = [];

//active list:
var activeList = []; //this is an array as long as the number of Aya's with a 1 where its active and a 0 where its not
var interestingList = []; //this is the list of active elemetns, its a list of ayas in activeList which are 1, but only happens when the entire list isn't filled.

var highlighted_list = [];

var interval = null;
var selected_interval = null;

var freeformCleared = 0;

sectionPositions = [];
sectionNames = [];

var box_list = [];
var box_juz_dict = new Object(); //this is for pre-indexing the boxes
								 //the idea is that each box is placed
								 //in a list in the dictionary with the key being
								 //each section. That way, we can search for just
								 //the boxes in each section
								 //this is filled up in the redraw/addbox function
								 //in the setupVisualization.js file

//this list will be populated with the functions that get activated
activateFunctions = [];

//current section index. set it to -5 to begin with (impossible value)
currentIndex=-5;

//will contain the Quran SVG D3 element
var svgContainer;

//reference to the handle of the resize function?
var resizeId;

//list of ayas which are highlihgted during search
var search_idx_list = [];

//item which is selected when clicked. used for paging mostly
var selected_idx_list = [];


var blink_explore_list = [];

var blink_prophet_list = [];

var blink_name_list = [];

var line_list = [];


//var search_placeholder_string = "Search for a term in the English translation. Ex: Mercy, Jesus"
var search_placeholder_string = "Ex: Mercy, Jesus"

number_of_ayas = 6236;

//some settings:
padding_x = 10;
padding_y = 0.5;
container_width = 0.95;
container_height = 0.72;
box_width = container_width*(window.innerWidth/30 - padding_x);



factor = 0.01;
delay = 30;
console.log('factor: ' + factor);

base_color = 'rgb(255,0,0)'
base_color = '#112E44'
base_color = '#43524D'
highlight_color = 'rgb(0,100,0)'
highlight_color = '#FCF0D2'
//highlight_color = '#FF0000'
hover_color = '#4352FF'
select_color = 'rgb(0,0,100)'
select_color = '#F9A79B'
select_off_color = '#FF479B'
disabled_color = '#639EA8';
disabled_color = '#63A881'
//disabled_color = '#FF0000'

bg_color = '#92794D'
bg_color = '#DDBF8B'
bg_color = '#FAEDDD' //light beige?
bg_color = '#F4EEAF' //dina's light beige
bg_color = 	'#F1ECCC' //dina's light beige 2
document.body.style.backgroundColor = bg_color;

sura_blink_color = 'rgb(200,150,150)'

burger_open = 1;
searchBar_open = 0;

current_swipe_section = 0;

screen_fixed = 0;

var quran_json_string; //to be loaded dynamically later.

//var presearch = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
//var mentions = [];