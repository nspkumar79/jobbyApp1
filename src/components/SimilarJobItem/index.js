import {AiFillStar} from 'react-icons/ai'
import {IoIosBriefcase} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
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
    <li className="similar-job-card-container">
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
      <div className="description-container">
        <h1 className="description-title">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
      <div className="similar-location-type-container">
        <div className="similar-location-container">
          <MdLocationOn className="location-logo" />
          <p className="location">{location}</p>
        </div>
        <div className="similar-employment-container">
          <IoIosBriefcase className="bag" />
          <p className="type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
