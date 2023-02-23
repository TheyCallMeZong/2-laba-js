const term = document.getElementById("term")
const typeDeposit = document.getElementById("type-deposit")
const result = document.getElementById("calculate-container")
document.getElementById("btn").addEventListener("click", calculate)

typeDeposit.addEventListener("change", (event) => {
    setTerm(event)
})

let type = null
const mapFunc = new Map()
const arrP = new Map()
const arrS = new Map()
const mapCalc = new Map()

setElements()
function setElements(){
    mapFunc.set("Пополняемый", setTermP)
    mapFunc.set("Срочный", setTermS)

    //ключ это срок значение это процент
    arrP.set("6 месяцев", "20")
    arrP.set("1 год", "22")
    arrP.set("1,5 года", "15")
    arrP.set("2 года", "10")

    arrS.set("3 месяца", "20")
    arrS.set("6 месяцев", "22")
    arrS.set("9 месяцев", "23")
    arrS.set("1 год", "24")
    arrS.set("1,5 года", "18")
    arrS.set("2 года", "15")

    mapCalc.set("Пополняемый", arrP)
    mapCalc.set("Срочный", arrS)
}

function setTerm(event) {
    let none = document.getElementById("none")
    if (none !== null){
        none.remove()
    }

    let t = document.getElementsByClassName("op")

    //я в ахуе с этого блять джава скрпита
    //30 минут здесь ебалася с этим ремове блять
    if (t.length !== 0){
        let len = t.length
        for (let i = 0; i < len; i++){
            t[0].remove()
        }
    }

    let value = event.target.value
    let func = mapFunc.get(value)
    func()

    type = value
}

function setOption(termDep, option){
    option.innerHTML = termDep
    option.className =  "op"
    term.appendChild(option)
}

function setTermP() {
    arrP.forEach((value, key) => {
        let op = document.createElement("option")
        setOption(key, op)
    })
}

function setTermS() {
    arrS.forEach((value, key) => {
        let op = document.createElement("option")
        setOption(key, op)
    })
}

function calculate() {
    let sum = document.getElementById("sum").value
    if (isNaN(sum)){
        alert("ку-ку?")
        return
    }

    if (type === null){
        alert("рано")
        return
    }

    //срок
    let interval = term.options[term.selectedIndex].text

    //процент
    let percent = mapCalc.get(type).get(interval)

    //калькуляция
    let resultSum = 0

    //вывод
    let p = document.createElement("p")
    p.innerHTML ='Вклад "' + type + '" на срок "' + interval + '" на сумму ' + sum + "руб."
        + "<p>В конце срока вы получите пиздюлей " + resultSum + " руб.</p>"
    p.style.fontSize = "20px"
    result.appendChild(p)
}