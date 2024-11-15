import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FilteredItem } from "."
import { IoMdAlert } from "react-icons/io"

const renderResults = (submitted: boolean, filteredData: FilteredItem[]) => {
    return (
        <>
        {submitted && (
            filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                    <Table className="mb-5" key={index}>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{item.tempo ? "Term" : "Symbol"}</TableHead>
                                {(item.tempo || item.symbol) && <TableHead>Description</TableHead>}
                                <TableHead>{item.bpm ? "BPM" : "Meaning"}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <>
                                {item.tempo && (
                                    <TableRow key={item.description}>
                                        <TableCell className="font-medium italic font-serif">{item.tempo}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.bpm} BPM</TableCell>
                                    </TableRow>
                                )}
                                {item.symbol && (
                                    <TableRow key={item.description}>
                                        <TableCell className="font-medium italic font-serif">{item.symbol}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.meaning}</TableCell>
                                    </TableRow>
                                )}
                                {item.term && (
                                    <TableRow key={item.description}>
                                        <TableCell className="font-medium italic font-serif">{item.term}</TableCell>
                                        <TableCell>{item.meaning}</TableCell>
                                    </TableRow>
                                )}
                            </>
                        </TableBody>
                    </Table>
                ))
            ) : (
                <div className="flex flex-row gap-2 mb-5 items-center">
                    <IoMdAlert className="w-5 h-5" />
                    <p className="font-lg">Nothing found. Make sure your spelling is correct.</p>
                </div>
            )
        )}
        </>
    )
}

export default renderResults