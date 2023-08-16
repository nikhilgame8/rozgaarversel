import React from "react";
import classes from "./RISkeletonLoading.module.css";

const RISkeletonLoading = (props) => {
  let skeletonDefaultArr = [];
  for (var i = 1; i <= 20; i++) {
    skeletonDefaultArr.push(i);
  }


  const loadingSwitch = () => {
    switch (props.loadingType) {
      case "NewRequirementCard":
        return (
          <>
            <div className={classes.webLayout}>
              {skeletonDefaultArr.slice(0, 4).map(() => {
                return (
                  <div className={classes.maincontainer}>
                    <div className={classes.displey}>
                      <div className={classes.skeletonline} style={{ height: "18px", width: "70px" }}></div>
                      <div className={classes.skeletonline} style={{ height: "18px", width: "70px" }}></div>
                      <div className={classes.skeletonline} style={{ height: "20px", width: "100px" }}></div>
                      <div className={classes.skeletonline} style={{ height: "15px", width: "100px" }}></div>
                      <div className={classes.skeletonline} style={{ height: "15px", width: "150px" }}></div>
                    </div>

                    <div className={classes.displey}>
                      <div className={classes.skeletonline} style={{ height: "18px", width: "70px" }}></div>
                      <div className={classes.skeletonline} style={{ height: "18px", width: "70px" }}></div>
                    </div>
                    <div className={classes.skeletonline} style={{ height: "18px", width: "70px" }}></div>
                  </div>
                );
              })}
            </div>
          </>
        );

      case "RecRequirementCard":
        return (
          <>
            {skeletonDefaultArr.slice(0, 4).map(() => {
              return (
                <div className={classes.container}>
                  <div className={classes.displey}>
                    <div className={classes.displey}>
                      <div className={classes.skeletonline} style={{ height: "20px", width: "70px" }} ></div>
                      <div className={classes.skeletonline} style={{ height: "20px", width: "70px" }} ></div>
                    </div>
                    <div className={classes.skeletonline} style={{ height: "20px", width: "70px" }} ></div>
                  </div>
                  <div className={classes.skeletonline} style={{ height: "20px", width: "250px" }} ></div>
                  <div className={classes.skeletonline} style={{ height: "20px", width: "150px" }} ></div>
                  <div className={classes.skeletonline} style={{ height: "20px", width: "60px" }} ></div>
                  <div className={classes.skeletonline} style={{ height: "20px", width: "70px" }} ></div>


                  <div className={classes.displey}>
                    <div className={classes.displey}>
                      <div className={classes.skeletonline} style={{ height: "20px", width: "65px" }} ></div>
                      <div className={classes.skeletonline} style={{ height: "20px", width: "65px" }} ></div>
                      <div className={classes.skeletonline} style={{ height: "20px", width: "65px" }} ></div>
                      <div className={classes.skeletonline} style={{ height: "20px", width: "65px" }} ></div>
                    </div>
                    <div className={classes.skeletonline} style={{ height: "20px", width: "65px" }} ></div>
                  </div>
                </div>
              );
            })}
          </>
        );
      case "PublicRecRequirementCard":
        return (
          <>
            {skeletonDefaultArr.slice(0, 7).map(() => {
              return (
                <div className={classes.container}>
                  <div className={classes.displey}>
                    <div
                      className={classes.skeletonline}
                      style={{ height: "20px", width: "70px" }}
                    ></div>
                    <div
                      className={classes.skeletonline}
                      style={{ height: "20px", width: "70px" }}
                    ></div>
                  </div>
                  <div
                    className={classes.skeletonline}
                    style={{ height: "25px", width: "200px" }}
                  ></div>
                  <div
                    className={classes.skeletonline}
                    style={{ height: "20px", width: "250px" }}
                  ></div>

                  <div className={classes.displey}>
                    <div
                      className={classes.skeletonline}
                      style={{ height: "20px", width: "100px" }}
                    ></div>
                    <div
                      className={classes.skeletonline}
                      style={{ height: "20px", width: "100px" }}
                    ></div>
                  </div>
                  <div className={classes.displey}>
                    <div
                      className={classes.skeletonline}
                      style={{ height: "20px", width: "95px" }}
                    ></div>
                    <div
                      className={classes.skeletonline}
                      style={{ height: "20px", width: "95px" }}
                    ></div>
                  </div>
                  <div className={classes.displey}>
                    <div
                      className={classes.skeletonline}
                      style={{ height: "20px", width: "60px" }}
                    ></div>
                    <div
                      className={classes.skeletonline}
                      style={{ height: "20px", width: "60px" }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </>
        );
      case "ArticleAreaWeb":
        return (
          <div className={classes.skeleton_article}>

            <div className={classes.flex}>
              {skeletonDefaultArr.slice(0, 3).map(() => {
                return (
                  <div className={classes.skeletonflex}>
                    <div
                      className={classes.skeletonline}
                      style={{ height: "200px", width: "200px" }}
                    ></div>
                    <div >
                      <div
                        className={classes.skeletonline}
                        style={{ height: "10px", width: "200px" }}
                      ></div>
                      <div
                        className={classes.skeletonline}
                        style={{ height: "10px", width: "200px" }}
                      ></div>
                      <div
                        className={classes.skeletonline}
                        style={{ height: "10px", width: "150px" }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={classes.flex}>
              {skeletonDefaultArr.slice(0, 3).map(() => {
                return (
                  <div className={classes.skeleton_article} >
                    <div
                      className={classes.skeletonline}
                      style={{ height: "200px", width: "200px" }}
                    ></div>

                    <div
                      className={classes.skeletonline}
                      style={{ height: "10px", width: "200px" }}
                    ></div>
                    <div
                      className={classes.skeletonline}
                      style={{ height: "10px", width: "200px" }}
                    ></div>
                    <div
                      className={classes.skeletonline}
                      style={{ height: "10px", width: "150px" }}
                    ></div>
                  </div>
                );
              })}
            </div>

          </div>
        );
      case "ApplicationDetail":
        return (
          <>
            <div className={classes.applicationdetail}>
              {skeletonDefaultArr.slice(0, 1).map(() => {
                return (
                  <div>
                    <div className={classes.skeletonline} style={{ height: "25px", width: "250px" }}></div>
                    <div className={classes.skeletonline} style={{ height: "10px", width: "100px" }}></div>
                    <div className={classes.skeletonline} style={{ height: "15px", width: "200px" }}></div>
                    <div className={classes.skeletonline} style={{ height: "15px", width: "100px" }}></div>
                  </div>
                );
              })}
            </div>

          </>
        );
      case "Matched_Freelaners":
        return (
          <>
            <div >
              {skeletonDefaultArr.slice(0, 1).map(() => {
                return (
                  <div>
                    <div className={classes.skeletonline} style={{ height: "400px", }}></div>

                  </div>
                );
              })}
            </div>

          </>
        );
      case "ProposalsList":
        return (
          <div className={classes.pageheader_margin} >

            <div className={classes.skeletonline} style={{ height: "15px", width: "200px", }}></div>
            <div className={classes.skeletonline} style={{ height: "10px", width: "500px" }}></div>

            {skeletonDefaultArr.slice(0, 4).map(() => {
              return (
                <div>
                  <div className={classes.displey_ProposalsList}>
                    <div style={{ display: "flex" }}>
                      <div className={classes.skeletonline} style={{ height: "50px", width: "50px", 'borderRadius': '50px' }}></div>
                      <div className={classes.skeletonline} style={{ height: "10px", width: "100px", margin: "10px" }}></div>
                    </div>

                    <div className={classes.skeletonline} style={{ height: "10px", width: "100px" }}></div>
                    <div className={classes.skeletonline} style={{ height: "15px", width: "200px" }}></div>
                    <div className={classes.skeletonline} style={{ height: "15px", width: "250px" }}></div>

                  </div>
                </div>
              )
            })}
          </div>
        );
      case "Payments":
        return (
          <div className={classes.pageheader_margin} >
            <div className={classes.displey}>
              <div className={classes.skeletonline} style={{ height: "25px", width: "200px" }}></div>
              <div>
                <div className={classes.skeletonline} style={{ height: "15px", width: "100px" }}></div>
                <div className={classes.skeletonline} style={{ height: "25px", width: "100px" }}></div>
              </div>
            </div>
            {skeletonDefaultArr.slice(0, 4).map(() => {
              return (
                <div style={{ borderBottom: "1px solid grey", padding: "20px" }}>
                  <div className={classes.skeletonline} style={{ height: "10px", width: "230px" }}></div>
                  <div className={classes.skeletonline} style={{ height: "10px", width: "220px" }}></div>
                  <div className={classes.skeletonline} style={{ height: "10px", width: "260px" }}></div>
                  <div className={classes.skeletonline} style={{ height: "10px", width: "230px" }}></div>
                  <div className={classes.skeletonline} style={{ height: "20px", width: "10px" }}></div>
                  <div className={classes.skeletonline} style={{ height: "10px", width: "100px" }}></div>
                </div>
              )
            })}
          </div>
        );
      case "TopFiveFreelancer":
        return (
          <>
            <div>
              {skeletonDefaultArr.slice(0, 1).map(() => {
                return (
                  <div >
                    <div className={classes.skeletonline} style={{ height: "15px", width: "200px", }}></div>
                    <div className={classes.skeletonline} style={{ height: "10px", width: "500px" }}></div>
                    <div className={classes.displey_fivefreelancer}>
                      <div>
                        <div className={classes.skeletonline} style={{ height: "50px", width: "50px", 'borderRadius': '50px' }}></div>
                        <div className={classes.skeletonline} style={{ height: "15px", width: "50px" }}></div>
                        <div className={classes.skeletonline} style={{ height: "10px", width: "50px" }}></div>
                      </div>
                      <div>
                        <div className={classes.skeletonline} style={{ height: "50px", width: "50px", 'borderRadius': '50px' }}></div>
                        <div className={classes.skeletonline} style={{ height: "15px", width: "50px" }}></div>
                        <div className={classes.skeletonline} style={{ height: "10px", width: "50px" }}></div>
                      </div>
                      <div>
                        <div className={classes.skeletonline} style={{ height: "50px", width: "50px", 'borderRadius': '50px' }}></div>
                        <div className={classes.skeletonline} style={{ height: "15px", width: "50px" }}></div>
                        <div className={classes.skeletonline} style={{ height: "10px", width: "50px" }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </>
        );
      case "AddOnRequirements":
        return (
          <>
            <div>
              {skeletonDefaultArr.slice(0, 1).map(() => {
                return (
                  <div >
                    <div className={classes.skeletonline} style={{ height: "15px", width: "100px", }}></div>
                    <div className={classes.skeletonline} style={{ height: "10px", width: "250px" }}></div>
                    <div className={classes.displey_addon}>
                      <div>
                        <div className={classes.skeletonline} style={{ height: "15px", width: "70px" }}></div>
                        <div className={classes.skeletonline} style={{ height: "10px", width: "150px" }}></div>
                        <div className={classes.skeletonline} style={{ height: "10px", width: "100px" }}></div>
                      </div>
                      <div className={classes.skeletonline} style={{ height: "50px", width: "50px", 'borderRadius': '50px' }}></div>
                    </div>
                    <div className={classes.displey_addon}>
                      <div>
                        <div className={classes.skeletonline} style={{ height: "15px", width: "70px" }}></div>
                        <div className={classes.skeletonline} style={{ height: "10px", width: "150px" }}></div>
                        <div className={classes.skeletonline} style={{ height: "10px", width: "100px" }}></div>
                      </div>
                      <div className={classes.skeletonline} style={{ height: "50px", width: "50px", 'borderRadius': '50px' }}></div>
                    </div>
                    <div className={classes.displey_addon}>
                      <div>
                        <div className={classes.skeletonline} style={{ height: "15px", width: "100px" }}></div>
                        <div className={classes.skeletonline} style={{ height: "10px", width: "200px" }}></div>
                        <div className={classes.skeletonline} style={{ height: "10px", width: "150px" }}></div>
                      </div>
                      <div className={classes.skeletonline} style={{ height: "50px", width: "50px", 'borderRadius': '50px' }}></div>
                    </div>
                    <div className={classes.displey_addon}>
                      <div>
                        <div className={classes.skeletonline} style={{ height: "15px", width: "150px" }}></div>
                        <div className={classes.skeletonline} style={{ height: "10px", width: "250px" }}></div>
                        <div className={classes.skeletonline} style={{ height: "10px", width: "200px" }}></div>
                      </div>
                      <div className={classes.skeletonline} style={{ height: "50px", width: "50px", 'borderRadius': '50px' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>

          </>
        );
      case "RequirementPageHeader":
        return (
          <>
            <div className={classes.skeleton_pageheader}>
              {skeletonDefaultArr.slice(0, 1).map(() => {
                return (
                  <div >
                    <div className={classes.skeletonline} style={{ height: "20px", width: "100px", float: "right" }}></div>
                    <div className={classes.pageheader_margin}>
                      <div className={classes.skeletonline} style={{ height: "20px", width: "200px" }}></div>
                      <div className={classes.skeletonline} style={{ height: "25px", width: "100px", float: "right" }}></div>
                      <div className={classes.skeletonline} style={{ height: "25px", width: "260px" }}></div>
                    </div>
                  </div>
                );
              })}
            </div>

          </>
        );
      case "RequirementDetailArea":
        return (
          <div className={classes.skeleton_detailarea}>
            <div
              className={classes.skeletonline}
              style={{ height: "10px", width: "100px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "15px", width: "300px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "10px", width: "100px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "10px", width: "200px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "10px", width: "100%" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "10px", width: "300px" }}
            ></div>
            <div className={classes.detail_flex}>
              <div
                className={classes.skeletonline}
                style={{ height: "20px", width: "100px" }}
              ></div>
              <div
                className={classes.skeletonline}
                style={{ height: "20px", width: "100px" }}
              ></div>
            </div>
          </div>
        );
      case "Main_Banner":
        return (
          <>
            <div>
              <div className={classes.skeletonline} style={{ height: "375px" }}></div>
            </div>
          </>
        );
      case "ArticleRozgaarRecommendedRead":
        return (
          <>
            <div className={classes.displey_rozgaar}>
              {skeletonDefaultArr.slice(0, 5).map(() => {
                return (
                  <>
                    <div className={classes.skeleton_recommended}>
                      <div
                        className={classes.skeletonline}
                        style={{ height: "150px", width: "230px" }}
                      ></div>
                      <div
                        className={classes.skeletonline}
                        style={{
                          height: "15px",
                          width: "230px",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      ></div>
                      <div
                        className={classes.skeletonline}
                        style={{
                          height: "10px",
                          width: "230px",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      ></div>
                      <div
                        className={classes.skeletonline}
                        style={{
                          height: "10px",
                          width: "230px",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      ></div>
                      <div
                        className={classes.skeletonline}
                        style={{
                          height: "10px",
                          width: "230px",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      ></div>

                      <div
                        className={classes.skeletonline}
                        style={{ height: "10px", width: "60px" }}
                      ></div>
                      <div
                        className={classes.skeletonline}
                        style={{ height: "10px", width: "60px" }}
                      ></div>
                    </div>
                  </>
                );
              })}
            </div>
          </>

        );

      case "Notifation":
        return (
          <>
            {skeletonDefaultArr.map(() => {
              return (
                <div className={classes.skeletonlineCircleCantainer}>
                  <div className={classes.skeletonlineCircle}>
                  </div>
                  <div className={classes.skeletonlineMainContainer}>
                  <div
                    className={classes.skeletonline}
                    style={{ height: "20px", width: "90%", marginTop: "14px" }}
                  ></div>
                   <div
                    className={classes.skeletonline}
                    style={{ height: "10px", width: "100px", marginTop: "14px" }}
                  ></div>
                  </div>
                </div>
              )
            })}
          </>
        );

        case "FAQ":
          return (
            <>
              {skeletonDefaultArr.slice(0,6).map(() => {
                return (
                  <div className={classes.fAQContainer}>
                   
                    <div
                      className={classes.skeletonline}
                      style={{ height: "20px", width: "90%", marginTop: "14px" }}
                    ></div>
                    <div
                      className={classes.skeletonline}
                      style={{ height: "20px", width: "20px", marginTop: "14px" }}
                    ></div>
                  
                  </div>
                )
              })}
            </>
          );

      case "ArticleRozgaar":
        return (

          <div className={classes.articleRozgaar_maindiv}>
            <div
              className={classes.skeletonline}
              style={{
                height: "20px",
                width: "100%",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "20px",
                width: "50%",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "180px", }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                marginTop: "1px",
                marginBottom: "1px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                width: "200px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>

            <div
              className={classes.skeletonline}
              style={{ height: "10px", marginBottom: "5px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",

                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",

                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "10px", marginBottom: "5px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                width: "350px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>

            <div
              className={classes.skeletonline}
              style={{ height: "20px", width: "300px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "15px", width: "200px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "10px", marginBottom: "5px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",

                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",

                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                width: "200px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "15px", width: "200px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "10px", marginBottom: "5px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",

                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                width: "200px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>

            <div
              className={classes.skeletonline}
              style={{ height: "15px", width: "200px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "10px", marginBottom: "5px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",

                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",

                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                width: "200px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>

            <div
              className={classes.skeletonline}
              style={{ height: "15px", width: "200px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "10px", marginBottom: "5px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",

                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",

                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                width: "250px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>

            <div
              className={classes.skeletonline}
              style={{ height: "15px", width: "200px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{ height: "10px", marginBottom: "5px" }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",

                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px", marginTop: "5px", marginBottom: "5px",
              }}
            ></div>
            <div
              className={classes.skeletonline}
              style={{
                height: "10px",
                width: "250px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            ></div>
          </div>
        );

      default:
        break;
    }
  };
  return <div>{loadingSwitch(props.loadingType)}</div>;
};

export default RISkeletonLoading;

