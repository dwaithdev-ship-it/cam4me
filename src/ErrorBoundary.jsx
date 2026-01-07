import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo })
    console.error('ErrorBoundary caught error:', error, errorInfo)
  }

  render() {
    const { error, errorInfo } = this.state
    if (error) {
      return (
        <div style={{ padding: 24, color: '#fff', background: '#111', minHeight: '100vh' }}>
          <h2 style={{ color: '#ff6666' }}>Something went wrong</h2>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#fff' }}>{error && error.toString()}</pre>
          {errorInfo && <details style={{ whiteSpace: 'pre-wrap' }}>{errorInfo.componentStack}</details>}
          <div style={{ marginTop: 16 }}>
            <button onClick={() => window.location.reload()} style={{ padding: '8px 12px' }}>Reload</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
