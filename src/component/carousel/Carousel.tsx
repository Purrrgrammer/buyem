import { useEffect, useState } from "react";
import { carouselContent } from "../../base";

const Carousel = () => {
  let [contentIndex, setContentIndex] = useState<number>(0);
  const [dotNumber, setDotNumber] = useState<number[]>([]);
  const contentlimit = { min: 0, max: carouselContent.length - 1 };

  const changeContentHandler = (direction: "pre" | "next") => {
    if (direction === "pre") {
      setContentIndex(contentIndex - 1);
      if (contentIndex <= contentlimit.min) {
        setContentIndex(contentlimit.max);
      }
    }
    if (direction === "next") {
      setContentIndex(contentIndex + 1);
      if (contentIndex >= contentlimit.max) {
        setContentIndex(contentlimit.min);
      }
    }
  };
  const setDotContent = (dotNumber: number) => {
    setContentIndex(dotNumber);
  };
  useEffect(() => {
    let numberofContent: number[] = [];
    for (let i = 0; i <= contentlimit.max; i++) {
      console.log(i);
      numberofContent.push(i);
    }
    setDotNumber(numberofContent);
  }, []);

  useEffect(() => {
    console.log(contentIndex);
  }, [contentIndex]);

  return (
    <div className="carousel">
      <button
        className="carousel-pre"
        onClick={() => {
          changeContentHandler("pre");
        }}
      >
        <img
          className="left-carousel"
          src="https://images.vexels.com/media/users/3/136983/isolated/preview/73c5e7dbef9d885a306c8927ef12f465-thick-right-arrowhead.png"
          alt=""
        />
      </button>
      <img
        className="carousel-img"
        src={carouselContent[contentIndex]?.background}
        alt={carouselContent[contentIndex]?.header}
      />
      <div className="dots">
        {dotNumber.map((el: number) => (
          <img
            onClick={() => {
              setDotContent(el);
            }}
            key={el}
            className={`aDot ${contentIndex === el ? "activeDot" : undefined}`}
            src="https://static.vecteezy.com/system/resources/previews/001/209/957/original/square-png.png"
          />
        ))}
      </div>
      <button
        className="carousel-next"
        onClick={() => {
          changeContentHandler("next");
        }}
      >
        <img
          src="https://images.vexels.com/media/users/3/136983/isolated/preview/73c5e7dbef9d885a306c8927ef12f465-thick-right-arrowhead.png"
          alt=""
        />
      </button>
    </div>
  );
};

export default Carousel;
