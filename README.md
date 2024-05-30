# Journey Orchestrator

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
TODO

### Deployment
The app is deployed using Vercel and available at: https://journey-orchestrator.vercel.app/.
Commits to the main branch trigger a production deployment, while commits on all other branches trigger preview deployments.