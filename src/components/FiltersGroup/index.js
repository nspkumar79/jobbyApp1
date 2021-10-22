import {Component} from 'react'
import './index.css'

class FiltersGroup extends Component {
  state = {
    employmentCheckboxList: {
      FULLTIME: false,
      PARTIME: false,
      FREELANCE: false,
      INTERNSHIP: false,
    },
  }

  renderSalaryFilterList = () => {
    const {salaryRangesList, changeActivePackageId} = this.props

    const onChangedRadio = event => {
      changeActivePackageId(event.target.value)
    }

    return salaryRangesList.map(eachItem => (
      <li className="salary-list-item-container">
        <input
          id={eachItem.salaryRangeId}
          type="radio"
          name="salary"
          value={eachItem.salaryRangeId}
          className="radio"
          onChange={onChangedRadio}
        />
        <label className="radioLabel" htmlFor={eachItem.salaryRangeId}>
          {eachItem.label}
        </label>
      </li>
    ))
  }

  renderSalaryFilter = () => (
    <>
      <h1 className="salary-heading">Salary Range</h1>
      <ul className="salary-list">{this.renderSalaryFilterList()}</ul>
    </>
  )

  renderEmploymentFilterList = () => {
    const {
      employmentTypesList,
      changeActiveEmploymentId,
      activeEmploymentId,
    } = this.props

    const onClickedCheckbox = event => {
      const {value, checked} = event.target
    }

    return employmentTypesList.map(eachItem => (
      <li className="employment-list-item-container">
        <input
          id={eachItem.employmentTypeId}
          type="checkbox"
          className="checkbox"
          name={eachItem.employmentTypeId}
          value={eachItem.employmentTypeId}
        />
        <label className="checkboxLabel" htmlFor={eachItem.employmentTypeId}>
          {eachItem.label}
        </label>
      </li>
    ))
  }

  renderEmploymentFilter = () => (
    <>
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="employment-list">{this.renderEmploymentFilterList()}</ul>
    </>
  )

  render() {
    return (
      <div className="filters-group-container">
        {this.renderEmploymentFilter()}
        <hr className="hr-line" />
        {this.renderSalaryFilter()}
      </div>
    )
  }
}

export default FiltersGroup
