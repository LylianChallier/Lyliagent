# app/api.py
from fastapi import FastAPI, Request, HTTPException
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.chat_models import init_chat_model
from pydantic import BaseModel
import uuid
from app.config import MISTRAL_API_KEY, MISTRAL_MODEL


app = FastAPI()
llm = init_chat_model(MISTRAL_MODEL, model_provider="mistralai", api_key=MISTRAL_API_KEY)
sessions = {}

class ChatMessage(BaseModel):
    message: str
    #session_id: str = "default"

class ChatResponse(BaseModel):
    response: str
    #session_id: str

def talk_to_agent(query):
    query = input("👉 Toi : ") if query==None else query
    if query.lower() in ["exit", "quit"]:
        return "👋 À bientôt !"

    response = llm.invoke([{"role": "user", "content": query}])
    return "🧠 Agent :" + response.content

@app.post("/", response_model=ChatResponse)
def chat_with_agent(chat_message: ChatMessage):
    try:
                
        # Construire la liste des messages avec l'historique + nouveau message
        # messages = chat_history + [HumanMessage(content=chat_message.message)]
        # Invoquer le modèle avec tout l'historique
        ai_response = talk_to_agent(chat_message.message)

        # Extraire le texte de la réponse si c'est un objet SpecificInfoOutput
        if hasattr(ai_response, 'response'):
            ai_message = ai_response.response
        elif hasattr(ai_response, 'text'):
            ai_message = ai_response.text
        else:
            ai_message = str(ai_response)
        
        return ChatResponse(response=ai_message)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur de l'agent: {str(e)}")
    