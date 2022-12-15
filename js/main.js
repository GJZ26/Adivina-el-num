/* Traemos a los elementos del DOM  */
const attempsBox = document.getElementById('attemps')
const userInput = document.getElementById('user-attemp')
const sendBtn = document.getElementById('send')
const resetBtn = document.getElementById('reset')
const msgBox = document.getElementById('feedback')
const historyAtt = document.getElementById('attemps-history')


class Game {

	_numberToGuess = null
	actualAttemp = null
	attempNumber = 1
	attempLimit = 10
	boxClass = ""
	gameFinish = false

	constructor() {
		this.resetAll()
	}

	resetAll() {
		this.gameFinish = false
		this.boxClass = ""
		this._numberToGuess = Math.floor(Math.random() * 100) + 1;

		this.resetAttemps()
		this.clearHistory()
		this.hiddeMsgBox()
		this.resetUserInput()
		this.resetClasses()
	}

	resetClasses() {

		sendBtn.style.display = "";

		if (resetBtn.classList.contains("send"))
			resetBtn.classList.remove("send")

		if (!resetBtn.classList.contains("reset"))
			resetBtn.classList.add("reset")
	}

	resetUserInput() {
		userInput.value = null
		userInput.focus()
	}

	resetAttemps() {
		this.attempNumber = 1;
		attempsBox.textContent = `Intento ${this.attempNumber}/${this.attempLimit}`
	}

	clearHistory() {
		historyAtt.style.opacity = 0
		const node = document.createElement("p")

		node.classList.add("history");
		node.textContent = "Historial"

		historyAtt.innerHTML = ''
		historyAtt.appendChild(node)
	}

	hiddeMsgBox() {
		msgBox.textContent = "¡Escribe tu intento!"
	}

	validateEnter(event) {
		if (event.keyCode !== 13) {
			return
		}

		if (this.gameFinish) {
			this.resetAll()
			return
		}

		this.validateAttemp()
	}

	validateAttemp() {

		console.log(this._numberToGuess)

		this.actualAttemp = userInput.value
		let clazz = null


		if (this.actualAttemp == this._numberToGuess) {
			msgBox.textContent = "¡Haz ganado!"
			clazz = "right"
			this.matchEnded()
			this.gameFinish = true
		}

		if (this.actualAttemp > this._numberToGuess) {
			msgBox.textContent = "Demasiado alto"
			clazz = "high"
		}

		if (this.actualAttemp < this._numberToGuess) {
			msgBox.textContent = "Damasiado bajo"
			clazz = "low"
		}

		userInput.select()
		this.addToHistory(clazz)
		if (this.gameFinish)
			return
		this.writeAttempNumber()


		if (this.actualAttemp !== this._numberToGuess && this.attempNumber > 10) {
			msgBox.textContent = "Has perdido"
			attempsBox.textContent = "Sin turnos disponibles"
			this.matchEnded()
			this.gameFinish = true
			return
		}
	}

	addToHistory(clazz) {

		if (!this.actualAttemp) {
			msgBox.textContent = "¿Ya intentaste escribiendo algo?"
			return
		}

		if (this.actualAttemp > 100) {
			msgBox.textContent = "Creo que es demasiado alto..."
			return
		}

		if (this.actualAttemp < 1) {
			msgBox.textContent = "Creo que es demasiado bajo..."
			return
		}

		if (this.attempNumber == 1) {
			historyAtt.style.opacity = 1;
		}

		const node = document.createElement("span")

		node.textContent = this.actualAttemp
		node.classList.add("log")
		node.classList.add(clazz)

		historyAtt.appendChild(node)

		this.attempNumber++
	}

	writeAttempNumber() {
		attempsBox.textContent = `Intento ${this.attempNumber}/${this.attempLimit}`
	}

	matchEnded() {
		sendBtn.style.display = "none";
		resetBtn.classList.add("send")
		resetBtn.classList.remove("reset")
	}

}

let currentMatch = new Game()

userInput.onkeydown = (e) => { currentMatch.validateEnter(e) }
sendBtn.onclick = () => { currentMatch.validateAttemp() }
resetBtn.onclick = () => { currentMatch = new Game() }