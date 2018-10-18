const width = 800;
const height = 600;
const margin = {left: 100, right: 100, top: 100, bottom: 100}
const svgWidth = width + margin.left + margin.right;
const svgHeight = height + margin.top + margin.bottom;

const svg = d3.select('body').append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

svg.append('text')
    .text('U.S. Civil War Sides')
    .attr('x', width/2)
    .attr('y', 0)
    .attr('text-anchor', 'middle')
    .attr('class', 'title');

d3.csv("civilWar.csv").then(function(data){
    var union = [];
    var confederate = [];
    var border = [];
    for(i=0; i<data.length; i++){
        union.push(data[i].union);

        if(data[i].confederate != "") {
            confederate.push(data[i].confederate);
        }
        
        if(data[i].border != "") {
            border.push(data[i].border);
        }
        
    }
    xScale = d3.scaleBand()
        .domain(union)
        .range([0, width])
        .padding(0.1);
    
    var unionCircles = svg.selectAll('circle')
        .data(union)
        .enter()
        .append('circle')
        .style('opacity', '0.1')
        .attr('cy', '100')
        .attr('r', 15)
        .attr('fill', 'lightblue');

    unionCircles
        .transition()
        .style('opacity', '1')
        .attr('cx', (d,i) => i * xScale.bandwidth())
        .duration(1500);

    svg.append('text')
    .text('Union')
    .attr('x', '100')
    .attr('y', '50')
    .attr('class', 'title');

    unionCircles.on('mouseover', function(d, i){
        svg.append('text')
            .text(d)
            .attr('x', i * xScale.bandwidth())
            .attr('y', 100-20)
            .attr('text-anchor', 'middle')
            .attr('id', 'stateName')
            .attr('class', 'toolTip');
    })

    unionCircles.on('mouseout', function(d, i){
        d3.selectAll('#stateName')
        .remove();
    })

    const confederateGroup = svg.append('g');

    const confederateCircles = confederateGroup.selectAll('circle')
        .data(confederate)
        .enter()
        .append('circle')
        .style('opacity', '0.1')
        .attr('cy', '300')
        .attr('r', '15')
        .attr('fill', 'gray');

    confederateCircles
        .transition()
        .style('opacity', '1')
        .attr('cx', (d, i) => i * xScale.bandwidth())
        .duration(2000);

    svg.append('text')
        .text('Confederate')
        .attr('x', '100')
        .attr('y', '250')
        .attr('class', 'title');

    confederateCircles.on('mouseover', function(d, i){
        svg.append('text')
            .text(d)
            .attr('x', i * xScale.bandwidth())
            .attr('y', 300-20)
            .attr('text-anchor', 'middle')
            .attr('id', 'stateName')
            .attr('class', 'toolTip');
    })

    confederateCircles.on('mouseout', function(d, i) {
        d3.selectAll("#stateName")
        .remove();
        
    })

    const borderGroup = svg.append('g');

    const borderCircles = borderGroup.selectAll('circle')
        .data(border)
        .enter()
        .append('circle')
        .style('opacity', '0.1')
        .attr('cy', '500')
        .attr('r', '15')
        .attr('fill', 'pink');

    borderCircles
        .transition()
        .style('opacity', '1')
        .attr('cx', (d, i) => i * xScale.bandwidth())
        .duration(2250);

    svg.append('text')
        .text('Border')
        .attr('x', '100')
        .attr('y', '450')
        .attr('class', 'title');

    borderCircles.on('mouseover', function(d, i){
        svg.append('text')
            .text(d)
            .attr('x', i * xScale.bandwidth())
            .attr('y', 480)
            .attr('text-anchor', 'middle')
            .attr('id', 'stateName')
            .attr('class', 'toolTIp');
    })

    borderCircles.on('mouseout', function(d, i){
        d3.selectAll('#stateName')
        .remove();
    })
})