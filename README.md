# Journey Orchestrator

Journey Orchestrator is a platform to manage everything needed for Mars missions. It will help plan and organize all the details of traveling and living on Mars, using real-time data and user interactions.

### Tech stack

- React + Typescript
- Vite development server and tooling
- Redux for state management
- Material UI and icons
- Cypress for e2e testing
- Vercel for CICD and hosting

### Run the app locally

```bash
npm install
npm run dev
```

The app will be running on http://localhost:5173/.
No environment variables are needed.

### State management

The initial data for missions and members is mocked in a static file. It is managed through a Redux store and persisted in local storage. If you wish to clean up your changes and start from scratch, please clean your local storage from your browser console running `localStorage.clear()`.

### Testing

The testing is implemented using Cypress. For time reasons, only basic e2e testing was implemented. It could be extended with component testing. To run the tests, start the application and run:

```bash
npm run cy:open # to open the Cypress console and run the tests manually
npm run cy:run # to run all e2e tests in the terminal
```

### Deployment

The app is deployed using Vercel and available at: https://journey-orchestrator.vercel.app/.
Commits to the main branch trigger a production deployment, while commits on all other branches trigger preview deployments.
