const fs = require('fs'); // модуль для работы с файловой системой
const path = require('path'); // модуль для преобразования пути
const minimist = require('./minimist'); // модуль для преобразования строки аргументов в объект
const functionalComponent = require('./functional');
const classComponent = require('./classComponent');
const storiesComponent = require('./storiesComponent');

const args = minimist(process.argv);


const srcPath = [__dirname, '..']; // путь до папки src текущего проекта
const srcStoryPath = [__dirname, '..', 'stories']; // путь до папки src текущего проекта
const arrPath = args.path.replace(/^\/?/g, '').split('/'); // разбиваем путь из аргумента командной строки на массив
const componentName = arrPath[arrPath.length - 1]; // последний элемент - название компонента
const isFunctional = true ?? args.function;
const isModule = true ?? args.module;

// создание директорий из аргумента (при необходимости)
const currentArray = [];

arrPath.forEach(element => {
  currentArray.push(element);
  const currentResolvePath = path.resolve(...srcPath, ...currentArray);
  if (!fs.existsSync(currentResolvePath)) { // проверка - существует такая директория или нет?
    fs.mkdirSync(currentResolvePath); // если нет, то создаем новую
  }

  const currentResolvePathStory = path.resolve(...srcStoryPath, ...currentArray);
  if (!fs.existsSync(currentResolvePathStory)) { // проверка - существует такая директория или нет?
    fs.mkdirSync(currentResolvePathStory); // если нет, то создаем новую
  }
});

const componentPath = [...srcPath, ...arrPath];
const componentPathStory = [...srcStoryPath, ...arrPath];
// создание компонента
let componentCode = '';

const importStyle = `import ${isModule ? 'styles from ' : ''}'./${componentName}${isModule ? '.module' : ''}.scss';`;
const className = `${isModule ? '{styles.' + componentName + '}' : '"' + componentName + '"'}`;

if (isFunctional) {
  componentCode = functionalComponent({
    importStyle: importStyle,
    className: className,
    componentName: componentName
  });
} else {
  componentCode = classComponent({
    importStyle: importStyle,
    className: className,
    componentName: componentName,
    redux: args.redux
  });
}

const storyComponents = storiesComponent({
  path: arrPath,
  componentName: componentName,

})

fs.writeFileSync(path.resolve(...componentPath, `${componentName}.js`), componentCode);
fs.writeFileSync(path.resolve(...componentPathStory, `${componentName}.stories.js`), storyComponents);
// создание файла стилей
const styleCode = `@import '@/styles/global/mixins';

.${componentName} {

}`;

fs.writeFileSync(path.resolve(...componentPath, `${componentName}${isModule ? '.module' : ''}.scss`), styleCode);
