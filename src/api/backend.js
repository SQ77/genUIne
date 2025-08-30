import * as chrono from 'chrono-node';

export default function parseUserinput(message) {
    const time_metric = detectTimestamp(message);
    const metrics = detectMetrics(message);

    return {
        timestamps: time_metric,
        metrics: metrics
    };
};

function detectTimestamp(message) {
    const parsedResults = chrono.parse(message);
    const classifications = [];
    const current_date = new Date();

    parsedResults.forEach(result => {
        const date = result.start.date();
        const diffDays = (current_date - date) / (1000 * 60 * 60 * 24); 

        const label = diffDays > 60 ? "months" : "days";
        classifications.push({ text: result.text, label });
    });

    return classifications;
}

function detectMetrics(message) {
    const METRICS = [
        "post views",
        "profile views",
        "likes",
        "comments",
        "shares",
        "unique viewers"
    ];

    const results = [];
    const lowerMessage = message.toLowerCase();

    // Helper function to calculate Levenshtein distance
    function levenshteinDistance(str1, str2) {
        const matrix = [];
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[str2.length][str1.length];
    }

    // Helper function to check similarity
    function isSimilar(str1, str2, threshold = 0.7) {
        if (str1.length < 3 || str2.length < 3) return str1 === str2;
        const distance = levenshteinDistance(str1, str2);
        const maxLength = Math.max(str1.length, str2.length);
        const similarity = 1 - (distance / maxLength);
        return similarity >= threshold;
    }

    for (const metric of METRICS) {
        // Check if the entire metric phrase is similar to any part of the message
        if (isSimilar(metric, lowerMessage) || lowerMessage.includes(metric)) {
            results.push({ text: metric, label: "METRIC" });
        } else {
            // For phrases like "post views", check if we can find similar substrings
            const words = lowerMessage.split(/\s+/);
            for (let i = 0; i < words.length; i++) {
                for (let j = i + 1; j <= words.length; j++) {
                    const phrase = words.slice(i, j).join(' ');
                    if (isSimilar(metric, phrase)) {
                        results.push({ text: metric, label: "METRIC" });
                        break;
                    }
                }
                if (results.some(r => r.text === metric)) break;
            }
        }
    }

    return results;
}
