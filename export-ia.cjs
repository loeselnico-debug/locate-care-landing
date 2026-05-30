const fs = require('fs');
const path = require('path');

// Configuration
const OUTPUT_FILE = 'contexte-ia.txt';
const DIRECTORIES_TO_SCAN = ['src'];
const SPECIFIC_FILES = ['tailwind.config.js', 'tailwind.config.ts'];
const EXTENSIONS_TO_INCLUDE = ['.ts', '.tsx', '.css'];

const outputFilePath = path.join(__dirname, OUTPUT_FILE);
let outputContent = `> 📅 Archive générée le : ${new Date().toLocaleString()}\n\n`;

// Fonction pour ajouter le contenu d'un fichier avec formatage
function appendFileContent(filePath) {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(__dirname, filePath);
        const ext = path.extname(filePath).replace('.', '');
        
        outputContent += `// ==========================================\n`;
        outputContent += `// 📂 FICHIER : \\${relativePath}\n`;
        outputContent += `// ==========================================\n\n`;
        outputContent += `\`\`\`${ext}\n`;
        outputContent += content;
        outputContent += `\n\`\`\`\n\n`;
    }
}

// Fonction récursive pour scanner les dossiers
function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            scanDirectory(fullPath);
        } else {
            const ext = path.extname(file);
            if (EXTENSIONS_TO_INCLUDE.includes(ext)) {
                appendFileContent(fullPath);
            }
        }
    }
}

// 1. Scanner le dossier src
DIRECTORIES_TO_SCAN.forEach(dir => {
    scanDirectory(path.join(__dirname, dir));
});

// 2. Ajouter les fichiers de configuration spécifiques à la racine
SPECIFIC_FILES.forEach(file => {
    appendFileContent(path.join(__dirname, file));
});

// 3. Générer le fichier de sortie
try {
    fs.writeFileSync(outputFilePath, outputContent);
    console.log(`\n✅ Succès : Le contexte IA a été exporté dans le fichier "${OUTPUT_FILE}"`);
    console.log(`📂 Poids du fichier : ${(fs.statSync(outputFilePath).size / 1024).toFixed(2)} KB\n`);
} catch (error) {
    console.error("❌ Erreur lors de la création du fichier d'export :", error);
}