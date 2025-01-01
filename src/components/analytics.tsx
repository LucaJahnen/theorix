import { Consent } from "./CookieConsent"

export const setPreference = (preference: Consent) => {
  localStorage.setItem("preference", JSON.stringify(preference))
}

export const getPreference = () => {
  const preference = localStorage.getItem("preference")
  return preference ? JSON.parse(preference) : null
}