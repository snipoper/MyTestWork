const data = require('./data.json');

//------------------------------1---------------------------------//

const task11Result = (animals) => {
    const result = {
        dogs: 0,
        cats: 0,
        avgage: 0,
    };

    let totalAge = 0;

    // Перебираем массив животных
    for (const animal of animals) {
        if (animal.type === "cat") {
            result.cats++;
        } else if (animal.type === "dog") {
            result.dogs++;
        }

        totalAge += animal.age;
    }

    // Вычисляем средний возраст
    if (animals.length > 0) {
        result.avgage = Math.round(totalAge / animals.length);
    }

    return result;
};

// Вызываем функцию с данными
console.log(task11Result(data));

//------------------------------2---------------------------------//

const task12Result = (animals) => {
    let result = 0;

    // Перебираем массив животных
    for (const animal of animals) {
      // Проверяем, является ли животное собакой и черной
        if (animal.type === "dog" && animal.features.includes("black") && animal.breed) {
            result++;
        }
    }

    return result;
};

console.log(task12Result(data));

//------------------------------3---------------------------------//

const task13Result = (animals) => {
    const result = [];

    // Перебираем массив животных
    for (const animal of animals) {
        if (
            (animal.type === "cat" && animal.features.includes("black")) ||
            (animal.type === "dog" && animal.features.includes("white"))
        ) {
            result.push(animal);
        }
    }

    return result;
};

console.log(task13Result(data));

//------------------------------4---------------------------------//

const task14Result = (animals) => {
    // Разделение животных на кошек и собак
    const cats = animals.filter((animal) => animal.type === "cat");
    const dogs = animals.filter((animal) => animal.type === "dog");

    // Сортировка кошек по убыванию возраста
    cats.sort((a, b) => b.age - a.age);

    // Сортировка собак по возрастанию возраста
    dogs.sort((a, b) => a.age - b.age);

    // Объединение отсортированных списков
    const result = cats.concat(dogs);

    return result;
};

console.log(task14Result(data));

//------------------------------5--------------------------------//

const myPowFunc = (number, n) => {
    if (n === 0) {
      return 1; // Любое число в степени 0 равно 1
    }

    let result = 1;
    const absExponent = Math.abs(n); // Берем модуль степени

    for (let i = 0; i < absExponent; i++) {
    if (n > 0) {
        result *= number; // Умножаем number на себя, если степень положительная
    } else {
        result /= number; // Делим number на себя, если степень отрицательная
    }
    }

    return result;
};

console.log(myPowFunc(3, 4));

//------------------------------6---------------------------------//

const myFlatFunc = (inputArray) => {
    const result = [];

    for (const item of inputArray) {
        if (Array.isArray(item)) {
            result.push(...myFlatFunc(item)); // Рекурсивно вызываем myFlatFunc для вложенного массива
        } else {
            result.push(item);
        }
    }

    return result;
};

const inputArray = [1, 3, 5, [1, [4, 5], 'asdf', [76, [56, [66, 59]]]]];
const flattenedArray = myFlatFunc(inputArray);

console.log(flattenedArray);

//------------------------------7---------------------------------//
/*Если честно, я практически не знаком с React JS и для выполнения данного задания мне пришлось вопользоваться помощью ChatGPT.
ChatGPT создал стандартный пример выполнения данной задачи.
Так как я раньше не работал с React, данный код я дорабатывал и тестировал в https://codesandbox.io.
(В дальнейшем для изучения и работы естетсвенно нужно устанавливать нормальную среду разработки)
Всю логику выполнения кода я разобрал и проанализировал. Теперь я лучше понимаю, откуда берутся и как выполняются различные операции в коде..
--Добавил несколько функций--
1. Возможность мультивыбора
2. Оповещение в консоли при фокусировке на компоненте. (было два варианта. Сделать функцию отдельно или в Autocomplete. https://codesandbox.io дал возможность только в Autocomplete)
3. Отображение иконки рядом с названием фильма
4. Автозаполнение не только с начала названия фильма, а из любого места
*/

import { Avatar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
    icon: {
        width: 24, // Установите желаемую ширину иконки
        height: 24, // Установите желаемую высоту иконки
        marginRight: 6, // Добавьте отступ между иконкой и текстом
        marginLeft: -8, // Добавьте отступ между иконкой и текстом
    },
    inputWrapper: {
        display: "flex",
        alignItems: "center",
    },
}));

const MySelect = ({ data, onSelect }) => {
    const classes = useStyles();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
    };

    const handleOptionChange = (event, newOptions) => {
        setSelectedOptions(newOptions);
        onSelect(newOptions);
    };

    const getOptionLabel = (option) => (
        <div className={classes.inputWrapper}>
        <Avatar src={option.icon} className={classes.icon} />
        {option.label}
        </div>
    );

    const filterOptions = (options, state) => {
        const inputValue = state.inputValue.toLowerCase();
        return options.filter((option) =>
        option.label.toLowerCase().includes(inputValue)
        );
    };

    return (
        <Autocomplete
        multiple
        value={selectedOptions}
        onChange={handleOptionChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={data}
        filterOptions={filterOptions}
        getOptionLabel={getOptionLabel}
        onFocus={() => {
            console.log("Компонент получил фокус");
            // Вы можете выполнить дополнительные действия здесь
        }}
        onBlur={() => {
            console.log("Компонент потерял фокус");
            // Вы можете выполнить дополнительные действия здесь
        }}
        renderInput={(params) => (
            <TextField
            {...params}
            label="Выберите значения"
            />
        )}
        />
    );
};

export default MySelect;


const data = [
{ label: 'The Shawshank Redemption', year: 1994 },
{ label: 'The Godfather', year: 1972 },
{ label: 'The Godfather: Part II', year: 1974 },
{ label: 'The Dark Knight', year: 2008 },
{ label: '12 Angry Men', year: 1957 },
{ label: "Schindler's List", year: 1993 },
{ label: 'Pulp Fiction', year: 1994 },
  // Добавьте больше вариантов из вашего data.json
];

function App() {
const handleSelect = (selectedValue) => {
    console.log("Выбранное значение:", selectedValue);
    // Здесь можно выполнять дополнительные действия при выборе значения
};

return (
    <div className="App">
        <MySelect data={data} onSelect={handleSelect} />
    </div>
);
}

export default App;
