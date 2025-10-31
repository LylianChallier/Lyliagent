import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatWindow from "./components/ChatWindow.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='IntroProjet'>
        <h1>Bienvenue sur mon ChatBot</h1>
        Voici mon chatbot IA construit avec LangChain. Essayez-le !
        <br />
        Le backend est en FastAPI et le frontend en Vite+React.
        <h2>Le but du projet ?</h2>
        Utiliser les technologies d'IA que j'ai pu croiser dans mes projets pour un projet personnel.
        <br />
        C'est aussi une façon pour moi d'expérimenter et de montrer mes compétences,
        <br />
        sans être bloquer par des droits d'auteurs qu'on rencontre dans les projets en entreprise.
      </div>
      <div className='ChatBot'>
        <ChatWindow />
      </div>


      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}


    </>
  )
}

export default App
