import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import closeImg from '../../assets/close.svg'
import inComeImg from '../../assets/Entradas.svg'
import outComeImg from '../../assets/Saidas.svg'
import { FormEvent, useState} from 'react'
import { useGlobalContext } from '../../hooks/useGlobalContext'

type NewTransactionModalProps = {
  isOpen: boolean;
  onRequestClose: ()=> void;
}
type TypeProps = 'deposit' | 'withdraw';

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
  const {createTransaction} = useGlobalContext();

  const [type, setType] = useState<TypeProps>('deposit');
  const [title,setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState(0)

  async function handleCreateNewTransaction(e: FormEvent){
    e.preventDefault();
    const data = ({
      title,
      amount,
      category,
      type
    })
    await createTransaction(data)
    
    setTitle('')
    setCategory('')
    setAmount(0)
    setType('deposit')
    onRequestClose();
  }
  return(
    <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName='react-modal-overlay'
        className="react-modal-content"
      >
        <button type='button' onClick={onRequestClose} className="react-modal-close">
          <img src={closeImg} alt="Fechar modal" />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar Transacao</h2>

          <input 
            placeholder="Titulo"
            value={title}
            onChange={e=> setTitle(e.target.value)}
          />
          <input 
            type='number'
            placeholder="Valor" 
            value={amount}
            onChange={e=> setAmount(Number(e.target.value))}
          />
          <TransactionTypeContainer>
            <RadioBox 
              type='button' 
              onClick={()=> setType('deposit')}
              isActive={type === 'deposit'}
              ActiveColor="green"
            >
              <img src={inComeImg} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>
            <RadioBox 
              type='button' 
              onClick={()=> setType('withdraw')}
              isActive={type === 'withdraw'}
              ActiveColor='red'
            >
              <img src={outComeImg} alt="Saida" />
              <span>Saida</span>
            </RadioBox>
          </TransactionTypeContainer>
          <input 
            placeholder="Categoria"
            value={category}
            onChange={e=> setCategory(e.target.value)}
          />
          <button type='submit'>
            Cadastrar
          </button>
        </Container>
    </Modal>
  )
}