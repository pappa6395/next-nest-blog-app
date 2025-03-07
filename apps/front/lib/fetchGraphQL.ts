import { BACKEND_URL } from "./constants"

export const fetchGraphQL = async (query: string, variables = {}) => {
    const response = await fetch(`${BACKEND_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ query, variables })
    });
    const result = await response.json();
    if (result.errors) {
        console.error("GraphQL Error", result.errors);
        throw new Error("Failed to fetch  the data from GraphQL");
        
    }

    return result.data;
}