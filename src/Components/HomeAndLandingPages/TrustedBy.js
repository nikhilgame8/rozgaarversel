import React, { useState, useEffect } from "react";
import classes from "./TrustedBy.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const TrustedBy = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      return setWidth(window.innerWidth);
    });
  }, []);
  const PrevCarouselBtn = (props) => {
    const { style, onClick } = props;
    return (
      <div
        className={""}
        style={{
          ...style,
          display: "inline",
          position: "absolute",
          top: "10%",
          left: "0",
          color: "#fff",
          zIndex: "100",
          cursor: "pointer",
          background: "#282f39",
          padding: "10px 0px",
        }}
        onClick={onClick}
      >
        <FaAngleLeft size="30" />
      </div>
    );
  };
  const NextCarouselBtn = (props) => {
    const { style, onClick } = props;
    return (
      <div
        style={{
          ...style,
          display: "inline",
          position: "absolute",
          top: "10%",
          right: "0",
          color: "#fff",
          zIndex: "100",
          cursor: "pointer",
          background: "#282f39",
          padding: "10px 0px",
        }}
        onClick={onClick}
      >
        <FaAngleRight size="30" />
      </div>
    );
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: width > 550 ? (width > 1000 ? 5 : 5) : 3,
    prevArrow: <PrevCarouselBtn />,
    nextArrow: <NextCarouselBtn />,
  };
  const div = [
    {
      src: "/assets/TrustedCompaniesLogo/Hero_insurance_mob.svg",
      alt:"Rozgaar_TrustedBy_Hero_insurance",
      title:"Rozgaar_TrustedBy_Hero_insurance",
      loading:"lazy"
    },

    {
      src: "/assets/TrustedCompaniesLogo/hyundai_mob.svg",
      alt:"Rozgaar_TrustedBy_Hyundai",
      title:"Rozgaar_TrustedBy_Hyundai",
      loading:"lazy"
    },

    {
      src: "/assets/TrustedCompaniesLogo/digital_mob.svg",
      alt:"Rozgaar_TrustedBy_Digital",
      title:"Rozgaar_TrustedBy_Digital",
      loading:"lazy"
    },
    {
      src: "/assets/TrustedCompaniesLogo/times_mob.svg",
      alt:"Rozgaar_TrustedBy_Timesascent",
      title:"Rozgaar_TrustedBy_Timesascent",
      loading:"lazy"
    },
    {
      src: "/assets/TrustedCompaniesLogo/Amazon_mob.svg",
      alt:"Rozgaar_TrustedBy_Amazon",
      title:"Rozgaar_TrustedBy_Amazon",
      loading:"lazy"
    },
    {
      src: "/assets/TrustedCompaniesLogo/Hero_mob.svg",
      alt:"Rozgaar_TrustedBy_Hero",
      title:"Rozgaar_TrustedBy_Hero",
      loading:"lazy"
    },

    {
      src: "/assets/TrustedCompaniesLogo/Skill_india_mob.svg",
      alt:"Rozgaar_TrustedBy_Skill_India",
      title:"Rozgaar_TrustedBy_Skill_India",
      loading:"lazy"
    },
  ];
  return (
    <div className={classes.mancontainerMobile}>
      <Slider {...settings}>
        {div.map((item, index) => (
          <div key={index} className={classes.mapdivMobile}>
            <img src={process.env.PUBLIC_URL + item.src} alt={item.alt} className={classes.mob_imgMobile} width={"100px"}
            height={"60px"} title={item.title} loading={item.loading}/>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default TrustedBy;
