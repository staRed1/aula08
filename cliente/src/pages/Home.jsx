import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';  
import LoopIcon from '@mui/icons-material/Loop';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function Home() {

  const [jogos, setJogos] = useState([]);
  const [filteredJogos, setFilteredJogos] = useState([]);

  useEffect(() => {
    const buscarJogos = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/jogos");
        if (!resposta.ok) throw new Error('Erro ao buscar os jogos');
        const dados = await resposta.json();
        setJogos(dados);
        setFilteredJogos(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarJogos();
  }, []);

  const removerJogo = async (id) => {
    try {
      await fetch("http://localhost:3000/jogos/" + id, {
        method: "DELETE",
      });

      setJogos((prevJogos) => prevJogos.filter((jogo) => jogo.id !== id));
      setFilteredJogos((prevJogos) => prevJogos.filter((jogo) => jogo.id !== id));
    } catch {
      alert("Erro ao remover o jogo!");
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();

    const tabela = jogos.map((jogo) => [
      jogo.id,
      jogo.nome,
      jogo.genero,
      jogo.ano,
      jogo.plataforma,
      jogo.preco,
    ]);

    doc.text("Lista de Jogos", 10, 10); // Título do PDF

    doc.autoTable({
      head: [["ID", "Nome", "Gênero", "Ano", "Plataforma", "Preço"]], // Cabeçalho da tabela
      body: tabela, // Dados da tabela
    });
    doc.save("Jogos.pdf"); // Nome do arquivo PDF
  };

  const ordenarJogos = (criterio) => {
    let jogosOrdenados = [...jogos]; // Sempre partimos da lista original

    if (criterio === "AZ") {
      jogosOrdenados.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (criterio === "ZA") {
      jogosOrdenados.sort((a, b) => b.nome.localeCompare(a.nome));
    } else if (criterio === "MENOR_PRECO") {
      jogosOrdenados.sort((a, b) => (a.preco || 0) - (b.preco || 0));
    } else if (criterio === "MAIOR_PRECO") {
      jogosOrdenados.sort((a, b) => (b.preco || 0) - (a.preco || 0));
    } else if (criterio === "RECENTE") {
      jogosOrdenados.sort((a, b) => new Date(b.ano || 0) - new Date(a.ano || 0));
    }

    setFilteredJogos(jogosOrdenados); // Atualiza o estado com a nova lista ordenada
  }; 

  return (
    <div>
      <Header />

      <h1>Lista de Jogos</h1>

      <Button variant="contained" className="pdf-button" onClick={() => exportarPDF()}>
        <PictureAsPdfIcon />
      </Button>

      <div className="filter-buttons">
        <Button onClick={() => ordenarJogos("AZ")}>A-Z</Button>
        <Button onClick={() => ordenarJogos("ZA")}>Z-A</Button>
        <Button onClick={() => ordenarJogos("MENOR_PRECO")}>Menor Preço</Button>
        <Button onClick={() => ordenarJogos("MAIOR_PRECO")}>Maior Preço</Button>
        <Button onClick={() => ordenarJogos("RECENTE")}>Mais Recentes</Button>
      </div>

      <table className="tabela">
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
          {filteredJogos.map((jogo) => (
            <tr key={jogo.id}>
              <td>{jogo.nome}</td>
              <td>{jogo.genero}</td>
              <td>{jogo.ano}</td>
              <td>{jogo.plataforma}</td>
              <td>R$ {jogo.preco || "Sem preço"}</td>
              <td>
                <button onClick={() => removerJogo(jogo.id)}>
                  <DeleteIcon />
                </button>

                <Link to={'/alterar/' + jogo.id}>
                  <button><LoopIcon /></button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
