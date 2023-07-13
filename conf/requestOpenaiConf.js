const url = 'https://api.openai.com/v1/chat/completions';
const model = 'gpt-3.5-turbo';
const key = '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';
const httpsOpetions = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key,
    },
    method: 'POST',
    timeout: 3000
};

module.exports = {
    url,
    model,
    httpsOpetions
}