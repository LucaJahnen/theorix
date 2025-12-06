import { Link } from "react-router-dom"
import { AiOutlineFacebook } from "react-icons/ai"
import { FaWhatsapp } from "react-icons/fa6"
import { LiaReddit } from "react-icons/lia"

const Footer = () => {
    const shareMessage = encodeURIComponent("Try out theorix on https://theorix.netlify.app")
    return (
        <footer className="px-4 py-[10%] bg-footer mt-14 lg:grid lg:grid-cols-2 lg:py-[3%] lg:px-[10%] lg:m-auto lg:mt-14 text-foreground">
            <Link to="/" className="text-lg lg:row-start-1"><span className="text-primary-altered dark:text-primary-lighter">theo</span>rix</Link>
            <section className="lg:row-start-2">
                <h3 className="mt-6 mb-1 font-semibold text-lg">Tools</h3>
                <div className="grid grid-rows-2 grid-cols-2">
                    <Link to="/interval-quiz">Interval Quiz</Link>
                    <Link to="/chord-quiz">Chord Quiz</Link>
                    <Link to="/metronome">Metronome</Link>
                    <Link to="/musical-terms">Musical Terms</Link>
                </div>
            </section>
            <section className="lg:row-start-3">
                <h3 className="mt-6 mb-1 font-semibold text-lg">Legal Information</h3>
                <div className="grid grid-cols-2">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-of-service">Terms of Service</Link>
                </div>
            </section>
            <section className="lg:row-start-2 lg:col-start-2 lg:justify-self-end">
                <h3 className="mt-6 mb-1 font-semibold text-lg">Recommend Us</h3>
                <div className="flex flex-row gap-4 mt-1">
                    <Link to="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftheorix.netlify.ap%2F" aria-label="recommend our website using facebook">
                        <AiOutlineFacebook className="h-8 w-8" />
                    </Link>
                    <Link to={`https://api.whatsapp.com/send?text=${shareMessage}`} aria-label="recommend our website using whatsapp">
                        <FaWhatsapp className="h-8 w-8" />
                    </Link>
                    <Link to="https://www.reddit.com/submit?url=https%3A%2F%2Ftheorix.netlify.app%2F&title=theorix&type=LINK" aria-label="recommend our website using reddit">
                        <LiaReddit className="h-8 w-8" />
                    </Link>
                </div>
            </section>
            <section className="mt-5 lg:row-start-3 lg:col-start-2 lg:max-w-80 lg:justify-self-end lg:text-right">
                <p>Our website runs on your support and is not funded by ads. If you enjoy our content, please consider <Link to="https://ko-fi.com/theorix" className="underline">donating</Link>.</p>
            </section>
        </footer>
    )
}

export default Footer