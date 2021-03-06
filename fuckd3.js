var dataset;

//set dimensions and margins
var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 4600 - margin.left - margin.right,
    height = 740 - margin.top - margin.bottom;

// set ranges
var y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1);

var x = d3.scaleLinear()
    .range([0, width]);

// d3.select("input[value=\"total\"]").property("checked", true);

// d3.selectAll("input").on("change", function () {
//     console.log(this.value)
// });

// d3.selectAll("input").on("change", selectDataset);


// function selectDataset() {
//     var value = this.value;
//     if (value == "total") {
//         change(datasetTotal);
//     }
//     else if (value == "option1") {
//         change(datasetOption1);
//     }
//     else if (value == "option2") {
//         change(datasetOption2);
//     }
//     else if (value == "option3") {
//         change(datasetOption2);
//     }
// }

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform",
//     "translate(" + margin.left + "," + margin.top + ")");

// format the data
d3.csv("medalCount.csv", function (data) {
    data.forEach(function (d) {
        d.Country = d.Country;
        d.All = +d.All;
        d.Gold = +d.Gold;
        d.Silver = +d.Silver;
        d.Bronze = +d.Bronze;
    })

    dataset = data;

    drawVis(dataset);

});

function change(updatedState) {
    console.log(updatedState);

    if (updatedState === 'All') {
        var all_D = dataset.sort(function(x, y){
           return [d3.descending(x.All, y.All)];
        })
        y.domain(all_D.map(function (d) { return d.Country; }));
        d3.selectAll("rect").data(all_D);
        d3.selectAll('rect').attr("width", function (d) {
            return d.All / 5 + "px"
        })


    } else if (updatedState === 'Gold') {
        var gold_D = dataset.sort(function(x, y){
           return d3.descending(x.Gold, y.Gold);
        })
        y.domain(gold_D.map(function (d) { return d.Country; }));
        d3.selectAll("rect").data(gold_D);
        d3.selectAll('rect').attr("width", function (d) {
            return d.Gold / 2 + "px"
        })


    } else if (updatedState === 'Silver') {
        var silver_D = dataset.sort(function(x, y){
           return d3.descending(x.Silver, y.Silver);
        })
        y.domain(silver_D.map(function (d) { return d.Country; }));
        d3.selectAll("rect").data(silver_D);
        d3.selectAll('rect').attr("width", function (d) {
            return d.Silver / 2 + "px"
        })


    } else {
        var bronze_D = dataset.sort(function(x, y){
           return d3.descending(x.Bronze, y.Bronze);
        })
        y.domain(bronze_D.map(function (d) { return d.Country; }));
        d3.selectAll("rect").data(bronze_D);
        d3.selectAll('rect').attr("width", function (d) {
            return d.Bronze / 2 + "px"
        })
    }
        d3.select("g")
        .attr('transform', 'translate(' + [35] + ')')
        .call(d3.axisLeft(y));
}


function drawVis(datasetVis) { //draw the circiles initially and on each interaction with a control

    var goldData = [];
    var silverData = [];
    var bronzeData = [];

    // Scale the range of the data in the domains
    // y axis: countries, x axis: num medals per country
    x.domain([0, d3.max(2500)]) // ideally here you'd get the max value in countries.values() but I can't seem to get that
    y.domain(datasetVis.map(function (d) { return d.Country; }));

    var container = d3.select("body").append("svg")
        .attr("width", 960)
        .attr("height", 1000)

    var bars = container.selectAll("rect")
        .data(datasetVis)
        .enter()
        .append("rect")
        .attr("height", 10)
        .attr("width", function (d) {
            return d.All / 5 + "px"
        }
        )
        .attr("y", function (d) { return y(d.Country) })
        .attr("x", function (d) { return margin.left })
        .attr("class", "rect")
        .on("mouseover", function (d) {
            d3.select(this).style("fill", "steelblue");
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("Country: " + d.Country +
                "<br\>  Number of Medals: " + d.All +
                "<br\> Gold: " + d.Gold +
                "<br\>  Silver: " + d.Silver +
                "<br\>  Bronze: " + d.Bronze)
                .style("left", (d3.event.pageX + 25) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", "black");
            div.transition()
                .duration(100)
                .style("opacity", 0);
        });

    bars.exit().remove()

    // add the x Axis
    // container.append("g")
    //    .attr("transform", "translate(0," + (height * 5) + ")")
    //    .call(d3.axisBottom(x));

    // add the y Axis
    container.append("g")
        .attr('transform', 'translate(' + [35] + ')')
        .call(d3.axisLeft(y));


    // tooltip
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .attr("x", 20)
        .style("opacity", 0);

}




// function updateVis(dataset, state) {

    // if (state === "All") {
    //     data = dataset.All
    // } else if (state === "Gold") {
    //     data = dataset.
    // }

//     var bar = container.selectAll("rect")
//         .data(dataset, function (d, state) { 
//             if (state === "All") {
//                 return d.All
//             } else if (state === "Gold") {
//                 data = dataset.Gold
//             } else if 

//          });
// }