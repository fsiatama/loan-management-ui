# Loan Management UI

## Description

The [loan-management-ui](https://github.com/fsiatama/loan-management-ui.git)  is the frontend of a robust loan management system, built using ReactJS and Ant Design Pro. This UI is designed to seamlessly interact with the backend API [loan-management-api](https://github.com/fsiatama/loan-management-api.git) to provide a user-friendly and responsive platform.

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Features

- Borrower management: Manages all information related to the borrowers.
- Loan management: Handles loan-related information.
- Payment tracking: Keeps track of all loan payments.
- PDF Statement generation: Provides detailed PDF statements for loan transactions.
- Concept management: Manages different transaction concepts.
- Payment history: Provides a detailed history of all loan payments.
- Loan payment projection: Provides future projections for loan payments.
- Overdue information: Provides information about overdue days for a loan.
- Dashboard: Presents monthly statistics of income, defaulting borrowers, and income per each configured concept.

## Getting Started

Clone the repository:
```bash
$ git clone https://github.com/fsiatama/loan-management-ui.git
$ cd loan-management-ui
```


Install `node_modules`:

```bash
$ npm install
```

or

```bash
$ yarn
```

## Provided Scripts

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
$ npm start
```

### Build project

```bash
$ npm run build
```

### Check code style

```bash
$ npm run lint
```

You can also use script to auto fix some lint error:

```bash
$ npm run lint:fix
```

### Test code

```bash
$ npm test
```

## Deployment

Refer to the [loan-management-deployment](https://github.com/fsiatama/loan-management-deployment.git) repository for instructions on how to deploy the entire platform, including this backend API.

## Related Repositories

- [loan-management-deployment:](https://github.com/fsiatama/loan-management-deployment.git)  Contains the Docker Compose and Nginx configurations needed for deploying the loan management system.
- [loan-management-api:](https://github.com/fsiatama/loan-management-api.git) The backend API developed with NestJS, Prisma and MongoDB for managing loans.


## Experience with Ant Design Pro

While using Ant Design Pro expedited the development process, it posed some challenges when it came to customizing the design and deploying to production. Ant Design Pro provides a rich set of components that save time in development, but these components come with a pre-defined look and feel that isn't easy to customize to match unique design requirements.

Additionally, the process of deploying an Ant Design Pro application to production was more complicated than initially anticipated. Therefore, developers considering Ant Design Pro for their projects should be aware of these potential challenges.

For any additional information or queries, feel free to open an issue.

