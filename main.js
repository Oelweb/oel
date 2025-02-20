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

async function fetchServerStatus(ip) {
    const serverInfoDiv = document.getElementById('server-info');
    const serverIp = document.getElementById('server-ip');
    const serverStatus = document.getElementById('server-status');
    const playerCount = document.getElementById('player-count');
    const errorMessage = document.getElementById('error-message');
    const serverSearchInput = document.getElementById('server-search');
    
    try {
        const response = await axios.get(`https://api.mcsrvstat.us/2/${ip}`);
        const data = response.data;

        serverIp.textContent = ip;
        serverStatus.textContent = data.online ? 'Online' : 'Offline';
        serverStatus.classList = data.online ? 'text-green-400' : 'text-red-400';
        playerCount.textContent = data.players.online;

        serverInfoDiv.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    } catch (error) {
        serverInfoDiv.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}

function fetchPopularServers() {
    const container = document.getElementById("popular-servers");
    container.innerHTML = "";
    
    for (const server of servers) {
        const serverCard = `<div class='bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition duration-300'>
            <p class='font-bold'>${server.ip} (${server.category})</p>
            <button onclick='copyToClipboard("${server.ip}")' class='bg-blue-500 px-2 py-1 mt-2 rounded hover:bg-blue-600 transition duration-300'>IP kopieren</button>
        </div>`;
        container.innerHTML += serverCard;
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

// Initial server fetch
fetchPopularServers();
