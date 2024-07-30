// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'autofillData') {
//         autofillData(message.data);
//     }
// });

// function autofillData(data) {
//     console.log('Received data:', data);

//     // Assuming the data is in JSON format
//     const parsedData = JSON.parse(data);

//     const fields = [
//         { id: 'patientId', value: parsedData.patientId },
//         { id: 'name', value: parsedData.name },
//         { id: 'species', value: parsedData.species },
//         { id: 'breed', value: parsedData.breed },
//         { id: 'ageyears', value: parsedData.ageyears },
//         { id: 'agemonths', value: parsedData.agemonths },
//         { id: 'gender', value: parsedData.gender },
//         { id: 'color', value: parsedData.color },
//         { id: 'microchipId', value: parsedData.microchipId },
//         { id: 'ownerName', value: parsedData.ownerName },
//         { id: 'contactNumber', value: parsedData.contactNumber },
//         { id: 'address', value: parsedData.address },
//         { id: 'email', value: parsedData.email },
//         { id: 'condition', value: parsedData.condition },
//         { id: 'dateDiagnosed', value: parsedData.dateDiagnosed },
//         { id: 'treatment', value: parsedData.treatment },
//         { id: 'outcome', value: parsedData.outcome }
//     ];

//     fields.forEach(field => {
//         const element = document.getElementById(field.id);
//         if (element) {
//             element.value = field.value || '';
//             console.log(`${field.id} field found and filled with value: ${field.value}`);
//         } else {
//             console.error(`${field.id} field NOT found in the DOM.`);
//         }
//     });
// }




console.log('Content script loaded');


// if (autofillBtn) {
//     console.log('Autofill button found');
//     autofillBtn.addEventListener("click", () => {
//         // Get the current active tab
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//             const activeTab = tabs[0];
//             // Inject and execute the content script in the active tab
//             chrome.scripting.executeScript(
//                 {
//                     target: { tabId: activeTab.id },
//                     function: autofillData,  // Directly inject and execute this function
//                 },
//                 () => {
//                     if (chrome.runtime.lastError) {
//                         console.error('Error executing content script:', chrome.runtime.lastError.message);
//                     } else {
//                         console.log('Content script executed successfully TEST.');
//                     }
//                 }
//             );
//         });
//     });
// } else {
//     console.error("Autofill button not found in the DOM");
// }

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'autofillData') {
        console.log("SENT");
        autofillData(message.data);
    }
});


function autofillData(data) {
    console.log('Received data:', data);

    // Assuming the data is in JSON format
    const parsedData = JSON.parse(data);

    const fields = [
        // { id: 'username', value: parsedData.username },
        // { id: 'password', value: parsedData.password },
        // { id: 'email', value: parsedData.email },
        // { id: 'address', value: parsedData.address },
        // { id: 'phone', value: parsedData.phone }

        { id: 'patientId', value: parsedData.patientId },
        { id: 'name', value: parsedData.name },
        { id: 'age', value: parsedData.age },
        { id: 'species', value: parsedData.species },
        { id: 'breed', value: parsedData.breed },
        { id: 'gender', value: parsedData.gender },
        { id: 'color', value: parsedData.color },
        { id: 'microchipId', value: parsedData.microchipId },
        { id: 'intakeType', value: parsedData.intakeType },
        { id: 'location', value: parsedData.location },
        { id: 'ownerName', value: parsedData.ownerName },
        { id: 'contactNumber', value: parsedData.contactNumber },
        { id: 'address', value: parsedData.address },
        { id: 'email', value: parsedData.email },
        { id: 'weight', value: parsedData.weight },
        { id: 'updatedAge', value: parsedData.updatedAge },
        { id: 'bodyScore', value: parsedData.bodyScore },
        { id: 'dental', value: parsedData.dental },
        { id: 'condition', value: parsedData.condition },
        { id: 'dateDiagnosed', value: parsedData.dateDiagnosed },
        { id: 'treatment', value: parsedData.treatment },
        { id: 'outcome', value: parsedData.outcome },
        { id: 'notes', value: parsedData.notes }
        
       // { id: 'outcome', value: parsedData.outcome } new for vaccine

    ];

    fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            element.value = field.value || '';
            console.log(`${field.id} field found and filled with value: ${field.value}`);
        } else {
            console.error(`${field.id} field NOT found in the DOM.`);
        }
    });
}
  
   
