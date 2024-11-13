export default function obterEstoquePromise( idProduto:string ): Promise<{ estoque: number }>{
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