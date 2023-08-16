import React, { useState, useEffect } from "react";
import classes from "./Step4PAR.module.css";

import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

import Step6PAR from "./Step6PAR";

import PostARequirementBackdropTheme from "../../Components/PostRequirement/PostARequirementBackdropTheme";
import { pageViewTracker } from "../../Components/GoogleTracking";

const ActionButton = React.lazy(() => import("../../Components/ActionButton"));

const Step4PAR = () => {
  let navigate = useNavigate();
  const [budget, setBudget] = useState();
  const [addOn, setAddOn] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [addonData, setAddonData] = useState([]);
  const [addOnID, setAddOnID] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [budgetUnit, setBudgetUnit] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [getPARLoading, setGetPARLoading] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [error, setError] = useState({});


  

  const { reqId } = useParams();
  const RequirementID = reqId;
  useEffect(() => {
    pageViewTracker()
    GetPARapi();
    addonDataApi();
  }, []);

  let userID = localStorage.getItem("Client_userID");
  const PARapi = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );

    var formdata = new FormData();
    formdata.append("UserId", userID);
    formdata.append("RequirementID", RequirementID);
    formdata.append("AddonName", addOn.toString());
    formdata.append("AddonAmount", totalAmount);
    formdata.append("Budget", budget);
    formdata.append("BudgetUnit", budgetUnit||"Total" );
    formdata.append("BudgetCurrency", currencySymbol || "₹");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      global.apiLink + "/api/rozgaarapi/PostARequirementSecond",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          paymentHandler();
        }
        if (result.status === "Failed" && result.status_code === 300) {
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const addonDataApi = () => {
    setIsLoading(true);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify();

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/client/GetAddonMaster", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAddonData(result.data);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const GetPARapi = () => {
    setGetPARLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );

    var formdata = new FormData();
    formdata.append("UserId", userID);
    formdata.append("RequirementID", RequirementID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      global.apiLink + "/api/rozgaarapi/PostARequirementSecond",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
         
          setBudget(result.Data.Budget);
          setBudgetUnit(result.Data.BudgetUnit);
          setCurrencySymbol(result.Data.BudgetCurrency);
        }
        if (result.status === "Failed" && result.status_code === 300) {
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setGetPARLoading(false);
      });
  };

const paymentHandler = () =>{
  if (totalAmount > 0) {
    openpaymentForAddon()
  
  }else{
    setShowModal(true);
  }

  }


const openpaymentForAddon = () => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
	
      "RequirementID":(RequirementID),
      "AddonIDs":(addOnID.toString())
    });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
   global.apiLink + "/api/rozgaarapi/AddonsPaymentInitiate",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "SUCCESS" && result.status_code === 200) {
        
       navigate("/RazorPayGateway/"+ "ClientAddons/" + result.data.PGOrderId,{state:{RequirementID:RequirementID}});
      } else {
        console.log(result)
        
      }
    })
    .catch((error) => console.log("error", error));
};

  const formValidation = () => {
    let errors = {};
    let isValid = true;

    if (!budget || budget === "") {
      errors.budget = "Please specify your budget.";
      isValid = false;
    }
    if (!addOn || addOn === "") {
      errors.addOn = "This field is mandatory";
      isValid = false;
    } else {
    }
    setError(errors);
    return isValid;
  };
  const UpdateAddOn = (value, amount, AddonID) => {
    if (!addOn.includes(value)) {
      setAddOn([...addOn, value]);
      setTotalAmount(parseInt(totalAmount) + amount);
      addOnID.push(AddonID)
    } else {
      setAddOn(addOn.filter((item) => item !== value));
      setTotalAmount(totalAmount - amount);
      setAddOnID(addOnID.filter((item) => item !== AddonID));
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Best Remote work and freelance projects at RozgaarIndia.com via Times Ascent`}</title>
        <meta
          name="description"
          content={`Rozgaar India is one of India's Leading online service marketplace for remote work and freelance projects. You can find the best skilled online service providers at RozgaarIndia.com`}
        />
      </Helmet>
      <React.Suspense
        fallback={
          <div className="pageLoader">
            <Loader
              type="TailSpin"
              color="red"
              height={80}
              width={80}
              className="text-center my-5"
            />
          </div>
        }
      >
        <PostARequirementBackdropTheme
          headingsMain={"Post A Requirement"}
          subHeadingMain={"In 4/4 quick steps connect with top freelancers"}
          step={"100"}
        >
          {getPARLoading ? (
            <div className={classes.pageLoader}>
              <Loader
                type="TailSpin"
                color="#1678f2"
                height={80}
                width={80}
                className="text-center my-5"
              />
            </div>
          ) : (
            <>
              <label className={classes.lableDesign}> What is your budget?</label>
              <div className={classes.PopUpText}>
                Budget is the amount which you are ready to pay for the
                requirement.
              </div>
              <div className={classes.budgetContainer}>
                <div className={classes.inputArea}>
               
                <div className={classes.curencySymbol}>₹</div>
                  <input
                    type="text"
                    placeHolder={"Eg. 2500"}
                    value={budget}
                    className={classes.inputAreaBudget}
                    onChange={(e) =>
                      setBudget(
                        isNaN(parseInt(e.target.value)) ? "" : e.target.value
                      )
                    }
                  />
                
              
                </div>
                <select
                  className={classes.inputArea_dropdown}
                  onChange={(e) => setBudgetUnit(e.target.value)}
                  value={budgetUnit}
                >
               
               <option>Total</option>
                
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>On Maturity</option>
                  
                </select>
              </div>
              <div className={classes.error_message}>{error.budget}</div>
              <div className={classes.input_fields}>
                <label className={classes.label}>Add Ons-</label>
              </div>
              {addonData.map((item, i) => {
                return (
                  <div className={classes.CheckboxStyle}>
                    <div className={classes.AddonCardConatiner}>
                      <div className={classes.CheckBoxInput}>
                        <input
                          type="checkbox"
                          className={classes.CheckBoxInputBox}
                          onClick={() =>
                            UpdateAddOn(
                              item.AddonName,
                              Math.round(parseInt(item.AddonAmount)),
                              item.AddonID
                            )
                          }
                          checked={addOn.includes(item.AddonName)}
                        />

                        <div className={classes.CheckBoxInput_Text}>
                          {item.AddonName === "Urgent"
                            ? "Urgent"
                            : item.AddonName}
                        </div>
                      </div>
                      <div className={classes.CheckBox_Text}>
                        {item.AddonDescription}
                      </div>
                    </div>
                    <div className={classes.CheckBox_RightText}>
                      {item.AddonAmount === "0" ? (
                        "Free"
                      ) : (
                        <>₹ {Math.round(parseInt(item.AddonAmount))}</>
                      )}{" "}
                    </div>
                  </div>
                );
              })}
              <div className={classes.error_message}>{error.addOn}</div>
              <div className={classes.TotalAmountText}>
                <label>
                  TOTAL :&nbsp;
                  {totalAmount}
                </label>
              </div>

              {isLoading ? (
                <div className={classes.LoadingBtn}>
                  <Loader
                    type="TailSpin"
                    color="white"
                    width={20}
                    height={18}
                  />
                </div>
              ) : (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    formValidation()
                      ? PARapi()
                      : console.log("Something's wrong");
                  }}
                >
                  {showModal ? (
                    <Step6PAR
                      onClick={() => setShowModal(false)}
                      RequirementID={RequirementID}
                    />
                  ) : (
                    <></>
                  )}
                  <ActionButton
                    buttonText={"Save & Continue"}
                    className={classes.Login_button}
                  />
                </div>
              )}
            </>
          )}
        </PostARequirementBackdropTheme>
      </React.Suspense>
    </>
  );
};

export default Step4PAR;
