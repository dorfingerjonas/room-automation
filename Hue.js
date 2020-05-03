const hue = require('node-hue-api');

class Hue {
    changeAllLightsState(newState) {
        const lightIDs = [];

        hue.v3.discovery.nupnpSearch().then(searchResults => {
            const host = searchResults[0].ipaddress;
            return hue.v3.api.createLocal(host).connect(getUsername());
        }).then(api => {
            return api.lights.getAll();
        }).then(allLights => {
            allLights.forEach(light => {
                lightIDs.push(light.id);
            });
        }).then(() => {
            hue.v3.discovery.nupnpSearch().then(searchResults => {
                const host = searchResults[0].ipaddress;
                return hue.v3.api.createLocal(host).connect(getUsername());
            }).then(api => {
                lightIDs.forEach(id => {
                    api.lights.setLightState(id, {on: newState}).then(r => console.log(`changed light state of lamp ${id}`)).catch(console.error);
                });
            });
        });

        hue.v3.discovery.nupnpSearch()
            .then(searchResults => {
                const host = searchResults[0].ipaddress;
                return hue.v3.api.createLocal(host).connect(getUsername());
            })
            .then(api => {
                return api.configuration.getConfiguration();
            })
            .then(allUsers => {
                // Display the details of the users we got back
                console.log(JSON.stringify(allUsers, null, 2));
            })
        ;
    }
}

function getUsername() {
    return require('./hueCredentials.json')["hue-username"];
}

module.exports = Hue;