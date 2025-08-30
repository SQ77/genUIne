import fs from 'fs';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sumTail(arr, n) {
  return arr.slice(-n).reduce((a, b) => a + b, 0);
}

function generateMetricData() {
  // 100 daily values
  const days = Array.from({ length: 100 }, () => randomInt(4, 40));
  // 99 random months, last month = sum of last 30 days
  const months = Array.from({ length: 99 }, () => randomInt(120, 900));
  months.push(sumTail(days, 30));

  return {
    last_100_days: days,
    last_100_months: months,
  };
}

const METRICS = [
  "post views",
  "profile views",
  "likes",
  "comments",
  "shares",
  "unique viewers"
];

const metricData = {};
METRICS.forEach(metric => {
  metricData[metric] = generateMetricData();
});

fs.writeFileSync('metric_data.json', JSON.stringify(metricData, null, 2), 'utf8');
console.log('Wrote metric_data.json!');

// Optionally, print check for one metric
const metric = "post views";
console.log('Last month value (should be sum of last 30 days):', metricData[metric].last_100_months[99]);
console.log('Sum of last 30 days:', metricData[metric].last_100_days.slice(-30).reduce((a, b) => a + b, 0));