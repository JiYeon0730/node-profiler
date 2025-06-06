// models/parser.js
const fs = require('fs');
const path = require('path');

function parseProfilerData(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const blocks = content.trim().split('\n\n');

    const results = {
        cores: {},
        tasks: {},
    };

    blocks.forEach(block => {
        const lines = block.trim().split('\n');
        const taskLabels = lines[0].trim().split(/\s+/).slice(1);

        lines.slice(1).forEach(line => {
            const [coreLabel, ...values] = line.trim().split(/\s+/);
            const numericValues = values.map(Number);

            if (!results.cores[coreLabel]) results.cores[coreLabel] = [];
            results.cores[coreLabel].push(numericValues);

            taskLabels.forEach((task, idx) => {
                if (!results.tasks[task]) results.tasks[task] = [];
                results.tasks[task].push(numericValues[idx]);
            });
        });
    });

    const stats = { coreStats: {}, taskStats: {} };

    for (let [core, data] of Object.entries(results.cores)) {
        const flat = data.flat();
        stats.coreStats[core] = {
            min: Math.min(...flat),
            max: Math.max(...flat),
            avg: +(flat.reduce((a, b) => a + b, 0) / flat.length).toFixed(2),
        };
    }

    for (let [task, values] of Object.entries(results.tasks)) {
        stats.taskStats[task] = {
            min: Math.min(...values),
            max: Math.max(...values),
            avg: +(values.reduce((a, b) => a + b, 0) / values.length).toFixed(2),
        };
    }

    return stats;
}

module.exports = { parseProfilerData };
