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

    for (const metric of METRICS) {
        if (lowerMessage.includes(metric)) {
            results.push({ text: metric, label: "METRIC" });
        }
    }

    return results;
}
