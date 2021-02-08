import './addalimento.css';
import React, { useState } from "react";
import { Button, Input, Label, FormGroup, Jumbotron, Alert, Container, Form } from 'reactstrap';
 
function AddAlimento() {

  const [alimento, setAlimento] = useState({
      nome: "",
      gramas: "",
      carbo: "",
      proteina: "",
      gordura: "",
      kcal: "",
      valor: "",
  });

  const [response, setResponse] = useState({
      formSave: false,
      type: "",
      message: "",
  });

  const onChangeInputFood = (e) =>
      setAlimento({ ...alimento, [e.target.name]: e.target.value });

  const sendAlimento = async (e) => {
      e.preventDefault();

      setResponse({ formSave: true });

      try {
      const res = await fetch("http://localhost:8080/alimentos", {
          method: "POST",
          body: JSON.stringify(alimento),
          headers: { "Content-Type": "application/json" },
      });

      const responseEnv = await res.json();

      if (responseEnv.error) {
          setResponse({
          formSave: false,
          type: "error",
          message: responseEnv.message,
          });
      } else {
          setResponse({
          formSave: false,
          type: "success",
          message: responseEnv.message,
          });
      }
      } catch (err) {
      setResponse({
          formSave: false,
          type: "error",
          message: "Erro: alimento não cadastrada com sucesso, tente mais tarde!",
      });
      }
  };

  return (
    <div className="addalimento">
      <p>
        +Cadastrar um novo alimento ao banco de dados+
      </p>
      <div className="form">
        {response.type === "error" ? (
            <Alert color="danger">{response.message}</Alert>
        ) : (
            ""
        )}
        {response.type === "success" ? (
            <Alert color="success">{response.message}</Alert>
        ) : (
            ""
        )}
        <form className="form" onSubmit={sendAlimento}>
          <div className="row">
          <FormGroup className="col">
              <Label for="nome">Nome do alimento</Label>
              <Input
              type="text"
              name="nome"
              id="nome"
              placeholder="exp: pão integral"
              onChange={onChangeInputFood}
              />
          </FormGroup>
          <FormGroup className="col">
              <Label for="gramas">Peso em gramas(g)</Label>
              <Input
              type="text"
              name="gramas"
              id="gramas"
              placeholder="exp: 30 "
              onChange={onChangeInputFood}
              />
          </FormGroup>
          <FormGroup className="col">
              <Label for="carbo">Carbo(g)</Label>
              <Input
              type="text"
              name="carbo"
              id="carbo"
              placeholder="exp: 20"
              onChange={onChangeInputFood}
              />
          </FormGroup>
          </div>
          <div className="row">
          <FormGroup className="col">
              <Label for="proteina">Proteina(g)</Label>
              <Input
              type="text"
              name="proteina"
              id="proteina"
              placeholder="exp: 10"
              onChange={onChangeInputFood}
              />
          </FormGroup>
          <FormGroup className="col">
              <Label for="gordura">Gordura(g)</Label>
              <Input
              type="text"
              name="gordura"
              id="gordura"
              placeholder="exp: 15"
              onChange={onChangeInputFood}
              />
          </FormGroup>
          <FormGroup className="col">
              <Label for="kcal">Kcal</Label>
              <Input
              type="text"
              name="kcal"
              id="kcal"
              placeholder="exp: 100"
              onChange={onChangeInputFood}
              />
          </FormGroup>
          <FormGroup className="col">
              <Label for="valor">Valor(R$)</Label>
              <Input
              type="text"
              name="valor"
              id="valor"
              placeholder="exp: 10"
              onChange={onChangeInputFood}
              />
          </FormGroup>
          </div>
          {response.formSave ? (
          <Button className="buton" type="submit" color="danger" disabled>
              Enviando...
          </Button>
          ) : (
          <Button className="buton" type="submit" outline color="danger">
              Cadastrar Alimento
          </Button>
          )}
        </form>
      </div>
    </div>
  )
}

export default AddAlimento;