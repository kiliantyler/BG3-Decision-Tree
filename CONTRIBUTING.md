# Contributing to BG3 Decision Tree

Thank you for considering contributing to the BG3 Decision Tree project! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (e.g., screenshots, error messages)
- **Describe the behavior you observed and what you expected to see**
- **Include your browser and OS information**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **Include any relevant examples or mockups**

### Adding Game Decision Data

One of the most valuable ways to contribute is by adding or correcting game decision data:

1. Follow the data structure format in the README
2. Place new decisions in the appropriate act/location folder
3. Ensure all required fields are completed
4. Test your additions locally before submitting

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and ensure code quality
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 22.15.0+
- npm, yarn, pnpm, or bun

### Installation

1. Clone your fork of the repository
2. Install dependencies using your preferred package manager (see README.md)
3. Start the development server

## Style Guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

### JavaScript Style Guide

This project uses ESLint and Prettier for code formatting. Your code should:

- Follow the existing code style
- Pass ESLint checks (`npm run lint`)
- Use meaningful variable and function names
- Include comments for complex logic

### Documentation Style Guide

- Use Markdown for documentation
- Reference code with backticks (`)
- Use headers and lists for organization
- Include examples where helpful

## Additional Notes

### Issue and Pull Request Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `data`: Related to game decision data

## Thank You

Your contributions make this project better for everyone. We appreciate your time and effort!
