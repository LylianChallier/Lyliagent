# app/api.py

"""
API FastAPI pour interagir avec l'agent de chat Mistral via des requêtes HTTP.
"""

from fastapi import FastAPI, Request, HTTPException
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.chat_models import init_chat_model
from pydantic import BaseModel
import uuid
from app.config import MISTRAL_API_KEY, MISTRAL_MODEL
from fastapi.middleware.cors import CORSMiddleware
from app.agents.base_agent import BaseAgent
from app.model.schemas import ChatMessage, ChatResponse

# def l'app et l'agent
app = FastAPI()
agent = BaseAgent()

# Autoriser le front à accéder à l’API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # port Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# la fonctionnalité de chat
@app.post("/", response_model=ChatResponse)
def chat_with_agent(chat_message: ChatMessage):
    try:
        reponse = agent.chat(
            chat_message
        )
        return reponse
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur de l'agent: {str(e)}")
