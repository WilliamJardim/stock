import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './style.scss';
import IProduto from '../../interfaces/IProduto';

const CadastrarProduto: React.FC = (props:any) => {

  const parametrosURL = useParams<{isCadastrando:string, idProduto:string, nome: string, descricao: string, tags: string, precoVenda: string, precoCompra: string, quantidade: string }>();

  const isCadastrando:string                 = parametrosURL.isCadastrando           || 'N'; 
  const idProdutoEditando:string             = parametrosURL.idProduto               || '';
  const [nome, setNome]                      = useState( parametrosURL.nome          || '' );
  const [precoVenda,  setPrecoVenda]         = useState( parametrosURL.precoVenda    || '' );
  const [precoCompra, setPrecoCompra]        = useState( parametrosURL.precoCompra   || '' );
  const [estoque, setEstoque]                = useState<{ estoque:number }>({ estoque: 0 });
  const [estoqueInicial, setEstoqueInicial]  = useState('');
  const [descricao, setDescricao]            = useState( parametrosURL.descricao ||  '' );
  const [tags,      setTags]                 = useState( parametrosURL.tags      ||  '' );

  const navigate = useNavigate();

  const cadastrar = function(){
    const url = 'http://localhost:3000/produtos'; // substitua pelo endpoint desejado

    const dados = {
      nome: nome,
      precoVenda: precoVenda,
      precoCompra: precoCompra,
      descricao: descricao,
      tags: tags
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
  }

  const editar = function(){
    const url = `http://localhost:3000/produtos/${idProdutoEditando}`; // substitua pelo endpoint desejado

    const dados = {
      nome        : nome,
      precoVenda  : precoVenda,
      precoCompra : precoCompra,
      descricao   : descricao,
      tags        : tags
    };

    fetch(url, {
      method: 'PUT', // Define o método como POST
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
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Lógica para envio do formulário, por exemplo, enviar para uma API
    if( isCadastrando == 'S' ){
        cadastrar();

        //Adiciona o estoque inicial

    }else if(isCadastrando == 'N'){
        editar();
    }
    
  };

  const handleCancel = () => {
    // Limpa os campos do formulário
    setNome('');
    setPrecoCompra('');
    setPrecoVenda('');
    navigate('/');
  };

  function obterEstoquePromise( idProduto:string ): Promise<{ estoque: number }>{
    return new Promise((resolve, reject)=>{
      //Obtem a lista atualizada
      fetch(`http://localhost:3000/estoque/${idProduto}`)
        .then(async(resposta) => {
          // Verifica se a resposta foi bem-sucedida (status 200-299)
          if (!resposta.ok) {
            throw new Error('Erro ao buscar os dados');
          }
          // Converte a resposta para JSON
          const jsonDaResposta = await resposta.json();
          resolve(jsonDaResposta);
        })
        .catch((erro) => {
          reject(erro);
        });
    });
  }

  useEffect(()=>{
    if( isCadastrando == 'N' ){
      obterEstoquePromise( idProdutoEditando ).then((jsonResultado)=>{
          setEstoque(jsonResultado);
      });
    }

  }, []);

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
          <label htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="precovenda">Preço de Venda:</label>
          <input
            type="number"
            id="precovenda"
            name="precovenda"
            value={precoVenda}
            onChange={(e) => setPrecoVenda(e.target.value)}
            required
            min="0"
          />
        </div>

        <div>
          <label htmlFor="precocompra">Preço de Compra:</label>
          <input
            type="number"
            id="precocompra"
            name="preprecocompraco"
            value={precoCompra}
            onChange={(e) => setPrecoCompra(e.target.value)}
            required
            min="0"
          />
        </div>

        {
          //Se estiver cadastrando um novo produto, permite dizer o estoque inicial
          isCadastrando == 'S' &&
          <div>
            <label htmlFor="quantidade">Quantidade:</label>
            <input
              type="text"
              id="quantidade"
              name="quantidade"
              value={estoqueInicial}
              onChange={(e) =>{
                 setEstoqueInicial(e.target.value);
              }}
              min="1"
            />
          </div>
        }

        {
          isCadastrando == 'N' &&
          <div>
            <label htmlFor="estoque">Estoque:</label>
            <input
              type="text"
              id="estoque"
              name="estoque"
              value={estoque.estoque}
              min="1"
            />
          </div>
        }

        <div className='botoes'>
          <button type="submit"> { isCadastrando == 'S' ? 'Cadastrar' : 'Alterar' } </button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarProduto;