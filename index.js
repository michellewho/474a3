var width = 750;
var height = 450;
var margin = { top: 20, right: 15, bottom: 30, left: 40 };
var w = width - margin.left - margin.right;
var h = height - margin.top - margin.bottom;

var dataset;

d3.csv("summer.csv", function (data) {
    data.forEach(function (d) {
        d.Year = +d.Year;
        d.City = d.City;
        d.Sport = d.Sport;
        d.Discipline = d.Discipline;
        d.Athlete = d.Athlete;
        d.Country = d.Country;
        d.Gender = d.Gender;
        d.Event = d.Event;
        d.Medal = d.Medal;
    })

    dataset = data;


    console.log(data[0])
    var gold=0, silver=0, bronze=0;
    data.forEach(function(d){
        //console.log(d.Medal);
        if(d.Medal == "Gold"){
            gold++;
        } else if(d.Medal == "Silver"){
            silver++;
        } else {
            bronze++;
        }
    })
    console.log(gold + " " + silver + " " + bronze);

     drawVis(dataset, gold, silver, bronze);
});

function drawVis(dataset) {

}

var col = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select("body").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var chart = d3.select(".chart")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom + 15)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
    .domain([0, 1000])
    .range([0, w]);

var y = d3.scaleLinear()
    .domain([0, 1000])
    .range([h, 0]);

var xAxis = d3.axisBottom()
    .ticks(4)
    .scale(x);

chart.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis)
    .append("text")
    .attr("x", w)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Year");

var yAxis = d3.axisLeft()
    .scale(y);

chart.append("g")
    .attr("class", "axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Medal Count");


function drawVis(dataset, gold, silver, bronze) { //draw the circiles initially and on each interaction with a control

    var circle = chart.selectAll("circle")
        .data(dataset);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    circle
        .attr("cx", function (d) { return x(d.Year); })
        .attr("cy", function (d) { return y(d.Medal); })
        .style("fill", function (d) { return col(d.Country); });

    circle.exit().remove();

    circle.enter().append("circle")
        .attr("cx", function (d) { return x(d.Year); })
        .attr("cy", function (d) { return y(d.Medal); })
        .attr("r", 4)
        .style("stroke", "black")
        //.style("fill", function(d) { return colLightness(d.vol); })
        .style("fill", function (d) { return col(d.Country); })
        .style("opacity", 0.5);


}