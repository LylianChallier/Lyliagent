# app/api.py
from fastapi import FastAPI, Request, HTTPException
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.chat_models import init_chat_model
from pydantic import BaseModel
import uuid
from app.config import MISTRAL_API_KEY, MISTRAL_MODEL
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
llm = init_chat_model(MISTRAL_MODEL, model_provider="mistralai", api_key=MISTRAL_API_KEY)
sessions = {} # {session_id: ConversationBufferMemory()}

# Autoriser le front à accéder à l’API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # port Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    """Message reçu par l'agent"""
    message: str
    session_id: str = "default"

class ChatResponse(BaseModel):
    """Réponse renvoyée par l'agent"""
    response: str
    session_id: str

@app.post("/", response_model=ChatResponse)
def chat_with_agent(chat_message: ChatMessage):
    try:

        # créer ou récupérer la session
        session_id = chat_message.session_id or str(uuid.uuid4())

        # créer ou récupérer la mémoire de la session
        if session_id not in sessions:
            sessions[session_id] = ConversationBufferMemory(return_messages=True)

        memory = sessions[session_id]

        # créer une chaine de conversation avec la mémoire
        agent = ConversationChain(llm=llm, memory=memory, verbose=False)

        # invoque l'agent qui va répondre en tenant compte de l'historique
        ai_message = agent.invoke({"input": chat_message.message})
        # si on appelle directement le llm sans la chaine de conversation
        # ai_message = llm.invoke([{"role": "user", "content": chat_message.message}])
        # print(f"AI MESSAGE : {ai_message.response}")
        # si on utilise le agent de ConversationChain, on entre un dict
        # la réponse est dans ai_message["response"] (reponse et un dict)

        return ChatResponse(response=ai_message["response"], session_id=session_id)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur de l'agent: {str(e)}")
    