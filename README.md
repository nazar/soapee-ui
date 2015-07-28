# About

The ReactJS based front end for [Soapee](http://soapee.com), a Soap Lye calculator.

# Development Environment Provisioning

Please read the [Provisioning](./doc/provision.md) section for setting up the development environment.

# Linting

An [.eslintrc](./eslintrc) is provided for [ESLint](http://eslint.org/) but the eslint packages are not listed in [package.json](./package.json) as
  the eslint modules are required for the client machine (and not the development server).

To install JSX compatible ESLint modules:

```
npm install -g eslint eslint-plugin-react
```