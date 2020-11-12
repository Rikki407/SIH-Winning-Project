var express = require('express');
var router = express.Router({ mergeParams: true });
let answers = [];
router.post('/user-chat', (req, res) => {
    if (req.body.answer) {
        let answer = req.body.answer;
        answers.push(answer);
        console.log(answer);
        return res.send('Message Recieved');
    } else {
        return res.send('Try Again');
    }
});
router.get('/answers', (req, res) => {
    return res.send(answers);
});

module.exports = router;
