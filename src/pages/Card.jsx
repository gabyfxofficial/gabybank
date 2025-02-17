import React, { useState, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";
import { FaCopy } from "react-icons/fa";
import "../styles/card.css";

function Card() {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        const username = localStorage.getItem("username");
        const user =
          data.users.find((u) => u.username === username) || data.users[0];
        setLoggedUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUser();
  }, []);

  const cards = [
    {
      id: 1,
      brand: "Visa",
      fullNumber: "4539 4512 0398 7356",
      expiry: "09/27",
      cvv: "321",
      cardInfo: "Standard Visa Card",
    },
    {
      id: 2,
      brand: "Visa",
      fullNumber: "4556 7375 8689 9855",
      expiry: "03/25",
      cvv: "789",
      cardInfo: "Gold Visa Card",
    },
  ];

  const updatedCards = cards.map((card) => ({
    ...card,
    cardholder: loggedUser
      ? `${loggedUser.firstName} ${loggedUser.lastName}`
      : "USER NAME",
  }));

  useEffect(() => {
    const cardElements = document.querySelectorAll(".bank-cards-item");
    if (cardElements.length) {
      VanillaTilt.init(cardElements, {
        max: 10,
        speed: 400,
        reverse: true,
      });
    }
  }, [updatedCards]);

  const handleCopy = (text, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="base-template">
      <div className="wrapper base-template__wrapper">
        <div className="base-template__content">
          <h2 className="cards-title">My Cards</h2>
          <div className="bank-cards">
            {updatedCards.map((card) => (
              <div key={card.id} tabIndex="0" className="bank-cards-item">
                <div className="bank-cards-item__side front">
                  <div className="bank-cards-item__inner">
                    <div className="bank-cards-item__nfc-symbol">
                      <img
                        src="https://bato-web-agency.github.io/bato-shared/img/bank-cards/nfc.svg"
                        alt="NFC"
                      />
                    </div>
                    <div className="bank-cards-item__details">
                      <div className="bank-cards-item__cardholder">
                        <div className="bank-cards-item__label">Cardholder</div>
                        <div className="bank-cards-item__name">
                          {card.cardholder}
                        </div>
                      </div>
                      <div className="bank-cards-item__provider">
                        <img
                          src="https://bato-web-agency.github.io/bato-shared/img/bank-cards/visa.svg"
                          alt="Visa"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bank-cards-item__figure">
                    <svg
                      width="190"
                      height="190"
                      viewBox="0 0 190 190"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip-1)">
                        <mask
                          id="mask-1"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="16"
                          y="-91"
                          width="240"
                          height="245"
                        >
                          <path
                            d="M97.6683 -89L23.2772 140.468C21.5689 145.737 28.4245 149.462 31.9156 145.161L115.04 42.7571C118.051 39.0476 124.051 41.2701 123.92 46.0461L121.612 129.779C121.471 134.896 128.198 136.894 130.873 132.53L250 -61.8044"
                            stroke="white"
                            strokeWidth="12"
                          />
                        </mask>
                        <g mask="url(#mask-1)">
                          <rect
                            x="15"
                            y="-111"
                            width="2502"
                            height="300"
                            fill="url(#gradient-1)"
                          />
                        </g>
                      </g>
                      <defs>
                        <linearGradient
                          id="gradient-1"
                          x1="15"
                          y1="39"
                          x2="2517"
                          y2="39"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#06FF5E" />
                          <stop offset="0.152355" stopColor="#06FF5E" />
                          <stop offset="0.349" stopColor="#FCCD01" />
                          <stop offset="0.494" stopColor="#FFF900" />
                          <stop offset="0.624" stopColor="#FDCD01" />
                          <stop offset="0.849553" stopColor="#06FF5E" />
                          <stop offset="1" stopColor="#06FF5E" />
                        </linearGradient>
                        <clipPath id="clip-1">
                          <rect width="190" height="190" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="bank-cards-item__side back">
                  <div className="bank-cards-item__inner">
                    <div className="bank-cards-item__number">
                      <div>{card.fullNumber}</div>
                      <button
                        className="copy-btn copy-btn--card-number"
                        onClick={(e) => handleCopy(card.fullNumber, e)}
                      >
                        <FaCopy />
                      </button>
                    </div>
                    <div className="bank-cards-item__secure">
                      <div>
                        {card.expiry}
                        <button
                          className="copy-btn"
                          onClick={(e) => handleCopy(card.expiry, e)}
                        >
                          <FaCopy />
                        </button>
                      </div>
                      <div>
                        {card.cvv}
                        <button
                          className="copy-btn"
                          onClick={(e) => handleCopy(card.cvv, e)}
                        >
                          <FaCopy />
                        </button>
                      </div>
                    </div>
                    <div className="bank-cards-item__description">
                      {card.cardInfo}. For any inquiries, please call our 24/7
                      support line: +40-732-612-792.
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Card;
