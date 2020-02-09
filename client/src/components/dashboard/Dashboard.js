import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import NewPatient from "../newPatient/NewPatient";
import "./Dashboard.css";

const Dashboard = props => {
  const context = useContext(Context);
  const user = context.user;
  const [newPatient, setNewPatient] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    context.checkIfLoggedIn().then(auth => {
      if (!auth) {
        props.history.push("/login");
      } else if (!user) {
        context.getUser();
      } else {
        setAuth(true);
      }
    });
  }, [user]);

  return (
    <React.Fragment>
      {newPatient ? (
        <NewPatient closePopup={() => setNewPatient(false)} />
      ) : null}
      {auth ? (
        <section className="d">
          <div className="dashboard">
            <div className="d-left">
              <div className="user">
                <i className="fas fa-user-md user-icon"></i>
                <span>Hi, {user.name}</span>
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
                  <span>Patients</span>
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
                
                            <span className="patient-info">
                              <span>
                                <i className="fas fa-user patient-icon"></i>
                                {patient.name}
                              </span>
                              <span>
                                <i className="fas fa-envelope patient-icon"></i>
                                {patient.email}
                              </span>
                            </span>
                            <div>
                              <span className="patient-info">
                                <span>
                                  <i className="fas fa-notes-medical patient-icon"></i>
                                  {patient.result !== null
                                    ? ` ${patient.result}`
                                    : " Not completed"}
                                </span>
                              </span>
                            </div>
                            <div className="d-link">
                              <button className="btn d-btn">
                                <a href={patient.url} className="d-btn" target="_blank">
                                  Link to test
                                </a>
                              </button>
                            </div>
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
      ) : (
        <span>test</span>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
