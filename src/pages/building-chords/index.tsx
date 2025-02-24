import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import { Helmet } from "react-helmet"
import Vex from "vexflow"
const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow

const BuildingChords: React.FC = () => {
    const scoreRef = useRef<HTMLDivElement | null>(null)
    const majorRef = useRef<HTMLDivElement | null>(null)
    const minorRef = useRef<HTMLDivElement | null>(null)
    const augmentedRef = useRef<HTMLDivElement | null>(null)
    const diminishedRef = useRef<HTMLDivElement | null>(null)

    const displayChord = (ref: React.RefObject<HTMLDivElement>, notes: Vex.Flow.StaveNote[] | Vex.Flow.Tickable[]) => {
        if(ref.current && ref.current.innerHTML === "") {
            // determine stave width
            const mobileWidth = window.innerWidth - 32
            const desktopWidth = 0.3 * window.innerWidth
            // 1024 is tailwind's lg breakpoint
            const width = window.innerWidth > 1024 ? desktopWidth : mobileWidth
        
            const renderer = new Renderer(ref.current, Renderer.Backends.SVG);
            renderer.resize(width, 130);
            const context = renderer.getContext();
            const stave = new Stave(0, 0, width - 1);
        
            const voice = new Voice({ num_beats: 3, beat_value: 4 });
            voice.addTickables(notes);
        
            new Formatter().joinVoices([voice]).format([voice], width);
            stave.addClef('treble').addTimeSignature('3/4');
            stave.setContext(context).draw();
            voice.draw(context, stave);
        }
    }

    useEffect(() => {
        const exampleNotes = [
            new StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" }),
            new StaveNote({ keys: ["e/4", "g/4", "c/5"], duration: "q" }),
            new StaveNote({ keys: ["g/4", "c/5", "e/5"], duration: "q" }),
        ]
        displayChord(scoreRef, exampleNotes)

        const majorNotes = [
            new StaveNote({ keys: ["d/4", "f#/4", "a/4"], duration: "q" })
            .addModifier(new Accidental("#"), 1),
            new StaveNote({ keys: ["g/4", "b/4", "d/5"], duration: "q" }),
            new StaveNote({ keys: ["a/4", "c#/5", "e/5"], duration: "q" })
            .addModifier(new Accidental("#"), 1),
        ]
        displayChord(majorRef, majorNotes)

        const minorNotes = [
            new StaveNote({ keys: ["c/4", "eb/4", "g/4"], duration: "q" })
            .addModifier(new Accidental("b"), 1),
            new StaveNote({ keys: ["e/4", "g/4", "b/4"], duration: "q" }),
            new StaveNote({ keys: ["d/4", "f/4", "a/4"], duration: "q" }),
        ]
        displayChord(minorRef, minorNotes)

        const augmentedNotes = [
            new StaveNote({ keys: ["c/4", "e/4", "g#/4"], duration: "q" })
            .addModifier(new Accidental("#"), 2),
            new StaveNote({ keys: ["g/4", "b/4", "d#/5"], duration: "q" })
            .addModifier(new Accidental("#"), 2),
            new StaveNote({ keys: ["f/4", "a/4", "c/5"], duration: "q" })
            .addModifier(new Accidental("#"), 2)
        ]
        displayChord(augmentedRef, augmentedNotes)

        const diminishedNotes = [
            new StaveNote({ keys: ["e/4", "g/4", "bb/4"], duration: "q" })
            .addModifier(new Accidental("b"), 2),
            new StaveNote({ keys: ["g/4", "bb/4", "db/5"], duration: "q" })
            .addModifier(new Accidental("b"), 1)
            .addModifier(new Accidental("b"), 2),
            new StaveNote({ keys: ["b/4", "d/5", "f/5"], duration: "q" }),
        ]
        displayChord(diminishedRef, diminishedNotes)
    }, [])

    return (
        <>
            <Helmet>
                <title>How to identify chords</title>
                <meta name="description" content="Learn how to form and recognize chords on piano and guitar. We share useful tips to master chord theory and play with confidence!" />
                <link rel="canonical" href="https://theorix.netlify.app/chord-identification" />
            </Helmet>
            <Navbar />
            <div className="px-4 pt-6 lg:w-[60%] lg:block lg:m-auto">
                <h1 className="text-3xl font-semibold pb-4">How to identify chords</h1>
                <p className="mb-7 leading-relaxed">Chords are a key topic in music theory. Each and every song is built on top of them and this gives them their mood (e. g. happy, sad). But before reading this article I would strongly recommend to read the <Link to="/interval-identification" className="underline">article about intervals</Link> because this will improve your understanding of chords and make this session easier overall.</p>
                <h2 className="text-2xl font-semibold pb-1">But what are Chords exactly?</h2>
                <p className="mb-5 leading-relaxed">In music theory chords are a group of at least three notes that are played simultaniously. In this article I cover the most important forms of chords called <span className="font-medium">major, minor, augmented and diminished.</span></p>
                <h2 className="text-2xl font-semibold pb-1">General knowledge</h2>
                <p className="mb-5 leading-relaxed">Before explaining these four chord types there is some knowledge you need to gain. In general, chords are named after their root note, e. g. a C Major chord is called like this because it's root note is a C. In most cases the root note is the lowest note you see so determining it isn't really hard. But in some cases the chord might not be in root position. Have a look at this example:</p>
                <div ref={scoreRef} className="mb-4 invert-stave"></div>
                <p className="mb-5 leading-relaxed">A <span className="font-medium">chord inversion</span> is a chord which notes have been shifted. Now, the root note no longer is the lowest note. Inversions are built by taking the root note and shifting it up an octave. This is called the <span className="font-medium">first inversion</span>. The <span className="font-medium">second inversion</span> is created by shifting the third up an octave so in this example the note order is G, E and C.</p>
                <section className="mb-5">
                    <h3 className="text-2xl font-semibold mb-2">Major Chords</h3>
                    <p className="leading-relaxed">Major chords consist of the 1st, the 3rd and the 5th note from the corresponding major scale. This makes them consist of a major third between the root note and the third and a minor third between the third and the fifth. Major chords give a happy and content sound.</p>
                    <div ref={majorRef} className="invert-stave"></div>
                </section>
                <section className="mb-5">
                    <h3 className="text-2xl font-semibold mb-2">Minor Chords</h3>
                    <p className="leading-relaxed">Minor chords consist of the 1st, the 3rd and the 5th note from the corresponding minor scale. This makes them consist of a minor third between the root note and third and then a major third between third and fifth. Minor chords sound kind of sad and sometimes give a melancholy feeling.</p>
                    <div ref={minorRef} className="invert-stave"></div>
                </section>
                <section className="mb-5">
                    <h3 className="text-2xl font-semibold mb-2">Augmented chords</h3>
                    <p className="leading-relaxed">In a major chord there is a major third followed by a minor third. Augmented chords consist of two major thirds which gives them a tensioned and instable feeling.</p>
                    <div ref={augmentedRef} className="invert-stave"></div>
                </section>
                <section className="mb-5">
                    <h3 className="text-2xl font-semibold mb-2">Diminished chords</h3>
                    <p className="leading-relaxed">Diminished chords consist of two minor thirds so B Diminished consisting of B, D and F is a perfect example. Like augmented chords diminished chords create a kind of tension which can be resolved by playing the root chord from the corresponding scale. B Diminished is part of the C Major scale so this is the chord to resolve this tension.</p>
                    <div ref={diminishedRef} className="invert-stave"></div>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold pb-1">Conclusion</h2>
                    <p className="leading-relaxed">In conclusion, chords are an important topic in music theory used to create interesting chord progressions. Major and minor chords are the most commonly used but augmented and diminished chords create tension and make a song interesting. Make sure you master every chord by using the <Link to="/chord-quiz" className="underline">chord quiz</Link>.</p>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default BuildingChords