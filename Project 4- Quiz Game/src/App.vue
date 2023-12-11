<template>

  <div>
<h1> Hello world</h1>

<input type="radio" name="options" value="true">
<label>True</label><br>

<input type="radio" name="options" value="false">
<label>False</label><br>

<button class="send" type="button">Send</button>
  </div>
</template>

<script>

export default {
  name: 'App',
}

// https://opentdb.com/api.php?amount=1&category=18

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
