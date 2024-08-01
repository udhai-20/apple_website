import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import * as Sentry from "@sentry/react";
import App from './App';


Sentry.init({
  dsn: "https://cb55916d6d87dbe8700526bb41e843aa@o4507559971717120.ingest.us.sentry.io/4507560305885184",
  integrations: [
    Sentry.browserTracingIntegration(),
    // Sentry.reactRouterV6BrowserTracingIntegration({
    //   useEffect: React.useEffect,
    // }),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0, 
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0, 
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
