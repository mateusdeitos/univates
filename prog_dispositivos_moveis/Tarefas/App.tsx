import { StatusBar, View } from 'react-native';
import React, { useEffect } from 'react';
import Routes from './tarefa_3/routes';
import { db } from './tarefa_3/database/db';



const App = () => {

  useEffect(() => {
    db.transaction(tr => {
        tr.executeSql("create table if not exists item (id integer primary key autoincrement, descricao text, quantidade integer);");
        tr.executeSql('delete from item');
        tr.executeSql('insert into item (descricao, quantidade) values (?, ?)', ['Produto A', Math.ceil(Math.random() * 100)]);
        tr.executeSql('insert into item (descricao, quantidade) values (?, ?)', ['Produto B', Math.ceil(Math.random() * 100)]);
        tr.executeSql('insert into item (descricao, quantidade) values (?, ?)', ['Produto C', Math.ceil(Math.random() * 100)]);
        tr.executeSql('insert into item (descricao, quantidade) values (?, ?)', ['Produto D', Math.ceil(Math.random() * 100)]);
        tr.executeSql('insert into item (descricao, quantidade) values (?, ?)', ['Produto E', Math.ceil(Math.random() * 100)]);
        tr.executeSql('insert into item (descricao, quantidade) values (?, ?)', ['Produto F', Math.ceil(Math.random() * 100)]);

    });

}, []);

  return (
    <View style={{ backgroundColor: '#EBEEF8', flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Routes />
    </View>
  );
}



export default App;
