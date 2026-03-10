import 'package:flutter/material.dart';

void main() => runApp(CurrencyProApp());

class CurrencyProApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.indigo,
        useMaterial3: true,
      ),
      home: ConverterScreen(),
    );
  }
}

class ConverterScreen extends StatefulWidget {
  @override
  _ConverterScreenState createState() => _ConverterScreenState();
}

class _ConverterScreenState extends State<ConverterScreen> {
  final TextEditingController _amountController = TextEditingController();

  final Map<String, double> _rates = {
    'UAH': 1.0,
    'USD': 43.50,
    'EUR': 50.60,
    'PLN': 11.85,
    'GBP': 55.20,
  };

  String _fromCurrency = 'USD';
  String _toCurrency = 'UAH';
  String _result = "0.00";

  void _calculate() {
    double amount = double.tryParse(_amountController.text) ?? 0;

    double inUah = amount * _rates[_fromCurrency]!;
    double finalAmount = inUah / _rates[_toCurrency]!;

    setState(() {
      _result = finalAmount.toStringAsFixed(2);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Currency Converter Pro'),
        centerTitle: true,
        backgroundColor: Colors.indigo[100],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            const Icon(Icons.currency_exchange, size: 100, color: Colors.indigo),
            const SizedBox(height: 30),

            TextField(
              controller: _amountController,
              decoration: const InputDecoration(
                labelText: 'Сума для конвертації',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.calculate),
              ),
              keyboardType: TextInputType.number,
              onChanged: (value) => _calculate(),
            ),

            const SizedBox(height: 25),

            Row(
              children: [
                Expanded(child: _buildDropdown('З якої', _fromCurrency, (val) => setState(() => _fromCurrency = val!))),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 10),
                  child: Icon(Icons.arrow_forward),
                ),
                Expanded(child: _buildDropdown('В яку', _toCurrency, (val) => setState(() => _toCurrency = val!))),
              ],
            ),

            const SizedBox(height: 40),

            Card(
              elevation: 4,
              color: Colors.indigo[50],
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 40),
                child: Column(
                  children: [
                    const Text('Результат:', style: TextStyle(fontSize: 16)),
                    Text(
                      '$_result $_toCurrency',
                      style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.indigo),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDropdown(String label, String value, ValueChanged<String?> onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
        DropdownButtonFormField<String>(
          value: value,
          items: _rates.keys.map((String curr) {
            return DropdownMenuItem(value: curr, child: Text(curr));
          }).toList(),
          onChanged: (val) {
            onChanged(val);
            _calculate();
          },
          decoration: const InputDecoration(border: OutlineInputBorder()),
        ),
      ],
    );
  }
}