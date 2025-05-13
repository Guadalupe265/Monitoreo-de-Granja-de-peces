import 'package:flutter/material.dart';

class Variables extends StatelessWidget {
  const Variables({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Pantalla 2")),
      body: Center(child: Text("¡Bienvenido a la segunda pantalla!")),
    );
    
  }
}