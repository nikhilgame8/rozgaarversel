import React, { useState, useEffect } from "react";
import classes from "./ExploreSkillsNavbar.module.css";
import { HiOutlinePlusSm } from "react-icons/hi";
import {  useNavigate } from "react-router-dom";
import { data } from "../../AllSkills";
import AutoCompelete from "../PostRequirement/AutoCompelete";
const SkillsData = (props) => {
 
  const [relatedSkill, setRelatedSkill] = useState([]);
  const [skillList, setSkillList] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    RelatedSkill();
  }, [skillList]);

  const RelatedSkill = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");
    let skillForRelated = skillList.toString();
    var raw = JSON.stringify({
      Skill: skillForRelated,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/SkillFinder", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          setRelatedSkill(result.data);
        } else {
          console.log("fail");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const InnerPages = (step) => {
    switch (step) {
      case "TopSkills":
        return (
          <>
            <div className={classes.dflex}>
              <div>
                {data.slice(0,40).map((item, index) => {
                  return (
                    <>
                      <h3 className={classes.ItemName}
                        
                        onClick={() => 
                      navigate("/Step1PAR")
                         
                        }
                      >
                        {item.name}
                      </h3>
                    </>
                  );
                })}
              </div>
              <div>
                {data.slice(40,80).map((item, index) => {
                  return (
                    <>
                      <h3 
                        className={classes.ItemName}
                        onClick={() => 
                      navigate("/Step1PAR")
                         
                        }
                      >
                        {item.name}
                      </h3>
                    </>
                  );
                })}
              </div>
              <div>
                {data.slice(80,150).map((item, index) => {
                  return (
                    <>
                      <h3 
                        className={classes.ItemName}
                        onClick={() => 
                      navigate("/Step1PAR")
                         
                        }
                      >
                        {item.name}
                      </h3>
                    </>
                  );
                })}
              </div>
            </div>
          </>
        );

      case "AllSkills":
        return (
          <>
            <div className={classes.dflex}>
              <div className={classes.mainDiv}>
                <AutoCompelete
                  skillList={skillList}
                  setSkillList={setSkillList}
                  placeholder={"Please search your required skills"}
                  onClick={() => navigate(process.env.PUBLIC_URL +"/Step1PAR")}
                />
                <a
                href={process.env.PUBLIC_URL +"/Step1PAR"}
                className={classes.skills_Link}>
                <div>
                  {relatedSkill && skillList.length > 0 ? (
                    <div className={classes.relatedSkillContainer}>
                      {relatedSkill.map((item, i) => {
                        return (
                          <div
                            className={classes.relatedSkillBox}
                            key={i}
                            onClick={() => {
                              setSkillList([...skillList, item]);
                              window.scrollTo({ top: 300, behavior: "smooth" });
                            }}
                          >
                            <div> {item} </div>

                            <div>
                              <HiOutlinePlusSm className={classes.addIcon} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                </a>
              </div>
            </div>
          </>
        );
      default:
        break;
    }
  };
  return <div>{InnerPages(props.userType)}</div>;
};
export default SkillsData;
