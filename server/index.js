const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');
const fs = require('fs')
var axios = require('axios');
const default_type='Jobs';
const default_url='https://www.rozgaarindia.com'
const default_image = 'https://www.rozgaarindia.com/rozgaarFreelancer.png';
const default_title = "Freelance Jobs & Projects | Rozgaar India"
const default_description = "Post a job requirement,hire professional freelancers from India to work remotely,onsite or hybrid.Get quotes from independent short term contractors"
global.regex = /[ /%<>?:;'"`’|{},.~`!#!@()$^&*]/g;


const UrlType = (RequirementType) => {
    if (RequirementType === "commission") {
      return "commission";
    }
    if (RequirementType === "monthly-basis") {
      return "monthly";
    }
    if (RequirementType === "onetime") {
      return "one-time";
    }

    if (RequirementType === "contract") {
      return "contract";
    }
  };

const replaceDataAndSend = (request, response, params) => {
    
    const filePath = path.resolve(__dirname, '../build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log("ghjfj",err);
        } 
        console.log("thid",params?.mainTitle,  params?.title );
        data = data.replace(/\$MAIN_TITLE/g, params?.mainTitle || params?.title || default_title);
        data = data.replace(/\$MAIN_DESCRIPTION/g, params?.mainDescription || params?.description || default_description);
        data = data.replace(/\$OG_TITLE/g, params?.title || default_title);
        data = data.replace(/\$OG_DESCRIPTION/g, params?.description || default_description);
        data = data.replace(/\$OG_IMAGE/g, params?.image || default_image);
        data = data.replace(/\$OG_TYPE/g, params?.type || default_type);
        data = data.replace(/\$OG_URL/g, params?.url || default_url);

        result = data.replace(/\$OG_URL/g, params?.canonicalUrl || request.originalUrl);
        
        response.send(result);
       
    });
  
}
/* app.use((req, res, next) => {
    console.log("First middleware function !");
    return next();
  });

 */ 



app.get('/', function (request, response) {
    console.log("/Path")
    const path = require('path')
    console.log("Gey", path)
    let paramsObj = {
        title: 'Freelance Jobs & Projects | Rozgaar India',
        description: 'Post a job requirement,hire professional freelancers from India to work remotely,onsite or hybrid.Get quotes from independent short term contractors ',
      type:'website',
      url:'https://www.rozgaarindia.com'
    }
    replaceDataAndSend(request, response, paramsObj);



})

app.get('/signup', function (request, response) {
    console.log("signup")
    let paramsObj = {
        title: 'Freelance Jobs & Projects | Rozgaar India | signup',
        description: 'Post a job requirement,hire professional freelancers from India to work remotely,onsite or hybrid.Get quotes from independent short term contractors ',
        type:'website',
        url:'https://www.rozgaarindia.com/signup'
    }
    replaceDataAndSend(request, response, paramsObj);
    
})

app.get('/login', function (request, response) {
    
    let paramsObj = {
        title: 'Employer Login | Rozgaar India ',
        description: 'Find & Hire Freelancer for your professional requirement. Post your freelance job requirement for free',
        type:'website',
        url:'https://www.rozgaarindia.com/login'
    }
    replaceDataAndSend(request, response, paramsObj, );
})

app.get('/employer-workplace', function (request, response) {
    let paramsObj = {
        title: 'Employer Dashboard | Rozgaar India',
        description: 'Manage freelancers in your workplace dashboard. Receive freelancers profiles and proposals, connect via chat or call, and manage payments—all from a single dashboard.',
        type:'website',
        url:'https://www.rozgaarindia.com/employer-workplace'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/forgotpassword', function (request, response) {
    let paramsObj = {
        title: 'Reset Password with OTP | Rozgaar India',
        description: 'OTP will be sent to your registered mobile number or email address',
        type:'website',
        url:'https://www.rozgaarindia.com/ForgotPasswordPreScreen'
    }
    replaceDataAndSend(request, response, paramsObj);
})
app.get('/emailverification', function (request, response) {
    let paramsObj = {
        title: ' Verify your email | Rozgaar India ',
        description: 'Verify your rozgaar india account',
        type:'website',
        url:'https://www.rozgaarindia.com/emailverification'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/customer-support', function (request, response) {
    let paramsObj = {
        title: 'Rozgaar Customer Service and Support | Rozgaar Help',
        description: 'Visit Rozgaar help center and get support on Freelancer or Employer account creation, withdraw , payments, proposals, partnerships, complaints and feedback',
        type:'website',
        url:'https://www.rozgaarindia.com/customer-support'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/about', function (request, response) {
    let paramsObj = {
        title: 'About Us | Rozgaar',
        description: 'Our easy-to-use freelancing platform enables you to hire off-balance sheet talented freelancers in a single click with confidence and trust',
        type:'website',
        url:'https://www.rozgaarindia.com/about'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/feedback-complaint', function (request, response) {
    let paramsObj = {
        title: 'Help us improve | Rozgaar',
        description: 'Describe the issue you are facing in detail with screenshot, so our expert team can resolve in no time.',
        type:'website',
        url:'https://www.rozgaarindia.com/feedback-complaint'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/terms', function (request, response) {
    let paramsObj = {
        title: 'Terms of Service | Rozgaar India',
        description: 'This user agreement defines the terms & conditions which you accept by using our website and services.',
        type:'website',
        url:'https://www.rozgaarindia.com/terms'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/privacy-policy', function (request, response) {
    let paramsObj = {
        title: 'Privacy Policy | Rozgaar India',
        description: 'Rozgaar India is committed to respect and protect your privacy. We value you as a customer and take your personal privacy very seriously.',
        type:'website',
        url:'https://www.rozgaarindia.com/privacy-policy'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/ForgotPasswordPreScreen', function (request, response) {
    let paramsObj = {
        title: 'Reset Password | Rozgaar India',
        description: 'Forgot your rozgaar password ? Reset your rozgaar india password with email and mobile.',
        type:'website',
        url:'https://www.rozgaarindia.com/ForgotPasswordPreScreen'
    }
    replaceDataAndSend(request, response, paramsObj);
})
app.get('/loginWithOTP', function (request, response) {
    let paramsObj = {
        title: 'Login with OTP | Rozgaar India',
        description: 'Login with OTP and hire freelancer',
        type:'website',
        url:'https://www.rozgaarindia.com/loginWithOTP'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/verifyOTP', function (request, response) {
    let paramsObj = {
        title: 'Verify Your account with Mobile OTP | Rozgaar India ',
        description: 'Verify your account with OTP sent to your mobile at www.rozgaarindia.com',
        type:'website',
        url:'https://www.rozgaarindia.com/verifyOTP'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/verifyEmailOTP', function (request, response) {
    let paramsObj = {
        title: 'Verify Your account with Email OTP | Rozgaar India ',
        description: 'Verify your account with OTP sent to your email at www.rozgaarindia.com',
        type:'website',
        url:'https://www.rozgaarindia.com/verifyEmailOTP'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/how-to-hire-freelancer', function (request, response) {
    let paramsObj = {
        title: 'Learn how to hire freelancer quickly | Rozgaar India ',
        description: 'Hire Freelancers from india, indonesia, bangladesh and other countries.Fast freelancer jobs at rozgaar ',
        type:'website',
        url:'https://www.rozgaarindia.com/how-to-hire-freelancer'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/join', function (request, response) {
    let paramsObj = {
        title: 'Join | Rozgaar India',
        description: 'Join freelance jobs and projects platform.Hire freelancer globally for short or long term work. Make your remote team and save full time employee cost',
        type:'website',
        url:'https://www.rozgaarindia.com/join'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/employer-workplace/customer-support', function (request, response) {
    let paramsObj = {
        title: 'Contact us | Rozgaar',
        description: 'Rozgaar India is here to help. Send us your questions or concerns by filling the form and our expert support agents will reach out to you.',
        type:'website',
        url:'https://www.rozgaarindia.com/employer-workplace/customer-support'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/employer-workplace/How-to-hire-freelancer', function (request, response) {
    let paramsObj = {
        title: 'How to Hire best Freelancers on Rozgaar- Step-by-Step Guide',
        description: 'Post a freelance job requirement with great job description and define your budget; Find the best skilled freelancer, sign NDA, pay safe and get your job done',
        type:'website',
        url:'https://www.rozgaarindia.com/employer-workplace/How-to-hire-freelancer'
    }
    replaceDataAndSend(request, response, paramsObj);
})
app.get('/employer-faq', function (request, response) {
    let paramsObj = {
        title: 'Frequently Asked Questions about Freelance Jobs  | Rozgaar India',
        description: 'Read the Freelancer FAQ is to learn everything about Freelancing, freelance projects, remote work, contract work and gigs.',
        type:'website',
        url:'https://www.rozgaarindia.com/employer-faq'
    }
    replaceDataAndSend(request, response, paramsObj);
})
app.get('/future-of-work', function (request, response) {
    let paramsObj = {
        title: 'Freelance is The Future of Work | Rozgaar india',
        description: 'Connecting the world with talented verified freelancers faster than ever before to collaborate, and get work done in a safe and secure online environment.',
        type:'website',
        url:'https://www.rozgaarindia.com/future-of-work'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/employer-workplace/customer-support', function (request, response) {
    let paramsObj = {
        title: 'Contact us | Rozgaar',
        description: 'Rozgaar India is here to help. Send us your questions or concerns by filling the form and our expert support agents will reach out to you.',
        type:'website',
        url:'https://www.rozgaarindia.com/employer-workplace/customer-support'
    }
    replaceDataAndSend(request, response, paramsObj);
})
app.get('/skills', function (request, response) {
    let paramsObj = {
        title: 'Freelance Skills Examples | Rozgaar India',
        description: 'Top In-demand Freelance skills. Data Entry, Programmer, Website developer, App developer, Social media Expert. Customer Suport agents, Content Writers, Graphic Designers',
        type:'website',
        url:'https://www.rozgaarindia.com/skills'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/freelance-job-posting', function (request, response) {
    let paramsObj = {
        title: 'Apply on Freelance jobs |Rozgaar India',
        description: 'Apply to the latest freelance jobs and projects, hire freelancer to work remotely,onsite or hybrid on monthly, contract or one time gig. Post a job now !',
        type:'website',
        url:'https://www.rozgaarindia.com/freelance-job-posting'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/enterprise-freelancer-hiring-solution', function (request, response) {
    let paramsObj = {
        title: 'Enterprise Hiring Solution | Rozgaar',
        description: 'Remote, Onsite, Hybrid and flexible short-term contract workforce that fits your freelance hiring needs. ',
        type:'website',
        url:'https://www.rozgaarindia.com/enterprise-freelancer-hiring-solution'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/free-job-alert', function (request, response) {
    let paramsObj = {
        title: 'Free Job Alerts for freelancing, remote work, flexible work  | Rozgaar India',
        description: 'www.rozgaarindia.com Freelance job site is for Naukri, IT Jobs and 1000+ skills. Get latest job alerts in your email ',
        type:'website',
        url:'https://www.rozgaarindia.com/free-job-alert'
    }
    replaceDataAndSend(request, response, paramsObj);
})

app.get('/articlesRozgaar/:reqId', async function (request, response) {
    try {
        let ArticleId = request.params.reqId;
        var data = JSON.stringify({
            ArticleId: ArticleId,
        });

        var config = {
            method: 'post',
            url: 'https://api-preview.rozgaarindia.com/api/rozgaarapi/GetSingleArticle',
            headers: {
                'Authorization': 'Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3',
                'Content-Type': 'application/json'
            },
            data: data
        };
        await axios(config)
            .then(async function (resp) {
                if (resp.data.status_code !== 200 || !resp.data) {
                    replaceDataAndSend(request, response, {});
                    return;
                }
                let paramsObj = {
                    title: resp.data?.data?.Title,
                    description: resp.data?.data?.ShortDescription,
                    image:resp.data?.data?.ArticleImage?.ArticleImage,
                    type:'article',
                    url:'https://www.rozgaarindia.com/articlesRozgaar/'+ArticleId
                }
                replaceDataAndSend(request, response, paramsObj);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    catch (error) {
        console.log(error);
    }

    

}
);

app.get('/freelancer-:RequirementType-job/:title/:reqId', async function (request, response) {
    try {
        let RequirementId = request.params.reqId;
        var data = JSON.stringify({
            RequirementId: RequirementId,
        });

        var config = {
            method: 'post',
            url: 'https://api-preview.rozgaarindia.com/api/client/RequirementDetailPublicView',
            headers: {
                'Authorization': 'Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3',
                'Content-Type': 'application/json'
            },
            data: data
        };
        await axios(config)
            .then(async function (resp) {
                if (resp.data.status_code !== 200 || !resp.data) {
                    replaceDataAndSend(request, response, {});
                    return;
                }
                let paramsObj = {
                    title: resp.data?.data?.Title,
                    description: resp.data?.data?.Description,
                    type:'jobs',
                    url:`https://www.rozgaarindia.com/freelancer-${UrlType(resp.data?.data?.RequirementType)}-job/${resp.data?.data?.Title.replace(/[^a-zA-Z ]/g, " ").split('  ').join('-').split(" ").join('-').split("--").join("-")}/${RequirementId}`
                }
                replaceDataAndSend(request, response, paramsObj);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    catch (error) {
        console.log(error);
    }

    

}
);
app.get('/clientRequirementDetail/:reqID', async function (request, response) {
    try {
        let RequirementId = request.params.reqID;
        var data = JSON.stringify({
            RequirementId: RequirementId,
        });

        var config = {
            method: 'post',
            url: 'https://api-preview.rozgaarindia.com/api/client/RequirementDetailClientView',
            headers: {
                'Authorization': 'Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3',
                'Content-Type': 'application/json'
            },
            data: data
        };
        await axios(config)
            .then(async function (resp) {
                if (resp.data.status_code !== 200 || !resp.data) {
                    replaceDataAndSend(request, response, {});
                    return;
                }
                let paramsObj = {
                    title: resp.data?.data?.Title,
                    description: resp.data?.data?.Description,
                    type:'jobs',
                    url:'https://www.rozgaarindia.com/clientRequirementDetail/'+RequirementId
                }
                replaceDataAndSend(request, response, paramsObj);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    catch (error) {
        console.log(error);
    }

    

}
);


app.use(express.static(path.resolve(__dirname, '../build'))); 

app.get('*', function (req, res) {
    res.status(404).sendFile(path.join(__dirname,'..', 'build', 'index.html'))
   
})

app.listen(port, () => console.log(`Listening on port ${port}`));
