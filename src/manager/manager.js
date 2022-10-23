import fetch from 'node-fetch';

class Manager {

    /* Manage agent information */

    /*
    attributes
    ----------
    _fUpdateTime
        Time to perform a full update in agentList
    _sUpdateTime
        Time to perform a summarized update in agentList
    _agentPort
        Port on which agents listen for manager requests
    _agentList
        List of agents managed by manager
    _cUpdateIntv
        Interval that performs a full update in agentList
    _sUpdateIntv
        Interval that performs a summarized update in agentList
    */
    constructor(fUpdateTime, sUpdateTime, agentPort, agentList) {
        this._fUpdateTime = fUpdateTime;
        this._sUpdateTime = sUpdateTime;
        this._agentPort = agentPort;
        this._agentList = agentList;

        this._cUpdateIntv = this._full_update_interval();
        this._sUpdateIntv = this._summary_update_interval();
    }

    get agentList() {
        return this._agentList;
    }

    set agentList(value) {
        this._agentList = value;
    }

    has_agents() {
        return this._agentList.length > 0
    }

    _full_update_interval() {
        return setInterval(() => this._full_update_agents(), this._cUpdateTime);
    }

    _summary_update_interval() {
        return setInterval(() => this._summary_update_agents(), this._sUpdateTime);
    }

    _full_update_agents() {
        for (let ag of this._agentList) {
            this._full_fetch_agent(ag);
        }
    }

    _summary_update_agents() {
        for (let ag of this._agentList) {
            this._summary_fetch_agent(ag);
        }
    }

    _full_fetch_agent(agent) {
        const url = `http://${agent.addr}:${this._agentPort}/get`;
        const paths = [""];
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "get": paths }),
        }

        agent.online = false;

        fetch(url, config)
            .then(async (value) => {
                value = (await value.json())[""];
                value.id = agent.id;
                value.addr = agent.addr;
                value.online = true;
                this._agentList[agent.id] = value;
            })
    }

    _summary_fetch_agent(agent) {
        const url = `http://${agent.addr}:${this._agentPort}/get`;
        const paths = [
            "cpu.clock", "cpu.clock_max", "cpu.clock_min",
            "cpu.temperature", "cpu.used", "memory", "network.rx_pckts",
            "network.tx_pckts", "storage.free", "storage.used"
        ]
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "get": paths }),
        }

        agent.online = false;

        fetch(url, config)
            .then(async (value) => {
                value = await value.json();

                for (let path in value) {
                    keys = path.split(".");
                    keys.reduce(function (acc, cur) {
                        return (cur === keys[keys.length - 1] ? acc[cur] = value[path] : acc[cur]);
                    }, value);
                }
                
                agent.online = true;
            })
    }
}

export { Manager };
