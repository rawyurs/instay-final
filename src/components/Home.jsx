import React, { useState, useEffect } from "react";
import axios from "axios";
import Alojamentos from "./Alojamentos";

const Home = () => {
  const [location, setLocation] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [numGuests, setNumGuests] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  
const fetchData = async () => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "https://airbnb13.p.rapidapi.com/search-location",
      params: {
        location,
        checkin,
        checkout,
        adults: numGuests,
        currency: "EUR",
      },
      headers: {
        "X-RapidAPI-Key": "9262a1e1f4msh9aeefe657db6df6p1ce450jsne34d4e801801",
        "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
      },
    });
    console.log(response.data)
    setSearchResults(response.data);
  } catch (error) {
    console.error(error);
  }
};

//testar api para alojamentos aleatorios em portugal antes de utilizar a pesquisa / passar uma noite

const fetchAlojamentosAleatorios = async () => {
  try {
    // Obter a data atual
    const hoje = new Date();

    // Calcular a data do dia seguinte
    const amanha = new Date();
    amanha.setDate(hoje.getDate() + 1);

    // Formatar as datas para o formato YYYY-MM-DD
    const checkin = hoje.toISOString().split('T')[0];
    const checkout = amanha.toISOString().split('T')[0];
    console.log(checkin)
    console.log(checkout)

    const response = await axios.request({
      method: "GET",
      url: "https://airbnb13.p.rapidapi.com/search-location",
      params: {
        location: 'Portugal',
        adults: 1,
        checkin: checkin,
        checkout: checkout,
        currency: 'EUR'
      },
      headers: {
        "X-RapidAPI-Key": "9262a1e1f4msh9aeefe657db6df6p1ce450jsne34d4e801801",
        "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
      },
    });

    console.log(response.data);
    setSearchResults(response.data);
  } catch (error) {
    console.error(error);
  }
};


const handleSearch = () => {
  setButtonClicked(true);
};

useEffect(() => {
  // Pesquisar após pressionar o botão de pesquisa, com base no local inserido
  if (buttonClicked) {
    fetchData();
    setButtonClicked(false);
  }
}, [buttonClicked]);

useEffect(() => {
  // Pesquisar alojamentos aleatórios em Portugal apenas na 1º vez que mostra
  fetchAlojamentosAleatorios();
}, []);


return (
  <section className="home">
    <div className="secContainer container">
      <div className="homeText">
        <h1 className="title">Planeia a tua viagem aqui</h1>
        <p className="subTitle">
          Explora Portugal de Norte a Sul com os melhores alojamentos locais
        </p>
      </div>

      <div className="homeCard grid">
        <div className="locationDiv">
          <label htmlFor="location">Onde</label>
          <input
            type="text"
            placeholder="Indicar destino"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="checkinDiv">
          <label htmlFor="checkin">Check In</label>
          <input
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
          />
        </div>

        <div className="checkoutDiv">
          <label htmlFor="checkout">Check Out</label>
          <input
            type="date"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
          />
        </div>

        <div className="npessoasDiv">
          <label htmlFor="npessoas">Adicionar hóspedes</label>
          <input
            type="number"
            id="points"
            name="points"
            step="1"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
          />
        </div>

        <button className="btn" onClick={handleSearch}>
          Pesquisar
        </button>
      </div>

      {searchResults && <Alojamentos alojamentosData={searchResults} />}
      {!searchResults && <Alojamentos isRandomMode={true} />}
    </div>
  </section>
);
};

export default Home;
