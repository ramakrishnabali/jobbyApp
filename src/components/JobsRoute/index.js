import {Component} from 'react'
import {BiSearch} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Profile from '../Profile'

import Header from '../Header'

import FilterRoute from '../FilterRoute'

import JobsDetails from '../JobsDetails'

import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobsRoute extends Component {
  state = {
    status: apiStatus.inProgress,
    inputSearch: '',
    employmentType: [],
    salaryRange: '',
    jobList: [],
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    const {inputSearch, employmentType, salaryRange} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const typeOfEmployment = employmentType.join(',')
    //  console.log(employmentType)

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${typeOfEmployment}&minimum_package=${salaryRange}&search=${inputSearch}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    //  console.log(response)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({status: apiStatus.success, jobList: updatedData})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="80" width="80" />
    </div>
  )

  renderNoJobs = () => (
    <div className="jobs-failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-description">
        We could not find any jobs.Try other filters.
      </p>
    </div>
  )

  renderJobs = () => {
    const {jobList} = this.state

    const lengthOfJobs = jobList.length

    if (lengthOfJobs === 0) {
      return this.renderNoJobs()
    }

    return (
      <ul className="job-list-container">
        {jobList.map(each => (
          <JobsDetails key={each.id} job={each} />
        ))}
      </ul>
    )
  }

  getSearchResult = () => {
    this.getJobsDetails()
  }

  renderFailure = () => (
    <div className="jobs-failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page your are looking for.
      </p>
      <button
        type="button"
        className="jobs-retry-button"
        onClick={this.getSearchResult}
      >
        Retry
      </button>
    </div>
  )

  getJobsStatus = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.inProgress:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderJobs()
      case apiStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  salaryRange = salary => {
    this.setState({salaryRange: salary}, this.getJobsDetails)
  }

  employmentType = event => {
    if (event.target.checked) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.value],
        }),
        this.getJobsDetails,
      )
    } else {
      this.setState(
        prevState => ({
          employmentType: prevState.employmentType.filter(
            each => each !== event.target.value,
          ),
        }),
        this.getJobsDetails,
      )
    }
  }

  searchedInput = event => {
    this.setState({inputSearch: event.target.value})
  }

  searchKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobsDetails()
    }
  }

  render() {
    const {inputSearch} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="search-mobile-container">
            <input
              onKeyDown={this.searchKeyDown}
              onChange={this.searchedInput}
              value={inputSearch}
              placeholder="Search"
              type="search"
              className="search-input"
            />
            <button
              onClick={this.getSearchResult}
              type="button"
              className="search-icon"
              data-testid="searchButton"
            >
              <BiSearch />
            </button>
          </div>
          <div className="left-container">
            <Profile />
            <hr className="hr-line" />
            <FilterRoute
              employmentType={this.employmentType}
              salaryRange={this.salaryRange}
            />
          </div>

          <div className="right-container">
            <div className="search-container">
              <input
                onKeyDown={this.searchKeyDown}
                onChange={this.searchedInput}
                value={inputSearch}
                placeholder="Search"
                type="search"
                className="search-input"
              />
              <button
                onClick={this.getSearchResult}
                type="button"
                className="search-icon"
                data-testid="searchButton"
              >
                <BiSearch />
              </button>
            </div>
            {this.getJobsStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
