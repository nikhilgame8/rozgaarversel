import React, { useState, useEffect } from "react";
import TextTransition, { presets } from "react-text-transition";
import classes from "../../Components/RITheme.module.css";
const RiTextTransition = () => {
  const [index, setIndex] = useState(0);
  const TEXTS = [
    "Short Term Contract ",
    "One Off GIG",
    "Commission Based",
    "Bulk Hiring",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <div className={classes.RiTextTransition}>
      <TextTransition
        text={TEXTS[index % TEXTS.length]}
        springConfig={presets.default}
      />
    </div>
  );
};

export default RiTextTransition;
