import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { MdKingBed } from "react-icons/md";
import { MdBathtub } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { MdKitchen } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { MdOutlinePool } from "react-icons/md";

import Detalhes from "./Detalhes";

const Alojamentos = ({ alojamentosData, alojamentosAleatorios }) => {
  const [alojamentoSelecionado, setAlojamentoSelecionado] = useState(null);

  const handleDetalhesClick = (alojamento) => {
    setAlojamentoSelecionado(alojamento);
  };

  const resetAlojamentoSelecionado = () => {
    setAlojamentoSelecionado(null);
  };

  const results = alojamentosData && alojamentosData.results ? alojamentosData.results : [];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="offer container section">
      <div className="secContainer">
        {alojamentoSelecionado ? (
          <Detalhes alojamento={alojamentoSelecionado} onClose={resetAlojamentoSelecionado} />
        ) : (
          <div className="mainContent grid">
            {results.map((result, index) => (
              <div className="singleOffer" key={index}>
                <div className="destImage">
                  {result.images && result.images.length > 0 && (
                    <Slider {...settings}>
                      {result.images.map((image, imageIndex) => (
                        <div key={imageIndex}>
                          <img className="img-al" src={image} alt={`Image ${imageIndex + 1}`} />
                        </div>
                      ))}
                    </Slider>
                  )}
                  {result.discount && (
                    <span className="discount">
                      {result.discount}
                    </span>
                  )}
                </div>

                <div className="offerBody">
                  <p>
                    {result.name}
                  </p>
                  <div className="price flex">
                    {result.price &&
                      result.price.total &&
                      result.price.total > 0 && (
                        <h4 className="price-c">
                          {result.price.total} €
                        </h4>
                      )}

                    {result.rating && (
                      <span className="status">
                        {result.rating} <IoStar />
                      </span>
                    )}
                  </div>

                  <div className="amenities flex">
                    {result.bedrooms !== undefined && result.bedrooms !== 0 && (
                      <div className="singleAmenity flex">
                        <MdKingBed className="icon" />
                        <small className="infos-al">{`${result.bedrooms} Quarto(s)`}</small>
                      </div>
                    )}
                    {result.bathrooms !==0 && (
                      <div className="singleAmenity flex">
                        <MdBathtub className="icon" />
                        <small className="infos-al">{`${result.bathrooms} Casa(s) de banho`}</small>
                      </div>
                    )}
                    {result.previewAmenities && result.previewAmenities.includes("Wifi") && (
                      <div className="singleAmenity flex">
                        <FaWifi className="icon" />
                        <small className="infos-al">Wi-fi</small>
                      </div>
                    )}
                    {result.previewAmenities && result.previewAmenities.includes("Kitchen") && (
                      <div className="singleAmenity flex">
                        <MdKitchen className="icon" />
                        <small className="infos-al">Cozinha</small>
                      </div>
                    )}
                    {result.previewAmenities && result.previewAmenities.includes("Free parking") && (
                      <div className="singleAmenity flex">
                        <FaCar className="icon" />
                        <small className="infos-al">Estacionamento gratuito</small>
                      </div>
                    )}
                    {result.previewAmenities && result.previewAmenities.includes("Pool") && (
                      <div className="singleAmenity flex">
                        <MdOutlinePool className="icon" />
                        <small className="infos-al">Piscina</small>
                      </div>
                    )}

                  </div>

                  <div className="location flex">
                    {result.city && <MdLocationOn className="icon" />}
                    <small className="infos-al">{result.city}</small>
                  </div>

                  <button className="btn botao-detalhes flex" onClick={() => handleDetalhesClick(result)}>
                    Ver detalhes
                    <FaArrowRightLong className="icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Alojamentos;
