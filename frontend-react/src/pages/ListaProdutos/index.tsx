import React, { Fragment } from 'react';
import './style.scss';

const ListaProdutos: React.FC = () => {
  return (
    <Fragment>
      <h1> Lista de Produtos </h1>
      <div className='grid-produtos'>
        
        <div className='produto'>
          
          <div className="foto">
            <img src="produtos/caixacarga.webp" alt="" className="src" />
          </div>

          <div className="dados">
            <h2 className='titulo'> Caixa de carga </h2>
            <table className='tabela-dados'>
              <tr> 
                <td> NOME </td>
                <td> Caixa de carga </td>
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

        <div className='produto'>
          
          <div className="foto">
            <img src="produtos/lamparina.webp" alt="" className="src" />
          </div>

          <div className="dados">
            <h2 className='titulo'> Lamparina </h2>
            <table className='tabela-dados'>
              <tr> 
                <td> NOME </td>
                <td> Lamparina </td>
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