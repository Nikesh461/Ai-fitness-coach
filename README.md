Markdown
# 🤖 AI Fitness Coach

An intelligent, full-stack AI-powered personal fitness and nutrition companion. This application leverages generative AI and specialized health databases to provide users with tailored workout regimes, precise dietary tracking, and an interactive coaching experience.

---

## 🚀 Features

- **Secure User Authentication**: Robust user signup and login workflows protected by **bcrypt** password hashing and stateless **JWT (JSON Web Tokens)** for secure session management.
- **AI-Powered Fitness Coaching**: Integrates the **Google Gemini API** to generate intelligent, context-aware workout plans, fitness advice, and answer user queries in real-time.
- **Extensive Exercise Database**: Connects with **ExerciseDB API** to fetch comprehensive exercise guides, targeting specific muscle groups, equipment, and animations/videos.
- **Smart Nutrition Tracking**: Integrates the **Edamam API** to parse meal ingredients, calculate precise caloric intake, and analyze macro/micronutrient breakdowns.
- **Interactive Dashboard**: A clean, responsive frontend built entirely using semantic HTML, custom CSS, and vanilla JavaScript to visualize fitness progress and daily logs.

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** & **CSS3** (Responsive UI/UX design)
- **JavaScript (ES6+)** (Dynamic DOM manipulation and API handling)

### Backend & Database
- **Node.js** (Runtime environment)
- **Express.js** (Backend web framework)
- **MongoDB** (NoSQL Database for user profiles, logs, and historical tracking)

### Security & Authentication
- **JSON Web Tokens (JWT)** (Secure token-based authorization)
- **bcrypt** (Secure cryptographic password hashing)

### Third-Party APIs
- **Google Gemini API** (Core AI generation and conversational assistance)
- **ExerciseDB (RapidAPI)** (Exercise libraries and instructional data)
- **Edamam API** (Nutrition analysis and recipe search)

⚙️ Installation & Setup
Follow these steps to set up and run the AI Fitness Coach application locally on your machine:

1. Clone the Repository
Bash
git clone [https://github.com/Nikesh461/Ai-fitness-coach.git](https://github.com/Nikesh461/Ai-fitness-coach.git)
cd Ai-fitness-coach
2. Install Backend Dependencies
Bash
npm install
3. Configure Environment Variables
Create a file named .env in the root directory of your project and configure your specific database URLs and API credentials:

Code snippet
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/fitnessCoach
JWT_SECRET=your_super_secure_jwt_secret_key

# Third-Party API Keys
GEMINI_API_KEY=your_google_gemini_api_key
EXERCISE_DB_API_KEY=your_rapidapi_exercisedb_key
EDAMAM_APP_ID=your_edamam_app_id
EDAMAM_APP_KEY=your_edamam_app_key
4. Run the Application
Start the development server:

Bash
npm run dev
(Or use npm start depending on your package.json scripts setup)

Once the backend is operational, open the frontend/index.html file in your browser or serve it using a local live server extension to begin interacting with the dashboard.