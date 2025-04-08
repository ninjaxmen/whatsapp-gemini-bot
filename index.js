'use strict';

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true },
    webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html' }
});

// Meme configuration
const MEMES = {
    food: "https://i.imgflip.com/5y0xy0.jpg",
    breakup: "https://i.imgflip.com/7i5f3v.jpg",
    bore: "https://i.imgflip.com/6v0frc.jpg",
    monday: "https://i.imgflip.com/3vzej0.jpg",
    gym: "https://i.imgflip.com/3txgyq.jpg",
    overthinking: "https://i.imgflip.com/6v0fpa.jpg",
    office: "https://i.imgflip.com/75r7vj.jpg",
    coding: "https://i.imgflip.com/4t0m5i.jpg",
    chai: "https://i.imgflip.com/7a5syq.jpg",
    neend: "https://i.imgflip.com/6ym0wv.jpg",
    weekend: "https://i.imgflip.com/5lzbtw.jpg",
    crush: "https://i.imgflip.com/3si4.jpg",
    vibe: "https://i.imgflip.com/5xt8x1.jpg",
    lag: "https://i.imgflip.com/7k6y3n.jpg",
};

const STICKERS = {
    mood: './stickers/mood_op.webp'
};

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('🚀 WhatsApp bot is ready!');
    console.log(`Scan count: ${client.getState()}`);
});

client.on('message', async (message) => {
    try {
        const userMessage = message.body.toLowerCase();
        await client.sendSeen(message.from);
        
        // Simulate human response delay
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2500));

        // Handle memes
        const memeKeywords = Object.keys(MEMES).join('|');
        const memeRegex = new RegExp(`\\b(${memeKeywords})\\b`, 'i');
        const memeMatch = userMessage.match(memeRegex);
        
        if (memeMatch) {
            const keyword = memeMatch[0].toLowerCase();
            try {
                const media = await MessageMedia.fromUrl(MEMES[keyword]);
                await message.reply(media, null, { sendMediaAsDocument: false });
                return;
            } catch (err) {
                console.error('Meme Error:', err);
                await message.reply("Arey yaar, meme load nahi hua 😅 Kal try karna!");
                return;
            }
        }

        // Handle stickers
        if (userMessage.includes('mood')) {
            try {
                if (fs.existsSync(STICKERS.mood)) {
                    const media = MessageMedia.fromFilePath(STICKERS.mood);
                    await message.reply(media);
                    return;
                }
                await message.reply("Sticker toh kho gaya hai 😬");
                return;
            } catch (err) {
                console.error('Sticker Error:', err);
            }
        }

        // Generate Gemini response
        const botReply = await getGeminiReply(message.body);
        const cleanedReply = processReply(botReply);
        await message.reply(cleanedReply);

    } catch (error) {
        console.error('Main Error:', error);
        await message.reply("Bhai thoda system hang ho gaya, ek minute baad try karna 😅");
    }
});

async function getGeminiReply(prompt) {
    const API_KEY = process.env.GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const contextPrompt = `Yo! Respond as Yuvraj Ray - a 23 year old guy sliding in DMs. Mix Hinglish like hai 💀'. Keep it RAW:

Max 10-12 words per reply

Never:

Use full sentences

Sound like Google Assistant

Say 'please'/'thank you' formally

Current chat: [User's message]
Reply like you're texting your homies 👊": "${prompt}"`;

    try {
        const { data } = await axios.post(API_URL, {
            contents: [{
                parts: [{ text: contextPrompt }]
            }]
        }, {
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' }
        });

        return data.candidates?.[0]?.content?.parts?.[0]?.text 
            || "Bro kuch technical dikkat hai, baad mein try karte hain 🤖";

    } catch (err) {
        console.error('Gemini API Error:', err.response?.data || err.message);
        return "Yaar abhi Gemini mood mein nahi hai, thodi der baad puchna 😴";
    }
}

function processReply(text) {
    const BANNED_PHRASES = [
        /jugad mein hain/gi,
        /chill\s+maar/gi,
        /bkl/gi,
        /neend se dosti/gi
    ];

    let cleaned = text;
    BANNED_PHRASES.forEach(regex => cleaned = cleaned.replace(regex, ''));
    
    return cleaned
        .replace(/\n+/g, ' ')
        .trim()
        .replace(/([.!?])$/, '$1 😎')
        .replace(/(😎)+$/, '😎');
}

client.initialize();