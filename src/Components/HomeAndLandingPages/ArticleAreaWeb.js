import React from "react";
import NewHeadingRI from "../NewHeadingRI";
import RISkeletonLoading from "../RISkeletonLoading";
import classes from "./ArticleAreaWeb.module.css";

const ArticleAreaWeb = (props) => {

  const dateConvert = (data) => {
    var date = new Date(data);
    var newDate = date.toString()
    return newDate.substring(0, 15)
  }

  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (

          <div className={classes.ArticlesFreelancers_maindiv}>

            <NewHeadingRI firstLine="Trending Read" secondLine="on Gig Freelancer and Remote Working" />
            <div>
            {props.loading ?
              <RISkeletonLoading loadingType={"ArticleAreaWeb"} />
              :

              <div className={classes.ArticlesFreelancers_Display_Web}>
                {props.articleCard.slice(0, 6).map((item, i) => (
                  <div key={item.key} className={classes.ArticlesFreelancers_Container_Web}  >
                    <a href={process.env.PUBLIC_URL + "/articlesRozgaar/" + item.ArticleId} className={classes.Anchor_Tag}>
                      <div className={classes.imageAndArticleText_Mob}>
                        {!item.ArticleImage.ArticleImage ? <div className={classes.noImageTag}>  </div> : <img
                          src={process.env.PUBLIC_URL + item.ArticleImage.ArticleImage}
                          alt={item.Title && item.Title.split(" ").join("_") + "_" + "Rozgaar"}
                          loading="lazy"
                          title={item.Title && item.Title.split(' ').join('_')}
                          className={classes.ArticlesFreelancers_image}
                          width={"120px"}
                          height={"130px"}
                        />
                        }
                        <div className={classes.articlesHeadingSubHeading}>
                          <div className={classes.subhedingArticle_Web}> {dateConvert(item.UpdatedAt)} </div>
                          <div className={classes.ArticlesFreelancers_headingBold_Web}>{item.Title}</div>


                          <div className={classes.subhedingArticle_Web}>{item.ShortDescription.substring(0, 60)}... </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
    }
            </div>
          </div>

        );

      default:
        return (
          <div className={classes.ArticlesFreelancers_maindiv}>

            <NewHeadingRI firstLine="Trending Read" secondLine="on Gig Freelancer and Remote Working" />
            {props.loading ?
              <RISkeletonLoading loadingType={"ArticleAreaWeb"} />
              :
            <div>

              <div className={classes.ArticlesFreelancers_Display_Web}>
                {props.articleCard.slice(0, 3).map((item, i) => (
                  <div key={item.key} className={classes.ArticlesFreelancers_Container_Web} >
                    <a href={process.env.PUBLIC_URL + "/articlesRozgaar/" + item.ArticleId} className={classes.Anchor_Tag}>
                      <div className={classes.imageAndArticleText_Web}>
                        {!item.ArticleImage.ArticleImage ? <div className={classes.noImageTag}>  </div> : <img
                          src={process.env.PUBLIC_URL + item.ArticleImage.ArticleImage}
                          alt={item.Title.split(' ').join('_')}
                          loading="lazy"
                          title={item.Title.split(' ').join('_')}
                          className={classes.ArticlesFreelancers_image}
                          width={"100%"}
                          height={"200px"}
                        />
                        }
                        <div >
                          <div className={classes.subhedingArticle_Web}> {dateConvert(item.UpdatedAt)} </div>
                          <div className={classes.ArticlesFreelancers_headingBold_Web}>{item.Title}</div>


                          <div className={classes.subhedingArticle_Web}>{item.ShortDescription.substring(0, 60)}... </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              <div className={classes.ArticlesFreelancers_Display_Web}>
                {props.articleCard.slice(3, 6).map((item, i) => (
                  <div key={item.key} className={classes.ArticlesFreelancers_Container_Web}  >
                    <a href={process.env.PUBLIC_URL + "/articlesRozgaar/" + item.ArticleId} className={classes.Anchor_Tag}>
                      <div className={classes.imageAndArticleText_Web}>
                        {!item.ArticleImage.ArticleImage ? <div className={classes.noImageTag}>  </div> : <img
                          src={process.env.PUBLIC_URL + item.ArticleImage.ArticleImage}
                          alt={item.Title.split(' ').join('_')}
                          loading="lazy"
                          title={item.Title.split(' ').join('_')}
                          className={classes.ArticlesFreelancers_image}
                          width={" 100%"}
                          height={"200px"}
                        />
                        }
                        <div>
                          <div className={classes.subhedingArticle_Web}> {dateConvert(item.UpdatedAt)} </div>
                          <div className={classes.ArticlesFreelancers_headingBold_Web}>{item.Title}</div>


                          <div className={classes.subhedingArticle_Web}>{item.ShortDescription.substring(0, 60)}... </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
    }
          </div>
        );
    }
  };

  return <>{MobileWebHandlerSwitch(props.device)}</>
}
export default ArticleAreaWeb;