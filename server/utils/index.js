module.exports = {
    decodeQuery(url) {
        const params = {};
        const paramsStr = url.replace(/(\S*)\?/, ''); //a=1&b=2 
        paramsStr.split('&').map(v => {
            const d = v.split('=');
            if (d[1] && d[0]) {
                params[d[0]] = d[1];
            }
        });
        return params;
    }
}