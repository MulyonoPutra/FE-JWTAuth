import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Product } from './../../../models/product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  
  products: Product[] = [];
  isAdmin = false;
  constructor(
    private productService: ProductService,
    private toast: ToastService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.isAdmin = this.tokenService.isAdmin();
  }

  loadProducts(): void {
    this.productService.list().subscribe(
      (data) => {
        this.products = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  delete(id: number) {
    this.productService.delete(id).subscribe(
      (data) => {
        this.toast.success(data);
        this.loadProducts();
      },
      (err) => {
        this.toast.failed(err);
      }
    );
  }
}
