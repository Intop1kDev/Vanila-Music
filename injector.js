const { readFileSync } = require('fs');
const { join } = require('path');

// Функция для инжектирования скрипта
function injectScript(webContents) {
    const scriptPath = join(__dirname, 'inject.js');
    const scriptContent = readFileSync(scriptPath, 'utf8');
    
    webContents.on('did-finish-load', () => {
        try {
            webContents.executeJavaScript(`
                try {
                    ${scriptContent}
                } catch (error) {
                    console.error('Injection error:', error);
                }
            `).catch(err => console.log('Execution error:', err));
        } catch (error) {
            console.log('Injection failed:', error);
        }
    });
    
    // Повторная попытка инжектирования при навигации
    webContents.on('did-navigate', () => {
        setTimeout(() => {
            try {
                webContents.executeJavaScript(`
                    try {
                        ${scriptContent}
                    } catch (error) {
                        console.error('Navigation injection error:', error);
                    }
                `).catch(err => console.log('Navigation execution error:', err));
            } catch (error) {
                console.log('Navigation injection failed:', error);
            }
        }, 1000);
    });
}

module.exports = { injectScript };
