import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { BudgetItem } from '../shared/models/budget-item.model'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-add-item-form',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.scss',
})
export class AddItemFormComponent implements OnInit {
  @Input() item?: BudgetItem
  @Output() formSubmit: EventEmitter<BudgetItem> =
    new EventEmitter<BudgetItem>()
  isNewItem: boolean = false

  ngOnInit() {
    this.isNewItem = !this.item
  }

  onSubmit(form: NgForm) {
    this.formSubmit.emit(form.value)
    form.reset()
  }
}
