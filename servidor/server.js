const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let jogos = [];

// Rota para criar um novo jogo
app.post('/jogos', (req, res) => {
    const { nome, genero, ano, plataforma, preco } = req.body;

    if (!nome || !genero) {
        return res.status(400).json({ erro: 'Nome e gênero são obrigatórios' });
    }

    const novoJogo = { 
        id: jogos.length + 1,
        nome, 
        genero,
        ano: ano || new Date().getFullYear(), // Se o ano não for enviado, usa o ano atual
        plataforma,
        preco: preco || 0 // Preço padrão para 0 caso não seja enviado
    };

    jogos.push(novoJogo);
    res.status(201).json(novoJogo);
});

// Rota para listar todos os jogos
app.get('/jogos', (req, res) => {
    res.status(200).json(jogos);
});

// Rota para obter um jogo pelo ID
app.get('/jogos/:id', (req, res) => {
    const { id } = req.params;
    const jogo = jogos.find(j => j.id === parseInt(id));

    if (!jogo) {
        return res.status(404).json({ erro: 'Jogo não encontrado' });
    }

    res.status(200).json(jogo);
});

// Rota para atualizar um jogo
app.put('/jogos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, genero, ano, plataforma, preco } = req.body;

    const jogo = jogos.find(j => j.id === parseInt(id));

    if (!jogo) {
        return res.status(404).json({ erro: 'Jogo não encontrado' });
    }

    jogo.nome = nome || jogo.nome;
    jogo.genero = genero || jogo.genero;
    jogo.ano = ano || jogo.ano;
    jogo.plataforma = plataforma || jogo.plataforma;
    jogo.preco = preco || jogo.preco;

    res.status(200).json(jogo);
});

// Rota para deletar um jogo
app.delete('/jogos/:id', (req, res) => {
    const { id } = req.params;
    const index = jogos.findIndex(j => j.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ erro: 'Jogo não encontrado' });
    }

    jogos.splice(index, 1);
    res.status(204).send();
});

// Rodando o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
