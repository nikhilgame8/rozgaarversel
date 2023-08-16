import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";

import { BsSearch } from "react-icons/bs";

import PublicRecRequirementCard from "../../Components/NewRequirement/PublicRecRequirmentCard";

import AutoSuggestionSkills from "../../Components/PublicClientRequirement/AutoSuggestionSkills";

import classes from "./PublicClientRequirementList.module.css";
import Loader from "react-loader-spinner";
import { pageViewTracker } from "../../Components/GoogleTracking";
import { AiOutlineClose, AiFillForward, AiFillBackward } from "react-icons/ai";
import RIModal from "../../Components/RIModal";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { CgChevronDoubleRight, CgChevronDoubleLeft } from "react-icons/cg"



const PublicClientRequirementList = (props) => {
  const [postArequirementDetails, setPostArequirementDetails] = useState([]);
  const [allPostArequirementDetails, setAllPostArequirementDetails] = useState(
    []
  );
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [sortBy, setSortBy] = useState(false);
  const [disable, setDisable] = useState(false);


  const [searchSkill, setSearchSkill] = useState("");
  const [recomendationSort, setRecomendationSort] = useState("");

  const [workType, setWorkType] = useState([]);
  const [workfilter, setworkFilter] = useState({
    onetime: false,
    contract: false,
    commission: false,
    monthlybasis: false,
  });
  const [freelancerPolicy, setFreelancerPolicy] = useState({
    Remote: false,
    Hybrid: false,
    OnSite: false,
  });

  const [selectedFilter, setSelectedFilter] = useState();
  const [maxLength, setMaxLength] = useState();
  const [dataCountNumber, setDataCountNumber] = useState()
  const [searchLoading, setSearchLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [getSkills, setGetSkills] = useState([])
  const [modalFilter, setModalFilter] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false)


  useEffect(() => {
    pageViewTracker()
    requirementsApi();
  }, [recomendationSort, currentPage]);

  useEffect(() => {
    workTypeFilter();


  }, [workfilter, freelancerPolicy]);

  const [height, setHeight] = useState(window.innerHeight);
  const [skill, setSkills] = useState([]);


  useEffect(() => {
    skillList();
  }, []);






  const skillList = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://api-preview.rozgaarindia.com/api/freelancerapp/rozgaarapi/AllRequirementSkill",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setSkills(result.data);
          console.log(result.data);
        } else {
        }
      })
      .catch((error) => console.log("error", error));
  };

  const FindSkillBy = (skill) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "Skill": skill
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://api-preview.rozgaarindia.com/api/freelancerapp/rozgaarapi/RequirementBySkill", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status_code === 200 && result.status === "Success") {
          filterBYskill(result.data)
        }
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    const windowHeight = () => {
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", windowHeight);

    return () => {
      window.removeEventListener("resize", windowHeight);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage])

  const requirementsApi = () => {
    setLoading(true);
    // let userID = localStorage.getItem("Client_userID");
    var myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      // UserId: userID,
      Page: currentPage,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      global.apiLink + "/api/client/RequirementListPublicView",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          setDataCountNumber(result.datacount)
          setMaxLength(Math.ceil(result.datacount / 20))
          pageLength()
          setPostArequirementDetails(result.data);
          setAllPostArequirementDetails(result.data);
          window.scrollTo(0, 0)
        } else {
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setLoading(false)
        setBtnLoader("");
      });
  };

  const NextPageBtn = () => {
    setCurrentPage(currentPage + 1)
    setBtnLoader("next")
  }

  const PrevPageBtn = () => {
    setCurrentPage(currentPage - 1)
    setBtnLoader("prev")
  }

  const LastPrevPageBtn = () => {
    setCurrentPage(1)
    setBtnLoader("lastprev")
  }

  const LastNextPageBtn = () => {
    setCurrentPage(maxLength)
    setBtnLoader("lastnext")
  }

  const SkillsSearchApi = () => {
    setSearchLoading(true)
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Skills: searchSkill,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      global.apiLink + "/api/client/SearchSkillsRequirement",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200) {
          setPostArequirementDetails(result.data);
        } else if (result.status_code === 300 && result.status === "Fail") {
          alert("Please enter valid skill");
        } else {
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setSearchLoading(false);
      })
  };
  const pageLength = () => {
    if (maxLength === currentPage) {
      setDisable(true)
    }
    else {
      setDisable(false)
    }
    return disable
  }
  const FilterType = [
    {
      WorkType: "One Time task",
      work: "onetime",
      key: "1",
    },
    {
      WorkType: "Monthly Basis",
      work: "monthly-basis",
      key: "2",
    },
    {
      WorkType: "Contract work",
      work: "contract",
      key: "3",
    },
    {
      WorkType: "Commission Based",
      work: "commission",
      key: "4",
    },
  ];

  const filterBYskill = (getSkill) => {
    let filteredData = [];
    filteredData = postArequirementDetails.filter(el => {
      return getSkill.find(element => {
        return element.RequirementID === el.RequirementID;
      });
    });
    return setGetSkills(filteredData.length > 0 ? filteredData : "noRequirement");
  }

  const filterSelectedHandler = (e, key, work) => {

    if (workType.indexOf(work) === -1) {
      workType.push(work);
    }

    if (work === "onetime" && e) {
      setGetSkills("")
      const value = workfilter;
      setworkFilter((prevState) => {
        return { ...value, onetime: true };
      });
    }
    if (work === "onetime" && !e) {
      setGetSkills("")
      const value = workfilter;
      const removeWork = workType.filter((item, i) => item !== work);
      setWorkType(removeWork);
      setworkFilter((prevState) => {
        return { ...value, onetime: false };
      });
    }

    if (work === "contract" && e) {
      setGetSkills("")
      const value = workfilter;

      setworkFilter((prevState) => {
        return { ...value, contract: true };
      });
    }
    if (work === "contract" && !e) {
      setGetSkills("")
      const value = workfilter;
      const removeWork = workType.filter((item, i) => item !== work);
      setWorkType(removeWork);
      setworkFilter((prevState) => {
        return { ...value, contract: false };
      });
    }
    if (work === "commission" && e) {
      setGetSkills("")
      setworkFilter({ ...workfilter, commission: true });
    }
    if (work === "commission" && !e) {
      setGetSkills("")
      const removeWork = workType.filter((item, i) => item !== work);
      setWorkType(removeWork);
      setworkFilter({ ...workfilter, commission: false });
    }
    if (work === "monthly-basis" && e) {
      setGetSkills("")
      setworkFilter({ ...workfilter, monthlybasis: true });
    }
    if (work === "monthly-basis" && !e) {
      setGetSkills("")
      const removeWork = workType.filter((item, i) => item !== work);
      setWorkType(removeWork);
      setworkFilter({ ...workfilter, monthlybasis: false });
    }
  };

  const workTypeFilter = () => {


    if (
      !workfilter.onetime &&
      !workfilter.contract &&
      !workfilter.commission &&
      !workfilter.monthlybasis &&
      !freelancerPolicy.Remote
    ) {
      setPostArequirementDetails(allPostArequirementDetails);
    } else {
      setPostArequirementDetails([]);
      const workPolicy = "";
      const workTypeSel = allPostArequirementDetails.filter(
        (item, i) =>
          workType.includes(item.RequirementType) ||
          workPolicy.includes(item.FreelancerPolicy)
      );

      setPostArequirementDetails((prevpostArequirementDetails) => [
        ...workTypeSel,
      ]);
    }
  };

  const AllSkills = () => {
    setGetSkills("")
    setSelectedFilter("All");

    requirementsApi();
  };

  const sortByPrice = () => {
    setGetSkills("")
    setSelectedFilter("Price");
    const DataByPrice = postArequirementDetails.sort(
      (a, b) => parseFloat(a.Budget) - parseFloat(b.Budget)
    );

    setPostArequirementDetails((prevpostArequirementDetails) => [
      ...DataByPrice,
    ]);
  };

  const sortByDate = () => {
    setGetSkills("")
    setSelectedFilter("Newest");
    const DataByDate = postArequirementDetails.sort(
      (a, b) => new Date(b.UpdatedDate) - new Date(a.UpdatedDate)
    );

    setPostArequirementDetails((prevpostArequirementDetails) => [
      ...DataByDate,
    ]);
  };

  const sortByRecommendation = () => {
    setGetSkills("")
    setSelectedFilter("Recommended");
    setRecomendationSort(!recomendationSort);
  };




  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <div className={classes.pageLayout}>

            {modal && (
              <RIModal RIModalType={"RedirectFreelancer"} onClick={() => setModal(false)} href={process.env.PUBLIC_URL + "https://freelancer.rozgaarindia.com/signup"} onHrefClick={() => setModal(false)} />

            )}
            <div className={classes.sortAndRequirmentContainer}>
              <div className={classes.searchBarContainer}>
                <div className={classes.searchInput}>
                  <AutoSuggestionSkills
                    setSearchSkill={setSearchSkill}
                    placeholder={"Search by skill"}
                  />
                </div>
                <div
                  className={classes.searchIcon}
                  onClick={() => { searchSkill === "" ? requirementsApi() : SkillsSearchApi(); setSearchSkill("") }}
                >
                  {" "}
                  <BsSearch />{" "}
                </div>
              </div>
              <div className={classes.sortAndPageContainer}>
                <div className={classes.sortHeadingFilterContainer}> <div className={classes.sortHeading} onClick={() => { setSortBy(!sortBy) }}>Sort</div>

                  <div className={classes.filterOptionHeadingsContainer}>
                    <div className={classes.filter} >


                      <img src="assets/worktypefilter.png" alt="Work_Type_Filter" title="Work_Type_Filter" loading="lazy" width={24} height={24} onClick={() => setModalFilter(true)} />
                    </div>

                  </div>
                </div>
                {sortBy &&
                  <div className={classes.sortContainer}>

                    <div
                      className={
                        selectedFilter === "All"
                          ? classes.sortOptionSelected
                          : classes.sortOptions
                      }
                      onClick={AllSkills}
                    >
                      All
                    </div>
                    <div
                      className={selectedFilter === "Newest"
                        ? classes.sortOptionSelected
                        : classes.sortOptions}
                      onClick={() => sortByDate()}
                    >
                      Newest
                    </div>
                    <div
                      className={selectedFilter === "Recommended"
                        ? classes.sortOptionSelected
                        : classes.sortOptions}
                      onClick={() => sortByRecommendation()}
                    >
                      Recommended
                    </div>
                    <div
                      className={selectedFilter === "Price"
                        ? classes.sortOptionSelected
                        : classes.sortOptions}
                      onClick={() => sortByPrice()}
                    >
                      Price
                    </div>
                  </div>}
              </div>

              {modalFilter && (
                <RIModal
                  RIModalType={"FilterMenu"}
                  modalClose={() => setModalFilter(false)}
                  FilterTypes={FilterType}
                  jobSkills={skill}
                  FindSkillBy={FindSkillBy}
                  filterSelectedHandler={filterSelectedHandler}
                />
              )}

              <h1 className={classes.pageHeading}> Find the best freelance jobs</h1>
              <h2 className={classes.pageHeadingTwo}>Browse latest jobs posted on rozgaar india or create a work profile to  <span onClick={() => setModal(true)} className={classes.joinFreelancer}>join as a freelancer </span></h2>


              <PublicRecRequirementCard
                requirementsCard={getSkills.length ? (getSkills !== "noRequirement" ? getSkills : "noRequirement") : postArequirementDetails}
                loading={loading}
                device={"Mobile"}
              />
              {/* <CreqDetail RequirementData={getSkills.length ? (getSkills !== "noRequirement" ? getSkills : "noRequirement") : postArequirementDetails}/> */}
              <div className={classes.pageCountData}>{currentPage + " " + "/" + " " + maxLength}</div>
              {(getSkills.length ? getSkills.length : postArequirementDetails.length) >= 1 ?
                <div className={classes.PaginationContainer}>
                  {currentPage !== 1 ?
                    <> <button onClick={() => LastPrevPageBtn()} className={classes.buttonone}>
                      {btnLoader == "lastprev" ? <Loader type="TailSpin" color="white" width={20} height={15} /> : <CgChevronDoubleLeft />}
                    </button></>
                    : <span className={classes.buttononePre}><CgChevronDoubleLeft /></span>}
                  {currentPage !== 1 ?
                    <> <button onClick={() => PrevPageBtn()} className={classes.buttonone}>
                      {btnLoader == "prev" ? <Loader type="TailSpin" color="white" width={20} height={15} /> : <RiArrowLeftSLine />}
                    </button></>
                    : <span className={classes.buttononePre}><RiArrowLeftSLine /></span>}
                  {currentPage !== 1 ? <span className={classes.CurrentPageTextNext}>{currentPage - 1}</span> : <></>}
                  {(getSkills.length ? getSkills.length : postArequirementDetails.length) >= 20 ? <span className={classes.CurrentPageNext} >{currentPage}</span> : <span className={classes.CurrentPageText}>{currentPage}</span>}
                  {(getSkills.length ? getSkills.length : postArequirementDetails.length) >= 20 ?
                    <>
                     {btnLoader == "next" ? <Loader type="TailSpin" color="white" width={15} height={10} className={disable ? classes.buttononeDisable : classes.buttonone}/> :
                      <button onClick={() => NextPageBtn()} className={disable ? classes.buttononeDisable : classes.buttonone}>
                        <RiArrowRightSLine />

                      </button>}
                    </>
                    : <span className={classes.buttononePre}> <RiArrowRightSLine /></span>}
                  {(getSkills.length ? getSkills.length : postArequirementDetails.length) >= 20 ?
                    <>
                      <button onClick={() => LastNextPageBtn()} className={disable ? classes.buttononeDisable : classes.buttonone}>
                        {btnLoader == "lastnext" ? <Loader type="TailSpin" color="white" width={15} height={10} /> : <CgChevronDoubleRight />}

                      </button>
                    </>
                    : <span className={classes.buttononePre}> <CgChevronDoubleRight /></span>}
                </div>
                : <></>}

            </div>
          </div>
        );

      default:
        return (
          <div className={classes.pageLayout}>

            {modal && (
              <RIModal RIModalType={"RedirectFreelancer"} onClick={() => setModal(false)} href={process.env.PUBLIC_URL + "https://freelancer.rozgaarindia.com/signup"} onHrefClick={() => setModal(false)} />
            )}
            <div className={classes.pageDivider}>


              <div style={{ height: '800px', backgroundColor: 'white', overflow: "scroll", width: '25%', padding: '20px' }} className={classes.Overflow}>
                <div className={classes.searchBarContainer}>
                  <div className={classes.searchInput}>
                    <AutoSuggestionSkills
                      setSearchSkill={setSearchSkill}
                      placeholder={"Search by skill"}
                    />
                  </div>
                  <div
                    className={classes.searchIcon}
                    onClick={() => { searchSkill === "" ? requirementsApi() : SkillsSearchApi(); setSearchSkill("") }}
                  >{searchLoading ?
                    <Loader type="TailSpin" color="white" width={20} height={18} /> :

                    <BsSearch />}
                  </div>
                </div>

                <div className={classes.sortContainer}>
                  <div className={classes.filterOptionHeadings}>Sort by</div>
                  <div
                    className={
                      selectedFilter === "All"
                        ? classes.sortOptionSelected
                        : classes.sortOptions
                    }
                    onClick={AllSkills}
                  >
                    All
                  </div>
                  <div
                    className={
                      selectedFilter === "Recommended"
                        ? classes.sortOptionSelected
                        : classes.sortOptions
                    }
                    onClick={() => sortByRecommendation()}
                  >
                    Recommended
                  </div>
                  <div
                    className={
                      selectedFilter === "Newest"
                        ? classes.sortOptionSelected
                        : classes.sortOptions
                    }
                    onClick={() => sortByDate()}
                  >
                    Newest
                  </div>
                  <div
                    className={
                      selectedFilter === "Price"
                        ? classes.sortOptionSelected
                        : classes.sortOptions
                    }
                    onClick={() => sortByPrice()}
                  >
                    Price
                  </div>
                </div>
                <div className={classes.filterOptionHeadings}>Work Type </div>
                {FilterType.map((item, i) => {
                  return (
                    <div className={classes.checkBoxContainer} key={item.key}>
                      <input
                        type="checkbox"
                        id={item.key}
                        onChange={(e) =>
                          filterSelectedHandler(
                            e.target.checked,
                            item.key,
                            item.work
                          )
                        }
                      />
                      <div className={classes.WorkTypeContainer}>{item.WorkType} </div>
                    </div>
                  );
                })}


                <div className={classes.filterOptionHeadings}>Job Skills</div>


                <div className={classes.setoverFlow}>
                  <div className={classes.tagDisplay}>
                    {skill.map((item, index) => {
                      return (
                        <div className={classes.PARBtn_Link} onClick={() => FindSkillBy(item.Skill)}>
                          {" "}
                          <h3 className={classes.skillOption} >
                            {item.Skill}
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                </div>




              </div>

              <div style={{ height: height, backgroundColor: 'white', overflow: "scroll", width: '90%', marginLeft: '10px' }} className={classes.Overflow}>
                <div className={classes.pageCountData}>{currentPage + " " + "/" + " " + maxLength}</div>
                {(getSkills.length ? getSkills.length : postArequirementDetails.length) >= 1 ? <div className={classes.PaginationContainer}>
                  {currentPage !== 1 ?
                    <> <button onClick={() => LastPrevPageBtn()} className={classes.buttonone}>
                      {btnLoader == "lastprev" ? <Loader type="TailSpin" color="white" width={20} height={15} /> : <CgChevronDoubleLeft />}
                    </button></>
                    : <span className={classes.buttononePre}><CgChevronDoubleLeft /></span>}
                  {currentPage !== 1 ?
                    <> <button onClick={() => PrevPageBtn()} className={classes.buttonone}>
                      {btnLoader == "prev" ? <Loader type="TailSpin" color="white" width={20} height={15} /> : <RiArrowLeftSLine />}
                    </button></>
                    : <span className={classes.buttononePre}><RiArrowLeftSLine /></span>}
                  {currentPage !== 1 ? <span className={classes.CurrentPageTextNext}>{currentPage - 1}</span> : <></>}
                  {(getSkills.length ? getSkills.length : postArequirementDetails.length) >= 20 ? <span className={classes.CurrentPageNext} >{currentPage}</span> : <span className={classes.CurrentPageText}>{currentPage}</span>}
                  {(getSkills.length ? getSkills.length : postArequirementDetails.length) >= 20 ?
                    <> {btnLoader == "next" ? <Loader type="TailSpin" color="white" width={15} height={10} className={disable ? classes.buttononeDisable : classes.buttonone}/> :
                      <button onClick={() => NextPageBtn()} className={disable ? classes.buttononeDisable : classes.buttonone}>
                        <RiArrowRightSLine />

                      </button>}
                    </>
                    : <span className={classes.buttononePre}> <RiArrowRightSLine /></span>}
                  {(getSkills.length ? getSkills.length : postArequirementDetails.length) >= 20 ?
                    <>
                      <button onClick={() => LastNextPageBtn()} className={disable ? classes.buttononeDisable : classes.buttonone}>
                        {btnLoader == "lastnext" ? <Loader type="TailSpin" color="white" width={15} height={10} /> : <CgChevronDoubleRight />}

                      </button>
                    </>
                    : <span className={classes.buttononePre}> <CgChevronDoubleRight /></span>}
                </div> : <></>}

                <h1 className={classes.pageHeading}> Find the best freelance jobs</h1>
                <h2 className={classes.pageHeadingTwo}>Browse latest jobs posted on rozgaar india or create a work profile to <span onClick={() => setModal(true)} className={classes.joinFreelancer}>join as a freelancer </span></h2>
                <PublicRecRequirementCard
                  requirementsCard={getSkills.length ? (getSkills !== "noRequirement" ? getSkills : "noRequirement") : postArequirementDetails}
                  loading={loading}
                />
                <div className={classes.pageCountData}>{currentPage + " " + "/" + " " + maxLength}</div>
                {(getSkills.length ? getSkills.length : postArequirementDetails.length) >= 1 ? <div className={classes.PaginationContainer}>
                  {currentPage !== 1 ?
                    <> <button onClick={() => LastPrevPageBtn()} className={classes.buttonone}>
                      {btnLoader == "lastprev" ? <Loader type="TailSpin" color="white" width={20} height={15} /> : <CgChevronDoubleLeft />}
                    </button></>
                    : <span className={classes.buttononePre}><CgChevronDoubleLeft /></span>}
                  {currentPage !== 1 ?
                    <> <button onClick={() => PrevPageBtn()} className={classes.buttonone}>
                      {btnLoader == "prev" ? <Loader type="TailSpin" color="white" width={20} height={15} /> : <RiArrowLeftSLine />}
                    </button></>
                    : <span className={classes.buttononePre}><RiArrowLeftSLine /></span>}
                  {currentPage !== 1 ? <span className={classes.CurrentPageTextNext}>{currentPage - 1}</span> : <></>}
                  {(getSkills.length ? getSkills.length : postArequirementDetails.length) >= 20 ? <span className={classes.CurrentPageNext} >{currentPage}</span> : <span className={classes.CurrentPageText}>{currentPage}</span>}
                  {(getSkills.length ? getSkills.length : postArequirementDetails.length) >= 20 ?
                    <>
                     {btnLoader == "next" ? <Loader type="TailSpin" color="white" width={15} height={10} className={disable ? classes.buttononeDisable : classes.buttonone}/> :
                      <button onClick={() => NextPageBtn()} className={disable ? classes.buttononeDisable : classes.buttonone}>
                        <RiArrowRightSLine />

                      </button>}
                    </>
                    : <span className={classes.buttononePre}> <RiArrowRightSLine /></span>}
                  {(getSkills.length ? getSkills.length : postArequirementDetails.length) >= 20 ?
                    <>
                      <button onClick={() => LastNextPageBtn()} className={disable ? classes.buttononeDisable : classes.buttonone}>
                        {btnLoader == "lastnext" ? <Loader type="TailSpin" color="white" width={15} height={10} /> : <CgChevronDoubleRight />}

                      </button>
                    </>
                    : <span className={classes.buttononePre}> <CgChevronDoubleRight /></span>}
                </div> : <></>}

              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Apply on Freelance jobs |Rozgaar India`}</title>
        <meta
          name="description"
          content={`Apply to the latest freelance jobs and projects, hire freelancer to work remotely,onsite or hybrid on monthly, contract or one time gig. Post a job now !`}

        />
        <link rel="canonical" href="https://www.rozgaarindia.com/freelance-job-posting" />
      </Helmet>
      {MobileWebHandlerSwitch(props.device)}
    </>
  );
};

export default PublicClientRequirementList;
