import { Badge } from "@/components/ui/badge"
import { getRandomColor } from "@/utils/getRandomColor"

export default function BadgeColor({ index, data }) {
    const bgColor = getRandomColor(index)

    return (
        <Badge className={bgColor}>{data.nama}-{data.kkm}</Badge>
    )
}
