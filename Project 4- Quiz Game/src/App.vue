<template>
  <div>
    <button @click="winCount=0; loseCount=0; this.storeScore()">Reset score</button>
    <ScoreBoard :winCount ="this.winCount"  :loseCount = "this.loseCount"/>
    <template v-if="this.question">  
      <h1 v-html="this.question"></h1>
      
      <h2> Difficulty : {{ this.difficulty}}</h2>
    
      <template v-for="answer in this.answers" :key="answer">
        <input type="radio" name="options" :value="answer" v-model="this.chosenAnswer" :disabled="this.answerSubmitted" >
        <label v-html="answer"></label><br>
      </template>
      
      <button @click="this.submitAnswer(); this.storeScore()" v-if="!this.answerSubmitted" class="send" type="button">Send</button>

      <section class="result" v-if="this.answerSubmitted"> 
        <h4 v-if="this.chosenAnswer == this.correctAnswers" 
        v-html="'&#9989; Well done ! The answer ' + this.correctAnswers + ' is correct!'"> </h4>
        <h4 v-if="this.chosenAnswer !== this.correctAnswers"
        v-html="'&#10060; Sorry you picked the wrong answer ! The correct answer was ' + this.correctAnswers + '.'"></h4>
        <button class="send" type="button" @click="this.getNewQuestion()">Question suivante </button>
      </section>

    </template>
  </div>
</template>
  
<script>

// TO DO : stocker les scores dans le local storage 

import ScoreBoard from '@/components/ScoreBoard.vue'

export default {
    name: 'App',
    components: {
      ScoreBoard
    },
    data() {
        return {
            question: undefined,
            incorrectAnswers: undefined,
            correctAnswers: undefined,
            difficulty: undefined,
            chosenAnswer: undefined,
            answerSubmitted: false,
            winCount: 0,
            loseCount:0
        };
    },
    methods: {
        submitAnswer() {
            if (!this.chosenAnswer) {
                alert("Pick one of the option before submit !");
            }
            else {
                this.answerSubmitted = true;
                if (this.chosenAnswer == this.correctAnswers) {
                  this.winCount++
                }
                else {
                  this.loseCount++
                }
            }
        },
        getNewQuestion() {
            this.answerSubmitted = false;
            this.chosenAnswer = undefined;
            this.question = undefined;
            let apiLink = 'https://opentdb.com/api.php?amount=1&category=18';
            this.axios
                .get(apiLink)
                .then((response) => {
                this.question = response.data.results[0].question;
                this.incorrectAnswers = response.data.results[0].incorrect_answers;
                this.correctAnswers = response.data.results[0].correct_answer;
                this.difficulty = response.data.results[0].difficulty;
            });
        },
        storeScore(){
        localStorage.setItem("winCount", JSON.stringify(this.winCount))
        localStorage.setItem("loseCount", JSON.stringify(this.loseCount))
        }
    },
    computed: {
        answers() {
            let answers = JSON.parse(JSON.stringify(this.incorrectAnswers));
            answers.splice(Math.round(Math.random() * 4), 0, this.correctAnswers);
            return answers;
        }
    },
    created() {
        this.getNewQuestion();
        this.winCount = localStorage.getItem("winCount") ? JSON.parse(localStorage.getItem("winCount")) : this.winCount;
        this.loseCount = localStorage.getItem("loseCount") ? JSON.parse(localStorage.getItem("loseCount")) : this.loseCount;

    },
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

  input[type="radio"] {
    margin: 12px 4px;
  }

  .send {
    margin: 12px 4px;
    border: none;
    padding: 10px 40px;
    background-color: #4CAF50;
    color: white;
  }
}


</style>
