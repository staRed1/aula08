import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import LoopIcon from '@mui/icons-material/Loop';

export default function Alterar() {
    const { id } = useParams();

    const [nome, setNome] = useState('');
    const [genero, setGenero] = useState('');
    const [ano, setAno] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [preco, setPreco] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    
    const navigation = useNavigate();

    useEffect(() => {
        const busca = async () => {
            try {
                const resposta = await fetch('http://localhost:3000/jogos/' + id);
                const dados = await resposta.json();
                setNome(dados.nome);
                setGenero(dados.genero);
                setAno(dados.ano);
                setPlataforma(dados.plataforma);
                setPreco(dados.preco);
                setAvaliacao(dados.avaliacao);

            } catch (error) {
                alert("Erro ao carregar dados");
            }
        };
        busca();
    }, [id]);

    const alterar = async (event) => {
        event.preventDefault();
        try {
            await fetch('http://localhost:3000/jogos/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify({
                    nome,
                    genero,
                    ano,
                    plataforma,
                    preco,
                    avaliacao,
                })
            });
            alert('Alterado com sucesso ');
            navigation('/');
        } catch {
            alert('Erro ao alterar ');
        }
    };

    return (
        <div>
            <Header />
            <h1>Alterar Informações do Jogo</h1>
            <form onSubmit={alterar} className="formulario">

                <input
                    type="text"
                    value={nome}
                    placeholder="Alterar nome do jogo"
                    onChange={(evento) => setNome(evento.target.value)}
                />
                <input
                    type="text"
                    value={genero}
                    placeholder="Alterar gênero"
                    onChange={(evento) => setGenero(evento.target.value)}
                />
                <input
                    type="number"
                    value={ano}
                    placeholder="Alterar ano de lançamento"
                    onChange={(evento) => setAno(evento.target.value)}
                />
                <input
                    type="text"
                    value={plataforma}
                    placeholder="Alterar plataforma"
                    onChange={(evento) => setPlataforma(evento.target.value)}
                />
                <input
                    type="number"
                    value={preco}
                    placeholder="Alterar preço"
                    onChange={(evento) => {
                        const novoPreco = Number(evento.target.value);
                        if (novoPreco > 0 || evento.target.value === "") { 
                            setPreco(evento.target.value);
                        }
                    }}
                />
                <input
                    type="number"
                    value={avaliacao}
                    placeholder="Alterar avaliação"
                    onChange={(evento) => setAvaliacao(evento.target.value)}
                />
                <button><LoopIcon /></button>
            </form>
        </div>
    );
}
