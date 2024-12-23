import ReactGA from "react-ga4"
import { Consent } from "./CookieConsent"

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path })
}

export const setPreference = (preference: Consent) => {
  localStorage.setItem("preference", JSON.stringify(preference))
}

export const getPreference = () => {
  const preference = localStorage.getItem("preference")
  return preference ? JSON.parse(preference) : null
}