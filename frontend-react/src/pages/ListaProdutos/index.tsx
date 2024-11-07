import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const ListaProdutos: React.FC = () => {

  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(function(){

    fetch('http://localhost:3000/produtos')
    .then(async(resposta) => {
      // Verifica se a resposta foi bem-sucedida (status 200-299)
      if (!resposta.ok) {
        throw new Error('Erro ao buscar os dados');
      }
      // Converte a resposta para JSON
      const jsonDaResposta = await resposta.json();
      setProdutos(jsonDaResposta);
    })
    .then((dados) => {
      // Aqui você pode trabalhar com os dados recebidos
      console.log(dados);
    })
    .catch((erro) => {
      // Lida com erros, seja da requisição ou do processamento
      console.error('Erro:', erro);
    });

  }, []);

  function criarNovoProduto(){
    navigate('/novo');
  }

  function apagarProduto(idApagar:number){
    fetch(`http://localhost:3000/produtos/${idApagar}`, { // Inclui o ID do produto na URL
      method: 'DELETE' // Define o método como DELETE
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao deletar o produto');
        }
        console.log(`Produto com ID ${idApagar} deletado com sucesso.`);

        //Obtem a lista atualizada
        fetch('http://localhost:3000/produtos')
        .then(async(resposta) => {
          // Verifica se a resposta foi bem-sucedida (status 200-299)
          if (!resposta.ok) {
            throw new Error('Erro ao buscar os dados');
          }
          // Converte a resposta para JSON
          const jsonDaResposta = await resposta.json();
          setProdutos(jsonDaResposta);
        })
        .then((dados) => {
          // Aqui você pode trabalhar com os dados recebidos
          console.log(dados);
        })
        .catch((erro) => {
          // Lida com erros, seja da requisição ou do processamento
          console.error('Erro:', erro);
        });
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }

  return (
    <Fragment>
      <h1> Lista de Produtos </h1>

      <div className='barra-botoes'>
        <button onClick={criarNovoProduto}> Novo Produto </button>
      </div>

      <div className='grid-produtos'>
        
        {
          produtos.map((objProduto:any)=>{
             const imagem = `produtos/${objProduto.nome.toLowerCase()}.webp`;
             const id = objProduto.id;

             return <div className='produto'>
        
                <div className="parte-dados">
                  <div className="foto">
                    <img src={imagem} alt="" className="src" />
                  </div>
        
                  <div className="dados">
                    <h2 className='titulo'> Caixa de carga </h2>
                    <table className='tabela-dados'>
                      <tr> 
                        <td> NOME </td>
                        <td> { objProduto.nome } </td>
                      </tr>
                      <tr> 
                        <td> PREÇO </td>
                        <td> R$: { objProduto.preco } </td>
                      </tr>
                      <tr> 
                        <td> ESTOQUE </td>
                        <td> {objProduto.quantidade} unidades </td>
                      </tr>
                    </table>
                  </div>
                </div>
            
                <div className='botoes-produto'>
                    <button className='botao-deletar' onClick={()=>{
                      apagarProduto(id);
                    }}> Apagar </button>
                </div>

              </div>
          })
        }

      </div>
    </Fragment>
  );
}

export default ListaProdutos;