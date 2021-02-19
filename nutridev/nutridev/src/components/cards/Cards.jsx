import './card.css';
import Card from './Card';
import React, { useEffect, useState } from "react";

import { Col, Row } from 'reactstrap';

function Cards (){

    const [arrayCards, setArrayCards] = useState([]);

    useEffect(async () => {
      const cards = await getArrayCard()
      setArrayCards(cards)
    }, []);

    const getArrayCard = async () => {
      //Arrow function async q busca os dados
      try{
          const response = await fetch('http://localhost:8080/cardcads')   
          const data = await response.json();
          return [data]
      }catch(error){
          console.log("error", error);
      }
    };

    const total = arrayCards
    .map(p => p.cardcads[0].total.length)
    
    const cardAlimentos = arrayCards
    .map(p => p.cardcads[0].alimentos.length)

    const allCards = arrayCards
    .map(p => p.cardcads.length)

    var rows = []
    for(var i=0; i<allCards; i++){
      //======total====================================
      var totalCard = []
      for(var b=0; b<total; b++){
        arrayCards.map(card=>(
          totalCard.push(
            <td key={totalCard.toString()}>
              {card.cardcads[i].total[b]}
              </td>
        )))
      }
      //======cardContent====================================
      var cardContent = []
      for(var a=0; a<cardAlimentos; a++){
        arrayCards.map(card=>(
          cardContent.push(
            <tr key={cardContent.toString()}>
              <td>{card.cardcads[i].alimentos[a]}</td>
              <td>{card.cardcads[i].gramas[a]}</td>
              <td>{card.cardcads[i].carbo[a]}</td>
              <td>{card.cardcads[i].proteina[a]}</td>
              <td>{card.cardcads[i].gordura[a]}</td>
              <td>{card.cardcads[i].kcal[a]}</td>
              <td>{card.cardcads[i].valor[a]}</td>
            </tr>
        )))
      }
      arrayCards.map(card=>(
        rows.push(
          <Col key={rows.toString()}>
            <Card titulo={card.cardcads[i].refeicao}>
              <div className="table" key={rows.toString()}>
                <table id="table">
                  <thead>
                    <tr>
                        <th>Alimento</th>
                        <th>Gramas</th>
                        <th>Carbo</th>
                        <th>Proteina</th>
                        <th>Gordura</th>
                        <th>Kcal</th>
                        <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cardContent}
                    <tr>
                      <th>Total</th> 
                      {totalCard}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </Col>
      )))
    }
    
    //console.log(card);
    console.log(arrayCards);
    return (
      <div className="cards">
        <Row>
          {rows} 
        </Row>
      </div>
    )
}

export default Cards;
                