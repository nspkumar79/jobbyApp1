import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import Profile from '../Profile'
import SearchFilter from '../SearchFilter'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    profileData: {},
    apiStatus: apiStatusConstants.initial,
    apiProfileStatus: apiStatusConstants.initial,
    activeEmploymentId: '',
    activePackageId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({
      apiProfileStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedProfileData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedProfileData,
        apiProfileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiProfileStatus: apiStatusConstants.failure,
      })
    }
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, activeEmploymentId, activePackageId} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentId}&minimum_package=${activePackageId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
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
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  enterSearchInput = () => {
    this.getJobs()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0
    return shouldShowJobsList ? (
      <ul className="job-items-list-container">
        {jobsList.map(eachJob => (
          <JobCard eachJob={eachJob} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => {
    const retryJobClicked = () => {
      this.getJobs()
    }
    return (
      <div className="jobs-error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="jobs-failure-img"
        />
        <h1 className="jobs-failure-heading-text">
          Oops! Something Went Wrong
        </h1>
        <p className="jobs-failure-description">
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

  renderLoadingView = () => (
    <div className="jobs-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  retryProfileClicked = () => {
    this.getProfile()
  }

  renderProfileView = () => {
    const {profileData} = this.state
    return <Profile profileData={profileData} />
  }

  renderProfileFailureView = () => (
    <div className="Profile-error-view-container">
      <button
        type="button"
        className="retry-button-job"
        onClick={this.retryProfileClicked}
      >
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {apiProfileStatus} = this.state

    switch (apiProfileStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  changeActiveEmploymentId = value => {
    console.log(value)
    this.setState({activeEmploymentId: value})
  }

  changeActivePackageId = activePackageId => {
    this.setState({activePackageId}, this.getJobs)
  }

  render() {
    const {searchInput, activeEmploymentId} = this.state

    return (
      <div className="all-jobs-section">
        <div className="all-jobs-responsive-container">
          <div className="search-container-mobile">
            <SearchFilter
              searchInput={searchInput}
              changeSearchInput={this.changeSearchInput}
              enterSearchInput={this.enterSearchInput}
            />
          </div>
          <div className="user-filter-container">
            {this.renderProfile()}
            <hr className="hr-line" />
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeActivePackageId={this.changeActivePackageId}
              activeEmploymentId={activeEmploymentId}
              changeActiveEmploymentId={this.changeActiveEmploymentId}
            />
          </div>
          <div className="jobs-container">
            <div className="search-container-large">
              <SearchFilter
                searchInput={searchInput}
                changeSearchInput={this.changeSearchInput}
                enterSearchInput={this.enterSearchInput}
              />
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default AllJobsSection
