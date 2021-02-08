import React from "react";
import Card from './Card';
import { Col, Row } from 'reactstrap';

class Cards extends React.Component{

  render(){
    let rows = []
    for(let i=0; i<6; i++){
      rows.push(
        <Col sm="6" lg="3">
            <Card titulo="Refeição">
                <p>café</p>
            </Card>
        </Col>
      )
    }
    return (
      <div>
          <Row>
              {rows} 
          </Row>
      </div>
    )
  }
}

export default Cards;
                