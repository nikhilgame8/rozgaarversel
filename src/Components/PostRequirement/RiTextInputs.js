import React, { useState } from "react";
import classes from "../RITheme.module.css";
import { BsEyeSlash, BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { countryCode } from "../../JsonFiles/ContryCodes";

const RiTextInputs = (props) => {
  const [passwordShow, setPasswordShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileFocus, setMobileFocus] = useState();
  const [passwordFocus, setPasswordFocus] = useState();
  const [dropDownFocus, setDropDownFocus] = useState();
  const [flag, setFlag] = useState();
  const [searchItem, setSearchItem] = useState("India");
  const [countryDialCode, setCountryCode] = useState();
  const [countryNameFilter, setCountryNameFilter] = useState(false);
  const [date, setDate] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (item, value, flag, countryDialCode, country) => {
   
    setSearchItem(value);
    setIsOpen(false);
    setFlag(flag);
    setCountryCode(countryDialCode);
    if (props.setCountry) {
      props.setCountry(value);
    }

    if (props.setCountryObject) {
      props.setCountryObject(item);
    }
  };

  let reportaBug = [
    "General improvements",
    "Minor",
    "Major",
    "Critical",
  ];

  searchItem === undefined && setSearchItem("");

  const genderData = [
    {
      type: "Male",
    },
    {
      type: "Female",
    },
    {
      type: "Other",
    },
  ];

  let genderData1 = [
    "Hiring Assistance",
    "Signup or Login",
    "Career",
    "Bulk Hiring",
    "Partnership",
    "Advertisement",
    "Feedback",
    "Complaints",
    "I am a Freelancer",
    "Payments or Transaction",
  ];

  const DropdowonOptions = () => {
    switch (props.label || props.placeHolder) {
      case "Country":
        return (
          <>
            {props.displayData
              .filter((data) => {
                if (
                  searchItem === "" ||
                  searchItem === "India" ||
                  countryNameFilter
                ) {
                  return props.displayData;
                } else if (
                  data.name.toLowerCase().startsWith(searchItem.toLowerCase())
                ) {
                  return data.name;
                }
              })
              .map((item, index) => {
                return (
                  <>
                    <li
                      onClick={() =>
                        onOptionClicked(
                          item,
                          item.name,
                          `https://flagpedia.net/data/flags/normal/${item.code.toLowerCase()}.png`,
                          item.dial_code,
                          item.name,
                          item
                        )
                      }
                      className={classes.dropdownLi}
                      key={item}
                    >
                      <img
                        className={classes.flagImage}
                        src={`https://flagpedia.net/data/flags/normal/${item.code.toLowerCase()}.png`}
                        alt="Country_Flag_Logo"
                      />{" "}
                      {item.name}
                    </li>
                  </>
                );
              })}
          </>
        );
      case "Gender":
        return (
          <>
          <option value="">Select gender</option>
            {genderData.map((item, id) => {
              return (
                <option
                  key={item.id}
                  selected={props.defaultGender === item.type ? true : false}
                  value={item.type}
                >
                  {item.type}
                </option>
              );
            })}
          </>
        );
      case "Language":
        return (
          <>
            {!!props.displayData &&
              props.displayData.map((item, id) => {
                return <option key={item.id}>{item.name}</option>;
              })}
          </>
        );
      case "Industry":
        return (
          <>
            {!!props.displayData &&
              props.displayData.map((item, id) => {
                return (
                  <option
                    key={item.id}
                    selected={
                      props.defaultIndustry === item.name ? true : false
                    }
                    value={item.name}
                  >
                    {item.name}
                  </option>
                );
              })}
          </>
        );
      case "Select Country":
        return (
          <>
            <option value="" disabled>
              Select country
            </option>
            {!!props.displayData &&
              props.displayData.map((item, id) => {
                return (
                  <>
                    <option
                      key={item.id}
                      selected={
                        props.defaultCountry === item.name ? true : false
                      }
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  </>
                );
              })}
          </>
        );

      case "Select State":
        return (
          <>
            <option value="" disabled>
              Select state
            </option>
            {!!props.displayData &&
              props.displayData.map((item, id) => {
                return (
                  item.country_name === props.selectedCountry && (
                    <option
                      key={item.id}
                      selected={props.defaultState === item.name ? true : false}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  )
                );
              })}
          </>
        );
      case "Select City":
        return (
          <>
            <option value="" disabled>
              Select city
            </option>
            {!!props.displayData &&
              props.displayData.map((item, id) => {
                return (
                  <option
                    key={item.id}
                    selected={props.defaultCity === item.City ? true : false}
                    value={item.City}
                  >
                    {item.City}
                  </option>
                );
              })}
          </>
        );
      case "Select Bugtype":
        return (
          <>
            <option value="">Select Subject</option>
            {!!reportaBug &&
              reportaBug.map((item, id) => {
                return <option key={item}>{item}</option>;
              })}
          </>
        );
      case "Subject":
        return (
          <>

            <option value="">Select Subject</option>
            {!!genderData1 &&
              genderData1.map((item, id) => {
                return <option key={item}>{item}</option>;
              })}
          </>
        );
      default:
        break;
    }
  };

  const inputType = (type) => {
    switch (type) {
      case "SingleLineInput":
        return (
          <div className={classes.formContainer}>
            <label className={classes.lableDesign}>{props.label}</label>
            <input
              type={props.type}
              name={props.label}
              onInput={props.onInput}
              className={classes.inputArea}
              placeholder={props.placeHolder}
              maxLength={props.maxLength}
              minLength={props.minLength}
              value={props.value}
              onChange={props.onChange}
              onFocus={props.onFocus}
              onKeyPress={props.onKeyPress}
            />
          </div>
        );

      case "MultiLineInput":
        return (
          <div className={classes.formContainer}>
            <label className={classes.lableDesign}>{props.label}</label>
            <textarea
              rows="10"
              cols="30"
              name="text"
              onInput={props.onInput}
              onChange={props.onChange}
              value={props.value}
              className={classes.inputArea}
              placeholder={props.placeholder}
              maxLength={props.maxLength}
              onKeyPress={props.onKeyPress}
            />
          </div>
        );
      case "CountryDropdown":
        return (
          <div className={classes.formContainer}>
            <label className={classes.lableDesign}>{props.label}</label>
            <div onClick={props.onClick} value={props.value}>
              <div
                className={
                  dropDownFocus
                    ? classes.flagContainerFocus
                    : classes.flagContainer
                }
                onClick={()=> setCountryNameFilter(true)}
                onFocus={() => {
                  setDropDownFocus(true);
                 
                }}
                onBlur={() => {
                  setDropDownFocus(false);
                }}
              >
                <div>
                  {" "}
                  <img
                    src={
                      flag || "https://flagpedia.net/data/flags/normal/in.png"
                    }
                    className={classes.flagImage}
                    alt="Country_Flag_Logo"
                  />
                </div>
                <input
                  type="text"
                  onChange={(e) => {
                    setSearchItem(e.target.value);
                    setIsOpen(true);
                  }}
                  value={searchItem}
                  onClick={toggling}
                 
                  onInput={() => {
                    setCountryNameFilter(false);
                    props.setCountry("");
                  }}
                  className={classes.inputArea_Custom_dropdown}
                ></input>
                {isOpen ? (
                  <BsCaretUpFill
                    color="gray"
                    onClick={toggling}
                    onFocus={() => {
                      setDropDownFocus(true);
                    }}
                    onBlur={() => {
                      setDropDownFocus(false);
                    }}
                  />
                ) : (
                  <BsCaretDownFill
                    color="gray"
                    onClick={toggling}
                    onFocus={() => {
                      setDropDownFocus(true);
                    }}
                    onBlur={() => {
                      setDropDownFocus(false);
                    }}
                  />
                )}
              </div>
              {isOpen && (
                <div className={classes.contriesList}>
                  <ul className={classes.uldropdown}>{DropdowonOptions()}</ul>
                </div>
              )}
            </div>
          </div>
        );
      case "Dropdown":
        return (
          <div className={classes.formContainer}>
            <label className={classes.lableDesign}>{props.label}</label>
            <select
              onChange={props.onChange}
              className={classes.inputArea_dropdown}
              onInput={props.onInput}
              value={props.value}
            >
              {DropdowonOptions()}
            </select>
          </div>
        );

      case "password":
        return (
          <div className={classes.formContainer}>
            <label className={classes.lableDesign}>{props.label}</label>
            <div
              className={
                passwordFocus
                  ? classes.input_fields_mobile
                  : classes.input_fields
              }
            >
              <input
                type={passwordShow ? "password" : "text"}
                onFocus={() => {
                  setPasswordFocus(true);
                }}
                onInput={props.onInput}
                onBlur={() => {
                  setPasswordFocus(false);
                }}
                name={props.label}
                className={classes.inputArea_withIcon}
                placeholder={props.placeHolder}
                value={props.value}
                onChange={props.onChange}
                onKeyPress={props.onKeyPress}
              />
              {passwordShow ? (
                <AiOutlineEye
                  onClick={() => setPasswordShow(!passwordShow)}
                  className={classes.eyeIcon}
                />
              ) : (
                <>
                  <BsEyeSlash
                    onClick={() => setPasswordShow(!passwordShow)}
                    className={classes.eyeIcon}
                  />
                </>
              )}
            </div>
          </div>
        );
      case "mobile":
        return (
          <div className={classes.formContainer}>
            <div className={classes.labelWithCheckBox}>
              <label className={classes.lableDesign}>{props.label}</label>
            </div>
            <div
              className={
                mobileFocus ? classes.input_fields_mobile : classes.input_fields
              }
            >
              <div className={classes.mobileWrapper}>
                <div className={classes.dialCode}>{props.dialCode}</div>
                <input
                  type={"tel"}
                  onFocus={() => {
                    setMobileFocus(true);
                  }}
                  onBlur={() => {
                    setMobileFocus(false);
                  }}
                  onInput={props.onInput}
                  name={props.label}
                  className={classes.inputArea_withIcon}
                  placeholder={props.placeHolder}
                  value={props.value}
                  maxLength={props.maxLength}
                  minLength={props.minLength}
                  onChange={props.onChange}
                  onKeyPress={props.onKeyPress}
                />
              </div>
              {props.checkMObileVal ? (
                <AiFillCheckCircle className={classes.tickIcon} />
              ) : (
                ""
              )}
              {props.checkWhatsAppMObile ? (
                <AiFillCheckCircle className={classes.tickIcon} />
              ) : (
                ""
              )}
              {props.checkAlternateMobile ? (
                <AiFillCheckCircle className={classes.tickIcon} />
              ) : (
                ""
              )}
              {props.button}
            </div>
          </div>
        );
      case "mobileWithDropdown":
        return (
          <div className={classes.formContainer}>
            <div className={classes.labelWithCheckBox}>
              <label className={classes.lableDesign}>{props.label}</label>
            </div>
            <div
              className={
                mobileFocus ? classes.input_fields_mobile : classes.input_fields
              }
            >
              <div className={classes.mobileWrapper}>
                <select
                  value={props.dialCodeValue}
                  className={classes.dialCode}
                  onChange={props.onDialCodechange}
                >
                  {!!countryCode &&
                    countryCode.map((item, id) => {
                      return (
                        <option key={item.id} value={item.dial_code}>
                          {item.dial_code}
                        </option>
                      );
                    })}
                </select>

                <input
                  type={"text"}
                  onFocus={() => {
                    setMobileFocus(true);
                  }}
                  onBlur={() => {
                    setMobileFocus(false);
                  }}
                  onInput={props.onInput}
                  name={props.label}
                  className={classes.inputArea_withIcon}
                  placeholder={props.placeHolder}
                  value={props.value}
                  maxLength={props.maxLength}
                  minLength={props.minLength}
                  onChange={props.onChange}
                  onKeyPress={props.onKeyPress}
                />
              </div>
              {props.checkMObileVal ? (
                <AiFillCheckCircle className={classes.tickIcon} />
              ) : (
                ""
              )}
              {props.checkWhatsAppMObile ? (
                <AiFillCheckCircle className={classes.tickIcon} />
              ) : (
                ""
              )}
              {props.checkAlternateMobile ? (
                <AiFillCheckCircle className={classes.tickIcon} />
              ) : (
                ""
              )}
              {props.button}
            </div>
          </div>
        );
      case "checkbox":
        return (
          <div className={classes.CheckboxStyle}>
            <div onClick={props.onClick}>
              <div className={classes.CheckBoxInput}>
                <input
                  type="checkbox"
                  onClick={props.onClick}
                  value={props.value}
                  onInput={props.onInput}
                  className={classes.checkBox_input}
                  checked={props.checked}
                  onKeyPress={props.onKeyPress}
                />
                <div className={classes.CheckBoxInput_Text}>{props.text}</div>
              </div>
              <div className={classes.CheckBox_Text}>{props.subText}</div>
            </div>
          </div>
        );
      case "radioOne":
        return (
          <div className={classes.formContainer}>
            <label>{props.label}</label>
            <div className={classes.formContainer}>
              <div className={classes.inputArea}>
                <input
                  type={"radio"}
                  name={props.label}
                  placeholder={props.placeHolder}
                  onInput={props.onInput}
                  value={props.value}
                  onChange={props.onChange}
                  onKeyPress={props.onKeyPress}
                />
                <span>{props.value}</span>{" "}
              </div>
            </div>
          </div>
        );
      case "radioTwo":
        return (
          <div className={classes.formContainer}>
            <div className={classes.inputArea}>
              <input
                type={"radio"}
                name={props.label}
                placeholder={props.placeHolder}
                onInput={props.onInput}
                value={props.value}
                onChange={props.onChange}
                onKeyPress={props.onKeyPress}
              />
              <span>{props.value}</span>{" "}
            </div>
          </div>
        );
      case "file":
        return (
          <>
            <div className={classes.formContainer}>
              <label className={classes.lableDesign}>{props.label}</label>
              <label
                className={classes.inputArea + " " + classes.form_upload_label}
                vlaue={props.value}
                for="upload"
              >
                {" "}
                <input
                  type="file"
                  id="upload"
                  accept=".png, .jpg, .jpeg"
                  onChange={props.onChange}
                  onKeyPress={props.onKeyPress}
                />
                {props.icon}
              </label>
            </div>{" "}
          </>
        );

      case "date":
        return (
          <div className={classes.formContainer}>
            <label className={classes.lableDesign}>{props.label}</label>
            <div className={classes.inputArea}>
              <input
                type={`${date ===true ? "date" : "text"}`}
                onFocus={() => setDate(true)}
                name={props.label}
                className={classes.inputAreadate}
                placeholder={props.placeHolder}
                onInput={props.onInput}
                maxLength={props.maxLength}
                minLength={props.minLength}
                value={props.value}
                onChange={props.onChange}
                onKeyPress={props.onKeyPress}
              />
            </div>
          </div>
        );
        case "JobAlertCheckBox":
          return (
            <div className={classes.JobAlertCheckBox}>
              <input
                type="checkbox"
                onClick={props.onClick}
                value={props.value}
                onInput={props.onInput}
                className={classes.CheckBoxJobAlert}
                checked={props.checked}
                onKeyPress={props.onKeyPress}
              />
              <h2 className={classes.checkLabel}>{props.value}</h2>
            </div>
          );
      default:
        console.log("Invalid Input");
        break;
    }
  };
  return <div>{inputType(props.input)}</div>;
};
export default RiTextInputs;
