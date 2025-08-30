import * as chrono from 'chrono-node';

export default function parseUserinput(message) {
    const results = [];
    const parsedResults = chrono.parse(message);

    parsedResults.forEach(result => {
        results.push({
            text: result.text,
            parsed_date: result.start.date().toISOString().replace('T', ' ').slice(0, 19)
        });
    });

    return results;
}
