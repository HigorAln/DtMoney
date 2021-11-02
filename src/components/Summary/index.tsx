import { Container } from "./style";
import inIconImage from '../../assets/Entradas.svg'
import outIconImage from '../../assets/Saidas.svg'
import allIconImage from '../../assets/Total.svg'
import { useGlobalContext } from "../../hooks/useGlobalContext";

export function Summary(){
  const {transactions} = useGlobalContext();

  // const totalDeposits = transactions.reduce((acc, transaction) =>{
  //   if(transaction.type === 'deposit'){
  //     return acc + transaction.amount;
  //   }

  //   return acc
  // },0)
  

  const summary = transactions.reduce((acc, transaction)=>{
    if(transaction.type === 'deposit'){
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    }else{
      acc.withdraw += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc
  }, {
    deposits:0,
    withdraw:0,
    total:0
  })

  return(
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={inIconImage} alt="Entradas" />
        </header>
        <strong>
          +{new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outIconImage} alt="Saidas" />
        </header>
        <strong>
          -{new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.withdraw)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Entradas</p>
          <img src={allIconImage} alt="Entradas" />
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.total)}
        </strong>
      </div>


    </Container>
  )
}