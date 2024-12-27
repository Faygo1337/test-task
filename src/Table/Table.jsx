import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import "./Table.scss";

const Table = () => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  const data = [
    {
      label: "Выручка, руб",
      current: 500521,
      previous: 480521,
      week: 4805121,
      change: 4,
    },
    {
      label: "Наличные",
      current: 300000,
      previous: 300000,
      week: 300000,
      change: 0,
    },
    {
      label: "Безналичный расчет",
      current: 100000,
      previous: 100000,
      week: 100000,
      change: 0,
    },
    {
      label: "Кредитные карты",
      current: 100521,
      previous: 100521,
      week: 100521,
      change: 0,
    },
    {
      label: "Средний чек, руб",
      current: 1300,
      previous: 900,
      week: 900,
      change: 44,
    },
    {
      label: "Средний гость, руб",
      current: 1200,
      previous: 800,
      week: 800,
      change: 50,
    },
    {
      label: "Удаления из чека (после оплаты), руб",
      current: 1000,
      previous: 1100,
      week: 900,
      change: -9,
    },
    {
      label: "Удаления из чека (до оплаты), руб",
      current: 1300,
      previous: 1300,
      week: 900,
      change: 0,
    },
    {
      label: "Количество чеков",
      current: 34,
      previous: 36,
      week: 34,
      change: -6,
    },
    {
      label: "Количество гостей",
      current: 34,
      previous: 36,
      week: 32,
      change: -6,
    },
  ];

  // Update chart options whenever selectedRowIndex changes
  useEffect(() => {
    if (selectedRowIndex !== null) {
      const row = data[selectedRowIndex];
      setChartOptions({
        title: {
          text: row.label,
        },
        xAxis: {
          categories: ["Текущий день", "Вчера", "Этот день недели"],
        },
        series: [
          {
            data: [row.current, row.previous, row.week],
            name: row.label,
          },
        ],
      });
    } else {
      setChartOptions(null);
    }
  }, [selectedRowIndex]);

  const handleRowClick = (index) => {
    setSelectedRowIndex(selectedRowIndex === index ? null : index); // Collapse/Expand
  };

  return (
    <div className="table-with-graph">
      <table className="table">
        <thead>
          <tr>
            <th>Показатель</th>
            <th style={{ backgroundColor: "#edf8ff" }}>Текущий день</th>
            <th>Вчера</th>
            <th>Этот день недели</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <React.Fragment key={index}>
              <tr
                onClick={() => handleRowClick(index)}
                className={selectedRowIndex === index ? "selected-row" : ""}
              >
                <td>{row.label}</td>
                <td style={{ backgroundColor: "#edf8ff" }}>
                  {row.current.toLocaleString()}
                </td>
                <td
                  style={{
                    backgroundColor:
                      row.change === 0
                        ? "#f5f5f5"
                        : row.change > 0
                        ? "#ecf7e7"
                        : "#fee6e6",
                  }}
                >
                  {row.previous.toLocaleString()}
                  <span
                    style={{
                      marginLeft: "8%",
                      color: row.change >= 0 ? "#1f8513" : "#ff333b",
                    }}
                  >
                    {row.change > 0 ? `+${row.change}%` : `${row.change}%`}
                  </span>
                </td>
                <td>{row.week.toLocaleString()}</td>
              </tr>
              {selectedRowIndex === index && chartOptions && (
                <tr>
                  <td colSpan="4">
                    <div className="chart-container">
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                      />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
