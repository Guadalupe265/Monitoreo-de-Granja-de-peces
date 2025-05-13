import 'package:flutter/material.dart';

class LoginRegisterPage extends StatefulWidget {
  const LoginRegisterPage({super.key});

  @override
  State<LoginRegisterPage> createState() => _LoginRegisterPageState();
}

class _LoginRegisterPageState extends State<LoginRegisterPage> {
  bool mostrarLogin = true;

  final _loginEmail = TextEditingController();
  final _loginPassword = TextEditingController();

  final _registerName = TextEditingController();
  final _registerEmail = TextEditingController();
  final _registerPassword = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blueGrey.shade100,
      body: Center(
        child: Container(
          width: 350,
          height: 500,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.2),
            borderRadius: BorderRadius.circular(20),
            boxShadow: const [
              BoxShadow(blurRadius: 10, color: Colors.black26, offset: Offset(0, 8)),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: mostrarLogin ? _buildLoginForm() : _buildRegisterForm(),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() => mostrarLogin = !mostrarLogin);
        },
        child: Icon(mostrarLogin ? Icons.person_add : Icons.login),
      ),
    );
  }

  Widget _buildLoginForm() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text("Ingresa", style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
        const SizedBox(height: 20),
        _buildTextField(_loginEmail, "Email"),
        _buildTextField(_loginPassword, "Contraseña", obscure: true),
        const SizedBox(height: 20),
        ElevatedButton(onPressed: () {}, child: const Text("Continuar")),
      ],
    );
  }

  Widget _buildRegisterForm() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text("Regístrate", style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
        const SizedBox(height: 20),
        _buildTextField(_registerName, "Nombre del Usuario"),
        _buildTextField(_registerEmail, "Email"),
        _buildTextField(_registerPassword, "Contraseña", obscure: true),
        const SizedBox(height: 20),
        ElevatedButton(onPressed: () {}, child: const Text("Continuar")),
      ],
    );
  }

  Widget _buildTextField(TextEditingController controller, String hint, {bool obscure = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: TextField(
        controller: controller,
        obscureText: obscure,
        decoration: InputDecoration(
          hintText: hint,
          filled: true,
          fillColor: Colors.white.withOpacity(0.7),
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(30)),
        ),
      ),
    );
  }
}
