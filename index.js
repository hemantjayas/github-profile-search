// handing the input text
let input = document.getElementById("searchbar")
input.addEventListener('input', (e) => {
    const inputText = e.target.value
    debounceApi(() => { getData(inputText) }, 200)

})

// function for fetching the data from the Api through fetch method and async/await 
async function getData(input) {
    try {
        const res = await fetch(`https://api.github.com/search/users?q=${input}`);
        const data = await res.json();
        showresult(data.items)

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


// displaying the search result
let resultBox = document.getElementById("search_result")
resultBox.innerHTML = ""
console.log(resultBox.textContent)

const showresult = (data) => {
    resultBox.innerHTML = ""
    if (data.length === 0) {
        resultBox.textContent = ""
    } else {
        data.forEach(element => {
            let container = document.createElement("div");
            let imagewrap = document.createElement("div");
            let profile = document.createElement("img");
            let title = document.createElement("div");
            
            const anchor = document.createElement('a');
            anchor.setAttribute('href', element.html_url)

            imagewrap.setAttribute('class', "profile");
            container.setAttribute('class', "searchmain");
          
            profile.src = element.avatar_url;
            title.textContent = element.login

            imagewrap.append(profile)
            container.append(imagewrap, title);
            anchor.append(container)
            resultBox.appendChild(anchor)
        });
    }

}



