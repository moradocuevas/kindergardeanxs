function init(){
    console.log('hello world')
    //agregar a la lista de equipos
    var selector = d3.select('#myMenu');
    d3.json("/names").then((club) => {
        selector.selectAll("li")
        .data(club)
        .enter()
        .append("li")
        .html(function(d) {
            return `<li><a onclick="equipo(this.text)" href="#">${d.club}</a></li>`;
        });
    });
};
//<li><a onclick="equipo(this.text)" href="#">Barcelona</a>
// función para buscar en la lista de equipos

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

function equipo(value){
    
    console.log(value)
}

init();