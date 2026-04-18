import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:url_strategy/url_strategy.dart';
import 'package:geolocator/geolocator.dart';
import 'package:panorama_viewer/panorama_viewer.dart';
import 'dart:convert';
import 'dart:ui';
import 'dart:html' as html;

// Task 2: Production/Dev Base URL
const String baseUrl = bool.fromEnvironment('dart.vm.product') 
    ? 'https://syntry.co' 
    : 'http://localhost:3001';

void main() {
  setPathUrlStrategy();
  runApp(SyntryApp());
}

class SyntryApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Syntry Sovereign Dashboard',
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Color(0xFFD4AF37),
        canvasColor: Color(0xFF0D1B2A),
        scaffoldBackgroundColor: Color(0xFF0D1B2A),
        textTheme: GoogleFonts.dmSansTextTheme(Theme.of(context).textTheme),
      ),
      home: SyntryDashboard(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class SyntryDashboard extends StatefulWidget {
  @override
  _SyntryDashboardState createState() => _SyntryDashboardState();
}

class _SyntryDashboardState extends State<SyntryDashboard> with TickerProviderStateMixin {
  // Financial State
  double remainingBalance = 85200.00;
  double interestDue = 1250.00;
  double ownedEquity = 12.5; // Task 3: Portfolio Update State
  String scheduleDate = "MAY 01, 2026"; // 30 days from today (mock)
  
  String litigationStatus = 'verified'; 
  double lat = 5.6037;
  double lng = -0.1870;
  bool isLoading = true;

  // Ground-Truth State
  bool isSearching = false;
  bool isOnSite = false;
  bool isSimulatedOnSite = false;

  // UI Control
  bool showFlexiPayPanel = false;
  bool showDroneTour = false;

  @override
  void initState() {
    super.initState();
    fetchInitialData();
  }

  Future<void> fetchInitialData() async {
    try {
      final summaryRes = await http.get(Uri.parse('$baseUrl/api/mortgage/summary?userId=demo-user-123'));
      final nodeRes = await http.get(Uri.parse('$baseUrl/api/node08?plotId=SYN-VLT-08'));
      if (summaryRes.statusCode == 200 && nodeRes.statusCode == 200) {
        final summaryData = json.decode(summaryRes.body);
        final nodeData = json.decode(nodeRes.body);
        setState(() {
          remainingBalance = summaryData['remaining_balance']?.toDouble() ?? remainingBalance;
          interestDue = summaryData['interest_due']?.toDouble() ?? interestDue;
          litigationStatus = nodeData['status'] ?? litigationStatus;
          lat = nodeData['coordinates']?['lat']?.toDouble() ?? lat;
          lng = nodeData['coordinates']?['lng']?.toDouble() ?? lng;
          isLoading = false;
        });
      } else {
        setState(() => isLoading = false);
      }
    } catch (e) {
      setState(() => isLoading = false);
    }
  }

  Future<void> checkGeofence(double latitude, double longitude) async {
    double distance = Geolocator.distanceBetween(latitude, longitude, 5.6037, -0.1870);
    setState(() => isOnSite = distance < 5.0 || isSimulatedOnSite);
  }

  // Task 3: Transaction Finalized Handshake
  void finalizeAsymmetricTransaction(double amount) {
     setState(() {
        remainingBalance -= (amount - interestDue); // Just for UI update
        interestDue = 0.0;
        ownedEquity += 2.4; // 2.4% additional equity per major payment
        showFlexiPayPanel = false;
     });
     showSuccessScreen();
  }

  // Task 2: Success UI with Digital Seal Animation
  void showSuccessScreen() {
    showGeneralDialog(
      context: context,
      barrierColor: Colors.black.withOpacity(0.95),
      transitionDuration: Duration(milliseconds: 600),
      pageBuilder: (context, anim1, anim2) {
        return Scaffold(
          backgroundColor: Colors.transparent,
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Digital Seal Animation
                TweenAnimationBuilder<double>(
                  tween: Tween(begin: 0.0, end: 1.0),
                  duration: Duration(milliseconds: 800),
                  builder: (context, val, child) {
                    return Transform.scale(
                      scale: 1.5 - (0.5 * val),
                      child: Opacity(
                        opacity: val,
                        child: Container(
                           padding: EdgeInsets.all(32),
                           decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(color: Color(0xFFB8FF3C), width: 4),
                              boxShadow: [BoxShadow(color: Color(0xFFB8FF3C).withOpacity(0.3 * val), blurRadius: 40)],
                           ),
                           child: Column(
                             children: [
                               Text("STAMPED", style: GoogleFonts.bebasNeue(fontSize: 48, color: Color(0xFFB8FF3C))),
                               Text("NODE 08 VERIFIED", style: GoogleFonts.dmSans(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white54)),
                             ],
                           ),
                        ),
                      ),
                    );
                  }
                ),
                SizedBox(height: 100),
                Text("OWNERSHIP FRACTIONALIZED", style: GoogleFonts.bebasNeue(fontSize: 48, letterSpacing: 8, color: Colors.white)),
                Text("Asymmetric Ledger v2.1 Sync Completed for Pokuase Node SYN-VLT-08", style: GoogleFonts.dmMono(fontSize: 10, color: Colors.white24)),
                SizedBox(height: 100),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _successButton("DOWNLOAD DEED PDF", Icons.download_rounded, () {
                       html.window.open('$baseUrl/api/reports/receipt?id=SYN-VLT-08', '_blank');
                    }, true),
                    SizedBox(width: 24),
                    _successButton("SHARE WITH ABSA", Icons.account_balance, () {
                       ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("NODE 08: Encrypted Deed Pushed to Absa Node.")));
                    }, false),
                  ],
                ),
                SizedBox(height: 32),
                TextButton(onPressed: () => Navigator.pop(context), child: Text("RETURN TO PORTFOLIO", style: GoogleFonts.dmSans(color: Colors.white24, letterSpacing: 2)))
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _successButton(String label, IconData icon, VoidCallback onPressed, bool active) {
     return ElevatedButton.icon(
       onPressed: onPressed,
       icon: Icon(icon, size: 18),
       label: Text(label, style: GoogleFonts.dmSans(fontWeight: FontWeight.bold, fontSize: 10, letterSpacing: 2)),
       style: ElevatedButton.styleFrom(
         backgroundColor: active ? Color(0xFFB8FF3C) : Colors.white10,
         foregroundColor: active ? Colors.black : Colors.white,
         padding: EdgeInsets.symmetric(horizontal: 40, vertical: 24),
         shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
       ),
     );
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) return Scaffold(body: Center(child: CircularProgressIndicator(color: Color(0xFFB8FF3C))));
    return Scaffold(
      backgroundColor: Color(0xFF0D1B2A),
      body: Stack(
        children: [
          Row(
            children: [
              Expanded(flex: 2, child: _buildPortfolioSidebar()),
              Expanded(flex: 3, child: _buildGroundTruthTerminal()),
            ],
          ),
          
          Positioned(
             bottom: 40,
             right: 40,
             left: (MediaQuery.of(context).size.width * 0.4) + 40,
             child: _buildDualActionCommandBar(),
          ),

          if (showDroneTour) DroneViewPage(onClose: () => setState(() { showDroneTour = false; showFlexiPayPanel = true; })),
          if (showFlexiPayPanel) _buildFlexiPaySidePanel(),
        ],
      ),
    );
  }

  Widget _buildPortfolioSidebar() {
    return Container(
      padding: EdgeInsets.all(40),
      decoration: BoxDecoration(border: Border(right: BorderSide(color: Colors.white10))),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("SYNTRY", style: GoogleFonts.bebasNeue(fontSize: 32, letterSpacing: 4, color: Color(0xFFB8FF3C))),
          SizedBox(height: 48),
          _summaryCard("REMAINING PRINCIPAL", "GH₵${remainingBalance.toStringAsFixed(2)}", true),
          _summaryCard("INTEREST DUE (ABSA)", "GH₵${interestDue.toStringAsFixed(2)}", false),
          
          // Task 3: Portfolio Update (Equity Owned)
          Container(
            padding: EdgeInsets.all(32),
            decoration: BoxDecoration(color: Color(0xFFB8FF3C).withOpacity(0.05), borderRadius: BorderRadius.circular(24), border: Border.all(color: Color(0xFFB8FF3C).withOpacity(0.3))),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("EQUITY OWNED", style: GoogleFonts.dmSans(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white54, letterSpacing: 2)),
                SizedBox(height: 8),
                Text("${ownedEquity.toStringAsFixed(2)}%", style: GoogleFonts.bebasNeue(fontSize: 48, color: Color(0xFFB8FF3C))),
                SizedBox(height: 16),
                Text("NEXT MONTHLY CHECK: $scheduleDate", style: GoogleFonts.dmMono(fontSize: 8, color: Colors.white24)),
              ],
            ),
          ),
          
          Spacer(),
          _buildSimulationDebugMenu(),
          SizedBox(height: 16),
          _node08Seal(),
        ],
      ),
    );
  }

  Widget _buildDualActionCommandBar() {
    bool isDisputed = litigationStatus == 'dispute';
    return Container(
          padding: EdgeInsets.all(24),
          decoration: BoxDecoration(color: Color(0xFF0F1420).withOpacity(0.9), borderRadius: BorderRadius.circular(32), border: Border.all(color: Colors.white.withOpacity(0.1))),
          child: isDisputed 
            ? _buildLegalDisputeButton()
            : Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _commandButton(
                    label: "VIEW 360° DRONE VERIFICATION",
                    icon: Icons.videocam_outlined,
                    isPrimary: false,
                    enabled: isOnSite,
                    onPressed: () => setState(() => showDroneTour = true),
                  ),
                  SizedBox(width: 24),
                  _commandButton(
                    label: "ACCESS FLEXI-PAY MORTGAGE",
                    icon: Icons.account_balance_wallet,
                    isPrimary: true,
                    enabled: isOnSite,
                    onPressed: () => setState(() => showFlexiPayPanel = true),
                  ),
                ],
              ),
        );
  }

  Widget _commandButton({required String label, required IconData icon, required bool isPrimary, required bool enabled, required VoidCallback onPressed}) {
    Color activeColor = Color(0xFFB8FF3C);
    return Expanded(
      child: ElevatedButton.icon(
        onPressed: enabled ? onPressed : null,
        icon: Icon(icon, size: 20),
        label: Text(label, style: GoogleFonts.dmSans(fontWeight: FontWeight.w900, fontSize: 10, letterSpacing: 2)),
        style: ElevatedButton.styleFrom(
          backgroundColor: enabled ? (isPrimary ? activeColor : Colors.transparent) : Colors.white10,
          foregroundColor: enabled ? (isPrimary ? Colors.black : activeColor) : Colors.white24,
          side: (enabled && !isPrimary) ? BorderSide(color: activeColor, width: 2) : BorderSide.none,
          padding: EdgeInsets.symmetric(vertical: 24),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        ),
      ),
    );
  }

  Widget _buildLegalDisputeButton() {
     return ElevatedButton.icon(
        onPressed: () {},
        icon: Icon(Icons.gavel_rounded),
        label: Text("VIEW LEGAL DISPUTE :: NODE 08 FLAGS ACTIVE", style: GoogleFonts.bebasNeue(letterSpacing: 2, fontSize: 18)),
        style: ElevatedButton.styleFrom(backgroundColor: Colors.red, foregroundColor: Colors.white, minimumSize: Size(double.infinity, 72), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24))),
     );
  }

  Widget _buildFlexiPaySidePanel() {
    double payAmount = 2500;
    return Positioned(
       right: 0, top: 0, bottom: 0, width: 500,
       child: Container(
          decoration: BoxDecoration(color: Color(0xFF0D1B2A), border: Border(left: BorderSide(color: Color(0xFFB8FF3C).withOpacity(0.3), width: 2))),
          padding: EdgeInsets.all(48),
          child: Column(
             crossAxisAlignment: CrossAxisAlignment.start,
             children: [
                Row(
                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
                   children: [
                      Text("FLEXI-PAY ENGINE", style: GoogleFonts.bebasNeue(fontSize: 32, letterSpacing: 4, color: Color(0xFFB8FF3C))),
                      IconButton(onPressed: () => setState(() => showFlexiPayPanel = false), icon: Icon(Icons.arrow_forward_ios, color: Colors.white24)),
                   ],
                ),
                SizedBox(height: 64),
                _summaryCard("INTEREST BALANCE", "GH₵${interestDue.toStringAsFixed(2)}", false),
                Spacer(),
                ElevatedButton(
                   onPressed: () => finalizeAsymmetricTransaction(payAmount), // Task 3
                   style: ElevatedButton.styleFrom(backgroundColor: Color(0xFFB8FF3C), foregroundColor: Colors.black, minimumSize: Size(double.infinity, 80), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24))),
                   child: Text("EXECUTE SOVEREIGN REPAYMENT", style: GoogleFonts.dmSans(fontWeight: FontWeight.bold, letterSpacing: 2)),
                )
             ],
          ),
       ),
    );
  }

  Widget _buildSimulationDebugMenu() {
     return Container(
        padding: EdgeInsets.all(20),
        decoration: BoxDecoration(color: Colors.white.withOpacity(0.02), borderRadius: BorderRadius.circular(24), border: Border.all(color: isSimulatedOnSite ? Color(0xFFB8FF3C).withOpacity(0.3) : Colors.white10)),
        child: Row(
           mainAxisAlignment: MainAxisAlignment.spaceBetween,
           children: [
              Text("SIMULATE ON-SITE", style: GoogleFonts.dmMono(fontSize: 9, color: Colors.white24, fontWeight: FontWeight.bold)),
              Switch(value: isSimulatedOnSite, activeColor: Color(0xFFB8FF3C), onChanged: (val) { setState(() => isSimulatedOnSite = val); checkGeofence(5.6037, -0.1870); }),
           ],
        ),
     );
  }

  Widget _buildGroundTruthTerminal() {
    return Container(
      padding: EdgeInsets.all(40),
      color: Color(0xFF0F1420),
      child: Column(
        children: [
          _buildMapHeader(),
          Expanded(
            child: Container(
              decoration: BoxDecoration(color: Colors.black, borderRadius: BorderRadius.circular(40), border: Border.all(color: isOnSite ? Color(0xFFB8FF3C).withOpacity(0.5) : Colors.white10, width: 2)),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(40),
                child: Image.network("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/$lng,$lat,17,45/1000x800?access_token=MOCK", fit: BoxFit.cover),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMapHeader() {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24.0),
      child: Row(
        children: [
          Container(width: 8, height: 8, decoration: BoxDecoration(color: isOnSite ? Color(0xFFB8FF3C) : Colors.white10, shape: BoxShape.circle)),
          SizedBox(width: 12),
          Text("POKUASE NODE :: GEOLOCATION LOCKED: ${isOnSite ? 'YES' : 'NO'}", style: GoogleFonts.dmSans(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white24, letterSpacing: 2)),
        ],
      ),
    );
  }

  Widget _node08Seal() {
    return Container(
      padding: EdgeInsets.all(24),
      decoration: BoxDecoration(color: Color(0xFF2DD4BF).withOpacity(0.05), border: Border.all(color: Color(0xFF2DD4BF).withOpacity(0.2)), borderRadius: BorderRadius.circular(24)),
      child: Row(
        children: [
          Icon(Icons.verified_user, color: Color(0xFF2DD4BF), size: 20),
          SizedBox(width: 16),
          Text("NODE08 SECURE STAMP", style: GoogleFonts.dmMono(fontSize: 10, fontWeight: FontWeight.bold, color: Color(0xFF2DD4BF))),
        ],
      ),
    );
  }

  Widget _summaryCard(String label, String value, bool highlight) {
    return Container(
      width: double.infinity, margin: EdgeInsets.only(bottom: 16), padding: EdgeInsets.all(32),
      decoration: BoxDecoration(color: highlight ? Color(0xFFB8FF3C).withOpacity(0.05) : Colors.white.withOpacity(0.02), borderRadius: BorderRadius.circular(24), border: Border.all(color: highlight ? Color(0xFFB8FF3C).withOpacity(0.2) : Colors.white.withOpacity(0.05))),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(label, style: GoogleFonts.dmSans(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white24, letterSpacing: 2)), SizedBox(height: 12), Text(value, style: GoogleFonts.bebasNeue(fontSize: 32, color: Colors.white))]),
    );
  }
}

class DroneViewPage extends StatelessWidget {
  final VoidCallback onClose;
  DroneViewPage({required this.onClose});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black,
      child: Stack(
        children: [
          PanoramaViewer(
            sensorControl: SensorControl.orientation,
            child: Image.network("https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&w=2000&q=100"),
            hotspots: [
               Hotspot(latitude: 10, longitude: 10, width: 60, height: 60, widget: Icon(Icons.location_on, color: Color(0xFFB8FF3C), size: 40)),
            ],
          ),
          Positioned(
            top: 40, left: 40, right: 40,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("360° SOVEREIGN DRONE VERIFICATION", style: GoogleFonts.bebasNeue(fontSize: 32, letterSpacing: 4, color: Color(0xFFB8FF3C))),
                FloatingActionButton(onPressed: onClose, backgroundColor: Color(0xFFB8FF3C), child: Icon(Icons.close, color: Colors.black)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
