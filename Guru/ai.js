

const axios = require("axios");
const { malvin } = require("../GuruTech/malvin");

malvin({
    pattern: "ai",
    alias: "deepseek",
    desc: "Interact with ChatGPT using the Api.",
    category: "ai",
    react: "🤖",
    use: ".ai <your query>",
    filename: __filename,
}, async (malvin, mek, m, { from, args, q, reply }) => {
    try {
        // Vérification de l'entrée utilisateur
        if (!q) return reply("Please provide a query.\n\nExample:\n.marisel What is AI?");

        // Utilisation de `${text}` dans le endpoint API
        const text = q;  // Texte de la requête de l'utilisateur
        const encodedText = encodeURIComponent(text);  // S'assurer que le texte est encodé correctement

        const url = `https://api.dreaded.site/api/chatgpt?text=${encodedText}`;

        console.log('Requesting URL:', url);  // Afficher l'URL pour vérifier

        // Appel à l'API avec headers personnalisés (ajoute des headers si nécessaire)
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',  // Ajouter un User-Agent pour simuler une requête valide
                'Accept': 'application/json',  // Spécifier que l'on attend une réponse JSON
            }
        });

        // Déboguer et afficher la réponse complète
        console.log('Full API Response:', response.data);

        // Vérification de la structure de la réponse
        if (!response || !response.data || !response.data.result) {
            return reply("❌ No response received from the API. Please try again later.");
        }

        // Extraire uniquement le texte de la réponse (le prompt)
        const gptResponse = response.data.result.prompt;

        if (!gptResponse) {
            return reply("❌ The API returned an unexpected format. Please try again later.");
        }

        // Image AI à envoyer
        const ALIVE_IMG = 'https://url.bwmxmd.online/Adams.zjrmnw18.jpeg'; // Remplacez par l'URL de votre image AI

        // Légende avec des informations formatées
        const formattedInfo = `Response:*\n\n${gptResponse}`;

        // Envoyer le message avec image et légende
        await malvin.sendMessage(from, {
            image: { url: ALIVE_IMG }, // Assurez-vous que l'URL est valide
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363299029326322@newsletter',
                    newsletterName: '*𝖒𝖆𝖗𝖎𝖘𝖊𝖑*',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in GPT command:", error);

        // Affichage du message d'erreur dans la console pour plus de détails
        if (error.response) {
            console.log("Error Response Data:", error.response.data);
        } else {
            console.log("Error Details:", error.message);
        }

        // Répondre avec des détails de l'erreur
        const errorMessage = `
❌ An error occurred while processing the GPT command.
🛠 *Error Details*:
${error.message}

Please report this issue or try again later.
        `.trim();
        return reply(errorMessage);
    }
});
malvin({
    pattern: "llama3",
    desc: "Get a response from Llama3 AI using the provided prompt.",
    category: "ai",
    react: "🤖",
    filename: __filename,
    use: ".llama3 <your prompt>"
}, async (malvin, mek, m, { from, q, reply }) => {
    try {
        // Check if a prompt is provided by the user
        if (!q) return reply("⚠️ Please provide a prompt for Llama3 AI.");

        // Inform the user that the request is being processed
        await reply("> *Processing your prompt...*");

        // API URL with encoded user prompt
        const apiUrl = `https://api.davidcyriltech.my.id/ai/llama3?text=${encodeURIComponent(q)}`;

        // Send a GET request to the API
        const response = await axios.get(apiUrl);
        console.log("Llama3 API Response:", response.data);

        // Extract AI response
        let llamaResponse;
        if (typeof response.data === "string") {
            llamaResponse = response.data.trim();
        } else if (typeof response.data === "object") {
            llamaResponse = response.data.response || response.data.result || JSON.stringify(response.data);
        } else {
            llamaResponse = "Unable to process the AI response.";
        }

        // AI image to attach
        const AI_IMG = 'https://url.bwmxmd.online/Adams.zjrmnw18.jpeg'; // Replace with a valid image URL

        // Formatted response text
        const formattedInfo = `🤖 *Llama3 Response:*\n\n${llamaResponse}`;

        // Send the response with an image
        await malvin.sendMessage(from, {
            image: { url: ALIVE_IMG }, // Ensure the URL is valid
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363299029326322@newsletter',
                    newsletterName: '𝖒𝖆𝖗𝖎𝖘𝖊𝖑',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in llama3 command:", error);
        return reply(`❌ An error occurred: ${error.message}`);
    }
});
