import React from "react";
import Card from "./CardContenidos";
import Navbar from "./Navbar";
import PruebaVideo from "../assets/videos/Prueba_video.mp4";
import ContenidoHero from "../assets/images/ContenidoHero.svg";
import Slider from "react-slick";

export function Contenido() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    autoplay: true, 
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white h-full w-full">
      <Navbar />
      <h1 className="text-center text-3xl font-secondary font-bold my-4 hover:underline">Videos</h1>
      <Slider {...settings} className="px-4">
        <Card title="Video de prueba Ciclo Hidalgo" videoUrl={PruebaVideo} />
        <Card title="Video de prueba Ciclo Hidalgo" videoUrl={PruebaVideo} />
        <Card title="Video de prueba Ciclo Hidalgo" videoUrl={PruebaVideo} />
        <Card title="Video de prueba Ciclo Hidalgo" videoUrl={PruebaVideo} />
        <Card title="Video de prueba Ciclo Hidalgo" videoUrl={PruebaVideo} />
        <Card title="Video de prueba Ciclo Hidalgo" videoUrl={PruebaVideo} />
      </Slider>
    

    </div>
  );
}

export default Contenido;
