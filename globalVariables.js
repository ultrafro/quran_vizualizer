var prophetDivList = [];
var names99DivList = [];
var exploreDivList = [];

//active list:
var activeList = [];

var highlighted_list = [];

var interval = null;
var selected_interval = null;

var freeformCleared = 0;

sectionPositions = [];
sectionNames = [];

var box_list = [];

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


var search_placeholder_string = "Search for a term in the English translation. Ex: Mercy, Jesus"

number_of_ayas = 6236;

//some settings:
padding_x = 10;
padding_y = 0.5;
container_width = 0.9;
container_height = 0.80;
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

sura_blink_color = 'rgb(200,150,150)'

burger_open = 0;

current_swipe_section = 0;

screen_fixed = 0;
