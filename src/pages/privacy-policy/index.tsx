import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Helmet } from "react-helmet"
import { Button } from "@/components/ui/button"


const PrivacyPolicy: React.FC = () => {
    const handleCookieUpdate = () => {
        localStorage.removeItem("preference")
        window.scrollTo(0, 0)
        window.location.reload()
    }

    return (
        <>
            <Helmet>
                <title>Privacy Policy</title>
                <meta name="description" content="This privacy policy helps you understand which information we collect and why we collect it." />
            </Helmet>
            <Navbar />
            <div className="px-4 pt-6 lg:w-[60%] lg:block lg:m-auto">
                <h1 className="text-3xl font-semibold pb-4">Privacy Policy</h1>
                <h2 className="font-semibold text-xl mb-3">I. Information on the Processing of Your Data in Accordance with Article 13 of the General Data Protection Regulation (GDPR)</h2>
                <h3 className="font-semibold text-lg mb-2">1. Controller and Data Protection Officer</h3>
                <p>The entity responsible for this website is:</p>
                <p>Luca Jahnen</p>
                <a href="mailto:help.theorix@gmail.com" className="underline">help.theorix@gmail.com</a>
                <p>You can reach the Data Protection Officer by email at:</p>
                <a href="mailto:help.theorix@gmail.com" className="underline">help.theorix@gmail.com</a>
                <h3 className="font-semibold text-lg mb-2 mt-5">2. Data Processed for Providing the Website and Creating Log Files</h3>
                <h4 className="font-semibold">a. What data is processed for what purpose?</h4>
                <p>Each time content on the website is accessed, data that may allow for identification is temporarily stored. The following data is collected:</p>
                <ul className="list-disc list-inside my-3">
                    <li>Date and time of access</li>
                    <li>IP address</li>
                    <li>Hostname of the accessing computer</li>
                    <li>Website from which the website was accessed</li>
                    <li>Websites accessed via the website</li>
                    <li>Page visited on our website</li>
                    <li>Notification of whether the retrieval was successful</li>
                    <li>Amount of data transferred</li>
                    <li>Information about the browser type and version used</li>
                    <li>Operating system</li>
                </ul>
                <p>The temporary storage of this data is necessary for the duration of the website visit to enable the delivery of the website. Additional storage in log files is used to ensure the functionality of the website and the security of our IT systems. These purposes also represent our legitimate interest in data processing.</p>
                <h4 className="font-semibold mt-3">b. On what legal basis are these data processed?</h4>
                <p>The data are processed based on Article 6(1)(f) GDPR.</p>
                <h4 className="font-semibold mt-3">c. Are there any other recipients of the personal data besides the Controller?</h4>
                <p>The website is hosted by <strong>Netlify, Inc., 512 2nd Street, Suite 200 San Francisco, CA 94107, support@netlify.com</strong>. The hosting provider receives the aforementioned data as a processor.</p>
                <h4 className="font-semibold mt-3">d. How long are the data stored?</h4>
                <p>The data are deleted as soon as they are no longer necessary for the purpose for which they were collected. For the provision of the website, this is the case when the respective session ends..</p>
                <h3 className="font-semibold text-lg mb-2 mt-5">3. Data Subject Rights</h3>
                <h4 className="font-semibold mt-3">a. Right of Access</h4>
                <p>You have the right to request information about your personal data that we process according to Article 15 GDPR.</p>
                <h4 className="font-semibold mt-3">b. Right to Object</h4>
                <p>You have the right to object to data processing on special grounds (see Section II).</p>
                <h4 className="font-semibold mt-3">c. Right to Rectification</h4>
                <p>If the data concerning you is incorrect (or no longer accurate), you can request a correction according to Article 16 GDPR. If your data is incomplete, you can request its completion.</p>
                <h4 className="font-semibold mt-3">d. Right to Erasure</h4>
                <p>You have the right to request the deletion of your personal data according to Article 17 GDPR.</p>
                <h4 className="font-semibold mt-3">e. Right to Restriction of Processing</h4>
                <p>According to Article 18 GDPR, you have the right to request the restriction of the processing of your personal data.</p>
                <h4 className="font-semibold mt-3">g. Right to Data Portability</h4>
                <p>If the conditions of Article 20(1) GDPR are met, you have the right to receive data that we process based on your consent or in fulfillment of a contract in an automated manner, either to yourself or to a third party. The collection of data for providing the website and storing log files is essential for the operation of the website. Therefore, it is not based on consent under Article 6(1)(a) GDPR or a contract under Article 6(1)(b) GDPR, but is justified under Article 6(1)(f) GDPR. Thus, the conditions of Article 20(1) GDPR are not met.</p>
                <h2 className="font-semibold text-xl mb-3 mt-5">II. Right to Object in Accordance with Article 21(1) GDPR</h2>
                <p>You have the right to object at any time, on grounds relating to your particular situation, to the processing of your personal data, which is based on Article 6(1)(f) GDPR. The Controller will then no longer process the personal data unless they can demonstrate compelling legitimate grounds for the processing which override the interests, rights, and freedoms of the data subject, or the processing is for the establishment, exercise, or defense of legal claims. The collection of data for the provision of the website and the storage of log files is essential for the operation of the website.</p>
                <h2 className="font-semibold text-xl mb-3 mt-5">Use of Google Analytics in Consent Mode</h2>
                <p>We use Google Analytics, a web analytics service provided by Google Ireland Limited ("Google"), on our website. Google Analytics enables us to analyze the use of the website and generate reports to improve our services. Data processing occurs only after your explicit consent.</p>
                <h3 className="font-semibold text-lg mb-2 mt-5">Processed Data</h3>
                <p>Google Analytics collects data such as anonymized IP addresses, device and browser information, and website interactions. These data may be transferred to servers in the United States. We have enabled IP anonymization to protect your privacy.</p>
                <h3 className="font-semibold text-lg mb-2 mt-5">Consent Mode</h3>
                <p>Data is only collected if you give your consent via our cookie settings tool. You can withdraw your consent at any time or deactivate data collection.</p>
                <Button variant="ghost" className="underline p-0 hover:bg-transparent text-base font-normal" onClick={handleCookieUpdate}>Update Cookie Settings</Button>
                <h3 className="font-semibold text-lg mb-2 mt-5">Further Information</h3>
                <p>For more information, please refer to the <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>. To prevent the collection of your data by Google Analytics, you can use <a className="underline" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">this opt-out link</a>.</p>
                <h3 className="font-semibold text-lg mb-2 mt-5">Data Transfer and Safeguards</h3>
                <p>To ensure an adequate level of data protection, we use standard contractual clauses for data transfers to Google in the United States.</p>
            </div>
            <Footer />
        </>
    )
}

export default PrivacyPolicy