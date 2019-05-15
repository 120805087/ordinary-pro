function getFakeCaptcha(req, res) {
    return res.json('captcha-xxx');
}

export default {
    'POST /api/login/account': (req, res) => {
        const { password, userName, type } = req.body;
        if (password === 'admin123' && userName === 'admin') {
            res.send({
                status: 'ok',
                type,
                currentAuthority: 'guest'
            });
            return;
        }
        return res.send({
            status: 'error',
            type
        })
    },
    'GET /api/captcha': getFakeCaptcha,
    'POST /api/register': (req, res) => {
        res.send({
            status: 'ok'
        })
    }
}
