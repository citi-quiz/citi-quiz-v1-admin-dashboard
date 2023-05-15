import React from "react";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalUsersCount: 48,
      filterChartBy: "6 Mon",
      labels: ["jan", "feb", "march"],
      teamPerformanceChart: "",
      completedData: [57, 5, 89],
      ongoingData: [77, 8, 44],
      pendingData: [3, 53, 9],
    };
  }

  componentDidMount() {
    this.displayChart();
  }

  displayChart = () => {
    const node = this.chart1;
    let teamPerformanceChart = new Chart(node, {
      type: "line",
      data: {
        labels: this.state.labels,
        datasets: [
          {
            label: "Completed",
            data: this.state.completedData,
            borderColor: ["rgba(88, 201, 71, 1)"],
            backgroundColor: "rgba(88, 201, 71, 1)",
            radius: 4,
            borderWidth: 1.5,
            fill: false,
          },
          {
            label: "Ongoing",
            data: this.state.ongoingData,
            borderColor: ["rgba(88, 188, 241, 1)"],
            backgroundColor: "rgba(88, 188, 241, 1)",
            radius: 4,
            borderWidth: 1.5,
            fill: false,
          },
          {
            label: "Pending",
            data: this.state.pendingData,
            borderColor: ["rgba(250, 140, 47, 1)"],
            backgroundColor: "rgba(250, 140, 47, 1)",
            radius: 4,
            borderWidth: 1.5,
            fill: false,
          },
        ],
      },
      options: {
        legend: {
          position: "bottom",
          align: "start",
          labels: {
            usePointStyle: true,
            fontSize: 15,
            padding: 30,
          },
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              return "Month: " + data["labels"][tooltipItem[0]["index"]];
            },
            label: function (tooltipItem, data) {
              return (
                " " +
                data["datasets"][tooltipItem.datasetIndex]["data"][
                  tooltipItem.index
                ] +
                "%"
              );
            },
          },
        },
        elements: {
          line: {
            tension: 0,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function (label) {
                  return label + "%";
                },
                beginAtZero: true,
                stepSize: 20,
                min: 0,
                max: 100,
              },
              gridLines: {
                zeroLineColor: "rgba(0,0,0,0.1)",
                color: "rgba(0,0,0,0.1)",
                drawBorder: false,
              },
              // scaleLabel: {
              //     display: true,
              //     labelString: "Intensity of feeling"
              // }
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false,
              },
              // scaleLabel: {
              //     display: true,
              //     labelString: "Date of usage"
              // }
            },
          ],
        },
      },
    });
    this.setState({ teamPerformanceChart });
  };

  handleChange = (e) => {
    this.setState({ filterChartBy: e.target.value });
    //make changes to data
    // this.state.teamPerformanceChart.update()
  };

  render() {
    return (
      <div>
        <label for="filter">Filter by: </label>
        <select
          id="filter"
          value={this.state.filterChartBy}
          onChange={this.handleChange}
        >
          <option value="1 yr">1 yr</option>
          <option value="6 Mon">6 Mon</option>
          <option value="3 Mon">3 Mon</option>
        </select>
        <div>
          <canvas
            style={{ width: 800, height: 300 }}
            ref={(node) => (this.chart1 = node)}
          />
        </div>
      </div>
    );
  }
}
export default Chart;
