import 'package:flutter/material.dart';
import 'package:framer_motion_flutter/framer_motion_flutter.dart'; // Suggestion for premium feel
import 'package:google_fonts/google_fonts.dart';

/**
 * Task 4: UI/UX for the Mobile Flutter Dashboard
 * Design a 'Flexi-Pay' dashboard for the borrower.
 * Includes: Yield Countdown, Equity Growth, and 3D Ground-Truth View.
 */

class FlexiPayDashboard extends StatefulWidget {
  @override
  _FlexiPayDashboardState createState() => _FlexiPayDashboardState();
}

class _FlexiPayDashboardState extends State<FlexiPayDashboard> {
  // Mock Data
  double currentEquity = 0.45; // 45% Equity
  double principalBalance = 85200.00;
  int daysUntilInvestorCheck = 18;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0D1B2A), // Syntry Navy
      body: CustomScrollView(
        slivers: [
          _buildSliverHeader(),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildEquityGauge(),
                  SizedBox(height: 32),
                  _buildYieldCountdown(),
                  SizedBox(height: 32),
                  _buildGroundTruthMap(),
                  SizedBox(height: 48),
                  _buildFlexiPaymentAction(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSliverHeader() {
    return SliverAppBar(
      expandedHeight: 200.0,
      backgroundColor: Color(0xFF0D1B2A),
      pinned: true,
      flexibleSpace: FlexibleSpaceBar(
        titlePadding: EdgeInsets.only(left: 24, bottom: 16),
        title: Text(
          "MORTGAGE: SYN-VLT-08",
          style: GoogleFonts.bebasNeue(
            letterSpacing: 2,
            fontSize: 24,
            color: Colors.white,
          ),
        ),
        background: Stack(
          fit: StackFit.expand,
          children: [
            // Dark Gradient Simulation
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Color(0xFF162A3E), Color(0xFF0D1B2A)],
                ),
              ),
            ),
            // Pattern Overlay
            Positioned(
              right: -50,
              top: -50,
              child: Container(
                width: 200,
                height: 200,
                decoration: BoxDecoration(
                  color: Color(0xFFD4AF37).withOpacity(0.05),
                  shape: BoxShape.circle,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEquityGauge() {
    return Container(
      padding: EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Color(0xFF162A3E),
        borderRadius: BorderRadius.circular(32),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Current Equity Owned",
            style: GoogleFonts.dmSans(
              color: Colors.white.withOpacity(0.4),
              fontSize: 10,
              fontWeight: FontWeight.w900,
              letterSpacing: 1.5,
            ),
          ),
          SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "${(currentEquity * 100).toStringAsFixed(0)}%",
                style: GoogleFonts.bebasNeue(
                  fontSize: 56,
                  color: Color(0xFFB8FF3C), // Lime Green
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text("GH₵${principalBalance.toStringAsFixed(2)}", 
                    style: GoogleFonts.dmMono(color: Colors.white, fontSize: 16)),
                  Text("REMAINING", 
                    style: GoogleFonts.dmSans(color: Colors.white54, fontSize: 10, fontWeight: FontWeight.bold)),
                ],
              ),
            ],
          ),
          SizedBox(height: 20),
          LinearProgressIndicator(
            value: currentEquity,
            backgroundColor: Colors.white.withOpacity(0.05),
            color: Color(0xFFD4AF37), // Gold
            minHeight: 12,
            borderRadius: BorderRadius.circular(6),
          ),
        ],
      ),
    );
  }

  Widget _buildYieldCountdown() {
    return Row(
      children: [
        Expanded(
          child: Container(
            padding: EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.2),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Colors.white.withOpacity(0.05)),
            ),
            child: Column(
              children: [
                Text("$daysUntilInvestorCheck DAYS", 
                  style: GoogleFonts.bebasNeue(fontSize: 32, color: Colors.white)),
                Text("UNTIL NEXT INVESTOR CHECK", 
                  textAlign: TextAlign.center,
                  style: GoogleFonts.dmSans(fontSize: 8, color: Colors.white54, fontWeight: FontWeight.bold, letterSpacing: 1)),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildGroundTruthMap() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
           mainAxisAlignment: MainAxisAlignment.spaceBetween,
           children: [
              Text("GROUND TRUTH: ACTIVE", style: GoogleFonts.dmSans(fontSize: 10, color: Color(0xFF2DD4BF), fontWeight: FontWeight.bold, letterSpacing: 2)),
              Container(
                 padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                 decoration: BoxDecoration(color: Color(0xFF2DD4BF).withOpacity(0.1), borderRadius: BorderRadius.circular(50)),
                 child: Text("NODE 08: VERIFIED", style: GoogleFonts.dmSans(fontSize: 8, color: Color(0xFF2DD4BF), fontWeight: FontWeight.bold)),
              ),
           ],
        ),
        SizedBox(height: 16),
        Container(
          height: 240,
          width: double.infinity,
          decoration: BoxDecoration(
            color: Colors.black,
            borderRadius: BorderRadius.circular(32),
            image: DecorationImage(
              image: NetworkImage("https://images.unsplash.com/photo-1544627196-8561ecadfa00?auto=format&fit=crop&w=400&q=80"),
              fit: BoxFit.cover,
              opacity: 0.4,
              colorFilter: ColorFilter.mode(Colors.blueGrey, BlendMode.multiply),
            ),
          ),
          child: Center(
            child: Container(
               padding: EdgeInsets.all(16),
               decoration: BoxDecoration(color: Color(0xFF0D1B2A).withOpacity(0.8), shape: BoxShape.circle, border: Border.all(color: Color(0xFFD4AF37).withOpacity(0.5))),
               child: Icon(Icons.satellite_alt, color: Color(0xFFD4AF37), size: 24),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildFlexiPaymentAction() {
    return Column(
      children: [
        TextFormField(
           initialValue: "1,500.00",
           style: GoogleFonts.dmMono(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold),
           textAlign: TextAlign.center,
           decoration: InputDecoration(
              prefixText: "GH₵ ",
              prefixStyle: GoogleFonts.dmMono(color: Colors.white54, fontSize: 18),
              border: InputBorder.none,
           ),
        ),
        SizedBox(height: 24),
        Container(
          width: double.infinity,
          height: 72,
          child: ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: Color(0xFFD4AF37),
              foregroundColor: Color(0xFF0D1B2A),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
              elevation: 20,
              shadowColor: Color(0xFFD4AF37).withOpacity(0.3),
            ),
            child: Text("PROCESS FLEXI-PAYMENT", 
              style: GoogleFonts.dmSans(fontWeight: FontWeight.w900, letterSpacing: 2, fontSize: 12)),
          ),
        ),
        SizedBox(height: 16),
        Text("Principal Reduction + Interest Distribution Automated", 
          style: GoogleFonts.dmSans(fontSize: 8, color: Colors.white24, fontWeight: FontWeight.bold, letterSpacing: 1)),
      ],
    );
  }
}
