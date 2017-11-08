var projection = d3.geo.albers()
    .center([2, 22])
    .rotate([-78, 0])
    .parallels([7, 37])
    .scale(1400)
    .translate([275,400]);

var format1000 = d3.format(',');

var quantize;

var path = d3.geo.path()        
    .projection(projection);
var type="Total";
var criteria="Within";
var yardstick="Num";
var CurrentSelection;

  

var tooltip = d3.select("#tooltip");

tooltip.append("div")
    .attr("id", "state-title");
tooltip.append("div")
    .attr("id", "state-population");
tooltip.append("div")
    .attr("id", "state-perc");

d3.json("hindustan1.json", function(error, india) {
  var districts = topojson.feature(india, india.objects.hindustan).features;
  //svg.append("div").attr("id","Urb");
  d3.selectAll("svg").select(function(){
  	d3.select(this).append("g").attr("class", "districts")
      .selectAll("path")
      .data(districts)
      .enter()
      .append("path")
      .attr("stroke-width",".3px")
      .style("stroke","rgba(255,255,255,0.75)")
      .attr("district",function(d){return d.id;})
      .attr("state",function(d){return d.properties.state;})
      .attr("class","district")
      .attr("d", path);

      d3.select(this).append("path")
      .datum(topojson.mesh(india, india.objects.hindustan, function(a, b) { return a.properties.state !== b.properties.state; }))
      .attr("class", "states")
      .attr("d", path);
  });

  d3.csv("data/sanitationdata.csv", function(error, sanitation) {
	if (error) return console.warn(error);
	var map = d3.nest()
	.key(function(d) { return d.Name; })
	.key(function(d) { return d.Type; })
	.map(sanitation, d3.map);

  d3.select("#sanitationSVG").call(attachHover,map,".sanitationbutton",".sanitationcriteria",".sanitationyardstick");

	d3.selectAll(".sanitationbutton").on("click",function(){
		d3.selectAll(".sanitationbutton").classed({'selected':false,'sanitationbutton':true});
		d3.select(this).classed({'selected':true,'sanitationbutton':true});
		visualizeit(map,d3.select("#sanitationsvg"),d3.selectAll(".sanitationbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".sanitationcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".sanitationyardstick").filter(".selected")[0][0].getAttribute('text'));
	});

	d3.selectAll(".sanitationcriteria").on("click",function(){
		d3.selectAll(".sanitationcriteria").classed({'selected':false,'sanitationcriteria':true});
		d3.select(this).classed({'selected':true,'sanitationcriteria':true});
		visualizeit(map,d3.select("#sanitationsvg"),d3.selectAll(".sanitationbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".sanitationcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".sanitationyardstick").filter(".selected")[0][0].getAttribute('text'));
	});

	d3.selectAll(".sanitationyardstick").on("click",function(){
		d3.selectAll(".sanitationyardstick").classed({'selected':false,'sanitationyardstick':true});
		d3.select(this).classed({'selected':true,'sanitationyardstick':true});
		visualizeit(map,d3.select("#sanitationsvg"),d3.selectAll(".sanitationbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".sanitationcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".sanitationyardstick").filter(".selected")[0][0].getAttribute('text'));
	});

	visualizeit(map,d3.select("#sanitationsvg"),d3.selectAll(".sanitationbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".sanitationcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".sanitationyardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.csv("data/lighting.csv", function(error, lighting) {
  if (error) return console.warn(error);
  var map = d3.nest()
  .key(function(d) { return d.Name; })
  .key(function(d) { return d.Type; })
  .map(lighting, d3.map);

  d3.select("#lightingSVG").call(attachHover,map,".lightingbutton",".lightingcriteria",".lightingyardstick");

  d3.selectAll(".lightingbutton").on("click",function(){
    d3.selectAll(".lightingbutton").classed({'selected':false,'lightingbutton':true});
    d3.select(this).classed({'selected':true,'lightingbutton':true});
    visualizeit(map,d3.select("#lightingsvg"),d3.selectAll(".lightingbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".lightingcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".lightingyardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.selectAll(".lightingcriteria").on("click",function(){
    d3.selectAll(".lightingcriteria").classed({'selected':false,'lightingcriteria':true});
    d3.select(this).classed({'selected':true,'lightingcriteria':true});
    visualizeit(map,d3.select("#lightingsvg"),d3.selectAll(".lightingbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".lightingcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".lightingyardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.selectAll(".lightingyardstick").on("click",function(){
    d3.selectAll(".lightingyardstick").classed({'selected':false,'lightingyardstick':true});
    d3.select(this).classed({'selected':true,'lightingyardstick':true});
    visualizeit(map,d3.select("#lightingsvg"),d3.selectAll(".lightingbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".lightingcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".lightingyardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  visualizeit(map,d3.select("#lightingsvg"),d3.selectAll(".lightingbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".lightingcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".lightingyardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.csv("data/roof.csv", function(error, roof) {
  if (error) return console.warn(error);
  var map = d3.nest()
  .key(function(d) { return d.Name; })
  .key(function(d) { return d.Type; })
  .map(roof, d3.map);

  d3.select("#roofSVG").call(attachHover,map,".roofbutton",".roofcriteria",".roofyardstick");

  d3.selectAll(".roofbutton").on("click",function(){
    d3.selectAll(".roofbutton").classed({'selected':false,'roofbutton':true});
    d3.select(this).classed({'selected':true,'roofbutton':true});
    visualizeit(map,d3.select("#roofsvg"),d3.selectAll(".roofbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".roofcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".roofyardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.selectAll(".roofcriteria").on("click",function(){
    d3.selectAll(".roofcriteria").classed({'selected':false,'roofcriteria':true});
    d3.select(this).classed({'selected':true,'roofcriteria':true});
    visualizeit(map,d3.select("#roofsvg"),d3.selectAll(".roofbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".roofcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".roofyardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.selectAll(".roofyardstick").on("click",function(){
    d3.selectAll(".roofyardstick").classed({'selected':false,'roofyardstick':true});
    d3.select(this).classed({'selected':true,'roofyardstick':true});
    visualizeit(map,d3.select("#roofsvg"),d3.selectAll(".roofbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".roofcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".roofyardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  visualizeit(map,d3.select("#roofsvg"),d3.selectAll(".roofbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".roofcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".roofyardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.csv("data/floor.csv", function(error, floor) {
  if (error) return console.warn(error);
  var map = d3.nest()
  .key(function(d) { return d.Name; })
  .key(function(d) { return d.Type; })
  .map(floor, d3.map);

  d3.select("#floorSVG").call(attachHover,map,".floorbutton",".floorcriteria",".flooryardstick");

  d3.selectAll(".floorbutton").on("click",function(){
    d3.selectAll(".floorbutton").classed({'selected':false,'floorbutton':true});
    d3.select(this).classed({'selected':true,'floorbutton':true});
    visualizeit(map,d3.select("#floorsvg"),d3.selectAll(".floorbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".floorcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".flooryardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.selectAll(".floorcriteria").on("click",function(){
    d3.selectAll(".floorcriteria").classed({'selected':false,'floorcriteria':true});
    d3.select(this).classed({'selected':true,'floorcriteria':true});
    visualizeit(map,d3.select("#floorsvg"),d3.selectAll(".floorbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".floorcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".flooryardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.selectAll(".flooryardstick").on("click",function(){
    d3.selectAll(".flooryardstick").classed({'selected':false,'flooryardstick':true});
    d3.select(this).classed({'selected':true,'flooryardstick':true});
    visualizeit(map,d3.select("#floorsvg"),d3.selectAll(".floorbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".floorcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".flooryardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  visualizeit(map,d3.select("#floorsvg"),d3.selectAll(".floorbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".floorcriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".flooryardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.csv("data/water.csv", function(error, water) {
  if (error) return console.warn(error);
  var map = d3.nest()
  .key(function(d) { return d.Name; })
  .key(function(d) { return d.Type; })
  .map(water, d3.map);

  d3.select("#waterSVG").call(attachHover,map,".waterbutton",".watercriteria",".wateryardstick");

  d3.selectAll(".waterbutton").on("click",function(){
    d3.selectAll(".waterbutton").classed({'selected':false,'waterbutton':true});
    d3.select(this).classed({'selected':true,'waterbutton':true});
    visualizeit(map,d3.select("#watersvg"),d3.selectAll(".waterbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".watercriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".wateryardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.selectAll(".watercriteria").on("click",function(){
    d3.selectAll(".watercriteria").classed({'selected':false,'watercriteria':true});
    d3.select(this).classed({'selected':true,'watercriteria':true});
    visualizeit(map,d3.select("#watersvg"),d3.selectAll(".waterbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".watercriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".wateryardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.selectAll(".wateryardstick").on("click",function(){
    d3.selectAll(".wateryardstick").classed({'selected':false,'wateryardstick':true});
    d3.select(this).classed({'selected':true,'wateryardstick':true});
    visualizeit(map,d3.select("#watersvg"),d3.selectAll(".waterbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".watercriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".wateryardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  visualizeit(map,d3.select("#watersvg"),d3.selectAll(".waterbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".watercriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".wateryardstick").filter(".selected")[0][0].getAttribute('text'));
  });
  d3.csv("data/misc.csv", function(error, misc) {
  if (error) return console.warn(error);
  var map = d3.nest()
  .key(function(d) { return d.Name; })
  .key(function(d) { return d.Type; })
  .map(misc, d3.map);

  d3.select("#miscSVG").call(attachHover,map,".miscbutton",".misccriteria",".miscyardstick");

  d3.selectAll(".miscbutton").on("click",function(){
    d3.selectAll(".miscbutton").classed({'selected':false,'miscbutton':true});
    d3.select(this).classed({'selected':true,'miscbutton':true});
    visualizeit(map,d3.select("#miscsvg"),d3.selectAll(".miscbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".misccriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".miscyardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.selectAll(".misccriteria").on("click",function(){
    d3.selectAll(".misccriteria").classed({'selected':false,'misccriteria':true});
    d3.select(this).classed({'selected':true,'misccriteria':true});
    visualizeit(map,d3.select("#miscsvg"),d3.selectAll(".miscbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".misccriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".miscyardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  d3.selectAll(".miscyardstick").on("click",function(){
    d3.selectAll(".miscyardstick").classed({'selected':false,'miscyardstick':true});
    d3.select(this).classed({'selected':true,'miscyardstick':true});
    visualizeit(map,d3.select("#miscsvg"),d3.selectAll(".miscbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".misccriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".miscyardstick").filter(".selected")[0][0].getAttribute('text'));
  });

  visualizeit(map,d3.select("#miscsvg"),d3.selectAll(".miscbutton").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".misccriteria").filter(".selected")[0][0].getAttribute('text'),d3.selectAll(".miscyardstick").filter(".selected")[0][0].getAttribute('text'));
  });

});

function attachHover(svg,theMap,buttonClassString,criteriaTypeString,yardstickTypeString){
  
  d3.select(this)[0][0].selectAll(".district")
  .on("mouseover",function(d){
    var buttonClass = d3.selectAll(buttonClassString).filter(".selected")[0][0].getAttribute('text');
    var criteriaType = d3.selectAll(criteriaTypeString).filter(".selected")[0][0].getAttribute('text');
    var yardstickType = d3.selectAll(yardstickTypeString).filter(".selected")[0][0].getAttribute('text');
    d3.select(this).classed({'hover':true});

    tooltip.transition()
        .duration(0)
        .style("display","block");
    tooltip.select('#state-title')
          .text(d.id+", "+d.properties.state);

    var districtData = theMap.get("District - "+d.id);
    var criteriaData = districtData.get(buttonClass)[0][criteriaType];
    var totalData = districtData.get(buttonClass)[0]["Total"];
    var percData = ((parseInt(criteriaData.replace(/,/g, ""))/parseInt(totalData.replace(/,/g, "")))*100).toFixed(2);;
    
    tooltip.select('#state-population')
      .text(criteriaData+" / "+totalData);

    tooltip.select('#state-perc')
          .text(percData+"%");

  })
  .on("mousemove", function(d) {

          tooltip.style("left", d3.event.clientX+5)
            .style("top", d3.event.clientY+5);
        })
      .on("mouseleave", function(d) {
          d3.select(this).classed('hover', false);
          tooltip.transition()
            .duration(1)
            .style("display","none");
        });
}
    
function sortNumber(a,b) {
    return a - b;
}

function visualizeit(map,theSVG,buttonClass,criteriaType,yardstickType){
	var quantile=[];
  if(yardstickType=="Num"){
    var workingarray=[];
    theSVG.selectAll(".district").select(function(){
	  var test=map.get("District - "+d3.select(this)[0][0].getAttribute('district')).get(buttonClass);
	  var innerMap=d3.map(test[0]);
	  var chosenCategory = innerMap.get(criteriaType);
	  //console.log(gum);
	  chosenCategory = chosenCategory.replace(/,/g, "");
	  chosenCategory = parseInt(chosenCategory);
    
      
	  workingarray.push(chosenCategory);});
    var minmax=d3.extent(workingarray);
    workingarray.sort(sortNumber);
	  for(var i=0.1;i<1;i+=0.101){
      quantile.push(d3.quantile(workingarray,i));
	  }
    quantize = d3.scale.threshold()
    .domain(quantile)
    .range(["rgb(247,251,255)","rgb(230,235,240)","rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)"]);
	}
	else{
	for(var i=0.1;i<1;i+=0.1){
	  quantile.push(i);
	}
	quantize = d3.scale.threshold()
	.domain(quantile)
	.range(["rgb(247,251,255)","rgb(230,235,240)","rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)"]);
	}


	theSVG.selectAll(".district")
		.attr("fill",function(d){
      //console.log(d.id);
			var theDistrict=map.get("District - "+d.id).get(buttonClass);
	        var innerMap=d3.map(theDistrict[0]);
	        var number = innerMap.get(criteriaType);
	        number = number.replace(/,/g, "");
	        number = parseInt(number);
	        var total = parseInt(innerMap.get("Total").replace(/,/g, ""));
	        
	        if((number==0&&total==0)||isNaN(number)){return "gray";}  
	        
	        if(yardstickType=="Num"){return quantize(number);}
  
	        return quantize(number/total);

	});


}