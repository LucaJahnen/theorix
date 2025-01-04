import { Difficulty } from "@/components/SettingsDialog"

const useCreateInterval = (difficulty: Difficulty) => {
  const notes: string[] = ["c", "d", "e", "f", "g", "a", "b"]
  const intervals: string[] = ["Unison", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Octave"]

  const easyMode = () => {
    const noteIndex = Math.floor(Math.random() * notes.length)
    const note = notes[noteIndex]
    const intervalIndex = Math.floor(Math.random() * intervals.length)
    const interval = intervals[intervalIndex]
    const endNote = noteIndex + intervalIndex >= 7 ? notes[noteIndex + intervalIndex - notes.length] : notes[noteIndex + intervalIndex]
    return [note, endNote, interval]
  }

  const mediumAndHardMode = (startNote?: string) => {
    const detailedNotes: string[][] = [["c"], ["c#", "db"], ["d"], ["d#", "eb"], ["e", "fb"], ["e#", "f"], ["f#", "gb"], ["g"], ["g#", "ab"], ["a"], ["a#", "bb"], ["b"]]
    const detailedIntervals: string[][] = [
      ["Perfect Unison"], // 0 semitones
      ["Augmented Unison", "Minor Second"], // 1 semitone
      ["Major Second", "Diminished Third"], // 2 semitones
      ["Augmented Second", "Minor Third"], // 3 semitones
      ["Major Third", "Diminished Fourth"], // 4 semitones
      ["Augmented Third", "Perfect Fourth"], // 5 semitones
      ["Augmented Fourth", "Diminished Fifth"], // 6 semitones (Tritone)
      ["Perfect Fifth", "Diminished Sixth"], // 7 semitones
      ["Augmented Fifth", "Minor Sixth"], // 8 semitones
      ["Major Sixth", "Diminished Seventh"], // 9 semitones
      ["Augmented Sixth", "Minor Seventh"], // 10 semitones
      ["Major Seventh", "Diminished Octave"], // 11 semitones
      ["Augmented Seventh", "Perfect Octave"] // 12 semitones
    ]
    
    const detailedNoteIndex = startNote ? 0 : Math.floor(Math.random() * detailedNotes.length)
    const detailedNote = startNote ? [startNote] : detailedNotes[detailedNoteIndex]
    const detailedIntervalIndex = Math.floor(Math.random() * detailedIntervals.length)
    const detailedInterval = detailedIntervals[detailedIntervalIndex]
    const detailedEndNote = detailedNoteIndex + detailedIntervalIndex >= detailedNotes.length ? detailedNotes[detailedNoteIndex + detailedIntervalIndex - detailedNotes.length] : detailedNotes[detailedNoteIndex + detailedIntervalIndex]

    const getBasicInterval = (start: string[], end: string[]) => {
      const startIndex = notes.indexOf(start[0].charAt(0))
      const endIndex = notes.indexOf(end[0].charAt(0))
      return endIndex - startIndex >= 0 ? intervals[endIndex - startIndex] : intervals[(intervals.length - 1) - (startIndex - endIndex)]
    }

    const basicInterval = getBasicInterval(detailedNote, detailedEndNote)
    const correctInterval = detailedInterval.filter(str => {
      if(str.includes(basicInterval)) {
        return str
      } else if(basicInterval === "Unison" && str.includes("Octave")) {
        return str
      }
    })

    const random = detailedNote.length > 1 && detailedEndNote.length > 1 ? Math.floor(Math.random() * 2) : 0
    return [detailedNote[random], detailedEndNote[random], correctInterval[0]]
  }

  switch(difficulty) {
    case "easy":
      return easyMode()
    case "medium":
      return mediumAndHardMode("c")
    case "hard":
      return mediumAndHardMode()
    default:
      return easyMode()
  }
}

export default useCreateInterval