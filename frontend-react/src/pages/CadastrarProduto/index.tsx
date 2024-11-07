import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const CadastrarProduto: React.FC = () => {

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Lógica para envio do formulário, por exemplo, enviar para uma API
    console.log('Formulário enviado:', { nome, preco, quantidade });

    const url = 'http://localhost:3000/produtos'; // substitua pelo endpoint desejado

    const dados = {
      nome: nome,
      preco: preco,
      quantidade: quantidade
    };

    fetch(url, {
      method: 'POST', // Define o método como POST
      headers: {
        'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify(dados) // Converte os dados para JSON
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição'); // Lança um erro se a resposta não for ok
      }
      return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
       console.log('Resposta do servidor:', data) 
       navigate('/');
    }) // Manipula a resposta do servidor
    .catch(error => console.error('Erro:', error)); // Captura e exibe erros
  };

  const handleCancel = () => {
    // Limpa os campos do formulário
    setNome('');
    setPreco('');
    setQuantidade('');
    navigate('/');
  };

  return (
    <div className='formulario-novo-produto'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="preco">Preço:</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            min="0"
          />
        </div>

        <div>
          <label htmlFor="quantidade">Quantidade:</label>
          <input
            type="number"
            id="quantidade"
            name="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
            min="1"
          />
        </div>

        <div className='botoes'>
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarProduto;