import {Component, inject, OnInit, signal} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {ProductService} from "../services/product.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinner,
    NgForOf,
    MatCard,
    MatCardTitle,
    MatCardContent,
    CurrencyPipe
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
      productsArray.forEach((products, index) => {
        this.productsByCategory[this.categories[index]] = products;
      });
      this.loading.set(false);
    });
  }
}
