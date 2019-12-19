import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-produto-modal',
  templateUrl: './produto-modal.component.html',
  styleUrls: ['./produto-modal.component.css']
})
export class ProdutoModalComponent implements OnInit {

  title = '';

  produtoModal = {
    name: null,
    value: null,
    type: 'insert'
  };

  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<ProdutoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      Object.assign(this.produtoModal, data);
      this.title = (this.produtoModal.type == "insert")?"Adicionar Produto":"Editar Produto";
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
