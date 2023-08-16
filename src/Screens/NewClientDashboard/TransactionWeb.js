import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loader from "react-loader-spinner";
import { pageViewTracker } from "../../Components/GoogleTracking";

import NewClientDashboard from "./NewClientDashboard";
import NewClientDashboardMobile from "./NewClientDashboardMobile";
import classes from "./Transaction.module.css";

const TransactionWeb = (props) => {

  const [trasactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  let userID = localStorage.getItem("Client_userID");

  useEffect(() => {
    trasactionDetails();
    pageViewTracker();
  }, []);


  const trasactionDetails = async () => {
    setIsLoading(true)
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(
      {
        "ClientId": userID

      }
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(global.apiLink + "/api/client/ClientTransaction", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS") {

          setTransactions(result.data)
        } else {
          console.log("fail")
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  };



  const dateHandler = (transactionDate) => {
    let date = new Date(transactionDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return year + '-' + month + '-' + dt

  }


  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <NewClientDashboardMobile>
            <div className={classes.headingMain}>Transactions</div>
            {isLoading ? <div className={classes.loaderConatiner}>
              <Loader type="TailSpin" color="#1678f2" width={80} height={80} />
            </div> : <>
            {!trasactions ? <div className={classes.blank_Notification_div}>
              <img
                src={process.env.PUBLIC_URL + "/assets/notification/Transaction.svg"}
                className={classes.blank_Notification_img}
                alt="Transaction_Logo"
                title="Transaction_Logo"
                loading="lazy"
                width={"40%"}
                height={150}
              />

              <div className={classes.blank_Notification_text}>
                You do not have any Transaction yet
              </div>
            </div> :
              <div className={classes.mainContainer}>



                <div className={classes.mobileTableView}>
                  <table className={classes.mainTable}>
                    <tr className={classes.tableMobileAlign}>
                      <th className={classes.headingTable}>Order ID</th>
                      <th className={classes.headingTable}>Freelancer</th>
                      <th className={classes.headingTable}>Amount</th>
                      <th className={classes.headingTable}>Type</th>
                      <th className={classes.headingTable}>Created_On</th>
                      <th className={classes.headingTable}>Status</th>

                    </tr>

                    <tbody className={classes.tableMobileAlign}>

                      {trasactions && trasactions.map((item, i) => {
                        return (
                          <tr>
                            <td className={classes.headingTableText}>{item.PGOrderId}</td>
                            <td className={classes.headingTableText}>{item.FreelancerFirstName}&nbsp;{item.FreelancerLastName}</td>
                            <td className={classes.headingTableText}>{item.GrandTotal}</td>
                            <td className={classes.headingTableText}>{item.PaymentType}</td>
                            <td className={classes.headingTableText}> {dateHandler(item.UpdatedAt)}</td>
                            <td className={classes.headingTableText}>{item.PaymentStatus}</td>


                            <td>

                            </td>

                          </tr>

                        )
                      })}
                    </tbody>

                  </table>
                </div>
              </div>


            }</>}
          </NewClientDashboardMobile>
        );



      default:
        return (
          <NewClientDashboard>
            <div className={classes.headingMain}>Transactions</div>
            {isLoading ? <div className={classes.loaderConatiner}>
              <Loader type="TailSpin" color="#1678f2" width={80} height={80} />
            </div> : <>

              {!trasactions ? <div className={classes.blank_Notification_div}>
                <img
                  src={process.env.PUBLIC_URL + "/assets/notification/Transaction.svg"}
                  className={classes.blank_Notification_img}
                  alt="Transaction_Logo"
                  title="Transaction_Logo"
                  loading="lazy"
                  width={"20%"}
                  height={150}
                />

                <div className={classes.blank_Notification_text}>
                  You do not have any Transaction yet
                </div>
              </div> :
                <div className={classes.mainContainer}>
                  <table className={classes.mainTable}>
                    <tr>
                      <th className={classes.headingTable}>Order ID</th>
                      <th className={classes.headingTable}>Freelancer</th>
                      <th className={classes.headingTable}>Amount</th>
                      <th className={classes.headingTable}>Type</th>
                      <th className={classes.headingTable}>Created On</th>
                      <th className={classes.headingTable}>Status</th>

                    </tr>
                    {trasactions.map((item, i) => {
                      return (
                        <tr>
                          <td className={classes.headingTableText}>{item.PGOrderId}</td>
                          <td className={classes.headingTableText}>{item.FreelancerFirstName}&nbsp;{item.FreelancerLastName}</td>
                          <td className={classes.headingTableText}>{item.GrandTotal}</td>
                          <td className={classes.headingTableText}>{item.PaymentType}</td>
                          <td className={classes.headingTableText}> {dateHandler(item.UpdatedAt)}</td>
                          <td className={classes.headingTableText}>{item.PaymentStatus}</td>


                          <td>

                          </td>

                        </tr>

                      )
                    })}


                  </table></div>

              }</>}

          </NewClientDashboard>
        );
    }
  };

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`Transactions and Invoices | Rozgaar `}</title>
      <meta
        name="description"
        content={`Transaction History shows all payments made to the freelancers. We accept Visa, Mastercard, Credit Card, Debit Card, Netbanking, Wallets like Paytm, Google Pay, PhonePay  and more`}

      />
      <link rel="canonical" href="https://www.rozgaarindia.com/employer-workplace/my-trasaction" />
    </Helmet>

    {MobileWebHandlerSwitch(props.device)}</>;
};

export default TransactionWeb;
