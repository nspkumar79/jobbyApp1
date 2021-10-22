import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {IoIosBriefcase} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {FaExternalLinkAlt} from 'react-icons/fa'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    skillData: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.job_details.company_logo_url,
    companyWebsiteUrl: data.job_details.company_website_url,
    employmentType: data.job_details.employment_type,
    jobDescription: data.job_details.job_description,
    location: data.job_details.location,
    packagePerAnnum: data.job_details.package_per_annum,
    rating: data.job_details.rating,
    title: data.job_details.title,
    id: data.job_details.id,
    lifeAtCompanyDescription: data.job_details.life_at_company.description,
    lifeAtCompanyImageUrl: data.job_details.life_at_company.image_url,
  })

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedJobDetails = this.getFormattedData(fetchedData)
      const updatedSkillData = fetchedData.job_details.skills.map(skill => ({
        name: skill.name,
        skillImageUrl: skill.image_url,
      }))
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
        id: job.id,
      }))
      this.setState({
        jobData: updatedJobDetails,
        skillData: updatedSkillData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsView = () => {
    const {jobData, skillData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
    } = jobData

    return (
      <div className="job-card-container">
        <div className="responsive-job-card-container">
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
            <div className="description-header-container">
              <h1 className="description-title">Description</h1>
              <div className="description-link-container">
                <a
                  rel="noreferrer"
                  className="visit-link"
                  href={companyWebsiteUrl}
                  target="_blank"
                >
                  Visit
                </a>
                <FaExternalLinkAlt className="external-link-logo" />
              </div>
            </div>
            <p className="description">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="skill-heading">Skills</h1>
            <ul className="skills-item-container">
              {skillData.map(eachSkill => (
                <li className="skill-list-item">
                  <img
                    src={eachSkill.skillImageUrl}
                    alt=""
                    className="skill-image"
                  />
                  <p className="skill-name">{eachSkill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-container">
            <h1 className="life-heading">Life at Company</h1>
            <div className="life-item-container">
              <div className="life-description-container">
                <p className="life-description">{lifeAtCompanyDescription}</p>
              </div>
              <div className="life-image-container">
                <img
                  src={lifeAtCompanyImageUrl}
                  alt=""
                  className="life-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="job-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    const retryJobClicked = () => {
      this.getJobData()
    }
    return (
      <div className="job-error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="job-failure-img"
        />
        <h1 className="job-failure-heading-text">Oops! Something Went Wrong</h1>
        <p className="job-failure-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="retry-button-job"
          onClick={retryJobClicked}
        >
          Retry
        </button>
      </div>
    )
  }

  renderJobItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {similarJobsData} = this.state
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobItemDetails()}
          <div className="similar-responsive-container">
            <h1 className="similar-heading">Similar Jobs</h1>
            <ul className="similar-job-items-list-container">
              {similarJobsData.map(eachJob => (
                <SimilarJobItem eachJob={eachJob} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
