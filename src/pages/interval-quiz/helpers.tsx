import Vex from "vexflow"
const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow

interface Interval {
    scoreRef: React.MutableRefObject<HTMLDivElement | null>,
    visible: boolean,
    startNote: string,
    endNote: string,
    interval: string,
    setSolution: React.Dispatch<React.SetStateAction<string[]>>
}

const displayInterval = ({ scoreRef, visible, startNote, endNote, interval, setSolution }: Interval) => {
    if (scoreRef.current && !visible) {
        setSolution([startNote, endNote, interval])
      // determine stave width
      const mobileWidth = window.innerWidth - 32
      const desktopWidth = 0.28 * window.innerWidth
      // 1024 is tailwind's lg breakpoint
      const width = window.innerWidth > 1024 ? desktopWidth : mobileWidth

      scoreRef.current.innerHTML = ""
      const renderer = new Renderer(scoreRef.current, Renderer.Backends.SVG);
      renderer.resize(width, 130);
      const context = renderer.getContext();
      const stave = new Stave(0, 0, width - 1);

      const detailedNotes: string[] = ["c", "c#", "db", "d","d#", "eb", "e", "fb" ,"e#", "f", "f#", "gb", "g", "g#", "ab", "a", "a#", "bb", "b"]
      let endNoteOctave = 4
      if(detailedNotes.indexOf(startNote) > detailedNotes.indexOf(endNote) || interval.includes("Octave")) {
        endNoteOctave = 5
      }
      const renderedNotes = [
        new StaveNote({ keys: [`${startNote}/4`], duration: "q" }),
        new StaveNote({ keys: [`${endNote}/${endNoteOctave}`], duration: "q" }),
      ]

      const addAccidental = (note: string, index: number) => {
        if(note.length === 2) {
          renderedNotes[index].addModifier(new Accidental(note[1]))
        }
      }
      addAccidental(startNote, 0)
      addAccidental(endNote, 1)

      const voice = new Voice({ num_beats: 2, beat_value: 4 });
      voice.addTickables(renderedNotes);

      new Formatter().joinVoices([voice]).format([voice], width);
      stave.addClef('treble').addTimeSignature('2/4');
      stave.setContext(context).draw();
      voice.draw(context, stave);
    }
}

export default displayInterval