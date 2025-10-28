# Questions
- Cloud Infra
  - Can frontend be on S3 and cloudfront?
  - What is the expected backend system node server can run no local but on cloud need Lambda/EC2s need to do it?
  - If just JSON in the backend then can be done with JSON files in S3?
  - What is the expectation on login?
    - to be handled in express server? cognito? or dummy is okay?

# Technical Requirements
- Frontend: React (or Next.js) with Tailwind CSS and Recharts/Chart.js for visualization.
- Backend: Node.js + Express or Python FastAPI with mock endpoints (`/api/ai-cost`, `/api/model-usage`, `/api/roi`, `/api/alerts`).
- Data: Use JSON files or mock APIs to simulate system behavior.
- Integration: Enable interactive updates (e.g., ROI recalculates when token cost changes).

# Deliverables

- GitHub repository with source code and README.
- Deployed link (Netlify/Vercel/Render) and 2-min demo video.
- Documentation including architecture overview, tech stack, and enhancement ideas.

# Evaluation Criteria

- Area Weight Key Checks
- UI Implementation (Figma Accuracy) 25% Pixel fidelity, transitions, responsiveness

- Architecture & Code Quality 25% Structure, modularity, state management
- Functionality & Data Binding 20% APIs, ROI calculation, interactivity
- Problem-Solving & Initiative 20% Creative insight logic, data simulation
- Documentation & Delivery 10% README clarity, deployment link, demo video
