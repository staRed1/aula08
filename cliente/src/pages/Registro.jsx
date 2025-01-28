import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import BackupIcon from '@mui/icons-material/Backup';

export default function Registro() {

  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [ano, setAno] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [preco, setPreco] = useState('');

  const navigation = useNavigate();

  const registrar = async (event) => {
    event.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/jogos', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({ nome, genero, ano, plataforma, preco })
      });

      if (resposta.ok) {
        alert('Jogo registrado com sucesso');
        navigation('/');
      } else {
        alert('Erro ao registrar o jogo');
      }
    } catch {
      alert('Erro de conexão! Verifique o servidor');
    }
  };

  return (
    <main>
      <Header />
      <h1>Registrar Jogos</h1>
      <form onSubmit={registrar} className="formulario">

        <input 
          type="text" 
          value={nome} 
          placeholder="Nome do jogo" 
          onChange={(event) => setNome(event.target.value)} 
        />
        
        <input 
          type="text" 
          value={genero} 
          placeholder="Gênero do jogo" 
          onChange={(event) => setGenero(event.target.value)} 
        />
        
        {/* Aqui permitimos qualquer ano */}
        <input 
          type="text" 
          value={ano} 
          placeholder="Ano de lançamento" 
          onChange={(event) => setAno(event.target.value)} 
        />
        
        <input 
          type="text" 
          value={plataforma} 
          placeholder="Plataforma do jogo" 
          onChange={(event) => setPlataforma(event.target.value)} 
        />
        
        <input 
          type="number" 
          value={preco} 
          placeholder="Preço do jogo" 
          onChange={(event) => { 
            const novoPreco = Number(event.target.value);
            if (novoPreco >= 0 || event.target.value === "") { 
              setPreco(event.target.value); 
            }
          }} 
        />
        
        <button type="submit">
          <BackupIcon />
          Registrar
        </button>
      </form>
    </main>
  );
}
