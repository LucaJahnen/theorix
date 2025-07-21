import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import data from './data'
import renderResults from './renderResults'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import schema from '../../assets/schemas/dictionary.json'

export interface FilteredItem {
    tempo?: string;
    description?: string;
    bpm?: string;
    symbol?: number | string;
    meaning?: string;
    term?: string;
}

const Dictionary: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [filteredData, setFilteredData] = useState<FilteredItem[]>([])
    const [submitted, setSubmitted] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const findMatchInData = (list: FilteredItem[], searchTerm: string) => {
        //     return list.map((item) => {
        //    const matchedValue = Object.values(item).some((value) => {
        //              if(typeof value === "string") {
        //                  return value.toLowerCase().includes(searchTerm.toLowerCase())
        //              }
        //             })
        //         if (matchedValue) {
        //             return { item, keys: Object.keys(list[0]) }
        //      }
        //     return null;
        // })
            return list.filter((item) =>
                Object.values(item).some((value) => {
                    if(typeof value === "string") {
                        return value.toLowerCase().includes(searchTerm.toLowerCase())
                    }
                })
            )
        }

        const filteredItems = Object.values(data)
            .map((item) => findMatchInData(item, searchTerm))
            .filter(arr => arr.length > 0)
            .flat()
            .filter(arr => arr !== null)


        setSubmitted(true)
        setFilteredData(filteredItems)
        console.log(filteredItems)
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setSearchTerm(target.value)
        setSubmitted(false)
    }

  return (
    <>
        <Helmet>
            <title>Italian musical terms</title>
            <meta name="description" content="Discover the meaning of essential Italian musical terms like meno mosso, molto, and other tempo, expression, and articulation markings. A clear glossary for musicians seeking definitions of Italian tempo terms and expressive instructions." />
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
            <link rel="canonical" href="https://theorix.netlify.app/musical-terms" />
        </Helmet>
        <Navbar />
        <main className="px-4 pt-6 lg:w-[60%] lg:block lg:m-auto">
            <h1 className="text-3xl font-semibold pb-4">Italian music terms</h1>
            <p className="leading-relaxed max-w-[65ch]">Italian is the universal language of classical music. This page provides definitions and explanations of common Italian musical terms used to indicate tempo, expression, dynamics, articulation, and more &#8210; helping musicians interpret music accurately and with style. You can quickly find any term using the search function below.</p>
            <form action="#" className='w-full flex flex-row gap-3 py-6' onSubmit={handleSubmit}>
                <Input type="text" placeholder='Search for a musical term' name='search' required value={searchTerm} onChange={e => handleChange(e)} className='text-base h-10 max-w-[20rem]' />
                <Button className='text-base h-10 bg-primary dark:bg-primary-altered'>Search</Button>
            </form>
            {submitted && renderResults(filteredData)}
            <section className='mt-4'>
                <h2 className='text-xl font-semibold'>Italian Tempo Terms</h2>
                <p className='pb-4 max-w-[65ch]'>This table contains common tempo markings like allegro or andante. In modern music these terms may be out of date because of a metronome mark such as &#x2669; = 120, meaning that the piece of music should be played at a tempo of 120 beats per minute (bpm).</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Term</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>BPM</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data["Tempo"].map((obj) => (
                            <TableRow key={obj.description} {...(obj.tempo === "Allegro" ? { id: "allegro" } : {})}>
                                <TableCell className="font-medium">{obj.tempo}</TableCell>
                                <TableCell>{obj.description}</TableCell>
                                <TableCell>{obj.bpm}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
            <section className='mt-8'>
                <h2 className='text-xl font-semibold'>Articulation</h2>
                <p className='pb-4 max-w-[65ch]'>Articulation affects their connection, length, and emphasis. Different articulation markings help musicians express various styles and emotions, from smooth legato to sharp staccato. Below is a list of common articulation terms with their meanings.</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Term</TableHead>
                        <TableHead>Meaning</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data["Articulation"].map((obj) => (
                        <TableRow key={obj.term} {...(obj.term === "sforzando" ? { id: "sforzando" } : {})}>
                            <TableCell className="font-medium">{obj.term}</TableCell>
                            <TableCell>{obj.description}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
            <section className='mt-8'>
                <h2 className='text-xl font-semibold'>Dynamics</h2>
                <p className='pb-4 max-w-[65ch]'>Dynamic markings do not refer to absolute volumnes. They are usually written under the stave or between two staves if there are two of them.</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Term</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Meaning</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data["Dynamics"].map((obj) => (
                        <TableRow key={obj.description} {...(obj.description === "mezzo-forte" ? { id: "mezzo-forte" } : {})}>
                            <TableCell className="font-medium italic font-serif">{obj.term}</TableCell>
                            <TableCell>{obj.description}</TableCell>
                            <TableCell>{obj.meaning}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
            <section className='mt-8'>
                <h2 className='text-xl font-semibold'>Mood</h2>
                <p className='pb-4 max-w-[65ch]'>This section lists common Italian terms that indicate the emotional character or expressive quality of a piece. These terms help performers convey the intended mood, feeling, or attitude of the music.</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Term</TableHead>
                        <TableHead>Meaning</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data["Mood"].map((obj) => (
                        <TableRow key={obj.term} {...(obj.term === "sforzando" ? { id: "sforzando" } : {})}>
                            <TableCell className="font-medium">{obj.term}</TableCell>
                            <TableCell>{obj.description}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
            <section className='mt-8'>
                <h2 className='text-xl font-semibold'>Repeats</h2>
                <p className='pb-4 max-w-[65ch]'>This table contains common music terms for repeats like da capo or dal segno. These terms indicate specific points in the music to return to and are essential for understanding the structure of a piece.</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Term</TableHead>
                            <TableHead>Symbol</TableHead>
                            <TableHead>Meaning</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data["Repeats"].map((obj) => (
                            <TableRow key={obj.term}>
                                <TableCell className="font-medium">{obj.term}</TableCell>
                                <TableCell>{typeof obj.symbol == "number" ? <span className="text-2xl leading-none">{String.fromCodePoint(obj.symbol)}</span> : obj.symbol}</TableCell>
                                <TableCell>{obj.meaning}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
            <section className='mt-8'>
                <h2 className='text-xl font-semibold'>General</h2>
                <p className='pb-4 max-w-[65ch]'>These general terms include terms that are commonly used in conjunction with other terms like <span className="italic">meno mosso</span> (slightly slower) or <span className="italic">molto rit</span> (noticable decrease in tempo).</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Term</TableHead>
                        <TableHead>Meaning</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data["General"].map((obj) => (
                        <TableRow key={obj.term} {...(obj.term === "sforzando" ? { id: "sforzando" } : {})}>
                            <TableCell className="font-medium">{obj.term}</TableCell>
                            <TableCell>{obj.meaning}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </main>
        <Footer />
    </>
  )
}

export default Dictionary