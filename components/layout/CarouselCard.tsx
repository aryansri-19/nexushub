import { Card, CardContent } from "../ui/card";
import Image from "next/image";
interface CarouselCardProps {
    image_url: string;
    title: string;
}
const CarouselCard = ({image_url, title}: CarouselCardProps) => {
    return ( 
        <div className="p-1">
            <Card className="bg-gray-900">
            <CardContent className="flex flex-col aspect-square items-center justify-center p-1">
                <div className="">
                    <Image
                    src={image_url}
                    alt={title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    />
                </div>
            </CardContent>
            </Card>
        </div>
     );
}
 
export default CarouselCard;