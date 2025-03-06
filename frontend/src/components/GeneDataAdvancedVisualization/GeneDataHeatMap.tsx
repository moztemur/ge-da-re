import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ExpressionData {
  gene: string;
  sample: string;
  value: number;
}

interface HeatmapProps {
  data: ExpressionData[];
}

const GeneDataHeatMap: React.FC<HeatmapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = 500;
    const margin = { top: 40, right: 40, bottom: 100, left: 100 };

    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const genes = Array.from(new Set(data.map(d => d.gene)));
    const samples = Array.from(new Set(data.map(d => d.sample)));

    const max = d3.max(data, d => d.value) ?? 0;
    const min = d3.min(data, d => d.value) ?? 0;

    const xScale = d3.scaleBand().domain(samples).range([0, plotWidth]).padding(0.05);
    const yScale = d3.scaleBand().domain(genes).range([0, plotHeight]).padding(0.05);

    const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([min, max]);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.sample) ?? 0)
      .attr("y", d => yScale(d.gene) ?? 0)
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .style("fill", d => colorScale(d.value))
      .style("stroke", "#ccc");

    g.append("g")
      .attr("transform", `translate(0,${plotHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-45)");

    g.append("g").call(d3.axisLeft(yScale));

    const legendHeight = 500;
    const legendScale = d3.scaleLinear()
      .domain(colorScale.domain())
      .range([max, min]);

    const legend = svg.append("g").attr("transform", `translate(${plotWidth + margin.left + 20}, 50)`);
    legend.append("g").call(d3.axisRight(legendScale).ticks(5).tickFormat(d3.format(".2f")));

    const legendGradient = legend.append("defs")
      .append("linearGradient")
      .attr("id", "legend-gradient")
      .attr("x1", "0%").attr("y1", "100%")
      .attr("x2", "0%").attr("y2", "0%");

    legendGradient.append("stop").attr("offset", "0%").attr("stop-color", d3.interpolateBlues(0));
    legendGradient.append("stop").attr("offset", "100%").attr("stop-color", d3.interpolateBlues(1));

    legend.append("rect")
      .attr("width", 10)
      .attr("height", legendHeight)
      .style("fill", "url(#legend-gradient)");

  }, [data]);

  return <svg ref={svgRef} width='100%' height={500}></svg>;
};

export default GeneDataHeatMap;
