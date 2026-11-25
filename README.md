ShopKart -- Angular Ecommerce Application
ShopKart is a learning/demo ecommerce frontend built with Angular and
TypeScript. It demonstrates role-based login, dashboards, product
management, reusable UI components, REST API integration, search, and
pagination.
Project status: Learning/demo application. Authentication
currently uses hardcoded demo users and a dummy token. Do not use
these credentials or this authentication implementation in production.

1. Tech Stack
- Angular (standalone components)
- TypeScript
- HTML and CSS
- Angular Router
- Reactive Forms and FormsModule
- RxJS
- Angular HttpClient
- DummyJSON Products API
2. Run the Application
Prerequisites
- Node.js and npm
- Angular CLI
- Project dependencies installed
Install dependencies
From the project root:
npm install
Start the development server
ng serve
Open the application at:

http://localhost:4200

If your development server uses a different port, use the URL printed in
the terminal.
3. Demo Login Credentials
Use the following demo accounts:
  Role              Login URL                                Email                     Password
  Admin             http://localhost:4200/login/admin      admin@shopkart.com      Admin@123

  Customer          http://localhost:4200/login/customer   customer@shopkart.com   Customer@123
Seller            http://localhost:4200/login/seller     seller@shopkart.com     Seller@123
The login form also checks the role associated with the selected login
route.
4. Main Application URLs
  Page                 URL                     Access
  Admin login          /login/admin          Public
Customer login       /login/customer       Public
Seller login         /login/seller         Public
Admin dashboard      /admin/dashboard      Admin
Customer dashboard   /customer/dashboard   Customer
Seller dashboard     /seller/dashboard     Seller
Customer products    /customer/products    Customer

Example full URL for customer products:

http://localhost:4200/customer/products

Routes such as /orders and /customers are also present in the
current route configuration. Their access restrictions should be
reviewed before treating them as protected production pages.
5. Features
- Separate login routes for Admin, Customer, and Seller.
- Role-specific dashboard routes.
- Route protection using AuthGuard and RoleGuard.
- Shared Header, Sidebar, Footer, and Modal components.
- Reactive Forms for login and product forms.
- Product CRUD demonstration using local in-memory data.
- Product API integration using Angular HttpClient.
- Product search and pagination using DummyJSON.
- RxJS concepts including Subject, BehaviorSubject,
  debounceTime, distinctUntilChanged, and switchMap.
- HTTP interceptor demonstration for attaching a demo authorization
  token.
- Reactive current-user display in the shared Header.
6. Product API
The application uses the DummyJSON products API for demonstration:
- Product listing: https://dummyjson.com/products?limit=10
- Example second page:
  https://dummyjson.com/products?limit=10&skip=10
- Product search example:
  https://dummyjson.com/products/search?q=phone&limit=10&skip=0
Pagination uses: - limit: number of products per request. - skip:
number of products to skip.

For example, with a page size of 10: - Page 1: skip=0 - Page 2:
skip=10 - Page 3: skip=20
7. Authentication Notes
The current AuthService uses hardcoded demo users. On successful
login, the application stores: - shopkart_user in sessionStorage -
access_token in sessionStorage

The access token is a dummy learning token, not a real JWT. The frontend
guards control client-side navigation only. A production application
must authenticate users through a backend and enforce authorization on
the server for every protected API/resource.
8. Project Structure
The project follows a feature-oriented structure. The main areas
include:
src/
└── app/
    ├── core/
    │   ├── guards/
    │   ├── interceptors/
    │   └── services/
    ├── pages/
    │   ├── auth/
    │   ├── customer/
    │   ├── seller/
    │   ├── products/
    │   ├── orders/
    │   └── customers/
    └── shared/
        └── components/
            ├── header/
            ├── sidebar/
            ├── footer/
            └── modal/
Actual filenames may differ slightly depending on the Angular
CLI-generated project structure.
9. Useful Commands
# Start development server
ng serve

# Build the application
ng build

# Run unit tests
ng test

# Generate a component
ng generate component component-name

# Generate a service
ng generate service service-name

# Generate a guard
ng generate guard guard-name
10. Known Demo Limitations / Next Improvements
- Replace hardcoded users with backend authentication.
- Replace the dummy token with a real authentication flow.
- Enforce role-based authorization on backend APIs.
- Persist product CRUD operations through a backend/database.
- Add automated unit and integration tests.
- Add production environment configuration and deployment setup.
- Review route protection for all pages, not only role-specific
  dashboards.
