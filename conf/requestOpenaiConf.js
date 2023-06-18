const url = 'https://api.openai.com/v1/chat/completions';
const model = 'gpt-3.5-turbo';
const key = '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';
const httpsOpetions = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key,
        'OpenAI-Organization': 'org-TilyIozIjayrnMPU0zJUXX3m'
    },
    method: 'POST',
    timeout: 3000
};

module.exports = {
    url,
    model,
    httpsOpetions
}