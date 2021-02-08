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

function AddCard() {
    // criei uma variável local q armazena o estado local da lista
    const [arrayAlimentos, setArrayAlimentos] = useState({});

    const [novoCard, setNovoCard] = useState([])

    const [chosenFood, setChosenFood] = useState({
        nome: "",
        gramas: "",
    });

    useEffect(async () => {
        // esse cara é chamado quando carrega esse componente
        const alimentos = await getArrayAlimentos()
        setArrayAlimentos(alimentos)
    }, []);

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

    const onChangeInputCard = (e) =>
        setChosenFood({ ...chosenFood, [e.target.name]: e.target.value });

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
        

        var nome2=[]
        var gramas2=[]
        var carbo2=[]
        var proteina2=[]
        var gordura2=[]
        var kcal2=[]
        var valor2=[]
        if(gramas2!=""){
          nome2.concat(novoCard.nome)
          gramas2.concat(novoCard.gramas)
          carbo2.concat(novoCard.carbo)
          proteina2.concat(novoCard.proteina)
          gordura2.concat(novoCard.gordura)
          kcal2.concat(novoCard.kcal)
          valor2.concat(novoCard.valor)
        }else{
          nome2.push(novoCard.nome)
          gramas2.push(novoCard.gramas)
          carbo2.push(novoCard.carbo)
          proteina2.push(novoCard.proteina)
          gordura2.push(novoCard.gordura)
          kcal2.push(novoCard.kcal)
          valor2.push(novoCard.valor)
        }

        

        //let idx = (arrayAlimentos != null && arrayAlimentos.alimentos != null && arrayAlimentos.alimentos.indexOf(chosenFood.nome));
        //converte objt em array
        //let arrayAlimentosArray  = arrayAlimentos != null && arrayAlimentos.alimentos != null && arrayAlimentos.alimentos.map(item => [item._id,item.nome,item.gramas,item.carbo,item.proteina])
        
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
        console.log(novoCard);
    };

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
                <tr>
                    <td>{novoCard.nome}</td>
                    <td>{novoCard.gramas}</td>
                    <td>{novoCard.carbo}</td>
                    <td>{novoCard.proteina}</td>
                    <td>{novoCard.gordura}</td>
                    <td>{novoCard.kcal}</td>
                    <td>{novoCard.valor}</td>
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
          <Card titulo="Café da manhã">
              {renderList()}
          </Card>
        </div>
      </div>
    </div> 
  );
}
export default AddCard;

/*
var nome2=[]
var gramas2=[]
var carbo2=[]
var proteina2=[]
var gordura2=[]
var kcal2=[]
var valor2=[]
if(gramas2!=""){
  nome2.concat(novoCard.nome)
  gramas2.concat(novoCard.gramas)
  carbo2.concat(novoCard.carbo)
  proteina2.concat(novoCard.proteina)
  gordura2.concat(novoCard.gordura)
  kcal2.concat(novoCard.kcal)
  valor2.concat(novoCard.valor)
}else{
  nome2.push(novoCard.nome)
  gramas2.push(novoCard.gramas)
  carbo2.push(novoCard.carbo)
  proteina2.push(novoCard.proteina)
  gordura2.push(novoCard.gordura)
  kcal2.push(novoCard.kcal)
  valor2.push(novoCard.valor)
}
*/