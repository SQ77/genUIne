import fs from 'fs';

const METRIC_CONFIG = {
  "post-views":     { min: 80, max: 800 },
  "profile-views":  { min: 50, max: 500 },
  "unique-viewers": { min: 70, max: 300 },
  "likes":          { min: 40, max: 200 },
  "comments":       { min: 4,  max: 40 },
  "shares":         { min: 2,  max: 20 },
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sumTail(arr, n) {
  return arr.slice(-n).reduce((a, b) => a + b, 0);
}

function generateMetricData(dayMin, dayMax) {
  // 100 daily values
  const days = Array.from({ length: 100 }, () => randomInt(dayMin, dayMax));
  
  // Monthly values are scaled from daily values
  const monthMin = dayMin * 25;
  const monthMax = dayMax * 35;

  // 99 random months, last month = sum of last 30 days
  const months = Array.from({ length: 99 }, () => randomInt(monthMin, monthMax));
  months.push(sumTail(days, 30));

  return {
    days: days,
    months: months,
  };
}

const METRICS = [
  "post-views",
  "profile-views",
  "likes",
  "comments",
  "shares",
  "unique-viewers"
];

const metricData = {};
METRICS.forEach(metric => {
  const config = METRIC_CONFIG[metric];
  metricData[metric] = generateMetricData(config.min, config.max);
});

fs.writeFileSync('metric_data.json', JSON.stringify(metricData, null, 2), 'utf8');
console.log('Wrote metric_data.json!');

// Optionally, print check for one metric
const metric = "post-views";
console.log('Last month value (should be sum of last 30 days):', metricData[metric].months[99]);
console.log('Sum of last 30 days:', metricData[metric].days.slice(-30).reduce((a, b) => a + b, 0));