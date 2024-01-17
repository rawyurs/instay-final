import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { MdKingBed } from "react-icons/md";
import { MdBathtub } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { MdKitchen } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { MdOutlinePool } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { FaBed } from "react-icons/fa6";
import { IoChevronBackCircle } from "react-icons/io5";
import { BiSolidWasher } from "react-icons/bi";
import { PiMedalFill } from "react-icons/pi";
import { MdLocalOffer } from "react-icons/md";
import { MdRestaurant } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";

import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement('#root');

const Detalhes = ({ alojamento, onClose }) => {
  const [primeiroLocationId, setPrimeiroLocationId] = useState(null);
  const [restaurantes, setRestaurantes] = useState([]);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scrollPercentage] = useState(38);


  // Adicione a função para ajustar a posição do scroll
  const adjustScrollPosition = () => {
    const scrollPosition = (scrollPercentage / 100) * document.body.scrollHeight;
    window.scrollTo(0, scrollPosition);
  };

  const toggleAllPhotos = () => {
    setShowAllPhotos(!showAllPhotos);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const restaurantesTripAdvisor = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation",
        params: { query: alojamento.address },
        headers: {
          'X-RapidAPI-Key': '9262a1e1f4msh9aeefe657db6df6p1ce450jsne34d4e801801',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      });

      const primeiroLocationId = response.data.data[0].locationId;
      console.log(primeiroLocationId);
      setPrimeiroLocationId(primeiroLocationId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    adjustScrollPosition();
    restaurantesTripAdvisor();
  }, []);

  const restaurantesTripAdvisorZona = async () => {
    try {
      if (primeiroLocationId !== null) {
        const response = await axios.request({
          method: 'GET',
          url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants',
          params: {
            locationId: primeiroLocationId
          },
          headers: {
            'X-RapidAPI-Key': '9262a1e1f4msh9aeefe657db6df6p1ce450jsne34d4e801801',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
          }
        });
        console.log(response.data);
        const restaurantesData = response.data.data;
        setRestaurantes(restaurantesData);

      } else {
        console.log("primeiroLocationId ainda não está definido");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    adjustScrollPosition();
    restaurantesTripAdvisorZona();
  }, [primeiroLocationId]);


  const reservarAlojamento = () => {

    // Supondo que alojamento.deeplink é o deeplink fornecido pela API
    const urlOriginal = new URL(alojamento.deeplink);

    // Parâmetros adicionais para o link
    urlOriginal.searchParams.set("productId", alojamento.id);
    urlOriginal.searchParams.set("isWorkTrip", "false");
    urlOriginal.searchParams.set("numberOfChildren", "0");
    urlOriginal.searchParams.set("numberOfGuests", "1");
    urlOriginal.searchParams.set("numberOfInfants", "0");
    urlOriginal.searchParams.set("numberOfPets", "0");

    urlOriginal.host = "www.airbnb.pt";

    urlOriginal.pathname = `/book/stays/${alojamento.id}`;

    // Abrir o link modificado num novo separador
    window.open(urlOriginal.href, '_blank');
  };

  return (
    <div className="house-details">
      <div className="botao-fechar">
        <button className="btn botao-detalhes2" onClick={onClose}>
          <IoChevronBackCircle className="icon" />
        </button>
      </div>
      <div className="house-title">
        <h2>{alojamento.name}</h2>
        <div className="row-detalhes">
          <div>
            <IoStar className="detalhes-icones" /> {alojamento.rating}
            <span className="span-detalhes">{alojamento.reviewsCount} Avaliações</span>
          </div>
          <div>
            <p><MdLocationOn className="detalhes-icones" /> {alojamento.address}</p>
          </div>
        </div>
      </div>
      <div className="gallery">
        {/* Mostrar todas as fotos se showAllPhotos for verdadeiro, caso contrário, mostrar apenas as primeiras 5 */}
        {alojamento.images && (showAllPhotos ? alojamento.images : alojamento.images.slice(0, 5)).map((image, index) => (
          <img
            className={`i-detalhes ${index === 0 ? 'first-image' : ''}`}
            key={index}
            src={image}
            alt={`Imagem ${index + 1}`}
            onClick={() => openImageModal(image)} // Adiciona o clique para abrir a imagem em um modal
          />
        ))}
      </div>
      {/* Adiciona o botão para mostrar/ocultar todas as fotos */}
      <div className="personalizar-div-mostrar">
        <button className="btn-mostrar-fotos" onClick={toggleAllPhotos}>
          <IoMdPhotos className="icon-todas-fotos" />
          {showAllPhotos ? 'Ocultar Fotos' : 'Mostrar todas as fotos'}
        </button>
      </div>

      {/* Modal para mostrar a imagem em tamanho ampliado */}
      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeImageModal}
        contentLabel="Imagem Ampliada"
        className="custom-modal"
      >
        {selectedImage && <img src={selectedImage} alt="Imagem Ampliada" />}
        <button className="btn-mostrar-fotos" onClick={closeImageModal}>Voltar</button>
      </Modal>
      <div className="topo">
        <h2>{alojamento.type}</h2>
        <div className="amenities flex">
          {alojamento.persons && (
            <div className="singleAmenity flex">
              <FaPerson className="icon" />
              <small className="infos-al">{`${alojamento.persons} Hóspedes`}</small>
            </div>
          )}
          {alojamento.bedrooms !== 0 && alojamento.bedrooms !== undefined && (
            <div className="singleAmenity flex">
              <MdKingBed className="icon" />
              <small className="infos-al">{`${alojamento.bedrooms} Quarto(s)`}</small>
            </div>
          )}
          {alojamento.bedrooms !== 0 && (
            <div className="singleAmenity flex">
              <FaBed className="icon" />
              <small className="infos-al">{`${alojamento.beds} Cama(s)`}</small>
            </div>
          )}
          {alojamento.bathrooms !== 0 && (
            <div className="singleAmenity flex">
              <MdBathtub className="icon" />
              <small className="infos-al">{`${alojamento.bathrooms} Casa(s) de banho`}</small>
            </div>
          )}
        </div>
      </div>
      <hr className="line" />

      <div className="caixinha">
        <div>
          <div className="circle">
            {alojamento.images.slice(0, 1).map((imageIndex) => (
              <div key={imageIndex}>
                <img className="foto-host" src={alojamento.hostThumbnail} alt={` ${imageIndex + 1}`} />
              </div>
            ))}
            <h4>Anfitrião</h4>
            <p className="paragrafo-anfitriao">nº {alojamento.userId}</p>
          </div>
        </div>
        <div>
          {alojamento.isSuperhost ? (
            <div>
              <h4 className="comentario-host"><PiMedalFill className="icon" /> Este anfitrião é um Superhost!</h4>
              <p className="paragrafo-superhost">Os Superhosts são anfitriões experientes e com excelentes avaliações, empenhados em proporcionar ótimas estadias aos seus hóspedes.</p>
            </div>
          ) : (
            <div>
              <h4 className="comentario-host"><PiMedalFill className="icon" /> Este anfitrião não é um Superhost!</h4>
              <p className="paragrafo-superhost">Os Superhosts são anfitriões experientes e com excelentes avaliações, empenhados em proporcionar ótimas estadias aos seus hóspedes.</p>
            </div>
          )}
        </div>
        <div>
          <div className="reservar-caixa">
            <h1 className="preco-titulo">€ {alojamento.price.total}<span className="modificar-total">total</span></h1>
            <hr className="line3" />
            <button type="button" onClick={reservarAlojamento}>
              Reservar
            </button>
          </div>
        </div>
      </div>

      <hr className="line" />

      <h1 className="modificar-h1"><MdLocalOffer /> O que este espaço oferece</h1>
      <div className="topo">
        <div className="amenities flex">
          {alojamento.previewAmenities && alojamento.previewAmenities.includes("Wifi") && (
            <div className="singleAmenity flex">
              <FaWifi className="icon" />
              <small className="infos-al">Wi-fi</small>
            </div>
          )}
          {alojamento.previewAmenities && alojamento.previewAmenities.includes("Kitchen") && (
            <div className="singleAmenity flex">
              <MdKitchen className="icon" />
              <small className="infos-al">Cozinha</small>
            </div>
          )}
          {alojamento.previewAmenities && alojamento.previewAmenities.includes("Free parking") && (
            <div className="singleAmenity flex">
              <FaCar className="icon" />
              <small className="infos-al">Estacionamento gratuito</small>
            </div>
          )}
          {alojamento.previewAmenities && alojamento.previewAmenities.includes("Pool") && (
            <div className="singleAmenity flex">
              <MdOutlinePool className="icon" />
              <small className="infos-al">Piscina</small>
            </div>
          )}
          {alojamento.previewAmenities && alojamento.previewAmenities.includes("Washer") && (
            <div className="singleAmenity flex">
              <BiSolidWasher className="icon" />
              <small className="infos-al">Máquina de lavar</small>
            </div>
          )}
        </div>
        <h1 className="modificar-h1"><MdRestaurant /> Explore os sabores da região</h1>
        <div className="featured-listings">
          {(restaurantes.data || []).slice(0, 4).map((restaurante, index) => (
            <div className="restaurant-card" key={index}>
              <div className="card-header" style={{ background: `url(${restaurante.thumbnail && restaurante.thumbnail.photo && restaurante.thumbnail.photo.photoSizes[4] ? restaurante.thumbnail.photo.photoSizes[4].url : 'https://creativevip.net/resource-images/16-restaurant-icons-3.png'})`, backgroundSize: "cover" }}>
                <div className="favorite-btn">
                  <MdRestaurant className="icon-restaurante" />
                </div>
              </div>
              <div className="card-body">
                <h1 className="titulos-restaurantes">{restaurante.name}</h1>
                <p className="morada-r"><MdLocationOn className="detalhes-icones" />{restaurante.parentGeoName}</p>
                <p>{restaurante.priceTag}</p>
                <p>{restaurante.establishmentTypeAndCuisineTags[0]}</p>
                <p><FaClock /> {restaurante.currentOpenStatusText}</p>
                <p className="morada-r"><IoStar /> {restaurante.averageRating} ({restaurante.userReviewCount})</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detalhes;





