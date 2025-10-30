from langchain.chat_models import init_chat_model
from config import MISTRAL_API_KEY, MISTRAL_MODEL


model = init_chat_model(MISTRAL_MODEL, model_provider="mistralai", api_key=MISTRAL_API_KEY)
print(model.invoke([{"role": "user", "content": "Hello world"}]).content)

