import axios from "axios";
import { API_BACKEND_WEB } from "../backend";

// ?? User Control ---------------------------

export const getAllUsers = () => {
    return axios
        .get(`${API_BACKEND_WEB}/get/all/users`)
        .then((res) => {
            return res.data.users;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getAUsers = (id) => {
    return axios
        .get(`${API_BACKEND_WEB}/get/a/user/${id}`)
        .then((res) => {
            return res.data.users;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteAUser = (id) => {
    console.log("id: -> ", id);
    return axios.delete(`${API_BACKEND_WEB}/delete/user/${id}`).then((res) => {
        return res;
    }).catch((error) => {
        console.log("Error - ", error);
    });
}

// ?? -----------------------------------------

// ?? Sets Section ------------------------------

export const createCategorySet = (set) => {
    return axios
        .post(`${API_BACKEND_WEB}/setcategory/create`, set)
        .then((res) => {
            return res.data.cate;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getAllCategorySets = () => {
    return axios
        .get(`${API_BACKEND_WEB}/setcategory/get/all`)
        .then((res) => {
            return res.data.cate;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const createSetOriginal = (set) => {
    return axios
        .post(`${API_BACKEND_WEB}/sets/create`, set)
        .then((res) => {
            return res.data.sets;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const editSetOriginal = (set, setId) => {
    return axios
        .post(`${API_BACKEND_WEB}/sets/update/${setId}`, set)
        .then((res) => {
            return res.data.sets;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const disbaleSetOriginal = (set) => {
    return axios
        .post(`${API_BACKEND_WEB}/sets/disable`, set)
        .then((res) => {
            return res.data.sets;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const enableSetOriginal = (set) => {
    return axios
        .post(`${API_BACKEND_WEB}/sets/enable`, set)
        .then((res) => {
            return res.data.sets;
        })
        .catch((err) => {
            console.log(err);
        });
};

// ?? Question Section ----------------------------

export const createQuestion = (question) => {
    return axios
        .post(`${API_BACKEND_WEB}/question/create`, question)
        .then((res) => {
            return res.data.question;
        })
        .catch((err) => {
            console.log(err);
        });
};

// ?? --------------------------------------------

export const getAllSets = () => {
    return axios
        .get(`${API_BACKEND_WEB}/sets/get/all`)
        .then((res) => {
            return res.data.sets;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getASet = () => {};

export const getAllQuestions = () => {
    return axios
        .get(`${API_BACKEND_WEB}/question/get/all`)
        .then((res) => {
            return res.data.allquestion;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getAQuestion = () => {};

export const getAllQuestionUnderSet = (setId) => {
    return axios
        .get(`${API_BACKEND_WEB}/question/get/all/set/${setId}`)
        .then((res) => {
            return res.data.allquestion;
        })
        .catch((err) => {
            console.log("Error ", err);
        });
};

export const deleteQuestionUnderSet = (qId) => {
    return axios
        .delete(`${API_BACKEND_WEB}/question/delete`, { data: qId })
        .then((res) => {
            return res.data.question;
        })
        .catch((err) => console.log(err));
};

export const editQuestionUnderSet = (qId) => {
    return axios
        .put(`${API_BACKEND_WEB}/question/update`, qId)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("Error -", err);
        });
};

export const getAUser = () => {};

// ?? -----------------------------------------------

export const getAllTests = () => {
    return axios
        .get(`${API_BACKEND_WEB}/test/get/all`)
        .then((res) => {
            return res.data.allTest;
        })
        .catch((err) => {
            console.log(err);
        });
};

// ?? ------------------------------------------------

// ?? ------------------------------------------------

// Notification
export const sendNotificationsToUsers = (nofity) => {
    return axios
        .post(`${API_BACKEND_WEB}/notification/create`, nofity)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("Error -", err);
        });
};

export const getAllNotification = () => {
    return axios.get(`${API_BACKEND_WEB}/get/all/notification`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("Error -", err);
        });
}

export const deleteNotificationHere = (notification) => {
        return axios
            .delete(`${API_BACKEND_WEB}/notification/delete`, { data: notification })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log("Error -", err);
            });
    }
    // ------------------------