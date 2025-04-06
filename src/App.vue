<template>
  <div id="app">
    <div class="container">
      <h1>The Myers-Briggs Type Indicator</h1>

      <div class="content">
        <div class="box">
          <div class="pan-image-wrapper">
            <img src="/MBTIlogo.jpg" alt="MBTI Overview"/>
          </div>

          <h2 class="section-title">Introduction to MBTI</h2>

          <p>
            The Myers-Briggs Type Indicator (MBTI) is a widely used tool for understanding personality. Based on Carl Jung’s theory of psychological types, the MBTI categorizes individuals into 16 distinct personality types, helping people understand their preferences in areas like decision-making, social interactions, and work environments.
          </p>
        </div>
      </div>

      <div class="growth-section">
        <div class="growth-text">
          <h2>The General Types</h2>
          <p>
            Understanding your MBTI type can provide valuable insights into your strengths and weaknesses. By identifying your natural preferences, you can tailor your personal development efforts to improve your skills in areas like communication, problem-solving, and emotional intelligence. The MBTI framework categorizes individuals into 16 distinct personality types, which are determined by four key dichotomies: Introversion (I) vs. Extraversion (E), Sensing (S) vs. Intuition (N), Thinking (T) vs. Feeling (F), and Judging (J) vs. Perceiving (P). These preferences shape the way we perceive the world, make decisions, and interact with others. By recognizing your MBTI type, you can identify areas for growth, like improving communication with different types or focusing on personal strengths to enhance productivity, emotional intelligence, and conflict resolution.
          </p>
        </div>

        <div class="growth-image">
          <img src="/MBTItypes.jpg" alt="MBTI Types">
        </div>
      </div>

      <div class="box">
        <h2 class="section-title">MBTI Test</h2>

        <p>
          Based on the answers to the questions on the inventory, people are identified as having one of 16 personality types. The goal of the MBTI is to allow respondents to further explore and understand their own personalities, including their likes, dislikes, strengths, weaknesses, possible career preferences, and compatibility with other people.
          No one personality type is "best" or "better" than another. It isn't a tool designed to look for dysfunction or abnormality. Instead, its goal is simply to help you learn more about yourself. The questionnaire itself is made up of four different scales.
        </p>

        <div class="button-container">
          <a href="game.html">
            <button class="hover-button">MBTI Test</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
*{
  font-family: 'Roboto', sans-serif; /* New font style */
}
.container h1 {
  text-align: center;
  background-color: rgb(239, 240, 246);
  padding: 30px 20px;
  box-shadow: 0 4px 8px rgba(6, 13, 79, 0.49);
  font-size: 60px;
}

h1, h2 {
  font-size: 40px;
  color: rgb(48, 45, 100);
}

p {
  font-size: 30px;
  color: #555;
}

.image-placeholder {
  background-color: #ccc;
  height: 300px;
  margin: 20px 0;
  text-align: center;
  line-height: 300px;
  color: #fff;
  font-size: 40px;
}

.growth-section {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin: 0 auto;
  max-width: 1300px;
  justify-content: center;
  flex-wrap: wrap;
}

.growth-text {
  flex: 2;
  text-align: left;
}

.growth-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.growth-image img {
  max-width: 100%;
  height: auto;
}

.box {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.pan-image-wrapper img {
  width: 100%;
}

.section-title {
  text-align: center;
  background-color: rgb(239, 240, 246);
  padding: 15px 20px;
  box-shadow: 0 4px 8px rgba(6, 13, 79, 0.49);
  font-size: 40px;
  margin-top: 30px;
  margin-bottom: 20px;
}

.box p {
  font-size: 30px;
  color: #555;
}

.button-container {
  display: flex;
  justify-content: center; 
  height: 10vh; 
}

.hover-button {
  background-color:rgb(84, 76, 175); 
  color: white; 
  padding: 30px 40px; 
  font-size: 30px; 
  border: none; 
  border-radius: 50px; 
  cursor: pointer; 
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease; 
}

.hover-button:hover {
  background-color:rgb(56, 51, 138);
  transform: scale(1.1); 
}
</style>
