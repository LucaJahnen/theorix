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
            return list.filter((item) =>
                Object.values(item).some((value) => {
                    if(typeof value === "string") {
                        return value.toLowerCase().includes(searchTerm.toLowerCase())
                    }
                })
            )
        }

        const filteredItems = data.map((item) => findMatchInData(item.terms, searchTerm))
            .filter(arr => arr.length > 0)
            .flat()
            .filter(arr => arr !== null)


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
            <meta name="description" content="Discover the meaning of essential Italian musical terms like meno mosso, molto, and other tempo, expression, and articulation markings. A clear glossary for musicians seeking definitions of Italian tempo terms and expressive instructions." />
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
            <link rel="canonical" href="https://theorix.netlify.app/musical-terms" />
        </Helmet>
        <Navbar />
        <main className="px-4 pt-6 lg:w-[60%] lg:block lg:m-auto">
            <h1 className="text-3xl font-semibold pb-4">Italian music terms</h1>
            <p className="leading-relaxed max-w-[65ch]">Italian is the universal language of classical music. This page provides definitions and explanations of common Italian musical terms used to indicate tempo, expression, dynamics, articulation, and more &#8210; helping musicians interpret music accurately and with style. You can quickly find any term using the search function below.</p>
            <form action="#" className='w-full flex flex-row gap-3 pt-6 pb-2' onSubmit={handleSubmit}>
                <Input type="text" placeholder='Search for a musical term' name='search' required value={searchTerm} onChange={e => handleChange(e)} className='text-base h-10 max-w-[20rem]' />
                <Button className='text-base h-10 bg-primary dark:bg-primary-altered'>Search</Button>
            </form>
            {submitted && renderResults(filteredData)}
            {data.map(({ title, desc, style, terms }) => (
                <section className='mt-8' key={title}>
                    <h2 className='text-xl font-semibold'>{title}</h2>
                    <p className='pb-4 max-w-[65ch]'>{desc}</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {Object.keys(terms[0]).map((key) => (
                                    <TableHead key={key}>{key == "bpm" ? key.toUpperCase():  key.charAt(0).toUpperCase() + key.slice(1)}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {terms.map((obj) => (
                                <TableRow key={Object.values(obj).join('-')}>
                                    {Object.entries(obj).map(([key, value], index) => (
                                        <TableCell key={key} className={style[index] || ""}>
                                            {typeof value === "number" ? <span className="text-2xl leading-none">{String.fromCodePoint(value)}</span> : value}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            ))}
        </main>
        <Footer />
    </>
  )
}

export default Dictionary