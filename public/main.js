document.addEventListener('DOMContentLoaded', function () {
    // Get the start button and the quiz section
    const startButton = document.querySelector('.startButton');
    const Q1 = document.getElementById('Q1');
    
    // Initialize scores
    const scores = [
        { name: "A", value: 0 },
        { name: "B", value: 0 },
        { name: "C", value: 0 },
        { name: "D", value: 0 },
    ];
    
    // Initialize dialogue index
    let currentMessageIndex = 0;
    
    // Dialogue options
    const dialogue = [
        {
            speaker: 'bot',
            text: ["Let's start with the basics", "1) What is 'love' to you?"],
            choices: [
                { id: 1, text: "a safe space, to be ourselves and to simply be together", type: 'A', weight: 1, next: 1 },
                { id: 2, text: "an adventure, filled with fun and unforgettable memories", type: 'B', weight: 1, next: 1 },
                { id: 3, text: "a commitment, being there for each other no matter what", type: 'C', weight: 1, next: 1 },
                { id: 4, text: "a beautiful friendship, built on trust and understanding", type: 'D', weight: 1, next: 1 }
            ]
        },
        {
            speaker: 'bot',
            text: ["2) What do you value most in a relationship?"],
            choices: [
                { id: 1, text: "Emotional connection and closeness", type: 'A', weight: 1, next: 2 },
                { id: 2, text: "Excitement and spontaneity", type: 'B', weight: 1, next: 2 },
                { id: 3, text: "Loyalty and reliability", type: 'C', weight: 1, next: 2 },
                { id: 4, text: "Open communication and honesty", type: 'D', weight: 1, next: 2 }
            ]
        },
        // Add more questions here...
        {
            speaker: 'bot',
            text: ["Thank you for answering all the questions!"],
            choices: [] // No choices means this is the end
        }
    ];
    
    // Add event listener for the start button
    if (startButton) {
        startButton.addEventListener('click', function (e) {
            // Hide the current content
            document.querySelector('.content').style.display = 'none';
            
            // Show the quiz section
            Q1.style.display = 'block';
            
            // Start the conversation
            startConversation();
        });
    }
    
    // Start the conversation by displaying the first message and choices
    function startConversation() {
        // Display the first message in the dialogue
        addMessage('bot', dialogue[0].text);
        
        // Show the choices for the next step in the conversation
        showChoices(dialogue[0].choices);
    }
    
    // Function to display a message in the chatbox
    function addMessage(speaker, text) {
        const chatbox = document.getElementById('chatbox');
        if (!chatbox) return;
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', speaker);
        
        // If text is an array, display each message line by line
        if (Array.isArray(text)) {
            text.forEach(line => {
                const lineElement = document.createElement('div');
                lineElement.textContent = line;
                messageElement.appendChild(lineElement);
            });
        } else {
            messageElement.textContent = text;
        }
    
        // Append the message to the chatbox
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }
    
    // Function to display the typing indicator
    function showTypingDots() {
        const chatbox = document.getElementById('chatbox');
        if (!chatbox) return;
        
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.textContent = 'typing...';
        chatbox.appendChild(typingIndicator);
    }
    
    // Function to remove the typing indicator
    function stopTypingDots() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Function to display the choices
    function showChoices(choices) {
        const choicesContainer = document.getElementById('choices');
        if (!choicesContainer) return;
        
        choicesContainer.innerHTML = '';  // Clear any previous choices
    
        // If there are no choices, this is the end of the quiz
        if (!choices || choices.length === 0) {
            saveResult();
            return;
        }
    
        choices.forEach(choice => {
            const choiceButton = document.createElement('button');
            choiceButton.classList.add('choice-button');
            choiceButton.textContent = choice.text;
            choiceButton.onclick = () => handleChoice(choice.type, choice.weight, choice.id, choice.next);
            choicesContainer.appendChild(choiceButton);
        });
    }
    
    // Handle the user choice and move to the next message
    function handleChoice(type, weight, id, nextIndex) {
        const chosenOption = dialogue[currentMessageIndex].choices.find(choice => choice.id === id);
    
        // Update the scores
        const scoreObj = scores.find(obj => obj.name === type);
        if (scoreObj) {
            scoreObj.value += weight;
        }
    
        // Update the debug scores if the element exists
        updateDebugScores();
    
        // Update the message index to move to the next dialogue
        currentMessageIndex = nextIndex;
    
        // Clear the choices
        const choicesContainer = document.getElementById('choices');
        if (choicesContainer) {
            choicesContainer.innerHTML = '';
        }
        
        // Add the chosen option to the conversation
        addMessage('user', chosenOption.text);
    
        // After the user message is displayed, proceed with the next message
        setTimeout(() => {
            showTypingDots();
    
            setTimeout(() => {
                stopTypingDots();
    
                // Display the next message after a delay
                if (currentMessageIndex < dialogue.length) {
                    const nextDialogue = dialogue[currentMessageIndex];
                    
                    // Handle text messages
                    if (Array.isArray(nextDialogue.text)) {
                        nextDialogue.text.forEach((text, index) => {
                            setTimeout(() => {
                                addMessage(nextDialogue.speaker, text);
                            }, index * 1000);
                        });
                    } else {
                        addMessage(nextDialogue.speaker, nextDialogue.text);
                    }
    
                    // Show choices after all text messages are displayed
                    const textDisplayTime = Array.isArray(nextDialogue.text) ? 
                                           nextDialogue.text.length * 1000 : 1000;
                    
                    setTimeout(() => {
                        showChoices(nextDialogue.choices);
                    }, textDisplayTime);
                } else {
                    saveResult();
                }
            }, 1500);
        }, 500);
    }
    
    // Update the debug scores if the element exists
    function updateDebugScores() {
        const debugScoresElement = document.getElementById('debug-scores');
        if (!debugScoresElement) return;
        
        const formattedScores = scores.map(score => `${score.name}: ${score.value}`).join(', ');
        debugScoresElement.textContent = formattedScores;
    }
    
    // Display the final result and save scores
    function saveResult() {
        console.log('Saving and displaying final result based on scores:', scores);
    
        fetch('/save-scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scores)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/results.html';
            } else {
                console.error("Failed to save scores.");
            }
        })
        .catch(error => console.error("Error:", error));
    }

});

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.endsWith('/results.html')) {
        displayResult();
    }
    
    function displayResult() {
        console.log('Displaying saved scores');
        fetch('/get-scores')
            .then(response => response.json())
            .then(obj => {
                // Get array of values directly
                const data = Object.values(obj);
                console.log(data);
    
                // Setup chart dimensions
                const width = 400, height = 400, radius = Math.min(width, height) / 2;
    
                // Clear previous chart if any
                d3.select("#pie-chart").selectAll("*").remove();
    
                const svg = d3.select("#pie-chart")
                            .attr("width", width)
                            .attr("height", height)
                            .append("g")
                            .attr("transform", `translate(${width / 2}, ${height / 2})`);
    
                const color = d3.scaleOrdinal(d3.schemeCategory10);
    
                const pie = d3.pie().value(d => d.value);
                const arc = d3.arc().innerRadius(0).outerRadius(radius);
    
                const arcs = svg.selectAll("path")
                            .data(pie(data))
                            .enter()
                            .append("path")
                            .attr("fill", (d, i) => color(i))
                            .attr("stroke", "#fff")
                            .style("stroke-width", "2px")
                            .each(function (d) {
                                this._current = { startAngle: 0, endAngle: 0 };
                            })
                            .transition()
                            .duration(1000)
                            .attrTween("d", function (d) {
                                const interpolate = d3.interpolate(this._current, d);
                                this._current = interpolate(1);
                                return function (t) {
                                    return arc(interpolate(t));
                                };
                            });
    
                // Clear previous legend
                d3.select("#legend").selectAll("*").remove();
    
                const legend = d3.select("#legend")
                                .selectAll(".legend-item")
                                .data(data)
                                .enter()
                                .append("div")
                                .attr("class", "legend-item");
    
                legend.append("div")
                    .attr("class", "legend-color")
                    .style("background-color", (d, i) => color(i));
    
                legend.append("span")
                    .text(d => `${d.name} (${d.value})`);
    
                const largestItem = data.reduce((max, item) => (item.value > max.value ? item : max), data[0]);
    
                d3.select("#largest-value-text")
                    .text(`You're most like ${largestItem.name} (${largestItem.value})`);
            })
            .catch(error => {
                console.error("Error fetching or displaying results:", error);
                document.getElementById("largest-value-text").textContent = "Error loading results. Please try again.";
            });
    }
    
});