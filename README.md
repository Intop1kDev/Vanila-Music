# 🎵 Yandex Music App для Linux`а

<div align="center">
<img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Electron-28.2.3-47848F?logo=electron&logoColor=white" alt="Electron">
<img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white" alt="Node.js">
</div>

## 📝 Описание проекта

Однажды, я сидел на Linux дистрибутиве, и мне стало скучно, я хотел послушать музыку, но к сожалению яндекс ещё не сделал приложения для Linux-дистрибутивов, ну чтож, я взял всё в свои руки 

## ✨ Как это работает

Суть работы здесь очень простая, мы создаём окно через Node.JS (Electron) с иконкой и тайтлом, и делаем открытие ссылки официального сайта яндекс музыки **https://music.yandex.ru/** (Кстати, у них десктопное приложение для Windows работает по такой же логике)

## ⚙️ Требования

- Node.JS
- Npm

## 🛠️ Как собрать? (Для использования через терминал)

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Запустите приложение:
   ```bash
   npm start
   ```

## 🛠️ Как собрать? (Для использования через .AppImage)

1. Установите зависимости (если не сделали этого ранее):
   ```bash
   npm install
   ```
2. Соберите AppImage:
   ```bash
   npm run dist
   ```
   Готовый файл будет в папке `dist/`.

<div align="center"> <sub>Проект находится под MIT License</div>
