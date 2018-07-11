var dataArray = [25,26,28,32,37,45,55,70,90,120,135,150,160,168,172,177,180];
var dataYears = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'];

var height = 200;
const width = 500;
const margin = {
    left: 50,
    right: 50,
    top: 50,
    bottom: 50
};

const parseDate = d3.timeParse("%Y");

// y axis
const y = d3.scaleLinear()
                .domain([0, d3.max(dataArray)])
                .range([height, 0]);

const yAxis = d3.axisLeft(y)
                  .ticks(5);
                //   .tickPadding(10)
                //   .tickSize(10);

// x axis
const minYear = d3.min(dataYears, function (d) { return parseDate(d); });
const maxYear = d3.max(dataYears, function (d) { return parseDate(d); });
const domain = d3.extent(dataYears, function (d) { return parseDate(d); });

const x = d3.scaleTime()
              .domain(domain)
              .range([0, width]);

const xAxis = d3.axisBottom(x);

const area = d3.area()
                .x(function(d,i){ return x(parseDate(dataYears[i])); })
                .y0(height)
                .y1(function(d){ return y(d); });

const svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

const chartGroup = svg.append("g")
                        .attr("class", "chart-group")
                        .attr("transform", `translate(${margin.left}, ${margin.top})`);



chartGroup.append("path").attr("d", area(dataArray));

chartGroup.append("g")
     .attr("class", "yAxis")
     .call(yAxis);

chartGroup.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
