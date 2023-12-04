// javascript
const confettiBtn = document.getElementById("upload-btn")
const textEl = document.querySelector(".container #text-endorsment")
const endorsmentEl = document.getElementById("endorsment-list")

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-ac568-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsments = ref(database, "Tbl_endorsments")

onValue(endorsments, function(snapshots){
    if (snapshots.exists()) {
        let endorsmentsArray = Object.entries(snapshots.val())

        clearEndorsmentList()

        for (let i = endorsmentsArray.length - 1; i >= 0; i--) {
            console.log(endorsmentEl[i])
            let currentItem = endorsmentsArray[i]

            appendEndorsment(currentItem)
        }

    } else {
        endorsmentEl.innerHTML = "No endorsments yet..."
    }
})


confettiBtn.addEventListener("click", function(){
    confetti()
    push(endorsments, textEl.value)
    clearInputField()
})

function clearInputField(){
    textEl.value = ""
}

function clearEndorsmentList(){
    endorsmentEl.innerHTML = ""
}

function appendEndorsment(item) {
    const itemID = item[0]
    const itemContent = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemContent

    newEl.addEventListener("dblclick", function(){
        let location = ref(database, `Tbl_endorsments/${itemID}`)

        remove(location)
    })

    endorsmentEl.append(newEl)
}