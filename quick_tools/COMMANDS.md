# Quick Commands Reference

## Study System

### Launch Study Assistant
```bash
cd study_system
streamlit run study_chat_ui.py
```

### Test OCR
```bash
python tests/test_ocr.py /path/to/screenshot.png
```

### Convert Clipboard Image
```bash
cd study_system
python clipboard_to_base64.py
```

## Coursera Agent

```bash
cd coursera_agent
python coursera_agent.py
```

## File Organization

- **study_system/** - Complete RAG study assistant with OCR
- **coursera_agent/** - Coursera automation tools
- **tests/** - Test scripts for OCR and parsing
- **docs/** - Documentation and specifications
- **archive/** - Legacy files
