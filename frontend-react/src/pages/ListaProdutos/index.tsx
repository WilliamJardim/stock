import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './style.scss';
import toast, { Toaster } from 'react-hot-toast';

const ListaProdutos: React.FC = () => {

  const parametrosURL           = useParams<{ idProduto:string }>();
  const [produtos, setProdutos] = useState([]);
  const [idProdutoSelecionado, setIdProdutoSelecionado] = useState(0);
  const [objProdutoSelecionado, setProdutoSelecionado] = useState({});
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

      //Se tem o um ID selecionado que veio na URL
      if( parametrosURL.idProduto ){
        setIdProdutoSelecionado( Number(parametrosURL.idProduto) );
        
        setProdutoSelecionado( 
                               jsonDaResposta.filter( function(produtoAtual:any):any{ 
                                  if(produtoAtual.id == parametrosURL.idProduto){
                                    return produtoAtual;
                                  }
                               })
                              )
      }
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
    navigate('/novo/S/0/Produto/Descricao/Tags/0/0/0');
  }

  function apagarProduto(idApagar:number){
    if( !idApagar ){
      toast.error("Voce precisa selecionar um produto!")
      return;
    }

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

  function editarProduto(idEditar:number, objeto:any){
    if( !idEditar ){
      toast.error("Voce precisa selecionar um produto!")
      return;
    }
    navigate(`/novo/N/${idEditar}/${objeto.nome}/${objeto.descricao}/${objeto.tags}/${objeto.precoVenda}/${objeto.precoCompra}/${objeto.quantidade}`);
  }

  function baixaProduto( idBaixa:number, objeto:any ){
    if( !idBaixa ){
      toast.error("Voce precisa selecionar um produto!")
      return;
    }
    navigate(`/baixa/${idBaixa}/${objeto.precoVenda}/${objeto.precoCompra}`);
  }

  function selecionarProduto( idProduto:number ){
    setIdProdutoSelecionado(idProduto);
  }

  return (
    <Fragment>
      <h1> Lista de Produtos </h1>
      <Toaster 
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
      />

      <div className='barra-botoes'>
        <button onClick={criarNovoProduto}> Novo Produto </button>

        <button className='botao-deletar' onClick={()=>{
          apagarProduto(idProdutoSelecionado);
        }}> Apagar </button>

        <button className='botao-editar' onClick={()=>{
          editarProduto(idProdutoSelecionado, objProdutoSelecionado);
        }}> Editar </button>

        <button className='botao-baixa' onClick={()=>{
          baixaProduto(idProdutoSelecionado,  objProdutoSelecionado);
        }}> Baixa </button>
      </div>

      <div className='grid-produtos'>
        
        {
          produtos.map((objProduto:any)=>{
             const imagem = `produtos/${objProduto.nome.toLowerCase()}.webp`;
             const id = objProduto.id;

             return <div className={`produto ${ id == idProdutoSelecionado ? 'active' : 'naoactive' }`} onClick={()=>{
                  selecionarProduto(id); 
                  setProdutoSelecionado(objProduto);
                  console.log(objProduto)
              }}>
        
                <div className="parte-dados">
                  <div className="foto">
                    <img src={imagem} alt="" className="src" />
                  </div>
        
                  <div className="dados">
                    <table className='tabela-dados'>
                      <tr> 
                        <td> NOME </td>
                        <td className='td-input'> <input type='text' value={ objProduto.nome }/> </td>
                      </tr>
                      <tr> 
                        <td> PREÇO </td>
                        <td className='td-input'> <input type='number' value={ objProduto.precoVenda }/> </td>
                      </tr>
                      <tr> 
                        <td> ESTOQUE </td>
                        <td className='td-input'> <input type='number' value={ objProduto.estoqueProduto } /> </td>
                      </tr>

                    </table>
                  </div>
                </div>
          
              </div>
          })
        }

      </div>
    </Fragment>
  );
}

export default ListaProdutos;