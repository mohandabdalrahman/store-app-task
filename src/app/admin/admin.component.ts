import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ProductService} from "../services/product.service";
import {CurrencyPipe} from "@angular/common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatCard, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatButton,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    CurrencyPipe,
    MatCard,
    MatCardHeader,
    TranslatePipe,
    MatIcon,
    MatIconButton,
    MatCardTitle,
    MatProgressSpinner
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  private productService = inject(ProductService);
  private destroyRef = inject(DestroyRef);
  products = signal<Product[]>([]);
  displayedColumns: string[] = ['id', 'image', 'title', 'category', 'price', 'actions'];
  totalProducts: number = 0;
  loading= signal(false);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(page: number = 0, pageSize: number = 10) {
    this.loading.set(true);
    this.productService.getProducts(page, pageSize).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
      this.products.set(data);
      this.loading.set(false);
        this.totalProducts = data.length;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
      this.loadProducts();
    });
  }

  openAddProductForm() {
    // Logic to open the Add Product form
  }

  editProduct(product: any) {
    // Logic to edit a product
  }

  onPageChange(event: any) {
    this.loadProducts(event.pageIndex, event.pageSize);
  }
}
