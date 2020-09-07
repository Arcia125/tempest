import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router';

let analyticsInitialized = false;

const useAnalyticsPageListener = () => {
  const location = useLocation();
  useEffect(() => {
    if (process.env.REACT_APP_GA_TRACKING_ID && !analyticsInitialized) {
      ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
        debug: !!process.env.REACT_APP_GA_DEBUG,
      });
      analyticsInitialized = true;
    }
    if (analyticsInitialized) {
      ReactGA.pageview(location.pathname);
    }
  }, [location]);
};

export const useAnalytics = () => {
  useAnalyticsPageListener();
};
