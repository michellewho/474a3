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
    console.log("ok");
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
    var countryMedalCounts = [{name: data[0].Country, gold: 0, silver: 0, bronze: 0}];
    
    data.forEach(function(c){
        if (!countryMedalCounts.includes(c.Country)) {
            var newCountry = {name: c.Country, gold: 0, silver: 0, bronze: 0};
            countryMedalCounts.push(newCountry)
        };
    })

     console.log(countryMedalCounts[0])
    var gold = 0, silver = 0, bronze = 0;

    console.log("hi");
    data.forEach(function (d) {
        if (d.Medal == "Gold") {
            gold++;
            //countryMedalCounts[d.Country].gold += 1;
            var obj = countryMedalCounts.find((o, i) => {
                if (o.name === d.Country) {
                    countryMedalCounts[i] = { name: o.name, gold: o.gold += 1, silver: o.silver, bronze: o.bronze };
                    return true; // stop searching
                }
            });
        } else if (d.Medal == "Silver") {
            silver++;
            var obj = countryMedalCounts.find((o, i) => {
                if (o.name === d.Country) {
                    countryMedalCounts[i] = { name: o.name, gold: o.gold, silver: o.silver += 1, bronze: o.bronze };
                    return true; // stop searching
                }
            });
        } else {
            bronze++;
            var obj = countryMedalCounts.find((o, i) => {
                if (o.name === d.Country) {
                    countryMedalCounts[i] = { name: o.name, gold: o.gold, silver: o.silver, bronze: o.bronze += 1 };
                    return true; // stop searching
                }
            });
        }
    })

    console.log(gold + " " + silver + " " + bronze);
    console.log("Total Medals: " + (gold+silver+bronze))
    console.log(countryMedalCounts[0]);
    console.log(countryMedalCounts.find(o => o.name === 'USA'))

    // // get number of medals per country
    // var countries = new Map();
    // data.forEach(function (d) {
    //     if (!countries.has(d.Country)) {
    //         var medals = [0,0,0];
    //         countries.set(d.Country, medals)
    //     } else {
    //         if(d.Medal == "Gold") {
    //             countries.set(d.Country, countries.get(d.Country)[1] + 1);
    //         } else if (d.Medal == "Silver") {
    //             countries.set(d.Country, countries.get(d.Country)[2] + 1);
    //         } else {
    //             countries.set(d.Country, countries.get(d.Country)[3] + 1);
    //         }
    //     }
    // });
    // console.log(countries)
    //console.log(countries.values())


    // sets hierarchy for data - if we do sunburst
    // var root = d3.stratify()
    //     .id(function (d) {
    //         return d.Sport;
    //     })
    //     .parentId(function (d) {
    //         return d.Discipline;
    //     })
    //     (data);

    //drawVis(dataset, countryMedalCounts);
});

function drawVis(dataset, countryMedalCounts) { //draw the circiles initially and on each interaction with a control

    // Scale the range of the data in the domains
    // y axis: countries, x axis: num medals per country
    x.domain([0, d3.max(2500)]) // ideally here you'd get the max value in countries.values() but I can't seem to get that
    y.domain(dataset.map(function (d) { return d.Country; }));

    var temp = d3.select("body").selectAll("div")
        .data(dataset)
        .enter()
        .append("div")
        .attr("width", 10)
        .style("height", function(d){ 
            let obj = countryMedalCounts.find(o => o.name === d.Country);
            return (obj.gold + obj.silver + obj.bronze)/10 + "px"
        })
        .attr("class", "bar")

    // // append the rectangles for the bar chart
    // var bars = svg.selectAll(".bar")
    //     .data(dataset)
    //     .enter().append("rect")
    //     .attr("class", "bar")
    //     .attr("x", function(d) { return 0; })
    //     // .attr("width", function (d) { return x(d.sales); }) // instead of d.sales, want the values in countries.values()
    //     .attr("y", function (d) { return y(d.Country); })
    //     .attr("height", y.bandwidth() + 2000);

    // // add the x Axis
    // svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

    // // add the y Axis
    // svg.append("g")
    //     .call(d3.axisLeft(y));
}