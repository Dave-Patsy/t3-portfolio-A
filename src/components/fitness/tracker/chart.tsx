
"use client";
import { Exercise, Set } from "@prisma/client";
import * as d3 from "d3";
import {
  eachMonthOfInterval,
  eachDayOfInterval,
  subDays,
  endOfMonth,
  endOfDay,
  format,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfDay,
  addDays,
  toDate,
} from "date-fns";
import useMeasure from "react-use-measure";
import { motion } from "framer-motion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {type RouterOutputs } from "@/trpc/react";


type props = {
  entries: RouterOutputs['fitPulse']['exerciseRouter']['getSet'];
};
export default function Chart({ entries }: props) {


  const [ref, bounds] = useMeasure();

  if (entries.map((entry) => entry.reps).some((count) => count > 0)) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm italic text-gray-400">
          Add a tracked set to see a chart!
        </p>
      </div>
    );
  }

  console.log("entries ", entries);

  // let data = [...entries]
  //   .sort((a, b) => (a.date > b.date ? 1 : -1))
  //   .map((entry, idx) => {
  //     let x = entry.date;
  //     x.setDate(x.getDate() + idx);
  //     x.toISOString();

  //     return {
  //       date: x.getTime(),
  //       estimatedMax: entry.weight,
  //     };
  //   });

  const data2 = [...entries]
    .sort((a, b) => (a.completed! > b.completed! ? 1 : -1))
    .map((ele, idx) => {
      return {
        date: ele.completed!,
        estimatedMax: ele.weight,
      };
    });
  // console.log("data2 ", data2);
  return (
    <div className="relative h-full w-full" ref={ref}>
      {bounds.width > 0 && (
        <ChartInner data={data2} width={bounds.width} height={bounds.height} />
      )}
    </div>
  );
}

type chartProps = {
  data: { date: Date; estimatedMax: number }[];
  width: number;
  height: number;
};

function ChartInner({ data, width, height }: chartProps) {
  const margin = {
    top: 40,
    right: 0,
    bottom: 20,
    left: 50,
  };

  console.log("chart inner Data", data);

  const startDay = startOfMonth(data.at(0)?.date ?? 0);
  const startDay2 = startOfDay(data.at(0)?.date ?? 0);
  const endDay = endOfMonth(data.at(-1)?.date ?? 0);
  const endDay2 = endOfDay(data.at(-1)?.date ?? 0);
  const months = eachMonthOfInterval({ start: startDay, end: endDay });
  const days = eachDayOfInterval({ start: startDay2, end: endDay2 });

  console.log(startDay);
  console.log(endDay);

  const xScale = d3
    .scaleTime()
    .domain([startDay, endDay])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    // .domain(x)
    .domain(d3.extent(data.map((d) => d.estimatedMax)) as unknown as [number])
    .range([height - margin.bottom, margin.top]);

  const line = d3
    .line()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .x((d) => xScale(d.date))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .y((d) => yScale(d.estimatedMax));
  const d = line(data as unknown as [number, number][]);

  return (
    <>
      <svg
        className="relative flex h-fit overflow-visible"
        viewBox={`0 0 ${width} ${height}`}
      >
        {/* X axis */}
        {months.map((month, i) => (
          <g
            key={i}
            className="text-gray-400"
            transform={`translate(${xScale(month)},0)`}
          >
            {i % 2 === 1 && (
              <rect
                y={margin.top}
                width={xScale(endOfMonth(month)) - xScale(month)}
                height={height - margin.bottom - margin.top}
                fill="currentColor"
                className="text-gray-100"
              />
            )}
            <text
              x={(xScale(endOfMonth(month)) - xScale(month)) / 2}
              y={height - 5}
              textAnchor="middle"
              fill="currentColor"
              className="text-[10px] hover:text-red-600"
            >
              {format(month, "MMM")}
            </text>
          </g>
        ))}
        <g>
          <text x={xScale(endDay) / 2} y={20} className="text-center ">
            Situps
          </text>
        </g>

        {/* Y axis */}
        {yScale.ticks(5).map((max) => (
          <g
            transform={`translate(0,${yScale(max)})`}
            className="text-gray-400"
            key={max}
          >
            <line
              x1={margin.left}
              x2={width - margin.right}
              stroke="currentColor"
              strokeDasharray="1,3"
            />
            <text
              alignmentBaseline="middle"
              className="text-[10px]"
              fill="currentColor"
              x={margin.left - 24}
            >
              {max}
            </text>
          </g>
        ))}

        {/* Line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          d={d!}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* Circles */}
        {data.map((d, i) => (
          <g key={i} className="group ">
            <motion.circle
              // key={i}
              r="6"
              cx={xScale(d.date)}
              cy={yScale(d.estimatedMax)}
              fill="currentColor"
              strokeWidth={2}
              stroke={
                months.findIndex((m) => isSameMonth(m, d.date)) % 2 === 1
                  ? "#f5f5f4"
                  : "white"
              }
              className="group z-10"
            />
            <foreignObject
              x={xScale(d.date) + 10}
              y={yScale(d.estimatedMax) - 16}
              className="z-50 h-6 w-10"
            >
              <div className="rounded-md text-center text-transparent group-hover:bg-gray-200 group-hover:text-black/100">
                {d.estimatedMax}
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>
    </>
  );
}
