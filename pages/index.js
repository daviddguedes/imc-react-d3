import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3';
import data from './../data1.json';
import useWindowSize from '../hooks/windowSize';
import TooltipComponent from '../components/Tooltip';
// import styles from '../styles/Home.module.css'

export default function Home() {
  const { clientWidth, clientHeight } = useWindowSize();
  const [tooltipVars, setTooltipVars] = useState(null);

  useEffect(() => {
    if (clientWidth && clientHeight) {
      const margin = { top: 20, right: 25, bottom: 30, left: 40 };
      const width = clientWidth - margin.left - margin.right;
      const height = clientHeight - margin.top - margin.bottom;

      const svg = d3.select("#div_template")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      const xData = d3.map(data, function (d) { return d.group; });
      const yData = d3.map(data, function (d) { return d.variable; });

      const x = d3.scaleBand()
        .range([0, width])
        .domain(xData)
        .padding(0.05);
      svg.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3.axisBottom(x)
            .tickSize(0)
            .tickValues(x.domain().filter(function (d, i) { return !(i % 8) }))
        )
        .select(".domain").remove()

      const y = d3.scaleBand()
        .range([height, 0])
        .domain(yData)
        .padding(0.05);
      svg.append("g")
        .style("font-size", 15)
        .call(
          d3.axisLeft(y)
            .tickSize(0)
            .tickValues(y.domain().filter(function (d, i) { return !(i % 10) }))
        )
        .select(".domain").remove()

      const colorScaleGenerator = d3.scaleSequential()
        .interpolator(d3.interpolatePlasma)
        .domain([1, 100])

      const mouseover = function (d) {
        setTooltipVars(state => ({ ...state, opacity: 1 }));
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
      const mousemove = function (event, d) {
        const { clientX, clientY } = event;
        setTooltipVars(state => ({ ...d, clientX, clientY, opacity: 1 }));
      }
      const mouseleave = function (d) {
        setTooltipVars(state => ({ ...state, opacity: 0 }));
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8)
      }

      svg.selectAll()
        .data(data, function (d) { return d.value; })
        .join("rect")
        .attr("x", function (d) { return x(d.group) })
        .attr("y", function (d) { return y(d.variable) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) { return colorScaleGenerator(d.value) })
        .style("stroke-width", 2)
        .style("stroke", "none")
        .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    }

  }, [clientWidth, clientHeight]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="div_template">
        {tooltipVars
          && <TooltipComponent
            d={tooltipVars}
            width={clientWidth}
            height={clientHeight}
          />}
      </div>

    </div>
  )
}
