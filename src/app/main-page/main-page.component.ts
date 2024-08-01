import { Component } from '@angular/core'
import { AddItemFormComponent } from '../add-item-form/add-item-form.component'
import {
  BudgetItemListComponent,
  UpdatedEvent,
} from '../budget-item-list/budget-item-list.component'
import { BudgetItem } from '../shared/models/budget-item.model'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [AddItemFormComponent, BudgetItemListComponent, NgClass],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  incomeItems: BudgetItem[] = []
  expenseItems: BudgetItem[] = []
  totalBudget: number = 0

  constructor() {}

  addItem(newItem: BudgetItem) {
    const amount = newItem.amount || 0

    if (amount >= 0) {
      this.incomeItems.push(newItem)
    }

    if (amount < 0) {
      this.expenseItems.push(newItem)
    }

    this.totalBudget += amount
  }

  onDelete(item: BudgetItem) {
    const budgetItems = [...this.incomeItems, ...this.expenseItems]
    const index = budgetItems.indexOf(item)

    this.incomeItems.splice(index, 1)
    this.expenseItems.splice(index, 1)

    this.totalBudget -= item?.amount || 0
  }

  updateItem(updateEvent: UpdatedEvent) {
    let incomeItemIndex = this.incomeItems.indexOf(updateEvent.old)
    let expenseItemIndex = this.expenseItems.indexOf(updateEvent.old)

    if (incomeItemIndex !== -1) {
      this.incomeItems = this.incomeItems.map((el, i) => {
        return incomeItemIndex === i ? updateEvent.new : el
      })
    }

    if (expenseItemIndex !== -1) {
      this.expenseItems = this.expenseItems.map((el, i) => {
        return expenseItemIndex === i ? updateEvent.new : el
      })
    }

    this.totalBudget -= updateEvent?.old.amount || 0
    this.totalBudget += updateEvent?.new.amount || 0
  }
}
