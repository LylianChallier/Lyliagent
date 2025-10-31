from langchain.chat_models import init_chat_model
from app.config import MISTRAL_API_KEY, MISTRAL_MODEL


model = init_chat_model(MISTRAL_MODEL, model_provider="mistralai", api_key=MISTRAL_API_KEY)


# class ChatMessage(BaseModel):
#     message: str
#     session_id: str = "default"

# class ChatResponse(BaseModel):
#     response: str
#     session_id: str

while True:
    query = input("👉 Toi : ")
    if query.lower() in ["exit", "quit"]:
        break

    response = model.invoke([{"role": "user", "content": query}])
    print("🧠 Agent :", response.content)