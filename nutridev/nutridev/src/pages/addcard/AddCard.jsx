import './addcard.css';
import React, { useEffect, useState } from "react";
import Card from '../../components/cards/Card';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

var cardtotal=[]

let click = false
var nome2=[]
var gramas2=[]
var carbo2=[]
var proteina2=[]
var gordura2=[]
var kcal2=[]
var valor2=[]

function AddCard() {
    // criei uma variável local q armazena o estado local da lista
    const [arrayAlimentos, setArrayAlimentos] = useState({});

    const [novoCard, setNovoCard] = useState({})

    const [refeicao, setRefeicao] = useState({})

    const [cadNovoCard, setCadNovoCard] = useState({})

    const [chosenFood, setChosenFood] = useState({
        nome: "",
        gramas: "",
    });

    useEffect(async () => {
        // esse cara é chamado quando carrega esse componente
        const alimentos = await getArrayAlimentos()
        setArrayAlimentos(alimentos)
    }, []);

    useEffect(async () => {
      setCadNovoCard({
        ...cadNovoCard,
        refeicao: refeicao.refeicao,})
  }, [refeicao]);

    const getArrayAlimentos = async () => {
        //Arrow function async q busca os dados
        try{
            const response = await fetch('http://localhost:8080/alimentos')   
            const data = await response.json();
            return data
        }catch(error){
            console.log("error", error);
        }
    };

    //console.log(arrayAlimentos);

    const onChangeInputCard = (e) =>{
      e.preventDefault()
      setChosenFood({ ...chosenFood, [e.target.name]: e.target.value });
    }

    const onChangeInputRefeicao = (e) =>{
      e.preventDefault()
      setRefeicao({ ...refeicao, [e.target.name]: e.target.value });
    }
        
    const createCard = async (e) => {
        e.preventDefault();
        //filtrar o _id de arrayAlimentos
        const filterGramas = arrayAlimentos != null && arrayAlimentos.alimentos != null && arrayAlimentos.alimentos
        .filter(p => p.nome === chosenFood.nome) // inline
        .map(p => p.gramas);

        const filterCarbo = arrayAlimentos != null && arrayAlimentos.alimentos != null && arrayAlimentos.alimentos
        .filter(p => p.nome === chosenFood.nome) // inline
        .map(p => p.carbo);

        const filterProteina = arrayAlimentos != null && arrayAlimentos.alimentos != null && arrayAlimentos.alimentos
        .filter(p => p.nome === chosenFood.nome) // inline
        .map(p => p.proteina);

        const filterGordura = arrayAlimentos != null && arrayAlimentos.alimentos != null && arrayAlimentos.alimentos
        .filter(p => p.nome === chosenFood.nome) // inline
        .map(p => p.gordura);

        const filterKcal = arrayAlimentos != null && arrayAlimentos.alimentos != null && arrayAlimentos.alimentos
        .filter(p => p.nome === chosenFood.nome) // inline
        .map(p => p.kcal);

        const filterValor = arrayAlimentos != null && arrayAlimentos.alimentos != null && arrayAlimentos.alimentos
        .filter(p => p.nome === chosenFood.nome) // inline
        .map(p => p.valor);
        
        //regra de 3 pra monta a nova tabela
        const a = parseInt(chosenFood.gramas);
        const b = parseInt(filterGramas[0]);
        const x = a * 100;
        const y = x / b;
        const total = y / 100;

        setNovoCard({
            ...novoCard,
            nome: chosenFood.nome,
            gramas: (b * total).toFixed(2),
            carbo: (parseInt(filterCarbo) * total).toFixed(2),
            proteina: (parseInt(filterProteina) * total).toFixed(2),
            gordura: (parseInt(filterGordura) * total).toFixed(2),
            kcal: (parseInt(filterKcal) * total).toFixed(2),
            valor: (parseInt(filterValor) * total).toFixed(2),
  
        });

        setCadNovoCard({
          ...cadNovoCard,
          refeicao: refeicao.refeicao,
          alimentos: nome2,
          gramas: gramas2,
          carbo: carbo2,
          proteina: proteina2,
          gordura: gordura2,
          kcal: kcal2,
          valor: valor2,
          total: cardtotal,
        });
        click=true
    };

    if(click){
      nome2.push(novoCard.nome)
      gramas2.push(novoCard.gramas)
      carbo2.push(novoCard.carbo)
      proteina2.push(novoCard.proteina)
      gordura2.push(novoCard.gordura)
      kcal2.push(novoCard.kcal)
      valor2.push(novoCard.valor)
      click=false
    }
    //soma a tabela==============================================
    var totalGramas = 0
    for (let i=0; i<nome2.length; i++){
      if(nome2.length==0){
        totalGramas=parseInt(gramas2[i])
      }else{
        totalGramas=totalGramas+parseInt(gramas2[i])
      }
    }
    var totalCarbo = 0
    for (let i=0; i<nome2.length; i++){
      if(nome2.length==0){
        totalCarbo=parseInt(carbo2[i])
      }else{
        totalCarbo=totalCarbo+parseInt(carbo2[i])
      }
    }
    var totalProteina = 0
    for (let i=0; i<nome2.length; i++){
      if(nome2.length==0){
        totalProteina=parseInt(proteina2[i])
      }else{
        totalProteina=totalProteina+parseInt(proteina2[i])
      }
    }
    var totalGordura = 0
    for (let i=0; i<nome2.length; i++){
      if(nome2.length==0){
        totalGordura=parseInt(gordura2[i])
      }else{
        totalGordura=totalGordura+parseInt(gordura2[i])
      }
    }
    var totalKcal = 0
    for (let i=0; i<nome2.length; i++){
      if(nome2.length==0){
        totalKcal=parseInt(kcal2[i])
      }else{
        totalKcal=totalKcal+parseInt(kcal2[i])
      }
    }
    var totalValor = 0
    for (let i=0; i<nome2.length; i++){
      if(nome2.length==0){
        totalValor=parseInt(valor2[i])
      }else{
        totalValor=totalValor+parseInt(valor2[i])
      }
    }
    //=========================================================== 
    let rows = []
    for (let i=0; i<nome2.length; i++){
      rows.push(
        <tr className="table" key={rows.toString()}>
          <td>{nome2[i]}</td>
          <td>{gramas2[i]}</td>
          <td>{carbo2[i]}</td>
          <td>{proteina2[i]}</td>
          <td>{gordura2[i]}</td>
          <td>{kcal2[i]}</td>
          <td>{valor2[i]}</td>
        </tr>
      )
    }

    const renderList = () =>
      <div className="table" key={novoCard.toString()}>
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
              {rows}
              <tr>
                <td>Total</td>
                <td>{totalGramas}</td>
                <td>{totalCarbo}</td>
                <td>{totalProteina}</td>
                <td>{totalGordura}</td>
                <td>{totalKcal}</td>
                <td>{totalValor}</td>
              </tr>
            </tbody>
        </table>
      </div>
      
    const renderListFoods = () => (
        <Input
            type="select"
            name="nome"
            id="nome"
            onChange={onChangeInputCard}>
            <option>Selecione um alimento</option>
            {arrayAlimentos != null && arrayAlimentos.alimentos != null && arrayAlimentos.alimentos.map((alimento) => (
            <option key={alimento._id}>{alimento.nome}</option>
            ))}
        </Input>
    )

  //cadastra card==============================================
  const sendCard = async (e) => {
    e.preventDefault();

    cardtotal.push(
      totalGramas,totalCarbo,
      totalProteina,totalGordura,
      totalKcal,totalValor
      )

    try {
      const res = await fetch("http://localhost:8080/cardcads", {
          method: "POST",
          body: JSON.stringify(cadNovoCard),
          headers: { "Content-Type": "application/json" },
      });

      const responseEnv = await res.json();

      if (responseEnv.error) {
        console.log(responseEnv.message); 
      } else {
        console.log(responseEnv.message);
      }
    }catch(err) {
      console.log("Erro: Card não cadastrada com sucesso, tente mais tarde!");
    }
  };
  console.log(refeicao);
  console.log(cadNovoCard);

  //============================================================
  return (
    <div className="addcard">
      <div className="p">
        <p>+Criar um novo card+
        <br/>
            Escolha um alimento e va adicionando para criar um novo card
        </p>
      </div>
      <div className="form">
        <div className="add">
          <Form className="add" onSubmit={createCard}>
            <FormGroup>
            <Label for="alimento">Escolha um alimento</Label>
                {renderListFoods()}
            </FormGroup>
            <FormGroup>
            <Label for="gramas">Gramas</Label>
            <Input
                type="number"
                name="gramas"
                id="gramas"
                placeholder="exp: 100"
                onChange={onChangeInputCard}
            />
            </FormGroup>
            <Button type="submit" outline color="danger">
                Add ao Card
            </Button>
          </Form>
        </div>
        <div className="table-card">
          <strong id="hcard">Card</strong>
          <Card titulo=
            {<Input onChange={onChangeInputRefeicao} type="select" name="refeicao" id="refeicao">
              <option>Refeição</option>
              <option>Café</option>
              <option>Almoço</option>
              <option>Lanche</option>
              <option>Jantar</option>
            </Input>}>
              {renderList()}
              <form className="form" onSubmit={sendCard}>
                <Button className="buton" type="submit" outline color="danger">
                  Salvar Card
                </Button>
              </form>
          </Card>
        </div>
      </div>
    </div> 
  );
}
export default AddCard;