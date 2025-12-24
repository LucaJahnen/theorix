import { Skeleton } from "@/components/ui/skeleton"

const Fallback: React.FC = () => {
    return (
        <div className="pt-4 lg:w-[60%]">
            <Skeleton className="h-7 w-full bg-gray-400 rounded-3xl" />
            <Skeleton className="h-7 w-[30%] bg-gray-400 mt-2 rounded-3xl" />
            <Skeleton className="h-4 w-full bg-gray-400 mt-5 rounded-xl" />
            <Skeleton className="h-4 w-full bg-gray-400 mt-2 rounded-xl" />
        </div>
    )
}

export default Fallback