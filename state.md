# SYNTRY BLACKBOARD: State Management & Logic Tracker

## MORTGAGE ENGINE TASK LIST
- [x] Phase 1: Planning & Implementation Review
- [ ] Phase 2: Next.js API Node (Asymmetric Ledger + 2FA Gate)
- [ ] Phase 3: Flutter Chassis (Split-Pane Dashboard)
- [ ] Phase 4: Automated Verification (Browser Node Test)
- [ ] Phase 5: Synthesis (Flutter into Next.js Production)

## API ENDPOINTS (PORT 3001)
| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/mortgage/summary` | GET | PENDING | Portfolio metrics (Principal, Yield, Node Stat) |
| `/api/mortgage/repay` | POST | PENDING | Process payment with Asymmetric Logic |
| `/api/security/totp/verify` | POST | ACTIVE | OTP verification for high-value Auth |

## "SAD PATH" EDGE CASES
- **LITIGATION_FLAG_08**: API must return `status: "dispute"` if Node 08 ground-truth fails. Repayment locked.
- **2FA_LOCKOUT**: Brute-force protection must activate after 3 failed tokens.
- **MOMO_TIMEOUT**: Payment state must persist as "pending" for manual reconciliation.
- **INSUFFICIENT_FUNDS**: Clear UI handling for failed credit checks.

---
*Created: April 1, 2026 • Verified by Syntry Central Command*
