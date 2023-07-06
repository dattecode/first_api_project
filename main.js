const API_URL = "https://datagroups.fundamentos-29.repl.co/"
const groupsHtml = document.querySelector(".groups")

// ----------------------------- get api
async function getApi() {
	try {
		const data = await fetch(API_URL)
		const res = await data.json()
		return res
	} catch (error) {
		console.log(error, " this is error");
	}
}

// ----------------------------- main
async function main() {
	const products = await getApi()
	console.log(products);
	forTest(products)
}

main()


// ----------------------------- functions
function forTest(arr) {
	const arrApi = arr

	for (const {id, title, color, subGroups} of arrApi) {

		let group = `
			<div class="group" style ="border: 5px solid ${color}">
				<h2 style="--color-font: ${color}">${title}</h2>
				<div class="subgroups"></div>
			</div>	
		`
		groupsHtml.innerHTML += group

		const currentGroup = groupsHtml.lastElementChild;
		const subGroupsHtml = currentGroup.querySelector(".subgroups")

		for (const {title, participants} of subGroups) {
			
			let subGroup = `
				<div class="subgroup" style ="border: 5px solid ${color}">
					<h3>${title}</h3>
					<div class="participants" style="--color-hover: ${color}"></div>
				</div>
			`
			subGroupsHtml.innerHTML += subGroup

			const currentSubGroup = subGroupsHtml.lastElementChild
			const participantsHtml = currentSubGroup.querySelector(".participants")

			for (const {name, email} of participants) {
				
				let participant = `
					<div class="participant" style="border: 2px solid ${color}">
						<p>${name}</p>
						<p>${email}</p>
					</div>
				`
				participantsHtml.innerHTML += participant
			}
		}
	}
}

function addColor (id, color = "white") {
	const idElement = document.getElementById(id)
	idElement.style.border = `4px solid ${color}`
	if (document.querySelector(".group")){
		idElement.style.color = color
	}
}

function verificId (id) {
	const idElement = document.getElementById(id)
	return idElement + 1
}
