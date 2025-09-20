// Функция для создания перетаскиваемой панели
function createDraggablePanel() {
    // Создаем стили
    const style = document.createElement('style');
    style.textContent = `
        .electron-drag-panel {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 40px;
            background: transparent;
            z-index: 99999;
            -webkit-app-region: drag;
        }
        
        .electron-window-controls {
            position: fixed;
            top: 0;
            right: 0;
            height: 40px;
            display: flex;
            z-index: 100000;
            -webkit-app-region: no-drag;
        }
        
        .electron-control-btn {
            width: 46px;
            height: 32px;
            border: none;
            background: transparent;
            color: #333;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 4px 2px;
            border-radius: 4px;
        }
        
        .electron-control-btn:hover {
            background: rgba(0, 0, 0, 0.1);
        }
        
        .electron-close-btn:hover {
            background: #e81123 !important;
            color: white !important;
        }
        
        /* Адаптация для темной темы */
        @media (prefers-color-scheme: dark) {
            .electron-control-btn {
                color: #fff;
            }
            
            .electron-control-btn:hover {
                background: rgba(255, 255, 255, 0.1);
            }
        }
    `;
    
    // Создаем панель для перетаскивания
    const dragPanel = document.createElement('div');
    dragPanel.className = 'electron-drag-panel';
    
    // Создаем кнопки управления
    const controls = document.createElement('div');
    controls.className = 'electron-window-controls';
    controls.innerHTML = `
        <button class="electron-control-btn" id="electron-minimize">─</button>
        <button class="electron-control-btn" id="electron-maximize">□</button>
        <button class="electron-control-btn electron-close-btn" id="electron-close">×</button>
    `;
    
    // Добавляем элементы в документ
    document.head.appendChild(style);
    document.body.appendChild(dragPanel);
    document.body.appendChild(controls);
    
    // Добавляем обработчики событий
    document.getElementById('electron-minimize').addEventListener('click', () => {
        if (window.electronAPI) {
            window.electronAPI.minimizeWindow();
        }
    });
    
    document.getElementById('electron-maximize').addEventListener('click', () => {
        if (window.electronAPI) {
            window.electronAPI.maximizeWindow();
        }
    });
    
    document.getElementById('electron-close').addEventListener('click', () => {
        if (window.electronAPI) {
            window.electronAPI.closeWindow();
        }
    });
}

// Функция для проверки и инжектирования
function injectDraggablePanel() {
    // Проверяем, не добавлены ли уже наши элементы
    if (!document.querySelector('.electron-drag-panel')) {
        createDraggablePanel();
    }
}

// Пытаемся инжектить сразу
try {
    injectDraggablePanel();
} catch (error) {
    console.log('Initial injection failed, waiting for DOM...');
}

// Также пытаемся инжектить при полной загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectDraggablePanel);
} else {
    setTimeout(injectDraggablePanel, 1000);
}

// Дополнительная попытка через секунду на случай динамической загрузки
setTimeout(injectDraggablePanel, 1000);
setTimeout(injectDraggablePanel, 3000);