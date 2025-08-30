import { interpretUserIntent } from '../lib/ai-processor';
import { generateUIComponents } from '../lib/ui-generator';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, currentComponents = [], creatorStats = {} } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // Parse user intent
        const intent = await interpretUserIntent(message);

        // Generate appropriate UI components
        const uiComponents = await generateUIComponents({
            intent,
            currentComponents,
            creatorStats,
            userMessage: message,
        });

        const reply = generateContextualReply(intent, uiComponents);

        res.json({ reply, uiUpdates: uiComponents });
    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({
            error: 'Failed to process request',
            reply: 'Sorry, I encountered an error processing your request. Please try again.',
        });
    }
}

function generateContextualReply(intent, components) {
    const componentCount = components.length;

    if (componentCount === 0) {
        return "I couldn't generate any components for that request. Could you try being more specific?";
    }

    const replies = {
        chart: `I've created ${componentCount} chart${componentCount > 1 ? 's' : ''} showing your ${intent.metrics?.join(' and ') || 'statistics'}.`,
        metric: `Here ${componentCount === 1 ? 'is' : 'are'} your ${intent.metrics?.join(' and ') || 'key metrics'}.`,
        table: `I've generated a table with your ${intent.metrics?.join(' and ') || 'data'}.`,
        comparison: `Here's a comparison of your ${intent.metrics?.join(' vs ') || 'metrics'}.`,
    };

    return (
        replies[intent.type] ||
        `I've added ${componentCount} new component${componentCount > 1 ? 's' : ''} to your dashboard.`
    );
}
