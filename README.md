# FixItNow 🔧
**Your Trusted Home Service Platform**

Backend REST API for a home services marketplace — customers book technicians for plumbing, electrical, cleaning, painting, and more.

## Tech Stack
- Node.js + Express (TypeScript)
- PostgreSQL + Prisma ORM (multi-file schema)
- JWT Authentication
- SSLCommerz Payment Gateway
- bcrypt password hashing

## Setup

\`\`\`bash
git clone <repo-url>
cd L2PH-Assignment-04
npm install
cp .env.example .env   # fill in your own values
npx prisma generate
npx prisma migrate dev
npm run dev
\`\`\`

## Roles
- **Customer** — browse, book, pay, review
- **Technician** — manage profile, services, availability, bookings
- **Admin** — manage users, categories, view all bookings

## Booking Status Flow
\`\`\`
REQUESTED → ACCEPTED/DECLINED → PAID → IN_PROGRESS → COMPLETED
(Customer can cancel anytime before IN_PROGRESS)
\`\`\`

## API Endpoints

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/me | Authenticated |

### Technicians & Services (Public)
| Method | Endpoint |
|--------|----------|
| GET | /api/technicians |
| GET | /api/technicians/:id |
| GET | /api/services |
| GET | /api/categories |

### Technician
| Method | Endpoint | Access |
|--------|----------|--------|
| GET/PUT | /api/technician/profile | Technician |
| POST/PUT | /api/services | Technician |
| GET | /api/technician/bookings | Technician |
| PATCH | /api/technician/bookings/:id | Technician |

### Bookings
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/bookings | Customer |
| GET | /api/bookings | Authenticated |
| GET | /api/bookings/:id | Authenticated |
| PATCH | /api/bookings/:id/cancel | Customer |

### Payments (SSLCommerz)
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/payments/create | Customer |
| GET/POST | /api/payments/confirm | Callback |
| GET | /api/payments | Authenticated |
| GET | /api/payments/:id | Authenticated |

### Reviews
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/reviews | Customer |

### Admin
| Method | Endpoint |
|--------|----------|
| GET | /api/admin/users |
| PATCH | /api/admin/users/:id |
| GET | /api/admin/bookings |
| POST | /api/admin/categories |

## Author
Mohiuddin