import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Define the type for gene expression data
interface GeneData {
  sample: string;
  value: number;
  outlier?: boolean;
}

interface ScatterPlotProps {
  data: GeneData[];
}

const GeneExpressionScatterPlot: React.FC<ScatterPlotProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const width = svgRef.current.clientWidth;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 100, left: 100 };

    // Define scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.sample))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) ?? 1.2])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add Axes
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Draw Dots
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.sample)! + xScale.bandwidth() / 2)
      .attr("cy", d => yScale(d.value))
      .attr("r", 6)
      .attr("fill", d => d.outlier ? "red" : "blue") // Highlight outliers in red
      .attr("stroke", "black")
      .attr("stroke-width", 1.5);
  }, [data]);

  return <svg ref={svgRef} width={"100%"} height={600}></svg>;
};

export default GeneExpressionScatterPlot;
