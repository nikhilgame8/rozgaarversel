import React, { useState, useEffect, useRef } from "react";
import classes from "./AutoSuggestionSkills.module.css";
import { data } from "../../RefiningSkillsData";

const AutoSuggestionSkills = (props) => {
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
          if (val.name && val.related_First === suggestionName) {
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

      props.setSearchSkill(
        item.name.charAt(0).toUpperCase() + item.name.slice(1)
      );
      setSuggestionName(item.name.charAt(0).toUpperCase() + item.name.slice(1));
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
    <div onKeyDown={(e) => keydown(e)} onKeyUp={(e) => keyup(e)}>
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
                return (
                  <div>
                    {selected === index + 11 ? <div ref={scrollRef} /> : <></>}
                    <div
                      key={index}
                      className={`${classes.skillSuggestionList} ${
                        selected === index ? classes.dropdown_items_active : ""
                      }`}
                      onClick={() => {
                        setSuggestionName(
                          val.name.charAt(0).toUpperCase() + val.name.slice(1)
                        );
                        props.setSearchSkill(
                          val.name.charAt(0).toUpperCase() + val.name.slice(1)
                        );

                        setSuggestionShow(false);
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
    </div>
  );
};

export default AutoSuggestionSkills;
