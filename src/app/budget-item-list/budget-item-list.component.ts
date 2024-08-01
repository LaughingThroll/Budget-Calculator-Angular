import { Component, EventEmitter, Input, Output } from '@angular/core'
import { BudgetItemCardComponent } from './budget-item-card/budget-item-card.component'
import { BudgetItem } from '../shared/models/budget-item.model'
import { NgFor } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component'

@Component({
  selector: 'app-budget-item-list',
  standalone: true,
  imports: [BudgetItemCardComponent, NgFor],
  templateUrl: './budget-item-list.component.html',
  styleUrl: './budget-item-list.component.scss',
})
export class BudgetItemListComponent {
  @Input() incomeItems: BudgetItem[] = []
  @Input() expenseItems: BudgetItem[] = []

  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>()
  @Output() update: EventEmitter<UpdatedEvent> =
    new EventEmitter<UpdatedEvent>()

  constructor(public dialog: MatDialog) {}

  onDelete(item: BudgetItem) {
    this.delete.emit(item)
  }

  onCardClick(item: BudgetItem) {
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '500px',
      data: item,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.update.emit({
          old: item,
          new: result,
        })
      }
    })
  }
}

export interface UpdatedEvent {
  old: BudgetItem
  new: BudgetItem
}
