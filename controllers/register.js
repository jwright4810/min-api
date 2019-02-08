
const handleRegister = (req, res, db, bcrypt, date) => {
    const { email, name, password} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password);
    const goalStart = date().format('L');
    const goalEnd = date().add(30, 'days').format('L')
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('user_profile')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                goal_start: goalStart,
                goal_end: goalEnd
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
};