# LyliAgent, mon agent IA
Voici mon chatbot IA construit avec LangChain. Essayez-le !
Le backend est en FastAPI et le frontend en Vite+React.

## Les objectifs de ce projet :
- Servir de banc d'essai pour utiliser les technos d'IA vu en cours et en projet
- Gagner en autonomie et en skills pour la gestion de projet
- Être durable et évolutif

## Avancées actuelles et futurs :
- ☑️ LLM avec LangChain
- ☑️ Backend FastAPI
- ☑️ Mémoire pour la session
- ☑️ Frontend simple React/Vite
- ⭐️ Agentique avec LangGraph
- ⭐️ Spécialisation avec des RAGs
- ⭐️ Accessible depuis mon site web
- ⭐️ Historique de conversation
- ⭐️ Tester l'intégration de MCPs

## Un petit peu de doc et des tips pour le projet

### Clé API et modèles LLMs
Actuellement j'utilise `mistral-tiny` mais il me paraît un petit peu faible et propice aux hallucinations.
Mais je pense que c'est très bien pour expérimenter à moindres coûts. 
J'ai une clé API mistral gratuite qui ne permet pas l'utilisation de `mistral-medium` mais dans l'idéal il faudrait partir sur ce type de modèle dans le futur.
Entre les deux, on a le `mistral-small` à tester.

### Les types de mémoire sur LangChain

Voici un petit passage en revu des type de mémoire que l'on peut utiliser pour nos agents LLMs.
Actuellement j'utilise la `ConversationBufferMemory` mais les mémoires à résumer ou avec RAGs peuvent être intéressantes pour la suite et pour de longues conversations / des mémoires importantes entre plusieurs conversations.
```bash
ConversationBufferMemory	    # Garde tout l’historique brut
ConversationSummaryMemory	    # Résume automatiquement les messages anciens
ConversationBufferWindowMemory	# Ne garde que les N derniers échanges
VectorStoreRetrieverMemory	    # Stocke les échanges dans une base vectorielle (RAG)
```