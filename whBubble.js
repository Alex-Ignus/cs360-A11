var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin


var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

var labels = d3.set();
var lastNum;
//https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
    var ranNum = Math.floor(Math.random() * (max - min) ) + min
    if(ranNum == 0 ||ranNum == lastNum  ){
        ranNum = getRndInteger(min, max) ;
    }
    
    lastNum = ranNum;
    return ranNum;
  }


d3.csv("https://raw.githubusercontent.com/Alex-Ignus/cs360-a2-DV/main/videogames_gamesSoldPerConsolePerYear.csv")
      .row(function (d) { labels.add(d.Console); return { gameConsole:String(d.Console), salesYear:Number(d.Year),TotalReleases:Number(d.Count), PlayTime:Number(d.PlayTime) };})
      .get(function(error, data){
       

        var ordinal = d3.scaleOrdinal()
            .domain(["Playsation 3", "Nintendo DS", "Sony PSP", "Xbox 360", "Nintendo Wii"])
            .range([ "blue", "red", "purple", "green", "orange"]);

        var svg = d3.select("svg");

        svg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(750,80)");

        var legendOrdinal = d3.legendColor()
        //d3 symbol creates a path-string, for example
        //"M0,-8.059274488676564L9.306048591020996,
        //8.059274488676564 -9.306048591020996,8.059274488676564Z"
        .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
        .shapePadding(10)
        .scale(ordinal);

        svg.select(".legendOrdinal")
        .call(legendOrdinal);
        var mxRelease = d3.max(data, d => d.TotalReleases);
        var mxPlaytime = d3.max(data, d => d.PlayTime);
        // Add a scale for bubble size

        var linearSize = d3.scaleLinear().domain([0,mxPlaytime]).range([10, 30]);

        var svg = d3.select("svg");

        svg.append("g")
        .attr("class", "legendSize")
        .attr("transform", "translate(750, 200)");

        var legendSize = d3.legendSize()
        .scale(linearSize)
        .shape('circle')
        .shapePadding(15)
        .labelOffset(20)
        .orient('veritcal');

        svg.select(".legendSize")
        .call(legendSize);

        
        var chartWidth =  width-750;


        svg.append("text")             
        .attr("transform",
                "translate(" + (chartWidth/2) + " ," + 
                            (height + 150) + ")")
        .style("text-anchor", "middle")
        .text("Year's Of Release");
        
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 35)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Total Titles Released");      
        svg.append("text")
        .attr("y", 35)
        .attr("x",chartWidth/2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Video Game Titles Release Per Console Per Year");
        svg.append("text")     
        .attr("y", 490)
        .attr("x", 750)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Avg Playtime in Hours");      
        


        var xScale = d3.scaleBand()
            .domain(data.map(d => d.salesYear))
            .range([0,chartWidth]).padding(0.4);
        var yScale = d3.scaleLinear()
            .domain([0,mxRelease])
            .range([height, 0]);
        var z = d3.scaleLinear()
            .domain([0,mxPlaytime])
            .range([ 1, 30]);
        var color = d3.scaleOrdinal()
            .domain(d => d.gameConsole)
            .range([ "blue", "red", "purple" , "green", "orange"])
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));
        g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function(d){
              return d;
            }).ticks(10))
            .append("text")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("value");
        g.append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return (xScale(d.salesYear) +  getRndInteger(getRndInteger(-20,0), getRndInteger(0,20))) } )
            .attr("cy", function (d) { return yScale(d.TotalReleases); } )
            .attr("r", function(d)  { return z(d.PlayTime); })
            .style("fill", function (d) { return color(d.gameConsole) } )
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", "0.8")
            .append("tittle")
            .text(function(d){ 
                return d;
            })


      });

