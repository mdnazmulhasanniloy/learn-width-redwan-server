// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// Function to create the folder and files
function createFolderAndFiles(parentFolderPath, folderName) {
  const folderPath = path.join(parentFolderPath, folderName);
  fs.mkdirSync(folderPath);

  const files = [
    `${folderName}.constants.ts`,
    `${folderName}.controller.ts`,
    `${folderName}.interface.ts`,
    `${folderName}.models.ts`,
    `${folderName}.route.ts`,
    `${folderName}.service.ts`,
    `${folderName}.utils.ts`,
    `${folderName}.validation.ts`,
  ];

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    fs.writeFileSync(filePath, '', 'utf8');
  });

  console.log(`Folder "${folderName}" and files created successfully.`);
}

// Prompting the user for the parent folder path and folder name
// eslint-disable-next-line @typescript-eslint/no-var-requires
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Enter parent folder path: ', parentFolderPath => {
  readline.question('Enter folder name: ', folderName => {
    createFolderAndFiles(parentFolderPath, folderName);
    readline.close();
  });
});
