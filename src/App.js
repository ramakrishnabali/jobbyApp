import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'

import Home from './components/Home'

import ProtectedRoute from './components/ProtectedRoute'

import NotFound from './components/NotFound'

import JobsRoute from './components/JobsRoute'

import JobItemDetails from './components/JobItemDetails'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={JobsRoute} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
