

from langchain.chat_models import init_chat_model
from app.config import MISTRAL_API_KEY, MISTRAL_MODEL

from fastapi import FastAPI, Request, HTTPException
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.chat_models import init_chat_model
from pydantic import BaseModel
import uuid
from app.config import MISTRAL_API_KEY, MISTRAL_MODEL
from fastapi.middleware.cors import CORSMiddleware
from app.model.schemas import ChatMessage, ChatResponse

class BaseAgent:
    def __init__(self):
        self.llm = init_chat_model(MISTRAL_MODEL, model_provider="mistralai", api_key=MISTRAL_API_KEY)
        self.sessions = {} # {session_id: ConversationBufferMemory()}
    
    def chat(self, chat_message: ChatMessage) -> ChatResponse:
        # créer ou récupérer la session
        session_id = chat_message.session_id or str(uuid.uuid4())

        # créer ou récupérer la mémoire de la session
        if session_id not in self.sessions:
            self.sessions[session_id] = ConversationBufferMemory(return_messages=True)

        memory = self.sessions[session_id]

        # créer une chaine de conversation avec la mémoire
        agent = ConversationChain(llm=self.llm, memory=memory, verbose=False)

        # invoque l'agent qui va répondre en tenant compte de l'historique
        ai_message = agent.invoke({"input": chat_message.message})

        return ChatResponse(response=ai_message["response"], session_id=session_id)
