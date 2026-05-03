// All Logics
const dropdowns = document.querySelectorAll(".container select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".value");

for (select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });

}

const updateFlag = (elem) => {
    let currCode = elem.value;
    let countryCode = countryList[currCode];
    let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = elem.parentElement.querySelector("img");
    img.src = newScr;
    // console.log(elem.parentElement)
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    updateExchangeRate()
})

async function updateExchangeRate() {
    let amt = document.querySelector("form input");
    let amtVal = amt.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amt.value = "1";
    }

    const URL = `https://api.frankfurter.dev/v1/latest?from=${fromCurr.value.toUpperCase()}&to=${toCurr.value.toUpperCase()}`;
    try {
        let resp = await fetch(URL);
        var data = await resp.json();
        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }

        // console.log(resp.status)

        let rate = data["rates"][toCurr.value.toUpperCase()]
        let finalAmt = rate * amtVal

        msg.innerText = `${amtVal} ${fromCurr.value.toUpperCase()} = ${finalAmt} ${toCurr.value.toUpperCase()}`;

    } catch (error) {
        if (data["message"]) {
            msg.innerText = "Not Found";
        }
        console.clear()
        console.log(error.message)
    }

}

window.addEventListener("load", () => {
    updateExchangeRate();
})