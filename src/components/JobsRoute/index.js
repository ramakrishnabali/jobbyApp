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
    employmentType: '',
    salaryRange: '',
    jobList: [],
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    const {inputSearch, employmentType, salaryRange} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${inputSearch}`
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

  renderJobs = () => {
    const {jobList} = this.state

    return (
      <ul className="job-list-container">
        {jobList.map(each => (
          <JobsDetails key={each.id} job={each} />
        ))}
      </ul>
    )
  }

  getJobsStatus = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.inProgress:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderJobs()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="left-container">
            <Profile />
            <hr className="hr-line" />
            <FilterRoute />
          </div>

          <div className="right-container">
            <div className="search-container">
              <input
                placeholder="Search"
                type="search"
                className="search-input"
              />
              <div className="search-icon">
                <BiSearch />
              </div>
            </div>
            {this.getJobsStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
