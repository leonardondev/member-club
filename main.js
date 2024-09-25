
const searchInput = document.getElementById("search")
const userImage = document.querySelector("#user .user-image")
const profile = document.querySelector("#user .profile")

const userId = document.getElementById("user-id")
const slots = document.querySelector("#slots ul")

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
    const client = clients.find(client => client.id === clientId)

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
      pinCheck.style.animationDelay = `${100*i}ms`

      if(slots.children[i].hasChildNodes()) {
        slots.children[i].removeChild(slots.children[i].firstChild);
      } 
      
      slots.children[i].append(pinCheck)      
    }

    /* section progress */
    progressRemaining.textContent = String(cutsRemaining)
    progressLabel.textContent = `${totalCuts} de ${cutsNeeded}`
    progressBar.setAttribute("aria-valuenow", `${totalCuts}`);
    updateProgressBar(totalCuts)

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
  updateProgressBar()

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

  const lastSlotEmpty = document.createElement("li")
  lastSlotEmpty.innerHTML = '<i class="ph-fill ph-gift"></i>'
  slots.append(lastSlotEmpty)
}

function updateProgressBar(totalCuts) {
  const valueNow = progressBar.getAttribute("aria-valuenow");
  const max = progressBar.getAttribute("aria-valuemax");

  const timeToFillInMiliSeconds = totalCuts ? totalCuts * 100 : 500

  const widthPercentage = (valueNow / max) * 100;

  progressBar.style.width = widthPercentage + "%";
  progressBar.style.transition = `width ${timeToFillInMiliSeconds}ms ease`

  if(widthPercentage === 100) {
    setTimeout(() => {
      alert("Parabéns! Seu próximo corte é gratuito!")
    }, timeToFillInMiliSeconds + 500)
  }
}

const clients = [
  {
    id: "124-537-835-230",
    name: "Natália Miranda",
    gender: "female",
    clientSince: "18/09/2023",
    appointmentHistory: [
      {date: "29/04/2024", time: "18:30"},
      {date: "16/03/2024", time: "17:00"},
      {date: "01/02/2024", time: "17:30"},
      {date: "03/01/2024", time: "15:00"},
      {date: "28/11/2023", time: "14:00"},
      {date: "23/10/2023", time: "15:00"}
    ],
    loyaltyCard: {
      totalCuts: 7,
      cutsNeeded: 10,
      cutsRemaining: 3
    }
  },
  {
    id: "207-245-699-104",
    name: "Capitão Nascimento",
    gender: "male",
    clientSince: "12/04/2023",
    appointmentHistory: [
      {date: "01/05/2024", time: "10:00"},
      {date: "12/02/2024", time: "09:00"},
      {date: "30/12/2023", time: "11:00"},
      {date: "05/11/2023", time: "10:30"}
    ],
    loyaltyCard: {
      totalCuts: 4,
      cutsNeeded: 10,
      cutsRemaining: 6
    }
  },
  {
    id: "523-114-876-908",
    name: "Sansão",
    gender: "male",
    clientSince: "15/07/2023",
    appointmentHistory: [
      {date: "22/04/2024", time: "16:00"},
      {date: "18/03/2024", time: "16:30"},
      {date: "24/01/2024", time: "17:45"},
      {date: "20/12/2023", time: "15:15"}
    ],
    loyaltyCard: {
      totalCuts: 5,
      cutsNeeded: 8,
      cutsRemaining: 3
    }
  },
  {
    id: "655-844-674-466",
    name: "Leonardo",
    gender: "male",
    clientSince: "10/01/2024",
    appointmentHistory: [
      {date: "18/01/2024", time: "08:15"},
      {date: "02/02/2024", time: "14:30"},
      {date: "12/03/2024", time: "19:45"},
      {date: "29/03/2024", time: "06:00"},
      {date: "10/04/2024", time: "12:45"},
      {date: "25/04/2024", time: "23:15"},
      {date: "18/05/2024", time: "17:30"},
      {date: "01/06/2024", time: "04:00"},
      {date: "15/06/2024", time: "10:45"},
      {date: "04/07/2024", time: "21:00"}
    ],
    loyaltyCard: {
      totalCuts: 10,
      cutsNeeded: 10,
      cutsRemaining: 0
    }
  }
]
