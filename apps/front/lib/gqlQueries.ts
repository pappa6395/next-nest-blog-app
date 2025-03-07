import gql from "graphql-tag"


export const GET_POSTS = gql`
    query posts($skip: Float, $take: Float) {
        posts (skip:$skip, take:$take) {
            id
            title
            thumbnail
            content
            slug
            createdAt
        }
            postCount
    
    }

`;

export const GET_POST_BY_ID = gql`
    query getPostById($id: Int!) {
        getPostById(id: $id) {
            id
            title
            thumbnail
            content
            createdAt
            author {
                id
                name
            }
            tags {
                id
                name
            }
        }
    }

`