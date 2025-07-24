import { Helmet } from "react-helmet"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import "./styles.css"
import { useRef, useState } from "react"
import schema from "../../assets/schemas/circle-of-fifths.json"

const CircleOfFifths = () => {
    const [angle, setAngle] = useState<number>(0)
      const requestRef = useRef<number>(0);

      const easeInOutQuad = (t: number) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const rotateSmoothly = (targetAngle: number) => {
    const start = angle;
    const diff = targetAngle - start;
    const duration = 900;
    const startTime = performance.now();

    const animate = (time: number) => {
        const elapsed = time - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutQuad(rawProgress);
        const newAngle = start + diff * easedProgress;
        setAngle(newAngle);
        if (rawProgress < 1) requestRef.current = requestAnimationFrame(animate);
    };

    cancelAnimationFrame(requestRef.current);
        requestRef.current = requestAnimationFrame(animate);
    };

    const handleKeyDown = (e: React.KeyboardEvent<SVGElement>, targetAngle: number, index: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(targetAngle, index);
        }
    }

    const [index, setIndex] = useState<number>(0);
    const handleClick = (angle: number, index: number) => {
        rotateSmoothly(angle);
        setIndex(index);
    }

    const data = [
        { note: "C", accidentals: "no sharps or flats", scale: ["C", "D", "E", "F", "G", "A", "B"] },
        { note: "G", accidentals: "f#", scale: ["G", "A", "B", "C", "D", "E", "F#"] },
        { note: "D", accidentals: "f# and c#", scale: ["D", "E", "F#", "G", "A", "B", "C#"] },
        { note: "A", accidentals: "f#, c# and g#", scale: ["A", "B", "C#", "D", "E", "F#", "G#"] },
        { note: "E", accidentals: "f#, c#, g# and d#", scale: ["E", "F#", "G#", "A", "B", "C#", "D#"] },
        { note: "B", accidentals: "f#, c#, g#, d# and a#", scale: ["B", "C#", "D#", "E", "F#", "G#", "A#"] },
        { note: "F#", accidentals: "f#, c#, g#, d#, a# and e#", scale: ["F#", "G#", "A#", "B", "C#", "D#", "E#"] },
        { note: "D♭", accidentals: "b♭, e♭, a♭, d♭ and g♭", scale: ["D♭", "E♭", "F♭", "G♭", "A♭", "B♭", "C"] },
        { note: "A♭", accidentals: "b♭, e♭, a♭ and d♭", scale: ["A♭", "B♭", "C", "D♭", "E♭", "F", "G"] },
        { note: "E♭", accidentals: "b♭, e♭ and a♭", scale: ["E♭", "F", "G", "A♭", "B♭", "C", "D"] },
        { note: "B♭", accidentals: "b♭ and e♭", scale: ["B♭", "C", "D", "E♭", "F", "G", "A"] },
        { note: "F", accidentals: "b♭", scale: ["F", "G", "A", "B♭", "C", "D", "E"] },
    ]

  return (
    <>
        <Helmet>
            <title>Circle of Fifths</title>
            <meta name="description" content="Explore the Circle of Fifths and enhance your music theory knowledge." />
            <meta name="keywords" content="circle of fifths, music theory, chord progression" />
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
        <Navbar />
        <div className="px-4 pt-6 lg:w-[60%] lg:block lg:m-auto">
            <h1 className="text-3xl font-semibold pb-4">Circle of Fifths</h1>
            <p className="pb-10 max-w-[65ch] leading-relaxed">This interactive Circle of Fifths Chart is a powerful tool for understanding the relationships between keys, chords, and scales in music theory. Use this interactive diagram to explore how major and minor keys connect, discover key signatures, and see which chords belong to each key. Click or tap on any segment to rotate the circle and learn more about each key and its chord functions.</p>
            <div className="lg:flex lg:flex-row lg:gap-12 leading-relaxed">
                <svg className="circle-of-fifths w-full" viewBox="-550 -550 3100 3100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <path id="text-path" d="M1000 -315 A 1315 1315 0 0 1 1000 2315 A 1315 1315 0 0 1 1000 -315" pathLength="100" />
                    </defs>
                    <g className="inner-circle">
                        <g role="button" tabIndex={0} aria-label="C-Major/A-Minor" cursor="pointer" className="c-major" transform={`rotate(${angle} 1000 1000)`} onClick={() => handleClick(0, 0)}   onKeyDown={(e) => handleKeyDown(e, 0, 0)}>
                            <path d="M1241.92 29.7 A1000 1000 0 0 0 758.08 29.7 L836.7 345.05 A 675 675 0 0 1 1163.3 345.05 L1241.92 29.7" className="fill-primary" />
                            <text x="1000" y="200" font-size="112" text-anchor="middle" fill="white">C</text>
                            <path d="M1157.25 369.3 A 650 650 0 0 0 842.75 369.31 L891.14 563.37 A 450 450 0 0 1 1108.86 563.37 L1157.25 369.3" className="fill-circleOfFifths" />
                            <text x="1000" y="480" font-size="102" text-anchor="middle" className="fill-foreground">a</text>
                            <path d="M1108.86 563.37 A450 450 0 0 0 891.14 563.37 L842.75 369.31 L758.08 29.7 A1000 1000 0 0 1 1241.92 29.7 L1108.86 563.37" stroke-width="10" fill="none" className="outline-ring stroke-foreground" />
                        </g>
                        <g transform={`rotate(${angle + 30} 1000 1000)`} role="button" tabIndex={0} aria-label="G-Major/E-Minor" cursor="pointer" className="g-major" onClick={() => handleClick(330, 1)} onKeyDown={(e) => handleKeyDown(e, 330, 1)}>
                            <path d="M1241.92 29.7 A1000 1000 0 0 0 758.08 29.7 L836.7 345.05 A 675 675 0 0 1 1163.3 345.05 L1241.92 29.7" className="fill-primary" />
                            <text x="1000" y="200" font-size="112" text-anchor="middle" fill="white">G</text>
                            <path d="M1157.25 369.3 A 650 650 0 0 0 842.75 369.31 L891.14 563.37 A 450 450 0 0 1 1108.86 563.37 L1157.25 369.3" className="fill-circleOfFifths" />
                            <text x="1000" y="480" font-size="102" text-anchor="middle" className="fill-foreground">e</text>
                            <path d="M1108.86 563.37 A450 450 0 0 0 891.14 563.37 L842.75 369.31 L758.08 29.7 A1000 1000 0 0 1 1241.92 29.7 L1108.86 563.37" stroke-width="10" fill="none" className="outline-ring stroke-foreground" />
                        </g>
                        <g transform={`rotate(${angle + 60} 1000 1000)`} role="button" tabIndex={0} aria-label="D-Major/B-Minor" cursor="pointer" className="d-major" onClick={() => handleClick(300, 2)} onKeyDown={(e) => handleKeyDown(e, 300, 2)}>
                            <path d="M1241.92 29.7 A1000 1000 0 0 0 758.08 29.7 L836.7 345.05 A 675 675 0 0 1 1163.3 345.05 L1241.92 29.7" className="fill-primary" />
                            <text x="1000" y="200" font-size="112" text-anchor="middle" fill="white">D</text>
                            <path d="M1157.25 369.3 A 650 650 0 0 0 842.75 369.31 L891.14 563.37 A 450 450 0 0 1 1108.86 563.37 L1157.25 369.3" className="fill-circleOfFifths" />
                            <text x="1000" y="480" font-size="102" text-anchor="middle" className="fill-foreground">b</text>
                            <path d="M1108.86 563.37 A450 450 0 0 0 891.14 563.37 L842.75 369.31 L758.08 29.7 A1000 1000 0 0 1 1241.92 29.7 L1108.86 563.37" stroke-width="10" fill="none" className="outline-ring stroke-foreground" />
                        </g>
                        <g transform={`rotate(${angle + 90} 1000 1000)`} role="button" tabIndex={0} aria-label="A-Major/F-Sharp-Minor" cursor="pointer" className="a-major" onClick={() => handleClick(270, 3)} onKeyDown={(e) => handleKeyDown(e, 270, 3)}>
                            <path d="M1241.92 29.7 A1000 1000 0 0 0 758.08 29.7 L836.7 345.05 A 675 675 0 0 1 1163.3 345.05 L1241.92 29.7" className="fill-primary" />
                            <text x="1000" y="200" font-size="112" text-anchor="middle" fill="white">A</text>
                            <path d="M1157.25 369.3 A 650 650 0 0 0 842.75 369.31 L891.14 563.37 A 450 450 0 0 1 1108.86 563.37 L1157.25 369.3" className="fill-circleOfFifths" />
                            <text x="1000" y="480" font-size="102" text-anchor="middle" className="fill-foreground">f#</text>
                            <path d="M1108.86 563.37 A450 450 0 0 0 891.14 563.37 L842.75 369.31 L758.08 29.7 A1000 1000 0 0 1 1241.92 29.7 L1108.86 563.37" stroke-width="10" fill="none" className="outline-ring stroke-foreground" />
                        </g>
                        <g transform={`rotate(${angle + 120} 1000 1000)`} role="button" tabIndex={0} aria-label="E-Major/C-Sharp-Minor" cursor="pointer" className="e-major" onClick={() => handleClick(240, 4)} onKeyDown={(e) => handleKeyDown(e, 240, 4)}>
                            <path d="M1241.92 29.7 A1000 1000 0 0 0 758.08 29.7 L836.7 345.05 A 675 675 0 0 1 1163.3 345.05 L1241.92 29.7" className="fill-primary" />
                            <text x="1000" y="200" font-size="112" text-anchor="middle" fill="white">E</text>
                            <path d="M1157.25 369.3 A 650 650 0 0 0 842.75 369.31 L891.14 563.37 A 450 450 0 0 1 1108.86 563.37 L1157.25 369.3" className="fill-circleOfFifths" />
                            <text x="1000" y="480" font-size="102" text-anchor="middle" className="fill-foreground">c#</text>
                            <path d="M1108.86 563.37 A450 450 0 0 0 891.14 563.37 L842.75 369.31 L758.08 29.7 A1000 1000 0 0 1 1241.92 29.7 L1108.86 563.37" stroke-width="10" fill="none" className="outline-ring stroke-foreground" />
                        </g>
                        <g transform={`rotate(${angle + 150} 1000 1000)`} role="button" tabIndex={0} aria-label="B-Major/G-Sharp-Minor" cursor="pointer" className="b-major" onClick={() => handleClick(210, 5)} onKeyDown={(e) => handleKeyDown(e, 210, 5)}>
                            <path d="M1241.92 29.7 A1000 1000 0 0 0 758.08 29.7 L836.7 345.05 A 675 675 0 0 1 1163.3 345.05 L1241.92 29.7" className="fill-primary" />
                            <text x="1000" y="200" font-size="112" text-anchor="middle" fill="white">B</text>
                            <path d="M1157.25 369.3 A 650 650 0 0 0 842.75 369.31 L891.14 563.37 A 450 450 0 0 1 1108.86 563.37 L1157.25 369.3" className="fill-circleOfFifths" />
                            <text x="1000" y="480" font-size="102" text-anchor="middle" className="fill-foreground">g#</text>
                            <path d="M1108.86 563.37 A450 450 0 0 0 891.14 563.37 L842.75 369.31 L758.08 29.7 A1000 1000 0 0 1 1241.92 29.7 L1108.86 563.37" stroke-width="10" fill="none" className="outline-ring stroke-foreground" />
                        </g>
                        <g transform={`rotate(${angle + 180} 1000 1000)`} role="button" tabIndex={0} aria-label="F-Sharp-Major/D-Sharp-Minor" cursor="pointer" className="f-sharp-major" onClick={() => handleClick(180, 6)} onKeyDown={(e) => handleKeyDown(e, 180, 6)}>
                            <path d="M1241.92 29.7 A1000 1000 0 0 0 758.08 29.7 L836.7 345.05 A 675 675 0 0 1 1163.3 345.05 L1241.92 29.7" className="fill-primary" />
                            <text x="1000" y="200" font-size="112" text-anchor="middle" fill="white">F#</text>
                            <path d="M1157.25 369.3 A 650 650 0 0 0 842.75 369.31 L891.14 563.37 A 450 450 0 0 1 1108.86 563.37 L1157.25 369.3" className="fill-circleOfFifths" />
                            <text x="1000" y="480" font-size="102" text-anchor="middle" className="fill-foreground">d#</text>
                            <path d="M1108.86 563.37 A450 450 0 0 0 891.14 563.37 L842.75 369.31 L758.08 29.7 A1000 1000 0 0 1 1241.92 29.7 L1108.86 563.37" stroke-width="10" fill="none" className="outline-ring stroke-foreground" />
                        </g>
                        <g transform={`rotate(${angle + 210} 1000 1000)`} role="button" tabIndex={0} aria-label="D-Flat-Major/B-Flat-Minor" cursor="pointer" className="d-flat-major" onClick={() => handleClick(150, 7)} onKeyDown={(e) => handleKeyDown(e, 150, 7)}>
                            <path d="M1241.92 29.7 A1000 1000 0 0 0 758.08 29.7 L836.7 345.05 A 675 675 0 0 1 1163.3 345.05 L1241.92 29.7" className="fill-primary" />
                            <text x="1000" y="200" font-size="112" text-anchor="middle" fill="white">Db</text>
                            <path d="M1157.25 369.3 A 650 650 0 0 0 842.75 369.31 L891.14 563.37 A 450 450 0 0 1 1108.86 563.37 L1157.25 369.3" className="fill-circleOfFifths" />
                            <text x="1000" y="480" font-size="102" text-anchor="middle" className="fill-foreground">bb</text>
                            <path d="M1108.86 563.37 A450 450 0 0 0 891.14 563.37 L842.75 369.31 L758.08 29.7 A1000 1000 0 0 1 1241.92 29.7 L1108.86 563.37" stroke-width="10" fill="none" className="outline-ring stroke-foreground" />
                        </g>
                        <g transform={`rotate(${angle + 240} 1000 1000)`} role="button" tabIndex={0} aria-label="A-Flat-Major/F-Minor" cursor="pointer" className="a-flat-major" onClick={() => handleClick(120, 8)} onKeyDown={(e) => handleKeyDown(e, 120, 8)}>
                            <path d="M1241.92 29.7 A1000 1000 0 0 0 758.08 29.7 L836.7 345.05 A 675 675 0 0 1 1163.3 345.05 L1241.92 29.7" className="fill-primary" />
                            <text x="1000" y="200" font-size="112" text-anchor="middle" fill="white">Ab</text>
                            <path d="M1157.25 369.3 A 650 650 0 0 0 842.75 369.31 L891.14 563.37 A 450 450 0 0 1 1108.86 563.37 L1157.25 369.3" className="fill-circleOfFifths" />
                            <text x="1000" y="480" font-size="102" text-anchor="middle" className="fill-foreground">f</text>
                            <path d="M1108.86 563.37 A450 450 0 0 0 891.14 563.37 L842.75 369.31 L758.08 29.7 A1000 1000 0 0 1 1241.92 29.7 L1108.86 563.37" stroke-width="10" fill="none" className="outline-ring stroke-foreground" />
                        </g>
                        <g transform={`rotate(${angle + 270} 1000 1000)`} role="button" tabIndex={0} aria-label="E-Flat-Major/C-Minor" cursor="pointer" className="e-flat-major" onClick={() => handleClick(90, 9)} onKeyDown={(e) => handleKeyDown(e, 90, 9)}>
                            <path d="M1241.92 29.7 A1000 1000 0 0 0 758.08 29.7 L836.7 345.05 A 675 675 0 0 1 1163.3 345.05 L1241.92 29.7" className="fill-primary" />
                            <text x="1000" y="200" font-size="112" text-anchor="middle" fill="white">Eb</text>
                            <path d="M1157.25 369.3 A 650 650 0 0 0 842.75 369.31 L891.14 563.37 A 450 450 0 0 1 1108.86 563.37 L1157.25 369.3" className="fill-circleOfFifths" />
                            <text x="1000" y="480" font-size="102" text-anchor="middle" className="fill-foreground">c</text>
                            <path d="M1108.86 563.37 A450 450 0 0 0 891.14 563.37 L842.75 369.31 L758.08 29.7 A1000 1000 0 0 1 1241.92 29.7 L1108.86 563.37" stroke-width="10" fill="none" className="outline-ring stroke-foreground" />
                        </g>
                        <g transform={`rotate(${angle + 300} 1000 1000)`} role="button" tabIndex={0} aria-label="B-Flat-Major/G-Minor" cursor="pointer" className="b-flat-major" onClick={() => handleClick(60, 10)} onKeyDown={(e) => handleKeyDown(e, 60, 10)}>
                            <path d="M1241.92 29.7 A1000 1000 0 0 0 758.08 29.7 L836.7 345.05 A 675 675 0 0 1 1163.3 345.05 L1241.92 29.7" className="fill-primary" />
                            <text x="1000" y="200" font-size="112" text-anchor="middle" fill="white">Bb</text>
                            <path d="M1157.25 369.3 A 650 650 0 0 0 842.75 369.31 L891.14 563.37 A 450 450 0 0 1 1108.86 563.37 L1157.25 369.3" className="fill-circleOfFifths" />
                            <text x="1000" y="480" font-size="102" text-anchor="middle" className="fill-foreground">g</text>
                            <path d="M1108.86 563.37 A450 450 0 0 0 891.14 563.37 L842.75 369.31 L758.08 29.7 A1000 1000 0 0 1 1241.92 29.7 L1108.86 563.37" stroke-width="10" fill="none" className="outline-ring stroke-foreground" />
                        </g>
                        <g transform={`rotate(${angle + 330} 1000 1000)`} role="button" tabIndex={0} aria-label="F-Major/D-Minor" cursor="pointer" className="f-major" onClick={() => handleClick(30, 11)} onKeyDown={(e) => handleKeyDown(e, 30, 11)}>
                            <path d="M1241.92 29.7 A1000 1000 0 0 0 758.08 29.7 L836.7 345.05 A 675 675 0 0 1 1163.3 345.05 L1241.92 29.7" className="fill-primary" />
                            <text x="1000" y="200" font-size="112" text-anchor="middle" fill="white">F</text>
                            <path d="M1157.25 369.3 A 650 650 0 0 0 842.75 369.31 L891.14 563.37 A 450 450 0 0 1 1108.86 563.37 L1157.25 369.3" className="fill-circleOfFifths" />
                            <text x="1000" y="480" font-size="102" text-anchor="middle" className="fill-foreground">d</text>
                            <path d="M1108.86 563.37 A450 450 0 0 0 891.14 563.37 L842.75 369.31 L758.08 29.7 A1000 1000 0 0 1 1241.92 29.7 L1108.86 563.37" stroke-width="10" fill="none" className="outline-ring stroke-foreground" />
                        </g>
                    </g>
                    <g className="chord-functions">
                        <g transform="rotate(-30 1000 1000)">
                            <path d="M1247.97 5.45 A 1025 1025 0 0 0 752.03 5.45 L643.17 -431.19 A 1475 1475 0 0 1 1356.83 -431.19 L1247.97 5.45" className="fill-circleOfFifths" />
                            <text x="1000" y="-140" font-size="156" text-anchor="middle" className="fill-foreground">IV</text>
                            <text x="1000" y="-310" font-size="82" text-anchor="middle" className="fill-foreground" transform="rotate(-43.5 1000 1000)">
                                <textPath href="#text-path" startOffset="0%">subdominant</textPath>
                            </text>
                        </g>
                        <g>
                            <path d="M1247.97 5.45 A 1025 1025 0 0 0 752.03 5.45 L643.17 -431.19 A 1475 1475 0 0 1 1356.83 -431.19 L1247.97 5.45" stroke="none" className="fill-circleOfFifths" />
                            <text x="1000" y="-140" font-size="156" text-anchor="middle" className="fill-foreground">I</text>
                            <text x="1000" y="-310" font-size="82" text-anchor="middle" className="fill-foreground" transform="rotate(-43.5 1000 1000)">
                                <textPath href="#text-path" startOffset="0%">tonic</textPath>
                            </text>
                        </g>
                        <g transform="rotate(30 1000 1000)">
                            <path d="M1247.97 5.45 A 1025 1025 0 0 0 752.03 5.45 L643.17 -431.19 A 1475 1475 0 0 1 1356.83 -431.19 L1247.97 5.45" stroke="none" className="fill-circleOfFifths" />
                            <text x="1000" y="-140" font-size="156" text-anchor="middle" className="fill-foreground">V</text>
                            <text x="1000" y="-310" font-size="82" text-anchor="middle" className="fill-foreground" transform="rotate(-43.5 1000 1000)">
                                <textPath href="#text-path" startOffset="0%">dominant</textPath>
                            </text>
                        </g>
                        <g transform="rotate(60 1000 1000)">
                            <path d="M1247.97 5.45 A 1025 1025 0 0 0 752.03 5.45 L643.17 -431.19 A 1475 1475 0 0 1 1356.83 -431.19 L1247.97 5.45" stroke="none" className="fill-circleOfFifths" />
                            <text x="1000" y="-140" font-size="156" text-anchor="middle" className="fill-foreground">ii</text>
                            <text x="1000" y="-310" font-size="82" text-anchor="middle" className="fill-foreground" transform="rotate(-43.5 1000 1000)">
                                <textPath href="#text-path" startOffset="0%">supertonic</textPath>
                            </text>
                        </g>
                        <g transform="rotate(90 1000 1000)">
                            <path d="M1247.97 5.45 A 1025 1025 0 0 0 752.03 5.45 L643.17 -431.19 A 1475 1475 0 0 1 1356.83 -431.19 L1247.97 5.45" stroke="none" className="fill-circleOfFifths" />
                            <text x="1000" y="-140" font-size="156" text-anchor="middle" className="fill-foreground">vi</text>
                            <text x="1000" y="-310" font-size="82" text-anchor="middle" className="fill-foreground" transform="rotate(-43.5 1000 1000)">
                                <textPath href="#text-path" startOffset="0%">submediant</textPath>
                            </text>
                        </g>
                        <g transform="rotate(120 1000 1000)">
                            <path d="M1247.97 5.45 A 1025 1025 0 0 0 752.03 5.45 L643.17 -431.19 A 1475 1475 0 0 1 1356.83 -431.19 L1247.97 5.45" stroke="none" className="fill-circleOfFifths" />
                            <text x="1000" y="-140" font-size="156" text-anchor="middle" className="fill-foreground">iii</text>
                            <text x="1000" y="-310" font-size="82" text-anchor="middle" className="fill-foreground" transform="rotate(-43.5 1000 1000)">
                                <textPath href="#text-path" startOffset="0%">mediant</textPath>
                            </text>
                        </g>
                        <g transform="rotate(150 1000 1000)">
                            <path d="M1247.97 5.45 A 1025 1025 0 0 0 752.03 5.45 L643.17 -431.19 A 1475 1475 0 0 1 1356.83 -431.19 L1247.97 5.45" stroke="none" className="fill-circleOfFifths" />
                            <text x="1000" y="-140" font-size="156" text-anchor="middle" className="fill-foreground">vii°</text>
                            <text x="1000" y="-310" font-size="82" text-anchor="middle" className="fill-foreground" transform="rotate(-43.5 1000 1000)">
                                <textPath href="#text-path" startOffset="0" text-anchor="middle">leading tone</textPath>
                            </text>
                        </g>
                    </g>
                </svg>
                <section className="lg:w-[80%] lg:flex lg:justify-center lg:flex-col">
                    <h2 className="text-[1.7rem] font-semibold">{data[index].note} Major</h2>
                    <section className="pt-3 grid grid-cols-2 grid-rows-[auto_auto_auto] gap-x-4">
                        <h3 className="text-xl font-semibold col-span-2 pb-1">Chord Functions</h3>
                        <p><span className="font-semibold block lg:inline">Relative Key: </span>{data[index].scale[5]} Minor</p>
                        <p><span className="font-semibold block lg:inline">Parallel Key: </span>{data[index].scale[0]} Minor</p>
                        <p><span className="font-semibold block lg:inline">Dominant: </span>{data[index].scale[4]} Major</p>
                        <p><span className="font-semibold block lg:inline">Subdominant: </span>{data[index].scale[3]} Major</p>
                    </section>
                    <section className="pt-7  grid grid-cols-1">
                        <h3 className="text-xl font-semibold pb-1">{data[index].note} Major Scale</h3>
                        <p><span className="font-semibold">Key Signature: </span>{data[index].accidentals}</p>
                        <p><span className="font-semibold">Notes: </span>{data[index].scale.join(" ")}</p>
                    </section>
                    <section className="pt-8 grid grid-cols-4">
                        <h3 className="text-xl font-semibold col-span-4 pb-2">Chords in {data[index].note} Major</h3>
                        <p className="font-semibold bg-circleOfFifthsAltered w-full text-center">I</p>
                        <p className="font-semibold bg-circleOfFifthsAltered w-full text-center">ii</p>
                        <p className="font-semibold bg-circleOfFifthsAltered w-full text-center">iii</p>
                        <p className="font-semibold bg-circleOfFifthsAltered w-full text-center">IV</p>
                        <p className="w-full text-center bg-circleOfFifths">{data[index].scale[0]}</p>
                        <p className="w-full text-center bg-circleOfFifths">{data[index].scale[1]}m</p>
                        <p className="w-full text-center bg-circleOfFifths">{data[index].scale[2]}m</p>
                        <p className="w-full text-center bg-circleOfFifths">{data[index].scale[3]}</p>
                        <span className="col-span-4 py-[1.2%]"></span>
                        <p className="font-semibold bg-circleOfFifthsAltered w-full text-center">V</p>
                        <p className="font-semibold bg-circleOfFifthsAltered w-full text-center">vi</p>
                        <p className="font-semibold bg-circleOfFifthsAltered w-full text-center">vii°</p>
                        <span></span>
                        <p className="w-full text-center bg-circleOfFifths">{data[index].scale[4]}</p>
                        <p className="w-full text-center bg-circleOfFifths">{data[index].scale[5]}</p>
                        <p className="w-full text-center bg-circleOfFifths">{data[index].scale[6]}°</p>
                    </section>
                </section>
            </div>
            <section>
                <h2 className="pt-12 text-2xl font-semibold pb-1">What is the Circle of Fifths?</h2>
                <p className="leading-relaxed">The Circle of Fifths is a visual representation of the relationships between the twelve tones of the chromatic scale, their corresponding key signatures, and the associated major and minor keys. This diagram is especially useful for understanding key signatures, chord progressions, and how different keys relate to each other. When moving clockwise around the circle, each key is a perfect fifth apart, while moving counter-clockwise by one key results in a key that is a perfect fourth away. Thanks to this structure, musicians can easily transpose chords from one key to another by following the circle, making it invaluable for adapting songs to different vocal ranges or instruments.</p>
                <h3 className="pt-6 pb-3 text-xl font-semibold">Use cases</h3>
                <ul>
                    <li className="before:content-['1.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline">
                        <span><strong>Understanding key signatures:</strong> The Circle of Fifths helps musicians quickly identify the number of sharps or flats in each key, making it easier to read and write music in different keys.</span>
                    </li>
                    <li className="before:content-['2.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline">
                        <span><strong>Visualizing chord progressions:</strong> By showing the relationships between keys, the circle makes it simple to see which chords naturally follow one another, aiding in the creation of smooth and harmonically pleasing progressions.</span>
                    </li>
                    <li className="before:content-['3.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline">
                        <span><strong>Finding related keys:</strong> The proximity of keys on the circle reveals which keys are closely related, making it easier to modulate or transition between keys in a composition.</span>
                    </li>
                    <li className="before:content-['4.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline">
                        <span><strong>Composing music:</strong> Composers use the Circle of Fifths as a reference to build chord sequences, explore new harmonies, and experiment with key changes, enhancing creativity and musical variety.</span>
                    </li>
                </ul>
            </section>
            <section>
                <h2 className="pt-8 text-2xl font-semibold pb-1">How to use</h2>
                <p>
                    Click on a key in the circle to rotate it to the top center. This will display the chord functions, scale, and accidentals for that key. You can also use the keyboard: focus a key and press Enter or Space to select it. The interface is fully accessible for keyboard navigation.
                </p>
            </section>
            <section className="leading-relaxed">
                <h2 className="pt-8 text-2xl font-semibold pb-1">Creating Chords</h2>
                <p>
                    The circle of fifths is a helpful visual tool for constructing chords. It not only shows the relationship between keys but also helps identify the notes needed to build major and minor triads. To form a major chord, start with a root note and move four steps clockwise to find the major third, then go back to the root and move one step clockwise for the perfect fifth. For example, let’s build a D major chord: Start on D, then move four steps clockwise on the circle of fifths — you land on F♯, which is the major third. From D, take one step clockwise to reach A, the perfect fifth. So, the D major chord consists of D–F♯–A.
                </p>
                <p className="pt-3">
                    For a minor chord, the method is slightly different. Start on the root and move three steps counterclockwise to find the minor third, then return to the root again and move one step clockwise for the fifth. For D minor, begin with D, go three steps to the left to find F, the minor third, and again go one step right to A as the fifth. The result is a D minor chord: D–F–A.
                </p>
                <p className="pt-3">
                    This approach allows you to build triads directly using the structure of the circle, making it an intuitive tool for composition and analysis.
                </p>
            </section>
        </div>
        <Footer />
    </>
  )
}

export default CircleOfFifths