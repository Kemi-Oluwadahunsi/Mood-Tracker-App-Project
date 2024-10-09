import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-100 dark:bg-red-900">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-800 dark:text-red-200 mb-4">
              Oops! Something went wrong.
            </h1>
            <p className="text-lg text-red-600 dark:text-red-300">
              We&apos;re sorry for the inconvenience. Please check the developer
              console for details.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
