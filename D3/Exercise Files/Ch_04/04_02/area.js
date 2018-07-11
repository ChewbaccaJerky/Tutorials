
const dataArray = [];
const dataYears = [];
const height = 200;
const width = 200;

for(let i = 0; i < 50; i++) {
    const val = Math.floor(Math.random() * 100);
    dataArray.push(val);
    dataYears.push((2000 + i).toString());
}

// generator
const area = d3.area()
                 .x(function(d, i){ return i * 20; })
                 .y0(height)
                 .y1(function(d){ return height - d; });

const svg = d3.select("body")
                .append("svg")
                    .attr("height", "100%")
                    .attr("width", "100%");

svg.append("path").attr("d", area(dataArray));
