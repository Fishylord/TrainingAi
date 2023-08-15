import * as fs from "fs";

// Read the JSON file
fs.readFile('C:\\Users\\User\\Documents\\Coding\\Art\\TrainingAi\\word_data\\Test.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);
    
    // Format the data according to the desired output
    const formattedData = jsonData.data.map((item, index) => {
        return `# Data ID: ${index} customer: ${item.customername}`;
    });

    // Print the formatted data
    formattedData.forEach(line => {
        console.log(line);
    });
});