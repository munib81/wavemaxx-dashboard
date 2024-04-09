import React, { useEffect } from "react";
import Chart from "chart.js";
import { FaDotCircle } from "react-icons/fa";
const InfoChart = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const tooltipCanvas = document.getElementById("tooltip-canvas");

    const gradientRed = canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 150);
    gradientRed.addColorStop(0, "#FF5858"); // lighter red
    gradientRed.addColorStop(1, "#FF8787"); // darker red

    const gradientGrey = canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 150);
    gradientGrey.addColorStop(0, "#A8A8A8"); // lighter grey
    gradientGrey.addColorStop(1, "#CCCCCC"); // darker grey

    const gradientBlue = canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 150);
    gradientBlue.addColorStop(0, "#4D4DFF"); // lighter blue
    gradientBlue.addColorStop(1, "#8787FF"); // darker blue

    window.arcSpacing = 0.15;
    window.segmentHovered = false;

    function textInCenter(value, label) {
      const ctx = tooltipCanvas.getContext("2d");
      ctx.clearRect(0, 0, tooltipCanvas.width, tooltipCanvas.height);

      ctx.restore();

      // Draw value
      ctx.fillStyle = "#333333";
      ctx.font = "24px sans-serif";
      ctx.textBaseline = "middle";

      // Define text position
      const textPosition = {
        x: Math.round((tooltipCanvas.width - ctx.measureText(value).width) / 2),
        y: tooltipCanvas.height / 2,
      };

      ctx.fillText(value, textPosition.x, textPosition.y);

      // Draw label
      ctx.fillStyle = "#AAAAAA";
      ctx.font = "8px sans-serif";

      // Define text position
      const labelTextPosition = {
        x: Math.round((tooltipCanvas.width - ctx.measureText(label).width) / 2),
        y: tooltipCanvas.height / 2,
      };

      ctx.fillText(label, labelTextPosition.x, labelTextPosition.y - 20);
      ctx.save();
    }

    Chart.elements.Arc.prototype.draw = function () {
      const ctx = this._chart.ctx;
      const vm = this._view;
      const sA = vm.startAngle;
      const eA = vm.endAngle;

      ctx.beginPath();
      ctx.arc(
        vm.x,
        vm.y,
        vm.outerRadius,
        sA + window.arcSpacing,
        eA - window.arcSpacing
      );
      ctx.strokeStyle = vm.backgroundColor;
      ctx.lineWidth = vm.borderWidth;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.closePath();
    };

    const config = {
      type: "doughnut",
      data: {
        labels: ["Gateway Devices", "Inactive Devices", "Remote Devices"],
        datasets: [
          {
            data: [23, 4, 95],
            backgroundColor: [gradientRed, gradientGrey, gradientBlue],
          },
        ],
      },
      options: {
        cutoutPercentage: 80,
        elements: {
          arc: {
            borderWidth: 12,
          },
        },
        legend: {
          display: false,
        },
        animation: {
          onComplete: function (animation) {
            if (!window.segmentHovered) {
              const value = this.config.data.datasets[0].data.reduce(function (
                a,
                b
              ) {
                return a + b;
              },
              0);
              const label = "T O T A L";

              textInCenter(value, label);
            }
          },
        },
        tooltips: {
          enabled: false,
          custom: function (tooltip) {
            if (tooltip.body) {
              const line = tooltip.body[0].lines[0];
              const parts = line.split(": ");
              textInCenter(
                parts[1],
                parts[0].split("").join(" ").toUpperCase()
              );
              window.segmentHovered = true;
            } else {
              window.segmentHovered = false;
            }
          },
        },
      },
    };

    const chart = new Chart(canvas, config);

    return () => {
      chart.destroy();
    };
  }, []);

  const handleReload = () => {
    addData(window.chart, "TEST", 300);
  };

  const addData = (chart, label, data) => {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  };

  return (
    <div className="card bg-white p-4 rounded-xl border">
      <div className="about">
        <h3>Device Status</h3>
      </div>
      <canvas id="canvas" height="200"></canvas>
      <canvas id="tooltip-canvas" width="150" height="100"></canvas>
      <button type="button" className="btn-reload" onClick={handleReload}>
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 71.4 61.2"
        >
          <style>{`.st0{fill:#AAAAAA;}`}</style>
          <title>59 all</title>
          <path
            className="st0"
            d="M57.6 0h8.7c2.8 0 5 2.2 5 5v51.1c0 2.8-2.2 5-5 5h-8.7c-2.8 0-5-2.2-5-5V5c0-2.7 2.2-5 5-5zM5 24.9h8.7c2.8 0 5 2.2 5 5v26.2c0 2.8-2.2 5-5 5H5c-2.8 0-5-2.2-5-5V29.9c0-2.8 2.2-5 5-5zM31.4 17.8h8.7c2.8 0 5 2.2 5 5v33.4c0 2.8-2.2 5-5 5h-8.7c-2.8 0-5-2.2-5-5V22.8c0-2.8 2.3-5 5-5z"
          />
        </svg>
      </button>

      {/* tell one line about number of total, devices */}
      <p className="text-center -mt-14 text-gray-500 text-sm">
        Total Devices: 122
      </p>
    </div>
  );
};

export default InfoChart;
