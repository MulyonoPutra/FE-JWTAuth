import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  name = '';
  price!: number;

  constructor(
    private productService: ProductService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    const product = new Product(this.name, this.price);
    this.productService.save(product).subscribe(
      (data) => {
        this.toast.success(data);
        this.router.navigate(['/list']);
      },
      (err) => {
        this.toast.failed(err);
      }
    );
  }
}
