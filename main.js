const data = [
    { name: "A", value: 10 },
    { name: "B", value: 20 },
    { name: "C", value: 80 },
    { name: "D", value: 40 },
    { name: "E", value: 50 }
];

document.addEventListener("DOMContentLoaded", function () {

    displayResults(data);
    
});

function displayResults(data) {


    const width = 400, height = 400, radius = Math.min(width, height) / 2;

    const svg = d3.select("#pie-chart")
                  .attr("width", width)
                  .attr("height", height)
                  .append("g")
                  .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = svg.selectAll("path")
                    .data(pie(data))
                    .enter()
                    .append("path")
                    .attr("fill", (d, i) => color(i))
                    .attr("stroke", "#fff")
                    .style("stroke-width", "2px")
                    .each(function (d) {
                        this._current = { startAngle: 0, endAngle: 0 };
                    }) 
                    .transition()
                    .duration(1000)
                    .attrTween("d", function (d) {
                        const interpolate = d3.interpolate(this._current, d);
                        this._current = interpolate(1);
                        return function (t) {
                            return arc(interpolate(t));
                        };
                    });

    const legend = d3.select("#legend")
                     .selectAll(".legend-item")
                     .data(data)
                     .enter()
                     .append("div")
                     .attr("class", "legend-item");

    legend.append("div")
          .attr("class", "legend-color")
          .style("background-color", (d, i) => color(i));

    legend.append("span")
          .text(d => `${d.name} (${d.value})`);

    const largestItem = data.reduce((max, item) => (item.value > max.value ? item : max), data[0]);

    d3.select("#largest-value-text")
      .text(`You're most like  ${largestItem.name} (${largestItem.value})`);
}