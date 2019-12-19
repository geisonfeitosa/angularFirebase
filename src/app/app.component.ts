import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoModalComponent } from './produto-modal/produto-modal.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { database } from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayedColumns: string[] = ['position', 'name', 'value', 'acoes'];
  produtos: any;

  constructor(
    public dialog: MatDialog,
    private db: AngularFireDatabase
    ) {;
      this.produtos = this.db.list('produtos')
      .snapshotChanges()
      .pipe(
        map(itens => {
          return itens.map(item => {
            return Object.assign({key: item.payload.key}, item.payload.val())
          })
        })
      );
    }

  insert() {
    const dialogRef = this.dialog.open(ProdutoModalComponent, {
      width: '500px',
      height: '300px',
      data: {type: 'insert'}
    });

    dialogRef.afterClosed().subscribe(r => {
      if(r != undefined) {
        this.db.list('produtos').push(r);
      }
    });
  }

  edit(element) {
    const dialogRef = this.dialog.open(ProdutoModalComponent, {
      width: '500px',
      height: '300px',
      data: {...element, type: 'edit'}
    });

    dialogRef.afterClosed().subscribe(r => {
      if(r != undefined) {
        this.db.list('produtos').update(r.key, r);
      }
    });
  }

  delete(key) {
    this.db.list('produtos').remove(key);
  }

}
