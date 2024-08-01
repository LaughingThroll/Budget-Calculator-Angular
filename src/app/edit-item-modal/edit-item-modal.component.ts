import { Component, Inject } from '@angular/core'
import { BudgetItem } from '../shared/models/budget-item.model'
import { AddItemFormComponent } from '../add-item-form/add-item-form.component'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-edit-item-modal',
  standalone: true,
  imports: [AddItemFormComponent],
  templateUrl: './edit-item-modal.component.html',
  styleUrl: './edit-item-modal.component.scss',
})
export class EditItemModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EditItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public item: BudgetItem
  ) {}

  onSubmit(updatedItem: BudgetItem) {
    this.dialogRef.close(updatedItem)
  }
}
