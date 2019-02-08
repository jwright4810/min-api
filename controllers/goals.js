const handleSubmitGoals = (req, res, db) => {
  const {id, goalList} = req.body
  let sixGoalArr= [
      {title:"", desc:"", icon:""},
      {title:"", desc:"", icon:""},
      {title:"", desc:"", icon:""},
      {title:"", desc:"", icon:""},
      {title:"", desc:"", icon:""},
      {title:"", desc:"", icon:""}
    ]
  
    goalList.forEach((el, i) => {
      sixGoalArr.splice(i, 1, el);
    })

  db('user_profile')
    .returning('*')
    .where({id: id})
    .update({
      goal_1: sixGoalArr[0].title,
      goal_1_desc: sixGoalArr[0].desc,
      goal_1_icon: sixGoalArr[0].icon,
      goal_2: sixGoalArr[1].title,
      goal_2_desc: sixGoalArr[1].desc,
      goal_2_icon: sixGoalArr[1].icon, 
      goal_3: sixGoalArr[2].title,
      goal_3_desc: sixGoalArr[2].desc,
      goal_3_icon: sixGoalArr[2].icon,
      goal_4: sixGoalArr[3].title,
      goal_4_desc: sixGoalArr[3].desc,
      goal_4_icon: sixGoalArr[3].icon,
      goal_5: sixGoalArr[4].title,
      goal_5_desc: sixGoalArr[4].desc,
      goal_5_icon: sixGoalArr[4].icon, 
      goal_6: sixGoalArr[5].title,
      goal_6_desc: sixGoalArr[5].desc,
      goal_6_icon: sixGoalArr[5].icon,    
    })
    .then(data => res.json(data[0]))
    .catch(err => res.status(400).json(err))
} 

module.exports = {
  handleSubmitGoals: handleSubmitGoals
}