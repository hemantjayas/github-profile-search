// handing the input text
let input = document.getElementById("searchbar")
input.addEventListener('input', (e) => {
    const inputText = e.target.value
    console.log(inputText)
    debounceApi(() => { getData(inputText) }, 500)

})

// function for fetching the data from the Api through fetch method and async/await 
async function getData(input) {
    try {
        const res = await fetch(`https://api.github.com/search/users?q=${input}`);
        const data = await res.json()
        console.log("fetched data", data.items)




    } catch (error) {
        console.log("error while fetching data", error.message)
    }
}

// debouncing function to limit the fetching requests from the Api 
let debouncetime;
const debounceApi = (func, delay) => {
    clearInterval(debouncetime);
    debouncetime = setTimeout(func, delay)

}


