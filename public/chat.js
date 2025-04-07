document.addEventListener('DOMContentLoaded', function () {
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chat = document.getElementById('chat');

    let skibidy = "hello";
    let maxNames = [];  // Declare maxNames as a global variable

    async function fetchHighestPersonality() {
        try {
            const response = await fetch('/get-scores');
            const scores = await response.json();
            console.log(scores);
            
            let max = -Infinity;
            
            // First find the maximum value
            for (let x in scores) {
                if (scores[x].value > max) {
                    max = scores[x].value;
                }
            }
            
            // Then collect all keys that have this maximum value
            maxNames = []; // Clear the previous names
            for (let x in scores) {
                if (scores[x].value === max) {
                    maxNames.push(scores[x].name); // Store the key (name) itself
                }
            }
            
        } catch (error) {
            console.error('Error fetching scores:', error);
            maxNames = ['INFJ']; // Default to INFJ in an array if an error occurs
        }
    }
    
    // Using the function (Note: Wrap it in async function to log properly)
    async function setUpConversation() {
        await fetchHighestPersonality(); // Ensure the function completes before setting up conversation
        console.log("Highest Personality:", maxNames);
        skibidy += maxNames[1] || ''; // Now access the global variable and handle undefined case
        
        // Set up system role message based on maxNames length
        let systemContent;
        if (maxNames.length > 1) {
            // Multiple personalities case
            systemContent = `You are a chatbot with mixed personality types: ${maxNames.join(', ')}. Your responses should reflect this blend of characteristics. Keep it concise.`;
        } else {
            // Single personality case
            systemContent = `You are a chatbot with the personality type of a ${maxNames[0] || 'INFJ'}. You will answer accordingly. Keep it concise.`;
        }
        
        // Initialize conversation history with the appropriate system message
        conversationHistory = [
            {
                role: "system",
                content: systemContent
            }
        ];
        
        console.log("Initialized system with:", systemContent);
    }
    
    // Initialize conversation history - this will be properly set in setUpConversation()
    let conversationHistory = [];
    
    // Call setup function
    setUpConversation();
    
    // Function to display a message in the chat
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
            // Display user message immediately
            displayMessage('user', userMessage);
            userInput.value = '';

            // Add the user message to the conversation history
            conversationHistory.push({
                role: "user",
                content: userMessage
            });

            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('typing-indicator');
            typingIndicator.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
            chat.appendChild(typingIndicator);
            chat.scrollTop = chat.scrollHeight;

            try {
                // Log conversation history for debugging purposes
                console.log("Conversation History: ", conversationHistory);

                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer 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",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: "google/gemini-2.0-flash-thinking-exp:free",
                        messages: conversationHistory // Send the entire conversation history
                    })
                });

                const data = await response.json();
                console.log("Response from OpenRouter:", data);

                if (data.choices && data.choices.length > 0) {
                    // Remove typing indicator
                    typingIndicator.remove();

                    // Extract and display the bot's message
                    const botMessage = data.choices[0].message.content || "Sorry, I didn't understand that.";
                    displayMessage('assistant', botMessage);

                    // Add the bot's message to the conversation history with the correct role
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

    // Allow sending message with Enter key
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
});