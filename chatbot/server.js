const express = require("express");
const { generateText } = require("./lib/gemini");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve arquivos estáticos da pasta public

// Define uma limitação de taxa (exemplo: 5 requisições por minuto)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 5, // limite cada IP a 5 requisições por janela
    message: "Muitas requisições feitas em um curto período. Tente novamente mais tarde."
});

// Aplica o limitador a todas as requisições
app.use(limiter);

app.post("/api/message", async (req, res) => {
    const userMessage = req.body.message.toLowerCase(); // Converte a mensagem para minúsculas
    let responseText;

    // Respostas específicas para tópicos
    if (userMessage.includes("agricultura sustentável")) {
        responseText = "A agricultura sustentável é uma prática que busca atender às necessidades atuais sem comprometer as futuras gerações. Ela envolve técnicas que preservam o meio ambiente.";
    } else if (userMessage.includes("tecnologias emergentes")) {
        responseText = "As tecnologias emergentes em agrocomputação incluem uso de drones, sensores IoT e inteligência artificial para otimizar a produção agrícola.";
    } else if (userMessage.includes("dicas práticas")) {
        responseText = "Algumas dicas práticas para agricultores incluem: diversificação de culturas, rotação de culturas e uso eficiente da água.";
    } else {
        try {
            responseText = await generateText(userMessage); // Gera resposta padrão com Gemini AI
        } catch (error) {
            console.error("Erro ao gerar texto:", error);
            return res.status(500).json({ error: "Desculpe, ocorreu um erro ao processar sua solicitação." });
        }
    }

    res.json({ reply: responseText });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});