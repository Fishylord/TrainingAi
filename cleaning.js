import * as fs from "fs";

// Read the JSON file
fs.readFile('C:\\Users\\User\\Documents\\Coding\\Art\\TrainingAi\\word_data\\Test.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);
    
    let Details = '';  // Declare the Details variable
    
    // Format the data according to the desired output
    const formattedData = jsonData.data.map((item, index) => {
        const line = `# Data ID: ${index + 1} customer: ${item.customername} URL: ${item.ref_url}`;
        
        Details += line + '\n';  // Append each line to Details
    });

    // Print the formatted data

    // Print the Details
    console.log('Details:\n', Details); 
});