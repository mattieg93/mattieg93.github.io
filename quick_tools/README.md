# Quick Tools

Organized utility scripts and tools for coursework assistance.

## 📁 Folder Structure

### study_system/
Complete RAG-based study assistant with OCR quiz support:
- **study_chat_ui.py** - Streamlit UI for chat and quiz screenshots
- **study_system.py** - RAG query system
- **study_db.py** - ChromaDB vector database
- **ocr_utils.py** - OCR and quiz parsing (EasyOCR)
- **quiz_generator.py** - Quiz generation tools
- **clipboard_to_base64.py** - Screenshot to base64 converter
- **study_data/** - Course materials and vector DB

### coursera_agent/
Coursera automation tools:
- **coursera_agent.py** - Coursera automation agent
- **launch_chrome.sh** - Chrome launcher script
- **credentials.json** - API credentials

### 🧪 tests/
OCR and parsing test scripts:
- **test_ocr.py** - OCR accuracy testing
- **test_ocr_debug.py** - Debug OCR detection
- **test_parse_debug.py** - Debug parsing logic

### archive/
Legacy/unused files

## Prerequisites

Before using the study system, you need:

1. **Ollama** - Local LLM runtime
   ```bash
   # Install from https://ollama.ai
   ollama serve
   ollama pull granite3.2:8b
   ```

2. **Python Packages**
   ```bash
   pip install streamlit chromadb easyocr pillow numpy opencv-python ollama
   ```

See [study_system/README.md](study_system/README.md) for detailed setup instructions.

## Usage

### Study Assistant
```bash
# Make sure Ollama is running first!
ollama serve  # In separate terminal

cd study_system
streamlit run study_chat_ui.py
```

### Test OCR
```bash
python tests/test_ocr.py path/to/screenshot.png
```

### Convert Clipboard Screenshot
```bash
cd study_system
python clipboard_to_base64.py
```

### Coursera Agent
```bash
cd coursera_agent
python coursera_agent.py
```
