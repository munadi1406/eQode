import { Skeleton } from '@/components/ui/skeleton'


export default function LoaderTemplateMapel() {
    return (
        <>
            <Skeleton className={"h-[150px] w-full rounded-md"} />
            <Skeleton className={"h-[150px] w-full rounded-md"} />
            <Skeleton className={"h-[150px] w-full rounded-md"} />
        </>
    )
}
