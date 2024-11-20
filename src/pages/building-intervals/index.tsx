import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Card from "@/components/Card"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

const BuildingIntervals = () => {
  return (
    <>
        <Helmet>
            <title>Building Intervals</title>
            <meta name="description" content="This article helps you understand intervals and offers an excercise you can try." />
        </Helmet>
        <Navbar />
        <div className="px-4 pt-6 lg:w-[60%] lg:block lg:m-auto">
            <h1 className="text-2xl font-semibold pb-6 lg:text-3xl">Building Intervals</h1>
            <p className="mb-7 leading-relaxed">When learning music theory, intervals are one of the most fundamental concepts. Intervals are the building blocks of melodies and chords, and understanding them will greatly improve your ability to read, play, and compose music. In this article, I'll explain what intervals are and how they are measured.</p>
            <h2 className="text-2xl font-semibold pb-1">What are Intervals in Music?</h2>
            <p className="mb-5 leading-relaxed">An interval is the distance between two notes. It tells you how far apart the notes are in pitch. Intervals are named according to two main factors: quality and number. These determine how the interval sounds and how far apart the notes are.</p>
            <p className="mb-7">For example, the interval between C and E is called a "major third." This name tells us both the quality (major) and the number (third), meaning that E is the third note above C in a major scale.</p>
            <h2 className="text-2xl font-semibold pb-1">Types of Intervals</h2>
            <p className="pb-4 leading-relaxed">There are different types of intervals, each with its own characteristics. Let's break them down:</p>
            <h3 className="text-xl font-semibold pb-1">Perfect Intervals</h3>
            <p className="pb-4 leading-relaxed">Perfect intervals are considered the most consonant and stable in music. These include:</p>
            <ol className="mb-8">
                <li className="before:content-['1.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Perfect Unison (P1):</span> When two notes are the same, such as C to C.</span></li>
                <li className="before:content-['2.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Perfect Fourth (P4):</span> From C to F.</span></li>
                <li className="before:content-['3.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Perfect Fifth (P5):</span> From C to G.</span></li>
                <li className="before:content-['4.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Perfect Octave (P8):</span> From C to the next higher C.</span></li>
            </ol>
            <h3 className="text-xl font-semibold pb-1">Major an Minor Intervals</h3>
            <p className="pb-4 leading-relaxed">Major intervals are one half step (semitone) larger than minor intervals. They include:</p>
            <ol className="mb-8">
                <li className="before:content-['1.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Major Second (M2):</span> From C to D.</span></li>
                <li className="before:content-['2.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Major Third (M3):</span> From C to E.</span></li>
                <li className="before:content-['3.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Major Sixth (M6):</span> From C to A.</span></li>
                <li className="before:content-['4.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Major Seventh (M7):</span> From C to B.</span></li>
            </ol>
            <p className="pb-4 leading-relaxed">Minor intervals are one half step smaller than their major counterparts:</p>
            <ol className="mb-8">
                <li className="before:content-['1.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Minor Second (m2):</span> From C to D.</span></li>
                <li className="before:content-['2.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Minor Third (m3):</span> From C to E.</span></li>
                <li className="before:content-['3.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Minor Sixth (m6):</span> From C to A.</span></li>
                <li className="before:content-['4.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Minor Seventh (m7):</span> From C to B.</span></li>
            </ol>
            <h3 className="text-xl font-semibold pb-1">Diminished and Augmented Intervals</h3>
            <p className="pb-4 leading-relaxed">These intervals are used to describe intervals that are smaller or larger than perfect or major intervals.</p>
            <ol className="mb-8">
                <li className="before:content-['1.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Augmented Intervals</span> are one half step larger than perfect or major intervals. For example, from C to G# is an Augmented Fifth (A5).</span></li>
                <li className="before:content-['2.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Diminished intervals</span> are one half step smaller than perfect or minor intervals. From C to Gb is a Diminished Fifth (d5).</span></li>
            </ol>
            <Card>
                <h2 className="text-xl font-semibold pb-2">How to measure Intervals</h2>
                <p className="mb-5 leading-relaxed">Intervals are measured by counting both the starting and ending notes, including all the notes in between. Here’s a simple way to count them:</p>
                <ol className="mb-8">
                    <li className="before:content-['1.'] before:inline-flex before:pr-3 before:font-medium mb-4 flex baseline"><span>Start with your first note (the root).</span></li>
                    <li className="before:content-['2.'] before:inline-flex before:pr-3 before:font-medium mb-4 flex baseline"><span>Count up through the musical alphabet until you reach your second note.</span></li>
                </ol>
                <p>For example, to find the interval from C to G: Start at C (1), then count D (2), E (3), F (4), and finally G (5). This gives you a "fifth."</p>
            </Card>
            <h2 className="text-xl font-semibold pb-1">Practice Tips for Mastering Intervals</h2>
            <p className="pb-4 leading-relaxed">Here are some practical ways to improve your understanding and recognition of intervals:</p>
            <ol className="mb-8">
                <li className="before:content-['1.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Interval Ear Training:</span> Use apps or online tools that play random intervals and challenge you to identify them by ear. This will sharpen your listening skills and help you internalize how each interval sounds.</span></li>
                <li className="before:content-['2.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Play Intervals on and Instrument:</span> Practice playing intervals on your instrument, whether it's a piano, guitar, or another instrument. Start with the perfect intervals, then work through the major, minor, augmented, and diminished intervals.</span></li>
            </ol>
            <h2 className="text-xl font-semibold pb-1">Conclusion</h2>
            <p className="leading-relaxed">Understanding intervals is an essentail part of music theory and allows you to learn more difficult concepts like scales or chords. To make sure you understood the concept of intervals use this <Link to="/interval-quiz" className="underline"> interval quiz</Link>. Additionally, you can have a look at this <Link to="/building-chords" className="underline">article about chords</Link>.</p>
        </div>
        <Footer />
    </>
  )
}

export default BuildingIntervals