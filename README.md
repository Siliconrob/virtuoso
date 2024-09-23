This is an interview application built for [Virtuoso](https://www.virtuoso.com/)

[Live Site](https://virtuoso-dg8s.onrender.com/)

Welcome to this sample application that leverages the API endpoints against [The Metropolitan Museum of Art Collection API](https://metmuseum.github.io/).

## Demo use

## Flow


## Development

This project was built using the default Vite React template.

- Make sure to set all your [.env](https://www.baeldung.com/linux/environment-variables-file) variables.
- The `.env` file in this repository has the necessary keys you must fill out
```
VITE_APP_NODE_ENV=<fill in a value other than production for testing>
``` 
- [Node.js](https://nodejs.org/en/about/) Please install at least Node.js version `v22.1.0` and `npm`.
- Run `npm install` to initialize all the dependencies

## Render Deployment

- Signup for a free [Render](https://dashboard.render.com/register) account.  You won't regret it :)
- Connect your [GitHub](https://docs.render.com/github) account
- Choose the `Static Site` [option](https://docs.render.com/static-sites)
- Setup a name
- Use the defaults and set the `Build Command` to `npm install; npm run build`
- Make sure to copy your data from your `.env` file you setup earlier into the `Environment` [settings](https://docs.render.com/configure-environment-variables)
- Trigger a manual deployment

