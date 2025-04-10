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
    symbol?: string;
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
            return list.filter((item) =>
                Object.values(item).some((value) => 
                    value.toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
        }

        const filteredItems = Object.values(data)
            .map((item) => findMatchInData(item, searchTerm))
            .filter(arr => arr.length > 0)
            .flat()

        setSubmitted(true)
        setFilteredData(filteredItems)
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
            <meta name="description" content="Explore key musical terms for tempo like allegro, accelerando, and molto rit in this comprehensive glossary for musicians." />
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
        <Navbar />
        <div className="px-4 pt-6 lg:w-[60%] lg:block lg:m-auto">
            <h1 className="text-3xl font-semibold pb-4">Italian musical terms</h1>
            <p className="leading-relaxed max-w-[65ch]">Most of the terms used in music theory are Italian. This list covers music terms that specify a certain tempo or describe a way of playing. If you found a term you do not know look it up effortlessly using the search.</p>
            <form action="#" className='w-full flex flex-row gap-3 py-6' onSubmit={handleSubmit}>
                <Input type="text" placeholder='Search for a musical term' name='search' required value={searchTerm} onChange={e => handleChange(e)} className='text-base h-10 max-w-[20rem]' />
                <Button className='text-base h-10 bg-primary dark:bg-primary-altered'>Search</Button>
            </form>
            {renderResults(submitted, filteredData)}
            <section className='mt-4'>
                <h2 className='text-xl font-semibold'>Italian Tempo Terms</h2>
                <p className='pb-4 max-w-[65ch]'>This table contains common tempo markings like allegro or andante. In modern music these terms may be out of date because of a metronome mark such as &#x2669; = 120, meaning that the piece should be played at a tempo of 120 beats per minute (bpm).</p>
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
                        <TableHead>Symbol</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Meaning</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data["Dynamics"].map((obj) => (
                        <TableRow key={obj.description} {...(obj.description === "mezzo-forte" ? { id: "mezzo-forte" } : {})}>
                            <TableCell className="font-medium italic font-serif">{obj.symbol}</TableCell>
                            <TableCell>{obj.description}</TableCell>
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
        </div>
        <Footer />
    </>
  )
}

export default Dictionary