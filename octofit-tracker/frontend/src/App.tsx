import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="mb-4">Octofit Tracker</h1>
          <p className="lead mb-4">
            Track your fitness activities, compete with friends, and achieve your goals.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
              Get Started
            </button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
