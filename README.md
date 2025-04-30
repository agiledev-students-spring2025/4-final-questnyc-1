# Quest NYC: The Ultimate Urban Exploration Game

Quest NYC transforms New York City into a real-world RPG where players complete quests, solve puzzles, and collect virtual rewards by exploring key locations. The app encourages walking, exploration, and engagement with the city's rich history and culture.

## Features
- Location-based quests and challenges across NYC
- Themed adventures (Historic NYC, Hidden Art, Foodie Hunt, Ghost Stories)
- Interactive maps with real-time quest progress
- Trivia challenges and location-based puzzles
- XP and collectible reward system
- Leaderboards for friendly competition
- User profiles and progress tracking
- Personalized quest recommendations

## Technologies
- **Frontend:** React/Next.js for SSR and performance optimization
- **Backend:** Node.js, Express
- **Database:** MongoDB for storing quests, user progress, and leaderboards
- **Authentication:** JWT for secure user sessions

## Setup Instructions

1. **Clone the repository**
   ```
   git clone https://github.com/agiledev-students-spring2025/4-final-questnyc-1.git
   cd 4-final-questnyc-1
   ```

2. **Set up backend**
   ```
   cd back-end
   npm install
   ```

3. **Add .env file with credentials**
   Create a `.env` file in the back-end directory with:
   ```
   MONGODB_URI=mongodb+srv://sz3991:sz3991@cluster0.g4rtz2l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

4. **Start the backend server**
   ```
   npm start
   ```

5. **Set up frontend**
   ```
   cd ..
   cd front-end
   npm install
   npm start
   ```

6. **Access the application**
   - The webpage will automatically open in your browser
   - Alternatively, visit: http://localhost:3000
   - The interface is optimized for mobile devices - use browser inspect tools and select a mobile phone dimension (iPhone 12 Pro recommended)

## Team Members

- **[Tahsin Tawhid](https://github.com/tahsintawhid)**
- **[Brian Tylo](https://github.com/brian105)**
- **[James Whitten](https://github.com/jwhit0)**
- **[Shiwen Zhu](https://github.com/shiwenz59)**
- **[Isaac Tu](https://github.com/IsaacProgrammer0)**