import { Component, ReactNode } from 'react'
import ErrorComponent from './ErrorComponent'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }
  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message }
  }
  public render() {
    if (this.state.hasError) {
      return <ErrorComponent message={this.state.message} />
    }
    return this.props.children
  }
}

export default ErrorBoundary
