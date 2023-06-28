import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Select, MenuItem } from "@mui/material";
import { deleteNotificationHere, getAllNotification, getAllSets, sendNotificationsToUsers } from "../apis/apis";

function Notification() {
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSetsToNotify, setNotificationSetsToNotify] = useState("");
  const [notificationLink, setNotificationLink] = useState("");

  const [notificationSentStatus, setNotificationSentStatus] = useState(false);
  const [isError, setIsError] = useState(false);

  const sendNotificationToAllUsers = (e) => {
    e.preventDefault();

    const notifyObject = {
      title: notificationTitle,
      message: notificationMessage,
      set: notificationSetsToNotify,
      link: notificationLink,
    };

    sendNotificationsToUsers(notifyObject)
      .then((res) => {
        if (res) {
          setNotificationSentStatus(true);
          setNotificationTitle("");
          setNotificationMessage("");
          setNotificationLink("");
        }
      })
      .catch((err) => {
        console.log(err);
        setNotificationSentStatus(false);
      });
  };


  const [allNotificationHere, setAllNotificationHere] = useState([]);
  const getAllNotifications = () => {
    getAllNotification().then((res) => {
      console.log("Notification All - ", res.data.allNotifications);
      setAllNotificationHere(res.data.allNotifications);
    })
  }

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

  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    getAllSetsHereHandler();
  }, []);

  
  useEffect(() => {
    getAllNotifications()
  },[notificationSentStatus, notificationStatus])


  const deleteNotification = (e, notify) => {
    e.preventDefault();
    deleteNotificationHere({notifiId: notify}).then((res) => {
      if(res){
        console.log(res);
        setNotificationStatus(!notificationStatus)
      } 

    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div
      style={{
        margin: 25,
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 8,
      }}
    >
      <div>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* Content for the first column */}
              <div className="column-content">
                <h2>Notification</h2>
                <p
                  style={{
                    marginLeft: 20,
                  }}
                >
                  Enter the notification title
                </p>

                <TextField
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  label="Enter the Set's Category Description"
                  variant="outlined"
                  style={{
                    marginBottom: 25,
                    marginRight: 20,
                    marginLeft: 20,
                  }}
                />
                <p
                  style={{
                    marginLeft: 20,
                  }}
                >
                  Enter the notification message
                </p>
                <TextField
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  label="Enter the Set's Category Description"
                  variant="outlined"
                  style={{
                    marginBottom: 25,
                    marginRight: 20,
                    marginLeft: 20,
                  }}
                />
                <Select
                  style={{ marginTop: 1, marginBottom: 15 }}
                  sx={{ minWidth: 210 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={notificationSetsToNotify}
                  label="Under Set"
                  onChange={(e) => setNotificationSetsToNotify(e.target.value)}
                >
                  {allSetsDetails &&
                    allSetsDetails.map((set, index) => {
                      return <MenuItem value={set._id}>{set.setName}</MenuItem>;
                    })}
                </Select>

                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    margin: 10,
                  }}
                  onClick={(e) => sendNotificationToAllUsers(e)}
                >
                  Send notification
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Content for the second column */}
              <div className="column-content">
                <h2>All Notifications Here</h2>
                
                <div>
                  {allNotificationHere.length > 0 && allNotificationHere.map((notify, index) => {
                    console.log('notify - '. notify);
                    return <><p>
                      {index + 1} {notify.notificationTitle}
                    </p>
                    <button onClick={(e) => deleteNotification(e, notify)}>
                      Delete
                    </button>
                    </>
                  })
                  }
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Notification;
