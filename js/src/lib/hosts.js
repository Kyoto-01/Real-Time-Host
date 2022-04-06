function load_hosts(hostList){
    for (const host of hostList){
        const card = `
        <div class="col mt-4">
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
        </div>`;
        const cardList = document.querySelector("#card-list .container .row");
        cardList.insertAdjacentHTML('beforeend', card);
    }
}

export {load_hosts}
