import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import EasyEdit, { Types } from "react-easy-edit";
import "./Manage.css";
import { useState } from "react";
import {
  createCategorySet,
  getAllCategorySets,
  getAllQuestions,
  getAllSets,
} from "../apis/apis";
import { useEffect } from "react";
import { Chip } from "@material-ui/core";

function Manage() {
  const [allSets, setallSets] = useState([]);
  const [allQuestions, setallQuestions] = useState([]);
  const [questionSearch, setquestionSearch] = useState("");

  const [editSetStatus, seteditSetStatus] = useState(false);
  const [editSetsId, seteditSetsId] = useState("");
  const [editName, seteditName] = useState("");
  const [editDescription, seteditDescription] = useState("");

  // ** New Sets Control
  const [newSets, setnewSets] = useState("");
  const [newSetsStatus, setnewSetsStatus] = useState(false);
  const [newSetsName, setnewSetsName] = useState("");
  const [newSetsDescription, setnewSetsDescription] = useState("");

  const createThisSets = (e) => {
    e.preventDefault();
    setnewSets(!newSets);
  };

  const createSets = (e) => {
    e.preventDefault();
    createCategorySet({ name: newSetsName, description: newSetsDescription })
      .then((res) => {
        if (res.error) {
          console.log("Error : ", res.error);
        }
      })
      .catch((err) => {
        console.log("Error - ", err);
      });
  };

  const createSetSection = () => {
    if (newSets)
      return (
        <>
          <input
            type="text"
            value={newSetsName}
            onChange={(e) => setnewSetsName(e.target.value)}
            className="my-input edit-box"
            placeholder="Enter your name"
          />
          <input
            type="text"
            value={newSetsDescription}
            onChange={(e) => setnewSetsDescription(e.target.value)}
            className="my-input edit-box"
            placeholder="Enter your description"
          />
          <button className="my-button" onClick={createSets}>
            Submit
          </button>
        </>
      );
  };

  const editSetsSubmit = (e) => {
    e.preventDefault();
  };

  const editThisSet = (e, set) => {
    e.preventDefault();
    seteditSetStatus(!editSetStatus);
    seteditName(set.setName);
    seteditDescription(set.setDescription);
  };

  const editSetSection = () => {
    if (editSetStatus)
      return (
        <>
          <input
            type="text"
            value={editName}
            onChange={(e) => seteditName(e.target.value)}
            className="my-input edit-box"
            placeholder="Enter your name"
          />
          <input
            type="text"
            value={editDescription}
            onChange={(e) => seteditDescription(e.target.value)}
            className="my-input edit-box"
            placeholder="Enter your description"
          />
          <button className="my-button" onClick={editSetsSubmit}>
            Submit
          </button>
        </>
      );
  };

  const getAllSetsHere = () => {
    getAllSets()
      .then((res) => {
        setallSets(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllQuestionsHere = () => {
    getAllQuestions()
      .then((res) => {
        setallQuestions(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchQuestionHandler = (questionValue) => {
    if (allQuestions) {
      const searchResult = allQuestions.filter((question) => {
        if (question == "") {
          return question;
        } else if (
          question.questionName
            .toLowerCase()
            .includes(questionValue.toLowerCase())
        ) {
          return question;
        }
      });
      setallQuestions(searchResult);
    } else if (!questionValue) {
    }
  };

  // Chip Components

  function MyChip({ label, onDelete }) {
    return (
      <Chip
        label={label}
        onDelete={onDelete}
        size="medium"
        style={{
          margin: 5,
        }}
      />
    );
  }

  const [chipData, setChipData] = useState([
    { key: 1, label: "React" },
    { key: 2, label: "Material-UI" },
    { key: 3, label: "JavaScript" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const [setCategory, setSetCategory] = useState([]);
  const getAllSubCategoriesHandler = () => {
    getAllCategorySets()
      .then((res) => {
        console.log(res);
        setSetCategory(res);
      })
      .catch((err) => {
        console.log("Error - ", err);
      });
  };

  useEffect(() => {
    getAllSetsHere();
    getAllQuestionsHere();
    getAllSubCategoriesHandler();
  }, []);

  return (
    <div className="manage-questions-and-sets">
      <div className="manage-control">
        <h3 className="admin-control-txt">Admin Control</h3>
      </div>

      <div class="grid">
        <div class="column">
          <h2>Sets</h2>
          <div>{newSets ? createSetSection() : null}</div>

          <div>{editSetStatus ? editSetSection() : null}</div>

          <div>
            {console.log("Sets -> ", allSets)}
            {allSets &&
              allSets.map((set, i) => {
                return (
                  <ul class="list">
                    <li>
                      <span>{set.setName}</span>
                    </li>
                  </ul>
                );
              })}
          </div>
        </div>
        <div class="column">
          <h2>Questions</h2>
          <div class="search">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => searchQuestionHandler(e.target.value)}
            />
            <button>Search</button>
          </div>
          {allQuestions.map((question, i) => {
            return (
              <ul class="list">
                <li>
                  <span>{question.questionName}</span>
                </li>
              </ul>
            );
          })}
        </div>
        <div class="column">
          <h2>Set Category</h2>
          {setCategory.map((data) => (
            <MyChip key={data.key} label={data.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Manage;
