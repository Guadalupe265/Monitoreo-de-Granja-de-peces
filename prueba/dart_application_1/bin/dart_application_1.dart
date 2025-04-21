// ignore_for_file: unused_local_variable
// ignore: unused_import
import 'dart:async';
import 'dart:ffi';
import 'dart:io';
import 'dart:math';

import 'package:dart_application_1/dart_application_1.dart' as dart_application_1;

void main(List<String> arguments) {
  ejem5();
}
void listLoop(){
List<int> numbers =[2,3,4,5,6,7];
/*for (var i = 0; i < numbers.length; i++) {
  print("Con el for basico tenemos :${numbers[i]}");

}

for (var pepe in numbers) {


  print('Con el for 2 tengo $pepe');
}*/
numbers.forEach(print);
}

void mapLoop(){
Map<String,int> numbers ={'favNumber':13,'birthday':12,'adddress':5};
for (var element in numbers.entries) {
  print('La clave es ${element.key}y el valor es${element.value}');
}

}
void setLoop(){
Set<int> numbers = {2,3,4,5,6,};
for (var element in numbers) {
  print('El set $element');
}
}
void mapExamples(){
mapExamples();  
  Map<String,int> people = {
    'Aris':32,
    'Pepe':64,
    'MoureDev':120
  };
  people["Aris"]=84;
  people.addAll({'David':44,'Miguel':22});
  people['Pikachu']=85;
  people.remove('Pikachu');
  people.containsKey('Aris');
  people.containsValue(32);
  print(people.values);
}
void setExamples(){
  Set<String> names={'Aris','Pepe'};
  Set<String> names2={'aris','pepe'};
  names.add('Bimbo');
  names.add('aris');
  names.remove('aris');
  //names.clear;
  //names.removeAll(names2);
  bool element=names.contains('Aris');
  if(element){
    print('Aris esta invitado');
  }else{
    print('Aris no esta invitado');
  }
  print(names.length);

  List<String> newNames= ["Aris","Aris","Juan"];
  Set<String>newNamesSet=Set.from(newNames);
  print(newNamesSet);
}
void conversiones(){
//Conversiones
  String toNumber= '21';
  int numberOK = int.parse(toNumber);
  print('El numero es $numberOK');

  int numberToString = 615;
  String stringOK = numberToString.toString();
  print(stringOK);

  String toDouble ="34.23";
  double doubleOK = double.parse(toDouble);
}
void simpleFunction(){
  print("Esto es un ejemplo");
}
void inputFunction(int a,int b){
  int result=a+b;
  print("El resultado es: $result");
}
int outputFunction(){
  int a=5;
  int b=3;
  return a+b;
}
int completeFunction(int a,int b){
  return a+b;
}
void optionalFunction({String name = "Desconocido",int age =-1}){
  print("Hola $name y tienes $age");
}
void optionalFunction2(String name ,[int age =-1]){
  print("Hola $name tienes $age");
}
void listExamples(){
List<String>names=["Aris","Pepe","Manolo"];
var names2=["Alfonso","Ruth","Ann"];
//print(names.last);//
//print(names.first);//
//print(names.length);//
//names[2]="Antonio";
//ames.add("Pikachu");
//names.insert(1, "Ramon");
//names.addAll(names2);
//names.remove("Manolo");
//names.removeAt(1);
//names.clear();

print(names);
}

void ejem1(){
  print("Ingresa un Numero");
  int num = int.parse(stdin.readLineSync()!);

  if(num >0){
    print("Es positivo");
  }else if(num<0){
    print("Es negativo");
  }else{
    print("Tu Numero Es 0");
}
}
void ejem2(){
print("Introduce el Mes del año");
  int mes=int.parse(stdin.readLineSync()!);
  switch(mes){
    case 1:
    print("Enero");
    break;
    case 2:
    print("Febrero");
    break;
    case 3:
    print("Marzo");
    break;
    case 4:
    print("Mayo");
    break;
    case 5:
    print("Abril");
    break;
    case 6:
    print("Junio");
    break;
    case 7:
    print("Julio");
    break;
    case 8:
    print("Agosto");
    break;
    case 9:
    print("Septiembre");
    break;
    case 10:
    print("Octubre");
    break;
    case 11:
    print("Noviembre");
    break;
    case 12:
    print("Diciembre");
    break;
    default:
    print("No es valido");
    break;
  }
}
void ejem3(){

 var example =[2,5,6,7,8];
 var result=0;

 for (int element in example) {
   if(element%2==0){
    result += element;
   }
 }
  print('${(result)}');
}
void ejem4(){
  List<String> works=['Dart','Flutter','Codigo','Dart','Flutter','Movil'];
  Set<String> result= {};
    for(var element in works){
      result.add(element);
    }
    print(result);
}
void ejem5(){
  List<String> works=['Dart','Flutter','Codigo','Dart','Flutter','Movil'];
  Map<String,int> result= {};
  for (var element in works) {
    if(result.containsKey(element)){
      result[element] =result[element]!+1;
    }else{
      result[element] = 1;
    }
  }
  print(result);
}