const https = require('node:https');
const { Transform, pipeline } = require('node:stream');
const config = require('../conf/requestOpenaiConf.js');

const pattern = /{.*}/g;

const constructJson = (messages) => JSON.stringify({
    model: config.model,
    messages: messages,
    stream: true
})

// parse openai api response messages
const parseSnippets = new Transform({
    decodeStrings: false,
    transform(chunk, _, callback) {
        let snippets = chunk.match(pattern);
        if (snippets == null) return;
        for (let snippet of snippets) {
            snippet = JSON.parse(snippet);
            snippet = snippet.choices[0].delta.content
            if (snippet == undefined) continue;
            this.push(snippet);
        }
        callback(); // next
    }
})

const requestOpenaiChat = (reqClient, resClient) => {
    console.log('Request openai api...');
    const body = reqClient.body;

    const data = constructJson(body.messages);

    const reqOpenAi = https.request(config.url, config.httpsOpetions, resOpenai => {
        console.log(resOpenai.statusCode);
        resOpenai.setEncoding('utf-8');
        resClient.on('close', () => resClient.end());
        pipeline(
            resOpenai,
            parseSnippets,
            resClient,
            error => console.error(error)
        );
    })
    reqOpenAi.on('error', (error) => {
        console.error(error);
        if (error.errno == -4039) resClient.status(500).send({
            message: "Service connect ETIMEDOUT https://api.openai.com"
        });
    });
    reqOpenAi.write(data);
    reqOpenAi.end();
}

module.exports = requestOpenaiChat