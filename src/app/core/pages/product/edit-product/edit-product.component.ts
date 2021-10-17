import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  product!: Product;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productService.detail(id).subscribe(
      (data) => {
        this.product = data;
      },
      (err) => {
        this.toast.failed(err);
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productService.update(id, this.product).subscribe(
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
