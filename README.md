# 🤖 WhatsApp Gemini Bot

A smart WhatsApp bot powered by Google Gemini AI, featuring meme responses, sticker replies, and Gen-Z style conversations. Built with Node.js and whatsapp-web.js.

![Demo](https://img.shields.io/badge/Demo-Coming_Soon-blue) 
[![GitHub Issues](https://img.shields.io/github/issues/ninjaxmen/whatsapp-gemini-bot)](https://github.com/ninjaxmen/whatsapp-gemini-bot/issues)

## ✨ Features

- 🧠 Gemini AI-powered natural conversations
- 😂 Automatic meme responses (15+ triggers)
- 🎨 Sticker replies for specific keywords
- 💬 Gen-Z slang & Hinglish support
- ⚡ Real-time message processing
- 🔄 Session persistence with LocalAuth

## 🛠️ Installation

### Prerequisites
- Node.js v18+
- npm v9+
- Google Gemini API Key

```bash
# Clone repository
git clone https://github.com/ninjaxmen/whatsapp-gemini-bot.git

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

## 🔑 Configuration

Edit `.env` file:
```env
GEMINI_API_KEY=your_api_key_here
```

Get Gemini API key: [Google AI Studio](https://aistudio.google.com/)

## 🚀 Usage

```bash
# Start the bot
npm start

# Scan QR code with WhatsApp mobile
```

**Note:** Keep the session active for automatic reconnections.

## 🎭 Features Breakdown

| Trigger Type      | Examples                          | Response                      |
|-------------------|-----------------------------------|-------------------------------|
| Meme Keywords     | "food", "gym", "monday"           | Sends relevant meme image     |
| Sticker Trigger   | "mood"                            | Sends predefined sticker      |
| General Messages  | Any other text                    | Gemini AI-generated response  |

## 🚨 Troubleshooting

**Common Issues:**
- `Failed to push (large files)`: Remove node_modules and use `.gitignore`
- `Authentication errors`: Regenerate QR code or check session files
- `Media not sending`: Verify internet connection and file paths

```bash
# Fix dependency issues
rm -rf node_modules && npm install
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📬 Contact

Yuvraj Ray - [@ninjaxmen](https://github.com/ninjaxmen)

