var dataArray = [5,11,18];
var newX;
var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

svg.selectAll("rect")
      .data(dataArray)
      .enter().append("rect")
                  .attr("x",function(d,i){ return 60*i; })
                  .attr("y",function(d,i){ return 300-(d*15); })
                  .attr("height",function(d,i){ return d*15; })
                  .attr("width","50")
                  .attr("fill","blue");


newX = 300;
svg.selectAll("circle.first")
      .data(dataArray)
      .enter().append("circle")
                  .attr("class", "first")
                  .attr("cx", function(d , i){ 
                        newX += (d * 3) + ( i * 20);
                        return newX;
                  })
                  .attr("cy", "100")
                  .attr("r", function(d){ return d * 3;});


newX = 600;
svg.selectAll("ellipse")
      .data(dataArray)
      .enter().append("ellipse")
      .attr("class", "second")
      .attr("cx", function (d, i) {
            newX += (d * 3) + (i * 20);
            return newX;
      })
      .attr("cy", "100")
      .attr("rx", function (d) { return d * 3; })
      .attr("ry", "30");

newX = 900;
svg.selectAll("line")
      .data(dataArray)
      .enter().append("line")
      .attr("x1", newX)
      .attr("y1", function (d, i) { return 80 + (i * 20);})
      .attr("x2", function(d){ return newX + (d * 15);})
      .attr("y2", function (d, i) { return 80 + (i * 20); })
      .style("stroke", "green")
      .attr("stroke-width", "2");

// each character is a shape
const textArray = ["start", "middle", "end"];

svg.append("text").selectAll("tspan")
      .data(textArray)
      .enter().append("tspan")
      .text(function(d){ return d; })
      .attr("x", newX)
      .attr("y", function(d, i){return 50 * i + 150;})
      .attr("font-size", "30")
      .attr("text-anchor", function(d){return d;})
      .attr("dominant-baseline", "middle")
      .attr("fill", "black")
      .attr("stroke", "red");

// svg.append("text")
//       .text("START")
//       .attr("x", newX)
//       .attr("y", "150")
//       .attr("font-size", "30")
//       .attr("text-anchor", "start")
//       .attr("dominant-baseline", "middle")
//       .attr("fill", "blue")
//       .attr("stroke", "blue");

// svg.append("text")
//       .text("MIDDLE")
//       .attr("x", newX)
//       .attr("y", "200")
//       .attr("fill", "blue")
//       .attr("stroke", "none")
//       .attr("font-size", "30")
//       .attr("text-anchor", "middle")
//       .attr("dominant-baseline", "middle");

// svg.append("text")
//       .text("END")
//       .attr("x", newX)
//       .attr("y", "250")
//       .attr("fill", "none")
//       .attr("stroke", "blue")
//       .attr("font-size", "30")
//       .attr("text-anchor", "end")
//       .attr("dominant-baseline", "middle");

svg.append("line")
      .attr("x1", newX)
      .attr("y1", 150)
      .attr("x2", newX)
      .attr("y2", 250)
      .attr("stroke", "black");
