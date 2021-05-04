var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin


var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

var labels = d3.set();



d3.csv("https://raw.githubusercontent.com/Alex-Ignus/cs360-a2-DV/main/emissionsCLEANED.csv", function(data){
  
        console.log(data)
        svg.append("text")
        .attr("y", 35)
        .attr("x",width/2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Decreesing USA Emissions VS Top Global Pouluders");
        svg.append("text")
        .attr("y", 90)
        .attr("x",width-100)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("China");
        svg.append("text")
        .attr("y", 365)
        .attr("x",width-100)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Inda");
        svg.append("text")
        .attr("y", 420)
        .attr("x",width-100)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("USA");
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 35)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("NO2 Emissions per Country");
        svg.append("text")
        .attr("y", 700)
        .attr("x",width/2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Total Emissions per Years");  
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
              return "";
            }).ticks(5))
            .append("text")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("value");
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
              .x(function(d) { return xScale(d.Year) })
              .y(function(d) { return yScale(d.China) })
              )
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return xScale(d.Year) })
                .y(function(d) { return yScale(d.India) })
            )
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .text("I'm a label")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
              .x(function(d) { return xScale(d.Year) })
              .y(function(d) { return yScale(d.US) })
              )

      });

