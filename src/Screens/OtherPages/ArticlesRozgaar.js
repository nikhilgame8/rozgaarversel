import React, { useEffect, useState } from "react";
import classes from "./ArticlesRozgaar.module.css";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import { FaWhatsapp } from "react-icons/fa";
import { FaGlobeAsia } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import RISkeletonLoading from "../../Components/RISkeletonLoading";


const ArticlesRozgaar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [url, setUrl] = useState(0);
  const [articleData, setArticleData] = useState([]);
  const [articleDetailData, setArticleDetailData] = useState("");
  const [banner, setBanner] = useState("");
  const [loading, setLoading] = useState(true);
  const [skeletonDefaultArr, setSkeletonDefaultArr] = useState([]);

  const { pathname } = useLocation();
  useEffect(() => {
    let arr = [];
    for (var i = 1; i <= 7; i++) {
      arr.push(i);
    }
    setSkeletonDefaultArr(arr);
  }, []);

  useEffect(() => {
    ArticleApiDataFetch();
    ArticleDetailAPiFetchData();
  }, []);

  let ArticleId = location.pathname.split("/").pop();

  const ArticleDetailAPiFetchData = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ArticleId: ArticleId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/GetSingleArticle", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200) {
          setArticleDetailData(result.data);
          setBanner(result.data.ArticleImage);
          console.log("banner", result.data.banner);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
      });
  };

  const ArticleApiDataFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "ArticleType": "Client"
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/IspublishedArticle", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200) {
          setArticleData(result.data);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
      });
  };

  let date = articleDetailData.UpdatedAt
    ? articleDetailData.UpdatedAt.slice(0, 10)
    : "";



  const refreshPage = () => {
    window.location.reload();
  };
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <div>
      <Helmet>
        
      <script> window.prerenderReady = false; </script>
        <meta charSet="utf-8" />
        <title>{articleDetailData.Title}</title>
        <meta
          name="description"
          content={articleDetailData.ShortDescription}

        />
        <link rel="canonical" href={"https://www.rozgaarindia.com/articlesRozgaar/" + ArticleId} />
        <meta property="og:title" content={articleDetailData.Title} />
        <meta property="og:description" content={articleDetailData.MetaDescription} />
        <meta property="og:image" content={banner.ArticleImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={'https://www.rozgaarindia.com/articlesRozgaar/' + ArticleId} />

        <meta property="twitter:image" content={banner.ArticleImage} />
        <meta property="twitter:title" content={articleDetailData.Title} />
        <meta property="twitter:description" content={articleDetailData.MetaDescription} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@rozgaarindia" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <script> window.prerenderReady = true; </script>
      </Helmet>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({


          }
          )
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({


          }
          )
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `${articleDetailData.Title}`,
            "image": `${banner.ArticleImage}`,
            "datePublished": `${articleDetailData.CreatedAt}`,
            "dateModified": `${articleDetailData.UpdatedAt}`,
            "url": `${"https://rozgaarindia.com" + pathname}`,
            "about": `${articleDetailData.ShortDescription}`,
            "isAccessibleForFree": "true",
            "author": {
              "@type": "Person",
              "name": "Jannat-RozgaarIndia",
              "url": `${"https://rozgaarindia.com" + pathname}`
            },
          }
          )
        }}
      />
      {loading ? (
        <div>

          <RISkeletonLoading loadingType={"ArticleRozgaar"} />

          <div className={classes.cardHeading}>Recommend Read</div>
          <div>Keep upto date with the current gig economy trends </div>
          <RISkeletonLoading loadingType={"ArticleRozgaarRecommendedRead"} />
        </div>
      ) : (
        <div>
          <div className={classes.shadowMainDiv}>
            <div className={classes.shadowDiv}>
              <div className={classes.shadowDivHeading}>
                <h1 className={classes.titleHeading}> {articleDetailData.Title}</h1>
                <div className={classes.postedDateDiv}>
                  <div className={classes.postedText}>Posted date {date}</div>
                  <div className={classes.iconDiv}>
                    <a
                      href={process.env.PUBLIC_URL + "https://facebook.com/sharer/sharer.php?u=" + url}
                      target="_blank"
                      className={classes.iconLink}
                    >
                      <GrFacebookOption />
                    </a>
                    <a
                      href={process.env.PUBLIC_URL + "https://twitter.com/intent/tweet?url=" + url}
                      target="_blank"
                      className={classes.iconLink}
                    >
                      <AiOutlineTwitter />
                    </a>
                    <a
                      href={process.env.PUBLIC_URL + "https://web.whatsapp.com/send?text=" + url}
                      target="_blank"
                      className={classes.iconLink}
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>
              </div>
              {banner !== null ? (
                <img
                  src={process.env.PUBLIC_URL + banner.ArticleImage}
                  className={classes.articleBanner}
                  alt={articleDetailData.Title && articleDetailData.Title.split(" ").join("_") + "_" + "Rozgaar"}
                  title={articleDetailData.Title && articleDetailData.Title.split(" ").join("_") + "_" + "Rozgaar"}
                  loading="lazy"
                  width={"90%"}
                  height={150}
                />
              ) : (
                ""
              )}

              <div className={classes.contentMainDiv}>

                <div dangerouslySetInnerHTML={{ __html: articleDetailData.ArticleText }} />


              </div>
            </div>
            <div className={classes.cardMainDiv}>
              <h2 className={classes.cardHeading}>Recommended Read</h2>
              <h3 className={classes.cardHeadingSub}>
                Check whats trending in freelance and remote

              </h3>
              <div className={classes.articleDiv}>
                {articleData.map((item, index) => {
                  return (
                    <div
                      className={classes.articleCard}
                      onClick={() => {
                        navigate(process.env.PUBLIC_URL + "/articlesRozgaar/" + item.ArticleId);
                        refreshPage();
                      }}
                    >
                      <div className={classes.cardImageDiv}>

                        {item.banner !== null ? (
                          <img
                            src={process.env.PUBLIC_URL + item.banner.BannerImageUrl}
                            className={classes.imageCard}
                            alt={item.Title && item.Title.split(" ").join("_") + "_" + "Rozgaar"}
                            title={item.Title && item.Title.split(" ").join("_") + "_" + "Rozgaar"}
                            loading="lazy"
                            width={"100%"}
                            height={170}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <h2 className={classes.cardHeading}>{item.Title}</h2>
                      <h3 className={classes.cardContent}>
                        {item.ShortDescription}
                      </h3>
                      <div className={classes.infoMainDiv}>
                        <div className={classes.articleCardInfoDiv}>
                          <FaGlobeAsia className={classes.icon} />
                          <div className={classes.info}>{item.Source}</div>
                        </div>
                        <div className={classes.articleCardInfoDiv}>
                          <MdWatchLater className={classes.watchIcon} />
                          <div className={classes.info}>
                            {item.UpdatedAt ? item.UpdatedAt.slice(0, 10) : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ArticlesRozgaar;
