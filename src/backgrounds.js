import dark1 from './assets/images/backgroundImages/darkTheme/dark1.jpg';
import dark2 from './assets/images/backgroundImages/darkTheme/dark1.jpg';
import dark3 from './assets/images/backgroundImages/darkTheme/dark1.jpg';
import light1 from './assets/images/backgroundImages/lightTheme/light1.jpg';
import light2 from './assets/images/backgroundImages/lightTheme/light2.jpg';
import light3 from './assets/images/backgroundImages/lightTheme/light3.jpg';

const backgroundsArray = [
    { name: 'lightMode',
        content: [
            { id: 1, content: light1 },
            { id: 2, content: light2 },
            { id: 3, content: light3 },
        ]
      },
    { name: 'darkMode',
      content: [
        { id: 1, content: dark1 },
        { id: 2, content: dark2 },
        { id: 3, content: dark3 },
      ]
    },
   
];

function setBackground(image) {
    return ({
                'background' : `url('${image}')`,
                "backgroundPosition" : "center",
                "backgroundSize" : "cover",

            }
           )   
}

export {backgroundsArray, setBackground};