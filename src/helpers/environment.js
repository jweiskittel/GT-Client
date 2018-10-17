let APIURL = ''

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000'
        break
    case 'jw-gtclient.herokuapp.com':
        APIURL = 'https://jw-gtserver.herokuapp.com'
}

export default APIURL