import React, { useState, useEffect } from "react";
import classes from "./ArticlesRozgaarWeb.module.css";
import { AiOutlineTwitter } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import { FaWhatsapp } from "react-icons/fa";
import { FaGlobeAsia } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { useNavigate, useLocation } from "react-router";
import { pageViewTracker } from "../../Components/GoogleTracking";
import { Helmet } from "react-helmet";
import RISkeletonLoading from "../../Components/RISkeletonLoading";

const ArticlesRozgaarWeb = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const {pathname}=useLocation();
  console.log(pathname);

  const [articleDetailData, setArticleDetailData] = useState("");
  const [banner, setBanner] = useState("");
  const [articleData, setArticledata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(0)

  useEffect(() => {
    pageViewTracker()
    setUrl(window.location.href)
  }, [])

  useEffect(() => {
    ArticleDetailAPiFetchData();
    ArticleApiDataFetch();
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
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/IspublishedArticle", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200) {
          setArticledata(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };



  const refreshPage = () => {
    window.location.reload();
  };

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
        <link rel="canonical" href={"https://www.rozgaarindia.com/articlesRozgaar" +"/" + ArticleId }/>
        <meta property="og:title" content={articleDetailData.Title} />
    <meta property="og:description" content={articleDetailData.MetaDescription}/>
    <meta property="og:image" content={banner.ArticleImage} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={'https://www.rozgaarindia.com/articlesRozgaar/'+ArticleId} />

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

          <div>
            <RISkeletonLoading loadingType={"ArticleRozgaar"} />
          </div>

          <div className={classes.cardHeading}>Recommend Read</div>
          <div>Keep upto date with the current gig economy trends </div>
          <RISkeletonLoading loadingType={"ArticleRozgaarRecommendedRead"} />
        </div>
      ) : (
 <>
      <div className={classes.bannerDiv}>

      </div>
      <div className={classes.shadowMainDiv}>
        <div className={classes.shadowDiv}>
          <h1 className={classes.articleTitleMargin}>
            {" "}
            {articleDetailData.Title}
          </h1>
          <div className={classes.iconDiv}> <a href={process.env.PUBLIC_URL +"https://facebook.com/sharer/sharer.php?u=" + url} target="_blank" className={classes.iconLink}><GrFacebookOption /></a> <a href={process.env.PUBLIC_URL +"https://twitter.com/intent/tweet?url=" + url} target="_blank" className={classes.iconLink}><AiOutlineTwitter /></a>  <a href={process.env.PUBLIC_URL +"https://web.whatsapp.com/send?text=" + url} target="_blank" className={classes.iconLink}><FaWhatsapp /></a></div>


          {banner !== null ? (
            <img src={banner.ArticleImage} className={classes.articleBanner} alt={articleDetailData.Title && articleDetailData.Title.split(" ").join("_") + "_" + "Rozgaar"}
            title={articleDetailData.Title && articleDetailData.Title.split(" ").join("_") + "_" + "Rozgaar"} loading="lazy" width={"100%"} height={600}/>
          ) : (
            "No image found"
          )}

          <div className={classes.contentMainDiv}>
            <div className={classes.postedText}>Posted date {articleDetailData.UpdatedAt ? articleDetailData.UpdatedAt.slice(0, 10) : ""}</div>

            <div>{articleDetailData.AboutAuthor}</div>
            <div className={classes.shadowDivContentHeading}>

            </div>
            <div dangerouslySetInnerHTML={{ __html: articleDetailData.ArticleText }} />
          </div>
        </div>
        <h2 className={classes.recommendedArticles}>Recommended Read</h2>
        <h3 className={classes.recommendedArticlesSubHeading}>
          Keep upto date with the current gig economy trends </h3>
        <div className={classes.cardMainDiv}>
          {articleData.map((item, index) => {
            return (
              <div
                className={classes.cardInnerDiv}
                onClick={() => {
                  navigate(process.env.PUBLIC_URL +"/articlesRozgaar/" + item.ArticleId);
                  refreshPage();
                }}
              >
                <div>

                  {item.banner !== null ? (
                    <img
                      src={process.env.PUBLIC_URL +item.banner.BannerImageUrl}
                      className={classes.image}
                      alt={item.Title && item.Title.split(" ").join("_")}
                      title={item.Title && item.Title.split(" ").join("_")}
                      loading="lazy"
                      width={"100%"}
                      height={200}
                    />
                  ) : (
                    "No  image found"
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
  </>
      )}
 </div>
    
  );
};

export default ArticlesRozgaarWeb;
