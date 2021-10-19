import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import Profile from '../Profile'
import SearchFilter from '../SearchFilter'

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
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
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
            <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
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
        return this.renderProductsListView()
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
        onClick={retryProfileClicked}
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

  render() {
    const {searchInput} = this.state
    return (
      <div className="all-jobs-section">
        <div className="search-container-mobile">
          <SearchFilter
            searchInput={searchInput}
            changeSearchInput={this.changeSearchInput}
            enterSearchInput={this.enterSearchInput}
          />
        </div>
        <div className="user-filter-container">
          {this.renderProfile()}
          <FiltersGroup />
        </div>
        <div className="jobs-container">
          <div className="search-container-large">
            <SearchFilter />
          </div>
          {this.renderAllJobs()}
        </div>
      </div>
    )
  }
}

export default AllJobsSection
