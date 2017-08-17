import { graphql } from 'react-apollo'
import createPostGql from './createPost.gql'
import Feature from './feature'

export const withMutation = graphql(createPostGql, {
  props: ({ mutate }) => ({
    mutations: {
      createPost: (title, url) =>
        mutate({
          variables: { title, url },
          updateQueries: {
            allPosts: (previousResult, { mutationResult }) => {
              const newPost = mutationResult.data.createPost
              return Object.assign({}, previousResult, {
                // Append the new post
                allPosts: [newPost, ...previousResult.allPosts],
              })
            },
          },
        }),
    },
  }),
})

export default withMutation(Feature)
