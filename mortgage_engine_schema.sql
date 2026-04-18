
-- Core Mortgage & Co-Lending Infrastructure

-- 1. Mortgage Contracts (The Master Agreement)
CREATE TABLE IF NOT EXISTS public.mortgages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plot_id TEXT REFERENCES public.plots(id),
    borrower_id UUID, -- References auth.users(id)
    total_principal DECIMAL(12, 2) NOT NULL, -- Original amount borrowed
    remaining_principal DECIMAL(12, 2) NOT NULL,
    interest_rate_annual DECIMAL(5, 2) NOT NULL, -- e.g. 18.50
    start_date TIMESTAMPTZ DEFAULT NOW(),
    maturity_date TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'active', -- 'active', 'delinquent', 'closed'
    absa_share_percent DECIMAL(5, 2) DEFAULT 70.00, -- Absa's senior portion
    investor_share_percent DECIMAL(5, 2) DEFAULT 30.00, -- Syntry Investors' junior portion
    collateral_status TEXT DEFAULT 'green', -- 'green', 'caution', 'red'
    last_collateral_check TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Asymmetric Ledger (Transactions & Distributions)
CREATE TABLE IF NOT EXISTS public.mortgage_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mortgage_id UUID REFERENCES public.mortgages(id),
    amount_paid DECIMAL(12, 2) NOT NULL,
    interest_paid_absa DECIMAL(12, 2) NOT NULL,
    interest_paid_investors DECIMAL(12, 2) NOT NULL,
    principal_applied DECIMAL(12, 2) NOT NULL,
    payment_date TIMESTAMPTZ DEFAULT NOW(),
    transaction_hash TEXT -- Blockchain/Bank reference
);

-- 3. Investor Wallets (For Yield Disbursements)
CREATE TABLE IF NOT EXISTS public.investor_wallets (
    user_id UUID PRIMARY KEY,
    balance_ghs DECIMAL(12, 2) DEFAULT 0.00,
    total_yield_earned DECIMAL(12, 2) DEFAULT 0.00,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Collateral Registry Filings (Regulatory Track)
CREATE TABLE IF NOT EXISTS public.collateral_filings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mortgage_id UUID REFERENCES public.mortgages(id),
    registry_number TEXT, -- Ghana Act 1052 reference
    filing_status TEXT DEFAULT 'pending', -- 'pending', 'filed', 'confirmed'
    filing_response JSONB,
    filed_at TIMESTAMPTZ
);
