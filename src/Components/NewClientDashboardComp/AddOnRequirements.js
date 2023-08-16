import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../ActionButton';
import RISkeletonLoading from '../RISkeletonLoading';
import classes from './AddOnRequirements.module.css'

const AddOnRequirements = (props) => {
  const [addOn, setAddOn] = useState([]);
  const [addOnID, setAddOnID] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate()

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

  const paymentHandler = () => {
    if (totalAmount > 0) {
      openpaymentForAddon()
    } else {
      alert("No Amount selected")
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

      "RequirementID": props.RequirementID,
      "AddonIDs": (addOnID.toString())
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

          navigate("/RazorPayGateway/" + "DClientAddons/" + result.data.PGOrderId, { state: { RequirementID: props.RequirementID } });
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className={classes.mainContainer}>
      {props.isLoading ? <RISkeletonLoading loadingType={"AddOnRequirements"} /> :
<div>
      <div className={classes.mainHeading}>
        Add On
      </div>
      <div>Get more benefit with the add-on services and make hiring quicker and easier </div>

      <div className={classes.optionContainer}>
        {props.addonData && props.addonData.map((item, i) => {
          return (
            <div className={classes.addOnContainer}>
              <div className={classes.AddOnCheckBox}>
                <input type={"checkbox"} className={classes.AddOnCheckBoxInput} onClick={() => UpdateAddOn(item.AddonName, Math.round(parseInt(item.AddonAmount)), item.AddonID)} />
                <div className={classes.AddOnCheckBoxText}>
                  <div className={classes.addOnHeading}>{item.AddonName} </div>
                  <div className={classes.AddonDescription}>{item.AddonDescription} </div>
                </div>
              </div>
              <div className={classes.AddonPrice}>
                <div className={classes.AddonAmount}> ₹ {Math.round(parseInt(item.AddonAmount))}
                </div>

              </div>
            </div>
          )
        })}
        <div className={classes.totalAmount}>Total Amount:{totalAmount}</div>
        {(totalAmount > 0) && <div className={classes.payButton}><ActionButton buttonType="small" buttonText="Pay" onClick={() => paymentHandler()} /></div>}
      </div>
    </div>
}

    </div>

  )
}

export default AddOnRequirements;