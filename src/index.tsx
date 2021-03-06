import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import GlobalStyle from './styles/Global'
import { createServer, Model } from 'miragejs'

createServer({
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelancer de webSite",
          type: 'deposit',
          category: 'Dev',
          amount: 12000,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type:"withdraw",
          category: 'Casa',
          amount: 1800,
          createdAt: new Date('2021-02-12 09:00:00')
        }
      ]
    })
  },
  routes(){
    this.namespace = 'api';

    this.get('/transactions',()=>{
      return this.schema.all('transaction')
    })
    this.post('/transactions',(schema, request)=>{
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);