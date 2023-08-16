import React, { useEffect, useState } from "react";
import classes from "./CheckUserEligibility.module.css";
import {  AiOutlineCheck } from "react-icons/ai";
import { BiArrowBack, BiRupee } from "react-icons/bi";
import Loader from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { pageViewTracker } from "../../Components/GoogleTracking";

const CheckUserEligibility = (props) => {
  const navigate = useNavigate();
  const [data] = useState([]);
  const [getPARLoading, setGetPARLoading] = useState(false);
  const { userId } = useParams();
  const ClientId = userId;
  useEffect(() => {
 
    pageViewTracker();
  }, []);
  
  const requirementPamyent = () => {
   
    setGetPARLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(
      {"ClientId":(ClientId)}
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      global.apiLink + "/api/rozgaarapi/PaidRequirementPaymentInitiate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
         
         navigate("/RazorPayGateway/"+"ClientRequirement/" + result.data.PGOrderId ,{state:{RequirementID:props.RequirementID}});
        } else {
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setGetPARLoading(false);
      });
  };
  return (
    <div className={classes.PageLayoutContainer}>
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
          <div className={classes.PageLayoutHeading}>You've reached your free requirement post limit.To post this please just pay ₹ 79.</div>
            
          
          <div className={classes.PageLayoutHeadingBorder}></div>
          <div className={classes.PageLayoutSecondHeadingContainer}>
            <BiArrowBack
              size={25}
              color={"grey"}
              className={classes.aerrowBack}
              onClick={() => navigate("/")}
            />
            <div className={classes.SecondHeadingText}>
              Promote it to get more applicants
            </div>
          </div>
          <div className={classes.PageLayoutThirdContainer}>
            <div className={classes.FreeSectionPageLayout}>
              <div className={classes.FreeSectionContainer}>
                <div className={classes.FreeSectionText}>Free</div>
                <div className={classes.AmountIconText}>
                  <BiRupee /> 0
                </div>
                <div className={classes.PageLayoutHeadingBorder}></div>
               
                <div className={classes.CheckIconText}>
                  <AiOutlineCheck color={"#66ABD0"} />
                  <div className={classes.FreeSectionTextThird}>
                    Shown in search results
                  </div>
                </div>
              </div>
              <div className={classes.FreeButton}>
                <div>Select Free</div>
              </div>
            </div>
            <div className={classes.thirdSectionContainer}>
              <div className={classes.PaidHeadingFirst}>Recommended</div>
              <div className={classes.PaidHeading}>Promoted</div>
              <div>
                <div className={classes.PaidAmountIconText}>
                  <BiRupee size={20} /> 79 
                  
                </div>
                <div className={classes.PageLayoutHeadingBorder}></div>
                <div className={classes.PaidSectionPoint}>
                  
                  <div className={classes.CheckIconText}>
                    <AiOutlineCheck color={"#2066C2"} />
                    <div className={classes.PaidSectionTextThird}>
                     Increase visibility
                    </div>
                  </div>
                  <div className={classes.CheckIconText}>
                    <AiOutlineCheck color={"#2066C2"} />
                    <div className={classes.PaidSectionTextThird}>
                     More freelancers reach
                    </div>
                  </div>
                  <div className={classes.CheckIconText}>
                    <AiOutlineCheck color={"#2066C2"} />
                    <div className={classes.PaidSectionTextThird}>
                     Comes in freelancer recommendations
                    </div>
                  </div>
                  <div className={classes.CheckIconText}>
                    <AiOutlineCheck color={"#2066C2"} />
                    <div className={classes.PaidSectionTextThird}>
                      Instant alerts to freelancers
                     
                    </div>
                  </div>
                  <div className={classes.CheckIconText}>
                    <AiOutlineCheck color={"#2066C2"} />
                    <div className={classes.PaidSectionTextThird}>
                     Advanced support and assistance
                    </div>
                  </div>
                  {data.AddonName !== "" ? (
                    <div className={classes.AddOnsHeading}></div>
                  ) : (
                    <></>
                  )}
                  {data.AddonName && data.AddonName.includes("Urgent") && (
                    <div className={classes.CheckIconText}>
                      <BiRupee size={20} />0
                      <div className={classes.PaidSectionTextThird}>
                        Urgent{" "}
                      </div>
                    </div>
                  )}
                  {data.AddonName && data.AddonName.includes("Feature") && (
                    <div className={classes.CheckIconText}>
                      <BiRupee size={20} />
                      49
                      <div className={classes.PaidSectionTextThird}>
                        Feature{" "}
                      </div>
                    </div>
                  )}
                  {data.AddonName &&
                    data.AddonName.includes("Project Manager") && (
                      <div className={classes.CheckIconText}>
                        <BiRupee size={20} />
                        99
                        <div className={classes.PaidSectionTextThird}>
                          Project Manager{" "}
                        </div>
                      </div>
                    )}
                  {data.AddonName &&
                    data.AddonName.includes("Non Disclosure Agreement") && (
                      <div className={classes.CheckIconText}>
                        <BiRupee size={20} />
                        499
                        <div className={classes.PaidSectionTextThird}>
                          Non Disclosure Agreement{" "}
                        </div>
                      </div>
                    )}
                </div>
                <div className={classes.addOnAmount}>
                  <div
                    className={classes.PaidButton}
                    onClick={() => requirementPamyent()}
                  >
                   Post a Job
                  </div>
                  <div className={classes.TotalAmountText}>
                    <label>
                      TOTAL: ₹&nbsp;
                      {data.AddonAmount ?  parseInt(data.AddonAmount) + 79 : 79}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CheckUserEligibility;
