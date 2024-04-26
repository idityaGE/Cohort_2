import axios from 'axios';

// // fetch
//GET request
// Syntax: fetch(url) => res.json() => data
function fet1() {
    fetch('https://api.github.com/users/idityage')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}
fet1()

const fet2 = async () => {
    const res = await fetch('https://api.github.com/users/idityage');
    const data = await res.json(); // convert to json
    console.log(data);
}
fet2();

//POST request
// Syntax: fetch(url, {method: 'POST', body: data, headers: {}}) => res.json() => data
(async function () {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1
            }),
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer mytoken'
            }
        });
    const data = await res.json(); // convert to json or res.text() for text
    console.log(data);
})();




// axios
// IIFE syntax
// GET request
// Syntax: axios.get(url) => res.data
(async function () {
    const res = await axios.get('https://api.github.com/users/idityage');
    console.log(res.data.login);
})();


// POST request
// Syntax: axios.post(url, data, headers) => res.data
(async function () {
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts',
        {
            title: 'Aditya',
            body: 'Aditya',
            userId: 2
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer my'
            }
        });
    console.log(res.data);
})()

