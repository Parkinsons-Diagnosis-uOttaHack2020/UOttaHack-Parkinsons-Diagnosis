import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import NewPatient from "../newPatient/NewPatient";
import "./Dashboard.css";

const Dashboard = props => {
  const context = useContext(Context);
  const user = context.user;
  const [newPatient, setNewPatient] = useState(false);

  useEffect(() => {
    context.checkIfLoggedIn().then(auth => {
      if (!auth) {
        props.history.push("/login");
      } else {
        context.getUser();
      }
    });
  }, [user]);

  return (
    <React.Fragment>
      {newPatient ? (
        <NewPatient closePopup={() => setNewPatient(false)} />
      ) : null}
      {user ? (
        <section className="d">
          <div className="dashboard">
            <div className="d-left">
              <div className="user">
                <span>{user.name}</span>
                <span>{user.email}</span>
              </div>
              <button
                onClick={() => {
                  context.signout();
                  props.history.push("/");
                }}
                className="btn form-btn"
              >
                Sign out
              </button>
            </div>
            <div className="d-right">
              <div className="patients-container">
                <div className="patients-top">
                  <button
                    className="btn"
                    onClick={() => {
                      setNewPatient(true);
                    }}
                  >
                    Add patient
                  </button>
                </div>
                <div className="patients-bottom">
                  {user.patients.length === 0 ? (
                    <React.Fragment>
                      <span className="no-patients">
                        You currently have no patients.
                      </span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {user.patients.map(patient => {
                        return (
                          <div key={patient.uid} className="patient">
                            <span>Patient: {patient.name}</span>
                            <span>
                              Test status:
                              {patient.result !== null
                                ? ` ${patient.result}`
                                : " not completed"}
                            </span>
                          </div>
                        );
                      })}
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </React.Fragment>
  );
};

export default Dashboard;
