const useCreateChord = () => {
    const allChords: [string, string, string, string][] = [
        ["C", "E", "G", "C Major"],
        ["C", "Eb", "G", "C Minor"],
        ["C", "Eb", "Gb", "C Diminished"],
        ["C", "E", "G#", "C Augmented"],
        
        ["C#", "E#", "G#", "C# Major"],
        ["C#", "E", "G#", "C# Minor"],
        ["C#", "E", "G", "C# Diminished"],
        ["C#", "E#", "A", "C# Augmented"],
        
        ["D", "F#", "A", "D Major"],
        ["D", "F", "A", "D Minor"],
        ["D", "F", "Ab", "D Diminished"],
        ["D", "F#", "A#", "D Augmented"],
        
        ["D#", "F##", "A#", "D# Major"],
        ["D#", "F#", "A#", "D# Minor"],
        ["D#", "F#", "A", "D# Diminished"],
        ["D#", "F##", "A##", "D# Augmented"],
        
        ["E", "G#", "B", "E Major"],
        ["E", "G", "B", "E Minor"],
        ["E", "G", "Bb", "E Diminished"],
        ["E", "G#", "B#", "E Augmented"],
        
        ["F", "A", "C", "F Major"],
        ["F", "Ab", "C", "F Minor"],
        ["F", "Ab", "Cb", "F Diminished"],
        ["F", "A", "C#", "F Augmented"],
        
        ["F#", "A#", "C#", "F# Major"],
        ["F#", "A", "C#", "F# Minor"],
        ["F#", "A", "C", "F# Diminished"],
        ["F#", "A#", "C##", "F# Augmented"],
        
        ["G", "B", "D", "G Major"],
        ["G", "Bb", "D", "G Minor"],
        ["G", "Bb", "Db", "G Diminished"],
        ["G", "B", "D#", "G Augmented"],
        
        ["G#", "B#", "D#", "G# Major"],
        ["G#", "B", "D#", "G# Minor"],
        ["G#", "B", "D", "G# Diminished"],
        ["G#", "B#", "E", "G# Augmented"],
        
        ["A", "C#", "E", "A Major"],
        ["A", "C", "E", "A Minor"],
        ["A", "C", "Eb", "A Diminished"],
        ["A", "C#", "E#", "A Augmented"],
        
        ["A#", "C##", "E#", "A# Major"],
        ["A#", "C#", "E#", "A# Minor"],
        ["A#", "C#", "E", "A# Diminished"],
        ["A#", "C##", "E##", "A# Augmented"],
        
        ["B", "D#", "F#", "B Major"],
        ["B", "D", "F#", "B Minor"],
        ["B", "D", "F", "B Diminished"],
        ["B", "D#", "F##", "B Augmented"],
    ]

    return allChords[Math.floor(Math.random() * allChords.length)]
}

export default useCreateChord