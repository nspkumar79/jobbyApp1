import {AiFillStar} from 'react-icons/ai'
import {IoIosBriefcase} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob
  return (
    <li className="job-card-container">
      <div className="card-logo-title-container">
        <img src={companyLogoUrl} alt="" className="company-logo" />
        <div className="title-container">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="location-type-package-container">
        <div className="location-type-container">
          <div className="location-container">
            <MdLocationOn className="location-logo" />
            <p className="location">{location}</p>
          </div>
          <div className="employment-type-container">
            <IoIosBriefcase className="bag" />
            <p className="type">{employmentType}</p>
          </div>
        </div>
        <div className="package-container">
          <p className="package">{packagePerAnnum}</p>
        </div>
      </div>
      <hr className="hr-line" />
      <div className="description-container">
        <h1 className="description-title">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
    </li>
  )
}

export default JobCard
