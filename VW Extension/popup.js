


document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const autofillBtn = document.getElementById("autofillBtn");

    let selectedFile = null;

    if (fileInput) {
        console.log('File input found');
        fileInput.addEventListener('change', handleFileSelect);
    } else {
        console.error('File input not found');
    }

    if (autofillBtn) {
        console.log('Autofill button found');
        autofillBtn.addEventListener("click", sendAutofillMessage);
    } else {
        console.error("Autofill button not found in the DOM");
    }

    function handleFileSelect(event) {
        selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log('File selected:', selectedFile.name);
        } else {
            console.error('No file selected');
        }
    }

    function sendAutofillMessage() {
        console.log('Autofill message initiated');

        if (!selectedFile) {
            console.error('No image file selected for autofill');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        fetch('http://97.70.236.220:8082/run-script', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            console.log('Received response:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Network response was ok');
            return response.json();
        })
        .then(data => {
            console.log('Response from Flask server:', data);
            if (data.error) {
                console.error('Error from Flask server:', data.error);
            } else {
                sendResponseToContentScript(data.output);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // function sendResponseToContentScript(response) {
    //     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    //         const activeTab = tabs[0];
    //         chrome.tabs.sendMessage(activeTab.id, { action: 'autofillData', data: response }, (response) => {
    //             if (chrome.runtime.lastError) {
    //                 console.error('Error:', chrome.runtime.lastError.message);
    //             } else {
    //                 console.log('Message sent to content script.');
    //             }
    //         });
    //     });
    // }
    

    function sendResponseToContentScript(response) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeTab = tabs[0];
            chrome.scripting.executeScript(
                {
                    target: { tabId: activeTab.id },
                    function: autofillData,
                    args: [response]
                },
                () => {
                    if (chrome.runtime.lastError) {
                        console.error('Error:', chrome.runtime.lastError.message);
                    } else {
                        console.log('Content script executed successfully TEST.');
                    }
                }
            );
        });
    }

    function autofillData(data) {
        console.log('Received data:', data);

        const fieldMap = {
            // 'Username': 'username',
            // 'Password': 'password',
            // 'Email': 'email',
            // 'Address': 'address',
            // 'Phone': 'phone'

            'Patient Id': 'patientId',
            'Name': 'name',
            'Age': 'age',
            'Species': 'species',
            'Breed': 'breed',
            'Gender': 'gender',
            'Color/Markings': 'color',
            'Microchip ID': 'microchipId',
            'Intake Type': 'intakeType',
            'Location': 'location',
            'Owner Name': 'ownerName',
            'Contact Number': 'contactNumber',
            'Address': 'address',
            'Email': 'email',
            'Weight': 'weight',
            'Updated Age': 'updatedAge',
            'Body Score': 'bodyScore',
            'Dental': 'dental',
            'Condition': 'condition',
            'Date Diagnosed': 'dateDiagnosed',
            'Treatment Provided': 'treatment',
            'Outcome/Current Status': 'outcome',
            'Treatments - Notes': 'notes'

        };

        const lines = data.split('\n');
        console.log('Split data:', lines);

        const fields = {};

        for (const key in fieldMap) {
            const regex = new RegExp(`.*${key}:\\s*(.*).*`, 'i');  // Case insensitive match, allowing any characters before and after the key
            const match = data.match(regex);
            if (match) {
                fields[fieldMap[key]] = match[1].trim();
            }
        }

        console.log('Extracted fields:', fields);

        for (const id in fields) {
            const element = document.getElementById(id);
            if (element) {
                element.value = fields[id];
                console.log(`${id} field found and filled with value: ${fields[id]}`);
            } else {
                console.error(`${id} field NOT found in the DOM.`);
            }
        }
    }
});


//DROP DOWN MENU EXAMPLE

// document.addEventListener('DOMContentLoaded', function() {
//     const fileInput = document.getElementById('fileInput');
//     const autofillBtn = document.getElementById("autofillBtn");

//     let selectedFile = null;

//     if (fileInput) {
//         console.log('File input found');
//         fileInput.addEventListener('change', handleFileSelect);
//     } else {
//         console.error('File input not found');
//     }

//     if (autofillBtn) {
//         console.log('Autofill button found');
//         autofillBtn.addEventListener("click", sendAutofillMessage);
//     } else {
//         console.error("Autofill button not found in the DOM");
//     }

//     function handleFileSelect(event) {
//         selectedFile = event.target.files[0];
//         if (selectedFile) {
//             console.log('File selected:', selectedFile.name);
//         } else {
//             console.error('No file selected');
//         }
//     }

//     function sendAutofillMessage() {
//         console.log('Autofill message initiated');

//         if (!selectedFile) {
//             console.error('No image file selected for autofill');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', selectedFile);

//         fetch('http://localhost:8081/run-script', { // Update the port if necessary
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'Accept': 'application/json'
//             }
//         })
//         .then(response => {
//             console.log('Received response:', response);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             console.log('Network response was ok');
//             return response.json();
//         })
//         .then(data => {
//             console.log('Response from Flask server:', data);
//             if (data.error) {
//                 console.error('Error from Flask server:', data.error);
//             } else {
//                 sendResponseToContentScript(data.output);
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     }

//     function sendResponseToContentScript(response) {
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//             const activeTab = tabs[0];
//             chrome.scripting.executeScript(
//                 {
//                     target: { tabId: activeTab.id },
//                     function: autofillData,
//                     args: [response]
//                 },
//                 () => {
//                     if (chrome.runtime.lastError) {
//                         console.error('Error:', chrome.runtime.lastError.message);
//                     } else {
//                         console.log('Content script executed successfully.');
//                     }
//                 }
//             );
//         });
//     }

//     function autofillData(data) {
//         console.log('Received data:', data);

//         const fieldMap = {
//             'Username': 'username',
//             'Password': 'password',
//             'Email': 'email',
//             'Address': 'address',
//             'Phone': 'phone'
//         };

//         const lines = data.split('\n');
//         console.log('Split data:', lines);

//         const fields = {};

//         lines.forEach(line => {
//             for (const key in fieldMap) {
//                 if (line.startsWith(key)) {
//                     fields[fieldMap[key]] = line.split(':')[1].trim();
//                 }
//             }
//         });

//         console.log('Extracted fields:', fields);

//         for (const id in fields) {
//             const element = document.getElementById(id);
//             if (element) {
//                 if (element.tagName === 'SELECT') {
//                     // Autofill the dropdown
//                     const options = element.options;
//                     for (let i = 0; i < options.length; i++) {
//                         if (options[i].text === fields[id]) {
//                             element.selectedIndex = i;
//                             console.log(`${id} dropdown found and selected option: ${fields[id]}`);
//                             break;
//                         }
//                     }
//                 } else {
//                     // Autofill the text input
//                     element.value = fields[id];
//                     console.log(`${id} field found and filled with value: ${fields[id]}`);
//                 }
//             } else {
//                 console.error(`${id} field NOT found in the DOM.`);
//             }
//         }
//     }
// });
