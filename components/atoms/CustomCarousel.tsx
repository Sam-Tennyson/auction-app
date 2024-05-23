import React from "react";
import Carousel from "react-native-reanimated-carousel";

interface ICustomCarousel {
  data: any;
  height?: number;
  autoPlay?: boolean;
  baseOptions?: any;
  renderItem?: any;
}

const CustomCarousel = (props: ICustomCarousel) => {
  const { data = [], autoPlay = false, baseOptions = {}, renderItem } = props;

  return (
    <Carousel
      data={data}
      {...baseOptions}
      renderItem={renderItem}
      autoPlay={autoPlay}
      loop={true}
    />
  );
};

export default CustomCarousel;
