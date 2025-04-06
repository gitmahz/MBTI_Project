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

        //Extravert/Introvert
        {
            speaker: 'bot',
            text: ["3) Do you regain your energy from being alone in your own safe space or going out and hanging with other people?"], 
            choices: [
                { id: 1, text: "I hang out with people every chance I get. What’s the fun in staying home on a weekend?", type: 'A', weight: 1, next: 3 }, //E
                { id: 2, text: "I prefer to recharge in the comfort of my room or favourite corner, maybe listening to some tunes.", type: 'B', weight: 1, next: 3 }, //I
                { id: 3, text: "I do like being with people, but after a long day of socializing, I need time to myself ", type: 'C', weight: 1, next: 3 }, //I
                { id: 4, text: "Being with people, to me, is comforting ", type: 'D', weight: 1, next: 3 } //E
            ]
        },
        {
            speaker: 'bot',
            text: ["4) Do you thrive in social settings, or are you just wondering when it’s time to go home?"], 
            choices: [
                { id: 1, text: "When can I go homee?", type: 'A', weight: 1, next: 4 }, //I
                { id: 2, text: "Oh yeah, I do consider myself the life of the party! ", type: 'B', weight: 1, next: 4 }, //E
                { id: 3, text: "If it’s a small gathering over a big party then I’m fine ", type: 'C', weight: 1, next: 4 }, //I
                { id: 4, text: "A party? To meet new people? Sign me up! ", type: 'D', weight: 1, next: 4 } //E
            ]
        },

        {
            speaker: 'bot',
            text: ["5) How long does it take for your social battery to drain?"],
            choices: [
                { id: 1, text: "Oh boy.  A minute is my maximum.", type: 'A', weight: 1, next: 5 }, //I
                { id: 2, text: "Never <3 ", type: 'B', weight: 1, next: 5 }, //E
                { id: 3, text: "Social battery, what’s that? ", type: 'C', weight: 1, next: 5 }, //E
                { id: 4, text: "A couple of hours or so, give or take? ", type: 'D', weight: 1, next: 5 } //I
            ]
        },

        //Senors/Intuitive 

        {
            speaker: 'bot',
            text: ["6) When working on a new project, do you rely on proven facts to determine your course of action enjoy coming up with your own ideas?"],
            choices: [
                { id: 1, text: "It’s all in the facts.", type: 'A', weight: 1, next: 6 }, //S
                { id: 2, text: "Let your own ideas shine!", type: 'B', weight: 1, next: 6 }, //N
                { id: 3, text: "I think being able to rely on something proven is nice.", type: 'C', weight: 1, next: 6 }, //S
                { id: 4, text: "It’s more fun to create something new and exciting.", type: 'D', weight: 1, next: 6 } //N
            ]
        },

        {
            speaker: 'bot',
            text: ["7) Do you tend to skip over the details, or do you often find yourself overthinking each one? "],
            choices: [
                { id: 1, text: "Wait, was the question again? ", type: 'A', weight: 1, next: 7 }, //N
                { id: 2, text: "Let me think about it. ", type: 'B', weight: 1, next: 7 }, //S
                { id: 3, text: "What’s the fun in being bogged down by details? ", type: 'C', weight: 1, next: 7 }, //N
                { id: 4, text: "Details are key. ", type: 'D', weight: 1, next: 7 } //S
            ]
        },

        {
            speaker: 'bot',
            text: ["8) Do you focus more on the present and your current situation, or the bigger picture, seeking the potential in things?"],
            choices: [
                { id: 1, text: "Think big, make it big.", type: 'A', weight: 1, next: 8 }, //N
                { id: 2, text: "Deal with the situation at hand first.", type: 'B', weight: 1, next: 8 }, //S
                { id: 3, text: "I do love the thrill of spotting potential", type: 'C', weight: 1, next: 8 }, //N
                { id: 4, text: "The present is what matters most importantly", type: 'D', weight: 1, next: 8 } //S
            ]
        },

        //Thinkers/Feelers 

        {
            speaker: 'bot',
            text: ["9) Would you identify yourself as a logical person or one who values emotions and personal values? "],
            choices: [
                { id: 1, text: "Emotions are what make us human! ", type: 'A', weight: 1, next: 9 }, //F
                { id: 2, text: "Staying logical is the safest bet.", type: 'B', weight: 1, next: 9 }, //T
                { id: 3, text: "I like to make decisions based on my personal values ", type: 'C', weight: 1, next: 9 }, //F
                { id: 4, text: "Brain over heart any day. ", type: 'D', weight: 1, next: 9 } //T
            ]
        },

        {
            speaker: 'bot',
            text: ["10) Do you get clouded by your emotions often, or are you more grounded?"],
            choices: [
                { id: 1, text: "My mind goes on rollercoasters of emotions ", type: 'A', weight: 1, next: 10 }, //F
                { id: 2, text: "I tend to put my own emotions to the side for the greater good.", type: 'B', weight: 1, next: 10 }, //T
                { id: 3, text: "Being reasonable is what got me this far. ", type: 'C', weight: 1, next: 10 }, //T
                { id: 4, text: "I let my emotions take the driver's seat too often", type: 'D', weight: 1, next: 10 } //F
            ]
        },

        {
            speaker: 'bot',
            text: ["11) When someone comes to you with a problem, what’s your first instinct?"],
            choices: [
                { id: 1, text: "I find a practical solution ", type: 'A', weight: 1, next: 11 }, //T
                { id: 2, text: "I listen and empathize, it’s best to allow people to be heard", type: 'B', weight: 1, next: 11 }, //F
                { id: 3, text: "I get too emotionally invested", type: 'C', weight: 1, next: 11 }, //F
                { id: 4, text: "I try piecing out where it went wrong in the first place", type: 'D', weight: 1, next: 11 } //T
            ]
        },

        //Judging/Percievng

        {
            speaker: 'bot',
            text: ["12) How often do you like to stick to a schedule?"],
            choices: [
                { id: 1, text: "I can’t think of my day-to-day without a schedule", type: 'A', weight: 1, next: 12 }, //J
                { id: 2, text: "Oh, I avoid schedules like the plague! ", type: 'B', weight: 1, next: 12 }, //P
                { id: 3, text: "I try creating schedules, but they never work out too much", type: 'C', weight: 1, next: 12 }, //P
                { id: 4, text: "I like schedules. They are concrete and reliable", type: 'D', weight: 1, next: 12 } //J
            ]
        },

        {
            speaker: 'bot',
            text: ["13) Do you consider yourself open-minded about most things?"],
            choices: [
                { id: 1, text: "My mind is as open as space!", type: 'A', weight: 1, next: 13 }, //P
                { id: 2, text: "I do tend to have my own opinions, but I keep them to myself for the most part", type: 'B', weight: 1, next: 13 }, //J
                { id: 3, text: "Yup! I think so, I love learning new things.", type: 'C', weight: 1, next: 13 }, //P
                { id: 4, text: "Nope. My opinion is the only right opinion.", type: 'D', weight: 1, next: 13 } //J
            ]
        },

        {
            speaker: 'bot',
            text: ["14) How much do you like surprises? "],
            choices: [
                { id: 1, text: "Ooooh, are you giving me a surprise? Exciting! ", type: 'A', weight: 1, next: 14 }, //P
                { id: 2, text: "From time to time.", type: 'B', weight: 1, next: 14 }, //J
                { id: 3, text: "Not much, it messes with my plans sometimes.", type: 'C', weight: 1, next: 14 }, //J
                { id: 4, text: "Opening up gifts was my favourite part of Christmas ", type: 'D', weight: 1, next: 14 } //P
            ]
        },

        {
            speaker: 'bot',
            text: ["Thank you for answering all the questions!"],
            choices: [] // No choices means this is the end
        }
    ];
    
    // Add event listener for the start button
    if (startButton) {
        startButton.addEventListener('click', function () {
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

/*
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
*/