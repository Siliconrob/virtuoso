This is an interview application built for [Virtuoso](https://www.virtuoso.com/)

[Live Site](https://virtuoso-dg8s.onrender.com/)

Welcome to this sample application that leverages the API endpoints against [The Metropolitan Museum of Art Collection API](https://metmuseum.github.io/).

## Demo use

![react_app_viewer](https://github.com/user-attachments/assets/a8bc7230-bf48-4a1f-852e-8002ec15ee79)

## Flow

- Application loads the data from the collection by meta date changed after `https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=2024-09-01`
- Data is then sent to search components
- Search result controls the ids and paging of the results
- Search result item loads the data from the id and displays the contents

## Development

This project was built using the default Vite React template.

- Make sure to set all your [.env](https://www.baeldung.com/linux/environment-variables-file) variables.
- The `.env` file in this repository has the necessary keys you must fill out
```
VITE_APP_NODE_ENV=<fill in a value other than production for testing>
VITE_APP_NODE_ITEMS_PER_PAGE=<number of items per page, 5 is default if left blank>
VITE_APP_DAYS_IN_RANGE=<number of days available to search, 90 is default if left blank>
``` 
- [Node.js](https://nodejs.org/en/about/) Please install at least Node.js version `v22.1.0` and `npm`.
- Run `npm install` to initialize all the dependencies

## Tests

- Add a lab test method for the API validation, flipping to an environment variable above to something not production shows and pass test data

## Render Deployment

- Signup for a free [Render](https://dashboard.render.com/register) account.  You won't regret it :)
- Connect your [GitHub](https://docs.render.com/github) account
- Choose the `Static Site` [option](https://docs.render.com/static-sites)
- Setup a name
- Use the defaults and set the `Build Command` to `npm install; npm run build`
- Make sure to copy your data from your `.env` file you setup earlier into the `Environment` [settings](https://docs.render.com/configure-environment-variables)
- Trigger a manual deployment

