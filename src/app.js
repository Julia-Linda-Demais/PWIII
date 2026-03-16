import express from 'express'

const app = express()
const PORT = 3000;

app.use(express.json())

app.use(express.urlencoded({extended:true}))

const listaBasica = [
    {questao: 1, descricao: '8 ^ 2', resposta: '64', resolucao: '8 * 8 = 64'},
    {questao: 2, descricao: '150 ^ 0', resposta: '1', resolucao: 'Qualquer número elevado a 0 será igual a 1'},
    {questao: 3, descricao: '(1,9) ^ 2', resposta: '3,61', resolucao: '1,9 x 1,9 = 3,61'},
    {questao: 4, descricao: '20 ^ -1', resposta: '0,05', resolucao: 'Devemos inverter a base para tornar o expoente positivo, ou seja : 1/20 = 0,05'},
    {questao: 5, descricao: '2 ^ -6', resposta: '0,015', resolucao: '1/2 ^ 6 = 0,015'},
    {questao: 6, descricao: '-3 ^ 2', resposta: '9', resolucao: '-3 x -3, pois os sinais devem ser somados também'},
    {questao: 7, descricao: '-10 ^ 6', resposta: '-1.000.000', resolucao: 'o menos está fora: -(10 x 10 x 10 x 10 x 10 x 10) = -1.000.000 '},
    {questao: 8, descricao: '(-10) ^ 6', resposta: '1.000.000', resolucao: '-10 x -10 x -10 x -10 x -10 x -10 = 1.000.000 '},
    {questao: 9, descricao: '(-3) ^ 4', resposta: '81', resolucao: '-3 x -3 x -3 x -3 = 81'},
    {questao: 10, descricao: '1,7 ^ 2', resposta: '3', resolucao: '1,7 * 1,7 = 3'}
]

const listaVestibular = [
    {questao: '11- FGV', descricao: 'Simplifique a expressão: (3^2 · 9^3) / 27^4', resposta: '1/81', resolucao: 'Colocar todos o números na base 3: 3², (3²)³ e (3³)⁴; Multiplicar os de cima (3² x (3²)³ = 3⁸) e depois dividir pelo valor de baixo (3⁸/3¹² = 3⁸⁻¹² = 3⁻⁴)'},
    {questao: '12- MACKENZIE', descricao: 'O valor da expressão (2^25 + 2^25) / 2^24 é:', resposta: '4', resolucao: '2²⁵ + 2²⁵ é 2 · 2²⁵ = 2²⁶. Dividindo por 2²⁴, subtraímos os expoentes: 26 - 24 = 2² = 4'},
    {questao: '13- FUVEST', descricao: 'Qual é o valor da metade de 2^100?', resposta: '2^99', resolucao: 'Dividir por 2 é 2¹⁰⁰ / 2¹. Pela regra de bases iguais, subtraímos os expoentes: 100 - 1 = 2⁹⁹."'},
    {questao: '14- PUC', descricao: 'Calcule o valor de: (0,5)^-2 + (1/3)^-1', resposta: '7', resolucao: 'Inverter as bases pelos expoentes negativos: (1/2)⁻² = 2² = 4 e (1/3)⁻¹ = 3¹ = 3. Somando: 4 + 3 = 7'},
    {questao: '15- ITA', descricao: 'Qual número é maior: 2^300 ou 3^200?', resposta: '3^200', resolucao: 'Igualar expoentes por potência de potência: 2³⁰⁰ = (2³)¹⁰⁰ = 8¹⁰⁰ e 3²⁰⁰ = (3²)¹⁰⁰ = 9¹⁰⁰. Logo, 3²⁰⁰ é maior'}
]

function buscarPorQuestaoBasica (questao) {
    return listaBasica.filter(exercicio => exercicio.questao == questao)
}

function buscarPorQuestaoVestibular (questao) {
    return listaVestibular.filter(exercicio => exercicio.questao.toString().includes(questao))
}

app.get('/', (req, res) => {
    res.send({listaBasica, listaVestibular})
})

//Params
app.get('/exerc/params/basica/:questao', (req, res) => {
   res.send(buscarPorQuestaoBasica(req.params.questao))
})

app.get('/exerc/params/vestibular/:questao', (req, res) => {
   res.send(buscarPorQuestaoVestibular(req.params.questao))
})

//Query
app.get('/exerc/query/basica', (req, res) => {
    const { questao } = req.query;
    res.send(buscarPorQuestaoBasica(questao));
})

app.get('/exerc/query/vestibular', (req, res) => {
    const { questao } = req.query;
    res.send(buscarPorQuestaoVestibular(questao));
})

//Body
app.post('/exerc/body/basica', (req, res) => {
    const { questao } = req.body;
    res.send(buscarPorQuestaoBasica(questao));
})

app.post('/exerc/body/vestibular', (req, res) => {
    const { questao } = req.body;
    res.send(buscarPorQuestaoVestibular(questao));
})

// resposta sem entrada, só com resposta pelo próprio json
app.get('/exerc1', (req, res) => {
   let exerc1 = {
        questao: 1,
        descricao: '8 ^ 2',
        resposta: 64,
        resolucao: {
            1: "8 * 8",
            2: "64"
        }
   }
   res.json(exerc1)
})

app.get('/exerc2', (req, res) => {
    let exerc2 = {
         questao: 2,
         descricao: '150 ^ 0',
         resposta: 1,
         resolucao: {
             1: "Qualquer número elevado a 0 será igual a 1",
         }
    }
    res.json(exerc2)
 })

app.get('/exerc3', (req, res) => {
    let exerc3 = {
         questao: 3,
         descricao: '(1,9) ^ 2',
         resposta: '3,61',
         resolucao: {
             1: "1,9 * 1,9",
             2: "3,61"
         }
    }
    res.json(exerc3)
})

app.get('/exerc4', (req, res) => {
    let exerc4 = {
         questao: 4,
         descricao: '20 ^ -1',
         resposta: '0,05',
         resolucao: {
             1: "1/20",
             2: "0,05"
         }
    }
    res.json(exerc4)
})

app.get('/exerc5', (req, res) => {
    let exerc5 = {
         questao: 5,
         descricao: '2 ^ -6',
         resposta: '0,015',
         resolucao: {
             1: "",
             2: ""
         }
    }
    res.json(exerc5)
})

app.get('/exerc6', (req, res) => {
    let exerc6 = {
         questao: 6,
         descricao: '-3 ^ 2',
         resposta: '0,05',
         resolucao: {
             1: "1/20",
             2: "0,05"
         }
    }
    res.json(exerc6)
})

app.get('/exerc7', (req, res) => {
    let exerc7 = {
         questao: 7,
         descricao: '-10 ^ 6',
         resposta: '-1.000.000',
         resolucao: {
             1: "1/20",
             2: "0,05"
         }
    }
    res.json(exerc7)
})

app.get('/exerc8', (req, res) => {
    let exerc8 = {
         questao: 8,
         descricao: '(-10) ^ 6',
         resposta: '1.000.000',
         resolucao: {
             1: "1/20",
             2: "0,05"
         }
    }
    res.json(exerc8)
})

app.get('/exerc9', (req, res) => {
    let exerc9 = {
         questao: 9,
         descricao: '(-10) ^ 6',
         resposta: '81',
         resolucao: {
             1: "-3 x -3 x -3 x -3",
             2: "81"
         }
    }
    res.json(exerc9)
})

app.get('/exerc10', (req, res) => {
    let exerc10 = {
         questao: 10,
         descricao: '1,7 ^ 2',
         resposta: '3',
         resolucao: {
             1: "1,7 * 1,7",
             2: "3"
         }
    }
    res.json(exerc10)
})

app.get('/exerc11', (req, res) => {
    let exerc11 = {
         questao: '11-FGV',
         descricao: 'Simplifique a expressão: (3^2 · 9^3) / 27^4',
         resposta: '1/81',
         resolucao: 'Colocar todos o números na base 3: 3², (3²)³ e (3³)⁴; Multiplicar os de cima (3² x (3²)³ = 3⁸) e depois dividir pelo valor de baixo (3⁸/3¹² = 3⁸⁻¹² = 3⁻⁴)'
    }
    res.json(exerc11)
}) //opa
app.get('/exerc12', (req, res) => {
    let exerc12 = {
         questao: '12-MACKENZIE',
         descricao: 'O valor da expressão (2^25 + 2^25) / 2^24 é:',
         resposta: '4',
         resolucao: '2²⁵ + 2²⁵ é 2 · 2²⁵ = 2²⁶. Dividindo por 2²⁴, subtraímos os expoentes: 26 - 24 = 2² = 4'
    }
    res.json(exerc12)
})
app.get('/exerc13', (req, res) => {
    let exerc13 = {
         questao: '13-Fuvest',
         descricao: 'Qual é o valor da metade de 2^100?',
         resposta: '2 ^ 99',
         resolucao: 'Dividir por 2 é 2¹⁰⁰ / 2¹. Pela regra de bases iguais, subtraímos os expoentes: 100 - 1 = 2⁹⁹'
    }
    res.json(exerc13)
})
app.get('/exerc14', (req, res) => {
    let exerc14 = {
         questao: '14-PUC',
         descricao: 'Calcule o valor de: (0,5)^-2 + (1/3)^-1',
         resposta: '7',
         resolucao: 'Inverter as bases pelos expoentes negativos: (1/2)⁻² = 2² = 4 e (1/3)⁻¹ = 3¹ = 3. Somando: 4 + 3 = 7'
    }
    res.json(exerc14)
})
app.get('/exerc15', (req, res) => {
    let exerc15 = {
         questao: '15-ITA',
         descricao: 'Qual número é maior: 2^300 ou 3^200?',
         resposta: '3 ^ 200',
         resolucao: 'Igualar expoentes por potência de potência: 2³⁰⁰ = (2³)¹⁰⁰ = 8¹⁰⁰ e 3²⁰⁰ = (3²)¹⁰⁰ = 9¹⁰⁰. Logo, 3²⁰⁰ é maior'
    }
    res.json(exerc15)
})

app.listen(PORT, () => {
    console.log("Servidor rodando no endereço https://localhost:${PORT}")
})
