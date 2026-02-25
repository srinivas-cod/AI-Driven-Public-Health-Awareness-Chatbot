const fs = require('fs');
const path = require('path');
const readline = require('readline');

// File paths
const datasetPath = path.join(__dirname, 'archive', 'Final_Augmented_dataset_Diseases_and_Symptoms.csv');
const modelOutputPath = path.join(__dirname, 'medical_model.json');

const processDataset = async () => {
    console.log("Processing dataset to build inference model...");

    const fileStream = fs.createReadStream(datasetPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let headers = [];
    const diseaseData = {};
    let lineCount = 0;
    const MAX_ROWS = 30000; // Process 30k rows for a robust model

    for await (const line of rl) {
        if (lineCount === 0) {
            headers = line.split(',');
            lineCount++;
            continue;
        }

        if (lineCount > MAX_ROWS) break;

        const values = line.split(',');
        const disease = values[0].trim();

        if (!diseaseData[disease]) {
            diseaseData[disease] = {
                count: 0,
                symptoms: {}
            };
        }

        diseaseData[disease].count++;

        // Start from index 1 (skip disease name)
        for (let i = 1; i < values.length; i++) {
            if (values[i] === '1') {
                const symptom = headers[i].trim();
                diseaseData[disease].symptoms[symptom] = (diseaseData[disease].symptoms[symptom] || 0) + 1;
            }
        }

        lineCount++;
        if (lineCount % 5000 === 0) console.log(`Processed ${lineCount} rows...`);
    }

    // Convert raw counts to probabilities/weights
    const model = {
        diseases: {},
        allSymptoms: []
    };

    const symptomSet = new Set();

    for (const [disease, data] of Object.entries(diseaseData)) {
        model.diseases[disease] = {
            occurrence: data.count,
            symptoms: {}
        };

        for (const [symptom, count] of Object.entries(data.symptoms)) {
            // Weight = (this symptom appearance in this disease) / (total disease rows)
            // This gives us the probability P(S|D)
            const weight = (count / data.count).toFixed(4);
            if (weight > 0.05) { // Filter out negligible links
                model.diseases[disease].symptoms[symptom] = parseFloat(weight);
                symptomSet.add(symptom);
            }
        }
    }

    model.allSymptoms = Array.from(symptomSet).sort();

    fs.writeFileSync(modelOutputPath, JSON.stringify(model, null, 2));
    console.log(`Model generated successfully with ${Object.keys(model.diseases).length} diseases!`);
};

processDataset().catch(console.error);
