import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { setPreference, getPreference } from "../../components/analytics"
import { useState, useEffect } from "react"

export interface Consent {
    adStorage: boolean,
    analyticsStorage: boolean
}

declare global {
    interface Window {
      gtag?: (...args: any[]) => void;
      dataLayer?: any[];
    }
  }  

const CookieConsent: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [consent, setConsent] = useState<Consent>({
        adStorage: false,
        analyticsStorage: false
    })

    useEffect(() => {
        const dialog = document.getElementById("dialog") as HTMLDialogElement;
        if (dialog && !dialog.open && getPreference() === null) {
          dialog.showModal()
          setModalVisible(true)
        }
    }, [])

    const closeModal = () => {
        const dialog = document.getElementById("dialog") as HTMLDialogElement;
        if(dialog) {
            dialog.close()
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setPreference({
                    adStorage: false,
                    analyticsStorage: false
                })
            }
        }

        if (modalVisible) {
            window.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [modalVisible])

    const updateCookies = (adStorage: boolean, analyticsStorage: boolean) => {
        window.gtag?.("consent", "update", {
            ad_storage: adStorage ? "granted" : "denied",
            analytics_storage: analyticsStorage ? "granted" : "denied"
        })

        setPreference({
            adStorage: adStorage,
            analyticsStorage: analyticsStorage
        })
    }

    const deleteCookie = (name: string, path = '/', domain?: string): void => {
        document.cookie = `${name}=; Path=${path};${domain ? ` Domain=${domain};` : ''} Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Lax`
    }

    window.gtag = window.gtag || function(...args: any[]) {
        (window.dataLayer = window.dataLayer || []).push(args);
    }

    const acceptCookies = () => {
        updateCookies(true, true)

        closeModal()
    }

    const declineCookies = () => {
        deleteCookie("_ga")
        deleteCookie("_ga_Y2XQ39G767")

        updateCookies(false, false)
        closeModal()
    }
      
    const savePreferences = () => {
        if(!consent.analyticsStorage) {
            deleteCookie("_ga")
            deleteCookie("_ga_Y2XQ39G767")
        }

        updateCookies(consent.adStorage, consent.analyticsStorage)
        closeModal()
    }

    return (
        <dialog id="dialog" className="bg-background text-foreground w-[90%] lg:w-auto absolute z-[999] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] px-6 pt-5 pb-6 rounded-md">
            <h1 className="font-semibold text-3xl mb-2">This website uses cookies</h1>
            <p className="mb-5 leading-relaxed">This website uses cookies to enhance your experience. We use analytics cookies to understand how our site is used and advertising cookies to provide tailored ads and measure their effectiveness. You can manage your preferences or read more in our <Link className="underline" to="/privacy-policy">privacy policy</Link>.</p>
            <form action="#" className={`${visible ? "": "hidden"}`}>
                <section className="border-2 mb-3 py-3 px-4 rounded">
                    <label htmlFor="ad_storage" className={`cursor-pointer inline py-0 px-5 rounded-3xl relative h-0 w-0 ${consent.adStorage ? "bg-primary" : "bg-gray-400"}`}>
                        <input type="checkbox" id="ad_storage" checked={consent.adStorage} className={`cursor-pointer appearance-none w-4 h-4 bg-white rounded-[50%] absolute top-[50%] left-[2px] translate-y-[-50%] ${consent.adStorage ? "translate-x-[1.3rem]" : "translate-x-0"} transition-all duration-400 ease-in-out`} onChange={() => setConsent({ ...consent, adStorage: !consent.adStorage })} />
                    </label>
                    <h2 className="inline text-lg font-semibold ml-2">Ad Storage</h2>
                    <p>Ad storage controls the use of cookies for personalized advertising, remarketing, and conversion tracking. When enabled, these cookies allow us to show tailored ads and measure the effectiveness of campaigns. If disabled, ads will not be personalized, and tracking is limited to anonymized, aggregated data.</p>
                </section>
                <section className="border-2 mb-6 py-3 px-4 rounded">
                    <label htmlFor="analytics_storage" className={`cursor-pointer inline py-0 px-5 rounded-3xl relative h-0 w-0 ${consent.analyticsStorage ? "bg-primary" : "bg-gray-400"}`}>
                        <input type="checkbox" id="analytics_storage" checked={consent.analyticsStorage} className={`cursor-pointer appearance-none w-4 h-4 bg-white rounded-[50%] absolute top-[50%] left-[2px] translate-y-[-50%] ${consent.analyticsStorage ? "translate-x-[1.3rem]" : "translate-x-0"} transition-all duration-400 ease-in-out`} onChange={() => setConsent({ ...consent, analyticsStorage: !consent.analyticsStorage })} />
                    </label>
                    <h2 className="text-lg font-semibold ml-2 inline">Analytics Storage</h2>
                    <p>Analytics storage controls the use of cookies to track website usage and user interactions. When enabled, this helps us improve your experience by generating detailed insights into how our site is used. If disabled, only basic anonymized data will be collected to measure site performance.</p>
                </section>
            </form>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 justify-between">
                <Button className="w-full bg-primary-altered" onClick={acceptCookies}>Accept all</Button>
                <Button className={`w-full bg-primary-altered ${visible ? "hidden" : ""}`} onClick={declineCookies}>Decline all</Button>
                <Button className={`w-full ${visible ? "" : "hidden"}`} onClick={savePreferences}>Save Preferences</Button>
                <Button className="w-full" onClick={() => setVisible(!visible)} variant="secondary">{visible ? "Hide Settings" : "Settings"}</Button>
            </div>
        </dialog>
    )
}

export default CookieConsent