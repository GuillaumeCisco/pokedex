const apiPort = process.env.NODE_PORT || 3000;
const apiUrl = 'http://pokeapi.co/api/v2';

module.exports = {
    appName: 'Pokedex',
    apps: {
        frontend: {
            api_url: apiUrl,
            api_port: apiPort,
        },
    },
    babel_ignore: /node_modules\/(?!admin-config)/,
};
