import ReactGA from 'react-ga';


const googleTrackingID = "UA-109083878-3";
ReactGA.initialize(googleTrackingID);
     

     export const pageViewTracker = () =>{
       
        ReactGA.pageview(window.location.pathname + window.location.search);
  
     
        
    }

   
    
    
   