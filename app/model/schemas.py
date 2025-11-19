"""
Schémas pydantic pour les messages de chat et les réponses.
"""

from pydantic import BaseModel

class ChatMessage(BaseModel):
    """Message reçu par l'agent"""
    message: str
    session_id: str = "default"

class ChatResponse(BaseModel):
    """Réponse renvoyée par l'agent"""
    response: str
    session_id: str