import Vex from "vexflow"
const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow
export const difficulties = ["easy", "medium", "hard"]

interface Chord {
    root: string, 
    third: string, 
    fifth: string, 
    chordName: string, 
    scoreRef: React.MutableRefObject<HTMLDivElement | null>,
    visible: boolean,
    setChord: React.Dispatch<React.SetStateAction<string[]>>,
    difficulty: string
}

export const addAccidental = (note: InstanceType<typeof StaveNote>, accidental: string | undefined, index: number) => {
    if (accidental) {
      note.addModifier(new Accidental(accidental), index)
    }
}

export const chooseInversion = (notes: string[], root: string) => {
    const currentInversion = Math.round(Math.random())
    if(currentInversion === 0) {
      return [5, notes.indexOf(root.toLowerCase()) <= notes.indexOf("g#") ? 4 : 5, notes.indexOf(root.toLowerCase()) <= notes.indexOf("e#") ? 4 : 5]
    } else {
      return [5, 5, notes.indexOf(root.toLowerCase()) <= notes.indexOf("e#") ? 4 : 5]
    }
}

export const displayChord = ({ root, third, fifth, chordName, scoreRef, visible, setChord, difficulty }: Chord) => {
    if (scoreRef.current && !visible) {
        setChord([root, third, fifth, chordName])
        const notes = ["c", "c#", "db", "d", "d#", "eb", "e", "e#", "fb", "f", "f#", "gb", "g", "g#", "ab", "a", "a#", "bb", "b", "b#"]
  
        let rootOctave, thirdOctave, fifthOctave
        if(difficulty === "hard") {
          [rootOctave, thirdOctave, fifthOctave] = chooseInversion(notes, root)
        } else {
          // determine the right octave so chords are always displayed in the right order: root, third, fifth
          rootOctave = 4
          thirdOctave = notes.indexOf(root.toLowerCase()) <= notes.indexOf("g#") ? 4 : 5
          fifthOctave = notes.indexOf(root.toLowerCase()) <= notes.indexOf("e#") ? 4 : 5
        }
  
        // determine stave width
        const mobileWidth = window.innerWidth - 32
        const desktopWidth = 0.3 * window.innerWidth
        // 1024 is tailwind's lg breakpoint
        const width = window.innerWidth > 1024 ? desktopWidth : mobileWidth
  
        scoreRef.current.innerHTML = ""
        const renderer = new Renderer(scoreRef.current, Renderer.Backends.SVG);
        renderer.resize(width, 130);
        const context = renderer.getContext();
        const stave = new Stave(0, 0, width);
  
        const rootAccidental = root.slice(1, 3)
        const thirdAccidental = third.slice(1, 3)
        const fifthAccidental = fifth.slice(1, 3)
  
        const renderedNotes = [
          new StaveNote({ keys: [`${root}/${rootOctave}`, `${third}/${thirdOctave}`, `${fifth}/${fifthOctave}`], duration: "h" })
        ]
  
        addAccidental(renderedNotes[0], rootAccidental, 0)
        addAccidental(renderedNotes[0], thirdAccidental, 1)
        addAccidental(renderedNotes[0], fifthAccidental, 2)
  
        const voice = new Voice({ num_beats: 2, beat_value: 4 });
        voice.addTickables(renderedNotes);
  
        new Formatter().joinVoices([voice]).format([voice], width);
        stave.addClef('treble').addTimeSignature('2/4');
        stave.setContext(context).draw();
        voice.draw(context, stave);
      }
}