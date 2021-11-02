import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header/index';
import { useState } from 'react';
import { NewTransactionModal } from './components/newTransactionModal';
import Modal from 'react-modal';
import { GlobalContext } from './context/GlobalContext';

Modal.setAppElement("#root")


export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true)
  }
  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false)
  }
  return (
   <GlobalContext>
     
    <Header handleOpenNewTransactionModal={handleOpenNewTransactionModal}/>
    <Dashboard />
    <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />
     
   </GlobalContext>
  );
}