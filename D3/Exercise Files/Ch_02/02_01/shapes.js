
var dataArray = [5, 11, 18];

const svg = d3.select('body')
                .append('svg')
                .attr('width', "100%")
                .attr('height', "100%");

svg.selectAll('rect')
    .data(dataArray)
    .enter().append("rect")
                .attr("x", function(d, i){return 60 * i;})
                .attr("y", function(d, i){ return 300 - ( d * 15);})
                .attr("width", "50")
                .attr("height", function(d, i) { return d * 15;})
                .attr("fill", "blue");