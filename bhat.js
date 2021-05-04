var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin


var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

var labels = d3.set();



d3.csv("https://raw.githubusercontent.com/Alex-Ignus/cs360-a2-DV/main/emissionsCLEANED.csv", function(data){
  
        console.log(data)
     
        var mxEmissions =1660000;
        console.log(mxEmissions)
        var xScale = d3.scaleBand()
            .domain(data.map(d => d.Year))
            .range([0,width-200]).padding(0.4);
    
        var yScale = d3.scaleLinear()
            .domain([0,parseInt(mxEmissions)])
            .range([height, 0]);
        
        //axis x
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));
        //axis y
        g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function(d){
              return d;
            }).ticks(20))
            .append("text")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("value");
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "purple")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
              .x(function(d) { return xScale(d.Year) })
              .y(function(d) { return yScale(d.China) })
              )
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return xScale(d.Year) })
                .y(function(d) { return yScale(d.India) })
            )
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
              .x(function(d) { return xScale(d.Year) })
              .y(function(d) { return yScale(d.US) })
              )

      });

