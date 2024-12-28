import { useState, useEffect } from "react";
import placeHolderImage from "../assets/placeHolderImage.jpg";

function CustomImage({ image, alt }: { image: string; alt: string }) {
  const [imageSrc, setImageSrc] = useState(image);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImageSrc(image);
  }, [image]);

  if (!imageSrc || imageSrc === "" || imageSrc === null || error) {
    return <img alt={alt} src={placeHolderImage} style={{height:'100%', width:'100%'}}/>;
  }

  return (
    <img
      alt={alt}
      src={imageSrc}
      onError={() => {
        setError(true);
      }}
    />
  );
}

export default CustomImage;
