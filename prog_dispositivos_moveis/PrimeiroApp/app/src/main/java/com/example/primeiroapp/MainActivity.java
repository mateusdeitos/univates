package com.example.primeiroapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {
    EditText nome;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        nome = findViewById(R.id.nome);
        Button enviar = findViewById(R.id.enviar);
        enviar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!nome.getText().toString().isEmpty() )
                {
                    Toast.makeText(MainActivity.this, "Por favor, digite seu nome " + nome.getText().toString(), Toast.LENGTH_LONG).show();
                } else {
                    Toast.makeText(MainActivity.this, "Obrigado " + nome.getText().toString() + " por estudar Android! ", Toast.LENGTH_LONG).show();
                }
            }
        });

        confirmacaoButton = (Button) findViewById(R.id.confirmacao);
        builder = new AlertDialog.Builder(this);
        confirmacaoButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                builder.setMessage("Você está aprendendo Android?")
                        .setPositiveButton("Sim", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                dialog.cancel(); //fecha a caixa de diálogo atual
                                Toast.makeText(getApplicationContext(),"Parabéns, continue estudando!",
                                        Toast.LENGTH_SHORT).show();
                            }
                        })
                        .setNegativeButton("Não", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                Toast.makeText(getApplicationContext(),"Favor estudar e concentrar-se mais!",
                                        Toast.LENGTH_SHORT).show();
                            }
                        });

                //Cria a caixa de diálogo
                AlertDialog alert = builder.create();
                alert.setTitle("Responda a pergunta abaixo");
                alert.show();
            }
        });
    }
}