import { useState } from "react";
import ActionButton from "./ActionButton";
import classes from "./RIDropDownMenu.module.css";
import copy from "copy-to-clipboard";
import SharePOst from "./NewClientDashboardComp/SharePost";
import { useNavigate } from "react-router-dom";
import CustomModalTheme from "./CustomModalTheme";

const RIDropDownMenu = (props) => {
  const [addOnID, setAddOnID] = useState([]);
  const [addOnSelected, setAddOnSelected] = useState([]);
  const [copied, setCopied] = useState(false);
  const [shareModalShow, setShareModalShow] = useState(false);
  const [closeModalShow, setCloseModalShow] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
 
  

  const statusDropDownMenuOptions =
    props.status === "Approved" || props.status === "Draft"
      ? [
        {
          key: "1",
          option: "Manage Requirement",
          icon: "A",
          onClick: "/ClientRequirementDetail/",
        },
        {
          key: "2",
          option: `${props.status === "Draft"
            ? "Edit Posting"
            : props.status === "Approved"
              ? "Close Posting"
              : ""
            }`,
          icon: "B",
          onClick: `${props.status === "Draft"
            ? "/Step1PAR/"
            : props.status === "Approved"
              ? "Close Posting"
              : ""
            }`,
        },
        {
          key: "3",
          option:  `${props.status === "Approved"
          ? "Share on Social" : ""
    }`,
          icon: "B",
          onClick: `${props.status === "Approved"
          ? "Share on Social"
          : ""
          }`,
        },
        {
          key: "4",
          option:`${props.status === "Approved"
          ? "Copy link"
          :""
          }`,
          icon: "B",
          onClick: `${props.status === "Approved"
          ? "copy"
          : ""
          }`,
        },
      ]
      :(props.status==="Closed"||props.status==="Submitted"||props.status==="Disapproved"?
      [
        {
          key: "1",
          option: "Manage Requirement",
          icon: "A",
          onClick: "/ClientRequirementDetail/",
        },
   
      ]:
      [
        {
          key: "1",
          option: "Manage Requirement",
          icon: "A",
          onClick: "/ClientRequirementDetail/",
        },
        {
          key: "2",
          option: "Share on Social",
          icon: "B",
          onClick: "Share on Social",
        },
        {
          key: "4",
          option: "Copy link",
          icon: "B",
          onClick: "copy",
        },
      ])

      const openpaymentForAddon = () => {
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
        );
        myHeaders.append("Content-Type", "application/json");
      
        var raw = JSON.stringify({
          
            "RequirementID":props.RequirementID,
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
            
             navigate("/RazorPayGateway/"+"ClientAddons/" + result.data.PGOrderId,{state:{RequirementID:props.RequirementID}});
            } else {
            
            
            }
          })
          .catch((error) => console.log("error", error));
      };
      const UrlType = (workType) => {
        if (workType === "commission") {
          return "commission";
        }
        if (workType === "monthly-basis") {
          return "monthly";
        }
        if (workType === "onetime") {
          return "one-time";
        }
    
        if (workType === "contract") {
          return "contract";
        }
      };
      const shareOnMobile = () => {
        if (navigator.share) {
          navigator
            .share({
              title: "rozgaarindia.com",
              text: " ",
              url:`https://rozgaarindia.com/freelancer-${UrlType(props.RequirementType)}-job/${props.Title.split(' ').join('-').replace(/[^a-zA-Z ]/g, "-")}/${props.RequirementID}`,
            })
            .then(() => {
              console.log("Successfully shared");
            })
            .catch((error) => {
              console.error("Something went wrong", error);
            });
        }
      };
  const ClosePost = () => {
    return (
      <CustomModalTheme onClose={() => setCloseModalShow(false)}>
         <div className={classes.btnContainer}>
        <div className={classes.closePostHeading}>
          {" "}
          Are you sure want to close this requirement?
        </div>
        <div className={classes.closePostButtonsConatiner}>
        <div className={classes.closePostButtons}>
          <ActionButton
            buttonText={"Yes"}
            buttonType={"small"}
            onClick={() => props.onClick()}
          />
          <ActionButton
            buttonText={"No"}
            buttonType={"small"}
            onClick={() => setCloseModalShow(false)}
          />
        </div>
        </div>
        </div>
      </CustomModalTheme>
    );
  };

  let navigate = useNavigate();

  const copytoClipboard = () => {
    copy(
      // `https://rozgaarindia.com/ClientRequirementDetail/${props.RequirementID}`
      `https://rozgaarindia.com/freelancer-${UrlType(props.RequirementType)}-job/${props.Title.split(' ').join('-').replace(/[^a-zA-Z ]/g, "-")}/${props.RequirementID}`
    );
    setCopied(true);
  };

  const HandleAddOn = (item) => {
  
    addOnSelected.includes(item.AddonName)
    
      ?
    
      <>    {setAddOnSelected(addOnSelected.filter((i) => i !== item.AddonName))}
        {setTotalAmount(totalAmount - Math.round(parseInt(item.AddonAmount)))}
        {   setAddOnID(addOnID.filter((i) => i !== item.AddonID))}
</>
      : <>
        {setAddOnSelected(addOnSelected.concat(item.AddonName))}
        {setTotalAmount(totalAmount + Math.round(parseInt(item.AddonAmount)))}
       {setAddOnID(addOnID.concat(item.AddonID))}
       </>;
  };
  return (
    <div className={classes.mainContainer}>
      {shareModalShow && (
        <SharePOst
          closeModal={() => setShareModalShow(false)}
          url={`https://rozgaarindia.com/freelancer-${UrlType(props.RequirementType)}-job/${props.Title.split(' ').join('-').replace(/[^a-zA-Z ]/g, "-")}/${props.RequirementID}`}
        />
      )}

      {(props.dropdownType === "Addons"
        ? props.optionData
        : statusDropDownMenuOptions
      ).map((item, i) => {
        return (
          <>

            {props.dropdownType === "Addons" ? (
              <div key={item.key} className={classes.menuOptions}>
                <input
                  name="isGoing"
                  type="checkbox"
                  checked={addOnSelected.includes(item.AddonName)}
                  onChange={() => HandleAddOn(item)}
                />
                {item.AddonName}{" "}
                <b>
                  {" "}
                  {item.AddonAmount ? "-" + "₹" + item.AddonAmount : <></>}{" "}
                </b>

              </div>

            ) : item.onClick === "Close Posting" ? (
              <>
                {closeModalShow && <ClosePost />}
                <div
                  key={item.key}
                  className={classes.menuOptions}
                  OnSharePOst={() => setShareModalShow(true)}
                  // OnSharePOst={() => shareOnMobile()}
                  onClick={() => setCloseModalShow(true)}
                >
                  {item.option}
                </div>
              </>
            ) : item.onClick === "Share on Social" ? (
              <div
                key={item.key}
                className={classes.menuOptions}
                // onClick={() => setShareModalShow(true)}
                onClick={() => props.device==="Mobile"? shareOnMobile():setShareModalShow(true)}
              >
                {item.option}
              </div>
            ) : item.onClick === "copy" ? (
              <div
                key={item.key}
                className={classes.menuOptions}
                onClick={() => copytoClipboard()}
              >
                {!copied ? item.option : "Copied!"}
              </div>
            ) : (
              <a class="linkTag" href={ process.env.PUBLIC_URL + (props.status === "Draft"? item.onClick+ props.RequirementID:item.onClick + props.RequirementID)}>
                <div key={item.key} className={classes.menuOptions}>
                  {item.option}
                </div>
              </a>
            )}
          </>
        );
      })}

      {addOnSelected.length !== 0 && props.dropdownType === "Addons"&&totalAmount>0 && (
        <>
          <div className={classes.TotalAmountText}>
            <label>
              TOTAL : &nbsp;₹ 
              {totalAmount}
            </label>
          </div>
          <div className={classes.buttonAlignment}>
            <ActionButton
              buttonText="Pay Now"
              buttonType={"small"}
              onClick={() => openpaymentForAddon()}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RIDropDownMenu;
