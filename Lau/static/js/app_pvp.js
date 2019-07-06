function init(){
    //agregar a la lista de equipos
    var selector1 = d3.select('#myMenu');
    var selector2 = d3.select('#myMenu2');
    d3.json("/names").then((club) => {
        selector1.selectAll("li")
        .data(club)
        .enter()
        .append("li")
        .html(function(d) {
            return `<li><a href="" onclick="equipo(this.text);return false;">${d.club}</a></li>`;
        });//equipo
        selector2.selectAll("li")
        .data(club)
        .enter()
        .append("li")
        .html(function(d) {
            return `<li><a href="" onclick="equipo2(this.text);return false;">${d.club}</a></li>`;
        });//equipo 2
    });
};

init();

//Tabla para buscar equipos////////////
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
};

function closeNav() {
document.getElementById("mySidenav").style.width = "0";
};

function openNav2() {
document.getElementById("mySidenav2").style.width = "250px";
};

function closeNav2() {
document.getElementById("mySidenav2").style.width = "0";
};

function myFunction() {
var input, filter, ul, li, a, i;
input = document.getElementById("mySearch");
filter = input.value.toUpperCase();
ul = document.getElementById("myMenu");
li = ul.getElementsByTagName("li");
for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
    li[i].style.display = "";
    } else {
    li[i].style.display = "none";
    }
}
};

function myFunction2() {
var input, filter, ul, li, a, i;
input = document.getElementById("mySearch2");
filter = input.value.toUpperCase();
ul = document.getElementById("myMenu2");
li = ul.getElementsByTagName("li");
for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
    li[i].style.display = "";
    } else {
    li[i].style.display = "none";
    }
}
};

//termina sección////////////
function play(){
    var audio = document.getElementById("cristiano_ronaldo");
    audio.play();
};

var max_w; //declarar como variable global el valor máximo
var max_pv; //declarar como variable global el valor máximo
var max_w2; //declarar como variable global el valor máximo
var max_pv2; //declarar como variable global el valor máximo

//llenar la lista de jugadores
function equipo(value){
    //llenar la lista de jugadores
    var selector = d3.select('#playerslist');
    selector.html("");

    d3.json(`/names/${value}`).then((players) => {
        //crear arrays
        var player_value = players.map(function(d){
            return d.player_value;
        });
        var wage = players.map(function(d){
            return d.wage;
        });
        // player_value máximo
        max_w = Math.max.apply(null,wage);
        max_pv = Math.max.apply(null,player_value);
        selector.selectAll("a")
        .data(players)
        .enter()
        .append("a")
        .html(function(d) {
            return `<a class="dropdown-item" href="" onclick="player(this.text);return false;">${d.player_name}</a>`;
        });
    });//termina promesa
};

function equipo2(value){
    //llenar la lista de jugadores
    var selector = d3.select('#playerslist2');
    selector.html("");

    d3.json(`/names/${value}`).then((players) => {
        //crear arrays
        var player_value = players.map(function(d){
            return d.player_value;
        });
        var wage = players.map(function(d){
            return d.wage;
        });
        // player_value máximo
        max_w2 = Math.max.apply(null,wage);
        max_pv2 = Math.max.apply(null,player_value);
        selector.selectAll("a")
        .data(players)
        .enter()
        .append("a")
        .html(function(d) {
            return `<a class="dropdown-item" href="" onclick="player2(this.text);return false;">${d.player_name}</a>`;
        });
    });//termina promesa
};

var format = function(n, dp){
    var e = '', s = e+n, l = s.length, b = n < 0 ? 1 : 0,
        i = s.lastIndexOf('.'), j = i == -1 ? l : i,
        r = e, d = s.substr(j+1, dp);
    while ( (j-=3) > b ) { r = ',' + s.substr(j, 3) + r; }
    return s.substr(0, j + 3) + r + 
      (dp ? '.' + d + ( d.length < dp ? 
          ('00000').substr(0, dp - d.length):e):e);
};

function player(value){
    if(value === "Cristiano Ronaldo"){
        play();
    };
    d3.json(`/names/player/${value}`).then((players) => {
    // var p_overall = players.overall[0];
    var p_wage = players.wage[0];
    var p_aggression = players.aggression[0];
    var p_nationality = players.nationality[0];
    var p_value = players.player_value[0];
    d3.select('#player1').text(value);
    d3.select('#country1').text(p_nationality);
    //scalar
    var w_pv = p_value * (310/max_pv);
    var w_wage = p_wage * (310/max_w);
    var w_aggression = p_aggression * 3.1;
    var xw = Math.round(60 + 310 - w_wage);
    var xpv = Math.round(60 + 310 - w_pv);
    var xa = Math.round(60 + 310 - w_aggression);
    console.log(`wage: w:${w_wage} x:${xw}`)
    //modificar width y testo
    d3.select("#red1").attr("x",xa);
    d3.select("#yellow1").attr("x",xpv);
    d3.select("#green1").attr("x",xw);
    d3.select("#w1").text(format(p_wage));
    d3.select("#a1").text(p_aggression);
    d3.select("#pv1").text(format(p_value));
});
};

function player2(value){
    if(value === "Cristiano Ronaldo"){
        play();
    };
    d3.json(`/names/player/${value}`).then((players) => {
        var p_wage = players.wage[0];
        var p_aggression = players.aggression[0];
        var p_nationality = players.nationality[0];
        var p_value = players.player_value[0];
        d3.select('#player2').text(value);
        d3.select('#country2').text(p_nationality);
        //scalar
        var w_pv = p_value * (360/max_pv2);
        var w_wage = p_wage * (360/max_w2);
        var w_aggression = p_aggression * 3.6;
        console.log(w_pv);
        console.log(w_wage);
        //modificar width y testo
        d3.select("#red2").attr("width",w_aggression);
        d3.select("#yellow2").attr("width",w_pv);
        d3.select("#green2").attr("width",w_wage);
        d3.select("#w2").text(format(p_wage));
        d3.select("#a2").text(p_aggression);
        d3.select("#pv2").text(format(p_value));
});
};
