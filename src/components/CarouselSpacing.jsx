import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselSpacing({data}) {
  return (
    <Carousel className="w-full p-10 ">
    <h1 className="font-semibold text-2xl">Featured Courses</h1>
      <CarouselContent className="-ml-1">
        {data?.map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3 ">
            <div className="p-1 ">
              <Card className="">
                <CardContent className="flex aspect-square items-center justify-center h-56 w-full p-1">
                  <img src={_.thumbnail} className="h-48 w-auto"/>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
