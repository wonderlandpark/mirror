module.exports = {
    apps : [
        {
            name: "WonderMirror",
            script: "npm start",
            cwd: __dirname,
            args: require("./src/utils/index").isDevelopment() ? "" : "--env production",
            autorestart: true,
        }
        
    ]
}
