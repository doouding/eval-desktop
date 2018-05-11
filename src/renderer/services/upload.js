import Snippet from '@/api/snippet.api'

let currentSnippetModel = null

export function create () {
  currentSnippetModel = new Snippet()
  return currentSnippetModel
}

export function fetch (snippet) {
  currentSnippetModel = new Snippet(snippet)
  return currentSnippetModel
}

export function current () {
  return currentSnippetModel
}

export function destroy () {
  currentSnippetModel = null
}
