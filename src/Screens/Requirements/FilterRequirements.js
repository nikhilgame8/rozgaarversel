import { useState } from "react";

import classes from "./FilterRequirements.module.css";

const FilterRequirements = () => {
  const [checkBoxSelected, setCheckBoxSelected] = useState();
  const [budgetMin, setBudgetMin] = useState();
  const [budgetMax, setBudgetMax] = useState();

  const FilterType = [
    {
      WorkType: "One Time task",

      key: "1",
    },
    {
      WorkType: "Monthly Basis",

      key: "2",
    },
    {
      WorkType: "Contract work",

      key: "3",
    },
    {
      WorkType: "Commission Based",

      key: "4",
    },
  ];

  const PriceData = [
    {
      budget: "Under $1,000",
      Key: "1",
    },
    {
      budget: "$1,000 - $5,000",
      Key: "2",
    },
    {
      budget: "$1,000 - $5,000",
      Key: "3",
    },
    {
      budget: "$4,000 - $5,000",
      Key: "4",
    },
  ];

  const workStatus = [
    {
      status: "Open",
      key: "1",
    },

    {
      status: "Close",
      key: "2",
    },
  ];
  return (
    <div className={classes.filterContainer}>
      <div className={classes.filterByHeading}> Filter by </div>

      <div className={classes.filterOptionHeadings}> Type </div>
      {FilterType.map((item, i) => {
        return (
          <div className={classes.checkBoxContainer} key={item.key}>
            <input type="checkbox" onChange={() => setCheckBoxSelected(true)} />
            <div>{item.WorkType} </div>
          </div>
        );
      })}
      <div className={classes.filterOptionHeadings}> Type </div>
      {PriceData.map((item, i) => {
        return (
          <div className={classes.checkBoxContainer} key={item.key}>
            <input type="checkbox" onChange={() => setCheckBoxSelected(true)} />
            <div>{item.budget} </div>
          </div>
        );
      })}

      <div className={classes.budgetTextInput}>
        {" "}
        <input
          type="text"
          placeholder="Min"
          className={classes.textInput}
          onChange={(e) => setBudgetMin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Max"
          className={classes.textInput}
          onChange={(e) => setBudgetMax(e.target.value)}
        />
        <div className={classes.goButton}> Go </div>
      </div>
      <div className={classes.filterOptionHeadings}> Type </div>
      {workStatus.map((item, i) => {
        return (
          <div className={classes.checkBoxContainer} key={item.key}>
            <input type="checkbox" onChange={() => setCheckBoxSelected(true)} />
            <div>{item.status} </div>
          </div>
        );
      })}
    </div>
  );
};

export default FilterRequirements;
