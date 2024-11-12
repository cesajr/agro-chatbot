import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const sendMessage = async () => {
        if (!userInput) return;

        setChatHistory([...chatHistory, { sender: 'Você', text: userInput }]);
        
        try {
            const response = await axios.post('http://localhost:3000/api/message', { message: userInput });
            setChatHistory([...chatHistory, { sender: 'Você', text: userInput }, { sender: 'Bot', text: response.data.reply }]);
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            setChatHistory([...chatHistory, { sender: 'Bot', text: 'Desculpe, ocorreu um erro.' }]);
        }

        setUserInput('');
    };

    return (
        <div className="app">
            <h1>Chatbot Agrocomputação</h1>
            <div className="chat-window">
                {chatHistory.map((msg, index) => (
                    <p key={index} className={msg.sender === 'Você' ? 'user-message' : 'bot-message'}>
                        <strong>{msg.sender}: </strong>{msg.text}
                    </p>
                ))}
            </div>
            <input 
                type="text" 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)} 
                placeholder="Digite sua mensagem..." 
            />
            <button onClick={sendMessage}>Enviar</button>
        </div>
    );
}

export default App;
