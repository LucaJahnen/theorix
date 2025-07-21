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

const renderResults = (filteredData: FilteredItem[]) => {
    const uniqueKeys: string[][] = []
    const sortedData: Record<string, FilteredItem[]> = {}

    // Iterate through filteredData to group items by their keys
    filteredData.map((data) => {
        const keys = Object.keys(data)
        if (!uniqueKeys.includes(keys)) {
            uniqueKeys.push(keys)
            if(sortedData[JSON.stringify(keys)] === undefined) {
                sortedData[JSON.stringify(keys)] = []
            }
            sortedData[JSON.stringify(keys)].push(data)
        }
    })
    return (
        <>
        {Object.entries(sortedData).length > 0 ? Object.entries(sortedData).map(([key, items]) => (
            <Table className="mb-5">
                    <TableHeader>
                            <TableRow>
                                {JSON.parse(key).map((k: string) => (
                                    <TableHead key={k}>{k.charAt(0).toUpperCase() + k.slice(1)}</TableHead>
                                ))}
                            </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow>
                                {Object.values(item).map(value => (
                                    <TableCell key={value}>{typeof value === "number" ? <span className="text-2xl leading-none">{String.fromCodePoint(value)}</span> : value}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
            </Table>
        )) : (
            <div className="flex flex-row gap-2 mb-5 items-start">
                <IoMdAlert className="w-5 h-5" />
                <p className="text-sm">Nothing found. Make sure your spelling is correct.</p>
            </div>
        )}
        </>
    )
}

export default renderResults