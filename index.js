// Minimal amount of secure websocket server
var fs = require('fs');

// read ssl certificate
var privateKey = fs.readFileSync('certs-from-java/privatekey.pem', 'utf8');
var certificate = fs.readFileSync('certs-from-java/server.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var https = require('https');

var arguments = process.argv
const loop = arguments[2]
console.log( loop )

const mem = '{"id":"Y2lzY29zcGFyazovL3VzL1dFQkhPT0svMjJkNDYzYmEtZGM1Yi00YzhhLWIyZGMtNjUyYjhmZDEwOWJh","resource":"memberships","type":"created","name":"membershipsCreated","targetUrl":"http://api.webhookinbox.com/i/kkxIei9A/in/","orgId":"Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi9jZTg2MWZiYS02ZTJmLTQ5ZjktOWE4NC1iMzU0MDA4ZmFjOWU","createdBy":"Y2lzY29zcGFyazovL3VzL1BFT1BMRS84YjUzODc1My1hYWFlLTQyNWItOWEwZS1hYmFmMjUzODMyZGM","appId":"Y2lzY29zcGFyazovL3VzL0FQUExJQ0FUSU9OL0NmMzkyNWU5NDFmMzhhYTc0M2Y0MmFiNzcwZmZhZjFhNTIyMjcxZDI5OTQ4NDhjNjk2YWMwYTEwN2Q2YTg5MjI3","ownedBy":"creator","status":"active","actorId":"Y2lzY29zcGFyazovL3VzL1BFT1BMRS8yMGU0YzMwYi0wMzM0LTQwYTctOTBjMi05YmQ4N2JkYzBjYjI","data":{"id":"Y2lzY29zcGFyazovL3VzL01FTUJFUlNISVAvOGI1Mzg3NTMtYWFhZS00MjViLTlhMGUtYWJhZjI1MzgzMmRjOjFmMTc5MzUwLTNhZTMtMTFlZS04ODQ2LTMzNmYwM2VmYjM1Mw","roomId":"Y2lzY29zcGFyazovL3VzL1JPT00vMWYxNzkzNTAtM2FlMy0xMWVlLTg4NDYtMzM2ZjAzZWZiMzUz","roomType":"group","personId":"Y2lzY29zcGFyazovL3VzL1BFT1BMRS84YjUzODc1My1hYWFlLTQyNWItOWEwZS1hYmFmMjUzODMyZGM","personEmail":"krs3@schiffert.me","created":"2023-08-14T20:42:45.158Z","personDisplayName":"my,newest,display,name","personOrgId":"Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi9jZTg2MWZiYS02ZTJmLTQ5ZjktOWE4NC1iMzU0MDA4ZmFjOWU","isModerator":"false","isMonitor":"false","isRoomHidden":"false","created":"2023-08-14T20:42:45.158Z"}}'
const mess = '{"id":"Y2lzY29zcGFyazovL3VzL1dFQkhPT0svNWNjYTI5YjktNTBjOC00MTcxLTkxZTAtZDY1MzUzNGFkZTM1","resource":"messages","type":"created","name":"messageCreated","targetUrl":"http://api.webhookinbox.com/i/kkxIei9A/in/","orgId":"Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi9jZTg2MWZiYS02ZTJmLTQ5ZjktOWE4NC1iMzU0MDA4ZmFjOWU","createdBy":"Y2lzY29zcGFyazovL3VzL1BFT1BMRS84YjUzODc1My1hYWFlLTQyNWItOWEwZS1hYmFmMjUzODMyZGM","appId":"Y2lzY29zcGFyazovL3VzL0FQUExJQ0FUSU9OL0NmMzkyNWU5NDFmMzhhYTc0M2Y0MmFiNzcwZmZhZjFhNTIyMjcxZDI5OTQ4NDhjNjk2YWMwYTEwN2Q2YTg5MjI3","ownedBy":"creator","status":"active","actorId":"Y2lzY29zcGFyazovL3VzL1BFT1BMRS8yMGU0YzMwYi0wMzM0LTQwYTctOTBjMi05YmQ4N2JkYzBjYjI","data":{"id":"Y2lzY29zcGFyazovL3VzL01FU1NBR0UvNjNhYTMwODAtM2FkZi0xMWVlLWIyZWMtNDNlNDQ4MDk2MmI3","roomId":"Y2lzY29zcGFyazovL3VzL1JPT00vNmI3ZDlkZjAtZGNkNi0zNDllLTk2NmEtNThhNDEyNWRhZjM0","roomType":"direct","personId":"Y2lzY29zcGFyazovL3VzL1BFT1BMRS8yMGU0YzMwYi0wMzM0LTQwYTctOTBjMi05YmQ4N2JkYzBjYjI","personEmail":"raschiff@cisco.com","created":"2023-08-14T20:16:01.928Z"}}'
//pass in your credentials to create an https server
const port = 8443
var httpsServer = https.createServer(credentials);
httpsServer.listen(port);
httpsServer.on('listening', () => console.log('server is listening on port ' + port))

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
    server: httpsServer
});


function sendEvents (ws) {
    for (let i = 0; i < loop; i++) {
        if (Math.random() < 0.5) {
            ws.send(mem)
        } else {
            ws.send(mess)
        }
    }
}

wss.on('connection', function connection(ws) {
    console.log('someone connects')
	sendEvents(ws)
	ws.close()
    ws.on('message', function incoming(message) {
        console.log('someone sends message')
        console.log('received: %s', message);
    //    sendEvents(ws);
//	ws.close()
    });

    ws.send('something');
});
