async function fetchServerStatus() {
    const serverIp = document.getElementById('server-search').value;
    const serverInfo = document.getElementById("server-info");
    const errorMessage = document.getElementById("error-message");
    const serverIPElement = document.getElementById("server-ip");
    const serverStatusElement = document.getElementById("server-status");
    const playerCountElement = document.getElementById("player-count");

    // Clear previous state
    serverInfo.classList.add("hidden");
    errorMessage.classList.add("hidden");

    if (!serverIp) {
        return; // Exit if no server IP is provided
    }

    serverStatusElement.textContent = "Prüfen...";

    try {
        const response = await axios.get(`https://api.mcsrvstat.us/2/${serverIp}`);
        const data = response.data;

        // Check if the server is online
        if (data.online) {
            serverIPElement.textContent = serverIp;
            serverStatusElement.textContent = "Online";
            serverStatusElement.classList.remove("text-yellow-400");
            serverStatusElement.classList.add("text-green-400");
            playerCountElement.textContent = data.players.online;
            serverInfo.classList.remove("hidden");
            errorMessage.classList.add("hidden");
        } else {
            throw new Error("Server ist offline");
        }
    } catch (error) {
        serverStatusElement.textContent = "Offline";
        serverStatusElement.classList.remove("text-yellow-400");
        serverStatusElement.classList.add("text-red-400");
        playerCountElement.textContent = "Nicht verfügbar";
        serverInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
}

const servers = [
    { ip: "hypixel.net", category: "PvP" },
    { ip: "mineplex.com", category: "PvP" },
    { ip: "play.cubecraft.net", category: "MiniGames" },
    { ip: "mc.hypixel.net", category: "MiniGames" },
    { ip: "mc-central.net", category: "Citybuild" },
    { ip: "herobrine.org", category: "Survival" },
    { ip: "blocksmc.com", category: "PvP" },
    { ip: "extremecraft.net", category: "Citybuild" },
    { ip: "hivebedrock.network", category: "MiniGames" },
    { ip: "cosmicpvp.com", category: "PvP" },
    { ip: "purpleprison.org", category: "Prison" },
    { ip: "wynncraft.com", category: "RPG" },
    { ip: "minemen.club", category: "PvP" },
    { ip: "pvplegacy.net", category: "PvP" },
    { ip: "becto.net", category: "Survival" },
    { ip: "play.jartexnetwork.com", category: "MiniGames" },
    { ip: "play.manacube.net", category: "Citybuild" },
    { ip: "play.minehut.com", category: "MiniGames" },
    { ip: "play.loverfella.com", category: "Survival" },
    { ip: "play.pika-network.net", category: "PvP" }
];

async function fetchPopularServers() {
    const container = document.getElementById("popular-servers");
    container.innerHTML = "";
    
    for (const server of servers) {
        try {
            const response = await axios.get(`https://api.mcsrvstat.us/2/${server.ip}`);
            const data = response.data;
            const serverCard = `<div class='bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition duration-300'>
                <p class='font-bold'>${server.ip} (${server.category})</p>
                <p>Status: <span class='${data.online ? "text-green-400" : "text-red-400"}'>${data.online ? "Online" : "Offline"}</span></p>
                <p>Spieler online: ${data.players.online}</p>
                <button onclick='copyToClipboard("${server.ip}")' class='bg-blue-500 px-2 py-1 mt-2 rounded hover:bg-blue-600 transition duration-300'>IP kopieren</button>
            </div>`;
            container.innerHTML += serverCard;
        } catch (error) {
            console.error(`Fehler beim Abrufen von ${server.ip}`);
            const serverCard = `<div class='bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition duration-300'>
                <p class='font-bold'>${server.ip} (${server.category})</p>
                <p>Status: <span class='text-red-400'>Offline</span></p>
                <p>Spieler online: Nicht verfügbar</p>
                <button onclick='copyToClipboard("${server.ip}")' class='bg-blue-500 px-2 py-1 mt-2 rounded hover:bg-blue-600 transition duration-300'>IP kopieren</button>
            </div>`;
            container.innerHTML += serverCard;
        }
    }
}

function filterServers() {
    const searchValue = document.getElementById("category-search").value.toLowerCase();
    const container = document.getElementById("popular-servers");
    container.innerHTML = "";
    
    const filteredServers = servers.filter(server => server.category.toLowerCase().includes(searchValue));
    
    for (const server of filteredServers) {
        const serverCard = `<div class='bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition duration-300'>
            <p class='font-bold'>${server.ip} (${server.category})</p>
            <button onclick='copyToClipboard("${server.ip}")' class='bg-blue-500 px-2 py-1 mt-2 rounded hover:bg-blue-600 transition duration-300'>IP kopieren</button>
        </div>`;
        container.innerHTML += serverCard;
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        document.getElementById("copy-message").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("copy-message").classList.add("hidden");
        }, 2000);
    }).catch(err => {
        console.error("Fehler beim Kopieren: ", err); 
    });
}

fetchPopularServers();  // Fetch popular servers when the page loads
