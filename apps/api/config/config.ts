
export default () => ({
    JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret', // Ensure there's always a value
});
