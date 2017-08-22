<template>
<article
  class="media comment"
  :style="{
    'border-left': '3px solid ' + comment.task_status.color
  }"
>

  <figure class="media-left">
    <div class="level">
      <div class="level-left">
        <people-avatar class="level-item" :person="comment.person">
        </people-avatar>
      </div>
    </div>
  </figure>

  <div class="media-content">
    <div class="content">
      <p class="comment-person">
        <strong>
          <people-name class="" :person="comment.person">
          </people-name>
        </strong>
        <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
      </p>

      <div class="level" v-if="comment.task_status.short_name === 'retake'">
        <div class="level-left">
          <span class="level-item" :style="{'color': comment.task_status.color}">
            {{ $t('comments.retake').toUpperCase() }}
          </span>
          <span
            class="revision"
            v-if="comment.preview"
          >
            revision {{ comment.preview.revision }}
          </span>
          <button-link
            class="level-item"
            :text="$t('tasks.add_preview')"
            icon="fa-upload"
            :path="'/tasks/' + comment.object_id + '/comments/' + comment.id + '/add-preview'"
            v-else
          >
          </button-link>
        </div>
        </button-link>
      </div>

      <div class="level" v-if="comment.task_status.name === 'Waiting For Approval'">
        <div class="level-left">
          <span
            class="level-item"
            :style="{'color': comment.task_status.color}"
          >
            {{ $t('comments.validation_required') }}
          </span>

          <span
            class="revision"
            v-if="comment.preview"
          >
            revision {{ comment.preview.revision }}
          </span>
          <button-link
            class="level-item"
            :text="$t('tasks.add_preview')"
            icon="fa-upload"
            :path="'/tasks/' + comment.object_id + '/comments/' + comment.id + '/add-preview'"
            v-else
          >
          </button-link>
        </div>
      </div>

      <p v-if="comment.task_status.name === 'Done'">
        <span :style="{'color': comment.task_status.color}">
        {{ $t('comments.validated') }}
        </span>
      </p>

      <p class="version" v-if="comment.task_status_name === 'RETAKE'">
      </p>

      <p v-html="compileMarkdown(comment.text)" class="comment-text">
      </p>

      <p class="comment-date">
      </p>
    </div>
  </div>
</article>
</template>

<script>
import marked from 'marked'
import moment from 'moment'

import PeopleAvatar from './PeopleAvatar.vue'
import PeopleName from './PeopleName.vue'
import ButtonLink from './ButtonLink.vue'

export default {
  name: 'comment',
  components: {
    PeopleAvatar,
    PeopleName,
    ButtonLink
  },
  props: [
    'comment'
  ],
  methods: {
    formatDate (date) {
      return moment(date).fromNow()
    },
    compileMarkdown (input) {
      return marked(input || '')
    }
  }
}
</script>

<style scoped>
.comment {
  padding-left: 0.6em;
  border-left: 3px solid #CCC;
}

.comment-date {
  color: #999;
  font-style: italic;
  margin-left: 0.5em;
}

span.revision {
  color: #999;
  font-size: 0.8em;
  font-style: italic;
  margin: 0;
}
</style>