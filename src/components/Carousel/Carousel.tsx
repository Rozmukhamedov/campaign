import { Carousel } from "@mantine/carousel";
import { Card } from "components/Card/Card";
import "./style.css";
import { FC, useState } from "react";
import { CarouselBreakpoint } from "@mantine/carousel/lib/types";
import { MantineNumberSize } from "@mantine/core";
import AddToCart from "components/Card/AddToCard/AddToCart";
import { AiOutlinePlus } from "react-icons/ai";

type customCarouselProps = {
  CandidatesList?: any | unknown;
  height?: string | number;
  slideSize?: number | string;
  slideGap?: MantineNumberSize;
  align?: "start" | "center" | "end" | number;
  slidesToScroll?: number;
  withIndicators?: boolean;
  withControls?: boolean;
  breakpoints?: CarouselBreakpoint[];
  loop?: boolean;
};

const CusomCarousel: FC<customCarouselProps> = ({
  CandidatesList,
  height,
  slideSize,
  slideGap,
  align,
  slidesToScroll,
  withIndicators,
  withControls,
  breakpoints,
  loop,
}) => {
  const [showAddCand, setShowAddCand] = useState(false);
  return (
    <Carousel
      withControls={withControls}
      withIndicators={withIndicators}
      height={height}
      slideSize={slideSize}
      slideGap={slideGap}
      align={align}
      slidesToScroll={slidesToScroll}
      breakpoints={breakpoints}
      loop={loop}
    >
      {CandidatesList.data?.results.map((item: any, index: number) => {
        if(item.first_name !== "Undecided") { 
          return <div className="carousel" key={index}>
            <Carousel.Slide>
              <div className="flex">
                <Card item={item} />
              </div>
            </Carousel.Slide>
          </div>
        }
      })}
      <div className="carousel">
        <Carousel.Slide>
          {showAddCand ? (
            <AddToCart setShowAddCand={setShowAddCand} />
          ) : (
            <div className="card__add-btn">
              <i onClick={() => setShowAddCand(!showAddCand)}>
                <AiOutlinePlus />
              </i>
            </div>
          )}
        </Carousel.Slide>
      </div>
    </Carousel>
  );
};

export default CusomCarousel;
