int redLed = 6;
int yellowLed = 5;
int greenLed = 4;
int partyLed = 3;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(redLed, OUTPUT);
  pinMode(yellowLed, OUTPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(partyLed, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available() > 0) {
    String message = Serial.readStringUntil('\n');  // lee los datos que entran pero hasta que encuentre un salto de línea.
    if (message.equals("RED")) {
      digitalWrite(redLed, HIGH);
      digitalWrite(yellowLed, LOW);
      digitalWrite(greenLed, LOW);
      digitalWrite(partyLed, LOW);

    } else if (message.equals("YELLOW")) {
      digitalWrite(yellowLed, HIGH);
      digitalWrite(redLed, LOW);
      digitalWrite(greenLed, LOW);
      digitalWrite(partyLed, LOW);

    } else if (message.equals("GREEN")) {
      digitalWrite(greenLed, HIGH);
      digitalWrite(redLed, LOW);
      digitalWrite(yellowLed, LOW);
      digitalWrite(partyLed, LOW);

    } else if (message.equals("PARTY")) {
      digitalWrite(partyLed, HIGH);
      digitalWrite(greenLed, LOW);
      digitalWrite(redLed, LOW);
      digitalWrite(yellowLed, LOW);
    } else if (message.startsWith("NUM:")) {
    int number = message.substring(4).toInt(); // Quitar ellll string y dejar solo el num
        digitalWrite(redLed, LOW);
        digitalWrite(yellowLed, LOW);
        digitalWrite(greenLed, LOW);
        delay(200);
    for (int i = 0; i < number; i++) {
        digitalWrite(redLed, HIGH);
        digitalWrite(yellowLed, HIGH);
        digitalWrite(greenLed, HIGH);

        delay(250);

        digitalWrite(redLed, LOW);
        digitalWrite(yellowLed, LOW);
        digitalWrite(greenLed, LOW);

        delay(250);
    }
    }
}
  delay(100);
}
