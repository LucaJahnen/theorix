import { Link } from "react-router-dom"
import { AiOutlineFacebook } from "react-icons/ai"
import { FaWhatsapp } from "react-icons/fa6"
import { FaInstagram } from "react-icons/fa"

const Footer = () => {
    const shareMessage = encodeURIComponent("Try out musictutor on https://musictutor.com")
    return (
        <footer className="px-4 py-[10%] bg-footer mt-14 lg:grid lg:grid-cols-2 lg:py-[3%] lg:px-[10%] lg:m-auto lg:mt-14 text-[#f0f0f0] text-foreground">
            <Link to="/" className="text-lg lg:row-start-1 font-serif"><span className="text-primary font-sans">music</span>tutor</Link>
            <section className="lg:row-start-2">
                <h3 className="mt-5 mb-1 font-semibold text-lg">Tools</h3>
                <div className="grid grid-rows-2 grid-cols-2">
                    <Link to="/intreval-quiz">Interval Quiz</Link>
                    <Link to="/chord-quiz">Chord Quiz</Link>
                    <Link to="/metronome">Metronome</Link>
                    <Link to="/dictionary">Dictionary</Link>
                </div>
            </section>
            <section className="lg:row-start-3">
                <h3 className="mt-5 mb-1 font-semibold text-lg">Legal Information</h3>
                <div className="grid grid-rows-2 grid-cols-2">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-of-service">Terms of Service</Link>
                    <Link to="/cookies">Cookies</Link>
                </div>
            </section>
            <section className="lg:row-start-2 lg:col-start-2 lg:justify-self-end">
                <h3 className="mt-5 mb-1 font-semibold text-lg">Recommend Us</h3>
                <div className="flex flex-row gap-4 mt-1">
                    <Link to="/" aria-label="recommend our website using facebook">
                        <AiOutlineFacebook className="h-8 w-8" />
                    </Link>
                    <Link to={`https://api.whatsapp.com/send?text=${shareMessage}`} aria-label="recommend our website using whatsapp">
                        <FaWhatsapp className="h-8 w-8" />
                    </Link>
                    <Link to="/" aria-label="recommend our website using instagram">
                        <FaInstagram className="h-8 w-8" />
                    </Link>
                </div>
            </section>
            <section className="mt-5 lg:row-start-3 lg:col-start-2 lg:max-w-80 lg:justify-self-end lg:text-right">
                <p>Our website runs on your support and is not funded by ads. If you enjoy our content, please consider <Link to="https://google.com" className="underline">donating</Link>.</p>
            </section>
        </footer>
    )
}

export default Footer