<template>
  <div class="hello">
    <h1>Welcome to your one stop shop for studying</h1>
    <p>
      For a quick read on the best methods of mastering any topic checkout the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">article on scientifically proven study methods</a>.
    </p>
    <h3>My Decks</h3>
    <ul>
      {{ console.log(decks) }}
      <li  v-for="deck in decks" :item="deck" :key="deck.name">
        <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">{{ deck.name }}</a>
      </li>
    </ul>
    <h3>Tools</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Import  Decks</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Export Decks</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Donate</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  setup() {
    const decks = [
        {
          name: 'First Deck',
          cards: [
            { question: 'How?', answer: 'Wow' },
            { question: 'Where?', answer: 'There' },
            { question: 'When?', answer: 'Then' },
            { question: 'What?', answer: 'Yes' },
            { question: 'Why?', answer: 'Because' }
          ]
        }
      ];

      return { decks };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
