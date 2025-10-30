from dotenv import load_dotenv, find_dotenv
import os

# Charge le fichier .env à la racine, où que tu sois
load_dotenv(find_dotenv())

# Variables d'environnement
MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
MISTRAL_MODEL = os.getenv("MISTRAL_MODEL")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL")

# Optionnel : vérification
if not MISTRAL_API_KEY:
    raise ValueError(
        "⚠️ MISTRAL_API_KEY n'est pas définie dans .env ou les variables d'environnement."
    )
if not MISTRAL_MODEL:
    raise ValueError(
        "⚠️ MISTRAL_MODEL n'est pas définie dans .env ou les variables d'environnement."
    )
if not EMBEDDING_MODEL:
    raise ValueError(
        "⚠️ EMBEDDING_MODEL n'est pas définie dans .env ou les variables d'environnement."
    )
