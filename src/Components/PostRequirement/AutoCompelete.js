import React, { useState, useEffect, useRef } from "react";
import classes from "./AutoCompelete.module.css";
import { data } from "../../RefiningSkillsData";
import { IoClose } from "react-icons/io5";

const AutoCompelete = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionShow, setSuggestionShow] = useState(false);
  const [suggestionName, setSuggestionName] = useState([]);
  const [IsPressed] = useState(false);

  const searchContainer = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      searchContainer.current &&
      !searchContainer.current.contains(event.target)
    ) {
      setSuggestionShow(false);
    }
  };

  const keyBoardNavigation = (e) => {
    if (e.key === "Esc") {
      setSuggestionShow(false);
      setSuggestionName("");
    }
  };
  useEffect(() => {
    if (suggestionName !== "") {
      setSuggestions(
        data.filter((val, index) => {
          if (val.name && val.related_1 === suggestionName) {
            val = true;
          }
          return val.name
            ? val.name
                .toLowerCase()
                .startsWith(suggestionName.toString().toLowerCase())
            : null;
        })
      );
    } else {
      setSuggestions([]);
    }
  }, [suggestionName]);

  const seachValuehandler = (e) => {
    setSuggestionName(e.target.value);
    if (e.target.value.length > 0) {
      setSuggestionShow(true);
    }
  };

  const DeleteItem = (id) => {
    props.setSkillList((preLocation) => {
      return preLocation.filter((item, index) => {
        return index !== id;
      });
    });
  };
  const [selected, setSelected] = useState(0);
  const keydown = (e) => {
    if (e.code === "ArrowDown" && selected < suggestions.length) {
      setSelected(selected + 1);
    }
  };
  const keyup = (e) => {
    if (e.code === "ArrowUp" && selected >= 0) {
      setSelected(selected - 1);
    } else if (e.key === "Enter" && suggestionShow) {
      let item = suggestions[selected];
      props.setSkillList([...props.skillList, item.name.charAt(0).toUpperCase() + item.name.slice(1)]);
      setSuggestionName("");
      setSelected(0);
    }
  };

  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
    window.scrollTo(0, 0);
  }, [selected]);
  useEffect(() => {
    setSelected(0);
  }, [suggestionShow]);
  return (
    <div  onKeyDown={(e) => keydown(e)} onKeyUp={(e) => keyup(e)}>
      <div className={classes.mainDiv} ref={searchContainer}>
        <div className={classes.inputDiv}>
          <input
            type="search"
            name="suggestion"
            id="Search"
            placeholder={props.placeholder}
            onInput={props.onInput}
            onChange={(e) => {
              seachValuehandler(e);
            }}
            onKeyDown={(e) => {
              keyBoardNavigation(e);
            }}
            value={suggestionName}
            autoFocus={IsPressed === true ? true : false}
            className={classes.input}
            autoComplete="off"
          />
        </div>

        <div className={classes.suggestion}>
          {suggestionShow && (
            <div>
              {suggestions.map((val, index) => {
                return props.skillList.includes(val.name) ? null : (
                  <div>
                    {selected === index + 8? <div ref={scrollRef} /> : <></>}
                    <div
                
                      key={index}
                      className={`${classes.skillSuggestionList} ${
                        selected === index ? classes.dropdown_items_active : ""
                      }`}
                      onClick={() => {
                    
                        props.setSkillList([...props.skillList, val.name]);
                        setSuggestionName("");
                      }}
                    >
                      {val.name.charAt(0).toUpperCase() + val.name.slice(1)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {
        <div className={classes.tagMainDiv}>
          {props.skillList.map((item, index) => {
            return (
              <>
                {index === 0 ? (
                  <div className={classes.suggestionTagFirst} key={index}>
                     <span onClick={props.onClick}>{item.charAt(0).toUpperCase() + item.slice(1)}</span>

                    <IoClose
                      onClick={() => DeleteItem(index)}
                      className={classes.closeIcon}
                    />
                    <div className={classes.primary} onClick={props.onClick}> Primary </div>
                  </div>
                ) : (
                  <div className={classes.suggestionTag} key={index}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}

                    <IoClose
                      onClick={() => DeleteItem(index)}
                      className={classes.closeIcon}
                    />
                  </div>
                )}
              </>
            );
          })}
        </div>
      }
    </div>
  );
};

export default AutoCompelete;
