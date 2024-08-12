
const searchInput = document.getElementById("search")
const userImage = document.querySelector("#user .user-image")
const profile = document.querySelector("#user .profile")

const userId = document.getElementById("user-id")
const slots = document.querySelector("#slots ul")

const lastSlotEmpty = document.createElement("li")
lastSlotEmpty.innerHTML = '<i class="ph-fill ph-gift"></i>'

const progressRemaining = document.querySelector("#progress header strong")
const progressBar = document.querySelector("#progress-bar")
const progressLabel = document.querySelector("#progress .progress-label")

const historyCounter = document.querySelector("#history header span")
const historyList = document.querySelector("#history .appointment-list")

clearProfile()

addEventListener("submit", async (event) => {
  event.preventDefault();
  clearProfile();
  
  const clientId  = searchInput.value
  const userIdRegex = /\d{3}-\d{3}-\d{3}-\d{3}/
  const isValidId = userIdRegex.test(clientId)

  if(!isValidId) {
    return alert("ID inválido. Por favor digite um id no formato 000-000-000-000");
  }
  
  try {
    const response = await fetch(`http://localhost:3333/clients/${clientId}`)
    const client = await response.json()

    if(!client) {
      return alert("Não existe cliente com o ID informado.")
    }
    
    searchInput.value = ""

    /* section user */
    const pictureId = client.id.charAt(0)
    const avatarImage = document.createElement("img")
    avatarImage.setAttribute("src", `https://xsgames.co/randomusers/assets/avatars/${client.gender}/${pictureId}.jpg`)
    avatarImage.setAttribute("alt", `Foto de perfil ${client.name}`)
    userImage.append(avatarImage)
    userImage.classList.add("show-image")

    const profileTitle = document.createElement("h1")
    profileTitle.textContent = client.name
    
    const profileSubtitle = document.createElement("span")
    profileSubtitle.textContent = `Cliente desde ${client.clientSince}`

    profile.append(profileTitle, profileSubtitle)

    /* section slots */
    const {totalCuts, cutsNeeded, cutsRemaining} = client.loyaltyCard

    userId.textContent = `ID: ${client.id}`;
    clearSlots(cutsNeeded)

    for (let i = 0; i < totalCuts; i++) {
      const pinCheck = document.createElement("img")
      pinCheck.setAttribute("src", "assets/pinCheck.png")
      pinCheck.setAttribute("alt", "Desenho de selo")

      if(slots.children[i].hasChildNodes()) {
        slots.children[i].removeChild(slots.children[i].firstChild);
      } 
      
      slots.children[i].append(pinCheck)      
    }

    /* section progress */
    progressRemaining.textContent = String(cutsRemaining)
    progressLabel.textContent = `${totalCuts} de ${cutsNeeded}`
    progressBar.setAttribute("aria-valuenow", `${totalCuts}`);
    updateProgressBar()

    /* section history */
    const historyLength = client.appointmentHistory.length
    historyCounter.textContent = `${historyLength} ${historyLength === 1 ? "corte" : "cortes"}`

    for (let i = 0; i < historyLength; i++) {
      const historyDate = document.createElement("strong")
      historyDate.textContent = client.appointmentHistory[i].date

      const historyTime = document.createElement("span")
      historyTime.textContent = client.appointmentHistory[i].time
      
      const historyIcon = document.createElement("i")
      historyIcon.classList.add("ph")
      historyIcon.classList.add("ph-seal-check")
            
      const historyContent = document.createElement("div")
      historyContent.classList.add("appointment")
      historyContent.append(historyDate, historyTime)

      const historyItem = document.createElement("li")
      historyItem.append(historyContent, historyIcon)

      historyList.append(historyItem)
    }
  } catch (error) {
    console.log(error)
    alert("Não foi possível buscar os dados do cliente.")
  }
})


function clearProfile() {
  /* clear section user */
  userImage.classList.remove("show-image")
  userImage.innerHTML = ""
  profile.innerHTML = ""

  /* clear section slots */
  userId.textContent = ""
  clearSlots()

  /* clear section progress */
  progressRemaining.textContent = "0"
  progressLabel.textContent = "0 de 10"
  progressBar.setAttribute("aria-valuemax", "10");
  progressBar.setAttribute("aria-valuenow", "0");

  /* clear section history */
  historyCounter.textContent = "0 cortes"
  historyList.innerHTML = ""




  // searchInput.focus()
}

function clearSlots(length = 10) {
  slots.innerHTML = ""
  for (let i = 1; i < length; i++) {
    const emptySlot = document.createElement("li")
    slots.append(emptySlot)
  }
  slots.append(lastSlotEmpty)
}

function updateProgressBar() {
  const valueNow = progressBar.getAttribute("aria-valuenow");
  const max = progressBar.getAttribute("aria-valuemax");

  const widthPercentage = (valueNow / max) * 100;

  progressBar.style.width = widthPercentage + "%";
}

