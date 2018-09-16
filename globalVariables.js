var prophetDivList = [];
var names99DivList = [];

//active list:
var activeList = [];

var highlighted_list = [];

var interval = null;

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


//some settings:
padding_x = 10;
padding_y = 0.5;
container_width = 0.4;
container_height = 0.80;
box_width = container_width*(window.innerWidth/30 - padding_x);



factor = 0.01;
delay = 30;
console.log('factor: ' + factor);

base_color = 'rgb(255,0,0)'
base_color = '#112E44'
highlight_color = 'rgb(0,100,0)'
highlight_color = '#FCF0D2'
select_color = 'rgb(0,0,100)'
select_color = '#A9A79B'

bg_color = '#92794D'
bg_color = '#DDBF8B'

