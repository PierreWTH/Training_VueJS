<template>
  <div>
    <template v-if="this.question">  
      <h1 v-html="this.question"></h1>
      
      <h2> Difficulty : {{ this.difficulty}}</h2>
    
      <template v-for="answer in this.answers" :key="answer">
        <input type="radio" name="options" :value="answer" v-model="this.chosenAnswer">
        <label v-html="answer"></label><br>
      </template>
      
      <button @click="this.submitAnswer" class="send" type="button">Send</button>
    </template>
  </div>
</template>
  
<script>

export default {
  name: 'App',
  data() {
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswers: undefined,
      difficulty: undefined,
      chosenAnswer: undefined
    }
  },
  methods: {
    submitAnswer() {
      if(!this.chosenAnswer){
        alert("Pick one of the option before submit !")
      }
      else{
        if(this.chosenAnswer == this.correctAnswers){
          alert("Bien joué")
        }
        else{
          alert("Nul giroud")
        }
      }
    }
  },
  computed: {
    answers() {
      let answers = JSON.parse(JSON.stringify(this.incorrectAnswers));
      answers.splice(Math.round(Math.random() * 4), 0, this.correctAnswers);
      return answers
    }
  },
  created() {
    let apiLink = 'https://opentdb.com/api.php?amount=1&category=18' 
    this.axios
    .get(apiLink)
    .then((response) => {
      console.log(response.data)
      this.question = response.data.results[0].question;
      this.incorrectAnswers = response.data.results[0].incorrect_answers;
      this.correctAnswers = response.data.results[0].correct_answer;
      this.difficulty = response.data.results[0].difficulty;

    })
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
