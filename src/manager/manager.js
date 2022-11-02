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
    _fUpdateIntv
        Interval that performs a full update in agentList
    _sUpdateIntv
        Interval that performs a summarized update in agentList
    */
    constructor(fUpdateTime, sUpdateTime, agentPort, agentList) {
        this._fUpdateTime = fUpdateTime;
        this._sUpdateTime = sUpdateTime;
        this._agentPort = agentPort;
        this._agentList = {};

        this._fUpdateIntv = this._full_update_interval();
        this._sUpdateIntv = this._summary_update_interval();

        this.agentList = agentList;
    }

    get agentList() {
        return this._agentList;
    }

    set agentList(value) {
        this._agentList = {};

        for (let agent of value)
            this._agentList[agent.id] = agent;

        this._full_update_agents();
    }

    has_agents() {
        return this._agentList.length > 0;
    }

    summary_agents() {
        const agents = [];

        for (let ag in this._agentList)
            agents.push(this._summary_agent(this._agentList[ag]));

        return agents;
    }

    get_agent(id, summary) {
        const agent = this.agentList[id];

        return summary ? this._summary_agent(agent) : agent;
    }

    add_agent(agent) {
        this._agentList[agent.id] = agent;
    }

    remove_agent(id) {
        delete this._agentList[id];
    }

    _summary_agent(agent) {
        return {
            "id": agent.id,
            "addr": agent.addr,
            "online": agent.online,
            "system": agent.system || {
                "hostname": "-",
                "os": "-",
            },
        }
    }

    _full_update_interval() {
        return setInterval(() => this._full_update_agents(), this._fUpdateTime);
    }

    _summary_update_interval() {
        return setInterval(() => this._summary_update_agents(), this._sUpdateTime);
    }

    _full_update_agents() {
        for (let key in this._agentList) {
            this._full_fetch_agent(this._agentList[key]);
        }
    }

    _summary_update_agents() {
        for (let key in this._agentList) {
            this._summary_fetch_agent(this._agentList[key]);
        }
    }

    async _full_fetch_agent(agent) {
        const url = `http://${agent.addr}:${this._agentPort}/get`;
        const paths = [""];
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "get": paths }),
        }

        await fetch(url, config)
            .then(async (value) => {
                value = (await value.json())[""];
                value.id = agent.id;
                value.addr = agent.addr;
                value.online = true;
                this._agentList[agent.id] = value;
            })
            .catch(() => {
                agent.online = false;
                agent.system = {
                    "hostname": "-",
                    "os": "-",
                };
            });
    }

    async _summary_fetch_agent(agent) {
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

        await fetch(url, config)
            .then(async (value) => {
                value = await value.json();

                for (let path in value) {
                    const keys = path.split(".");
                    keys.reduce(function (acc, cur) {
                        if (acc)
                            return (cur === keys[keys.length - 1] ? acc[cur] = value[path] : acc[cur]);
                    }, value);
                }

                agent.online = true;
            })
            .catch(() => {
                agent.online = false
                agent.system = {
                    "hostname": "-",
                    "os": "-",
                };
            });
    }
}

export { Manager };
