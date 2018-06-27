
const dataArray = [
    {x: 5, y: 5},
    {x: 10, y: 15},
    {x: 15, y: 10},
    {x: 20, y: 22},
    {x: 25, y: 5}
];

const interpolateType = [
    d3.curveLinear, 
    d3.curveNatural,
    d3.curveStep, 
    d3.curveBasis, 
    d3.curveBundle
];

const svg = d3.select("body")
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%");


for(let i = 0; i < interpolateType.length; i++) {
    let shiftX = i*250,
        shiftY = 0;

    const line = d3.line()
        .x(function (d, i) { return d.x * 6; })
        .y(function (d, i) { return d.y * 4; })
        .curve(interpolateType[i]);

    const chartGroup = svg.append("g")
                            .attr("class", "group-" + i)
                            .attr("transform", `translate(${shiftX}, ${shiftY})`);

    chartGroup.append("path")
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("d", line(dataArray));
        // .on("click", translate);

    chartGroup.selectAll("circle.grp" + i)
        .data(dataArray)
        .enter().append("circle")
        .attr("class", function(d, i) { return "grp" + i})
        .attr("cx", function (d, i) { return d.x * 6; })
        .attr("cy", function (d, i) { return d.y * 4; })
        .attr("r", "2");
}
