
const setGoals = (req, res, db, date) => {
    db.select('*')
      .from('goalrange')
      .then(data => {
          const goalStart = date().format('L');
          const goalEnd = date().add(30, 'days').format('L')
        if(!data[0]) {
           db.returning('*')
            .insert({
              goalstart: goalStart,
              goalend: goalEnd   
            })
            .into('goalrange')
            .then(data => {
                res.json(data);
            })
            .catch(err => res.status(400).json('not working')); 
          } else {
              db('goalrange')
                .returning('*')
                .where({id: 4})
                .update('goalstart', goalStart)
                .update('goalend', goalEnd)
                .then(data => res.json(data[0]))
                .catch(err => res.status(400).json('not working'));
          }
      })
      .catch(err => res.status(400).json('not working'));

}

module.exports = {
  setGoals: setGoals
}