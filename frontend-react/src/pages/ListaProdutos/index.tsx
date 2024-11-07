import React, { Fragment } from 'react';
import './style.scss';

const ListaProdutos: React.FC = () => {
  return (
    <Fragment>
      <h1> Lista de Produtos </h1>
      <div className='grid-produtos'>
        
        <div className='produto'>
          
          <div className="foto">
            <h2> Imagem </h2>
          </div>

          <div className="dados">
            <h2 className='titulo'> Tabelinha </h2>
            <table className='tabela-dados'>
              <tr> 
                <td> NOME </td>
                <td> Garfo </td>
              </tr>
              <tr> 
                <td> PREÇO </td>
                <td> R$: 12,00 </td>
              </tr>
              <tr> 
                <td> ESTOQUE </td>
                <td> 25 unidades </td>
              </tr>
            </table>
          </div>

        </div>



      </div>
    </Fragment>
  );
}

export default ListaProdutos;