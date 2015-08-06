ServiceConfiguration.configurations.update({
    "service": "spotify"
}, {
    $set: {
        "clientId": "cd635e15871b48128293569d397b4176",
        "secret": "4c5c1db7053d4e2e88ff2f7aa8bf2b23"
    }
}, {
    upsert: true
});
