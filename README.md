This is a tic tac toe game build with `react` and `typescript`.

To run the game, install the dependencies using `npm install` or `yarn install` and then start the development server using `npm run dev` or `yarn dev`. 


Open [http://localhost:3000](http://localhost:3000) with your browser.

### Vercel Link
The project is deployed at TODO: add the vercel link.

### Guide
The most important files are located in `src/app` directory.

* `game.ts` - contains the types and functions used for the game.
* `info.tsx` - contains the UI for the game info
    * which player should make the move now.
    * whether the game is in progress, or if it's a draw or a win.
    * the reset button.
* `square.tsx` - contains the UI for each square/tile on the game board.
* `page.tsx` - contains the actual UI for the app.
    * composes components from `info.tsx` and `square.tsx`.
    * imports the game state from `game.ts` and sets up everything (eg: event handlers).
* `layout.tsx` - contains the "root" Ui that sets up fonts and other data. It is a byproduct of creating the project with `next.js`.
* `globals.css` - contains the global styles for the *entire* app globally like light/dark colors or other defaults.
* `page.module.css` - contains the styles for the app, but
    * mostly focusing on components.
    * explicitly imported and used by components in the respective files.
    * Also handles layout.
* `/public` - This folder contains the images used in the UI. They were generated by AI, so ,they are not copyrighted and safe to redistribute.

The rest of the files are mostly generated by `next.js` for build configuration.
