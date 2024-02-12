import { Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious 
} from "../ui/carousel";
import CarouselCard from "./CarouselCard";
import { examples } from "@/lib/constants/examples";

const CarouselLayout = () => {
    return ( 
        <div className="pr-16 pl-16 pt-6 pb-6 bg-gradient-to-r from-gray-900 via-slate-700 to-slate-400">
            <h1 className="text-white font-bold text-lg p-2">Event snapshots</h1>
            <Carousel className="max-w-screen" opts={{align: "start", loop: true}}>
                <CarouselContent>
                    {examples.map((example, index) => (
                    <CarouselItem key={index} className="lg:basis-1/5 basis-1/3">
                        <CarouselCard image_url={example.imgUrl} title={example.title}/>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
     );
}
 
export default CarouselLayout;