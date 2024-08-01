import { NgClass } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BudgetItem } from '../../shared/models/budget-item.model'

@Component({
  selector: 'app-budget-item-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './budget-item-card.component.html',
  styleUrl: './budget-item-card.component.scss',
})
export class BudgetItemCardComponent implements OnInit {
  @Input() isIncome: boolean = true
  @Input() budgetItem: BudgetItem | undefined

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>()
  @Output() cardClick: EventEmitter<any> = new EventEmitter<any>()

  constructor() {}

  ngOnInit() {}

  close() {
    this.onClose.emit()
  }

  onCardClick() {
    this.cardClick.emit()
  }
}
