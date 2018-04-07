import fs from 'fs';
import {deployedContract} from '../util/deployedContract';

class Triggers {
    triggers;
    constructor() {
        try {
            this.triggers = require('/tmp/triggers.json');
        }
        catch (e) {
            console.log("Did not find triggers");
            this.triggers = [];
        }

        console.log("Instantiated triggers", this.triggers);
    }

    addTrigger(data) {
        console.log("Trigger", data);
        this.triggers.push([data]);
        let triggerJson = JSON.stringify(this.triggers);
        fs.writeFile('/tmp/triggers.json', triggerJson, 'utf8', () => console.log("Persisted triggers"));

    }

    async checkTriggers() {
        let contract = await deployedContract();
        console.log("Instantiated contract", contract);
        for (var i = 0; i < this.triggers.length; i++) {

            this.checkTrigger(this.triggers[i]);
        }
    }

    checkTrigger(data) {
        console.log("Creating triggers", data);
        let address = data.address;
    }

}

export {Triggers}