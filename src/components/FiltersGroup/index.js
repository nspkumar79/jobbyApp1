import './index.css'

const FiltersGroup = props => {
  const renderSalaryFilterList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(eachItem => (
      <li className="salary-list-item-container">
        <input id={eachItem.salaryRangeId} type="radio" className="radio" />
        <label className="radioLabel" htmlFor={eachItem.salaryRangeId}>
          {eachItem.label}
        </label>
      </li>
    ))
  }

  const renderSalaryFilter = () => (
    <>
      <h1 className="salary-heading">Salary Range</h1>
      <ul className="salary-list">{renderSalaryFilterList()}</ul>
    </>
  )

  const renderEmploymentFilterList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachItem => (
      <li className="employment-list-item-container">
        <input
          id={eachItem.employmentTypeId}
          type="checkbox"
          className="checkbox"
        />
        <label className="checkboxLabel" htmlFor={eachItem.employmentTypeId}>
          {eachItem.label}
        </label>
      </li>
    ))
  }

  const renderEmploymentFilter = () => (
    <>
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="employment-list">{renderEmploymentFilterList()}</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      {renderEmploymentFilter()}
      <hr className="hr-line" />
      {renderSalaryFilter()}
    </div>
  )
}

export default FiltersGroup
