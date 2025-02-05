/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

/**
 * Props:
 * - data: Array of objects with { date: Date, weight: number }
 *   representing the workout history for the exercise.
 * - width: The width of the SVG container.
 * - height: The height of the SVG container.
 */
// @ts-ignore
function ExerciseLineGraph({ data, width = 600, height = 300 }) {
  const svgRef = useRef(null);
  const [linePath, setLinePath] = useState("");

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Set up margins and dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Set up the scales
    const xScale = d3
      .scaleTime()
      // @ts-ignore
      .domain(d3.extent(data, (d) => d.date))
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      // @ts-ignore
      .domain([
        // @ts-ignore
        d3.min(data, (d) => d.weight) - 5,
        // @ts-ignore
        d3.max(data, (d) => d.weight) + 5,
      ])
      .range([innerHeight, 0]);

    // Remove any previous svg contents EXCEPT our animated path
    // We'll use D3 to add the axes and circles, but the line is rendered
    // with Framer Motion.
    const svg = d3.select(svgRef.current);
    svg.selectAll("g.axis-group").remove();
    svg.selectAll("circle.data-point").remove();

    // Create a group element for axis (keeping margin convention)
    const axesGroup = svg
      .append("g")
      .attr("class", "axis-group")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create the x-axis
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b %d"));
    axesGroup
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis);

    // Create the y-axis
    const yAxis = d3.axisLeft(yScale);
    axesGroup.append("g").call(yAxis);

    // Create a line generator with D3
    const line = d3
      .line()
      // @ts-ignore
      .x((d) => xScale(d.date))
      // @ts-ignore
      .y((d) => yScale(d.weight))
      .curve(d3.curveMonotoneX);

    // Generate the line path string
    const generatedLinePath = line(data);
    // @ts-ignore
    setLinePath(generatedLinePath);

    // Optionally add circles at data points
    axesGroup
      .selectAll("circle.data-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      // @ts-ignore
      .attr("cx", (d) => xScale(d.date))
      // @ts-ignore
      .attr("cy", (d) => yScale(d.weight))
      .attr("r", 3)
      .attr("fill", "#00796b");
  }, [data, width, height]);

  return (
    <div className="w-full">
      <h3 className="mb-2 text-lg font-semibold">Exercise Progress</h3>
      <svg ref={svgRef} width={width} height={height}>
        {/* Apply a transform to account for margins for the animated path */}
        <g transform="translate(50,20)">
          {linePath && (
            <motion.path
              d={linePath}
              fill="none"
              stroke="#00796b"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          )}
        </g>
      </svg>
    </div>
  );
}

export default ExerciseLineGraph;
