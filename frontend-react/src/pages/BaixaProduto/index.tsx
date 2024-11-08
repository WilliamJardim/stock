import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './style.scss';
import IProduto from '../../interfaces/IProduto';

export default function BaixaProduto(){
    
    const parametrosURL               = useParams<{ idProduto:string }>();
    const idProduto:string            = parametrosURL.idProduto!;
    const [tipoBaixa,  setTipoBaixa]  = useState('venda');
    const [quantidade, setQuantidade] = useState('');
    const navigate                    = useNavigate();

    const baixarQuantidade = function(){
      const url = `http://localhost:3000/baixa/${idProduto}`; // substitua pelo endpoint desejado

      fetch(url, {
        method: 'POST', // Define o método como POST
        headers: {
          'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify({
          idProduto  : idProduto,
          tipoBaixa  : tipoBaixa,
          quantidade : quantidade
        }) // Converte os dados para JSON
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
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      baixarQuantidade();

      // Limpa os campos do formulário
      setQuantidade('');
      navigate('/');
    };

    const handleCancel = () => {
      // Limpa os campos do formulário
      setQuantidade('');
      navigate('/');
    };

    const setOperacao = function(tipo:string){
      setTipoBaixa(tipo);
    }

    return (
      <div className='formulario-baixa-produto'>
          <form onSubmit={handleSubmit}>

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

            <div className="campo-operacao">
              <label>Tipo de Operação:</label>
              <div className="opcoes">
                <input
                  type="radio"
                  id="comprou"
                  name="operacao"
                  value="comprou"
                  onChange={(e) => setOperacao(e.target.value)}
                  required
                />
                <label htmlFor="comprou">Comprou</label>
             
                <input
                  type="radio"
                  id="vendeu"
                  name="operacao"
                  value="vendeu"
                  onChange={(e) => setOperacao(e.target.value)}
                  required
                />
                <label htmlFor="vendeu">Vendeu</label>
              </div>
            </div>

            <div className='botoes'>
              <button type="submit"> Emitir </button>
              <button type="button" onClick={handleCancel}>Cancelar</button>
            </div>
          </form>
      </div>
    );

  }