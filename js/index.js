const hosts = [
    {
        hostname : 'PC01-SINFO01',
        ip: '192.168.1.6',
        os: 'Linux Debian',
        online: true,
    },
    {
        hostname: 'PC02-SINFO01',
        ip: '192.168.1.7',
        os: 'Linux Ubuntu',
        online: false,
    },
    {
        hostname: 'PC03-SINFO01',
        ip: '192.168.1.8',
        os: 'Windows 10',
        online: true,
    },
    {
        hostname: 'PC04-SINFO01',
        ip: '192.168.1.9',
        os: 'IOS',
        online: false,
    },
    {
        hostname: 'PC05-SINFO01',
        ip: '192.168.1.10',
        os: 'Linux Debian',
        online: true,
    },
    {
        hostname: 'PC06-SINFO01',
        ip: '192.168.1.11',
        os: 'Linux Debian',
        online: true,
    },
    {
        hostname: 'PC07-SINFO01',
        ip: '192.168.1.12',
        os: 'Linux CentOS',
        online: false,
    },
]

for (const host of hosts){
    console.log(`<div class="col mt-4">
    <div class="card">
        <div class="card-header">
            <img src="images/pc.svg" alt="PC" class="card-img-top card-icon"> 
            <span class="float-end">
                <i class="fa-solid fa-circle ${host.online ? 'fa-circle-on' : 'fa-circle-off' }"></i> ${host.online ? 'online' : 'offline'}
            </span>
        </div>
        <div class="card-body">
            <h5 class="card-title">${host.hostname}</h5>
            <ul class="list-group" style="list-style: none;">
                <li>${host.ip}</li>
                <li>${host.os}</li>
            </ul>
        </div>
    </div>
</div>`);
}
