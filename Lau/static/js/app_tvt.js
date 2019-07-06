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

var format = function(n, dp){
    var e = '', s = e+n, l = s.length, b = n < 0 ? 1 : 0,
        i = s.lastIndexOf('.'), j = i == -1 ? l : i,
        r = e, d = s.substr(j+1, dp);
    while ( (j-=3) > b ) { r = ',' + s.substr(j, 3) + r; }
    return s.substr(0, j + 3) + r + 
      (dp ? '.' + d + ( d.length < dp ? 
          ('00000').substr(0, dp - d.length):e):e);
};

function mean(arr) {
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
      total += arr[i];
    }
    var meanValue = total / arr.length;
  
    return meanValue;
};

function equipo(value){
    var Uteam = value.toUpperCase();
    d3.select('#team1').text(Uteam);
    d3.json(`/names/${value}`).then((players) => {
        //crear arrays
        var player_value = players.map(function(d){
            return d.player_value;
        });
        var wage = players.map(function(d){
            return d.wage;
        });
        var aggression = players.map(function(d){
            return d.aggression;
        });
        var aggression_mean = mean(aggression);
        var pv_mean = mean(player_value);
        var wage_mean = mean(wage);
        d3.select("#w1").text(format(wage_mean));
        d3.select("#a1").text(format(aggression_mean));
        d3.select("#pv1").text(format(pv_mean));

    });//termina promesa
};

console.log(3)
function equipo2(value){
    var Uteam = value.toUpperCase();
    d3.select('#team2').text(Uteam);
    d3.json(`/names/${value}`).then((players) => {
        //crear arrays
        var player_value = players.map(function(d){
            return d.player_value;
        });
        var wage = players.map(function(d){
            return d.wage;
        });
        var aggression = players.map(function(d){
            return d.aggression;
        });
        var aggression_mean = mean(aggression);
        var pv_mean = mean(player_value);
        var wage_mean = mean(wage);
        d3.select("#w2").text(format(wage_mean));
        d3.select("#a2").text(format(aggression_mean));
        d3.select("#pv2").text(format(pv_mean));

    });//termina promesa
};

