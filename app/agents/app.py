from langchain.chat_models import init_chat_model
from app.config import MISTRAL_API_KEY


model = init_chat_model("mistral-small-latest", model_provider="mistralai", api_key=MISTRAL_API_KEY)
print(model.invoke([{"role": "user", "content": "Hello world"}]).content)
