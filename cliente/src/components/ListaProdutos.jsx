import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import LoopIcon from "@mui/icons-material/Loop";
import styles from "../styles/listaJogos.module.css";

export default function ListaJogos({ jogos, removerJogo }) {
  return (
    <div className={styles.container}>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Gênero</th>
            <th>Ano</th>
            <th>Plataforma</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {jogos.map((jogo) => (
            <tr key={jogo.id}>
              <td>{jogo.nome}</td>
              <td>{jogo.genero}</td>
              <td>{jogo.ano}</td>
              <td>{jogo.plataforma}</td>
              <td>R$ {jogo.preco || "Sem preço"}</td>
              <td className={styles.acoes}>
                <button onClick={() => removerJogo(jogo.id)}>
                  <DeleteIcon />
                </button>
                <Link to={`/alterar/${jogo.id}`}>
                  <button>
                    <LoopIcon />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
