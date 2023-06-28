import React, { useEffect, useLayoutEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./Control.css";
import TextField from "@mui/material/TextField";
import {
  createCategorySet,
  createQuestion,
  createSetOriginal,
  deleteQuestionUnderSet,
  disbaleSetOriginal,
  editQuestionUnderSet,
  editSetOriginal,
  enableSetOriginal,
  getAllCategorySets,
  getAllQuestionUnderSet,
  getAllSets,
} from "../apis/apis";
import Toast from "../components/Toast";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function Control() {
  const [alignment, setAlignment] = React.useState("create");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // Set Category

  const [setName, setsetName] = React.useState("");
  const [setDescription, setsetDescription] = React.useState("Description");

  const [isSuccess, setisSuccess] = useState(false);
  const [isSuccessMsg, setisSuccessMsg] = useState("");

  //Loading
  const [isLoading, setisLoading] = useState(false);
  // Set

  const [setoName, setsetoName] = useState("");
  const [setoDescription, setsetoDescription] = useState("");
  const [setoCategory, setsetoCategory] = useState("");
  const [setoTitle, setsetoTitle] = useState("");
  const [setoDifficult, setsetoDifficult] = useState("");

  const [allSubCategories, setallSubCategories] = useState([]);
  const getAllCategorySetsHandler = () => {
    getAllCategorySets()
      .then((res) => {
        console.log("RES - ", res);
        setallSubCategories(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [allSetsDetails, setallSetsDetails] = useState([]);
  const getAllSetsHereHandler = () => {
    getAllSets()
      .then((res) => {
        console.log("RES Set - ", res);
        if (res) {
          setallSetsDetails(res);
        }
      })
      .catch((err) => {
        console.log("Error - ", err);
      });
  };

  useEffect(() => {
    if (isSuccess)
      setInterval(() => {
        setisSuccess(false);
      }, 3000);
    getAllCategorySetsHandler();
    getAllSetsHereHandler();
  }, [isSuccess]);

  const createSetHandler = (e) => {
    e.preventDefault();
    setisLoading(true);
    createCategorySet({ name: setName })
      .then((res) => {
        console.log(res);
        if (res) {
          setisLoading(false);
          console.log(res.data);
          setisSuccessMsg("Created Category Set Success!!");
          setisSuccess(true);
          setsetName("");
          setsetDescription("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllTestDetailsHandler = () => {};

  const createOriginalSetHandler = (e) => {
    e.preventDefault();
    setisLoading(true);
    createSetOriginal({
      setName: setoName,
      setDescription: "Set Description",
      setCategory: "setoCategory",
      setTitle: setoName,
      setDifficult: "Easy",
    })
      .then((res) => {
        console.log(res);
        if (res) {
          setisLoading(false);
          setisSuccessMsg("Created Set Success!!");
          setisSuccess(true);
          setsetoName("");
          setsetoCategory("");
          setsetoDescription("");
          setsetoDifficult("");
          setsetoTitle("");
        }
      })
      .catch((err) => {
        console.log("Error - ", err);
      });
  };

  const onSuccessToast = () => {
    if (isSuccess) return <Toast msg={"Created Set Success"} />;
  };

  const ManageControl = () => {
    return (
      <div>
        <p>Manage Control</p>
      </div>
    );
  };

  const TestControl = () => {
    return (
      <div>
        <p>Test Control</p>
      </div>
    );
  };

  const [choiceAnswer, setchoiceAnswer] = useState("");
  const [questionSetUnder, setquestionSetUnder] = useState("");
  const [questionCategory, setquestionCategory] = useState("");
  const [questionName, setquestionName] = useState("");
  const [questionTrueAnswer, setquestionTrueAnswer] = useState("");
  const [answerQueueChoices, setanswerQueueChoices] = useState([]);
  const [questionImpLink, setquestionImpLink] = useState("https://citi-quiz.netlify.app/");
  const [questionDescription, setquestionDescription] = useState("");
  var questionChoicesList = [];
  const addAnswerToQueue = (e) => {
    e.preventDefault();
    const answerObject = {
      answerId: uuidv4(),
      answer: choiceAnswer,
    };
    questionChoicesList = [...answerQueueChoices];
    questionChoicesList.push(answerObject);
    setchoiceAnswer("");
    setanswerQueueChoices(questionChoicesList);
  };

  const removeAnswerToQueue = (e, id) => {
    e.preventDefault();
    const findIndex = answerQueueChoices.findIndex((p) => p.answerId === id);
    console.log(findIndex);
    let tempAnswerObjectList = [...answerQueueChoices];
    tempAnswerObjectList.splice(findIndex, 1);
    setanswerQueueChoices(tempAnswerObjectList);
  };

  const markAsCorrect = (e, id) => {
    e.preventDefault();
    const findAnswer = answerQueueChoices.find((a) => a.answerId === id);
    console.log(findAnswer);
    setquestionTrueAnswer(findAnswer);
  };

  const [isFieldNotComplete, setisFieldNotComplete] = useState(false);

  useEffect(() => {
    if (isFieldNotComplete) {
      setInterval(() => {
        setisFieldNotComplete(false);
      }, 3000);
    }
  }, [isFieldNotComplete]);

  const createQuestionHandler = (e) => {
    e.preventDefault();
    setisLoading(true);
    if (
      !questionSetUnder ||
      !questionName ||
      !questionCategory ||
      !answerQueueChoices ||
      !questionTrueAnswer ||
      !questionDescription ||
      !questionImpLink
    ) {
      console.log("Question Filed Not Complete");
      setisFieldNotComplete(true);
      setisLoading(false);
    } else {
      console.log("Question Filed Complete");
      createQuestion({
        setUnder: questionSetUnder,
        questionName: questionName,
        questionCategory: questionCategory,
        questionChoices: answerQueueChoices,
        questionAnswer: questionTrueAnswer,
        questionDescription: questionDescription,
        questionImpLink: questionImpLink,
      })
        .then((res) => {
          if (res) {
            setisLoading(false);
            setisSuccessMsg("Question Created Success");
            setisSuccess(true);
            setchoiceAnswer("");
            setquestionName("");
            setquestionCategory("");
            setquestionSetUnder("");
            setquestionTrueAnswer("");
            setanswerQueueChoices("");
            setquestionDescription("");
            setquestionImpLink("");
          }
        })
        .catch((err) => {
          console.log("Error - ", err);
        });
    }
  };

  const [questionUnderSet, setQuestionUnderSet] = useState([]);
  const [setIdForQuestion, setSetIdForQuestion] = useState("");
  const getQuestionDetail = (e, setID) => {
    e.preventDefault();
    setisLoading(true);
    setSetIdForQuestion(setID);
    getAllQuestionUnderSet(setID)
      .then((res) => {
        if (res) {
          setisLoading(false);
          setQuestionUnderSet(res);
        }
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  const [updateQuestionId, setUpdateQuestionId] = useState("");
  const questionEditControl = (e, questionId) => {
    e.preventDefault();
    setUpdateQuestionId(questionId);
    let tempQuestion = questionUnderSet.find((q) => q._id === questionId);
    console.log("Question in - ", tempQuestion);
    setquestionName(tempQuestion.questionName);
    setquestionSetUnder(tempQuestion.setUnder);
    setquestionCategory(tempQuestion.questionCategory);
    setanswerQueueChoices(tempQuestion.questionChoices);
    setquestionDescription(tempQuestion.questionDescription);
    setquestionImpLink(tempQuestion.questionImpLink);
    console.log(tempQuestion.questionAnswer[0]);
    setquestionTrueAnswer(tempQuestion.questionAnswer[0]);
    // TODO: Set All State
  };

  const deleteThisQuestionFromSet = (e, id) => {
    e.preventDefault();
    deleteQuestionUnderSet({ questionId: id }).then((res) => {
      if (res) {
        console.log(res);
        getQuestionDetail(e, setIdForQuestion);
      }
    });
  };

  const updateThisQuestionFromSet = (e) => {
    e.preventDefault();
    setisLoading(true);
    if (
      !questionSetUnder ||
      !questionName ||
      !questionCategory ||
      !answerQueueChoices ||
      !questionTrueAnswer ||
      !questionDescription ||
      !questionImpLink
    ) {
      console.log("Question Filed Not Complete");
      setisFieldNotComplete(true);
      setisLoading(false);
    } else {
      console.log("Question Filed Complete");
      editQuestionUnderSet({
        setUnder: questionSetUnder,
        questionName: questionName,
        questionCategory: questionCategory,
        questionChoices: answerQueueChoices,
        questionAnswer: questionTrueAnswer,
        questionDescription: questionDescription,
        questionImpLink: questionImpLink,
        qId: updateQuestionId,
      })
        .then((res) => {
          console.log("res", res);
          setisLoading(false);
          getQuestionDetail(e, setIdForQuestion);
          setisSuccessMsg("Question Created Success");
          setisSuccess(true);
        })
        .catch((err) => {
          console.log("Error ", err);
        });
    }
  };

  // All Loading Section ***************
  const LoadingSection = () => {
    if (isLoading)
      return (
        <div>
          <p>Loading....</p>
        </div>
      );
  };
  // ***********************************

  const clearQuestionFields = (e) => {
    e.preventDefault();
    setquestionName("");
    setchoiceAnswer("");
    setquestionCategory("");
    setquestionSetUnder("");
    setquestionTrueAnswer("");
    setanswerQueueChoices("");
    setquestionDescription("");
    setquestionImpLink("");
  };

  const [setNameForEdit, setSetNameForEdit] = useState("");
  const [editSetStatusHere, setEditSetStatusHere] = useState(false);
  const [wholeSetHere, setWholeSetHere] = useState([]);
  const editSetHandler = (e, set) => {
    e.preventDefault();
    setEditSetStatusHere(true);
    setSetNameForEdit(set.setName);
    setWholeSetHere(set);
  };

  const editSetSubmitHandler = (e) => {
    e.preventDefault();
    // editSetOriginal(wholeSetHere, wholeSetHere._id)
    //   .then((res) => {
    //     console.log(res, wholeSetHere);
    //   })
    //   .catch((err) => {
    //     console.log("Error - ", err);
    //   });
  };

  const deleteSetHandler = (e, set) => {
    e.preventDefault();
    setisLoading(true);
    setWholeSetHere(set);
    disbaleSetOriginal(set)
      .then((res) => {
        console.log("Res Disable - ", res);
        setisLoading(false);
        getAllSetsHereHandler();
      })
      .catch((err) => {
        console.log("Error - ", err);
      });
  };

  const enableSetHandler = (e, set) => {
    e.preventDefault();
    setisLoading(true);
    setWholeSetHere(set);
    enableSetOriginal(set)
      .then((res) => {
        console.log("Res - ", res);
        setisLoading(false);
        getAllSetsHereHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderSelectedControl = () => {
    if (isFieldNotComplete) {
      return <div className="alert">Please fill out the required fields.</div>;
    } else if (isLoading) {
      return (
        <div>
          <p>Loading ....</p>
        </div>
      );
    } else
      switch (alignment) {
        case "create":
          return (
            <div>
              {onSuccessToast()}
              <div className="control-container">
                <div class="grid-container">
                  <div class="grid-item">
                  <div>
                      <p className="control-sq-title">Create Set</p>
                      <div className="control-set-column">
                        <TextField
                          value={setoName}
                          onChange={(e) => setsetoName(e.target.value)}
                          id="standard-basic"
                          label="Enter the Set's Name"
                          variant="outlined"
                        />
                      </div>
                      {/* <div className="control-set-column">
                        <TextField
                          value={setoDescription}
                          style={{ marginTop: 15 }}
                          onChange={(e) => setsetoDescription(e.target.value)}
                          id="standard-basic"
                          label="Enter the Set's Description"
                          variant="outlined"
                        />
                      </div> */}

                      {/* <Select
                        sx={{ minWidth: 210 }}
                        style={{ marginTop: 15 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={setoCategory}
                        label="Category"
                        onChange={(e) => setsetoCategory(e.target.value)}
                      >
                        {allSubCategories &&
                          allSubCategories.map((subcate, index) => {
                            return (
                              <MenuItem value={subcate._id}>
                                {subcate.name}
                              </MenuItem>
                            );
                          })}
                      </Select> */}
                      {/* <div
                        className="control-set-column"
                        style={{ marginTop: 15 }}
                      >
                        <TextField
                          value={setoTitle}
                          onChange={(e) => setsetoTitle(e.target.value)}
                          id="standard-basic"
                          label="Enter the Set's Title"
                          variant="outlined"
                        />
                      </div> */}
                      {/* <Select
                        style={{ marginTop: 15 }}
                        sx={{ minWidth: 210 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={setoDifficult}
                        label="Category"
                        onChange={(e) => setsetoDifficult(e.target.value)}
                      >
                        <MenuItem value={"Easy"}>Easy</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                      </Select> */}
                    </div>
                    <button
                      className="button-control-btn button-mt"
                      onClick={createOriginalSetHandler}
                    >
                      Create Set
                    </button>
                    <hr></hr>

                    <p className="control-sq-title">Create Question Category</p>
                    <div className="control-set-column">
                      <TextField
                        value={setName}
                        onChange={(e) => setsetName(e.target.value)}
                        id="standard-basic"
                        label="Enter the Question's Category Name"
                        variant="outlined"
                      />
                    </div>
                    <div className="control-set-column">
                      {/* <TextField
                        value={setDescription}
                        style={{ marginTop: 15 }}
                        onChange={(e) => setsetDescription("description")}
                        id="standard-basic"
                        label="Enter the Set's Category Description"
                        variant="outlined"
                      /> */}
                    </div>
                    <div>
                      <button
                        className="button-control-btn button-mt"
                        onClick={createSetHandler}
                      >
                        Create Set Category
                      </button>
                    </div>
                    
                  </div>
                  <div class="grid-item">
                    <button onClick={(e) => clearQuestionFields(e)}>
                      Clear
                    </button>
                    <p className="control-sq-title">Create Question</p>
                    <p>Question Under</p>
                    <Select
                      style={{ marginTop: 1, marginBottom: 15 }}
                      sx={{ minWidth: 210 }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={questionSetUnder}
                      label="Under Set"
                      onChange={(e) => setquestionSetUnder(e.target.value)}
                    >
                      {allSetsDetails &&
                        allSetsDetails.map((set, index) => {
                          return (
                            <MenuItem value={set._id}>{set.setName}</MenuItem>
                          );
                        })}
                    </Select>
                    <p>Question Category</p>
                    <Select
                      style={{ marginTop: 5, marginBottom: 15, marginLeft: 15 }}
                      sx={{ minWidth: 210 }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={questionCategory}
                      label="Under Set"
                      onChange={(e) => setquestionCategory(e.target.value)}
                    >
                      {allSubCategories &&
                        allSubCategories.map((subcate, index) => {
                          return (
                            <MenuItem value={subcate._id}>
                              {subcate.name}
                            </MenuItem>
                          );
                        })}
                      {/* <MenuItem value="Political Science">Political Science</MenuItem>
                                 <MenuItem value="History">History</MenuItem>
                                 <MenuItem value="Geography">Geography</MenuItem>
                                 <MenuItem value="Anthropology">Anthropology</MenuItem>
                                 <MenuItem value="Economical">Economical</MenuItem>
                                 <MenuItem value="Social Psychology">Social Psychology</MenuItem>
                                 <MenuItem value="Comparative Law">Comparative Law</MenuItem>
                                 <MenuItem value="Comparative Religion">Comparative Religion</MenuItem> */}
                    </Select>
                    <div>
                      <TextField
                        onChange={(e) => setquestionName(e.target.value)}
                        value={questionName}
                        id="outlined-basic"
                        label="Question Name"
                        variant="outlined"
                      />
                    </div>
                    <div>
                      <TextField
                        onChange={(e) => setquestionDescription(e.target.value)}
                        value={questionDescription}
                        id="outlined-basic"
                        label="Question Answer Description"
                        variant="outlined"
                      />
                    </div>
                    <div>
                      <TextField
                        onChange={(e) => setquestionImpLink(e.target.value)}
                        value={questionImpLink}
                        id="outlined-basic"
                        label="Question Imp Link"
                        variant="outlined"
                      />
                    </div>
                    <div className="control-question-enter-section">
                      <p>Enter the question choices</p>
                      {answerQueueChoices &&
                        answerQueueChoices.map((ans, index) => {
                          return (
                            <div style={{ margin: 10 }}>
                              {ans.answerId === questionTrueAnswer.answerId ? (
                                <>
                                  <div style={{ textAlign: "center" }}>
                                    <p
                                      style={{
                                        backgroundColor: "#003909",
                                        width: 80,
                                        textAlign: "center",
                                        color: "#FFFFFF",
                                        borderRadius: 15,
                                      }}
                                    >
                                      {ans.answer}
                                    </p>
                                  </div>
                                  <button
                                    className="button-control-btn"
                                    style={{ marginLeft: 15, marginTop: 6 }}
                                    onClick={(e) =>
                                      removeAnswerToQueue(e, ans.answerId)
                                    }
                                  >
                                    DELETE
                                  </button>
                                  <button
                                    className="button-control-btn"
                                    style={{ marginLeft: 15, marginTop: 6 }}
                                    onClick={(e) =>
                                      markAsCorrect(e, ans.answerId)
                                    }
                                  >
                                    MARK CORRECT
                                  </button>
                                </>
                              ) : (
                                <>
                                  {ans.answer}

                                  <button
                                    className="button-control-btn"
                                    style={{ marginLeft: 15, marginTop: 6 }}
                                    onClick={(e) =>
                                      removeAnswerToQueue(e, ans.answerId)
                                    }
                                  >
                                    DELETE
                                  </button>
                                  <button
                                    className="button-control-btn"
                                    style={{ marginLeft: 15, marginTop: 6 }}
                                    onClick={(e) =>
                                      markAsCorrect(e, ans.answerId)
                                    }
                                  >
                                    MARK CORRECT
                                  </button>
                                </>
                              )}
                            </div>
                          );
                        })}

                      <TextField
                        value={choiceAnswer}
                        onChange={(e) => setchoiceAnswer(e.target.value)}
                        id="outlined-basic"
                        label="Question Answers"
                        variant="outlined"
                      />
                      <button
                        className="button-control-btn"
                        style={{ marginLeft: 15, marginTop: 6 }}
                        onClick={addAnswerToQueue}
                      >
                        ADD
                      </button>
                      <div
                        style={{
                          marginTop: 25,
                        }}
                      >
                        <button
                          onClick={createQuestionHandler}
                          className="button-control-btn"
                          style={{
                            marginLeft: 15,
                            marginTop: 6,
                            width: 200,
                            backgroundColor: "#00813A",
                          }}
                        >
                          Create Question
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        case "manage":
          return (
            <div
              style={{
                marginRight: 26,
                marginLeft: 26,
                marginTop: 25,
              }}
            >
              <div className="row">
                <div className="column">
                  <div className="grid">
                    <div className="row">
                      <div
                        style={{
                          backgroundColor: "#FFFFFF",
                          margin: 5,
                          padding: 10,
                        }}
                      >
                        <p>Edit Set</p>
                      </div>
                      {allSetsDetails &&
                        allSetsDetails.map((set, index) => (
                          <div className="column box">
                            <p
                              style={{ textAlign: "center" }}
                              onClick={(e) => getQuestionDetail(e, set._id)}
                            >
                              {set.setName}
                            </p>
                            <div
                              style={{
                                margin: 10,
                              }}
                            >
                              <button onClick={(e) => editSetHandler(e, set)}>
                                Edit
                              </button>
                              {set.setDescription === "Disable" ? (
                                <button
                                  style={{
                                    backgroundColor: "#FFFFFF",
                                  }}
                                  onClick={(e) => enableSetHandler(e, set)}
                                >
                                  Enable
                                </button>
                              ) : (
                                <button
                                  style={{
                                    backgroundColor: "#FFA500",
                                  }}
                                  onClick={(e) => deleteSetHandler(e, set)}
                                >
                                  Disable
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div class="column">
                  <h5>All Questions</h5>
                  <div>
                    {questionUnderSet &&
                      questionUnderSet.map((question, index) => {
                        return (
                          <div
                            style={{
                              margin: 10,
                              backgroundColor: "#FFFFFE",
                            }}
                          >
                            <div
                              onClick={(e) =>
                                questionEditControl(e, question._id)
                              }
                            >
                              <p>
                                {" "}
                                <b>{index + 1}</b> {question.questionName}
                              </p>
                              <button
                                onClick={(e) =>
                                  deleteThisQuestionFromSet(e, question._id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div class="column">
                  Edit Control
                  <div>
                    <div class="grid-item">
                      <p className="control-sq-title">Create Question</p>

                      <p>Question Under</p>

                      <Select
                        style={{ marginTop: 1, marginBottom: 15 }}
                        sx={{ minWidth: 210 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={questionSetUnder}
                        label="Under Set"
                        onChange={(e) => setquestionSetUnder(e.target.value)}
                      >
                        {allSetsDetails &&
                          allSetsDetails.map((set, index) => {
                            return (
                              <MenuItem value={set._id}>{set.setName}</MenuItem>
                            );
                          })}
                      </Select>
                      <p>Question Category</p>
                      <Select
                        style={{
                          marginTop: 5,
                          marginBottom: 15,
                          marginLeft: 15,
                        }}
                        sx={{ minWidth: 210 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={questionCategory}
                        label="Under Set"
                        onChange={(e) => setquestionCategory(e.target.value)}
                      >
                        {allSubCategories &&
                          allSubCategories.map((subcate, index) => {
                            return (
                              <MenuItem value={subcate._id}>
                                {subcate.name}
                              </MenuItem>
                            );
                          })}
                        {/* <MenuItem value="Political Science">Political Science</MenuItem>
                                 <MenuItem value="History">History</MenuItem>
                                 <MenuItem value="Geography">Geography</MenuItem>
                                 <MenuItem value="Anthropology">Anthropology</MenuItem>
                                 <MenuItem value="Economical">Economical</MenuItem>
                                 <MenuItem value="Social Psychology">Social Psychology</MenuItem>
                                 <MenuItem value="Comparative Law">Comparative Law</MenuItem>
                                 <MenuItem value="Comparative Religion">Comparative Religion</MenuItem> */}
                      </Select>
                      <div>
                        <TextField
                          onChange={(e) => setquestionName(e.target.value)}
                          value={questionName}
                          id="outlined-basic"
                          label="Question Name"
                          variant="outlined"
                        />
                      </div>
                      <div>
                        <TextField
                          onChange={(e) =>
                            setquestionDescription(e.target.value)
                          }
                          value={questionDescription}
                          id="outlined-basic"
                          label="Question Description"
                          variant="outlined"
                        />
                      </div>
                      <div>
                        <TextField
                          onChange={(e) => setquestionImpLink(e.target.value)}
                          value={questionImpLink}
                          id="outlined-basic"
                          label="Question Imp Link"
                          variant="outlined"
                        />
                      </div>
                      <div className="control-question-enter-section">
                        <p>Enter the question choices</p>
                        {answerQueueChoices &&
                          answerQueueChoices.map((ans, index) => {
                            return (
                              <div style={{ margin: 10 }}>
                                {ans.answerId ===
                                questionTrueAnswer.answerId ? (
                                  <>
                                    <div style={{ textAlign: "center" }}>
                                      <p
                                        style={{
                                          backgroundColor: "#003909",
                                          width: 80,
                                          textAlign: "center",
                                          color: "#FFFFFF",
                                          borderRadius: 15,
                                        }}
                                      >
                                        {ans.answer}
                                      </p>
                                    </div>
                                    <button
                                      className="button-control-btn"
                                      style={{ marginLeft: 15, marginTop: 6 }}
                                      onClick={(e) =>
                                        removeAnswerToQueue(e, ans.answerId)
                                      }
                                    >
                                      DELETE
                                    </button>
                                    <button
                                      className="button-control-btn"
                                      style={{ marginLeft: 15, marginTop: 6 }}
                                      onClick={(e) =>
                                        markAsCorrect(e, ans.answerId)
                                      }
                                    >
                                      MARK CORRECT
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {ans.answer}

                                    <button
                                      className="button-control-btn"
                                      style={{ marginLeft: 15, marginTop: 6 }}
                                      onClick={(e) =>
                                        removeAnswerToQueue(e, ans.answerId)
                                      }
                                    >
                                      DELETE
                                    </button>
                                    <button
                                      className="button-control-btn"
                                      style={{ marginLeft: 15, marginTop: 6 }}
                                      onClick={(e) =>
                                        markAsCorrect(e, ans.answerId)
                                      }
                                    >
                                      MARK CORRECT
                                    </button>
                                  </>
                                )}
                              </div>
                            );
                          })}

                        <TextField
                          value={choiceAnswer}
                          onChange={(e) => setchoiceAnswer(e.target.value)}
                          id="outlined-basic"
                          label="Question Answers"
                          variant="outlined"
                        />
                        <button
                          className="button-control-btn"
                          style={{ marginLeft: 15, marginTop: 6 }}
                          onClick={addAnswerToQueue}
                        >
                          ADD
                        </button>
                        <div
                          style={{
                            marginTop: 25,
                          }}
                        >
                          <button
                            onClick={(e) => updateThisQuestionFromSet(e)}
                            className="button-control-btn"
                            style={{
                              marginLeft: 15,
                              marginTop: 6,
                              width: 200,
                              backgroundColor: "#00813A",
                            }}
                          >
                            Update Question
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        case "test":
          return <TestControl />;
        default:
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontSize: 18,
                  marginTop: 15,
                }}
              >
                Select the option in the tab
              </p>
            </div>
          );
      }
  };

  return (
    <div>
      <div className="admin-panel">
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="create">Create</ToggleButton>
          <ToggleButton value="manage">Manage</ToggleButton>
        </ToggleButtonGroup>
      </div>
      {renderSelectedControl()}
    </div>
  );
}

export default Control;
