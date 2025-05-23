const data = {
    "Tempo": [
        { tempo: "Largo", description: "very slow and broad", bpm: "40 - 60" },
        { tempo: "Lento", description: "slow", bpm: "52 - 68" },
        { tempo: "Adagio", description: "slow and stately", bpm: "60 - 80" },
        { tempo: "Andante", description: "at a walking pace", bpm: "76 - 100" },
        { tempo: "Moderato", description: "moderate pace", bpm: "88 - 112" },
        { tempo: "Allegretto", description: "moderately fast", bpm: "100 - 128" },
        { tempo: "Allegro", description: "fast, quickly and bright", bpm: "112 - 160" },
        { tempo: "Vivace", description: "lively and fast", bpm: "138 - 142" },
        { tempo: "Presto", description: "very fast", bpm: "140 - 200" },
        { tempo: "Prestissimo", description: "extremely fast", bpm: "188 - 220" }
    ],
    "Dynamics": [
        { symbol: "ppp", description: "pianississimo", meaning: "extremely soft" },
        { symbol: "pp", description: "pianissimo", meaning: "very soft" },
        { symbol: "p", description: "piano", meaning: "soft" },
        { symbol: "mp", description: "mezzo-piano", meaning: "moderately soft" },
        { symbol: "mf", description: "mezzo-forte", meaning: "moderately loud" },
        { symbol: "f", description: "forte", meaning: "loud" },
        { symbol: "ff", description: "fortissimo", meaning: "very loud" },
        { symbol: "fff", description: "fortississimo", meaning: "extremely loud" }
    ],
    "Articulation": [
        { term: "legato", description: "linked together, smoothly" },
        { term: "staccato", description: "short, detached notes" },
        { term: "staccatissimo", description: "very short, extremely detached notes" },
        { term: "tenuto", description: "held for full value, slightly emphasized" },
        { term: "marcato", description: "marked, accented" },
        { term: "portato", description: "between legato and staccato, slightly detached" },
    ],
    "Mood": [
        { term: "agitato", description: "agitated, restless" },
        { term: "appassionato", description: "passionate" },
        { term: "brillante", description: "brilliant, sparkling" },
        { term: "cantabile", description: "in a singing style" },
        { term: "con brio", description: "with spirit, with vigor" },
        { term: "con fuoco", description: "with fire, passionately" },
        { term: "con moto", description: "with motion" },
        { term: "dolce", description: "sweetly" },
        { term: "energico", description: "energetic" },
        { term: "espressivo", description: "expressive" },
        { term: "furioso", description: "furiously" },
        { term: "giocoso", description: "playful, joyful" },
        { term: "grazioso", description: "gracefully" },
        { term: "lacrimoso", description: "tearful, mournful" },
        { term: "leggiero", description: "lightly, delicately" },
        { term: "maestoso", description: "majestically" },
        { term: "marcato", description: "marked, with emphasis" },
        { term: "misterioso", description: "mysteriously" },
        { term: "pesante", description: "heavy, ponderous" },
        { term: "risoluto", description: "resolute, determined" },
        { term: "scherzando", description: "playfully, jokingly" },
        { term: "serioso", description: "seriously" },
        { term: "sostenuto", description: "sustained" },
        { term: "tranquillo", description: "calmly, peacefully" },
        { term: "veloce", description: "fast, rapid" }
    ],
    "General": [
        { term: "poco", meaning: "a little" },
        { term: "assai", meaning: "very" },
        { term: "meno", meaning: "less" },
        { term: "più", meaning: "more" },
        { term: "molto", meaning: "much, very" },
        { term: "subito", meaning: "suddenly" },
        { term: "giocoso", meaning: "playfully" },
        { term: "cantabile", meaning: "in a singing style" },
        { term: "ritardando", meaning: "gradually slowing down" },
        { term: "accelerando", meaning: "gradually speeding up" },
        { term: "sempre", meaning: "always, continuously" },
        { term: "sforzando", meaning: "with sudden emphasis" },
        { term: "crescendo", meaning: "gradually getting louder" },
        { term: "diminuendo", meaning: "gradually getting softer" },
        { term: "da capo", meaning: "from the beginning" },
        { term: "dal segno", meaning: "from the sign" },
        { term: "fine", meaning: "the end" },
    ]
}


export default data