document.addEventListener('DOMContentLoaded', function () {
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chat = document.getElementById('chat');

    let skibidy = "hello";
    let maxNames = [];  

    async function fetchHighestPersonality() {
        try {
            const response = await fetch('http://localhost:3000/get-scores');
            const scores = await response.json();
            console.log(scores);
            
            let max = -Infinity;
            
            for (let x in scores) {
                if (scores[x].value > max) {
                    max = scores[x].value;
                }
            }
            
            
            maxNames = []; 
            for (let x in scores) {
                if (scores[x].value === max) {
                    maxNames.push(scores[x].name); 
                }
            }
            
        } catch (error) {
            console.error('Error fetching scores:', error);
            maxNames = ['INFJ']; 
        }
    }
    
    
    async function setUpConversation() {
        await fetchHighestPersonality(); 
        console.log("Highest Personality:", maxNames);
        skibidy += maxNames[1] || ''; 
        
        
        let systemContent;
        if (maxNames.length > 1) {
            
            systemContent = `You are a chatbot with mixed personality types: ${maxNames.join(', ')}. Your responses should reflect this blend of characteristics. Keep it concise.`;
        } else {
            
            systemContent = `You are a chatbot with the personality type of a ${maxNames[0] || 'INFJ'}. You will answer accordingly. Keep it concise.`;
        }
        
        
        conversationHistory = [
            {
                role: "system",
                content: systemContent
            }
        ];
        
        console.log("Initialized system with:", systemContent);
    }
    
    
    let conversationHistory = [];
    
    
    setUpConversation();
    
    
    function displayMessage(role, content) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message',
            role === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = role === 'user' ? content : `Bot: ${content}`;
        chat.appendChild(messageElement);
        chat.scrollTop = chat.scrollHeight;
    }

    sendBtn.addEventListener('click', async () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            
            displayMessage('user', userMessage);
            userInput.value = '';

            
            conversationHistory.push({
                role: "user",
                content: userMessage
            });

            
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('typing-indicator');
            typingIndicator.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
            chat.appendChild(typingIndicator);
            chat.scrollTop = chat.scrollHeight;

            try {

                console.log("Conversation History: ", conversationHistory);

                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer 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",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: "google/gemini-2.0-flash-thinking-exp:free",
                        messages: conversationHistory 
                    })
                });

                const data = await response.json();
                console.log("Response from OpenRouter:", data);

                if (data.choices && data.choices.length > 0) {

                    typingIndicator.remove();

                    
                    const botMessage = data.choices[0].message.content || "Sorry, I didn't understand that.";
                    displayMessage('assistant', botMessage);

                    
                    conversationHistory.push({
                        role: "assistant",
                        content: botMessage
                    });
                } else {
                    typingIndicator.remove();
                    displayMessage('assistant', "No response received.");
                }
            } catch (error) {
                console.error("Error:", error);
                typingIndicator.remove();
                displayMessage('assistant', "There was an error processing your request.");
            }
        }
    });

    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
});