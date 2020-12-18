<template>
  <div>

    <div class="py-3 text-center">
      <h2>{{chapter_title}}</h2>
      <p v-if="chapter_content"  class="lead">{{ chapter_content }}</p>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Chapter',
  props: {
    chapter_title: String,
    chapter_content: String
  },
  methods: {

  }
}
</script>