-- Plots Table for Syntry Persistent Gold State
CREATE TABLE IF NOT EXISTS public.plots (
    id TEXT PRIMARY KEY,
    lng DECIMAL(10, 7) NOT NULL,
    lat DECIMAL(10, 7) NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'reserved', 'verified'
    value DECIMAL(12, 2) NOT NULL,
    stripe_payment_id TEXT, -- To link the transaction for audits
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups by payment ID
CREATE INDEX IF NOT EXISTS idx_plots_stripe_payment_id ON public.plots(stripe_payment_id);
