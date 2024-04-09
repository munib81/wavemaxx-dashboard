import React, { useEffect } from "react";
import Chart from "chart.js";

const CardLineChart = () => {
  useEffect(() => {
    // Get the canvas context
    const ctx = document.getElementById("myChart").getContext("2d");

    // Chart configuration
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jun 2023",
          "Jul 2023",
          "Aug 2023",
          "Sep 2023",
          "Oct 2023",
          "Nov 2023",
          "Dec 2023",
          "Jan 2024",
          "Feb 2024",
          "Mar 2024",
          "Apr 2024",
          // "May 2024",
        ],
        datasets: [
          {
            label: "Water consumption",
            backgroundColor: "lightblue",
            borderColor: "royalblue",
            data: [
              26.4, 39.8, 66.8, 66.4, 40.6, 55.2, 77.4, 69.8, 57.8, 76, 110.8,
            ],
          },
        ],
      },
      options: {
        layout: {
          padding: 10,
        },
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Million of gallons consumed per month",
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Water consumption",
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Month of the Year",
              },
            },
          ],
        },
      },
    });

    // Clean-up
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="chart card bg-white mx-auto rounded-xl border">
      <canvas id="myChart" width="400" height="200"></canvas>
    </div>
  );
};

export default CardLineChart;
