var dataset;

//set dimensions and margins
var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set ranges
var y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1);

var x = d3.scaleLinear()
    .range([0, width]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// format the data
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

    // console.log(data[0])
    var gold = 0, silver = 0, bronze = 0;
    data.forEach(function (d) {
        //console.log(d.Medal);
        if (d.Medal == "Gold") {
            gold++;
        } else if (d.Medal == "Silver") {
            silver++;
        } else {
            bronze++;
        }
    })
    // console.log(gold + " " + silver + " " + bronze);

    // get number of medals per country
    var countries = new Map();
    data.forEach(function (d) {
        if (!countries.has(d.Country)) {
            countries.set(d.Country, 1)
        } else {
            countries.set(d.Country, countries.get(d.Country) + 1)
        }
    });
    // console.log(countries)
    // console.log(countries.values())


    // sets hierarchy for data - if we do sunburst
    // var root = d3.stratify()
    //     .id(function (d) {
    //         return d.Sport;
    //     })
    //     .parentId(function (d) {
    //         return d.Discipline;
    //     })
    //     (data);

    drawVis(dataset, gold, silver, bronze, countries);
});

function drawVis(dataset, gold, silver, bronze, countries) { //draw the circiles initially and on each interaction with a control

    // Scale the range of the data in the domains
    // y axis: countries, x axis: num medals per country
    x.domain([0, d3.max(2500)]) // ideally here you'd get the max value in countries.values() but I can't seem to get that
    y.domain(dataset.map(function (d) { return d.Country; }));

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(dataset)
        .enter().append("rect")
        .attr("class", "bar")
        //.attr("x", function(d) { return x(d.sales); })
        // .attr("width", function (d) { return x(d.sales); }) // instead of d.sales, want the values in countries.values()
        .attr("y", function (d) { return y(d.Country); })
        .attr("height", y.bandwidth() + 2000);

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
}