import "../style/InfoProject.css";

function InfoProjet() {
  return (
    <div>
        <div className='InfoProjet'>
            <h2>Les objectifs de ce projet :</h2>
            <ul>
                <li>Servir de banc d'essai pour utiliser les technos d'IA vu en cours et en projet</li>
                <li>Permettre d'exposer mes compétences sur un projet personnel</li>
                <li>Gagner en autonomie et en skills pour la gestion de projet</li>
                <li>Être durable et évolutif</li>
            </ul>
        </div>
        <div className='InfoProjet'>
            <h2>Avancées actuelles et futurs :</h2>
            <ul>
                <li>☑️ LLM avec LangChain</li>
                <li>☑️ Mémoire pour la session</li>
                <li>☑️ Backend FastAPI</li>
                <li>☑️ Frontend simple React/Vite</li>
                <li>⭐️ Agentique avec LangGraph</li>
                <li>⭐️ Spécialisation avec des RAGs</li>
                <li>⭐️ Accessible depuis mon site web</li>
                <li>⭐️ Historique de conversation</li>
                <li>⭐️ Tester l'intégration de MCPs</li>
            </ul>
        </div>
    </div>
  );
}

export default InfoProjet;