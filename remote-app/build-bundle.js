const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist', 'remote-app', 'browser');
const outputPath = path.join(__dirname, 'dist', 'remote-widget.js');
const hostAssetsPath = path.join(__dirname, '..', 'host-app', 'public', 'remote-widget.js');

// Função para ler e concatenar arquivos
function concatenateFiles() {
  let concatenated = '';
  
  try {
    const files = fs.readdirSync(distPath);
    const jsFiles = files.filter(file => file.endsWith('.js') && !file.includes('polyfills'));
    
    console.log('Arquivos JS encontrados:', jsFiles);
    
    jsFiles.forEach(file => {
      const filePath = path.join(distPath, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Converter export statements para funcionar como script
      content = content.replace(/export\s*\{[^}]*\}\s*;?/g, '');
      content = content.replace(/export\s+default\s+/g, '');
      content = content.replace(/export\s+/g, '');
      content = content.replace(/import\s+.*?from\s+['"][^'"]*['"];?/g, '');
      
      concatenated += content + '\n';
    });
    
    // Wrapping em IIFE mais robusto para evitar conflitos globais
    const wrappedContent = `(function(window) {
  'use strict';
  ${concatenated}
})(typeof window !== 'undefined' ? window : this);`;
    
    // Escrever o arquivo concatenado
    fs.writeFileSync(outputPath, wrappedContent);
    console.log('Bundle criado em:', outputPath);
    
    // Copiar para a pasta public do host
    fs.copyFileSync(outputPath, hostAssetsPath);
    console.log('Bundle copiado para o host em:', hostAssetsPath);
    
  } catch (error) {
    console.error('Erro ao concatenar arquivos:', error);
  }
}

concatenateFiles();