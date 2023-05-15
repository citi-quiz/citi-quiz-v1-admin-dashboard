import React, { useEffect, useState, useRef } from "react";
import Chart from "../components/Chart";
import {
  getAllQuestions,
  getAllSets,
  getAllTests,
  getAllUsers,
} from "../apis/apis";
import "./Manage.css";

function Dashboard() {
  const [allUsers, setallUsers] = useState([]);
  const [allSets, setallSets] = useState([]);
  const [allQuestions, setallQuestions] = useState([]);
  const [allTestTotelAttended, setallTestTotelAttended] = useState(0);

  const getAllStatsForDashboard = () => {
    getAllUsers()
      .then((res) => setallUsers(res))
      .catch((err) => console.log(err));
    getAllSets()
      .then((res) => setallSets(res))
      .catch((err) => console.log(err));
    getAllQuestions()
      .then((res) => setallQuestions(res))
      .catch((err) => console.log(err));
    getAllTests()
      .then((res) => setallTestTotelAttended(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllStatsForDashboard();
  }, []);

  const onClickNode = function (nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  return (
    <div className="dashboard-container">
      {/* <div>
        <iframe
          style={{
            position: "absolute",
          }}
          src="https://my.spline.design/untitled-d24e4413b779cb535aa9dc2da4512bca/"
          frameborder="0"
          width="100%"
          height="600px"
        ></iframe>
      </div> */}
      <div
        style={{
          position: "relative",
        }}
      >
        <div className="dashboard-title-txt"></div>
        <div class="grid-container">
          <div class="grid-item stats-card">
            <b className="stats-card__title"> User: </b>
            <div className="stats-card__number">{allUsers.length}</div>
          </div>
          <div class="grid-item stats-card">
            <b className="stats-card__title"> Sets: </b>
            <div className="stats-card__number">{allSets.length}</div>
          </div>
          <div class="grid-item stats-card">
            <b className="stats-card__title"> Questions: </b>
            <div className="stats-card__number">{allQuestions.length}</div>
          </div>
          <div class="grid-item stats-card">
            <b className="stats-card__title"> Tests: </b>
            <div className="stats-card__number">
              {allTestTotelAttended.length}
            </div>
          </div>
        </div>
        <div>
          <div className="header">
            <h1
              className="title"
              style={{
                marginLeft: 15,
                marginTop: 15,
              }}
            >
              Bar Chart
            </h1>
            <Chart />
          </div>
        </div>
        <div className="grid_stats-dash">
          <div className="grid_stats-dash__item"></div>
          <div className="grid_stats-dash__item"></div>
          <div className="grid_stats-dash__item"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
