import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { useGetProdutoQuery } from '../service/api'

import * as S from './styles'

type Props = {
  favoritos: ProdutoType[]

  favoritar: (produto: ProdutoType) => void
}

const ProdutosComponent = ({ favoritos, favoritar }: Props) => {
  const { data: produtos, isLoading } = useGetProdutoQuery()

  if (isLoading) return <h2>Carregando...</h2>

  const produtoFavoritado = (produto: ProdutoType) => {
    const produtoId = produto.id
    const favoritosIds = favoritos.map((f) => f.id)

    return favoritosIds.includes(produtoId)
  }

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoFavoritado(produto)}
            key={produto.id}
            produto={produto}
            favoritar={favoritar}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
