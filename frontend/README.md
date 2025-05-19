# Gordon Gym Management System

**Created by: Yogesh Kumar 😎😎**

---

## Introduction

Gordon Gym Management System is a modern, full-featured web application for gym management, built using React, Vite, and Firebase. It provides separate dashboards for Admin and Members, with modules for member management, trainers, billing, diet plans, notifications, supplements, and more. The project uses a single MainContext for all global state and data operations, making all functions reusable and maintainable.

---

## Project Structure



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



---

## MainContext (`MainCon.jsx`)

**MainContext** is the heart of the app. It provides all global state and reusable functions for fetching, updating, deleting, and notifying data throughout the app.  
**All data operations (fetch, update, delete, notify, etc.) are done via MainContext functions, making them reusable and consistent everywhere.**

### MainContext Functions & State

| Function/State                | Description                                                                                  |
|-------------------------------|---------------------------------------------------------------------------------------------|
| `user`, `SetUser`             | Current logged-in user (admin or member)                                                    |
| `member`, `setMember`         | Current member's details                                                                    |
| `userUID`, `SetUserUID`       | Current user's UID from Firebase Auth                                                       |
| `admin`, `SetAdmin`           | Admin state                                                                                 |
| `MemberDetails`, `SetMemberDetails` | All members data                                                                  |
| `supplement`, `SetSupplement` | Generic array for storing fetched data (bills, trainers, etc. based on route)               |
| `notifications`, `setNotifications` | Notifications for admin/member                                                    |
| `Mydeits`, `SetMydeits`       | Member's diet plans                                                                        |
| `fetchDataFromDatabase(route)`| **Reusable:** Fetches data from any Firebase collection (e.g., 'bills', 'trainers', etc.)   |
| `fetchMemberData()`           | Fetches all members from Firebase                                                           |
| `fetchNotifications(uid)`     | Fetches notifications for a specific user/member                                            |
| `sendNotification(uid, msg)`  | Sends a notification to a member                                                            |
| `deleteUserFromdataBase(route, id)` | Deletes a record from any collection (e.g., trainers, members, etc.)             |
| `notify(msg, type)`           | Shows toast notification (success, error, etc.)                                             |
| `signInWithEmailPassword(email, pass)` | Authenticates admin using Firebase Auth                                      |
| ...and more                   | All functions are **reusable** and used everywhere via context                              |

**Note:**  
- No direct fetch or database calls in components; always use MainContext functions for all data operations.
- This makes the code DRY, maintainable, and easy to update.

---

## Main Routes & Pages

| Route/Path                        | Component/Page         | Description                                 |
|----------------------------------- |-----------------------|---------------------------------------------|
| `/`                               | Home                  | Public landing page                         |
| `/about`                          | About                 | About the gym                               |
| `/pricing`                        | Pricing               | Membership packages                         |
| `/our-team`                       | Ourteam               | Meet the trainers                           |
| `/cart`                           | Cart                  | Supplement cart                             |
| `/member-login`                   | MemberLogin           | Member login page                           |
| `/sign-up`                        | SignUp                | Member registration                         |
| `/admin/login`                    | AdminLogin            | Admin login (email/password, validation)    |
| `/admin`                          | AdminMain             | Admin dashboard layout (with sidebar/header)|
| `/admin` (default)                | Dashboard             | Admin dashboard (stats, charts, summary)    |
| `/admin/user-mangement/view-member`| ViewMember           | View all members                            |
| `/admin/user-mangement/update-member/:id`| UpdateMember     | Edit member details                         |
| `/admin/packages/add-package`      | AddPackages           | Add new package                             |
| `/admin/packages/view-package`     | Viewpackage           | View all packages                           |
| `/admin/packages/edit-package/:id` | Editpackage           | Edit package                                |
| `/admin/billing`                  | Billing               | Manage/view bills                           |
| `/admin/fee-packages`             | Packages              | Fee packages                                |
| `/admin/notifications`            | PushNotification      | Send notification to members                |
| `/admin/diet-plan`                | DietPlans             | Create/manage diet plans                    |
| `/admin/supplement-store/add-supplement`| AddSupplement    | Add supplement                              |
| `/admin/supplement-store/view-supplement`| ViewSupplement  | View supplements                            |
| `/admin/trainers/add-trainer`      | AddTrainers           | Add new trainer                             |
| `/admin/trainers/view-trainer`     | ViewTrainers          | View all trainers (edit/delete)             |
| `/admin/trainers/edit-trainer/:id` | EditTrainer           | Edit trainer details                        |
| `/admin/reports`                   | Reports               | View/export reports (PDF)                   |
| `/member`                          | MemberMain            | Member dashboard layout                     |
| `/member` (default)                | MemberHome            | Member dashboard (menu, trainer, etc.)      |
| `/member/profile`                  | Profile               | Member profile                              |
| `/member/supplements`              | SupplementStore       | Buy/view supplements                        |
| `/member/fee-receipt`              | FeeRecipt             | View/download fee receipts                  |
| `/member/my-diet`                  | Mydeits               | View diet plans by goal                     |
| `*`                                | Page404               | 404 Not Found                               |

---

## Main Components

- **Header.jsx (Admin/Member):**  
  Dynamic header with notification bell (shows red dot if unread), dropdown for notifications, and logout.

- **SideBar.jsx (Admin):**  
  Sidebar navigation for all admin routes.

- **StatsCard.jsx:**  
  Dashboard cards for stats (members, revenue, etc.).

- **PushNotification.jsx:**  
  Admin can select a member and send a notification (uses context function).

- **DietPlans.jsx / Mydeits.jsx:**  
  Admin creates diet plans for various goals; members can view their diet plan by selecting a goal.

- **AddTrainers.jsx / ViewTrainers.jsx / EditTrainer.jsx:**  
  Admin can add, view, edit, and delete trainers. Specialization is an array, and all fields are editable.

- **Reports.jsx:**  
  Shows all members and bills in tables, with a button to download both as a single PDF (uses `jspdf` and `jspdf-autotable`).

- **FeeRecipt.jsx:**  
  Members can view and download their fee receipts as PDF.

- **SupplementStore.jsx / AddSupplements.jsx / ViewSupplement.jsx:**  
  Manage and view supplements.

---

## Important Libraries Used

- **Firebase:**  
  Realtime Database & Authentication for all data and login.

- **react-chartjs-2 & chart.js:**  
  For dashboard charts (bar, pie).

- **jspdf & jspdf-autotable:**  
  For exporting reports as PDF.

- **react-router-dom:**  
  Routing for all pages.

- **react-icons:**  
  For beautiful icons.

- **Tailwind CSS:**  
  For responsive, modern UI.

---

## How Data Flows

- **All data operations** (fetch, update, delete, notify) use MainContext functions.
- **No direct fetch/database code** in components—always use context for consistency.
- **Notifications, bills, trainers, members, diet plans, supplements** are all stored in Firebase Realtime Database under their own collections.

---

## How to Run

1. Install dependencies:


2. Start the development server:


---

## Credits

Made with ❤️ by **Yogesh Kumar**