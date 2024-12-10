import {Component, inject, OnInit, signal} from '@angular/core';
import { CurrencyPipe } from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {ProductService} from "../services/product.service";
import {forkJoin} from "rxjs";
import {MatButton} from "@angular/material/button";
import {TranslatePipe} from "@ngx-translate/core";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatCard,
    MatCardTitle,
    MatCardContent,
    CurrencyPipe,
    MatCardImage,
    MatCardActions,
    MatButton,
    MatCardHeader,
    TranslatePipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  categories: string[] = [];
  productsByCategory: { [key: string]: any[] } = {};
  loading = signal(false);
  private productService = inject(ProductService);

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.loading.set(true)
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loadAllProducts(categories);
    });
  }

  private loadAllProducts(categories: string[]) {
    const productObservables = categories.map(category =>
      this.productService.getProductsByCategory(category)
    );

    forkJoin(productObservables).subscribe(productsArray => {
      productsArray.forEach((products: Product[], index) => {
        this.productsByCategory[this.categories[index]] = products;
      });
      this.loading.set(false);
    });
  }
}
