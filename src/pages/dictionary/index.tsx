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

        const filteredTempo: FilteredItem[] = data.Tempo.filter((item) => 
            item.tempo.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.bpm.toLowerCase().includes(searchTerm.toLowerCase())
        )
    
        const filteredDynamics: FilteredItem[] = data.Dynamics.filter((dynamic) => 
            dynamic.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dynamic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dynamic.meaning.toLowerCase().includes(searchTerm.toLowerCase())
        )
    
        const filteredGeneral: FilteredItem[] = data.General.filter((term) => 
            term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
            term.meaning.toLowerCase().includes(searchTerm.toLowerCase())
        )
    
        const filteredItems = [
            ...filteredTempo,
            ...filteredDynamics,
            ...filteredGeneral
        ]

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
            <title>Dictionary</title>
            <meta name="description" content="Found a term you don't know? Look it up here." />
        </Helmet>
        <Navbar />
        <div className="px-4 pt-4 lg:w-[60%] lg:block lg:m-auto">
            <h1 className="text-2xl font-semibold pb-1 lg:text-3xl">Dictionary of Italian musical terms</h1>
            <p>Found a term you do not know? Look it up here</p>
            <form action="#" className='w-full flex flex-row gap-3 py-6' onSubmit={handleSubmit}>
                <Input type="text" placeholder='Search for a musical term' name='search' required value={searchTerm} onChange={e => handleChange(e)} className='text-base h-9 max-w-[20rem]' />
                <Button className='text-base h-9'>Search</Button>
            </form>
            {renderResults(submitted, filteredData)}
            <section className='mt-4'>
                <h2 className='text-xl font-semibold'>Tempo</h2>
                <p className='pb-4 max-w-[65ch]'>This table contains info on musical tempi. In modern music these terms may be out of date because of a metronome mark (such as &#x2669; = 120).</p>
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
                        <TableRow key={obj.description}>
                            <TableCell className="font-medium">{obj.tempo}</TableCell>
                            <TableCell>{obj.description}</TableCell>
                            <TableCell>{obj.bpm}</TableCell>
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
                        <TableRow key={obj.description}>
                            <TableCell className="font-medium italic font-serif">{obj.symbol}</TableCell>
                            <TableCell>{obj.description}</TableCell>
                            <TableCell>{obj.meaning} BPM</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
            <section className='mt-8'>
                <h2 className='text-xl font-semibold'>General</h2>
                <p className='pb-4 max-w-[65ch]'>These general terms include terms that are commonly used in conjunction with other terms like <span className="italic">meno mosso</span> (slower).</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Term</TableHead>
                        <TableHead>Meaning</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data["General"].map((obj) => (
                        <TableRow key={obj.term}>
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