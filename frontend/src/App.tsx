import './App.css'
import ChatWindow from "./components/ChatWindow";
import InfoProject from './components/InfoProject';

function App() {
  return (
    <div className="app-container">
      {/* Intro en haut */}
      <header className="intro-header">
        <h1>Bienvenue sur mon ChatBot</h1>
        <p>
          Voici mon chatbot IA construit avec LangChain. Essayez-le !
          <br />
          Le backend est en FastAPI et le frontend en Vite+React.
        </p>
      </header>

      {/* Contenu principal : InfoProject à gauche, ChatBot à droite */}
      <main className="main-content">
        <aside className="info-section">
          <InfoProject />
        </aside>

        <section className="chat-section">
          <ChatWindow />
        </section>
      </main>
    </div>
  )
}

export default App
