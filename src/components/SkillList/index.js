import './index.css'

const SkillList = props => {
  const {eachSkill} = props
  const {skillImageUrl, name} = eachSkill

  return (
    <li className="skill-list-item">
      <img src={skillImageUrl} alt={name} className="skill-image" />
      <p className="skill-name">{eachSkill.name}</p>
    </li>
  )
}

export default SkillList
