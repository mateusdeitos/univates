
import * as SQLite from 'expo-sqlite';
import {Database} from 'expo-sqlite';

export const db: Database = SQLite.openDatabase('db.db');

