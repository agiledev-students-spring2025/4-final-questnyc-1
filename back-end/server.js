import server from './app.js'
// const app = express();
const PORT = process.env.PORT || 5000;

const listener = server.listen(PORT, function () {
    console.log(`Server running on port: ${port}`)
})

const close = () => {
    listener.close()
}

export { close }